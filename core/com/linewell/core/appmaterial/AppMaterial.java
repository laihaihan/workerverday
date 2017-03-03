package com.linewell.core.appmaterial;
 
/**
 * <p>
 * 	新增材料列表实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2013-06-18 16:03:58
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class AppMaterial {
			
	/**
	 * 资料说明
	 */
	private String meno  = "" ;
		
	/**
	 * 
	 */
	private String unid  = "" ;
		
	/**
	 * 所属
	 */
	private String punid  = "" ;
		
	/**
	 * 资料名称
	 */
	private String infoname  = "" ;
		
	/**
	 * 创建时间
	 */
	private String createtime  = "" ;
		
	/**
	 * 类型
	 */
	private String attrtype  = "" ;
		
	/**
	 * 排序号
	 */
	private String sortid  = "" ;
		
	/**
	 * 获取资料说明
	 * @return String
	 */
	public String getMeno() {
		return meno;
	}

	/**
	 * 设置资料说明
	 * @param meno
	 *               String 资料说明
	 */
	public void setMeno(String meno) {
		this.meno = meno;
	}
	
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
	
	/**
	 * 获取资料名称
	 * @return String
	 */
	public String getInfoname() {
		return infoname;
	}

	/**
	 * 设置资料名称
	 * @param infoname
	 *               String 资料名称
	 */
	public void setInfoname(String infoname) {
		this.infoname = infoname;
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
	 * 获取类型
	 * @return String
	 */
	public String getAttrtype() {
		return attrtype;
	}

	/**
	 * 设置类型
	 * @param attrtype
	 *               String 类型
	 */
	public void setAttrtype(String attrtype) {
		this.attrtype = attrtype;
	}
	
	/**
	 * 获取排序号
	 * @return String
	 */
	public String getSortid() {
		return sortid;
	}

	/**
	 * 设置排序号
	 * @param sortid
	 *               String 排序号
	 */
	public void setSortid(String sortid) {
		this.sortid = sortid;
	}
		
}
