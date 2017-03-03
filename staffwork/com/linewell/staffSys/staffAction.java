package com.linewell.staffSys;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import com.linewell.core.dict.ApasDictBussiness;
import com.opensymphony.xwork2.ActionSupport;
import com.sybase.jdbc3.a.a.e;
import com.linewell.core.flow.business.FlowWorkBusiness;
import com.linewell.core.ucap.flow.FlowManager;
import com.linewell.core.ucap.flow.FlowParams;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;
import com.linewell.emailSys.email;
import com.linewell.emailSys.emailBusiness;
import com.linewell.ucap.platform.authorized.app.App;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.session.Session;


/**
 * <p>
 * 	员工入职 Action
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2016-07-11 09:04:32
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class staffAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	

	

	
	public String execute() throws Exception{
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;	
		String fn = request.getParameter("fn");
		staffBusiness business = new staffBusiness();
		
		String[] emailAddr = request.getParameterValues("email");
		
		emailBusiness emailBusiness = new emailBusiness();
        //1、新增
        if("add".equals(fn)){
        	staff staff = new staff();
        	BeanUtil.updateBean(request, staff);    
        	
        	Session session = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
    		User user = session.getUser();
    		String createUser= user.getUnid();
    		staff.setCreateUser(createUser);
    		
        	
        	result = business.doSave(staff);
        	
        	if (result) {
				for (int i = 0; i < emailAddr.length; i++) {
					email email = new email();
					email.setBelongto(staff.getUnid());
					email.setEmail_addr(emailAddr[i]);
					emailBusiness.doSave(email);
				}
			}
        }
        //2、修改
        else if("update".equals(fn)){
			String unid = request.getParameter("unid".toLowerCase());
        	staff staff = business.doFindBeanByKey(unid);
        	BeanUtil.updateBean(request, staff);
        	
        	String resumeDel = request.getParameter("resumeDel");
        	if ("1".equals(resumeDel)) {
        		staff.setResume("");
			}
        	String diplomaDel = request.getParameter("diplomaDel");
        	if ("1".equals(diplomaDel)) {
        		staff.setDiploma("");
        	}
        	
        	String otherDel = request.getParameter("otherDel");
        	if ("1".equals(otherDel)) {
        		staff.setOther("");
        	}
        	
        	
        	result = business.doUpdate(staff);
        	
        	
        	if (result) {
        		emailBusiness.doDeleteByBelong(unid);
				if (emailAddr!=null) {
					for (int i = 0; i < emailAddr.length; i++) {
						email email = new email();
						email.setBelongto(staff.getUnid());
						email.setEmail_addr(emailAddr[i]);
						emailBusiness.doSave(email);
					}
				}
			}
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String[] objsStr = ids.replace("'", "").split(",");
        	String condition = "unid = ?";
			for (int i = 0; i < objsStr.length; i++) {
				Object[] objs = new Object[1];
        		objs[0] = objsStr[i];
        		result = business.doDeleteByCondition(condition,objs);
			}
			
			
        }
        else if("iniflow".equals(fn)){
        String Unid=request.getParameter("unid");
        
    	String flowUnid ="07D36E0EF361067896B0D744C57BC78E";
		
    	Session session = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
    	
		User user = session.getUser();
		App app = session.getApp();
    	FlowWorkBusiness flowWorkBusiness = new FlowWorkBusiness(request,app.getUnid());
    	flowWorkBusiness.doInit(Unid, flowUnid, app.getUnid(),user.getUnid());
        }
        
        else if("checkini".equals(fn)){
        	
        	 FlowParams flowParams=new FlowParams(request);
        	 FlowManager flowManager=new FlowManager(flowParams);
        	 
        	String docunid=request.getParameter("docunid");
        	String instanceid=flowManager.getInstanceUnid(docunid);
        	System.out.println(instanceid);
        	if(instanceid!=null && instanceid.length()>0)
        	{
        		result=true;
        		
        	}
        	else{
        		result=false;
        	}
        }
    	
    	//返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
		
	}