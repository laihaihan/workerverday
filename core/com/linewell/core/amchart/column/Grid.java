package com.linewell.core.amchart.column;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jan 30, 2011 10:51:42 AM 
 * @version  v1.0
 * 类说明 :
 */
public class Grid {
	
	public String categoryColor="";
	public String categoryAlpha="";
	public boolean categoryDashed=false;
	public String categoryDash_length="";
	public String valueColor="";
	public String valueAlpha="";
	public boolean valueDashed=false;
	public String valueDash_length="";
	public  String valueApprox_count="";
	public  String valueFill_color="";
	public  String valueFill_alpha="";
	
	/**
	 * category axis grid
	 * <!-- [#000000] (hex color code) -->
	 * @return
	 */
	public String getCategoryColor() {
		return categoryColor;
	}
	
	/**
	 * category axis grid
	 * <!-- [#000000] (hex color code) -->
	 * @param categoryColor
	 */
	public void setCategoryColor(String categoryColor) {
		this.categoryColor = categoryColor;
	}
	
	/**
	 * category axis grid
	 * <!-- [15] (0 - 100) -->
	 * @return
	 */
	public String getCategoryAlpha() {
		return categoryAlpha;
	}
	
	/**
	 * category axis grid
	 * <!-- [15] (0 - 100) -->
	 * @param categoryAlpha
	 */
	public void setCategoryAlpha(String categoryAlpha) {
		this.categoryAlpha = categoryAlpha;
	}
	
	/**
	 * category axis grid
	 * <!-- [false](true / false) -->
	 * @return
	 */
	public boolean isCategoryDashed() {
		return categoryDashed;
	}
	
	/**
	 * category axis grid
	 * <!-- [false](true / false) -->
	 * @param categoryDashed
	 */
	public void setCategoryDashed(boolean categoryDashed) {
		this.categoryDashed = categoryDashed;
	}
	
	/**
	 * category axis grid
	 * <!-- [5] (Number) -->
	 * @return
	 */
	public String getCategoryDash_length() {
		return categoryDash_length;
	}
	
	/**
	 * category axis grid
	 * <!-- [5] (Number) -->
	 * @param categoryDash_length
	 */
	public void setCategoryDash_length(String categoryDash_length) {
		this.categoryDash_length = categoryDash_length;
	}
	
	/**
	 * value axis grid
	 * <!-- [#000000] (hex color code) -->
	 * @return
	 */
	public String getValueColor() {
		return valueColor;
	}
	
	/**
	 * value axis grid
	 * <!-- [#000000] (hex color code) -->
	 * @param valueColor
	 */
	public void setValueColor(String valueColor) {
		this.valueColor = valueColor;
	}
	
	/**
	 * value axis grid
	 * <!-- [15] (0 - 100) -->
	 * @return
	 */
	public String getValueAlpha() {
		return valueAlpha;
	}
	
	/**
	 * value axis grid
	 * <!-- [15] (0 - 100) -->
	 * @param valueAlpha
	 */
	public void setValueAlpha(String valueAlpha) {
		this.valueAlpha = valueAlpha;
	}
	
	/**
	 * value axis grid
	 * <!-- [false] (true / false) -->
	 * @return
	 */
	public boolean isValueDashed() {
		return valueDashed;
	}
	
	/**
	 * value axis grid
	 * <!-- [false] (true / false) -->
	 * @param valueDashed
	 */
	public void setValueDashed(boolean valueDashed) {
		this.valueDashed = valueDashed;
	}
	
	/**
	 * value axis grid
	 * <!-- [5] (Number) -->
	 * @return
	 */
	public String getValueDash_length() {
		return valueDash_length;
	}
	
	/**
	 * value axis grid
	 * <!-- [5] (Number) -->
	 * @param valueDash_length
	 */
	public void setValueDash_length(String valueDash_length) {
		this.valueDash_length = valueDash_length;
	}
	
	/**
	 * value axis grid
	 * <!-- [10] (Number) approximate number of gridlines -->
	 * @return
	 */
	public String getValueApprox_count() {
		return valueApprox_count;
	}
	
	/**
	 * value axis grid
	 * <!-- [10] (Number) approximate number of gridlines -->
	 * @param valueApprox_count
	 */
	public void setValueApprox_count(String valueApprox_count) {
		this.valueApprox_count = valueApprox_count;
	}
	
	/**
	 * value axis grid
	 * <!-- [#FFFFFF] (hex color code) every second area between gridlines will be filled with this color 
	 * (you will need to set fill_alpha > 0) -->
	 * @return
	 */
	public String getValueFill_color() {
		return valueFill_color;
	}
	
	/**
	 *  value axis grid
	 * <!-- [#FFFFFF] (hex color code) every second area between gridlines will be filled with this color 
	 * (you will need to set fill_alpha > 0) -->
	 * 
	 * @param valueFill_color
	 */
	public void setValueFill_color(String valueFill_color) {
		this.valueFill_color = valueFill_color;
	}
	
	/**
	 * value axis grid
	 * <!-- [0] (0 - 100) opacity of fill -->
	 * @return
	 */
	public String getValueFill_alpha() {
		return valueFill_alpha;
	}
	
	/**
	 * value axis grid
	 * <!-- [0] (0 - 100) opacity of fill -->
	 * @param valueFill_alpha
	 */
	public void setValueFill_alpha(String valueFill_alpha) {
		this.valueFill_alpha = valueFill_alpha;
	}
}
