package com.linewell.core.sms.template;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.db.DbObjectManager;

/**
 * <p>
 *  短信模板数据库操作
 * </p>
 * 
 * @author:zjianhui email:qcongyong@linewell.com
 * @version 1.0.0 2012-11-23 09:27:47
 *
 */
public class SmsTemplateManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_SMS_TEMPLATE","UNID", GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(SmsTemplate smsTemplate){
		return dbObjectManager.doSave(smsTemplate);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(SmsTemplate smsTemplate){
		return dbObjectManager.doUpdate(smsTemplate);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public SmsTemplate doFindBeanByKey(String keyValue){
		return (SmsTemplate)dbObjectManager.doFindBeanByKey(new SmsTemplate(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public SmsTemplate doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (SmsTemplate)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new SmsTemplate(),condition,objs);
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
}