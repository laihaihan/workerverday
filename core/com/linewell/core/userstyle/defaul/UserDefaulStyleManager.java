﻿package com.linewell.core.userstyle.defaul;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  用户默认样式数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-12-18 17:01:42
 *
 */
public class UserDefaulStyleManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_USER_DEFAULT_STYLE","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(UserDefaulStyle userDefaulStyle){
		return dbObjectManager.doSave(userDefaulStyle);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UserDefaulStyle userDefaulStyle){
		return dbObjectManager.doUpdate(userDefaulStyle);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public UserDefaulStyle doFindBeanByKey(String keyValue){
		return (UserDefaulStyle)dbObjectManager.doFindBeanByKey(new UserDefaulStyle(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public UserDefaulStyle doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (UserDefaulStyle)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new UserDefaulStyle(),condition,objs);
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