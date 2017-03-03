package com.linewell.core.system;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.FileUtil;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  系统配置信息数据库操作
 * </p>
 * 
 * @author:zjianhui email:qcongyong@linewell.com
 * @version 1.0.0 2012-11-16 14:24:08
 *
 */
public class SystemConfigManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_SYSTEM_CONFIG","APP_UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(SystemConfig systemConfig){
		return dbObjectManager.doSave(systemConfig);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(SystemConfig systemConfig){
		return dbObjectManager.doUpdate(systemConfig);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public SystemConfig doFindBeanByKey(String keyValue){
		return (SystemConfig)dbObjectManager.doFindBeanByKey(new SystemConfig(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public SystemConfig doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (SystemConfig)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new SystemConfig(),condition,objs);
	}
	
	/**
	 * 根据主键删除单个对象
	 */
	public boolean doDeleteByKey(String keyValue){
		String condition = "APP_UNID='" + keyValue + "'";
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 上传logo图片
	 */
	public boolean doUploadLogo(HttpServletRequest request,String fileName,File file){
		String appPath = ServletActionContext.getServletContext().getRealPath("/");
		String uploadPath = appPath + GlobalParameter.CORE_FILEPATH + "logo/";
		FileUtil.mkdirs(uploadPath);
	
		//1、将logo图片上传至服务器
		File writeFile = new File(uploadPath + File.separator+  fileName);
    	return FileUtil.copyFile(file, writeFile);
	}
}