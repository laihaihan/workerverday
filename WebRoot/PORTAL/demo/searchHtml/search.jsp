<%@page import="com.linewell.ucap.session.Session"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%
Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
String userName="XXX";
if(null!=ucapSession && null!=ucapSession.getUser()){
	userName=ucapSession.getUser().getDisplayName();
}
%>
<!DOCTYPE html>
<html>

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" >  
<title>search</title>
<link href="search.css" rel="stylesheet" type="text/css" >
<style type="text/css">
</style>
</head>
<script>
		function bodyLoad(){
			refreshTime(); 
			setInterval(refreshTime, 1000);
		}
		
		/**
		 *刷新当前时间
		 */
		function refreshTime(){
			var myDate = new Date();
			var hours = myDate.getHours();
			if (hours == 0) {
				snXXX.innerHTML = "午夜";
			} else if (hours < 12) {
				snXXX.innerHTML = "上午";
			} else if (hours == 12) {
				snXXX.innerHTML = "正午";
			} else {
				snXXX.innerHTML = "下午";
			}
			snTime.innerHTML = myDate.toLocaleTimeString(); 
		}
</script>
<body onload="bodyLoad();">

<div class="search">

	<div class="searchRight">
	
		<input id="keyword" class="searchinputbox" name="keyword" onmousedown="if(this.value=='请输入搜索关键字')this.value=''" value="请输入搜索关键字" >
		<input id="simpleSearch"  class="button" onclick="view.search()" type="button" value="普通检索">
		<input id="advancedSearch"  class="button" onclick="view.setSearchMore(this)" type="button" value="高级检索">

	</div>
	
	<div class="searchLeft">
		<span class="home"><a>首页</a></span><span class="intranet"><a>内网信息资源门户</a></span><span class="welcome"><%=userName %> 同志：<span id="snXXX"></span>好！&nbsp<span id="snTime"></span></span>
	</div>


</div>

</body>

</html>
