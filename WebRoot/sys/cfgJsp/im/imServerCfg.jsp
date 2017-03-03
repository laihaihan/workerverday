<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>配置IM服务器</title>
    
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" type="text/css" href="./css/ucap.css"/>
	<link rel="stylesheet" type="text/css" href="./css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="./css/ext-patch.css" />
	<link rel="stylesheet" type="text/css" href="./js/ucap/calendar/skin/WdatePicker.css" />
	<script type="text/javascript" src="./js/ext/ext-base.js"></script>
	<script type="text/javascript" src="./js/ext/ext-all.js"></script>
	<!-- script type="text/javascript" src="./js/ext/ext-all.gzjs"></script-->
	<script type="text/javascript"	src="./js/ext/ext-lang-zh_CN.js"></script>
	<script type="text/javascript"	src="./js/ucap/util/common.js"></script>
	<script type="text/javascript"	src="./js/ucap/portal/form.js"></script>
	<SCRIPT language=javascript src="./js/im/imServerConfig.js"></SCRIPT>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link href="./uistyle/style_1/css/ucap.css" type="text/css" rel="stylesheet">
	<link href="./uistyle/style_1/css/ext-all.css" type="text/css" rel="stylesheet">
	<link href="./uistyle/style_1/css/ext-patch.css" type="text/css" rel="stylesheet">
	<link href="./js/ucap/calendar/skin/WdatePicker.css" type="text/css" rel="stylesheet">
	
	<script type="text/javascript">
		window.onload=initServerCfg;
	</script>

  </head>
	
	<body>
	<div id="toolBar">
			<div
				style="float: left; position: absolute; padding: 5px 0px 0px 5px;"
				id="_ucapFormDocTitle"></div>
			<div id="toolBarButton">
				
				<button onmouseout="this.className='btnn1'"
					onmouseover="this.className='btnn3'" class="btnn1"
					onclick="saveConfig();" style="width: 56px;"
					title="保存">
					<div class="btnn5">
						<img align="absMiddle"
							src="./uistyle/style_1/ucapimages/default_btn.gif">
						&nbsp;保存
					</div>
				</button>
				<button onmouseout="this.className='btnn1'"
					onmouseover="this.className='btnn3'" class="btnn1"
					onclick="closeWindow();" style="width: 56px;" title="关闭">
					<div class="btnn5">
						<img align="absMiddle"
							src="./uistyle/style_1/ucapimages/default_btn.gif">
						&nbsp;关闭
					</div>
				</button>
			</div>
		</div>
	
	
	
		<fieldset>
			<legend>IM服务器配置</legend>
				<table class="table2" id="tbServerConfig" style="opacity: 1;">
					<colgroup>
						<col width="45%">
						<col width="55%">		
					</colgroup>
					<tbody>
						<tr>
							<th>
								<span class="red"> * </span> 服务器地址：
							</th>
							<td>
								<input name="dbIp" id="dbIp" class="inputbox">
							</td>
						</tr>
						<tr>
							<th>
								<span class="red"> * </span> 服务器端口：
							</th>
							<td>
								<input name="dbPort" id="dbPort" class="inputbox">
							</td>
						</tr>
						<tr>
							<th>
								<span class="red"> * </span> 用户名：
							</th>
							<td>
								<input name="dbUser" id="dbUser" class="inputbox">
							</td>
						</tr>
						<tr>
							<th>
								<span class="red"> * </span> 密码：
							</th>
							<td>
								<input name="dbPassword" id="dbPassword" class="inputbox">
							</td>
						</tr>
					</tbody>
				</table>
				
		</fieldset>
		<div style="color:red">注：IM服务器IP及端口的配置</div>
	</body>
</html>
