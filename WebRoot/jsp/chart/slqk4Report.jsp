<%@ page contentType="text/html;charset=GBK"%>
<%@include file="/ess/jsp/common/nocache.jsp"%>
<%@ page import="com.linewell.monitor.report.amline.AmlineDataHelper"%>
<%
	String area = request.getParameter("area");
	String dept = request.getParameter("dept");
	String starttime = request.getParameter("starttime");
	String endtime = request.getParameter("endtime");
	boolean isOk = AmlineDataHelper.analysis4ReportToSLQS(area, dept, starttime, endtime);

 %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
  <script type="text/javascript" src="../../amline/swfobject.js"></script>
  <div id="flashcontent">
		<strong>You need to upgrade your Flash Player <br/><%="area:" + area + " dept:" + dept%></strong>
	</div>
	<script type="text/javascript">
	function rand(n) {          
        return (Math.floor(Math.random() * n + 1));          
        }
        var randrandom_number = rand(10000);
		// <![CDATA[		
		var so = new SWFObject("../../amline/amline.swf?num="+randrandom_number, "amline", "850", "500", "8", "#FFFFFF");
		so.addVariable("path", "../../amline/");
		so.addVariable("settings_file", encodeURIComponent("amline_settings.xml?num="+randrandom_number));
		so.addVariable("data_file", encodeURIComponent("amline_data.xml?num="+randrandom_number));
		var isk = '<%=isOk%>';
		if(isk)
		so.write("flashcontent");
		// ]]>
	</script>
</body>
</html>