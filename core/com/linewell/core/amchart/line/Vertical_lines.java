package com.linewell.core.amchart.line;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jan 30, 2011 11:47:40 AM 
 * @version  v1.0
 * 类说明 :
 */
public class Vertical_lines {
	
	public String width="";
	public String alpha="";
	public boolean clustered=false;
	public String mask="";
	/**
	 * <!-- [0] (0 - 100) width of vertical line in percents. 
	 * 0 for hairline. Set > 0 if you want to have column -->
	 * @return
	 */
	public String getWidth() {
		return width;
	}
	
	/**
	 * <!-- [0] (0 - 100) width of vertical line in percents. 
	 * 0 for hairline. Set > 0 if you want to have column -->
	 * @param width
	 */
	public void setWidth(String width) {
		this.width = width;
	}
	
	/**
	 * <!-- [100] (0 - 100) -->
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}
	
	/**
	 * <!-- [100] (0 - 100) -->
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}
	
	/**
	 * <!-- [false] in case you have more then one graph with vertical lines enabled,
	 *  you might want to place your columns next to each other, set true for that. -->
	 * @return
	 */
	public boolean isClustered() {
		return clustered;
	}
	
	/**
	 * <!-- [false] in case you have more then one graph with vertical lines enabled, 
	 * you might want to place your columns next to each other, set true for that. -->
	 * @param clustered
	 */
	public void setClustered(boolean clustered) {
		this.clustered = clustered;
	}
	
	/**
	 * <!-- [true] (true / false) as line chart by default starts on axis, and your column width is >0, 
	 * then some part of first and last column will be outside plot area 
	 * (incase you don't set <start_on_axis>false</false>
	 *  Mask will cut off the part outside the plot area. Set to false if you don't want this. -->
	 * @return
	 */
	public String getMask() {
		return mask;
	}
	
	/**
	 * <!-- [true] (true / false) as line chart by default starts on axis, and your column width is >0, 
	 * then some part of first and last column will be outside plot area 
	 * (incase you don't set <start_on_axis>false</false>
	 *  Mask will cut off the part outside the plot area. Set to false if you don't want this. -->
	 * @param mask
	 */
	public void setMask(String mask) {
		this.mask = mask;
	}
}
