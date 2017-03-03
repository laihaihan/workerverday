package com.linewell.core.amchart.pie;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Jan 30, 2011 9:08:01 AM
 * @version v1.0 类说明 :
 */
public class DataLabels {

	public String radius = "10%";
	public String text_color = "";
	public String text_size = "13";
	public String max_width = "120";
	public String show = "";
	public boolean show_lines = true;
	public String line_color = "#000000";
	public String line_alpha = "15";
	public String hide_labels_percent = "";
	public boolean avoid_overlapping = true;

	/**
	 * 半径 , 线的长度
	 * <!-- [20%] (Number / Number%) distance of the labels from the pie. Use
	 * negative value to place labels on the pie -->
	 * 
	 * @return
	 */
	public String getRadius() {
		return radius;
	}

	/**
	 * 半径 , 线的长度
	 * <!-- [20%] (Number / Number%) distance of the labels from the pie. Use
	 * negative value to place labels on the pie -->
	 * 
	 * @param radius
	 */
	public void setRadius(String radius) {
		this.radius = radius;
	}

	/**
	 * <!-- [text_color] (hex color code) -->
	 * 
	 * @return
	 */
	public String getText_color() {
		return text_color;
	}

	/**
	 * <!-- [text_color] (hex color code) -->
	 * 
	 * @param text_color
	 */
	public void setText_color(String text_color) {
		this.text_color = text_color;
	}

	/**
	 * <!-- [text_size] (Number) -->
	 * 
	 * @return
	 */
	public String getText_size() {
		return text_size;
	}

	/**
	 * <!-- [text_size] (Number) -->
	 * 
	 * @param text_size
	 */
	public void setText_size(String text_size) {
		this.text_size = text_size;
	}

	/**
	 * <!-- [120] (Number) -->
	 * 数据标签文字的宽度
	 * @return
	 */
	public String getMax_width() {
		return max_width;
	}

	/**
	 * <!-- [120] (Number) -->
	 * 数据标签文字的宽度
	 * @param max_width
	 */
	public void setMax_width(String max_width) {
		this.max_width = max_width;
	}

	/**
	 * 显示数据
	 * <!-- [] ({value} {title} {percents} {description}) You can format any
	 * data label: {value} - will be replaced with value and so on. You can add
	 * your own text or html code too. -->
	 * 
	 * @return
	 */
	public String getShow() {
		return show;
	}

	/**
	 * 显示数据
	 * <!-- [] ({value} {title} {percents} {description}) You can format any
	 * data label: {value} - will be replaced with value and so on. You can add
	 * your own text or html code too. -->
	 * 
	 * @param show
	 */
	public void setShow(String show) {
		this.show = show;
	}

	/**
	 * 是否显示线
	 * <!-- [true] (true / false) whether to show lines from slices to data
	 * labels or not -->
	 * 
	 * @return
	 */
	public boolean isShow_lines() {
		return show_lines;
	}

	/**
	 * 是否显示线
	 * <!-- [true] (true / false) whether to show lines from slices to data
	 * labels or not -->
	 * 
	 * @param show_lines
	 */
	public void setShow_lines(boolean show_lines) {
		this.show_lines = show_lines;
	}

	/**
	 * <!-- [#000000] (hex color code) -->
	 * 线条颜色
	 * @return
	 */
	public String getLine_color() {
		return line_color;
	}

	/**
	 * <!-- [#000000] (hex color code) -->
	 * 线条颜色
	 * @param line_color
	 */
	public void setLine_color(String line_color) {
		this.line_color = line_color;
	}

	/**
	 * <!-- [15] (Number) -->
	 * 线条透明度
	 * @return
	 */
	public String getLine_alpha() {
		return line_alpha;
	}

	/**
	 * <!-- [15] (Number) -->
	 * 线条透明度
	 * @param line_alpha
	 */
	public void setLine_alpha(String line_alpha) {
		this.line_alpha = line_alpha;
	}

	/**
	 * <!-- [0] data labels of slices less then skip_labels_percent% will be
	 * hidden (to avoid label overlapping if there are many small pie slices)-->
	 * 
	 * @return
	 */
	public String getHide_labels_percent() {
		return hide_labels_percent;
	}

	/**
	 * <!-- [0] data labels of slices less then skip_labels_percent% will be
	 * hidden (to avoid label overlapping if there are many small pie slices)-->
	 * 
	 * @param hide_labels_percent
	 */
	public void setHide_labels_percent(String hide_labels_percent) {
		this.hide_labels_percent = hide_labels_percent;
	}

	/**
	 * <!-- [true] (true / false) Whether to change data labels positions so
	 * that they wouldn't overlap or not -->
	 * 
	 * @return
	 */
	public boolean isAvoid_overlapping() {
		return avoid_overlapping;
	}

	/**
	 * <!-- [true] (true / false) Whether to change data labels positions so
	 * that they wouldn't overlap or not -->
	 * 
	 * @param avoid_overlapping
	 */
	public void setAvoid_overlapping(boolean avoid_overlapping) {
		this.avoid_overlapping = avoid_overlapping;
	}

}
