<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content="用户管理中心" name="keywords" />
<meta content="用户管理中心" name="description" />
<title>修改密码</title>
<link href="style/changePassword.css" rel="stylesheet" type="text/css" />
<style type="text/css">
</style>
</head>

<body>
<!-- 中间区域 begin-->
<div class="midbox">

	<!-- 标题 -->
	<div class="title">
		修改密码
	</div>
	
	<!-- 用户名 -->
	<div class="info_line">
		<div class="info_left">
			用户名：
		</div>
		<div class="info_right">
			admin
		</div>
	</div>
	
	<!-- 原有密码 -->
	<div class="info_line">
		<div class="info_left">
			<span class="star">*</span>
			原有密码：
		</div>
		
		<div class="info_right">
			<input name="Text1" type="text" />
		</div>
	</div>
	
	<!-- 分隔线 -->
	<div class="separator">
		——————————————————————————————————————————
	</div>
	
	<!-- 新密码 -->
	<div class="info_line">
		<div class="info_left">
			<span class="star">*</span>
			新密码：
		</div>
		
		<div class="info_right">
			<input name="Text1" type="text" />
		</div>
	</div>
	
	<!-- 密码提示 -->
	<div class="tips">
		密码由6-16个字符组成，区分大小写
	</div>
	
	<!-- 确认新密码 -->
	<div class="info_line">
		<div class="info_left">
			<span class="star">*</span>
			确认新密码：
		</div>
		
		<div class="info_right">
			<input name="Text1" type="text" />
		</div>
	</div>
	
	<!-- 按钮 -->
	<div class="info_button">
		<input name="Button1" type="button" value="确&nbsp;&nbsp;定" /> 
	</div>
	
</div>
<!-- 中间区域 end-->

</body>

</html>
