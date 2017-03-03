package com.linewell.core.appmaterial;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;

/**
 * <p>
 * 	新增材料列表 Action
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2013-06-18 16:03:58
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class AppMaterialAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute(){
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		AppMaterialBusiness business = new AppMaterialBusiness();
		
        //1、新增
        if("add".equals(fn)){
        	AppMaterial appmaterial = new AppMaterial();
        	BeanUtil.updateBean(request, appmaterial);    
        	result = business.doSave(appmaterial);
        }
        //2、修改
        else if("update".equals(fn)){
			String unid = request.getParameter("unid".toLowerCase());
        	AppMaterial appmaterial = business.doFindBeanByKey(unid);
        	BeanUtil.updateBean(request, appmaterial);
        	result = business.doUpdate(appmaterial);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String[] objsStr = ids.replace("'", "").split(",");
        	String condition = "unid = ?";
			for (int i = 0; i < objsStr.length; i++) {
				Object[] objs = new Object[1];
        		objs[0] = objsStr[i];
        		result = business.doDeleteByCondition(condition,objs);
			}
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}