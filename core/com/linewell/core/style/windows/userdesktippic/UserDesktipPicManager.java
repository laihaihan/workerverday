package com.linewell.core.style.windows.userdesktippic;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-12-12 11:27:01
 *
 */
public class UserDesktipPicManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_WIN7STYLE_USERDESKTOPPIC","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(UserDesktipPic userDesktipPic){
		return dbObjectManager.doSave(userDesktipPic);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UserDesktipPic userDesktipPic){
		return dbObjectManager.doUpdate(userDesktipPic);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public UserDesktipPic doFindBeanByKey(String keyValue){
		return (UserDesktipPic)dbObjectManager.doFindBeanByKey(new UserDesktipPic(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public UserDesktipPic doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (UserDesktipPic)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new UserDesktipPic(),condition,objs);
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