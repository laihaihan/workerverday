<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%
	//根据登入的用户名和密码，重新生成session,支持火狐附件上传  2011-11-2
	Session flashSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String user=flashSession.getUser().getName();
	String pwd=flashSession.getUser().getPassword();
%>
<html>	
    <head>
        <title>文件上传</title>         
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <jsp:include page="../../sys/jsp/session.jsp"/>
        <style type="text/css" media="screen"> 
			html, body	{ height:100%; }
			body { margin:0; padding:0; overflow:auto;
			       background-color: #ffffff; }   
			#flashContent { display:none; }
        </style>
		
		<!-- Enable Browser History by replacing useBrowserHistory tokens with two hyphens -->
        <!-- BEGIN Browser History required section -->
        <link rel="stylesheet" type="text/css" href="history/history.css" />
        <script type="text/javascript" src="history/history.js"></script>
        <!-- END Browser History required section -->  
		    
        <script type="text/javascript" src="swfobject.js"></script>
        <script type="text/javascript">
            <!-- For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. --> 
            var swfVersionStr = "10.0.0";
            <!-- To use express install, set to playerProductInstall.swf, otherwise the empty string. -->
            var xiSwfUrlStr = "playerProductInstall.swf";
            
            //接收平台传递过来的参数
            var sType = ucapCommonFun.getUrlParameter("sType");
            var split = ucapCommonFun.getUrlParameter("split")||"";
			var punid = ucapCommonFun.getUrlParameter("punid");
			var docType = ucapCommonFun.getUrlParameter("docType");
			var mainUrl = unescape(ucapCommonFun.getUrlParameter("mainUrl"));
			var fileSizeMax = ucapCommonFun.getUrlParameter("fileSizeMax");
			var fileTotalSizeMax = ucapCommonFun.getUrlParameter("fileTotalSizeMax");
			var appUnid = ucapCommonFun.getUrlParameter("appUnid");
			var dialogTypes = ucapCommonFun.getUrlParameter("dialogTypes");
			var formType = ucapCommonFun.getParentUrlParameter("type");
			var formId = ucapCommonFun.getParentUrlParameter("formId");
			//流程实例Id add by cguangcong@linewell.com 2011-10-11
			var pUrl =  parent.location.href;
			var instanceUnid = ucapCommonFun.getUrlParameter("instanceUnid",pUrl)||"";
			var docId = ucapCommonFun.getUrlParameter("unid",pUrl)||"";
		   	var isDocSave = punid?"1":"0";
			_UcapForm.cfg.isDocSave = isDocSave;
			var allTypes = window.parent.ucap_attr_fun.attrTypes||window.parent.ucap_attr_fun.defaultAttrTypes;
			var path = mainUrl+"BackGroundService.upload?"
						+ "docType=" + docType 
						+ "&punid=" + punid
						+ "&split=" + split
						+ "&type=" + sType
						+ "&isDocSave=" + isDocSave
						+ "&appUnid="+appUnid
						+ "&docId="+docId
						+ "&user="+"<%=user%>"    //用于火狐浏览器获取session
						+ "&pwd="+"<%=pwd%>"	  //用于火狐浏览器获取session
						+ "&instanceUnid="+instanceUnid
						+ "&formType="+formType
						+ "&formId="+formId;
			//保存参数到此对象中，Flex再从中获取参数
            var flashvars = {};
            flashvars.columnWidths = globalVariables.flashUploadColumnWdiths || "24,*,120,55,60,100,45";
            flashvars.columnNames = globalVariables.flashUploadColumnNames || ",附件标题,文件名,大小,附件类型,进度,";
            flashvars.fileSizeMax = fileSizeMax;
            flashvars.fileTotalSizeMax = fileTotalSizeMax;
            flashvars.allTypes = allTypes;
            flashvars.dialogTypes = dialogTypes;
            flashvars.path = escape(path);
            
            var params = {};
            params.quality = "high";
            params.bgcolor = "#ffffff";
            params.allowscriptaccess = "sameDomain";
            params.allowfullscreen = "true";
            var attributes = {};
            attributes.id = "FlashUpLoad";
            attributes.name = "FlashUpLoad";
            attributes.align = "middle";
            swfobject.embedSWF(
                "FlashUpLoad.swf", "flashContent", 
                "100%", "100%", 
                swfVersionStr, xiSwfUrlStr, 
                flashvars, params, attributes);
			<!-- JavaScript enabled so display the flashContent div in case it is not replaced with a swf object. -->
			swfobject.createCSS("#flashContent", "display:block;text-align:left;");
        </script>
        <script>
        	//单击关闭按钮
        	function closeDialog()
        	{
        		refreshFileList();
        		if(window.parent.Ext.getCmp("ucap_win_showUpload")!=null)
        		{
        			window.parent.Ext.getCmp("ucap_win_showUpload").close();
        		}
        	}
        	
        	//刷新平台的文件列表
        	function refreshFileList()
        	{
        		window.parent.ucap_attr_fun.getInfo(docType,punid);
        	}
        </script>
    </head>
    <body>
        <!-- SWFObject's dynamic embed method replaces this alternative HTML content with Flash content when enough 
			 JavaScript and Flash plug-in support is available. The div is initially hidden so that it doesn't show
			 when JavaScript is disabled.
		-->
        <div id="flashContent">
        	<iframe src="downFlashPlayer.html" width="100%" height="100%"></iframe>
        </div>
       	<noscript>
            <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="FlashUpLoad">
                <param name="movie" value="FlashUpLoad.swf" />
                <param name="quality" value="high" />
                <param name="bgcolor" value="#ffffff" />
                <param name="allowScriptAccess" value="sameDomain" />
                <param name="allowFullScreen" value="true" />
                <!--[if !IE]>-->
                <object type="application/x-shockwave-flash" data="FlashUpLoad.swf" width="100%" height="100%">
                    <param name="quality" value="high" />
                    <param name="bgcolor" value="#ffffff" />
                    <param name="allowScriptAccess" value="sameDomain" />
                    <param name="allowFullScreen" value="true" />
                <!--<![endif]-->
                <!--[if gte IE 6]>-->
                	<p> 
                		Either scripts and active content are not permitted to run or Adobe Flash Player version
                		10.0.0 or greater is not installed.
                	</p>
                <!--<![endif]-->
                    <a href="http://www.adobe.com/go/getflashplayer">
                 单击下载Flash Player ActiveX
                    </a>
                <!--[if !IE]>-->
                </object>
                <!--<![endif]-->
            </object>
	    </noscript>		
   </body>
</html>
