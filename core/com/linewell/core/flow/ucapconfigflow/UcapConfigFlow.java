package com.linewell.core.flow.ucapconfigflow;
import java.sql.Blob;
 
/**
 * <p>
 * 	实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2013-04-08 15:25:24
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class UcapConfigFlow {
			
	/**
	 * 
	 */
	private Blob flow_content ;
		
	/**
	 * 
	 */
	private String flow_belong_to_module  = "" ;
		
	/**
	 * 
	 */
	private String flow_unid  = "" ;
		
	/**
	 * 
	 */
	private String flow_name  = "" ;
		
	/**
	 * 
	 */
	private String flow_use_scopes  = "" ;
		
	/**
	 * 
	 */
	private String flow_issubflow  = "" ;
		
	/**
	 * 
	 */
	private String flow_sort  = "" ;
		
	/**
	 * 
	 */
	private String flow_formid  = "" ;
		
	/**
	 * 
	 */
	private String flow_belong_dept  = "" ;
		
	/**
	 * 
	 */
	private String flow_belong_to_app  = "" ;
		
	/**
	 * 获取
	 * @return Blob
	 */
	public Blob getFlow_content() {
		return flow_content;
	}

	/**
	 * 设置
	 * @param flow_content
	 *               Blob 
	 */
	public void setFlow_content(Blob flow_content) {
		this.flow_content = flow_content;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getFlow_belong_to_module() {
		return flow_belong_to_module;
	}

	/**
	 * 设置
	 * @param flow_belong_to_module
	 *               String 
	 */
	public void setFlow_belong_to_module(String flow_belong_to_module) {
		this.flow_belong_to_module = flow_belong_to_module;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getFlow_unid() {
		return flow_unid;
	}

	/**
	 * 设置
	 * @param flow_unid
	 *               String 
	 */
	public void setFlow_unid(String flow_unid) {
		this.flow_unid = flow_unid;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getFlow_name() {
		return flow_name;
	}

	/**
	 * 设置
	 * @param flow_name
	 *               String 
	 */
	public void setFlow_name(String flow_name) {
		this.flow_name = flow_name;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getFlow_use_scopes() {
		return flow_use_scopes;
	}

	/**
	 * 设置
	 * @param flow_use_scopes
	 *               String 
	 */
	public void setFlow_use_scopes(String flow_use_scopes) {
		this.flow_use_scopes = flow_use_scopes;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getFlow_issubflow() {
		return flow_issubflow;
	}

	/**
	 * 设置
	 * @param flow_issubflow
	 *               String 
	 */
	public void setFlow_issubflow(String flow_issubflow) {
		this.flow_issubflow = flow_issubflow;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getFlow_sort() {
		return flow_sort;
	}

	/**
	 * 设置
	 * @param flow_sort
	 *               String 
	 */
	public void setFlow_sort(String flow_sort) {
		this.flow_sort = flow_sort;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getFlow_formid() {
		return flow_formid;
	}

	/**
	 * 设置
	 * @param flow_formid
	 *               String 
	 */
	public void setFlow_formid(String flow_formid) {
		this.flow_formid = flow_formid;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getFlow_belong_dept() {
		return flow_belong_dept;
	}

	/**
	 * 设置
	 * @param flow_belong_dept
	 *               String 
	 */
	public void setFlow_belong_dept(String flow_belong_dept) {
		this.flow_belong_dept = flow_belong_dept;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getFlow_belong_to_app() {
		return flow_belong_to_app;
	}

	/**
	 * 设置
	 * @param flow_belong_to_app
	 *               String 
	 */
	public void setFlow_belong_to_app(String flow_belong_to_app) {
		this.flow_belong_to_app = flow_belong_to_app;
	}
		
}
