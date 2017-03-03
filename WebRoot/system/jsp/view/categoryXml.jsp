<%@ page language="java" contentType="text/xml; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@ page import="java.util.*"%>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@page import="com.linewell.ucap.util.UcapRequest"%>
<%@page import="com.linewell.ucap.action.ViewAction"%>
<%@page import="com.linewell.ucap.action.base.IUcapAction"%>
<%@page import="net.sf.json.JSONArray"%>


<%	
	response.setContentType("text/xml");	
	UcapRequest ur = UcapRequestWebManager.requestToUcap(request);
	
	IUcapAction iAction = new ViewAction();

	String viewId = request.getParameter("viewId");
	
	String itemName =request.getParameter("itemName");

	String conn=request.getParameter("conn");
	
	String node = request.getParameter("node");
	
	String rqJson = "{\"rand\":\""
							+ Math.random()
							+ "\",\"action\":\"getCategory\",\"type\":\"getView\",\"viewId\":\""+viewId
							 + "\",\"itemName\":\""+itemName
							 +"\",\"conn\":\""+conn+"\",\"node\":\""+node+"\"}";
							 
	String queryString = "type=getView&action=getCategory&viewId="+viewId+"&itemName="+itemName+"&conn="+conn;
	ur.setParameterJson(rqJson);
	ur.setQueryString(queryString);
	
	Object getCategory = (String) iAction.execute(ur);
	
	if(null == getCategory || "".equals(getCategory)){
		out.println("<tree><tree text=\"无\" /></tree>");
		return;
	}
	JSONArray cateArr = JSONArray.fromObject(getCategory);

	if (null != cateArr && cateArr.size() > 0) {
       	out.println("<tree>"); 
       	String temConn ="";
       int j=0;
       Object textTemp="";
		for (int i = 0; i < cateArr.size(); i++) {
			Map<String, Object> cateValueMap = (Map<String, Object>) cateArr.get(i);	
			
				String nodeValue=cateValueMap.get("value").toString();
				String subItemName=cateValueMap.get("name").toString();
				System.out.println("subItemName="+subItemName);
				if(null==conn||""==conn){
					temConn="~!@DB@!~"+subItemName+"~!@E@!~~!@0~!@5~!@CL@!~"+nodeValue+"~!@E@!~";
				}else{
					temConn=conn + "~!@AND@!~"+"~!@DB@!~"+subItemName+"~!@E@!~~!@0~!@5~!@CL@!~"+nodeValue+"~!@E@!~";
				}
				
				if(null == cateValueMap.get("text") || "".equals(cateValueMap.get("text"))){
					textTemp =  "空";
				}else
					textTemp =  cateValueMap.get("text");
			if (!(Boolean)cateValueMap.get("leaf")){	
				out.println("<tree text=\""+textTemp+"\" src=\"categoryXml.jsp?viewId="+viewId+"&amp;node="+cateValueMap.get("id")+"&amp;itemName="+subItemName+"&amp;conn="+temConn+"\" action=\"javascript:reloadDataView('"+conn+"')\" />");
			} else {
				out.println("<tree text=\""+textTemp+"\" action=\"javascript:reloadDataView('"+conn+"')\" />");
			}
			j++;
		}
		
		out.println("</tree>");
	}
%>

