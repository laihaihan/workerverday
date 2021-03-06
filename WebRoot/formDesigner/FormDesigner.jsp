<!DOCTYPE>
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.platform.cache.form.Form"%> 
<%@page import="com.linewell.ucap.resource.*"%> 

<%

    //表单参数
	String unid=request.getParameter("unid");
	String type=request.getParameter("type");
	String formId=request.getParameter("formId");
	String openST=request.getParameter("openST");
	String viewMId=request.getParameter("viewMId");
	String belongToAppId=request.getParameter("belongToAppId");
	String belongToModuleId=request.getParameter("belongToModuleId");
	String systemPath="http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/"; 
	if(null==belongToAppId || belongToAppId.equals("null") || belongToAppId.equals(""))
	{
		try
		{
			ResourceContext rc = ResourceContext.newInstance();
			ResourceCache cache = rc.getResourceCache(ResourceType.RESOURCE_TYPE_FORM);
			Form form = (Form) cache.getResource(unid);
			belongToAppId = form.getBelongToApp();
		}
		catch(Exception e)
		{
			System.out.println("从缓存表单中获取所属应用系统出错");
		}
	}

  //显示表单参数
  String tmpSourceType = request.getParameter("sourceType");
	String sourceType= (null==tmpSourceType || ""==tmpSourceType ? "form" : tmpSourceType);
	String showFormId=request.getParameter("showFormId");
%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">	
    <head>
        <title>&#x8868;&#x5355;&#x8bbe;&#x8ba1;&#x5668;</title>         
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css" media="screen"> 
			html, body	{ height:100%; }
			body { margin:0; padding:0; overflow:auto; text-align:center; 
			       background-color: #e9e9e9; }   
			#flashContent { display:none; }
        </style>
		
        <link rel="stylesheet" type="text/css" href="history/history.css" />
        <link rel="stylesheet" type="text/css" href="../uistyle/style_1/css/ext-all.css" />
        <link rel="stylesheet" type="text/css" href="../uistyle/style_1/css/ext-patch.css" />
        <script type="text/javascript" src="../js/ext/ext-base.js"></script>
		<script type="text/javascript" src="../js/ext/ext-all.js"></script>
        <script src="AC_OETags.js" language="javascript"></script>
        <script type="text/javascript" src="history/history.js"></script>
        <script type="text/javascript" src="swfobject.js"></script>
        <script type="text/javascript" language="javascript" src="bridge/FABridge.js"></script>
        
        <script>
        
        	/**
        	 * 调用表单设计器对象的保存方法保存当前设计
        	 */
        	function designSave(){
        		getFormDesigner().designSave();
        	}
        
        	/**
        	 * 获取表单设计器对象
        	 */
			function getFormDesigner() {
				if (navigator.appName.indexOf("Microsoft") != -1) {
					return window["FormDesigner"]
				}else{
					return document["FormDesigner"]
				}
			}
        </script>
        
        <script type="text/javascript">
            var swfVersionStr = "10.0.0";
            var xiSwfUrlStr = "playerProductInstall.swf";
            var flashvars = {};
            //ucap参数传递
			var ucapParames="{'unid':'<%=unid%>','type':'<%=type%>','formId':'<%=formId%>','openST':'<%=openST%>','viewMId':'<%=viewMId%>','sourceType':'<%=sourceType%>','showFormId':'<%=showFormId%>','belongToAppId':'<%=belongToAppId%>','belongToModuleId':'<%=belongToModuleId%>','systemPath':'<%=systemPath%>'}";
            flashvars.ucapParames=ucapParames;
             
            var params = {};
            params.quality = "high";
            params.wmode = "opaque";//在flash控件加个置底的属性,避免flash覆盖了div add by cguangcong@linewell.com 2012-04-26
            params.bgcolor = "#e9e9e9";
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
			swfobject.createCSS("#flashContent", "display:block;text-align:left;");
        </script>

    </head>
    <body>
    	<div id="flashContent">
			<script type="text/javascript"> 
				var pageHost = ((document.location.protocol == "https:") ? "https://" :	"http://"); 
			</script> 
        </div>
       	<noscript>
            <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="FormDesigner">
                <param name="movie" value="FormDesigner.swf" />
                <param name="quality" value="high" />
                <param name="bgcolor" value="#e9e9e9" />
                <param name="allowScriptAccess" value="sameDomain" />
                <param name="allowFullScreen" value="true" />
                <object type="application/x-shockwave-flash" data="FormDesigner.swf" width="100%" height="100%">
                    <param name="quality" value="high" />
                    <param name="bgcolor" value="#e9e9e9" />
                    <param name="allowScriptAccess" value="sameDomain" />
                    <param name="allowFullScreen" value="true" />
                </object>
            </object>
	    </noscript>		
   </body>
</html>
