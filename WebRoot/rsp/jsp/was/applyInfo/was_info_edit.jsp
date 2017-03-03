<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.linewell.rsp.baseresouse.was.info.WasInfo"%>
<%@page import="com.linewell.rsp.baseresouse.was.info.WasInfoManager"%>
<%@page import="com.linewell.core.util.UNIDGenerate"%>
<%@page import="com.linewell.rsp.baseresouse.was.attr.WasAttrManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.servicematerial.WasServiceMaterialManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.service.WasServiceManager"%>
<%@page import="com.linewell.rsp.baseresouse.was.service.WasService"%>

<%@ taglib prefix="s" uri="/struts-tags"%>
<% 
	String fn = "update";
	String unid = request.getParameter("unid");
	String serviceid = request.getParameter("serviceid");
	WasInfo wasInfo = new WasInfoManager().doFindBeanByKey(unid);
	
	WasServiceManager serviceManager = new WasServiceManager();
	WasService service = serviceManager.doFindBeanByKey(serviceid);
	if(null == wasInfo){
		fn = "add";
		wasInfo = new WasInfo();
		wasInfo.setUnid(new UNIDGenerate().getUnid());
	}else if(null == service){
		service = serviceManager.doFindBeanByKey(wasInfo.getServiceid());
	}
	
	List materialList = null;
  	if (service != null) {
  		List attrList = new WasAttrManager().doFindByPunid(unid);
  		WasServiceMaterialManager materialManager = new WasServiceMaterialManager();
   		if("add".equals(fn) && (null == attrList || attrList.isEmpty())){
			materialList = materialManager.doFindByServiceid(service.getUnid());
   		}else{
			materialList = materialManager.doFindByServiceid(service.getUnid(),unid);
   		}
	}
  	request.setAttribute("path",request.getContextPath());
	request.setAttribute("service",service);
	request.setAttribute("info",wasInfo);
  	request.setAttribute("materialList",materialList); 
%>
<html>
<head>
  	<TITLE>办件</TITLE>
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
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
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
	<div id="tabs" >
		<ul>
			<li><a href="#tabs-1">基本信息</a></li>
			
		</ul>
		<div id="tabs-1" style="padding:5px;">
			<%@ include file="was_info_edit_baseinfo.jsp"%>
		</div>
		<div id="tabs-2" style="padding:5px;">
		</div>
		<div id="tabs-3" style="padding:5px;">
		</div>
	</div>
</div>
</body>
<script type="text/javascript">
	$(function(){
		$('#tabs').tabs();
		$("#btnClose").bind("click",doClose);
		$("#btnSave").bind("click",doSave);
	})
	//保存表单信息
	function doSave(){
		if (validate.validate()){
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
	var validate = new Validation('jspForm', {
    	immediate: true,
	    validators: {
	      	projectname:[{'required':true},{'max-length': 100}],
	      	applyname:['required',{'max-length': 100}],
	      	address:['required',{'max-length': 100}],
	      	mobile:['required','mobilephone'],
	      	contactman:['required',{'max-length': 10}]
	    },
	    messages:{
	    	projectname:['请填写[申报名称]','不能超过100个字'],
	    	applyname:['请填写[申请人/单位]','不能超过100个字'],
	    	address:['请填写[联系地址]','不能超过100个字'],
	      	mobile:['请填写[手机号码]','[手机号码]格式不正确'],
	    	contactman:['请填写[联系人]','[联系人]不能超过10个字']
	    }
  	});	
	
	
	//关闭窗口
	function doClose(){
		top.lwin.close();
	}
</script>
</html>
