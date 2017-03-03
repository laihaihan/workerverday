package com.linewell.core.log;
 
/**
 * <p>
 * 	ApasLog实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-04-09 16:35:23
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class Log {
			/**
	 * 主键
	 */
	private String unid  = "" ;
		/**
	 * 外键关联apas_info.unid
	 */
	private String punid  = "" ;
		/**
	 * 事件发送者
	 */
	private String who  = "" ;
		/**
	 * 事件发生时间
	 */
	private String log_when  = "" ;
		/**
	 * 做了什么事
	 */
	private String log_do  = "" ;
		/**
	 * 事件接收者
	 */
	private String log_what  = "" ;
		/**
	 * 事件办理结果
	 */
	private String result  = "" ;
		/**
	 * 事件类型
	 */
	private long log_type ;
		/**
	 * 时间级别
	 */
	private long log_level ;
		/**
	 * 
	 */
	private String target_unid  = "" ;
		
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
	 * 获取外键关联apas_info.unid
	 * @return String
	 */
	public String getPunid() {
		return punid;
	}

	/**
	 * 设置外键关联apas_info.unid
	 * @param punid
	 *               String 外键关联apas_info.unid
	 */
	public void setPunid(String punid) {
		this.punid = punid;
	}
	
	/**
	 * 获取事件发送者
	 * @return String
	 */
	public String getWho() {
		return who;
	}

	/**
	 * 设置事件发送者
	 * @param who
	 *               String 事件发送者
	 */
	public void setWho(String who) {
		this.who = who;
	}
	
	/**
	 * 获取事件发生时间
	 * @return String
	 */
	public String getLog_when() {
		return log_when;
	}

	/**
	 * 设置事件发生时间
	 * @param log_when
	 *               String 事件发生时间
	 */
	public void setLog_when(String log_when) {
		this.log_when = log_when;
	}
	
	/**
	 * 获取做了什么事
	 * @return String
	 */
	public String getLog_do() {
		return log_do;
	}

	/**
	 * 设置做了什么事
	 * @param log_do
	 *               String 做了什么事
	 */
	public void setLog_do(String log_do) {
		this.log_do = log_do;
	}
	
	/**
	 * 获取事件接收者
	 * @return String
	 */
	public String getLog_what() {
		return log_what;
	}

	/**
	 * 设置事件接收者
	 * @param log_what
	 *               String 事件接收者
	 */
	public void setLog_what(String log_what) {
		this.log_what = log_what;
	}
	
	/**
	 * 获取事件办理结果
	 * @return String
	 */
	public String getResult() {
		return result;
	}

	/**
	 * 设置事件办理结果
	 * @param result
	 *               String 事件办理结果
	 */
	public void setResult(String result) {
		this.result = result;
	}
	
	/**
	 * 获取事件类型
	 * @return long
	 */
	public long getLog_type() {
		return log_type;
	}

	/**
	 * 设置事件类型
	 * @param log_type
	 *               long 事件类型
	 */
	public void setLog_type(long log_type) {
		this.log_type = log_type;
	}
	
	/**
	 * 获取时间级别
	 * @return long
	 */
	public long getLog_level() {
		return log_level;
	}

	/**
	 * 设置时间级别
	 * @param log_level
	 *               long 时间级别
	 */
	public void setLog_level(long log_level) {
		this.log_level = log_level;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getTarget_unid() {
		return target_unid;
	}

	/**
	 * 设置
	 * @param target_unid
	 *               String 
	 */
	public void setTarget_unid(String target_unid) {
		this.target_unid = target_unid;
	}
	}
