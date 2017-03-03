<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@page import="com.linewell.core.portlet.Portlet"%>
<%@page import="com.linewell.core.portlet.PortletManager"%>
<%@page import="com.linewell.core.view.View"%>
<%@page import="com.linewell.core.view.ViewManager"%>
<%@page import="org.dom4j.Document"%>
<%@page import="org.dom4j.DocumentException"%>
<%@page import="org.dom4j.DocumentHelper"%>
<%@page import="org.dom4j.Element"%>
<%@page import="java.net.URLDecoder"%>
<%@page import="java.io.InputStreamReader"%>
<%@page import="java.io.BufferedReader"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%
	String path = request.getContextPath();
	ServletInputStream is = request.getInputStream();
	String settingInfo = "";
	if (is != null) {
		try {
			BufferedReader tBufferedReader = new BufferedReader(new InputStreamReader(is));
			StringBuffer tStringBuffer = new StringBuffer();
			String sTempOneLine = new String("");
			while ((sTempOneLine = tBufferedReader.readLine()) != null) {
				tStringBuffer.append(sTempOneLine);
			}
			settingInfo = URLDecoder.decode(tStringBuffer.toString(),"UTF-8");  
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	//取得当前频道对象
	Element channel = null;
	Element portlet = null;
	Element portletDisplay = null;
	String channelWidth = "";
	String channelHeight = "";
	try {
		Document infoDoc = DocumentHelper.parseText(settingInfo);
		channel = (Element)infoDoc.selectSingleNode("channelInfo");
		portlet = (Element)channel.selectSingleNode("portlet");
		portletDisplay = (Element)channel.selectSingleNode("portletDisplay");
		channelWidth = channel.elementText("width");
		channelHeight = channel.elementText("height");
	} catch (DocumentException e) {
		e.printStackTrace();
	}
	
	//取得当前频道对象所对应的首页插件
	String frameSource = portlet.elementText("source");
	String[] params = frameSource.substring(frameSource.indexOf("?") + 1).split("&");
	Map map = new HashMap();
	for(int i=0;i<params.length;i++){
		map.put(params[i].split("=")[0],params[i].split("=")[1]);
	}
	String portletId = null != map.get("portletId") ? map.get("portletId").toString() : "";
	String menuName = null != map.get("menuName") ? map.get("menuName").toString() : "";
	if(StrUtil.isNull(portletId) || StrUtil.isNull(menuName)){
		out.print("请在本频道的【数据来源值】中添加参数：portletId 和 menuName！");
		return;
	}
	Portlet appPortlet = new PortletManager().doFindBeanByKey(portletId);
	View view = new ViewManager().getView(appPortlet.getPortlet_src());
%>
<!DOCTYPE html>
<html>
	<head>
		<title><%=portlet.elementText("name") %></title>
	</head>
	<body>
		<div class="channel" style="width: <%=channelWidth %>px; height: <%=channelHeight %>px;">
			<b class="b1" style="width: <%=Integer.parseInt(channelWidth)-8 %>px;"/>
			<b class="b2" style="width: <%=Integer.parseInt(channelWidth)-4 %>px;"/>
			<b class="b3" style="width: <%=Integer.parseInt(channelWidth)-2 %>px;"/>
			<b class="b4" style="width: <%=Integer.parseInt(channelWidth) %>px;"/>
			<b class="b5" style="width: <%=Integer.parseInt(channelWidth) %>px;"/>
			<b class="b6" style="width: <%=Integer.parseInt(channelWidth) %>px;"/>
			<div class="channelTitle">
				<%if(!StrUtil.isNull(portletDisplay.elementText("titlePicture")) ){ %>
					<img src="<%=path+"/"+portletDisplay.elementText("titlePicture") %>"/>
				<%} %>
				<span><%=portletDisplay.elementText("channelName") %></span>
				<a style="position:absolute;right:10px;top:0px;color:blue;font-weight:bolder" 
					href="javascript:top.tabs.openTab('<%=view.getName()%>','','view.action?fn=grid&viewId=<%=view.getUnid()%>','<%=menuName%>');">
					更多 >>
				</a>
			</div>
			<div class="channelContentBorder" style="width: <%=channelWidth %>px; height: <%=Integer.parseInt(channelHeight)-29 %>px; overflow: hidden;">
				<div class="channelContent" style="width: 100%; height: 100%;">
					<iframe src="<%=path+"/"+portlet.elementText("source") %>" id="content" scrolling="no" 
						frameborder="no" style="width: 100%; height:<%=Integer.parseInt(channelHeight)-39 %>px;">
					</iframe>
				</div>
			</div>
		</div>
	</body>
</html>