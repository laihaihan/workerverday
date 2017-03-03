package com.linewell.staffSys;

import java.util.List;


/**
 * <p>
 *  员工入职单业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2016-08-01 16:55:45
 *
 */
public class staffBusiness {
	
	staffManager manager = new staffManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(staff staff){
		return manager.doSave(staff);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(staff staff){
		return manager.doUpdate(staff);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public staff doFindBeanByKey(String keyValue){
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