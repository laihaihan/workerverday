package com.linewell.core.ucap.userrelation;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;

/**
 * <p>用户信息</p>
 * @email lfunian@linewell.com
 * @date Sep 26, 2013
 * @version 1.0  
 */
public class UserRelationManager {
	private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_USER_RELATION","UNID",GlobalParameter.APP_UCAP);
	/**
	 * 新增
	 */
	public boolean doSave(UserRelation userRelation){
		return dbObjectManager.doSave(userRelation);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UserRelation userRelation){
		return dbObjectManager.doUpdate(userRelation);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public UserRelation doFindBeanByKey(String keyValue){
		return (UserRelation)dbObjectManager.doFindBeanByKey(new UserRelation(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new UserRelation(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public UserRelation doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (UserRelation)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
}
