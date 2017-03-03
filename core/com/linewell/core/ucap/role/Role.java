package com.linewell.core.ucap.role;
/**
 * <p>
 *    角色信息
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 5, 2012
 * @version 1.0  
 */
public class Role {
			
	/**
	 * 
	 */
	private String role_unid  = "" ;
		
	/**
	 * 
	 */
	private String role_name  = "" ;
		
	/**
	 * 
	 */
	private String role_name_spell  = "" ;
		
	/**
	 * 
	 */
	private String role_belong_to_app  = "" ;
		
	/**
	 * 
	 */
	private String role_users  = "" ;
		
	/**
	 * 父级角色标识
	 */
	private String role_funid  = "" ;
		
	/**
	 * 排序号
	 */
	private long role_sort ;
		
	/**
	 * 角色类型
	 */
	private String role_type  = "" ;
		
	/**
	 * 此角色能否创建子角色
	 */
	private String role_can_create  = "" ;
		
	/**
	 * 此角色能否进行授权
	 */
	private String role_can_authorize  = "" ;
		
	/**
	 * 获取
	 * @return String
	 */
	public String getRole_unid() {
		return role_unid;
	}

	/**
	 * 设置
	 * @param role_unid
	 *               String 
	 */
	public void setRole_unid(String role_unid) {
		this.role_unid = role_unid;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getRole_name() {
		return role_name;
	}

	/**
	 * 设置
	 * @param role_name
	 *               String 
	 */
	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getRole_name_spell() {
		return role_name_spell;
	}

	/**
	 * 设置
	 * @param role_name_spell
	 *               String 
	 */
	public void setRole_name_spell(String role_name_spell) {
		this.role_name_spell = role_name_spell;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getRole_belong_to_app() {
		return role_belong_to_app;
	}

	/**
	 * 设置
	 * @param role_belong_to_app
	 *               String 
	 */
	public void setRole_belong_to_app(String role_belong_to_app) {
		this.role_belong_to_app = role_belong_to_app;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getRole_users() {
		return role_users;
	}

	/**
	 * 设置
	 * @param role_users
	 *               String 
	 */
	public void setRole_users(String role_users) {
		this.role_users = role_users;
	}
	
	/**
	 * 获取父级角色标识
	 * @return String
	 */
	public String getRole_funid() {
		return role_funid;
	}

	/**
	 * 设置父级角色标识
	 * @param role_funid
	 *               String 父级角色标识
	 */
	public void setRole_funid(String role_funid) {
		this.role_funid = role_funid;
	}
	
	/**
	 * 获取排序号
	 * @return long
	 */
	public long getRole_sort() {
		return role_sort;
	}

	/**
	 * 设置排序号
	 * @param role_sort
	 *               long 排序号
	 */
	public void setRole_sort(long role_sort) {
		this.role_sort = role_sort;
	}
	
	/**
	 * 获取角色类型
	 * @return String
	 */
	public String getRole_type() {
		return role_type;
	}

	/**
	 * 设置角色类型
	 * @param role_type
	 *               String 角色类型
	 */
	public void setRole_type(String role_type) {
		this.role_type = role_type;
	}
	
	/**
	 * 获取此角色能否创建子角色
	 * @return String
	 */
	public String getRole_can_create() {
		return role_can_create;
	}

	/**
	 * 设置此角色能否创建子角色
	 * @param role_can_create
	 *               String 此角色能否创建子角色
	 */
	public void setRole_can_create(String role_can_create) {
		this.role_can_create = role_can_create;
	}
	
	/**
	 * 获取此角色能否进行授权
	 * @return String
	 */
	public String getRole_can_authorize() {
		return role_can_authorize;
	}

	/**
	 * 设置此角色能否进行授权
	 * @param role_can_authorize
	 *               String 此角色能否进行授权
	 */
	public void setRole_can_authorize(String role_can_authorize) {
		this.role_can_authorize = role_can_authorize;
	}
}
