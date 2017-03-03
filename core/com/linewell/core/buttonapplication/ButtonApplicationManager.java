package com.linewell.core.buttonapplication;

import java.util.List;
import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.buttonapplication.ButtonApplication;

/**
 * <p>应用按钮</P>
 * @author lfunian@linewell.com
 * @date July 30, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
public class ButtonApplicationManager {
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_BUTTON_APPLICATION","BUTTON_UNID",GlobalParameter.APP_CORE);
	/**
	 * 新增
	 */
	public boolean doSave(ButtonApplication buttonApplication){
		return dbObjectManager.doSave(buttonApplication);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(ButtonApplication buttonApplication){
		return dbObjectManager.doUpdate(buttonApplication);
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
	public ButtonApplication doFindBeanByKey(String keyValue){
		return (ButtonApplication)dbObjectManager.doFindBeanByKey(new ButtonApplication(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] params){
		return dbObjectManager.doFindListByCondition(new ButtonApplication(), condition, params);
	}
}
