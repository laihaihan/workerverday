<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.ucap.platform.cache.composeform.ComposeForm"%>
<%@page import="com.linewell.ucap.admin.module.ComposeFormWrapper"%>
<%@include file="../include/session.jsp"%>
<%
/**
 * 根据模块unid，获取组合表单列表
 * @author by cguangcong@linewell.com
 * @since 2011-12-22
 */
//获取业务模块标识 
String moduleUnid = request.getParameter("moduleUnid");
String appUnid = request.getParameter("appUnid");

//如果为空，则为非法访问，直接退出不做处理
if (StringUtils.isEmpty(appUnid)
        || StringUtils.isEmpty(moduleUnid)){
    return;
}	
List<ComposeForm> composeFormList = ComposeFormWrapper.getComposeFormByModuleUnid(moduleUnid);
int cFormCount = (null == composeFormList ? 0 : composeFormList.size());
%>  
<!DOCTYPE html>
<html>
  <head> 
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>组合表单配置</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    <style type="text/css"> </style>
	<link href="../module/style/stytle.css" rel="stylesheet" type="text/css" />
	<link href="../style/tip.css" rel="stylesheet" type="text/css" />
	<link href="../style/uploadPop.css" rel="stylesheet" type="text/css" />	
	<script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
	<script language="javascript"  src="<%= systemPath %>default/js/jquery.cookie.js"></script>
	<script language="javascript" src="../default/js/linewell/linewell.core.js"></script>
	<script language="javascript" src="../js/common.js"></script>
	<script language="javascript"  src="../js/linewell.ucap.admin.settings.js"></script>
	<script language="javascript" src="../js/pageStep.js"></script>
	<script language="javascript" src="../js/jquery.tipHelp.js"></script>
	<%@include file="../include/platformresources.jsp"%>
  </head>
 <script type="text/javascript">
 /**
  * 刷新当前页面
  */
function refreshPage(){
	window.location.href = window.location.href;//刷新页面
}


//模拟试图的刷新，本页面之需要用到刷新本页   
var view={
   refresh:function(){
   	   refreshPage();
   },
   setGridHeight:function(){
   
   }
};
//模拟common.js中的参数
ucapCommonFun.ucapCurOpenType = 0;  
ucapCommonFun.autoMenuHeight = function(){};

//定义作为父窗口的事件集
var parentEvents = {}; 

//数据库视图的个数
var cFormCount = <%= cFormCount%>;

//定义jQuery为$开始
(function($){

var formUnid = "01BD18122E0D3EC0CA9C165DC35A1D89";

var appUnid = "<%=appUnid%>";

//取消、删除按钮图标
var cancleIcon = "../module/style/images/common/cancel.png";

//取消图标的jQuery模板
var $cancleIconTemplate = $("<img src='" + cancleIcon + "'/>")    
    .addClass("cancleIcon");


/**
 * 根据unid打开组合表单，当unid为空时为新建
 */

function openFormPage(unid){
	var formUrl = "<%= systemPath %>sys/jsp/document.jsp?unid="+unid+"&type=03&formId="
   					+ formUnid + "&viewMId=850B164D6BB5888BCF8782D278593672&openST=";											
   		formUrl+="&belongToAppId="+appUnid+"&belongToModuleId=<%=moduleUnid%>";
   	window.open(formUrl);  	
}
/**
 * 根据unid，删除组合表单
 */
function deleteForm(unid){
	//获取组合表单的链接
    var actionUrl = appPath + "BaseAction.action?type=getForm&act=delete";
    var postData ="{\"formUnid\": '03D661949DBF98FC18EF4DF59F2044C3',\"formType\":\"01\",\"docUnid\":'"+unid+"',\"strResult\":\"\",\"isFlowItem\":false,\"belongToAppId\":'"+appUnid+"'}";  
	// 提交到后台
    $.ajax({
       type : "post",
       url : actionUrl,
       data : postData,
       dataType : "json",
       contentType : "application/json",
       async : false,
       success : function(data, textStatus) {       	            
          window.location.reload();
       },
       error : function() {                                           
           alert("加载组合表单数据失败！");
       },
       statusCode : {// 处理错误状态
           404 : function() {
               alert("加载组合表单数据失败！");
           }
       }
   });// end ajax
}
   
//页面加载完成的代码   
$(function(){

	/**
	 * 关闭上传的弹窗口
	 */    
	function closeUploadPop(){		
		$("#uploadPop").hide();
		window.location.href = window.location.href;
	}    
	
	//定义关闭事件
	parentEvents.close = closeUploadPop;
	
	/**
	 * 关闭弹出窗口
	 */
	$("#viewSelectCloseBtn").click(function(){
		closeUploadPop();
	});
	
	/**
	 * 根据unid打开组合表单
	 */
	$(".formCfgBtn").click(function(){
		var $this = $(this);
		var unid = $this.attr("unid");
		openFormPage(unid);		
	});	
	
	/**
	 * 新建组合表单
	 */
	$(".formAdd").click(function(){
		openFormPage("");
	});
	
	
	/**
	 * 改变状态
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
	               if(confirm("此操作无法恢复！确定要删除选择的组合表单吗？")){
	                    deleteForm(unid);
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

  </script>
  <body>
  <div>
    <!-- 主区域 begin-->
	<div class="areaViewFormMain">
	<!-- 工具栏区域 -->
		<div class="formCfgToolBar">
			<h1>组合表单列表</h1>
			<h2>共</h2>
			<h3><%= cFormCount%></h3>
			<h2>个组合表单</h2>
			<input class="toolBarAdd formAdd" name="cFormAdd" id="cFormAdd"type="button" value="添加" title="添加组合表单" />
			<input class="toolBarMg formManage" name="cFormManager" id="cFormManager" type="button" value="管理" title="已有组合表单删除管理"/>
			<input class="toolBarRefresh" name="btnRefresh" id="btnRefresh" type="button" value="刷新" onclick="refreshPage()" title="刷新页面"/>
		</div>
	
		<!--按钮列表区域 begin-->
		<div class="formCfgBtns">
			<!--按钮项 -->
			<%
		   		if(null != composeFormList){
					for(ComposeForm cForm:composeFormList){
			%>
		   	<div class="formCfgBtn" unid="<%=cForm.getUnid()%>">
				<img alt="" src="../module/style/images/module/designIcon_5.png" class="btnImg"/>
				<a><%=cForm.getName()%></a>
			</div>	    
			<%}}%>		
		</div>
		<!--组合表单列表区域 end-->
	</div>
	<!-- 主区域 end-->
<div id="tipDiv">
　　通过添加、管理，对此模块下的组合表单进行增加、删除。<br/>
<b>工具栏按钮功能说明：</b>
<ul>
	<li><b>添加：</b>单击进入按钮基本信息配置的页面</li>
	<li><b>管理：</b>进入按钮删除的状态</li>
</ul>
</div>
</div>
</body>
</html>
