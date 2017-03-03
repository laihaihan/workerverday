package com.linewell.core.log.method;

import java.util.List;


/**
 * <p>
 *  业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-09-29 11:06:03
 *
 */
public class LogMethodBusiness {
	
	LogMethodManager manager = new LogMethodManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(LogMethod logmethod){
		return manager.doSave(logmethod);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(LogMethod logmethod){
		return manager.doUpdate(logmethod);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public LogMethod doFindBeanByKey(String keyValue){
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