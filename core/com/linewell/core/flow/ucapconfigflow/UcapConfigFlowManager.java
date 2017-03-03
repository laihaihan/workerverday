package com.linewell.core.flow.ucapconfigflow;

import java.util.List;

import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2013-04-08 15:25:24
 *
 */
public class UcapConfigFlowManager {
	private String nowAppUnid = "";

	private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_CONFIG_FLOW","FLOW_UNID",nowAppUnid);
	/**
	 * 构造函数，指定流程所属系统
	 * @param appUnid 系统id
	 */
	public UcapConfigFlowManager(String appUnid){
		nowAppUnid = appUnid;
		dbObjectManager = new DbObjectManager("UCAP_CONFIG_FLOW","FLOW_UNID",nowAppUnid);
	}
	
	
	/**
	 * 新增
	 */
	public boolean doSave(UcapConfigFlow ucapConfigFlow){
		return dbObjectManager.doSave(ucapConfigFlow);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UcapConfigFlow ucapConfigFlow){
		return dbObjectManager.doUpdate(ucapConfigFlow);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public UcapConfigFlow doFindBeanByKey(String keyValue){
		return (UcapConfigFlow)dbObjectManager.doFindBeanByKey(new UcapConfigFlow(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public UcapConfigFlow doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (UcapConfigFlow)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new UcapConfigFlow(),condition,objs);
	}
	
	/**
	 * 根据主键删除单个对象
	 */
	public boolean doDeleteByKey(String keyValue){
		String condition = "FLOW_UNID='" + keyValue + "'";
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
}