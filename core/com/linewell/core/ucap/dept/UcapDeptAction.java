package com.linewell.core.ucap.dept;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.ucap.deptrelation.UcapDeptRelation;
import com.linewell.core.ucap.deptrelation.UcapDeptRelationManager;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.UNIDGenerate;
import com.opensymphony.xwork2.ActionSupport;
/**
 * <p>用户信息的后台action</p>
 * @email lfunian@linewell.com
 * @date Sep 25, 2013
 * @version 1.0  
 */
public class UcapDeptAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();		
		HttpServletResponse response = ServletActionContext.getResponse();	
		
        String fn = request.getParameter("fn");
        String app_unid = request.getParameter("app_unid");
        boolean result = true;
		UcapDeptBusiness business = new UcapDeptBusiness();
		UcapDeptRelationManager relationManager = new UcapDeptRelationManager();
		
        //1、新增
        if("add".equals(fn)){
        	UcapDept ucapDept = new UcapDept();
        	BeanUtil.updateBean(request, ucapDept);    
        	result = business.doSave(ucapDept);
        	if (result) {
				UcapDeptRelation ucapDeptRelation = new UcapDeptRelation();
				ucapDeptRelation.setUnid(new UNIDGenerate().getUnid());
				ucapDeptRelation.setDept_unid(ucapDept.getDept_unid());
				ucapDeptRelation.setApp_unid(app_unid);
				relationManager.doSave(ucapDeptRelation);
			}
        }
        //2、修改
        else if("update".equals(fn)){
        	String unid = request.getParameter("dept_unid");
        	UcapDept ucapDept = business.doFindBeanByKey(unid);
        	BeanUtil.updateBean(request, ucapDept);   
        	result = business.doUpdate(ucapDept);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "dept_unid in ("+ids+")";
        	result = business.doDeleteByCondition(condition, null);
        	if (result) {
        		condition = "dept_unid in ("+ids+") and app_unid = '" + app_unid + "'";
        		relationManager.doDeleteByCondition(condition);
			}
        }
        
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		return null;
    }
}
