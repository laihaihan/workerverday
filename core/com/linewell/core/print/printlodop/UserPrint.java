package com.linewell.core.print.printlodop;
 
/**
 * <p>
 * 	UserPrint实体
 * </P>
 * 
 * @author qcongyong@linewell.com
 * @date 2012-04-09 15:23:17
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class UserPrint {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 用户unid
	 */
	private String user_unid  = "" ;
		
	/**
	 * 单据unid
	 */
	private String print_unid  = "" ;
		
	/**
	 * 单据内容
	 */
	private String print_content  = "" ;
		
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
	 * 获取用户unid
	 * @return String
	 */
	public String getUser_unid() {
		return user_unid;
	}

	/**
	 * 设置用户unid
	 * @param user_unid
	 *               String 用户unid
	 */
	public void setUser_unid(String user_unid) {
		this.user_unid = user_unid;
	}
	
	/**
	 * 获取单据unid
	 * @return String
	 */
	public String getPrint_unid() {
		return print_unid;
	}

	/**
	 * 设置单据unid
	 * @param print_unid
	 *               String 单据unid
	 */
	public void setPrint_unid(String print_unid) {
		this.print_unid = print_unid;
	}
	
	/**
	 * 获取单据内容
	 * @return String
	 */
	public String getPrint_content() {
		return print_content;
	}

	/**
	 * 设置单据内容
	 * @param print_content
	 *               String 单据内容
	 */
	public void setPrint_content(String print_content) {
		this.print_content = print_content;
	}
		
}
