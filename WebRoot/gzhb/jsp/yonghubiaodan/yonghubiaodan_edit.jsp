<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.altest.yonghubiaodan.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	Yonghubiaodan yonghubiaodan = new YonghubiaodanBusiness().doFindBeanByKey(unid);
	if (null == yonghubiaodan) {
		fn = "add";
		yonghubiaodan = new Yonghubiaodan();
		yonghubiaodan.setUnid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("yonghubiaodan", yonghubiaodan);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	${import_theme}
	${import_jquery}
	${import_poshytip}
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/yonghubiaodan.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=yonghubiaodan.getUnid()%>">
		<table width="98%" align="center" class="form_table">
			<tr>
  <th width=100px align=right><font color='red'>*</font>用户名</th>
  <td>
    <input  style='width:375px' type='text' name='username' id='username' value='${yonghubiaodan.username}'/>
  </td>
  <th width=100px align=right><font color='red'>*</font>密码</th>
  <td>
    <input  style='width:375px'  type='text' name='pwd' id='pwd' value='${yonghubiaodan.pwd}'/>
  </td>
</tr>
<tr>
  <th width=100px align=right><font color='red'>*</font>邮件</th>
   <td colspan='3'>
   <input  style='width:100%' type='text' name='email' id='email' value='${yonghubiaodan.email}'/>
   </td>
</tr>

		</table>
			
		</form>
	</div>
</div>
<script type="text/javascript">
	//绑定事件
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
	});
	
	//保存表单信息
	function doSave(){
		if(checkForm()){
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					if(data.result){
						top.lwin.alert('信息提示','操作成功','info',1500);
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
					top.lwin.close(true);
				}
			});
		}
	}
	
	//关闭窗口
	function doClose(){
		top.lwin.close();
	}

	//表单验证
	function checkForm(){
		alert();
		var flag = true;
		if(!TextValidation.checkNull("username;pwd","用户名;密码")){
			flag = false;
		}
		if(!TextValidation.checkEmail("email","邮件")){
			flag = false;
		}
		return flag;
	}
</script> 
</body>
</html>