<%@page import="org.dom4j.Element"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.List"%>
<%@page import="org.dom4j.Document"%>
<%@page import="org.dom4j.DocumentException"%>
<%@page import="org.dom4j.DocumentHelper"%>
<%@page import="java.net.URLDecoder"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.io.InputStream"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="org.dom4j.Node"%>
<%
	String path=request.getContextPath();
	ServletInputStream tInputStream=request.getInputStream();
	String settingInfo="";
	if (tInputStream != null) {
		try {
			BufferedReader tBufferedReader = new BufferedReader(
					new InputStreamReader(tInputStream));
			StringBuffer tStringBuffer = new StringBuffer();
			String sTempOneLine = new String("");
			while ((sTempOneLine = tBufferedReader.readLine()) != null) {
				tStringBuffer.append(sTempOneLine);
			}
			settingInfo=URLDecoder.decode(tStringBuffer.toString(),"UTF-8");  
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	List channellist = null;
	String channelHeight = null;
	try {
		Document infoDoc= DocumentHelper.parseText(settingInfo);
		channellist = infoDoc.selectNodes("/channelInfo/portlet/sourceChannels/channelInfo");
		channelHeight = ((Node)infoDoc.selectNodes("/channelInfo/height").get(0)).getText();
		
	} catch (DocumentException e) {
		e.printStackTrace();
	}
%>
<!DOCTYPE html>
<html>
<head>
<title>公文</title>
<style>
html{
	height:100%;
}
body{
	height:100%;
	overflow:hidden;
}
.table {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	*height:expression(body.clientHeight);
}

.tab_left {
	background-image: url('<%=path%>/PORTAL/demo/images/tab_left.jpg');
	width: 11px;
	height: 29px;
}

.tab_middle {
	background-image: url('<%=path%>/PORTAL/demo/images/tab_middle.jpg');
	height: 29px;
	text-align: center;
	color: #133188;
	font-weight: bold;
	cursor: hand;
}

.tab_right {
	background-image: url('<%=path%>/PORTAL/demo/images/tab_right.jpg');
	width: 20px;
	height: 29px;
}

.tab_unselect_left {
	background-image:
		url('<%=path%>/PORTAL/demo/images/tab_unselect_left.jpg');
	width: 11px;
	height: 29px;
}

.tab_unselect_middle {
	background-image:
		url('<%=path%>/PORTAL/demo/images/tab_unselect_middle.jpg');
	height: 29px;
	text-align: center;
	color: #7b7b7b;
	font-weight: bold;
	cursor: hand;
}

.tab_unselect_right {
	background-image:
		url('<%=path%>/PORTAL/demo/images/tab_unselect_right.jpg');
	width: 20px;
	height: 29px;
}

.tab_across_left {
	background-image:
		url('<%=path%>/PORTAL/demo/images/tab_across_left.jpg');
	width: 11px;
	height: 29px;
}

.tab_across_middle {
	background-image:
		url('<%=path%>/PORTAL/demo/images/tab_across_middle.jpg');
	height: 29px;
	text-align: center;
	color: #7b7b7b;
	font-weight: bold;
	cursor: hand;
}

.tab_across_right {
	background-image:
		url('<%=path%>/PORTAL/demo/images/tab_across_right.jpg');
	width: 20px;
	height: 29px;
}

.channelContent {
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	background: #fff;
	border-top: 0px #dfe8f6 solid;
	border-left: 0px #f8fbfc solid;
	border-right: 0px #f8fbfc solid;
	margin: 0px;
	padding: 0px;
	width: 100%;
	height: 100%;
	*height:expression(body.clientHeight-39);
}
</style>

<script>
function mouseMove(obj){
	if(obj.className=="tab_unselect_middle"){
		obj.className="tab_across_middle";
		obj.parentNode.cells[0].className="tab_across_left";
		obj.parentNode.cells[2].className="tab_across_right";
	}
}
function mouseOut(obj){
	if(obj.className=="tab_across_middle"){
		obj.className="tab_unselect_middle";
		obj.parentNode.cells[0].className="tab_unselect_left";
		obj.parentNode.cells[2].className="tab_unselect_right";
	}
}
function mouseDown(obj,url){
	document.getElementById("content").src="";
	var middles=document.getElementsByName(obj.id);
	for(var i=0;i<middles.length;i++){
		middles[i].className="tab_unselect_middle";
		middles[i].parentNode.cells[0].className="tab_unselect_left";
		middles[i].parentNode.cells[2].className="tab_unselect_right";
	}
	obj.className="tab_middle";
	obj.parentNode.cells[0].className="tab_left";
	obj.parentNode.cells[2].className="tab_right";
	document.getElementById("content").src=appPath+"/PORTAL/"+url;
}

function SetWinHeight(obj) {
	var win = obj;
	if (document.getElementById) {
		if (win && !window.opera){
			if (win.contentDocument && win.contentDocument.body.offsetHeight)
				win.height = win.contentDocument.body.offsetHeight;
			else if (win.Document && win.Document.body.scrollHeight)
				win.height = win.Document.body.scrollHeight;
		}
	}
}
</script>
</head>
<body>
	<table cellpadding="0" cellspacing="0" class="table" style="height:<%=channelHeight %>px">
		<tr style = "height:29px;">
			<td style="width: 80%;height:29px; "valign="bottom">
				<table cellpadding="0" cellspacing="0">
					<tr>
						<%
						Iterator channelIter = channellist.iterator();
						int i=0;
						String defaultUrl="";
						while (channelIter.hasNext()) {	
							Element element=(Element)channelIter.next();
							Element portlet=element.element("portlet");
							String url=portlet.elementText("source");
							String name=portlet.elementText("name");
							
							String className="tab_unselect";
							if(i==0){
								className="tab";
								defaultUrl=path+"/PORTAL/"+url;
							}
						%>
						<td>
							<table cellpadding="0" cellspacing="0">
								<tr>
									<td class="<%=className %>_left" ></td>
									<td class="<%=className %>_middle" id="middle" onmousemove="mouseMove(this)" onmouseout="mouseOut(this)" onmousedown="mouseDown(this,'<%=url %>')"><%=name %></td>
									<td class="<%=className %>_right"></td>
								</tr>
							</table></td>
						<td>
						<%
						i+=1;
						}
						%>
					</tr>
				</table></td>
			<td align="center" valign="middle" style="width: 20%"><img
				src="<%=path%>/PORTAL/demo/images/chengsonglindao_button.jpg" /></td>
		</tr >
		<tr style = "">
			<td colspan="2" style="border: 1px solid #cce3fc;" valign="top" >
				<iframe src="<%=defaultUrl %>" id="content" 
					frameborder="no" style="width: 100%; height:<%=Integer.parseInt(channelHeight)-39 %>px;" 
					scrolling="no" ></iframe></td>
		</tr>
	</table>
</body>
</html>