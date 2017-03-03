package com.linewell.altest.yonghubiaodan;

import java.util.List;


/**
 * <p>
 *  用户表单业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-08-01 19:01:37
 *
 */
public class YonghubiaodanBusiness {
	
	YonghubiaodanManager manager = new YonghubiaodanManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(Yonghubiaodan yonghubiaodan){
		return manager.doSave(yonghubiaodan);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Yonghubiaodan yonghubiaodan){
		return manager.doUpdate(yonghubiaodan);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public Yonghubiaodan doFindBeanByKey(String keyValue){
		return manager.doFindBeanByKey(keyValue);
	}
	
	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return manager.doFindListByCondition(condition,objs);
	}
	
		
	/**
	 * 根据主键删除对象
	 */
	public boolean doDeleteByCondition(String condition,Object[] objs){
		return manager.doDeleteByCondition(condition,objs);
	}
}