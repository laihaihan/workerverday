<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.core.print.printireport.*"%>
<%@ page import="java.io.File"%>

<%
	String fn = "update";
	String punid = request.getParameter("punid");
	
	PrintIreport printIreport = new PrintIreportManager().doFindBeanByCondition(" punid='"+punid+"'");
	if (null == printIreport) {
		fn = "add";
		printIreport = new PrintIreport();
		printIreport.setUnid(new UNIDGenerate().getUnid());
		printIreport.setPunid(punid);
	}
	
	request.setAttribute("printIreport", printIreport);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/PrintIreport.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=printIreport.getUnid()%>">
		<input type="hidden" name="punid" id="punid" value="<%=printIreport.getPunid()%>">
		<table width="98%" align="center" class="form_table_ext">
			<col width="20%" align="right">
			<col width="80%" align="left">			
			<tr>
				<th><font color="red">*</font>模板名称：</th>
				<td>
					<input type="text" name="name" id="name" style="width:90%" value="${printIreport.name}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>模板路径：</th>
				<td>
					<select name="filepath" id="filepath">
						<option value="">==请选择打印模板==</option>
						<% 
							String filePath = "was/report/";
							String realPath	= request.getRealPath("/")+ filePath;
							File[] files = new PrintIreportManager().getIReportFiles(realPath);
							for(int i=0;i<files.length;i++){
								String fileName = files[i].getName();
								String selected = printIreport.getFilepath().indexOf(fileName) > -1 ? "selected" : "";
						%>
						<option value="<%=filePath+fileName %>" <%=selected %>><%=fileName %></option>
						<%} %>
					</select>
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
		if(validate.validate()){
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					if(data.result){
						top.lwin.alert('信息提示','操作成功','info',1500);
						if($('#fn').val()=='add'){							
							location.href='?unid='+$('#unid').val();
						}
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
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
	      	name:'required',
	      	filepath:'required'
	    },
	    messages:{
	    	name:'请填写[模板名称]',
	    	filepath:'请选择[打印模板]'
	    }
  	});	
</script> 
</body>
</html>