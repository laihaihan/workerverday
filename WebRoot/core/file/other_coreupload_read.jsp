<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.core.file.AppFileManager"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.file.AppFile"%>
<%@include file="/core/params.jsp"%>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String file_type = request.getParameter("file_type");
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String appUnid = ucapsession.getApp().getUnid();
	
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	${import_theme}
	${import_jquery}
	${import_validation}
	<script type="text/javascript" src="${path}/core/js/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js"></script>
	<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css"/>
</head>
<body>	
<div id="form_content">
	<fieldset style="width:99%">
		<legend>其他</legend>
		<table width="95%" border="0" align="center" cellpadding="3" cellspacing="2" class="form_table_ext">
			<tr>
				<td>
				
		       		<div style='margin:3px;'>
		       			<table width="95%" border="0" align="center" cellpadding="3" cellspacing="2" class="form_table_ext">
		       		<%
		       		AppFileManager  appFileManager = new AppFileManager(appUnid);
		       		List<AppFile> fileList = appFileManager.doFindListByCondition("file_belongto ='"+unid+"' and file_type='"+file_type+"'",null);;
		       		//List<AppFile> fileList = appFileManager.doFindByBelongto(unid);
		       		for(AppFile appFile:fileList){
		       		%>
		       			<tr>
		       			<td>
		       				<br><a href="javascript:downloadFile('<%=appFile.getFile_unid() %>')"><%=appFile.getFile_name() %></a>&nbsp;
							
		       			</td>
		       			</tr>
					<%
		       		}
		       		%>
							
		       			</table>
					</div>
				</td>
			</tr>
		</table>
	</fieldset>
</div>
<script type="text/javascript">
	//绑定事件
	$(function(){
		$(".uploadify").uploadify(uploadifyConfig); 
	});
  	
 	   var uploadifyConfig = {
		'uploader'				: '${path}/core/js/uploadify/uploadify.swf',   
       		'script'         	: 'AppFile.action',   
       		'scriptData'		:{'belongTo':'<%=unid%>','file_type':'<%=file_type%>'},
         	'buttonImg'	    	: '${path}/core/js/uploadify/theme/default/fill-090.png',
         	'cancelImg'     	: '${path}/core/js/uploadify/cancel.png',   
         	'height'        	: 16,
 		  	'width'         	: 16,
         	'auto'          	: true,   
         	'multi'         	: true,   
         	'fileDataName'  	:'file',
         	'fileExt'       	: '*.jpg;*.jpeg;*.gif;*.tif;*.bmp;*.png',
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
     	
     	
     	
     	
	//删除文件
	function delFile(unidin){
		if(confirm('该操作不可恢复,您确定删除该项吗?')){
			$.ajax({
				url:'${path}/AppFile.action',
				type:'post',
				dataType:'json',
				data:{
					unid:unidin,
					fn:'del'
				},
				success:function(response){
					$('#file_'+unidin).parent().remove();
				}
			});
		}
	}
	
	//文件下载
	function downloadFile(unid){
		location.href = "${path}/core/file/file_download.jsp?unid="+unid;
	}
</script> 
</body>
</html>