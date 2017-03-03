package com.linewell.core.ucap.bussiness.permission;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;

/**
 * <p>
 * 	 Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-10-10 17:45:45
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class BussinessPermissionAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		BussinessPermissionManager manager = new BussinessPermissionManager();
		
        //1、新增
        if("add".equals(fn)){
        	BussinessPermission bussinessPermission = new BussinessPermission();
        	BeanUtil.updateBean(request, bussinessPermission);    
        	result = manager.doSave(bussinessPermission);
        }
        //2、修改
        else if("update".equals(fn)){
			String BP_UNID = request.getParameter("BP_UNID".toLowerCase());
        	BussinessPermission bussinessPermission = manager.doFindBeanByKey(BP_UNID);
        	BeanUtil.updateBean(request, bussinessPermission);
        	result = manager.doUpdate(bussinessPermission);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "BP_UNID in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}