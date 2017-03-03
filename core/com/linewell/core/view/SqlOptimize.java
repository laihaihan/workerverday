package com.linewell.core.view;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 
 * <p>
 * SQL 语句优化
 * </p>
 * 
 * @author cyingquan@linewell.com
 * @version 1.00 - 2012 4 16
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */
public class SqlOptimize {
	/**
	 * Logger for this class
	 */
	private static final Log logger = LogFactory.getLog(SqlOptimize.class);
	
	
	/**
	 * 优化SQL
	 * @param sql
	 * @return String
	 */
	public static String optimize(String sql){
		//1.去除like '%% ,like '%'
		sql = optimizeLike(sql);
		
		return sql;
	}
	
	/**
	 * 优化sql 去除条件LIKE '%%'
	 * @param sql
	 * @return
	 */
	private static String optimizeLike(String sql){
		
		if (sql.indexOf("'%%'")==-1 ) {
			return sql;
		}
		sql = sql.replaceAll("\n", " ");
		
		String[] likes = {"'%%'"};
		for (int i = 0; i < likes.length; i++) {		
			logger.debug("优化前语句:"+sql);
			int count = 0;
			while (sql.indexOf(likes[i])>-1) {		
				
				String beforeSql = StringUtils.substringBefore(sql, likes[i]);
				String afterSql = StringUtils.substringAfter(sql,likes[i]);
				
				int startIndex = getPrevKeyIndex(beforeSql);
				int endIndex = getNextKeyIndex(afterSql);
				
				String prevKey = getPrevKey(beforeSql);
				String nextKey = getNextKey(afterSql);	
				
				logger.debug("prevKey:"+prevKey);
				logger.debug("nextKey:"+nextKey);
				
				if("(".equals(prevKey)){
					if(")".equals(nextKey)){
						startIndex = getPrevKeyIndex(sql.substring(0, startIndex));
						endIndex = endIndex+nextKey.length();
						
					}if("AND".equals(nextKey) || "OR".equals(nextKey)){
						startIndex = startIndex + 1;
						endIndex = endIndex+nextKey.length();
					}
					
					
				}else if("WHERE".equals(prevKey) && StringUtils.isNotEmpty(nextKey)){		
					if("AND".equals(nextKey) || "OR".equals(nextKey)){
						startIndex = startIndex + 5;
						endIndex = endIndex+nextKey.length();
					}
				}
				
				sql = beforeSql.substring(0, startIndex)+afterSql.substring(endIndex,afterSql.length());
				
				logger.debug("截取["+count+"]: "+ beforeSql.substring(startIndex)+ likes[i] + afterSql.substring(0,endIndex));
				logger.debug("优化后语句["+count+++"]:"+sql+"\n");
			}
		}		
		
		return sql;
	}
	
	
	
	public static void main(String[] args) {
		String sql = "SELECT * FROM ADVANCE_INFO\n" +
		"WHERE\n"+
		"APPLYNAME LIKE '%%'\n" + 
		"AND PROJECTNAME LIKE '%%'\n" + 
		"AND ADVANCE_CODE LIKE '%%'\n" + 
		"ORDER BY CREATE_TIME DESC";

		//System.out.println(sql.replaceAll("\n", " "));

		sql = SqlOptimize.optimize(sql);	
	}
	
	
	private static int getPrevKeyIndex(String beforeSql){
		int prevIndex = 0;
		
		int lastAnd = beforeSql.lastIndexOf(" AND ")+1;
		int lastOr = beforeSql.lastIndexOf(" OR ")+1;
		int lastWhere = beforeSql.lastIndexOf(" WHERE ")+1;
		int lastLeftBracket = beforeSql.lastIndexOf("(");
		int lastrightBracket = beforeSql.lastIndexOf(")");
		
		prevIndex = lastAnd;
		if (lastOr > prevIndex) {
			prevIndex = lastOr;
		}
		if (lastWhere > prevIndex) {
			prevIndex = lastWhere;
		}
		
		if (lastLeftBracket > prevIndex) {
			prevIndex = lastLeftBracket;
		}
		if (lastrightBracket > prevIndex) {
			prevIndex = lastAnd;
			if (lastOr > prevIndex) {
				prevIndex = lastOr;
			}
			if (lastWhere > prevIndex) {
				prevIndex = lastWhere;
			}
		}
		
		return prevIndex;
	}
	private static String getNextKey(String afterSql) {
		String nextKey = "";

		String str = StringUtils.stripToEmpty(afterSql);
		if (StringUtils.startsWith(str, "AND ")) {
			nextKey = "AND";
		} else if (StringUtils.startsWith(str, "ORDER ")) {
			nextKey = "ORDER";
		} else if (StringUtils.startsWith(str, "OR ")) {
			nextKey = "OR";
		} else if (StringUtils.startsWith(str, ")")) {
			nextKey = ")";
		}else if (StringUtils.startsWith(str, "GROUP ")) {
			nextKey = "GROUP";
		}

		return nextKey;
	}
	
	private static String getPrevKey(String beforeSql){
		String prevKey = "";
		
		int lastAnd = beforeSql.lastIndexOf(" AND ");
		int lastOr = beforeSql.lastIndexOf(" OR ");
		int lastWhere = beforeSql.lastIndexOf(" WHERE ");
		int lastLeftBracket = beforeSql.lastIndexOf("(");
		int lastrightBracket = beforeSql.lastIndexOf(")");
		
		int prevIndex = lastAnd;
		prevKey = "AND";		
		if (lastOr > prevIndex) {
			prevKey = "OR";
		}
		if (lastWhere > prevIndex) {
			prevKey = "WHERE";
		}
		if (lastLeftBracket > prevIndex) {
			prevKey = "(";
		}
		if (lastrightBracket > prevIndex) {
			prevKey = "AND";		
			if (lastOr > prevIndex) {
				prevKey = "OR";
			}
			if (lastWhere > prevIndex) {
				prevKey = "WHERE";
			}
		}
		
		return prevKey;
	}
	
	private static int getNextKeyIndex(String afterSql){
		int nextIndex = 0;
		
		int indexAnd = afterSql.indexOf(" AND ")+1;
		int indexOr = afterSql.indexOf(" OR ")+1;
		int indexBracket = afterSql.indexOf(")");		
		
		afterSql = StringUtils.stripToEmpty(afterSql);
		if (StringUtils.startsWith(afterSql,"AND ")) {
			nextIndex = indexAnd;
		}else if (StringUtils.startsWith(afterSql,"OR ")) {
			nextIndex = indexOr;
		}else if (StringUtils.startsWith(afterSql,")")) {
			nextIndex = indexBracket;
		}else{
			nextIndex = 0;
		}
		
		return nextIndex;
	}
	

}
