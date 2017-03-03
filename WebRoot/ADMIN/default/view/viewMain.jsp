<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucapx.view.ViewApi"%>
<%@page import="com.linewell.ucap.platform.authorized.view.View"%>
<%@include file="/default/common.jsp"%>
<%
/**
 * 视图总体展示页面，包括视图分类页面及视图展示数据界面
 * 
 * @author llp@linewell.com
 *
 * @since 2011-07-26
 */
{
	String viewId = request.getParameter("viewId");
	String isTab =request.getParameter("isTab");
	if(isTab == null || "".equals(isTab)){
		isTab="";
	}
	String purl =request.getParameter("purl");
	if(purl == null || "".equals(purl)){
		purl="";
	}
	
	ViewApi viewApi = new ViewApi();
	View view = viewApi.getView(viewId,ucapSession);
	//视图对象
	
	boolean showCategory = false;
	
	if(null!=view.getCategoryItems() && !view.getCategoryItems().isEmpty()){
		showCategory = true;
	}
%>
<html>
  <body style="margin:0;padding:0;" scroll="no">
 	<table width=100% height=100% cellpadding="0" cellspacing="0">
 		<tr>
 		    <%if(showCategory){%>
 			<td id="tdCategoryTree" width="200">
 				<iframe marginwidth="0" style="overflow:auto;" marginheight="0" frameborder="0" id="categoryTree"  name="categoryTree"  src="viewCategory.jsp?viewId=<%=viewId%>&isTab=<%=isTab%>&purl=<%=purl%>" height="100%" width="100%"></iframe>
 			</td>
 			<%}%>
 			<td id="tbViewBase">
 				<iframe marginwidth="0" marginheight="0" frameborder="0" id="ifrViewData" name="ifrViewData"  scrolling="no"  
 					src="view.jsp?viewId=<%=viewId%>&isTab=<%=isTab%>&purl=<%=purl%>"  height="100%" width="100%">
 				</iframe>
 			</Td>
 		</tr>
 	</table>
  </body>
<%}//end pgage%>
</html>
