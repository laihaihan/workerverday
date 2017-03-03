package com.linewell.core.iconapplication;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * <p>图标</P>
 * @author lfunian@linewell.com
 * @date Sep 2, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
@Table(name="CORE_ICON")
public class IconApplication {
	@Column(name="ICON_UNID")
	private String icon_unid;//图标主键
	
	@Column(name="APP_UNID")
	private String app_unid;//应用系统主键
	
	@Column(name="VIEW_UNID")
	private String view_unid;//视图主键
	
	@Column(name="ICON_CLASS")
	private String icon_class;//图标css文件的class名称
	
	@Column(name="ICON_PATH")
	private String icon_path;//图标路径

	public String getIcon_unid() {
		return icon_unid;
	}

	public void setIcon_unid(String icon_unid) {
		this.icon_unid = icon_unid;
	}

	public String getApp_unid() {
		return app_unid;
	}

	public void setApp_unid(String app_unid) {
		this.app_unid = app_unid;
	}

	public String getView_unid() {
		return view_unid;
	}

	public void setView_unid(String view_unid) {
		this.view_unid = view_unid;
	}

	public String getIcon_class() {
		return icon_class;
	}

	public void setIcon_class(String icon_class) {
		this.icon_class = icon_class;
	}

	public String getIcon_path() {
		return icon_path;
	}

	public void setIcon_path(String icon_path) {
		this.icon_path = icon_path;
	}
}
