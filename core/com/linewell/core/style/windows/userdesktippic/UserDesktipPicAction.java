package com.linewell.core.style.windows.userdesktippic;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;

/**
 * <p>
 * 	 Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-12-12 11:27:01
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class UserDesktipPicAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		UserDesktipPicManager manager = new UserDesktipPicManager();
		
        //1、新增
        if("add".equals(fn)){
        	UserDesktipPic userDesktipPic = new UserDesktipPic();
        	BeanUtil.updateBean(request, userDesktipPic);    
        	result = manager.doSave(userDesktipPic);
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	UserDesktipPic userDesktipPic = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, userDesktipPic);
        	result = manager.doUpdate(userDesktipPic);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "UNID in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }else if("setUserDesktopPic".equals(fn)){
        	UserDesktipPicBussiness userDesktipPicBussiness = new UserDesktipPicBussiness();
        	result =  userDesktipPicBussiness.setUserDesktopPic(request);
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}