package com.linewell.core.html;

import java.io.ByteArrayInputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.dom4j.io.SAXReader;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

/**
 * html填充
 * @author zjianhui@linewell.com
 *
 */
public class HtmlFilling {
	private static final Logger logger = Logger.getLogger(HtmlFilling.class);
	
	/**
	 * 根据域id将xml的值对应的填充到html
	 * @param htmlStr
	 * @param Xml
	 * @return
	 */
	public static String fillingByXml(String htmlStr , String xml,HttpServletRequest request){
		Document doc = Jsoup.parse(htmlStr); 
		
		SAXReader saxReader = new SAXReader();
		try{
			org.dom4j.Document  document =  saxReader.read(new ByteArrayInputStream(xml.getBytes("gbk")));
			org.dom4j.Element root = document.getRootElement();
			//定位baseinfo节点
			org.dom4j.Element InfoElement = root.element("Info");
			org.dom4j.Element baseInfoElement = InfoElement.element("BaseInfo");
			List baseInfoList = baseInfoElement.elements();
			 
			//解析baseinfo节点
			for (int i = 0; i < baseInfoList.size(); i++) {
				org.dom4j.Element ee = (org.dom4j.Element)baseInfoList.get(i);
				doc.getElementById(ee.attributeValue("FieldName")).html(ee.getText()); //填充
			}

			org.dom4j.Element attrsElement = InfoElement.element("Attrs");
			List AttrsList = attrsElement.elements();
			//解析Attrs节点 并将图片存储到session里面
			for (int i = 0; i < AttrsList.size(); i++) {
				org.dom4j.Element ee = (org.dom4j.Element)AttrsList.get(i);
				request.setAttribute(ee.attributeValue("FieldName"), ee.getText());
				request.getSession().setAttribute(ee.attributeValue("FieldName"), ee.getText());
			}
		}catch(Exception e){
			logger.error(e.getMessage());
		}
		
		return doc.toString();
	}
	
	
	/**
	 * 服务端田东指定html的域
	 * @param htmlStr html值
	 * @param key 域名 
	 * @param value 域值
	 * @return 填充后的html
	 */
	public static String fillingKeyByValue(String htmlStr ,String key,String value){
		Document doc = Jsoup.parse(htmlStr); 
		if(null != doc.getElementById(key)){
			doc.getElementById(key).val(value);	
		}
		
		return doc.toString();
	}
	
	
}
