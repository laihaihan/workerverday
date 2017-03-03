package com.linewell.core.ucap.menu;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.platform.authorized.menu.Menu;
import com.linewell.ucap.platform.authorized.menu.UiMenu;
import com.linewell.ucap.session.Session;

/**
 * 菜单业务操作
 * @author JSC
 *
 */
public class Menubusiness {
	private static final Logger logger = Logger.getLogger(Menubusiness.class);
	
	/**
	 * 根据session中当前登录用户信息获取权限下的所有菜单列表
	 * @param request
	 * @return List链表内封装 Menu对象
	 */
	public List<Menu> getAllMenu(HttpServletRequest request){
		Session session = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		String belongToAppId = session.getApp().getUnid();
		request.setAttribute("belongToApp", belongToAppId);
		UiMenu uimm = new UiMenu();
		String appPath = request.getContextPath() + "/";
		uimm.setAppPath(appPath);
		uimm.setHaveHandler(true);
		String result = uimm.getMenuJsonByBelongToApp("1", belongToAppId, session, null);
		Menubusiness menubusiness = new Menubusiness();
		if(StrUtil.isNull(result)){
			result = menubusiness.addAdminMenu("");
		}
		//对象转换，便于使用
		JSONArray jsonArray=JSONArray.fromObject(result);
		List<Menu> menuList = new ArrayList<Menu>();
		for (int i = 0; i < jsonArray.size(); i++) {
			JSONObject iObj = jsonArray.getJSONObject(i);
			if(null == iObj.get("content")){
				continue;
			}
			Menu menu = new Menu();
			menu.setUnid(iObj.get("content").toString());//菜单id
			menu.setName(iObj.get("text").toString());//菜单名称
			menuList.add(menu);
		}
		return menuList;
	}
	
	/**
	 *  取出应用系统所属所有菜单对象
	 * @param belongToAppId 
	 * @return List链表内封装 UcapMenuLeaf对象
	 */
	public List<UcapMenuLeaf> getAllMenu(String belongToAppId){
		String sql = "select r.mroot_childrens from ucap_menu_root r, ucap_scheme t where " +
				"r.mroot_unid = t.scheme_menu_unid and t.scheme_belong_to_app = '"+belongToAppId+"'"; 
		List<UcapMenuLeaf> menuList = new ArrayList<UcapMenuLeaf>();
		try {
			String[][] rs =  JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
			if(null != rs && rs.length>1&&!StrUtil.isNull(rs[1][0])){
				String[] menuSplit = rs[1][0].split(",");
				if(null != menuSplit && menuSplit.length>0){
					for (int i = 0; i < menuSplit.length; i++) {
 						UcapMenuLeafManager ucapMenuLeafManager= new UcapMenuLeafManager();
						menuList.add(ucapMenuLeafManager.doFindBeanByKey(menuSplit[i]));
					}
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}
		return menuList;
	}
	
	
	/**
	 * 取出应用系统的所有菜单
	 * @param appUnid
	 * @param session
	 * @return
	 */
	public List getMenuByAppUnid(String appUnid,Session session){
		UiMenu uimm = new UiMenu();
		List<Menu> menuList = new ArrayList<Menu>();
		String allMenu = uimm.getMenuJsonByBelongToApp("true", appUnid, session, null);
		if(!StrUtil.isNull(allMenu)){
			//对象转换，便于使用
			JSONArray jsonArray=JSONArray.fromObject(allMenu);
			for (int i = 0; i < jsonArray.size(); i++) {
				JSONObject iObj = jsonArray.getJSONObject(i);
				if(null == iObj.get("content")){
					continue;
				}
				Menu menu = new Menu();			
				menu.setUnid(iObj.get("content").toString());//菜单id
				menu.setName(iObj.get("text").toString());//菜单名称
				menuList.add(menu);
			}
		}
		
		return menuList;
	}
	
	
	/**
	 * 添加后台管理菜单
	 * 
	 * @param jsonStr
	 * @return
	 */
	public String addAdminMenu(String jsonStr){

		//判断当前角色是否已经拥有“后台管理”菜单的权限
		boolean hasAdminModule = false;
		String adminMenuUnid = "85FF9BFFB1927F4176C1CD8959862EBE";//后台管理菜单项(保存在ucap_module中)
		JSONArray jsonArr = null; 
		if(StrUtil.isNull(jsonStr)){
			jsonArr = new JSONArray();
		}else{
			jsonArr = JSONArray.fromObject(jsonStr);
		}
		for (Iterator iter = jsonArr.iterator(); iter.hasNext();) {
			JSONObject json = (JSONObject) iter.next();
			if(json.has("content") && adminMenuUnid.equals(json.getString("content"))){
				hasAdminModule = true;
				break;
			}
		}
		
		//添加“后台管理”菜单
		if(!hasAdminModule){
			JSONObject json = new JSONObject();
			json.put("content", adminMenuUnid);
			json.put("handler", "function(){ucapMenu.clk('85FF9BFFB1927F4176C1CD8959862EBE','01','')}");
			json.put("leaf", false);
			json.put("text", "后台管理");
			json.put("type", "01");
			json.put("version", "2");
			jsonArr.add(json);
		}
		return jsonArr.toString();
	}
	
}
