package com.linewell.core.amchart.line;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jan 30, 2011 11:48:26 AM 
 * @version  v1.0
 * 类说明 :
 */
public class Help { 
	public String buttonX="";
	public String buttonY="";
	public String buttonColor="";
	public String buttonAlpha="";
	public String buttonText_color="";
	public String buttonText_color_hover="";
	public String buttonText_size="";
	public String buttonText="";
	public String balloonColor="";
	public String balloonAlpha="";
	public String balloonText_color="";
	public String balloonText_color_hover="";
	public String balloonText_size="";
	public String balloonText="";
	public String balloonWidth = "";
	
	public String getBalloonWidth() {
		return balloonWidth;
	}

	public void setBalloonWidth(String balloonWidth) {
		this.balloonWidth = balloonWidth;
	}

	/**
	 * <!-- [] (Number / Number% / !Number) x position of help button, 
	 * if not defined, will be aligned to right of chart area -->
	 * @return
	 */
	public String getButtonX() {
		return buttonX;
	}
	
	/**
	 * <!-- [] (Number / Number% / !Number) x position of help button, 
	 * if not defined, will be aligned to right of chart area -->
	 * @param buttonX
	 */
	public void setButtonX(String buttonX) {
		this.buttonX = buttonX;
	}
	
	/**
	 * <!-- [] (Number / Number% / !Number) y position of help button,
	 *  if not defined, will be aligned to top of chart area -->
	 * @return
	 */
	public String getButtonY() {
		return buttonY;
	}
	
	/**
	 * <!-- [] (Number / Number% / !Number) y position of help button,
	 *  if not defined, will be aligned to top of chart area -->
	 * @param buttonY
	 */
	public void setButtonY(String buttonY) {
		this.buttonY = buttonY;
	}
	
	/**
	 * <!-- [#000000] (hex color code) background color -->
	 * @return
	 */
	public String getButtonColor() {
		return buttonColor;
	}
	
	/**
	 * <!-- [#000000] (hex color code) background color -->
	 * @param buttonColor
	 */
	public void setButtonColor(String buttonColor) {
		this.buttonColor = buttonColor;
	}
	
	/**
	 * <!-- [100] (0 - 100) background alpha -->
	 * @return
	 */
	public String getButtonAlpha() {
		return buttonAlpha;
	}
	
	/**
	 * <!-- [100] (0 - 100) background alpha -->
	 * @param buttonAlpha
	 */
	public void setButtonAlpha(String buttonAlpha) {
		this.buttonAlpha = buttonAlpha;
	}
	
	/**
	 * <!-- [#FFFFFF] (hex color code) button text color -->
	 * @return
	 */
	public String getButtonText_color() {
		return buttonText_color;
	}
	
	/**
	 * <!-- [#FFFFFF] (hex color code) button text color -->
	 * @param buttonText_color
	 */
	public void setButtonText_color(String buttonText_color) {
		this.buttonText_color = buttonText_color;
	}
	
	/**
	 * <!-- [#BBBB00](hex color code) button text roll over color -->    
	 * @return
	 */
	public String getButtonText_color_hover() {
		return buttonText_color_hover;
	}
	
	/**
	 * <!-- [#BBBB00](hex color code) button text roll over color -->    
	 * @param buttonText_color_hover
	 */
	public void setButtonText_color_hover(String buttonText_color_hover) {
		this.buttonText_color_hover = buttonText_color_hover;
	}
	
	/**
	 *<!-- [] (Number) button text size --> 
	 * @return
	 */
	public String getButtonText_size() {
		return buttonText_size;
	}
	
	/**
	 * <!-- [] (Number) button text size -->
	 * @param buttonText_size
	 */
	public void setButtonText_size(String buttonText_size) {
		this.buttonText_size = buttonText_size;
	}
	
	/**
	 * <!-- [?] (text) -->   
	 * @return
	 */
	public String getButtonText() {
		return buttonText;
	}
	
	/**
	 * <!-- [?] (text) -->   
	 * @param buttonText
	 */
	public void setButtonText(String buttonText) {
		this.buttonText = buttonText;
	}
	
	/**
	 * <!-- [#000000] (hex color code) background color -->
	 * @return
	 */
	public String getBalloonColor() {
		return balloonColor;
	}
	
	/**
	 * <!-- [#000000] (hex color code) background color -->
	 * @param balloonColor
	 */
	public void setBalloonColor(String balloonColor) {
		this.balloonColor = balloonColor;
	}
	
	/**
	 * <!-- [100] (0 - 100) background alpha -->
	 * @return
	 */
	public String getBalloonAlpha() {
		return balloonAlpha;
	}
	
	/**
	 * <!-- [100] (0 - 100) background alpha -->
	 * @param balloonAlpha
	 */
	public void setBalloonAlpha(String balloonAlpha) {
		this.balloonAlpha = balloonAlpha;
	}
	
	/**
	 * <!-- [300] (Number) -->
	 * @return
	 */
	public String getBalloonText_color() {
		return balloonText_color;
	}
	
	/**
	 * <!-- [300] (Number) -->
	 * @param balloonText_color
	 */
	public void setBalloonText_color(String balloonText_color) {
		this.balloonText_color = balloonText_color;
	}
	
	/**
	 * <!-- [#FFFFFF] (hex color code) button text color -->
	 * @return
	 */
	public String getBalloonText_color_hover() {
		return balloonText_color_hover;
	}
	
	/**
	 * <!-- [#FFFFFF] (hex color code) button text color -->
	 * @param balloonText_color_hover
	 */
	public void setBalloonText_color_hover(String balloonText_color_hover) {
		this.balloonText_color_hover = balloonText_color_hover;
	}
	
	/**
	 * <!-- [] (Number) button text size -->
	 * @return
	 */
	public String getBalloonText_size() {
		return balloonText_size;
	}
	
	/**
	 * <!-- [] (Number) button text size -->
	 * @param balloonText_size
	 */
	public void setBalloonText_size(String balloonText_size) {
		this.balloonText_size = balloonText_size;
	}
	
	/**
	 * <!-- [] (text) some html tags may be used 
	 * (supports <b>, <i>, <u>, <font>, <br/>. Enter text between []:
	 *  <![CDATA[your <b>bold</b> and <i>italic</i> text]]>-->
	 * @return
	 */
	public String getBalloonText() {
		return balloonText;
	}
	
	/**
	 * <!-- [] (text) some html tags may be used 
	 * (supports <b>, <i>, <u>, <font>, <br/>. Enter text between []:
	 * @param balloonText
	 */
	public void setBalloonText(String balloonText) {
		this.balloonText = balloonText;
	}
	
}
