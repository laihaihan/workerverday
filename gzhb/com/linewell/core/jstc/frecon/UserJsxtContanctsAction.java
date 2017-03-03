package com.linewell.core.jstc.frecon;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;

/**
 * <p>
 * 	联系人 Action
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2014-08-05 15:52:31
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class UserJsxtContanctsAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute(){
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		UserJsxtContanctsBusiness business = new UserJsxtContanctsBusiness();
		
        //1、新增
        if("add".equals(fn)){
        	UserJsxtContancts userjsxtcontancts = new UserJsxtContancts();
        	BeanUtil.updateBean(request, userjsxtcontancts);    
        	result = business.doSave(userjsxtcontancts);
        }
        //2、修改
        else if("update".equals(fn)){
			String unid = request.getParameter("unid".toLowerCase());
        	UserJsxtContancts userjsxtcontancts = business.doFindBeanByKey(unid);
        	BeanUtil.updateBean(request, userjsxtcontancts);
        	result = business.doUpdate(userjsxtcontancts);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String[] objsStr = ids.replace("'", "").split(",");
        	String condition = "unid = ?";
			for (int i = 0; i < objsStr.length; i++) {
				Object[] objs = new Object[1];
        		objs[0] = objsStr[i];
        		result = business.doDeleteByCondition(condition,objs);
			}
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}