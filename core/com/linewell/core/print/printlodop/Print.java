package com.linewell.core.print.printlodop;
 
/**
 * <p>
 * 	Print实体
 * </P>
 * 
 * @author qcongyong@linewell.com
 * @date 2012-04-05 16:45:50
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class Print {
			
	/**
	 * 主键
	 */
	private String print_unid  = "" ;
		
	/**
	 * 查询记录sql语句
	 */
	private String print_sql  = "" ;
		
	/**
	 * 表名
	 */
	private String print_table  = "" ;
		
	/**
	 * 套打名称
	 */
	private String print_name  = "" ;
		
	/**
	 * 打印内容
	 */
	private String print_content  = "" ;
		
	/**
	 * 背景图片
	 */
	private String print_background  = "" ;
		
	/**
	 * 数据来源(0.数据表   1.sql语句)
	 */
	private String pinrt_source  = "" ;
	
	/**
	 * 所属打印配置
	 */
	private String punid  = "" ;
	
	
	/**
	 * 获取主键
	 * @return String
	 */
	public String getPrint_unid() {
		return print_unid;
	}

	/**
	 * 设置主键
	 * @param print_unid
	 *               String 主键
	 */
	public void setPrint_unid(String print_unid) {
		this.print_unid = print_unid;
	}
	
	/**
	 * 获取查询记录sql语句
	 * @return String
	 */
	public String getPrint_sql() {
		return print_sql;
	}

	/**
	 * 设置查询记录sql语句
	 * @param print_sql
	 *               String 查询记录sql语句
	 */
	public void setPrint_sql(String print_sql) {
		this.print_sql = print_sql;
	}
	
	/**
	 * 获取表名
	 * @return String
	 */
	public String getPrint_table() {
		return print_table;
	}

	/**
	 * 设置表名
	 * @param print_table
	 *               String 表名
	 */
	public void setPrint_table(String print_table) {
		this.print_table = print_table;
	}
	
	/**
	 * 获取套打名称
	 * @return String
	 */
	public String getPrint_name() {
		return print_name;
	}

	/**
	 * 设置套打名称
	 * @param print_name
	 *               String 套打名称
	 */
	public void setPrint_name(String print_name) {
		this.print_name = print_name;
	}
	
	/**
	 * 获取打印内容
	 * @return String
	 */
	public String getPrint_content() {
		return print_content;
	}

	/**
	 * 设置打印内容
	 * @param print_content
	 *               String 打印内容
	 */
	public void setPrint_content(String print_content) {
		this.print_content = print_content;
	}
	
	/**
	 * 获取背景图片
	 * @return String
	 */
	public String getPrint_background() {
		return print_background;
	}

	/**
	 * 设置背景图片
	 * @param print_background
	 *               String 背景图片
	 */
	public void setPrint_background(String print_background) {
		this.print_background = print_background;
	}
	
	/**
	 * 获取数据来源(0.数据表   1.sql语句)
	 * @return String
	 */
	public String getPinrt_source() {
		return pinrt_source;
	}

	/**
	 * 设置数据来源(0.数据表   1.sql语句)
	 * @param pinrt_source
	 *               String 数据来源(0.数据表   1.sql语句)
	 */
	public void setPinrt_source(String pinrt_source) {
		this.pinrt_source = pinrt_source;
	}

	public String getPunid() {
		return punid;
	}

	public void setPunid(String punid) {
		this.punid = punid;
	}
		
}
