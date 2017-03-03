<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.form.content.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.apas.service.*" %>
<%@ page import="com.linewell.core.util.ClobUtil" %>
<%@ page import="com.linewell.core.util.StrUtil" %>
<%@page import="com.linewell.core.form.design.*"%>
<%@page import="com.linewell.core.form.interfaces.*"%>
<%@ page import="com.linewell.core.html.HtmlFilling" %>
<%@page import="com.linewell.apas.constant.ApasConstants"%>
<%@page import="java.util.List"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<%
	String path = request.getContextPath();
	String formunid = request.getParameter("formunid");
	FormContentManager formContentManager = new FormContentManager();
	FormContent formContent = formContentManager.doFindBeanByKey(formunid);
	if(null == formContent){
		out.print("业务表单未上传。");
	}
	
	out.print(ClobUtil.clobToStr(formContent.getBodycontent()));
%>