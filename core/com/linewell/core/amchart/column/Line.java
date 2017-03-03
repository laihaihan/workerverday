package com.linewell.core.amchart.column;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jan 30, 2011 9:47:17 AM 
 * @version  v1.0
 * 类说明 :
 */
public class Line {
	public boolean connect=false;
	public String width="";
	public String alpha="";
	public String fill_alpha="";
	public String bullet="";
	public String bullet_size="";
	public String data_labels="";
	public String data_labels_text_color="";
	public String data_labels_text_size="";
	public String balloon_text="";
	public String link_target="";
	
	/**
	 * <!-- [false] (true / false) whether to connect points if data is missing -->
	 * @return
	 */
	public boolean isConnect() {
		return connect;
	}
	
	/**
	 * <!-- [false] (true / false) whether to connect points if data is missing -->
	 * @param connect
	 */
	public void setConnect(boolean connect) {
		this.connect = connect;
	}
	
	/**
	 * <!-- [2] (Number) line width -->
	 * @return
	 */
	public String getWidth() {
		return width;
	}
	
	/**
	 * <!-- [2] (Number) line width -->
	 * @param width
	 */
	public void setWidth(String width) {
		this.width = width;
	}
	
	/**
	 * <!-- [100] (Number) line alpha -->
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}
	
	/**
	 * <!-- [100] (Number) line alpha -->
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}
	
	/**
	 * <!-- [0] (Number) fill alpha -->
	 * @return
	 */
	public String getFill_alpha() {
		return fill_alpha;
	}
	
	/**
	 * <!-- [0] (Number) fill alpha -->
	 * @param fill_alpha
	 */
	public void setFill_alpha(String fill_alpha) {
		this.fill_alpha = fill_alpha;
	}
	
	/**
	 * <!-- [] (square, round, square_outlined, round_outlined, square_outline, round_outline, filename.swf) can be used predefined bullets or loaded custom bullets. Leave empty if you don't want to have bullets at all. Outlined bullets use plot area color for outline color -->
	 * @return
	 */
	public String getBullet() {
		return bullet;
	}
	
	/**
	 * <!-- [] (square, round, square_outlined, round_outlined, square_outline, round_outline, filename.swf) can be used predefined bullets or loaded custom bullets. Leave empty if you don't want to have bullets at all. Outlined bullets use plot area color for outline color -->
	 * @param bullet
	 */
	public void setBullet(String bullet) {
		this.bullet = bullet;
	}
	
	/**
	 * <!-- [8] (Number) bullet size -->
	 * @return
	 */
	public String getBullet_size() {
		return bullet_size;
	}
	
	/**
	 * <!-- [8] (Number) bullet size -->
	 * @param bullet_size
	 */
	public void setBullet_size(String bullet_size) {
		this.bullet_size = bullet_size;
	}
	
	/**
	 * <!-- [] ({title} {value} {series} {percents} {start} {difference} {total}) You can format any data label: {title} will be replaced with real title, {value} - with value and so on. You can add your own text or html code too. -->
	 * @return
	 */
	public String getData_labels() {
		return data_labels;
	}
	
	/**
	 * <!-- [] ({title} {value} {series} {percents} {start} {difference} {total}) You can format any data label: {title} will be replaced with real title, {value} - with value and so on. You can add your own text or html code too. -->
	 * @param data_labels
	 */
	public void setData_labels(String data_labels) {
		this.data_labels = data_labels;
	}
	
	/**
	 * <!-- [text_color] (hex color code) --> 
	 * @return
	 */
	public String getData_labels_text_color() {
		return data_labels_text_color;
	}
	
	/**
	 * <!-- [text_color] (hex color code) --> 
	 * @param data_labels_text_color
	 */
	public void setData_labels_text_color(String data_labels_text_color) {
		this.data_labels_text_color = data_labels_text_color;
	}
	
	/**
	 * <!-- [text_size] (Number) -->
	 * @return
	 */
	public String getData_labels_text_size() {
		return data_labels_text_size;
	}
	
	/**
	 * <!-- [text_size] (Number) -->
	 * @param data_labels_text_size
	 */
	public void setData_labels_text_size(String data_labels_text_size) {
		this.data_labels_text_size = data_labels_text_size;
	}
	
	/**
	 * <!-- [] use the same formatting rules as for data labels -->
	 * @return
	 */
	public String getBalloon_text() {
		return balloon_text;
	}
	
	/**
	 * <!-- [] use the same formatting rules as for data labels -->
	 * @param balloon_text
	 */
	public void setBalloon_text(String balloon_text) {
		this.balloon_text = balloon_text;
	}
	
	/**
	 * <!-- [] (_blank, _top ...) -->
	 * @return
	 */
	public String getLink_target() {
		return link_target;
	}
	
	/**
	 * <!-- [] (_blank, _top ...) -->
	 * @param link_target
	 */
	public void setLink_target(String link_target) {
		this.link_target = link_target;
	}
	
}
