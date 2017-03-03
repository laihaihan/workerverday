package com.linewell.core.ucap.deptrelation;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;

/**
 * <p>用户信息</p>
 * @email lfunian@linewell.com
 * @date Sep 26, 2013
 * @version 1.0  
 */
public class UcapDeptRelationManager {
	private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_DEPT_RELATION","UNID",GlobalParameter.APP_UCAP);
	/**
	 * 新增
	 */
	public boolean doSave(UcapDeptRelation ucapDeptRelation){
		return dbObjectManager.doSave(ucapDeptRelation);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UcapDeptRelation ucapDeptRelation){
		return dbObjectManager.doUpdate(ucapDeptRelation);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public UcapDeptRelation doFindBeanByKey(String keyValue){
		return (UcapDeptRelation)dbObjectManager.doFindBeanByKey(new UcapDeptRelation(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new UcapDeptRelation(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public UcapDeptRelation doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (UcapDeptRelation)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
}
