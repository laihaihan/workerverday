<%@ page contentType="text/html;charset=UTF-8"%>
<%
String sSystemPath = request.getContextPath()+"/";
String sUserStylePath=sSystemPath+"uistyle/style_1/";
 %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />

<title>用户管理中心UMC</title>
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ucap.css"/>
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-patch.css" />

<link href="style/main.css" rel="stylesheet" type="text/css" />
<%@include file="include/umcSession.jsp"%>
<%
//打开默认页面的JS脚本
String openDefaultPageJs = "ucapUmc.openUserPage();";

//如果只有职位授权的权限
if(uMCSession.getManageDepts().equals("") 
   && false == uMCSession.getIsPlatFormManager()
   && true == uMCSession.getCanManagePost())
{
  openDefaultPageJs = "ucapUmc.openPostView();";
}

Boolean isPlatFormManager = uMCSession.getIsPlatFormManager();
 %>
<script type="text/javascript" src="js/UMC.js"></script>
<script type="text/javascript" src="js/UMCLogout.js"></script>
<script type="text/javascript" src="js/UMCUserManager.js"></script>
<script type="text/javascript">
Ext.onReady(function(){ 
  switch(getAnchor()){
    case "userpage":
      ucapUmc.openUserPage();
      break;
    case "roleauthdept":
      ucapUmc.openRoleAuthDeptPage();
      break;
    case "postview":
      ucapUmc.openPostView();
      break;
    default:
      <%=openDefaultPageJs%>;
      break;
  }  
  
  UMCSession.isPlatFormManager=<%=isPlatFormManager%>;  
    
  /**
   * 改变页面的大小
   */
  window.onresize = function(){
    //2011-12-12 add by xhuatang@linewell.com 去除旧的的方法，统一封装 
    ucapUmcDept.resetViewSize();
  }
  
 	ucapUmcDept.deptManagerHaveAuthDept=<%=deptManagerHaveAuthDept%>;
	ucapUmcDept.managerDeptId="<%=umcManagerDeptId%>";
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
    <div class="top_nav">
    
      <!--顶部导航_links begin-->   
      <span class="top_nav_nolink">您好，<span class="top_nav_username"><%=uMCSession.getUser().getDisplayName() %></span></span>      
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
    
    <!-- 管理 -->
    <div class="list_management" style="display:none;">
      <span class="list_text_selected"><a href="javascript:void(0);">管理</a></span>
    </div>
<%
//如果有部门管理的权限
if(!uMCSession.getManageDepts().equals("") || uMCSession.getIsPlatFormManager()){
%>      
    <!-- 用户管理 -->
    <!-- 2012-08-14 mdf by chuiting@linewell.com
    BUG1227：IE6:分级管理中心，用户配置的部门树形滚动条位置不正确
	资源分级管理的用户管理中的用户部门树形、UMC下的用户部门树形、
	系统管理中的用户配置部门列表是同一个树形，
	ie6下UMC的用户部门树形需要扣除头部的高度，故添加div的id以区别其他两个树形设置高度 -->
    <div class="pagelink list_management_user" id="umcUserPage">
    <!-- end 2012-08-14 mdf by chuiting@linewell.com -->
      <span class="list_text"><a href="#userpage" onclick="ucapUmc.openUserPage();"  class="pagelink">用户管理</a></span>
    </div>
    
    <!-- 角色管理 -->
    <div class="list_management_role" style="display:none;">
      <span class="list_text"><a href="#rolepage" onclick="ucapUmc.openRolePage();">角色管理</a></span>
    </div>
<%
}
%>    

<%
//如果有职位管理的权限
if(uMCSession.getCanManagePost() || uMCSession.getIsPlatFormManager()){
%>  
    <!-- 职位管理 -->
    <div class="list_management_position">
      <span class="list_text"><a href="#postview" onclick="ucapUmc.openPostView();" class="pagelink">职位管理</a></span>
    </div>
<%
}
%>    
    
    
    
<%
//如果有部门管理的权限
if(!uMCSession.getManageDepts().equals("") || uMCSession.getIsPlatFormManager()){
%>    
    <!-- 空白行 -->
    <div class="blank">
    </div>
    
    <!-- 分隔线 -->
    <div class="list_separator">
    </div>
    
    <!-- 空白行 -->
    <div class="blank">
    </div>
    
    <!-- 授权 -->
    <div class="list_authorization">
      <span class="list_text"><a href="#roleauthdept" onclick="ucapUmc.openRoleAuthDeptPage();"  class="pagelink">授权</a></span>
    </div>
<%
}
%>    
    <!--目录 end-->
    
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