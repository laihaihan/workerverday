﻿package com.linewell.core.log.jdbc;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  数据库操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-09-29 10:46:35
 *
 */
class LogJDBCManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("LOG_JDBC","unid","3E2592D5DD95DA5C339C0935F7E9DAA8");
	
	/**
	 * 新增
	 */
	public boolean doSave(LogJDBC logjdbc){
		return dbObjectManager.doSave(logjdbc);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(LogJDBC logjdbc){
		return dbObjectManager.doUpdate(logjdbc);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public LogJDBC doFindBeanByKey(String keyValue){
		Object[] objs = new Object[1];
		objs[0] = keyValue;
		return doFindBeanByCondition("unid =?",objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public LogJDBC doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (LogJDBC)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new LogJDBC(),condition,objs);
	}
	
	/**
	 * 根据主键删除单个对象
	 */
	public boolean doDeleteByKey(String keyValue){
		String condition = "unid='" + keyValue + "'";
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition,Object[] objs){
		return dbObjectManager.doDeleteByCondition(condition,objs);
	}
}