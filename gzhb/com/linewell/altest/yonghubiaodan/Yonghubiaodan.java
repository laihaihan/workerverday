package com.linewell.altest.yonghubiaodan;
 
/**
 * <p>
 * 	用户表单实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2013-08-01 19:01:37
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class Yonghubiaodan {
			
	/**
	 * 
	 */
	private String unid  = "" ;
		
	/**
	 * 用户名
	 */
	private String username  = "" ;
		
	/**
	 * 密码
	 */
	private String pwd  = "" ;
		
	/**
	 * 邮件
	 */
	private String email  = "" ;
		
	/**
	 * 获取
	 * @return String
	 */
	public String getUnid() {
		return unid;
	}

	/**
	 * 设置
	 * @param unid
	 *               String 
	 */
	public void setUnid(String unid) {
		this.unid = unid;
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
	 * 获取密码
	 * @return String
	 */
	public String getPwd() {
		return pwd;
	}

	/**
	 * 设置密码
	 * @param pwd
	 *               String 密码
	 */
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	
	/**
	 * 获取邮件
	 * @return String
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * 设置邮件
	 * @param email
	 *               String 邮件
	 */
	public void setEmail(String email) {
		this.email = email;
	}
		
}
