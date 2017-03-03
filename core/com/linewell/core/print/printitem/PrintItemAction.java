package com.linewell.core.print.printitem;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;

/**
 * <p>
 * 	保留历史域信息 Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-06-04 15:41:49
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class PrintItemAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		PrintItemManager manager = new PrintItemManager();
		
        //1、新增
        if("add".equals(fn)){
        	PrintItem printItem = new PrintItem();
        	BeanUtil.updateBean(request, printItem);    
        	result = manager.doSave(printItem);
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	PrintItem printItem = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, printItem);
        	result = manager.doUpdate(printItem);
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