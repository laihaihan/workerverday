<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.platform.authorized.view.query.Query"%>
<%@page
	import="com.linewell.ucap.platform.authorized.view.query.QuerySimpleItem"%>
<%@page import="java.util.List"%>

<% 
	/**
	 * 视图简单查询页面
	 * 
	 * @author llp@linewell.com,zhua@linewell.com
	 * 
	 * @since 2011-07-5
	 */
	Query query = view.getQuery() ;
	List<QuerySimpleItem> simpleItemList =null;
	if(null != query){//获取简单查询字段列表
		simpleItemList = query.getQuerySimpleItems();
	}
	if(null!=query){
%>
<div id="area_searchBar" class="area_searchBar" name="area_searchBar">
	<div class="onright">
		
	<%
		if(null != simpleItemList){
	%>
		<div class="icon_search"></div>
	<%
			String keyword = request.getParameter("keyword");	
			if(StringUtils.isEmpty(keyword) ||"请输入搜索关键字".equals(keyword)){	
	%>
		搜索：
		<input name="keyword" class="searchinputbox" type="text" id="keyword"
			value='请输入搜索关键字'
			onmousedown="if(this.value=='请输入搜索关键字') this.value='';" size='20' onkeydown="javascript:if(event.keyCode ==13) searchObject.simpleSearch();"/>
		<% }// end if(StringUtils.isEmpty(keyword) 
			else{%>
		搜索：
		<input name="keyword" class="searchinputbox" type="text" id="keyword"
			value="<%=keyword %>" size='20' onkeydown="javascript:if(event.keyCode ==13) searchObject.simpleSearch();"/>
		<%
			} 
		%>
		在
		<select name="simpleSearchSelect" id='simpleSearchSelect'>
			<option value='0'>
				请选择搜索范围
			</option>
		<% 
			String simpleSearchSelect =request.getParameter("simpleSearchSelect");	
			for(int i = 0 ;i< simpleItemList.size();i++){
				QuerySimpleItem querySimpleItem = simpleItemList.get(i);
				if(StringUtils.isNotEmpty(querySimpleItem.getItemNameEn())&& querySimpleItem.getItemNameEn().equals(simpleSearchSelect)){
		%>
			<option value="<%=querySimpleItem.getItemNameEn() %>" selected><%=querySimpleItem.getItemNameCn() %></option>
			<%	}
				else {
			%>
			<option value="<%=querySimpleItem.getItemNameEn() %>"><%=querySimpleItem.getItemNameCn() %></option>
		<%
				}
			} //end for(int i = 0 ;i< simpleItemList
		%>
		</select>
		<input type="button" value="搜索" class="button_public"
			id="simpleSearch" onclick="searchObject.simpleSearch()">
		<%}//end if(null != simpleItemList
		if(null != query.getQueryAdvancedItems() && query.getQueryAdvancedItems().size()>0){
			
		%>
			<input type="button" class="button_public" id="advancedSearch" 	onclick="searchObject.openAdvance()" value="▼高级搜索" />
	<%
		}// end if(null != query.getQueryAdvancedItems
	%>
	</div>
</div>
<%
}//end page
%>
