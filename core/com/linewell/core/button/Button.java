package com.linewell.core.button;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * 
 * <p>
 * 应用按钮
 * </P>
 * 
 * @author cyingquan@linewell.com
 * @date Jan 10, 2012
 * @version 1.00
 *          <p>
 *          Copyright (c) 2011 www.linewell.com
 *          </p>
 */
@Table(name="CORE_BUTTON")
public class Button {
	@Column(name="BUTTON_UNID")
	private String button_unid;// 标识
	
	@Column(name="BUTTON_NAME")
	private String button_name;// 按钮名称
	
	@Column(name="BUTTON_TYPE")
	private String button_type;// 类型分为：流程、快捷方式，视图，首页，表单。字典定义为：流程：01；快捷方式：02；视图:03;首页：04；表单：05
	
	@Column(name="BUTTON_FN")
	private String button_fn;// 按钮方法
	
	@Column(name="BUTTON_BELONGTO")
	private String button_belongto;// 视图unid

	public String getButton_unid() {
		return button_unid;
	}

	public void setButton_unid(String button_unid) {
		this.button_unid = button_unid;
	}

	public String getButton_name() {
		return button_name;
	}

	public void setButton_name(String button_name) {
		this.button_name = button_name;
	}

	public String getButton_type() {
		return button_type;
	}

	public void setButton_type(String button_type) {
		this.button_type = button_type;
	}

	public String getButton_fn() {
		return button_fn;
	}

	public void setButton_fn(String button_fn) {
		this.button_fn = button_fn;
	}

	public String getButton_belongto() {
		return button_belongto;
	}

	public void setButton_belongto(String button_belongto) {
		this.button_belongto = button_belongto;
	}
}
