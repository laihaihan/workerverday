<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.core.file.AppFileManager"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.file.AppFile"%>
<%@page import="com.linewell.core.appmaterial.AppMaterialBusiness"%>
<%@page import="com.linewell.core.appmaterial.AppMaterial"%>
<%@page import="com.linewell.core.appattr.AppAttr"%>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String buildermoduleunid = "0C2361B820CE6B084D8E8E175551DF9B";//request.getParameter("buildermoduleunid");
	
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
	<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js" charset="gbk"></script>
	<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css"/>
</head>
<body>	
<div id="form_content">
	<fieldset>
    	<legend><font style="font-weight:bold;font-size:18;">附件资料</font></legend>
    	
		<table width="98%" align="center" class="form_table">
		<%
		       		AppMaterialBusiness appMaterialBusiness = new AppMaterialBusiness();
		       		Object[] objs = new Object[1];
		       		objs[0] = buildermoduleunid;
		       	    List<AppMaterial> mList = appMaterialBusiness.doFindListByCondition(" punid=?",objs);
		       		for(AppMaterial appMaterial:mList){
		       			
		%>
		<tr>
		  <th width=100px align=right><font color='red'>*</font><%=appMaterial.getInfoname() %>：</th>
		  <td  colspan='3' align="right">
					<input type="hidden" name="filepath_<%=appMaterial.getUnid()%>" id="filepath_<%=appMaterial.getUnid()%>" value="" style="width:50%" readonly>
		       		<input id="uploadify_<%=appMaterial.getUnid()%>" class="uploadify" type="file" name="file_<%=appMaterial.getUnid()%>"/>
		  </td>
		</tr>
		<%
		  }
		%>
		</table>    	
    	
	</fieldset>
</div>
<script type="text/javascript">
	//绑定事件
	$(function(){
		 <%
  		for(AppMaterial appMaterial:mList){
  		%>
			$("#uploadify_<%=appMaterial.getUnid()%>").uploadify(uploadifyConfig<%=appMaterial.getUnid()%>); 
	  	<%	
	  	}
	  	%>
	});
	
  	<%
  	for(AppMaterial appMaterial:mList){
  		%>
  		var uploadifyConfig<%=appMaterial.getUnid()%> = {
			'uploader'			: '${path}/core/js/uploadify/uploadify.swf',
       		'script'         	: 'AppFile.action?belongTo=22222222222222222222222222&materialunid=<%=appMaterial.getUnid()%>',
         	'buttonImg'	    	: '${path}/core/js/uploadify/theme/default/fill-090.png',
         	'cancelImg'     	: '${path}/core/js/uploadify/cancel.png',
         	'height'        	: 26,
 		  	'width'         	: 26,
         	'auto'          	: true,   
         	'multi'         	: true,   
         	'fileDataName'  	:'file',
         	'scriptdata'        :{userNam1e:22,userName:11111111},//传ids
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
  		<%	
  	}
  	%>
 	   
     	
     	
     	
     	
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