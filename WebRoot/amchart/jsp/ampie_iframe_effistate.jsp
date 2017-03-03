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
	//String w = "400";
	//String h = "205";
	String jndi = GlobalParameter.APP_WAS;
	//if(null == isOk){
	  PremiereDataHelper.analysis4ReportToEffistate(jndi,request);
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
  <script type="text/javascript" src="../../ampie/swfobject.js"></script>
  <div id="flashcontent">
		<strong>请升级您的Flash播放器</strong>
  </div>
	<script type="text/javascript">
		function rand(n) {          
	    	return (Math.floor(Math.random() * n + 1));          
	  	}
	  	var randrandom_number = rand(10000);
		// <![CDATA[		
		var so = new SWFObject("../../ampie/ampie.swf?num="+randrandom_number, "ampie", "100%", "100%", "8", "#000000");
		so.addVariable("path", "../../ampie/");
		so.addVariable("settings_file", encodeURIComponent("../spxml/ampie_settings_effistate.xml?num="+randrandom_number));
		so.addVariable("data_file", encodeURIComponent("../spxml/ampie_data_effistate.xml?num="+randrandom_number));
		so.addVariable("preloader_color", "#ffffff");
		so.write("flashcontent");
	</script>
<!-- end of amcolumn script -->
</body>
</html>
