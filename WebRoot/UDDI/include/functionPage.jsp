<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.component.Function"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.util.UDDIConfigUtils"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.component.Param"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.component.UDDIReturn"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.component.Example"%>
<%@page import="org.apache.commons.lang.StringUtils"%>

  <%

  Function fnForPage = UDDIConfigUtils.getFunction(configBean, p, currentType, cl, fn);
  if(null != fnForPage){
  %>
<div class="pageTitle">
    <h1><%= fnForPage.getName() %>方法</h1>
    <div class="summary"> <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;需引用的类：<%=currentComponent.getPackageName() %>.<%= currentClass.getClassName() %></p></div>
    <div class="summary"> <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<%= fnForPage.getDesc() %></p></div>
    <%
    if(getBtnStatus(ucapSession)){
    %>
    <button  style="position:absolute;right:30px;top:0;"        
      onclick="setStatus(this,{packageName:'<%= p %>',type:'<%= tp %>',className:'<%= cl %>',fnName:'<%= fn %>'});"><%= getStatusBtnText(UDDIConfigUtils.getFunctionStatus(configBean, p, currentType, cl, fn),"") %></button>
    <%
    }
    %>
</div>
  <%
  List<Param> paramListForFn = UDDIConfigUtils.getParamList(configBean, p, currentType, cl, fn);
  UDDIReturn  returnObj = UDDIConfigUtils.getReturn(configBean, p, currentType, cl, fn);
  if((null != paramListForFn && paramListForFn.size() > 0) || null != returnObj){    
  %>
<div xmlns="">
  <div class="LW_CollapsibleArea_TitleDiv">
    <div><a href="javascript:void(0)" class="LW_CollapsibleArea_TitleAhref" title="折叠" id="fnParamsco" OnClick="javascript:coSection('fnParamsco','展开','折叠')"><img src="images/blank.gif" class="cl_CollapsibleArea_expanding LW_CollapsibleArea_Img" /><span class="LW_CollapsibleArea_Title">语法</span></a><div class="LW_CollapsibleArea_HrDiv"><hr class="LW_CollapsibleArea_Hr" size="1" /></div></div>
  </div>
</div>     
<div class="sectionblock" id="fnParamsco_c">
  <%
  //如果存在参数
  if(null != paramListForFn && paramListForFn.size() > 0){
  %>
	  <h4 class="subHeading">参数</h4>
	  <dl> 
	   <%
	   for(Param item : paramListForFn){
	   %>
	    <dt> 
	      <span class="parameter"><%= item.getName() %></span> 
	    </dt> 
	    <dd class="paramDesc">
	      <b>类型：</b><%= item.getType() %><br/>
	     <%= item.getDesc() %>
	    </dd>
	   <%
	   }
	   %>
	  </dl>
  <%
  }//如果存在参数 end
  //如果返回值不为空
  if(null != returnObj){
  %>
  <h4 class="subHeading">返回值</h4>
  <div>
    <b>类型：</b><%= returnObj.getType() %><br/>
       <%= returnObj.getDesc() %>
  </div>
  <%
  }//如果返回值不为空 end
  %>
</div>
  <%    
  }
  %>
 
  
  <%
  Example exampleForFn = fnForPage.getExample();
  if(null != exampleForFn){
  %>
<div xmlns="">
  <div class="LW_CollapsibleArea_TitleDiv">
    <div><a href="javascript:void(0)" class="LW_CollapsibleArea_TitleAhref" title="折叠" id="exampleco" OnClick="javascript:coSection('exampleco','展开','折叠')"><img src="images/blank.gif" class="cl_CollapsibleArea_expanding LW_CollapsibleArea_Img" /><span class="LW_CollapsibleArea_Title">示例</span></a><div class="LW_CollapsibleArea_HrDiv"><hr class="LW_CollapsibleArea_Hr" size="1" /></div></div>
  </div>
</div>     
<div class="sectionblock" id="exampleco_c">
  <p><%= exampleForFn.getDesc() %></p>
  <p>java <span onclick="copyCode('java')"  style='cursor:pointer'>复制代码</span></p>
  <table>
    <tr>
      <td id="java"><%= exampleForFn.getCode() %></td>
    </tr>
  </table>
  <%
  		
  		if(StringUtils.isNotEmpty(exampleForFn.getJspCode())&&StringUtils.isNotEmpty(exampleForFn.getJspCode().trim())){
  			String jspCode=exampleForFn.getJspCode().replaceAll("<%","&lt;%").replaceAll("%\\>","%&gt;");
  			%>
  				  <p>jsp <span onclick="copyCode('jsp')" style='cursor:pointer'>复制代码</span></p>
				  <table>
				    <tr>
				      <td id="jsp"><%= jspCode%></td>
				    </tr>
				  </table>
  			<%
  		}
  %>
  <%
  if(StringUtils.isNotEmpty(exampleForFn.getResult())&&StringUtils.isNotEmpty(exampleForFn.getResult().trim())){
	  %>
	  		  <p>执行结果</p>
			  <table>
			    <tr>
			      <td><%= exampleForFn.getResult() %></td>
			    </tr>
			  </table>
	  <%
  }
  %>

</div>
  <%
  } 
  %>
  
  <%
  }
  %>

