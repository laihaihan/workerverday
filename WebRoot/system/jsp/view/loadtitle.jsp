<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<% 
     							 
	Boolean  flag = null;
	String widthType="px";
	List<ViewItem> viewItems =view.getViewItems();
	Map<String,String> mapColWidth =new HashMap<String,String>();
	if(null != viewItems && viewItems.size()>0){
		int j=0;
		out.println("<div style=\"overflow:hidden; width:100%\" id=\"headerDiv\">");
		out.println("<table  width= \"100%\"  class=\"table_title\"  border= \"0\"  cellpadding= \"0\"  cellspacing= \"0\" > ");
		out.println("<tr  style=\"text-align:left;\"> ");
		for(int i = 0;i <viewItems.size();i++){  							 				
			ViewItem viewItem = viewItems.get(i);		 				
			if(j == 0){
				
				out.print("<td width=\"18\" id=\"isCheckboxShow\" ><input type=checkbox value=all onclick=\"selectedChangeAll();\" id=\"selectedAllChange\" name=\"selectedAllChange\"></td>");
				j++;
				continue;
			}
			
			if(StringUtils.isEmpty(viewItem.getWidthType())){
				widthType = "px";
			}else{
				if("01".equals(viewItem.getWidthType()))
					widthType = "px";
				else
					widthType = "%";
			}
			flag = viewItem.isDisplay();
			if(flag){
				mapColWidth.put(viewItem.getItemNameEn(),viewItem.getWidth()+widthType);
				if(StringUtils.isNotEmpty(viewItem.getItemNameEn()) && viewItem.getItemNameEn().equals(sort) && "ASC".equalsIgnoreCase(dir))
					out.println("<td style=\"width:"+viewItem.getWidth()+widthType+";\" ><a onclick=\"initDBView(null,dbViewForm.viewUnid,'extrancon="+extrancon+"&categorycon="+categorycon+"&sort="+sort+"&dir=DESC&start="+start+"',dbViewForm.isEdit,dbViewForm.formUnid);\">"+viewItem.getDisplayName()+"</a></td>");  
				else																					
					out.println("<td style=\"width:"+viewItem.getWidth()+widthType+";\" ><a onclick=\"initDBView(null,dbViewForm.viewUnid,'extrancon="+extrancon+"&categorycon="+categorycon+"&sort="+viewItem.getItemNameEn()+"&dir=ASC&start="+start+"',dbViewForm.isEdit,dbViewForm.formUnid);\">"+viewItem.getDisplayName()+"</a></td>");     							 						
			}
			
		}
		out.println("<td>&nbsp;</td>");
		out.println("<td width=10px>&nbsp;</td>");
		out.println("</tr></table>");
		out.println("</div>");
		
	}
%>