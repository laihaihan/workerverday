<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.style.Style"%>
<%@page import="com.linewell.ucap.platform.cache.style.StyleManager"%>
<%@page import="com.linewell.ucap.unitaryportal.manager.UnitaryPortalManager"%>
<%
	String portalUnid=request.getParameter("portalUnid");
	if(null==portalUnid)portalUnid="";
	Session sessionTmp = (Session) request.getSession().getAttribute(
			Session.SESSION_NAME); 
	if(null==sessionTmp){
		UnitaryPortalManager portalManager=new UnitaryPortalManager();
		sessionTmp=portalManager.getDefaultSession();
		request.getSession().setAttribute(Session.SESSION_NAME, sessionTmp);
	}
%>
<html>
  <head>
    <title>门户演示页面</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />  
	<script>
		var sessionTmp="<%=sessionTmp%>"
		if(null==sessionTmp || sessionTmp==undefined || sessionTmp=="null"){
			window.location.href = "<%=request.getContextPath()+"/"%>login.jsp";
		}
	</script>
	<%@include file="/sys/jsp/jspSession.jsp"%> 
	<script type="text/javascript">
		//平台管理员跳转到平台首页 add by jc 20120528
		var portalUnidGet="<%=portalUnid%>";
		if(ucapHeader.userJson && ucapHeader.userJson.appAdmin==true && portalUnidGet==""){
			window.location.href = "<%=sSystemPath%>sys/jsp/index.jsp";
		}
	</script>
	<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-patch.css" />
	<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>/css/ucap.css" />
	<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>/css/ucap-portal.css" />
	<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>/css/tabs.css" />
	<link rel="stylesheet" type="text/css" href="<%=sSystemPath%>PORTAL/css/expand.css" />
	<link rel="stylesheet" type="text/css" href="./demo/css/demo.css" />
	<script type="text/javascript" src="<%=sSystemPath%>PORTAL/js/jquery-1.5.min.js"></script>
	<script type="text/javascript" src="<%=sSystemPath%>PORTAL/js/jquery.json-2.2.min.js"></script>
	<script type="text/javascript" src="<%=sSystemPath%>js/ext/ext-base.js"></script>
	<script type="text/javascript" src="<%=sSystemPath%>js/ext/ext-all.js"></script>
	<!-- script type="text/javascript" src="<%=sSystemPath%>js/ext/ext-all.gzjs"></script-->
	<script type="text/javascript"	src="<%=sSystemPath%>js/ext/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=sSystemPath%>PORTAL/js/jquery.tabs.js"></script>
	<script type="text/javascript" src="<%=sSystemPath%>PORTAL/js/ucapPortal.js"></script>
	<script type="text/javascript" src="<%=sSystemPath%>js/ucap/util/common.js">	</script>
	<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/menu.js">	</script>
	<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/index.js">	</script>
	<script type="text/javascript" src="<%=sSystemPath%>js/ucap/util/globalVariables.js"></script>
	<script type="text/javascript" src="<%=sSystemPath%>js/ucap/view/view.js"></script>
	<SCRIPT type="text/javascript" src="<%=sSystemPath%>js/ucap/flow/ucapFlow.js"></SCRIPT>
	<script type="text/javascript" src="<%=sSystemPath%>PORTAL/js/expand.js"></script>
	
	<style type="text/css">
	html{
		width:100%;
		height:100%;
		
	}
	body {
		font-size:12px;
		margin: 0;
		padding: 0;
		color: #000;	
		width:100%;
		height:100%;
	}
	iframe {
		width:100%;
		height:100%;
		border:0px transparent none;
	}
	ul, ol, dl { 
		padding: 0;
		margin: 0;
	}
	li{
		list-style:none;
	}
	h1, h2, h3, h4, h5, h6, p {
		margin-top: 0;
		padding-right: 15px;
		padding-left: 15px;
	}
	a img {
		border: none;
	}
	
	a:link {
		color: #42413C;
		text-decoration:none;
	}
	a:visited {
		color: #6E6C64;
		text-decoration: underline;
	}
	a:hover, a:active, a:focus {
		text-decoration: none;
	}
		
	</style>
	<script type="text/javascript">
	//var appPath = "<%=sSystemPath%>";
	//防止滚动条被原ucapCommonFun.autoMenuHeight方法隐藏
	ucapCommonFun.autoMenuHeight=function(){};
	jQuery(function($){
		var portalUnid = ucapCommonFun.getUrlParameter("portalUnid");
		//根据登录用户的相关信息获取门户
		var params = "type=unitaryPortalAction&act=getPortalInfo";
		//根据门户UNID进行门户的预览
		if(portalUnid){
			params = "type=unitaryPortalAction&act=getPortalInfoById&portalUnid="+portalUnid;
		}
		$.ajax({
		   type: "POST",
		   async : true,
		   url: appPath+"BaseAction.action",
		   data: params,
		   dataType: "xml",
		   //dataType: "text",
		   success: function(data){
		   		if(data){
		   			//渲染门户
					$("#portal_id").ucapPortal("init",data);
					//防止平台common.js中的代码控制页面对象
					window.onresize = function(){
						//$("#portal_id").ucapPortal("syncCenter");
					};
				}
		   }
		});
		
	});
	
	

	</script>
  </head>
  
  <body style="text-align:center;overflow:auto;">
	<div id="portal_id" style="text-align:left;margin:0 auto;">	
	</div>
	
  </body>
</html>
