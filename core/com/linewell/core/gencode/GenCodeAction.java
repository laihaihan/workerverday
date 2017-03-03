package com.linewell.core.gencode;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;


/**
 * <p>
 * 	代码生成相关action，主要包含：
 *  1、后台获取相应jndi下的所有表，并按ztree格式封装返回
 *  2、根据表名返回其拥有的所有字段列表，并封装成下拉框格式
 *  3、生成代码、jsp、模块、视图、按钮数据
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-2-2
 * @version 1.00
 * <p>
 * 	Copyright (c) 2011 www.linewell.com
 * </p>
 */
public class GenCodeAction  extends ActionSupport {
	
	private static final long serialVersionUID = -5820810860876780048L;
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		String fn = request.getParameter("fn");
		String jndi = request.getParameter("jndiName");
		GenCodeManagerFactory genCodeManagerFactory = new GenCodeManagerFactory();
		
		GenCodeManagerInterface genCodeManager = genCodeManagerFactory.build(jndi);
		
		//待选择表
		if("showAllTable".equalsIgnoreCase(fn)){
			String selectTable = request.getParameter("selectTable");
			List<Map<String, String>> list = genCodeManager.selectAllTablesName(jndi);

			request.setAttribute("TableNames", list);
			request.setAttribute("selectTable", selectTable);
			return "choosetable";
			
		}else if("getTableField".equalsIgnoreCase(fn)){//表对应字段
			String sp_table = request.getParameter("sp_table");
			BeanBean bean=new BeanBean();
			bean.setTableName(sp_table);
			List<BeanBean> beans = genCodeManager.getBeansByJndiAndBean(jndi,bean);
			BeanBean pbean = beans.get(0);
			List<BeanProperty> beanpropertis=pbean.getPropertis();
			//封装下拉框
			PrintUtil.print(response, genCodeManager.createFieldSelect(beanpropertis));
		}else if("gencode".equalsIgnoreCase(fn)){
			//生成代码
			genCodeManager.genCodeAll(jndi,request);
		}

		
        //返回值
		String showValue = "1、代码生成成功，请配置struts。" +
				"2、若有生成视图模块数据则需要重启动tomcat以便生效。";

        //返回值
		JSONObject json = new JSONObject();
		json.put("result", true);
		PrintUtil.print(response, json.toString());
		return null;
	}
}
