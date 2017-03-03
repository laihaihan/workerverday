package com.linewell.core.amchart.common;

import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.crimson.tree.XmlDocument;

import com.linewell.core.amchart.column.ColumnData;
import com.linewell.core.amchart.line.LineData;
import com.linewell.core.amchart.pie.PieData;
import com.linewell.core.util.StrUtil;

/**
 * @author linyashan
 * @Email lys@linewell.com
 * @dateTime Dec 26, 2009 11:14:13 AM
 * @version v1.0 类说明 :图表中共用的方法,如根据提供的路径和内容生成XML文件等.
 */
public class Common {

    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(Common.class); 

	/**
	 * 根据提供的路径,内容,生成XML文件
	 * 
	 * @param filePathAndName
	 *            String
	 * @param fileContent
	 *            String
	 * @return
	 */
	public static boolean writeFile(String filePathAndName, String fileContent) {
		try {
			File f = new File(filePathAndName);
			if (!f.exists()) {
				//判断文件夹是否存在
				File folder = f.getParentFile();
				if(!folder.exists()){
					folder.mkdir();
				}
				f.createNewFile();
			}
			// 解决中文乱码问题
			OutputStreamWriter write = new OutputStreamWriter(
					new FileOutputStream(f), "UTF-8");
			BufferedWriter writer = new BufferedWriter(write);
			writer.write(fileContent);
			writer.close();
		} catch (Exception e) {
		    logger.debug(e.toString() + "写文件内容操作出错");
		    logger.error(e.toString() + "写文件内容操作出错");
			return false;
		}
		return true;
	}

	/**
	 * 内容写入XML文件
	 * 
	 * @param filePathAndName
	 *            XmlDocument
	 * @param Document
	 *            doc
	 * @return
	 */
	public static boolean writeFile(String filePathAndName, XmlDocument doc) {
		try {
			File f = new File(filePathAndName);
			if (!f.exists()) {
				//判断文件夹是否存在
				File folder = f.getParentFile();
				if(!folder.exists()){
					folder.mkdir();
				}
				f.createNewFile();
			}
			// 解决中文乱码问题
			OutputStreamWriter out = new OutputStreamWriter(
					new BufferedOutputStream(new FileOutputStream(
							filePathAndName)), "UTF-8");
			// 利用XmlDocument的write方法写出xml文件
			doc.write(out, "UTF-8");
			out.close();
		} catch (Exception e) {
		    logger.debug(e.toString() + "图表PieData写文件内容操作出错");
		    logger.error(e.toString() + "图表PieData写文件内容操作出错");
			return false;
		}
		return true;
	}

	/**
	 * 返回标签数据
	 * 标签数据可以存多个，所以统一以列表的形式
	 * 饼、柱、线共用
	 * @param list
	 * @return
	 */
	public String LabelsString(List<Labels> list) {
		StringBuffer xmlstr = new StringBuffer();
		if (null != list && list.size() >= 1) {
			StringBuffer str = new StringBuffer();
			for (int i = 0; i < list.size(); i++) {
				 Labels bean=(Labels)list.get(i);
				 str.append("<label lid=\""+bean.getLabel_lid()+"\">\r\n")
				.append("<x>"+bean.getX()+"</x>\r\n")//[0] (Number / Number% / !Number) 
				.append("<y>"+bean.getY()+"</y>\r\n")//[0] (Number / Number% / !Number)
				.append("<rotate>"+bean.isRotate()+"</rotate>\r\n")//[false] (true / false)
				.append("<width>"+bean.getWidth()+"</width>\r\n")//[] (Number / Number%) 
				.append("<align>"+bean.getAlign()+"</align>\r\n")//[left] (left / center / right)
				.append("<text_color>"+bean.getText_color()+"</text_color>\r\n")//[text_color] 
				.append("<text_size>"+bean.getText_size()+"</text_size>\r\n")//[text_size](Number)
				.append("<text><![CDATA["+bean.getText()+"]]></text> \r\n")//[] (text) html tags may be used (supports <b>, <i>, <u>, <font>, <a href="">, <br/>. Enter text between []: <![CDATA[your <b>bold</b> and <i>italic</i> text]]>
				.append("</label>\r\n");
				}
			xmlstr.append(str);
			}
		return xmlstr.toString();
	}
	
	/**
	 * 数据可存存多个，所以统一以列表的形式
	 * 柱形图使用
	 * @param list
	 * @return
	 */
	public String ColumnGraphsString(List<Graphs> list) {
		StringBuffer xmlstr = new StringBuffer();
		if (null != list && list.size() >= 1) {
			StringBuffer str = new StringBuffer();
			for (int i = 0; i < list.size(); i++) {
				Graphs bean=(Graphs)list.get(i);
				 str.append("<graph gid=\""+bean.getGid()+"\">\r\n")
				    .append("<type>"+bean.getType()+"</type>\r\n") 
					.append("<title>"+bean.getTitle()+"</title>\r\n")
					.append("<color>"+bean.getColor()+"</color>\r\n") 
					.append("<alpha>"+bean.getAlpha()+"</alpha>\r\n")
					.append("<data_labels><![CDATA["+bean.getData_labels()+"]]></data_labels>\r\n") 
					.append("<gradient_fill_colors>"+bean.getGradient_fill_colors()+"</gradient_fill_colors>\r\n")
					.append("<balloon_color>"+bean.getBalloon_color()+"</balloon_color>\r\n") 
					.append("<balloon_alpha>"+bean.getBalloon_alpha()+"</balloon_alpha>\r\n")
					.append("<balloon_text_color>"+bean.getBalloon_text_color()+"</balloon_text_color>\r\n") 
					.append("<balloon_text><![CDATA["+bean.getBalloon_text()+"]]></balloon_text>\r\n")
					.append("<fill_alpha>"+bean.getFill_alpha()+"</fill_alpha>\r\n") 
					.append("<width>"+bean.getWidth()+"</width>\r\n")
					.append("<bullet>"+bean.getBullet()+"</bullet>\r\n") 
					.append("<bullet_size>"+bean.getBullet_size()+"</bullet_size>\r\n")
					.append("<bullet_color>"+bean.getBalloon_color()+"</bullet_color>\r\n") 
					.append("<visible_in_legend>"+bean.isVisible_in_legend()+"</visible_in_legend>\r\n")
					.append("<pattern>"+bean.getPattern()+"</pattern>\r\n")                                    
					.append("<pattern_color>"+bean.getPattern_color()+"</pattern_color> \r\n") 
					.append("</graph>\r\n");
				}
			xmlstr.append(str);
			}
		return xmlstr.toString();
	}
	
	/**
	 * 数据可存存多个，所以统一以列表的形式
	 * 线形图使用
	 * @param list
	 * @return
	 */
	public String LineGraphsString(List<Graphs> list) {
		StringBuffer xmlstr = new StringBuffer();
		if (null != list && list.size() >= 1) {
			StringBuffer str = new StringBuffer();
			for (int i = 0; i < list.size(); i++) {
				Graphs bean=(Graphs)list.get(i);
				 str.append("<graph gid=\""+bean.getGid()+"\">\r\n")
				    .append("<axis>"+bean.getAxis()+"</axis>\r\n") 
					.append("<title>"+bean.getTitle()+"</title>\r\n")
					.append("<color>"+bean.getColor()+"</color>\r\n") 
					.append("<color_hover>"+bean.getColor_hover()+"</color_hover>\r\n")
					.append("<line_alpha>"+bean.getLine_alpha()+"</line_alpha>\r\n")
					.append("<line_width>"+bean.getLine_width()+"</line_width>\r\n") 
					.append("<fill_alpha>"+bean.getFill_alpha()+"</fill_alpha>\r\n") 
					.append("<fill_color>"+bean.getFill_color()+"</fill_color>\r\n") 
					.append("<balloon_color>"+bean.getBalloon_color()+"</balloon_color>\r\n") 
					.append("<balloon_alpha>"+bean.getBalloon_alpha()+"</balloon_alpha>\r\n")
					.append("<balloon_text_color>"+bean.getBalloon_text_color()+"</balloon_text_color>\r\n") 
					.append("<balloon_text><![CDATA["+bean.getBalloon_text()+"]]></balloon_text>\r\n")
					.append("<bullet>"+bean.getBullet()+"</bullet>\r\n") 
					.append("<bullet_size>"+bean.getBullet_size()+"</bullet_size>\r\n")
					.append("<bullet_color>"+bean.getBalloon_color()+"</bullet_color>\r\n") 
					.append("<bullet_alpha>"+bean.getBullet_alpha()+"</bullet_alpha>\r\n") 
					.append("<hidden>"+bean.isHidden()+"</hidden>\r\n")
				 	.append("<selected>"+bean.isSelected()+"</selected> \r\n")
					.append("<data_labels><![CDATA["+bean.getData_labels()+"]]></data_labels>\r\n") 
					.append("<data_labels_text_color>"+bean.getData_labels_text_color()+"</data_labels_text_color>\r\n")
					.append("<data_labels_text_size>"+bean.getData_labels_text_size()+"</data_labels_text_size>\r\n")
					.append("<data_labels_position>"+bean.getData_labels_position()+"</data_labels_position>\r\n")
					.append("<vertical_lines>"+bean.isVertical_lines()+"</vertical_lines>\r\n")
					.append("<visible_in_legend>"+bean.isVisible_in_legend()+"</visible_in_legend>\r\n")
					.append("</graph>\r\n");
				}
			xmlstr.append(str);
			}
		return xmlstr.toString();
	}
	
	/**
	 * 生成SliceData对象xml格式
	 * @param data
	 * @return
	 */
	public String sliceDataToString(SliceData data){
		StringBuffer xmlstr = new StringBuffer();
		xmlstr.append("<slice ")
			.append(" title=\"").append(StrUtil.formatNull(data.getTitle())).append("\"")
			.append(" pull_out=\"").append(StrUtil.formatNull(data.getPull_out())).append("\"")
			.append(" alpha=\"").append(StrUtil.formatNull(data.getAlpha())).append("\"")
			.append(" description=\"").append(StrUtil.formatNull(data.getDescription())).append("\">")
			.append(StrUtil.formatNull(data.getValue()))
			.append("</slice>\r\n");
		return xmlstr.toString();
	}
	/**
	 * 生成ValueData对象xml格式
	 * @param data
	 * @return
	 */
	public String valueDataToString(ValueData data){
		StringBuffer xmlstr = new StringBuffer();
		xmlstr.append("<value ")
			.append(" xid=\"").append(StrUtil.formatNull(data.getXid())).append("\"")
			.append(" color=\"").append(StrUtil.formatNull(data.getColor())).append("\">")
			.append(StrUtil.formatNull(data.getValue()))
			.append("</value>\r\n");
		return xmlstr.toString();
	}
	/**
	 * 生成GraphData对象xml格式
	 * @param data
	 * @return
	 */
	public String graphDataToString(GraphData data){
		StringBuffer xmlstr = new StringBuffer();
		xmlstr.append("<graph ").append(" gid=\"").append(StrUtil.formatNull(data.getGid())).append("\" ")
		.append("title=\"").append(StrUtil.formatNull(data.getTitle())).append("\">\r\n");
		List<ValueData> valueDataList = data.getValueData();
		if(null != valueDataList && !valueDataList.isEmpty()){
			for(ValueData valueData :  valueDataList){
				xmlstr.append(valueDataToString(valueData));
			}
		}
		xmlstr.append("</graph>\r\n");
		return xmlstr.toString();
	}
	
	/**
	 * 将柱形数据转换成xml格式
	 * @param data
	 * @return
	 */
	public String columnDataToString(ColumnData data){
		List<ValueData> series = data.getSeriesData();
		List<GraphData> graphs = data.getGraphsData();
		StringBuffer xmlstr = new StringBuffer();
		xmlstr.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n")
		.append("<"+data.getRootName()+">");
		xmlstr.append("<series>\r\n");
		if(null != series && !series.isEmpty()){
			for(ValueData valueData : series){
				xmlstr.append(valueDataToString(valueData));
			}
		}
		xmlstr.append("</series>\r\n");
		
		xmlstr.append("<graphs>\r\n");
		if(null != graphs && !graphs.isEmpty()){
			for(GraphData graphsData : graphs){
				xmlstr.append(graphDataToString(graphsData));
			}
		}
		xmlstr.append("</graphs>\r\n");
		xmlstr.append("</"+data.getRootName()+">");
		return xmlstr.toString();
	}
	
	/**
	 * 将线形数据转换成xml格式
	 * @param data
	 * @return
	 */
	public String lineDataToString(LineData data){
		List<ValueData> series = data.getSeriesData();
		List<GraphData> graphs = data.getGraphsData();
		StringBuffer xmlstr = new StringBuffer();
		xmlstr.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n")
		.append("<"+data.getRootName()+">");
		xmlstr.append("<series>\r\n");
		if(null != series && !series.isEmpty()){
			for(ValueData valueData : series){
				xmlstr.append(valueDataToString(valueData));
			}
		}
		xmlstr.append("</series>\r\n");
		
		xmlstr.append("<graphs>");
		if(null != graphs && !graphs.isEmpty()){
			for(GraphData graphsData : graphs){
				xmlstr.append(graphDataToString(graphsData));
			}
		}
		xmlstr.append("</graphs>\r\n");
		xmlstr.append("</"+data.getRootName()+">");
		return xmlstr.toString();
	}
	
	/**
	 * 将圆形数据转换成xml格式
	 * @param data
	 * @return
	 */
	public String pieDataToString(PieData data){
		List<SliceData> slices = data.getSliceData();
		StringBuffer xmlstr = new StringBuffer();
		xmlstr.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n")
		.append("<"+data.getRootName()+">");
		if(null != slices && !slices.isEmpty()){
			for(SliceData slicesData : slices){
				xmlstr.append(sliceDataToString(slicesData));
			}
		}
		xmlstr.append("</"+data.getRootName()+">");
		return xmlstr.toString();
	}
}
