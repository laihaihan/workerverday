package com.linewell.core.buildermodule.info;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.jdom.JDOMException;

import com.linewell.core.buildermodule.BuilderModuleBusiness;
import com.linewell.core.buildermodule.detail.BuilderModuleDetailManager;
import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;
/**
 * <p>
 * 	快速建模-基本信息表 Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2013-04-17 16:41:14
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class BuilderModuleInfoAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;

    private static final Log logger = LogFactory.getLog(BuilderModuleInfoAction.class);
    
    
	public String execute() {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		BuilderModuleInfoManager manager = new BuilderModuleInfoManager();
    	BuilderModuleBusiness builderModuleBusiness = new BuilderModuleBusiness();
		
        //1、新增
        if("add".equals(fn)){
        	builderModuleBusiness.saveBuilderModuleInfo(request);
        }
        //2、修改
        else if("update".equals(fn)){
        	builderModuleBusiness.updateBuilderModuleInfo(request);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "UNID in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        	BuilderModuleDetailManager builderModuleDetailManager = new BuilderModuleDetailManager();
        	String[] idArray = ids.split(",");
        	for (int i = 0; i < idArray.length; i++) {
        		builderModuleDetailManager.doDeleteByCondition(" punid="+idArray[i]);
			}
        	
        	
        }else if("genModule".equals(fn)){
        	try {
				result = builderModuleBusiness.genModule(request);
			} catch (JDOMException e) {
				logger.error("快速建模jdome解析错误"+e.getMessage());
				e.printStackTrace();
			} catch (IOException e) {
				logger.error("快速建模IO错误"+e.getMessage());
				e.printStackTrace();
			} catch (SQLException e) {
				logger.error("快速建模SQL错误"+e.getMessage());
				e.printStackTrace();
			}
        }else if("genByTable".equals(fn)){
        	try {
				builderModuleBusiness.genModuleInfoByTable(request);
			} catch (SQLException e) {
				logger.error("反向生成模型SQL错误"+e.getMessage());
				e.printStackTrace();
			}
        }
        
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}