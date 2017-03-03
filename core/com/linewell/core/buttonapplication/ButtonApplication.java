package com.linewell.core.buttonapplication;

import javax.persistence.Column;
import javax.persistence.Table;
/**
 * <p>应用按钮</P>
 * @author lfunian@linewell.com
 * @date July 30, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
@Table(name="CORE_BUTTON_APPLICATION")
public class ButtonApplication {
	@Column(name="BUTTON_UNID")
	private String button_unid;//主键
	
	@Column(name="APP_UNID")
	private String app_unid;//应用系统主键
	
	@Column(name="BUTTON_NAME")
	private String button_name;//按钮名称
	
	@Column(name="BUTTON_IMG_PATH")
	private String button_img_path;//按钮图片路径
	
	@Column(name="BUTTON_DISPLAY_IMG")
	private String button_display_img;//是否显示按钮图标（0：不显示；1：显示）
	
	@Column(name="BUTTON_IMG_STYLE")
	private String button_img_style;//图标样式（0：小图标；1：大图标）
	
	@Column(name="BUTTON_TYPE")
	private String button_type;//类型分为：流程、快捷方式，视图，首页，表单。字典定义为：流程：1；快捷方式：2；视图:3;首页：4；表单：5
	
	@Column(name="BUTTON_CLASSIFY")
	private String button_classify;//是否使用CSS样式文件的样式
	
	@Column(name="BUTTON_CLASS")
	private String button_class;//CSS样式名称
	
	@Column(name="BUTTON_SORT")
	private int button_sort;//按钮序号
	
	@Column(name="BUTTON_FUNCTION")
	private String button_function;//脚本方法名称
	
	@Column(name="BUTTON_DISPLAY_NAME")
	private String button_display_name;//按钮显示名称
	
	@Column(name="BUTTON_ROLE_UNID")
	private String button_role_unid;//按钮显示名称
	
	@Column(name="BUTTON_KIND")
	private String button_kind;//按钮种类

	public String getButton_unid() {
		return button_unid;
	}

	public void setButton_unid(String button_unid) {
		this.button_unid = button_unid;
	}

	public String getApp_unid() {
		return app_unid;
	}

	public void setApp_unid(String app_unid) {
		this.app_unid = app_unid;
	}

	public String getButton_name() {
		return button_name;
	}

	public void setButton_name(String button_name) {
		this.button_name = button_name;
	}

	public String getButton_img_path() {
		return button_img_path;
	}

	public void setButton_img_path(String button_img_path) {
		this.button_img_path = button_img_path;
	}

	public String getButton_display_img() {
		return button_display_img;
	}

	public void setButton_display_img(String button_display_img) {
		this.button_display_img = button_display_img;
	}

	public String getButton_img_style() {
		return button_img_style;
	}

	public void setButton_img_style(String button_img_style) {
		this.button_img_style = button_img_style;
	}

	public String getButton_type() {
		return button_type;
	}

	public void setButton_type(String button_type) {
		this.button_type = button_type;
	}

	public String getButton_classify() {
		return button_classify;
	}

	public void setButton_classify(String button_classify) {
		this.button_classify = button_classify;
	}

	public String getButton_class() {
		return button_class;
	}

	public void setButton_class(String button_class) {
		this.button_class = button_class;
	}

	public int getButton_sort() {
		return button_sort;
	}

	public void setButton_sort(int button_sort) {
		this.button_sort = button_sort;
	}

	public String getButton_function() {
		return button_function;
	}

	public void setButton_function(String button_function) {
		this.button_function = button_function;
	}

	public String getButton_display_name() {
		return button_display_name;
	}

	public void setButton_display_name(String button_display_name) {
		this.button_display_name = button_display_name;
	}

	public String getButton_role_unid() {
		return button_role_unid;
	}

	public void setButton_role_unid(String button_role_unid) {
		this.button_role_unid = button_role_unid;
	}

	public String getButton_kind() {
		return button_kind;
	}

	public void setButton_kind(String button_kind) {
		this.button_kind = button_kind;
	}
}
