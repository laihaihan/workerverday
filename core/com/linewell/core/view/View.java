package com.linewell.core.view;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * 
 * <p>
 * 应用视图
 * </P>
 * 
 * @author cyingquan@linewell.com
 * @date Jan 10, 2012
 * @version 1.00
 *          <p>
 *          Copyright (c) 2011 www.linewell.com
 *          </p>
 */
@Table(name="CORE_VIEW")
public class View {
	
	@Column(name="VIEW_UNID",unique=true)
	private String unid;// 标识
	
	@Column(name="VIEW_NAME")
	private String name;// 名称
	
	@Column(name="VIEW_ALIAS")
	private String alias;// 别名
	
	@Column(name="VIEW_JNDI")
	private String jndi;// jndi
	
	@Column(name="VIEW_TYPE")
	private String type;// 视图类型(普通列表型：01；概要型：02；图文并茂型：03)
	
	@Column(name="VIEW_SHOW_TYPE")
	private String showType;// 视图展示类型(grid:01;table+css:02;)
	
	@Column(name="VIEW_PAGE_SIZE")
	private String pageSize;// 每页显示条数
	
	@Column(name="VIEW_SOURCE_TYPE")
	private String sourceType;// 视图来源：数据库表、数据库视图、RSS、XML，多表关联采用VIEW来实现。字典定义为：数据库表：01；数据库视图：02；RSS:03;XML:04
	
	@Column(name="VIEW_CUSTOM")
	private String custom;// 是否自定义视图(是:01;否:02;)
	
	@Column(name="VIEW_SQL")
	private String sqlcontent;// 视图SQL语句
	
	@Column(name="VIEW_OPEN_TYPE")
	private String openType;// 视图打开方式
	
	@Column(name="VIEW_OPEN_CONTENT")
	private String openContent;// 视图打开方式内容
	
	@Column(name="VIEW_TREE_CLASS")
	private String treeClass;// 树形数据地址
	
	@Column(name="VIEW_PARAMS_CLASS")
	private String paramsClass;// 值设置自定义实现类
	
	@Column(name="VIEW_SEARCH_STYLE")
	private String searchStyle;// 搜索样式
	
	@Column(name="VIEW_CATEGORY")
	private String category;// 分类
	
	@Column(name="VIEW_WIDTH")
	private int width;// 编辑页宽度
	
	@Column(name="VIEW_HEIGHT")
	private int height;// 编辑页高度
	
	@Column(name="VIEW_ROWNUMBERS")
	private String rownumbers;// 行数显示
	
	private String checkbox;// 复选框
	
	@Column(name="APP_UNID")
	private String appid;// 系统id
	
	@Column(name="VIEW_DATA_CLASS")
	private String dataClass;//数据来源类
	
	private String showFooter = "0";//显示统计列
	
	@Column(name="VIEW_SQL_TYPE")
	private String sqlType = "0";//sql语句复杂度（0：简单（单表）；1：复杂（多表））
	
	@Column(name="VIEW_CLICK_TYPE")
	private String clickType = "0";//打开视图编辑页面的形式（0：单击；1：双击）
	
	@Column(name="VIEW_EDIT_TITLE")
	private String editTitle = "";//打开视图编辑页面显示在左上角的标题名称

	public String getUnid() {
		return unid;
	}

	public void setUnid(String unid) {
		this.unid = unid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getJndi() {
		return jndi;
	}

	public void setJndi(String jndi) {
		this.jndi = jndi;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getShowType() {
		return showType;
	}

	public void setShowType(String showType) {
		this.showType = showType;
	}

	public String getPageSize() {
		return pageSize;
	}

	public void setPageSize(String pageSize) {
		this.pageSize = pageSize;
	}

	public String getSourceType() {
		return sourceType;
	}

	public void setSourceType(String sourceType) {
		this.sourceType = sourceType;
	}

	public String getCustom() {
		return custom;
	}

	public void setCustom(String custom) {
		this.custom = custom;
	}


	public String getSqlcontent() {
		return sqlcontent;
	}

	public void setSqlcontent(String sqlcontent) {
		this.sqlcontent = sqlcontent;
	}

	public String getOpenType() {
		return openType;
	}

	public void setOpenType(String openType) {
		this.openType = openType;
	}

	public String getOpenContent() {
		return openContent;
	}

	public void setOpenContent(String openContent) {
		this.openContent = openContent;
	}

	public String getTreeClass() {
		return treeClass;
	}

	public void setTreeClass(String treeClass) {
		this.treeClass = treeClass;
	}

	public String getParamsClass() {
		return paramsClass;
	}

	public void setParamsClass(String paramsClass) {
		this.paramsClass = paramsClass;
	}

	public String getSearchStyle() {
		return searchStyle;
	}

	public void setSearchStyle(String searchStyle) {
		this.searchStyle = searchStyle;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public String getRownumbers() {
		return rownumbers;
	}

	public void setRownumbers(String rownumbers) {
		this.rownumbers = rownumbers;
	}

	public String getCheckbox() {
		return checkbox;
	}

	public void setCheckbox(String checkbox) {
		this.checkbox = checkbox;
	}

	public String getAppid() {
		return appid;
	}

	public void setAppid(String appid) {
		this.appid = appid;
	}

	public String getDataClass() {
		return dataClass;
	}

	public void setDataClass(String dataClass) {
		this.dataClass = dataClass;
	}
	
	public class SourceType{
		/** json数据类型 */
		public static final String JSON ="3";
	}

	public String getShowFooter() {
		return showFooter;
	}

	public void setShowFooter(String showFooter) {
		this.showFooter = showFooter;
	}

	public String getSqlType() {
		return sqlType;
	}

	public void setSqlType(String sqlType) {
		this.sqlType = sqlType;
	}

	public String getClickType() {
		return clickType;
	}

	public void setClickType(String clickType) {
		this.clickType = clickType;
	}

	public String getEditTitle() {
		return editTitle;
	}

	public void setEditTitle(String editTitle) {
		this.editTitle = editTitle;
	}
}
