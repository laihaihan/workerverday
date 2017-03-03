<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.linewell.core.report.premie.PremiereDataHelper"%>
<%@ page import="com.linewell.core.system.GlobalParameter"%> 
<%
//不缓存
response.setHeader("Cache-Control","no-cache");
response.setHeader("Pragma","no-cache");
response.setDateHeader("Expires",0);
%>
<%
	String dept = request.getParameter("dept");
	String begintime = request.getParameter("begintime");
	String endtime = request.getParameter("endtime");
	String w = "400";
	String h = "205";
	String jndi = GlobalParameter.APP_WAS;
	//if(null == isOk){
	   PremiereDataHelper.analysis4ReportToHandlestate(begintime,endtime,dept,jndi,request);
	//}else if("da".equals(isOk)){
	//	w = "900";
	//	h = "450";
	//}
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
  <script type="text/javascript" src="../../amcolumn/swfobject.js"></script>
  <div id="flashcontent">
		<strong>请升级您的Flash播放器</strong>
  </div>
	<script type="text/javascript">
		function rand(n) {          
	    	return (Math.floor(Math.random() * n + 1));          
	  	}
	  	var randrandom_number = rand(10000);
		// <![CDATA[		
		var so = new SWFObject("../../amcolumn/amcolumn.swf?num="+randrandom_number, "amcolumn", "100%", "100%", "8", "#FFFFFF");
		so.addVariable("path", "../../amcolumn/");
		so.addVariable("settings_file", encodeURIComponent("../spxml/amcolumn_settings_handlestate.xml?num="+randrandom_number));
		so.addVariable("data_file", encodeURIComponent("../spxml/amcolumn_data_handlestate.txt?num="+randrandom_number));
		so.addVariable("preloader_color", "#999999");
		so.addParam("wmode", "opaque");
		so.write("flashcontent");
	</script>
<!-- end of amcolumn script -->
</body>
</html>
