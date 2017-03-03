<%@page contentType="text/html;charset=UTF-8"%>
<html>
<head>
<%@include file="/sys/jsp/session.jsp"%>
<script type="text/javascript" src="<%=sSystemPath%>js/api/indexApi.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/index.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/menu.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/module/module.js">	</script>

<SCRIPT language=javascript src="<%=sSystemPath%>js/user/user.js"></SCRIPT>
</head>
<script type="text/javascript">
	Ext.onReady(function(){
		var channels= ucapApi.getAllChannels();
		ucapApi.getPortal(getIndexFram);
		ucapApi.getMenu(getMenu);
		ucapApi.getNavigation(getNav);
	});
</script>
<div id="headerBox">
<button onclick="ucapMenu.clk('A251015C82EDF3F07182F35863F09942','02','')">view</button>
<button onclick="ucapMenu.clk('FHFSFD14A5034EAF00201059001B0065','01','')">系统管理</button>
</div>

<div id="ucapMainLeft" class="ucapview">
	<div id="leftPortl" class="leftPortl"></div>
	<div id="ucapModule" class="ucapModule" style="display:none"></div>
 </div>
<div id=leftArrowhead class="leftArrowhead" style="display:none" onclick="ucapModule.pagebarleft()">
	<img id=leftBar class="leftBar" src="<%=sUserStylePath%>ucapimages/arrowhead_left_1.gif" name="leftBar"/>
</div>
<div id="ucapView" style="float:left;clean:right"></div>
<div id="menu"></div>
<div id="nav"></div>
</html>