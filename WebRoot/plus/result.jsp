<%@ page language="java" contentType="text/html; charset=GBK"
    pageEncoding="GBK"%>
<%@ page import="com.linewell.ucap.ajaxupload.*" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<link href="../../ui_style/style_1/css/fileUpload.css"  type="text/css" rel="stylesheet"/>
<title>文件上传结果</title>
</head>
<body>
<div align="center">
<div class="feedbackbox">
<div class="feedbacktop">系统信息</div>
	<!--div><span>上传文件列表:</span></div-->
 <%   FileUploadStatus fUploadStatus=BackGroundService.getStatusBean(request);

	//for(int i=0;i<fUploadStatus.getUploadFileUrlList().size();i++){
		//String fileName=(String)fUploadStatus.getUploadFileUrlList().get(i);
		//String url=fUploadStatus.getBaseDir()+"/"+fileName;-->
			//}
		
		%>
	
	<%  if (fUploadStatus.getStatus().indexOf("错误")>=0){
	%>
		<div id='errorArea'><span>错误信息:<%=fUploadStatus.getStatus() %></span></div>
		<div style="padding-bottom:20px;"><input type="button" name="DeterminationButton2" id="DeterminationButton2"onClick="self.close();"  value="确定"   class="btn" /></div>
	<%	
	}
	else if (fUploadStatus.getCancel()){
	%>
		<div id='normalMessageArea'><span>由于用户取消上传，所以已经上传的文件均被删除</span></div>
		<div style="padding-bottom:20px;"><input type="button" name="DeterminationButton1" id="DeterminationButton1" onClick="self.close();"  value="确定"   class="btn" /></div>
	<%
	}else{
	%>
	<div class="preservessuccess"><img src="../../ui_style/style_1/images/udisk/b1.jpg" width="11" height="13" style="margin-right:10px;" />文件保存成功！</div>
	<div style="padding-bottom:20px;"><input type="button" name="DeterminationButton" id="DeterminationButton"onClick="self.close();"  value="确定"   class="btn" /></div>
	
	<%
	}
	BeanControler.getInstance().removeUploadStatus(request.getRemoteAddr());

%>
</div></div>
</body>
</html>