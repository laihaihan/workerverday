package com.linewell.core.print.printireport;
 
/**
 * <p>
 * 	ireport打印方式实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-06-01 14:46:25
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class PrintIreport {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 所属打印
	 */
	private String punid  = "" ;
		
	/**
	 * 模板名称
	 */
	private String name  = "" ;
		
	/**
	 * 模板相对路径
	 */
	private String filepath  = "" ;
		
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
	 * 获取所属打印
	 * @return String
	 */
	public String getPunid() {
		return punid;
	}

	/**
	 * 设置所属打印
	 * @param punid
	 *               String 所属打印
	 */
	public void setPunid(String punid) {
		this.punid = punid;
	}
	
	/**
	 * 获取模板名称
	 * @return String
	 */
	public String getName() {
		return name;
	}

	/**
	 * 设置模板名称
	 * @param name
	 *               String 模板名称
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * 获取模板相对路径
	 * @return String
	 */
	public String getFilepath() {
		return filepath;
	}

	/**
	 * 设置模板相对路径
	 * @param filepath
	 *               String 模板相对路径
	 */
	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}
		
}
