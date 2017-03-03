package com.linewell.core.file;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.StrUtil;
import com.opensymphony.xwork2.ActionSupport;

/**
 * 类说明：文件操作
 *
 * @author qcongyong 
 * @date 2011-11-22
 * @version 1.0  
 */
public class AppFileAction extends ActionSupport {

	private static final long serialVersionUID = 2854105381965508552L;
	private File file;
	private String fileContentType;
	private String fileFileName;

	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		
		
		response.setCharacterEncoding("UTF-8");

		JSONObject result = new JSONObject();
		AppFileBusiness bussiness = new AppFileBusiness(request);
		
		String materialunid = request.getParameter("userName");
		System.out.println("userName"+materialunid);
		
		String unid = request.getParameter("belongTo");
		System.out.println("unid"+unid);
		
		String file_type = request.getParameter("file_type");
		System.out.println("file_type"+file_type);
		
		String fn = StrUtil.formatNull(request.getParameter("fn"), "upload");
		if("upload".equals(fn)){
			result = bussiness.doUpload(request, this.getFileFileName(), file);
		}else if("del".equals(fn)){
			result = bussiness.doDel(request);
		}

		result.put("result", result);
		//返回值
        PrintUtil.print(response, result.toString());
		return null;
	}
	
	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}

	public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}
}