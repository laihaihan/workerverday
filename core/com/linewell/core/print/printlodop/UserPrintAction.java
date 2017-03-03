package com.linewell.core.print.printlodop;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;

/**
 * <p>
 * 	UserPrint Action
 * </P>
 * 
 * @author qcongyong@linewell.com
 * @date 2012-04-09 15:23:17
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class UserPrintAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	

		boolean result = true;
		UserPrintManager manager = new UserPrintManager();

        //1、删除旧纪录
		String print_type = request.getParameter("print_type");
    	String print_unid = request.getParameter("print_unid");
		String user_unid = request.getParameter("user_unid");
    	String condition = "user_unid ='"+user_unid+"' and print_unid='"+print_unid+"'";
    	manager.doDeleteByCondition(condition);
    	
        //2、保存个人配置方案
        if("2".equals(print_type)){
			UserPrint userPrintForm = (UserPrint)BeanUtil.getFormBean(UserPrint.class, request);
        	UserPrint userPrint = new UserPrint();
        	BeanUtil.updateProperties(userPrint, userPrintForm);
        	result = manager.doSave(userPrint);
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}