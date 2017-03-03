package com.linewell.core.observer;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

/**  
 * <p>观察者配置文件解析器</p>
 *   
 */  
public class ObserverConfigSAXParser extends DefaultHandler {

	Stack<String> tags = null;

    ObserverConfig obConfig = null;

	private String classname;

	private String userable;
    
    private List<ObserverBean> list;
    
    /**
     * 解析
     * @param is
     * @throws Exception
     */
    public void parse(InputStream is) throws Exception {
        SAXParserFactory spf = SAXParserFactory.newInstance();
		SAXParser sp = spf.newSAXParser(); // 初始化解析器
		InputSource isrc = new InputSource(is); // 读取xml输入流
		sp.parse(isrc, this);

		isrc = null;
		is.close();
		is = null;
    }

	/**
	 * 开始读取XML文档初始化的方法
	 */
	public void startDocument() throws SAXException {
		this.tags = new Stack<String>();
		this.obConfig = new ObserverConfig();
		this.list = new ArrayList<ObserverBean>();
	}

	/**
	 * 开始一个元素的方法
	 */
	public void startElement(String uri, String localName, String qName,
			Attributes attributes) throws SAXException {
		if (qName.equals("observer")) {
			this.classname = attributes.getValue("classname");
			this.userable = attributes.getValue("userable");			
		}
		
		this.tags.push(qName);// 堆栈

	}

	/**
	 * 开始一段文本的方法
	 */
	public void characters(char[] ac, int start, int length) throws SAXException {

    }

	/**
	 * 结束一个元素的方法
	 */
	public void endElement(String uri, String localName, String qName) throws SAXException {
		this.tags.pop();// 出栈
		if (qName.equals("observer")) {
			this.addToContainer();
		}
	}

	/**
	 * 结束读取XML文档的方法
	 */

	public void endDocument() throws SAXException {

	}

	/**
	 * 将数据增加到容器里
	 */
	private void addToContainer() {
		ObserverBean ob = new ObserverBean();
        ob.setClassname(this.classname);
        ob.setUserable(this.userable);
		this.list.add(ob);
	}
    
    /**
     *
     * @return 解析好的观察者对象集合
     */
    public ObserverConfig getObserverConfig() {
        this.obConfig.setObservers(this.list);
        return this.obConfig;
    }
}