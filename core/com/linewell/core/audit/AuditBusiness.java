package com.linewell.core.audit;

import java.util.List;


/**
 * <p>
 *  审计管理表业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-09-24 17:12:03
 *
 */
public class AuditBusiness {
	
	AuditManager manager = new AuditManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(Audit audit){
		return manager.doSave(audit);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Audit audit){
		return manager.doUpdate(audit);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public Audit doFindBeanByKey(String keyValue){
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