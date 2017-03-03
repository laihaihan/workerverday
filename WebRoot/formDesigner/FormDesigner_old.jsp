<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.platform.cache.form.Form"%>
<%@page import="com.linewell.ucap.resource.*"%>
<%
	String unid = request.getParameter("unid");
	String type = request.getParameter("type");
	String formId = request.getParameter("formId");
	String openST = request.getParameter("openST");
	String viewMId = request.getParameter("viewMId");
	String belongToAppId = request.getParameter("belongToAppId");
	String belongToModuleId = request.getParameter("belongToModuleId");
	if (belongToAppId.equals("null") || belongToAppId.equals("")) {
		try {
			ResourceContext rc = ResourceContext.newInstance();
			ResourceCache cache = rc
					.getResourceCache(ResourceType.RESOURCE_TYPE_FORM);
			Form form = (Form) cache.getResource(unid);
			belongToAppId = form.getBelongToApp();
		} catch (Exception e) {
			System.out.println("从缓存表单中获取所属应用系统出错");
		}
	}
%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<!-- 
    Smart developers always View Source. 
    
    This application was built using Adobe Flex, an open source framework
    for building rich Internet applications that get delivered via the
    Flash Player or to desktops via Adobe AIR. 
    
    Learn more about Flex at http://flex.org 
    // -->
<head>
<title>&#x8868;&#x5355;&#x8bbe;&#x8ba1;&#x5668;</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- Include CSS to eliminate any default margins/padding and set the height of the html element and 
		     the body element to 100%, because Firefox, or any Gecko based browser, interprets percentage as 
			 the percentage of the height of its parent container, which has to be set explicitly.  Initially, 
			 don't display flashContent div so it won't show if JavaScript disabled.
		-->
<style type="text/css" media="screen">
html,body {
	height: 100%;
}

body {
	margin: 0;
	padding: 0;
	overflow: auto;
	text-align: center;
	background-color: #95a2b6;
}

#flashContent {
	display: none;
}
</style>

<!-- Enable Browser History by replacing useBrowserHistory tokens with two hyphens -->
<!-- BEGIN Browser History required section -->
<link rel="stylesheet" type="text/css" href="history/history.css" />
<script src="AC_OETags.js" language="javascript"></script>
<script type="text/javascript" src="history/history.js"></script>
<!-- END Browser History required section -->

<script type="text/javascript" src="swfobject.js"></script>
<script src="AC_OETags.js" language="javascript"></script>
<script type="text/javascript" language="javascript"
	src="bridge/FABridge.js"></script>

<script type="text/javascript">
            <!-- For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. --> 
            var swfVersionStr = "10.0.0";
            <!-- To use express install, set to playerProductInstall.swf, otherwise the empty string. -->
            var xiSwfUrlStr = "playerProductInstall.swf";
            var flashvars = {};
            //ucap参数传递
			var ucapParames="{'unid':'<%=unid%>','type':'<%=type%>','formId':'<%=formId%>','openST':'<%=openST%>','viewMId':'<%=viewMId%>','belongToAppId':'<%=belongToAppId%>','belongToModuleId':'<%=belongToModuleId%>'}";
            flashvars.ucapParames=ucapParames;
            var params = {};
            params.quality = "high";
            params.bgcolor = "#95a2b6";
            params.allowscriptaccess = "sameDomain";
            params.allowfullscreen = "true";
            var attributes = {};
            attributes.id = "FormDesigner";
            attributes.name = "FormDesigner";
            attributes.align = "middle";
            swfobject.embedSWF(
                "FormDesigner.swf", "flashContent", 
                "100%", "100%", 
                swfVersionStr, xiSwfUrlStr, 
                flashvars, params, attributes);
			<!-- JavaScript enabled so display the flashContent div in case it is not replaced with a swf object. -->
			swfobject.createCSS("#flashContent", "display:block;text-align:left;");
        </script>

</head>
<body>
<!-- SWFObject's dynamic embed method replaces this alternative HTML content with Flash content when enough 
			 JavaScript and Flash plug-in support is available. The div is initially hidden so that it doesn't show
			 when JavaScript is disabled.
		-->
<div id="flashContent">
<p>To view this page ensure that Adobe Flash Player version 10.0.0
or greater is installed.</p>
<script type="text/javascript"> 
				var pageHost = ((document.location.protocol == "https:") ? "https://" :	"http://"); 
				document.write("<a href='http://www.adobe.com/go/getflashplayer'><img src='" 
								+ pageHost + "www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>" ); 
			</script></div>

<noscript><object
	classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%"
	height="100%" id="FormDesigner">
	<param name="movie" value="FormDesigner.swf" />
	<param name="quality" value="high" />
	<param name="bgcolor" value="#95a2b6" />
	<param name="allowScriptAccess" value="sameDomain" />
	<param name="allowFullScreen" value="true" />
	<!--[if !IE]>--> <object type="application/x-shockwave-flash"
		data="FormDesigner.swf" width="100%" height="100%">
		<param name="quality" value="high" />
		<param name="bgcolor" value="#95a2b6" />
		<param name="allowScriptAccess" value="sameDomain" />
		<param name="allowFullScreen" value="true" />
		<!--<![endif]--> <!--[if gte IE 6]>-->
		<p>Either scripts and active content are not permitted to run or
		Adobe Flash Player version 10.0.0 or greater is not installed.</p>
		<!--<![endif]--> <a href="http://www.adobe.com/go/getflashplayer">
		<img
			src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif"
			alt="Get Adobe Flash Player" /> </a> <!--[if !IE]>--> </object> <!--<![endif]-->
	 </object></noscript>
</body>
</html>
