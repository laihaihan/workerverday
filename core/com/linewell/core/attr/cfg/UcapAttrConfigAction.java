package com.linewell.core.attr.cfg;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.util.StrUtil;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>
 * 	 Action
 * </P>
 * 
 * @author cbingcan@linewell.com
 * @date 2012-10-16 16:32:44
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class UcapAttrConfigAction  extends ActionSupport {

	private static final long serialVersionUID = 2854105381965508552L;
	private static Logger log = Logger.getLogger(UcapAttrConfigAction.class);
	private File file ;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("UTF-8");
		UcapAttrConfigBusiness fillbus = new UcapAttrConfigBusiness();
		JSONObject result = new JSONObject();
		String fn = request.getParameter("fn");
		fn = StrUtil.isNull(fn) ? "upload" : fn;
		try {
			if("upload".equals(fn)){
				result = fillbus.doUpload(request,file);
			}else if("del".equals(fn)){
				result = fillbus.doDel(request);
			}
			//返回值
			response.getWriter().print(result.toString());
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return null;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}
	
}