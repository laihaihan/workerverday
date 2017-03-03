package com.linewell.core.print.printlodop;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 * UserPrint数据库操作
 * </p>
 * 
 * @author:qcongyong email:qcongyong@linewell.com
 * @version 1.0.0 2012-04-09 15:23:17
 *
 */
public class UserPrintManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("APP_USER_PRINT","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(UserPrint userPrint){
		return dbObjectManager.doSave(userPrint);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UserPrint userPrint){
		return dbObjectManager.doUpdate(userPrint);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public UserPrint doFindBeanByKey(String keyValue){
		return (UserPrint)dbObjectManager.doFindBeanByKey(new UserPrint(), keyValue);
	}
	
	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new UserPrint(),condition,objs);
	}
	
	/**
	 * 根据查询条件查找单个对象
	 */
	public UserPrint doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (UserPrint)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
}