package com.linewell.core.sequence;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;

public class CoreCoreSequenceManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_CORESEQUENCE","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(CoreCoreSequence coreSequence){
		return dbObjectManager.doSave(coreSequence);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(CoreCoreSequence coreSequence){
		if(null == doFindBeanByKey(coreSequence.getUnid())) {
			return dbObjectManager.doSave(coreSequence);
		}
		return dbObjectManager.doUpdate(coreSequence);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public CoreCoreSequence doFindBeanByKey(String keyValue){
		return (CoreCoreSequence)dbObjectManager.doFindBeanByKey(new CoreCoreSequence(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new CoreCoreSequence(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public CoreCoreSequence doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (CoreCoreSequence)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
}
