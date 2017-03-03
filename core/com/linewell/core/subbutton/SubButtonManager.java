package com.linewell.core.subbutton;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 * SubButton数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-02-09 16:56:56
 *
 */
public class SubButtonManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_SUB_BUTTON","sub_unid",GlobalParameter.APP_CORE);
	/**
	 * 新增
	 */
	public boolean doSave(SubButton subButton){
		return dbObjectManager.doSave(subButton);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(SubButton subButton){
		return dbObjectManager.doUpdate(subButton);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public SubButton doFindBeanByKey(String keyValue){
		return (SubButton)dbObjectManager.doFindBeanByKey(new SubButton(), keyValue);
	}

	
	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new SubButton(),condition,objs);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
}
