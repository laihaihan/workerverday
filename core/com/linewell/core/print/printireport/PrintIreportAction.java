package com.linewell.core.print.printireport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;

/**
 * <p>
 * 	ireport打印方式 Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-06-01 14:46:25
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class PrintIreportAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		PrintIreportManager manager = new PrintIreportManager();
		
        //1、新增
        if("add".equals(fn)){
        	PrintIreport printIreport = new PrintIreport();
        	BeanUtil.updateBean(request, printIreport);    
        	result = manager.doSave(printIreport);
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	PrintIreport printIreport = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, printIreport);
        	result = manager.doUpdate(printIreport);
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