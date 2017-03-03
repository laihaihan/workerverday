package com.linewell.core.sms;

import java.util.List;

import com.linewell.core.sms.template.SmsTemplate;
import com.linewell.core.util.DateTime;
import com.linewell.core.util.UNIDGenerate;

/**
 * <p>
 *    短信对外api
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Nov 23, 2012
 * @version 1.0  
 */
public class SmsAPI {
	/**
	 * 获取所有未发送短信
	 * @return List 封装AppSms对象
	 */
	public static List getAllNotSendList(){
		SmsManager manager = new SmsManager();
		List list = manager.doFindListByCondition(" flag='0'", new Object[0]);
		return list;
	}
	
	/**
	 * 改变发送状态
	 * @param list  封装AppSms对象
	 * @param status  状态(0:未发送;1:已发送)
	 * @return 改变的记录数
	 */
	public static int changeSendStatus(List list,String status){
		int count = 0;
		SmsManager manager = new SmsManager();
		for (int i = 0; i < list.size(); i++) {
			Sms sms =(Sms)list.get(i);
			sms.setStatus(status);
			if(manager.doUpdate(sms)){
				count = count + 1;
			}
		}
		return count;
	}
	
	/**
	 * 单条发送短信
	 * @param receiver 接收号码
	 * @param content 短信内容
	 * @return 操作是否成功
	 */
	public static boolean sendMsg(String receiver,String content,String sender,SmsTemplate smsTemplate){
		Sms sms = new Sms();
		sms.setUnid(new UNIDGenerate().getUnid());
		sms.setSendtime(DateTime.getNowDateTime());
		sms.setReceiver(receiver);
		sms.setContent(content);
		sms.setStatus("0");//默认为“未发送”
		sms.setSender(sender);
		sms.setType(smsTemplate.getType());
		sms.setMemo(smsTemplate.getMemo());
		sms.setApp_unid(smsTemplate.getApp_unid());
		SmsManager manager = new SmsManager();
		return manager.doSave(sms);
	}
}