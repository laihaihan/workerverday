<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.altest.xinzenghuibao.XinzenghuibaoBusiness"%>
<%@page import="com.linewell.altest.xinzenghuibao.Xinzenghuibao"%>
<%@page import="com.linewell.core.util.DateTime"%>
<%@page import="com.linewell.altest.constant.Constant"%>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");

	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	Xinzenghuibao workReport = new XinzenghuibaoBusiness().doFindBeanByKey(unid);
	if (null == workReport) {
		fn = "add";
		workReport = new Xinzenghuibao();
		workReport.setUnid(new UNIDGenerate().getUnid());
		workReport.setUsername(ucapsession.getUser().getName());
		workReport.setUserid(ucapsession.getUser().getUnid());
		workReport.setDept(ucapsession.getUser().getDepts());
		workReport.setReporttime(DateTime.getNowDateTime());
		workReport.setStatus(Constant.CHAOGAO);
	}
	
	request.setAttribute("workReport", workReport);
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
		<form id="jspForm" name="jspForm" method="post" action="${path}/xinzenghuibao.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=workReport.getUnid()%>">
		<input type="hidden" name="userid" id="userid" value="<%=workReport.getUserid()%>">
		<input type="hidden" name="status" id="status" value="<%=workReport.getStatus()%>">
		
		<table width="98%" align="center" class="form_table_ext">
			<tr>
				<th style="width:20%"><font color="red">*</font>汇报人：</th>
				<td style="width:20%">
					<input type="text" name="username" id="username" style="width:90%" value="${workReport.username}" readonly/>
				</td>
				<th style="width:20%"><font color="red">*</font>汇报时间：</th>
				<td style="width:20%">
					<input   type="text" name="reporttime" id="reporttime" style="width:90%" value="${workReport.reporttime}" readonly/>
			</td>
			</tr>

      <tr>
        <th style="width:20%"><font color="red">*</font>部门：</th>
        <td style="width:20%">
          <input type="text" name="dept" id="dept" style="width:90%" value="${workReport.dept}" readonly/>
        </td>
        <th style="width:20%"><font color="red">*</font>时间范围：</th>
        <td style="width:20%">
          <input name="timearea" id="timearea" style="width:90%" value="${workReport.timearea}"/>
        </td>
      </tr>
      
			<tr>
				<th colspan="4"><font color="red">*</font>本周小结：</th>
      </tr>      
      <tr>
				<td colspan="4">
					<textarea rows="13" style="width:100%" name="content" id="content">${workReport.content}</textarea>
				</td>
			</tr>

      <tr>
        <th colspan="4"><font color="red">*</font>下周计划：</th>
      </tr>      
      <tr>
        <td colspan="4">
          <textarea rows="7" style="width:100%" name="nextweekplan" id="nextweekplan">${workReport.nextweekplan}</textarea>
        </td>
      </tr>
            
			<tr>
				<th style="width:20%"><font color="red">*</font>审核人：</th>
				<td  style="width:20%">
					<input type="text" name="checkman" id="checkman" style="width:90%" value="${workReport.checkman}"/>
				</td>
        <th style="width:20%"><font color="red">*</font>审核时间：</th>
        <td  style="width:20%">
          <input type="text" name="checktime" id="checktime" style="width:90%" value="${workReport.checktime}" />
        </td>
      </tr>
			<tr>
				<th><font color="red">*</font>审核内容：</th>
				<td colspan="3">
					<textarea rows="3" cols="76" name="checkcontent" id="checkcontent" >${workReport.checkcontent}</textarea>
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
		top.lwin.close("true");
	}

	//表单验证
	function checkForm(){
		var flag = true;
		if(!TextValidation.checkNull("timearea;checkman","时间范围;审核人")){
			flag = false;
		}
		if(!TextValidation.checkEmail("checktime","邮件")){
			flag = false;
		}
		return flag;
	}
	
</script> 
</body>
</html>