package com.linewell.core.amchart.common;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jan 29, 2011 9:06:10 AM 
 * @version  v1.0
 * 类说明 :目前主要用于柱、线三种图形
 */
public class Guides {
	 
	 public boolean max_min=false;
	 public boolean behind=false;
	 public String start_value="";
	 public String end_value="";
	 public String title="";
	 public String width="";
	 public String color="";
	 public String alpha="";
	 public String fill_color="";
	 public String fill_alpha="";
	 public String inside="";
	 public boolean centered=true;
	 public String rotate="";
	 public String text_size="";
	 public String text_color="";
	 public boolean dashed=false;
	 public String dash_length="";
	 public String axis="";
	 
	 public String getAxis() {
		return axis;
	}

	public void setAxis(String axis) {
		this.axis = axis;
	}

	/**
	  * <!-- [false] (true / false) whether to include guides' values when calculating min and max of a chart -->
	  * @return
	  */
	public boolean isMax_min() {
		return max_min;
	}
	
	/**
	 * <!-- [false] (true / false) whether to include guides' values when calculating min and max of a chart -->
	 * @param max_min
	 */
	public void setMax_min(boolean max_min) {
		this.max_min = max_min;
	}
	
	/**
	 * <!-- [false] (true / false) whether your guides should appear in front of columns or behind them -->
	 * @return
	 */
	public boolean isBehind() {
		return behind;
	}
	
	/**
	 * <!-- [false] (true / false) whether your guides should appear in front of columns or behind them -->
	 * @param behind
	 */
	public void setBehind(boolean behind) {
		this.behind = behind;
	}
	
	/**
	 * <!-- (number) value at which guide should be placed -->
	 * @return
	 */
	public String getStart_value() {
		return start_value;
	}
	
	/**
	 * <!-- (number) value at which guide should be placed -->
	 * @param start_value
	 */
	public void setStart_value(String start_value) {
		this.start_value = start_value;
	}
	
	/**
	 * <!-- (number) if you set value here too, another quide will be drawn. If you set fill alpha > 0, then the area between these quides will be filled with color -->
	 */
	public String getEnd_value() {
		return end_value;
	}
	
	/**
	 * <!-- (number) if you set value here too, another quide will be drawn. If you set fill alpha > 0, then the area between these quides will be filled with color -->
	 * @param end_value
	 */
	public void setEnd_value(String end_value) {
		this.end_value = end_value;
	}
	
	/**
	 * <!-- (string) text which will be displayed near the guide -->
	 * @return
	 */
	public String getTitle() {
		return title;
	}
	
	/**
	 * <!-- (string) text which will be displayed near the guide -->
	 * @param title
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	
	/**
	 * <!-- [0] (Number) width of a guide line (0 for hairline) -->
	 * @return
	 */
	public String getWidth() {
		return width;
	}
	
	/**
	 * <!-- [0] (Number) width of a guide line (0 for hairline) -->
	 * @param width
	 */
	public void setWidth(String width) {
		this.width = width;
	}
	/**
	 * <!-- [#000000] (hex color code) color of guide line -->   
	 * @return
	 */
	public String getColor() {
		return color;
	}
	
	/**
	 * <!-- [#000000] (hex color code) color of guide line -->   
	 * @param color
	 */
	public void setColor(String color) {
		this.color = color;
	}
	
	/**
	 * <!-- [100] (0 - 100) opacity of guide line -->
	 */
	public String getAlpha() {
		return alpha;
	}
	
	/**
	 * <!-- [100] (0 - 100) opacity of guide line -->
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}
	
	/**
	 * <!-- [guide.color] (hex color code) fill color. If not defined, color of a guide will be used. Separate color codes with comas for gradient -->
	 * @return
	 */
	public String getFill_color() {
		return fill_color;
	}
	
	/**
	 * <!-- [guide.color] (hex color code) fill color. If not defined, color of a guide will be used. Separate color codes with comas for gradient -->
	 * @param fill_color
	 */
	public void setFill_color(String fill_color) {
		this.fill_color = fill_color;
	}
	
	/**
	 * <!-- [0] (0 - 100) opacity of a fill -->
	 * @return
	 */
	public String getFill_alpha() {
		return fill_alpha;
	}
	
	/**
	 * <!-- [0] (0 - 100) opacity of a fill -->
	 * @param fill_alpha
	 */
	public void setFill_alpha(String fill_alpha) {
		this.fill_alpha = fill_alpha;
	}
	
	/**
	 * <!-- [values.value.inside] whether to place title inside plot area -->
	 * @return
	 */
	public String getInside() {
		return inside;
	}
	
	/**
	 * <!-- [values.value.inside] whether to place title inside plot area -->
	 * @param inside
	 */
	public void setInside(String inside) {
		this.inside = inside;
	}
 
	/**
	 * <!-- [true] (true / false) if you have start and end values defined, title can be placed in the middle between these values. If false, it will be placed near start_value -->
	 */
	public boolean isCentered() {
		return centered;
	}
	
	/**
	 * <!-- [true] (true / false) if you have start and end values defined, title can be placed in the middle between these values. If false, it will be placed near start_value -->
	 * @param centered
	 */
	public void setCentered(boolean centered) {
		this.centered = centered;
	}
	
	/**
	 * <!-- [values.value.rotate] (0 - 90) angle of rotation of title. -->
	 * @return
	 */
	public String getRotate() {
		return rotate;
	}
	
	/**
	 * <!-- [values.value.rotate] (0 - 90) angle of rotation of title. -->
	 * @param rotate
	 */
	public void setRotate(String rotate) {
		this.rotate = rotate;
	}
	
	/**
	 * <!-- [values.value.text_size] (Number)  -->
	 * @return
	 */
	public String getText_size() {
		return text_size;
	}

	/**
	 * <!-- [values.value.text_size] (Number)  -->
	 * @param text_size
	 */
	public void setText_size(String text_size) {
		this.text_size = text_size;
	}
   
	/**
	 * <!-- [values.value.color] (hex color code) -->
	 */
	public String getText_color() {
		return text_color;
	}
	
	/**
	 * <!-- [values.value.color] (hex color code) -->
	 * @param text_color
	 */
	public void setText_color(String text_color) {
		this.text_color = text_color;
	}
	
	/**
	 * <!-- [false] (true / false) -->
	 * @return
	 */
	public boolean isDashed() {
		return dashed;
	}
	
	/**
	 * <!-- [false] (true / false) -->
	 * @param dashed
	 */
	public void setDashed(boolean dashed) {
		this.dashed = dashed;
	}
	
	/**
	 * <!-- [5] (Number) -->   
	 * @return
	 */
	public String getDash_length() {
		return dash_length;
	}
	
	/**
	 * <!-- [5] (Number) -->   
	 * @param dash_length
	 */
	public void setDash_length(String dash_length) {
		this.dash_length = dash_length;
	}

	
	 

}
