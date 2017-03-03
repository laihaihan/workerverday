package com.linewell.core.ucap.module;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.flow.config.FlowConfig;
import com.linewell.core.flow.config.FlowConfigManager;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;
/**
 * <p>模块链接与挂接流程配置</P>
 * @author lfunian@linewell.com
 * @date Sep 4, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
public class ModuleFlowConfigAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();		
		HttpServletResponse response = ServletActionContext.getResponse();	
	
		JSONObject json = new JSONObject();
	    String fn = request.getParameter("fn");
	    boolean result = true;
	    ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
	    FlowConfigManager flowConfigManager = new FlowConfigManager();
	    
	    //1、新增
	    if ("add".equals(fn)) {
	    	//模块链接
	    	ModuleLeaf moduleLeaf = null;
	    	String leaf_unid = request.getParameter("moduleLeaf[]leaf_unid");
	    	moduleLeaf = moduleLeafManager.doFindBeanByKey(leaf_unid);
	    	if (null == moduleLeaf) {
	    		moduleLeaf = new ModuleLeaf();
			}
	    	BeanUtil.updateBean(request, moduleLeaf);
	    	result = moduleLeafManager.doUpdate(moduleLeaf);
	    	//模块流程挂接
	    	FlowConfig flowConfig = new FlowConfig();
	    	BeanUtil.updateBean(request, flowConfig);
	    	result = flowConfigManager.doSave(flowConfig);
	    	
		}
	    //2、修改
        else if("update".equals(fn)){
        	//模块链接
	    	ModuleLeaf moduleLeaf = null;
	    	String leaf_unid = request.getParameter("moduleLeaf[]leaf_unid");
	    	moduleLeaf = moduleLeafManager.doFindBeanByKey(leaf_unid);
	    	if (null == moduleLeaf) {
	    		moduleLeaf = new ModuleLeaf();
			}
	    	BeanUtil.updateBean(request, moduleLeaf);
	    	result = moduleLeafManager.doUpdate(moduleLeaf);
	    	//模块流程挂接
	    	FlowConfig flowConfig = null;
	    	String unid = request.getParameter("flowConfig[]unid");
	    	flowConfig = flowConfigManager.doFindBeanByKey(unid);
	    	if (null == flowConfig) {
	    		flowConfig = new FlowConfig();
			}
	    	BeanUtil.updateBean(request, flowConfig);
	    	result = flowConfigManager.doUpdate(flowConfig);
        }
	    
	    //返回值
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		return null;
	}
}
