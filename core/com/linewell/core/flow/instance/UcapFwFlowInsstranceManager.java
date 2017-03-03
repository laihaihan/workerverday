package com.linewell.core.flow.instance;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2013-04-10 10:12:14
 *
 */
public class UcapFwFlowInsstranceManager {

	
	
	private String nowAppUnid = "";
	
	private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_FW_FLOW_INSTANCE","INSTANCE_UNID","3E2592D5DD95DA5C339C0935F7E9DAA8");
	public UcapFwFlowInsstranceManager(String appUnid){
		nowAppUnid= appUnid;
		dbObjectManager = new DbObjectManager("UCAP_FW_FLOW_INSTANCE","INSTANCE_UNID",nowAppUnid);
	}
	
	
	/**
	 * 新增
	 */
	public boolean doSave(UcapFwFlowInsstrance ucapFwFlowInsstrance){
		return dbObjectManager.doSave(ucapFwFlowInsstrance);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(UcapFwFlowInsstrance ucapFwFlowInsstrance){
		return dbObjectManager.doUpdate(ucapFwFlowInsstrance);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public UcapFwFlowInsstrance doFindBeanByKey(String keyValue){
		return (UcapFwFlowInsstrance)dbObjectManager.doFindBeanByKey(new UcapFwFlowInsstrance(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public UcapFwFlowInsstrance doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (UcapFwFlowInsstrance)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new UcapFwFlowInsstrance(),condition,objs);
	}
	
	/**
	 * 根据主键删除单个对象
	 */
	public boolean doDeleteByKey(String keyValue){
		String condition = "INSTANCE_UNID='" + keyValue + "'";
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}


	public UcapFwFlowInsstranceManager() {
		super();
	}
}