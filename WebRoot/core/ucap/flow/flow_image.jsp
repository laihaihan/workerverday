<%@ page language="java" contentType="image/png" %>
<%@ page import="java.awt.Color" %>
<%@page import="com.linewell.core.ucap.flow.*"%>
<%
	request.setAttribute("color",Color.white);
	FlowParams flowParams = new FlowParams(request);
	FlowImage flowImage = new FlowImage(flowParams);
	try{
		flowImage.drawingFlow(request,response);
	}catch(Exception e) {
		e.printStackTrace();
	} finally {
		out.clear();   
		out = pageContext.pushBody();  
	}
%>