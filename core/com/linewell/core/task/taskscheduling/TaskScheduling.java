package com.linewell.core.task.taskscheduling;

/**
 * <p>
 * 	任务调度配置中心实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-05-29 09:14:58
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class TaskScheduling {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 任务调度名称
	 */
	private String name  = "" ;
		
	/**
	 * 任务执行类
	 */
	private String classesname  = "" ;
		
	/**
	 * 备注
	 */
	private String memo  = "" ;
		
	/**
	 * 状态是否启用Y:启用，N禁用
	 */
	private String status  = "" ;
		
	/**
	 * 规则说明
	 */
	private String ruledirections  = "" ;
		
	/**
	 * 规则内容
	 */
	private String rulecontent  = "" ;
		

	private String starttime  = "" ;
	
	private String endtime  = "" ;
		
	/**
	 * 所属系统unid
	 */
	private String app_unid  = "" ;
	
	/**
	 * 任务执行次数
	 */
	private long executecount = 0;
	
	/**
	 * 任务已经执行次数
	 */
	private long executedcount = 0;
	
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
	 * 获取任务调度名称
	 * @return String
	 */
	public String getName() {
		return name;
	}

	/**
	 * 设置任务调度名称
	 * @param name
	 *               String 任务调度名称
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * 获取任务执行类
	 * @return String
	 */
	public String getClassesname() {
		return classesname;
	}

	/**
	 * 设置任务执行类
	 * @param classesname
	 *               String 任务执行类
	 */
	public void setClassesname(String classesname) {
		this.classesname = classesname;
	}
	
	/**
	 * 获取备注
	 * @return String
	 */
	public String getMemo() {
		return memo;
	}

	/**
	 * 设置备注
	 * @param memo
	 *               String 备注
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}
	
	/**
	 * 获取状态是否启用Y:启用，N禁用
	 * @return String
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * 设置状态是否启用Y:启用，N禁用
	 * @param status
	 *               String 状态是否启用Y:启用，N禁用
	 */
	public void setStatus(String status) {
		this.status = status;
	}
	
	/**
	 * 获取规则说明
	 * @return String
	 */
	public String getRuledirections() {
		return ruledirections;
	}

	/**
	 * 设置规则说明
	 * @param ruledirections
	 *               String 规则说明
	 */
	public void setRuledirections(String ruledirections) {
		this.ruledirections = ruledirections;
	}
	
	/**
	 * 获取规则内容
	 * @return String
	 */
	public String getRulecontent() {
		return rulecontent;
	}

	/**
	 * 设置规则内容
	 * @param rulecontent
	 *               String 规则内容
	 */
	public void setRulecontent(String rulecontent) {
		this.rulecontent = rulecontent;
	}

	public String getStarttime() {
		return starttime;
	}

	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}

	public String getEndtime() {
		return endtime;
	}

	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}

	/**
	 * 获取所属系统unid
	 * @return String
	 */
	public String getApp_unid() {
		return app_unid;
	}

	/**
	 * 设置所属系统unid
	 * @param app_unid
	 *               String 所属系统unid
	 */
	public void setApp_unid(String app_unid) {
		this.app_unid = app_unid;
	}

	public long getExecutecount() {
		return executecount;
	}

	public void setExecutecount(long executecount) {
		this.executecount = executecount;
	}

	public long getExecutedcount() {
		return executedcount;
	}

	public void setExecutedcount(long executedcount) {
		this.executedcount = executedcount;
	}
}