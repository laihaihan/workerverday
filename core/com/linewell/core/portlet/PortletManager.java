package com.linewell.core.portlet;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.db.JDBCTool;
import com.linewell.core.system.GlobalParameter;

/**
 * <p>
 * Portlet数据库操作
 * </p>
 * 
 * @author:linewell email:linewell@linewell.com
 * @version 1.0.0 2012-03-31 09:48:46
 *
 */
public class PortletManager {
    private static final Logger logger = Logger.getLogger(PortletManager.class);
	
	private String JNDI = GlobalParameter.APP_CORE;
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_PORTLET","PORTLET_UNID",JNDI);
	
	/**
	 * 新增
	 */
	public boolean doSave(Portlet portlet){
		return dbObjectManager.doSave(portlet);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Portlet portlet){
		return dbObjectManager.doUpdate(portlet);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public Portlet doFindBeanByKey(String keyValue){
		return (Portlet)dbObjectManager.doFindBeanByKey(new Portlet(), keyValue);
	}

	
	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new Portlet(),condition,objs);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	public List<Portlet> getPortletList(){
		List<Portlet> portletList = new ArrayList<Portlet>();
		
		portletList = dbObjectManager.doFindListByCondition(new Portlet(),"",new Object[0]);
		
		return portletList;
	}
	
	
	/**
	 * 获取列表
	 * @return
	 */
	public List<Portlet> getViewPortletList(){
		List<Portlet> portletList = new ArrayList<Portlet>();		
		portletList = dbObjectManager.doFindListByCondition(new Portlet(),"portlet_Type='0'",new Object[0]);		
		return portletList;
	}
	
	/**
	 * 获取固定组件
	 * @return
	 */
	public List<Portlet> getModulePortletList(){
		List<Portlet> portletList = new ArrayList<Portlet>();		
		portletList = dbObjectManager.doFindListByCondition(new Portlet(),"portlet_Type='0'",new Object[0]);		
		return portletList;
	}
	
	/**
	 * 获取已配置组件
	 * @return
	 */
	public Map<String, List<Portlet>> getChoosePortletList(String roleId){
		Map<String, List<Portlet>> result = new HashMap<String, List<Portlet>>();
		try {
			String leftSql = "select t.portlet_unid from core_portlet_role t where t.role_unid='"+roleId+"' and t.sort<200 order by t.sort";
			String[][] leftArray = JDBCTool.doSQLQuery(this.JNDI,leftSql);
			if (leftArray.length>1) {
				String portletIds = "";
				for (int i = 1; i < leftArray.length; i++) {
					portletIds +="'"+leftArray[i][0]+"',";
				}
				portletIds = StringUtils.substringBeforeLast(portletIds, ",");
				result.put("left",dbObjectManager.doFindListByCondition(new Portlet(),"portlet_unid in ("+portletIds+")",new Object[0]));
			}
			String rightSql = "select t.portlet_unid from core_portlet_role t where t.role_unid='"+roleId+"' and t.sort>=200 order by t.sort";
			String[][] rightArray = JDBCTool.doSQLQuery(this.JNDI,rightSql);
			if (rightArray.length>1) {
				String portletIds = "";
				for (int i = 1; i < rightArray.length; i++) {
					portletIds +="'"+rightArray[i][0]+"',";
				}
				portletIds = StringUtils.substringBeforeLast(portletIds, ",");
				result.put("right",dbObjectManager.doFindListByCondition(new Portlet(),"portlet_unid in ("+portletIds+")",new Object[0]));
			}
		} catch (SQLException e) {
		    logger.error(e);
		}		
		return result;
	}
	
	public void deletePortletRelation(String roleId){
		String sql = "delete core_portlet_role t where t.role_unid='"+roleId+"'";
		try {
			JDBCTool.doSQLUpdate(this.JNDI, sql,new Object[0]);
		} catch (SQLException e) {
		    logger.error(e);
		}
	}
	
	public void addPortletRelation(String portlet,String roleId){
		String[] columns = portlet.split(";");
		for (int i = 0; i < columns.length; i++) {
			if (columns[i] == null && columns[i].length() == 0) {
				continue;
			}
			String[] portlets = columns[i].split(",");
			for (int j = 0; j < portlets.length; j++) {
				String sql = "insert into core_portlet_role(portlet_unid,role_unid,sort) values ('"+portlets[j]+"','"+roleId+"',"+((i+1)*100+j)+")";
				try {
					JDBCTool.doSQLUpdate(this.JNDI, sql,new Object[0]);
				} catch (SQLException e) {
				    logger.error(e);
				}
			}
		}
		/*
		for (int i = 0; i < portlet.length; i++) {
			String sql = "insert into core_portlet_role(portlet_unid,role_unid,sort) values ('"+portlet[i]+"','"+roleId+"',"+i+")";
			try {
				JDBCTool.doSQLUpdate(sql);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}*/
	}
}
