<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.io.*"%>
<%@page import="com.linewell.core.file.AppFileManager"%>
<%@page import="com.linewell.core.file.AppFile"%>
<%@page import="com.linewell.core.util.BlobUtil"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<html>
	<body>
<%  
	String unid = request.getParameter("unid");
  	AppFileManager appFileManager = new AppFileManager(GlobalParameter.APP_WAS);
	AppFile appFile = appFileManager.doFindBeanByKey(unid);
	
	byte [] byte_array = BlobUtil.blobToBytes(appFile.getFile_data()); 
	response.setContentType("image/jpeg"); 
	ServletOutputStream sos = response.getOutputStream(); 

	for(int i=0;i<byte_array.length;i++) 
	{
	sos.write(byte_array[i]); 
	} 
	sos.flush();
	sos.close(); 
	out.clear();
	out = pageContext.pushBody();
%>
	</body>
</html>
