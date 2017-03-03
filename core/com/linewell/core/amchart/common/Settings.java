package com.linewell.core.amchart.common;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Feb 15, 2010 9:44:51 PM
 * @version v1.0 类说明 :FLASH图表中常用对象,可根据需要进行扩展
 * 目前主要用于饼、柱、线三种图形
 */
public class Settings {

	public String type = "";
	public String data_type = "xml";
	public String csv_separator = "";
	public String skip_rows = "";
	public String font = "";
	public String text_size = "15";
	public String text_color = "";
	public String decimals_separator = "";
	public String thousands_separator = "";
	public String scientific_min = "";
	public String scientific_max = "";
	public String digits_after_decimal = "";
	public boolean redraw = true;// 自动调整页面大小时.饼图随之改变,自动调整页面大小.饼图随之改变时,html页面的宽度和高度要设置成100%
	
	public String reload_data_interval = "";
	public boolean preloader_on_reload = false;
	public boolean add_time_stamp = false;
	public String precision = "";
	public String depth = "";
	public String angle = "";
	public String colors = "";
	public boolean exclude_invisible=false;
	public boolean js_enabled = true;

	private String filePath = "";
	private String fileName = "";

	/**
	 * 用于柱形图column/bar <!-- [column] (column / bar) -->
	 * 
	 * @return
	 */
	public String getType() {
		return type;
	}

	/**
	 * 用于柱形图column/bar <!-- [column] (column / bar) -->
	 * 
	 * @param type
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * <!-- [xml] (xml / csv) -->
	 * 
	 * @return
	 */
	public String getData_type() {
		return data_type;
	}

	/**
	 * <!-- [xml] (xml / csv) -->
	 * 
	 * @param data_type
	 */
	public void setData_type(String data_type) {
		this.data_type = data_type;
	}

	/**
	 * 当数据类型为CVS时使用 <!-- [;] (string) csv file data separator (you need it only
	 * if you are using csv file for your data) -->
	 * 
	 * @return
	 */
	public String getCsv_separator() {
		return csv_separator;
	}

	/**
	 * 当数据类型为CVS时使用 <!-- [;] (string) csv file data separator (you need it only
	 * if you are using csv file for your data) -->
	 * 
	 * @param csv_separator
	 */
	public void setCsv_separator(String csv_separator) {
		this.csv_separator = csv_separator;
	}

	/**
	 * <!-- [0] (Number) if you are using csv data type, you can set the number
	 * of rows which should be skipped here -->
	 * 
	 * @return
	 */
	public String getSkip_rows() {
		return skip_rows;
	}

	/**
	 * [0] (Number) if you are using csv data type, you can set the number of
	 * rows which should be skipped here
	 * 
	 * @param skip_rows
	 */
	public void setSkip_rows(String skip_rows) {
		this.skip_rows = skip_rows;
	}

	/**
	 * <!-- [Arial] (font name) use device fonts, such as Arial, Times New
	 * Roman, Tahoma, Verdana... -->
	 * 
	 * @return
	 */
	public String getFont() {
		return font;
	}

	/**
	 * <!-- [Arial] (font name) use device fonts, such as Arial, Times New
	 * Roman, Tahoma, Verdana... -->
	 * 
	 * @param font
	 */
	public void setFont(String font) {
		this.font = font;
	}

	/**
	 * <!-- [11] (Number) text size of all texts. Every text size can be set
	 * individually in the settings below -->
	 * 
	 * @return
	 */
	public String getText_size() {
		return text_size;
	}

	/**
	 * <!-- [11] (Number) text size of all texts. Every text size can be set
	 * individually in the settings below -->
	 * 
	 * @param text_size
	 */
	public void setText_size(String text_size) {
		this.text_size = text_size;
	}

	/**
	 * <!-- [#000000] (hex color code) main text color. Every text color can be
	 * set individually in the settings below-->
	 * 
	 * @return
	 */
	public String getText_color() {
		return text_color;
	}

	/**
	 * <!-- [#000000] (hex color code) main text color. Every text color can be
	 * set individually in the settings below-->
	 * 
	 * @param text_color
	 */
	public void setText_color(String text_color) {
		this.text_color = text_color;
	}

	/**
	 * [,] (string)decimal separator. that this is for displaying data only.
	 * Decimals in data xml file must be separated with dot
	 * 
	 * @return
	 */
	public String getDecimals_separator() {
		return decimals_separator;
	}

	/**
	 * [,] (string)decimal separator. that this is for displaying data only.
	 * Decimals in data xml file must be separated with dot
	 * 
	 * @param decimals_separator
	 */
	public void setDecimals_separator(String decimals_separator) {
		this.decimals_separator = decimals_separator;
	}

	/**
	 * [ ] (string)thousand separator. use "none" if you don't want to separate
	 * 
	 * @return
	 */
	public String getThousands_separator() {
		return thousands_separator;
	}

	/**
	 * [ ] (string)thousand separator. use "none" if you don't want to separate
	 * 
	 * @param thousands_separator
	 */
	public void setThousands_separator(String thousands_separator) {
		this.thousands_separator = thousands_separator;
	}

	/**
	 * <!-- [0.000001] If absolute value of your number is equal or less then
	 * scientific_min, this number will be formatted using scientific notation,
	 * for example: 0.0000023 -> 2.3e-6 -->
	 */
	public String getScientific_min() {
		return scientific_min;
	}

	/**
	 * <!-- [0.000001] If absolute value of your number is equal or less then
	 * scientific_min, this number will be formatted using scientific notation,
	 * for example: 0.0000023 -> 2.3e-6 -->
	 * 
	 * @param scientific_min
	 */
	public void setScientific_min(String scientific_min) {
		this.scientific_min = scientific_min;
	}

	/**
	 * <!-- [1000000000000000] If absolute value of your number is equal or
	 * bigger then scientific_max, this number will be formatted using
	 * scientific notation, for example: 15000000000000000 -> 1.5e16 -->
	 * 
	 * @return
	 */
	public String getScientific_max() {
		return scientific_max;
	}

	/**
	 * <!-- [1000000000000000] If absolute value of your number is equal or
	 * bigger then scientific_max, this number will be formatted using
	 * scientific notation, for example: 15000000000000000 -> 1.5e16 -->
	 * 
	 * @param scientific_max
	 */
	public void setScientific_max(String scientific_max) {
		this.scientific_max = scientific_max;
	}

	/**
	 * [] (Number) if your value has less digits after decimal then is set here,
	 * zeroes will be added
	 * 
	 * @return
	 */
	public String getDigits_after_decimal() {
		return digits_after_decimal;
	}

	/**
	 * [] (Number) if your value has less digits after decimal then is set here,
	 * zeroes will be added
	 * 
	 * @param digits_after_decimal
	 */
	public void setDigits_after_decimal(String digits_after_decimal) {
		this.digits_after_decimal = digits_after_decimal;
	}

	/**
	 * [true] (true / false) 是否根据页面大小调整图片大小, 默认true 表示自动调整图片大小
	 * 
	 * @return
	 */
	public boolean isRedraw() {
		return redraw;
	}

	/**
	 * [true] (true / false) 是否根据页面大小调整图片大小, 默认true 表示自动调整图片大小
	 * 
	 * @param redraw
	 */
	public void setRedraw(boolean redraw) {
		this.redraw = redraw;
	}

	/**
	 * [0] (Number) how often data should be reloaded (time in seconds)
	 * 
	 * @return
	 */
	public String getReload_data_interval() {
		return reload_data_interval;
	}

	/**
	 * [0] (Number) how often data should be reloaded (time in seconds)
	 * 
	 * @param reload_data_interval
	 */
	public void setReload_data_interval(String reload_data_interval) {
		this.reload_data_interval = reload_data_interval;
	}

	/**
	 * [false] (true / false) Whether to show preloaded when data or settings
	 * are reloaded
	 * 
	 * @return
	 */
	public boolean isPreloader_on_reload() {
		return preloader_on_reload;
	}

	/**
	 * [false] (true / false) Whether to show preloaded when data or settings
	 * are reloaded
	 * 
	 * @param preloader_on_reload
	 */
	public void setPreloader_on_reload(boolean preloader_on_reload) {
		this.preloader_on_reload = preloader_on_reload;
	}

	/**
	 * [false] (true / false) if true, a unique number will be added every time
	 * flash loads data. Mainly this feature is useful if you set reload
	 * _data_interval
	 * 
	 * @return
	 */
	public boolean isAdd_time_stamp() {
		return add_time_stamp;
	}

	/**
	 * [false] (true / false) if true, a unique number will be added every time
	 * flash loads data. Mainly this feature is useful if you set reload
	 * _data_interval
	 * 
	 * @param add_time_stamp
	 */
	public void setAdd_time_stamp(boolean add_time_stamp) {
		this.add_time_stamp = add_time_stamp;
	}

	/**
	 * [2] (Number) shows how many numbers should be shown after comma for
	 * calculated values (percents)
	 * 
	 * @return
	 */
	public String getPrecision() {
		return precision;
	}

	/**
	 * [2] (Number) shows how many numbers should be shown after comma for
	 * calculated values (percents)
	 * 
	 * @param precision
	 */
	public void setPrecision(String precision) {
		this.precision = precision;
	}

	/**
	 * [0] (Number) the depth of chart and columns (for 3D effect)
	 * 
	 * @return
	 */
	public String getDepth() {
		return depth;
	}

	/**
	 * [0] (Number) the depth of chart and columns (for 3D effect)
	 * 
	 * @param depth
	 */
	public void setDepth(String depth) {
		this.depth = depth;
	}

	/**
	 * [30] (0 - 90) angle of chart area and columns (for 3D effect)
	 * 
	 * @return
	 */
	public String getAngle() {
		return angle;
	}

	/**
	 * [30] (0 - 90) angle of chart area and columns (for 3D effect)
	 * 
	 * @param angle
	 */
	public void setAngle(String angle) {
		this.angle = angle;
	}

	/**
	 * <!--
	 * [#FF6600,#FCD202,#B0DE09,#0D8ECF,#2A0CD0,#CD0D74,#CC0000,#00CC00,#0000CC,#DDDDDD,#999999,#333333,#990000]
	 * Colors of graphs. if the graph color is not set, color from this array
	 * will be used -->
	 * 
	 * @return
	 */
	public String getColors() {
		return colors;
	}

	/**
	 * <!--
	 * [#FF6600,#FCD202,#B0DE09,#0D8ECF,#2A0CD0,#CD0D74,#CC0000,#00CC00,#0000CC,#DDDDDD,#999999,#333333,#990000]
	 * Colors of graphs. if the graph color is not set, color from this array
	 * will be used -->
	 * 
	 * @param colors
	 */
	public void setColors(String colors) {
		this.colors = colors;
	}

	/**
	 * 解析XML文件的文件名
	 * 
	 * @return
	 */
	public String getFileName() {
		return fileName;
	}

	/**
	 * 解析XML文件的文件名
	 * 
	 * @param fileName
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	/**
	 * 解析XML文件的路径
	 * 
	 * @return
	 */
	public String getFilePath() {
		return filePath;
	}

	/**
	 * 解析XML文件的路径
	 * 
	 * @param filePath
	 */
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	/**
	 * <!-- [false] (true / false) whether to exclude invisible slices (where alpha=0) 
	 * then calculating percent values or not -->
	 * @return
	 */
	public boolean isExclude_invisible() {
		return exclude_invisible;
	}

	/**
	 * <!-- [false] (true / false) whether to exclude invisible slices (where alpha=0) 
	 * then calculating percent values or not -->
	 * @param exclude_invisible
	 */
	public void setExclude_invisible(boolean exclude_invisible) {
		this.exclude_invisible = exclude_invisible;
	}
	
	/**
	 * <!-- [true] (true / false) In case you don't use any flash - JavaScript
	 * communication, you shuold set this setting to false - this will save some
	 * CPU and will disable the security warning message which appears when
	 * opening the chart from hard drive. -->
	 * 
	 * @return
	 */
	public boolean isJs_enabled() {
		return js_enabled;
	}

	/**
	 * <!-- [true] (true / false) In case you don't use any flash - JavaScript
	 * communication, you shuold set this setting to false - this will save some
	 * CPU and will disable the security warning message which appears when
	 * opening the chart from hard drive. -->
	 * 
	 * @param js_enabled
	 */
	public void setJs_enabled(boolean js_enabled) {
		this.js_enabled = js_enabled;
	}

}
