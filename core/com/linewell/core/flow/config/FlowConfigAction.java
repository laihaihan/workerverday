package com.linewell.core.flow.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.flow.ucapconfigflow.UcapConfigFlowManager;
import com.linewell.core.flow.ucapconfigflow.UcapFlowConfigBusiness;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.session.Session;

/**
 * <p>
 * 	流程状态表 Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2013-04-08 10:41:45
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class FlowConfigAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		String punid = request.getParameter("punid");
		String name = request.getParameter("name");
		FlowConfigManager manager = new FlowConfigManager();
		FlowConfigBusiness flowConfigBusiness = new FlowConfigBusiness();
		Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		JSONObject json = new JSONObject();
        //1、新增
        if("add".equals(fn)){
        	FlowConfig flowConfig = new FlowConfig();
        	flowConfig.setUnid(new UNIDGenerate().getUnid());    
        	flowConfig.setFlowid(new UNIDGenerate().getUnid()) ;   
        	flowConfig.setPunid(punid);
        	flowConfig.setName(name);
        	flowConfig.setAppunid(ucapsession.getApp().getUnid());
        	flowConfig.setState(1);
        	result = manager.doSave(flowConfig);
        	
        	flowConfigBusiness.saveUcapFlowConfig(flowConfig.getFlowid(),name, flowConfig.getAppunid());
        	json.put("belongToApp",flowConfig.getAppunid());
        	json.put("flowid",flowConfig.getFlowid());
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	FlowConfig flowConfig = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, flowConfig);
        	result = manager.doUpdate(flowConfig);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	//删除ucap库流程引擎配置信息
        	UcapFlowConfigBusiness ucapFlowConfigBusiness = new UcapFlowConfigBusiness(ucapsession.getApp().getUnid());
        	result =  ucapFlowConfigBusiness.delByCoreFlowConfigS(ids, ucapsession.getApp().getUnid());
        	
        	String condition = "UNID in ("+ids+")";
        	result = result && manager.doDeleteByCondition(condition);
        	
        } else if("getApp".equals(fn)){
        	json.put("belongToApp",ucapsession.getApp().getUnid());
        }

		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}