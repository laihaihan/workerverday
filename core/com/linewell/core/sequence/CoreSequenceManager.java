package com.linewell.core.sequence;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 * 流水号模式数据库操作
 * </p>
 * 
 * @author:陈炳灿 email:cbingcan@linewell.com
 * @version 1.0.0 2012-09-04 14:24:36
 *
 */
public class CoreSequenceManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_SEQUENCE","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(CoreSequence ZhbgSequence){
		return dbObjectManager.doSave(ZhbgSequence);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(CoreSequence ZhbgSequence){
		if(null == doFindBeanByKey(ZhbgSequence.getUnid())) {
			return dbObjectManager.doSave(ZhbgSequence);
		}
		return dbObjectManager.doUpdate(ZhbgSequence);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public CoreSequence doFindBeanByKey(String keyValue){
		return (CoreSequence)dbObjectManager.doFindBeanByKey(new CoreSequence(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new CoreSequence(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public CoreSequence doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (CoreSequence)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
}