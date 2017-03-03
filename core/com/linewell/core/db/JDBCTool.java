package com.linewell.core.db;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.List;

import javax.naming.NamingException;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.linewell.ucap.page.DBType;

/**
 * Jdbc操作的通用封装类，提供JDBC常用的方法.
 * 
 * @author cbingcan@linewell.com
 * @date 2010-12-13
 * @version $Revision: 1.4 $
 */
public class JDBCTool {

    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(JDBCTool.class);

	/**
	 * 将查询的结果放在一个数组里，数组的高维是记录行数，本方法接收额外运行时参数 数组的低维是列数
	 *
	 * @param jndi
	 * @param sql
	 *            String 任何一条SQL查询语句形如:select * from tlb_doc where id=?
	 * @param args[]-Object参数对象，
	 *            形如：<p/> Object obj []= new Object[1]; </br> obj[0] = new
	 *            String("2"); </br>
	 * @return String[][] 二维数组结果集合
	 */
	public static Object[][] doSQLQuery(String jndi, String sql, Object[] args) throws SQLException {
		Object sTmp = "";
		Object[][] sArrRtn = null;
		int iCol = 0, i = 0, j = 0;
		PreparedStatement pst = null;
		ResultSet rs = null;
		ResultSetMetaData rsmd = null;
		boolean bFlg = false;
		JDBCWrapper jw = null;
		try {
			jw = new JDBCWrapper(jndi);
			jw.prepareStatement(sql, ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			jw.clearParameters();
			if (args != null) {
				for (int k = 0; k < args.length; k++) {
					jw.setObject(k + 1, args[k]);
				}
			}
			rs = jw.executeQuery();
			rsmd = rs.getMetaData();
			iCol = rsmd.getColumnCount();
			bFlg = rs.last();
			if (bFlg){
				i = rs.getRow();
			}	
			rs.beforeFirst();
			sArrRtn = new Object[i + 1][iCol];
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
					} else if (obj != null && (obj instanceof Blob)) {
						Blob blob = (Blob) obj;
						sTmp = blob;
					} else {
						sTmp = String.valueOf(obj == null ? "" : obj).trim();
						sTmp = sTmp.equals("null") ? "" : sTmp;
					}
					sArrRtn[j][i] = sTmp;
				}
			}
		} catch (SQLException se) {
			logger.error("SQL=" + sql, se);
			throw se;
		} catch (NamingException e) {
			logger.error("SQL=" + sql, e);
			throw new SQLException(e.getMessage());// llp
		} catch (Exception e) {
			logger.error("SQL=" + sql, e);
			throw new SQLException(e.getMessage());// llp
		} finally {
			try {
				rsmd = null;
				if (rs != null) {
					rs.close();
					rs = null;
				}
				if (pst != null) {
					pst.close();
					pst = null;
				}
				if (jw != null) {
					jw.close();
					jw = null;
				}
			} catch (SQLException se) {
				logger.error("SQL=" + sql, se);
				throw se;
			}
		}
		return sArrRtn;
	}
	
	/**
	 * 将查询的结果放在一个数组里头，数组的高维是记录行数 数组的低维是列数
	 * 
	 * @param sql
	 *            String 任何一条SQL查询语句形如：select * from tlb_doc
	 * @return String[][] 二维数组结果集合
	 */
	public static String[][] doSQLQuery(String jndi,String sql) throws SQLException {		
		
		String[][] array = null;
		JdbcSession jdbc = JdbcFactory.getSession(jndi);
		array = jdbc.queryForArray(sql);
		
		return array;
	}

	/**
	 * 将查询的结果放在list，list中元素为map，key为字段名称 value为值
	 * 
	 * @param sql
	 *            String 任何一条SQL查询语句形如：select * from tlb_doc
	 * @return List
	 */
	public static List doSQLQueryList(String jndi,String sql) throws SQLException {
		List list = null;
		JdbcSession jdbc = JdbcFactory.getSession(jndi);
		list = jdbc.queryForList(sql);
		return list;
	}

	/**
	 * 对数据库进行增加，修改和删除等操作
	 * @author zjianhui@linewell.com
	 * @date: Jul 7, 2011 
	 * <p>
	 * @param jndi
	 * @param sql 
	 * @param args
	 * @return
	 * @throws SQLException
	 * </p>
	 */
	public static boolean doSQLUpdateAndCommit(String jndi, String sql, Object[] args)throws SQLException {
		boolean flag = false;
		JDBCWrapper jw = null;
		try {
			jw = new JDBCWrapper(jndi);
			jw.setAutoCommit(false);
			jw.prepareStatement(sql);
			jw.clearParameters();
			if (args != null) {
				for (int i = 0; i < args.length; ++i) {
					jw.setObject(i + 1, args[i]);
				}
			}
			int a = jw.executeUpdate();
			flag = a > 0;
			jw.specialCommit();
		} catch (Exception e) {
			logger.error("SQL=" + sql, e);
			try {
				jw.rollback();
			} catch (SQLException e1) {
				throw e1;
			}
			throw new SQLException(e.getMessage());
		} finally {
			try {
				if (jw != null) {
					jw.close();
					jw = null;
				}
			} catch (SQLException e1) {
				logger.error("SQL=" + sql, e1);
				throw e1;
			}
		}
		return flag;
	}
	
	
	/**
	 * 对数据库进行增加，修改和删除等操作
	 * @author zjianhui@linewell.com
	 * @date: Jul 7, 2011 
	 * <p>
	 * @param jndi
	 * @param sql 
	 * @param args
	 * @return
	 * @throws SQLException
	 * </p>
	 */
	public static boolean doSQLUpdate(String jndi, String sql, Object[] args)throws SQLException {
		boolean flag = false;
		JDBCWrapper jw = null;
		try {
			jw = new JDBCWrapper(jndi);
			jw.setAutoCommit(false);
			jw.prepareStatement(sql);
			jw.clearParameters();
			if (args != null) {
				for (int i = 0; i < args.length; ++i) {
					jw.setObject(i + 1, args[i]);
				}
			}
			int a = jw.executeUpdate();
			flag = a > 0;
			jw.commit();
		} catch (Exception e) {
			logger.error("SQL=" + sql, e);
			try {
				jw.rollback();
			} catch (SQLException e1) {
				throw e1;
			}
			throw new SQLException(e.getMessage());
		} finally {
			try {
				if (jw != null) {
					jw.close();
					jw = null;
				}
			} catch (SQLException e1) {
				logger.error("SQL=" + sql, e1);
				throw e1;
			}
		}
		return flag;
	}
	
	/**
	 * 
	 * @param jndi
	 * @param sql
	 * @return
	 * @throws SQLException
	 */
	public static boolean  doSQLUpdate(String jndi ,String sql) throws SQLException {
		boolean flag =false;
		JDBCWrapper jw = null;
		try {
			jw = new JDBCWrapper(jndi);
			jw.setAutoCommit(false);
			jw.createStatement();
			int a = jw.executeUpdate(sql);
		    flag = a > 0 ? true : false;
		    jw.commit();
		}catch (Exception e) {
			logger.error("SQL=" + sql, e);
			try {
				jw.rollback();
			} catch (SQLException e1) {
				throw e1;
			}
			throw new SQLException(e.getMessage());
		} finally {
			try {
				if (jw != null) {
					jw.close();
					jw = null;
				}
			} catch (SQLException e1) {
				logger.error("SQL=" + sql, e1);
				throw e1;
			}
		}
		return flag;
	}
	
	/**
	 * 对数据库进行批量增加，修改和删除等操作
	 * 
	 * @param []sql
	 */
	public static int[] doBatchUpdate(String jndi,String[] sql) throws SQLException {
		JdbcSession jdbc = JdbcFactory.getSession(jndi);
		int[] i = new int[sql.length]  ;
		for (int j = 0; j < sql.length; j++) {
			i[j] = jdbc.update(sql[j]);
		}		
		return i;
	}
	
	/**
	 * 根据数据库类型获取不同的substring函数
	 * 
	 * @param dbType 数据库类型 String
	 * 
	 * @return 返回相应的substr函数
	 */
	public static String getSqlSubstrByDbType(String dbType){
		String funct = "SUBSTR";
		
		if(StringUtils.isEmpty(dbType))return funct;
		
		if(dbType.equals(DBType.MSSQLSERVER2000_DBTYPE) || dbType.equals(DBType.MSSQLSERVER2005_DBTYPE)){
			funct = "SUBSTRING";
		}
		
		return funct;
	}
	
	/**
	 * 验证数据库连接是否正常
	 * 
	 * @param url 连接地址
	 * 
	 * @param userName 用户名
	 * 
	 * @param password 密码
	 * 
	 * @return 返回验证结果，true或false
	 */
	public static boolean verifyConnect(String driverClass,String url,String userName,String password){
		boolean result = false;
		try {
			Class.forName(driverClass);
			Connection conn  =  DriverManager.getConnection (url , userName, password );
			result = true;
			if (null != conn) {
				conn.close();
				conn=null;
			}
		} catch (ClassNotFoundException e) {
		    logger.error(e);
		}catch (SQLException e) {
		    logger.error(e);
		} 
		return result;
	}
}