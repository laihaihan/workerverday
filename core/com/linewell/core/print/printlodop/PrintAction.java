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
 * 	Print Action
 * </P>
 * 
 * @author qcongyong@linewell.com
 * @date 2012-04-05 16:45:50
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class PrintAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		String fn = request.getParameter("fn");
		boolean result = true;
		PrintManager manager = new PrintManager();
		
        //1、新增
        if("add".equals(fn)){
        	Print print = new Print();
        	BeanUtil.updateBean(request, print);
        	result = manager.doSave(print);
        }
        //2、修改
        else if("update".equals(fn)){
        	String print_unid = request.getParameter("print_unid");
        	Print print = manager.doFindBeanByKey(print_unid);
        	BeanUtil.updateBean(request, print);
        	result = manager.doUpdate(print);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "print_unid in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}