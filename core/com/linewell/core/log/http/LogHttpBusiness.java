package com.linewell.core.log.http;

import java.util.List;


/**
 * <p>
 *  业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-09-29 11:04:41
 *
 */
public class LogHttpBusiness {
	
	LogHttpManager manager = new LogHttpManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(LogHttp loghttp){
		return manager.doSave(loghttp);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(LogHttp loghttp){
		return manager.doUpdate(loghttp);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public LogHttp doFindBeanByKey(String keyValue){
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