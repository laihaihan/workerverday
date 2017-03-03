package com.linewell.core.sms.template;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import com.linewell.core.system.GlobalParameter;

/**
 * <p>
 *    短信模板工厂
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Nov 23, 2012
 * @version 1.0  
 */
public class SmsTemplateFactory {
    private static final Logger logger = Logger.getLogger(SmsTemplateFactory.class);
	
	public static final Map map = new HashMap();
	
	public SmsTemplateFactory(){
		map.put(GlobalParameter.APP_CORE, "com.linewell.was.sms.WasSmsTemplateImpl");
	}
	
	public ISmsTemplate produce(String app_unid){
		String className = (String)map.get(app_unid);
		ISmsTemplate implClass = null;//工厂生产对象：格式化短信模板内容的实现类
		try {
			implClass = (ISmsTemplate)(Class.forName(className).newInstance());
		} catch (InstantiationException e) {
		    logger.error(e);
		} catch (IllegalAccessException e) {
		    logger.error(e);
		} catch (ClassNotFoundException e) {
		    logger.error(e);
		}
		return implClass;
	}
}
