package com.linewell.core.ucap.flow.log;

import java.util.List;

import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  数据库操作
 * </p>
 * 
 * @author:zjianhui email:qcongyong@linewell.com
 * @version 1.0.0 2012-12-14 17:45:32
 *
 */
public class FlowLogManager {

	private DbObjectManager dbObjectManager = null;

	public FlowLogManager(String app_unid){
		dbObjectManager = new DbObjectManager("UCAP_FW_LOG","LOG_UNID",app_unid);
	}
	
	/**
	 * 新增
	 */
	public boolean doSave(FlowLog flowLog){
		return dbObjectManager.doSave(flowLog);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(FlowLog flowLog){
		return dbObjectManager.doUpdate(flowLog);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public FlowLog doFindBeanByKey(String keyValue){
		return (FlowLog)dbObjectManager.doFindBeanByKey(new FlowLog(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public FlowLog doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (FlowLog)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new FlowLog(),condition,objs);
	}
	
	/**
	 * 根据主键删除单个对象
	 */
	public boolean doDeleteByKey(String keyValue){
		String condition = "LOG_UNID='" + keyValue + "'";
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 获取指定文档的所有流转日志
	 * 
	 * @param docUnid
	 * @return
	 */
	public List doFindByDocUnid(String docUnid){
		String condition = "log_doc_id='"+docUnid+"' order by log_begin_time";
		return this.doFindListByCondition(condition, null);
		
	}
}