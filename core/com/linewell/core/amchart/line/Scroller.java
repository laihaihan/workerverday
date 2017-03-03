package com.linewell.core.amchart.line;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jan 30, 2011 11:45:40 AM 
 * @version  v1.0
 * 类说明 :
 */
public class Scroller { 
	public boolean enabled=false;
	public String y="";
	public String color="";
	public String alpha="";
	public String bg_color="";
	public String bg_alpha="";
	public String height="";
	
	/**
	 * <!-- [true] (true / false) whether to show scroller when chart is zoomed or not -->
	 * @return
	 */
	public boolean isEnabled() {
		return enabled;
	}
	
	/**
	 * <!-- [true] (true / false) whether to show scroller when chart is zoomed or not -->
	 * @param enabled
	 */
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	/**
	 * <!-- [] (Number) Y position of scroller. If not set here, will be displayed above plot area -->    
	 * @return
	 */
	public String getY() {
		return y;
	}
	
	/**
	 * <!-- [] (Number) Y position of scroller. If not set here, will be displayed above plot area -->    
	 * @param y
	 */
	public void setY(String y) {
		this.y = y;
	}
	
	/**
	 *  <!-- [#DADADA] (hex color code) scrollbar color. Separate color codes with comas for gradient -->
	 * @return
	 */
	public String getColor() {
		return color;
	}
	
	/**
	 *  <!-- [#DADADA] (hex color code) scrollbar color. Separate color codes with comas for gradient -->
	 * @param color
	 */
	public void setColor(String color) {
		this.color = color;
	}
	
	/**
	 * <!-- [100] (Number) scrollbar alpha -->
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}
	
	/**
	 * <!-- [100] (Number) scrollbar alpha -->
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}
	
	/**
	 * <!-- [#F0F0F0] (hex color code) scroller background color. Separate color codes with comas for gradient -->
	 * @return
	 */
	public String getBg_color() {
		return bg_color;
	}
	
	/**
	 * <!-- [#F0F0F0] (hex color code) scroller background color. Separate color codes with comas for gradient -->
	 * @param bg_color
	 */
	public void setBg_color(String bg_color) {
		this.bg_color = bg_color;
	}
	/**
	 * <!-- [100] (Number) scroller background alpha -->
	 * @return
	 */
	public String getBg_alpha() {
		return bg_alpha;
	}
	
	/**
	 * <!-- [100] (Number) scroller background alpha -->
	 * @param bg_alpha
	 */
	public void setBg_alpha(String bg_alpha) {
		this.bg_alpha = bg_alpha;
	}
	
	/**
	 * <!-- [10] (Number) scroller height -->  
	 * @return
	 */
	public String getHeight() {
		return height;
	}
	
	/**
	 * <!-- [10] (Number) scroller height -->  
	 * @param height
	 */
	public void setHeight(String height) {
		this.height = height;
	}
	
}
