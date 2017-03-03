

package com.linewell.core.util;

import java.sql.SQLException;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;

/**
 *功能说明：oracle的相关工具类
 *<P></P>
 *@author chh
 *@since 2013
 *
 */
public class OracleDbUtil {
	private static Logger log = Logger.getLogger(OracleDbUtil.class);
	/**
	 * 
	 * 功能说明:根据表名获取该表所有的字段信息
	 * @param tableName
	 * @throws SQLException
	 * String[][]
	 * @author chh
	 * @Jan 15, 2013
	 */
	public static String[][] getColumnsByTablename(String jndi,String tableName) throws SQLException {
		String sql ="select t.COLUMN_NAME from user_tab_columns t where t.TABLE_NAME='"+tableName.toUpperCase()+"' ";
		return JDBCTool.doSQLQuery(jndi, sql);
	}

	/**
	 * 
	 * 功能说明:根据表名判断该表是否已经有记录
	 * @param tableName
	 * @return  true=有记录
	 * @author chh
	 * @Jan 16, 2013
	 */
	public static boolean  hasRecord(String jndi,String tableName){
		String sql ="select count(1) from "+tableName;
		try {
			String ret [][] =JDBCTool.doSQLQuery(jndi, sql);
			if(Long.valueOf(ret[1][0])>0){return true;}
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		return false;
	}

	/**
	 * 
	 * 功能说明:删除表结构
	 * @param tableName
	 * @author chh
	 * @Jan 16, 2013
	 */
	public static boolean dropTable(String jndi,String tableName){
		if(OracleDbUtil.tableIsExist(jndi,tableName)){
		String sql =" drop table "+tableName;
			try {
				 JDBCTool.doSQLUpdate(jndi, sql);
				 return true;
			} catch (SQLException e) {
				log.error("删除表失败，表名【"+tableName+"】"+e.getMessage(),e);
				 return false;
			}
		}
		return true;
	}
	/**
	 * 
	 * 功能说明:根据应用系统判断表是否存在
	 * @param jndi    -应用系统的连接池
	 * @param tablename	- 表名
	 * @author chh
	 * @Jan 15, 2013
	 */
	public static boolean tableIsExist(String jndi,String tablename){
		boolean flag = false;
		String sql = "select count(*) from user_tables where table_name='"+(tablename).toUpperCase()+"'";
		try {
			String[][] rs = JDBCTool.doSQLQuery(jndi,sql);
			if(Integer.parseInt(rs[1][0])>0){
				flag = true;
			}
		} catch (SQLException e) {
		    log.error(e);
		}
		return flag;
	}
	/**
	 * 
	 * 功能说明:获取当前用户所有的表
	 * @param jndi
	 * @return String[i][0]=表名 
	 * @author chh
	 * @Jan 21, 2013
	 */
	public static String [][] getTables(String jndi){
		String sql = "select table_name from user_tables ";
		String[][] rs =null;
		try {
			 rs = JDBCTool.doSQLQuery(jndi,sql);
			
		} catch (SQLException e) {
		    log.error(e);
		}
		return rs;
	}
	public static String getTablesSelect(String jndi,String name,String value){
		StringBuffer sb =new StringBuffer();
		sb.append("<select name='"+name+"' and id='"+name+"'>");
		sb.append("<option value=''>--请选择--</option>");
		String [][]tables =getTables(jndi);
		
		for(int i=1;i<tables.length;i++){
			if(value.equalsIgnoreCase(tables[i][0])){
				sb.append("<option value='"+tables[i][0]+"' selected>"+tables[i][0]+"</option>");
			}else{
				sb.append("<option value='"+tables[i][0]+"' >"+tables[i][0]+"</option>");
			}
		}
		sb.append("</select>");
		return sb.toString();
	}
	/**
	 * 
	 * 功能说明:根据表名获取表字段和字段注释
	 * @param jndi
	 * @param tableName
	 * @return String[i][0]=字段名 ;String[i][1]=字段注释
	 * @author chh
	 * @Jan 21, 2013
	 */
	public static String [][] getCommentsByTablename(String jndi,String tableName){
		String sql ="select b.column_name,b.comments from user_col_comments b where b.table_name='"+tableName.toUpperCase()+"'";
		String[][] rs =null;
		try {
			 rs = JDBCTool.doSQLQuery(jndi,sql);
			
		} catch (SQLException e) {
		    log.error(e);
		}
		return rs;
	}
	
	
	 /**
     * 根据表名获取表的主键（只限于oracle）
     * @param tableName	-表名
     * @return
     */
    public static String getTableKeyColumn(String jdni,String tableName){
    	String sValue="unid";
    	String sql ="select column_name\n" +
    	"  from user_cons_columns\n" + 
    	" where position = 1\n" + 
    	"   AND constraint_name = (select constraint_name\n" + 
    	"                            from user_constraints\n" + 
    	"                           where table_name = '"+tableName.toUpperCase()+"'\n" + 
    	"                             and constraint_type = 'P')";
    	String ret[][]=null;
		try {
			ret = JDBCTool.doSQLQuery(jdni,sql.toString());
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		if(ret.length>1){
			sValue = ret[1][0];
		}
		return sValue;

    }

}

