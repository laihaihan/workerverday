package com.linewell.core.ucap.role;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.ucap.role.dept.RoleDeptManager;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>
 *    角色信息action
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 5, 2012
 * @version 1.0  
 */
public class RoleAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		RoleManager manager = new RoleManager();
		
        //1、新增
        if("add".equals(fn)){
        	Role role = new Role();
        	BeanUtil.updateBean(request, role);
        	RoleDeptManager roleDeptManager = new RoleDeptManager();
        	roleDeptManager.saveByRole(request);
        	result = manager.doSave(role);
        }
        //2、修改
        else if("update".equals(fn)){
			String ROLE_UNID = request.getParameter("ROLE_UNID".toLowerCase());
        	Role role = manager.doFindBeanByKey(ROLE_UNID);
        	BeanUtil.updateBean(request, role);
        	result = manager.doUpdate(role);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "ROLE_UNID in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}
