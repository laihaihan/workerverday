package com.linewell.core.amchart.column;

import java.io.File;
import java.io.IOException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.linewell.core.amchart.common.Common;

/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Apr 4, 2010 4:17:27 PM 
 * @version  v1.0
 * 类说明 :
 */
public class ColumnSettings {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(ColumnSettings.class);
	/**
	 * 构造FLASH柱形图XML
	 * @param bean FLASH柱形图中常用对象
	 * @return
	 */
	private static String getColumnSettingsXML(ColumnBean bean){
		if(null==bean){
			bean=new ColumnBean();
		}
		StringBuffer xmlstr = new StringBuffer();
		xmlstr.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n")
		.append("<!-- 自动调整页面大小.柱图随之改变时,html页面的宽度和高度要设置成100% -->\r\n")
		.append("<settings>\r\n")
		.append("<type>"+bean.settings.getType()+"</type>\r\n")                    //<!-- [column] (column / bar) -->
		.append("<data_type>"+bean.settings.getData_type()+"</data_type>\r\n")       //[xml] (xml / csv)
		.append("<csv_separator>"+bean.settings.getCsv_separator()+"</csv_separator>\r\n")  //[;] (string) csv file data separator (you need it only if you are using csv file for your data) 
		.append("<skip_rows>"+bean.settings.getSkip_rows()+"</skip_rows> \r\n")         //[0] (Number) if you are using csv data type, you can set the number of rows which should be skipped here
		.append("<font>"+bean.settings.getFont()+"</font>\r\n")  //[Arial] (font name) use device fonts, such as Arial, Times New Roman, Tahoma, Verdana...
		.append("<text_size>"+bean.settings.getText_size()+"</text_size>  \r\n")        //[11] (Number) text size of all texts. Every text size can be set individually in the settings below
		.append("<text_color>"+bean.settings.getText_color()+"</text_color>  \r\n")      //文本颜色[#000000] (hex color code) main text color. Every text color can be set individually in the settings below
		.append("<decimals_separator>"+bean.settings.getDecimals_separator()+"</decimals_separator>\r\n")//[,] (string) decimal separator. Note, that this is for displaying data only. Decimals in data xml file must be separated with a dot
		.append("<thousands_separator>"+bean.settings.getThousands_separator()+"</thousands_separator>\r\n")//[ ] (string) thousand separator. use "none" if you don't want to separate
		.append("<digits_after_decimal>"+bean.settings.getDigits_after_decimal()+"</digits_after_decimal>\r\n")//[] (Number) if your value has less digits after decimal then is set here, zeroes will be added
		.append("<reload_data_interval>"+bean.settings.getReload_data_interval()+"</reload_data_interval>\r\n")//[0] (Number) how often data should be reloaded (time in seconds)
		.append("<preloader_on_reload>"+bean.settings.isPreloader_on_reload()+"</preloader_on_reload>\r\n")//[false] (true / false) Whether to show preloaded when data or settings are reloaded 
		.append("<redraw>"+bean.settings.isRedraw()+"</redraw>\r\n")//自动调整页面大小时.饼图随之改变[false] (true / false) 
		.append("<add_time_stamp>"+bean.settings.isAdd_time_stamp()+"</add_time_stamp> \r\n")//[false] (true / false) if true, a unique number will be added every time flash loads data. Mainly this feature is useful if you set reload _data_interval
		.append("<precision>"+bean.settings.getPrecision()+"</precision>\r\n")//[2] (Number) shows how many numbers should be shown after comma for calculated values (percents)
		.append("<depth>"+bean.settings.getDepth()+"</depth>\r\n") //<!-- [0] (Number) the depth of chart and columns (for 3D effect) -->
		.append("<angle>"+bean.settings.getAngle()+"</angle>\r\n") //<!-- [30] (0 - 90) angle of chart area and columns (for 3D effect) -->
		.append("<colors></colors>\r\n")//<!-- [#FF6600,#FCD202,#B0DE09,#0D8ECF,#2A0CD0,#CD0D74,#CC0000,#00CC00,#0000CC,#DDDDDD,#999999,#333333,#990000] Colors of graphs. if the graph color is not set, color from this array will be used -->
		
		//柱状图的柱子的设置
		.append("<column>\r\n")
		.append("<type>"+bean.column.getType()+"</type>\r\n")//<!-- 柱子的结构[clustered] (clustered, stacked, 100% stacked, 3d column) -->
		.append("<width>"+bean.column.getWidth()+"</width>\r\n")//<!-- 两个坐标点间柱子的间隔 百分比，100为没有间隔[80] (0 - 100) width of column (in percents)  -->
		.append("<spacing>"+bean.column.getSpacing()+"</spacing>\r\n")//<!-- 同一坐标点的柱子的间距[5] (Number) space between columns of one category axis value, in pixels. Negative values can be used. -->
		.append("<grow_time>"+bean.column.getGrow_time()+"</grow_time>\r\n")//<!-- 设置动画时间[0] (Number) grow time in seconds. Leave 0 to appear instantly -->
		.append("<grow_effect>"+bean.column.getGrow_effect()+"</grow_effect>\r\n")//<!-- 柱子的动画效果[elastic] (elastic, regular, strong) -->    
	    .append("<sequenced_grow>"+bean.column.isSequenced_grow()+"</sequenced_grow>\r\n")//柱子是同时展示，还是一根接一根<!-- [false] (true / false) whether columns should grow at the same time or one after another -->
		.append("<alpha>"+bean.column.getAlpha()+"</alpha>\r\n")//<!-- [100] (Number) alpha of all columns -->
		.append("<border_color>"+bean.column.getBorder_color()+"</border_color>\r\n")// <!-- [#FFFFFF] (hex color code) -->
		.append("<border_alpha>"+bean.column.getBorder_alpha()+"</border_alpha>\r\n")////柱子的边框<!-- [0] (Number) -->
		.append("<data_labels>"+bean.column.getData_labels()+"</data_labels>\r\n")
		.append("<data_labels_text_color>"+bean.column.getData_labels_text_color()+"</data_labels_text_color>\r\n")
		.append("<data_labels_text_size>"+bean.column.getData_labels_text_size()+"</data_labels_text_size>\r\n")
		.append("<data_labels_position>"+bean.column.getData_labels_position()+"</data_labels_position>\r\n") //柱子数据标签的位置
		.append("<balloon_text>"+bean.column.getBalloon_text()+"</balloon_text>\r\n")
		.append("<link_target>"+bean.column.getLink_target()+"</link_target>\r\n")
		.append("<gradient>"+bean.column.getGradient()+"</gradient>\r\n")
		.append("<bullet_offset>"+bean.column.getBullet_offset()+"</bullet_offset>\r\n")
		.append("<hover_brightness>"+bean.column.hover_brightness+"</hover_brightness>\r\n")//指示柱子时柱子的亮暗变化
		.append("<bullet_offset>"+bean.column.getBullet_offset()+"</bullet_offset>\r\n")
		.append("</column>\r\n")
		
		 //曲线
		.append("<line>\r\n")
		.append("<connect>"+bean.line.isConnect()+"</connect>\r\n")
		.append("<width>"+bean.line.getWidth()+"</width>\r\n")
		.append("<alpha>"+bean.line.getAlpha()+"</alpha>\r\n")
		.append("<fill_alpha>"+bean.line.getAlpha()+"</fill_alpha>\r\n")
		.append("<bullet>"+bean.line.getBullet()+"</bullet>\r\n")
		.append("<bullet_size>"+bean.line.getBullet_size()+"</bullet_size>\r\n")
		.append("<data_labels><![CDATA["+bean.line.getData_labels()+"]]></data_labels>\r\n")
		.append("<data_labels_text_color>"+bean.line.getData_labels_text_color()+"</data_labels_text_color>\r\n")
		.append("<data_labels_text_size>"+bean.line.getData_labels_text_size()+"</data_labels_text_size>\r\n")
		.append("<balloon_text><![CDATA["+bean.line.getBalloon_text()+"]]></balloon_text>\r\n")
		.append("<link_target>"+bean.line.getLink_target()+"</link_target>\r\n")
		.append("</line>\r\n")
		
		.append("<background>\r\n")
		.append("<color>"+bean.background.getColor()+"</color>\r\n")//[#FFFFFF] (hex color code)
		.append("<alpha>"+bean.background.getAlpha()+"</alpha>\r\n")//[0] (0 - 100)
		.append("<border_color>"+bean.background.getBorder_color()+"</border_color>\r\n")//[#000000] (hex color code)
		.append("<border_alpha>"+bean.background.getBorder_alpha()+"</border_alpha>\r\n")//[0] (0 - 100)
		.append("<file>"+bean.background.getFile()+"</file>\r\n")// [] (filename)The chart will look for this file in path folder (path is set in HTML)
		.append("</background>\r\n")
		
		.append("<plot_area>\r\n")
		.append("<color>"+bean.plotarea.getColor()+"</color>\r\n")
		.append("<alpha>"+bean.plotarea.getAlpha()+"</alpha>\r\n")
		.append("<border_color>"+bean.plotarea.getBorder_color()+"</border_color>\r\n")
		.append("<border_alpha>"+bean.plotarea.getBorder_alpha()+"</border_alpha>\r\n")
		.append("<margins>\r\n")
		.append("<left>"+bean.plotarea.getMarginsLeft()+"</left>\r\n")
		.append("<top>"+bean.plotarea.getMarginsTop()+"</top>\r\n")
		.append("<right>"+bean.plotarea.getMarginsRight()+"</right>\r\n")
		.append("<bottom>"+bean.plotarea.getMarginsBottom()+"</bottom>\r\n")
		.append("</margins>\r\n")
		.append("</plot_area>\r\n")
		
		//网格线
		.append("<grid>\r\n")
		.append("<category>\r\n")
		.append("<color>"+bean.grid.getCategoryColor()+"</color>\r\n")
		.append("<alpha>"+bean.grid.getCategoryAlpha()+"</alpha>\r\n")
		.append("<dashed>"+bean.grid.isCategoryDashed()+"</dashed>\r\n")
		.append("<dash_length>"+bean.grid.getCategoryDash_length()+"</dash_length>\r\n")
		.append("</category>\r\n")
		.append("<value>\r\n")
		.append("<color>"+bean.grid.getValueColor()+"</color>\r\n")
		.append("<alpha>"+bean.grid.getValueAlpha()+"</alpha>\r\n")
		.append("<dashed>"+bean.grid.isValueDashed()+"</dashed>\r\n")
		.append("<dash_length>"+bean.grid.getValueDash_length()+"</dash_length>\r\n")
		.append("<approx_count>"+bean.grid.getValueApprox_count()+"</approx_count>\r\n")
		.append("<fill_color>"+bean.grid.getValueFill_color()+"</fill_color>\r\n")
		.append("<fill_alpha>"+bean.grid.getValueFill_alpha()+"</fill_alpha>\r\n")
		.append("</value>\r\n")
		.append("</grid>\r\n")
		.append("<values>\r\n")
		.append("<category>\r\n")
		.append("<enabled>"+bean.values.isCategoryEnabled()+"</enabled>\r\n")//x轴坐标文本是否显示
		.append("<frequency>"+bean.values.getCategoryFrequency()+"</frequency>\r\n")//x轴文本显示的网格线比例
		.append("<start_from>"+bean.values.getCategoryStart_from()+"</start_from>\r\n")
		.append("<rotate>"+bean.values.getCategoryRotate()+"</rotate>\r\n")
		.append("<color>"+bean.values.getCategoryColor()+"</color>\r\n") //x轴坐标文本的颜色
		.append("<text_size>"+bean.values.getCategoryText_size()+"</text_size>\r\n")
		.append("<inside>"+bean.values.isCategoryInside()+"</inside>\r\n")//x轴文本是否显示在网格内
		.append("</category>\r\n")
		.append("<value>\r\n")
		.append("<enabled>"+bean.values.isValueEnabled()+"</enabled>\r\n")
		.append("<reverse>"+bean.values.isValueReverse()+"</reverse>\r\n")
		.append("<min>"+bean.values.getValueMin()+"</min>\r\n")
		.append("<max>"+bean.values.getValueMax()+"</max>\r\n")
		.append("<strict_min_max>"+bean.values.isValueStrict_min_max()+"</strict_min_max>\r\n")
		.append("<frequency>"+bean.values.getValueFrequency()+"</frequency>\r\n")
		.append("<rotate>"+bean.values.getValueRotate()+"</rotate>\r\n")
		.append("<skip_first>"+bean.values.isValueSkip_first()+"</skip_first>\r\n")
		.append("<skip_last>"+bean.values.isValueSkip_last()+"</skip_last>\r\n")
		.append("<color>"+bean.values.getValueColor()+"</color>\r\n")
		.append("<text_size>"+bean.values.getValueText_size()+"</text_size>\r\n")
		.append("<unit>"+bean.values.getValueUnit()+"</unit>\r\n")
		.append("<unit_position>"+bean.values.getValueUnit_position()+"</unit_position>\r\n")
		.append("<integers_only>"+bean.values.isValueIntegers_only()+"</integers_only>\r\n")
		.append("<inside>"+bean.values.isValueInside()+"</inside>\r\n")//y轴坐标显示在网格内外
		.append("</value>\r\n")
		.append("</values>\r\n")
		
		
		 // 轴设置
		.append("<axes>\r\n")
		.append("<category>\r\n")
		.append("<color>"+bean.axes.getCategoryColor()+"</color>\r\n")//x轴坐标线颜色
		.append("<alpha>"+bean.axes.getCategoryAlpha()+"</alpha>\r\n") //x轴坐标线透明度
		.append("<width>"+bean.axes.getCategoryWidth()+"</width>\r\n")//x轴坐标线的厚度
		.append("<tick_length>"+bean.axes.getCategoryTick_length()+"</tick_length>\r\n") // x轴坐标刻度线的延长线
		.append("</category>\r\n")
		.append("<value>\r\n")
		.append("<color>"+bean.axes.getValueColor()+"</color>\r\n") //y轴坐标线颜色
		.append("<alpha>"+bean.axes.getValueAlpha()+"</alpha>\r\n")//y轴（值） 坐标线透明度
		.append("<width>"+bean.axes.getValueWidth()+"</width>\r\n")
		.append("<tick_length>"+bean.axes.getValueTick_length()+"</tick_length>\r\n")
		.append("<logarithmic>"+bean.axes.isValueLogarithmic()+"</logarithmic>\r\n")//false 为线性刻度，true为对数刻度
		.append("</value>\r\n")
		.append("</axes>\r\n")
		
		
		//弹出数据指示框的设置
		.append("<balloon>\r\n")
		.append("<enabled>"+bean.balloon.isEnabled()+"</enabled>\r\n")//[true] (true / false)弹出框是否可用
		.append("<color>"+bean.balloon.getColor()+"</color>\r\n")//[] (hex color code) 
		.append("<alpha>"+bean.balloon.getAlpha()+"</alpha>\r\n")//[80] (0 - 100) 弹出框的透明度
		.append("<text_color>"+bean.balloon.getText_color()+"</text_color>\r\n")//[#FFFFFF] (hex color code)
		.append("<text_size>"+bean.balloon.getText_size()+"</text_size>\r\n")//[text_size] (Number)
		.append("<show><![CDATA["+bean.balloon.getShow()+"]]></show>\r\n")// 默认显示标题\百分比\描述  [{title}: {percents}% ({value}) <br>{description}] ({value} {title} {percents} {description}) 
		.append("<max_width>"+bean.balloon.getMax_width()+"</max_width>\r\n") //[220] (Number)
		.append("<corner_radius>"+bean.balloon.getCorner_radius()+"</corner_radius>\r\n")// 标签的显示方式[0] (Number)
		.append("<border_width>"+bean.balloon.getBorder_width()+"</border_width>\r\n")//标签的宽度[0] (Number)
		.append("<border_alpha>"+bean.balloon.getBorder_alpha()+"</border_alpha>\r\n")//弹出框边框的透明度[balloon.alpha] (Number) 
		.append("<border_color>"+bean.balloon.getBorder_color()+"</border_color>\r\n")// 弹出框边框的颜色[balloon.color] (hex color code)
		.append("</balloon>\r\n")
		
		//图标
		.append("<legend>\r\n")//设置饼图下的说明  LEGEND
		.append("<enabled>"+bean.legend.isEnabled()+"</enabled>\r\n")//是否显示说明 [true] (true / false)
		.append("<x>"+bean.legend.getX()+"</x>")//说明距离X轴的位置[5%] (Number / Number% / !Number)
		.append("<y>"+bean.legend.getY()+"</y>\r\n")//[] (Number / Number% / !Number) if empty, will be placed below the pie 
		.append("<width>"+bean.legend.getWidth()+"</width>\r\n")//说明的宽度[90%] (Number / Number%)
		.append("<color>"+bean.legend.getColor()+"</color>\r\n")//[#FFFFFF] (hex color code)background color. 
		.append("<max_columns>"+bean.legend.getMax_columns()+"</max_columns>\r\n")//[] (Number)
		.append("<alpha>"+bean.legend.getAlpha()+"</alpha>\r\n")//[0] (0 - 100) background alpha
		.append("<border_color>"+bean.legend.getBorder_color()+"</border_color>\r\n")//[#000000] (hex color code) border color 
		.append("<border_alpha>"+bean.legend.getBorder_alpha()+"</border_alpha>\r\n")//[0] (0 - 100) border alpha
		.append("<text_color>"+bean.legend.getText_color()+"</text_color>\r\n")//[text_color] (hex color code)
		.append("<text_size>"+bean.legend.getText_size()+"</text_size>\r\n")//说明的文本字体大小[text_size] (Number) 
		.append("<spacing>"+bean.legend.getSpacing()+"</spacing>\r\n")//[10] (Number)
		.append("<margins>"+bean.legend.getMargins()+"</margins>\r\n")//说明与边际的距离[0] (Number)
		.append("<reverse_order>"+bean.legend.isReverse_order()+"</reverse_order>\r\n")//[false] (true / false)
		.append("<align>"+bean.legend.getAlign()+"</align>\r\n")//图表对齐位置[left] (left / center / right)
		.append("<key>\r\n")
		.append("<size>"+bean.legend.getKey_size()+"</size>\r\n")//[16] (Number) key size
		.append("<border_color>"+bean.legend.getBorder_color()+"</border_color>\r\n")//[] (hex color code)
		.append("</key>\r\n")
		.append("<values>\r\n")
		.append("<enabled>"+bean.legend.isValues_enabled()+"</enabled>\r\n")//[false] (true / false)
		.append("<width>"+bean.legend.getValues_width()+"</width>\r\n")//[] (Number)
		.append("<text><![CDATA["+bean.legend.getValues_text()+"]]></text>\r\n")//[{percents}%] ({value} {percents}) 
		.append("</values>\r\n")
		.append("</legend>\r\n")
		
		 //图片导出
		.append("<export_as_image>\r\n")
		.append("<file>"+bean.exportAsImage.getFile()+"</file>\r\n")//[] (filename) 
		.append("<target>"+bean.exportAsImage.getTarget()+"</target>\r\n")//[] (_blank, _top ...) 
		.append("<x>"+bean.exportAsImage.getX()+"</x>\r\n")//[0] (Number / Number% / !Number)
		.append("<y>"+bean.exportAsImage.getY()+"</y>\r\n")//[] (Number / Number% / !Number)
		.append("<color>"+bean.exportAsImage.getColor()+"</color>\r\n")//[#BBBB00] (hex color code)
		.append("<alpha>"+bean.exportAsImage.getAlpha()+"</alpha>\r\n")//[0] (0 - 100)
		.append("<text_color>"+bean.exportAsImage.getText_color()+"</text_color>\r\n")//[text_color]
		.append("<text_size>"+bean.exportAsImage.getText_size()+"</text_size>\r\n")// [text_size] (Number)
		.append("</export_as_image>\r\n")
		
		
		 //错误信息
		.append("<error_messages>\r\n")
		.append("<enabled>"+bean.errormessages.isEnabled()+"</enabled>\r\n")//[true] (true / false)
		.append("<x>"+bean.errormessages.getX()+"</x>\r\n")//[] (Number / Number% / !Number)
		.append("<y>"+bean.errormessages.getY()+"</y>\r\n")//[] (Number / Number% / !Number) 
		.append("<color>"+bean.errormessages.getColor()+"</color>\r\n")//[#BBBB00] (hex color code)
		.append("<alpha>"+bean.errormessages.getAlpha()+"</alpha>\r\n")//[100] (0 - 100) 
		.append("<text_color>"+bean.errormessages.getText_color()+"</text_color>\r\n")//[#FFFFFF] (hex color code)
		.append("<text_size>"+bean.errormessages.getText_size()+"</text_size>\r\n")//[text_size] (Number) 
		.append("</error_messages>\r\n")
		
		.append("<strings>\r\n")
		.append("<no_data>"+bean.strings.getNo_data()+"</no_data>\r\n")//No data for selected period] (text) if data is missing, this message will be displayed
		.append("<export_as_image>"+bean.strings.getExport_as_image()+"</export_as_image>\r\n")//[Export as image] (text) text for right click menu 
		.append("<collecting_data>"+bean.strings.getCollecting_data()+"</collecting_data>\r\n")//[Collecting data] (text) this text is displayed while exporting chart to an image
		.append("</strings>\r\n")
		
		//右键菜单
		.append("<context_menu>\r\n")
		.append("<default_items>\r\n") //用户自定义可选项
		.append("<zoom>"+bean.contextMenu.isDefault_items_zoom()+"</zoom>\r\n")//缩放功能[true] (true / false)
		.append("<print>"+bean.contextMenu.isDefault_items_print()+"</print>\r\n")//打印功能[true] (true / false)
		.append("</default_items>\r\n")
		.append("</context_menu>\r\n")
		
		.append("<labels>\r\n");
		Common common=new Common();
		String labelstr=common.LabelsString(bean.list);
		xmlstr.append(labelstr)
		.append("</labels>\r\n")
		
		.append("<graphs>\r\n")                                                   
		.append("<graph>\r\n")
		.append("<type>"+bean.graphs.getType()+"</type>\r\n") 
		.append("<title>"+bean.graphs.getTitle()+"</title>\r\n")
		.append("<color>"+bean.graphs.getColor()+"</color>\r\n") 
		.append("<alpha>"+bean.graphs.getAlpha()+"</alpha>\r\n")
		.append("<data_labels><![CDATA["+bean.graphs.getData_labels()+"]]></data_labels>\r\n") 
		.append("<gradient_fill_colors>"+bean.graphs.getGradient_fill_colors()+"</gradient_fill_colors>\r\n")
		.append("<balloon_color>"+bean.graphs.getBalloon_color()+"</balloon_color>\r\n") 
		.append("<balloon_alpha>"+bean.graphs.getBalloon_alpha()+"</balloon_alpha>\r\n")
		.append("<balloon_text_color>"+bean.graphs.getBalloon_text_color()+"</balloon_text_color>\r\n") 
		.append("<balloon_text><![CDATA["+bean.graphs.getBalloon_text()+"]]></balloon_text>\r\n")
		.append("<fill_alpha>"+bean.graphs.getFill_alpha()+"</fill_alpha>\r\n") 
		.append("<width>"+bean.graphs.getWidth()+"</width>\r\n")
		.append("<bullet>"+bean.graphs.getBullet()+"</bullet>\r\n") 
		.append("<bullet_size>"+bean.graphs.getBullet_size()+"</bullet_size>\r\n")
		.append("<bullet_color>"+bean.graphs.getBalloon_color()+"</bullet_color>\r\n") 
		.append("<visible_in_legend>"+bean.graphs.isVisible_in_legend()+"</visible_in_legend>\r\n")
		.append("</graph>\r\n") 
		.append("</graphs>\r\n")
		
		//显示栏线
		.append("<guides>\r\n") 
		.append("<max_min>"+bean.guides.isMax_min()+"</max_min> \r\n")
		.append("<guide>\r\n") 
		.append("<behind>"+bean.guides.isBehind()+"</behind>\r\n")
		.append("<start_value>"+bean.guides.getStart_value()+"</start_value> \r\n")
		.append("<end_value>"+bean.guides.getEnd_value()+"</end_value>\r\n")
		.append("<title>"+bean.guides.getTitle()+"</title>\r\n")
		.append("<width>"+bean.guides.getWidth()+"</width>\r\n")
		.append("<color>"+bean.guides.getColor()+"</color>\r\n")
		.append("<alpha>"+bean.guides.getAlpha()+"</alpha>\r\n")
		.append("<fill_color>"+bean.guides.getFill_color()+"</fill_color>\r\n")
		.append("<fill_alpha>"+bean.guides.getFill_alpha()+"</fill_alpha>\r\n")
		.append("<inside>"+bean.guides.getInside()+"</inside>\r\n")
		.append("<centered>"+bean.guides.isCentered()+"</centered>\r\n")
		.append("<rotate>"+bean.guides.getRotate()+"</rotate> \r\n")
		.append("<text_size>"+bean.guides.getText_size()+"</text_size>\r\n")
		.append("<text_color>"+bean.guides.getText_color()+"</text_color>\r\n")
		.append("<dashed>"+bean.guides.isDashed()+"</dashed>\r\n")
		.append("<dash_length>"+bean.guides.getDash_length()+"</dash_length>\r\n")
		.append("</guide>\r\n")
		.append("</guides>\r\n")
		.append("</settings>\r\n");
		return xmlstr.toString();
	}
	
	/**
	 * 创建ColumnSettings Xml文件
	 * @param bean
	 * @return
	 * @throws IOException
	 */
	public static boolean CreateColumnSettingsXml(ColumnBean bean) throws IOException{
		if(null==bean){
			bean=new ColumnBean();
		}
		if(null==bean.getFilePath()||bean.getFilePath().equals("")){
			return false;
		}
		String xmlstr=getColumnSettingsXML(bean);
		boolean flag=true;
        //判断文件夹是否存在
        File pathFile = new File(bean.getFilePath());
        if (!pathFile.exists()) {
            pathFile.mkdirs();
        }
		flag=Common.writeFile(bean.getFilePath()+ File.separatorChar + bean.getFileName(), xmlstr);
        
		return flag;
	}
}