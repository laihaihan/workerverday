<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List" %>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucap.platform.cache.form.Form" %>
<%@page import="com.linewell.ucap.platform.cache.composeform.ComposeForm" %>
<%@page import="com.linewell.ucapx.form.ComposeFormApi" %>
<%@page import="com.linewell.ucapx.form.CommonFormApi"%>
<%@page import="com.linewell.ucap.platform.cache.composeform.Tab" %>
<%@page import="com.linewell.ucap.session.Session" %>
<%@page import="com.linewell.ucap.util.StringUtil"%>
<%@page import="com.linewell.ucapx.common.WebAppUtils" %>
<%@page import="com.linewell.ucapx.form.FormUtilsApi"%>

<%
/**
 * 表单页签栏 
 * @author xhuatang@linewell.com
 * @since 2011-07-08
 */
{
%>
<style type="text/css">
#showMenu{overflow-x: hidden; white-space: nowrap;width:auto;}
    #showMenu ul{width:auto;POSITION: relative;WHITE-SPACE: nowrap; TOP: 0px; LEFT: 1px;overflow-y:hidden;}
    #showMenu li{display:block;cursor:pointer;margin-top:1px;margin-left:-2px;}
        #showMenu li span{WIDTH: 70px; TEXT-OVERFLOW: ellipsis;WHITE-SPACE: nowrap; OVERFLOW: hidden; WORD-BREAK: keep-all;}
    #showMenu .showMenuHover{margin-top:-3px;}
#showTabBody{overflow-x: hidden;} 
  #showTabBody .table2{width:100%;table-layout:fixed;margin-left:auto;margin-right:auto;}
.view_content{bottom:0;left:0;margin-left:1px;height:100%;border:1px solid #ccc;margin:0px;padding:0;}   
</style>
<script language="javascript">
$(document).ready(function(){
    /**
     * 定义tab的单击事件
     */
    $("#showMenuUL").find("li").click(function(){
       //定义页签的前缀
       var tabPre = "tab_";
       //定义页签内容的前缀
       var tabContentPre = "tab_content_";
       //页签的ID
       var tabId = $(this).attr("id");
       //页签内容的ID
       var tabContentId = tabId.replace(tabPre, tabContentPre);
       
       //选中的页签
       $("li[id^='" + tabPre + "']").removeClass("showMenuHover");
       $(this).addClass("showMenuHover");
       
       //找到所有以tab_content_为开头，且含有types属性的区域
       $("div[types][id^='" + tabContentPre + "']").hide();
       
      
       $("#" + tabContentId).show();
    });
});
</script>

  <!-- #_ucap_main_div begin -->
  <div class="showBox" id="_ucap_main_div">
    <!-- #showBox begin -->
    <div id="showBox">
<%

    Session _ucapSession = WebAppUtils.getSession(request);
    //直接引用表单中的unid，忽略出错信息
    String _formUnid = request.getParameter("formId");
    //当前对象的unid
    String _unid = request.getParameter("unid");
    ComposeFormApi _composeFormApi = new ComposeFormApi();
    ComposeForm _composeForm = _composeFormApi.getComposeForm(_formUnid, _ucapSession);
    List<Tab> _tabList = _composeForm.getTabs();
    
    //组合表单中配置主表单对应的表单ID和表单类型
    FormUtilsApi formApi = new FormUtilsApi(); 
    Form _mainForm = formApi.getForm(_composeForm.getMainFormId(),_composeForm.getMainFormType());
    
    
    if(null != _tabList || _tabList.size() > 0){    
%>


<!-- #showMenu begin -->
<div id="showMenu">
    <ul id="showMenuUL">
<%

      String _selectedTabId = request.getParameter("tabId");
      //遍历Tab
      for(Tab _item : _tabList){
        //如果_defaultTabId为空，第一个值即位tabID
        if(StringUtils.isEmpty(_selectedTabId)) _selectedTabId = _item.getUnid();
        String tab_itemClassName = "";
        if(_selectedTabId.equals(_item.getUnid())){
          tab_itemClassName = "showMenuHover";
        }
        
%>
        <li id="tab_<%= _item.getUnid() %>" class="<%= tab_itemClassName %>" onclick=""
             contents="<%= _item.getContents() %>" 
             types="<%= _item.getTypes() %>"><span 
             qtip="<%=_item.getName()%>"><%=_item.getName()%></span></li>
<%
      }//end for 

%>       
    </ul>
</div><!-- #showMenu end -->

<!-- #showTabBody begin -->
<div class="showContent" id="showTabBody">  

<%
    //遍历页签内容
     for(Tab _item : _tabList){
        String[] _contents =  _item.getContents().split(StringUtil.STRINGSPLIT);
        String[] _types = _item.getTypes().split(StringUtil.STRINGSPLIT);
        //如果两个的长度不相等
        if(_contents.length > _types.length) return;       
        String _displayStyle = "display:none;";
        if(_selectedTabId.equals(_item.getUnid())){
            _displayStyle = "display:block;";
        }
%>
  <!-- tab_content_ begin -->
  <div id="tab_content_<%= _item.getUnid() %>" style="<%= _displayStyle %>" 
    contents="<%= _item.getContents() %>" 
    types="<%= _item.getTypes() %>">
<%
            //获取相应的内容
            for(int i = 0; i < _contents.length; i++){
                
%>            
      <!-- tab_content__item_ begin -->
      <div id="tab_content__item_<%= _contents[i] %>">
<%
                //如果是表单，直接加载JSP页面
                if(_types[i].equals("01") || _types[i].equals("02")){
                  
                  String jspName = formApi.getJspName( _contents[i],_types[i]);
                  Form _commForm = formApi.getForm(_contents[i],_types[i]);
                  
                  String _jspPage = "../jsp/" + jspName 
                        + ".jsp?formId=" + _commForm.getUnid();
                  if (!_mainForm.getUnid().equals(_commForm.getUnid())){
                     //说明从表
                  	 _jspPage += "&mainUnid=" + _unid + "&mainFormId="+_mainForm.getUnid();
                  }
                  
%>      
        <jsp:include page="<%= _jspPage%>"  flush="true"/>
<%
                }//end if
                else if(_types[i].equals("03")){//视图
                  String _viewJspPage = "view.jsp?viewId=" + _contents[i];
%>
           <div class="view_content">

           </div>

<%                
                }// end else
%>              
      </div><!-- tab_content__item_ end -->
<%
            }//end for
%>           
    
  </div><!-- tab_content_ end -->
<%
     }//end for
   }//end if tabList exists
%>
   <!-- <div style="font: 0px/0px sans-serif;clear: both;display: block"></div> -->  
</div><!-- #showTabBody end -->


    </div><!-- #showBox end -->
  </div><!-- #_ucap_main_div end -->
<%
}//end page
%>