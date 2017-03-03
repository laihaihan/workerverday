<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@page import="com.linewell.ucap.platform.authorized.view.View"%>
<%@page import="com.linewell.ucap.admin.module.ViewWrapper"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.ucap.util.UcapRequest"%>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@page import="com.linewell.ucap.admin.build.wrapper.PortalBuild"%>
<%
/**
 * 数据库配置
 * @author cuangcong@linewell.com
 * @since 2011-12-03
 */
//获取应用系统的unid
//String appUnid = "475C4D7E257F5EAF7CCDF46AE0FE35BD";
//获取应用系统的unid
String appUnid = request.getParameter("appUnid");
//如果为空，则为非法访问，直接退出不做处理
if(StringUtils.isEmpty(appUnid)) return;
UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
List<View> viewList = ViewWrapper.getViewByAppUnid(appUnid,	ucapSession, ucapRequest);
PortalBuild pb =new PortalBuild();
//获取已生成过得视图频道的视图unid
String viewUnids=pb.getChannelViewUnidString(appUnid);
%>


<!DOCTYPE HTML>
<html>
  <head> 
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    
    <link href="../style/viewSelect.css" rel="stylesheet" type="text/css" />
  </head>
  <script type="text/javascript">
  //获取当前应用系统的所有视图，返回视图列表的id字符串
  function getSelectView(){
  	var checkBox = document.getElementsByName("chkBox");
	var viewIds = "";
  	if(checkBox){
  		for(var i=0;i<checkBox.length;i++){
  			if(checkBox[i].checked){
  				if("" == viewIds){
  					viewIds += checkBox[i].getAttribute("unid");
  				}else{
  					viewIds += "," + checkBox[i].getAttribute("unid");
  				}
  			}	
  		}
  	}
  	return viewIds;
  }
  function closeDiv(){
  	var viewSelect = document.getElementById("viewSelect");
  	viewSelect.style.display="none";
  } 
  </script>
<style>

</style>   
  <body>
<!-- 内容 -->
        <div class="popContent">        
            <ul class="popViewSel">
            <%
            if(null != viewList){
                for(View view:viewList){
            %>
                <li><input name="chkBox" <%if(viewUnids.indexOf(view.getUnid())>-1){%>checked="checked"<% } %>  type="checkbox" unid="<%=view.getUnid()%>" /><%=view.getDisplayName()%></li>           
            <%} }%> 
            </ul>
        </div>

  </body>
</html>
