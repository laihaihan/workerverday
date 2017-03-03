package com.linewell.core.view.sqllog;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;
/**
 * <p>视图SQL语句日志</P>
 * @author lfunian@linewell.com
 * @date Aug 13, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
public class SqlLogAction extends ActionSupport {
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		SqlLogBusiness business = new SqlLogBusiness();
		
        //1、新增
        if("add".equals(fn)){
        	SqlLog sqlLog = new SqlLog();
        	BeanUtil.updateBean(request, sqlLog);    
        	result = business.doSave(sqlLog);
        }
        //2、修改
        else if("update".equals(fn)){
			String unid = request.getParameter("UNID".toLowerCase());
			SqlLog sqlLog = business.doFindBeanByKey(unid);
        	BeanUtil.updateBean(request, sqlLog);
        	result = business.doUpdate(sqlLog);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "UNID in ("+ids+")";
        	result = business.doDeleteByCondition(condition);
        }
        //4、获取json串，并保存
        else if("sqlLog".equals(fn)){
        	String sqlLog = request.getParameter("sg");
        	result = business.doSaveByJson(sqlLog);
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}
