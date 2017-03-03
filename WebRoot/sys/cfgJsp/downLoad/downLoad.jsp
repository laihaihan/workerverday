<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	<script type="text/javascript">
        function downLoad(){
            var url = '<%=response.encodeURL(request.getParameter("url").replaceAll("\\\\","/")) %>';
            window.location.href = url;
        }        
    </script>
  </head>
  
  <body onload="downLoad();">

  </body>
</html>
