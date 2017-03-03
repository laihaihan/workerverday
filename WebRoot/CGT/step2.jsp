<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.manager.Managers"%>
<%@page import="com.linewell.ucapx.businessmodule.BusinessModuleApi"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="com.linewell.ucapx.app.AppApi"%>
<%@page import="com.linewell.ucap.util.EnvironmentUtil"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="java.io.File"%>

<%@include file="include/common.jsp"%>
<%
   
   String packageName = request.getParameter("package");
   String webRoot = request.getParameter("webRoot");
   String srcFolder = request.getParameter("sourceFolder");
   //应用的UNID
   String appUnid = request.getParameter("appUnid");
   if(null==moduleId)moduleId = "";
   if(null==formIds)formIds = "";
   String redirect = request.getParameter("redirect");
   if(null==redirect)redirect = "";
   
   //获取模块对象
   BusinessModuleApi bm = new BusinessModuleApi();
   Managers managers = bm.getMoudle(moduleId);
	   
   String appPath = EnvironmentUtil.getInstance().getAppPath();
  
   if(StringUtils.isEmpty(srcFolder)){
	   File file = new File(appPath);
	   srcFolder = file.getParent()+File.separator+"src";
   }
   
   AppApi appApi = new AppApi();
   App app = appApi.getApp(managers.getBelongApp());
   
   if(StringUtils.isEmpty(packageName)){
	   packageName = "com.linewell."+app.getNameEn()+"."+managers.getNameEn();
   }
   
   if(StringUtils.isEmpty(webRoot)){
	   webRoot = appPath+app.getNameEn()+File.separator+managers.getNameEn();
   }
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta content="history" name="save" />
<title>第二步、代码生成配置信息 - 代码生成工具</title>

<link href="style/genCode.css" rel="stylesheet" type="text/css" />

<script type="text/javascript">
    var moduleEnNameFocus = function(){
        $("#moduleNameEn").focus();
    }
	function nextStep(){
		if ("<%=app.getNameEn()%>"==""){
			Ext.Msg.alert("警告！", "当前系统《<%=app.getName()%>》没有设置英文名称，请设置！", moduleEnNameFocus);
			return;
		}
		if ("<%=managers.getNameEn()%>"==""){
			Ext.Msg.alert("警告！", "当前模块《<%=managers.getName()%>》没有设置英文名称，请设置！", moduleEnNameFocus);
			return;
		} 
		document.getElementById("infoForm").submit();
	}
	/**
     * 上一步
     */
	function backStep(){
	    var moduleId = "<%=moduleId%>";
	    var formIds = "<%=formIds%>";
		this.location.href = "step1.jsp?moduleId="+moduleId+ "&appUnid=<%=appUnid%>";
		  
	}
	
/**
 * 显示英文名称错误
 * @param $obj 英文名称的对象
 */
function showNameEnError(){
    var $obj = $("#moduleNameEn");
    Ext.Msg.alert("提醒","模块的英文名称必须首字符为字母，其他为字母或者数字的组合，并不能超过20个字符！",function(){$obj.select();$obj.focus();});
}
	
	//保存应用模块英文名称
	function moduleSave(){
		var nameEn = $("#moduleNameEn").val();
		var validateResult = validateNameEn(nameEn);    
	    if(!nameEn || !validateResult){
	       showNameEnError();
	       return;
	    }
		
		var para = {type:"generate",action:"saveModule",nameEn:nameEn,moduleUnid:"<%=moduleId%>"};
		var requestConfig = {
			url:formRelation.baseAction,
			params:para,
			callback:function(options,success,response){
				if (success && response.responseText=="true"){
					Ext.Msg.alert("警告！", "保存模块英文名称成功！");
				} else {
					Ext.Msg.alert("警告！", "保存模块英文名称不成功！", moduleEnNameFocus);
				}
			}
		};
	 	Ext.Ajax.request(requestConfig);	 	
	}
	

jQuery(function(){
(function($){
    //
    $("#moduleNameEn").blur(function(){
        var validateResult = validateNameEn($(this).val());    
        if(!validateResult){
           showNameEnError();
           return;
        }
    });
    
})(jQuery);    
})    	
</script>
</head>

<body>

<!--底区域-->
<div class="area_bg_bottom "></div>

<!--主区域 begin-->
<div class="area_main_public">
	<!--标题-->
	<div class="area_title"><img src="style/images/title_2.gif" alt="" /></div>
	<!--下一步-->
	<a class="button_next" href="javascript:void(0)" onclick="nextStep();">
	</a>
	<!--上一步-->
	<a class="button_pre" href="javascript:void(0)" onclick="backStep();">
	</a>
	<!--内容区域 begin-->
	<div class="area_info_module">
	    <form name="infoForm" id="infoForm" action="step3.jsp" method="post">
	    	<input type="hidden" name="redirect" id="redirect" value="<%=redirect%>"/>
	    	<input type="hidden" name="moduleId" id="moduleId" value="<%=moduleId%>"/>
	    	<input type="hidden" name="appUnid" id="appUnid" value="<%=appUnid%>"/>
	    	<input type="hidden" name="formIds" id="formIds" value="<%=formIds%>"/>
			<!--模块信息 begin-->
			<div class="info_module">
				<div class="info_module_title">模块名称:</div >&nbsp;&nbsp;<%=managers.getName()%>
				<input name="moduleName" type="hidden" id="moduleName" value="<%=managers.getName()%>"/>
			</div>
			<div class="info_module_caption">&nbsp;</div>
			<div class="info_module">
				<div class="info_module_title">模块英文名称:</div >
				<% if (StringUtils.isEmpty(managers.getNameEn())) { %>
					<input name="moduleNameEn"  id="moduleNameEn"
					title="模块的英文名称必须首字符为字母，其他为字母或者数字的组合，并不能超过20个字符" 
					 value="<%=managers.getNameEn()%>" style="width:310px;"/>
					<button name="moduleBtn" onclick="moduleSave();return false;" >保存名称</button>
				<%}else{ %>
				    &nbsp;&nbsp;<%=managers.getNameEn()%>
				<%} %>
				
			</div>
			<div class="info_module_caption">&nbsp;</div>
			<div class="info_module">
				<div class="info_module_title">SRC文件路径:</div >
				<input name="sourceFolder" id="sourceFolder" value="<%=srcFolder%>" type="text" />
			</div>
			<div class="info_module_caption">&nbsp;</div>
			<div class="info_module">
				<div class="info_module_title">包名称:</div >
				<input name="package" id="package" value="<%=packageName%>" type="text"/>
			</div>
			<div class="info_module_caption">&nbsp;</div>
			<div class="info_module">
				<div class="info_module_title">WEBROOT模块路径:</div >
				<input name="webRoot" id="webRoot" value="<%=webRoot%>" type="text"/>
			</div>
		</form>
	</div>
	<!--内容区域 end-->
</div>
<!--主区域 end-->
</body>
</html>
