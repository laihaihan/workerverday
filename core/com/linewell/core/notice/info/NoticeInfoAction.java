package com.linewell.core.notice.info;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.session.Session;

/**
 * <p>
 * 	公告信息 Action
 * </P>
 * 
 * @author qcongyong@linewell.com
 * @date 2012-10-30 11:39:47
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class NoticeInfoAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
    	Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		User user = ucapSession.getUser();
		
		boolean result = true;
		String fn = request.getParameter("fn");
		NoticeInfoManager manager = new NoticeInfoManager();
		
        //1、新增
        if("add".equals(fn)){
        	NoticeInfo noticeInfo = new NoticeInfo();
        	BeanUtil.updateBean(request, noticeInfo);    
        	result = manager.doSave(noticeInfo);
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	NoticeInfo noticeInfo = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, noticeInfo);
        	result = manager.doUpdate(noticeInfo);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "UNID in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }
        //4、发布
        else if("publish".equals(fn)){
        	String ids = StrUtil.formatNull(request.getParameter("ids"));
        	String[] unid = ids.split(",");
        	for(int i=0;i<unid.length;i++){
        		result = result && manager.doPublish(unid[i], user);
        	}
        }
        //5、取消发布
        else if("unPublish".equals(fn)){
        	String ids = StrUtil.formatNull(request.getParameter("ids"));
        	String[] unid = ids.split(",");
        	for(int i=0;i<unid.length;i++){
        		result = result && manager.doUnPublish(unid[i], user);
        	}
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}