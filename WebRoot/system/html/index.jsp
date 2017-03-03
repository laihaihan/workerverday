<%@ page language="java" import="java.util.*" pageEncoding="gb2312"%>
<%@ page import="com.linewell.ucap.setup.bean.ServerConfigInfo"%>
<%@ page import="com.linewell.ucap.setup.util.SetupConfigUtil"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	SetupConfigUtil configApi = new SetupConfigUtil();
	ServerConfigInfo serverInfo = configApi.getServerConfigInfo();
	if (null == serverInfo) {
		out.println("获取服务器配置信息有错");
		return;
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title></title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
  <table width="100%" border="1"  bordercolor="#cccccc" cellspacing="0"  class="formtable" cellpadding="0">
		<tr >
			<th>
				服务器IP地址：
			</th>
			<td><%=serverInfo.getServerIP()%></td>
			<th>
				服务器名称：
			</th>
			<td><%=serverInfo.getServerName()%></td>
		</tr>
		<tr>
			<th>
				硬件架构：
			</th>
			<td><%=serverInfo.getHardwareFrame()%></td>
			<th>
				服务器CPU：
			</th>
			<td><%=serverInfo.getServerCPUCount()%>个
			</td>
		</tr>
		<tr>
			<th>
				操作系统：
			</th>
			<td><%=serverInfo.getSystemName()%>
			</td>
			<th>
				操作系统版本号：
			</th>
			<td><%=serverInfo.getSystemVersion()%></td>
		</tr>
		<tr>
			<th>
				系统语言：
			</th>
			<td><%=serverInfo.getSystemLanguage()%></td>
			<th>
				编码字符集：
			</th>
			<td><%=serverInfo.getEncodingString()%></td>
		</tr>
		<tr>
			<th>
				JDK版本：
			</th>
			<td><%=serverInfo.getJDKVersion()%></td>
			<th>
				JVM版本号：
			</th>
			<td><%=serverInfo.getJVMVersion()%></td>
		</tr>
		<tr>
			<th>
				JVM名称：
			</th>
			<td><%=serverInfo.getJVMName()%>
			</td>
			<th>
				JVM厂商：
			</th>
			<td><%=serverInfo.getJVMManufacturer()%></td>
		</tr>
		<tr>
			<th>
				平台版本号：
			</th>
			<td>
				v1.0
			</td>
			<td>
				&nbsp;
			</td>
			<td>
				&nbsp;
			</td>
		</tr>
		<tr>
			<th>
				检测结果
			</th>
			<%
				if ("UTF-8".equalsIgnoreCase(serverInfo.getEncodingString())) {
			%>
			<td colspan="3" class="red">
				<label id="message">
					恭喜您，您的应用服务器编码检查成功！
				</label>
			</td>
			<%
				} else {
			%>
			<td colspan="3" class="red">
				tomcat下server.xml Connector URIEncoding="<%=serverInfo.getEncodingString()%>",应该改成UTF-8
			</td>
			<%
				}
			%>
		</tr>
	</table>
  </body>
</html>
