<%@ page language="java"  pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.util.QRCodeUtil"%>
<%
	String text= request.getParameter("text");
	QRCodeUtil.encode(text,request.getRealPath("/")+"qrcode/"+text);
%>