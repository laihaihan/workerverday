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
 		//out.println(" <a >��ҳ</a> ");     						 		
 	}else{
 		out.println("<input class=\"button_pageNumber first_disabled\" type=\"button\"/>");
 	}
 	if(currPage == 1){
 		//out.println("<a>��һҳ</a>");
 		out.println("<input class=\"button_pageNumber prev_disabled\" type=\"button\"/>");
 	}else{
 		out.println("<input onclick=\"initDBView(null,dbViewForm.viewUnid,'extrancon="+extrancon+"&categorycon="+categorycon+"&sort="+sort+"&dir="+dir+"&start="+((beforePage-1)*limit)+"',dbViewForm.isEdit,dbViewForm.formUnid);\" class=\"button_pageNumber prev\" type=\"button\"/>");
 		//out.println(" <a >��һҳ</a> ");
 	}
 	out.println("<span class=\"separator_pageNumber\"></span>");
 	out.println("�� <input class=\"input_pageNumber\" size=\"1\" value=\""+currPage+"\" /> ҳ ��"+pageNum+"ҳ");
 	out.println("<span class=\"separator_pageNumber\"></span>");
 	if(currPage == pageNum){
 		//out.println("<a>��һҳ</a> ");
 		out.println("<input class=\"button_pageNumber next_disabled\" type=\"button\"/>");
 	}else{
 		out.println("<input  onclick=\"initDBView(null,dbViewForm.viewUnid,'extrancon="+extrancon+"&categorycon="+categorycon+"&sort="+sort+"&dir="+dir+"&start="+(limit*(afterPage-1))+"',dbViewForm.isEdit,dbViewForm.formUnid);\" class=\"button_pageNumber next\" type=\"button\"/>");
 		//out.println("<a��һҳ</a> ");     						 	
 	}
 	if(currPage != pageNum){
 		out.println("<input onclick=\"initDBView(null,dbViewForm.viewUnid,'extrancon="+extrancon+"&categorycon="+categorycon+"&sort="+sort+"&dir="+dir+"&start="+(limit*(pageNum-1))+"',dbViewForm.isEdit,dbViewForm.formUnid);\" class=\"button_pageNumber last\" type=\"button\"/> ");
 		//out.println("<a >���һҳ</a> ");
 	}else{
 		//out.println("<a>���һҳ</a>");
 		out.println("<input class=\"button_pageNumber last_disabled\" type=\"button\"/> ");
 	} 	
 	out.println("<span class=\"onright\">��ʾ�� "+(start+1)+" ���� "+ (limit*(currPage-1) + currPageSize)  +" ����¼��һ�� "+total+" ��</span>	");					 	
  
 	out.println("</div></form>"); 					
}

%>