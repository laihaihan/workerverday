<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.file.AppFileManager"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.linewell.core.file.AppFile"%>
<%@	page import="java.util.*"%>

<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String appUnid = ucapsession.getApp().getUnid();
	
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	${import_theme}
	${import_jquery}
	${import_easyui}
	${import_validation}
	<script type="text/javascript" src="${path}/core/js/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js"></script>
	<script type="text/javascript" src="${path}/www/lib/lw-ui/lwin_simple.js"></script>
	<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css"/>
</head>
<body style="background-color: white;margin:0px;">	
	<div id="form_content">
		<table width="100%" border="1" align="center" style="border-collapse: collapse;" class="form_table">
   		<%
   		AppFileManager  appFileManager = new AppFileManager(appUnid);
   		List<AppFile> fileList = appFileManager.doFindByBelongto(unid);
   		int index = 0;
   		List<AppFile> xlFileList = new ArrayList<AppFile>();
   		List<AppFile> jlFileList = new ArrayList<AppFile>();
   		List<AppFile> otherFileList = new ArrayList<AppFile>();
   		for(AppFile appFile:fileList){
   			if("xlzs".equals(appFile.getFile_type())){
   				xlFileList.add(appFile);
   			}
   			if("jl".equals(appFile.getFile_type())){
   				jlFileList.add(appFile);
   			}
   			if("other".equals(appFile.getFile_type())){
   				otherFileList.add(appFile);
   			}
   		}
   		if(xlFileList.size() == 0){
   		%>
  			<tr>
  				<th style='width: 100px;' align=right >
					<font color='red'>*</font>学历证书：
				</th>
				<td style='width: 80%'>
				</td>
				<td>
					<input type="hidden" name="filepath" id="filepath" value="" style="width:50%" readonly>
		   			<input id="uploadify_xl" class="uploadify" type="file" name="file"/>
				</td>
   			</tr>
   		<%
   		}else{
   		%>
			<tr>
  				<th style='width: 100px;' align=right rowspan='<%=xlFileList.size() %>'>
					<font color='red'>*</font>学历证书：
				</th>
		<%
			int i = 0;
			for(AppFile appFile:xlFileList){
				if(i > 0){
		%>
			<tr>
   		<%
				}
   		%>
	 			<td style='width: 80%'>
	  				<br><%=++index %>、<a href="javascript:downloadFile('<%=appFile.getFile_unid() %>')"><%=appFile.getFile_name() %></a>&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="javascript:delFile('<%=appFile.getFile_unid() %>')"  id ='file_<%=appFile.getFile_unid() %>'  class='btn'>删除</a>&nbsp;
	  			</td>
    	<%
				if(i > 0){
		%>
			</tr>
   		<%
				}
    			if(i == 0){
 		%>
 				<td rowspan='<%=xlFileList.size() %>'>
					<input type="hidden" name="filepath" id="filepath" value="" readonly>
		   			<input id="uploadify_xl" class="uploadify" type="file" name="file"/>
				</td>
 			</tr>
 	   	<%
    			}
   				i++;
   		%>
		<%
			}
			if( i == 0){
		%>
			</tr>
		<%
			}
   		}
   		index = 0;
		if(jlFileList.size() == 0){
   		%>
  			<tr>
  				<th style='width: 100px;' align=right >
					<font color='red'>*</font>简    历：
				</th>
				<td style='width: 80%'>
				</td>
				<td>
					<input type="hidden" name="filepath" id="filepath" value="" style="width:50%" readonly>
		   			<input id="uploadify_jl" class="uploadify" type="file" name="file"/>
				</td>
   			</tr>
   		<%
   		}else{
   		%>
			<tr>
  				<th style='width: 100px;' align=right rowspan='<%=jlFileList.size() %>'>
					<font color='red'>*</font>简    历：
				</th>
		<%
			for(AppFile appFile:jlFileList){
   		%>
	 			<td style='width: 80%'>
	  				<br><%=++index %>、<a href="javascript:downloadFile('<%=appFile.getFile_unid() %>')"><%=appFile.getFile_name() %></a>&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="javascript:delFile('<%=appFile.getFile_unid() %>')"  id ='file_<%=appFile.getFile_unid() %>'  class='btn'>删除</a>&nbsp;
	  			</td>
 			</tr>
		<%
			}
   		}
		index = 0;
   		if(otherFileList.size() == 0){
   		%>
  			<tr>
  				<th style='width: 100px;' align=right >
					<font color='red'>*</font>其    他：
				</th>
				<td style='width: 80%'>
				</td>
				<td>
					<input type="hidden" name="filepath" id="filepath" value="" style="width:50%" readonly>
		   			<input id="uploadify_other" class="uploadify" type="file" name="file"/>
				</td>
   			</tr>
   		<%
   		}else{
   		%>
			<tr>
  				<th style='width: 100px;' align=right rowspan='<%=otherFileList.size() %>'>
					<font color='red'>*</font>学历证书：
				</th>
		<%
			int i = 0;
			for(AppFile appFile:otherFileList){
				if(i > 0){
		%>
			<tr>
   		<%
				}
   		%>
	 			<td style='width: 80%'>
	  				<br><%=++index %>、<a href="javascript:downloadFile('<%=appFile.getFile_unid() %>')"><%=appFile.getFile_name() %></a>&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="javascript:delFile('<%=appFile.getFile_unid() %>')"  id ='file_<%=appFile.getFile_unid() %>'  class='btn'>删除</a>&nbsp;
	  			</td>
    	<%
				if(i > 0){
		%>
			</tr>
   		<%
				}
    			if(i == 0){
 		%>
 				<td rowspan='<%=otherFileList.size() %>'>
					<input type="hidden" name="filepath" id="filepath" value="" readonly>
		   			<input id="uploadify_other" class="uploadify" type="file" name="file"/>
				</td>
 			</tr>
 	   	<%
    			}
   				i++;
   		%>
		<%
			}
			if( i == 0){
		%>
			</tr>
		<%
			}
   		}
   		%>
   							
		</table>
	</div>
<script type="text/javascript">
	  	//绑定事件
		$(function(){
			$("#uploadify_xl").uploadify(uploadifyXlConfig); 
			$("#uploadify_jl").uploadify(uploadifyJlConfig);
			$("#uploadify_other").uploadify(uploadifyOtherConfig);
		}); 
 	   var uploadifyXlConfig = {
		    'uploader'			: '${path}/core/js/uploadify/uploadify.swf',   
       		'script'         	: 'AppFile.action;jsessionid=<%=session.getId()%>',   
       		'scriptData'		: {'fn':'upload','belongTo':'<%=unid%>','file_type':'xlzs'},  
         	'buttonImg'	    	: '${path}/core/js/uploadify/theme/default/a.png',
         	'cancelImg'     	: '${path}/core/js/uploadify/cancel.png',   
         	'height'        	: 30,
 		  	'width'         	: 60,
         	'auto'          	: true,   
         	'multi'         	: false,   
         	'fileDataName'  	:'file',
         	'fileExt'       	: '*.*',
         	'fileDesc'      	: '支持格式：*.*',
         	//'removeCompleted' 	: false,
         	onComplete:function(event, ID, fileObj, response, data){
	          	var json = $.parseJSON(response);
	          	if(json.result){
	          		location.reload();
	          		//top.popup.alert('操作提示','操作成功','info');
	          	}else{
	          		alert('操作失败');
	          		//top.popup.alert('操作提示','操作失败','error');
	          	}
         	}
     	};
     	var uploadifyJlConfig = {
		    'uploader'			: '${path}/core/js/uploadify/uploadify.swf',   
       		'script'         	: 'AppFile.action;jsessionid=<%=session.getId()%>',   
       		'scriptData'		: {'fn':'upload','belongTo':'<%=unid%>','file_type':'jl'},  
         	'buttonImg'	    	: '${path}/core/js/uploadify/theme/default/a.png',
         	'cancelImg'     	: '${path}/core/js/uploadify/cancel.png',   
         	'height'        	: 30,
 		  	'width'         	: 60,
         	'auto'          	: true,   
         	'multi'         	: false,   
         	'fileDataName'  	:'file',
         	'fileExt'       	: '*.doc',
         	'fileDesc'      	: '支持格式：*.doc',
         	//'removeCompleted' 	: false,
         	onComplete:function(event, ID, fileObj, response, data){
	          	var json = $.parseJSON(response);
	          	if(json.result){
	          		location.reload();
	          		//top.popup.alert('操作提示','操作成功','info');
	          	}else{
	          		alert('操作失败');
	          		//top.popup.alert('操作提示','操作失败','error');
	          	}
         	}
     	};
     	var uploadifyOtherConfig = {
		    'uploader'			: '${path}/core/js/uploadify/uploadify.swf',   
       		'script'         	: 'AppFile.action;jsessionid=<%=session.getId()%>',   
       		'scriptData'		: {'fn':'upload','belongTo':'<%=unid%>','file_type':'other'},  
         	'buttonImg'	    	: '${path}/core/js/uploadify/theme/default/a.png',
         	'cancelImg'     	: '${path}/core/js/uploadify/cancel.png',   
         	'height'        	: 30,
 		  	'width'         	: 60,
         	'auto'          	: true,   
         	'multi'         	: false,   
         	'fileDataName'  	:'file',
         	'fileExt'       	: '*.*',
         	'fileDesc'      	: '支持格式：*.*',
         	//'removeCompleted' 	: false,
         	onComplete:function(event, ID, fileObj, response, data){
	          	var json = $.parseJSON(response);
	          	if(json.result){
	          		location.reload();
	          		//top.popup.alert('操作提示','操作成功','info');
	          	}else{
	          		alert('操作失败');
	          		//top.popup.alert('操作提示','操作失败','error');
	          	}
         	}
     	};
     	
 		
     	
     	
	//删除文件
	function delFile(unidin){
		if(confirm('是否确定删除?')){
			$.ajax({
				url:'${path}/AppFile.action',
				type:'post',
				dataType:'json',
				data:{
					unid:unidin,
					fn:'del'
				},
				success:function(response){
					location.reload();
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