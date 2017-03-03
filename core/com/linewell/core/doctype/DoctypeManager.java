package com.linewell.core.doctype;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;

/**
 * <p>
 * 文件类型数据库操作
 * </p>
 * 
 * @author:陈炳灿 email:cbingcan@linewell.com
 * @version 1.0.0 2012-09-04 17:36:26
 *
 */
public class DoctypeManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_DOCTYPE","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(Doctype doctype){
		return dbObjectManager.doSave(doctype);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Doctype doctype){
		return dbObjectManager.doUpdate(doctype);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public Doctype doFindBeanByKey(String keyValue){
		return (Doctype)dbObjectManager.doFindBeanByKey(new Doctype(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new Doctype(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public Doctype doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (Doctype)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	/**
	 * 根据unid查找
	 */
}