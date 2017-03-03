package com.linewell.core.buildermodule.detail;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  快速建模-字段详细信息数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2013-04-17 16:41:48
 *
 */
public class BuilderModuleDetailManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_BUILDERMODULE_DETAIL","UNID","3E2592D5DD95DA5C339C0935F7E9DAA8");
	
	/**
	 * 新增
	 */
	public boolean doSave(BuilderModuleDetail builderModuleDetail){
		return dbObjectManager.doSave(builderModuleDetail);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(BuilderModuleDetail builderModuleDetail){
		return dbObjectManager.doUpdate(builderModuleDetail);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public BuilderModuleDetail doFindBeanByKey(String keyValue){
		return (BuilderModuleDetail)dbObjectManager.doFindBeanByKey(new BuilderModuleDetail(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public BuilderModuleDetail doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (BuilderModuleDetail)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new BuilderModuleDetail(),condition,objs);
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