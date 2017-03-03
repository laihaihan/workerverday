package com.linewell.core.ucap.flow.opinion;

import java.util.List;

import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  数据库操作
 * </p>
 * 
 * @author:zjianhui email:qcongyong@linewell.com
 * @version 1.0.0 2012-12-14 17:49:30
 *
 */
public class FlowOpinionManager {

	private DbObjectManager dbObjectManager = null;

	public FlowOpinionManager(String app_unid){
		dbObjectManager = new DbObjectManager("UCAP_FW_OPINION","OPINION_UNID",app_unid);
	}
	
	/**
	 * 新增
	 */
	public boolean doSave(FlowOpinion flowOpinion){
		return dbObjectManager.doSave(flowOpinion);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(FlowOpinion flowOpinion){
		return dbObjectManager.doUpdate(flowOpinion);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public FlowOpinion doFindBeanByKey(String keyValue){
		return (FlowOpinion)dbObjectManager.doFindBeanByKey(new FlowOpinion(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public FlowOpinion doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (FlowOpinion)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new FlowOpinion(),condition,objs);
	}
	
	/**
	 * 根据主键删除单个对象
	 */
	public boolean doDeleteByKey(String keyValue){
		String condition = "OPINION_UNID='" + keyValue + "'";
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 获取指定文档的所有审批意见
	 * 
	 * @param docUnid
	 * @return
	 */
	public List doFindByDocUnid(String docUnid){
		String condition = "opinion_doc_id='"+docUnid+"' order by opinion_transact_time";
		return this.doFindListByCondition(condition, null);
		
	}
}