package com.linewell.core.appattr;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  数据库操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-06-18 13:14:44
 *
 */
class AppAttrManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("APP_ATTR","unid","3E2592D5DD95DA5C339C0935F7E9DAA8");
	
	/**
	 * 新增
	 */
	public boolean doSave(AppAttr appattr){
		return dbObjectManager.doSave(appattr);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(AppAttr appattr){
		return dbObjectManager.doUpdate(appattr);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public AppAttr doFindBeanByKey(String keyValue){
		Object[] objs = new Object[1];
		objs[0] = keyValue;
		return doFindBeanByCondition("unid =?",objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public AppAttr doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (AppAttr)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new AppAttr(),condition,objs);
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