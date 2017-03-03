package com.linewell.core.ucap.app;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  数据库操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-08-16 16:48:34
 *
 */
class UcapAppManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_APP","unid",GlobalParameter.APP_UCAP);
	
	/**
	 * 新增
	 */
	public boolean doSave(UcapApp ucapapp){
		return dbObjectManager.doSave(ucapapp);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UcapApp ucapapp){
		return dbObjectManager.doUpdate(ucapapp);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public UcapApp doFindBeanByKey(String keyValue){
		Object[] objs = new Object[1];
		objs[0] = keyValue;
		return doFindBeanByCondition("unid =?",objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public UcapApp doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (UcapApp)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new UcapApp(),condition,objs);
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