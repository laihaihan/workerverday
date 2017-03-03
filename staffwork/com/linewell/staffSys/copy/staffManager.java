package com.linewell.staffSys.copy;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  员工入职单数据库操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2016-08-01 16:55:45
 *
 */
class staffManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("staffwork_yuangongruzhidan","unid","30EF67ADD53C9554DB99D2039CC94D68");
	
	/**
	 * 新增
	 */
	public boolean doSave(staff staff){
		return dbObjectManager.doSave(staff);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(staff staff){
		return dbObjectManager.doUpdate(staff);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public staff doFindBeanByKey(String keyValue){
		Object[] objs = new Object[1];
		objs[0] = keyValue;
		return doFindBeanByCondition("unid =?",objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public staff doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (staff)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new staff(),condition,objs);
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