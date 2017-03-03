package com.linewell.core.amchart.common;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Jan 27, 2011 10:58:49 PM
 * @version v1.0 类说明 :目前主要用于饼、柱、线三种图形
 */
public class Background {

	public String color = "";// 背景色
	public String alpha = "";// 透明度
	public String border_color = ""; // 边框颜色
	public String border_alpha = "";// 边框透明度
	public String file = "";// 文件名

	/**
	 * <!-- The chart will look for this file in path folder (path is set in
	 * HTML) -->
	 */
	public String getColor() {
		return color;
	}

	/**
	 * <!-- The chart will look for this file in path folder (path is set in
	 * HTML) -->
	 * 
	 * @param color
	 */
	public void setColor(String color) {
		this.color = color;
	}

	/**
	 * <!-- [0] (0 - 100) use 0 if you are using custom swf or jpg for
	 * background -->
	 * 
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}

	/**
	 * <!-- [0] (0 - 100) use 0 if you are using custom swf or jpg for
	 * background -->
	 * 
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}

	/**
	 * <!-- [#000000] (hex color code) -->
	 * 
	 * @return
	 */
	public String getBorder_color() {
		return border_color;
	}

	/**
	 * <!-- [#000000] (hex color code) -->
	 * 
	 * @param border_color
	 */
	public void setBorder_color(String border_color) {
		this.border_color = border_color;
	}

	/**
	 * <!-- [0] (0 - 100) -->
	 * 
	 * @return
	 */
	public String getBorder_alpha() {
		return border_alpha;
	}

	/**
	 * <!-- [0] (0 - 100) -->
	 * 
	 * @param border_alpha
	 */
	public void setBorder_alpha(String border_alpha) {
		this.border_alpha = border_alpha;
	}

	/**
	 * <!-- [] (filename) swf or jpg file of a background. Do not use
	 * progressive jpg file, it will be not visible with flash player 7 -->
	 * 
	 * @return
	 */
	public String getFile() {
		return file;
	}

	/**
	 * <!-- [] (filename) swf or jpg file of a background. Do not use
	 * progressive jpg file, it will be not visible with flash player 7 -->
	 * 
	 * @param file
	 */
	public void setFile(String file) {
		this.file = file;
	}
}
