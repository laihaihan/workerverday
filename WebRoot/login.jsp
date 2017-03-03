<%@ page language="java" pageEncoding="UTF-8"%>
<%@	page import="com.linewell.ucap.session.Session"%>
<%@	page import="com.linewell.core.dict.ApasDict"%>
<%@	page import="com.linewell.core.dict.ApasDictManager"%>
<%@include file="core/params.jsp" %>
<% 
	Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	request.setAttribute("ucapSession",ucapSession);
	
	//判断登陆时是否需要选择部门
	String condition = "dicttype='系统基础配置' and dictname='deptLoginModel' and dictvalue='Y'";
	ApasDict dict = new ApasDictManager().doFindByCondition(condition,null);
	if(null != dict){
		response.sendRedirect("hzlogin.jsp");
		return;
	}
%>
<script type="text/javascript">
<!--
	if(self != top) {
		top.location.href=self.location.href;
	}
//-->
</script>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>南威行政审批综合平台</title>
	<link type="text/css" rel="stylesheet" href="<%=path + cssPath + "login.css" %>">


<script type="text/javascript" src="${corejs}/tipswindown/tipswindown.js"></script>
<link rel="stylesheet" href="${corejs}/tipswindown/tipswindown.css" type="text/css" media="all" />

</head>
<body class="body_bg">
<table width="482" border="0" cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;">
<!--DWLayoutTable-->
<tr>
	<td width="482" height="178" valign="top"><!--DWLayoutEmptyCell-->&nbsp;</td>
</tr>
<tr>
	<td height="386" valign="top" class="login_bg"><table width="100%" border="0" cellpadding="0" cellspacing="0">
		<!--DWLayoutTable-->
		<tr>
			<td width="111" height="65">&nbsp;</td>
			<td width="352">&nbsp;</td>
			<td width="19">&nbsp;</td>
		</tr>
		<tr>
			<td height="136">&nbsp;</td>
			<td valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0">
				<!--DWLayoutTable-->
				<tr>
					<td height="32" colspan="2" align="center">用户名</td>
				  <td width="280"><input type="text" id="userName" name="userName" value="" size="20" style="width:155px"/></td>
				</tr>
				<tr>
					<td height="32" colspan="2" align="center">密&nbsp;&nbsp;&nbsp;&nbsp;码</td>
					<td>
						<input name="password" id="password" type="password" value="" size="22" style="width:155px"/>
						<span id="errorMsg" style="color:red;font-size: 12px;">&nbsp;</span>
					</td>
				</tr>
				<tr>
					<td colspan="2" align="right"><input id="recordAccount" type="checkbox" /></td>
					<td>记住账号</td>
				</tr>
				<tr>
					<td width="60">&nbsp;</td>
					<td colspan="2">						
						<input type="button" value="" class="log_btn" onClick="login();" style="cursor:hand"/>
						&nbsp;&nbsp;&nbsp;
						<input type="button" value="" class="res_btn" style="cursor:hand" onClick="$('#userName').val('');$('#password').val('');$('#userName').focus();"/></td>
				</tr>
				<tr>
					<td height="34">&nbsp;</td>
					<td width="12">&nbsp;</td>
					<td><!-- <a href="client/温州市网上审批平台用户操作手册.doc">《操作手册1.0》下载</a>&nbsp; --></td>
				</tr>
				</table></td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td height="186">&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
		</table></td>
</tr>
<tr>
	<td height="2"></td>
</tr>
</table>

<script type="text/javascript" src="${corejs}/jquery.js"></script>
<script type="text/javascript" src="${corejs}/jquery.cookie.js"></script>
<script type="text/javascript" src="${corejs}/onekey.js"></script>
<script type="text/javascript">
	$(function(){
		//如果点击浏览器中的后退按钮后退到登陆页面后就注销掉session，防止通过后退按钮再重新登陆系统
		var ucapSession = "<%=ucapSession%>";
		if(ucapSession != "null"){		
			logout();
		}		
		
		autoLogin();
		
		//登录框聚焦
		if($("#userName").val()==''){
  			$("#userName").focus();
  		}else{
  			$("#password").focus();
  		}
		  		
		$("#userName").keydown(function(event){
		  	if(event.keyCode==13){
		  		if($("#userName").val()==''){
					$("#errorMsg").text('请输入用户名');
		  			$("#userName").focus();
		  			return;
		  		}
		  		else if($("#password").val()==''){
		  			$("#password").focus();
		  		}else{
		  			login();
		  		}
		  	}
		});
		$("#password").keydown(function(event){
		  	if(event.keyCode==13){
		  		login();
		  	}
		});
	});
	
	//自动登录
	function autoLogin(){
		var userName = $.cookie('userName');
		var password = $.cookie('password');
		
		if(userName!=null){
			$("#userName").val($.cookie('userName'));
		}
		
		if(password!=null){
			$("#password").val($.cookie('password'));
		}
		
		if( userName!=null && password!=null ){
			//login();
			$('#recordAccount').attr('checked',true);
		}
	}
	
	function login(){
		if($("#userName").val()==''){
			$("#errorMsg").text('请输入用户名');
  			$("#userName").focus();
  			return;
  		}
  		else if($("#password").val()==''){
  			$("#errorMsg").text('请输入密码');
  			$("#password").focus();
  			return;
  		}
		var userName = tranLoginName($("#userName").val());
		$("#errorMsg").text('正在登录...');
		$.ajax({
			url : "${path}/login.action",
			type:'post',
			dataType:'json',
			data:{
				userName :userName,
				password:$("#password").val()
			},
			success:function(response){	
				if(response.errorMsg!=''&&response.errorMsg.length!=0){
					$("#errorMsg").text(response.errorMsg);
					$.cookie('userName',null);
					$.cookie('password',null);
						
				}else if(typeof(response.appList) == "undefined"|| response.appList.length == 0){
					if( $('#recordAccount').attr('checked') ){
						//保存cookie
						$.cookie('userName',userName,{expires: 720});
						$.cookie('password',$("#password").val(),{expires: 720});
					}else{
						$.cookie('userName',null);
						$.cookie('password',null);
					}				
					
					top.location="${path}/lw-admin/index.jsp";
				}else{
				
					if( $('#recordAccount').attr('checked') ){
						//保存cookie
						$.cookie('userName',userName,{expires: 720});
						$.cookie('password',$("#password").val(),{expires: 720});
					}else{
						$.cookie('userName',null);
						$.cookie('password',null);
					}			
					//选择系统风格				
					changeSystem();
					tipsWindown("请选择登录系统","url:get?syschoose.jsp?userName="+$("#userName").val()+"&password="+$("#password").val(),"450","200","true","","true","text");
				}
			}			
		});
	}
	function changeSystem(){
		$.ajax({
			url : "module.action?act=changeSystem",
			type:'post',
			dataType:'json',
			async:false,
			error:function(){
				$("#errorMsg").text("服务器异常。请记录时间，联系管理员！");
			},
			success:function(response){
				if(response.success){
					login();
				}else{
					$("#errorMsg").text("服务器异常。请记录时间，联系管理员！");
				}
			}		
		});
	}
	function onekeyLogin(){
		$.ajax({
			url : "${path}/login.action",
			type:'post',
			data:{
				userName :$("#userName").val(),
				password:$("#password").val()
			},
			success:function(response){		
				if(response.errorMsg!=''&&response.errorMsg.length!=0){
					$("#errorMsg").text(response.errorMsg);
				}else{
					$.cookie('onekey',true);
					top.location="${path}/lw-admin/index.jsp";
				}
			}			
		});
	}
	//验证登录用户名
	function tranLoginName(userName){
		//单引号会对数据库语句造成影响，需转义
		var containSpecial = RegExp(/[(\')]+/); 
		if(containSpecial.test(userName)){
			userName = userName.replaceAll("'", "''")
		}	 
		return userName;      
	}

	//自定义replaceAll方法
	String.prototype.replaceAll = function(s1,s2) { 
	    return this.replace(new RegExp(s1,"gm"),s2); 
	}
	
	//用户注销
	function logout(){
		$.ajax({
			url : "${path}/BaseAction.action",
			type:'post',
			dataType:'text',
			data:{
				"type" : "loginWriteOff"
			},
			success:function(response){		
				
				location.href="${path}/login.jsp";
			},
			error:function(){
				popup.errorService();
			}		
		});
	}
</script>
</body>
</html>