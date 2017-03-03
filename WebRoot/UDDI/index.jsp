<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="org.apache.commons.lang.StringEscapeUtils" %>
<%@page import="com.linewell.ucapx.redevelop.uddi.util.APIType"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.util.UDDIConfigUtils"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.app.UDDIConfig"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.main.UDDIMain"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.main.UDDIComponent"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.component.Component"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.component.UDDIClass"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.component.Function"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.component.Param"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.component.Example"%>
<%@page import="com.linewell.ucap.util.monitor.Monitor"%>
<%
boolean isDebug = Monitor.getInstance().isDebug();
//在调试模式下才设置
//if(true == isDebug){
//  UDDIConfig.resetConfig();
//}

Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME); 

//配置的Bean对象
UDDIMain configBean = UDDIConfig.getConfig();
//包
String p = request.getParameter("p");
//类型
String tp = request.getParameter("tp");
//类名
String cl = request.getParameter("cl");
//函数名称
String fn = request.getParameter("fn");
fn = StringEscapeUtils.escapeHtml(fn);

//当前的UDDI等级，默认为0
int uddiLevel = 0;
//包（模块）不为空
if(StringUtils.isNotEmpty(p)){
  uddiLevel = 1;
  //类型不为空
  if(StringUtils.isNotEmpty(tp)){
    uddiLevel = 2;
    //类不为空
    if(StringUtils.isNotEmpty(cl)){
	    uddiLevel = 3;
	    //函数不为空
	    if(StringUtils.isNotEmpty(fn)){
	      uddiLevel = 4;
	    }
	  }
  }
}

//UDDI所属的组件集
List<UDDIComponent> uDDIComponentlist = configBean.getComponents();
//当前选中的组件
Component currentComponent = null;
//当前类型
APIType currentType = null;
//当前类
UDDIClass currentClass = null;
//当前类
Function currentFn = null;

//当前选择了包及以上级别
if(uddiLevel > 0){
  currentComponent = UDDIConfigUtils.getComponent(configBean, p);
  if(null == currentComponent) return;
}

//当前选择了
if(uddiLevel > 1){
    currentType = UDDIConfigUtils.getAPIType(tp);
    if(null == currentType) return;
}

//如果是选择了类
if(uddiLevel > 2){
  currentClass = UDDIConfigUtils.getUDDIClass(configBean, p, currentType, cl);
  if(null == currentClass) return;
}
//如果选择了某个方法
if(uddiLevel > 3){
  currentFn = UDDIConfigUtils.getFunction(configBean, p, currentType, cl, fn);
  if(null == currentFn) return;
}
%>
<%@include file="include/common.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>UDDI中心</title>
<link rel="stylesheet" type="text/css" href="css/index.css"/>
<script type="text/javascript" src="js/jquery-1.5.min.js"></script>
<script type="text/javascript">
<!--
/**
 * 关闭、展开Section区域
 * @param linkId 链接的名称
 * @param oText  打开时链接显示的文字
 * @param cText  关闭时链接显示的文字
 */
function coSection(linkId, oText, cText){
  var $linkObj = $("#" + linkId);
  var $sectionObj = $("#" + linkId + "_c");
  var imgClassName = "cl_CollapsibleArea_expanding LW_CollapsibleArea_Img";
  if($linkObj.attr("title") === cText){
    $linkObj.attr("title", oText);
    $linkObj.find("img").removeClass();
    $linkObj.find("img").addClass("cl_CollapsibleArea_collapsing LW_CollapsibleArea_Img");
    $sectionObj.slideUp();
  }else{
    $linkObj.attr("title", cText);
    $linkObj.find("img").removeClass();    
    $linkObj.find("img").addClass("cl_CollapsibleArea_expanding LW_CollapsibleArea_Img");
    $sectionObj.slideDown();
  }
}

/**
 * 设置状态
 * @param obj    触发事件的对象
 * @param params 参数对象
 */
function setStatus(obj, params){
  var actionUrl = "BaseAction.action";
  var $options = {
    packageName : "",//包名称
    type        : "",//类型
    className   : "",//类名称
    fnName      : "" //
  };
  //如果传入的参数不为空，合并参数
  if(params){
    jQuery.extend($options, params);
  }
  var $obj = jQuery(obj);
  var statusText = $obj.text();
  var status = "0";
  if(statusText.indexOf("禁用") > -1){
    statusText = statusText.replace("禁用", "启用");
    status = "0";
  }else{
    statusText = statusText.replace("启用", "禁用");
    status = "1";
  }
  //与Action的交互
  jQuery.ajax({
    type    : "POST",
    url     : actionUrl,
    data    : "type=uddi" +
              "&p="       + $options.packageName +
              "&tp="     + $options.type +
              "&cl="     + $options.className + 
              "&fnName=" + $options.fnName +
              "&status=" + status,
    async   : true,
    success : function(json){
      if(json){
        //alert(json.exceptionMsg);
        if(json.exceptionMsg){
            alert("您没有管理UDDI的权限！");
        }
        return;
      }
      $obj.text(statusText);      
    }            
  });
}
//将div里面的代码copy到剪切板上
function copyCode(id){
	$this=$("#"+id);
	window.clipboardData.setData("Text",$this.text());
	alert("复制成功！");
}
//-->
</script>
</head>
<body>
<%@include file="include/header.jsp"%>
<!-- contentPlaceHolder begin -->
<div class="contentPlaceHolder">

  <%@include file="include/navigation.jsp"%>
	
	<!-- content begin -->
	<div class="content">
	 <!-- topicContainer begin -->
	 <div class="topicContainer">
		 <%
		 //通过级别加载内容
		 switch(uddiLevel){
		 case 1:		 
		 case 2://api类型的页面
		 %>
     <%@include file="include/apiTypesPage.jsp"%>
     <%
		  break;
		 case 3://方法集得页面
		 %>
     <%@include file="include/functionsPage.jsp"%>
     <%
		  break;
		 case 4://方法的页面
		 %>
     <%@include file="include/functionPage.jsp"%>
     <%
		  break;
		 default://默认为整个UDDI中心加载组件的页面
		 %>
		 <%@include file="include/componentsPage.jsp"%>
		 <%
		  break;
		 }
		 %>
	 </div>
	 <!-- topicContainer end -->
	</div>
	<!-- content end -->
	
</div>
<!-- contentPlaceHolder end -->

<%@include file="include/footer.jsp"%>

</body>
</html>
