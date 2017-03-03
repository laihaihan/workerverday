package com.linewell.core.userstyle.defaul;

import javax.servlet.http.HttpServletRequest;

import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;

public class UserDefaulStyleBusiness {
	
	/**
	 * 用户默认样式设置
	 * @param request
	 * @return
	 */
	public boolean chooseStyle(HttpServletRequest request){
		boolean flag = true;
		UserDefaulStyleManager manager = new UserDefaulStyleManager();
		String isDefaul = request.getParameter("isDefaul");
    	if(!StrUtil.isNull(isDefaul)&&"true".equals(isDefaul)){  //没选中默认样式的话则不操作数据库
    		String userid = request.getParameter("userid");
    		String styleurl = request.getParameter("styleurl");
    		Object[] objs = new Object[1];
    		objs[0] = userid;
        	UserDefaulStyle userDefaulStyle = manager.doFindBeanByCondition(" userid=?", objs);
        	if(null == userDefaulStyle){
        		userDefaulStyle = new UserDefaulStyle();
        		userDefaulStyle.setUnid(new UNIDGenerate().getUnid());
        		userDefaulStyle.setUserid(userid);
            	userDefaulStyle.setStyleurl(styleurl);
            	flag = manager.doSave(userDefaulStyle);
        	}else{
            	userDefaulStyle.setStyleurl(styleurl);
            	flag = manager.doUpdate(userDefaulStyle);
        	}
    	}
    	return flag;
	}
	
	/**
	 * 获取用户登录默认url
	 * @param userid
	 * @return
	 */
	public String getDefaulUrlByUser(String userid){
		String defaulUrl = "";
		UserDefaulStyleManager manager = new UserDefaulStyleManager();
		Object[] objs = new Object[1];
		objs[0] = userid;
    	UserDefaulStyle userDefaulStyle = manager.doFindBeanByCondition(" userid=?", objs);
    	if(null == userDefaulStyle){
    		defaulUrl = "index.jsp";
    	}else{
    		defaulUrl = userDefaulStyle.getStyleurl();
    	}
    	return defaulUrl;
	}
}
