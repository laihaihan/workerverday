package com.linewell.core.log.exception;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  异常信息表数据库操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-09-29 09:30:08
 *
 */
class ExceptionLogManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("LOG_EXCEPTION","unid","A8504E156D1098E5E32209875D3B8D43");
	
	/**
	 * 新增
	 */
	public boolean doSave(ExceptionLog exceptionlog){
		return dbObjectManager.doSave(exceptionlog);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(ExceptionLog exceptionlog){
		return dbObjectManager.doUpdate(exceptionlog);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public ExceptionLog doFindBeanByKey(String keyValue){
		Object[] objs = new Object[1];
		objs[0] = keyValue;
		return doFindBeanByCondition("unid =?",objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public ExceptionLog doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (ExceptionLog)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new ExceptionLog(),condition,objs);
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