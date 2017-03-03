<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@page import="com.linewell.ucap.platform.authorized.view.View"%>
<%@page import="com.linewell.ucap.admin.module.ViewWrapper"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.ucap.util.UcapRequest"%>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%
/**
 * 根据模块unid，获取视图列表
 * @author by cguangcong@linewell.com
 * @since 2011-12-01
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
 
UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
	
List<View> viewList = ViewWrapper.getViewByModuleUnid(moduleUnid,ucapSession,ucapRequest);
%> 
<!DOCTYPE html >
<html>
  <head>  
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>视图配置</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    <style type="text/css"> </style>
	<link href="style/stytle.css" rel="stylesheet" type="text/css" />
	<link href="../style/tip.css" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
	<script language="javascript" src="<%= systemPath %>default/js/linewell/linewell.core.js"></script>
	<script language="javascript"  src="<%=systemPath%>default/js/jquery.cookie.js"></script>
	<script language="javascript" src="../js/common.js"></script>
	<script language="javascript"  src="../js/linewell.ucap.admin.settings.js"></script>
	<script language="javascript" src="../js/pageStep.js"></script>
	<script language="javascript" src="../js/jquery.tipHelp.js"></script>
	<script type="text/javascript">
//模拟view.refresh()
var view={
   refresh:function(){
   	  window.location.href = window.location.href;//刷新页面 
   },
   setGridHeight:function(){
   
   }
};

//模拟ucapCommonFun.ucapCurOpenType
var ucapCommonFun = {ucapCurOpenType : 0};   

//应用的UNID
var appUnid ="<%=appUnid%>";
//模块的UNID
var moduleUnid = "<%=moduleUnid%>";

//定义jQuery为$开始
(function($){


//默认的表单的UNID
var formUnid = "3BBD18122E0D3EC0CA9C165DC35A1D89";


//取消、删除按钮图标
var cancleIcon = "style/images/common/cancel.png";

//取消图标的jQuery模板
var $cancleIconTemplate = $("<img src='" + cancleIcon + "'/>")    
    .addClass("cancleIcon");
/**
 * 打开视图页面
 * unid 有值时为打开视图
 * unid 为空时，新建视图
 * @param unid 视图的unid
 */
function openViewPage(unid){
	var formUrl = "<%=systemPath%>sys/jsp/document.jsp?unid="+unid+"&type=03&formId="
   					+ formUnid +"&viewMId=45671C7E9F34B5426AC3932713DC76D6&openST=";									
   	if(!unid){			
   		formUrl+="&belongToAppId=<%=appUnid%>&belongToModuleId=<%=moduleUnid%>";
   	}
   	window.open(formUrl); 	 	
}

/**
 * 删除视图
 * @param unid 视图的UNID
 */
function deleteView(unid){
	//获取视图数据的链接
    var actionUrl = appPath + "BaseAction.action?act=delete&type=getForm";
    var json ="{\"formUnid\": '017042ADDC784156710DAAC0D8C7D84F',\"formType\":\"01\",\"docUnid\":'"+unid+"',\"strResult\":\"\",\"isFlowItem\":false,\"belongToAppId\":'"+appUnid+"'}";

	// 提交到后台
    $.ajax({
       type : "post",
       url : actionUrl,
       data : json,
       dataType : "json",
       contentType : "application/json",
       async : false,
       success : function(data, textStatus) {       	            
          window.location.reload();
       },
       error : function() {                                           
           alert("加载视图数据失败！");
       },
       statusCode : {// 处理错误状态
           404 : function() {
               alert("加载视图数据失败！");
           }
       }
   });// end ajax
}
   
//页面加载完成的代码   
$(function(){
	/**
	 * 根据unid打开视图
	 */
	$(".formCfgBtn").click(function(){
		var $this = $(this);
		var unid = $this.attr("unid");
		openViewPage(unid);		
	});	
	
	/**
	 * 新建视图
	 */
	$(".formAdd").click(function(){
		openViewPage("");
	});
	
	
	/**
	 * 改变视图状态
	 * @param isNormal 是否为正常状态
	 */
	function changeStatus(isNormal){    
	    if(!isNormal){       
	       $(".formCfgBtn").unbind("click");
	       $(".formCfgBtn").each(function(){
	           var $this = $(this);
	           var unid = $this.attr("unid");          
	           $cancleIcon = $cancleIconTemplate.clone();
	           $cancleIcon.click(function(){
	               if(confirm("此操作无法恢复！确定要删除选择的视图吗？")){
	                    deleteView(unid);
	               }
	           });
	           $cancleIcon.appendTo($this);
	       });       
	       $("#formManage").val("取消");
	    }else{
	       $(".formCfgBtn").click(function(){
	           openFormPage($(this).attr("unid"));
	       });
	       $(".formCfgBtn .cancleIcon").remove();
	       $("#formManage").val("管理");       
	    }
	}
	
	/**
	 * 管理按钮的事件
	 */
	$(".formManage").click(function(){ 
	    var $moduleManage = $(this); 
	    if("管理" === $moduleManage.val()){
	       changeStatus(false);
		   $moduleManage.val("取消");
		}else{
		   changeStatus(true);
		   $moduleManage.val("管理");
		}
	});
	$("#tipDiv").tipHelp();
});//页面加载完成的代码 end



})(jQuery);//定义jQuery为$ end
   				
   
//定义上一步的链接
pageStep.preUrl = "formUIDesigner.jsp?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>&isFlow=<%=isFlow%>";

if("<%= isFlow%>" === "1"){
	//定义下一步的链接
	pageStep.nextUrl = "visualflow.jsp?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>&showTree=1&isFlow=<%=isFlow%>";
}

/**
 * 处理下一步的逻辑
 */
pageStep.nextAction = function(){
   /*var flowUrl = appPath + "flow/flowDesigner/Main.html?" +
                    "appUnid=" + appUnid +
                    "&moduleUnid=" + moduleUnid +
                    "&isNew=0";
   window.open(flowUrl);*/
    //保存
   this.canGoNext = true;
   var isNewSys = window.parent.getParentUrlParameter("isNewSys");
   if("1" != "<%= isFlow%>"){  		 
   		if(isNewSys && "1"===isNewSys){
   			window.close();
   		}else{
   			var winParent = window.parent;
			if(winParent
	      		 && winParent.parentEvent){
	       		 winParent.parentEvent.showModuleView("<%=moduleUnid%>");
	       		 this.canGoNext = false;
	    	} 
   		}
   }
}

/**
 * 处理上一步的逻辑
 */
pageStep.preAction = function(){
   this.canGoPre = true;   
}
  </script>
  </head>
  <body>
  <div>
    <!-- 主区域 begin-->
	<div class="areaViewFormMain">
	<!-- 工具栏区域 -->
		<div class="formCfgToolBar">
			<h1>视图配置</h1>
			<h2>共</h2>
			<h3><%=null==viewList?0:viewList.size()%></h3>
			<h2>个视图</h2>
			<input class="toolBarAdd formAdd" name="btnViewAdd" type="button" value="添加" title="添加视图" />
			<input class="toolBarMg formManage" name="btnViewManager" type="button" value="管理" title="已有视图删除管理" />
		</div>
	
		<!--视图列表区域 begin-->
		<div class="formCfgBtns">
			<!--视图项 -->
			<%
				if(null != viewList){
		   			for(View view:viewList){
			%>
		   	<div class="formCfgBtn" unid="<%=view.getUnid()%>")">
			<img alt="" src="style/images/module/designIcon_1.png" class="btnImg"/>
			<a><%=view.getDisplayName()%></a>
			</div>	    
			<%}}%>		
		</div>
		<!--视图列表区域 end-->
	</div>
	<!-- 主区域 end-->
<div id="tipDiv">
　　根据表配置及业务模块配置信息生成相应的视图，亦可在此基础上通过添加按钮实现视图配置的增加，以及通过管理按钮实现视图配置的修改和删除。
<ul>
<li><b>添加视图:</b>通过单击工具栏上的“添加”按钮，可以进入视图添加的页面进行视图添加的配置；</li>
<li><b>修改视图:</b>通过单击视图的图标，可以进入视图编辑的页面进行视图需该的配置；</li>
<li><b>删除视图:</b>通过单击工具栏上的“管理”按钮，可以进入视图的管理状态，进行视图的删除操作。</li>
</ul>
</div>
  </body>
</html>
