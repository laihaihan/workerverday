<%@ page language="java" import="java.util.*" pageEncoding="gb2312"%>
<% 



	if(null != query  && null != query.getQueryAdvancedItems() && query.getQueryAdvancedItems().size() != 0){							
		String advanceDivDisplay = request.getParameter("advanceDivDisplay");
		
		out.println("<form id=\"queryAdvancedForm\">");	
		
		if(StringUtils.isEmpty(advanceDivDisplay))
			out.println("<table id=\"queryAdvancedDiv\" class=\"table_advancedSearch\" style=\"display:none\" cellpadding=\"0\" cellspacing=\"0\">");			
		else
			out.println("<table id=\"queryAdvancedDiv\" class=\"table_advancedSearch\" style=\"display:\'\'\"  cellpadding=\"0\" cellspacing=\"0\">");
		
		String timeFormat="yyyy-MM-dd";
		QueryAdvancedItem advancedItem = null;
		for(int i=0;i<query.getQueryAdvancedItems().size();i++){								
			advancedItem =query.getQueryAdvancedItems().get(i);
			String itemNameEn = advPrefix + (String)advancedItem.getItemNameEn();
			String reqParam=null,reqParam_1 =null,reqParam_2,reqParam_Cn_ =null;
			inputHtml ="";
			reqParam = request.getParameter(itemNameEn);
			if(StringUtils.isEmpty(reqParam) ||reqParam.equals("null"))
				reqParam ="" ;
			reqParam_1 = request.getParameter(itemNameEn+"_1");
			if(StringUtils.isEmpty(reqParam_1)||reqParam_1.equals("null"))
				reqParam_1 ="" ;
			reqParam_2 = request.getParameter(itemNameEn+"_2");
			if(StringUtils.isEmpty(reqParam_2)||reqParam_2.equals("null"))
				reqParam_2 ="" ;
			reqParam_Cn_ = request.getParameter(itemNameEn+"_Cn_");
			if(StringUtils.isEmpty(reqParam_Cn_)||reqParam_Cn_.equals("null"))
				reqParam_Cn_ ="" ;
			if(advancedItem.isHasBegin()){									
				if(StringUtils.isNotEmpty(advancedItem.getDataType()) && ("04".equals(advancedItem.getDataType())  ||"05".equals(advancedItem.getDataType()))){										
					inputHtml=inputHtml+"&nbsp;从&nbsp;&nbsp;<input type=\"text\" value='"+reqParam_1+"' name='"+itemNameEn+"_1'  readOnly/>";
					inputHtml=inputHtml+"<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""+itemNameEn+"_1\",dateFmt:\""+timeFormat+"\"});' src='"+basePath+"/js/ucap/calendar/skin/datePicker.gif' width=16 align=absMiddle/>";
					inputHtml=inputHtml+"&nbsp;&nbsp;到&nbsp;&nbsp;<input type=\"text\" name='"+itemNameEn+"_2' value='"+reqParam_2+"' readOnly/>";
					if("05".equals(advancedItem.getDataType()))
						timeFormat=timeFormat+" HH:mm:ss";
					inputHtml=inputHtml+"<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""+itemNameEn+"_2\",dateFmt:\""+timeFormat+"\"});' src='"+basePath+"/js/ucap/calendar/skin/datePicker.gif' width=16 align=absMiddle/>";
				}else{											
					inputHtml=inputHtml+"&nbsp;从&nbsp;&nbsp;<input type=\"text\" value='"+reqParam_1+"' name='"+itemNameEn+"_1' />";
					inputHtml=inputHtml+"&nbsp;&nbsp;到&nbsp;&nbsp;<input type=\"text\" value='"+reqParam_2+"' name='"+itemNameEn+"_2' />";
				}			
			}else{
				if(StringUtils.isNotEmpty(advancedItem.getDataType()) && "20".equals(advancedItem.getDataType())){
					inputHtml=inputHtml+"<input type=\"hidden\" id='"+itemNameEn+"'  value='"+reqParam+"'  name='"+itemNameEn+"' />";
					inputHtml=inputHtml+"<input type=\"text\" id='"+itemNameEn+"_Cn_'  value='"+reqParam_Cn_+"'  name='"+itemNameEn+"_Cn_'  readOnly/>";
					inputHtml=inputHtml+"<input type='button' name='btnselect' class=\"button_public\"  value='选择' onclick=\""+"selectDataSD('"+advancedItem.getDataSource()+"',1,'"+itemNameEn+"')"+"\"/>";
				}else if(StringUtils.isNotEmpty(advancedItem.getDataType()) && "03".equals(advancedItem.getDataType())){
					inputHtml=inputHtml+"<select id='"+itemNameEn+"' name='"+itemNameEn+"'>"+advancedItem.getOptionValue()+"</select>";
					
				}else if( StringUtils.isNotEmpty(advancedItem.getDataType()) && "02".equals(advancedItem.getDataType())){
					inputHtml=inputHtml+"<input type=\"text\" id='"+itemNameEn+"'  value='"+reqParam+"'  name='"+itemNameEn+"' />";
					
					inputHtml=inputHtml+"<input type='button'   class=\"button_public\" name='btnselect' value='选择' onclick=\""+"selectView('"+advancedItem.getDataSource()+"','"+advancedItem.getColumnMap()+"','"+itemNameEn+"')"+"\"/>";
				}else{
					inputHtml=inputHtml+"<input type=\"text\" id='"+itemNameEn+"'  value='"+reqParam+"'  name='"+itemNameEn+"'/>";
				}
				if( StringUtils.isNotEmpty(advancedItem.getDataType()) && ("04".equals(advancedItem.getDataType())||"05".equals(advancedItem.getDataType()))){
					inputHtml=inputHtml+"<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""+itemNameEn+"\",dateFmt:\""+timeFormat+"\"});' src='/js/ucap/calendar/skin/datePicker.gif' width=16 align=absMiddle/>";
				}
			}
			
			if(tri%2==0){
				out.println("<tr>");
				out.println("<td class=\"advancedSearch_child_title\">"+advancedItem.getItemNameCn()+"</td>");
				if((query.getQueryAdvancedItems().size()<=(i+1)) || (Boolean)query.getQueryAdvancedItems().get(i+1).isHasBegin()){
					out.println("<td colspan='3'>");
					out.println(inputHtml);
					out.println("</td>");
					out.println("</tr>");
					tri=tri+2;
				}else{
					if(advancedItem.isHasBegin()){
						out.println("<td colspan='3'>");
						out.println(inputHtml);
						out.println("</td>");
						tri=tri+2;
					}else{
						out.println("<td>"+inputHtml+"</td>");
						tri=tri+1;
					}
				}
			}else{
				out.println("<td  class=\"advancedSearch_child_title\">"+advancedItem.getItemNameCn()+"</td>");
				out.println("<td>");
				out.println(inputHtml+"</td>");
				out.println("</tr>");
				tri=tri+1;
			}
			
		}
		
		if(tri%2!=0)
			out.println("</tr><tr><td colspan=\"4\" class=\"area_advancedSearch_button\"><input type='button'  class=\"button_public\" value='搜索' onclick=\"advanceQuery('"+viewId+"');\"/><input type='button'  class=\"button_public\" value='重置' onclick='advancedSeaReset()'/>&nbsp;</td></tr>");
		else
			out.println("<tr><td colspan=\"4\" class=\"area_advancedSearch_button\"><input type='button'  class=\"button_public\" value='搜索' onclick=\"advanceQuery('"+viewId+"');\"/><input type='button'  class=\"button_public\" value='重置' onclick='advancedSeaReset()'/>&nbsp;</td></tr>");
		
				
		
		out.println("</table>");		
		out.println("</form>");
		
	}	
	
%>