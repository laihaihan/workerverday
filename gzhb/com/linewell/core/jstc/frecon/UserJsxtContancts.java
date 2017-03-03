package com.linewell.core.jstc.frecon;
 
/**
 * <p>
 * 	联系人实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2014-08-05 15:52:31
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class UserJsxtContancts {
			
	/**
	 * 
	 */
	private String unid  = "" ;
		
	/**
	 * 用户id
	 */
	private String userid  = "" ;
		
	/**
	 * 用户姓名
	 */
	private String username  = "" ;
		
	/**
	 * 联系人id
	 */
	private String frequentcontactsid  = "" ;
		
	/**
	 * 联系人姓名
	 */
	private String frequentcontactsname  = "" ;
		
	/**
	 * 最后联系时间
	 */
	private String lasttimes  = "" ;
		
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
	 * 获取用户id
	 * @return String
	 */
	public String getUserid() {
		return userid;
	}

	/**
	 * 设置用户id
	 * @param userid
	 *               String 用户id
	 */
	public void setUserid(String userid) {
		this.userid = userid;
	}
	
	/**
	 * 获取用户姓名
	 * @return String
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * 设置用户姓名
	 * @param username
	 *               String 用户姓名
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	
	/**
	 * 获取联系人id
	 * @return String
	 */
	public String getFrequentcontactsid() {
		return frequentcontactsid;
	}

	/**
	 * 设置联系人id
	 * @param frequentcontactsid
	 *               String 联系人id
	 */
	public void setFrequentcontactsid(String frequentcontactsid) {
		this.frequentcontactsid = frequentcontactsid;
	}
	
	/**
	 * 获取联系人姓名
	 * @return String
	 */
	public String getFrequentcontactsname() {
		return frequentcontactsname;
	}

	/**
	 * 设置联系人姓名
	 * @param frequentcontactsname
	 *               String 联系人姓名
	 */
	public void setFrequentcontactsname(String frequentcontactsname) {
		this.frequentcontactsname = frequentcontactsname;
	}
	
	/**
	 * 获取最后联系时间
	 * @return String
	 */
	public String getLasttimes() {
		return lasttimes;
	}

	/**
	 * 设置最后联系时间
	 * @param lasttimes
	 *               String 最后联系时间
	 */
	public void setLasttimes(String lasttimes) {
		this.lasttimes = lasttimes;
	}
		
}
