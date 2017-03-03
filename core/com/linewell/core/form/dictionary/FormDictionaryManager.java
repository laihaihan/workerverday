package com.linewell.core.form.dictionary;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 * 数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-07-27 17:09:10
 *
 */
public class FormDictionaryManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("FORM_DICTIONARY","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(FormDictionary formDictionary){
		return dbObjectManager.doSave(formDictionary);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(FormDictionary formDictionary){
		return dbObjectManager.doUpdate(formDictionary);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public FormDictionary doFindBeanByKey(String keyValue){
		return (FormDictionary)dbObjectManager.doFindBeanByKey(new FormDictionary(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new FormDictionary(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public FormDictionary doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (FormDictionary)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
}