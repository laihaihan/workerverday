<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.ucapx.login.LoginApi"%> 
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%> 
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="com.linewell.ucap.web.login.WebLoginManager"%>
<%@page import="java.util.List"%>
<%@include file="core/params.jsp" %>

<%
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	
	Session ucapSession = (Session)session.getAttribute(Session.SESSION_NAME);
	User user = ucapSession.getUser();
	App nowApp = ucapSession.getApp(); 
	//LoginApi loginApi = new LoginApi();
	//获取系统平台列表 
	//List<App> appList = loginApi.getUserAppList(user.getUnid()); 
	List<App> appList = WebLoginManager.getApps(ucapSession);
	String appunid = "";
	if(null != nowApp){
		appunid = nowApp.getUnid();
	}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
	<META http-equiv=pragma content=no-cache>
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript" src="${corejs}/jquery.js"></script>
	${import_theme}
  </head>
  
  <body>
	  <table width="99%" class="form_table_ext">
	    <tr>
	      	<td><input type="radio" name="styleurlall" value="index.jsp">easyui传统样式</td>
	    </tr>  
	    <tr>
	      	<td><input type="radio" name="styleurlall" value="win7index.jsp">windows7操作系统样式</td>
	    </tr>  
	  	<tr><td align="right" style="padding-right:10px"> <input type="checkbox" id="isDefaul" value="1">是否设置为默认样式</td></tr> 
	  </table> 
	  <center style="margin-top:10px">
	  	<input type="button"  value="确 定" onclick="sureSys()">&nbsp;&nbsp;
	  	<input type="button"  value="关 闭" onclick="top.lwin.close()">
	  </center>	
  </body>
</html>
<script type="text/javascript">
	function sureSys(){
		var styleurl = $("input[name='styleurlall']:checked").val();
		if(null == styleurl){
			alert("请选择一个系统登录。");
			return;
		}
		var isDefaul = $("#isDefaul").is(":checked");
		$.ajax({
			url:"userDefaulStyle.action?fn=chooseStyle&styleurl="+styleurl+"&isDefaul="+isDefaul+"&userid=<%=user.getUnid()%>",
			type:'post',
			dataType:'json',
			error:function(){
				$("#errorMsg").text("服务器异常。请记录时间，联系管理员！");
			},
			success:function(response){
				if(styleurl == 'index.jsp'){
					top.window.location.href = "${path}/lw-admin/index.jsp?ischoose=yes";
				}else if(styleurl == 'win7index.jsp'){
					top.window.location.href = "${path}/lw-admin/win7index.jsp";
				}
			}
		});
		
		
		
	}
</script>