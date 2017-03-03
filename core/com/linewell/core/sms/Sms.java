package com.linewell.core.sms;
 
/**
 * <p>
 * 	短信表实体
 * </P>
 * 
 * @author qcongyong@linewell.com
 * @date 2012-11-23 09:20:35
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class Sms {
			
	/**
	 * 所属系统unid
	 */
	private String app_unid  = "" ;
		
	/**
	 * 接收方
	 */
	private String receiver  = "" ;
		
	/**
	 * 内容
	 */
	private String content  = "" ;
		
	/**
	 * 类型
	 */
	private String type  = "" ;
		
	/**
	 * 状态(0:未发送;1:已发送)
	 */
	private String status  = "" ;
		
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 发送方
	 */
	private String sender  = "" ;
		
	/**
	 * 发送时间
	 */
	private String sendtime  = "" ;
		
	/**
	 * 备注
	 */
	private String memo  = "" ;
		
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
	
	/**
	 * 获取接收方
	 * @return String
	 */
	public String getReceiver() {
		return receiver;
	}

	/**
	 * 设置接收方
	 * @param receiver
	 *               String 接收方
	 */
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	
	/**
	 * 获取内容
	 * @return String
	 */
	public String getContent() {
		return content;
	}

	/**
	 * 设置内容
	 * @param content
	 *               String 内容
	 */
	public void setContent(String content) {
		this.content = content;
	}
	
	/**
	 * 获取类型
	 * @return String
	 */
	public String getType() {
		return type;
	}

	/**
	 * 设置类型
	 * @param type
	 *               String 类型
	 */
	public void setType(String type) {
		this.type = type;
	}
	
	/**
	 * 获取状态(0:未发送;1:已发送)
	 * @return String
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * 设置状态(0:未发送;1:已发送)
	 * @param status
	 *               String 状态(0:未发送;1:已发送)
	 */
	public void setStatus(String status) {
		this.status = status;
	}
	
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
	 * 获取发送方
	 * @return String
	 */
	public String getSender() {
		return sender;
	}

	/**
	 * 设置发送方
	 * @param sender
	 *               String 发送方
	 */
	public void setSender(String sender) {
		this.sender = sender;
	}
	
	/**
	 * 获取发送时间
	 * @return String
	 */
	public String getSendtime() {
		return sendtime;
	}

	/**
	 * 设置发送时间
	 * @param sendtime
	 *               String 发送时间
	 */
	public void setSendtime(String sendtime) {
		this.sendtime = sendtime;
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
		
}
