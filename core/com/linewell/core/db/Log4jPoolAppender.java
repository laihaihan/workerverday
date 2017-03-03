package com.linewell.core.db;

import java.sql.Connection;
import java.sql.SQLException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.jdbc.JDBCAppender;

/**
 * @Copyright :(C),2012
 * @CompanyName :南威软件股份有限公司(www.linewell.com)
 * @Version :1.0
 * @Date :Sep 27, 2013
 * @author : 文件创建者姓名：李竞雄 ljingxiong@linewell.com
 * @Description :
 */
public class Log4jPoolAppender extends JDBCAppender {
    private static Log logger = LogFactory.getLog(Log4jPoolAppender.class);
    private String     jndiName;
    private Connection connection;

    public String getJndiName() {
        return jndiName;
    }

    public void setJndiName(String jndiName) {
        this.jndiName = jndiName;
    }

    @Override
    protected Connection getConnection(){
        JdbcSession jdbc = JdbcFactory.getSession(jndiName);
        return jdbc.getConnection();
    }
    
    @Override  
    protected void closeConnection(Connection con) { 
        try {
            JdbcFactory.closeJdbcSession();
        } catch (SQLException e) {
            logger.error(e.getMessage(),e);
        }
    }
    
    

}
