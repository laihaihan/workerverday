<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.platform.cache.login.*"%>
<%@page import="com.linewell.ucap.resource.ResourceCache"%>
<%@page import="com.linewell.ucap.resource.ResourceContext"%>
<%@page import="com.linewell.ucap.resource.ResourceType"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>南威系统应用平台</title>
 	<script type="text/javascript" src="../js/ext/ext-base.js"></script>
    <script type="text/javascript" src="../js/ext/ext-all.js"></script>
	<script type="text/javascript"	src="../js/ext/ext-lang-zh_CN.js"></script>
	<script type="text/javascript"  src="../js/ucap/util/common.js" ></script>	
	
	<script type="text/javascript"  src="../js/ucap/login/login.js" ></script>	
	<script type="text/javascript"  src="../js/ucap/login/base64code.js" ></script>	
	<script type="text/javascript"  src="../js/ucap/login/UnicodeAnsi.js" ></script>	
	<link rel="stylesheet" type="text/css" href="../uistyle/style_1/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="../uistyle/style_1/css/ext-patch.css" />
	<link href="./style/login.css" rel="stylesheet" type="text/css" />
	<link href="../login/css/login.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript">
	Ext.onReady(function(){
		//add by jc当iframe被转到登录界面时，使window转到登录界面
		if(window.top!=window.self){
			window.top.location.reload();
		}
		//非IE浏览器不加载控件add by cguangcong@linewell.com 2011-9-22
		if(Ext.isIE){
			try{
				var Interface = new ActiveXObject("ucapWord.Interface");
			}catch(e){
				
					Ext.Msg.confirm("系统提示","您当前未安装ucap相关控件,<br/>是否现在<A title='请右键另存为进行下载' style='color:red;' href=\"client/setup.exe\">下载</A>ucap控件安装？",function(ok){
					if(ok=="yes"){
						window.location.href = "client/setup.exe";
					}
				});
			}	
		}	
	});
	
	/**
	 * 重构用户登录事件逻辑
	 * @param {} scheme 界面风格对象
	 */
	ucapCommonFun.buttonFun.gotoIndex = function(scheme){
			var type = scheme.indexType;
			var index = scheme.index;
			if (typeof(type) == "undefined") {
				type = "01";
			}
			var iType = parseInt(type, 10);
			var indexJsp = "sys/jsp/index.jsp";
			//更改门户加载方式 mdf by jc 20120528
			indexJsp = "sys/system/index.jsp";
			if (iType == 1 || iType == 2) {
				window.location.href = ucapSession.appPath + indexJsp;
			} else if (iType == 3) {
				// 打开URL
				window.location.href =index;
				//ucapCommonFun.indexOpen.openUrl(index);
			}
	}
	</script>
</head>

<body>
<script language="javascript">
//非IE浏览器不加载控件add by cguangcong@linewell.com 2011-9-22
if(Ext.isIE){
	var compoentsStr = '';
	
	//加载im控件	需要同步登入IM时开启
	//compoentsStr += '<OBJECT ID="imsso" CLASSID="CLSID:D920BD8E-9619-415D-9A9A-0FF123B5A5F4" width="0" height="0">';
	//compoentsStr += '</OBJECT>';
	
	//加载办公平台组件
	compoentsStr += '<OBJECT classid="clsid:A318A9AC-E75F-424C-9364-6B40A848FC6B" width="0" height="0" id="zkonline">';
	compoentsStr += '</OBJECT>';
	compoentsStr += '<COMMENT>';
	compoentsStr += '    <EMBED type="application/x-eskerplus"';
	compoentsStr += '        classid="clsid:A318A9AC-E75F-424C-9364-6B40A848FC6B"';
	compoentsStr += '        codebase="ZKOnline.ocx"';
	compoentsStr += '        width="0" height="0" >';
	compoentsStr += '    </EMBED>';
	compoentsStr += '</COMMENT>';
	
	document.write(compoentsStr);
}
</script>
<%
ResourceContext rc = ResourceContext.newInstance();
ResourceCache cache = rc.getResourceCache(ResourceType.RESOURCE_TYPE_LOGIN);
Login login = (Login) cache.getResource("");
%>

<div class="top">
</div>

<div class="mid">
</div>

<!--登录域 begin-->
<div class="login">

	<!--登录信息区 begin-->
		<div class="login_info">
		
			<!-- 用户名 -->
			<div class="login_info_text">
				用户名：
				
				<!-- 用户名输入框 -->
				<div class="login_info_input">
					<input name="userName" id="userName" type="text" /> 
				</div>

			</div>			
			
			<!-- 密码 -->
			<div class="login_info_text">
				密　码：
				<!-- 密码输入框 -->
				<div class="login_info_input">
					<input name="password" id="password" type="password" /> 
				</div>
			</div>
			
			
			<!-- 登录按钮 -->
			<div class="login_button" onclick="submit();" >
			</div>
			
			<!-- 错误信息 -->
			<div id="msg" class="login_info_error">
			</div>
					
	</div>
	<!--登录信息区 end-->	
</div>
<!--登录域 end-->

<!--页脚 begin-->
<div class="footer">
	<a>版权所有 © 2008-2012 南威软件股份有限公司</a>
</div>
<!--页脚 end-->


</body>
</html>