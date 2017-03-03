package com.linewell.altest.yonghubiaodan;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  用户表单数据库操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-08-01 19:01:37
 *
 */
class YonghubiaodanManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("altest_yonghubiaodan","unid","DC7DDA0F25A3AE3AC8CCA148FF48B64B");
	
	/**
	 * 新增
	 */
	public boolean doSave(Yonghubiaodan yonghubiaodan){
		return dbObjectManager.doSave(yonghubiaodan);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Yonghubiaodan yonghubiaodan){
		return dbObjectManager.doUpdate(yonghubiaodan);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public Yonghubiaodan doFindBeanByKey(String keyValue){
		Object[] objs = new Object[1];
		objs[0] = keyValue;
		return doFindBeanByCondition("unid =?",objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public Yonghubiaodan doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (Yonghubiaodan)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new Yonghubiaodan(),condition,objs);
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