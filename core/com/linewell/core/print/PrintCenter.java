package com.linewell.core.print;
 
/**
 * <p>
 * 	系统打印中心实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-06-01 10:45:26
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class PrintCenter {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 打印名称
	 */
	private String name  = "" ;
		
	/**
	 * 打印类型0：lodop方式打印，1：ireport方式打印
	 */
	private String type  = "" ;
		
	/**
	 * 关联具体打印配置的unid
	 */
	private String punid  = "" ;
		
	/**
	 * 状态Y：启用，N：禁用
	 */
	private String status  = "" ;
		
	private String isbangding  = "" ;
	
	private String nodeunid  = "" ;
	
	private String nodename  = "" ;

	
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
	 * 获取打印名称
	 * @return String
	 */
	public String getName() {
		return name;
	}

	/**
	 * 设置打印名称
	 * @param name
	 *               String 打印名称
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * 获取打印类型0：lodop方式打印，1：ireport方式打印
	 * @return String
	 */
	public String getType() {
		return type;
	}

	/**
	 * 设置打印类型0：lodop方式打印，1：ireport方式打印
	 * @param type
	 *               String 打印类型0：lodop方式打印，1：ireport方式打印
	 */
	public void setType(String type) {
		this.type = type;
	}
	
	/**
	 * 获取关联具体打印配置的unid
	 * @return String
	 */
	public String getPunid() {
		return punid;
	}

	/**
	 * 设置关联具体打印配置的unid
	 * @param punid
	 *               String 关联具体打印配置的unid
	 */
	public void setPunid(String punid) {
		this.punid = punid;
	}
	
	/**
	 * 获取状态Y：启用，N：禁用
	 * @return String
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * 设置状态Y：启用，N：禁用
	 * @param status
	 *               String 状态Y：启用，N：禁用
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	public String getIsbangding() {
		return isbangding;
	}

	public void setIsbangding(String isbangding) {
		this.isbangding = isbangding;
	}

	public String getNodeunid() {
		return nodeunid;
	}

	public void setNodeunid(String nodeunid) {
		this.nodeunid = nodeunid;
	}

	public String getNodename() {
		return nodename;
	}

	public void setNodename(String nodename) {
		this.nodename = nodename;
	}
		
}
