package com.linewell.core.appattr;

import java.util.List;


/**
 * <p>
 *  业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-06-18 13:14:44
 *
 */
public class AppAttrBusiness {
	
	AppAttrManager manager = new AppAttrManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(AppAttr appattr){
		return manager.doSave(appattr);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(AppAttr appattr){
		return manager.doUpdate(appattr);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public AppAttr doFindBeanByKey(String keyValue){
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