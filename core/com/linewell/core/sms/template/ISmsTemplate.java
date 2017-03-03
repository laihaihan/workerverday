package com.linewell.core.sms.template;
/**
 * <p>
 *    短信模板接口
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Nov 23, 2012
 * @version 1.0  
 */
public interface ISmsTemplate {
	
	/**
	 * 格式化短信内容，将其中的关键字替换成具体的信息
	 * 
	 * @return
	 */
	public String formatContent(String content,Object object);
}
