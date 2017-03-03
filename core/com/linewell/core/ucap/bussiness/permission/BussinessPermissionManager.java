package com.linewell.core.ucap.bussiness.permission;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 * 数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-10-10 17:45:45
 *
 */
public class BussinessPermissionManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_BUSSINESS_PERMISSION","BP_UNID",GlobalParameter.APP_UCAP);
	
	/**
	 * 新增
	 */
	public boolean doSave(BussinessPermission bussinessPermission){
		return dbObjectManager.doSave(bussinessPermission);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(BussinessPermission bussinessPermission){
		return dbObjectManager.doUpdate(bussinessPermission);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public BussinessPermission doFindBeanByKey(String keyValue){
		return (BussinessPermission)dbObjectManager.doFindBeanByKey(new BussinessPermission(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new BussinessPermission(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public BussinessPermission doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (BussinessPermission)list.get(0) : null;
	}
	
	/**
	 * 根据主键删除单个对象
	 */
	public boolean doDeleteByKey(String keyValue){
		String condition = "BP_UNID='" + keyValue + "'";
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
}