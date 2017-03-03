package com.linewell.core.log.exception;

import java.util.List;


/**
 * <p>
 *  异常信息表业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-09-29 09:30:08
 *
 */
public class ExceptionLogBusiness {
	
	ExceptionLogManager manager = new ExceptionLogManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(ExceptionLog exceptionlog){
		return manager.doSave(exceptionlog);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(ExceptionLog exceptionlog){
		return manager.doUpdate(exceptionlog);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public ExceptionLog doFindBeanByKey(String keyValue){
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