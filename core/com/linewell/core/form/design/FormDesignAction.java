package com.linewell.core.form.design;



import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>
 * 	FormDesign Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-02-14 17:05:28
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class FormDesignAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		String fn = request.getParameter("fn");
		boolean result = true;
		FormDesignManager manager = new FormDesignManager();
		FormDesignSetter setter  = new FormDesignSetter();
		
        //1、新增
        if("verification".equals(fn)){
        	FormDesignManager formDesignManager = new FormDesignManager();

    		String punid = request.getParameter("punid");
        	FormDesignBussiness formDesignBussiness = new FormDesignBussiness();
        	List list = formDesignBussiness.getVerificationList(punid);
    		String verifymodule = "0";
        	for (int i = 0; i < list.size(); i++) {
        		FormDesign formDesign = (FormDesign)list.get(i);
        		verifymodule = request.getParameter(formDesign.getColumnname());
				formDesign.setVerifymodule(verifymodule);
	        	result = result && manager.doUpdate(formDesign);
			}
        }
		
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}