package com.linewell.core.treedict;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 * 树形数据字典数据库操作
 * </p>
 * 
 * @author:yq email:yq@linewell.com
 * @version 1.0.0 2012-08-31 14:52:27
 *
 */
public class ApasTreeDictManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("APAS_TREE_DICT","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(ApasTreeDict apasTreeDict){
		return dbObjectManager.doSave(apasTreeDict);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(ApasTreeDict apasTreeDict){
		return dbObjectManager.doUpdate(apasTreeDict);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public ApasTreeDict doFindBeanByKey(String keyValue){
		return (ApasTreeDict)dbObjectManager.doFindBeanByKey(new ApasTreeDict(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new ApasTreeDict(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public ApasTreeDict doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (ApasTreeDict)list.get(0) : null;
	}
	
	/**
	 * 根据主键删除单个对象
	 */
	public boolean doDeleteByKey(String keyValue){
		String condition = "UNID='" + keyValue + "'";
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
}