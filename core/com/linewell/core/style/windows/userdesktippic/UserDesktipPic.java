package com.linewell.core.style.windows.userdesktippic;
 
/**
 * <p>
 * 	实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-12-12 11:27:01
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class UserDesktipPic {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 用户id
	 */
	private String userid  = "" ;
		
	/**
	 * 当前桌面壁纸路径
	 */
	private String curpicpath  = "" ;
		

	/**
	 * 当前桌面壁纸路径
	 */
	private String app_unid  = "" ;
	
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
	 * 获取当前桌面壁纸路径
	 * @return String
	 */
	public String getCurpicpath() {
		return curpicpath;
	}

	/**
	 * 设置当前桌面壁纸路径
	 * @param curpicpath
	 *               String 当前桌面壁纸路径
	 */
	public void setCurpicpath(String curpicpath) {
		this.curpicpath = curpicpath;
	}

	public String getApp_unid() {
		return app_unid;
	}

	public void setApp_unid(String app_unid) {
		this.app_unid = app_unid;
	}
		
}
