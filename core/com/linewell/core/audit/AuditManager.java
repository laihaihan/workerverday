package com.linewell.core.audit;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  审计管理表数据库操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-09-24 17:12:03
 *
 */
class AuditManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("LOG_AUDIT","unid","A8504E156D1098E5E32209875D3B8D43");
	
	/**
	 * 新增
	 */
	public boolean doSave(Audit audit){
		return dbObjectManager.doSave(audit);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Audit audit){
		return dbObjectManager.doUpdate(audit);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public Audit doFindBeanByKey(String keyValue){
		Object[] objs = new Object[1];
		objs[0] = keyValue;
		return doFindBeanByCondition("unid =?",objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public Audit doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (Audit)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new Audit(),condition,objs);
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