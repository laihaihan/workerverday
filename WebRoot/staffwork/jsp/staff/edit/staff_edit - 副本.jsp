<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.staffSys.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	Staff staff = new StaffBusiness().doFindBeanByKey(unid);
	if (null == staff) {
		fn = "add";
		staff = new Staff();
		staff.setUnid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("staff", staff);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	${import_theme}
	${import_jquery}
	${import_validation}
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/staff.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=staff.getUnid()%>">
		<table width="98%" align="center" class="form_table">
			<tr>
  <th width=100px align=right><font color='red'>*</font>姓名</th>
  <td>
    <input  style='width:375px' type='text' name='staff[]name' id='name' value='${staff.name}'/>
  </td>
  <th width=100px align=right><font color='red'>*</font>性别</th>
  <td>
    <input  style='width:375px'  type='text' name='staff[]sex' id='sex' value='${staff.sex}'/>
  </td>
</tr>
<tr>
  <th width=100px align=right><font color='red'>*</font>职务</th>
  <td>
    <input  style='width:375px' type='text' name='staff[]job' id='job' value='${staff.job}'/>
  </td>
  <th width=100px align=right><font color='red'>*</font>所属部门</th>
  <td>
    <input  style='width:375px'  type='text' name='staff[]department' id='department' value='${staff.department}'/>
  </td>
</tr>
<tr>
  <th width=100px align=right><font color='red'>*</font>入职日期</th>
  <td>
    <input  style='width:375px' type='text' name='staff[]date_time' id='date_time' value='${staff.date_time}'/>
  </td>
  <th width=100px align=right><font color='red'>*</font>直属上级</th>
  <td>
    <input  style='width:375px'  type='text' name='staff[]leader' id='leader' value='${staff.leader}'/>
  </td>
</tr>
<tr>
  <th width=100px align=right><font color='red'>*</font>联系方式</th>
  <td>
    <input  style='width:375px' type='text' name='staff[]contact' id='contact' value='${staff.contact}'/>
  </td>
  <th width=100px align=right><font color='red'>*</font>座机</th>
  <td>
    <input  style='width:375px'  type='text' name='staff[]telephone' id='telephone' value='${staff.telephone}'/>
  </td>
</tr>
<tr>
  <th width=100px align=right><font color='red'>*</font>电子邮件</th>
  <td>
    <input  style='width:375px' type='text' name='staff[]email' id='email' value='${staff.email}'/>
  </td>
  <th width=100px align=right><font color='red'>*</font>学历证书</th>
  <td>
    <input  style='width:375px'  type='text' name='staff[]diploma' id='diploma' value='${staff.diploma}'/>
  </td>
</tr>
<tr>
  <th width=100px align=right><font color='red'>*</font>简历</th>
  <td>
    <input  style='width:375px' type='text' name='staff[]resume' id='resume' value='${staff.resume}'/>
  </td>
  <th width=100px align=right><font color='red'>*</font>其他</th>
  <td>
    <input  style='width:375px'  type='text' name='staff[]other' id='other' value='${staff.other}'/>
  </td>
</tr>

		</table>
			<iframe  width='100%' frameborder='0' src='${path}/core/file/file_coreupload.jsp?unid=${staff.unid}'></iframe>
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
		if(validate.validate()){
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
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	
	    },
	    messages:{
	    	
	    }
  	});	
</script> 
</body>
</html>