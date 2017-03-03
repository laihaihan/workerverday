package com.linewell.core.button;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>视图按钮</P>
 * @author lfunian@linewell.com
 * @date Sep 2, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
public class ButtonAction  extends ActionSupport{
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();		
		HttpServletResponse response = ServletActionContext.getResponse();	
		
        String fn = request.getParameter("fn");
        boolean result = true;
		ButtonManager manager = new ButtonManager();
		
        //1、新增
        if("add".equals(fn)){
        	Button button = new Button();
        	BeanUtil.updateBean(request, button);    
        	result = manager.doSave(button);
        }
        //2、修改
        else if("update".equals(fn)){
        	String unid = request.getParameter("button_unid");
        	Button button = manager.doFindBeanByKey(unid);
        	BeanUtil.updateBean(request, button);   
        	result = manager.doUpdate(button);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "button_unid in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }
        
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		return null;
    }
}
