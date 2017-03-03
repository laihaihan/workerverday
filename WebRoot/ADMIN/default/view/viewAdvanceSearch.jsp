<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucap.platform.authorized.view.query.Query"%>
<%@page import="com.linewell.ucap.platform.authorized.view.query.QueryAdvancedItem"%>
<%@page import="com.linewell.ucapx.view.ViewApi"%>
<%@page import="java.util.List"%>
<link rel="stylesheet" type="text/css" href="<%=userStylePath%>css/ucap.css"/>
<link rel="stylesheet" type="text/css" href="<%=userStylePath%>css/ext-all.css"/>
<link rel="stylesheet" type="text/css" href="<%=userStylePath%>css/ext-patch.css"/>

<% 
	/**
	 * 视图高级查询页面
	 * 
	 * @author llp@linewell.com,zhua@linewell.com
	 * 
	 * @since 2011-07-5
	 */
	 
	List<QueryAdvancedItem> advancedItemList =null;
	if(null != query){//获取高级查询字段列表
		advancedItemList = query.getQueryAdvancedItems();
	}
	if(null != query  && null != advancedItemList && advancedItemList.size() != 0){
		
		if(StringUtils.isEmpty(flag) || flag.equals("false")){
		%>	
			<table id="queryAdvancedDiv" name="queryAdvancedDiv" class="table_advancedSearch" style="display:none" cellpadding="0" cellspacing="0">				
		<%}else{
			%>
			<table id="queryAdvancedDiv" name="queryAdvancedDiv" class="table_advancedSearch" style="display:''" cellpadding="0" cellspacing="0">	
	
		<% }

		String timeFormat="yyyy-MM-dd";
		QueryAdvancedItem advancedItem = null;
		%>
			<tr>
		<%
		for(int i=0;i<advancedItemList.size();i++){
			advancedItem =advancedItemList.get(i);
			String itemNameEn = advancedItem.getItemNameEn();//字段英文名称
			String itemNameCn = advancedItem.getItemNameCn();//字段中文名称
			String inputHtml="";
			String reqParam = "",reqParam_begin = "",reqParam_end = "",reqParam_Cn_ = "";
			
			//如果有高级查询过，则保存其查询条件
			if(StringUtils.isNotEmpty(flag)){
				reqParam = request.getParameter(itemNameEn);
				reqParam_begin = request.getParameter(itemNameEn+"_begin"); //开始阶段值
				reqParam_end = request.getParameter(itemNameEn+"_end");//结束阶段值
				reqParam_Cn_ = request.getParameter(itemNameEn+"_Cn_");//中文值
			}
			
			if(advancedItem.isHasBegin()){//字段有起始阶段									
				if(StringUtils.isNotEmpty(advancedItem.getDataType()) && ("04".equals(advancedItem.getDataType())  ||"05".equals(advancedItem.getDataType()))){										
					inputHtml=inputHtml+"&nbsp;从&nbsp;&nbsp;<input type=\"text\" id ='"+itemNameEn+"_begin' name='"+itemNameEn+"_begin' value='"+reqParam_begin+"'  readOnly/>";
					inputHtml=inputHtml+"<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""+itemNameEn+"_begin\",dateFmt:\""+timeFormat+"\"});' src='' width=16 align=absMiddle/>";
					inputHtml=inputHtml+"&nbsp;&nbsp;到&nbsp;&nbsp;<input type=\"text\" id='"+itemNameEn+"_end' name='"+itemNameEn+"_end' value='"+reqParam_end+"'  readOnly/>";
					if("05".equals(advancedItem.getDataType())){
						timeFormat=timeFormat+" HH:mm:ss";
					}
					inputHtml=inputHtml+"<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""+itemNameEn+"_end\",dateFmt:\""+timeFormat+"\"});' src='' width=16 align=absMiddle/>";
				}else{											
					inputHtml=inputHtml+"&nbsp;从&nbsp;&nbsp;<input type=\"text\" id ='"+itemNameEn+"_begin'  name='"+itemNameEn+"_begin' value='"+reqParam_begin+"' />";
					inputHtml=inputHtml+"&nbsp;&nbsp;到&nbsp;&nbsp;<input type=\"text\" id='"+itemNameEn+"_end'  name='"+itemNameEn+"_end' value='"+reqParam_end+"' />";
				}			
			}// end if(advancedItem.isHasBegin()
			else{
				//通用选择框
				if(StringUtils.isNotEmpty(advancedItem.getDataType()) && "20".equals(advancedItem.getDataType())){
					inputHtml=inputHtml+"<input type=\"text\" id='"+itemNameEn+"'    name='"+itemNameEn+"' style='display:none' value='"+reqParam+"' readOnly/>";
					inputHtml=inputHtml+"<input type=\"text\" id='"+itemNameEn+"_Cn_'    name='"+itemNameEn+"_Cn_' value='"+reqParam_Cn_+"' readOnly/>";						
					inputHtml=inputHtml+"<input type='button' name='btnselect' class=\"button_public\"  value='选择' onclick=\""+"selectDataSD('"+advancedItem.getDataSource()+"',1,'"+itemNameEn+"')"+"\"/>";
				}
				//下拉选择框
				else if(StringUtils.isNotEmpty(advancedItem.getDataType()) && "03".equals(advancedItem.getDataType())){
					
					String options = advancedItem.getOptionValue();
					if(StringUtils.isNotEmpty(reqParam)){
						options = options.replace("'"+reqParam+"'","'"+reqParam+"' selected");
					}
					inputHtml=inputHtml+"<select id='"+itemNameEn+"' name='"+itemNameEn+"'>"+options+"</select>";
					
				}//end else if(StringUtils.isNotEmpty
				//视图选择框
				else if( StringUtils.isNotEmpty(advancedItem.getDataType()) && "02".equals(advancedItem.getDataType())){
					inputHtml=inputHtml+"<input type=\"text\" id='"+itemNameEn+"'    name='"+itemNameEn+"' value='"+reqParam+"'  />";
					
					inputHtml=inputHtml+"<input type='button'   class=\"button_public\" name='btnselect' value='选择' onclick=\""+"selectView('"+advancedItem.getDataSource()+"','"+advancedItem.getColumnMap()+"','"+itemNameEn+"')"+"\"/>";
				}else{//普通输入框
					inputHtml=inputHtml+"<input type=\"text\" id='"+itemNameEn+"'    name='"+itemNameEn+"' value='"+reqParam+"'/>";
				}
				//日期选择框
				if( StringUtils.isNotEmpty(advancedItem.getDataType()) && ("04".equals(advancedItem.getDataType())||"05".equals(advancedItem.getDataType()))){
					inputHtml=inputHtml+"<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""+itemNameEn+"\",dateFmt:\""+timeFormat+"\"});' src='/js/ucap/calendar/skin/datePicker.gif' width=16 align=absMiddle/>";
				}
			} //end else
			
			if(0==(i+1)%2){
				if(0==i){
					%>
					<td class="advancedSearch_child_title"><%=itemNameCn%></td><td><%=inputHtml%></td>
					<%
				}else{
			%>
					<td class="advancedSearch_child_title"><%=itemNameCn%></td><td><%=inputHtml%></td></tr>
			<%
				}
			}// end if(0==(i+1)%2)
			else{
			%>
			 <td class="advancedSearch_child_title"><%=itemNameCn%></td><td><%=inputHtml%></td>
		<%} 
		}//end 	for(int i=0;i<advancedItemList.size()
	%>
	<tr><td colspan="4" class="area_advancedSearch_button"><input type='button'  class="button_public" value='搜索' onclick="searchObject.advanceSearch()" /><input type='button'  class="button_public" value='重置' onclick="searchObject.resetSearch()"

	/>&nbsp;</td></tr>
		</table>
<%} //end page	%>