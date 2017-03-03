<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.util.UDDIConfigUtils"%>
<div class="pageTitle">
    <h1>UDDI中心</h1>    
    <div class="summary"> <p>　　<%= configBean.getDesc() %></p></div>
</div>
    
<div xmlns="">
  <div class="LW_CollapsibleArea_TitleDiv">
    <div><a href="javascript:void(0)" class="LW_CollapsibleArea_TitleAhref" title="折叠" id="componentco" OnClick="javascript:coSection('componentco','展开','折叠')"><img src="images/blank.gif" class="cl_CollapsibleArea_expanding LW_CollapsibleArea_Img" /><span class="LW_CollapsibleArea_Title">系统加载的组件</span></a><div class="LW_CollapsibleArea_HrDiv"><hr class="LW_CollapsibleArea_Hr" size="1" /></div></div>
  </div>
</div>     
<div class="sectionblock" id="componentco_c"> 
 
  <dl class="authored">
     <%     
     for(UDDIComponent item : uDDIComponentlist){
       Component component = item.getComponent();       
     %>
      <dt style="position:relative;">
        <span>
          <a href="index.jsp?p=<%= component.getPackageName() %>"><%= component.getName() %></a>
        </span>
        <%
	    if(getBtnStatus(ucapSession)){
	    %>
        <button style="position:absolute;right:30px;top:0;" onclick="setStatus(this,{packageName:'<%= component.getPackageName() %>'});"><%= getStatusBtnText(UDDIConfigUtils.getComponentStatus(configBean, component.getPackageName()), "组件") %></button>
	    <%
	    }
	    %>
      </dt>
      <dd>
        <p>   
          <span class="sentence">　　<%= component.getDesc() %></span>
        </p>
        <hr />
      </dd>    
     <%
     }
     %>   
  </dl>
</div>