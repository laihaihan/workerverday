package com.linewell.core.jstc.frecon;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  联系人数据库操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2014-08-05 15:52:31
 *
 */
class UserJsxtContanctsManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("gzhb_lianxiren","unid","DC7DDA0F25A3AE3AC8CCA148FF48B64B");
	
	/**
	 * 新增
	 */
	public boolean doSave(UserJsxtContancts userjsxtcontancts){
		return dbObjectManager.doSave(userjsxtcontancts);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UserJsxtContancts userjsxtcontancts){
		return dbObjectManager.doUpdate(userjsxtcontancts);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public UserJsxtContancts doFindBeanByKey(String keyValue){
		Object[] objs = new Object[1];
		objs[0] = keyValue;
		return doFindBeanByCondition("unid =?",objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public UserJsxtContancts doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (UserJsxtContancts)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new UserJsxtContancts(),condition,objs);
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