package com.linewell.core.amchart.pie;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Jan 30, 2011 9:27:07 AM
 * @version v1.0 类说明 :
 */
public class Group {
	public String percent = "";
	public String color = "";
	public String title = "";
	public String url = "";
	public String description = "";
	public boolean pull_out = false;

	/**
	 * <!-- [0] (Number) if the calculated percent value of a slice is less than
	 * specified here, and there are more than one such slices, they can be
	 * grouped to "The others" slice-->
	 * 
	 * @return
	 */
	public String getPercent() {
		return percent;
	}

	/**
	 * <!-- [0] (Number) if the calculated percent value of a slice is less than
	 * specified here, and there are more than one such slices, they can be
	 * grouped to "The others" slice-->
	 * 
	 * @param percent
	 */
	public void setPercent(String percent) {
		this.percent = percent;
	}

	/**
	 * <!-- [] (hex color code) color of "The others" slice -->
	 * 
	 * @return
	 */
	public String getColor() {
		return color;
	}

	/**
	 * <!-- [] (hex color code) color of "The others" slice -->
	 * 
	 * @param color
	 */
	public void setColor(String color) {
		this.color = color;
	}

	/**
	 * <!-- [Others] title of "The others" slice -->
	 * 
	 * @return
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * <!-- [Others] title of "The others" slice -->
	 * 
	 * @param title
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * <!-- [] url of "The others" slice -->
	 * 
	 * @return
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * <!-- [] url of "The others" slice -->
	 * 
	 * @param url
	 */
	public void setUrl(String url) {
		this.url = url;
	}

	/**
	 * <!-- [] description of "The others" slice -->
	 * 
	 * @return
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * <!-- [] description of "The others" slice -->
	 * 
	 * @param description
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * <!-- [false] (true / false) whether to pull out the other slice or not
	 * -->
	 * 
	 * @return
	 */
	public boolean isPull_out() {
		return pull_out;
	}

	/**
	 * <!-- [false] (true / false) whether to pull out the other slice or not
	 * -->
	 * 
	 * @param pull_out
	 */
	public void setPull_out(boolean pull_out) {
		this.pull_out = pull_out;
	}
}
