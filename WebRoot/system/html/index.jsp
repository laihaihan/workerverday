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
		out.println("��ȡ������������Ϣ�д�");
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
				������IP��ַ��
			</th>
			<td><%=serverInfo.getServerIP()%></td>
			<th>
				���������ƣ�
			</th>
			<td><%=serverInfo.getServerName()%></td>
		</tr>
		<tr>
			<th>
				Ӳ���ܹ���
			</th>
			<td><%=serverInfo.getHardwareFrame()%></td>
			<th>
				������CPU��
			</th>
			<td><%=serverInfo.getServerCPUCount()%>��
			</td>
		</tr>
		<tr>
			<th>
				����ϵͳ��
			</th>
			<td><%=serverInfo.getSystemName()%>
			</td>
			<th>
				����ϵͳ�汾�ţ�
			</th>
			<td><%=serverInfo.getSystemVersion()%></td>
		</tr>
		<tr>
			<th>
				ϵͳ���ԣ�
			</th>
			<td><%=serverInfo.getSystemLanguage()%></td>
			<th>
				�����ַ�����
			</th>
			<td><%=serverInfo.getEncodingString()%></td>
		</tr>
		<tr>
			<th>
				JDK�汾��
			</th>
			<td><%=serverInfo.getJDKVersion()%></td>
			<th>
				JVM�汾�ţ�
			</th>
			<td><%=serverInfo.getJVMVersion()%></td>
		</tr>
		<tr>
			<th>
				JVM���ƣ�
			</th>
			<td><%=serverInfo.getJVMName()%>
			</td>
			<th>
				JVM���̣�
			</th>
			<td><%=serverInfo.getJVMManufacturer()%></td>
		</tr>
		<tr>
			<th>
				ƽ̨�汾�ţ�
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
				�����
			</th>
			<%
				if ("UTF-8".equalsIgnoreCase(serverInfo.getEncodingString())) {
			%>
			<td colspan="3" class="red">
				<label id="message">
					��ϲ��������Ӧ�÷�����������ɹ���
				</label>
			</td>
			<%
				} else {
			%>
			<td colspan="3" class="red">
				tomcat��server.xml Connector URIEncoding="<%=serverInfo.getEncodingString()%>",Ӧ�øĳ�UTF-8
			</td>
			<%
				}
			%>
		</tr>
	</table>
  </body>
</html>
