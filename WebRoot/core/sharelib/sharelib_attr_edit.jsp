<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.sharelib.user.ShareLibUser" %>
<%@page import="com.linewell.core.sharelib.user.ShareLibUserManager" %>
<%@page import="com.linewell.core.sharelib.attr.ShareLibAttr" %>
<%@page import="com.linewell.core.sharelib.attr.ShareLibAttrManager" %>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<% 
	String fn = "update";
	String unid = request.getParameter("unid");
	
	ShareLibUser shareLibUser = null;
	ShareLibUserManager userManager = new ShareLibUserManager();
	ShareLibAttr shareLibAttr = new ShareLibAttrManager().doFindBeanByKey(unid);
	if(null == shareLibAttr){
		fn = "add";
		String userunid = request.getParameter("userunid");
		shareLibUser = userManager.doFindBeanByKey(userunid);
		shareLibAttr = new ShareLibAttr();
		shareLibAttr.setUnid(new UNIDGenerate().getUnid());
		shareLibAttr.setBelongto(userunid);
	}else{
		shareLibUser = userManager.doFindBeanByKey(shareLibAttr.getBelongto());
	}
	
	request.setAttribute("path", request.getContextPath());
	request.setAttribute("shareLibUser", shareLibUser);
	request.setAttribute("shareLibAttr", shareLibAttr);
%>
<HTML>
<HEAD>
	<TITLE>共享材料信息</TITLE>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<META http-equiv=Content-Type content="text/html; charset=utf-8">
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css"/>
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/default/easyui.css"/>
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/icon.css"/>
	<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css"/>
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/datepicker/WdatePicker.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js" charset="gbk"></script>
	<script type="text/javascript">
		$(function(){
			$("#btnSave").bind("click",doSave);
			$("#btnClose").bind("click",doClose);
		});
		
		function doSave(){
			if(validate.validate()){
				$("#jspForm").ajaxSubmit({
					dataType:'json',
					error:function(){
						top.popup.errorService();
					},
					success:function(data){
						top.popup.alert('操作提示','操作成功','info');
						top.popup.close(true);
					}
				});
			}
		}
		
		function doClose(){
			top.popup.close(true);
		}
		
	   	jQuery(function(){
		 	$(".uploadify").uploadify({   
	          	'uploader'       : '${path}/core/js/uploadify/uploadify.swf',   
	          	'script'         : '${path}/AppFile.action?unid=${shareLibAttr.unid}',   
	          	'buttonImg'	     : '${path}/core/js/uploadify/theme/default/fill-090.png',
	          	'cancelImg'      : '${path}/core/js/uploadify/cancel.png',   
	          	'height'         : 16,
	  		  	'width'          : 16,
	          	'auto'           : true,   
	          	'multi'          : true,   
	          	'sizeLimit'      : 2048000, 
	          	'fileDataName'   :'file',
	          	//'fileDesc'       : '支持格式：doc,docx',
	          	//'removeCompleted' : false,
	          	'fileExt'         : '*.*;' ,
	          	onComplete:function(event, ID, fileObj, response, data){
		          	var json = $.parseJSON(response);
		          	if(json.success){
		          		$("#filepath").val(json.appFile.file_path);
		          		$("#filename").val(fileObj.name);
		          		
			          	var html = "<a href=\"javascript:downloadFile('"+json.unid+"')\">"+fileObj.name+"</a>";
			          	$(".form_table_ext").eq(0).find("img").next().remove();
			          	$(".form_table_ext").eq(0).find("img").parent().append(html);
		          	}
	          	},
	          	onError:function(event,ID,fileObj,errorObj){
		       		if(errorObj.type=='File Size'){
		       			alert("文件过大");
		       		}
	          	}
	      	});
		})
		
		//文件下载	
		function downloadFile(unid){
			location.href = "${path}/core/file/file_download.jsp?unid="+unid;
		}
	</script>
</HEAD>
<BODY text=#000000 bgColor=#ffffff >
	<div id="form_content">
		<div id="form_toolbar">
			<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 保存 </button>
			<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 关闭 </button>
		</div>
		<div class="easyui-tabs" id="tabs">
			<div id="tabs_1" title="基本信息" style="padding:5px;background: #DEECFD;">
				<%@ include file="sharelib_attr_baseinfo.jsp"%>
			</div>
			<div id="tabs_2" title="操作日志" style="padding:5px;background: #DEECFD;">
				<%@ include file="sharelib_attr_log.jsp"%>
			</div>
		</div>
	</div>
</BODY>
</HTML>	