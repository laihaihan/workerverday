package com.linewell.core.dict;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;

import net.sf.json.JSONObject;

/**
 * <p>
 * ApasDict action
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2011-10-12 09:17:10
 *
 */
public class ApasDictAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();		
		HttpServletResponse response = ServletActionContext.getResponse();	
		
        String fn = request.getParameter("fn");
        boolean result = true;
		ApasDictManager apasDictManager = new ApasDictManager();
		
        //1、新增
        if("add".equals(fn)){
        	ApasDict apasDict = new ApasDict();
        	BeanUtil.updateBean(request, apasDict);    
        	
        	result = apasDictManager.doSave(apasDict);
        }
        //2、修改
        else if("update".equals(fn)){
        	String unid = request.getParameter("unid");
        	ApasDict apasDict = apasDictManager.doFindBeanByKey(unid);
        	BeanUtil.updateBean(request, apasDict);   
        	result = apasDictManager.doUpdate(apasDict);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "unid in ("+ids+")";
        	result = apasDictManager.doDeleteByCondition(condition);
        }
        
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		return null;
    }
}