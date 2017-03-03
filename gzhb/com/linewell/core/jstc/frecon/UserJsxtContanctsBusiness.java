package com.linewell.core.jstc.frecon;

import java.util.List;


/**
 * <p>
 *  联系人业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2014-08-05 15:52:31
 *
 */
public class UserJsxtContanctsBusiness {
	
	UserJsxtContanctsManager manager = new UserJsxtContanctsManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(UserJsxtContancts userjsxtcontancts){
		return manager.doSave(userjsxtcontancts);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UserJsxtContancts userjsxtcontancts){
		return manager.doUpdate(userjsxtcontancts);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public UserJsxtContancts doFindBeanByKey(String keyValue){
		return manager.doFindBeanByKey(keyValue);
	}
	
	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return manager.doFindListByCondition(condition,objs);
	}
	
		
	/**
	 * 根据主键删除对象
	 */
	public boolean doDeleteByCondition(String condition,Object[] objs){
		return manager.doDeleteByCondition(condition,objs);
	}
}