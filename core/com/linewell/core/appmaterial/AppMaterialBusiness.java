package com.linewell.core.appmaterial;

import java.util.List;


/**
 * <p>
 *  新增材料列表业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-06-18 16:03:58
 *
 */
public class AppMaterialBusiness {
	
	AppMaterialManager manager = new AppMaterialManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(AppMaterial appmaterial){
		return manager.doSave(appmaterial);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(AppMaterial appmaterial){
		return manager.doUpdate(appmaterial);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public AppMaterial doFindBeanByKey(String keyValue){
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