package com.linewell.core.util;

import java.io.File;
import java.util.List;

import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.linewell.core.system.GlobalParameter;

/**
 * <p>
 *    prorxool连接池工具类
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Aug 7, 2012
 * @version 1.0  
 */
public class ProxoolUtil {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(ProxoolUtil.class); 
	/**
	 * 验证连接池是否存在
	 * 
	 * @param jndiName
	 * @return
	 */
	public static boolean checkJndi(String jndiName){
		boolean flag = false;
		String filePath = GlobalParameter.SYSTEM_REAL_PATH+"/WEB-INF/proxool.xml";
		try{
			File file = new File(filePath);
			SAXReader saxReader = new SAXReader();
			Document document = saxReader.read(file);
			Element root = document.getRootElement();
			List list = root.selectNodes("proxool/alias");
			for(int i=0;i<list.size();i++){
				Element element = (Element)list.get(i);
				if(element.getText().equals(jndiName)){
					flag = true;
					break;
				}
			}
		}catch(Exception e){
		    logger.error(e);
		}
		return flag;
	}
	
	/**
	 * 获取连接池配置信息
	 * 
	 * @param jndiName
	 * @return
	 */
	public static JSONObject getJndiConfig(String jndiName){
		JSONObject json = new JSONObject();
		String filePath = GlobalParameter.SYSTEM_REAL_PATH+"/WEB-INF/proxool.xml";
		try{
			File file = new File(filePath);
			SAXReader saxReader = new SAXReader();
			Document document = saxReader.read(file);
			Element root = document.getRootElement();
			List list = root.selectNodes("proxool");
			for(int i=0;i<list.size();i++){
				Element proxool = (Element)list.get(i);
				if(!proxool.element("alias").getText().equals(jndiName)){
					continue;
				}
				Element url = (Element) proxool.element("driver-url");
				Element username = (Element) proxool.selectSingleNode("driver-properties/property[@name='user']");
				Element password = (Element) proxool.selectSingleNode("driver-properties/property[@name='password']");
				json.put("url", url.getText());
				json.put("username", username.attributeValue("value"));
				json.put("password", password.attributeValue("value"));
			}
		}catch(Exception e){
		    logger.error(e);
		}
		return json;
	}
}