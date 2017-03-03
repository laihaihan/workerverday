package com.linewell.core.view.sqllog;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;

/**
 * <p>视图SQL语句日志</P>
 * @author lfunian@linewell.com
 * @date Aug 13, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
public class SqlLogManager {
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_SQL_LOG","UNID",GlobalParameter.APP_CORE);
	/**
	 * 新增
	 */
	public boolean doSave(SqlLog sqlLog){
		return dbObjectManager.doSave(sqlLog);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(SqlLog sqlLog){
		return dbObjectManager.doUpdate(sqlLog);
	}
		
	/**
	 * 根据主键删除
	 */
	public boolean doDeleteByKey(String keyValue){
		return dbObjectManager.doDeleteByCondition("UNID='"+keyValue+"'");
	}
		
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据主键查找单个对象
	 */
	public SqlLog doFindBeanByKey(String keyValue){
		return (SqlLog)dbObjectManager.doFindBeanByKey(new SqlLog(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] params){
		return dbObjectManager.doFindListByCondition(new SqlLog(), condition, params);
	}
}
