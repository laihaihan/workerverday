package com.linewell.core.ucap.bussiness.permission;
 
/**
 * <p>
 * 	实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-10-10 17:45:45
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class BussinessPermission {
			
	/**
	 * 主键
	 */
	private String bp_unid  = "" ;
		
	/**
	 * 主体
	 */
	private String bp_subjectid  = "" ;
		
	/**
	 * 客体
	 */
	private String bp_objectid  = "" ;
		
	/**
	 * 权限方式
	 */
	private String bp_mode  = "" ;
		
	/**
	 * 所属应用系统
	 */
	private String bp_belong_to_app  = "" ;
		
	/**
	 * 获取主键
	 * @return String
	 */
	public String getBp_unid() {
		return bp_unid;
	}

	/**
	 * 设置主键
	 * @param bp_unid
	 *               String 主键
	 */
	public void setBp_unid(String bp_unid) {
		this.bp_unid = bp_unid;
	}
	
	/**
	 * 获取主体
	 * @return String
	 */
	public String getBp_subjectid() {
		return bp_subjectid;
	}

	/**
	 * 设置主体
	 * @param bp_subjectid
	 *               String 主体
	 */
	public void setBp_subjectid(String bp_subjectid) {
		this.bp_subjectid = bp_subjectid;
	}
	
	/**
	 * 获取客体
	 * @return String
	 */
	public String getBp_objectid() {
		return bp_objectid;
	}

	/**
	 * 设置客体
	 * @param bp_objectid
	 *               String 客体
	 */
	public void setBp_objectid(String bp_objectid) {
		this.bp_objectid = bp_objectid;
	}
	
	/**
	 * 获取权限方式
	 * @return String
	 */
	public String getBp_mode() {
		return bp_mode;
	}

	/**
	 * 设置权限方式
	 * @param bp_mode
	 *               String 权限方式
	 */
	public void setBp_mode(String bp_mode) {
		this.bp_mode = bp_mode;
	}
	
	/**
	 * 获取所属应用系统
	 * @return String
	 */
	public String getBp_belong_to_app() {
		return bp_belong_to_app;
	}

	/**
	 * 设置所属应用系统
	 * @param bp_belong_to_app
	 *               String 所属应用系统
	 */
	public void setBp_belong_to_app(String bp_belong_to_app) {
		this.bp_belong_to_app = bp_belong_to_app;
	}
		
}
