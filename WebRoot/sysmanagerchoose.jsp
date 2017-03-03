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
	//LoginApi loginApi = new LoginApi();
	//获取系统平台列表 
	//List<App> appList = loginApi.getUserAppList(user.getUnid()); 
	List<App> appList = WebLoginManager.getApps(ucapSession);
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
	  	<%for(App app : appList){
	  		if("A0A23464638BC1DD675B7D1B4DAA81C2".equals(app.getUnid())){
	  			continue;
	  		}
	  	%>
	    <tr>
	      	<td><input type="radio" name="sysall" value="<%=app.getUnid()%>"> <%=app.getDisplayName()%></td>
	    </tr>  
	  	<%}%>
	  	<tr><td align="right" style="padding-right:10px"> <input type="checkbox" id="isDefaul" value="1">是否设置为默认系统</td></tr> 
	  </table> 
	  <center style="margin-top:10px">
	  	<input type="button"  value="确 定" onclick="sureSys()">&nbsp;&nbsp;
	  	<input type="button"  value="关 闭" onclick="top.lwin.close()">
	  </center>	
  </body>
</html>
<script type="text/javascript">
	function sureSys(){
		var nowsysunid = $("input[name='sysall']:checked").val();
		if(null == nowsysunid){
			alert("请选择一个系统登录。");
			return;
		}
		$.ajax({
			url:"module.action?act=sysmanagerchoose&nowsysunid="+nowsysunid,
			type:'post',
			dataType:'json',
			error:function(){
				$("#errorMsg").text("服务器异常。请记录时间，联系管理员ww！");
			},
			success:function(response){
				top.location="${path}/lw-admin/index.jsp";
			}
		});
	}
</script>