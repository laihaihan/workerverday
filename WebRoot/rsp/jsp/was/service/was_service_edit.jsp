<%@ page language="java" pageEncoding="UTF-8" %>
<%@page import="java.util.List"%>
<%@page import="com.linewell.rsp.baseresouse.was.service.WasServiceManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.servicematerial.WasServiceMaterialManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.service.WasService"%>
<%@page import="com.linewell.rsp.baseresouse.was.servicenotice.WasServiceNoticeManager"%>
<%@page import="com.linewell.core.util.UNIDGenerate"%>
<%@page import="com.linewell.rsp.module.sitedept.RspSiteDept"%>
<%@page import="com.linewell.rsp.module.sitedept.RspSiteDeptManager"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String unid = request.getParameter("unid");
String fn = "update"; //操作标识
WasServiceManager serviceManager = new WasServiceManager();
WasService service = serviceManager.doFindBeanByKey(unid);

if(null == service){
	fn = "add";
	service = new WasService();
	service.setUnid(new UNIDGenerate().getUnid());
	service.setParentunid("0");
}
request.setAttribute("fn",fn);
request.setAttribute("path", request.getContextPath());
request.setAttribute("service", service);
%>
<html>
<head>
  	<TITLE>事项</TITLE>
  	<META http-equiv=Content-Type content="text/html; charset=utf-8">
  	<META http-equiv=pragma content=no-cache>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/default/easyui.css">
	<link type="text/css" rel="stylesheet" href="${path}/core/js/jquery-ui/themes/cupertino/jquery.ui.all.css"/>
	
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.core.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.tabs.js"></script>
	<style>
	<!--
	.p_table01{background:#aed0ea;width:98%;}
	.p_table01 tr th{background:#fcfcfc;padding:4px 0px;padding:5px;text-align:right;}
	.p_table01 tr td{background:#fff;padding-left:5px;color:#666666;}
	-->
	</style>
</head>
<body>
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif">保存</button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div style="width:99%;margin:0 auto;" >
		<%@include file="was_service_edit_baseinfo.jsp" %>
	</div>
</div>
</body>
<script type="text/javascript">
	$(function(){
		$("#btnClose").bind("click",doClose);
		$("#btnSave").bind("click",doSave);
	});
	//选择部门
	function selectDept(){
		var frameid=self.frameElement.getAttribute('id');
		var viewId='5F572FF55869D7776ED6380ABBD1F203'
		top.lwin.open("/rsp/jsp/was/service/select_site_dept.jsp?returnId=serviceids&frameid="+frameid+"&viewId="+viewId,"请选择部门",800,500);	
	}
	//关闭窗口
	function doClose(){
		top.lwin.close();
	}
	
	//保存表单信息
	function doSave(){
		if (validateForm()){
			jQuery("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(text){
					top.lwin.errorService();
				},
				success:function(data){
					if(data){
						jQuery('#fn').val('update');
						top.lwin.alert("信息提示","保存成功","info",1500,true);
					}else{
						top.lwin.alert("信息提示","保存失败","error");
					}
				}
			});
		}
	}
	
	
	//表单提交前的验证函数
	function validateForm() {
	    var px = document.getElementById("sortid").value;
	    var re = new RegExp("^-?\\d+$");
	    if (!re.test(px)) {
	        alert("请输入排序号，且必须是整数！");
	        document.getElementById("sortid").focus();
	        return false;
	    }
	
	    var px = document.getElementById("lawlimit").value;
	    var re = new RegExp("^\\d+$");
	    if (!re.test(px)) {
	        alert("请输入法定期限，且必须是数值！");
	        document.getElementById("lawlimit").focus();
	        return false;
	    }

	    var px = document.getElementById("promiseday").value;
	    var re = new RegExp("^\\d+$");
	    if (!re.test(px)) {
	        alert("请输入承诺期限，且必须是数值！");
	        return false;
	    }
	
	    var px = document.getElementById("contactphone").value;
	    var re = new RegExp("^[\\d]{11}|[0-9]{3,4}-[0-9]{7,8}|[0-9]{7,8}$");
	    if (!px == "" && !re.test(px)) {
	        alert("电话号码格式错误！");
	        document.getElementById("contactphone").focus();
	        return false;
	    }
	
	    var re = new RegExp("^\\s+$");
	    var servicename = document.all.servicename.value;
	    if (re.test(servicename) || servicename == "") {
	        document.getElementById("servicename").focus();
	        alert("事项名称不能为空!");
	        return false;
	    }
	    if (servicename.length > 200) {
	        alert("您的服务名称过长");
	        document.all.servicename.focus();
	        return false;
	    }
	    
	    var infoprojid = document.all.infoprojid.value;
	    if (re.test(infoprojid) || infoprojid == "") {
	        document.getElementById("infoprojid").focus();
	        alert("审批事项编码不能为空!");
	        return false;
	    }
	   	if (document.all.addtype.selectedIndex == 0) {
	        alert('请选择事项类别!');
	        return false;
	    }
	   	if (document.all.servicetype.selectedIndex == 0) {
	        alert('请选择办件类型!');
	        return false;
	    }
	    var px = document.getElementById("deptunid").value;
	    if(px==""){
	    	alert("请选择所属部门");
	    	return false;
	    }
	    
	    
	    return true;
	}
</script>
</html>
