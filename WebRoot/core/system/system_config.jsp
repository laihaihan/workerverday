<%@page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.system.GlobalParameter" %>
<%@ page import="com.linewell.core.system.SystemConfig" %>
<%@ page import="com.linewell.core.system.SystemConfigManager" %>
<%@ page import="com.linewell.ucap.session.Session" %>
<%@ page import="java.io.File" %>
<%@ page import="java.io.FilenameFilter" %>
<% 	
	String fn = "update";
	Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String app_unid = ucapSession.getApp().getUnid();
	SystemConfig sysCfg = new SystemConfigManager().doFindBeanByKey(app_unid);
	if(null == sysCfg){
		fn = "add";
		sysCfg = new SystemConfig();
		sysCfg.setApp_unid(app_unid);
	}
	String logo_path = GlobalParameter.CORE_FILEPATH + "logo/";
	File[] files = this.getLogoImages(request.getRealPath(logo_path));
	
	request.setAttribute("sysCfg",sysCfg);
	request.setAttribute("path",request.getContextPath());
%>
<HTML>
<HEAD>
	<TITLE>系统基础配置</TITLE>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<META http-equiv=Content-Type content="text/html; charset=utf-8">
	
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css"/>
	<link rel="stylesheet" type="text/css" href="${path}/core/js/validation/style.css" />
	<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css"/>
	<link type="text/css" rel="stylesheet" href="${path}/core/js/jquery-ui/themes/cupertino/jquery.ui.all.css"/>
	
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.core.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery-ui/ui/jquery.ui.tabs.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js" charset="gbk"></script>
	<style type="text/css">
		img {
			cursor:hand;
		}
		fieldset {
			width:90%;
			padding:5px;
			border-color:#d9fafd;
		}
		fieldset legend {
			font-weight:bolder;
			padding-left:10px;
			padding-right:10px;
		}
	</style>

	<script type="text/javascript">
		$(function(){
			$(".uploadify").uploadify(uploadifyConfig);
			$("#logo_img").bind("change",doChangeLogo);
			$("#uploadLogo").bind("click",doUploadLogo);
			$("#btnConfirm").bind("click",doConfirm);
			$("#btnClose").bind("click",doClose);
		});
		
		function doChangeLogo(){
			var logo_img = $("#logo_img").val();
			$("#img_preview").attr("src","${path}" + logo_img);
		}
		
		function doUploadLogo(){
			$("#uploadLogo_tr").show();
		}
		
		function doConfirm(){
			if($("#logo_img").val() == ""){
				top.popup.alert("信息提示","请选择logo图片","erro",1500);
				return;
			}
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					if(data.result){
						top.lwin.alert("信息提示","操作成功","info",1500);
					}else{
						top.lwin.alert("信息提示","操作失败","error",1500);
					}
				}
			});
		}
		
		function doClose(){
			top.tabs.close();
		}
		
		var uploadifyConfig = {   
			'uploader'			: '${path}/core/js/uploadify/uploadify.swf',   
          	'script'			: '${path}/SystemConfig.action?fn=uploadLogo',  
          	'buttonImg'	    	: '${path}/core/js/uploadify/theme/default/fill-090.png',
          	'cancelImg'     	: '${path}/core/js/uploadify/cancel.png',   
          	'height'        	: 16,
  		  	'width'         	: 16,
          	'auto'          	: true,   
          	'multi'         	: true,   
          	'fileDataName'  	:'file',
          	'fileExt'       	: '*.jpg;*.jpeg;*.gif;*.tif;*.bmp;*.png',
          	'fileDesc'      	: '支持格式：jpg,jpeg,gif,tif,bmp,png',
          	//'removeCompleted' 	: false,
          	onComplete:function(event, ID, fileObj, response, data){
	          	var json = $.parseJSON(response);
	          	if(json.result){
	          		top.popup.alert('操作提示','操作成功','info');
	          		location.reload();
	          	}else{
	          		top.popup.alert('操作提示','操作失败','error');
	          	}
          	}
      	};
	</script>
</HEAD>
<BODY style="background-color:#DEECFD">
	<form id="jspForm" name="jspForm" method="post" action="${path}/SystemConfig.action">
	<input type="hidden" name="fn" value="<%=fn %>">
	<input type="hidden" name="app_unid" value="${sysCfg.app_unid}">
	<table width="90%" class="form_table_ext" align="center" style="margin-top:10px;">
		<col width="15%" align="right">
		<col width="85%">
	   	<tr>
	   		<th>选择首页Logo图片：</th>
	   		<td>
	        	<select name="logo_img" id="logo_img">
	        		<option value="">== 请选择 ==</option>
	        		<%
	        			for(int i=0;i<files.length;i++){ 
	        				String logo_img = logo_path + files[i].getName();
	        				String selected = null != sysCfg && logo_img.equals(sysCfg.getLogo_img()) ? "selected" : "";
	        		%>
	        		<option value="<%=logo_img%>" <%=selected %>><%=files[i].getName()%></option>	
	        		<%} %>	
	        	</select>&nbsp;&nbsp;
	        	<input id="uploadLogo" type="button" value="上传新图片"/>
	   		</td>
	   	</tr>
	   	<tr id="uploadLogo_tr" style="display:none">
	   		<th>上传图片：</th>
	   		<td>
	       		<input type="text" name="filepath" id="filepath" value="" style="width:50%" readonly>
	       		<input id="uploadify" class="uploadify" type="file" name="file" style="display: none;"/>
	   		</td>
	   	</tr>
	   	<tr>
	   		<th>图片预览：</th>
	   		<td>
	   			<img src='${path}${sysCfg.logo_img}' id="img_preview"/>
	   		</td>
	   	</tr>
	   	<tr style="display: none">
	   		<th>登陆页面：</th>
	   		<td>
	       		<input type="text" name="login_page" id="login_page" value="${sysCfg.login_page}" style="width:50%">
	   		</td>
	   	</tr>
	   	<tr style="display: none">
	   		<th>主    页：</th>
	   		<td>
	       		<input type="text" name="index_page" id="index_page" value="${sysCfg.index_page}" style="width:50%">
	   		</td>
	   	</tr>
	   	<tr>
	   		<th>首页左侧菜单样式：</th>
	   		<td>
	   			<input type="radio" name="left_menu_style" value="1" ${sysCfg.left_menu_style != "2" ? "checked" : ""}>树形菜单&nbsp;&nbsp;&nbsp;
	   			<input type="radio" name="left_menu_style" value="2" ${sysCfg.left_menu_style == "2" ? "checked" : ""}>抽屉菜单
	   		</td>
	   	</tr>
	   	<tr>
	   		<th>菜单图标样式：</th>
	   		<td>
	   			<input type="radio" name="menu_icon_style" value="1" ${sysCfg.menu_icon_style != "2" ? "checked" : ""}>小图标&nbsp;&nbsp;&nbsp;
	   			<input type="radio" name="menu_icon_style" value="2" ${sysCfg.menu_icon_style == "2" ? "checked" : ""}>大图标
	   		</td>
	   	</tr>
	</table>
	<center style="margin-top:20px">
		<img src='${path}/core/themes/default/images/other/btn_ok.gif' id="btnConfirm"/>&nbsp;&nbsp;
		<img src='${path}/core/themes/default/images/other/btn_close.gif' id="btnClose"/>
	</center>
	</form>
</BODY>
</HTML>

	
<%!
	private File[] getLogoImages(String filePath){
		File[] files = null;
		File fileDir = new File(filePath);
		if(fileDir.exists() && fileDir.isDirectory()){
			files = fileDir.listFiles(new FilenameFilter() {
				public boolean accept(File dir, String name) {
					boolean flag = name.endsWith(".jpg") || name.endsWith(".jpeg");
					flag = flag || name.endsWith(".gif") || name.endsWith(".tif");
					flag = flag || name.endsWith(".png") || name.endsWith(".bmp");
					flag = flag && new File(dir, name).isFile();
	                return flag;
	            }
	        });
		}
		return files;
	}
%>