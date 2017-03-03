<%@ page language="java" import="java.util.*" pageEncoding="GB2312"%>
<% 
	     							 		
	rqJson ="{\"action\":\"getData\",\"rand\":\""+ Math.random() +"\",\"type\":\""+type+"\",\"viewId\":\""+viewId+"\"";
			 		
			 		
	if(limit !=0)
		rqJson = rqJson + ",\"limit\":\""+limit+"\",\"start\":\""+start+"\"";
	if(StringUtils.isNotEmpty(extrancon))
		rqJson = rqJson + ",\"extracon\":\"" + extrancon +"\"";
	
	if(StringUtils.isNotEmpty(categorycon))
		rqJson = rqJson + ",\"categorycon\":\"" + categorycon +"\"";
	
	
	
	if(StringUtils.isNotEmpty(sort)){
		rqJson = rqJson + ",\"sort\":\"" + sort +"\"";
		if(StringUtils.isNotEmpty(dir))
			rqJson = rqJson + ",\"dir\":\"" + dir +"\"";
		else
			rqJson = rqJson + ",\"dir\":\"ASC\"";
	}
			 		
	rqJson = rqJson + "}";										
	
	setQueryString = "type="+type+"&action="+action+"&rand="+ Math.random() +"&viewId="+viewId+"";
															
	ur.setParameterJson(rqJson);
	
	ur.setQueryString(setQueryString);
	IUcapAction iAction = new ViewAction();
	StringBuffer  getData = (StringBuffer)iAction.execute(ur);
	getData.append("");
	String getDatas = getData.toString();
	
	JSONObject jsonObj = JSONObject.fromObject(getDatas);
				 	
				 	
	List<Map<String,Object>> jsonObjData = (List<Map<String,Object>>)jsonObj.get("root");
	
	viewItems =view.getViewItems();

	if(null!=jsonObjData && jsonObjData.size()>0){
		out.println("<div id=\"dataDiv\" style= \"overflow-x:no ;overflow-y:auto ; padding:0; margin:0; position: absolute; top:85px; border:0; left:0;right:0; bottom:25px; \" onscroll=\"document.getElementById( 'headerDiv').scrollLeft=scrollLeft\">");
		out.println("<table id=\"dataViewTable\"  class=\"table_data\"  cellpadding= \"0\"  cellspacing= \"0\"> ");
		for(int i=0;i<jsonObjData.size();i++){
			Map<String,Object> rowDatas = (Map<String,Object>)jsonObjData.get(i);
			if(null!=rowDatas && rowDatas.size()>0){
				if(null!=viewItems && viewItems.size()>0)
					if(i%2 ==0)
						out.println("<tr >");
					else
						out.println("<tr class=\"tr_even\" >");
					String temUnid="";
				
 				for(int j=0;j<viewItems.size();j++){
 					if(null ==viewItems.get(j))continue;   
 					ViewItem viewItem=viewItems.get(j);
	 				if(j == 0){
	 					temUnid = (String)rowDatas.get(viewItem.getItemNameEn());
	 					out.println("<td width=\"18\" id=\"isCheckboxShow\" ><input type=checkbox value="+temUnid+" name=check_key></td>");
	 					continue;
	 				}
	 				
 					if(viewItem.isDisplay()){
 						Object displayValue= "&nbsp;";
 						displayValue = rowDatas.get(viewItem.getItemNameEn());
 						
 						if(null == displayValue || "".equals(displayValue) || "null".equals(displayValue)){
 							displayValue = "&nbsp;";
 						}
 						out.println("<td style=\"width:"+mapColWidth.get(viewItem.getItemNameEn())+";\"  ondblclick=\"dbViewForm.openDocument("+i+")\"  >"+displayValue+"</td>");
 						   							 						
 					}
	 				
	 			}
	 			out.println("<Td>&nbsp;</td>");
					out.println("</tr>");
			}
		}
		out.println("</tr></table><div>");
	}
		 %>