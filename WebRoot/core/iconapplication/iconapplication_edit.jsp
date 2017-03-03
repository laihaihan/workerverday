<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.iconapplication.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String viewid = request.getParameter("viewid");
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String appUnid = request.getParameter("APP_UNID");
	if(StrUtil.isNull(appUnid)){
		appUnid = ucapsession.getApp().getUnid();
	}
	IconApplicationBusiness business = new IconApplicationBusiness();
	
	IconApplication iconApplication = business.doFindBeanByKey(unid);
	if (null == iconApplication) {
		fn = "add";
		iconApplication = new IconApplication();
		iconApplication.setIcon_unid(new UNIDGenerate().getUnid());
		iconApplication.setApp_unid(appUnid);
		iconApplication.setView_unid(viewid);
	}
	
	request.setAttribute("iconApplication", iconApplication);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	${import_theme}
	${import_jquery}
	${import_validation}
	<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css"/>
	<script type="text/javascript" src="${path}/core/js/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js" charset="gbk"></script>
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/iconApplication.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="icon_unid" id="icon_unid" value="<%=iconApplication.getIcon_unid()%>">
		<input type="hidden" name="iconApplication[]app_unid" id="appunid" value="<%=iconApplication.getApp_unid()%>">
		<input type="hidden" name="iconApplication[]view_unid" id="view_unid" value="<%=iconApplication.getView_unid()%>">
		<table width="98%" align="center" class="form_table">
			<tr>
				<th width=100px align=right><font color='red'>*</font>图标名称</th>
			  	<td>
			    	<input  style='width:375px' type='text' name='iconApplication[]icon_class' id='iconClass' value='${iconApplication.icon_class}'/>
			  	</td>
			</tr>
			<tr>
		   		<th width=100px align=right><font color='red'>*</font>上传图标</th>
		   		<td>
		       		<input type="text" name="iconApplication[]icon_path" id="iconPath" value="${iconApplication.icon_path}" style="width:375px;" readonly>
		       		<input id="uploadify" class="uploadify" type="file" name="file" style="display: none;"/>
		   		</td>
		   	</tr>
		   	<tr>
		   		<th width=100px align=right>图标预览</th>
		   		<td>
		   			<img src='${path}${iconApplication.icon_path}' id="img_preview"/>
		   		</td>
		   	</tr>
		</table>
		</form>
	</div>
</div>
<script type="text/javascript">
	var uploadifyConfig = {   
		'uploader'			: '${path}/core/js/uploadify/uploadify.swf',   
        'script'			: '${path}/iconApplication.action',  
        'buttonImg'	    	: '${path}/core/js/uploadify/theme/default/fill-090.png',
        'cancelImg'     	: '${path}/core/js/uploadify/cancel.png',   
        'height'        	: 16,
  		'width'         	: 16,
        'auto'          	: true,   
        'multi'         	: false,   
        'fileDataName'  	:'file',
        'fileExt'       	: '*.jpg;*.jpeg;*.gif;*.tif;*.bmp;*.png',
        'fileDesc'      	: '支持格式：jpg,jpeg,gif,tif,bmp,png',
        'scriptData'		: {'fn':'uploadImg'},
        //'removeCompleted' 	: false,
        onComplete:function(event, ID, fileObj, response, data){
	        var json = $.parseJSON(response);
	        if(json.result){
	        	var iconPath = $("#iconPath").val();
	        	if(typeof(iconPath) != "undefined" && iconPath != null && iconPath != ""){
	        		delOldImg(iconPath);
	          	}
	          	$("#img_preview").attr("src", "${path}" + json.imgPath);
	          	$("#iconPath").val(json.imgPath);
	          }else{
	          	top.popup.alert('操作提示','操作失败','error');
	         }
         }
    };
	var isSuccess = false;//用于记录图标保存是否成功
	//绑定事件
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
		$(".uploadify").uploadify(uploadifyConfig);
	});
	
	/**
	 * 说明： 在上传图片成功之后删除旧图片
	 * 参数： imgPath 旧的图片路径
	 */
	function delOldImg(imgPath){
		$.ajax({
			url:'${path}/iconApplication.action',
			type:'post',
			dataType:'json',
			data:{
				imgPath:imgPath,
				fn:'delOldImg'
			},
			success:function(response){
			},
			error:function(){
				top.$.messager.alert("消息","原始图片删除失败！","error");
			}
		});
	}
	
	//保存表单信息
	function doSave(){
		if(validate.validate()){
			if(isRepeat()){
				$("#jspForm").ajaxSubmit({
					dataType:'json',
					error:function(){
						top.lwin.errorService();
					},
					success:function(data){
						if(data.result){
							top.lwin.alert('信息提示','操作成功','info',1500);
						}else{
							top.lwin.alert('信息提示','操作失败','error',1500);
						}
	        			isSuccess = data.result;
						top.lwin.close(true);
					}
				});
			}
		}
	}
	
	//表单验证
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	iconClass:'required',
	      	iconPath:'required'
	    },
	    messages:{
	    	iconClass:'请填写[图标名称]',
	    	iconPath:'请填写[上传图标]'
	    }
  	});	
  	
  	//关闭窗口
  	function doClose(){
		var oldImgPath = $("#iconPath").val();
		if(typeof(oldImgPath) != "undefined" && oldImgPath != null && oldImgPath != ""){
			if("add" == '<%=fn%>' && !isSuccess){
				delOldImg(oldImgPath);
			}
		}
		top.lwin.close();
	}
	
	/**
	 * 说明： 在点击最外层红色关闭按钮时，
	 *	    如果页面没有进行保存，
	 *	    那么删除已经上传的图片
	 */
	function lwinClose(){
		doClose();
	}
	
	/**
	 * 说明：验证是否图标名称已经存在
	 */
	function isRepeat(){
		var bool = true;
		if("add" == '<%=fn%>'){
			var iconClass = $('#iconClass').val();
			$.ajax({
				url:'${path}/iconApplication.action',
				type:'post',
				dataType:'json',
				async:false,
				data:{
					iconClass:iconClass,
					fn:'repeat'
				},
				success:function(response){
					if(!response.result){
						bool = false;
						top.lwin.alert('信息','图标名称已经存在，请重新输入！','info');
					}
				},
				error:function(){
					bool = false;
					top.$.messager.alert("消息","验证图标名称是否存在出错！","error");
				}
			});
		}
		return bool;
	}
</script> 
</body>
</html>