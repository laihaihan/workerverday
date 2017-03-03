package com.linewell.core.db;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.linewell.core.util.OracleDbUtil;
import com.linewell.core.util.Reflection;

public class DbObjectByTableBuilder {
	
	/**
	 * 构建数据库插入语句
	 * 例：insert(column1,column2)values(?,?)
	 * @author zjianhui@linewell.com
	 * @date: Jul 7, 2011 
	 * <p>
	 * @param jndi 数据操作
	 * @param tableName  需要操作的表
	 * @return 构建后的sql
	 * </p>
	 */
	public String createDBInsertSql(String jndi,String tableName){
		String[][] rs = OracleDbUtil.getCommentsByTablename(jndi, tableName);
		StringBuffer sb = new StringBuffer();
		String tmpStr = "";
		sb.append("insert into "+tableName+" (");
		if(null != rs && rs.length>1){
			for (int i = 1; i < rs.length; i++) {
				tmpStr = (rs[i][0]); 
				sb.append(tmpStr);
				if(i < rs.length-1){
					sb.append(",");
				}
			}
		}
		
		sb.append(")values(");
		if(null != rs && rs.length>1){
			for (int i = 1; i < rs.length; i++) {
				sb.append("?");
				if(i < rs.length-1){
					sb.append(",");
				}
			}
		}
		
		sb.append(")");
		
		return sb.toString();
	}
	
	
	/**
	 * 构建数据库插入对象数组参数
	 * @author zjianhui@linewell.com
	 * @date: Jul 7, 2011 
	 * <p>
	 * @param jndi 数据操作
	 * @param tableName  需要操作的表
	 * @return 构建后的对象数组
	 * </p>
	 */
	public Object[] createDBInsertParams(String jndi,String tableName,HttpServletRequest request){
		Reflection rf = new Reflection();
		// 获取所有的setter名称
		String[][] rs = OracleDbUtil.getCommentsByTablename(jndi, tableName);
		Object[] params = new Object[rs.length-1]; 
		if(null != rs && rs.length>1){
			for (int i = 1; i < rs.length; i++) {
				params[i-1] = request.getParameter(rs[i][0]);  
			}
		}
		return params;
	}	
	
	
	
}
