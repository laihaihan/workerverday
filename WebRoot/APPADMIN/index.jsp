<%@page contentType="text/html;charset=UTF-8"%>
<html>
<head>
<%@include file="/APPADMIN/header.jsp"%>
<%
	//User user = ucapSession.getUser();
	if(!user.isAppAdmin()){
		out.print("对不起，您不是应用系统管理员！");
		response.sendRedirect(sSystemPath+"APPADMIN/");
		return;
	}
 %>
<title><%=app.getDisplayName()%></title>
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>/css/portal.css" />
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/index.js">	</script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/Portal.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/miframe.js"></script>
<SCRIPT language=javascript src="<%=sSystemPath%>js/user/user.js"></SCRIPT>
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
var gotoManager = function(){
	window.location = ucapSession.appPath + "sys/system/index.jsp";
}
/**
 * 进入门户设计器
 */
var goToPortal = function(){
	window.open(ucapSession.appPath + "portalDesigner/portalDesigner.jsp");
}
ucapMenu.initNavigation = function(){
	var cuts = [{"buttonType":"01","content":"ucapCommonFun.buttonFun.loginOut();","displayType":"01","name":"注销","picturePath":"uistyle/images/icon/icon_95.gif","tip":"注销","type":"03"}
					,{"buttonType":"01","content":"userManager.modifyPersonalInfo()","displayType":"01","name":"个人信息设置","picturePath":"uistyle/images/icon/icon_92.gif","tip":"个人信息设置","type":"03"}
					,{"buttonType":"01","content":"goToPortal();","displayType":"01","name":"门户配置","picturePath":"uistyle/images/icon/icon_91.gif","tip":"门户配置","type":"03"}
					,{"buttonType":"01","content":"gotoManager()","displayType":"01","name":"分级管理中心","picturePath":"uistyle/images/icon/icon_49.gif","tip":"分级管理中心","type":"03"}
					];
	
	var requestConfig = {
		url:ucapSession.baseAction,
		params:{type:"nav",act:"getNav","random":ucapCommonFun.getRandomString()},
		callback:function(options,success,response){
			if (success){
				var json = Ext.decode(response.responseText);					
				var exResult=ucapCommonFun.dealException(json);
				if(!exResult)return;
				
				ucapMenu.navigation = json;
				if (typeof(json)=="undefined" || response.responseText=="null") {
					Ext.getDom("topBarToolBox").style.display="none";
					Ext.getDom("navigation_top").style.display="none";
					return;
				}
				var nav = json.navigation;
				//var cuts = json.uiShortcuts;
				var navigation ="";
				if(nav.messagePosition=="01"){
					navigation ="&nbsp;&nbsp;"+nav.displayMessage;
				}				
				for(var i=0;i<cuts.length;i++){
					var clk="";
					//这个代码需要进行优化，目前先以这种方式，应该做成自定义项可以定义使用范围和不能使用范围
					if(!ucapHeader.selfConfig && cuts[i].content.indexOf(".userDefine()")>=0)continue;
					if (cuts[i].content.indexOf("gotoPortalConfig()")>=0&&ucapSession.userJson.userStatus != 1)continue;//过滤门户配置按钮add by fsm
					var cutHtml = ucapMenu.getCutHtml(cuts[i]);
					if("undefined"==typeof(cutHtml) || cutHtml=="")continue;
					navigation +="&nbsp;&nbsp;"+cutHtml;						
				}	
				if(nav.messagePosition=="03"){
					navigation +="&nbsp;&nbsp;"+nav.displayMessage;
				}
				if (ucapMenu.navigationType==1){
					Ext.getDom("topBarToolBox").innerHTML  = navigation;
				} else {
					Ext.getDom("navigation").innerHTML=navigation;
				}						
			}
		}
	}
	Ext.Ajax.request(requestConfig);	
		
};
/**
 * 重构菜单事件，强制系统打开系统管理模块
 */
ucapMenu.init = function(){
	//设置界面方案首页类型为模块
	ucapSession.indexType="02";
	//设置系统管理模块UNID
	var systemModuleUnid = "FHFSFD14A5034EAF00201059001B0065";
	this.initHeight();
	this.initNavInfo();
	this.menuContent=[];
	ucapMenu.initNavigation();
	
	ucapCommonFun.indexOpen.openModule(systemModuleUnid);
}

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