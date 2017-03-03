<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.util.APIType"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.util.UDDIConfigUtils"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.main.UDDIComponent"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.component.Component"%>
<%@page import="com.linewell.ucapx.redevelop.uddi.bean.component.UDDIClass"%>
<%
/**
 * 导航页面
 * @author xhuatang@linewell.com
 * @since 2011-06-20
 */
{
%>
  <!-- navigation begin -->
  <div class="navigation">
    <!-- searchContainer begin --> 
    <div class="searchcontainer">
    </div>
    <!-- searchContainer end --> 
    
    <!-- navContainer begin --> 
    <div class="navContainer">
     <!-- nav begin -->
     <div class="nav">
     
       <!-- toclevel0 begin  -->
       <div class="toclevel0 ancestry">        
       
	       <!-- current begin -->
	       <div class="clip5x9 nav_root">
	         <img src="images/common.png" class="cl_nav_bullet" />
	       </div>
	       <%
	       String rootDivClass = "nav_div_currentroot";
	       //如果为UDDI中心一个等级
	       if(0 == uddiLevel){
	         rootDivClass = "nav_div_currentroot current";
	       }//end if
	       %>
	       <div class="<%= rootDivClass %>">
	         <a href="index.jsp">UDDI中心</a>
	       </div>
	       <!-- current end -->
	       
	       <%	       
	       String imgDivClass = "";
	       String imgClass    = "";
	       //如果是包类型
	       if(uddiLevel > 0){
	         imgDivClass = "clip13x9 nav_dots";
           imgClass = "cl_nav_dots";
           rootDivClass = "nav_div_currentroot current";
           //如果有类的参数，表明有三级
           if(uddiLevel > 1){
             imgDivClass = "clip5x9 nav_arrows";
             imgClass = "cl_nav_arrow";
             rootDivClass = "nav_div_currentroot";
           }
           
	       %>
	       <div class="<%= imgDivClass %>">
		       <img src="images/common.png" class="<%= imgClass %>" alt="" />
		     </div>
    
         <div class="<%= rootDivClass %>">
           <a href="index.jsp?p=<%= currentComponent.getPackageName() %>" title="<%= currentComponent.getName() %>"><%= currentComponent.getName() %></a>
         </div>
	       <%
	       }	      
	       //如果是功能类型
	       if(uddiLevel > 1){
           imgDivClass = "clip13x9 nav_dots";
           imgClass = "cl_nav_dots";
           rootDivClass = "nav_div_currentroot current";
           //如果有类的参数，表明有三级
           if(uddiLevel > 2){
             imgDivClass = "clip5x9 nav_arrows";
             imgClass = "cl_nav_arrow";
             rootDivClass = "nav_div_currentroot";
           }
           String typeName = "Java API";
           if(tp.equals(String.valueOf(APIType.WebService))){
              typeName = "WebService API";
           }else if(tp.equals(String.valueOf(APIType.JavaScript))){
              typeName = "JavaScript API";
           }
         %>
	     <div class="<%= imgDivClass %>">
           <img src="images/common.png" class="<%= imgClass %>" alt="" />
         </div>                  
         <div class="<%= rootDivClass %>">
           <a href="index.jsp?p=<%= currentComponent.getPackageName() %>&tp=<%= tp %>" title="<%= typeName %>"><%= typeName %></a>
         </div>
         <%
         }         
         //如果是功能类型
         if(uddiLevel > 2){
           imgDivClass = "clip13x9 nav_dots";
           imgClass = "cl_nav_dots";
           rootDivClass = "nav_div_currentroot current";
           //如果有类的参数，表明有三级
           if(uddiLevel > 3){
             //imgDivClass = "clip5x9 nav_arrows";
             //imgClass = "cl_nav_arrow";
             rootDivClass = "nav_div_currentroot";
           }
           
         %>
         <div class="<%= imgDivClass %>">
           <img src="images/common.png" class="<%= imgClass %>" alt="" />
         </div>                  
         <div class="<%= rootDivClass %>">
           <a href="index.jsp?p=<%= currentComponent.getPackageName() %>&tp=<%= tp %>&cl=<%= cl %>" title="<%= cl %>"><%= cl %></a>
         </div>
         <%
         }
         %>
         
       </div>
       <!-- toclevel0 end  -->
       
       <%
       //如果是包显示所有的组件类型
       if(0 == uddiLevel){
       %>
       <!-- children begin -->
       <div class="toclevel1 children">
          <%          
          for(UDDIComponent item : uDDIComponentlist){
            Component component = item.getComponent();
            //如果不只第一级，则显示当前的选中控件
          %>
          <div class="clip13x9 nav_dots">
            <img src="images/common.png" class="cl_nav_dots" alt="" />
          </div>
          <div>
            <a href="index.jsp?p=<%= component.getPackageName() %>" title="<%= component.getName() %>"><%= component.getName() %></a>
          </div>
          <%
          }//end for
          %>
         </div>
         <!-- children end -->
        <%
        }
        %>
          
        <%
        //是否选择了一个组件,且为第二级
        if(null != currentComponent && 1 == uddiLevel){
          rootDivClass = "nav_div_currentroot";          
        %>
        <div class="toclevel2 children">	        
	         <div class="clip13x9 nav_dots">
	           <img src="images/common.png" class="cl_nav_dots" alt="" />
	         </div>                  
	         <div class="<%= rootDivClass %>">
	           <a href="index.jsp?p=<%= currentComponent.getPackageName() %>&tp=<%= APIType.Java %>" title="Java API">Java API</a>
	         </div>
	         
	         <%	         
       	      List<UDDIClass> _listClassForWebService = UDDIConfigUtils.getUDDIClassList(configBean, 
       	    		  currentComponent.getPackageName(), APIType.WebService);
       	      if(_listClassForWebService.size() > 0){
	         %>
	         <div class="clip13x9 nav_dots">
	            <img src="images/common.png" class="cl_nav_dots" alt="" />
	         </div>
	         <div class="<%= rootDivClass %>">
	           <a href="index.jsp?p=<%= currentComponent.getPackageName() %>&tp=<%= APIType.WebService %>" title="WebService API">WebService API</a>
	         </div>
	         <%
       	      }//end if
       	      _listClassForWebService = null;
	         %>
	         
	         <%
             
              List<UDDIClass> _listClassForJavaScript = UDDIConfigUtils.getUDDIClassList(configBean, 
                      currentComponent.getPackageName(), APIType.JavaScript);
              if(_listClassForJavaScript.size() > 0){
             %>
	          
	         <div class="clip13x9 nav_dots">
	           <img src="images/common.png" class="cl_nav_dots" alt="" />
	         </div>
	         <div class="<%= rootDivClass %>">
	           <a href="index.jsp?p=<%= currentComponent.getPackageName() %>&tp=<%= APIType.JavaScript %>" title="JavaScript API">JavaScript API</a>
	         </div>
	         <%
              }
              _listClassForJavaScript = null;
	         %>
	         
        </div>
        <%
        }
        %>
        
        <%
        //是否选择了一个API类型
        if(null != currentComponent && 2 == uddiLevel){
          rootDivClass = "nav_div_currentroot";
          List<UDDIClass> listClass = UDDIConfigUtils.getUDDIClassList(configBean, p, currentType);
        %>
        <!-- children begin -->
       <div class="toclevel2 children">
          <%          
          for(UDDIClass item : listClass){     
          %>
          <div class="clip13x9 nav_dots">
            <img src="images/common.png" class="cl_nav_dots" alt="" />
          </div>
          <div>
            <a href="index.jsp?p=<%= currentComponent.getPackageName() %>&tp=<%= tp %>&cl=<%= item.getClassName() %>" title="<%= item.getClassName() %>"><%= item.getClassName() %></a>
          </div>
          <%
          }//end for
          %>
         </div>
         <!-- children end -->
        <%
        }
        %>
        
        <%
        //是否选择了一个API类型
        if(null != currentComponent && uddiLevel >= 3){
          rootDivClass = "nav_div_currentroot";
          List<Function> tmpList = UDDIConfigUtils.getFunctionList(configBean, p, currentType, cl);
        %>
        <!-- children begin -->
       <div class="toclevel2 children">
          <%          
          for(Function item : tmpList){
            rootDivClass = "nav_div_currentroot";
            if(null != fn && fn.equals(item.getName())){
              rootDivClass = "nav_div_currentroot current";
            }
          %>
          <div class="clip13x9 nav_dots">
            <img src="images/common.png" class="cl_nav_dots" alt="" />
          </div>
          <div class="<%= rootDivClass %>">
            <a href="index.jsp?p=<%= currentComponent.getPackageName() %>&tp=<%= tp %>&cl=<%= cl %>&fn=<%= item.getName() %>" title="<%= item.getName() %>"><%= item.getName() %></a>
          </div>
          <%
          }//end for
          %>
         </div>
         <!-- children end -->
        <%
        }
        %>
       
     </div>
     <!-- nav end -->
    </div>
    <!-- navContainer end --> 
  </div>
  <!-- navigation end -->
<%
}//导航页面 end
%>  