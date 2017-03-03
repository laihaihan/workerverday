package com.linewell.core.button;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;

/**
 * <p>视图按钮</P>
 * @author lfunian@linewell.com
 * @date Sep 2, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
public class ButtonManager {
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_BUTTON","BUTTON_UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(Button button){
		return dbObjectManager.doSave(button);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Button button){
		return dbObjectManager.doUpdate(button);
	}
		
	/**
	 * 根据主键删除
	 */
	public boolean doDeleteByKey(String keyValue){
		return dbObjectManager.doDeleteByCondition("BUTTON_UNID='"+keyValue+"'");
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
	public Button doFindBeanByKey(String keyValue){
		return (Button)dbObjectManager.doFindBeanByKey(new Button(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] params){
		return dbObjectManager.doFindListByCondition(new Button(), condition, params);
	}
}
