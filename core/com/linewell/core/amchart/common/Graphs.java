package com.linewell.core.amchart.common;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Jan 29, 2011 9:04:50 AM
 * @version v1.0 类说明 :目前主要用于柱、线三种图形
 */
public class Graphs {
	public String gid = "";
	public String axis = "";
	public String type = "";
	public String title = "";
	public String color = "";
	public String color_hover = "";
	public String line_alpha = "";
	public String line_width = "";
	public String alpha = "";
	public String data_labels = "";
	public String gradient_fill_colors = "";
	public String balloon_color = "";
	public String balloon_alpha = "";
	public String balloon_text_color = "";
	public String balloon_text = "";
	public String fill_alpha = "";
	public String fill_color = "";
	public String width = "";
	public String bullet = "";
	public String bullet_size = "";
	public String bullet_color = "";
	public String bullet_alpha = "";
	public boolean hidden = false;
	public boolean selected = true;
	public String data_labels_text_color = "";
	public String data_labels_text_size = "";
	public String data_labels_position = "";
	public boolean vertical_lines = false;
	public boolean visible_in_legend = true;
	public String pattern = "";
	public String pattern_color = "";

	/**
	 * <!-- if you are using XML data file, graph "gid" must match graph "gid"
	 * in data file -->
	 * 
	 * @return
	 */
	public String getGid() {
		return gid;
	}

	/**
	 * <!-- if you are using XML data file, graph "gid" must match graph "gid"
	 * in data file -->
	 * 
	 * @param gid
	 */
	public void setGid(String gid) {
		this.gid = gid;
	}

	/**
	 * <!-- [column] (column/line) -->
	 * 
	 * @return
	 */
	public String getType() {
		return type;
	}

	/**
	 * <!-- [left] (left/ right) indicates which y axis should be used -->
	 * 
	 * @return
	 */
	public String getAxis() {
		return axis;
	}

	/**
	 * <!-- [left] (left/ right) indicates which y axis should be used -->
	 * 
	 * @param axis
	 */
	public void setAxis(String axis) {
		this.axis = axis;
	}

	/**
	 * <!-- [column] (column/line) -->
	 * 
	 * @param type
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * <!-- [] (graph title) -->
	 * 
	 * @return
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * <!-- [] (graph title) -->
	 * 
	 * @param title
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * <!-- [] (hex color code) -->
	 * 
	 * @return
	 */
	public String getColor() {
		return color;
	}

	/**
	 * <!-- [] (hex color code) -->
	 * 
	 * @param color
	 */
	public void setColor(String color) {
		this.color = color;
	}

	/**
	 * <!-- [column.alpha (line.alpha)] (0 - 100) -->
	 * 
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}

	/**
	 * <!-- [column.alpha (line.alpha)] (0 - 100) -->
	 * 
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}

	/**
	 * <!-- [column.data_labels (line.data_labels)] ({title} {value} {series}
	 * {percents} {start} {difference} {total}) You can format any data label:
	 * {title} will be replaced with real title, {value} - with value and so on.
	 * You can add your own text or html code too. -->
	 * 
	 * @return
	 */
	public String getData_labels() {
		return data_labels;
	}

	/**
	 * <!-- [column.data_labels (line.data_labels)] ({title} {value} {series}
	 * {percents} {start} {difference} {total}) You can format any data label:
	 * {title} will be replaced with real title, {value} - with value and so on.
	 * You can add your own text or html code too. -->
	 * 
	 * @param data_labels
	 */
	public void setData_labels(String data_labels) {
		this.data_labels = data_labels;
	}

	/**
	 * <!-- [] (hex color codes separated by comas) columns can be filled with
	 * gradients. Set any number of colors here. Note, that the legend key will
	 * be filled with color value, not with gradient. -->
	 * 
	 * @return
	 */
	public String getGradient_fill_colors() {
		return gradient_fill_colors;
	}

	/**
	 * <!-- [] (hex color codes separated by comas) columns can be filled with
	 * gradients. Set any number of colors here. Note, that the legend key will
	 * be filled with color value, not with gradient. -->
	 * 
	 * @param gradient_fill_colors
	 */
	public void setGradient_fill_colors(String gradient_fill_colors) {
		this.gradient_fill_colors = gradient_fill_colors;
	}

	/**
	 * <!-- [balloon.color] (hex color code) leave empty to use the same color
	 * as graph -->
	 * 
	 * @return
	 */
	public String getBalloon_color() {
		return balloon_color;
	}

	/**
	 * <!-- [balloon.color] (hex color code) leave empty to use the same color
	 * as graph -->
	 * 
	 * @param balloon_color
	 */
	public void setBalloon_color(String balloon_color) {
		this.balloon_color = balloon_color;
	}

	/**
	 * <!-- [balloon.alpha] (0 - 100) -->
	 * 
	 * @return
	 */
	public String getBalloon_alpha() {
		return balloon_alpha;
	}

	/**
	 * <!-- [balloon.alpha] (0 - 100) -->
	 * 
	 * @param balloon_alpha
	 */
	public void setBalloon_alpha(String balloon_alpha) {
		this.balloon_alpha = balloon_alpha;
	}

	/**
	 * <!-- [balloon.text_color] (hex color code) -->
	 * 
	 * @return
	 */
	public String getBalloon_text_color() {
		return balloon_text_color;
	}

	/**
	 * <!-- [balloon.text_color] (hex color code) -->
	 * 
	 * @param balloon_text_color
	 */
	public void setBalloon_text_color(String balloon_text_color) {
		this.balloon_text_color = balloon_text_color;
	}

	/**
	 * <!-- [column(line).balloon.text] ({title} {value} {series} {description}
	 * {percents}) You can format any balloon text: {title} will be replaced
	 * with real title, {value} - with value and so on. You can add your own
	 * text or html code too. -->
	 * 
	 * @return
	 */
	public String getBalloon_text() {
		return balloon_text;
	}

	/**
	 * <!-- [column(line).balloon.text] ({title} {value} {series} {description}
	 * {percents}) You can format any balloon text: {title} will be replaced
	 * with real title, {value} - with value and so on. You can add your own
	 * text or html code too. -->
	 * 
	 * @param balloon_text
	 */
	public void setBalloon_text(String balloon_text) {
		this.balloon_text = balloon_text;
	}

	/**
	 * <!-- [0] (0 - 100) fill alpha (use it if you want to have area chart) -->
	 * 
	 * @return
	 */
	public String getFill_alpha() {
		return fill_alpha;
	}

	/**
	 * <!-- [0] (0 - 100) fill alpha (use it if you want to have area chart) -->
	 * 
	 * @param fill_alpha
	 */
	public void setFill_alpha(String fill_alpha) {
		this.fill_alpha = fill_alpha;
	}

	/**
	 * <!-- [2] (Number) line width -->
	 * 
	 * @return
	 */
	public String getWidth() {
		return width;
	}

	/**
	 * <!-- [2] (Number) line width -->
	 * 
	 * @param width
	 */
	public void setWidth(String width) {
		this.width = width;
	}

	/**
	 * <!-- [line.bullet] (round, square, round_outlined, square_outline,
	 * round_outline, square_outlined, filename) -->
	 * 
	 * @return
	 */
	public String getBullet() {
		return bullet;
	}

	/**
	 * <!-- [line.bullet] (round, square, round_outlined, square_outline,
	 * round_outline, square_outlined, filename) -->
	 * 
	 * @param bullet
	 */
	public void setBullet(String bullet) {
		this.bullet = bullet;
	}

	/**
	 * <!-- [line.bullet_size] (Number) bullet size -->
	 * 
	 * @return
	 */
	public String getBullet_size() {
		return bullet_size;
	}

	/**
	 * <!-- [line.bullet_size] (Number) bullet size -->
	 * 
	 * @param bullet_size
	 */
	public void setBullet_size(String bullet_size) {
		this.bullet_size = bullet_size;
	}

	/**
	 * <!-- [] (hex color code) bullet color. If not defined, line color is used
	 * -->
	 * 
	 * @return
	 */
	public String getBullet_color() {
		return bullet_color;
	}

	/**
	 * <!-- [] (hex color code) bullet color. If not defined, line color is used
	 * -->
	 * 
	 * @param bullet_color
	 */
	public void setBullet_color(String bullet_color) {
		this.bullet_color = bullet_color;
	}

	/**
	 * <!-- [#BBBB00] (hex color code) -->
	 * 
	 * @return
	 */
	public String getColor_hover() {
		return color_hover;
	}

	/**
	 * <!-- [#BBBB00] (hex color code) -->
	 * 
	 * @param color_hover
	 */
	public void setColor_hover(String color_hover) {
		this.color_hover = color_hover;
	}

	/**
	 * <!-- [100] (0 - 100) -->
	 * 
	 * @return
	 */
	public String getLine_alpha() {
		return line_alpha;
	}

	/**
	 * <!-- [100] (0 - 100) -->
	 * 
	 * @param line_alpha
	 */
	public void setLine_alpha(String line_alpha) {
		this.line_alpha = line_alpha;
	}

	/**
	 * <!-- [0] (Number) 0 for hairline -->
	 * 
	 * @return
	 */
	public String getLine_width() {
		return line_width;
	}

	/**
	 * <!-- [0] (Number) 0 for hairline -->
	 * 
	 * @param line_width
	 */
	public void setLine_width(String line_width) {
		this.line_width = line_width;
	}

	/**
	 * <!-- [grpah.color] (hex color code). Separate color codes with comas for
	 * gradient -->
	 * 
	 * @return
	 */
	public String getFill_color() {
		return fill_color;
	}

	/**
	 * <!-- [grpah.color] (hex color code). Separate color codes with comas for
	 * gradient -->
	 * 
	 * @param fill_color
	 */
	public void setFill_color(String fill_color) {
		this.fill_color = fill_color;
	}

	/**
	 * <!-- [graph alpha] (hex color code) Leave empty to use the same alpha as
	 * graph -->
	 * 
	 * @return
	 */
	public String getBullet_alpha() {
		return bullet_alpha;
	}

	/**
	 * <!-- [graph alpha] (hex color code) Leave empty to use the same alpha as
	 * graph -->
	 * 
	 * @param bullet_alpha
	 */
	public void setBullet_alpha(String bullet_alpha) {
		this.bullet_alpha = bullet_alpha;
	}

	/**
	 * <!-- [false] (true / false) vill not be visible until you check
	 * corresponding checkbox in the legend -->
	 * 
	 * @return
	 */
	public boolean isHidden() {
		return hidden;
	}

	/**
	 * <!-- [false] (true / false) vill not be visible until you check
	 * corresponding checkbox in the legend -->
	 * 
	 * @param hidden
	 */
	public void setHidden(boolean hidden) {
		this.hidden = hidden;
	}

	/**
	 * <!-- [true] (true / false) if true, balloon indicating value will be
	 * visible then roll over plot area -->
	 * 
	 * @return
	 */
	public boolean isSelected() {
		return selected;
	}

	/**
	 * <!-- [true] (true / false) if true, balloon indicating value will be
	 * visible then roll over plot area -->
	 * 
	 * @param selected
	 */
	public void setSelected(boolean selected) {
		this.selected = selected;
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
	 * <!-- [above] (below / above) -->
	 * 
	 * @return
	 */
	public String getData_labels_position() {
		return data_labels_position;
	}

	/**
	 * <!-- [above] (below / above) -->
	 * 
	 * @param data_labels_position
	 */
	public void setData_labels_position(String data_labels_position) {
		this.data_labels_position = data_labels_position;
	}

	/**
	 * <!-- [false] (true / false) whether to draw vertical lines or not. If you
	 * want to show vertical lines only (without the graph, set line_alpha to 0
	 * -->
	 * 
	 * @return
	 */
	public boolean isVertical_lines() {
		return vertical_lines;
	}

	/**
	 * <!-- [false] (true / false) whether to draw vertical lines or not. If you
	 * want to show vertical lines only (without the graph, set line_alpha to 0
	 * -->
	 * 
	 * @param vertical_lines
	 */
	public void setVertical_lines(boolean vertical_lines) {
		this.vertical_lines = vertical_lines;
	}

	/**
	 * <!-- [true] (true / false) whether to show legend entry for this graph or
	 * not -->
	 * 
	 * @return
	 */
	public boolean isVisible_in_legend() {
		return visible_in_legend;
	}

	/**
	 * <!-- [true] (true / false) whether to show legend entry for this graph or
	 * not -->
	 * 
	 * @param visible_in_legend
	 */
	public void setVisible_in_legend(boolean visible_in_legend) {
		this.visible_in_legend = visible_in_legend;
	}

	/**
	 * <!-- [] (path to the pattern file) Pattern file can be: swf, jpg, gif or
	 * png. The chart looks for the file in the "path" folder. the pattern can
	 * be also set for individual columns in the data xml file -->
	 * 
	 * @return
	 */
	public String getPattern() {
		return pattern;
	}

	/**
	 * <!-- [] (path to the pattern file) Pattern file can be: swf, jpg, gif or
	 * png. The chart looks for the file in the "path" folder. the pattern can
	 * be also set for individual columns in the data xml file -->
	 * 
	 * @param pattern
	 */
	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	/**
	 * <!-- [] (hex color code) the color of the pattern -->
	 * 
	 * @return
	 */
	public String getPattern_color() {
		return pattern_color;
	}

	/**
	 * <!-- [] (hex color code) the color of the pattern -->
	 * 
	 * @param pattern_color
	 */
	public void setPattern_color(String pattern_color) {
		this.pattern_color = pattern_color;
	}

}
