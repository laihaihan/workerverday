<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.platform.subbutton.SubButton"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.ucapx.button.SubButtonApi"%>
<%@page import="com.linewell.ucap.web.form.FormDelete"%>
<%@page import="org.apache.commons.lang.StringUtils"%>

<%
	/**
	 * 视图按钮页面
	 * 
	 * @author llp@linewell.com,zhua@linewell.com
	 * 
	 * @since 2011-07-5
	 */
	List<SubButton> subButtons = null;
	SubButtonApi subButtonApi = new SubButtonApi();
	//获取视图按钮
	subButtons = subButtonApi.getSubButtonList(viewId,ucapSession);
%>
<div id="buttonDiv" class="area_buttonBar">
	<%
	String isConfig = request.getParameter("isConfig");
	//if (null != subButtons && subButtons.size() > 0) {
	if (false) {
		for (int i = 0; i < subButtons.size(); i++) {
			SubButton subButton = subButtons.get(i);
				
	%>

	<div class="button_buttonBar" onclick="<%=subButton.getButton().getCode()%>">
		<%
			String picture =subButton.getPicture();
			if(StringUtils.isNotEmpty(picture)){
				picture = userStylePath + "ucapimages/"+picture;
		%>
		<img class="ico_buttonBar" src="<%=picture%>" />
		<%	} %>
		<%=subButton.getName()%>
	</div>
	<%
		}//end for
	} //end if (null != subButtons
	else if(StringUtils.isNotEmpty(isConfig) && "1".endsWith(isConfig)){
	%>
	<div class="button_buttonBar" onclick='viewImp.newDocument();'>
		<img class="ico_buttonBar" src="<%=uri%>/view/style/images/buttonBar_new.gif" />
		新建
	</div>
	<div class="button_buttonBar" onclick='viewImp.refreshView();'>
		<img class="ico_buttonBar" src="<%=uri%>/view/style/images/buttonBar_ref.gif" />
		刷新
	</div>
	<div class="button_buttonBar" onclick='viewImp.resetView();'>
		<img class="ico_buttonBar" src="<%=uri%>/view/style/images/buttonBar_ref.gif" />
		重置
	</div>
	<%
	}else{
	%>
	<div class="button_buttonBar" onclick='viewImp.newDocument();'>
		<img class="ico_buttonBar" src="<%=uri%>/view/style/images/buttonBar_new.gif" />
		新建
	</div>
	<div class="button_buttonBar" onclick='viewImp.deleteDocument();'>
		<img class="ico_buttonBar" src="<%=uri%>/view/style/images/buttonBar_del.gif" />
		删除
	</div>
	<div class="button_buttonBar" onclick='viewImp.modifyDocument()'>
		<img class="ico_buttonBar" src="<%=uri%>/view/style/images/buttonBar_mod.gif" />
		修改
	</div>
	<div class="button_buttonBar" onclick='viewImp.refreshView();'>
		<img class="ico_buttonBar" src="<%=uri%>/view/style/images/buttonBar_ref.gif" />
		刷新
	</div>
	<div class="button_buttonBar" onclick='viewImp.resetView();'>
		<img class="ico_buttonBar" src="<%=uri%>/view/style/images/buttonBar_ref.gif" />
		重置
	</div>
	<%
	}//endpage
	%>
</div>

