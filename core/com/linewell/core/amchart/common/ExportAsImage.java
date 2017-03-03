package com.linewell.core.amchart.common;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Feb 15, 2010 10:40:05 PM 
 * @version  v1.0
 * 类说明 :导入图片,export_as_image feature works only on a web server
 */
public class ExportAsImage {
	
	public String file="";
	public String target="";
	public String x="0";
	public String y="";
	public String color="#BBBB00";
	public String alpha="";
	public String text_color="";
	public String text_size="";
	
	/**
	 * (filename) if you set filename here, 
	 * context menu (then user right clicks on flash movie) 
	 * "Export as image" will appear. 
	 * This will allow user to export chart as an image. 
	 * Collected image data will be posted to this file name 
	 * (use amcolumn/export.php or amcolumn/export.aspx)
	 * @return
	 */
	public String getFile() {
		return file;
	}
	
	/**
	 * (filename) if you set filename here, 
	 * context menu (then user right clicks on flash movie) 
	 * "Export as image" will appear. 
	 * This will allow user to export chart as an image. 
	 * Collected image data will be posted to this file name 
	 * (use amcolumn/export.php or amcolumn/export.aspx)
	 * @param file
	 */
	public void setFile(String file) {
		this.file = file;
	}
	
	/**
	 * (_blank, _top ...) 
	 * target of a window in which export file must be called 
	 * @return
	 */
	public String getTarget() {
		return target;
	}
	
	/**
	 * (_blank, _top ...) 
	 * target of a window in which export file must be called 
	 * @param target
	 */
	public void setTarget(String target) {
		this.target = target;
	}

	/**
	 * [0] (Number / Number% / !Number) 
	 * x position of "Collecting data" text
	 * @return
	 */
	public String getX() {
		return x;
	}
	
	/**
	 * [0] (Number / Number% / !Number) 
	 * x position of "Collecting data" text
	 * @param x
	 */
	public void setX(String x) {
		this.x = x;
	}
	
	/**
	 * [] (Number / Number% / !Number) 
	 * y position of "Collecting data" text.
	 * @return
	 */
	public String getY() {
		return y;
	}
	
	/**
	 * [] (Number / Number% / !Number) 
	 * y position of "Collecting data" text.
	 * @param y
	 */
	public void setY(String y) {
		this.y = y;
	}
	
	/**
	 * [#BBBB00] (hex color code) 
	 * background color of "Collecting data" text
	 * @return
	 */
	public String getColor() {
		return color;
	}
	
	/**
	 * [#BBBB00] (hex color code) 
	 * background color of "Collecting data" text 
	 * @param color
	 */
	public void setColor(String color) {
		this.color = color;
	}
	
	/**
	 * [0] (0 - 100) background alpha
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}
	
	/**
	 * [0] (0 - 100) background alpha
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}
	
	/**
	 * [text_color] (hex color code)
	 * @return
	 */
	public String getText_color() {
		return text_color;
	}
	
	/**
	 * [text_color] (hex color code)
	 * @param text_color
	 */
	public void setText_color(String text_color) {
		this.text_color = text_color;
	}
	
	/**
	 * [text_size] (Number)
	 * @return
	 */
	public String getText_size() {
		return text_size;
	}
	
	/**
	 * [text_size] (Number)
	 * @param text_size
	 */
	public void setText_size(String text_size) {
		this.text_size = text_size;
	}
	
}
