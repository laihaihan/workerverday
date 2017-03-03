package com.linewell.core.amchart.common;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Feb 15, 2010 10:37:05 PM
 * @version v1.0 类说明 :标签的显示,目前主要用于饼、柱、线三种图形
 */
public class Balloon {
	public boolean enabled = true;// 是否显示标签
	public boolean only_one = false;
	public boolean only_off = true;
	public String color = "";// 标签的背景色
	public String alpha = "";// 标签的透明度
	public String text_color = ""; // 标签文本的颜色
	public String text_size = "";// 标签文本的大小
	public String max_width = "";// 标签的最大最小宽度
	public String corner_radius = "";// 标签的显示方式
	public String border_width = "";// 标签边框的宽度
	public String border_alpha = "";// 标签边框的透明度
	public String border_color = "";// 标签边框的颜色
	public String show = "";

	/**
	 * [true] (true / false) 是否显示标签
	 * 
	 * @return
	 */
	public boolean isEnabled() {
		return enabled;
	}

	/**
	 * [true] (true / false) 是否显示标签
	 * 
	 * @param enabled
	 */
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	/**
	 * <!-- [false] (true / false) if set to true, only one balloon at a time
	 * will be displayed -->
	 * 
	 * @return
	 */
	public boolean isOnly_one() {
		return only_one;
	}

	/**
	 * <!-- [false] (true / false) if set to true, only one balloon at a time
	 * will be displayed -->
	 * 
	 * @param only_one
	 */
	public void setOnly_one(boolean only_one) {
		this.only_one = only_one;
	}

	/**
	 * <!-- [true] (true/false) whether it will be possible to turn on or off y
	 * balloons by clicking on a legend or on a graph -->
	 * 
	 * @return
	 */
	public boolean isOnly_off() {
		return only_off;
	}

	/**
	 * <!-- [true] (true/false) whether it will be possible to turn on or off y
	 * balloons by clicking on a legend or on a graph -->
	 * 
	 * @param only_off
	 */
	public void setOnly_off(boolean only_off) {
		this.only_off = only_off;
	}

	/**
	 * [#******] 标签的背景色
	 * 
	 * @return
	 */
	public String getColor() {
		return color;
	}

	/**
	 * [#******] 标签的背景色
	 * 
	 * @param color
	 */
	public void setColor(String color) {
		this.color = color;
	}

	/**
	 * [100] (0 - 100) 标签的透明度
	 * 
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}

	/**
	 * [100] (0 - 100) 标签的透明度
	 * 
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}

	/**
	 * [0xFFFFFF] (hex color code) 标签文本的颜色
	 * 
	 * @return
	 */
	public String getText_color() {
		return text_color;
	}

	/**
	 * [0xFFFFFF] (hex color code) 标签文本的颜色
	 * 
	 * @param text_color
	 */
	public void setText_color(String text_color) {
		this.text_color = text_color;
	}

	/**
	 * [text_size] (Number) 标签文本的大小
	 * 
	 * @return
	 */
	public String getText_size() {
		return text_size;
	}

	/**
	 * [text_size] (Number) 标签文本的大小
	 * 
	 * @param text_size
	 */
	public void setText_size(String text_size) {
		this.text_size = text_size;
	}

	/**
	 * [220] (Number) The maximum width of a balloon 标签的最大最小宽度
	 * 
	 * @return
	 */
	public String getMax_width() {
		return max_width;
	}

	/**
	 * [220] (Number) The maximum width of a balloon 标签的最大最小宽度
	 * 
	 * @param max_width
	 */
	public void setMax_width(String max_width) {
		this.max_width = max_width;
	}

	/**
	 * [0] (Number) Corner radius of a balloon. If you set it > 0, the balloon
	 * will not display arrow 标签的显示方式
	 * 
	 * @return
	 */
	public String getCorner_radius() {
		return corner_radius;
	}

	/**
	 * [0] (Number) Corner radius of a balloon. If you set it > 0, the balloon
	 * will not display arrow 标签的显示方式
	 * 
	 * @param corner_radius
	 */
	public void setCorner_radius(String corner_radius) {
		this.corner_radius = corner_radius;
	}

	/**
	 * [0] (Number) 标签边框的宽度
	 * 
	 * @return
	 */
	public String getBorder_width() {
		return border_width;
	}

	/**
	 * [0] (Number) 标签边框的宽度
	 * 
	 * @param border_width
	 */
	public void setBorder_width(String border_width) {
		this.border_width = border_width;
	}

	/**
	 * [balloon.alpha] (Number) 标签边框的透明度
	 * 
	 * @return
	 */
	public String getBorder_alpha() {
		return border_alpha;
	}

	/**
	 * [balloon.alpha] (Number) 标签边框的透明度
	 * 
	 * @param border_alpha
	 */
	public void setBorder_alpha(String border_alpha) {
		this.border_alpha = border_alpha;
	}

	/**
	 * [balloon.color] (hex color code) 标签边框的颜色
	 * 
	 * @return
	 */
	public String getBorder_color() {
		return border_color;
	}

	/**
	 * [balloon.color] (hex color code) 标签边框的颜色
	 * 
	 * @param border_color
	 */
	public void setBorder_color(String border_color) {
		this.border_color = border_color;
	}

	/**
	 * 默认显示标题\百分比\描述 {title}:{value}{percents}% <br>
	 * {description}
	 * 
	 * @return
	 */
	public String getShow() {
		return show;
	}

	/**
	 * 默认显示标题\百分比\描述 {title}:{value} {percents}% <br>
	 * {description}
	 * 
	 * @param show
	 */
	public void setShow(String show) {
		this.show = show;
	}

}
