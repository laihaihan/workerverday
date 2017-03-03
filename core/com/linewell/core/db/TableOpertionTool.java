package com.linewell.core.db;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * 操作数据库表相关辅助性功能
 * @author zjianhui@linewell.com
 *
 */
public class TableOpertionTool {

    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(TableOpertionTool.class);

	/**
	 * 获取指定表名下所有字段
	 * @param tablename表名
	 * @return TableBean对象封装的 java.util.List
	 */
	public static List<TableBean> getTableColmuns(String tablename,String jndi){
		String sql = "select c.COLUMN_NAME,c.DATA_TYPE,m.comments from user_tab_columns c,user_col_comments m where c.table_name = '"+tablename.toUpperCase()+"' and c.TABLE_NAME=m.table_name and c.COLUMN_NAME=m.column_name";
		List<TableBean> list = new ArrayList();
		try {
			String[][] rs = JDBCTool.doSQLQuery(jndi, sql);
			for (int i = 1; i < rs.length; i++) {
				TableBean tableBean = new TableBean();
				tableBean.setTablename(tablename.toUpperCase());
				tableBean.setFieldname(rs[i][0]);
				tableBean.setType(rs[i][1]);
				tableBean.setColumns(rs[i][2]);
				list.add(tableBean);
			}
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}
		return list;
	}
	

	/**
	 * 获取指定表名下所有字段
	 * @param tablename表名
	 * @return TableBean对象
	 */
	public static TableBean getTableColmuns(String tablename,String fieldName,String jndi){

		TableBean tableBean = new TableBean();
		String sql = "select c.COLUMN_NAME,c.DATA_TYPE,m.comments from user_tab_columns c,user_col_comments m " +
				"where c.table_name = '"+tablename.toUpperCase()+"' and c.TABLE_NAME=m.table_name " +
						" and c.COLUMN_NAME=m.column_name and c.COLUMN_NAME='"+fieldName.toUpperCase()+"'";
		try {
			String[][] rs = JDBCTool.doSQLQuery(jndi, sql);
			if(null != rs && rs.length > 1){
				tableBean.setTablename(tablename.toUpperCase());
				tableBean.setFieldname(rs[1][0]);
				tableBean.setType(rs[1][1]);
				tableBean.setColumns(rs[1][2]);
			}			
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}
		return tableBean;
	}
	
}
