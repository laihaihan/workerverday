package com.linewell.core.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.linewell.core.db.impl.GBaseSession;
import com.linewell.core.db.impl.OracleSession;
import com.linewell.core.db.impl.SqlServerSession;

public class JdbcFactory {
	/**
	 * Logger for this class
	 */
	private static final Log logger = LogFactory.getLog(JdbcFactory.class);

	private static final ThreadLocal<Map<String, JdbcSession>> threadLocal = new ThreadLocal<Map<String, JdbcSession>>();

	public static String jndi = null;

	private static long start;
	
	/*
	public static JdbcSession getSession() {
		return getSession(jndi);
	}
	*/

	public static JdbcSession getSession(String jndi) {
		if (jndi.indexOf("proxool.") == 0) {
			jndi = jndi.substring(8, jndi.length());
		}

		Map<String, JdbcSession> sessionMap = threadLocal.get();
		JdbcSession session = null;

		if (sessionMap == null) {
			sessionMap = new HashMap<String, JdbcSession>();
			try {
				session = buildSession(jndi);
			} catch (SQLException e) {
				logger.error("构建JdbcSession失败" + e);
			}
			sessionMap.put(jndi, session);

		} else {
			session = sessionMap.get(jndi);
			try {
				if (session == null || session.getConnection().isClosed()) {
					session = buildSession(jndi);
					sessionMap.put(jndi, session);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			    logger.error(e);
			}
		}

		// if (session == null || session.isClosed()) {
		// try {
		// session = buildSession(jndi);
		// } catch (SQLException e) {
		// e.printStackTrace();
		// }
		// Map<String,JdbcSession> sessionMap = new HashMap<String,
		// JdbcSession>();
		// threadLocal.set(session);
		// }
		threadLocal.set(sessionMap);

		return session;
	}

	private static JdbcSession buildSession(String jndi) throws SQLException {
		Connection connection = DriverManager.getConnection("proxool." + jndi);	
		
		if(connection.toString().indexOf("gbase")>0){
			GBaseSession gBaseSession = new GBaseSession(jndi, connection);
			start = System.currentTimeMillis();
			//logger.info("--------============ 开起连接[" + jndi + ":"+threadLocal.hashCode()+"] ===========---------");
			gBaseSession.beginTran();
			
			return gBaseSession;
		}else if(connection.toString().indexOf("sourceforge")>0){
			SqlServerSession sqlServerSession = new SqlServerSession(jndi, connection);
			start = System.currentTimeMillis();
			sqlServerSession.beginTran();
			return sqlServerSession;
		}else{
			OracleSession oracleSession = new OracleSession(jndi, connection);
			start = System.currentTimeMillis();
			//logger.info("--------============ 开起连接[" + jndi + ":"+threadLocal.hashCode()+"] ===========---------");
			oracleSession.beginTran();
			
			return oracleSession;
		}
	}

	private static JdbcSession buildSession() throws SQLException {
		return buildSession(jndi);
	}

	public static void closeJdbcSession() throws SQLException {
		Map<String, JdbcSession> sessionMap = threadLocal.get();
		if (sessionMap != null) {
			Set<Entry<String, JdbcSession>> entrySet = sessionMap.entrySet();
			for (Entry<String, JdbcSession> entry : entrySet) {
				JdbcSession session = entry.getValue();
				// 结束事务
				if (session != null && session.getConnection() != null && !session.getConnection().isClosed()) {
					session.endTran();
//					logger.info("--------============ 关闭连接[" + entry.getKey() + ":"+threadLocal.hashCode()+"] 用时:" 
//							+ (System.currentTimeMillis() - start) + " ===========---------");
				}
			}
			threadLocal.remove();
		}

		/*
		 * JdbcSession session = (JdbcSession) threadLocal.get();
		 * 
		 * if ( null!=session ) { //1.移除线程 threadLocal.remove();
		 * 
		 * //2.结束事务 if( session.getConnection()!=null ){
		 * session.endTransaction(); DebugUtils.println("--------============
		 * 关闭连接"+" 用时:"+(System.currentTimeMillis()-start)+"
		 * ===========---------"); } }
		 */
	}

}
