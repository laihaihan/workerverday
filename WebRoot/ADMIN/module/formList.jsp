<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucap.platform.cache.form.Form"%>
<%@page import="com.linewell.ucap.admin.module.FormWrapper"%>
<%@page import="java.util.List"%>
<%
/**
 * 根据模块unid，获取表单列表
 * @author by cguangcong@linewell.com
 * @since 2011-12-01
 */
//获取业务模块标识
String moduleUnid = request.getParameter("moduleUnid");
String appUnid = request.getParameter("appUnid");

//如果为空，则为非法访问，直接退出不做处理
if (StringUtils.isEmpty(appUnid)
        || StringUtils.isEmpty(moduleUnid)){
    return;
}

String isFlow = request.getParameter("isFlow");
//String sSystemPath = request.getContextPath()+"/"; 		
List<Form> formList = FormWrapper.getFormByModuleUnid(moduleUnid);
int formCount = (null == formList ? 0 : formList.size());
%>  
<!DOCTYPE html>
<html>
  <head> 
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>数据表配置</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    <style type="text/css"> </style>
	<link href="style/stytle.css" rel="stylesheet" type="text/css" />
	<link href="../style/tip.css" rel="stylesheet" type="text/css" />
	<link href="../style/uploadPop.css" rel="stylesheet" type="text/css" />	
	<script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
	<script language="javascript"  src="<%=systemPath%>default/js/jquery.cookie.js"></script>
	<script language="javascript" src="<%= systemPath %>default/js/linewell/linewell.core.js"></script>
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

//表单的个数
var formCount = <%= formCount%>;

//定义jQuery为$开始
(function($){

var formUnid ="5364AE70753E46850068000044001738";// "957C01185E5C90A3F8B9F4CA67553673";

var appUnid = "<%=appUnid%>";

//取消、删除按钮图标
var cancleIcon = "style/images/common/cancel.png";

//取消图标的jQuery模板
var $cancleIconTemplate = $("<img src='" + cancleIcon + "'/>")    
    .addClass("cancleIcon");


/**
 * 根据unid打开打开表单，当unid为空时为新建
 */

function openFormPage(unid){
	var formUrl = "<%=systemPath%>sys/jsp/document.jsp?unid="+unid+"&type=03&formId="
   					+ formUnid + "&viewMId=F2E2C23B59BB8F7B8117B35D09820AFF&openST=";											
   		formUrl+="&belongToAppId="+appUnid+"&belongToModuleId=<%=moduleUnid%>";
   	window.open(formUrl);  	
}
/**
 * 根据unid，删除表单
 */
function deleteForm(unid){
	//获取表单数据的链接
    var actionUrl = appPath + "BaseAction.action?type=getForm&act=delete";
    var postData ="{\"formUnid\": 'CE05578DCA8A43AC0046221C00006801',\"formType\":\"01\",\"docUnid\":'"+unid+"',\"strResult\":\"\",\"isFlowItem\":false,\"belongToAppId\":'"+appUnid+"'}";  
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
           alert("加载表单数据失败！");
       },
       statusCode : {// 处理错误状态
           404 : function() {
               alert("加载表单数据失败！");
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
	 * 根据unid打开表单
	 */
	$(".formCfgBtn").click(function(){
		var $this = $(this);
		var unid = $this.attr("unid");
		openFormPage(unid);		
	});	
	
	/**
	 * 新建表单
	 */
	$(".formAdd").click(function(){
		openFormPage("");
	});
	
	
	/**
	 * 改变表单状态
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
	               if(confirm("此操作无法恢复！确定要删除选择的表单吗？")){
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

   
//定义上一步的链接
pageStep.preUrl = "moduleInfo.jsp?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>";

//定义下一步的链接
pageStep.nextUrl = "configBuildFrame.jsp?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>&isFlow=<%=isFlow%>";

/**
 * 处理下一步的逻辑
 */
pageStep.nextAction = function(){
	if(formCount > 0){
	  //保存
      this.canGoNext = true;
    }else{
      alert("请先新建至少一个表单！");
    }
}

/**
 * 处理上一步的逻辑
 */
pageStep.preAction = function(){
    this.canGoPre = true;   
}


/*
 * 数据表配置生成
 */
function formCfg(){	
    //2011-12-09 add by xhuatang@linewell.com 添加顶部窗口的事件，确保数据表配置生成的回调
    if(!window.top.parentEvent){
         window.top.parentEvent = {};
    }
    window.top.parentEvent.refresh = refreshPage;
	window.top.ucapManagerTree.curBelongToModuleId = "<%=moduleUnid%>";
	ucapCommonFun.generateFormCfg();	
}

/**
 * 打开数据表导入界面
 */
function formImport(){
	//2011-12-08 modify by xhuatang@linewell.com 添加模块的unid
	var url="../uploadJsp/uploadExcel.jsp?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>";	
	    //定义iframe对象 
    var iframeObj = document.getElementById("popFrame").contentWindow;
        
    iframeObj.location.href = url+ "&" + Math.random();
     
    jQuery("#uploadPop").show();
}

  </script>
  <body>
  <div>
    <!-- 主区域 begin-->
	<div class="areaViewFormMain">
	<!-- 工具栏区域 -->
		<div class="formCfgToolBar">
			<h1>数据表配置</h1>
			<h2>共</h2>
			<h3><%= formCount%></h3>
			<h2>个表单</h2>
			<input class="toolBarAdd formAdd" name="btnFormAdd" id="btnFormAdd"type="button" value="添加" title="添加基本数据表"/>
			<input class="toolBarGenerate" name="btnFormCfg" id="btnFormCfg" type="button" value="生成" onclick="formCfg()" title="数据库物理表配置生成" />
			<input class="toolBarImport" name="btnFormImport" id="btnFormImport" type="button" value="导入" onclick="formImport()" title="导入已有表结构（文件格式为Excel）" />
			<input class="toolBarMg formManage" name="btnFormManager" id="btnFormManager" type="button" value="管理" title="已有数据表删除管理" />
			<input class="toolBarRefresh" name="btnRefresh" id="btnRefresh" type="button" value="刷新" onclick="refreshPage()" title="刷新页面"/>
		</div>
	
		<!--表单列表区域 begin-->
		<div class="formCfgBtns">
			<!--表单项 -->
			<%
		   		if(null != formList){
					for(Form form:formList){	 
			%>
		   	<div class="formCfgBtn" unid="<%=form.getUnid()%>">
				<img alt="" src="style/images/module/designIcon_3.png" class="btnImg"/>
				<a><%=form.getNameCn()%></a>
			</div>	    
			<%}}%>		
		</div>
		<!--表单列表区域 end-->
	</div>
	<!-- 主区域 end-->
<div id="tipDiv">
　　通过添加、生成，对此模块下的表配置进行增加、删除，并通过"生成"按钮实现从物理表生成表配置，以及实现从Excel导入表配置的功能。<br/>
<b>工具栏按钮功能说明：</b>
<ul>
	<li><b>添加：</b>单击进入数据表基本信息配置的页面</li>
	<li><b>生成：</b>可以快速把数据库表转换为UCAP的表单配置</li>
	<li><b>导入：</b>从Excel中快速导入数据表配置的数据</li>
	<li><b>管理：</b>进入表删除的状态</li>
</ul>
</div>
<div id="uploadPop" class="uploadPop" style="display:none;">
        
        <!-- 标题 -->
        <div class="popTitle">导入数据表配置</div>
        
        <!-- 关闭按钮 -->
        <input class="popCloseBtn" name="divClose" type="button" id="viewSelectCloseBtn" />
        
        <!-- 内容 -->
        <div class="popContent">
	        <iframe	frameborder="0"  id="popFrame"></iframe>
        </div>
         
</div>        
  </body>
</html>
