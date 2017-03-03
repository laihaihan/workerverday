package com.linewell.core.amchart.line;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jan 30, 2011 11:47:13 AM 
 * @version  v1.0
 * 类说明 :
 */
public class Indicator {
	public boolean enabled=true;
	public boolean zoomable=true;
	public String color="";
	public String line_alpha="";
	public String selection_color="";
	public String selection_alpha="";
	public boolean x_balloon_enabled=true;
	public String x_balloon_text_color="";
	
	/**
	 * <!-- [true] (true / false) -->
	 * @return
	 */
	public boolean isEnabled() {
		return enabled;
	}
	
	/**
	 * <!-- [true] (true / false) -->
	 * @param enabled
	 */
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	/**
	 * <!-- [true] (true / false) -->
	 * @return
	 */
	public boolean isZoomable() {
		return zoomable;
	}
	
	/**
	 * <!-- [true] (true / false) -->
	 * @param zoomable
	 */
	public void setZoomable(boolean zoomable) {
		this.zoomable = zoomable;
	}
	
	/**
	 * <!-- [#BBBB00] (hex color code) line and x balloon background color -->
	 * @return
	 */
	public String getColor() {
		return color;
	}
	
	/**
	 * <!-- [#BBBB00] (hex color code) line and x balloon background color -->
	 * @param color
	 */
	public void setColor(String color) {
		this.color = color;
	}
	
	/**
	 * <!-- [100] (0 - 100) -->
	 * @return
	 */
	public String getLine_alpha() {
		return line_alpha;
	}
	
	/**
	 * <!-- [100] (0 - 100) -->
	 * @param line_alpha
	 */
	public void setLine_alpha(String line_alpha) {
		this.line_alpha = line_alpha;
	}
	
	/**
	 * <!-- [#BBBB00] (hex color code) -->
	 * @return
	 */
	public String getSelection_color() {
		return selection_color;
	}
	
	/**
	 * <!-- [#BBBB00] (hex color code) -->
	 * @param selection_color
	 */
	public void setSelection_color(String selection_color) {
		this.selection_color = selection_color;
	}
	
	/**
	 * <!-- [25] (0 - 100) -->
	 * @return
	 */
	public String getSelection_alpha() {
		return selection_alpha;
	}
	
	/**
	 * <!-- [25] (0 - 100) -->
	 * @param selection_alpha
	 */
	public void setSelection_alpha(String selection_alpha) {
		this.selection_alpha = selection_alpha;
	}
	
	/**
	 * <!-- [true] (true / false) -->
	 * @return
	 */
	public boolean isX_balloon_enabled() {
		return x_balloon_enabled;
	}
	
	/**
	 * <!-- [true] (true / false) -->
	 * @param x_balloon_enabled
	 */
	public void setX_balloon_enabled(boolean x_balloon_enabled) {
		this.x_balloon_enabled = x_balloon_enabled;
	}
	
	/**
	 * <!-- [text_color] (hex color code) -->
	 * @return
	 */
	public String getX_balloon_text_color() {
		return x_balloon_text_color;
	}
	
	/**
	 * <!-- [text_color] (hex color code) -->
	 * @param x_balloon_text_color
	 */
	public void setX_balloon_text_color(String x_balloon_text_color) {
		this.x_balloon_text_color = x_balloon_text_color;
	}
}
