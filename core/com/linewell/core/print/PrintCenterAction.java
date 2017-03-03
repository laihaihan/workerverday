package com.linewell.core.print;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.print.printlodop.PrintManager;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;

/**
 * <p>
 * 	系统打印中心 Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-06-01 10:45:26
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class PrintCenterAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		PrintCenterManager manager = new PrintCenterManager();
		
        //1、新增
        if("add".equals(fn)){
        	PrintCenter printCenter = new PrintCenter();
        	BeanUtil.updateBean(request, printCenter);    
        	result = manager.doSave(printCenter);
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	PrintCenter printCenter = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, printCenter);
        	result = manager.doUpdate(printCenter);
        }
        //3、删除
        else if("del".equals(fn)){

    		PrintManager printManager = new PrintManager();
        	String ids = request.getParameter("ids");
        	String condition = "UNID in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
            printManager.doDeleteByCondition(" PUNID in ("+ids+")");
        }
        //4、绑定模板
        else if("bangding".equals(fn)){
        	String unid = request.getParameter("unid");
        	String punid = request.getParameter("punid");
        	manager.bangding(unid,punid);
        }
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}