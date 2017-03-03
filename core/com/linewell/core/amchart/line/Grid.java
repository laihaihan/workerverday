package com.linewell.core.amchart.line;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jan 30, 2011 10:51:42 AM 
 * @version  v1.0
 * 类说明 :
 */
public class Grid {
	public boolean xEnabled=true;
	public String xColor="";
	public String xAlpha="";
	public boolean xDashed=false;
	public String xDash_length="";
	public String xApprox_count="";
	public boolean y_leftEnabled=true;
	public String y_leftColor="";
	public String y_leftAlpha="";
	public boolean y_leftDashed=false;
	public String y_leftDash_length="";
	public String y_leftApprox_count="";
	public String y_leftFill_color="";
	public String y_leftFill_alpha="";
	public boolean y_rightEnabled=true;
	public String y_rightColor="";
	public String y_rightAlpha="";
	public boolean y_rightDashed=false;
	public String y_rightDash_length="";
	public String y_rightApprox_count="";
	public String y_rightFill_color="";
	public String y_rightFill_alpha="";
	
	/**
	 * vertical grid
	 * <!-- [true] (true / false) -->    
	 * @return
	 */
	public boolean isXEnabled() {
		return xEnabled;
	}
	
	/**
	 * vertical grid
	 * <!-- [true] (true / false) --> 
	 * @param enabled
	 */
	public void setXEnabled(boolean enabled) {
		xEnabled = enabled;
	}
	
	/**
	 * vertical grid
	 * <!-- [#000000] (hex color code) -->
	 * @return
	 */
	public String getXColor() {
		return xColor;
	}
	
	/**
	 * vertical grid
	 * <!-- [#000000] (hex color code) -->
	 * @param color
	 */
	public void setXColor(String color) {
		xColor = color;
	}
	
	/**
	 * vertical grid
	 * <!-- [15] (0 - 100) -->
	 * @return
	 */
	public String getXAlpha() {
		return xAlpha;
	}
	
	/**
	 * vertical grid
	 * <!-- [15] (0 - 100) -->
	 * @param alpha
	 */
	public void setXAlpha(String alpha) {
		xAlpha = alpha;
	}
	
	/**
	 * vertical grid
	 * <!-- [false](true / false) -->
	 * @return
	 */
	public boolean isXDashed() {
		return xDashed;
	}
	
	/**
	 * vertical grid
	 * <!-- [false](true / false) -->
	 * @param dashed
	 */
	public void setXDashed(boolean dashed) {
		xDashed = dashed;
	}
	
	/**
	 * vertical grid
	 * <!-- [5] (Number) --> 
	 * @return
	 */
	public String getXDash_length() {
		return xDash_length;
	}
	
	/**
	 * vertical grid
	 * <!-- [5] (Number) --> 
	 * @param dash_length
	 */
	public void setXDash_length(String dash_length) {
		xDash_length = dash_length;
	}
	
	/**
	 * vertical grid
	 * <!-- [4] (Number) approximate number of gridlines -->
	 * @return
	 */
	public String getXApprox_count() {
		return xApprox_count;
	}
	
	/**
	 * vertical grid
	 * <!-- [4] (Number) approximate number of gridlines -->
	 * @param approx_count
	 */
	public void setXApprox_count(String approx_count) {
		xApprox_count = approx_count;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [true] (true / false) -->
	 * @return
	 */
	public boolean isY_leftEnabled() {
		return y_leftEnabled;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [true] (true / false) -->
	 * @param enabled
	 */
	public void setY_leftEnabled(boolean enabled) {
		y_leftEnabled = enabled;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [#000000] (hex color code) -->
	 * @return
	 */
	public String getY_leftColor() {
		return y_leftColor;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [#000000] (hex color code) -->
	 * @param color
	 */
	public void setY_leftColor(String color) {
		y_leftColor = color;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [15] (0 - 100) -->
	 * @return
	 */
	public String getY_leftAlpha() {
		return y_leftAlpha;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [15] (0 - 100) -->
	 * @param alpha
	 */
	public void setY_leftAlpha(String alpha) {
		y_leftAlpha = alpha;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [false] (true / false) -->
	 * @return
	 */
	public boolean isY_leftDashed() {
		return y_leftDashed;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [false] (true / false) -->
	 * @param dashed
	 */
	public void setY_leftDashed(boolean dashed) {
		y_leftDashed = dashed;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [5] (Number) -->
	 * @return
	 */
	public String getY_leftDash_length() {
		return y_leftDash_length;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [5] (Number) -->
	 * @param dash_length
	 */
	public void setY_leftDash_length(String dash_length) {
		y_leftDash_length = dash_length;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [10] (Number) approximate number of gridlines -->
	 * @return
	 */
	public String getY_leftApprox_count() {
		return y_leftApprox_count;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [10] (Number) approximate number of gridlines -->
	 * @param approx_count
	 */
	public void setY_leftApprox_count(String approx_count) {
		y_leftApprox_count = approx_count;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [#FFFFFF] (hex color code) every second area between gridlines will be filled with this color 
	 * (you will need to set fill_alpha > 0) -->
	 * @return
	 */
	public String getY_leftFill_color() {
		return y_leftFill_color;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [#FFFFFF] (hex color code) every second area between gridlines will be filled with this color 
	 * (you will need to set fill_alpha > 0) -->
	 * @param fill_color
	 */
	public void setY_leftFill_color(String fill_color) {
		y_leftFill_color = fill_color;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [0] (0 - 100) opacity of fill -->
	 * @return
	 */
	public String getY_leftFill_alpha() {
		return y_leftFill_alpha;
	}
	
	/**
	 * horizontal grid, Y left axis.
	 * <!-- [0] (0 - 100) opacity of fill -->
	 * @param fill_alpha
	 */
	public void setY_leftFill_alpha(String fill_alpha) {
		y_leftFill_alpha = fill_alpha;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [true] (true / false) -->
	 * @return
	 */
	public boolean isY_rightEnabled() {
		return y_rightEnabled;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [true] (true / false) -->
	 * @param enabled
	 */
	public void setY_rightEnabled(boolean enabled) {
		y_rightEnabled = enabled;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [#000000] (hex color code) -->
	 * @return
	 */
	public String getY_rightColor() {
		return y_rightColor;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [#000000] (hex color code) -->
	 * @param color
	 */
	public void setY_rightColor(String color) {
		y_rightColor = color;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [15] (0 - 100) -->
	 * @return
	 */
	public String getY_rightAlpha() {
		return y_rightAlpha;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [15] (0 - 100) -->
	 * @param alpha
	 */
	public void setY_rightAlpha(String alpha) {
		y_rightAlpha = alpha;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [false] (true / false) -->
	 * @return
	 */
	public boolean isY_rightDashed() {
		return y_rightDashed;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [false] (true / false) -->
	 * @param dashed
	 */
	public void setY_rightDashed(boolean dashed) {
		y_rightDashed = dashed;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [5] (Number) -->
	 * @return
	 */
	public String getY_rightDash_length() {
		return y_rightDash_length;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [5] (Number) -->
	 * @param dash_length
	 */
	public void setY_rightDash_length(String dash_length) {
		y_rightDash_length = dash_length;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [#FFFFFF] (hex color code) every second area between gridlines will be filled with this color
	 *  (you will need to set fill_alpha > 0) -->
	 * @return
	 */
	public String getY_rightApprox_count() {
		return y_rightApprox_count;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [#FFFFFF] (hex color code) every second area between gridlines will be filled with this color 
	 * (you will need to set fill_alpha > 0) -->
	 * @param approx_count
	 */
	public void setY_rightApprox_count(String approx_count) {
		y_rightApprox_count = approx_count;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [0] (0 - 100) opacity of fill --> 
	 * @return
	 */
	public String getY_rightFill_color() {
		return y_rightFill_color;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * <!-- [0] (0 - 100) opacity of fill --> 
	 * @param fill_color
	 */
	public void setY_rightFill_color(String fill_color) {
		y_rightFill_color = fill_color;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * 
	 * @return
	 */
	public String getY_rightFill_alpha() {
		return y_rightFill_alpha;
	}
	
	/**
	 * horizontal grid, Y right axis.
	 * 
	 * @param fill_alpha
	 */
	public void setY_rightFill_alpha(String fill_alpha) {
		y_rightFill_alpha = fill_alpha;
	}
	
}
