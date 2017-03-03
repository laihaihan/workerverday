<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="java.util.List"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@page import="com.linewell.ucap.admin.module.ModuleWrapper"%>
<%
/**
 * 流程配置页
 * @author 
 * @since 
 */
//获取业务模块标识
String moduleUnid = request.getParameter("moduleUnid");
String appUnid = request.getParameter("appUnid");
//如果是不存在系统与模块传值，直接默认为出错，退出不做处理
if(StringUtils.isEmpty(moduleUnid) 
        || StringUtils.isEmpty(appUnid)){
    return;
}

//是否有流程
String isFlow = request.getParameter("isFlow");
if(StringUtils.isEmpty(isFlow)){
    isFlow = "";
}

List<String> flowIdList = ModuleWrapper.getFlowIds(appUnid,moduleUnid);
String firstFlowUnid = "";
if(null!=flowIdList && !flowIdList.isEmpty()){
	firstFlowUnid = flowIdList.get(0);
}
%>  
<!DOCTYPE html>
<html>
<head>

<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>南威可视化流程定义</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
<script language="javascript"
            src="<%=systemPath%>default/js/jquery-1.6.1.min.js"></script>
<script language="javascript" src="../js/pageStep.js"></script>
<script language="javascript" src="../js/common.js"></script>
<link href="style/stytle.css" rel="stylesheet" type="text/css"/>
<script>
//定义上一步的链接
pageStep.preUrl = "viewList.jsp?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>&isFlow=<%=isFlow%>";

//定义下一步的链接
pageStep.nextUrl = "";

/**
 * 处理下一步的逻辑
 */
pageStep.nextAction = function(){
//保存
   this.canGoNext = true;
   var isNewSys = window.parent.getParentUrlParameter("isNewSys");
   if(isNewSys && "1"===isNewSys){
   		window.close();
   }else{
   		var winParent = window.parent;
   		if(winParent
           && winParent.parentEvent){
            winParent.parentEvent.showModuleView("<%=moduleUnid%>");
            this.canGoNext=false;
        }
   }
}


/**
 * 处理上一步的逻辑
 */
pageStep.preAction = function(){
   this.canGoPre = true;   
}

var appUnid = "<%=appUnid%>";
var moduleUnid = "<%=moduleUnid%>";
var flowUnid = "<%=firstFlowUnid%>";

$(function(){
    //定义iframe对象 
    var iframeObj = document.getElementById("formFrame").contentWindow;

	var iframeSrc = appPath + "flow/flowDesigner/Main.html?" +
	                "appUnid=" + appUnid +
	                "&moduleUnid=" + moduleUnid +
	                "&isNew=0&flowUnid="+flowUnid;
	iframeObj.location.href = iframeSrc;
});   
</script>
</head>
<body>

<iframe style="height:100%; width:100%;" frameborder="0" id="formFrame"></iframe>

</body>
</html>