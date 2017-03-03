package com.linewell.core.print.printitem;
 
/**
 * <p>
 * 	保留历史域信息实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-06-04 15:41:49
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class PrintItem {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 所属单据
	 */
	private String punid  = "" ;
		
	/**
	 * 字段名称
	 */
	private String itemname  = "" ;
		
	/**
	 * 字段值
	 */
	private String itemvalue  = "" ;
		
	/**
	 * 类型
	 */
	private String type  = "" ;
		
	private String itemmemo = "";
	
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
	 * 获取所属单据
	 * @return String
	 */
	public String getPunid() {
		return punid;
	}

	/**
	 * 设置所属单据
	 * @param punid
	 *               String 所属单据
	 */
	public void setPunid(String punid) {
		this.punid = punid;
	}
	
	/**
	 * 获取字段名称
	 * @return String
	 */
	public String getItemname() {
		return itemname;
	}

	/**
	 * 设置字段名称
	 * @param itemname
	 *               String 字段名称
	 */
	public void setItemname(String itemname) {
		this.itemname = itemname;
	}
	
	/**
	 * 获取字段值
	 * @return String
	 */
	public String getItemvalue() {
		return itemvalue;
	}

	/**
	 * 设置字段值
	 * @param itemvalue
	 *               String 字段值
	 */
	public void setItemvalue(String itemvalue) {
		this.itemvalue = itemvalue;
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

	public String getItemmemo() {
		return itemmemo;
	}

	public void setItemmemo(String itemmemo) {
		this.itemmemo = itemmemo;
	}
		
}
