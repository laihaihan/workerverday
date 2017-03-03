package com.linewell.core.view.query;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.linewell.core.db.JdbcFactory;
import com.linewell.core.db.JdbcSession;
import com.linewell.core.system.GlobalParameter;

public class QueryManager {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(QueryManager.class); 
	/**
	 * Logger for this class
	 */
	private static final String JNDI = GlobalParameter.APP_CORE;
	
	
	public static QueryManager queryService;

	public static QueryManager getInstance() {
		if (queryService == null) {
			queryService = new QueryManager();
		}
		return queryService;
	}
	
	public boolean doSave(Query query) {
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);		
		return jdbc.saveEntity(query);
	}

	public boolean doUpdate(Query query) {
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		return jdbc.updateEntity(query);
	}

	public Query doFindByUnid(String unid) {
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);		
		return jdbc.getEntityById(Query.class, unid);
	}

	public List<Query> doFindByViewId(String viewId) {
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		List<Query> list = jdbc.queryForEntityList(Query.class, "where view_unid='"+viewId+"' order by query_sort");
		return list;
	}
	
	public String queryField(String viewId) {
		StringBuffer rtString = new StringBuffer();
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		String sql = "select query_field from core_view_query t where view_unid='"
				+ viewId + "'";
		try {
			String[][] array = jdbc.queryForArray(sql);
			for (int i = 0; i < array.length; i++) {
				rtString.append(array[i][0]);
			}
		} catch (SQLException e) {
		    logger.error(e);
		}

		return rtString.toString();
	}
	
	//删除视图查询条件
	public boolean doDeleteByQueryUnid(String queryUnid){
		boolean bool = false;
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		String sql = "delete core_view_query where query_unid = '"+queryUnid+"'";
		try {
			int i = jdbc.update(sql);
			if (i > 0) {
				bool = true;
			}
		} catch (SQLException e) {
			logger.error(e);
			return bool;
		}
		return bool;
	}
}
