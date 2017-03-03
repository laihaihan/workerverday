package com.linewell.core.flow.config;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  流程状态表数据库操作
 * </p>
 * 
 * @author:张建辉 email:zjianhui@linewell.com
 * @version 1.0.0 2013-04-08 10:41:45
 *
 */
public class FlowConfigManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_FLOW_CONFIG","UNID","3E2592D5DD95DA5C339C0935F7E9DAA8");
	
	/**
	 * 新增
	 */
	public boolean doSave(FlowConfig flowConfig){
		return dbObjectManager.doSave(flowConfig);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(FlowConfig flowConfig){
		return dbObjectManager.doUpdate(flowConfig);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public FlowConfig doFindBeanByKey(String keyValue){
		return (FlowConfig)dbObjectManager.doFindBeanByKey(new FlowConfig(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public FlowConfig doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (FlowConfig)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new FlowConfig(),condition,objs);
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