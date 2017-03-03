package com.linewell.core.notice.info;

import java.sql.Clob;
 
/**
 * <p>
 * 	公告信息实体
 * </P>
 * 
 * @author qcongyong@linewell.com
 * @date 2012-10-30 11:39:47
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class NoticeInfo {
			
	/**
	 * 重要等级：1.普通   2.重要
	 */
	private long important_level ;
		
	/**
	 * 排序号
	 */
	private long sortid ;
		
	/**
	 * 发布人员姓名
	 */
	private String publish_username  = "" ;
		
	/**
	 * 发布时间
	 */
	private String publish_time  = "" ;
		
	/**
	 * 发布人员unid
	 */
	private String publish_userunid  = "" ;
		
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 标题
	 */
	private String title  = "" ;
		
	/**
	 * 内容
	 */
	private Clob content;
		
	/**
	 * 创建人员unid
	 */
	private String create_userunid  = "" ;
		
	/**
	 * 创建人员姓名
	 */
	private String create_username  = "" ;
		
	/**
	 * 创建时间
	 */
	private String create_time  = "" ;
	
	/**
	 * 所属系统唯一标识
	 */
	private String app_unid  = "" ;
			
	/**
	 * 获取重要等级：1.普通   2.重要
	 * @return long
	 */
	public long getImportant_level() {
		return important_level;
	}

	/**
	 * 设置重要等级：1.普通   2.重要
	 * @param important_level
	 *               long 重要等级：1.普通   2.重要
	 */
	public void setImportant_level(long important_level) {
		this.important_level = important_level;
	}
	
	/**
	 * 获取排序号
	 * @return long
	 */
	public long getSortid() {
		return sortid;
	}

	/**
	 * 设置排序号
	 * @param sortid
	 *               long 排序号
	 */
	public void setSortid(long sortid) {
		this.sortid = sortid;
	}
	
	/**
	 * 获取发布人员姓名
	 * @return String
	 */
	public String getPublish_username() {
		return publish_username;
	}

	/**
	 * 设置发布人员姓名
	 * @param publish_username
	 *               String 发布人员姓名
	 */
	public void setPublish_username(String publish_username) {
		this.publish_username = publish_username;
	}
	
	/**
	 * 获取发布时间
	 * @return String
	 */
	public String getPublish_time() {
		return publish_time;
	}

	/**
	 * 设置发布时间
	 * @param publish_time
	 *               String 发布时间
	 */
	public void setPublish_time(String publish_time) {
		this.publish_time = publish_time;
	}
	
	/**
	 * 获取发布人员unid
	 * @return String
	 */
	public String getPublish_userunid() {
		return publish_userunid;
	}

	/**
	 * 设置发布人员unid
	 * @param publish_userunid
	 *               String 发布人员unid
	 */
	public void setPublish_userunid(String publish_userunid) {
		this.publish_userunid = publish_userunid;
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
	 * 获取标题
	 * @return String
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * 设置标题
	 * @param title
	 *               String 标题
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	
	/**
	 * 获取内容
	 * @return Clob
	 */
	public Clob getContent() {
		return content;
	}

	/**
	 * 设置内容
	 * @param content
	 *               String 内容
	 */
	public void setContent(Clob content) {
		this.content = content;
	}
	
	/**
	 * 获取创建人员unid
	 * @return String
	 */
	public String getCreate_userunid() {
		return create_userunid;
	}

	/**
	 * 设置创建人员unid
	 * @param create_userunid
	 *               String 创建人员unid
	 */
	public void setCreate_userunid(String create_userunid) {
		this.create_userunid = create_userunid;
	}
	
	/**
	 * 获取创建人员姓名
	 * @return String
	 */
	public String getCreate_username() {
		return create_username;
	}

	/**
	 * 设置创建人员姓名
	 * @param create_username
	 *               String 创建人员姓名
	 */
	public void setCreate_username(String create_username) {
		this.create_username = create_username;
	}
	
	/**
	 * 获取创建时间
	 * @return String
	 */
	public String getCreate_time() {
		return create_time;
	}

	/**
	 * 设置创建时间
	 * @param create_time
	 *               String 创建时间
	 */
	public void setCreate_time(String create_time) {
		this.create_time = create_time;
	}

	public String getApp_unid() {
		return app_unid;
	}

	public void setApp_unid(String app_unid) {
		this.app_unid = app_unid;
	}
		
}
