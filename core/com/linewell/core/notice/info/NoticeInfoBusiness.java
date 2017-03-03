package com.linewell.core.notice.info;

import java.util.List;

/**
 * 公告业务处理类
 * @author JSC
 *
 */
public class NoticeInfoBusiness {
	
	NoticeInfoManager noticeInfoManager = new NoticeInfoManager();
	/**
	 * 获取发布公告
	 * @param count 要获取的总条数
	 * @return NoticeInfo对象
	 */
	public List<NoticeInfo> getPublishInfo(int count){
		Object[] objs = new Object[0];
		List<NoticeInfo> list = noticeInfoManager.doFindListByCondition(" publish_time is not null and rownum <= "+count, objs);
		return list;
	}
}
