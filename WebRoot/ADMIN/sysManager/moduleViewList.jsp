<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@page import="com.linewell.ucap.platform.authorized.view.View"%>
<%@page import="com.linewell.ucap.admin.module.ViewWrapper"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.ucap.util.UNIDGenerate"%>
<%@page import="com.linewell.ucap.util.UcapRequest"%>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@page import="com.linewell.ucap.admin.build.wrapper.PortalBuild"%>
<%
/**
 * 数据库配置
 * @author cuangcong@linewell.com
 * @since 2011-12-26
 */
//获取模块的unid
String moduleUnid = request.getParameter("moduleUnid");
//获取应用系统的unid
String appUnid = request.getParameter("appUnid");
//如果为空，则为非法访问，直接退出不做处理
if(StringUtils.isEmpty(moduleUnid)) return;
UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
List<View> viewList = ViewWrapper.getViewByAppUnid(appUnid,ucapSession, ucapRequest);
PortalBuild pb =new PortalBuild();
//获取已生成过得视图频道的视图unid
String viewUnids=pb.getChannelViewUnidString(appUnid);

//获取当前应用系统的门户unid
String portalId=pb.getPortalUnid(appUnid);//request.getParameter("portalId");
String isFlag="1";//是否需要创建门户 1： 是   0： 否
if(StringUtils.isEmpty(portalId)){//未创建过门户
	UNIDGenerate generater = new UNIDGenerate();
	portalId = generater.getUnid();
	isFlag="1";
}else{//已创建过门户
	isFlag="0";
}
%>


<!DOCTYPE HTML>
<html>
  <head> 
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    <script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
    <script language="javascript" src="<%= systemPath %>default/js/linewell/linewell.core.js"></script>
	<script language="javascript" src="<%= systemPath %>default/js/linewell/linewell.utils.js"></script>
	<script language="javascript" src="<%= systemPath %>default/js/jquery.json-2.2.min.js"></script>
	<script language="javascript"  src="<%=systemPath%>default/js/jquery.cookie.js"></script>
    <link href="../style/viewSelect.css" rel="stylesheet" type="text/css" />
  </head>
  <script type="text/javascript">
  // 系统路径
  var appPath = "/"
		+ location.pathname.split("/")[(location.pathname.indexOf("/") > 0
				? 0
				: 1)] + "/";
  //应用系统unid
  var appUnid = "<%= appUnid%>";
  
  /**
   * 获取当前应用系统的所有视图，返回视图列表的id字符串
   */
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
  /**
   * 生成视图和菜单
   *
   */
  function buildPortalMenu(ids,isGen){
    //定义action的链接地址
    var actionUrl = appPath + "BaseAction.action?type=buildAction&act=buildPoral&isFlag=<%=isFlag%>&portalId=<%=portalId%>&appUnid="+appUnid;
    if(isGen&&"1"==isGen){//重新生成门户
    	actionUrl=actionUrl+"&isGen="+isGen;
    }
    //定义提交的参数值
	var menuActionParams={
	   "viewIds"  : ids
	};
	
	// 提交到后台
    $.ajax({
       type : "post",
       url : actionUrl,
       data : jQuery.toJSON(menuActionParams),
       dataType : "json",
       contentType : "application/json",
       async : false,
       success : function(data, textStatus) {          
          pageStep.canGoNext = true;
          try{           
            var winParent = window.parent;
            if(winParent
                && winParent.parentEvent){
                winParent.parentEvent.stepAdd();
            }
            pageStep.next();            
          }catch(e){
          
          }
       },
       error : function() {                                           
           alert("加载数据失败！");
       },
       statusCode : {// 处理错误状态
           404 : function() {
               alert("加载模块数据失败！");
           }
       }
   });// end ajax
} 

/**
 * 将视图加入频道以及生成菜单
 */
 function genPortalAndMenu(){ 
 	var viewIds=getSelectView();
 	if(viewIds){
        //添加视图到频道
        buildPortalMenu(viewIds,"1");
        window.parent.close();
    }else{
        alert("请选择要展示在首页的视图！");
    }   
 }
 
 /**
  * 关闭窗口
  */
  function closeModuleView(){
  	 window.parent.close();
  }
  </script>
<style>

</style>   
  <body>
<!-- 内容 -->

        <div class="popContent"  >        
            <ul class="popViewSel">
            <%
            if(null != viewList){
                for(View view:viewList){              
            %>
                <li <%if(view.getModuleUnid().equalsIgnoreCase(moduleUnid)){%>style="display: "<% }else{%>style="display:none"<%} %>>
                	<input name="chkBox" <%if(viewUnids.indexOf(view.getUnid())>-1){%>checked="checked"<% } %>  type="checkbox" unid="<%=view.getUnid()%>" /><%=view.getDisplayName()%>
                </li>           
            <%} }%> 
            </ul>
        </div>
        <div class="popBtns">    	
			<input type="button" id="btnCancel" name="btnCancel" value="取消" onclick="closeModuleView()">
			<input type="button" id="btnOk" name="btnOk" value="确定" onclick="genPortalAndMenu()">
        </div>
  </body>
</html>
