package com.linewell.emailSys;
 
/**
 * <p>
 * 	实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2016-08-01 17:29:37
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class email {
			
	/**
	 * 
	 */
	private String email_addr  = "" ;
		
	/**
	 * 
	 */
	private String belongto  = "" ;
		
	/**
	 * 获取
	 * @return String
	 */
	public String getEmail_addr() {
		return email_addr;
	}

	/**
	 * 设置
	 * @param email_addr
	 *               String 
	 */
	public void setEmail_addr(String email_addr) {
		this.email_addr = email_addr;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getBelongto() {
		return belongto;
	}

	/**
	 * 设置
	 * @param belongto
	 *               String 
	 */
	public void setBelongto(String belongto) {
		this.belongto = belongto;
	}
		
}
