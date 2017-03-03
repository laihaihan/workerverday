package com.linewell.core.amchart.column;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Jan 30, 2011 9:33:56 AM
 * @version v1.0 类说明 :
 */
public class Column {
 
	public String type = "";
	public String width = "";
	public String spacing = "";
	public String grow_time = "";
	public String grow_effect = "";
	public boolean sequenced_grow = true;
	public String alpha = "";
	public String border_color = "";
	public String border_alpha = "";
	public String data_labels = "";
	public String data_labels_text_color = "";
	public String data_labels_text_size = "";
	public String data_labels_position = "";
	public boolean data_labels_always_on = false;
	public String balloon_text = "";
	public String link_target = "";
	public String gradient = "";
	public String bullet_offset = "";
	public String hover_brightness = "";
	public String hover_color = "";
	public String corner_radius_top = "";
	public String corner_radius_bottom = "";

	/**
	 * <!-- [clustered] (clustered, stacked, 100% stacked, 3d column) -->
	 * 
	 * @return
	 */
	public String getType() {
		return type;
	}

	/**
	 * <!-- [clustered] (clustered, stacked, 100% stacked, 3d column) -->
	 * 
	 * @param type
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * <!-- [80] (0 - 100) width of column (in percents) -->
	 * 
	 * @return
	 */
	public String getWidth() {
		return width;
	}

	/**
	 * <!-- [80] (0 - 100) width of column (in percents) -->
	 * 
	 * @param width
	 */
	public void setWidth(String width) {
		this.width = width;
	}

	/**
	 * <!-- [5] (Number) space between columns of one category axis value, in
	 * pixels. Negative values can be used. -->
	 * 
	 * @return
	 */
	public String getSpacing() {
		return spacing;
	}

	/**
	 * <!-- [5] (Number) space between columns of one category axis value, in
	 * pixels. Negative values can be used. -->
	 * 
	 * @param spacing
	 */
	public void setSpacing(String spacing) {
		this.spacing = spacing;
	}

	/**
	 * <!-- [0] (Number) grow time in seconds. Leave 0 to appear instantly -->
	 * 
	 * @return
	 */
	public String getGrow_time() {
		return grow_time;
	}

	/**
	 * <!-- [0] (Number) grow time in seconds. Leave 0 to appear instantly -->
	 * 
	 * @param grow_time
	 */
	public void setGrow_time(String grow_time) {
		this.grow_time = grow_time;
	}

	/**
	 * <!-- [elastic] (elastic, regular, strong) -->
	 * 
	 * @return
	 */
	public String getGrow_effect() {
		return grow_effect;
	}

	/**
	 * <!-- [elastic] (elastic, regular, strong) -->
	 * 
	 * @param grow_effect
	 */
	public void setGrow_effect(String grow_effect) {
		this.grow_effect = grow_effect;
	}

	/**
	 * <!-- [false] (true / false) whether columns should grow at the same time
	 * or one after another -->
	 * 
	 * @return
	 */
	public boolean isSequenced_grow() {
		return sequenced_grow;
	}

	/**
	 * <!-- [false] (true / false) whether columns should grow at the same time
	 * or one after another -->
	 * 
	 * @param sequenced_grow
	 */
	public void setSequenced_grow(boolean sequenced_grow) {
		this.sequenced_grow = sequenced_grow;
	}

	/**
	 * <!-- [100] (Number) alpha of all columns -->
	 * 
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}

	/**
	 * <!-- [100] (Number) alpha of all columns -->
	 * 
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}

	/**
	 * <!-- [#FFFFFF] (hex color code) -->
	 * 
	 * @return
	 */
	public String getBorder_color() {
		return border_color;
	}

	/**
	 * <!-- [#FFFFFF] (hex color code) -->
	 * 
	 * @param border_color
	 */
	public void setBorder_color(String border_color) {
		this.border_color = border_color;
	}

	/**
	 * <!-- [0] (Number) -->
	 * 
	 * @return
	 */
	public String getBorder_alpha() {
		return border_alpha;
	}

	/**
	 * <!-- [0] (Number) -->
	 * 
	 * @param border_alpha
	 */
	public void setBorder_alpha(String border_alpha) {
		this.border_alpha = border_alpha;
	}

	/**
	 * <!-- [] ({title} {value} {series} {percents} {start} {difference}
	 * {total}) You can format any data label: {title} will be replaced with
	 * real title, {value} - with value and so on. You can add your own text or
	 * html code too. -->
	 * 
	 * @return
	 */
	public String getData_labels() {
		return data_labels;
	}

	/**
	 * <!-- [] ({title} {value} {series} {percents} {start} {difference}
	 * {total}) You can format any data label: {title} will be replaced with
	 * real title, {value} - with value and so on. You can add your own text or
	 * html code too. -->
	 * 
	 * @param data_labels
	 */
	public void setData_labels(String data_labels) {
		this.data_labels = data_labels;
	}

	/**
	 * <!-- [text_color] (hex color code) -->
	 * 
	 * @return
	 */
	public String getData_labels_text_color() {
		return data_labels_text_color;
	}

	/**
	 * <!-- [text_color] (hex color code) -->
	 * 
	 * @param data_labels_text_color
	 */
	public void setData_labels_text_color(String data_labels_text_color) {
		this.data_labels_text_color = data_labels_text_color;
	}

	/**
	 * <!-- [text_size] (Number) -->
	 * 
	 * @return
	 */
	public String getData_labels_text_size() {
		return data_labels_text_size;
	}

	/**
	 * <!-- [text_size] (Number) -->
	 * 
	 * @param data_labels_text_size
	 */
	public void setData_labels_text_size(String data_labels_text_size) {
		this.data_labels_text_size = data_labels_text_size;
	}

	/**
	 * <!-- [outside] (inside, outside, above). This setting is only for
	 * clustered chart. -->
	 * 
	 * @return
	 */
	public String getData_labels_position() {
		return data_labels_position;
	}

	/**
	 * <!-- [outside] (inside, outside, above). This setting is only for
	 * clustered chart. -->
	 * 
	 * @param data_labels_position
	 */
	public void setData_labels_position(String data_labels_position) {
		this.data_labels_position = data_labels_position;
	}

	/**
	 * <!-- if you set "above" for column chart, the data label will be
	 * displayed inside column, rotated by 90 degrees -->
	 * 
	 * @return
	 */
	public boolean isData_labels_always_on() {
		return data_labels_always_on;
	}

	/**
	 * <!-- if you set "above" for column chart, the data label will be
	 * displayed inside column, rotated by 90 degrees -->
	 * 
	 * @param data_labels_always_on
	 */
	public void setData_labels_always_on(boolean data_labels_always_on) {
		this.data_labels_always_on = data_labels_always_on;
	}

	/**
	 * <!-- [] ({title} {value} {series} {percents} {start} {difference}
	 * {total}) You can format any data label: {title} will be replaced with
	 * real title, {value} - with value and so on. You can add your own text or
	 * html code too. -->
	 * 
	 * @return
	 */
	public String getBalloon_text() {
		return balloon_text;
	}

	/**
	 * <!-- [] ({title} {value} {series} {percents} {start} {difference}
	 * {total}) You can format any data label: {title} will be replaced with
	 * real title, {value} - with value and so on. You can add your own text or
	 * html code too. -->
	 * 
	 * @param balloon_text
	 */
	public void setBalloon_text(String balloon_text) {
		this.balloon_text = balloon_text;
	}

	/**
	 * <!-- [] (_blank, _top ...) -->
	 * 
	 * @return
	 */
	public String getLink_target() {
		return link_target;
	}

	/**
	 * <!-- [] (_blank, _top ...) -->
	 * 
	 * @param link_target
	 */
	public void setLink_target(String link_target) {
		this.link_target = link_target;
	}

	/**
	 * <!-- [vertical] (horizontal / vertical) Direction of column gradient.
	 * Gradient colors are defined in graph settings below. -->
	 * 
	 * @return
	 */
	public String getGradient() {
		return gradient;
	}

	/**
	 * <!-- [vertical] (horizontal / vertical) Direction of column gradient.
	 * Gradient colors are defined in graph settings below. -->
	 * 
	 * @param gradient
	 */
	public void setGradient(String gradient) {
		this.gradient = gradient;
	}

	/**
	 * <!-- [0] (Number) distance from column / bar to the bullet -->
	 * 
	 * @return
	 */
	public String getBullet_offset() {
		return bullet_offset;
	}

	/**
	 * <!-- [0] (Number) distance from column / bar to the bullet -->
	 * 
	 * @param bullet_offset
	 */
	public void setBullet_offset(String bullet_offset) {
		this.bullet_offset = bullet_offset;
	}

	/**
	 * <!-- [0] (from -255 to 255) The column may darken/lighten when the use
	 * rolls over it. The intensity may be set here -->
	 * 
	 * @return
	 */
	public String getHover_brightness() {
		return hover_brightness;
	}

	/**
	 * <!-- [0] (from -255 to 255) The column may darken/lighten when the use
	 * rolls over it. The intensity may be set here -->
	 * 
	 * @param hover_brightness
	 */
	public void setHover_brightness(String hover_brightness) {
		this.hover_brightness = hover_brightness;
	}

	/**
	 * <!-- [] (hex color code) -->
	 * 
	 * @return
	 */
	public String getHover_color() {
		return hover_color;
	}

	/**
	 * <!-- [] (hex color code) -->
	 * 
	 * @param hover_color
	 */
	public void setHover_color(String hover_color) {
		this.hover_color = hover_color;
	}

	/**
	 * <!-- [0] (Number, Number%) Corner radius of the column's top. Works only
	 * if depth is = 0 -->
	 * 
	 * @return
	 */
	public String getCorner_radius_top() {
		return corner_radius_top;
	}

	/**
	 * <!-- [0] (Number, Number%) Corner radius of the column's top. Works only
	 * if depth is = 0 -->
	 * 
	 * @param corner_radius_top
	 */
	public void setCorner_radius_top(String corner_radius_top) {
		this.corner_radius_top = corner_radius_top;
	}

	/**
	 * <!-- [0] (Number, Number%) Corner radius of the column's bottom. Works
	 * only if depth is = 0 -->
	 * 
	 * @return
	 */
	public String getCorner_radius_bottom() {
		return corner_radius_bottom;
	}

	/**
	 * <!-- [0] (Number, Number%) Corner radius of the column's bottom. Works
	 * only if depth is = 0 -->
	 * 
	 * @param corner_radius_bottom
	 */
	public void setCorner_radius_bottom(String corner_radius_bottom) {
		this.corner_radius_bottom = corner_radius_bottom;
	}

}
