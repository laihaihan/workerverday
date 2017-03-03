package com.linewell.core.weekset;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;

/**
 * <p>
 *     节假日信息的数据库操作
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 24, 2012
 * @version 1.0  
 */
public class WeekSetManager {

	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_WEEKSET","UNID",GlobalParameter.APP_CORE);

	/**
	 * 新增
	 */
	public boolean doSave(WeekSet weekSet){
		return dbObjectManager.doSave(weekSet);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(WeekSet weekSet){
		return dbObjectManager.doUpdate(weekSet);
	}
		
	/**
	 * 根据主键删除
	 */
	public boolean doDeleteByKey(String keyValue){
		return dbObjectManager.doDeleteByCondition("UNID='"+keyValue+"'");
	}
		
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据主键查找单个对象
	 */
	public WeekSet doFindBeanByKey(String keyValue){
		return (WeekSet)dbObjectManager.doFindBeanByKey(new WeekSet(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] params){
		return dbObjectManager.doFindListByCondition(new WeekSet(), condition, params);
	}
}