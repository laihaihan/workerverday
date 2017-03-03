<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/core/params.jsp" %>
<html>
<head>
<!-- 政务平台 -->
<link rel="stylesheet" type="text/css" href="${corejs}/easyui/themes/default/easyui_ucap.css" />
<!-- /政务平台 -->


<%@include file="/sys/jsp/header.jsp"%>
<!-- 政务平台 -->
<!-- script type="text/javascript" src="${corejs}/jquery.js"></script-->
<script type="text/javascript" src="${corejs}/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${corejs}/lw-ui/globalvar.js"></script>
<script type="text/javascript" src="${corejs}/lw-ui/lwin.js"></script>
<script type="text/javascript" src="${corejs}/lw-ui/popup.js"></script>
<!-- /政务平台 -->
<title><%=app.getDisplayName()%></title>
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>/css/portal.css" />
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/index.js">	</script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/Portal.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/miframe.js"></script>
<SCRIPT language=javascript src="<%=sSystemPath%>js/user/user.js"></SCRIPT>
<!-- 开始组件资源加载 -->
<%@include file="/sys/ucapReSources/ucapPortalResource.jsp"%> 
<!-- 组件资源加载结束 -->
</head>
<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="<%=sSystemPath%>client/swflash.cab#version=9,0,28,0" width="0" height="0">
<param name="movie" value="./index.jsp" />
</object>
<div id="portal_id" class="rightPortal" >	
</div>
<div id ="portal_info" align="center" class="red">正在加载频道，请稍等.....</div>
<%@include file="/sys/jsp/floatpage.jsp"%>
<%@include file="/sys/jsp/footer.jsp"%>
<script type="text/javascript">
Ext.onReady(function(){
	try{
		//start 判断当前用户角色类型是否是安全管理员（type==secAd），如果是则跳转到相应的安全管理员配置页面
		<%
		String rolesType=ucapSession.getUser().getRolesType(ucapSession);
		%>
		var rolesType="<%=rolesType%>";
		if(rolesType.indexOf("secad")>-1){
			window.location.href =ucapSession.appPath +"sys/cfgJsp/role/securityPage.jsp";//安全管理员页面
		}
		//end
		
		//设置index.jsp页面自适应宽度与高度
		window.onresize = function(){
			ucapCommonFun.setIframeViewHeight();
			ucapCommonFun.setIframeViewWidth();
			//当首页打开的是频道的时候，如果改变窗口大小自动刷新首页，用于自适应首页频道的宽高。add by jc 20100913
			if($("portal_id") && $("portal_id").innerHTML!=""){
				window.location=window.location;
			}
		}
	}catch(e){}
});
</script>
</html>