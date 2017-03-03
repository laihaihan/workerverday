﻿<%@ page contentType="text/html;charset=UTF-8"%>
<!-- 2012-07-17 add by chuiting@linewell.com
解决BUG1213：没有登录，直接通过http://127.0.0.1:8081/ucap/TOOLS/MMC/访问监控中心，
提示“初始化视图数据失败”，提示信息无法关闭，导致IE无法操作，
建议切换到登录页面(版本控制中心、数据集成中心也存在相同问题) -->
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucapx.common.WebAppUtils"%>
<!-- end 2012-07-17 add by chuiting@linewell.com -->
<%
String sSystemPath = request.getContextPath()+"/";
String sUserStylePath=sSystemPath+"uistyle/style_1/";
 %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />

<title>版本管理中心VMC</title>
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ucap.css"/>
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-patch.css" />

<link href="style/main.css" rel="stylesheet" type="text/css" />
<%@include file="include/session.jsp"%>
<%

String displayUsername = "mytest";
//2012-07-17 add by chuiting@linewell.com
//解决BUG1213：没有登录，直接通过http://127.0.0.1:8081/ucap/TOOLS/MMC/访问监控中心，
//提示“初始化视图数据失败”，提示信息无法关闭，导致IE无法操作，
//建议切换到登录页面(版本控制中心、数据集成中心也存在相同问题)
//获取Session对象
Session ucapSession = WebAppUtils.getSession(request);
//需要是平台管理员
if (null == ucapSession) {
	response.sendRedirect(sSystemPath + "ADMIN/login.jsp");
	return;
}
//end 2012-07-17 add by chuiting@linewell.com
%>
<script type="text/javascript">

function openPageView(){
	ucapUmc.nowAnchor="pageView";
	ucapUmc.openView("BBCC0A2B0033E51CA2C60E17DB5FA984");
};
function openUpdateView(){
	ucapUmc.nowAnchor="updateView";
	ucapUmc.openView("4E49C861233EF3EF10F46A4699CEF2BD");
};

Ext.onReady(function(){ 
  switch(getAnchor()){
    case "pageView":
      openPageView();
      break;
    case "updateView":
      openUpdateView();
      break;
    default:
      openPageView();
      break;
  }
  window.onresize = function(){ 
    if(typeof view!="undefined"){
        var umcGrid=Ext.getCmp(view.namePrefix + "0");
      if(umcGrid){
        umcGrid.setWidth(0); 
        umcGrid.setHeight(0); 
        umcGrid.setWidth(Ext.get("umcMainRight").getWidth()); 
        umcGrid.setHeight(Ext.get("ucapView").getHeight()-ucapUmc.otherViewHeight); 
      };
    }
  }
});
</script>
</head>
<body>

<!--页眉 begin-->
<div id="headerBox">
  <div class="umcheader ">
  
    <!-- LOGO -->
    <div class="umclogo">
    </div>
    
    <!--顶部导航_right begin-->
    <div class="top_nav" style="display:none">
    
      <!--顶部导航_links begin-->   
      <span class="top_nav_nolink">您好，<span class="top_nav_username"><%= displayUsername %></span></span>      
      <span class="top_nav_operation"><a href="javascript:void(0);" onclick="userManager.modifyPassword();">修改密码</a></span>
      <span class="top_nav_nolink">|</span> 
      <span class="top_nav_operation"><a href="javascript:void(0);" onclick="UMCLogout();">注销</a></span>
      <!--顶部导航_links end-->
      
    </div>
    <!--顶部导航_right end-->
    
  </div>
  <!--页眉 end-->
  
  <!-- 分隔条 -->
  <div class="divider">
  </div>
</div>
<!--主区域begin-->
<div class="area_main">

  <!--主区域_左 begin-->
  <div class="area_main_left" id ="ucapMainLeft" >
  
    <!--目录 begin-->
    
    <!-- 空白行 -->
    <div class="blank">
    </div>
    
    <!-- 空白行 -->
    <div class="blank">
    </div>
    
    <!-- 打包记录 -->
    <div class="pagelink list_act">
      <span class="list_text"><a href="#pageView" onclick="openPageView();"  class="pagelink">打包记录</a></span>
    </div>
    
    <!-- 更新记录 -->
    <div class="list_act">
      <span class="list_text"><a href="#updateView" onclick="openUpdateView();" class="pagelink">更新记录</a></span>
    </div>
    
    
    <!-- 空白行 -->
    <div class="blank">
    </div>
    
    <!-- 分隔线 -->
    <div class="list_separator">
    </div>
    
    <!-- 空白行 -->
    <div class="blank">
    </div>
    
  </div>  
  <!--主区域_左 end-->
  
  <!--主区域_右 begin-->
  <div class="area_main_right" id="ucapView" >
  </div>
  <!--主区域_右 end-->
  
</div>
<!--主区域end-->

<!--页脚 begin-->
<div class="footer" >
  Powered by Ucap © 2001-2011, Linewell Inc.
</div>
<!--页脚 end-->
</body>
</html>