package com.linewell.core.log.jdbc;
 
/**
 * <p>
 * 	实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2013-09-29 10:46:35
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class LogJDBC {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 创建时间
	 */
	private String createtime  = "" ;
		
	/**
	 * 持续时间
	 */
	private double activetime ;
		
	/**
	 * sql内容
	 */
	private String sql  = "" ;
		
	/**
	 * 获取主键
	 * @return String
	 */
	public String getUnid() {
		return unid;
	}

	/**
	 * 设置主键
	 * @param unid
	 *               String 主键
	 */
	public void setUnid(String unid) {
		this.unid = unid;
	}
	
	/**
	 * 获取创建时间
	 * @return String
	 */
	public String getCreatetime() {
		return createtime;
	}

	/**
	 * 设置创建时间
	 * @param createtime
	 *               String 创建时间
	 */
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	
	/**
	 * 获取持续时间
	 * @return double
	 */
	public double getActivetime() {
		return activetime;
	}

	/**
	 * 设置持续时间
	 * @param activetime
	 *               double 持续时间
	 */
	public void setActivetime(double activetime) {
		this.activetime = activetime;
	}
	
	/**
	 * 获取sql内容
	 * @return String
	 */
	public String getSql() {
		return sql;
	}

	/**
	 * 设置sql内容
	 * @param sql
	 *               String sql内容
	 */
	public void setSql(String sql) {
		this.sql = sql;
	}
		
}
