package com.linewell.core.treedict;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;

/**
 * <p>
 * 	树形数据字典 Action
 * </P>
 * 
 * @author yq@linewell.com
 * @date 2012-08-31 14:52:27
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class ApasTreeDictAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		ApasTreeDictManager manager = new ApasTreeDictManager();
		
        //1、新增
        if("add".equals(fn)){
        	ApasTreeDict apasTreeDict = new ApasTreeDict();
        	BeanUtil.updateBean(request, apasTreeDict);    
        	result = manager.doSave(apasTreeDict);
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	ApasTreeDict apasTreeDict = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, apasTreeDict);
        	result = manager.doUpdate(apasTreeDict);
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