package com.linewell.core.amchart.line;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jan 30, 2011 11:48:04 AM 
 * @version  v1.0
 * 类说明 :
 */
public class Zoom_out_button {

	public String x="";
	public String y="";
	public String color="";
	public String alpha="";
	public String text_color="";
	public String text_color_hover="";
	public String text_size="";
	public String text="";
	
	/**
	 * <!-- [] (Number / Number% / !Number) x position of zoom out button, 
	 * if not defined, will be aligned to right of plot area -->
	 * @return
	 */
	public String getX() {
		return x;
	}
	
	/**
	 * <!-- [] (Number / Number% / !Number) x position of zoom out button, if not defined,
	 *  will be aligned to right of plot area -->
	 * @param x
	 */
	public void setX(String x) {
		this.x = x;
	}
	
	/**
	 * <!-- [] (Number / Number% / !Number) y position of zoom out button, 
	 * if not defined, will be aligned to top of plot area -->
	 * @return
	 */
	public String getY() {
		return y;
	}
	
	/**
	 * <!-- [] (Number / Number% / !Number) y position of zoom out button,
	 *  if not defined, will be aligned to top of plot area -->
	 * @param y
	 */
	public void setY(String y) {
		this.y = y;
	}
	
	/**
	 * <!-- [#BBBB00] (hex color code) background color -->
	 * @return
	 */
	public String getColor() {
		return color;
	}
	
	/**
	 * <!-- [#BBBB00] (hex color code) background color -->
	 * @param color
	 */
	public void setColor(String color) {
		this.color = color;
	}
	
	/**
	 * <!-- [0] (0 - 100) background alpha -->
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}
	
	/**
	 * <!-- [0] (0 - 100) background alpha -->
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}
	public String getText_color() {
		return text_color;
	}
	
	/**
	 * <!-- [text_color] (hex color code) button text and magnifying glass icon color -->
	 * @param text_color
	 */
	public void setText_color(String text_color) {
		this.text_color = text_color;
	}
	
	/**
	 * <!-- [#BBBB00] (hex color code) button text and magnifying glass icon roll over color --> 
	 * @return
	 */
	public String getText_color_hover() {
		return text_color_hover;
	}
	
	/**
	 * <!-- [#BBBB00] (hex color code) button text and magnifying glass icon roll over color --> 
	 * @param text_color_hover
	 */
	public void setText_color_hover(String text_color_hover) {
		this.text_color_hover = text_color_hover;
	}
	
	/**
	 * <!-- [text_size] (Number) button text size -->
	 * @return
	 */
	public String getText_size() {
		return text_size;
	}
	
	/**
	 * <!-- [text_size] (Number) button text size -->
	 * @param text_size
	 */
	public void setText_size(String text_size) {
		this.text_size = text_size;
	}
	
	/**
	 * <!-- [Show all] (text) -->   
	 * @return
	 */
	public String getText() {
		return text;
	}
	
	/**
	 * <!-- [Show all] (text) -->   
	 * @param text
	 */
	public void setText(String text) {
		this.text = text;
	}
}
