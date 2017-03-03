package com.linewell.core.sms.template;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;

/**
 * <p>
 * 	短信模板 Action
 * </P>
 * 
 * @author qcongyong@linewell.com
 * @date 2012-11-23 09:27:47
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class SmsTemplateAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		SmsTemplateManager manager = new SmsTemplateManager();
		
        //1、新增
        if("add".equals(fn)){
        	SmsTemplate smsTemplate = new SmsTemplate();
        	BeanUtil.updateBean(request, smsTemplate);    
        	result = manager.doSave(smsTemplate);
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	SmsTemplate smsTemplate = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, smsTemplate);
        	result = manager.doUpdate(smsTemplate);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "UNID in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}