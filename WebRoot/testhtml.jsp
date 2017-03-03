<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.file.AppFileManager"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.file.AppFile"%>

<%
request.setAttribute("path", request.getContextPath());
AppFileManager appFileManager = new AppFileManager();
List<AppFile> appList = appFileManager.doFindListByCondition(" file_ext = 'jpg'",new Object[0]);

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>图片浏览</title>
<LINK rel=stylesheet type=text/css href="${path}/core/js/slide/css/lrtk.css">
<script type=text/javascript src="${path}/core/js/slide/js/jquery.js"></script>
<script type=text/javascript src="${path}/core/js/slide/js/slide.js"></script>
</head>
<body style="text-align:center"> 
<DIV style="HEIGHT: 560px; PADDING-TOP: 20px" class="wrap picshow"> 
  <!--大图轮换区--> 
  <DIV id=picarea> 
    <DIV style="MARGIN: 0px auto; WIDTH: 774px; HEIGHT: 436px; OVERFLOW: hidden"> 
      <DIV style="MARGIN: 0px auto; WIDTH: 774px; HEIGHT: 436px; OVERFLOW: hidden" id=bigpicarea> 
        <P class=bigbtnPrev><SPAN id=big_play_prev></SPAN></P> 
        <%
        for(int i = 0 ; i < appList.size() ; i ++){
        	AppFile appFile = (AppFile)appList.get(i);
        %>
        <DIV id=image_xixi-0<%=i+1%> class=image><A target=_blank><IMG alt="" src="${path}/showimg.jsp?unid=<%=appFile.getFile_unid() %>" width=772 height=434></A> 
          <DIV class=word> 
            <H3><%=appFile.getFile_name()%></H3> 
          </DIV> 
        </DIV> 	
        <%
        }
        %>
        
        
        <P class=bigbtnNext><SPAN id=big_play_next></SPAN></P> 
      </DIV> 
    </DIV> 
    <DIV id=smallpicarea> 
      <DIV id=thumbs> 
        <UL> 
          <LI class="first btnPrev"><IMG id=play_prev src="${path}/core/js/slide/images/left.png"></LI> 
	        <%
	        String liClass = "slideshowItem";
	        for(int i = 0 ; i < appList.size() ; i ++){
	        	AppFile appFile = (AppFile)appList.get(i);
	        	if(appList.size()-1 == i){
	        		liClass = "last_img slideshowItem";
	        	}
	        	
	        %>
          	<LI class=<%=liClass%>> <A id=thumb_xixi-0<%=i+1%> href="#"><IMG src="${path}/showimg.jsp?unid=<%=appFile.getFile_unid()%>" width=90 height=60></A> </LI> 
	        <%
	       
	        }
	        %> 
          <LI class="last btnNext"><IMG id=play_next src="${path}/core/js/slide/images/right.png"></LI> 
        </UL> 
      </DIV> 
    </DIV> 
  </DIV> 
  <SCRIPT>
var target = ["xixi-01","xixi-02","xixi-03","xixi-04","xixi-05","xixi-06","xixi-07"];
</SCRIPT> 
</DIV> 

</body>
</html>
