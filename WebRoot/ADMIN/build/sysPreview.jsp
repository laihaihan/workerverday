<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%
/**
 * 系统预览
 * @author xhuatang@linewell.com
 * @since 2011-12-01
 */
//获取应用系统的unid
String appUnid = request.getParameter("appUnid");
String portalId=request.getParameter("portalId");
//如果为空，则为非法访问，直接退出不做处理
if(StringUtils.isEmpty(appUnid)
        || StringUtils.isEmpty(portalId)){
    return;
}
//是否是系统构建
String isNewSys = request.getParameter("isNewSys");
//App app=new App();
//AppManager am= new AppManager();
//app=am.doFinByUnid(appUnid);
//String json = JSONObject.fromObject(app).toString();
//如果为空，则为非法访问，直接退出不做处理
//if(StringUtils.isEmpty(appUnid)) return;
//SchemeManager sm = new SchemeManager();
//Scheme scheme = sm.getSchemeByAppId(appUnid,ucapSession);
//String schemeUnid = scheme.getUnid();
%>
<!DOCTYPE html>
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>应用建模平台</title>
<script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
<script language="javascript" src="<%= systemPath %>default/js/linewell/linewell.core.js"></script>
<script language="javascript" src="<%= systemPath %>default/js/linewell/linewell.utils.js"></script>
<script language="javascript" src="<%= systemPath %>default/js/jquery.json-2.2.min.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript" src="../js/pageStep.js"></script>
<%@include file="../include/platformresources.jsp"%>
<link href="../style/build.css" rel="stylesheet" type="text/css" />
<style type="text/css">
/*fix ie6 and ie7 bug*/
*html .previewBox,*+html .previewBox {   
   /*padding-bottom:55px;   /* Height of the footer */
   height: expression(documentElement.clientHeight-34);
}
</style>
<script language="javascript">
Ext.onReady(function(){
	var iframeObj = document.getElementById("formFrame");
	iframeObj.src = "<%=systemPath%>sys/jsp/index.jsp?rand="+Math.random();
});


//打开脚本调试
//var JS_DEBUG = true;
var previewDiv = document.getElementById("preview");


//定义上一步的链接
pageStep.preUrl = "uiSetting.jsp?appUnid=<%= appUnid%>&portalId=<%=portalId%>&isNewSys=<%=isNewSys%>";

//定义下一步的链接
pageStep.nextUrl = "";

/**
 * 处理下一步的逻辑
 */
pageStep.nextAction = function(){
    this.canGoNext = false;
}

/**
 * 处理上一步的逻辑
 */
pageStep.preAction = function(){
    this.canGoPre = true;   
}
//在新窗口打开
function openNewWindow(){
	var url="<%=systemPath%>sys/jsp/index.jsp";
	window.open(url);
};
</script>
</head>
<body>
<div class="previewToolBar">
	<h1>预览窗口</h1>
	<input class="previewToolBarBtn" name="Button1" type="button" value="在新窗口中打开" onclick="openNewWindow()"/>
</div>

<!--预览区域 begin-->
<div  id="preview" class="previewBox">
   <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" id="formFrame"></iframe>
</div>
</body>
</html>