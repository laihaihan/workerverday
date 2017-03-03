<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.util.UcapRequest"%>
<%@page import="com.linewell.ucap.platform.authorized.view.View"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@page import="com.linewell.ucap.viewimpl.ViewPage"%>
<%@page import="com.linewell.ucap.platform.authorized.view.ViewItem"%>
<%@page import="com.linewell.ucap.jdbc.core.JdbcTemplate"%>
<%@page import="com.linewell.ucap.db.JDBCTool"%>
<%@page import="com.linewell.ucap.platform.subbutton.SubButtonManager"%>

<% 
	/**
	 * 视图数据页面
	 * 
	 * @author llp@linewell.com,zhua@linewell.com
	 * 
	 * @since 2011-07-5
	 */
	List<ViewItem> viewItems =view.getViewItems();//获取显示字段列表
	List<Map<String,String>> viewDatas=null;
	if(StringUtils.isNotEmpty(pageNum)){//设置当前页
		viewPage.setCurrentPageCount(Integer.parseInt(pageNum));
	}
	//获取视图数据
	viewDatas=viewApi.getViewDatas(view, viewPage,ucapSession, searchCon, orderBySql,isAnd,ucapRequest);
%>	


<div id="dataDiv" class="area_table_data" name="dataDiv">
	<table id="dataViewTable"  class="table_data"  cellpadding= "0"  cellspacing= "0">
		<thead>
			<tr >
<%
if(null!=viewItems && viewItems.size()>0){
	for(int i=0;i<viewItems.size();i++){
		if(null ==viewItems.get(i))continue; 
		ViewItem viewItem=viewItems.get(i);	
		String _widthUnit ="px" ;
		if(viewItem.getWidthType().equals("02")){ //设置列宽度类型
			_widthUnit = "%";
		}
		if(0 == i){
		%>
			<td width="18"><input type=checkbox  name=allCheck onclick="dataObject.allChecked()"></td>
		<%
				continue;
		}// end if(0 == i)
		if(!viewItem.getItemNameEn().equals("~display~opr~") && !viewItem.getItemNameEn().equals("~display~seqnum~")){
			String _orderBy = orderByMap.get(viewItem.getItemNameEn());
			if(StringUtils.isEmpty(_orderBy))_orderBy="";
			String _displayName = viewItem.getDisplayName();
			if(_orderBy.equals("asc"))_displayName+="<font color=blue>▲</font>";
			if(_orderBy.equals("desc"))_displayName+="<font color=blue>▼</font>";
		%>
		<td style="cursor:pointer"  width="<%=viewItem.getWidth()%><%=_widthUnit %>">
		<div  id="<%=viewItem.getItemNameEn()%>" name="<%=viewItem.getItemNameEn()%>" onclick="dataObject.orderBy();" orderBy="<%=_orderBy%>"><%=_displayName%></div>
		</td>
		<%}//end f(!viewItem.getItemNameEn()
		else {%>
		<td width="<%=viewItem.getWidth()%><%=_widthUnit %>">
		<%=viewItem.getDisplayName()%>
		</td>
		<%
		}// end else {
	}// end for(int i=0;i<viewItems.size()
}//end if(null!=viewItems
%>
			</tr>
		</thead>
<%
if(null !=viewDatas && viewDatas.size()>0){
	for(int i=0;i<viewDatas.size();i++){
		Map<String,String> rowDatas = (Map<String,String>)viewDatas.get(i);
		if(null!=rowDatas && rowDatas.size()>0){
			
			if(null!=viewItems && viewItems.size()>0){
				if(0==i%2){
					 %>
					 <tr>
					 <%
				}else{
					 %>
					 <tr class="tr_even" >
					 <%
				}
				String _docUnid="";
				for(int j=0;j<viewItems.size();j++){
					if(null ==viewItems.get(j))continue;   
					ViewItem viewItem=viewItems.get(j);					
	 				if(0 == j){
	 					_docUnid = (String)rowDatas.get(viewItem.getItemNameEn());
	 					%>
	 					<td width="18"><input type=checkbox value="<%=_docUnid%>" name=check_key></td>
	 					<%
	 					continue;
	 				}//end if(0 == j)
					if(viewItem.isDisplay()){//列是否显示
						Object displayValue= "&nbsp;";
						displayValue = rowDatas.get(viewItem.getItemNameEn());
						if(null == displayValue || "".equals(displayValue) || "null".equals(displayValue)){
							displayValue = "&nbsp;";
						}//end if(null == displayVal
							
						if(null!=view.getOpenJs() && !view.getOpenJs().equals("0")){//单击直接打开
							
							if(viewItem.getItemNameEn().equalsIgnoreCase("~display~opr~")){//说明是操作列
								
								List<SubButton> _opeButtons = view.getSubButtonList();
								
								if(null==_opeButtons || _opeButtons.isEmpty()){
									SubButtonManager sbm = new SubButtonManager();
									_opeButtons = sbm.doFindByBelongUnid(view.getPunid(), ucapSession);
								}
								String _operationStr = "";
								if (null != _opeButtons && _opeButtons.size() > 0) {
									for (int s = 0; s < _opeButtons.size(); s++) {
										SubButton sb = _opeButtons.get(s);
										//操作列位置为视图或者都放时展示
										if (null != sb && null != sb.getDisplayPosition()&& (sb.getDisplayPosition().equals("02") || sb	.getDisplayPosition().equals("03"))) {
											if (StringUtils.isEmpty(_operationStr)) {
												_operationStr = "<div style='display:inline;cursor:pointer;' docUnid ="+_docUnid+" onclick=\"";
												_operationStr += sb.getButton().getCode();
												_operationStr += "\"><font color=blue>" + sb.getName() + "</font></div>";
											} //end if (StringUtils.isEmpty
											else {
												_operationStr += "&nbsp;&nbsp;<div style='display:inline;cursor:pointer;' docUnid ="+_docUnid+" onclick=\"";
												_operationStr += sb.getButton().getCode();
												_operationStr += "\"><font color=blue>" + sb.getName() + "</font></div>";
											} // end else
										}// end if (null != sb&& null != sb

									}// end for (int s = 0; s < opeBu
								}// end if (null != opeButtons &&
								
								%>
								<td><%=_operationStr%></td>
								<%
							}//end if(viewItem.getItemNameEn().equals
							else{//不是操作列
								%>
								<td  style="cursor:pointer;" onclick="dataObject.openDocument('<%=_docUnid %>')"><%=WebAppUtils.convertNull(displayValue)%></td>
								<%
							}
							
						}// end if(null!=view.getOpenJs()
						else{
							 %>
							<td  style="cursor:pointer;" ><%=WebAppUtils.convertNull(displayValue) %></td>    							 						
					<%}//end if(null!=view.getOpenJs(
 				
				}//end if(viewItem.isDisplay()
			}//end for(int j=0;j<viewIt
			 %>	
			 </tr>
			 <%
		}//end if(null!=viewItems && vie
	}//end if(null!=rowDatas && ro
%>
<%}//end for(int i=0;i<viewDatas.size()
%>
<%
}//end if(null !=viewDatas && viewDatas.size
%>
</table></div>