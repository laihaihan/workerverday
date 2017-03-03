package com.linewell.core.amchart.line;

import java.util.ArrayList;
import java.util.List;

import com.linewell.core.amchart.common.Background;
import com.linewell.core.amchart.common.Balloon;
import com.linewell.core.amchart.common.ContextMenu;
import com.linewell.core.amchart.common.ErrorMessages;
import com.linewell.core.amchart.common.ExportAsImage;
import com.linewell.core.amchart.common.*;
import com.linewell.core.amchart.common.Settings;
import com.linewell.core.amchart.common.Strings;
import com.linewell.core.amchart.pie.DataLabels;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Apr 4, 2010 4:19:55 PM
 * @version v1.0 类说明 :FLASH线形图中常用对象,可根据需要进行扩展
 */
public class LineBean extends Settings {
	public boolean connect = false;
	/**
	 * 
	 */
	public String hide_bullets_count = "";
	/**
	 * 
	 */
	public String link_target = "";
	/**
	 * 
	 */
	public String start_on_axis = "";
	/**
	 * 
	 */
	public boolean rescale_on_hide = true;
	/**
	 * 
	 */
	public Settings settings=new Settings();

	/**
	 * 
	 */
	public Plotarea plotarea=new Plotarea();
	
	/**
	 * 
	 */
	public Values values=new Values();

	/**
	 * 
	 */
	public DataLabels dataLabels=new DataLabels();
	
	/**
	 * 
	 */
	public Axes axes=new Axes();

	/**
	 * 
	 */
	public Grid grid=new Grid();
	/**
	 * 
	 */
	public Help help = new Help();
	/**
	 * 
	 */
	public Indicator indicator = new Indicator();
	/**
	 * 
	 */
	public Scroller scroller = new Scroller();
	/**
	 * 
	 */
	public Vertical_lines vertical_lines = new Vertical_lines();
	/**
	 * 
	 */
	public Zoom_out_button zoom_out_button = new Zoom_out_button();
	/**
	 * 
	 */
	public Background background=new Background();

	/**
	 * 
	 */
	public Balloon balloon=new Balloon();

	/**
	 * 
	 */
	public Legend legend=new Legend();

	/**
	 * 
	 */
	public ExportAsImage exportAsImage=new ExportAsImage();

	/**
	 * 
	 */
	public ErrorMessages errormessages=new ErrorMessages();

	/**
	 * 
	 */
	public Strings strings=new Strings();

	/**
	 * 
	 */
	public ContextMenu contextMenu=new ContextMenu();


	public List<Labels> list=new ArrayList<Labels>();
	
	public List<Graphs> graphsList=new ArrayList<Graphs>();
	
	public Graphs graphs=new Graphs();
	
	public Guides guides=new Guides();
//	private String columnType = "3d column";
//
//	private String columnWidth = "50";
//
//	private String columnSpacing = "0";
//
//	private String columnGrow_Time = "3";
//
//	private String columnGrow_Effect = "elastic";
//
//	private String columnSequenced_Grow = "";
//
//	private String columnAlpha = "";
//
//	private String columnBorder_Color = "";
//
//	private String columnBorder_Alpha = "";
//
//	private String columnDate_Lables = "<![CDATA[      {description}项]]>";
//
//	private String columnDate_Lables_TxtCol = "";
//
//	private String columnDate_Lables_TxtSiz = "12";
//
//	private String columnDate_Lables_position = "";
//
//	private String columnBalloon_Text = "<![CDATA[{series} : {value}万]]>";
//
//	private String columnLink_Target = "_parent";
//
//	private String columnGradient = "";
//
//	private String columnBullet_Offset = "";
//
//	private String columnHover_brightness = "-25";
//	
//	public Balloon balloon=new Balloon();
//
//	public Legend legend=new Legend();
//	
//	public Labels label=new Labels();
//
//	/**
//	 * [clustered] (clustered, stacked, 100% stacked, 3d column)
//	 * 
//	 * @return String
//	 */
//	public String getColumnType() {
//		return columnType;
//	}
//
//	/**
//	 * [clustered] (clustered, stacked, 100% stacked, 3d column)
//	 * 
//	 * @param columnType
//	 */
//	public void setColumnType(String columnType) {
//		this.columnType = columnType;
//	}
//
//	/**
//	 * [80] (0 - 100) width of column (in percents)
//	 * 
//	 * @return String
//	 */
//	public String getColumnWidth() {
//		return columnWidth;
//	}
//
//	/**
//	 * [80] (0 - 100) width of column (in percents)
//	 * 
//	 * @param columnWidth
//	 */
//	public void setColumnWidth(String columnWidth) {
//		this.columnWidth = columnWidth;
//	}
//
//	/**
//	 * [5] (Number) space between columns of one category axis value, in pixels.
//	 * Negative values can be used.
//	 * 
//	 * @return String
//	 */
//	public String getColumnSpacing() {
//		return columnSpacing;
//	}
//
//	/**
//	 * [5] (Number) space between columns of one category axis value, in pixels.
//	 * Negative values can be used.
//	 * 
//	 * @param columnSpacing
//	 *            String
//	 */
//	public void setColumnSpacing(String columnSpacing) {
//		this.columnSpacing = columnSpacing;
//	}
//
//	/**
//	 * 设置动画时间 [0] (Number) grow time in seconds. Leave 0 to appear instantly
//	 * 
//	 * @return
//	 */
//	public String getColumnGrow_Time() {
//		return columnGrow_Time;
//	}
//
//	/**
//	 * 设置动画时间 [0] (Number) grow time in seconds. Leave 0 to appear instantly
//	 * 
//	 * @param columnGrow_Time
//	 */
//	public void setColumnGrow_Time(String columnGrow_Time) {
//		this.columnGrow_Time = columnGrow_Time;
//	}
//
//	/**
//	 * 设置动画 [elastic] (elastic, regular, strong)
//	 * 
//	 * @return
//	 */
//	public String getColumnGrow_Effect() {
//		return columnGrow_Effect;
//	}
//
//	/**
//	 * 设置动画 [elastic] (elastic, regular, strong)
//	 * 
//	 * @param columnGrow_Effect
//	 */
//	public void setColumnGrow_Effect(String columnGrow_Effect) {
//		this.columnGrow_Effect = columnGrow_Effect;
//	}
//
//	/**
//	 * [false] (true / false) whether columns should grow at the same time or
//	 * one after another
//	 * 
//	 * @return
//	 */
//	public String getColumnSequenced_Grow() {
//		return columnSequenced_Grow;
//	}
//
//	/**
//	 * [false] (true / false) whether columns should grow at the same time or
//	 * one after another
//	 * 
//	 * @param columnSequenced_Grow
//	 */
//	public void setColumnSequenced_Grow(String columnSequenced_Grow) {
//		this.columnSequenced_Grow = columnSequenced_Grow;
//	}
//
//	/**
//	 * [100] (Number) alpha of all columns
//	 * 
//	 * @return
//	 */
//	public String getColumnAlpha() {
//		return columnAlpha;
//	}
//
//	/**
//	 * [100] (Number) alpha of all columns
//	 * 
//	 * @param columnAlpha
//	 */
//	public void setColumnAlpha(String columnAlpha) {
//		this.columnAlpha = columnAlpha;
//	}
//
//	/**
//	 * [100] (Number) alpha of all columns
//	 * 
//	 * @return
//	 */
//	public String getColumnBorder_Color() {
//		return columnBorder_Color;
//	}
//
//	/**
//	 * [100] (Number) alpha of all columns
//	 * 
//	 * @param columnBorder_Color
//	 */
//	public void setColumnBorder_Color(String columnBorder_Color) {
//		this.columnBorder_Color = columnBorder_Color;
//	}
//
//	/**
//	 * [0] (Number)
//	 * 
//	 * @return
//	 */
//	public String getColumnBorder_Alpha() {
//		return columnBorder_Alpha;
//	}
//
//	/**
//	 * [0] (Number)
//	 * 
//	 * @param columnBorder_Alpha
//	 */
//	public void setColumnBorder_Alpha(String columnBorder_Alpha) {
//		this.columnBorder_Alpha = columnBorder_Alpha;
//	}
//
//	/**
//	 * [] ({title} {value} {series} {percents} {start} {difference} {total}) You
//	 * can format any data label: {title} will be replaced with real title,
//	 * {value} - with value and so on. You can add your own text or html code
//	 * too.
//	 * 
//	 * @return
//	 */
//	public String getColumnDate_Lables() {
//		return columnDate_Lables;
//	}
//
//	/**
//	 * [] ({title} {value} {series} {percents} {start} {difference} {total}) You
//	 * can format any data label: {title} will be replaced with real title,
//	 * {value} - with value and so on. You can add your own text or html code
//	 * too.
//	 * 
//	 * @param columnDate_Lables
//	 */
//	public void setColumnDate_Lables(String columnDate_Lables) {
//		this.columnDate_Lables = columnDate_Lables;
//	}
//
//	/**
//	 * [text_color] (hex color code)
//	 * 
//	 * @return
//	 */
//	public String getColumnDate_Lables_TxtCol() {
//		return columnDate_Lables_TxtCol;
//	}
//
//	/**
//	 * [text_color] (hex color code)
//	 * 
//	 * @param columnDate_Lables_TxtCol
//	 */
//	public void setColumnDate_Lables_TxtCol(String columnDate_Lables_TxtCol) {
//		this.columnDate_Lables_TxtCol = columnDate_Lables_TxtCol;
//	}
//
//	/**
//	 * [text_size] (Number)
//	 * 
//	 * @return
//	 */
//	public String getColumnDate_Lables_TxtSiz() {
//		return columnDate_Lables_TxtSiz;
//	}
//
//	/**
//	 * [text_size] (Number)
//	 * 
//	 * @param columnDate_Lables_TxtSiz
//	 */
//	public void setColumnDate_Lables_TxtSiz(String columnDate_Lables_TxtSiz) {
//		this.columnDate_Lables_TxtSiz = columnDate_Lables_TxtSiz;
//	}
//
//	/**
//	 * [] (inside, outside, above). This setting is only for clustered chart .
//	 * if you set "above" for column chart, the data label will be displayed
//	 * inside column, rotated by 90 degrees
//	 * 
//	 * @return
//	 */
//	public String getColumnDate_Lables_position() {
//		return columnDate_Lables_position;
//	}
//
//	/**
//	 * [] (inside, outside, above). This setting is only for clustered chart .
//	 * if you set "above" for column chart, the data label will be displayed
//	 * inside column, rotated by 90 degrees
//	 * 
//	 * @param columnDate_Lables_position
//	 */
//	public void setColumnDate_Lables_position(String columnDate_Lables_position) {
//		this.columnDate_Lables_position = columnDate_Lables_position;
//	}
//
//	/**
//	 * [] ({title} {value} {series} {percents} {start} {difference} {total}) You
//	 * can format any data label: {title} will be replaced with real title,
//	 * {value} - with value and so on. You can add your own text or html code
//	 * too.
//	 * 
//	 * @return
//	 */
//	public String getColumnBalloon_Text() {
//		return columnBalloon_Text;
//	}
//
//	/**
//	 * [] ({title} {value} {series} {percents} {start} {difference} {total}) You
//	 * can format any data label: {title} will be replaced with real title,
//	 * {value} - with value and so on. You can add your own text or html code
//	 * too. 
//	 * 
//	 * @param columnBalloon_Text
//	 */
//	public void setColumnBalloon_Text(String columnBalloon_Text) {
//		this.columnBalloon_Text = columnBalloon_Text;
//	}
//
//	/**
//	 * [] (_blank, _top ...) 
//	 * @return
//	 */
//	public String getColumnLink_Target() {
//		return columnLink_Target;
//	}
//
//	/**
//	 * [] (_blank, _top ...) 
//	 * @param columnLink_Target
//	 */
//	public void setColumnLink_Target(String columnLink_Target) {
//		this.columnLink_Target = columnLink_Target;
//	}
//
//	/**
//	 *[vertical] (horizontal / vertical) Direction of column gradient. Gradient colors are defined in graph settings below.
//	 * @return
//	 */
//	public String getColumnGradient() {
//		return columnGradient;
//	}
//
//	/**
//	 * [vertical] (horizontal / vertical) Direction of column gradient. Gradient colors are defined in graph settings below.
//	 * @param columnGradient
//	 */
//	public void setColumnGradient(String columnGradient) {
//		this.columnGradient = columnGradient;
//	}
//
//	/**
//	 * [0] (Number) distance from column / bar to the bullet
//	 * @return
//	 */
//	public String getColumnBullet_Offset() {
//		return columnBullet_Offset;
//	}
//
//	/**
//	 * [0] (Number) distance from column / bar to the bullet
//	 * @param columnBullet_Offset
//	 */
//	public void setColumnBullet_Offset(String columnBullet_Offset) {
//		this.columnBullet_Offset = columnBullet_Offset;
//	}
//
//	/**
//	 * [0] (from -255 to 255) The column may darken/lighten when the use rolls over it. The intensity may be set here
//	 * @return
//	 */
//	public String getColumnHover_brightness() {
//		return columnHover_brightness;
//	}
//
//	/**
//	 * [0] (from -255 to 255) The column may darken/lighten when the use rolls over it. The intensity may be set here
//	 * @param columnHover_brightness
//	 */
//	public void setColumnHover_brightness(String columnHover_brightness) {
//		this.columnHover_brightness = columnHover_brightness;
//	}

}
