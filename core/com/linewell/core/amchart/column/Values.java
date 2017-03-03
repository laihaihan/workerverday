package com.linewell.core.amchart.column;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Jan 30, 2011 10:51:55 AM
 * @version v1.0 类说明 :
 */
public class Values {
	public boolean categoryEnabled = true;
	public String categoryFrequency = "";
	public String categoryStart_from = "";
	public String categoryRotate = "";
	public String categoryColor = "";
	public String categoryText_size = "";
	public boolean categoryInside = false;
	public boolean valueEnabled = true;
	public boolean valueReverse = false;
	public String valueMin = "";
	public String valueMax = "";
	public boolean valueStrict_min_max = false;
	public String valueFrequency = "";
	public String valueRotate = "";
	public boolean valueSkip_first = true;
	public boolean valueSkip_last = false;
	public String valueColor = "";
	public String valueText_size = "";
	public String valueUnit = "";
	public String valueUnit_position = "";
	public boolean valueIntegers_only = false;
	public boolean valueInside = false;
	public String valueDuration = "";

	/**
	 * category axis 
	 * <!-- [true] (true / false) -->
	 * 
	 * @return
	 */
	public boolean isCategoryEnabled() {
		return categoryEnabled;
	}

	/**
	 * category axis 
	 * <!-- [true] (true / false) -->
	 * 
	 * @param categoryEnabled
	 */
	public void setCategoryEnabled(boolean categoryEnabled) {
		this.categoryEnabled = categoryEnabled;
	}

	/**
	 * category axis 
	 * <!-- [1] (Number) how often values should be placed -->
	 * 
	 * @return
	 */
	public String getCategoryFrequency() {
		return categoryFrequency;
	}

	/**
	 * category axis 
	 * <!-- [1] (Number) how often values should be placed -->
	 * 
	 * @param categoryFrequency
	 */
	public void setCategoryFrequency(String categoryFrequency) {
		this.categoryFrequency = categoryFrequency;
	}

	/**
	 * category axis
	 *  <!-- [1] (Number) you can set series from which category
	 * values will be displayed -->
	 * 
	 * @return
	 */
	public String getCategoryStart_from() {
		return categoryStart_from;
	}

	/**
	 * category axis 
	 * <!-- [1] (Number) you can set series from which category
	 * values will be displayed -->
	 * 
	 * @param categoryStart_from
	 */
	public void setCategoryStart_from(String categoryStart_from) {
		this.categoryStart_from = categoryStart_from;
	}

	/**
	 * category axis 
	 * <!-- [0] (0 - 90) angle of rotation. If you want to rotate
	 * by degree from 1 to 89, you must have font.swf file in fonts folder -->
	 * 
	 * @return
	 */
	public String getCategoryRotate() {
		return categoryRotate;
	}

	/**
	 * category axis
	 *  <!-- [0] (0 - 90) angle of rotation. If you want to rotate
	 * by degree from 1 to 89, you must have font.swf file in fonts folder -->
	 * 
	 * @param categoryRotate
	 */
	public void setCategoryRotate(String categoryRotate) {
		this.categoryRotate = categoryRotate;
	}

	/**
	 * category axis
	 *  <!-- [text_color] (hex color code) -->
	 * 
	 * @return
	 */
	public String getCategoryColor() {
		return categoryColor;
	}

	/**
	 * category axis 
	 * <!-- [text_color] (hex color code) -->
	 * 
	 * @param categoryColor
	 */
	public void setCategoryColor(String categoryColor) {
		this.categoryColor = categoryColor;
	}

	/**
	 * category axis 
	 * <!-- [text_size] (Number) -->
	 * 
	 * @return
	 */
	public String getCategoryText_size() {
		return categoryText_size;
	}

	/**
	 * category axis 
	 * <!-- [text_size] (Number) -->
	 * 
	 * @param categoryText_size
	 */
	public void setCategoryText_size(String categoryText_size) {
		this.categoryText_size = categoryText_size;
	}

	/**
	 * category axis 
	 * <!-- [false] (true / false) if set to true, axis values
	 * will be displayed inside plot area. This setting will not work for values
	 * rotated by 1-89 degrees (0 and 90 only) -->
	 * 
	 * @return
	 */
	public boolean isCategoryInside() {
		return categoryInside;
	}

	/**
	 * category axis 
	 * <!-- [false] (true / false) if set to true, axis values
	 * will be displayed inside plot area. This setting will not work for values
	 * rotated by 1-89 degrees (0 and 90 only) -->
	 * 
	 * @param categoryInside
	 */
	public void setCategoryInside(boolean categoryInside) {
		this.categoryInside = categoryInside;
	}

	/**
	 * value axis 
	 * <!-- [true] (true / false) -->
	 * 
	 * @return
	 */
	public boolean isValueEnabled() {
		return valueEnabled;
	}

	/**
	 * value axis 
	 * <!-- [true] (true / false) -->
	 * 
	 * @param valueEnabled
	 */
	public void setValueEnabled(boolean valueEnabled) {
		this.valueEnabled = valueEnabled;
	}

	/**
	 * value axis 
	 * <!-- [false] (true / false) whether to reverse this axis
	 * values or not. If set to true, values will start from biggest number and
	 * will end with a smallest number -->
	 * 
	 * @return
	 */
	public boolean isValueReverse() {
		return valueReverse;
	}

	/**
	 * value axis 
	 * <!-- [false] (true / false) whether to reverse this axis
	 * values or not. If set to true, values will start from biggest number and
	 * will end with a smallest number -->
	 * 
	 * @param valueReverse
	 */
	public void setValueReverse(boolean valueReverse) {
		this.valueReverse = valueReverse;
	}

	/**
	 * value axis 
	 * <!-- [] (Number) minimum value of this axis. If empty, this
	 * value will be calculated automatically. -->
	 * 
	 * @return
	 */
	public String getValueMin() {
		return valueMin;
	}

	/**
	 * value axis 
	 * <!-- [] (Number) minimum value of this axis. If empty, this
	 * value will be calculated automatically. -->
	 * 
	 * @param valueMin
	 */
	public void setValueMin(String valueMin) {
		this.valueMin = valueMin;
	}

	/**
	 * value axis 
	 * <!-- [] (Number) maximum value of this axis. If empty, this
	 * value will be calculated automatically -->
	 * 
	 * @return
	 */
	public String getValueMax() {
		return valueMax;
	}

	/**
	 * value axis 
	 * <!-- [] (Number) maximum value of this axis. If empty, this
	 * value will be calculated automatically -->
	 * 
	 * @param valueMax
	 */
	public void setValueMax(String valueMax) {
		this.valueMax = valueMax;
	}

	/**
	 * value axis 
	 * <!-- [false] (true / false) by default, if your values are
	 * bigger then defined max (or smaller then defined min), max and min is
	 * changed so that all the chart would fit to chart area. If you don't want
	 * this, set this option to true. -->
	 * 
	 * @return
	 */
	public boolean isValueStrict_min_max() {
		return valueStrict_min_max;
	}

	/**
	 * value axis 
	 * <!-- [false] (true / false) by default, if your values are
	 * bigger then defined max (or smaller then defined min), max and min is
	 * changed so that all the chart would fit to chart area. If you don't want
	 * this, set this option to true. -->
	 * 
	 * @param valueStrict_min_max
	 */
	public void setValueStrict_min_max(boolean valueStrict_min_max) {
		this.valueStrict_min_max = valueStrict_min_max;
	}

	/**
	 * value axis 
	 * <!-- [1] (Number) how often values should be placed, 1 - near
	 * every gridline, 2 - near every second gridline... -->
	 * 
	 * @return
	 */
	public String getValueFrequency() {
		return valueFrequency;
	}

	/**
	 * value axis 
	 * <!-- [1] (Number) how often values should be placed, 1 - near
	 * every gridline, 2 - near every second gridline... -->
	 * 
	 * @param valueFrequency
	 */
	public void setValueFrequency(String valueFrequency) {
		this.valueFrequency = valueFrequency;
	}

	/**
	 * value axis
	 * <!-- [0] (0 - 90) angle of rotation. If you want to rotate by degree from 1 to 89,
	 *  you must have font.swf file in fonts folder -->
	 * @return
	 */
	public String getValueRotate() {
		return valueRotate;
	}

	/**
	 * value axis
	 * <!-- [0] (0 - 90) angle of rotation. If you want to rotate by degree from 1 to 89, 
	 * you must have font.swf file in fonts folder -->
	 * @param valueRotate
	 */
	public void setValueRotate(String valueRotate) {
		this.valueRotate = valueRotate;
	}

	/**
	 * value axis
	 * <!-- [true] (true / false) to skip or not first value -->
	 * @return
	 */
	public boolean isValueSkip_first() {
		return valueSkip_first;
	}

	/**
	 * value axis
	 * <!-- [true] (true / false) to skip or not first value -->
	 * @param valueSkip_first
	 */
	public void setValueSkip_first(boolean valueSkip_first) {
		this.valueSkip_first = valueSkip_first;
	}

	/**
	 * value axis
	 * <!-- [false] (true / false) to skip or not last value -->
	 * @return
	 */
	public boolean isValueSkip_last() {
		return valueSkip_last;
	}

	/**
	 * value axis
	 * <!-- [false] (true / false) to skip or not last value -->
	 * @param valueSkip_last
	 */
	public void setValueSkip_last(boolean valueSkip_last) {
		this.valueSkip_last = valueSkip_last;
	}

	/**
	 * value axis
	 * <!-- [text_color] (hex color code) -->
	 * @return
	 */
	public String getValueColor() {
		return valueColor;
	}

	/**
	 * value axis
	 * <!-- [text_color] (hex color code) -->
	 * @param valueColor
	 */
	public void setValueColor(String valueColor) {
		this.valueColor = valueColor;
	}

	/**
	 * value axis
	 * <!-- [text_size] (Number) -->
	 * @return
	 */
	public String getValueText_size() {
		return valueText_size;
	}

	/**
	 * value axis
	 * <!-- [text_size] (Number) -->
	 * @param valueText_size
	 */
	public void setValueText_size(String valueText_size) {
		this.valueText_size = valueText_size;
	}

	/**
	 * value axis
	 * <!-- [] (text) -->
	 * @return
	 */
	public String getValueUnit() {
		return valueUnit;
	}

	/**
	 * value axis
	 * <!-- [] (text) -->
	 * @param valueUnit
	 */
	public void setValueUnit(String valueUnit) {
		this.valueUnit = valueUnit;
	}

	/**
	 * value axis
	 * <!-- [right] (right / left) -->
	 * @return
	 */
	public String getValueUnit_position() {
		return valueUnit_position;
	}

	/**
	 * value axis
	 * <!-- [right] (right / left) -->
	 * @param valueUnit_position
	 */
	public void setValueUnit_position(String valueUnit_position) {
		this.valueUnit_position = valueUnit_position;
	}

	/**
	 * value axis
	 * <!-- [false] (true / false) if set to true, values with decimals will be omitted -->
	 * @return
	 */
	public boolean isValueIntegers_only() {
		return valueIntegers_only;
	}

	/**
	 * value axis
	 * <!-- [false] (true / false) if set to true, values with decimals will be omitted -->
	 * @param valueIntegers_only
	 */
	public void setValueIntegers_only(boolean valueIntegers_only) {
		this.valueIntegers_only = valueIntegers_only;
	}

	/**
	 * value axis
	 * <!-- [false] (true / false) if set to true, axis values will be displayed inside plot area. 
	 * This setting will not work for values rotated by 1-89 degrees (0 and 90 only) -->
	 * @return
	 */
	public boolean isValueInside() {
		return valueInside;
	}

	/**
	 * value axis
	 * <!-- [false] (true / false) if set to true, axis values will be displayed inside plot area. 
	 * This setting will not work for values rotated by 1-89 degrees (0 and 90 only) -->
	 * @param valueInside
	 */
	public void setValueInside(boolean valueInside) {
		this.valueInside = valueInside;
	}

	/**
	 * value axis
	 * <!-- [] (ss/mm/hh/DD) In case you want your axis to display formatted durations instead of numbers,
	 *  you have to set the unit of the duration in your data file. For example,
	 *  if your values in data file represents seconds, set "ss" here.-->
	 * @return
	 */
	public String getValueDuration() {
		return valueDuration;
	}

	/**
	 * value axis
	 * <!-- [] (ss/mm/hh/DD) In case you want your axis to display formatted durations instead of numbers,
	 *  you have to set the unit of the duration in your data file. For example,
	 *  if your values in data file represents seconds, set "ss" here.-->
	 * @param valueDuration
	 */
	public void setValueDuration(String valueDuration) {
		this.valueDuration = valueDuration;
	}

}
