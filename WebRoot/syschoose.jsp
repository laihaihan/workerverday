<%@page language="java" pageEncoding="UTF-8"%>
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
	  <div style="height:160px;overflow-y:auto">
		  <table width="99%" class="form_table_ext">
		  	<%for(App app : appList){
		  		if("475C4D7E257F5EAF7CCDF46AE0FE35BD".equals(app.getUnid())){
		  			continue;
		  		}
		  		if(!user.getUnid().equals("1000D01F")&&"3E2592D5DD95DA5C339C0935F7E9DAA8".equals(app.getUnid())){
		  			continue;
		  		}
		  	%>
		    <tr>
		      	<td><input type="radio" name="sysall" value="<%=app.getUnid()%>" <%if(uSession.getApp() !=null && uSession.getApp().getUnid().equals(app.getUnid())){out.println("checked");} %>> 
		      		<%
		      			if(uSession.getApp() !=null && uSession.getApp().getUnid().equals(app.getUnid())){
		      			    out.println("<font color='red'>"+app.getDisplayName()+"</font>");
		      			}else{
		      			    out.println(app.getDisplayName());
		      			}
		      		%>
		      	</td>
		    </tr>  
		  	<%}%>
		  	<tr><td align="right" style="padding-right:10px"> <input type="checkbox" id="isDefaul" value="1" checked="checked">是否设置为默认系统</td></tr> 
		  </table> 
	  </div>
	  <center style="margin-top:10px">
	  	<input type="button"  value="确 定" onclick="sureSys()">&nbsp;&nbsp;
	  	<input type="button"  value="关 闭" onclick="doClose()">
	  </center>	
  </body>
</html>
<script type="text/javascript">
	function sureSys(){
		var sysunid = $("input[name='sysall']:checked").val();
		if(null == sysunid){
			alert("请选择一个系统登录。");
			return;
		}
		var isDefaul = $("#isDefaul").is(":checked");
		$.ajax({
			url:"module.action?act=chooseSys&sysunid="+sysunid+"&isDefaul="+isDefaul+"&userunid=<%=user.getUnid()%>",
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
	
	function doClose(){
		if($("#windown-close").length == 1){//在登陆页面中点击“关闭”按钮
			$("#windownbg").remove();
			$("#windown-box").fadeOut("slow",function(){$(this).remove();});
			//重新加载登录页面
			window.location.reload();
		}else{//在首页中点击“关闭”按钮
			top.lwin.close();
		}
	}
</script>