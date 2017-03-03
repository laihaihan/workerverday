package com.linewell.work.worklog;

import java.util.List;


/**
 * <p>
 *  工作日志业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2014-03-20 17:50:09
 *
 */
public class WorkLogBusiness {
	
	WorkLogManager manager = new WorkLogManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(WorkLog worklog){
		return manager.doSave(worklog);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(WorkLog worklog){
		return manager.doUpdate(worklog);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public WorkLog doFindBeanByKey(String keyValue){
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