﻿package com.linewell.altest.xinzenghuibao;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  工作汇报数据库操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-07-16 11:53:46
 *
 */
class XinzenghuibaoManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("DW_WORKREPORT","unid","DC7DDA0F25A3AE3AC8CCA148FF48B64B");
	
	/**
	 * 新增
	 */
	public boolean doSave(Xinzenghuibao xinzenghuibao){
		return dbObjectManager.doSave(xinzenghuibao);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Xinzenghuibao xinzenghuibao){
		return dbObjectManager.doUpdate(xinzenghuibao);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public Xinzenghuibao doFindBeanByKey(String keyValue){
		Object[] objs = new Object[1];
		objs[0] = keyValue;
		return doFindBeanByCondition("unid =?",objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public Xinzenghuibao doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (Xinzenghuibao)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new Xinzenghuibao(),condition,objs);
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