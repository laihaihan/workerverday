<%@ page language="java" contentType="text/html; charset=GBK"
    pageEncoding="GBK"%>
<%@ page import="com.linewell.ucap.ajaxupload.*" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<link href="../../ui_style/style_1/css/fileUpload.css"  type="text/css" rel="stylesheet"/>
<title>�ļ��ϴ����</title>
</head>
<body>
<div align="center">
<div class="feedbackbox">
<div class="feedbacktop">ϵͳ��Ϣ</div>
	<!--div><span>�ϴ��ļ��б�:</span></div-->
 <%   FileUploadStatus fUploadStatus=BackGroundService.getStatusBean(request);

	//for(int i=0;i<fUploadStatus.getUploadFileUrlList().size();i++){
		//String fileName=(String)fUploadStatus.getUploadFileUrlList().get(i);
		//String url=fUploadStatus.getBaseDir()+"/"+fileName;-->
			//}
		
		%>
	
	<%  if (fUploadStatus.getStatus().indexOf("����")>=0){
	%>
		<div id='errorArea'><span>������Ϣ:<%=fUploadStatus.getStatus() %></span></div>
		<div style="padding-bottom:20px;"><input type="button" name="DeterminationButton2" id="DeterminationButton2"onClick="self.close();"  value="ȷ��"   class="btn" /></div>
	<%	
	}
	else if (fUploadStatus.getCancel()){
	%>
		<div id='normalMessageArea'><span>�����û�ȡ���ϴ��������Ѿ��ϴ����ļ�����ɾ��</span></div>
		<div style="padding-bottom:20px;"><input type="button" name="DeterminationButton1" id="DeterminationButton1" onClick="self.close();"  value="ȷ��"   class="btn" /></div>
	<%
	}else{
	%>
	<div class="preservessuccess"><img src="../../ui_style/style_1/images/udisk/b1.jpg" width="11" height="13" style="margin-right:10px;" />�ļ�����ɹ���</div>
	<div style="padding-bottom:20px;"><input type="button" name="DeterminationButton" id="DeterminationButton"onClick="self.close();"  value="ȷ��"   class="btn" /></div>
	
	<%
	}
	BeanControler.getInstance().removeUploadStatus(request.getRemoteAddr());

%>
</div></div>
</body>
</html>