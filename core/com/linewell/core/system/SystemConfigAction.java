package com.linewell.core.system;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;

/**
 * <p>
 * 	系统配置信息 Action
 * </P>
 * 
 * @author qcongyong@linewell.com
 * @date 2012-11-16 14:24:08
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class SystemConfigAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private File file;
	private String fileFileName;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		SystemConfigManager manager = new SystemConfigManager();
		
        //1、新增
        if("add".equals(fn)){
        	SystemConfig systemConfig = new SystemConfig();
        	BeanUtil.updateBean(request, systemConfig);    
        	result = manager.doSave(systemConfig);
        }
        //2、修改
        else if("update".equals(fn)){
			String APP_UNID = request.getParameter("APP_UNID".toLowerCase());
        	SystemConfig systemConfig = manager.doFindBeanByKey(APP_UNID);
        	BeanUtil.updateBean(request, systemConfig);
        	result = manager.doUpdate(systemConfig);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "APP_UNID in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }
        //4、上传logo图片
        else if("uploadLogo".equals(fn)){
        	result = manager.doUploadLogo(request, this.fileFileName, this.file);
        }        //4、上传logo图片
        else if("iniFlowConfig".equals(fn)){
        	result = manager.doUploadLogo(request, this.fileFileName, this.file);
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}
}