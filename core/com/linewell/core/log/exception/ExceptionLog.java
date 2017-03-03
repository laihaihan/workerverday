package com.linewell.core.log.exception;
import java.sql.Clob;
 
/**
 * <p>
 * 	异常信息表实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2013-09-29 09:30:08
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class ExceptionLog {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 创建时间
	 */
	private String createtime  = "" ;
		
	/**
	 * 异常信息
	 */
	private Clob message ;
		
	/**
	 * 异常发生的位置
	 */
	private String location  = "" ;
		
	/**
	 * 调用方法
	 */
	private String method  = "" ;
		
	/**
	 * 用户unid
	 */
	private String userid  = "" ;
		
	/**
	 * 用户名
	 */
	private String username  = "" ;
		
	/**
	 * 异常级别
	 */
	private String elevel  = "" ;
		
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
	 * 获取异常信息
	 * @return Clob
	 */
	public Clob getMessage() {
		return message;
	}

	/**
	 * 设置异常信息
	 * @param message
	 *               Clob 异常信息
	 */
	public void setMessage(Clob message) {
		this.message = message;
	}
	
	/**
	 * 获取异常发生的位置
	 * @return String
	 */
	public String getLocation() {
		return location;
	}

	/**
	 * 设置异常发生的位置
	 * @param location
	 *               String 异常发生的位置
	 */
	public void setLocation(String location) {
		this.location = location;
	}
	
	/**
	 * 获取调用方法
	 * @return String
	 */
	public String getMethod() {
		return method;
	}

	/**
	 * 设置调用方法
	 * @param method
	 *               String 调用方法
	 */
	public void setMethod(String method) {
		this.method = method;
	}
	
	/**
	 * 获取用户unid
	 * @return String
	 */
	public String getUserid() {
		return userid;
	}

	/**
	 * 设置用户unid
	 * @param userid
	 *               String 用户unid
	 */
	public void setUserid(String userid) {
		this.userid = userid;
	}
	
	/**
	 * 获取用户名
	 * @return String
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * 设置用户名
	 * @param username
	 *               String 用户名
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	
	/**
	 * 获取异常级别
	 * @return String
	 */
	public String getElevel() {
		return elevel;
	}

	/**
	 * 设置异常级别
	 * @param elevel
	 *               String 异常级别
	 */
	public void setElevel(String elevel) {
		this.elevel = elevel;
	}
		
}
