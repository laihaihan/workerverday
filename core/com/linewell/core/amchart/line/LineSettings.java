package com.linewell.core.amchart.line;

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
public class LineSettings {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(LineSettings.class);
	/**
	 * 构造FLASH线形图XML
	 * @param bean FLASH柱形图中常用对象
	 * @return
	 */
	private static String getLineSettingsXML(LineBean bean){
		if(null==bean){
			bean=new LineBean();
		}
		StringBuffer xmlstr = new StringBuffer();
		xmlstr.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n")
		.append("<settings>\r\n")
		.append("	<data_type>"+bean.settings.getData_type()+"</data_type>\r\n")
		.append("	<csv_separator>"+bean.settings.getCsv_separator()+"</csv_separator>\r\n")                            // [;] (string) csv file data separator (you need it only if you are using csv file for your data) -->
		.append("	<skip_rows>"+bean.settings.getSkip_rows()+"</skip_rows>\r\n")                                    // <!-- [0] (Number) if you are using csv data type, you can set the number of rows which should be skipped here -->
		.append("	<font>"+bean.settings.getFont()+"</font>\r\n")                                             // <!-- [Arial] (font name) use device fonts, such as Arial, Times New Roman, Tahoma, Verdana... -->
		.append("	<text_size>"+bean.settings.getText_size()+"</text_size>\r\n")                                   // <!-- [11] (Number) text size of all texts. Every text size can be set individually in the settings below -->
		.append("	<text_color>"+bean.settings.getText_color()+"</text_color>\r\n")                                 //  <!-- [#000000] (hex color code) main text color. Every text color can be set individually in the settings below -->
		.append("	<decimals_separator>"+bean.settings.getDecimals_separator()+"</decimals_separator>\r\n")                 // <!-- [,] (string) decimal separator. Note, that this is for displaying data only. Decimals in data xml file must be separated with dot -->
		.append("	<thousands_separator>"+bean.settings.getThousands_separator()+"</thousands_separator>\r\n")               //<!-- [ ] (string) thousand separator. use "none" if you don't want to separate -->
		.append("	<digits_after_decimal>"+bean.settings.getDigits_after_decimal()+"</digits_after_decimal>\r\n")            // <!-- [] (Number) if your value has less digits after decimal then is set here, zeroes will be added -->
		.append("	<redraw>"+bean.settings.isRedraw()+"</redraw>\r\n")                                         // <!-- [false] (true / false) if your chart's width or height is set in percents, and redraw is set to true, the chart will be redrawn then screen size changes -->
		.append("	<reload_data_interval>"+bean.settings.getReload_data_interval()+"</reload_data_interval>\r\n")             //  <!-- [0] (Number) how often data should be reloaded (time in seconds) If you are using this feature I strongly recommend to turn off zoom function (set <zoomable>false</zoomable>) -->
		.append("	<preloader_on_reload>"+bean.settings.isPreloader_on_reload()+"</preloader_on_reload>\r\n")               // <!-- [false] (true / false) Whether to show preloaded when data or settings are reloaded -->
		.append("	<add_time_stamp>"+bean.settings.isAdd_time_stamp()+"</add_time_stamp>\r\n")                         // <!-- [false] (true / false) if true, a unique number will be added every time flash loads data. Mainly this feature is useful if you set reload _data_interval >0 -->
		.append("	<precision>"+bean.settings.getPrecision()+"</precision>\r\n")                                   //  <!-- [2] (Number) shows how many numbers should be shown after comma for calculated values (percents, used only in stacked charts) -->
		.append("	<connect>"+bean.connect+"</connect>\r\n")                                        // <!-- [false] (true / false) whether to connect points if y data is missing -->
		.append("	<hide_bullets_count>"+bean.hide_bullets_count+"</hide_bullets_count>\r\n")                  
		.append("	<link_target>"+bean.link_target+"</link_target> \r\n")                               //  <!-- [] (_blank, _top ...) -->
		.append("	<start_on_axis>"+bean.start_on_axis+"</start_on_axis>\r\n")                            // <!-- [true] (true / false) if set to false, graph is moved 1/2 of one series interval from Y axis -->
		.append("	<colors>"+bean.colors+"</colors>\r\n")                                          // <!-- [#FF0000,#0000FF,#00FF00,#FF9900,#CC00CC,#00CCCC,#33FF00,#990000,#000066,#555555] Colors of graphs. if the graph color is not set, color from this array will be used -->
		.append("	<rescale_on_hide>"+bean.rescale_on_hide+"</rescale_on_hide>\r\n")                        // <!-- [true] (true/false) When you show or hide graphs, the chart recalculates min and max values (rescales the chart). If you don't want this, set this  to false. -->
		.append("	<background>\r\n")                                               // <!-- BACKGROUND -->
		.append("		<color>"+bean.background.getColor()+"</color>\r\n")                                            //<!-- [#FFFFFF] (hex color code) Separate color codes with comas for gradient -->
		.append("		<alpha>"+bean.background.getAlpha()+"</alpha>\r\n")                                           //<!-- [0] (0 - 100) use 0 if you are using custom swf or jpg for background -->
		.append("		<border_color>"+bean.background.getBorder_color()+"</border_color>\r\n")                             //<!-- [#000000] (hex color code) -->
		.append("		<border_alpha>"+bean.background.getBorder_alpha()+"</border_alpha>\r\n")                             //<!-- [0] (0 - 100) -->
		.append("		<file>"+bean.background.getFile()+"</file>\r\n")                                             //<!-- [] (filename) swf or jpg file of a background. Do not use progressive  jpg file, it will be not visible with flash player 7 -->
		.append("	</background>\r\n")
		//
		//
		.append("	<plot_area>\r\n")                                            //<!-- PLOT AREA (the area between axes) -->
		.append("		<color>"+bean.plotarea.getColor()+"</color>\r\n")                                    //<!-- [#FFFFFF](hex color code) Separate color codes with comas for gradient -->
		.append("		<alpha>"+bean.plotarea.getAlpha()+"</alpha>\r\n")                                    //<!-- [0] (0 - 100) if you want it to be different than background color, use bigger than 0 value -->
		.append("		<border_color>"+bean.plotarea.getBorder_color()+"</border_color>\r\n")                     //<!-- [#000000] (hex color code) -->
		.append("		<border_alpha>"+bean.plotarea.getBorder_alpha()+"</border_alpha>\r\n")                     //<!-- [0] (0 - 100) -->
		.append("		<margins>\r\n")                                         //<!-- plot area margins -->
		.append("			<left>"+bean.plotarea.getMarginsLeft()+"</left>\r\n")                                 //<!-- [60](Number) -->
		.append("			<top>"+bean.plotarea.getMarginsTop()+"</top>\r\n")                                   //<!-- [60](Number) -->
		.append("			<right>"+bean.plotarea.getMarginsRight()+"</right>\r\n")                               //<!-- [60](Number) -->
		.append("			<bottom>"+bean.plotarea.getMarginsBottom()+"</bottom>\r\n")                             //<!-- [80](Number) -->
		.append("		</margins>\r\n")
		.append("	</plot_area>\r\n")

		.append("	<scroller>\r\n")
		.append("		<enabled>"+bean.scroller.enabled+"</enabled>\r\n")                              //<!-- [true] (true / false) whether to show scroller when chart is zoomed or not -->
		.append("		<y>"+bean.scroller.y+"</y>\r\n")                                          //<!-- [] (Number) Y position of scroller. If not set here, will be displayed above plot area -->
		.append("		<color>"+bean.scroller.color+"</color>\r\n")                                  //<!-- [#DADADA] (hex color code) scrollbar color. Separate color codes with comas for gradient -->
		.append("		<alpha>"+bean.scroller.alpha+"</alpha>\r\n")                                  //<!-- [100] (Number) scrollbar alpha -->
		.append("		<bg_color>"+bean.scroller.bg_color+"</bg_color>\r\n")                           //<!-- [#F0F0F0] (hex color code) scroller background color. Separate color codes with comas for gradient -->
		.append("		<bg_alpha>"+bean.scroller.bg_alpha+"</bg_alpha>\r\n")                            //<!-- [100] (Number) scroller background alpha -->
		.append("		<height>"+bean.scroller.height+"</height>\r\n")                               //<!-- [10] (Number) scroller height -->
		.append("	</scroller>\r\n")
		//
		.append("	<grid>").append("\r\n")                                            //<!-- GRID -->
		.append("		<x>").append("\r\n")                                             //<!-- vertical grid -->
		.append("			<enabled>"+bean.grid.xEnabled+"</enabled>\r\n")                         //<!-- [true] (true / false) -->
		.append("			<color>"+bean.grid.xColor+"</color>\r\n")                             //<!-- [#000000] (hex color code) -->
		.append("			<alpha>"+bean.grid.xAlpha+"</alpha>\r\n")                             //<!-- [15] (0 - 100) -->
		.append("			<dashed>"+bean.grid.xDashed+"</dashed>\r\n")                           //<!-- [false](true / false) -->
		.append("			<dash_length>"+bean.grid.xDash_length+"</dash_length>\r\n")                 //<!-- [5] (Number) -->
		.append("			<approx_count>"+bean.grid.xApprox_count+"</approx_count>\r\n")               //<!-- [4] (Number) approximate number of gridlines -->
		.append("		</x>\r\n")
		.append("		<y_left>\r\n")                                        //<!-- horizontal grid, Y left axis. Visible only if there is at least one graph assigned to left axis -->
		.append("			<enabled>"+bean.grid.y_leftEnabled+"</enabled>\r\n")                         //<!-- [true] (true / false) -->
		.append("			<color>"+bean.grid.y_leftColor+"</color>\r\n")                            //<!-- [#000000] (hex color code) -->
		.append("			<alpha>"+bean.grid.y_leftAlpha+"</alpha>\r\n")                            //<!-- [15] (0 - 100) -->
		.append("			<dashed>"+bean.grid.y_leftDashed+"</dashed>\r\n")                          //<!-- [false] (true / false) -->
		.append("			<dash_length>"+bean.grid.y_leftDash_length+"</dash_length>\r\n")                //<!-- [5] (Number) -->
		.append("			<approx_count>"+bean.grid.y_leftApprox_count+"</approx_count>\r\n")              //<!-- [10] (Number) approximate number of gridlines -->
		.append("			<fill_color>"+bean.grid.y_leftFill_color+"</fill_color>\r\n")                  //<!-- [#FFFFFF] (hex color code) every second area between gridlines will be filled with this color (you will need to set fill_alpha > 0) -->
		.append("			<fill_alpha>"+bean.grid.y_leftFill_alpha+"</fill_alpha>\r\n")                  //<!-- [0] (0 - 100) opacity of fill -->
		.append("		</y_left>\r\n")
		.append("		<y_right>\r\n")                                     //<!-- horizontal grid, Y right axis. Visible only if there is at least one graph assigned to right axis -->
		.append("			<enabled>"+bean.grid.y_rightEnabled+"</enabled>\r\n")                        //<!-- [true] (true / false) -->
		.append("			<color>"+bean.grid.y_rightColor+"</color>\r\n")                           //<!-- [#000000] (hex color code) -->
		.append("			<alpha>"+bean.grid.y_rightAlpha+"</alpha>\r\n")                           //<!-- [15] (0 - 100) -->
		.append("			<dashed>"+bean.grid.y_rightDashed+"</dashed>\r\n")                         //<!-- [false] (true / false) -->
		.append("			<dash_length>"+bean.grid.y_rightDash_length+"</dash_length>\r\n")               //<!-- [5] (Number) -->
		.append("			<approx_count>"+bean.grid.y_rightApprox_count+"</approx_count>\r\n")            //<!-- [10] (Number) approximate number of gridlines -->
		.append("			<fill_color>"+bean.grid.y_rightFill_color+"</fill_color>\r\n")                //<!-- [#FFFFFF] (hex color code) every second area between gridlines will be filled with this color (you will need to set fill_alpha > 0) -->
		.append("			<fill_alpha>"+bean.grid.y_rightFill_alpha+"</fill_alpha>\r\n")                //<!-- [0] (0 - 100) opacity of fill -->
		.append("		</y_right>\r\n")
		.append("	</grid>\r\n")
		//
		.append("	<values>\r\n")                                          //<!-- VALUES -->
		.append("		<x>\r\n")                                           //<!-- x axis -->
		.append("			<enabled>"+bean.values.xEnabled+"</enabled>\r\n")                       //<!-- [true] (true / false) -->
		.append("			<rotate>"+bean.values.xRotate+"</rotate>\r\n")                         //<!-- [0] (0 - 90) angle of rotation. If you want to rotate by degree from 1 to 89, you must have font.swf file in fonts folder -->
		.append("			<frequency>"+bean.values.xFrequency+"</frequency>\r\n")                   //<!-- [1] (Number) how often values should be placed, 1 - near every gridline, 2 - near every second gridline... -->
		.append("			<skip_first>"+bean.values.xSkip_first+"</skip_first>\r\n")                 //<!-- [false] (true / false) to skip or not first value -->
		.append("			<skip_last>"+bean.values.xSkip_last+"</skip_last>\r\n")                   //<!-- [false] (true / false) to skip or not last value -->
		.append("			<color>"+bean.values.xColor+"</color>\r\n")                           //<!-- [text_color] (hex color code) -->
		.append("			<text_size>"+bean.values.xText_size+"</text_size>\r\n")                   //<!-- [text_size] (Number) -->
		.append("			<inside>"+bean.values.xInside+"</inside>\r\n")                         //<!-- [false] (true / false) if set to true, axis values will be displayed inside plot area. This setting will not work for values rotated by 1-89 degrees (0 and 90 only) -->
		.append("		</x>\r\n")
		.append("		<y_left>\r\n")                                      //<!-- y left axis -->
		.append("			<enabled>"+bean.values.y_leftEnabled+"</enabled>\r\n")                       //<!-- [true] (true / false) -->
		.append("			<reverse>"+bean.values.y_leftReverse+"</reverse>\r\n")                       
		.append("			<rotate>"+bean.values.y_leftRotate+"</rotate>\r\n")                         //<!-- [0] (0 - 90) angle of rotation. If you want to rotate by degree from 1 to 89, you must have font.swf file in fonts folder -->
		.append("			<min>"+bean.values.y_leftMin+"</min>\r\n")                              //<!-- [] (Number) minimum value of this axis. If empty, this value will be calculated automatically. -->
		.append("			<max>"+bean.values.y_leftMan+"</max>\r\n")                              //<!-- [] (Number) maximum value of this axis. If empty, this value will be calculated automatically -->
		.append("			<strict_min_max>"+bean.values.y_leftStrict_min_max+"</strict_min_max>\r\n")        
		.append("			<frequency>"+bean.values.y_leftFrequency+"</frequency>\r\n")                                 
		.append("			<skip_first>"+bean.values.y_leftSkip_first+"</skip_first>\r\n")                               
		.append("			<skip_last>"+bean.values.y_leftSkip_last+"</skip_last>\r\n")                                
		.append("			<color>"+bean.values.y_leftColor+"</color>\r\n")                                         
		.append("			<text_size>"+bean.values.y_leftText_size+"</text_size>\r\n")                                 
		.append("			<unit>"+bean.values.y_leftUnit+"</unit>\r\n")                                           
		.append("			<unit_position>"+bean.values.y_leftUnit_position+"</unit_position>\r\n")                        
		.append("			<integers_only>"+bean.values.y_leftIntegers_only+"</integers_only>\r\n")                         
		.append("			<inside>"+bean.values.y_leftInside+"</inside>\r\n")                                       
		.append("		</y_left>\r\n")
		.append("		<y_right>\r\n")                                                 
		.append("			<enabled>"+bean.values.y_rightEnabled+"</enabled>\r\n")                                     
		.append("			<reverse>"+bean.values.y_rightReverse+"</reverse>\r\n")                                     
		.append("			<rotate>"+bean.values.y_rightRotate+"</rotate>\r\n")                                       
		.append("			<min>"+bean.values.y_rightMin+"</min>\r\n")                                             
		.append("			<max>"+bean.values.y_rightMan+"</max>\r\n")                                             
		.append("			<strict_min_max>"+bean.values.y_rightStrict_min_max+"</strict_min_max>\r\n")                       
		.append("			<frequency>"+bean.values.y_rightFrequency+"</frequency>\r\n")                                 
		.append("			<skip_first>"+bean.values.y_rightSkip_first+"</skip_first>\r\n")                               
		.append("			<skip_last>"+bean.values.y_rightSkip_last+"</skip_last>\r\n")                                
		.append("			<color>"+bean.values.y_rightColor+"</color>\r\n")                                         
		.append("			<text_size>"+bean.values.y_rightText_size+"</text_size>\r\n")                                
		.append("			<unit>"+bean.values.y_rightUnit+"</unit>\r\n")                                           
		.append("			<unit_position>"+bean.values.y_rightUnit_position+"</unit_position>\r\n")                         
		.append("			<integers_only>"+bean.values.y_rightIntegers_only+"</integers_only>\r\n")                         
		.append("			<inside>"+bean.values.y_rightInside+"</inside>\r\n")                                       
		.append("		</y_right>\r\n")
		.append("	</values>\r\n")
		.append("	<axes>\r\n")                                                      
		.append("		<x>\r\n")                                                       
		.append("			<color>"+bean.axes.xColor+"</color>\r\n")                                         
		.append("			<alpha>"+bean.axes.xAlpha+"</alpha>\r\n")                                        
		.append("			<width>"+bean.axes.xWidth+"</width>\r\n")                                         
		.append("			<tick_length>"+bean.axes.xTick_length+"</tick_length>\r\n")                             
		.append("		</x>\r\n")
		.append("		<y_left>\r\n")                                                  
		.append("			<type>"+bean.axes.y_leftType+"</type>\r\n")                                           
		.append("			<color>"+bean.axes.y_leftColor+"</color>\r\n")                                        
		.append("			<alpha>"+bean.axes.y_leftAlpha+"</alpha>\r\n")                                         
		.append("			<width>"+bean.axes.y_leftWidth+"</width>\r\n")                                        
		.append("			<tick_length>"+bean.axes.y_leftTick_length+"</tick_length>\r\n")                             
		.append("			<logarithmic>"+bean.axes.y_leftLogarithmic+"</logarithmic>\r\n")                             
		.append("		</y_left>\r\n")
		.append("		<y_right>\r\n")                                                 
		.append("			<type>"+bean.axes.y_rightType+"</type>\r\n")                                           
		.append("			<color>"+bean.axes.y_rightColor+"</color>\r\n")                                         
		.append("			<alpha>"+bean.axes.y_rightAlpha+"</alpha>\r\n")                                        
		.append("			<width>"+bean.axes.y_rightWidth+"</width>\r\n")                                        
		.append("			<tick_length>"+bean.axes.y_rightTick_length+"</tick_length>\r\n")                             
		.append("			<logarithmic>"+bean.axes.y_rightLogarithmic+"</logarithmic>\r\n")                             
		.append("		</y_right>\r\n")
		.append("	</axes>\r\n")

		.append("	<indicator>\r\n")                                                 
		.append("		<enabled>"+bean.indicator.enabled+"</enabled>\r\n")                                      
		.append("		<zoomable>"+bean.indicator.zoomable+"</zoomable>\r\n")                                     
		.append("		<color>"+bean.indicator.color+"</color>\r\n")                                           
		.append("		<line_alpha>"+bean.indicator.line_alpha+"</line_alpha>\r\n")                                 
		.append("		<selection_color>"+bean.indicator.selection_color+"</selection_color>\r\n")                      
		.append("		<selection_alpha>"+bean.indicator.selection_alpha+"</selection_alpha>\r\n")                      
		.append("		<x_balloon_enabled>"+bean.indicator.x_balloon_enabled+"</x_balloon_enabled>\r\n")                   
		.append("		<x_balloon_text_color>"+bean.indicator.x_balloon_text_color+"</x_balloon_text_color>\r\n")             
		.append("	</indicator>\r\n")

		.append("	<balloon>\r\n")                                                   
		.append("		<enabled>"+bean.balloon.enabled+"</enabled>\r\n")                                      
		.append("		<only_one>"+bean.balloon.only_one+"</only_one>\r\n")                                     
		.append("		<on_off>"+bean.balloon.only_off+"</on_off>\r\n")                                         
		.append("		<color>"+bean.balloon.color+"</color>\r\n")                                           
		.append("		<alpha>"+bean.balloon.alpha+"</alpha>\r\n")                                           
		.append("		<text_color>"+bean.balloon.text_color+"</text_color>\r\n")                                 
		.append("		<text_size>"+bean.balloon.text_size+"</text_size>\r\n")                                   
		.append("		<max_width>"+bean.balloon.max_width+"</max_width>\r\n")                                   
		.append("		<corner_radius>"+bean.balloon.corner_radius+"</corner_radius>\r\n")                           
		.append("		<border_width>"+bean.balloon.border_width+"</border_width>\r\n")                             
		.append("		<border_alpha>"+bean.balloon.border_alpha+"</border_alpha>\r\n")                            
		.append("		<border_color>"+bean.balloon.border_color+"</border_color>\r\n")                            
		.append("	</balloon>\r\n")

		.append("	<legend>\r\n")                                                   
		.append("		<enabled>"+bean.legend.enabled+"</enabled>\r\n")                                       
		.append("		<x>"+bean.legend.x+"</x>\r\n")                                                   
		.append("		<y>"+bean.legend.y+"</y>\r\n")                                                   
		.append("		<width>"+bean.legend.width+"</width>\r\n")                                          
		.append("		<max_columns>"+bean.legend.max_columns+"</max_columns>\r\n")                              
		.append("		<color>"+bean.legend.color+"</color>\r\n")                                           
		.append("		<alpha>"+bean.legend.alpha+"</alpha>\r\n")                                           
		.append("		<border_color>"+bean.legend.border_color+"</border_color>\r\n")                             
		.append("		<border_alpha>"+bean.legend.border_alpha+"</border_alpha>\r\n")                             
		.append("		<text_color>"+bean.legend.text_color+"</text_color>\r\n")                                 
		.append("		<text_color_hover>"+bean.legend.text_color_hover+"</text_color_hover>\r\n")                     
		.append("		<text_size>"+bean.legend.text_size+"</text_size>\r\n")                                   
		.append("		<spacing>"+bean.legend.spacing+"</spacing>\r\n")                                      
		.append("		<margins>"+bean.legend.margins+"</margins>\r\n")                                       
		.append("		<graph_on_off>"+bean.legend.graph_on_off+"</graph_on_off>\r\n")                             
		.append("		<reverse_order>"+bean.legend.reverse_order+"</reverse_order>\r\n")                           
		.append("		<align>"+bean.legend.align+"</align>\r\n")                                           
		.append("		<key>\r\n")                                                    
		.append("			<size>"+bean.legend.key_size+"</size>\r\n")                                         
		.append("			<border_color>"+bean.legend.key_border_color+"</border_color>\r\n")                          
		.append("			<key_mark_color>"+bean.legend.key_mark_color+"</key_mark_color>\r\n")                      
		.append("		</key>\r\n")
		.append("		<values> \r\n")                                               
		.append("			<enabled>"+bean.legend.values_enabled+"</enabled>\r\n")                                 
		.append("			<width>"+bean.legend.values_width+"</width> \r\n")                                      
		.append("			<align>"+bean.legend.values_align+"</align>\r\n")                                     
		.append("			<text><![CDATA["+bean.legend.values_text+"]]></text>\r\n")                     
		.append("		</values>\r\n")
		.append("	</legend>\r\n")
		//
		.append("	<vertical_lines>\r\n")                                            
		.append("		<width>"+bean.vertical_lines.width+"</width>\r\n")                                           
		.append("		<alpha>"+bean.vertical_lines.alpha+"</alpha>\r\n")                                          
		.append("		<clustered>"+bean.vertical_lines.clustered+"</clustered>\r\n")                                   
		.append("		<mask>"+bean.vertical_lines.mask+"</mask>\r\n")                                             
		.append("	</vertical_lines>\r\n")

		.append("	<zoom_out_button>\r\n")
		.append("		<x>"+bean.zoom_out_button.x+"</x>\r\n")                                                   
		.append("		<y>"+bean.zoom_out_button.y+"</y>\r\n")                                                   
		.append("		<color>"+bean.zoom_out_button.color+"</color>\r\n")                                          
		.append("		<alpha>"+bean.zoom_out_button.alpha+"</alpha>\r\n")                                           
		.append("		<text_color>"+bean.zoom_out_button.text_color+"</text_color>\r\n")                                 
		.append("		<text_color_hover>"+bean.zoom_out_button.text_color_hover+"</text_color_hover>\r\n")                     
		.append("		<text_size>"+bean.zoom_out_button.text_size+"</text_size>\r\n")                                   
		.append("		<text>"+bean.zoom_out_button.text+"</text>\r\n")                                            
		.append("	</zoom_out_button>\r\n")

		.append("	<help>\r\n")                                                     
		.append("		<button>\r\n")                                                  
		.append("			<x>"+bean.help.buttonX+"</x>\r\n")                                                
		.append("			<y>"+bean.help.buttonY+"</y>\r\n")                                               
		.append("			<color>"+bean.help.buttonColor+"</color>\r\n")                                     
		.append("			<alpha>"+bean.help.buttonAlpha+"</alpha>\r\n")                                      
		.append("			<text_color>"+bean.help.buttonText_color+"</text_color>\r\n")                              
		.append("			<text_color_hover>"+bean.help.buttonText_color_hover+"</text_color_hover>\r\n")                  
		.append("			<text_size>"+bean.help.buttonText_size+"</text_size>\r\n")                               
		.append("			<text>"+bean.help.buttonText+"</text>\r\n")                                         
		.append("		</button>\r\n")
		.append("		<balloon>\r\n")                                                
		.append("			<color>"+bean.help.balloonColor+"</color>\r\n")                                       
		.append("			<alpha>"+bean.help.balloonAlpha+"</alpha>\r\n")                                        
		.append("			<width>"+bean.help.balloonWidth+"</width>\r\n")                                       
		.append("			<text_color>"+bean.help.balloonText_color+"</text_color>\r\n")                              
		.append("			<text_size>"+bean.help.balloonText_size+"</text_size>\r\n")                                 
		.append("			<text><![CDATA["+bean.help.balloonText+"]]></text>\r\n")                               
		.append("		</balloon>\r\n")
		.append("	</help>\r\n")

		.append("	<export_as_image>\r\n")                                           
		.append("		<file>"+bean.exportAsImage.file+"</file>\r\n")                                             
		.append("		<target>"+bean.exportAsImage.target+"</target>\r\n")                                         
		.append("		<x>"+bean.exportAsImage.x+"</x>\r\n")                                                  
		.append("		<y>"+bean.exportAsImage.y+"</y>\r\n")                                                   
		.append("		<color>"+bean.exportAsImage.color+"</color>\r\n")                                           
		.append("		<alpha>"+bean.exportAsImage.alpha+"</alpha>\r\n")                                          
		.append("		<text_color>"+bean.exportAsImage.text_color+"</text_color>\r\n")                                
		.append("		<text_size>"+bean.exportAsImage.text_size+"</text_size>\r\n")                                  
		.append("	</export_as_image>\r\n")

		.append("	<error_messages>\r\n")                                            
		.append("		<enabled>"+bean.errormessages.enabled+"</enabled>\r\n")                                     
		.append("		<x>"+bean.errormessages.x+"</x>\r\n")                                               
		.append("		<y>"+bean.errormessages.y+"</y>\r\n")                                                
		.append("		<color>"+bean.errormessages.color+"</color>\r\n")                                          
		.append("		<alpha>"+bean.errormessages.alpha+"</alpha>\r\n")                                          
		.append("		<text_color>"+bean.errormessages.text_color+"</text_color>\r\n")                                
		.append("		<text_size>"+bean.errormessages.text_size+"</text_size>\r\n")                                   
		.append("	</error_messages>\r\n")

		.append("	<strings>\r\n")
		.append("		<no_data></no_data>\r\n")                                       
		.append("		<export_as_image></export_as_image>\r\n")                       
		.append("		<error_in_data_file></error_in_data_file>\r\n")                
		.append("		<collecting_data></collecting_data>\r\n")                       
		.append("		<wrong_zoom_value></wrong_zoom_value>\r\n")                     
		.append("	</strings>\r\n")

		.append("	<context_menu>\r\n")                                             
		.append("		<default_items>\r\n")
		.append("			<zoom>"+bean.contextMenu.default_items_zoom+"</zoom>\r\n")                                    
		.append("			<print>"+bean.contextMenu.default_items_print+"</print>\r\n")                                  
		.append("		</default_items>\r\n")
		.append("	</context_menu>\r\n")

		.append("	<labels>\r\n");
		Common common=new Common();
		String labelstr=common.LabelsString(bean.list);
		xmlstr.append(labelstr);
		xmlstr.append("	</labels>\r\n");

		xmlstr.append("	<graphs>\r\n");
		labelstr = common.LineGraphsString(bean.graphsList);
		xmlstr.append(labelstr);
		xmlstr.append("	</graphs>\r\n")

		.append("	<guides>\r\n")	                                                 
		.append("		<max_min></max_min>\r\n")                                       
		.append("		<guide>\r\n")                                                   
		.append("			<axis>"+bean.guides.getAxis()+"</axis>\r\n")                                           
		.append("			<start_value>"+bean.guides.getStart_value()+"</start_value>\r\n")                             
		.append("			<end_value>"+bean.guides.getEnd_value()+"</end_value>\r\n")                                 
		.append("			<title>"+bean.guides.getTitle()+"</title>\r\n")                                         
		.append("			<width>"+bean.guides.getWidth()+"</width>\r\n")                                        
		.append("			<color>"+bean.guides.getColor()+"</color>\r\n")                                         
		.append("			<alpha>"+bean.guides.getAlpha()+"</alpha>\r\n")                                         
		.append("			<fill_color>"+bean.guides.getFill_color()+"</fill_color>\r\n")                               
		.append("			<fill_alpha>"+bean.guides.getFill_alpha()+"</fill_alpha>\r\n")                               
		.append("			<inside>"+bean.guides.getInside()+"</inside>\r\n")                                      
		.append("			<centered>"+bean.guides.isCentered()+"</centered>\r\n")                                   
		.append("			<rotate>"+bean.guides.getRotate()+"</rotate>\r\n")                                      
		.append("			<text_size>"+bean.guides.getText_size()+"</text_size>\r\n")                                
		.append("			<text_color>"+bean.guides.getText_color()+"</text_color>\r\n")                             
		.append("			<dashed>"+bean.guides.isDashed()+"</dashed>\r\n")                                      
		.append("			<dash_length>"+bean.guides.getDash_length()+"</dash_length>\r\n")                            
		.append("		</guide>\r\n")
		.append("		</guides>\r\n")
		.append("	</settings>\r\n");

		return xmlstr.toString();
	}

	/**
	 * 创建LineSettings Xml文件
	 * @param bean
	 * @return
	 * @throws IOException
	 */
	public static boolean CreateLineSettingsXml(LineBean bean) throws IOException{
		if(null==bean){
			bean=new LineBean();
		}
		if(null==bean.getFilePath()||bean.getFilePath().equals("")){
			return false;
		}
		String xmlstr = getLineSettingsXML(bean);
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