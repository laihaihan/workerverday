package com.linewell.core.amchart.common;

/**
 * ValueData实体
 * @author lchenming@linewell.com
 * @dateTime  Jan 30, 2011 10:09:01 AM 
 */
public class ValueData {

	/**
	 * xid值
	 */
	private String xid;
	/**
	 * 结点值
	 */
	private String value;
	/**
	 * 颜色
	 */
	private String color;
	
	/**
	 * @return
	 */
	public String getColor() {
		return color;
	}
	/**
	 * @param color
	 */
	public void setColor(String color) {
		this.color = color;
	}
	/**
	 * @return
	 */
	public String getXid() {
		return xid;
	}
	/**
	 * @param xid
	 */
	public void setXid(String xid) {
		this.xid = xid;
	}
	/**
	 * @return
	 */
	public String getValue() {
		return value;
	}
	/**
	 * @param value
	 */
	public void setValue(String value) {
		this.value = value;
	}
	
}
