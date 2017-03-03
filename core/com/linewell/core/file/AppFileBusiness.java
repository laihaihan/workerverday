package com.linewell.core.file;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.util.FileUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.session.Session;

/**
 *功能说明：附件上传
 *
 *@author qcongyong
 *@data 2012-12-06
 *
 */
public class AppFileBusiness {
	
	private AppFileManager fileManager = null;
	
	public AppFileBusiness(HttpServletRequest request){
		String app_unid = request.getParameter("app_unid");
		if(StrUtil.isNull(app_unid)){
			Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
			app_unid = ucapSession.getApp().getUnid();
		}
		this.fileManager = new AppFileManager(app_unid);
	}
	
	/**
	 * 功能说明:上传文件
	 * 
	 * @param request  请求对象
	 * @param fileName 文件名称
	 * @param file     文件对象
	 */
	public JSONObject doUpload(HttpServletRequest request,String fileName,File file){
		//1、将文件上传至服务器
		System.out.println(fileManager.getUploadPath());
		String filePath = StrUtil.formatNull(request.getParameter("filepath"), fileManager.getUploadPath());
		filePath = ServletActionContext.getServletContext().getRealPath(filePath)+ File.separator;
		File fileDir = new File(filePath);
		if(!fileDir.exists() || !fileDir.isDirectory()){
			fileDir.mkdirs();//创建文件夹
		}
		String fileUnid = StrUtil.formatNull(request.getParameter("unid"), new UNIDGenerate().getUnid());
		File writeFile = new File(filePath + fileUnid + "_" + fileName);//为防止文件同名问题，在文件名前面加unid标识				
		FileUtil.copyFile(file, writeFile);

		//2、保存上传文件对象实例(先删除旧数据再插入新数据，防止数据重复)
		String belongTo = request.getParameter("belongTo");
		String file_type = request.getParameter("file_type");
		
		AppFile appFile = fileManager.getAppFile(writeFile,belongTo);
		fileManager.doDeleteByCondition("file_unid='"+appFile.getFile_unid()+"'");
		
		appFile.setFile_type(file_type);
		//appFile.setFile_belongto(belongTo);
		boolean status = fileManager.doSave(appFile);
		
		//返回值
		JSONObject result = new JSONObject();
		result.put("success", status);
		result.put("unid", appFile.getFile_unid());
		result.put("appFile", JSONObject.fromObject(appFile).toString());
    	return result;
	}
	
	/**
	 * 
	 * 功能说明:删除文件
	 * 
	 * @param request
	 * @return
	 */
	public JSONObject doDel(HttpServletRequest request){
		String unid = request.getParameter("unid");
		boolean status = fileManager.doDeleteByCondition("file_unid='"+unid+"'");
		JSONObject result = new JSONObject();
		result.put("success", status);
		return result;
	}
}