package com.linewell.core.opinion;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.DateTime;
import com.linewell.core.util.UNIDGenerate;

/**
 * <p>
 * ApasOpinion数据库操作
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-04-09 16:36:10
 *
 */
public class OpinionManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_OPINION","UNID",GlobalParameter.APP_CORE);
	/**
	 * 新增
	 */
	public boolean doSave(Opinion opinion){
		return dbObjectManager.doSave(opinion);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Opinion opinion){
		return dbObjectManager.doUpdate(opinion);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public Opinion doFindBeanByKey(String keyValue){
		return (Opinion)dbObjectManager.doFindBeanByKey(new Opinion(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public Opinion doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (Opinion)list.get(0) : null;
	}
	
	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new Opinion(),condition,objs);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 添加意见
	 * 
	 * @param punid			外键关联apas_info.unid
	 * @param body			意见内容
	 * @param type			意见类型
	 * @param author		意见填写人员
	 * @param node_name		节点名称
	 * @return
	 */
	public boolean doSave(String punid,String body,String type,String author,String node_name,String logid){
		Opinion opinion = new Opinion();
		opinion.setUnid(new UNIDGenerate().getUnid());
		opinion.setPunid(punid);
		
		System.out.print(type);
		
		opinion.setBody(body);
		opinion.setType(type);
		opinion.setAuthor(author);
		opinion.setNode_name(node_name);
		opinion.setModified(DateTime.getNowDateTime());
		opinion.setLogid(logid);
		return this.doSave(opinion);
	}
	
	/**
	 * 添加意见-重载
	 * @param unid			UNID
	 * @param punid			外键关联apas_info.unid
	 * @param body			意见内容
	 * @param type			意见类型
	 * @param author		意见填写人员
	 * @param node_name		节点名称
	 * @return
	 */
	public boolean doSave(String unid,String punid,String body,String type,String author,String node_name,String logid){
		Opinion opinion = new Opinion();
		opinion.setUnid(unid);
		opinion.setPunid(punid);
		opinion.setBody(body);
		System.out.print(type);
		opinion.setType(type);
		opinion.setAuthor(author);
		opinion.setNode_name(node_name);
		opinion.setModified(DateTime.getNowDateTime());
		opinion.setLogid(logid);
		return this.doSave(opinion);
	}
	
	/**
	 * 添加意见
	 * 
	 * @param punid			外键关联apas_info.unid
	 * @param body			意见内容
	 * @param type			意见类型
	 * @param author		意见填写人员
	 * @param node_name		节点名称
	 * @param modified		修改时间
	 * @param logid			日志关联ID
	 * @return
	 */
	public boolean doSaveByModified(String punid,String body,String type,String author,String node_name,String modified,String logid){
		Opinion opinion = new Opinion();
		opinion.setUnid(new UNIDGenerate().getUnid());
		opinion.setPunid(punid);
		opinion.setBody(body);
		
		System.out.print(type);
		opinion.setType(type);
		opinion.setAuthor(author);
		opinion.setNode_name(node_name);
		opinion.setModified(modified);
		opinion.setLogid(logid);
		return this.doSave(opinion);
	}
	
	
	
	
}
