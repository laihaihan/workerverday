<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../../default/common.jsp"%> 
<%@page import="com.linewell.ucap.platform.authorized.app.App" %>
<%@page import="com.linewell.ucap.platform.authorized.app.AppManager" %>
<%
   String moduleId = request.getParameter("moduleId");
   String formIds=request.getParameter("formIds");
   if(null==formIds)formIds="";
   String sSystemPath = systemPath;
   String sUserStylePath = userStylePath;
   
   //需要是平台管理员
   if(null == ucapSession){
       response.sendRedirect(sSystemPath + "ADMIN/login.jsp");
       return;
   }

   boolean isPlatFormManager = false;
   AppManager appManager = new AppManager();       
   App platApp = appManager.getAppByResourceUnid(App.PLATFORM_APP_UNID);
   if ((","+platApp.getAdmins()+",").contains(","+ucapSession.getUser().getUnid()+",")){
       isPlatFormManager = true;
   }

   //需要是平台管理员
   if(!isPlatFormManager){
       response.sendRedirect(systemPath + "ADMIN/login.jsp");
       return;
   }
%>
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-patch.css" />
<script type="text/javascript" src="js/common.js"></script>

<script type="text/javascript" src="<%=sSystemPath%>js/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ext/ext-all.js"></script>
<script type="text/javascript"	src="<%=sSystemPath%>js/ext/ext-lang-zh_CN.js"></script>

<script type="text/javascript" src="js/jquery-1.6.1.min.js"></script>


<link rel="stylesheet" type="text/css" href="style/genCode.css" />

<script type="text/javascript" src="js/formRelation.js"></script>

<link href="style/genCode.css" rel="stylesheet" type="text/css"/>