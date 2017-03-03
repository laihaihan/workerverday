package com.linewell.core.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.StringReader;
import java.util.List;

import org.apache.log4j.Logger;
import org.jdom.Content;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.Namespace;
import org.jdom.input.SAXBuilder;
import org.jdom.output.XMLOutputter;
import org.xml.sax.InputSource;
import org.jdom.output.Format;

public class XMLUtil {
	private static Logger log = Logger.getLogger(XMLUtil.class);

	public void createXml(String fileName) {
		Document document;
		Element root;
		root = new Element("employees");
		document = new Document(root);
		Element employee = new Element("employee");
		root.addContent(employee);
		Element name = new Element("name");
		name.setText("ddvip");
		employee.addContent(name);
		Element sex = new Element("sex");
		sex.setText("m");
		employee.addContent(sex);
		Element age = new Element("age");
		age.setText("23");
		employee.addContent(age);
		XMLOutputter XMLOut = new XMLOutputter();
		try {
			XMLOut.output(document, new FileOutputStream(fileName));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	

	/**
	 * 初始化strus.xml
	 * @param fileName
	 * @param configXmlName
	 * @throws JDOMException
	 * @throws IOException
	 */
	 public void parserXml(String fileName,String configXmlName) throws JDOMException, IOException {   
		 SAXBuilder builder=new SAXBuilder(false);    
		 Document document=builder.build(fileName);   
		 Element elements=document.getRootElement();    
		 List elementsList=elements.getChildren("include"); 
		 
		 //判读是否已经存在信息
		 boolean isExit = false;
		 for (int i = 0; i < elementsList.size(); i++) {
			 Element element = (Element)elementsList.get(i);
			 System.out.println(element.getAttribute("file").getValue());
			 //系统已经存在跳出循环
			 if(element.getAttribute("file").getValue().equals(configXmlName)){
				 isExit = true;
				 break;
			 }
			 
		 }
		 //不存在则创建
		 System.out.println(isExit);
		 if(!isExit){
			 System.out.println(11);
			 Element includeElement = new Element("include");
			 includeElement.setAttribute("file", configXmlName);
			 elements.addContent(includeElement);
			 XMLOutputter out = new XMLOutputter() ;
		     Format format = Format.getCompactFormat() ;
		     format.setEncoding("UTF-8") ;
		     format.setIndent("  ") ;
		     out.setFormat(format) ;
		     out.output(document, new FileOutputStream(new File(fileName))) ;
		 }
		 
		 
		 
		 
	 }
	

	 public static void main(String[] args) {
		String xmlPath = "D:/workspace/partyaffairsplt1.0/src/struts.xml";
		System.out.println(xmlPath);
		XMLUtil xMLUtil = new XMLUtil();
		try {
			xMLUtil.parserXml(xmlPath,"test.struts.xml");
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	 
	/**
	 * 解析字符串XML,构造成为节点List
	 * 
	 * @param xmlDoc
	 * @return
	 * @authur yq
	 * @since 2013-3-5
	 */
	public List xmlElements(String xmlDoc) {
		// 创建一个新的字符串
		StringReader read = new StringReader(xmlDoc);
		// 创建新的输入源SAX 解析器将使用 InputSource 对象来确定如何读取 XML 输入
		InputSource source = new InputSource(read);
		// 创建一个新的SAXBuilder
		SAXBuilder sb = new SAXBuilder();
		List noteList = null;

		try {
			// 通过输入源构造一个Document
			Document doc = sb.build(source);
			// 取的根元素
			Element root = doc.getRootElement();
			// 得到根元素所有子元素的集合
			noteList = root.getChildren();

		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return noteList;
	}

	/**
	 * @param noteList
	 * @param nameArray
	 *            要找到指定元素，记录各个层次节点的名称数组 如要找到Desc的值
	 *            ["MessageBody","MessageBody2","Desc"] MessageBody
	 *            为根节点下的第一层节点 MessageBody2 为根节点下的第二层节点 Desc 为最后一层指定的节点
	 * @return
	 * @authur yq
	 * @since 2013-3-5
	 */
	public String getMatchValue(List nodeList, String[] nameArray) {
		String result = "";
		Element et = null;

		for (int i = 0; i < nodeList.size(); i++) {
			et = (Element) nodeList.get(i);// 循环依次得到子元素

			if (nameArray.length > 0) {
				// 匹配指定的第一层节点
				if (et.getName().equals(nameArray[0])) {
					List chNodes = et.getChildren();
					result = this.getNextChNodes(chNodes, nameArray, 1);
				}
			}

		}
		return result;
	}

	/**
	 * 递归遍历直至找到指定节点的匹配值
	 * 
	 * @param nodes
	 * @param nameArray
	 * @param count
	 * @return
	 * @authur yq
	 * @since 2013-3-5
	 */
	private String getNextChNodes(List nodes, String[] nameArray, int count) {
		String name = nameArray[nameArray.length - 1];
		String result = "";
		Element chEt = null;
		for (int j = 0; j < nodes.size(); j++) {
			if (!StrUtil.isNull(result)) {
				break;
			}
			chEt = (Element) nodes.get(j);
			// 找到匹配的名称
			if (chEt.getName().equals(name)) {
				result = chEt.getValue();
				break;
			}
			if (StrUtil.isNull(result)
					&& chEt.getName().equals(nameArray[count])) {
				List chNodes = chEt.getChildren();
				if (!chNodes.isEmpty()) {
					result = this.getNextChNodes(chNodes, nameArray, ++count);
				}
			}
		}
		return result;
	}
}
