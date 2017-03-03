package com.linewell.core.flow.flowtest;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  流程测试关联表数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2013-04-08 18:01:59
 *
 */
public class FlowTestManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_FLOW_TEST","UNID","3E2592D5DD95DA5C339C0935F7E9DAA8");
	
	/**
	 * 新增
	 */
	public boolean doSave(FlowTest flowTest){
		return dbObjectManager.doSave(flowTest);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(FlowTest flowTest){
		return dbObjectManager.doUpdate(flowTest);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public FlowTest doFindBeanByKey(String keyValue){
		return (FlowTest)dbObjectManager.doFindBeanByKey(new FlowTest(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public FlowTest doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (FlowTest)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new FlowTest(),condition,objs);
	}
	
	/**
	 * 根据主键删除单个对象
	 */
	public boolean doDeleteByKey(String keyValue){
		String condition = "UNID='" + keyValue + "'";
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
}