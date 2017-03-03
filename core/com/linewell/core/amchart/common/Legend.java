package com.linewell.core.amchart.common;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Feb 15, 2010 10:37:36 PM
 * @version v1.0 类说明 :设置图表下的说明 LEGEND
 * 目前主要用于饼、柱、线三种图形
 */
public class Legend {
	public boolean enabled = true;
	public String x = "5%";
	public String y = "";
	public String width = "90%";
	public String color = "#FFFFFF";
	public String max_columns = "";
	public String alpha = "0";
	public String border_color = "#000000";
	public String border_alpha = "0";
	public String text_color = "";
	public String text_color_hover = "";
	public String text_size = "12";
	public String spacing = "0";
	public String margins = "0";
	public boolean graph_on_off = true;
	public boolean reverse_order = false;
	public String align = "left";
	public String key_size = "16";
	public String key_border_color = "";
	public String key_mark_color = "";
	public boolean values_enabled = false;
	public String values_width = "";
	public String values_align = "";
	public String values_text = "{percents}% {value} {percents}";

	/**
	 * 是否显示说明 [true] (true / false)
	 * 
	 * @return
	 */
	public boolean isEnabled() {
		return enabled;
	}

	/**
	 * 是否显示说明 [true] (true / false)
	 * 
	 * @param enabled
	 */
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	/**
	 * 说明距离X轴的位置 [5%] (Number / Number% / !Number)
	 * 
	 * @return
	 */
	public String getX() {
		return x;
	}

	/**
	 * 说明距离X轴的位置 [5%] (Number / Number% / !Number)
	 * 
	 * @param x
	 */
	public void setX(String x) {
		this.x = x;
	}

	/**
	 * 说明距离Y轴的位置 [] (Number / Number% / !Number)
	 * 
	 * @return
	 */
	public String getY() {
		return y;
	}

	/**
	 * 说明距离Y轴的位置 [] (Number / Number% / !Number)
	 * 
	 * @param y
	 */
	public void setY(String y) {
		this.y = y;
	}

	/**
	 * 说明的宽度[90%] (Number / Number%)
	 * 
	 * @return
	 */
	public String getWidth() {
		return width;
	}

	/**
	 * 说明的宽度[90%] (Number / Number%)
	 * 
	 * @param width
	 */
	public void setWidth(String width) {
		this.width = width;
	}

	/**
	 * 说明的背景色 #FFFFFF
	 * 
	 * @return
	 */
	public String getColor() {
		return color;
	}

	/**
	 * 说明的背景色 #FFFFFF
	 * 
	 * @param color
	 */
	public void setColor(String color) {
		this.color = color;
	}

	/**
	 * 说明的列数
	 * 
	 * @return
	 */
	public String getMax_columns() {
		return max_columns;
	}

	/**
	 * 说明的列数
	 * 
	 * @param max_columns
	 */
	public void setMax_columns(String max_columns) {
		this.max_columns = max_columns;
	}

	/**
	 * 说明背景色的透明度 [0] (0 - 100)
	 * 
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}

	/**
	 * 说明背景色的透明度 [0] (0 - 100)
	 * 
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}

	/**
	 * 说明边框的颜色
	 * 
	 * @return
	 */
	public String getBorder_color() {
		return border_color;
	}

	/**
	 * 说明边框的颜色
	 * 
	 * @param border_color
	 */
	public void setBorder_color(String border_color) {
		this.border_color = border_color;
	}

	/**
	 * 说明边框的透明度
	 * 
	 * @return
	 */
	public String getBorder_alpha() {
		return border_alpha;
	}

	/**
	 * 说明边框的透明度
	 * 
	 * @param border_alpha
	 */
	public void setBorder_alpha(String border_alpha) {
		this.border_alpha = border_alpha;
	}

	/**
	 * 说明文本的颜色
	 * 
	 * @return
	 */
	public String getText_color() {
		return text_color;
	}

	/**
	 * 说明文本的颜色
	 * 
	 * @param text_color
	 */
	public void setText_color(String text_color) {
		this.text_color = text_color;
	}

	/**
	 * 说明的文本字体大小
	 * 
	 * @return
	 */
	public String getText_size() {
		return text_size;
	}

	/**
	 * 说明的文本字体大小
	 * 
	 * @param text_size
	 */
	public void setText_size(String text_size) {
		this.text_size = text_size;
	}

	/**
	 * 每列间隔 [10] (Number)
	 * 
	 * @return
	 */
	public String getSpacing() {
		return spacing;
	}

	/**
	 * 每列间隔 [10] (Number)
	 * 
	 * @param spacing
	 */
	public void setSpacing(String spacing) {
		this.spacing = spacing;
	}

	/**
	 * 说明每行的间距 [0] (Number)
	 * 
	 * @return
	 */
	public String getMargins() {
		return margins;
	}

	/**
	 * 说明每行的间距 [0] (Number)
	 * 
	 * @param margins
	 */
	public void setMargins(String margins) {
		this.margins = margins;
	}

	/**
	 * [false] (true / false)
	 * 
	 * @return
	 */
	public boolean isReverse_order() {
		return reverse_order;
	}

	/**
	 * [false] (true / false)
	 * 
	 * @param reverse_order
	 */
	public void setReverse_order(boolean reverse_order) {
		this.reverse_order = reverse_order;
	}

	/**
	 * 说明文本对齐 [left] (left / center / right)
	 * 
	 * @return
	 */
	public String getAlign() {
		return align;
	}

	/**
	 * 说明文本对齐 [left] (left / center / right)
	 * 
	 * @param align
	 */
	public void setAlign(String align) {
		this.align = align;
	}

	/**
	 * 说明键的大小
	 * 
	 * @return
	 */
	public String getKey_size() {
		return key_size;
	}

	/**
	 * 说明键的大小
	 * 
	 * @param key_size
	 */
	public void setKey_size(String key_size) {
		this.key_size = key_size;
	}

	/**
	 * 说明键的边框颜色
	 * 
	 * @return
	 */
	public String getKey_border_color() {
		return key_border_color;
	}

	/**
	 * 说明键的边框颜色
	 * 
	 * @param key_border_color
	 */
	public void setKey_border_color(String key_border_color) {
		this.key_border_color = key_border_color;
	}

	/**
	 * 说明值是否显示 [false] (true / false)
	 * 
	 * @return
	 */
	public boolean isValues_enabled() {
		return values_enabled;
	}

	/**
	 * 说明值是否显示 [false] (true / false)
	 * 
	 * @param values_enabled
	 */
	public void setValues_enabled(boolean values_enabled) {
		this.values_enabled = values_enabled;
	}

	/**
	 * 说明值宽度
	 * 
	 * @return
	 */
	public String getValues_width() {
		return values_width;
	}

	/**
	 * 说明值宽度
	 * 
	 * @param values_width
	 */
	public void setValues_width(String values_width) {
		this.values_width = values_width;
	}

	/**
	 * 说明值的文本内容 {percents}% {value} {percents}
	 * 
	 * @return
	 */
	public String getValues_text() {
		return values_text;
	}

	/**
	 * 说明值的文本内容 {percents}% {value} {percents}
	 * 
	 * @param values_text
	 */
	public void setValues_text(String values_text) {
		this.values_text = values_text;
	}

	/**
	 * <!-- [true] (true / false) if true, color box gains "checkbox" function -
	 * it is possible to make graphs visible/invisible by clicking on this
	 * checkbox -->
	 * 
	 * @return
	 */
	public boolean isGraph_on_off() {
		return graph_on_off;
	}

	/**
	 * <!-- [true] (true / false) if true, color box gains "checkbox" function -
	 * it is possible to make graphs visible/invisible by clicking on this
	 * checkbox -->
	 * 
	 * @param graph_on_off
	 */
	public void setGraph_on_off(boolean graph_on_off) {
		this.graph_on_off = graph_on_off;
	}

	
	/**
	 * <!-- [#FFFFFF] (hex color code) key tick mark color -->
	 * @return
	 */
	public String getKey_mark_color() {
		return key_mark_color;
	}

	
	/**
	 * <!-- [#FFFFFF] (hex color code) key tick mark color -->
	 * @param key_mark_color
	 */
	public void setKey_mark_color(String key_mark_color) {
		this.key_mark_color = key_mark_color;
	}

	
	/**
	 *  <!-- [right] (right / left) -->
	 * @return
	 */
	public String getValues_align() {
		return values_align;
	}

	
	/**
	 *  <!-- [right] (right / left) -->
	 * @param values_align
	 */
	public void setValues_align(String values_align) {
		this.values_align = values_align;
	}

	public String getText_color_hover() {
		return text_color_hover;
	}

	public void setText_color_hover(String text_color_hover) {
		this.text_color_hover = text_color_hover;
	}

}
