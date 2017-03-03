<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.viewimpl.ViewPage"%>
<%@page import="com.linewell.ucap.util.StringUtil"%>
<%@page import="com.linewell.ucap.util.UcapRequest"%>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<% 
{
	/**
	 * 视图分页页面
	 * 
	 * @author llp@linewell.com,zhua@linewell.com
	 * 
	 * @since 2011-07-5
	 */

	int  total = viewPage.getTotalCount();//总条数
	int  pageCount =  viewPage.getPageCount();//总页数
	int  pageSize =  viewPage.getCountPerPage();//当前页条数
	int  curPage = viewPage.getCurrentPageCount();//当前页号
	if(StringUtils.isNotBlank(pageNum)){
		curPage=Integer.parseInt(pageNum);
	}
	if(pageSize != 0){
	 %>
<div class="area_pageNumber">
	<%
	 if(1 != curPage){//首页
	 	 %>
	<input class="button_pageNumber first" 	onclick="pageObject.pageChange('1');" type="button" />
	
	<%}else{ %>
	<input class="button_pageNumber first_disabled" type="button" />
	<%}
	 if(1 == curPage){//上一页
	 	 %>
	<input class="button_pageNumber prev_disabled" type="button" />
	<%}else{
	 	 %>
	<input
		onclick="pageObject.pageChange('<%=(curPage-1)%>');"
		class="button_pageNumber prev" type="button" />
	<%} %>
	<span class="separator_pageNumber"></span> 第
	<input class="input_pageNumber" size="1" value="<%=curPage%>" pageCount="<%=pageCount%>" onkeydown="javascript:if(event.keyCode ==13) pageObject.pageSkip(this);" />
	页 共<%=pageCount %>页
	<span class="separator_pageNumber"></span>
	<%if(curPage >= pageCount){ //下一页%>
	<input class="button_pageNumber next_disabled" type="button" />
	<%}else{ %>
	<input	onclick="pageObject.pageChange('<%=(curPage+1) %>');" class="button_pageNumber next" type="button" />
	<%}
	
	 if(curPage < pageCount){ //末页
	%>
	<input
		onclick="pageObject.pageChange('<%=pageCount %>');"	class="button_pageNumber last" type="button" />
	<%}else{%>
	<input class="button_pageNumber last_disabled" type="button" />
	<%} %>
	<span class="onright">显示第 <%=(pageSize*(curPage-1)+1) %> 条到 <%=pageCount==curPage?total:(pageSize*(curPage-1)+pageSize) %>条记录，一共
		<%=total %>条
	</span>
</div>
	<% 
	}
}//end page 
%>