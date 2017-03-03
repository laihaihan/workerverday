package com.linewell.core.form.content;


import java.io.File;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.form.design.FormDesignBussiness;
import com.linewell.core.html.JsoupParserHtml;
import com.linewell.core.html.ParserHtml;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.ClobUtil;
import com.linewell.core.util.FileUtil;
import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>
 * FormContent Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-02-14 17:25:00
 * @version 1.00
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */
public class FormContentAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private File content;
    private String contentType;
    private String fileName;
    
    public void setContentContentType(String contentType)  {
        this.contentType = contentType;
    } 
   
    public void setContentFileName(String fileName)  {
        this.fileName = fileName;
    } 
       
    public void setContent(File content)  {
        this.content = content;
    }
	
	
	public String execute() throws Exception {
		
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		String baseUrl = "http://"+request.getHeader("host")+"/"+request.getContextPath();
		String fn = request.getParameter("fn");
		boolean result = true;
		FormContentManager manager = new FormContentManager();
		FormDesignBussiness formDesignBussiness = new FormDesignBussiness();
		//提取表单信息存储到map中
		ParserHtml ph = new ParserHtml();

        // 1、新增
        if("add".equals(fn)){
        	FormContent form = (FormContent)BeanUtil.getFormBean(FormContent.class, request);
        	FormContent formContent = new FormContent();
        	BeanUtil.updateProperties(formContent, form);
        	if(null != content){
        		formContent.setContent(ClobUtil.fileToClob(content));		
        		String tablename = FormContentManager.getAutoTableName(formContent.getInfoprojid(), String.valueOf(formContent.getSortid()));
        		formContent.setTablename(tablename);
        		formContent.setBodycontent(ClobUtil.StrToClob(JsoupParserHtml.getBody(content,"utf-8",baseUrl)));
        		formContent.setScriptcontent(ClobUtil.StrToClob(JsoupParserHtml.getTagList(content, "script", "utf-8", baseUrl)));
        		formContent.setCsscontent(ClobUtil.StrToClob(JsoupParserHtml.getTagList(content, "style", "utf-8", baseUrl)));
        		formContent.setLinkcontent(ClobUtil.StrToClob(JsoupParserHtml.getTagList(content, "link", "utf-8", baseUrl)));
        		Map hmp = ph.startParse(FileUtil.fileToString(content,"utf-8"));
            	formDesignBussiness.htmlMapToColumns(hmp, content, formContent);
        	}
        	result = manager.doSave(formContent);
        }
        // 2、修改
        else if("update".equals(fn)){
        	FormContent form = (FormContent)BeanUtil.getFormBean(FormContent.class, request);
        	FormContent formContent = manager.doFindBeanByKey(form.getUnid());
        	BeanUtil.updateProperties(formContent, form);
        	
        	if(null != content){
        		String tablename = FormContentManager.getAutoTableName(formContent.getInfoprojid(), String.valueOf(formContent.getSortid()));
        		formContent.setTablename(tablename);
        		formContent.setContent(ClobUtil.fileToClob(content));
        		formContent.setBodycontent(ClobUtil.StrToClob(JsoupParserHtml.getBody(content,"utf-8",baseUrl)));
        		formContent.setScriptcontent(ClobUtil.StrToClob(JsoupParserHtml.getTagList(content, "script", "utf-8", baseUrl)));
        		formContent.setCsscontent(ClobUtil.StrToClob(JsoupParserHtml.getTagList(content, "style", "utf-8", baseUrl)));
        		formContent.setLinkcontent(ClobUtil.StrToClob(JsoupParserHtml.getTagList(content, "link", "utf-8", baseUrl)));
        		Map hmp = ph.startParse(FileUtil.fileToString(content,"utf-8"));
            	formDesignBussiness.htmlMapToColumns(hmp, content, formContent);
        	}
        	result = manager.doUpdate(formContent);
        }
        // 3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "unid in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }else if("validatesortid".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "unid in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }
        
		ParserHtml.hmp.clear(); //存储表单域的map是静态的所以每次取完需要马上清空掉。

		
        // 返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}