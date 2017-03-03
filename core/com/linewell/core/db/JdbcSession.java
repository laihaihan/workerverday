package com.linewell.core.db;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

public interface JdbcSession {

	public Connection getConnection();

	public void beginTran() throws SQLException;

	public void endTran() throws SQLException;

	public int update(String sql, Object... params) throws SQLException;

	public String[][] queryForArray(String sql, Object... params) throws SQLException;

	public List<Map<String, Object>> queryForList(String sql, Object... params) throws SQLException;

	public List<Object[]> queryForArrayList(String sql, Object... params) throws SQLException;

	public boolean saveEntity(Object entity);

	public boolean updateEntity(Object entity);

	public <T> T getEntityById(Class<T> clazz, Object id);

	public <T> T getEntity(Class<T> clazz, String where);

	public <T> List<T> queryForEntityList(Class<T> clazz, String... where);

	public DataPage queryForDataPage(String sql, int pageSize, int curPage, Object... params);

	public int getSqlCount(String sql);

	public String queryForEasyGridPaging(String sql, int page, int rows, String sort, String order);
	
	public Map getColumnComments(String[] tables);
	public JSONObject selectSqlField(String sql); 
	// public DataPage queryForList(HttpServletRequest request,String sql,int
	// pageSize);

}
