package com.linewell.core.style.windows.userdesktippic;

import javax.servlet.http.HttpServletRequest;

import com.linewell.core.util.UNIDGenerate;

public class UserDesktipPicBussiness {
	public static void tests(){
		System.out.println("wwwwwww");
	}
	
	/**
	 * 设置用户默认背景图
	 * @param request
	 * @return
	 */
	public boolean setUserDesktopPic(HttpServletRequest request){
		UserDesktipPicManager manager = new UserDesktipPicManager();
		boolean flag = false;
		String userid = request.getParameter("userid");
		String curpicpath = request.getParameter("curpicpath");
		String app_unid = request.getParameter("app_unid");
		//判断之前是否有记录
		Object[] objs = new Object[2];
		objs[0] =  userid;
		objs[1] =  app_unid;
		UserDesktipPic userDesktipPic =  manager.doFindBeanByCondition(" userid = ? and app_unid=?", objs);
		
		//不存在新增
		if(null == userDesktipPic){
			userDesktipPic = new UserDesktipPic();
			userDesktipPic.setUnid(new UNIDGenerate().getUnid());
			userDesktipPic.setUserid(userid);
			userDesktipPic.setCurpicpath(curpicpath);
			userDesktipPic.setApp_unid(app_unid);
			flag = manager.doSave(userDesktipPic);
		}else{//存在更新
			userDesktipPic.setCurpicpath(curpicpath);
			flag = manager.doUpdate(userDesktipPic);
		}
		return flag;
	}
	
	/**
	 * 当前用户桌面背景
	 * @param userid
	 * @return 有则返回，无则返回空
	 */
	public String getCurpicpath(String userid,String app_unid){
		String curpicpath = "";
		UserDesktipPicManager manager = new UserDesktipPicManager();
		Object[] objs = new Object[2];
		objs[0] =  userid;
		objs[1] =  app_unid;
		UserDesktipPic userDesktipPic =  manager.doFindBeanByCondition(" userid = ? and app_unid=?", objs);
		if(null != userDesktipPic){
			curpicpath = userDesktipPic.getCurpicpath();
		}
		return curpicpath.replace("\\", "\\\\");
	}
}
