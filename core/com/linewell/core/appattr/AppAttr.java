package com.linewell.core.appattr;
 
/**
 * <p>
 * 	实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2013-06-18 13:14:44
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class AppAttr {
			
	/**
	 * 
	 */
	private String unid  = "" ;
		
	/**
	 * 材料名称
	 */
	private String attrname  = "" ;
		
	/**
	 * 材料类型
	 */
	private String attrtype  = "" ;
		
	/**
	 * 创建时间
	 */
	private String createtime  = "" ;
		
	/**
	 * 排序
	 */
	private double sortid ;
		
	/**
	 * 所属
	 */
	private String punid  = "" ;
	private String meno  = "" ;
	
	/**
	 * 获取
	 * @return String
	 */
	public String getUnid() {
		return unid;
	}

	/**
	 * 设置
	 * @param unid
	 *               String 
	 */
	public void setUnid(String unid) {
		this.unid = unid;
	}
	
	/**
	 * 获取材料名称
	 * @return String
	 */
	public String getAttrname() {
		return attrname;
	}

	/**
	 * 设置材料名称
	 * @param attrname
	 *               String 材料名称
	 */
	public void setAttrname(String attrname) {
		this.attrname = attrname;
	}
	
	/**
	 * 获取材料类型
	 * @return String
	 */
	public String getAttrtype() {
		return attrtype;
	}

	/**
	 * 设置材料类型
	 * @param attrtype
	 *               String 材料类型
	 */
	public void setAttrtype(String attrtype) {
		this.attrtype = attrtype;
	}
	
	/**
	 * 获取创建时间
	 * @return String
	 */
	public String getCreatetime() {
		return createtime;
	}

	/**
	 * 设置创建时间
	 * @param createtime
	 *               String 创建时间
	 */
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	
	/**
	 * 获取排序
	 * @return double
	 */
	public double getSortid() {
		return sortid;
	}

	/**
	 * 设置排序
	 * @param sortid
	 *               double 排序
	 */
	public void setSortid(double sortid) {
		this.sortid = sortid;
	}
	
	/**
	 * 获取所属
	 * @return String
	 */
	public String getPunid() {
		return punid;
	}

	/**
	 * 设置所属
	 * @param punid
	 *               String 所属
	 */
	public void setPunid(String punid) {
		this.punid = punid;
	}

	public String getMeno() {
		return meno;
	}

	public void setMeno(String meno) {
		this.meno = meno;
	}
		
}
