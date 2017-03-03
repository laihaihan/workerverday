package com.linewell.core.file;

import java.io.File;
import java.sql.Blob;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import oracle.sql.BLOB;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.dict.ApasDictBussiness;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.BlobUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.util.DateTime;

/**
 * <p>
 *    AppFile数据库操作
 * </p>
 * 
 * @author:qcongyong email:yesqcy@163.com
 * @version 1.0.0 2011-11-22 09:02:19
 */
public class AppFileManager {
    private static final Log logger = LogFactory.getLog(AppFileManager.class);

	private String app_unid = "";
	private DbObjectManager dbObjectManager = null;

	public AppFileManager(String app_unid){
		this.app_unid = app_unid;
		dbObjectManager = new DbObjectManager("APP_FILE","FILE_UNID",app_unid);
	}
	
	/**
	 * 新增
	 */
	public boolean doSave(AppFile appFile){
		boolean result = true;
		result = dbObjectManager.doSave(appFile);
		return result;
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(AppFile appFile){
		boolean result = true;
		Blob file_data = appFile.getFile_data();
		if(file_data instanceof BLOB){//oracle.sql.BLOB类型的数据，无法使用JDBCTool更新，需要特殊处理
			//先将AppFile对象的Blob字段置为空
			appFile.setFile_data(null);
			result = dbObjectManager.doUpdate(appFile);

			//使用jdbc方式进行更新
			String condition = "file_unid='"+appFile.getFile_unid()+"'";
			result = result && BlobUtil.updateBlobColumn(this.app_unid,"app_file","file_data",condition,file_data);
		}else{
			result = dbObjectManager.doUpdate(appFile);
		}
		return result;
	}
		
	/**
	 * 删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据主键查找单个对象
	 */
	public AppFile doFindBeanByKey(String keyValue){
		return (AppFile)dbObjectManager.doFindBeanByKey(new AppFile(), keyValue);
	}
	
	public AppFile doFindBeanByBelongto(String belongto){
		String condition ="file_belongto ='"+belongto+"'";
		List list = this.doFindListByCondition(condition, null);
		
		return (null != list && !list.isEmpty()) ? (AppFile)list.get(0) : null;
	}
	
	public List<AppFile> doFindByBelongto(String belongto){
		String condition ="file_belongto ='"+belongto+"' order by file_createtime";
		return this.doFindListByCondition(condition,null);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] params){
		return dbObjectManager.doFindListByCondition(new AppFile(), condition, params);
	}
	
	/**
	 * 获取文件上传路径
	 * 
	 * @param app_unid	系统标识
	 * @return
	 */
	public String getUploadPath(){
		Map<String, String> map = new HashMap<String, String>();
		map.put(GlobalParameter.APP_CORE, GlobalParameter.CORE_FILEPATH);
		return GlobalParameter.CORE_FILEPATH;
	}

	/**
	 * 功能：取得上传文件对象实例
	 * 
	 * @param writeFile 输出文件对象
	 * @param belongTo  文件所属对象
	 * @return
	 */
	public AppFile getAppFile(File writeFile,String belongTo){
		String full_name = writeFile.getName();
		int index = full_name.indexOf("_");
		String file_unid = index > -1 ? full_name.substring(0,index) : new UNIDGenerate().getUnid();
		String file_name = index > -1 ? full_name.substring(index+1) : full_name;
		String context_path = ServletActionContext.getServletContext().getRealPath("");
		String file_path = writeFile.getPath().substring(context_path.length());
		file_path = file_path.replaceAll("\\\\", "/"); // 反斜杠("\")属于转义符号，须先转化成正斜杠("/")
		
		AppFile appFile = new AppFile();
		appFile.setFile_unid(file_unid);
		appFile.setFile_name(file_name);
		appFile.setFile_path(file_path);
		appFile.setFile_ext(file_name.substring(file_name.lastIndexOf(".")+1)); 
		appFile.setFile_size(String.valueOf(writeFile.length()));
		appFile.setFile_createtime(DateTime.getNowDateTime());
		
		//数据库配置附件存储类型
		String saveType = ApasDictBussiness.getDicValue("FILESAVETYPE", "附件存储类型");
		appFile.setFile_save_type(saveType);//附件存储类型:0.磁盘和数据库; 1.磁盘; 2.数据库
		if(!"1".equals(saveType)){
			appFile.setFile_data(BlobUtil.fileToBlob(writeFile));
		}
		if(!StrUtil.isNull(belongTo)){
			appFile.setFile_belongto(belongTo);
		}
		return appFile;
	}
}