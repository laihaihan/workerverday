package com.linewell.core.amchart.common;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Aug 12, 2010 12:12:13 AM
 * @version v1.0 类说明 :目前主要用于饼、柱、线三种图形
 */
public class Labels {

	private String label_lid = "0";
	private String x = "0";
	private String y = "2";
	private boolean rotate = false;
	private String width = "";
	private String align = "center";
	private String text_color = "";
	private String text_size = "18";
	private String text = "";

	/**
	 * 标签序列
	 * 
	 * @return
	 */
	public String getLabel_lid() {
		return label_lid;
	}

	/**
	 * 标签序列
	 * 
	 * @param label_lid
	 */
	public void setLabel_lid(String label_lid) {
		this.label_lid = label_lid;
	}

	/**
	 * <!-- [0] (Number / Number% / !Number) -->
	 * 
	 * @return
	 */
	public String getX() {
		return x;
	}

	/**
	 * <!-- [0] (Number / Number% / !Number) -->
	 * 
	 * @param x
	 */
	public void setX(String x) {
		this.x = x;
	}

	/**
	 * <!-- [0] (Number / Number% / !Number) -->
	 * 
	 * @return
	 */
	public String getY() {
		return y;
	}

	/**
	 * <!-- [0] (Number / Number% / !Number) -->
	 * 
	 * @param y
	 */
	public void setY(String y) {
		this.y = y;
	}

	/**
	 * <!-- [false] (true / false) -->
	 * 
	 * @return
	 */
	public boolean isRotate() {
		return rotate;
	}

	/**
	 * <!-- [false] (true / false) -->
	 * 
	 * @param rotate
	 */
	public void setRotate(boolean rotate) {
		this.rotate = rotate;
	}

	/**
	 * <!-- [] (Number / Number%) if empty, will stretch from left to right
	 * untill label fits -->
	 * 
	 * @return
	 */
	public String getWidth() {
		return width;
	}

	/**
	 * <!-- [] (Number / Number%) if empty, will stretch from left to right
	 * untill label fits -->
	 * 
	 * @param width
	 */
	public void setWidth(String width) {
		this.width = width;
	}

	/**
	 * <!-- [left] (left / center / right) -->
	 * 
	 * @return
	 */
	public String getAlign() {
		return align;
	}

	/**
	 * <!-- [left] (left / center / right) -->
	 * 
	 * @param align
	 */
	public void setAlign(String align) {
		this.align = align;
	}

	/**
	 * <!-- [text_color] (hex color code) button text color -->
	 * 
	 * @return
	 */
	public String getText_color() {
		return text_color;
	}

	/**
	 * <!-- [text_color] (hex color code) button text color -->
	 * 
	 * @param text_color
	 */
	public void setText_color(String text_color) {
		this.text_color = text_color;
	}

	/**
	 * <!-- [text_size](Number) button text size -->
	 * 
	 * @return
	 */
	public String getText_size() {
		return text_size;
	}

	/**
	 * <!-- [text_size](Number) button text size -->
	 * 
	 * @param text_size
	 */
	public void setText_size(String text_size) {
		this.text_size = text_size;
	}

	/**
	 * <!-- [] (text) html tags may be used (supports <b>, <i>, <u>, <font>, <a
	 * href="">, <br/>. Enter text between []: <![CDATA[your <b>bold</b> and
	 * <i>italic</i> text]]>-->
	 * 
	 * @return
	 */
	public String getText() {
		return text;
	}

	/**
	 * <!-- [] (text) html tags may be used (supports <b>, <i>, <u>, <font>, <a
	 * href="">, <br/>. Enter text between []: <![CDATA[your <b>bold</b> and
	 * <i>italic</i> text]]>-->
	 * 
	 * @param text
	 */
	public void setText(String text) {
		this.text = text;
	}

}
