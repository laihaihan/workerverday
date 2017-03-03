package com.linewell.core.sms;

import java.util.List;

import com.linewell.core.sms.template.ISmsTemplate;
import com.linewell.core.sms.template.SmsTemplateFactory;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  短信表数据库操作
 * </p>
 * 
 * @author:zjianhui email:qcongyong@linewell.com
 * @version 1.0.0 2012-11-23 09:02:10
 *
 */
public class SmsManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_SMS","UNID", GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(Sms sms){
		return dbObjectManager.doSave(sms);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Sms sms){
		return dbObjectManager.doUpdate(sms);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public Sms doFindBeanByKey(String keyValue){
		return (Sms)dbObjectManager.doFindBeanByKey(new Sms(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public Sms doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (Sms)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new Sms(),condition,objs);
	}
	
	/**
	 * 根据主键删除单个对象
	 */
	public boolean doDeleteByKey(String keyValue){
		String condition = "UNID='" + keyValue + "'";
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}

	public String formatContent(String app_unid, String content, Object object){
		SmsTemplateFactory factory = new SmsTemplateFactory();
		ISmsTemplate smsTemplateImpl = factory.produce(app_unid);
		return smsTemplateImpl.formatContent(content, object);
	}
}