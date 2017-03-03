package com.linewell.core.buildermodule.detail;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;

/**
 * <p>
 * 	快速建模-字段详细信息 Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2013-04-17 16:41:48
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class BuilderModuleDetailAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		BuilderModuleDetailManager manager = new BuilderModuleDetailManager();
		
        //1、新增
        if("add".equals(fn)){
        	BuilderModuleDetail builderModuleDetail = new BuilderModuleDetail();
        	BeanUtil.updateBean(request, builderModuleDetail);    
        	result = manager.doSave(builderModuleDetail);
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	BuilderModuleDetail builderModuleDetail = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, builderModuleDetail);
        	result = manager.doUpdate(builderModuleDetail);
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