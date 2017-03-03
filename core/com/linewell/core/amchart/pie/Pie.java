package com.linewell.core.amchart.pie;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Jan 29, 2011 4:14:38 PM
 * @version v1.0 类说明 :FLASH饼图中常用对象,可根据需要进行扩展
 */
public class Pie {
	public String x = "50%";
	public String y = "50%";
	public String radius = "";
	public String inner_radius = "";
	public String height = "10";
	public String angle = "5";
	public String start_angle = "";
	public String outline_color = "0xcccccc";
	public String outline_alpha = "100";
	public String base_color = "";
	public String brightness_step = "50";
	
	/**
	 * pie 图各区域颜色
	 * 默认#FF9E01,#FCD202,#F8FF01,#B0DE09,#04D215,#0D8ECF,#0D52D1,#2A0CD0,#8A0CCF,#CD0D74,#754DEB,#DDDDDD,#999999,#333333,#990000
	 * 可调整为#FF0F00,#04D215,#FF6600,#B0DE09,#FF9E01,#0D8ECF,#FCD202,#8A0CCF,#0D52D1,#F8FF01,#2A0CD0,#DDDDDD,#CD0D74,#999999,#754DEB,#333333,#990000
	 */
	public String colors = "";
	public String link_target = "";
	public String alpha = "80";
	public String hover_brightness = "";
	public String gradient = "";
	public String gradient_ratio = "";

	/**
	 * <!-- [50%](Number / Number% / !Number) -->
	 * piex 图的位置 X轴
	 * @return
	 */
	public String getX() {
		return x;
	}

	/**
	 * <!-- [50%](Number / Number% / !Number) -->
	 * piex 图的位置 X轴
	 * @param x
	 */
	public void setX(String x) {
		this.x = x;
	}

	/**
	 * <!-- [45%](Number / Number% / !Number) -->
	 * piey 图的位置 Y轴
	 * @return
	 */
	public String getY() {
		return y;
	}

	/**
	 * <!-- [45%](Number / Number% / !Number) -->
	 * piey 图的位置 Y轴
	 * @param y
	 */
	public void setY(String y) {
		this.y = y;
	}

	/**
	 * <!-- [25%] (Number / Number%) -->
	 * 
	 * @return
	 */
	public String getRadius() {
		return radius;
	}

	/**
	 * <!-- [25%] (Number / Number%) -->
	 * 
	 * @param radius
	 */
	public void setRadius(String radius) {
		this.radius = radius;
	}

	/**
	 * <!-- [0] (Number / Number%) the radius of the hole (if you want to have
	 * donut, use > 0) -->
	 * 
	 * @return
	 */
	public String getInner_radius() {
		return inner_radius;
	}

	/**
	 * <!-- [0] (Number / Number%) the radius of the hole (if you want to have
	 * donut, use > 0) -->
	 * 
	 * @param inner_radius
	 */
	public void setInner_radius(String inner_radius) {
		this.inner_radius = inner_radius;
	}

	/**
	 * <!-- [0] (Number) pie height (for 3D effect) -->
	 * pie 图的高度或者厚度
	 * @return
	 */
	public String getHeight() {
		return height;
	}

	/**
	 * <!-- [0] (Number) pie height (for 3D effect) -->
	 * pie 图的高度或者厚度
	 * @param height
	 */
	public void setHeight(String height) {
		this.height = height;
	}

	/**
	 * <!-- [0] (0 - 90) lean angle (for 3D effect) -->
	 * pie 图的角度
	 * @return
	 */
	public String getAngle() {
		return angle;
	}

	/**
	 * <!-- [0] (0 - 90) lean angle (for 3D effect) -->
	 * pie 图的角度
	 * @param angle
	 */
	public void setAngle(String angle) {
		this.angle = angle;
	}

	/**
	 * <!-- [90] (0-360) angle of a first slice. This will work properly only if
	 * <pie><height> is set to 0. If height is > 0, then there can be two
	 * angles only: 90 and 270 -->
	 * 
	 * @return
	 */
	public String getStart_angle() {
		return start_angle;
	}

	/**
	 * <!-- [90] (0-360) angle of a first slice. This will work properly only if
	 * <pie><height> is set to 0. If height is > 0, then there can be two
	 * angles only: 90 and 270 -->
	 * 
	 * @param start_angle
	 */
	public void setStart_angle(String start_angle) {
		this.start_angle = start_angle;
	}

	/**
	 * <!-- [#FFFFFF] (hex color code) -->
	 * pie 图的轮廓颜色
	 * @return
	 */
	public String getOutline_color() {
		return outline_color;
	}

	/**
	 * <!-- [#FFFFFF] (hex color code) -->
	 * pie 图的轮廓颜色
	 * @param outline_color
	 */
	public void setOutline_color(String outline_color) {
		this.outline_color = outline_color;
	}

	/**
	 * <!-- [0] (Number) -->
	 * pie 图的轮廓透明度
	 * @return
	 */
	public String getOutline_alpha() {
		return outline_alpha;
	}

	/**
	 * <!-- [0] (Number) -->
	 * pie 图的轮廓透明度
	 * @param outline_alpha
	 */
	public void setOutline_alpha(String outline_alpha) {
		this.outline_alpha = outline_alpha;
	}

	/**
	 * <!-- [] (hex color code) color of first slice -->
	 * 
	 * @return
	 */
	public String getBase_color() {
		return base_color;
	}

	/**
	 * <!-- [] (hex color code) color of first slice -->
	 * 
	 * @param base_color
	 */
	public void setBase_color(String base_color) {
		this.base_color = base_color;
	}

	/**
	 * <!-- [20] (-100 - 100) if base_color is used, every next slice is filled
	 * with lighter by brightnessStep % color. Use negative value if you want to
	 * get darker colors -->
	 * pie 图的明亮度
	 * @return
	 */
	public String getBrightness_step() {
		return brightness_step;
	}

	/**
	 * <!-- [20] (-100 - 100) if base_color is used, every next slice is filled
	 * with lighter by brightnessStep % color. Use negative value if you want to
	 * get darker colors -->
	 * pie 图的明亮度
	 * @param brightness_step
	 */
	public void setBrightness_step(String brightness_step) {
		this.brightness_step = brightness_step;
	}

	/**
	 * <!--
	 * [#FF0F00,#FF6600,#FF9E01,#FCD202,#F8FF01,#B0DE09,#04D215,#0D8ECF,#0D52D1,#2A0CD0,#8A0CCF,#CD0D74,#754DEB,#DDDDDD,#999999,#333333,#990000]
	 * (hex color codes separated by comas) -->
	 * 
	 * @return
	 */
	public String getColors() {
		return colors;
	}

	/**
	 * <!--
	 * [#FF0F00,#FF6600,#FF9E01,#FCD202,#F8FF01,#B0DE09,#04D215,#0D8ECF,#0D52D1,#2A0CD0,#8A0CCF,#CD0D74,#754DEB,#DDDDDD,#999999,#333333,#990000]
	 * (hex color codes separated by comas) -->
	 * 
	 * @param colors
	 */
	public void setColors(String colors) {
		this.colors = colors;
	}

	/**
	 * <!-- [] (_blank, _top...) If pie slice has a link this is link target -->
	 * 设置跳转页面_blank, _top,_parent
	 */
	public String getLink_target() {
		return link_target;
	}

	/**
	 * <!-- [] (_blank, _top...) If pie slice has a link this is link target -->
	 * 设置跳转页面_blank, _top,_parent
	 * @param link_target
	 */
	public void setLink_target(String link_target) {
		this.link_target = link_target;
	}

	/**
	 * <!-- [100] (0 - 100) slices alpha. You can set individual alphas for
	 * every slice in data file. If you set alpha to 0 the slice will be
	 * inactive for mouse events and data labels will be hidden. This allows you
	 * to make not full pies and donuts. -->
	 * pie 图的透明度
	 * @return
	 */
	public String getAlpha() {
		return alpha;
	}

	/**
	 * <!-- [100] (0 - 100) slices alpha. You can set individual alphas for
	 * every slice in data file. If you set alpha to 0 the slice will be
	 * inactive for mouse events and data labels will be hidden. This allows you
	 * to make not full pies and donuts. -->
	 * pie 图的透明度
	 * @param alpha
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}

	/**
	 * <!-- [0] (from -255 to 255) The pie slice may darken/lighten when the use
	 * rolls over it. The intensity may be set here -->
	 * 鼠标上移时亮度和暗度
	 * @return
	 */
	public String getHover_brightness() {
		return hover_brightness;
	}

	/**
	 * <!-- [0] (from -255 to 255) The pie slice may darken/lighten when the use
	 * rolls over it. The intensity may be set here -->
	 * 鼠标上移时亮度和暗度
	 * @param hover_brightness
	 */
	public void setHover_brightness(String hover_brightness) {
		this.hover_brightness = hover_brightness;
	}

	/**
	 * <!-- [] (linear/radial) Allows slices to be filled with gradient colors
	 * -->
	 * 倾斜度
	 * @return
	 */
	public String getGradient() {
		return gradient;
	}

	/**
	 * <!-- [] (linear/radial) Allows slices to be filled with gradient colors
	 * -->
	 * 倾斜度
	 * @param gradient
	 */
	public void setGradient(String gradient) {
		this.gradient = gradient;
	}

	/**
	 * <!-- [0,-40] (Numbers from (-255 to 255) separated by commas) Controls
	 * the gradient ratio -->
	 * 倾斜度比率
	 * @return
	 */
	public String getGradient_ratio() {
		return gradient_ratio;
	}

	/**
	 * <!-- [0,-40] (Numbers from (-255 to 255) separated by commas) Controls
	 * the gradient ratio -->
	 * 倾斜度比率
	 * @param gradient_ratio
	 */
	public void setGradient_ratio(String gradient_ratio) {
		this.gradient_ratio = gradient_ratio;
	}

}
