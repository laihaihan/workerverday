package com.linewell.core.html;


import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import javax.swing.text.MutableAttributeSet;
import javax.swing.text.html.HTML;
import javax.swing.text.html.HTMLEditorKit;
import javax.swing.text.html.HTMLEditorKit.ParserCallback;
import javax.swing.text.html.parser.ParserDelegator;

import org.apache.log4j.Logger;


/**
 * 功能说明：对html的解析
 * 版本号：V1.0
 * 创建人：zjianhui@linewell.com  创建时间：Mar 21, 2011
 * 修改内容：****
 */
public class ParserHtml extends ParserCallback { //继承ParserCallback，解析结果驱动这些回调方法
    private static final Logger logger = Logger.getLogger(ParserHtml.class);
	protected String base;
	protected String textareaName = "";
	protected boolean isImg = false;
	protected boolean isParagraph = false;
	protected static Vector<String> element = new Vector<String>();
	protected static String paragraphText = new String();


	public static Map hmp = new HashMap();
	
	public ParserHtml() {

	}

	public static String getParagraphText() {
		return paragraphText;
	}

	public void handleComment(char[] data, int pos) {
	}

	public void handleEndTag(HTML.Tag t, int pos) {
		if (t == HTML.Tag.TEXTAREA) {
			if (isParagraph) {
				isParagraph = false;
			}
		} else if (t == HTML.Tag.INPUT) {
			if (isImg) {
				isImg = false;
			}

		}
	}

	public void handleError(String errorMsg, int pos) {
	}

	public void handleSimpleTag(HTML.Tag t, MutableAttributeSet a, int pos) {
		handleStartTag(t, a, pos);
	}

	public void handleStartTag(HTML.Tag t, MutableAttributeSet a, int pos) {
		HtmlBean hb = new HtmlBean();
		if (t == HTML.Tag.TEXTAREA) {
			String name = (String) a.getAttribute(HTML.Attribute.NAME);
			isParagraph = true;
			textareaName = name;
			//System.out.println("TEXTAREA name:"+name);
			hb.setName(name);
			hb.setDefaultValue("");
			hb.setType(t.toString());
			hmp.put(name, hb);
		} else if ((t == HTML.Tag.INPUT)) {
			String name = (String) a.getAttribute(HTML.Attribute.NAME);
			String value = (String) a.getAttribute(HTML.Attribute.VALUE);
			String type = (String) a.getAttribute(HTML.Attribute.TYPE);

			if (name != null) {
				hb.setName(name);
				hb.setDefaultValue(value);
				hb.setType(type);
				hmp.put(name, hb);
				isImg = true;
			}
		} else if ((t == HTML.Tag.SELECT)) {
			String name = (String) a.getAttribute(HTML.Attribute.NAME);
			String value = (String) a.getAttribute(HTML.Attribute.VALUE);
			
			String type = "select";

			if (name != null) {
				hb.setName(name);
				hb.setDefaultValue(value);
				hb.setType(type);
				hmp.put(name, hb);
				isImg = true;
			}
		}
		//System.out.println(a.toString());
	}

	public void handleText(char[] data, int pos) {
		//textarea 设置默认值目前不支持，有待改进
		if (isParagraph) {
			String tempParagraphText = new String(data);
			if (textareaName != null) {
				//hmp.put(textareaName, tempParagraphText);
			}
		}
	}

	public  Map startParse(String sHtml) {
		try {
			ParserDelegator ps = new ParserDelegator();//负责每次在调用其 parse 方法时启动一个新的 DocumentParser
			HTMLEditorKit.ParserCallback parser = new ParserHtml();//解析结果驱动这些回调方法。
			ps.parse(new StringReader(sHtml), parser, true);//解析给定的流并通过解析的结果驱动给定的回调。
		} catch (Exception e) {
		    logger.error(e);
		}
		return hmp;
	}

	public static void main(String args[]) {
		/*File file = new File("C:/Users/JSC/Desktop/ww.html");
		ParserHtml ph = new ParserHtml();
		try {
			Map hmp = ph.startParse(FileTool.loadAFileToString(file));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		hmp.clear();*/
		
	}

}
