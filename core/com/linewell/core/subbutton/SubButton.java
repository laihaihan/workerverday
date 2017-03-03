package com.linewell.core.subbutton;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * <p>
 * SubButton实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @version 1.00 2012-02-09 16:56:56
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */
@Table(name = "CORE_SUB_BUTTON")
public class SubButton {
	@Column(name = "SUB_SORT")
	private long sub_sort;

	@Column(name = "SUB_IMG")
	private String sub_img = "";

	@Column(name = "SUB_UNID")
	private String sub_unid = "";

	@Column(name = "BUTTON_UNID")
	private String button_unid = "";

	@Column(name = "SUB_NAME")
	private String sub_name = "";

	@Column(name = "SUB_BELONGTO")
	private String sub_belongto = "";

	@Column(name = "FN_PATH")
	private String fn_path = "";

	/**
	 * 获取
	 * 
	 * @return long
	 */
	public long getSub_sort() {
		return sub_sort;
	}

	/**
	 * 设置
	 * 
	 * @param sub_sort
	 *            long
	 */
	public void setSub_sort(long sub_sort) {
		this.sub_sort = sub_sort;
	}

	/**
	 * 获取
	 * 
	 * @return String
	 */
	public String getSub_img() {
		return sub_img;
	}

	/**
	 * 设置
	 * 
	 * @param sub_img
	 *            String
	 */
	public void setSub_img(String sub_img) {
		this.sub_img = sub_img;
	}

	/**
	 * 获取
	 * 
	 * @return String
	 */
	public String getSub_unid() {
		return sub_unid;
	}

	/**
	 * 设置
	 * 
	 * @param sub_unid
	 *            String
	 */
	public void setSub_unid(String sub_unid) {
		this.sub_unid = sub_unid;
	}

	/**
	 * 获取
	 * 
	 * @return String
	 */
	public String getButton_unid() {
		return button_unid;
	}

	/**
	 * 设置
	 * 
	 * @param button_unid
	 *            String
	 */
	public void setButton_unid(String button_unid) {
		this.button_unid = button_unid;
	}

	/**
	 * 获取
	 * 
	 * @return String
	 */
	public String getSub_name() {
		return sub_name;
	}

	/**
	 * 设置
	 * 
	 * @param sub_name
	 *            String
	 */
	public void setSub_name(String sub_name) {
		this.sub_name = sub_name;
	}

	/**
	 * 获取
	 * 
	 * @return String
	 */
	public String getSub_belongto() {
		return sub_belongto;
	}

	/**
	 * 设置
	 * 
	 * @param sub_belongto
	 *            String
	 */
	public void setSub_belongto(String sub_belongto) {
		this.sub_belongto = sub_belongto;
	}

	public String getFn_path() {
		return fn_path;
	}

	public void setFn_path(String fn_path) {
		this.fn_path = fn_path;
	}
}
