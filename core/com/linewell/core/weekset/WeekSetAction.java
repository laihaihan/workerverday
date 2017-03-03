package com.linewell.core.weekset;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.observer.ObserverBussiness;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>
 *    节假日信息的后台action
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 24, 2012
 * @version 1.0  
 */
public class WeekSetAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();		
		HttpServletResponse response = ServletActionContext.getResponse();
		
        String fn = request.getParameter("fn");
        boolean result = true;
        WeekSetManager manager = new WeekSetManager();
		
        //1、新增
        if("add".equals(fn)){
        	WeekSet weekSet = new WeekSet();
        	BeanUtil.updateBean(request, weekSet);    
        	result = manager.doSave(weekSet);
        }
        //2、修改
        else if("update".equals(fn)){
        	String unid = request.getParameter("unid");
        	WeekSet weekSet = manager.doFindBeanByKey(unid);
        	BeanUtil.updateBean(request, weekSet);   
        	result = manager.doUpdate(weekSet);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "unid in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }
        
        new ObserverBussiness().execute(request);
        
        //返回值
        JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		return null;
    }
}