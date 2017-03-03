<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>应用系统导航</title>
<style>
.img{
	width:100%;
}
</style>
<script>
function link_open(msg){
	alert(msg);
	
}
</script>
</head>
<body scroll=no style="margin: 0">
<center>
	<table width="100%" height="100%" align="center" cellpadding="0" cellspacing="0" >
		<tr height="41">
			<td><img width="100%" height="100%" src="images/system_navigation_head.png"></td>
		</tr>
		<tr>
			<td><a href="javascript:void(0)" onclick="link_open('公文管理系统');"><img width="100%" height="100%" src="images/system_navigation_1gongwen.png" border=0></a></td>
		</tr>
		<tr>
			<td><a href="javascript:void(0)" onclick="link_open('简报管理系统');"><img width="100%" height="100%" src="images/system_navigation_2jianbao.png" border=0></a></td>
		</tr>
		<tr>
			<td><a href="javascript:void(0)" onclick="link_open('信件管理系统');"><img width="100%" height="100%" src="images/system_navigation_3letter.png" border=0></a></td>
		</tr>
		<tr>
			<td><a href="javascript:void(0)" onclick="link_open('文件资料库系统');"><img width="100%" height="100%" src="images/system_navigation_4wenjian.png" border=0></a></td>
		</tr>
		<tr>
			<td><a href="javascript:void(0)" onclick="link_open('视频点播系统');"><img width="100%" height="100%" src="images/system_navigation_5video.png" border=0></a></td>
		</tr>
		<tr>
			<td><a href="javascript:void(0)" onclick="link_open('电子邮件系统');"><img width="100%" height="100%" src="images/system_navigation_6mail.png" border=0></a></td>
		</tr>
		<tr height="304">
			<td><img width="100%" height="100%" src="images/system_navigation_foot.png"></td>
		</tr>
	</table>
</center>
</body>
</html>