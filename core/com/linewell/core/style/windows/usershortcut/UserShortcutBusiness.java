package com.linewell.core.style.windows.usershortcut;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.linewell.core.ucap.module.ModuleLeaf;
import com.linewell.core.ucap.module.ModuleLeafManager;
import com.linewell.core.util.ListUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;

public class UserShortcutBusiness {

	UserShortcutManager userShortcutManager = new UserShortcutManager();
	/**
	 * 获取系统自带快捷方式任务栏
	 * @param app_unid 系统id
	 * @param path 
	 * @return
	 */
	public StringBuffer genSysShortcutsTaskBar(String app_unid,String path,String userid){
		StringBuffer sb = new StringBuffer();
		ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
		Object[] objs = new Object[2];
		objs[0] = userid;//"system"; 
		objs[1] = app_unid; 
		List<UserShortcut> shortcutsList = userShortcutManager.doFindListByCondition(" userid=? and app_unid=?", objs);
		
		for (UserShortcut userShortcut:shortcutsList) {
			ModuleLeaf moduleLeaf = moduleLeafManager.doFindBeanByKey(userShortcut.getShortcutid());
			String disktopPic = path + "/core/js/easyui/themes/icons/folder_o.png"; //默认图标
			if(!StrUtil.isNull(moduleLeaf.getLeaf_big_picture()) ){
				disktopPic = path + "/" + moduleLeaf.getLeaf_big_picture();
			}
			sb.append("<li id='"+moduleLeaf.getLeaf_unid()+"'>");
			sb.append("<a href='#window_"+moduleLeaf.getLeaf_unid()+"'>");
			sb.append("<img src='"+disktopPic+"' width=20 height=20/>");
			sb.append(moduleLeaf.getLeaf_name());
			sb.append("</a>");
			sb.append("</li>");
		}
		return sb;
	}
	
	
	
	
	/**
	 * 获取系统自带快捷方式展示内容
	 * @param app_unid 系统id
	 * @return
	 */
	public StringBuffer genSysShortcutsShowContent(String app_unid,String path,String userid){
		StringBuffer sb = new StringBuffer();
		ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
		Object[] objs = new Object[2];
		objs[0] = userid; 
		objs[1] = app_unid; 
		List<UserShortcut> shortcutsList = userShortcutManager.doFindListByCondition(" userid=? and app_unid=?", objs);
		for (UserShortcut userShortcut:shortcutsList) {

			ModuleLeaf moduleLeaf = moduleLeafManager.doFindBeanByKey(userShortcut.getShortcutid());
			String disktopPic = path + "/core/js/easyui/themes/icons/folder_o.png"; //默认图标
			if(!StrUtil.isNull(moduleLeaf.getLeaf_big_picture()) ){
				disktopPic = path + "/" + moduleLeaf.getLeaf_big_picture();
			}
			
			sb.append("<div id='window_"+moduleLeaf.getLeaf_unid()+"' class='abs deskwindow'>");
			sb.append("<div class='abs window_inner'>");
			sb.append("<div class='window_top'>");
			sb.append("<span class='float_left'>");		
			sb.append("<img src='"+disktopPic+"'  width=20 height=20/>");		
			sb.append(moduleLeaf.getLeaf_name());			
			sb.append("</span>");		
			sb.append("<span class='float_right'>");		
			sb.append("<a href='#' class='window_min'></a>");			
			sb.append("<a href='#' class='window_resize'></a>");			
			sb.append("<a href='#"+moduleLeaf.getLeaf_unid()+"' class='window_close'></a>");			
			sb.append("</span>");		
			sb.append("</div>");	
			sb.append("<div class='abs window_content'>");	
			sb.append("<table height='100%' width='100%'>");		
			sb.append("<tr>");		  
			sb.append("<td height='100%'>");			
			sb.append("<iframe width='100%' height='100%' style='border: 0px;' frameborder='0'  src='"+path+"/"+moduleLeaf.getLeaf_contents()+"'></iframe>");	
			sb.append("</td>");	
			sb.append("</tr>"); 
			sb.append("</table>");
			sb.append("</div>");
			sb.append("</div>");
			sb.append("<span class='abs ui-resizable-handle ui-resizable-se'></span>");
			sb.append("</div>");		
			
		}
		return sb;
	}
	
	
	
	/**
	 * 获取系统自带快捷方式ICON
	 * @param app_unid 系统id
	 * @return
	 */
	public StringBuffer genSysShortcutsIcon(String app_unid,String path,String userid){
		StringBuffer sb = new StringBuffer();
		ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
		Object[] objs = new Object[2];
		objs[0] = userid; 
		objs[1] = app_unid; 
		List<UserShortcut> shortcutsList = userShortcutManager.doFindListByCondition(" userid=? and app_unid=?", objs);
		for (UserShortcut userShortcut:shortcutsList) {

			ModuleLeaf moduleLeaf = moduleLeafManager.doFindBeanByKey(userShortcut.getShortcutid());
			String disktopPic = path + "/core/js/easyui/themes/icons/folder_o.png"; //默认图标
			if(!StrUtil.isNull(moduleLeaf.getLeaf_big_picture())){
				disktopPic = path + "/" + moduleLeaf.getLeaf_big_picture();
			}
			
			//-- 桌面图标 开始~~~~~~~~~~~~~~~~~~
			sb.append("<a class='abs easyui-draggable' style='left:"+userShortcut.getCoordinate_left()+"px;top:"+userShortcut.getCoordinate_top()+"px;' href='#"+moduleLeaf.getLeaf_unid()+"'>");
			sb.append("<img src='"+disktopPic+"' />"+moduleLeaf.getLeaf_name() + "</a>");			
			
		}
		return sb;
	}
	
	
	/**
	 * 删除快捷方式
	 * @param app_unid
	 * @param userid
	 * @param shortcutid
	 * @return
	 */
	public boolean delShortcuts(String app_unid,String userid,String shortcutid){
		if(!isHaveDShortcut(app_unid,userid)){//不存则复制一份
			copyShortcutToUser(app_unid,userid);
		}
		return userShortcutManager.doDeleteByCondition(" app_unid='"+app_unid+"' and userid = '"+userid+"' and shortcutid='"+shortcutid+"'");
	}
	
	/**
	 * 桌面快捷方式拖拉后保留位置
	 * @param request
	 * @param app_unid 当前登录系统id
	 * @param userid 用户id
	 * @param shortcutid 快捷方式id
	 * @param evX 鼠标当前位置X坐标
	 * @param evY 鼠标当前位置Y坐标
	 * @return
	 */
	public boolean modifyShortcuts(String app_unid,String userid,String shortcutid,String evX,String evY){
		//个人是否有快捷方式配置有则取出最大坐标将新快捷方式放在其后，无则复制系统默认快捷方式一份
		Object[] objs = new Object[2];
		objs[0] = userid;
		objs[1] = app_unid;
		
		//查找配置信息
		List suortcutList = userShortcutManager.doFindListByCondition(" userid=? and app_unid=? order by coordinate_left  desc,coordinate_top desc", objs);
		if(!ListUtil.isNull(suortcutList)){
			objs = new Object[3];
			objs[0] = userid;
			objs[1] = app_unid;
			objs[2] = shortcutid;
			UserShortcut userShortcut = userShortcutManager.doFindBeanByCondition(" userid=? and app_unid=? and shortcutid=? ", objs);
			userShortcut.setCoordinate_left(Long.valueOf(evX).longValue());
			userShortcut.setCoordinate_top(Long.valueOf(evY).longValue());
			userShortcutManager.doUpdate(userShortcut);
			
		}else{//不存在配置记录则复制系统默认快捷方式一份
			copyShortcutToUser(app_unid,userid);
		}
		
		return true;
	}
	

	/**
	 * 快捷方式自动排序
	 * @param request
	 * @return
	 */
	public boolean autoOrderShortcut(String app_unid,String userid){
		//个人是否有快捷方式配置有则取出最大坐标将新快捷方式放在其后，无则复制系统默认快捷方式一份
		Object[] objs = new Object[2];
		objs[0] = userid;
		objs[1] = app_unid;
		
		//查找配置信息
		List suortcutList = userShortcutManager.doFindListByCondition(" userid=? and app_unid=? order by coordinate_left  desc,coordinate_top desc", objs);
		if(!ListUtil.isNull(suortcutList)){//配置过快捷方式有则取出最大坐标将新快捷方式放在其后
			UserShortcut userShortcut = (UserShortcut)suortcutList.get(0);
			long leftLength = 0 ;
			long rightLength = 0;
			int leftCount = 0; //临时计数器
			int rightCount = 0; //临时计数器
			for (int i = 0; i < suortcutList.size(); i++) {
				UserShortcut userShortcutTmp = (UserShortcut)suortcutList.get(i);

				if((i+1)%7==0){ //纵向8个一组
					leftCount++;
					rightCount = 0;
				}
				
				//坐标设置
				leftLength = 20+leftCount*80;
				rightLength = 20+rightCount*80;
				
				userShortcutTmp.setCoordinate_left(leftLength);
				userShortcutTmp.setCoordinate_top(rightLength);
				userShortcutManager.doUpdate(userShortcutTmp);
				rightCount++;
			}
		}else{//不存在配置记录则复制系统默认快捷方式一份
			copyShortcutToUser(app_unid,userid);			
		}

		
		return true;
	}
	
	
	/**
	 * 新增快捷方式
	 * @param request
	 * @return
	 */
	public boolean addShortcuts(String app_unid,String userid,String shortcutid){
		//个人是否有快捷方式配置有则取出最大坐标将新快捷方式放在其后，无则复制系统默认快捷方式一份
		Object[] objs = new Object[2];
		objs[0] = userid;
		objs[1] = app_unid;
		
		//新产生的对象
		UserShortcut userShortcutNew = new UserShortcut();
		userShortcutNew.setUnid(new UNIDGenerate().getUnid());
		
		//查找配置信息
		List suortcutList = userShortcutManager.doFindListByCondition(" userid=? and app_unid=? order by coordinate_left  desc,coordinate_top desc", objs);
		if(!ListUtil.isNull(suortcutList)){//配置过快捷方式有则取出最大坐标将新快捷方式放在其后
			UserShortcut userShortcut = (UserShortcut)suortcutList.get(0);
			if(userShortcut.getCoordinate_top() >= 420){//420为纵向6个图标，超过则另启一行
				userShortcutNew.setCoordinate_left(userShortcut.getCoordinate_left() + 80);
				userShortcutNew.setCoordinate_top(20);
			}else{
				userShortcutNew.setCoordinate_left(userShortcut.getCoordinate_left());
				userShortcutNew.setCoordinate_top(userShortcut.getCoordinate_top() + 80);
			}
		}else{//不存在配置记录则复制系统默认快捷方式一份
			copyShortcutToUser(app_unid,userid);
			objs[0] = "SYSTEM";
			List sysSuortcutList = userShortcutManager.doFindListByCondition(" userid=? and app_unid=? order by coordinate_left  desc,coordinate_top desc", objs);
			UserShortcut sysSuortcut = (UserShortcut)sysSuortcutList.get(0);
			if(sysSuortcut.getCoordinate_top() >= 420 ){
				userShortcutNew.setCoordinate_left(sysSuortcut.getCoordinate_left() + 80);
				userShortcutNew.setCoordinate_top(20);
			}else{
				userShortcutNew.setCoordinate_left(sysSuortcut.getCoordinate_left());
				userShortcutNew.setCoordinate_top(sysSuortcut.getCoordinate_top() + 80);
			}
			
			
		}

		//保存对象
		userShortcutNew.setApp_unid(app_unid);
		userShortcutNew.setUserid(userid);
		userShortcutNew.setShortcutid(shortcutid);
		userShortcutManager.doSave(userShortcutNew);
		
		return true;
	}
	
	/**
	 * 复制系统默认快捷方式
	 * @param app_unid
	 * @param userid
	 * @return
	 */
	public boolean copyShortcutToUser(String app_unid,String userid){
		boolean flag = true;
		Object[] objs = new Object[2];
		objs[0] = "SYSTEM";
		objs[1] = app_unid;
		List<UserShortcut> sysSuortcutList = userShortcutManager.doFindListByCondition(" userid=? and app_unid=? ", objs);
		for (UserShortcut userShortcut: sysSuortcutList) {
			UserShortcut userShortcutNew = new UserShortcut();
			userShortcutNew.setUnid(new UNIDGenerate().getUnid());
			userShortcutNew.setCoordinate_left(userShortcut.getCoordinate_left());
			userShortcutNew.setCoordinate_top(userShortcut.getCoordinate_top());
			userShortcutNew.setShortcutid(userShortcut.getShortcutid());
			userShortcutNew.setApp_unid(app_unid);
			userShortcutNew.setUserid(userid);
			flag = flag && userShortcutManager.doSave(userShortcutNew);
		}
		return flag;
	}
	
	/**
	 * 判断用户在当前系统是否配置过桌面快捷方式
	 * @param app_unid 当前系统id
	 * @param userid  用户id
	 * @return true： 是 ，false:否
	 */
	public boolean isHaveDShortcut(String app_unid,String userid){
		boolean flag = false;
		Object[] objs = new Object[2];
		objs[0] = userid;
		objs[1] = app_unid;
		//查找配置信息
		List suortcutList = userShortcutManager.doFindListByCondition(" userid=? and app_unid=? order by coordinate_left  desc,coordinate_top desc", objs);
		if(ListUtil.isNull(suortcutList)){
			flag = false;
		}else{
			flag = true;
		}
		return flag;
	}
	
}
