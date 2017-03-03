package com.linewell.core.view.query;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * 
 * <p>
 * 应用视图搜索条件
 * </P>
 * 
 * @author cyingquan@linewell.com
 * @date Jan 10, 2012
 * @version 1.00
 *          <p>
 *          Copyright (c) 2011 www.linewell.com
 *          </p>
 */
@Table(name = "CORE_VIEW_QUERY")
public class Query {
	
	@Column(name="QUERY_UNID",unique=true)
	private String unid;//		
	
	@Column(name="QUERY_NAME")
	private String name;// 显示名称
	
	@Column(name="QUERY_FIELD")
	private String field;// 字段名称
	
	@Column(name="QUERY_DISPLAY_TYPE")
	private String displayType;// 显示类型(1:text;2:radio;3.)
	
	@Column(name="VIEW_UNID")
	private String viewUnid;// 视图unid
	
	@Column(name="QUERY_DISPLAY_SIMPLE")
	private String displaySimple;// 是否显示为简单(1:显示;0不显示)
	
	@Column(name="QUERY_DIC_UNID")
	private String dicUnid;// 关联字典unid
	
	@Column(name="QUERY_SORT")
	private int sort;// 排序

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

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getDisplayType() {
		return displayType;
	}

	public void setDisplayType(String displayType) {
		this.displayType = displayType;
	}

	public String getViewUnid() {
		return viewUnid;
	}

	public void setViewUnid(String viewUnid) {
		this.viewUnid = viewUnid;
	}

	public String getDisplaySimple() {
		return displaySimple;
	}

	public void setDisplaySimple(String displaySimple) {
		this.displaySimple = displaySimple;
	}

	public String getDicUnid() {
		return dicUnid;
	}

	public void setDicUnid(String dicUnid) {
		this.dicUnid = dicUnid;
	}

	public int getSort() {
		return sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}
}
