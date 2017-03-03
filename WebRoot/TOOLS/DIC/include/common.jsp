<%@page contentType="text/html;charset=UTF-8"%>
<%
//WEB应用的路径
String appPath = request.getContextPath() + "/";
int rndNum = (int)(Math.random()*1000);//产生0-1000的整数随机数
%>


<script type="text/javascript" src="<%=appPath%>js/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ucap/util/common.js" ></script> 

<script type="text/javascript" src="<%=appPath%>js/ucap/select/listSelect.js" ></script>
<script type="text/javascript" src="<%=appPath%>js/ucap/portal/form.js"></script>
<script type="text/javascript" src="<%=appPath%>TOOLS/js/tools.js" ></script>
<script type="text/javascript" src="<%=appPath%>TOOLS/js/view.js" ></script>
<link rel="stylesheet" type="text/css" href="<%=appPath%>js/ucap/calendar/skin/WdatePicker.css" />
<script type="text/javascript" src="<%=appPath%>js/ucap/calendar/WdatePicker.js" ></SCRIPT>