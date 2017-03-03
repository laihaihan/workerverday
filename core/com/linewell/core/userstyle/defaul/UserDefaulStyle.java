package com.linewell.core.userstyle.defaul;
 
/**
 * <p>
 * 	用户默认样式实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-12-18 17:01:42
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class UserDefaulStyle {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 样式url
	 */
	private String styleurl  = "" ;
		
	/**
	 * 用户id
	 */
	private String userid  = "" ;
	
	/**
	 * 系统id
	 */
	private String appunid  = "" ;
			
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
	 * 获取样式url
	 * @return String
	 */
	public String getStyleurl() {
		return styleurl;
	}

	/**
	 * 设置样式url
	 * @param styleurl
	 *               String 样式url
	 */
	public void setStyleurl(String styleurl) {
		this.styleurl = styleurl;
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

	public String getAppunid() {
		return appunid;
	}

	public void setAppunid(String appunid) {
		this.appunid = appunid;
	}
		
}
