package com.linewell.core.amchart.column;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jan 30, 2011 10:52:14 AM 
 * @version  v1.0
 * 类说明 :
 */
public class Axes {
	public String categoryColor="";
	public String categoryAlpha="";
	public String categoryWidth="";
	public String categoryTick_length="";
	public String valueColor="";
	public String valueAlpha="";
	public String valueWidth="";
	public String valueTick_length="";
	public boolean valueLogarithmic=false;
	
	/**
	 * category axis
	 * <!-- [#000000] (hex color code) -->
	 * @return
	 */
	public String getCategoryColor() {
		return categoryColor;
	}
	
	/**
	 * category axis
	 * <!-- [#000000] (hex color code) -->
	 * @param categoryColor
	 */
	public void setCategoryColor(String categoryColor) {
		this.categoryColor = categoryColor;
	}
	
	/**
	 * category axis
	 * <!-- [100] (0 - 100) -->
	 * @return
	 */
	public String getCategoryAlpha() {
		return categoryAlpha;
	}
	
	/**
	 * category axis
	 * <!-- [100] (0 - 100) -->
	 * @param categoryAlpha
	 */
	public void setCategoryAlpha(String categoryAlpha) {
		this.categoryAlpha = categoryAlpha;
	}
	
	/**
	 * category axis
	 * <!-- [2] (Number) line width, 0 for hairline -->
	 * @return
	 */
	public String getCategoryWidth() {
		return categoryWidth;
	}
	
	/**
	 * category axis
	 * <!-- [2] (Number) line width, 0 for hairline -->
	 * @param categoryWidth
	 */
	public void setCategoryWidth(String categoryWidth) {
		this.categoryWidth = categoryWidth;
	}
	
	/**
	 * category axis
	 * <!-- [7] (Number) -->
	 * @return
	 */
	public String getCategoryTick_length() {
		return categoryTick_length;
	}
	
	/**
	 * category axis
	 * <!-- [7] (Number) -->
	 * @param categoryTick_length
	 */
	public void setCategoryTick_length(String categoryTick_length) {
		this.categoryTick_length = categoryTick_length;
	}
	
	/**
	 * value axis 
	 * <!-- [#000000] (hex color code) -->
	 * @return
	 */
	public String getValueColor() {
		return valueColor;
	}
	
	/**
	 * value axis 
	 * <!-- [#000000] (hex color code) -->
	 * @param valueColor
	 */
	public void setValueColor(String valueColor) {
		this.valueColor = valueColor;
	}
	
	/**
	 * value axis 
	 * <!-- [100] (0 - 100) -->
	 * @return
	 */
	public String getValueAlpha() {
		return valueAlpha;
	}
	
	/**
	 * value axis 
	 * <!-- [100] (0 - 100) -->
	 * @param valueAlpha
	 */
	public void setValueAlpha(String valueAlpha) {
		this.valueAlpha = valueAlpha;
	}
	
	/**
	 * value axis 
	 * <!-- [2] (Number) line width, 0 for hairline -->
	 * @return
	 */
	public String getValueWidth() {
		return valueWidth;
	}
	
	/**
	 * value axis 
	 * <!-- [2] (Number) line width, 0 for hairline -->
	 * @param valueWidth
	 */
	public void setValueWidth(String valueWidth) {
		this.valueWidth = valueWidth;
	}
	
	/**
	 * value axis 
	 * <!-- [7] (Number) -->
	 * @return
	 */
	public String getValueTick_length() {
		return valueTick_length;
	}
	
	/**
	 * value axis 
	 * <!-- [7] (Number) -->
	 * @param valueTick_length
	 */
	public void setValueTick_length(String valueTick_length) {
		this.valueTick_length = valueTick_length;
	}
	
	/**
	 * value axis 
	 * <!-- [false] (true / false) If set to true, this axis will use logarithmic scale instead of linear -->
	 * @return
	 */
	public boolean isValueLogarithmic() {
		return valueLogarithmic;
	}
	
	/**
	 * value axis 
	 * <!-- [false] (true / false) If set to true, this axis will use logarithmic scale instead of linear -->
	 * @param valueLogarithmic
	 */
	public void setValueLogarithmic(boolean valueLogarithmic) {
		this.valueLogarithmic = valueLogarithmic;
	}

	

}
