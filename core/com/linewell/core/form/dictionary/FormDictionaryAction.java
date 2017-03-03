package com.linewell.core.form.dictionary;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>
 * 	 Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-07-27 17:09:10
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class FormDictionaryAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		FormDictionaryManager manager = new FormDictionaryManager();
		
        //1、新增
        if("add".equals(fn)){
        	FormDictionary formDictionary = new FormDictionary();
        	BeanUtil.updateBean(request, formDictionary);    
        	result = manager.doSave(formDictionary);
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	FormDictionary formDictionary = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, formDictionary);
        	result = manager.doUpdate(formDictionary);
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