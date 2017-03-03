package com.linewell.core.file.office;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.dict.ApasDictBussiness;
import com.linewell.core.file.AppFile;
import com.linewell.core.file.AppFileManager;
import com.linewell.core.util.BlobUtil;
import com.linewell.core.util.FileUtil;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.session.Session;
import com.opensymphony.xwork2.ActionSupport;

public class OfficeAction  extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private File upLoadFile;
	private String upLoadFileContentType;
	private String upLoadFileFileName;
	

	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		File writeFile = new File("D:\\test.doc");//为防止文件同名问题，在文件名前面加unid标识				
		FileUtil.copyFile(upLoadFile, writeFile);
		
		String belongTo = request.getParameter("belongTo");
		String fileunid = request.getParameter("fileunid");
		String fn = request.getParameter("fn");
		Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		
		AppFileManager fileManager = new AppFileManager(ucapSession.getApp().getUnid());
		AppFile appFile = new AppFile();
		appFile = new AppFileManager(ucapSession.getApp().getUnid()).doFindBeanByKey(fileunid);
		if(null == appFile){
			appFile = new AppFile();
			appFile.setFile_unid(fileunid);
			appFile.setFile_belongto(belongTo);
			appFile.setFile_name(this.getUpLoadFileFileName());
		}
		String saveType = ApasDictBussiness.getDicValue("FILESAVETYPE", "附件存储类型");
		appFile.setFile_save_type(saveType);//附件存储类型:0.磁盘和数据库; 1.磁盘; 2.数据库
		if(!"1".equals(saveType)){
			appFile.setFile_data(BlobUtil.fileToBlob(writeFile));
		}
		
		
		//生成全新word
		if(!StrUtil.isNull(fn)&& fn.equals("genoffice") ){
			appFile.setFile_unid(new UNIDGenerate().getUnid());
			appFile.setFile_name("生成-"+appFile.getFile_name());
			appFile.setFile_save_type("3");
		}
		
		fileManager.doDeleteByCondition("file_unid='"+appFile.getFile_unid()+"'");
		fileManager.doSave(appFile);
		
		
 
		//返回值
		return "officeedit";
	}
	

	public File getUpLoadFile() {
		return upLoadFile;
	}

	public String getUpLoadFileContentType() {
		return upLoadFileContentType;
	}


	public void setUpLoadFileContentType(String upLoadFileContentType) {
		this.upLoadFileContentType = upLoadFileContentType;
	}


	public String getUpLoadFileFileName() {
		return upLoadFileFileName;
	}


	public void setUpLoadFileFileName(String upLoadFileFileName) {
		this.upLoadFileFileName = upLoadFileFileName;
	}


	public void setUpLoadFile(File upLoadFile) {
		this.upLoadFile = upLoadFile;
	}

}
