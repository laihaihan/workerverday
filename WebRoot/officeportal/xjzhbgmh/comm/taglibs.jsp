<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
//basePath = basePath+"officeportal/xjzhbgmh/";
request.setAttribute("basePath",basePath);
request.setAttribute("portalPath",basePath+"officeportal/xjzhbgmh/");
//proxool
String pxl_cms = "A0A23464638BC1DD675B7D1B4DAA81C2";
String pxl_ess = "D5A732887EB491ABC10B23D4B43DA38C";
String pxl_ucap = "proxool";
String pxl_was = "02EA829BF2BA1F4FF0F49145A502C353";
//deptunid
	
%>