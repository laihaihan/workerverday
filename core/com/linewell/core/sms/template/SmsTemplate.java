package com.linewell.core.sms.template;
 
/**
 * <p>
 * 	短信模板实体
 * </P>
 * 
 * @author qcongyong@linewell.com
 * @date 2012-11-23 09:27:47
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class SmsTemplate {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 类型
	 */
	private String type  = "" ;
		
	/**
	 * 内容
	 */
	private String content  = "" ;
		
	/**
	 * 所属系统unid
	 */
	private String app_unid  = "" ;
	
	/**
	 * 备注
	 */
	private String memo = "";
		
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
	 * @return the memo
	 */
	public String getMemo() {
		return memo;
	}

	/**
	 * @param memo the memo to set
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}
		
}
