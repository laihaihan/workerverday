package com.linewell.core.amchart.common;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Feb 15, 2010 10:41:42 PM
 * @version v1.0 类说明 :目前主要用于饼、柱、线三种图形
 */
public class Strings {
	public String no_data = "";
	public String export_as_image = "";
	public String error_in_data_file = "";
	public String collecting_data = "";
	public String wrong_zoom_value = "";
	public String ss = "";
	public String mm = "";
	public String hh = "";
	public String DD = "";

	/**
	 * [No data for selected period] (text) if data is missing, this message
	 * will be displayed
	 * 
	 * @return
	 */
	public String getNo_data() {
		return no_data;
	}

	/**
	 * [No data for selected period] (text) if data is missing, this message
	 * will be displayed
	 * 
	 * @param no_data
	 */
	public void setNo_data(String no_data) {
		this.no_data = no_data;
	}

	/**
	 * [Export as image] (text) text for right click menu
	 * 
	 * @return
	 */
	public String getExport_as_image() {
		return export_as_image;
	}

	/**
	 * [Export as image] (text) text for right click menu
	 * 
	 * @param export_as_image
	 */
	public void setExport_as_image(String export_as_image) {
		this.export_as_image = export_as_image;
	}

	/**
	 * <!-- [Error in data file] (text) this text is displayed if there is an
	 * error in data file or there is no data in file. "There is no data" means
	 * that there should actually be at least one space in data file. If data
	 * file will be completly empty, it will display "error loading file" text
	 * -->
	 * 
	 * @return
	 */
	public String getError_in_data_file() {
		return error_in_data_file;
	}

	/**
	 * <!-- [Error in data file] (text) this text is displayed if there is an
	 * error in data file or there is no data in file. "There is no data" means
	 * that there should actually be at least one space in data file. If data
	 * file will be completly empty, it will display "error loading file" text
	 * -->
	 * 
	 * @param error_in_data_file
	 */
	public void setError_in_data_file(String error_in_data_file) {
		this.error_in_data_file = error_in_data_file;
	}

	/**
	 * [Collecting data] (text) this text is displayed while exporting chart to
	 * an image
	 * 
	 * @return
	 */
	public String getCollecting_data() {
		return collecting_data;
	}

	/**
	 * [Collecting data] (text) this text is displayed while exporting chart to
	 * an image
	 * 
	 * @param collecting_data
	 */
	public void setCollecting_data(String collecting_data) {
		this.collecting_data = collecting_data;
	}
	/**
	 * <!-- [Incorrect values] (text) this text is displayed if you set zoom
	 * through JavaScript and entered from or to value was not find between
	 * series -->
	 * 
	 * @return
	 */
	public String getWrong_zoom_value() {
		return wrong_zoom_value;
	}

	/**
	 * <!-- [Incorrect values] (text) this text is displayed if you set zoom
	 * through JavaScript and entered from or to value was not find between
	 * series -->
	 * 
	 * @param wrong_zoom_value
	 */
	public void setWrong_zoom_value(String wrong_zoom_value) {
		this.wrong_zoom_value = wrong_zoom_value;
	}
	/**
	 * <!-- [] unit of seconds -->
	 * 
	 * @return
	 */
	public String getSs() {
		return ss;
	}

	/**
	 * <!-- [] unit of seconds -->
	 * 
	 * @param ss
	 */
	public void setSs(String ss) {
		this.ss = ss;
	}

	/**
	 * <!-- [:] unit of minutes -->
	 * 
	 * @return
	 */
	public String getMm() {
		return mm;
	}

	/**
	 * <!-- [:] unit of minutes -->
	 * 
	 * @param mm
	 */
	public void setMm(String mm) {
		this.mm = mm;
	}

	/**
	 * <!-- [:] unit of hours -->
	 * 
	 * @return
	 */
	public String getHh() {
		return hh;
	}

	/**
	 * <!-- [:] unit of hours -->
	 * 
	 * @param hh
	 */
	public void setHh(String hh) {
		this.hh = hh;
	}

	/**
	 * <!-- [d. ] unit of days -->
	 * 
	 * @return
	 */
	public String getDD() {
		return DD;
	}

	/**
	 * <!-- [d. ] unit of days -->
	 * 
	 * @param dd
	 */
	public void setDD(String dd) {
		DD = dd;
	}

	

}
