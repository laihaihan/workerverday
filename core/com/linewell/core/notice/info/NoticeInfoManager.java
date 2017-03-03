package com.linewell.core.notice.info;

import java.util.List;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.DateTime;
import com.linewell.core.db.DbObjectManager;
import com.linewell.ucap.platform.cache.user.User;

/**
 * <p>
 *  公告信息数据库操作
 * </p>
 * 
 * @author:邱聪勇 email:qcongyong@linewell.com
 * @version 1.0.0 2012-10-30 11:39:47
 *
 */
public class NoticeInfoManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("CORE_NOTICE_INFO","UNID",GlobalParameter.APP_CORE);
	
	/**
	 * 新增
	 */
	public boolean doSave(NoticeInfo noticeInfo){
		return dbObjectManager.doSave(noticeInfo);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(NoticeInfo noticeInfo){
		return dbObjectManager.doUpdate(noticeInfo);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public NoticeInfo doFindBeanByKey(String keyValue){
		return (NoticeInfo)dbObjectManager.doFindBeanByKey(new NoticeInfo(), keyValue);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public NoticeInfo doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (NoticeInfo)list.get(0) : null;
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List<NoticeInfo> doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new NoticeInfo(),condition,objs);
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
	
	/**
	 * 发布
	 */
	public boolean doPublish(String unid,User user){
		NoticeInfo noticeInfo = this.doFindBeanByKey(unid);
		noticeInfo.setPublish_time(DateTime.getNowDateTime());
		noticeInfo.setPublish_userunid(user.getUnid());
		noticeInfo.setPublish_username(user.getDisplayName());
		return this.doUpdate(noticeInfo);
	}
	
	/**
	 * 取消发布
	 */
	public boolean doUnPublish(String unid,User user){
		NoticeInfo noticeInfo = this.doFindBeanByKey(unid);
		noticeInfo.setPublish_time("");
		noticeInfo.setPublish_userunid("");
		noticeInfo.setPublish_username("");
		return this.doUpdate(noticeInfo);
	}
}