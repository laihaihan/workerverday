package com.linewell.core.attr.cfg;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.dict.ApasDictBussiness;
import com.linewell.core.doctype.Doctype;
import com.linewell.core.doctype.DoctypeManager;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.BlobUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.platform.authorized.app.App;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.util.DateTime;

/**
 *功能说明：
 *<P></P>
 *@since 2012
 *
 */
public class UcapAttrConfigBusiness {
	
	private static final int BUFFER_SIZE = 1 * 1024* 1024; // 1M
	
	/**
	 * 功能说明:上传文件
	 * @param request
	 * @param fileName
	 * @param file
	 * @return
	 * @throws Exception
	 */
	public JSONObject doUpload(HttpServletRequest request,File file)throws Exception{
		JSONObject result = new JSONObject();
		UcapAttrConfigManager manager = new UcapAttrConfigManager();
		//1、将文件上传至服务器
		String uploadPath = ServletActionContext.getServletContext().getRealPath(GlobalParameter.CORE_FILEPATH);
		File filePath = new File(uploadPath);
		if(!filePath.exists()){
			filePath.mkdirs();//创建文件夹
		}
		String fileName = StringUtils.defaultString(request.getParameter("Filename"));
		String fileExt = "";
		if(fileName.indexOf(".") > 0) {
			fileExt =  fileName.substring(fileName.indexOf("."));
		}
		String writeFileName = request.getParameter("attr_cfg_file_name");
		if(StringUtils.isEmpty(writeFileName)) {
			writeFileName = fileName;
		} else {
			writeFileName = writeFileName + fileExt;
		}
		File writeFile = new File(uploadPath+File.separator + writeFileName);	
		this.upload(file, writeFile);

		//2、保存上传文件对象实例(先删除旧数据再插入新数据，防止数据重复)
		UcapAttrConfig attrConfig = this.getAttrConfig(request,writeFile,file);
		manager.doDeleteByCondition("attr_cfg_unid='"+attrConfig.getAttr_cfg_unid()+"'");
		boolean status = manager.doSave(attrConfig);
		result.put("success", status);
		result.put("unid", attrConfig.getAttr_cfg_unid());
		result.put("file", JSONObject.fromObject(attrConfig).toString());
    	return result;
	}
	/**
	 * 
	 * 功能说明:删除文件
	 * @param request
	 * @return
	 * @2012
	 */
	public JSONObject doDel(HttpServletRequest request)throws Exception{
		JSONObject result = new JSONObject();
		UcapAttrConfigManager manager = new UcapAttrConfigManager();
		String unid = request.getParameter("unid");
		boolean status = manager.doDeleteByCondition("attr_cfg_unid='"+unid+"'");
		result.put("success", status);
		return result;
	}

	/**
	 * 将文件上传至服务器
	 * 
	 * @param src
	 * @param dst
	 */
	private void upload(File src, File dst) {
		InputStream in = null;
		OutputStream out = null;
		try {
			in = new BufferedInputStream(new FileInputStream(src),BUFFER_SIZE);
			out = new BufferedOutputStream(new FileOutputStream(dst),BUFFER_SIZE);
			byte[] buffer = new byte[BUFFER_SIZE];
			while (in.read(buffer) > 0) {
				out.write(buffer);
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally {
			try{
				if (null != in){
					in.close();
				}
				if (null != out){
					out.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 取得上传文件对象实例
	 * 
	 * @param request
	 * @param writeFile
	 * @return
	 */
	public UcapAttrConfig getAttrConfig(HttpServletRequest request,File writeFile,File file)throws Exception{
		String unid = request.getParameter("unid");
		unid = StrUtil.isNull(unid) ? new UNIDGenerate().getUnid() : unid;
		String fileName = StringUtils.defaultString(request.getParameter("Filename"));
		String fileExt = "";
		if(fileName.indexOf(".") > 0) {
			fileExt =  fileName.substring(fileName.indexOf("."));
		}
		String writeFileName = request.getParameter("attr_cfg_file_name");
		if(StringUtils.isEmpty(writeFileName)) {
			writeFileName = fileName;
		} else {
			writeFileName = writeFileName + fileExt;
		}
		
		UcapAttrConfig attrConfig = new UcapAttrConfig();
		BeanUtil.updateBean(request,attrConfig);
		Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		App app = ucapSession.getApp();
		attrConfig.setAttr_cfg_belong_to_app(app.getUnid());
		attrConfig.setAttr_cfg_caption(writeFileName.replaceAll(fileExt, ""));
		attrConfig.setAttr_cfg_unid(unid);
		attrConfig.setAttr_cfg_created(DateTime.getNowDateTime());
		attrConfig.setAttr_cfg_file_name(writeFileName);
		attrConfig.setAttr_cfg_isdocsave("1");
		/** 0.磁盘和数据库; 1.磁盘; 2.数据库*/
		String saveType = ApasDictBussiness.getDicValue("FILESAVETYPE", "附件存储类型");
		if(saveType.equals("0")){
			attrConfig.setAttr_cfg_size(String.valueOf(file.length()));
			attrConfig.setAttr_cfg_contents(BlobUtil.fileToBlob(writeFile));
		}else if(saveType.equals("1")){
			attrConfig.setAttr_cfg_size("0");
		}
		return attrConfig;
	}

	/**
	 * 找出对应流程所有的正文附件模板列表
	 * @param flowUnid
	 * @return
	 * @author zjianhui@linewell.com
	 */
	public List<UcapAttrConfig> getAttrCfgList(String flowUnid){
		//根据流程找到文件类型
		DoctypeManager doctypeManager = new DoctypeManager();
		Object[] doctypeObjs = new Object[1];
		doctypeObjs[0] = flowUnid;
		Doctype doctype = doctypeManager.doFindBeanByCondition("flowid=?", doctypeObjs);
		if(null == doctype){
			doctype  = new Doctype();
		}
		
		//根据文件类型找到附件列表
		UcapAttrConfigManager ucapAttrConfigManager = new UcapAttrConfigManager();
		Object[] attrConfigObjs = new Object[1];
		attrConfigObjs[0] = doctype.getUnid();
		return ucapAttrConfigManager.doFindListByCondition("attr_cfg_punid=?", attrConfigObjs);
	}
}
