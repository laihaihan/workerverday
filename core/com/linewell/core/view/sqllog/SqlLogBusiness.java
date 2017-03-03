package com.linewell.core.view.sqllog;

import java.util.List;

import com.linewell.core.util.DateTime;
import com.linewell.core.util.DateUtil;
import com.linewell.core.util.UNIDGenerate;

import net.sf.json.JSONObject;

/**
 * <p>视图SQL语句日志</P>
 * @author lfunian@linewell.com
 * @date Aug 13, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
public class SqlLogBusiness {
	SqlLogManager manager = new SqlLogManager();
	/**
	 * 新增
	 */
	public boolean doSave(SqlLog sqlLog){
		return manager.doSave(sqlLog);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(SqlLog sqlLog){
		return manager.doUpdate(sqlLog);
	}
		
	/**
	 * 根据主键删除
	 */
	public boolean doDeleteByKey(String keyValue){
		return manager.doDeleteByCondition("BUTTON_UNID='"+keyValue+"'");
	}
		
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return manager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据主键查找单个对象
	 */
	public SqlLog doFindBeanByKey(String keyValue){
		return (SqlLog)manager.doFindBeanByKey(keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] params){
		return manager.doFindListByCondition(condition, params);
	}
	
	/**
	 * <p>根据应用系统unid与视图unid获取视图sql历史信息</p>
	 * @param appUnid 应用系统unid
	 * @param viewUnid 视图unid
	 * @return List sql历史记录集合
	 */
	public List doFindListByAppUnidAndViewUnid(String appUnid, String viewUnid){
		String condition = "app_unid = ? and view_unid = ? order by createtime desc";
		return manager.doFindListByCondition(condition, new Object[]{appUnid, viewUnid});
	}

	/**
	 * 新增
	 */
	public boolean doSaveByJson(String sqlLog){
		boolean result = false;
		try {
			JSONObject jsonObject = JSONObject.fromObject(sqlLog);
			if (jsonObject != null) {
				SqlLog log = (SqlLog)jsonObject.toBean(jsonObject, SqlLog.class);
				if (log != null) {
					log.setUnid(new UNIDGenerate().getUnid());
					log.setCreatetime(DateTime.getNowDateTime());
					result = manager.doSave(log);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return result;
		}
		return result;
	}
}
