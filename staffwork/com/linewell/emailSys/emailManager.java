package com.linewell.emailSys;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  数据库操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2016-07-19 11:59:13
 *
 */
public class emailManager {

	
	private DbObjectManager dbObjectManager = new DbObjectManager("email","unid","30EF67ADD53C9554DB99D2039CC94D68");
	
	/**
	 * 新增
	 */
	public boolean doSave(email email){
		return dbObjectManager.doSave(email);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(email email){
		return dbObjectManager.doUpdate(email);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public email doFindBeanByKey(String keyValue){
		Object[] objs = new Object[1];
		objs[0] = keyValue;
		return doFindBeanByCondition("unid =?",objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public email doFindBeanByCondition(String condition,Object[] objs){
		List<?> list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (email)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new email(),condition,objs);
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
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByBelong(String belong){
		String condition = "belongto=?";
		return dbObjectManager.doDeleteByCondition(condition,new Object[]{belong});
	}
	
	public List doFindListByBelong(String belong){
		String condition = "belongto=?";
		return dbObjectManager.doFindListByCondition(new email(),condition,new Object[]{belong});
	}

}
