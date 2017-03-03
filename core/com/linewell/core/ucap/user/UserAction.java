package com.linewell.core.ucap.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.ucap.userrelation.UserRelation;
import com.linewell.core.ucap.userrelation.UserRelationManager;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.MD5Builder;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.UNIDGenerate;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>
 *    用户信息的后台action
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 5, 2012
 * @version 1.0  
 */
public class UserAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		String app_unid = request.getParameter("app_unid");
		UserManager manager = new UserManager();
		UserRelationManager relationManager = new UserRelationManager();
		JSONObject json = new JSONObject();
        //1、新增
        if("add".equals(fn)){
        	User user = new User();
        	BeanUtil.updateBean(request, user);
        	String isExist = manager.IsUserExist(user);//新增用户不存在同名
        	if(isExist.equals("no_exist")){
        		user.setUser_password(MD5Builder.getMD5(user.getUser_password()));  
            	result = manager.doSave(user);
            	if (result) {
            		UserRelation userRelation = new UserRelation();
            		userRelation.setUnid(new UNIDGenerate().getUnid());
            		userRelation.setUser_unid(user.getUser_unid());
            		userRelation.setApp_unid(app_unid);
            		relationManager.doSave(userRelation);
				}
        		json.put("exist", false);
        	}else if(isExist.equals("is_exist")){
        		result = false;
        		json.put("exist", true);
        	}
        }
        //2、修改
        else if("update".equals(fn)){
    		String user_unid = request.getParameter("user_unid");
        	User user = manager.doFindBeanByKey(user_unid);
        	String old_pwd = user.getUser_password();
        	BeanUtil.updateBean(request, user);
        	String new_pwd = user.getUser_password();
        	if(!old_pwd.equals(new_pwd)){
        		user.setUser_password(MD5Builder.getMD5(new_pwd));
        	}
        	result = manager.doUpdate(user);
        }
        //3、删除
        else if("del".equals(fn)){
    		String ids = request.getParameter("ids");
        	String condition = "USER_UNID in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        	if (result) {
				condition = "USER_UNID in ("+ids+") and APP_UNID = '" + app_unid + "'";
				relationManager.doDeleteByCondition(condition);
			}
        }
		
        //返回值
		json.put("result", result);
		PrintUtil.print(response, json.toString());
        return null;		
	}

}
