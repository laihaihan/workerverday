<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.component.Function"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.util.UDDIConfigUtils"%>

<div class="pageTitle">
    <h1><%= currentClass.getClassName() %>类(<%= currentClass.getName() %>)</h1>
    <div class="summary"> <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;需引用的类：<%=currentComponent.getPackageName() %>.<%= currentClass.getClassName() %></p></div>
    <div class="summary"> <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<%= currentClass.getDesc() %></p></div>
    <%
    if(getBtnStatus(ucapSession)){
    %>
    <button  style="position:absolute;right:30px;top:0;"        
      onclick="setStatus(this,{packageName:'<%= p %>',type:'<%= tp %>',className:'<%= cl %>'});"><%= getStatusBtnText(UDDIConfigUtils.getClassStatus(configBean, p, currentType, cl),"类") %></button>
    <%
    }
    %>
</div>

<div xmlns="">
  <div class="LW_CollapsibleArea_TitleDiv">
    <div><a href="javascript:void(0)" class="LW_CollapsibleArea_TitleAhref" title="折叠" id="functionsco" OnClick="javascript:coSection('functionsco','展开','折叠')"><img src="images/blank.gif" class="cl_CollapsibleArea_expanding LW_CollapsibleArea_Img" /><span class="LW_CollapsibleArea_Title">方法集</span></a><div class="LW_CollapsibleArea_HrDiv"><hr class="LW_CollapsibleArea_Hr" size="1" /></div></div>
  </div>
</div>     
<div class="sectionblock" id="functionsco_c">
	<table class="members" id="memberList" xmlns="http://www.w3.org/1999/xhtml">
	  <tr>
	   <th>名称</th>
	   <th>说明</th>
	   <%if(getBtnStatus(ucapSession)){ %><th style='width:70px'>操作</th><%} %>
	  </tr>
	  <%
	  List<Function> fnListForPage = UDDIConfigUtils.getFunctionList(configBean, p, currentType, cl);
	  for(Function item : fnListForPage){
	  %>
	  <tr>
	   <td>
	    <a href="index.jsp?p=<%= currentComponent.getPackageName() %>&tp=<%= currentType%>&cl=<%= cl %>&fn=<%= item.getName()%>"><%= item.getName() %></a>
	   </td>
	   <td><%= item.getDesc() %></td>
	   <%
	    if(getBtnStatus(ucapSession)){
	    %>
	   <td>
	   
	      <button onclick="setStatus(this,{packageName:'<%= p %>',type:'<%= tp %>',className:'<%= cl %>',fnName:'<%= item.getName() %>'});"><%= getStatusBtnText(UDDIConfigUtils.getFunctionStatus(configBean, p, currentType, cl, item.getName()), "") %></button>
	    
	   </td>
	   <%} %>
	  </tr>
	  <%
	  }
	  %>
	</table>    
</div>	
