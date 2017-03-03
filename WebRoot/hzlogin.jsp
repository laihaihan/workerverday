﻿<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@include file="core/params.jsp" %>

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
<title>党务支撑平台</title>
	<link type="text/css" rel="stylesheet" href="<%=path + cssPath + "login.css" %>">

<!-- 加载套打控件
<script language="javascript" src="LodopFuncs.js"></script>
<object id="LODOP" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0> 
	<embed id="LODOP_EM" type="application/x-print-lodop" width=0 height=0 pluginspage="install_lodop.exe"></embed>
</object>
<script type="text/javascript">
try{
    var LODOP=getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));
}catch(err){
	alert("Error:本机未安装!");
 }
</script>-->

</head>
<body class="body_bg">
<table width="482" border="0" cellpadding="0" cellspacing="0" align="center">
<!--DWLayoutTable-->
<tr>
	<td width="482" height="178" valign="top"><!--DWLayoutEmptyCell-->&nbsp;</td>
</tr>
<tr>
	<td height="386" valign="top" class="login_bg"><table width="100%" border="0" cellpadding="0" cellspacing="0">
		<!--DWLayoutTable-->
		<tr>
			<td width="60" height="65">&nbsp;</td>
			<td width="403">&nbsp;</td>
			<td width="19">&nbsp;</td>
		</tr>
		<tr>
			<td height="136">&nbsp;</td>
			<td valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0">
				<!--DWLayoutTable-->
				<tr>
					<td height="32" colspan="2" align="center">用户名</td>
				  	<td width="363">
                    <input type="text" id="userName" name="userName" value="" size="20" style="width:155px"/>
				  </td>
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
						<input type="button" value="" class="log_btn" onClick="login();" style="cursor:pointer"/>
						&nbsp;&nbsp;&nbsp;
						<input type="button" value="" class="res_btn" style="cursor:pointer" onClick="$('#userName').val('');$('#password').val('');$('#userName').focus();"/></td>
				</tr>
				<tr>
					<td height="34">&nbsp;</td>
					<td width="12">&nbsp;</td>
					<td></td>
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
<script type="text/javascript" src="${corejs}/tipswindown/tipswindown.js"></script>
<link rel="stylesheet" href="${corejs}/tipswindown/tipswindown.css" type="text/css" media="all" />
<script type="text/javascript">
	$(function(){		
		
		autoLogin();
		
		//登录框聚焦
		if(! ($("#userName").val())){
  			$("#userName").focus();
  		}else{
  			$("#password").focus();
  		}
		  		
		$("#userNameHeader").keydown(function(event){
		  	if(event.keyCode==13){
		  		if(! ($("#userName").val()) ){
					$("#errorMsg").text('请输入用户名');
		  			$("#userName").focus();
		  			return;
		  		}
		  		else if(! ($("#password").val())){
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

		if(password!=null){
			$("#password").val($.cookie('password'));
		}
		
		if( userName!=null && password!=null ){
			//login();
			$("#userName").val($.cookie('userName'));
			$('#recordAccount').attr('checked',true);
		}
	}
	
	function login(){
		if(! ($("#userName").val()) ) {
			$("#errorMsg").text('请输入用户名');
  			$("#userName").focus();
  			return;
  		}
  		else if(! ($("#password").val()) ){
  			$("#errorMsg").text('请输入密码');
  			$("#password").focus();
  			return;
  		}
  		 
 
		$("#errorMsg").text('正在登录...');
		$.ajax({
			url : "${path}/login.action",
			type:'post',
			dataType:'json',
			data:{
				userName :$("#userName").val(),
				password:$("#password").val()
			},
			success:function(response){	
				if ((response.errorMsg) && response.errorMsg.length!=0){
					$("#errorMsg").text(response.errorMsg);
					$.cookie('userName',null);
					$.cookie('password',null);
						
				} else if (typeof(response.appList) == "undefined"|| response.appList.length == 0){
				
					if( $('#recordAccount').attr('checked') ){
						//保存cookie
						try{
							$.cookie('userName',$("#userName").val(),{expires: 720});
							$.cookie('password',$("#password").val(),{expires: 720});
						}catch(e){}
					}else{
						$.cookie('userName',null);
						$.cookie('password',null);
					}				
					top.location="${path}/lw-admin/index.jsp";
				} else {
					
					try{
						if ( $('#recordAccount').attr('checked') ){
							//保存cookie
							$.cookie('userName',$("#userName").val(),{expires: 720});
							$.cookie('password',$("#password").val(),{expires: 720});
						} else {
							$.cookie('userName',null);
							$.cookie('password',null);
						}
					}catch(e){}
					
					tipsWindown("请选择登录系统","url:get?syschoose.jsp?userName="+$("#userName").val()+"&password="+$("#password").val(),"450","200","true","","true","text"); 
					//选择系统风格				
					//changeSystem();
				}
			}
		});
	}
	
	function changeSystem(){
		$.ajax({
			url : "module.action?act=changeSystem",
			type:'post',
			dataType:'json',
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
					top.location="${path}/hzwas/index.jsp";
				}
			}			
		});
	}
	</script>
</body>
</html>