package com.linewell.core.task.taskscheduling;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 * 任务调度配置中心数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-05-29 09:14:58
 *
 */
public class TaskSchedulingManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_TASK_SCHEDULING","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(TaskScheduling taskScheduling){
		return dbObjectManager.doSave(taskScheduling);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(TaskScheduling taskScheduling){
		return dbObjectManager.doUpdate(taskScheduling);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public TaskScheduling doFindBeanByKey(String keyValue){
		return (TaskScheduling)dbObjectManager.doFindBeanByKey(new TaskScheduling(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new TaskScheduling(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public TaskScheduling doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (TaskScheduling)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
}