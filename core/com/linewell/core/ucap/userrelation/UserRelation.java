package com.linewell.core.ucap.userrelation;
/**
 * <p>用户信息</p>
 * @email lfunian@linewell.com
 * @date Sep 26, 2013
 * @version 1.0  
 */
public class UserRelation {
	/**
	 * 主键
	 */
	private String unid = "";
	
	/**
	 * 用户unid
	 */
	private String user_unid = "";
	
	/**
	 * 应用系统unid
	 */
	private String app_unid = "";
	
	/**
	 * 扩展字段_1
	 */
	private String user_field_one = "";
	
	/**
	 * 扩展字段_2
	 */
	private String user_field_two = "";
	
	/**
	 * 扩展字段_3
	 */
	private String user_field_three = "";

	public String getUnid() {
		return unid;
	}

	public void setUnid(String unid) {
		this.unid = unid;
	}

	public String getUser_unid() {
		return user_unid;
	}

	public void setUser_unid(String user_unid) {
		this.user_unid = user_unid;
	}

	public String getApp_unid() {
		return app_unid;
	}

	public void setApp_unid(String app_unid) {
		this.app_unid = app_unid;
	}

	public String getUser_field_one() {
		return user_field_one;
	}

	public void setUser_field_one(String user_field_one) {
		this.user_field_one = user_field_one;
	}

	public String getUser_field_two() {
		return user_field_two;
	}

	public void setUser_field_two(String user_field_two) {
		this.user_field_two = user_field_two;
	}

	public String getUser_field_three() {
		return user_field_three;
	}

	public void setUser_field_three(String user_field_three) {
		this.user_field_three = user_field_three;
	}
}
