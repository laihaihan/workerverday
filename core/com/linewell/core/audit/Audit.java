package com.linewell.core.audit;
 
/**
 * <p>
 * 	审计管理表实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2013-09-24 17:12:03
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class Audit {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 用户unid
	 */
	private String ouser  = "" ;
		
	/**
	 * 用户名
	 */
	private String ouser_cn_  = "" ;
		
	/**
	 * 登录账号
	 */
	private String account  = "" ;
		
	/**
	 * 系统unid
	 */
	private String appunid  = "" ;
		
	/**
	 * 系统名称
	 */
	private String appname  = "" ;
		
	/**
	 * 客户端浏览器
	 */
	private String clientbrowser  = "" ;
		
	/**
	 * 操作时间
	 */
	private String createtime  = "" ;
		
	/**
	 * 描述信息
	 */
	private String remark  = "" ;
		
	/**
	 * 客户端IP
	 */
	private String clientip  = "" ;
		
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
	 * 获取用户unid
	 * @return String
	 */
	public String getOuser() {
		return ouser;
	}

	/**
	 * 设置用户unid
	 * @param ouser
	 *               String 用户unid
	 */
	public void setOuser(String ouser) {
		this.ouser = ouser;
	}
	
	/**
	 * 获取用户名
	 * @return String
	 */
	public String getOuser_cn_() {
		return ouser_cn_;
	}

	/**
	 * 设置用户名
	 * @param ouser_cn_
	 *               String 用户名
	 */
	public void setOuser_cn_(String ouser_cn_) {
		this.ouser_cn_ = ouser_cn_;
	}
	
	/**
	 * 获取登录账号
	 * @return String
	 */
	public String getAccount() {
		return account;
	}

	/**
	 * 设置登录账号
	 * @param account
	 *               String 登录账号
	 */
	public void setAccount(String account) {
		this.account = account;
	}
	
	/**
	 * 获取系统unid
	 * @return String
	 */
	public String getAppunid() {
		return appunid;
	}

	/**
	 * 设置系统unid
	 * @param appunid
	 *               String 系统unid
	 */
	public void setAppunid(String appunid) {
		this.appunid = appunid;
	}
	
	/**
	 * 获取系统名称
	 * @return String
	 */
	public String getAppname() {
		return appname;
	}

	/**
	 * 设置系统名称
	 * @param appname
	 *               String 系统名称
	 */
	public void setAppname(String appname) {
		this.appname = appname;
	}
	
	/**
	 * 获取客户端浏览器
	 * @return String
	 */
	public String getClientbrowser() {
		return clientbrowser;
	}

	/**
	 * 设置客户端浏览器
	 * @param clientbrowser
	 *               String 客户端浏览器
	 */
	public void setClientbrowser(String clientbrowser) {
		this.clientbrowser = clientbrowser;
	}
	
	/**
	 * 获取操作时间
	 * @return String
	 */
	public String getCreatetime() {
		return createtime;
	}

	/**
	 * 设置操作时间
	 * @param createtime
	 *               String 创建操作时间
	 */
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	
	/**
	 * 获取描述信息
	 * @return String
	 */
	public String getRemark() {
		return remark;
	}

	/**
	 * 设置描述信息
	 * @param remark
	 *               String 描述信息
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	/**
	 * 获取客户端IP
	 * @return String
	 */
	public String getClientip() {
		return clientip;
	}

	/**
	 * 设置客户端IP
	 * @param clientip
	 *               String 客户端IP
	 */
	public void setClientip(String clientip) {
		this.clientip = clientip;
	}
		
}
