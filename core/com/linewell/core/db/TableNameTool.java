package com.linewell.core.db;

import java.sql.SQLException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.linewell.core.system.GlobalParameter;


public class TableNameTool {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(TableNameTool.class);

	/**
	 * 判断表是否存在
	 * date: Feb 22, 2011
	 * @param tablename 表名
	 * @return
	 */
	public static boolean tableIsExist(String tablename,String jndi){
		boolean flag = false;
		String sql = "select count(*) from user_tables where table_name='"+(tablename).toUpperCase()+"'";
		try {
			String[][] rs = JDBCTool.doSQLQuery(jndi,sql);
			if(Integer.parseInt(rs[1][0])>0){
				flag = true;
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		return flag;
	}
}
