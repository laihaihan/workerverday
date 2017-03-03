package com.linewell.core.ucap.app;

import java.util.List;


/**
 * <p>
 *  业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-08-16 16:48:34
 *
 */
public class UcapAppBusiness {
	
	UcapAppManager manager = new UcapAppManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(UcapApp ucapapp){
		return manager.doSave(ucapapp);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UcapApp ucapapp){
		return manager.doUpdate(ucapapp);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public UcapApp doFindBeanByKey(String keyValue){
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
	
	
	/**
	 * 自定义条件查询对象列表
	 */
	public List<UcapApp> getAllApp(){
		Object[] objs = new Object[1];
		objs[0] = "475C4D7E257F5EAF7CCDF46AE0FE35BD";
		List<UcapApp> appList = doFindListByCondition(" app_unid<>?",objs);
		return appList;
	}
	
}