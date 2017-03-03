package com.linewell.core.log.jdbc;

import java.util.List;


/**
 * <p>
 *  业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-09-29 10:46:35
 *
 */
public class LogJDBCBusiness {
	
	LogJDBCManager manager = new LogJDBCManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(LogJDBC logjdbc){
		return manager.doSave(logjdbc);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(LogJDBC logjdbc){
		return manager.doUpdate(logjdbc);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public LogJDBC doFindBeanByKey(String keyValue){
		return manager.doFindBeanByKey(keyValue);
	}
	
	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return manager.doFindListByCondition(condition,objs);
	}
	
		
	/**
	 * 根据主键删除对象
	 */
	public boolean doDeleteByCondition(String condition,Object[] objs){
		return manager.doDeleteByCondition(condition,objs);
	}
}