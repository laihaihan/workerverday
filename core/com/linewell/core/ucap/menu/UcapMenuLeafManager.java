package com.linewell.core.ucap.menu;

import java.util.List;

import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  数据库操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-07-31 11:55:00
 *
 */
class UcapMenuLeafManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_MENU_LEAF","leaf_unid","proxool");
	
	/**
	 * 新增
	 */
	public boolean doSave(UcapMenuLeaf ucapmenuleaf){
		return dbObjectManager.doSave(ucapmenuleaf);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UcapMenuLeaf ucapmenuleaf){
		return dbObjectManager.doUpdate(ucapmenuleaf);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public UcapMenuLeaf doFindBeanByKey(String keyValue){
		Object[] objs = new Object[1];
		objs[0] = keyValue;
		return doFindBeanByCondition("leaf_unid =?",objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public UcapMenuLeaf doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (UcapMenuLeaf)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new UcapMenuLeaf(),condition,objs);
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