package com.linewell.core.amchart.pie;
import java.io.File;
import java.io.IOException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.linewell.core.amchart.common.Common;


/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jun 2, 2009 2:33:58 PM 
 * @version  v1.0
 * 类说明 :生成解析饼图的XML
 */
public class PieSettings {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(PieSettings.class);
	
	/**
	 * 构造FLASH饼图XML
	 * @param bean FLASH饼图中常用对象
	 * @return
	 */
	private static String getPieSettingsXML(PieBean bean){
		if(null==bean){
			bean=new PieBean();
		}
		StringBuffer xmlstr = new StringBuffer();
		xmlstr.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n")
		.append("<!-- 自动调整页面大小.饼图随之改变时,html页面的宽度和高度要设置成100% -->\r\n")
		.append("<settings>\r\n")
		.append("<data_type>"+bean.settings.getData_type()+"</data_type>\r\n")       //[xml] (xml / csv)
		.append("<csv_separator>"+bean.settings.getCsv_separator()+"</csv_separator>\r\n")  //[;] (string) csv file data separator (you need it only if you are using csv file for your data) 
		.append("<skip_rows>"+bean.settings.getSkip_rows()+"</skip_rows> \r\n")        //[0] (Number) if you are using csv data type, you can set the number of rows which should be skipped here
		.append("<font>"+bean.settings.getFont()+"</font>\r\n")                    //[Arial] (font name) use device fonts, such as Arial, Times New Roman, Tahoma, Verdana...
		.append("<text_size>"+bean.settings.getText_size()+"</text_size>  \r\n")        //[11] (Number) text size of all texts. Every text size can be set individually in the settings below
		.append("<text_color>"+bean.settings.getText_color()+"</text_color>  \r\n")      //文本颜色[#000000] (hex color code) main text color. Every text color can be set individually in the settings below
		.append("<decimals_separator>"+bean.settings.getDecimals_separator()+"</decimals_separator>\r\n")//[,] (string) decimal separator. Note, that this is for displaying data only. Decimals in data xml file must be separated with a dot
		.append("<thousands_separator>"+bean.settings.getThousands_separator()+"</thousands_separator>\r\n")//[ ] (string) thousand separator. use "none" if you don't want to separate
		.append("<digits_after_decimal>"+bean.settings.getDigits_after_decimal()+"</digits_after_decimal>\r\n")//[] (Number) if your value has less digits after decimal then is set here, zeroes will be added
		.append("<scientific_min>"+bean.settings.getScientific_min()+"</scientific_min>\r\n")  //                         <!-- [0.000001] If absolute value of your number is equal or less then scientific_min, this number will be formatted using scientific notation, for example: 0.0000023 -> 2.3e-6 -->
		.append("<scientific_max>"+bean.settings.getScientific_max()+"</scientific_max>\r\n")  //                         <!-- [1000000000000000] If absolute value of your number is equal or bigger then scientific_max, this number will be formatted using scientific notation, for example: 15000000000000000 -> 1.5e16 -->
		.append("<reload_data_interval>"+bean.settings.getReload_data_interval()+"</reload_data_interval>\r\n")//[0] (Number) how often data should be reloaded (time in seconds)
		.append("<preloader_on_reload>"+bean.settings.isPreloader_on_reload()+"</preloader_on_reload>\r\n")//[false] (true / false) Whether to show preloaded when data or settings are reloaded 
		.append("<redraw>"+bean.settings.isRedraw()+"</redraw>\r\n")//自动调整页面大小时.饼图随之改变[false] (true / false) 
		.append("<add_time_stamp>"+bean.settings.isAdd_time_stamp()+"</add_time_stamp> \r\n")//[false] (true / false) if true, a unique number will be added every time flash loads data. Mainly this feature is useful if you set reload _data_interval
		.append("<precision>"+bean.settings.getPrecision()+"</precision>\r\n")//[2] (Number) shows how many numbers should be shown after comma for calculated values (percents)
		.append("<exclude_invisible>"+bean.settings.isExclude_invisible()+"</exclude_invisible>\r\n")//[false] (true / false) whether to exclude invisible slices (where alpha=0) then calculating percent values or not 
		.append("<js_enabled>"+bean.settings.isJs_enabled()+"</js_enabled>\r\n")//<!-- [true] (true / false) In case you don't use any flash - JavaScript communication, you shuold set this setting to false - this will save some CPU and will disable the security warning message which appears when opening the chart from hard drive. -->
		
		.append("<pie>\r\n")
		.append("<x>"+bean.pie.getX()+"</x>\r\n")//圆心x轴位置[50%](Number / Number% / !Number)
		.append("<y>"+bean.pie.getY()+"</y>\r\n")//圆心Y轴位置[45%](Number / Number% / !Number)
		.append("<radius>"+bean.pie.getRadius()+"</radius>\r\n")//半径[25%] (Number / Number%)当自动调整页面大小时.饼图随之改变,该值不要设置
		.append("<inner_radius>"+bean.pie.getInner_radius()+"</inner_radius>\r\n")//空心圆内部半径[0] (Number / Number%) 
		.append("<height>"+bean.pie.getHeight()+"</height>\r\n")//[0] (Number) pie height (for 3D effect) 厚度
		.append("<angle>"+bean.pie.getAngle()+"</angle> \r\n")//角度[0] (0 - 90) lean angle (for 3D effect)
		.append("<start_angle>"+bean.pie.getStart_angle()+"</start_angle>\r\n")//饼图起点角度[90] (0-360) 
		.append("<outline_color>"+bean.pie.getOutline_color()+"</outline_color>\r\n")//[#FFFFFF] (hex color code)
		.append("<outline_alpha>"+bean.pie.getOutline_alpha()+"</outline_alpha>\r\n")//[0] (Number) 
		.append("<base_color>"+bean.pie.getBase_color()+"</base_color>\r\n")//[] (hex color code) color of first slice 
		.append("<brightness_step>"+bean.pie.getBrightness_step()+"</brightness_step>\r\n")//明亮度[20] (-100 - 100) 
		.append("<colors>"+bean.pie.getColors()+"</colors>\r\n")//饼图各区域颜色(默认随机渐变)#FF0F00,#04D215,#FF6600,#B0DE09,#FF9E01,#0D8ECF,#FCD202,#8A0CCF,#0D52D1,#F8FF01,#2A0CD0,#DDDDDD,#CD0D74,#999999,#754DEB,#333333,#990000
		.append("<link_target>"+bean.pie.getLink_target()+"</link_target>\r\n")//[] (_blank, _top...) If pie slice has a link this is link target 
		.append("<alpha>"+bean.pie.getAlpha()+"</alpha>\r\n")//[100] (0 - 100)
		.append("<hover_brightness>"+bean.pie.getHover_brightness()+"</hover_brightness>\r\n")//鼠标上移时亮度和暗度[0] (from -255 to 255) 
		.append("<gradient>"+bean.pie.getGradient()+"</gradient>\r\n")//倾斜度[] (linear/radial)
		.append("<gradient_ratio>"+bean.pie.getGradient_ratio()+"</gradient_ratio>\r\n")//倾斜度比率[0,-40](Numbers from (-255 to 255) separated by commas) Controls the gradient ratio
		.append("</pie>\r\n")
		
		.append("<animation>\r\n")
		.append("<start_time>"+bean.animation.getStart_time()+"</start_time>\r\n")//[0] (Number) fly-in time in seconds. Leave 0 to appear instantly
		.append("<start_effect>"+bean.animation.getStart_effect()+"</start_effect>\r\n")//[bounce] (bounce, regular, strong)
		.append("<start_radius>"+bean.animation.getStart_radius()+"</start_radius>\r\n")//[500%] (Number / Number%)
		.append("<start_alpha>"+bean.animation.getStart_alpha()+"</start_alpha>\r\n")//[0] (Number) 
		.append("<sequenced>"+bean.animation.isSequenced()+"</sequenced>\r\n")//[false] (true / false)
		.append("<pull_out_on_click>"+bean.animation.isPull_out_on_click()+"</pull_out_on_click>\r\n")//[true] (true / false) 
		.append("<pull_out_time>"+bean.animation.pull_out_time+"</pull_out_time>\r\n")//[0] (number) pull-out time (then user clicks on the slice)
		.append("<pull_out_effect>"+bean.animation.getPull_out_effect()+"</pull_out_effect>\r\n")//[bounce] (bounce, regular, strong)
		.append("<pull_out_radius>"+bean.animation.getPull_out_radius()+"</pull_out_radius>\r\n")//[20%] (Number / Number%)
		.append("<pull_out_only_one>"+bean.animation.isPull_out_only_one()+"</pull_out_only_one>\r\n")//[false] (true / false) 
		.append("</animation>\r\n")
		
		.append("<data_labels>\r\n")
		.append("<radius>"+bean.dataLabels.getRadius()+"</radius>\r\n") //[20%] (Number / Number%) 
		.append("<text_color>"+bean.dataLabels.getText_color()+"</text_color>\r\n")//[text_color] (hex color code) 
		.append("<text_size>"+bean.dataLabels.getText_size()+"</text_size>\r\n")//[text_size] (Number)
		.append("<max_width>"+bean.dataLabels.getMax_width()+"</max_width> \r\n")//[120] (Number) 
		.append("<show><![CDATA["+bean.dataLabels.getShow()+"]]></show>\r\n")//[] ({value} {title} {percents} {description})
		.append("<show_lines>"+bean.dataLabels.isShow_lines()+"</show_lines>\r\n")// [true] (true / false) 
		.append("<line_color>"+bean.dataLabels.getLine_color()+"</line_color>\r\n")//[#000000] (hex color code) 
		.append("<line_alpha>"+bean.dataLabels.getLine_alpha()+"</line_alpha>\r\n")//[15] (Number)
		.append("<hide_labels_percent>"+bean.dataLabels.getHide_labels_percent()+"</hide_labels_percent>\r\n")//[0]
		.append("<avoid_overlapping>"+bean.dataLabels.isAvoid_overlapping()+"</avoid_overlapping>\r\n")//[true] (true / false)
		.append("</data_labels>\r\n")
		
		.append("<group>\r\n")
		.append("<percent>"+bean.group.getPercent()+"</percent>\r\n")//[0] (Number)
		.append("<color>"+bean.group.getColor()+"</color>\r\n")//[] (hex color code)
		.append("<title>"+bean.group.getTitle()+"</title>\r\n")//[Others] title of "The others" slic
		.append("<url>"+bean.group.getUrl()+"</url>\r\n")//[] url of "The others" slice
		.append("<description>"+bean.group.getDescription()+"</description>\r\n")//[] description of "The others" slice
		.append("<pull_out>"+bean.group.isPull_out()+"</pull_out>\r\n")//[false] (true / false)whether to pull out the other slice or not
		.append("</group>\r\n")
		
		.append("<background>\r\n")
		.append("<color>"+bean.background.getColor()+"</color>\r\n")//[#FFFFFF] (hex color code)
		.append("<alpha>"+bean.background.getAlpha()+"</alpha>\r\n")//[0] (0 - 100)
		.append("<border_color>"+bean.background.getBorder_color()+"</border_color>\r\n")//[#000000] (hex color code)
		.append("<border_alpha>"+bean.background.getBorder_alpha()+"</border_alpha>\r\n")//[0] (0 - 100)
		.append("<file>"+bean.background.getFile()+"</file>\r\n")// [] (filename)The chart will look for this file in path folder (path is set in HTML)
		.append("</background>\r\n")//
		
		.append("<balloon>\r\n")
		.append("<enabled>"+bean.balloon.isEnabled()+"</enabled>\r\n")//[true] (true / false)
		.append("<color>"+bean.balloon.getColor()+"</color>\r\n")//[] (hex color code) 
		.append("<alpha>"+bean.balloon.getAlpha()+"</alpha>\r\n")//[80] (0 - 100)
		.append("<text_color>"+bean.balloon.getText_color()+"</text_color>\r\n")//[#FFFFFF] (hex color code)
		.append("<text_size>"+bean.balloon.getText_size()+"</text_size>\r\n")//[text_size] (Number)
		.append("<show><![CDATA["+bean.balloon.getShow()+"]]></show>\r\n")// 默认显示标题\百分比\描述  [{title}: {percents}% ({value}) <br>{description}] ({value} {title} {percents} {description}) 
		.append("<max_width>"+bean.balloon.getMax_width()+"</max_width>\r\n") //[220] (Number)
		.append("<corner_radius>"+bean.balloon.getCorner_radius()+"</corner_radius>\r\n")// 标签的显示方式[0] (Number)
		.append("<border_width>"+bean.balloon.getBorder_width()+"</border_width>\r\n")//标签的宽度[0] (Number)
		.append("<border_alpha>"+bean.balloon.getBorder_alpha()+"</border_alpha>\r\n")//标签的透明度[balloon.alpha] (Number) 
		.append("<border_color>"+bean.balloon.getBorder_color()+"</border_color>\r\n")// 标签的边框颜色[balloon.color] (hex color code)
		.append("</balloon>\r\n")
		
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
		.append("<align>"+bean.legend.getAlign()+"</align>\r\n")//[left] (left / center / right)
		
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
		
		.append("<context_menu>\r\n")
		.append("<default_items>\r\n")
		.append("<zoom>"+bean.contextMenu.isDefault_items_zoom()+"</zoom>\r\n")//[true] (true / false)
		.append("<print>"+bean.contextMenu.isDefault_items_print()+"</print>\r\n")//[true] (true / false)
		.append("</default_items>\r\n")
		.append("</context_menu>\r\n")
		
		.append("<labels>\r\n");
		Common common=new Common();
		
		String labelstr=common.LabelsString(bean.list);
		
		xmlstr.append(labelstr)
		.append("</labels>\r\n")
		.append("</settings>\r\n");
		return xmlstr.toString();
	}
	
	/**
	 * 创建PieSettings Xml文件
	 * @param bean
	 * @return
	 * @throws IOException
	 */
	public static boolean CreatePieSettingsXml(PieBean bean) throws IOException{
		if(null==bean){
			bean=new PieBean();
		}
		if(null==bean.getFilePath()||bean.getFilePath().equals("")){
			return false;
		}
		String xmlstr=getPieSettingsXML(bean);
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
