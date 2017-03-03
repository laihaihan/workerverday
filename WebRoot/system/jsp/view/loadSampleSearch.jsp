<%@ page language="java" import="java.util.*" pageEncoding="gb2312"%>
<% 
						
		String inputHtml ="",html="";
		int tri = 0;
		Query query = view.getQuery() ;
		QuerySimpleItem querySimpleItem =null;
	
		if(null!=query && (null != query.getQuerySimpleItems() || null !=query.getQueryAdvancedItems())){
			out.println("<div id=\"area_searchBar\" class=\"area_searchBar\">");
			out.println("<div class=\"onright\">");
			out.println("<form id=\"querySampleForm\">");
			if(null != query.getQuerySimpleItems()){
				
				out.println("<div class=\"icon_search\"></div>");
				String keyword = request.getParameter("keyword");	
				if(StringUtils.isEmpty(keyword) ||"ÇëÊäÈëËÑË÷¹Ø¼ü×Ö".equals(keyword))														
					out.println("ËÑË÷£º<input name=\"keyword\" class=\"searchinputbox\"  type=\"text\" id=\"keyword\" onmousedown=\"if(this.value=='ÇëÊäÈëËÑË÷¹Ø¼ü×Ö') this.value='';\" value='ÇëÊäÈëËÑË÷¹Ø¼ü×Ö' size='20' />");
				else
					out.println("ËÑË÷£º<input name=\"keyword\"  class=\"searchinputbox\" type=\"text\" id=\"keyword\" value='"+keyword+"' size='20' />");
					
				out.println("ÔÚ <select name=\"simpleSearchSelect\" id='simpleSearchSelect'>");
				out.println("<option value='0'>ÇëÑ¡ÔñËÑË÷·¶Î§</option>");
				String simpleSearchSelect =request.getParameter("simpleSearchSelect");							
				
				for(int i = 0 ;i< query.getQuerySimpleItems().size();i++){
					querySimpleItem = query.getQuerySimpleItems().get(i);
					if(StringUtils.isNotEmpty(querySimpleItem.getItemNameEn()) && querySimpleItem.getItemNameEn().equals(simpleSearchSelect))
						out.println("<option value='"+querySimpleItem.getItemNameEn()+"' selected>"+querySimpleItem.getItemNameCn()+"</option>");
					else
						out.println("<option value='"+querySimpleItem.getItemNameEn()+"'>"+querySimpleItem.getItemNameCn()+"</option>");
				}
				out.println("</select>");
				out.println("<input type=\"button\" value=\"ËÑË÷\" class=\"button_public\"  id=\"simpleSearch\"  onclick=\"sampleQuery('"+viewId+"');\">");
			}
			if(null != query.getQueryAdvancedItems() && query.getQueryAdvancedItems().size()>0){
				out.println("<input type=\"button\" class=\"button_public\"  id=\"advancedSearch\" onclick=\"changeAdvancedDivDisplay();\" value=\"¸ß¼¶ËÑË÷\" />");
			}
			out.println("</form>");
			out.println("</div>");	
			out.println("</div>");	
		}
		
					
%>