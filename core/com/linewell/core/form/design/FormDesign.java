package com.linewell.core.form.design;

/**
 * <p>
 * 	FormDesign实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-02-14 17:05:28
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */

public class FormDesign {
	/**
	 * 主键
	 */
	private String unid = "";
	/**
	 * 所属业务表单实体unid
	 */
	private String punid = "";
	/**
	 * 字段名称
	 */
	private String columnname = "";
	/**
	 * 字段类型
	 */
	private String columntype = "";
	/**
	 * 缺省值
	 */
	private String defaulvalue = "";
	/**
	 * 验证方式
	 */
	private String verifymodule = "";

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
	 * 获取所属业务表单实体unid
	 * @return String
	 */
	public String getPunid() {
		return punid;
	}

	/**
	 * 设置所属业务表单实体unid
	 * @param punid
	 *               String 所属业务表单实体unid
	 */
	public void setPunid(String punid) {
		this.punid = punid;
	}

	/**
	 * 获取字段名称
	 * @return String
	 */
	public String getColumnname() {
		return columnname;
	}

	/**
	 * 设置字段名称
	 * @param columnname
	 *   String 字段名称
	 */
	public void setColumnname(String columnname) {
		this.columnname = columnname;
	}

	/**
	 * 获取字段类型
	 * @return String
	 */
	public String getColumntype() {
		return columntype;
	}

	/**
	 * 设置字段类型
	 * @param columntype
	 *    String 字段类型
	 */
	public void setColumntype(String columntype) {
		this.columntype = columntype;
	}

	/**
	 * 获取缺省值
	 * @return String
	 */
	public String getDefaulvalue() {
		return defaulvalue;
	}

	/**
	 * 设置缺省值
	 * @param defaulvalue
	 *               String 缺省值
	 */
	public void setDefaulvalue(String defaulvalue) {
		this.defaulvalue = defaulvalue;
	}

	/**
	 * 获取验证方式
	 * @return String
	 */
	public String getVerifymodule() {
		return verifymodule;
	}

	/**
	 * 设置验证方式
	 * @param verifymodule
	 *               String 验证方式
	 */
	public void setVerifymodule(String verifymodule) {
		this.verifymodule = verifymodule;
	}
}
