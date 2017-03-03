package com.linewell.core.html;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.log4j.Logger;
import org.dom4j.io.SAXReader;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.linewell.core.util.FileUtil;

public class JsoupParserHtml {
    private static final Logger logger = Logger.getLogger(JsoupParserHtml.class);
	/**
	 * 获取html指定内容
	 * @param file html文件对象
	 * @param charsename  html编码
	 * @param baseUrl  网站地址
	 * @return
	 */
	public static String getBody(File file,String charsename,String baseUrl){
		Document doc;
		try {
			doc = Jsoup.parse(file, charsename, baseUrl);
			 Elements elements = doc.getElementsByTag("body"); 
			 for (Element element : elements) { 
				 return element.html();
			 } 
		} catch (IOException e) {
		    logger.error(e);
		} 
		return null;
	}
	
	
	public static String getTagList(File file,String tagName,String charsename,String baseUrl){
		Document doc;
		String retValue = "";
		try {
			doc = Jsoup.parse(file, charsename, baseUrl);
			 Elements elements = doc.getElementsByTag(tagName); 
			 for (Element element : elements) { 
				 retValue = retValue + element.toString();
			 } 
		} catch (IOException e) {
		    logger.error(e);
		} 
		return retValue;
	}
	
	
	public static void main(String[] args) throws IOException {
		 File input = new File("C:/Users/Administrator/Desktop/body.html"); 
		 File inputXml = new File("D:/workspace/was6.1/doc/程序设计文档/表单设计器/文档/表单返回xml.xml"); 
		 String xml =  FileUtil.fileToString(inputXml, "GBK");
			SAXReader saxReader = new SAXReader();
			String tablespace="";
			try{
				org.dom4j.Document  document =  saxReader.read(new ByteArrayInputStream(xml.getBytes("gbk")));
				org.dom4j.Element root = document.getRootElement();

				org.dom4j.Element InfoElement = root.element("Info");
				
				org.dom4j.Element baseInfoElement = InfoElement.element("BaseInfo");
				List baseInfoList = baseInfoElement.elements();
				System.out.println(baseInfoList.size());
				for (int i = 0; i < baseInfoList.size(); i++) {
					org.dom4j.Element ee = (org.dom4j.Element)baseInfoList.get(i);
					System.out.println(ee.attributeValue("FieldName"));
					System.out.println(ee.getText());
				}
				
				//org.dom4j.Element element = (org.dom4j.Element)root.selectSingleNode("/Infos/Info/BaseInfo/Field[@FieldName='username']");
				//System.out.println("element.getText():"+element.getText());

			}catch(Exception e){
			    logger.error(e);
			}
		 
	/*	 Document doc = Jsoup.parse(input, "gbk", "http://127.0.0.1/was"); 
		 doc.getElementById("lb_username").html("张建辉");
		 System.out.println(doc.toString());*/
		 
		 /*
		 Elements elements = doc.getElementsByTag("body"); 
		 for (Element element : elements) { 
			 System.out.println(element.html());
		 } 
		 elements = doc.getElementsByTag("style"); 
		 for (Element element : elements) { 
			 System.out.println("~~~~style~~~~~"+element.html());
		 } 
		
		 elements = doc.getElementsByTag("script"); 
		 for (Element element : elements) { 
			 System.out.println("~~~~script~~~~~"+element.toString());
		 } 
		 
		 elements = doc.getElementsByTag("link"); 
		 for (Element element : elements) { 
			 System.out.println("~~~~link~~~~~"+element.toString());
		 } */
	}
}
