package com.linewell.core.view.column;

import javax.persistence.Table;

/**
 * 
 * <p>
 * 应用视图列
 * </P>
 * 
 * @author cyingquan@linewell.com
 * @date Jan 10, 2012
 * @version 1.00
 *          <p>
 *          Copyright (c) 2011 www.linewell.com
 *          </p>
 */
@Table(name = "CORE_VIEW_COLUMN")
public class Column {
	@javax.persistence.Column(name = "COLUMN_UNID", unique = true)
	private String unid;// 标识

	@javax.persistence.Column(name = "VIEW_UNID")
	private String viewUnid;// 视图标识

	@javax.persistence.Column(name = "COLUMN_TITLE")
	private String title;// 列标题

	@javax.persistence.Column(name = "COLUMN_FIELD")
	private String field;// 数据库字段

	@javax.persistence.Column(name = "COLUMN_WIDTH")
	private String width;// 列宽

	@javax.persistence.Column(name = "COLUMN_SORT")
	private int sort;// 字段排序

	@javax.persistence.Column(name = "COLUMN_FORMATTER")
	private String formatter;// 列转换扩展功能

	@javax.persistence.Column(name = "COLUMN_ALIGN")
	private String align;// 对齐(居中:center;左:left;右:right;)

	@javax.persistence.Column(name = "COLUMN_SORTABLE")
	private String sortable;// 是否可排序分类(是:true;否:false)

	@javax.persistence.Column(name = "COLUMN_ROWSPAN")
	private int rowspan;// 合并行

	@javax.persistence.Column(name = "COLUMN_COLSPAN")
	private int colspan;// 合并列

	@javax.persistence.Column(name = "COLUMN_CHECKBOX")
	private String checkbox;// 是否显示成复选框(true:是;false:否;)

	@javax.persistence.Column(name = "COLUMN_ONCLICK")
	private String onclick;// 列单击js函数

	@javax.persistence.Column(name = "COLUMN_HIDDEN")
	private String hidden;// 是否隐藏(true:是;false:否;)

	@javax.persistence.Column(name = "COLUMN_MERGE")
	private String merge;// 合并单元格(0:不;1:合并)
	
	@javax.persistence.Column(name = "COLUMN_FOOTER")
	private String footer;// 显示尾部统计列(0:无;1:显示)

	public String getUnid() {
		return unid;
	}

	public void setUnid(String unid) {
		this.unid = unid;
	}

	public String getViewUnid() {
		return viewUnid;
	}

	public void setViewUnid(String viewUnid) {
		this.viewUnid = viewUnid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public String getFormatter() {
		return formatter;
	}

	public void setFormatter(String formatter) {
		this.formatter = formatter;
	}

	public String getAlign() {
		return align;
	}

	public void setAlign(String align) {
		this.align = align;
	}

	public String getSortable() {
		return sortable;
	}

	public void setSortable(String sortable) {
		this.sortable = sortable;
	}

	public String getCheckbox() {
		return checkbox;
	}

	public void setCheckbox(String checkbox) {
		this.checkbox = checkbox;
	}

	public String getOnclick() {
		return onclick;
	}

	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}

	public String getHidden() {
		return hidden;
	}

	public void setHidden(String hidden) {
		this.hidden = hidden;
	}

	public int getSort() {
		return sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}

	public int getRowspan() {
		return rowspan;
	}

	public void setRowspan(int rowspan) {
		this.rowspan = rowspan;
	}

	public int getColspan() {
		return colspan;
	}

	public void setColspan(int colspan) {
		this.colspan = colspan;
	}

	public String getMerge() {
		return merge;
	}

	public void setMerge(String merge) {
		this.merge = merge;
	}

	public String getFooter() {
		return footer;
	}

	public void setFooter(String footer) {
		this.footer = footer;
	}
}
