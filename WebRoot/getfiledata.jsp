<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import = "java.util.Date.*,java.io.*,java.sql.Date.*,java.sql.*, java.sql.Timestamp " %>
<%@page import="com.linewell.hzwas.gongchengtu.UploadFile"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'updata.jsp' starting page</title>
    
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
  <% 

  System.out.println("开始接受数据开始总体计时。");

  long t1 = System.currentTimeMillis();     
  
  UploadFile upload11=new UploadFile();
  String filename=upload11.upLoad(request);
  System.out.println("filename="+filename);
  long t2 = System.currentTimeMillis();      
  long time = t2-t1;     
  System.out.println("总体消耗时间："+time);
  %>

  </body>
</html>
