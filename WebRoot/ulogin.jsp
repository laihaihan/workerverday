<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.platform.cache.login.*"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucap.resource.ResourceCache"%>
<%@page import="com.linewell.ucap.resource.ResourceContext"%>
<%@page import="com.linewell.ucap.resource.ResourceType"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>南威系统应用平台</title>
 	<script type="text/javascript" src="js/ext/ext-base.js"></script>
    <script type="text/javascript" src="js/ext/ext-all.js"></script>
	<script type="text/javascript"	src="js/ext/ext-lang-zh_CN.js"></script>
	<script type="text/javascript"  src="js/ucap/util/common.js" ></script>	
	
	<script type="text/javascript"  src="js/ucap/login/login.js" ></script>	
	<script type="text/javascript"  src="js/ucap/login/base64code.js" ></script>	
	<script type="text/javascript"  src="js/ucap/login/UnicodeAnsi.js" ></script>	
	<link rel="stylesheet" type="text/css" href="uistyle/style_1/css/ext-all.css" />
	<link href="login/css/login.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="uistyle/style_1/css/ext-patch.css" />
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
	</script>
</head>

<body scroll="no" style="overflow:hidden">
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
<div class="loginHeader"></div>
<div class="loginBox">
	<div class="loginLeft">
	<!-- <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0" width="345" height="268"> -->
	<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="./client/swflash.cab#version=9,0,28,0" width="345" height="268">
        <param name="movie" value="login/images/login.swf" />
        <param name="quality" value="high" />
        <param name="wmode" value="opaque" />      
        <embed src="login/images/login.swf" wmode="opaque" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="345" height="268" />
      </object>
	</div>
  <div class="loginBetween"></div>
    <div class="loginRight">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td height="268" align="center" valign="middle"><table width="90%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td width="18%" height="27" align="left">用户名：</td>
        <td width="82%" align="left"><input name="userName" id="userName" type="text" size="30" class="inputbox" /></td>
      </tr>
      <tr>
        <td height="27" align="left">密&nbsp;&nbsp;&nbsp;码：</td>
        <td align="left"><input name="password" id="password" type="password"  size="18" class="inputbox" />
           <%if(login.isGetPass()){ %><a href="#" class="blue">找回密码</a> <%} %> </td>
      </tr>
      <%if(login.isVerify()){ %>
      <tr>
        <td height="27" align="left">验证码：</td>
        <td align="left"><input name="checkimage" id="checkimage" type="text" size="18" class="inputbox" />
        	<%if(StringUtils.isEmpty(login.getSendVerifyMode())){ %>
            <img  id="imgid" src="login/loginimage.jsp" align="absmiddle" onclick="Ext.getDom('imgid').src='login/loginimage.jsp';" title="看不清，请单击换一张"/>
            <%}else{%>
            <a href="javascript:void(0)" onclick="sendVerify();"><u><b>发送验证码</b></u></a>
            <%}%>
        </td>
      </tr>
      <%} 
      %>
     <%if(login.isMultiUnit()){ %>
      <tr>
        <td height="27" align="left">域&nbsp;&nbsp;&nbsp;名：</td>
        <td align="left"><input name="domainName" id="domainName" type="text" size="18" class="inputbox" />例：csdn.com</td>
      </tr>
      <%} 
      %>
      <tr>
       <td height="40" colspan="2" align="center" class="loginButton"> 
       <% if(login.isLogin()){%> <a href="javascript:void(0)"> <img  name="Image1"  id="Image1" src="login/images/btnn_login.gif" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('Image1','','login/images/btnn_login_hover.gif',1)" onclick="submit();" /></a>&nbsp;&nbsp;<%} %> 
         <% if(login.isFingerprint()){%> <a  href="javascript:void(0)"><img name="Image3" id="Image3" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('Image3','','login/images/btnn_zw_hover.gif',1)" src="login/images/btnn_zw.gif" onclick="fingerSubmit();" /></a>&nbsp;&nbsp;<%} %>
        <a href="javascript:void(0)"> <img name="Image2" id="Image2" src="login/images/btnn_cancel.gif" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('Image2','','login/images/btnn_cancel_hover.gif',1)" onclick="formReset();" /></a>&nbsp;&nbsp;
      <% if(login.isCa()){%> <a href="javascript:void(0)"><img name="Image3" id="Image3" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('Image3','','login/images/btnn_ca_hover.gif',1)" src="login/images/btnn_ca.gif" /></a><%} %></td>
      </tr>
      <tr>
        <td height="27" colspan="2" align="center" class="red"> <div id="msg"> </div></td>
      </tr>      
    </table></td>
  </tr>
</table>
    </div>
</div>
<div class="loginFooter">版权所有 &copy; 2009 南威软件工程发展有限公司<br />
Copyright &copy; 2009 Fujian Linewell Software Engineering Development Co.,Ltd</div>

</body>
</html>