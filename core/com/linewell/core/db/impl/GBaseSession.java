package com.linewell.core.db.impl;

import java.sql.Clob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.dbutils.DbUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayListHandler;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.linewell.core.db.DataPage;
import com.linewell.core.db.JDBCTool;
import com.linewell.core.db.JdbcFactory;
import com.linewell.core.db.JdbcSession;
import com.linewell.core.db.orm.BeanProperty;
import com.linewell.core.db.orm.TableProperty;
import com.linewell.core.util.SqlUtil;
import com.linewell.core.view.ext.param.AppDataUserService;

public class GBaseSession  implements JdbcSession {
	/**
	 * Logger for this class
	 */
	private static final Log logger = LogFactory.getLog(GBaseSession.class);

	private Connection connection;

	private String jndi;

	private volatile boolean pmdKnownBroken = true;

	private GBaseSession() {
	}

	public GBaseSession(String jndi, Connection connection) {
		this.jndi = jndi;
		this.connection = connection;
	}

	public Connection getConnection() {
		return connection;
	}

	public int update(String sql, Object... params) throws SQLException {

		QueryRunner qr = new QueryRunner(pmdKnownBroken);

		if (params.length == 0) {
			return qr.update(connection, sql);
		}

		return qr.update(connection, sql, params);
	}

	public void beginTran() throws SQLException {
		this.connection.setAutoCommit(false);
	}

	public void endTran() throws SQLException {
		DbUtils.commitAndClose(connection);
	}

	public List<Map<String, Object>> queryForList(String sql, Object... params) throws SQLException {

		QueryRunner qr = new QueryRunner(pmdKnownBroken);

		if (params.length == 0) {
			return qr.query(connection, sql, new MapListHandler(), (Object[]) null);
		}

		return qr.query(connection, sql, new MapListHandler(), params);
	}

	/*
	 * public String getTableName(String className) throws SQLException {
	 * QueryRunner qr = new QueryRunner(pmdKnownBroken);
	 * 
	 * String tabSql = "SELECT TABLE_NAME FROM USER_TAB_COMMENTS T WHERE
	 * T.COMMENTS LIKE '[" + className + "]%'"; Object[] result =
	 * qr.query(connection, tabSql, new ArrayHandler());
	 * 
	 * if (result[0] != null) { return String.valueOf(result[0]); }
	 * 
	 * return null; }
	 */

	@Override
	public String[][] queryForArray(String sql, Object... params) throws SQLException {
		String sTmp = "";
		String[][] sArrRtn = null;
		int iCol = 0, i = 0, j = 0;
		boolean bFlg = false;

		ResultSetMetaData rsmd = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;

		try {
			stmt = this.connection.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			rs = stmt.executeQuery();
			rsmd = rs.getMetaData();
			iCol = rsmd.getColumnCount();
			bFlg = rs.last();
			if (bFlg)
				i = rs.getRow();
			rs.beforeFirst();
			sArrRtn = new String[i + 1][iCol];
			for (i = 0; i < iCol; i++) {
				sTmp = rsmd.getColumnName(i + 1).trim();
				sArrRtn[0][i] = sTmp;
			}
			while (rs.next()) {
				j = j + 1;

				for (i = 0; i < iCol; i++) {
					Object obj = rs.getObject(i + 1);

					if (obj != null && (obj instanceof Clob)) {
						Clob clob = (Clob) obj;
						if (clob != null) {
							sTmp = clob.getSubString(1, (int) clob.length());
						}

					} else {
						sTmp = String.valueOf(obj == null ? "" : obj).trim();
						if (sTmp.equals("null"))
							sTmp = "";
					}
					sArrRtn[j][i] = sTmp;
				}
			}

		} catch (SQLException se) {
			logger.error("SQL=" + sql, se);
			throw se;

		} catch (Exception e) {
			logger.error("SQL=" + sql, e);
			throw new SQLException(e.getMessage());

		} finally {
			try {
				DbUtils.close(rs);
			} finally {
				DbUtils.close(stmt);
			}
		}
		return sArrRtn;
	}

	public boolean saveEntity(Object entity) {

		boolean bool = false;

		TableProperty tabProperty = new TableProperty(entity.getClass());

		String[] column = tabProperty.getBeanProperty();
		Map<String, Object> val = BeanProperty.getMapProperty(entity);

		Object[] param = new Object[column.length-1];
		for (int i = 0; i < param.length; i++) {
			param[i] = val.get(column[i+1]);
		}

		QueryRunner qr = new QueryRunner(pmdKnownBroken);
		String sql = tabProperty.getInsertSql();

		try {
			bool = qr.update(this.getConnection(), sql, param) > 0 ? true : false;
		} catch (SQLException e) {
		    logger.error(e);
		}

		return bool;
	}

	@Override
	public boolean updateEntity(Object entity) {

		boolean bool = false;

		TableProperty tabProperty = new TableProperty(entity.getClass());

		String[] column = tabProperty.getBeanProperty();
		Map<String, Object> val = BeanProperty.getMapProperty(entity);

		Object[] param = new Object[column.length];
		for (int i = 0; i < param.length - 1; i++) {
			param[i] = val.get(column[i+1]);
		}
		param[param.length - 1] = val.get(column[0]);

		QueryRunner qr = new QueryRunner(pmdKnownBroken);
		String sql = tabProperty.getUpdateSql();

		try {
			bool = qr.update(this.getConnection(), sql, param) > 0 ? true : false;
		} catch (SQLException e) {
		    logger.error(e);
		}

		return bool;
	}

	@Override
	public <T> T getEntityById(Class<T> clazz, Object id) {
		QueryRunner qr = new QueryRunner(pmdKnownBroken);

		TableProperty tabProperty = new TableProperty(clazz);
		String sql = tabProperty.getSelectByIdSql();
		sql = sql.replaceAll("sql,", "sqlcontent,");
		try {
			return qr.query(this.connection, sql, new BeanHandler<T>(clazz), id);

		} catch (SQLException e) {
			logger.error(e);
		}

		return null;
	}

	@Override
	public <T> List<T> queryForEntityList(Class<T> clazz, String... where) {
		QueryRunner qr = new QueryRunner(pmdKnownBroken);

		TableProperty tabProperty = new TableProperty(clazz);
		String sql = tabProperty.getSelectWhereSql();
		if (where.length > 0) {
			sql += where[0];
		}

		try {
			return qr.query(this.connection, sql, new BeanListHandler<T>(clazz));

		} catch (SQLException e) {
			logger.error(e);
		}

		return null;
	}

	@Override
	public DataPage queryForDataPage(String sql, int pageSize, int curPage, Object... params) {
		DataPage dataPage = new DataPage(this.connection, sql, pageSize);

		dataPage.setPageSize(pageSize);
		dataPage.setCurrentPage(curPage);

		int begin = dataPage.getBeginRecordCount();
		int end = dataPage.getEndRecordCount();

		String sqlResult = " SELECT tbl.* FROM ( SELECT t.*, ROWNUM RN FROM ( " + sql + " ) t WHERE ROWNUM <= " + pageSize * curPage
				+ " ) tbl WHERE RN >= " + (pageSize * (curPage - 1) + 1);

		logger.info(sqlResult);

		try {
			List<Map<String, Object>> resultList = this.queryForList(sqlResult, params);
			dataPage.setRecordList(resultList);

		} catch (SQLException e) {
		    logger.error(e);
		}

		return dataPage;
	}

	@Override
	public List<Object[]> queryForArrayList(String sql, Object... params) throws SQLException {

		QueryRunner qr = new QueryRunner(pmdKnownBroken);

		if (params.length == 0) {
			return qr.query(connection, sql, new ArrayListHandler(), (Object[]) null);
		}

		return qr.query(connection, sql, new ArrayListHandler(), params);
	}

	
	public <T> T getEntity(Class<T> clazz, String where) {
		
		List<T> list = queryForEntityList(clazz, where);
		if (list != null && list.size() == 1) {
			return list.get(0);
		}
		
		return null;
	}

	@Override
	public int getSqlCount(String sql) {
		int rt = 0;

		String countSql = " SELECT COUNT(*) FROM ( " + sql + " ) viewCount ";
		try {
			String[][] count = queryForArray(countSql);
			if (count.length > 1) {
				rt = Integer.parseInt(count[1][0]);
			}
		} catch (SQLException e) {
		    logger.error(e);
		}

		return rt;
	}

	@Override
	public String queryForEasyGridPaging(String sql, int page, int rows, String sort, String order) {
		JSONObject rtJson = new JSONObject();
		JSONArray rowsJson = new JSONArray();

		JdbcSession jdbc = JdbcFactory.getSession("proxool." + jndi);

		if (StringUtils.isEmpty(sql)) {
			return "{total:0,rows:[]}";
		}

		if (StringUtils.isNotEmpty(sort)) {
			if (!StringUtils.contains(sql, "GROUP")) {
				if (StringUtils.contains(sql, "ORDER")) {
					sql = StringUtils.substringBeforeLast(sql, "ORDER");
				}
				sql += " order by " + sort + " " + order;
			}
		}

/*		String resultSql = "SELECT viewTab.*"
				+ " FROM (SELECT viewTmp.*, ROWNUM RN" + " FROM (" + sql
				+ ") viewTmp" + " WHERE ROWNUM <= " + page * rows + ") viewTab"
				+ " WHERE RN >" + (page - 1) * rows;*/
		
		String resultSql = sql + " LIMIT "+(page - 1) * rows+","+rows;
		

		if (StringUtils.isNotEmpty(sort)) {
			if (StringUtils.contains(resultSql, "GROUP")) {
				/*
				if (StringUtils.contains(resultSql, "ORDER")) {
					resultSql = StringUtils.substringBeforeLast(resultSql,
							"ORDER");
				}
				*/
				resultSql += " order by " + sort + " " + order;
			}
		}
		try {
			String[][] result = jdbc.queryForArray(resultSql);
			String[] column = null;
			if (result.length > 0) {
				column = result[0];

				for (int i = 1; i < result.length; i++) {
					JSONObject obj = new JSONObject();
					for (int j = 0; j < column.length; j++) {
						obj.put(column[j].toUpperCase(), result[i][j]);
					}
					rowsJson.add(obj);
				}
			}
		} catch (SQLException e) {
		    logger.error(e);
		}

		rtJson.put("total", jdbc.getSqlCount(sql));
		rtJson.put("rows", rowsJson.toString());

		return rtJson.toString();
	}

	/**
	 * 获取表名
	 * @param jndi
	 * @param tables
	 * @return
	 */
	public  Map getColumnComments(String[] tables){
		Map map = new HashMap();
		
		for (int i = 0; i < tables.length; i++) {
			String sql = "show columns from "+tables[i].toUpperCase();
			try {
				String[][] array = JDBCTool.doSQLQuery(jndi, sql) ;
				for (int j = 1; j < array.length; j++) {
					map.put(array[j][0], array[j][1]);
				}
							
			} catch (SQLException e) {
				logger.error(e);
			}
		}
		
		return map;
	}

	/**
	 * 传入SQL语句,获取SQL语句字段
	 * 
	 * @param sql
	 * @return JSON数据
	 */
	public JSONObject selectSqlField(String sql) {
		JSONObject ret = new JSONObject();
		JdbcSession jdbc = JdbcFactory.getSession(jndi);
		JSONArray jsonField = new JSONArray();//字段
		Map map = jdbc.getColumnComments(SqlUtil.getTables(sql));//字段注释	
		
		sql = AppDataUserService.newInstance().setAppDataUserParam(sql);
		
		try {
			String[][] res = jdbc.queryForArray("SELECT * FROM ("+sql.replaceAll("\\$\\{([^\\}]+)\\}", "")+") TMPTAB LIMIT 0,1");
			if (res.length > 0) {
				for (int i = 0; i < res[0].length; i++) {
					String field = StringUtils.upperCase(res[0][i]);
					JSONObject obj = new JSONObject();
					obj.put("name", field);
					obj.put("comment", map.get(field)==null?"":map.get(field));
					jsonField.add(obj);
				}
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		ret.put("field", jsonField);		

		//搜索字段
		JSONArray jsonSField = new JSONArray();
		Pattern p = Pattern.compile("\\$\\{([^\\}]+)\\}");
		Matcher m = p.matcher(sql);
		while (m.find()) {
			JSONObject obj = new JSONObject();
			obj.put("field", m.group(1).toUpperCase());
			jsonSField.add(obj);
		}
		ret.put("sField", jsonSField);
		 

		return ret;
	}

}
