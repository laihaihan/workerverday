package com.linewell.core.flow.flowtest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.flow.business.FlowWorkBusiness;
import com.linewell.core.flow.instance.UcapFwFlowInsstranceManager;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;
import com.linewell.ucap.session.Session;

/**
 * <p>
 * 	流程测试关联表 Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2013-04-08 18:01:59
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class FlowTestAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		
		boolean result = true;
		String fn = request.getParameter("fn");
		FlowTestManager manager = new FlowTestManager();
    	String appUnid = ucapsession.getApp().getUnid();
		
        //1、新增
        if("add".equals(fn)){
        	FlowTest flowTest = new FlowTest();
        	BeanUtil.updateBean(request, flowTest);    
        	result = manager.doSave(flowTest);
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	FlowTest flowTest = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, flowTest);
        	result = manager.doUpdate(flowTest);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "UNID in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        	//删除流程表
        	UcapFwFlowInsstranceManager ucapFwFlowInsstranceManager = new UcapFwFlowInsstranceManager(GlobalParameter.APP_CORE);
        	condition = "instance_doc_unid in ("+ids+")";
        	ucapFwFlowInsstranceManager.doDeleteByCondition(condition);
        	
        	
        }else if("iniflow".equals(fn)){
        	String docUnid = request.getParameter("docUnid").trim();
        	String flowUnid = request.getParameter("flowUnid").trim();
        	FlowWorkBusiness flowWorkBusiness = new FlowWorkBusiness(request,appUnid);
        	flowWorkBusiness.doInit(docUnid, flowUnid, appUnid,ucapsession.getUser().getUnid());
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}