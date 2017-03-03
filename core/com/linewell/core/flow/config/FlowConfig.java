package com.linewell.core.flow.config;
 
/**
 * <p>
 * 	流程状态表实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2013-04-08 10:41:45
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class FlowConfig {
			
	private String appunid = "";
	
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 流程所属
	 */
	private String punid  = "" ;
		
	/**
	 * 流程唯一标识
	 */
	private String flowid  = "" ;
		
	/**
	 * 状态：1.候选    2.绑定    99.删除
	 */
	private double state ;
		
	/**
	 * 流程名称
	 */
	private String name  = "" ;
		
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
	 * 获取流程所属
	 * @return String
	 */
	public String getPunid() {
		return punid;
	}

	/**
	 * 设置流程所属
	 * @param punid
	 *               String 流程所属
	 */
	public void setPunid(String punid) {
		this.punid = punid;
	}
	
	/**
	 * 获取流程唯一标识
	 * @return String
	 */
	public String getFlowid() {
		return flowid;
	}

	/**
	 * 设置流程唯一标识
	 * @param flowid
	 *               String 流程唯一标识
	 */
	public void setFlowid(String flowid) {
		this.flowid = flowid;
	}
	
	/**
	 * 获取状态：1.候选    2.绑定    99.删除
	 * @return double
	 */
	public double getState() {
		return state;
	}

	/**
	 * 设置状态：1.候选    2.绑定    99.删除
	 * @param state
	 *               double 状态：1.候选    2.绑定    99.删除
	 */
	public void setState(double state) {
		this.state = state;
	}
	
	/**
	 * 获取流程名称
	 * @return String
	 */
	public String getName() {
		return name;
	}

	/**
	 * 设置流程名称
	 * @param name
	 *               String 流程名称
	 */
	public void setName(String name) {
		this.name = name;
	}

	public String getAppunid() {
		return appunid;
	}

	public void setAppunid(String appunid) {
		this.appunid = appunid;
	}
		
}
