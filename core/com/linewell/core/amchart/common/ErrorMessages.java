package com.linewell.core.amchart.common;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Feb 15, 2010 10:40:43 PM 
 * @version  v1.0
 * 类说明 :错误信息提示，目前主要用于饼、柱、线三种图形
 */
public class ErrorMessages {
	public boolean enabled=true;
	public String x="";
	public String y="";
	public String color="#BBBB00";
	public String alpha="100";
	public String text_color="#FFFFFF";
	public String text_size="12";
	
	
	/**
	 * 错误是否显示
	 * [true] (true / false)
	 * @return
	 */
	public boolean isEnabled() {
		return enabled;
	}
	
	/**
	 * 错误是否显示
	 * [true] (true / false) 
	 * @param enabled
	 */
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	/**
	 * [] (Number / Number% / !Number) 
	 * x position of error message
	 * @return
	 */
	public String getX() {
		return x;
	}
	
	/**
	 * [] (Number / Number% / !Number) 
	 * x position of error message
	 * @param x
	 */
	public void setX(String x) {
		this.x = x;
	}
	
	/**
	 *[] (Number / Number% / !Number) 
	 *y position of error message.
	 * @return
	 */
	public String getY() {
		return y;
	}
	
	/**
	 *[] (Number / Number% / !Number) 
	 *y position of error message.
	 * @param y
	 */
	public void setY(String y) {
		this.y = y;
	}
	
	/**
	 * [#BBBB00] (hex color code)
	 *  background color of error message.
	 * @return
	 */
	public String getColor() {
		return color;
	}
	
	/**
	 * [#BBBB00] (hex color code)
	 *  background color of error message. 
	 * @param color
	 */
	public void setColor(String color) {
		this.color = color;
	}
	
	/**
	 * [100] (0 - 100) background alpha
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}
	
	/**
	 * [100] (0 - 100) background alpha
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}
	
	/**
	 * [#FFFFFF] (hex color code)
	 * @return
	 */
	public String getText_color() {
		return text_color;
	}
	
	/**
	 * [#FFFFFF] (hex color code)
	 * @param text_color
	 */
	public void setText_color(String text_color) {
		this.text_color = text_color;
	}
	
	/**
	 * [text_size] (Number) 
	 * @return
	 */
	public String getText_size() {
		return text_size;
	}
	
	/**
	 * [text_size] (Number) 
	 * @param text_size
	 */
	public void setText_size(String text_size) {
		this.text_size = text_size;
	}

}
