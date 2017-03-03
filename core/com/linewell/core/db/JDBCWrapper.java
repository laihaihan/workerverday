package com.linewell.core.db;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.io.StringReader;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;

import javax.naming.NamingException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.linewell.core.util.StrUtil;

 
public class JDBCWrapper {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(JDBCWrapper.class);
    
    private Connection connection = null;
	private Statement statement = null;
	private PreparedStatement preparedStatement = null;
	boolean isAutoCommit = true;
	private int fetchSize = 0;
	private int fetchDirection = ResultSet.FETCH_FORWARD;

	// setString 允许的最大字节数为2000 add by lpeitu@linewell.com 2009-05-21
	private static final int MAX_BYTE_NUM = 2000;


	/**
	 * 通过指定的JNDI连接池资源名称取得数据库连接
	 *
	 * @param jndiName String jndi资源名称,形如："java:comp/env/jdbc/OracleDB"
	 * @throws NamingException 名称未找到异常
	 * @throws SQLException SQL异常
	 */
	public JDBCWrapper(String jndiName) throws NamingException, SQLException {
		//setConnection(ConnectionUtils.getConnection(jndiName));
		JdbcSession jdbc = JdbcFactory.getSession(jndiName);
		setConnection(jdbc.getConnection());
	}

	/**
	 * 利用一般连接方法取得数据库连接
	 *
	 * @param className String 形如："oracle.jdbc.driver.OracleDriver"
	 * @param URL tring 形如："jdbc:oracle:thin:@192.168.3.82:1521:ORCL"
	 * @param userName String 数据库用户名"oauser"
	 * @param passWord String 数据库密码"oapwd"
	 * @throws SQLException SQL异常
	 * @throws ClassNotFoundException 类未找到异常
	 */
	public JDBCWrapper(String className, String URL, String userName, String passWord) throws SQLException, ClassNotFoundException {
		Class.forName(className);
		this.connection = DriverManager.getConnection(URL, userName, passWord);
	}

	/**
	 * 返回是否自动提交标志
	 *
	 * @return boolean自动提交返回真；不自动提交返回假
	 */
	public boolean isAutoCommit() {
		return this.isAutoCommit;
	}

	/**
	 * 设置是否为自动提交
	 *
	 * @param b
	 *          true或者false
	 */
	public void setAutoCommit(boolean b) {
		try {
			this.isAutoCommit = b;
			this.connection.setAutoCommit(b);
		} catch (SQLException e) {
		    logger.error(e);
		}
	}

	/**
	 * 创建Statement对象
	 *
	 * @throws SQLException
	 *
	 */
	public void createStatement() throws SQLException {
		this.statement = this.connection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
	}

	public void createStatement(int resultSetType, int resultSetConcurrentcy) throws SQLException {
		this.statement = this.connection.createStatement(resultSetType, resultSetConcurrentcy);
	}

	/**
	 * 返回PreparedStatement对象
	 *
	 * @return PreparedStatement对象
	 */
	public PreparedStatement getPreparedStatement() {
		return this.preparedStatement;
	}

	/**
	 * 设置取回的最大记录条数
	 *
	 * @param value -int最大记录数
	 */
	public void setFetchSize(int value) {
		this.fetchSize = value;
	}

	/**
	 * 设置游标方向
	 *
	 * @param value -大于零为正向；小于零为反向
	 */
	public void setFetchDirction(int value) {
		this.fetchDirection = value;
	}

	/**
	 * 预设SQL语句
	 *
	 * @param sql 预设SQL语句
	 * @throws SQLException
	 */
	public void prepareStatement(String sql) throws SQLException {
		this.preparedStatement = this.connection.prepareStatement(sql);
	}

	/**
	 *
	 * @param sql
	 * @param resultSetType
	 * @param resultSetConcurrency
	 * @throws SQLException
	 */
	public void prepareStatement(String sql, int resultSetType, int resultSetConcurrency) throws SQLException {
		this.preparedStatement = this.connection.prepareStatement(sql, resultSetType, resultSetConcurrency);
	}

	/**
	 * 设置SQL语句中？为字符串的变量的对应值 <br>
	 *
	 * @param index
	 * @param value
	 * @throws SQLException
	 */
	public void setString(int index, String value) throws SQLException {
		String temp_value = StrUtil.formatNull(value);
		if (!StrUtil.isNull(temp_value) && temp_value.length() < MAX_BYTE_NUM) {
			this.preparedStatement.setString(index, temp_value);
		}else {
			StringReader reader = new StringReader(temp_value);
			this.preparedStatement.setCharacterStream(index, reader, temp_value.length());
		}
	}

	/**
	 * 设置SQL语句中?为字符留的变量的对应值 <br>
	 *
	 * @param index
	 * @param reader Reader
	 * @param length
	 * @throws SQLException
	 */
	public void setCharacterStream(int index, Reader reader, int length) throws SQLException {
		this.preparedStatement.setCharacterStream(index, reader, length);
	}

	/**
	 * 设置SQL语句中?为任意对象的对应值 <br>
	 *
	 * @param index int 预制值所在位置
	 * @param value Object
	 *          预制值。对String，Integer，Long，Float，Clob，Blob，Timestamp进行了类型判断处理。
	 *          非上述类型，则直接使用PreparedStatement.setObject方法
	 * @throws SQLException SQL异常
	 */
	public void setObject(int index, Object value) throws SQLException {
		// 如果传入的参数为null,则当作空字符串""
		if (null == value) {
			this.setString(index, "");
			return;
		}
		if (value instanceof String) {
			this.setString(index, (String) value);
			return;
		}
		if (value instanceof Integer) {
			this.preparedStatement.setInt(index, ((Integer) value).intValue());
			return;
		}
		if (value instanceof Long) {
			this.preparedStatement.setLong(index, ((Long) value).longValue());
			return;
		}
		if (value instanceof Float) {
			this.preparedStatement.setFloat(index, ((Float) value).floatValue());
			return;
		}
		// 对clob字段进行特殊处理
		if (value instanceof Clob) {
			Clob clob = (Clob) value;
			// 直接把字符流流存到CLOB字段里
			int filesize = (int) (clob.length());
			Reader reader = clob.getCharacterStream();
			this.preparedStatement.setCharacterStream(index, reader, filesize);
			return;
		}
		
		// 对blob字段进行特殊处理
		if (value instanceof DataInputStream) {
			DataInputStream dis = (DataInputStream)value;
			try {
				this.preparedStatement.setBinaryStream(index,dis,dis.available());
			} catch (IOException e) {
			    logger.error(e);
			} 
			return;
		}
		// 对blob字段进行特殊处理
		if (value instanceof Blob) {
		    //by lijx 对Gbase的Blob进行处理.........start...............
		    if (this.connection.toString().indexOf("gbase") > -1) {
                Blob srcBlob = (Blob) value;
                OutputStream out = null;
                InputStream is = null;
                try {
                    Blob destBlob = this.connection.createBlob();
                    // 把内容写入到对象中
                    out = new BufferedOutputStream(destBlob.setBinaryStream(1));
                    is = new BufferedInputStream(srcBlob.getBinaryStream());
                    int i = -1;
                    while ((i = is.read()) != -1) {
                        out.write(i);
                    }
                    out.flush();
                    out.close();
                    this.preparedStatement.setBlob(index, destBlob);
                } catch (IOException e) {
                    logger.error(e.getMessage(), e);
                } finally {
                    try {
                        if (null != out) {
                            out.close();
                        }
                        if (null != is) {
                            is.close();
                        }
                    } catch (IOException e) {
                        logger.error(e.getMessage(), e);
                    }
                }
              //by lijx 对Gbase的Blob进行处理.........end...............
            } else {
                Blob blob = (Blob) value;
                InputStream is = blob.getBinaryStream();
                this.preparedStatement.setBinaryStream(index, is, (int) blob.length());
            }
            return;
		}
		if (value instanceof Timestamp) {
			this.preparedStatement.setTimestamp(index, (Timestamp) value);
			return;
		}
		this.preparedStatement.setObject(index, value);
	}

	/**
	 * 得到Statement对象
	 *
	 * @return Statement对象
	 */
	public Statement getStatement() {
		return this.statement;
	}

	/**
	 * 去掉PREPAREDSTATEMENT中的所有已经绑定的参数 <br>
	 *
	 * @throws SQLException SQL异常
	 */
	public void clearParameters() throws SQLException {
		this.preparedStatement.clearParameters();
	}


	/**
	 * 针对一些特殊业务需要直接提交的做特殊处理
	 *
	 * @throws SQLException -SQL异常
	 */
	public void specialCommit() throws SQLException {
		try {
			connection.commit();
		} catch (SQLException ex) {
			logger.error(ex.getMessage(), ex);
		 	throw ex;
		}
	}
	
	/**
	 * 数据事务提交 请先将自动提交设置状态设置为不自动
	 *
	 * @throws SQLException -SQL异常
	 */
	public void commit() throws SQLException {
//		try {
//			connection.commit();
//		} catch (SQLException ex) {
//			logger.error(ex.getMessage(), ex);
//		 	throw ex;
//		}
	}

	/**
	 * 数据事务回滚在执行SQL的过程中出现异常时执行 请先将自动提交设置状态设置为不自动
	 *
	 * @throws SQLException -SQL异常
	 */
	public void rollback() throws SQLException {
		try {
			connection.rollback();
		} catch (SQLException ex) {
			logger.error(ex.getMessage(), ex);
			throw ex;
		}
	}

	/**
	 * 执行SQL语句返回字段集
	 *
	 * @param sql String 执行SQL语句
	 * @return ResultSet 结果记录集合
	 * @throws SQLException SQL异常
	 */
	public ResultSet executeQuery(String sql) throws SQLException {
		if (this.statement != null) {
			this.statement.setFetchSize(this.fetchSize);
			this.statement.setFetchDirection(this.fetchDirection);
			try {
				ResultSet resultSet = this.statement.executeQuery(sql);
				return resultSet;
			} catch (SQLException e) {
				logger.error("SQL=" + sql, e);
				throw e;
			}
		} else {
			throw new SQLException("没有取到连接!");
		}
	}

	/**
	 * 执行PreparedStatement中的预设SQL语句，请先设置好sql语句和对应的参数
	 *
	 * @return ResultSet 结果集
	 * @throws SQLException SQL异常
	 */
	public ResultSet executeQuery() throws SQLException {
		if (this.preparedStatement != null) {
			this.preparedStatement.setFetchSize(this.fetchSize);
			this.preparedStatement.setFetchDirection(this.fetchDirection);
			try {
				ResultSet resultSet = this.preparedStatement.executeQuery();
				return resultSet;
			} catch (SQLException e) {
				logger.error(e.getLocalizedMessage(), e);
				throw e;
			}
		} else {
			throw new SQLException("没有preparedStatement,可能没有调用pre" + "pareStatement(String)方法或者没有取到连接!");
		}
	}

	/**
	 * 执行SQL更新语句，针对Statement
	 *
	 * @param sql String 执行的SQL语句
	 * @return int 执行成功的SQL条数
	 * @throws SQLException -SQL异常
	 */
	public int executeUpdate(String sql) throws SQLException {
		
		int num = 0;
		if (this.statement == null) {
			this.createStatement();
		}
		if (this.statement != null) {
			try {
				num = this.statement.executeUpdate(sql);
			} catch (SQLException e) {
				logger.error("SQL=" + sql, e);
				throw e;
			}
		}
		return num;
	}

	/**
	 * 执行SQL更新语句，针对PreparedStatement
	 *
	 * @return int 执行成功的SQL条数
	 * @throws SQLException SQL异常
	 */
	public int executeUpdate() throws SQLException {
		int num = 0;
		if (this.preparedStatement != null) {
			try {
				num = this.preparedStatement.executeUpdate();
			} catch (SQLException e) {
				logger.error(e.getMessage(), e);
				throw e;
			}
			return num;
		}
		return num;
	}

	/**
	 * 执行多条SQL语句，用半角分号分隔多条语句,仅用来批量更新，不做查询
	 *
	 * @param sql String 形如:"update tlb_a set fd=kk;delete from tlb_b"
	 * @return int[] 执行成功的SQL条数
	 * @throws SQLException SQL异常
	 */
	public int[] doBatch(String sql) throws SQLException {		
		int[] rowResult = null;
		String a;
		try {
			this.statement = this.connection.createStatement();
			java.util.StringTokenizer st = new java.util.StringTokenizer(sql, ";");
			while (st.hasMoreElements()) {
				a = st.nextToken();
				this.statement.addBatch(a);
			}
			rowResult = this.statement.executeBatch();
		} catch (SQLException ex) {
			throw ex;
		}
		return rowResult;
	}

	/**
	 * 关闭连接。
	 * <p>
	 * <b>使用完毕后请显式调用! </b>
	 *
	 * @throws SQLException SQL异常
	 */
	public void close() throws SQLException {
		if (null != this.statement) {
			this.statement.close();
		}
		if (null != this.preparedStatement) {
			this.preparedStatement.close();
		}
		if (null!=this.connection) {
			//this.connection.close();
		}
	}

	/** 
	 * @return connection 
	 */
	
	public Connection getConnection() {
		return connection;
	}

	/** 
	 * @param connection 要设置的 connection 
	 */
	public void setConnection(Connection connection) {
		this.connection = connection;
	}
	
}