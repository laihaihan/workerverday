<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.portlet.Portlet"%>
<%@page import="java.util.Map"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%@page import="com.linewell.core.portlet.PortletManager"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@include file="../../core/params.jsp" %>
<%
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	if(ucapsession==null){
		out.println("<script>top.location.href='../../login.jsp'</script>");
		return;
	}

	User user = ucapsession.getUser();
	String[] roleId = user.getRoles().split(",");
	
	PortletManager pm = new PortletManager();
	List<Portlet> viewPortletList = pm.getViewPortletList();//视图列表  
	List<Portlet> modulePortletList = pm.getModulePortletList();//列表
	
	Map<String,List<Portlet>> chooseMap = pm.getChoosePortletList(roleId[0]);//已配置例表

	request.setAttribute("path", request.getContextPath());
	request.setAttribute("viewPortletList", viewPortletList);
	request.setAttribute("modulePortletList",modulePortletList);
	request.setAttribute("leftPortlet",chooseMap.get("left"));
	request.setAttribute("rightPortlet",chooseMap.get("right"));
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<title></title>
	<link rel="stylesheet" type="text/css" href="${path}/core/portlets/portlets.css">
	<link rel="stylesheet" type="text/css" href="${corejs}/jquery-ui/themes/base/jquery.ui.all.css">
	<link rel="stylesheet" type="text/css" href="${corejs}/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${corejs}/easyui/themes/icon.css">
	
	<script type="text/javascript" src="${corejs}/jquery-ui/jquery-1.5.1.js"></script>
	<script type="text/javascript" src="${corejs}/jquery-ui/ui/jquery.ui.core.js"></script>
	<script type="text/javascript" src="${corejs}/jquery-ui/ui/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="${corejs}/jquery-ui/ui/jquery.ui.mouse.js"></script>
	<script type="text/javascript" src="${corejs}/jquery-ui/ui/jquery.ui.sortable.js"></script>
	<script type="text/javascript" src="${corejs}/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${corejs}/easyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="${path}/core/portlets/portlet.js"></script>
	
	<style>
		.column { width: 49%; float: left; padding-bottom: 100px; }
		.portlet { margin: 0 1em 1em 0; }
		.ui-sortable-placeholder { border: 1px dotted black; visibility: visible !important; height: 160px !important; }
		.ui-sortable-placeholder * { visibility: hidden; }
	</style>
	<script>
		$(function() {
			$( ".column" ).sortable({
				connectWith: ".column",
				srcollSpeed:10		
			});
			
			$( ".column" ).disableSelection();
		});
	</script>
</head>
<body>

<div class="column">
	<s:iterator value="#request.leftPortlet" id="portlet">
	<div id="${portlet.portlet_unid}" class="portlet">
		<div class="DesktopBlock" id="FUNC00005">
			<div id="Block">
				<div id="BlockHead">
					<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
					<tbody>
					<tr valign="center">
						<td width="25"><img width="15" height="15" border="0" src="${path}/core/portlets/images/FUNC00005.gif"></td>
						<td>${portlet.portlet_name}</td>
						<td width="40"><a style="text-decoration:underline" href="javascript:portlet.showMore('${portlet.portlet_name}','${portlet.portlet_src}')">更多</a></td>
						<td width="14"><img width="11" height="11" border="0" onclick="" alt="刷新" src="${path}/core/portlets/images/refresh.gif"></td>
						<td width="14"><img width="11" height="11" border="0" onclick="$(this).parentsUntil('.portlet').remove()" alt="关闭" src="${path}/core/portlets/images/close.gif"></td>
						<td width="5"></td>
					</tr>
					</tbody>
					</table>
				</div>
				<div style="padding: 0pt;" class="BlockMemo" id="FUNC00005MAX">
					<div class="BlockDetail" id="p_${portlet.portlet_unid}">
						<ul>
							<li class="DetailLine"></li>
							<li class="DetailLine"></li>
							<li class="DetailLine"></li>
							<li class="DetailLine"></li>
							<li class="DetailLine"></li>
						</ul>
					</div>
					<div id="BlockFoot">
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		$(function(){
			portlet.displayData('${portlet.portlet_unid}','${portlet.portlet_src}','${portlet.portlet_view_column}');
		});
	</script>
	</s:iterator>
</div>

<div class="column">
	<s:iterator value="#request.rightPortlet" id="portlet">
	<div id="${portlet.portlet_unid}" class="portlet">
		<div class="DesktopBlock" id="FUNC00005">
			<div id="Block">
				<div id="BlockHead">
					<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">
					<tbody>
					<tr valign="center">
						<td width="25"><img width="15" height="15" border="0" src="${path}/core/portlets/images/FUNC00005.gif"></td>
						<td>${portlet.portlet_name}</td>
						<td width="40"><a style="text-decoration:underline" href="javascript:portlet.showMore('${portlet.portlet_name}','${portlet.portlet_src}')">更多</a></td>
						<td width="14"><img width="11" height="11" border="0" onclick="" alt="刷新" src="${path}/core/portlets/images/refresh.gif"></td>
						<td width="14"><img width="11" height="11" border="0" onclick="$(this).parentsUntil('.portlet').remove()" alt="关闭" src="${path}/core/portlets/images/close.gif"></td>
						<td width="5"></td>
					</tr>
					</tbody>
					</table>
				</div>
				<div style="padding: 0pt;" class="BlockMemo" id="FUNC00005MAX">
					<div class="BlockDetail" id="p_${portlet.portlet_unid}">
						<ul>
							<li class="DetailLine"></li>
							<li class="DetailLine"></li>
							<li class="DetailLine"></li>
							<li class="DetailLine"></li>
							<li class="DetailLine"></li>
						</ul>
					</div>
					<div id="BlockFoot">
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		$(function(){
			portlet.displayData('${portlet.portlet_unid}','${portlet.portlet_src}','${portlet.portlet_view_column}');
		});
	</script>
	</s:iterator>
</div>
</script>
</body>
</html>