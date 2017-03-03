<%@ page language="java" import="java.util.*" pageEncoding="gb2312"%>
<% 
int  total = (Integer)jsonObj.get("totalProperty");
int pageNum =0;
int currPage=0;
int currPageSize =0;

if(pageSize != 0){
 	pageNum =total / pageSize + 1 ;
 	currPage = start / pageSize +1 ;
 	if((start + pageSize)> total){
 		currPageSize =total - start ;
 	}else{
 		currPageSize = pageSize;
 	}
 	
 	int beforePage = currPage -1 ;
 	if(beforePage<0){
 		beforePage =0;
 	}
 	
 	int afterPage = currPage + 1 ;
 		out.println("<form id=pageForm>");
 	out.println("<div class=\"area_pageNumber\" >");     						 	
 
 	
 	if(currPage !=1){
 		out.println("<input class=\"button_pageNumber first\" onclick=\"initDBView(null,dbViewForm.viewUnid,'extrancon="+extrancon+"&categorycon="+categorycon+"&sort="+sort+"&dir="+dir+"&start=0',dbViewForm.isEdit,dbViewForm.formUnid);\" type=\"button\"/>");
 		//out.println(" <a >首页</a> ");     						 		
 	}else{
 		out.println("<input class=\"button_pageNumber first_disabled\" type=\"button\"/>");
 	}
 	if(currPage == 1){
 		//out.println("<a>上一页</a>");
 		out.println("<input class=\"button_pageNumber prev_disabled\" type=\"button\"/>");
 	}else{
 		out.println("<input onclick=\"initDBView(null,dbViewForm.viewUnid,'extrancon="+extrancon+"&categorycon="+categorycon+"&sort="+sort+"&dir="+dir+"&start="+((beforePage-1)*limit)+"',dbViewForm.isEdit,dbViewForm.formUnid);\" class=\"button_pageNumber prev\" type=\"button\"/>");
 		//out.println(" <a >上一页</a> ");
 	}
 	out.println("<span class=\"separator_pageNumber\"></span>");
 	out.println("第 <input class=\"input_pageNumber\" size=\"1\" value=\""+currPage+"\" /> 页 共"+pageNum+"页");
 	out.println("<span class=\"separator_pageNumber\"></span>");
 	if(currPage == pageNum){
 		//out.println("<a>下一页</a> ");
 		out.println("<input class=\"button_pageNumber next_disabled\" type=\"button\"/>");
 	}else{
 		out.println("<input  onclick=\"initDBView(null,dbViewForm.viewUnid,'extrancon="+extrancon+"&categorycon="+categorycon+"&sort="+sort+"&dir="+dir+"&start="+(limit*(afterPage-1))+"',dbViewForm.isEdit,dbViewForm.formUnid);\" class=\"button_pageNumber next\" type=\"button\"/>");
 		//out.println("<a下一页</a> ");     						 	
 	}
 	if(currPage != pageNum){
 		out.println("<input onclick=\"initDBView(null,dbViewForm.viewUnid,'extrancon="+extrancon+"&categorycon="+categorycon+"&sort="+sort+"&dir="+dir+"&start="+(limit*(pageNum-1))+"',dbViewForm.isEdit,dbViewForm.formUnid);\" class=\"button_pageNumber last\" type=\"button\"/> ");
 		//out.println("<a >最后一页</a> ");
 	}else{
 		//out.println("<a>最后一页</a>");
 		out.println("<input class=\"button_pageNumber last_disabled\" type=\"button\"/> ");
 	} 	
 	out.println("<span class=\"onright\">显示第 "+(start+1)+" 条到 "+ (limit*(currPage-1) + currPageSize)  +" 条记录，一共 "+total+" 条</span>	");					 	
  
 	out.println("</div></form>"); 					
}

%>