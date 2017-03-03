package com.linewell.core.log.http;
 
/**
 * <p>
 * 	实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2013-09-29 11:04:41
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class LogHttp {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * url
	 */
	private String url  = "" ;
		
	/**
	 * 开始时间
	 */
	private String createtime  = "" ;
		
	/**
	 * 结束时间
	 */
	private String destore  = "" ;
		
	/**
	 * 耗时（ms）
	 */
	private double activetime ;
		
	/**
	 * 访问客户端id地址
	 */
	private String ipaddress  = "" ;
		
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
	 * 获取url
	 * @return String
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * 设置url
	 * @param url
	 *               String url
	 */
	public void setUrl(String url) {
		this.url = url;
	}
	
	/**
	 * 获取开始时间
	 * @return String
	 */
	public String getCreatetime() {
		return createtime;
	}

	/**
	 * 设置开始时间
	 * @param createtime
	 *               String 开始时间
	 */
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	
	/**
	 * 获取结束时间
	 * @return String
	 */
	public String getDestore() {
		return destore;
	}

	/**
	 * 设置结束时间
	 * @param destore
	 *               String 结束时间
	 */
	public void setDestore(String destore) {
		this.destore = destore;
	}
	
	/**
	 * 获取耗时（ms）
	 * @return double
	 */
	public double getActivetime() {
		return activetime;
	}

	/**
	 * 设置耗时（ms）
	 * @param activetime
	 *               double 耗时（ms）
	 */
	public void setActivetime(double activetime) {
		this.activetime = activetime;
	}
	
	/**
	 * 获取访问客户端id地址
	 * @return String
	 */
	public String getIpaddress() {
		return ipaddress;
	}

	/**
	 * 设置访问客户端id地址
	 * @param ipaddress
	 *               String 访问客户端id地址
	 */
	public void setIpaddress(String ipaddress) {
		this.ipaddress = ipaddress;
	}
		
}
