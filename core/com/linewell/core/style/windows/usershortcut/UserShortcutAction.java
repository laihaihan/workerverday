package com.linewell.core.style.windows.usershortcut;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;

/**
 * <p>
 * 	win7样式用户拥有快捷方式 Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-12-13 09:47:46
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class UserShortcutAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		UserShortcutManager manager = new UserShortcutManager();
		UserShortcutBusiness  userShortcutBusiness = new UserShortcutBusiness();
        //1、新增
        if("add".equals(fn)){
        	UserShortcut userShortcut = new UserShortcut();
        	BeanUtil.updateBean(request, userShortcut);    
        	result = manager.doSave(userShortcut);
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	UserShortcut userShortcut = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, userShortcut);
        	result = manager.doUpdate(userShortcut);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "UNID in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }else if("addShortcuts".equals(fn)){
        	String app_unid = request.getParameter("app_unid");
        	String userid = request.getParameter("userid");
        	String shortcutid = request.getParameter("shortcutid");
        	
        	userShortcutBusiness.addShortcuts(app_unid, userid,shortcutid);
        }else if("delShortcuts".equals(fn)){
        	String app_unid = request.getParameter("app_unid");
        	String userid = request.getParameter("userid");
        	String shortcutid = request.getParameter("shortcutid");
        	
        	userShortcutBusiness.delShortcuts(app_unid, userid,shortcutid);
        }else if("modifyShortcuts".equals(fn)){
        	String app_unid = request.getParameter("app_unid");
        	String userid = request.getParameter("userid");
        	String shortcutid = request.getParameter("shortcutid");
        	String evX = request.getParameter("evX");
        	String evY = request.getParameter("evY");
        	
        	userShortcutBusiness.modifyShortcuts(app_unid, userid, shortcutid, evX, evY);
        }else if("autoOrderShortcut".equals(fn)){
        	String app_unid = request.getParameter("app_unid");
        	String userid = request.getParameter("userid");
        	userShortcutBusiness.autoOrderShortcut(app_unid,userid);
        }
        
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}