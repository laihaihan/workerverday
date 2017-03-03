package com.linewell.core.form.dictionary;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

/**
 * 业务表单字典形式数据
 * @author JSC
 *
 */
public class FormDictionaryBussiness {
	
    private static final Logger logger = Logger.getLogger(FormDictionaryBussiness.class);
	/**
	 * 获取字典键和值
	 * @param unid 字典主键
	 * @return 
	 */
	public Map<String, String> getDictMapByUnid(String unid){
		Map<String, String> dictMap = new LinkedHashMap<String, String>();
		FormDictionaryManager formDictionaryManager = new FormDictionaryManager();
		FormDictionary formDictionary = formDictionaryManager.doFindBeanByKey(unid);
		//空直接返回null
		if(null == formDictionary){
			return null;
		}
		
		//遍历字典大字段xml
		formDictionary.getContent();
		InputStream is = new ByteArrayInputStream(formDictionary.getContent().getBytes());	
		SAXReader reader = new SAXReader();
		Document doc;
		try {
			doc = reader.read(is);
			Element root = doc.getRootElement();
			List dictList = root.elements("value");
			for (int i = 0; i < dictList.size(); i++) {
				Element elementDict = (Element)dictList.get(i);
				//System.out.println(elementDict.getText());
				//System.out.println(elementDict.valueOf("@alias"));
				dictMap.put(elementDict.valueOf("@alias"), elementDict.getText());
				
			}
			
		} catch (DocumentException e) {
		    logger.error(e);
		}
		return dictMap;
	}
}
