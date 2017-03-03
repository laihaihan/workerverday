package com.linewell.core.util;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
/**
 * 
 * <p>
 * 	sql 常用解析工具
 * </p>
 * 
 * @author cyingquan@linewell.com
 * @version 2012 5 9
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */
public class SqlUtil {
	/**
	 * Logger for this class
	 */
	private static final Log logger = LogFactory.getLog(SqlUtil.class);
	
	
	/**
	 * 获取表名
	 * @param sql
	 * @return String[]
	 */
	public static String[] getTables(String sql){
		String tables = "";		
		sql = sql.replaceAll(" from ", " FROM ");
		
		while (sql.indexOf(" FROM ")>-1) {
			sql = StringUtils.stripToEmpty(StringUtils.substringAfter(sql, " FROM ")) ;			
			if(StringUtils.startsWith(sql, "(")){
				continue;
			}
			int endIndex = getTableEndIndex(sql);
			String tableSql = sql.substring(0,endIndex);
			String[] tableArray = tableSql.split(",");
			for (int i = 0; i < tableArray.length; i++) {
				String tmp = tableArray[i]+" ";
				tables += (tables.length()==0?"":",")+tmp.substring(0, tmp.indexOf(" "));
			}
		}
		
		return tables.split(",");
	}
	
	public static String toSqlCondition(String condition){
		String sql = "";
		
		String[] sqlAry = condition.split(",");
		for (int i = 0; i < sqlAry.length; i++) {
			sql += (i==0?"'"+sqlAry[i]+"'":",'"+sqlAry[i]+"'");
		}
		
		return sql;
	}
	
	private static int getTableEndIndex(String afterFromSql) {
		int index = afterFromSql.length();

		int whereIndex = afterFromSql.indexOf("WHERE");
		int bracketIndex = afterFromSql.indexOf(")");
		int orderIndex = afterFromSql.indexOf("ORDER");
		int groupIndex = afterFromSql.indexOf("GROUP");

		if (index > whereIndex && whereIndex != -1) {
			index = whereIndex;
		}
		if (index > bracketIndex && bracketIndex != -1) {
			index = bracketIndex;
		}
		if (index > orderIndex && orderIndex != -1) {
			index = orderIndex;
		}
		if (index > groupIndex && groupIndex != -1) {
			index = groupIndex;
		}

		return index;
	}
}
