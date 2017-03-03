package com.linewell.core.html;


/**
 * Html域对象
 * 
 * @author zjianhui@linewell.com date: Feb 16, 2011
 */
public class HtmlBean {
	private String name = ""; // 域名
	private String defaultValue = "";// 域缺省值
	private String type = "";// 域类型
	private String title = "";// 中文名称
	private String ismust = "";// 是否必填
	private int legth = 0 ; //字段长度

	public String getIsmust() {
		return ismust;
	}

	public void setIsmust(String ismust) {
		this.ismust = ismust;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
}	