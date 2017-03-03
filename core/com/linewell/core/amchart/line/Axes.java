package com.linewell.core.amchart.line;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jan 30, 2011 10:52:14 AM 
 * @version  v1.0
 * 类说明 :
 */
public class Axes {

	public String xColor="";
	public String xAlpha="";
	public String xWidth="";
	public String xTick_length="";
	
	public String y_leftType="";
	public String y_leftColor="";
	public String y_leftAlpha="";
	public String y_leftWidth="";
	public String y_leftTick_length="";
	public boolean y_leftLogarithmic=false;
	
	public String y_rightType="";
	public String y_rightColor="";
	public String y_rightAlpha="";
	public String y_rightWidth="";
	public String y_rightTick_length="";
	public boolean y_rightLogarithmic=false;
	
	/**
	 * X axis 
	 * <!-- [#000000] (hex color code) -->
	 * @return
	 */
	public String getXColor() {
		return xColor;
	}
	
	/**
	 *  X axis 
	 * <!-- [#000000] (hex color code) -->
	 * @param color
	 */
	public void setXColor(String color) {
		xColor = color;
	}
	
	/**
	 * X axis
	 * <!-- [100] (0 - 100) -->
	 * @return
	 */
	public String getXAlpha() {
		return xAlpha;
	}
	
	/**
	 * X axis
	 * <!-- [100] (0 - 100) -->
	 * @param alpha
	 */
	public void setXAlpha(String alpha) {
		xAlpha = alpha;
	}
	
	/**
	 * X axis
	 * <!-- [2] (Number) line width, 0 for hairline -->
	 * @return
	 */
	public String getXWidth() {
		return xWidth;
	}
	
	/**
	 * X axis
	 * <!-- [2] (Number) line width, 0 for hairline -->
	 * @param width
	 */
	public void setXWidth(String width) {
		xWidth = width;
	}
	
	/**
	 * X axis
	 * <!-- [7] (Number) -->
	 * @return
	 */
	public String getXTick_length() {
		return xTick_length;
	}
	
	/**
	 * X axis
	 * <!-- [7] (Number) -->
	 * @param tick_length
	 */
	public void setXTick_length(String tick_length) {
		xTick_length = tick_length;
	}
	
	/**
	 * Y left axis
	 * <!-- [line] (line, stacked, 100% stacked) --> 
	 * @return
	 */
	public String getY_leftType() {
		return y_leftType;
	}
	
	/**
	 * Y left axis
	 * <!-- [line] (line, stacked, 100% stacked) --> 
	 * @param type
	 */
	public void setY_leftType(String type) {
		y_leftType = type;
	}
	
	/**
	 * Y left axis
	 * <!-- [#000000] (hex color code) -->
	 * @return
	 */
	public String getY_leftColor() {
		return y_leftColor;
	}
	
	/**
	 * Y left axis
	 * <!-- [#000000] (hex color code) -->
	 * @param color
	 */
	public void setY_leftColor(String color) {
		y_leftColor = color;
	}
	
	/**
	 * Y left axis
	 * <!-- [100] (0 - 100) -->
	 * @return
	 */
	public String getY_leftAlpha() {
		return y_leftAlpha;
	}
	
	/**
	 * Y left axis
	 * <!-- [100] (0 - 100) -->
	 * @param alpha
	 */
	public void setY_leftAlpha(String alpha) {
		y_leftAlpha = alpha;
	}
	
	/**
	 * Y left axis
	 * <!-- [2] (Number) line width, 0 for hairline -->
	 * @return
	 */
	public String getY_leftWidth() {
		return y_leftWidth;
	}
	
	/**
	 * Y left axis
	 * <!-- [2] (Number) line width, 0 for hairline -->
	 * @param width
	 */
	public void setY_leftWidth(String width) {
		y_leftWidth = width;
	}
	
	/**
	 * Y left axis
	 * <!-- [7] (Number) -->
	 * @return
	 */
	public String getY_leftTick_length() {
		return y_leftTick_length;
	}
	
	/**
	 * Y left axis
	 * <!-- [7] (Number) -->
	 * @param tick_length
	 */
	public void setY_leftTick_length(String tick_length) {
		y_leftTick_length = tick_length;
	}
	
	/**
	 * Y left axis
	 * <!-- [false] (true / false) If set to true, this axis will use logarithmic scale instead of linear -->
	 * @return
	 */
	public boolean isY_leftLogarithmic() {
		return y_leftLogarithmic;
	}
	
	/**
	 * Y left axis
	 * <!-- [false] (true / false) If set to true, this axis will use logarithmic scale instead of linear -->
	 * @param logarithmic
	 */
	public void setY_leftLogarithmic(boolean logarithmic) {
		y_leftLogarithmic = logarithmic;
	}
	
	/**
	 * Y right axis
	 * <!-- [line] (line, stacked, 100% stacked) -->  
	 * @return
	 */
	public String getY_rightType() {
		return y_rightType;
	}
	
	/**
	 * Y right axis
	 * <!-- [line] (line, stacked, 100% stacked) -->  
	 * @param type
	 */
	public void setY_rightType(String type) {
		y_rightType = type;
	}
	
	/**
	 * Y right axis
	 * <!-- [#000000] (hex color code) -->
	 * @return
	 */
	public String getY_rightColor() {
		return y_rightColor;
	}
	
	/**
	 * Y right axis
	 * <!-- [#000000] (hex color code) -->
	 * @param color
	 */
	public void setY_rightColor(String color) {
		y_rightColor = color;
	}
	
	/**
	 * Y right axis
	 * <!-- [100] (0 - 100) -->
	 * @return
	 */
	public String getY_rightAlpha() {
		return y_rightAlpha;
	}
	
	/**
	 * Y right axis
	 * <!-- [100] (0 - 100) -->
	 * @param alpha
	 */
	public void setY_rightAlpha(String alpha) {
		y_rightAlpha = alpha;
	}
	
	/**
	 * Y right axis
	 * <!-- [2] (Number) line width, 0 for hairline -->
	 * @return
	 */
	public String getY_rightWidth() {
		return y_rightWidth;
	}
	
	/**
	 * Y right axis
	 * <!-- [2] (Number) line width, 0 for hairline -->
	 * @param width
	 */
	public void setY_rightWidth(String width) {
		y_rightWidth = width;
	}
	
	/**
	 * Y right axis
	 * <!-- [7] (Number) -->
	 * @return
	 */
	public String getY_rightTick_length() {
		return y_rightTick_length;
	}
	
	/**
	 * Y right axis
	 * <!-- [7] (Number) -->
	 * @param tick_length
	 */
	public void setY_rightTick_length(String tick_length) {
		y_rightTick_length = tick_length;
	}
	
	/**
	 * Y right axis
	 * <!-- [false] (true / false) If set to true, this axis will use logarithmic scale instead of linear -->
	 * @return
	 */
	public boolean isY_rightLogarithmic() {
		return y_rightLogarithmic;
	}
	
	/**
	 * Y right axis
	 * <!-- [false] (true / false) If set to true, this axis will use logarithmic scale instead of linear -->
	 * @param logarithmic
	 */
	public void setY_rightLogarithmic(boolean logarithmic) {
		y_rightLogarithmic = logarithmic;
	}

}
