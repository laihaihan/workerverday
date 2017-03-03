<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	request.setAttribute("path",request.getContextPath());
%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/default/easyui.css">
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/icon.css">
	<link type="text/css" rel="stylesheet" href="${path}/core/js/ztree/zTreeStyle/zTreeStyle.css">
	
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/ztree/ztree.min.js"></script>
</head>
<body>
	<div id="form_content">
		<div id="form_toolbar">			
			<button class="form_btn" onclick="top.popup.close()"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
		</div> 
		<div>
			<table width="100%" height="50%">
				<col width="50%" align="center">
				<col width="50%" align="center">
				<col>
				<tr>
					<td> 
						<input style="width:90px" type="button" class="btn" value="修改信息" onclick="setUserInfo()"/>
					</td>
					<td> 
						<input style="width:90px" type="button" class="btn" value="修改密码" onclick="setUserPassword()"/>
					</td>
				</tr>
				<tr>
					<td> 
						<input style="width:90px" type="button" class="btn" value="常用意见" onclick="setUserOpinion()"/>
					</td>
					<td> 
						<input style="width:90px" type="button" class="btn" value="过滤事项" onclick="setUserService()"/>
					</td>
				</tr>
				<tr>
					<td rowspan="2"> 
						<input  style="width:90px" type="button" class="btn" value="叫号机屏显号" onclick="setCallWinInfo()"/>
					</td>
				</tr>
			</table>
		</div>
	</div>
	
	<script type="text/javascript">
		//设置用户信息
		function setUserInfo(){
			top.lwin.showModalDialog('core/user/user_info.jsp','个人信息',500,300);
		}
		
		//设置用户密码
		function setUserPassword(){
			top.lwin.showModalDialog('core/user/user_password.jsp','修改密码',500,300);
		}
		
		//设置用户意见
		function setUserOpinion(){
			top.lwin.showModalDialog('core/user/user_option.jsp','常用意见',550,350);
		}
		
		//设置用户过滤事项
		function setUserService(){
			top.lwin.showModalDialog('was/jsp/service/user_service.jsp','过滤事项',700,400);
		}
		
		//设置用户叫号机屏显号
		function setCallWinInfo(){
			top.lwin.showModalDialog('was/jsp/advanceinfo/userinfo/advanceuserinfo_edit.jsp','绑定叫号机屏显号',700,400);
		}
	</script>
</body>
</html>