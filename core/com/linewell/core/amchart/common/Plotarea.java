package com.linewell.core.amchart.common;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jan 30, 2011 10:09:01 AM 
 * @version  v1.0
 * 类说明 :目前主要用于柱、线三种图形
 */
public class Plotarea {
    
    public String color="";
    public String alpha="";
    public String border_color="";
    public String border_alpha="";
    public String marginsLeft="";
    public String marginsTop="";
    public String marginsRight="";
    public String marginsBottom="";
    
    /**
     * <!-- [#FFFFFF](hex color code) Separate color codes with comas for gradient -->
     * @return
     */
	public String getColor() {
		return color;
	}
	
	/**
	 * <!-- [#FFFFFF](hex color code) Separate color codes with comas for gradient -->
	 * @param color
	 */
	public void setColor(String color) {
		this.color = color;
	}
	
	/**
	 * <!-- [0] (0 - 100) if you want it to be different than background color, use bigger than 0 value -->
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}
	
	/**
	 * <!-- [0] (0 - 100) if you want it to be different than background color, use bigger than 0 value -->
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}
	
	/**
	 * <!-- [#000000] (hex color code) -->  
	 * @return
	 */
	public String getBorder_color() {
		return border_color;
	}
	
	/**
	 * <!-- [#000000] (hex color code) -->  
	 * @param border_color
	 */
	public void setBorder_color(String border_color) {
		this.border_color = border_color;
	}
	
	/**
	 * <!-- [0] (0 - 100) -->   
	 * @return
	 */
	public String getBorder_alpha() {
		return border_alpha;
	}
	
	/**
	 * <!-- [0] (0 - 100) -->   
	 * @param border_alpha
	 */
	public void setBorder_alpha(String border_alpha) {
		this.border_alpha = border_alpha;
	}
	
	/**
	 * <!-- plot area margins -->
	 * @return
	 */
	public String getMarginsLeft() {
		return marginsLeft;
	}
	
	/**
	 * <!-- plot area margins -->
	 * @param marginsLeft
	 */
	public void setMarginsLeft(String marginsLeft) {
		this.marginsLeft = marginsLeft;
	}
	
	/**
	 * <!-- [60](Number / Number%) --> 
	 * @return
	 */
	public String getMarginsTop() {
		return marginsTop;
	}
	
	/**
	 * <!-- [60](Number / Number%) --> 
	 * @param marginsTop
	 */
	public void setMarginsTop(String marginsTop) {
		this.marginsTop = marginsTop;
	}
	
	/**
	 * <!-- [60](Number / Number%) --> 
	 * @return
	 */
	public String getMarginsRight() {
		return marginsRight;
	}
	/**
	 * <!-- [60](Number / Number%) --> 
	 * @param marginsRight
	 */
	public void setMarginsRight(String marginsRight) {
		this.marginsRight = marginsRight;
	}
	
	/**
	 * <!-- [80](Number / Number%) -->
	 * @return
	 */
	public String getMarginsBottom() {
		return marginsBottom;
	}
	
	/**
	 * <!-- [80](Number / Number%) -->
	 * @param marginsBottom
	 */
	public void setMarginsBottom(String marginsBottom) {
		this.marginsBottom = marginsBottom;
	}
    
    
}
