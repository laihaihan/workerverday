package com.linewell.core.style.windows.usershortcut;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  win7样式用户拥有快捷方式数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-12-13 09:47:46
 *
 */
public class UserShortcutManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_WIN7STYLE_USERSHORTCUT","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(UserShortcut userShortcut){
		return dbObjectManager.doSave(userShortcut);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UserShortcut userShortcut){
		return dbObjectManager.doUpdate(userShortcut);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public UserShortcut doFindBeanByKey(String keyValue){
		return (UserShortcut)dbObjectManager.doFindBeanByKey(new UserShortcut(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public UserShortcut doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (UserShortcut)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List<UserShortcut> doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new UserShortcut(),condition,objs);
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