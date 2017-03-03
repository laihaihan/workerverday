package com.linewell.core.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.XMLWriter;
import com.linewell.ucap.util.EnvironmentUtil;

import java.io.*;

/**
 * 解析xml文件
 * @author lhansheng@linewell.com
 * @date 2010-11-17
 */
public class XmlDom4J 
{
	private static final Log LOG = LogFactory.getLog(XmlDom4J.class);
	String resourceRoot = EnvironmentUtil.getInstance().getWebInfPath();
	String webAppRoot = resourceRoot.substring(0, resourceRoot.indexOf("WEB-INF"));
	private String path = webAppRoot + "jsp/chart/";

	public String slqsPath = path + "/amline_data.xml"; 
	public String bjqsPath = path + "/bjqs/amline_data.xml"; 
	public String syPath = path + "/premiere/amline_data.xml"; 
	public String sp_effistate_path = webAppRoot + "/amchart/spxml/ampie_data_effistate.xml"; 
	public String sp_handlestate_path = webAppRoot + "/amchart/spxml/amcolumn_data_handlestate.xml"; 
	public String sp_handlestate_txt_path = webAppRoot + "/amchart/spxml/amcolumn_data_handlestate.txt"; 
	public String sy_bnjc_path = webAppRoot + "/essmonitor/amline_data.xml"; 
	

	/**
	 * <?xml version="1.0" encoding="UTF-8"?>
		<chart>
			<series>
				<value xid="0">1950</value>
				<value xid="1">2006</value>
			</series>
			<graphs>
				<graph gid="1">
					<value xid="0">2.51</value>
					<value xid="1">58.30</value>
				</graph>
				<graph gid="2">
					<value xid="0">19.73</value>
					<value xid="1">58.30</value>
				</graph>
			</graphs>
		</chart>
	 * @param series
	 * @param graphs
	 */
	public boolean generateDocument2(String[] series, String[][] graphs, String bjqsPath, String url) {
		Document document = DocumentHelper.createDocument();
		Element chartElement = document.addElement("chart");
//		String url="../../../ess/jsp/apas/monitor/view/view_list1.jsp?area=350500_0000000000000000000000000&view=jcfpl1";
		Element seriesElement = chartElement.addElement("series");
		for (int i = 0; i < series.length; i++) {
			valueElement(seriesElement, i, series[i]);
		}
		
		Element graphsElement = chartElement.addElement("graphs");
		for (int i = 0; i < graphs.length; i++) {
			Element graphElement = graphsElement.addElement("graph");
			graphElement.addAttribute("gid", String.valueOf(i+1));
			String[] graph = graphs[i];
			for (int j = 0; j < graph.length; j++) {
				if(null==graphs[i][j]||graphs[i][j].equals("")||graphs[i][j].equals("0"))
					valueElement(graphElement, j, graph[j],"");
				else
				valueElement(graphElement, j, graph[j],url+"&graphs="+(String.valueOf(i)+"/"+series[j]));
			}
		}
		return write(bjqsPath, document);
	}
	
	public boolean generateDocument(String[] series, String[][] graphs, String bjqsPath,String url) {
		Document document = DocumentHelper.createDocument();
		Element chartElement = document.addElement("chart");
		
		Element seriesElement = chartElement.addElement("series");
		for (int i = 0; i < series.length; i++) {
			valueElement(seriesElement, i, series[i]);
		}
		
		Element graphsElement = chartElement.addElement("graphs");
		for (int i = 0; i < graphs.length; i++) {
			Element graphElement = graphsElement.addElement("graph");
			graphElement.addAttribute("gid", graphs[i][0]);
			graphElement.addAttribute("title", graphs[i][0]);
			String[] graph = graphs[i];
			for (int j = 0; j < graph.length-1; j++) {
				valueElement(graphElement, j, graph[j+1],url);
			}
		}
		return write(bjqsPath, document);
	}
	

	/**
	 * <?xml version="1.0" encoding="UTF-8"?>
		
		<chart>
		  <series>
		    <value xid="0">2000</value>
		    <value xid="1">2010</value>
		  </series>
		  <graphs>
		    <graph gid="1">
		      <value xid="0">119.73</value>
		      <value xid="1">258.30</value>
		    </graph>
		  </graphs>
		</chart>

	 * @param values
	 */
	public boolean generateDocument(String[][] values) {
		Document document = DocumentHelper.createDocument();
		Element chartElement = document.addElement("chart");

		Element seriesElement = chartElement.addElement("series");

		Element graphsElement = chartElement.addElement("graphs");
		Element graphElement = graphsElement.addElement("graph");
		graphElement.addAttribute("gid", "1");
		for (int f = 0; f < values.length; f++) {
			valueElement(seriesElement, f, values[f][0]);
			valueElement(graphElement, f, values[f][1]);
		}
		return write(slqsPath, document);
	}
	
	/**
	 * <?xml version="1.0" encoding="UTF-8"?>
		<pie>
			<slice title="发改局">10</slice>
			<slice title="建设局">22</slice>
			<slice title="其他">48</slice>
		</pie>
	 * @param values
	 * @return
	 */
	public boolean generateDocument4Pie(String[][] values) {
		Document document = DocumentHelper.createDocument();
		Element pieElement = document.addElement("pie");

		for (int i = 0; i < values.length; i++) {
			valueElement(pieElement, values[i][0], values[i][1],values[i][2]);
		}
		return write(sp_effistate_path, document);
	}


	/**
	 * <value xid="0">19.73</value>
	 * 
	 * @param footElement
	 * @param xid
	 * @param text
	 */
	private void valueElement(Element footElement, int xid, String text) {
		Element valueElement = footElement.addElement("value");
		valueElement.addAttribute("xid", String.valueOf(xid));
		text = null==text? "0":text;
		valueElement.setText(text);
	}
	
	private void valueElement(Element footElement, int xid, String text,String url) {
		Element valueElement = footElement.addElement("value");
		valueElement.addAttribute("xid", String.valueOf(xid));
		url=null==url?"":url;
		text = null==text? "0":text;		
		valueElement.addAttribute("url",url);
		valueElement.setText(text);
	}
	
	
	
	/**
	 * <slice title="发改局">10</slice>
	 * @param footElement
	 * @param title
	 * @param text
	 */
	private void valueElement(Element footElement, String title, String text) {
		Element sliceElement = footElement.addElement("slice");
		title = null==title? "0":title;
		text = null==text? "0":text;
		sliceElement.addAttribute("title", title);
		sliceElement.setText(text);
	}
	
	private void valueElement(Element footElement, String title, String text,String url) {
		Element sliceElement = footElement.addElement("slice");
		title = null==title? "0":title;
		text = null==text? "0":text;
		url=null==url?"#":url;
		sliceElement.addAttribute("title", title);
		sliceElement.addAttribute("url",url);
		sliceElement.setText(text);
	}

	private boolean write(String bjqsPath, Document document) {
		try {
			XMLWriter output = new XMLWriter(new FileOutputStream(bjqsPath));
			output.write(document);
			output.close();
			java.lang.Thread.sleep(1234);
			return true;
		} catch (InterruptedException e) {
			LOG.error(e.getMessage());
		} catch (IOException e) {
			LOG.error(e.getMessage());
		}
		return false;
	}
	
	public boolean generateDataToFile(String[] types, String[][] values, String filepath,String url){

		StringBuffer fileContent=new StringBuffer(); 
		for (int i = 0; i < types.length; i++) {
			fileContent.append(types[i]).append(";");
			fileContent.append(values[0][i+1]).append("\r\n");
		}
		
		return this.saveToFile(filepath,"", fileContent.toString());
	}
	
	public boolean saveToFile(String filePath,String mkdirPath, String fileContent) { 
		   boolean flag = false;
		   try {
			   /*查找目录，如果不存在，就创建*/
//		       File dirFile = new File("e:\\test\\");
//		        if(!dirFile.exists()){
//		            if(!dirFile.mkdir())
//		            	LOG.error("目录不存在，创建失败！");
//		        }
		        /*查找文件，如果不存在，就创建*/
		        File file = new File(filePath);
		        if(!file.exists()){
		            if(!file.createNewFile()){
		            	LOG.error("文件不存在，创建失败！");
		            }
		        }
			   FileOutputStream out=new FileOutputStream(file,false);//不采用追加方式
//			   FileOutputStream out=new FileOutputStream(file,true);//采用追加方式
			   out.write(fileContent.getBytes("utf-8")); 
			   out.close();
			   flag = true;
			} catch (Exception e) {
				LOG.error(e.getMessage());
			}
			return flag;		  
	}
	
	
}
