package com.linewell.core.amchart.common;

/**
 * SliceData实体类
 * @author lchenming@linewell.com
 *
 */
public class SliceData {
	
	/**
	 * 标题
	 */
	private String title;
	/**
	 * 描述
	 */
	private String description;
	/**
	 * 
	 */
	private String pull_out;
	/**
	 * 值
	 */
	private String value;
	/**
	 * 透明
	 */
	private String alpha;
	
	/**
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}
	/**
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}
	/**
	 * 返回标题
	 * @return
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * 设置标题
	 * @param title
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	/**
	 * 返回描述
	 * @return
	 */
	public String getDescription() {
		return description;
	}
	/**
	 * 设置描述
	 * @param description
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	/**
	 * 返回
	 * @return
	 */
	public String getPull_out() {
		return pull_out;
	}
	/**
	 * 设置
	 * @param pull_out
	 */
	public void setPull_out(String pull_out) {
		this.pull_out = pull_out;
	}
	/**
	 * 返回值
	 * @return
	 */
	public String getValue() {
		return value;
	}
	/**
	 * 设置值
	 * @param value
	 */
	public void setValue(String value) {
		this.value = value;
	}
	
}
