package com.linewell.core.tree;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;

public class TreeAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private static final Logger logger = Logger.getLogger(TreeAction.class);

	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		

		String clazz = request.getParameter("class");
		
		TreeManager tm = new TreeManager();
		PrintUtil.print(response, tm.getData(request, clazz));
	
		
        return null;
	}
}