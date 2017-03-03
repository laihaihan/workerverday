<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.util.APIType"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.util.UDDIConfigUtils"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.component.UDDIClass"%>
<%
/**
 * Api类型页面
 * @author xhuatang@linewell.com
 * @since 2011-06-20
 */
{
%>
<div class="pageTitle">
    <h1><%= currentComponent.getName() %></h1>
    <div class="summary"> <p>　　<%= currentComponent.getDesc() %></p></div>
    <%
    if(getBtnStatus(ucapSession)){
    %>
    <button  style="position:absolute;right:30px;top:0;"        
      onclick="setStatus(this,{packageName:'<%= p %>'});"><%= getStatusBtnText(UDDIConfigUtils.getComponentStatus(configBean, p), "组件") %></button>
    <%
    }
    %>
</div>

   <%
   if(
      (null != currentType && currentType == APIType.Java)
      || null == currentType){
   %>
<div xmlns="">
  <div class="LW_CollapsibleArea_TitleDiv" style="position:relative;">
    <div><a href="javascript:void(0)" class="LW_CollapsibleArea_TitleAhref" title="折叠" id="javaApiCo" OnClick="javascript:coSection('javaApiCo','展开','折叠')"><img src="images/blank.gif" class="cl_CollapsibleArea_expanding LW_CollapsibleArea_Img" /><span class="LW_CollapsibleArea_Title">JAVA API</span></a><div class="LW_CollapsibleArea_HrDiv"><hr class="LW_CollapsibleArea_Hr" size="1" /></div></div>
    <%
    if(getBtnStatus(ucapSession)){
    %>
    <button  style="position:absolute;right:30px;top:0;"        
          onclick="setStatus(this,{packageName:'<%= p %>',type:'<%=APIType.Java %>'});"><%= getStatusBtnText(UDDIConfigUtils.getAPITypeStatus(configBean, p, APIType.Java), "API") %></button>
    <%
    }
    %>
  </div>
</div>     
<div class="sectionblock" id="javaApiCo_c"> 
     <dl class="authored">
     <%
     List<UDDIClass> listClassForJava = UDDIConfigUtils.getUDDIClassList(configBean, p, APIType.Java);
     for(UDDIClass item : listClassForJava){      
     %>
      <dt style="position:relative;">
        <span>
          <a href="index.jsp?p=<%= currentComponent.getPackageName() %>&tp=<%=APIType.Java %>&cl=<%= item.getClassName() %>"><%= item.getClassName() %>类(<%= item.getName() %>)</a>
        </span>
        <%
	    if(getBtnStatus(ucapSession)){
	    %>
        <button  style="position:absolute;right:30px;top:0;"        
          onclick="setStatus(this,{packageName:'<%= p %>',type:'<%=APIType.Java %>',className:'<%=item.getClassName() %>'});"><%= getStatusBtnText(UDDIConfigUtils.getClassStatus(configBean, p, APIType.Java, item.getClassName()), "类") %></button>
        <%
	    }
        %>
      </dt>
      <dd>
        <p>   
          <span class="sentence">　　<%= item.getDesc() %></span>
        </p>
      </dd>    
      <hr />
     <%
     }
     %>   
     </dl>
</div>     
   <%
   }
   if(
      (null != currentType && currentType == APIType.WebService)
      || null == currentType){
      List<UDDIClass> listClassForWebService = UDDIConfigUtils.getUDDIClassList(configBean, p, APIType.WebService);
      if(listClassForWebService.size() > 0){
    %>
<div xmlns="">
  <div class="LW_CollapsibleArea_TitleDiv" style="position:relative;">
    <div><a href="javascript:void(0)" class="LW_CollapsibleArea_TitleAhref" title="折叠" id="webServiceApiCo" OnClick="javascript:coSection('webServiceApiCo','展开','折叠')"><img src="images/blank.gif" class="cl_CollapsibleArea_expanding LW_CollapsibleArea_Img" /><span class="LW_CollapsibleArea_Title">WebService API</span></a><div class="LW_CollapsibleArea_HrDiv"><hr class="LW_CollapsibleArea_Hr" size="1" /></div></div>
    <%
    if(getBtnStatus(ucapSession)){
    %>
    <button  style="position:absolute;right:30px;top:0;"        
          onclick="setStatus(this,{packageName:'<%= p %>',type:'<%=APIType.WebService %>'});"><%= getStatusBtnText(UDDIConfigUtils.getAPITypeStatus(configBean, p, APIType.WebService), "API") %></button>
    <%
    }
    %>
  </div>
</div>     
<div class="sectionblock" id="webServiceApiCo_c">         
     <dl class="authored">
     <%     
     for(UDDIClass item : listClassForWebService){      
     %>
      <dt style="position:relative;">
        <span>
          <a href="index.jsp?p=<%= currentComponent.getPackageName() %>&tp=<%=APIType.Java %>&cl=<%= item.getClassName() %>"><%= item.getClassName() %>类(<%= item.getName() %>)</a>
        </span>
        <%
	    if(getBtnStatus(ucapSession)){
	    %>
        <button  style="position:absolute;right:30px;top:0;"        
          onclick="setStatus(this,{packageName:'<%= p %>',type:'<%=APIType.Java %>',className:'<%=item.getClassName() %>'});"><%= getStatusBtnText(UDDIConfigUtils.getClassStatus(configBean, p, APIType.WebService, item.getClassName()), "类") %>类</button>
        <%
	    }
        %>
      </dt>
      <dd>
        <p>   
          <span class="sentence">　　<%= item.getDesc() %></span>
        </p>
      </dd>    
      <hr />
     <%
     }//end for
     %>   
     </dl>
</div>     
     <%
     }//end if webservices api exists
   }//end if webservice api
   if(
      (null != currentType && currentType == APIType.JavaScript)
      || null == currentType){
      List<UDDIClass> listClassForJavaScript = UDDIConfigUtils.getUDDIClassList(configBean, p, APIType.JavaScript);
      if(listClassForJavaScript.size() > 0){
    %>
<div xmlns="">
  <div class="LW_CollapsibleArea_TitleDiv">
    <div><a href="javascript:void(0)" class="LW_CollapsibleArea_TitleAhref" title="折叠" id="javaScriptApiCo" OnClick="javascript:coSection('javaScriptApiCo','展开','折叠')"><img src="images/blank.gif" class="cl_CollapsibleArea_expanding LW_CollapsibleArea_Img" /><span class="LW_CollapsibleArea_Title">JavaScript API</span></a><div class="LW_CollapsibleArea_HrDiv"><hr class="LW_CollapsibleArea_Hr" size="1" /></div></div>
  </div>
</div>     
<div class="sectionblock" id="javaScriptApiCo_c"> 
     <dl class="authored">
     <%     
     for(UDDIClass item : listClassForJavaScript){      
     %>
      <dt style="position:relative;">
        <span>
          <a href="index.jsp?p=<%= currentComponent.getPackageName() %>&tp=<%=APIType.Java %>&cl=<%= item.getClassName() %>"><%= item.getClassName() %>类(<%= item.getName() %>)</a>
        </span>
      </dt>
      <dd>
        <p>   
          <span class="sentence">　　<%= item.getDesc() %></span>
        </p>
      </dd>    
      <hr />
     <%
     }//end for
     %>   
     </dl>
</div>     
    <%
    }//end if javascript api exists
  }//end if is javascript api
     %>
<%
}//end page
%>     
