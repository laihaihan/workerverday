<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%
	String forwardJsp = (String)request.getAttribute("ucapForward");

    if(StringUtils.isNotEmpty(forwardJsp)){
    	request.getRequestDispatcher(forwardJsp).forward(request, response);
    }
%>
