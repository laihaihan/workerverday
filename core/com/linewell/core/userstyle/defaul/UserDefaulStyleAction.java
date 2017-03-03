package com.linewell.core.userstyle.defaul;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;

/**
 * <p>
 * 	用户默认样式 Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-12-18 17:01:42
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class UserDefaulStyleAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		UserDefaulStyleManager manager = new UserDefaulStyleManager();
		
        //1、新增
        if("add".equals(fn)){
        	UserDefaulStyle userDefaulStyle = new UserDefaulStyle();
        	BeanUtil.updateBean(request, userDefaulStyle);    
        	result = manager.doSave(userDefaulStyle);
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	UserDefaulStyle userDefaulStyle = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, userDefaulStyle);
        	result = manager.doUpdate(userDefaulStyle);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "UNID in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }else if("chooseStyle".equals(fn)){
        	UserDefaulStyleBusiness userDefaulStyleBusiness = new UserDefaulStyleBusiness();
        	result = userDefaulStyleBusiness.chooseStyle(request);
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}