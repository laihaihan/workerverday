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
<script type="text/javascript" src="<%=appPath%>js/ucap/util/globalVariables.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ucap/select/listSelect.js" ></script>
<!-- <script type="text/javascript" src="<%=appPath%>js/ucap/view/viewTree.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ucap/view/viewConfig.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ucap/view/viewConditionCfg.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ucap/dept/dept.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ucap/dict/dictTree.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ucap/util/validator.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ucap/util/treeUi.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ucap/select/listSelect.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ucap/shortCut/shortConfig.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ucap/calendar/WdatePicker.js" ></SCRIPT>
<SCRIPT type="text/javascript" src="<%=appPath%>js/ucap/flow/ucapFlow.js"></SCRIPT>
<script type="text/javascript" src="<%=appPath%>js/ucap/configLog/configLog.js" ></SCRIPT>
<script type="text/javascript" src="<%=appPath%>js/ucap/userInfo/modifyPassword.js" ></SCRIPT>
<script type="text/javascript" src="<%=appPath%>js/ucap/changeDB/changeDB.js" ></SCRIPT>
<script type="text/javascript" src="<%=appPath%>js/ucap/function/function.js" ></SCRIPT>
<script type="text/javascript" src="<%=appPath%>js/ucap/permission/permission.js"></script> -->
<script type="text/javascript" src="<%=appPath%>js/ucap/portal/form.js"></script>
<script type="text/javascript" src="<%=appPath%>js/ucap/userInfo/modifyPassword.js" ></SCRIPT>
<script type="text/javascript" src="<%=appPath%>UMC/js/UMCCommon.js" ></script>
<script type="text/javascript" src="<%=appPath%>UMC/js/view.js?r=<%= rndNum %>" ></script>
<script type="text/javascript" src="<%=appPath%>UMC/js/UMCDept.js?r=<%= rndNum %>"></script>