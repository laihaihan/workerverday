<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucapx.login.LoginApi"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="java.util.List"%>
<%@include file="../default/common.jsp"%> 
<%
/**
 * 登录页面
 * @auth xhuatang@linewell.com
 * @since 2011-07-01
 */
LoginApi loginApi = new LoginApi();
List<App> allappList = loginApi.getAppList();
 %>
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta content="南威客户关系管理系统" name="keywords" />
<meta content="南威客户关系管理系统" name="description" />
<title>南威客户关系管理系统</title>
<link href="style/login.css" rel="stylesheet" type="text/css" />
<style type="text/css">
</style>
<script language="javascript" src="<%= systemPath %>/default/js/jquery-1.6.1.min.js"></script>
<script language="javascript" src="<%= systemPath %>/default/js/jquery.cookie.js"></script>
<script language="javascript" src="<%= systemPath %>/default/js/common.js"></script>
<script language="javascript" src="js/login.js"></script>
<script language="javascript">

//cookie过期的天数
var cookieOptions = {
  expires : 7
};
$(document).ready(function(){

  //从cookie加载用户名
  $("#username").val($.cookie("login.username"));
  //从cookie加载密码
  $("#password").val($.cookie("login.password"));
  //设置选中的值
  $("#appList").val($.cookie('login.appList'));
  //是否记住密码
  if($.cookie("login.rememberPassword")){
    $("#rememberPass").attr("checked", true);
  }
  
  $("#username").focus();

  /**
   * 处理表单提交的逻辑
   */
  $("#loginForm").submit(function(){
    loginSubmit();
    return false;
  });//end submit
  
  /**
   * 单击重设按钮的事件
   */
  $("#resetBtn").click(function(){
    var $username = $("#username");
    var $password = $("#password");
    var $loginBtn = $("#loginBtn");
    
	  //是否记住密码
	  if($.cookie("login.rememberPassword")){
	    $("#rememberPass").attr("checked", true);
	  }
    
    //删除select中所有大于0的元素
   // $("#appList").find("option:gt(0)").remove();
    //设置只能选择应用系统
   // $appList.attr("disabled", true);
    //$username.attr("disabled", false);
   // $password.attr("disabled", false);
  });
  
  /**
   * 是否保存密码
   */
  $("#rememberPass").click(function(){
    var $self = $(this);
    if($self.attr("checked")){
      $.cookie("login.rememberPassword", "1", cookieOptions);
    }else{
      $.cookie("login.rememberPassword", "", cookieOptions);
    }
  });
});
</script>
</head>

<body>
<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
  <tr>
    <td class="login_top"></td>
  </tr>
  <tr>   
    <!-- 登录区域 -->
    <td class="login_outer" height="323">
      <table  border="0" cellpadding="0" cellspacing="0" align="center" style="margin-left:auto;margin-right:auto;">
        <tr>
          <td  class="login_center">
			      <form method="post" id="loginForm">
					    <!-- 登录信息 -->
					    <div class="login_inner">
					      <!-- 组织名 -->
					      <div>
					        帐户名：<input name="username" id="username" type="text" /></div>
					      <!-- 空白行 -->
					      <div class="blank">
					      </div>
					      <!-- 帐户名 -->
					      <div>
					         密　码：<input name="password" id="password" type="password" /></div>
					      <!-- 空白行 -->
					      <div class="blank">
					      </div>
					      <!-- 密码 -->
					      <div>
					       应　用：<select id="appList" name="appList">
					        <option value="">请选择应用系统</option>	
					        	  <%
					        	  if(null != allappList){
						        	  for(App app : allappList){%>    
						        	  	<option value="<%=app.getUnid()%>"><%=app.getName()%></option>
						        	  <%
						        	  }
					        	  }
						        	%>
					       </select>
					      </div>
					      <!-- 空白行 -->
					      <div class="blank">
					      </div>
					      <!-- 按钮 -->
					      <div class="login_button">
					        <input name="loginBtn" id="loginBtn" type="submit" value="登录" /> <input type="reset" id="resetBtn" value="重设"><label id="resultMsg"></label></div>
					      <!-- 空白行 -->
					      <div class="blank">
					      </div>
					      <!-- 扩展 -->
					      <div class="login_expand">
					        <input name="rememberPass" id="rememberPass" type="checkbox" /><label for="rememberPass">记住密码</label><a href="#">取回密码</a></div>
					    </div>
				    </form>
				  </td>
				</tr>
		  </table>
    </td>   
  </tr>
  <tr>
    <td class="login_bottom"></td>
  </tr>
</table>
<!--页脚 -->
<div class="footer">
  Powered by Ucap © 2001-2011, Linewell Inc. </div>
</body>

</html>