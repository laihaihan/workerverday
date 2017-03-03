package com.linewell.core.dict;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;


/**
 * <p>
 * ApasDict数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2011-10-12 09:17:10
 *
 */
public class ApasDictManager {

	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_DICT","UNID",GlobalParameter.APP_CORE);

	/**
	 * 新增
	 */
	public boolean doSave(ApasDict apasDict){
		return dbObjectManager.doSave(apasDict);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(ApasDict apasDict){
		return dbObjectManager.doUpdate(apasDict);
	}
	
		
	/**
	 * 删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	
	/**
	 * 根据主键查找单个对象
	 */
	public ApasDict doFindBeanByKey(String keyValue){
		return (ApasDict)dbObjectManager.doFindBeanByKey(new ApasDict(), keyValue);
	}

	
	/**
	 * 根据主键查找单个对象
	 */
	public ApasDict doFindByCondition(String condition,Object[] params){
		return (ApasDict)dbObjectManager.doFindBeanByCondition(new ApasDict(), condition);
	}

	
	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] params){
		return dbObjectManager.doFindListByCondition(new ApasDict(), condition,params);
	}
	
	/**
	 * 根据字典类型查询
	 * @param dicttype
	 * @return
	 */
	public List doFindByType(String dicttype){
		return this.doFindListByCondition("dicttype='"+dicttype+"' order by sortid", null);
	}
}