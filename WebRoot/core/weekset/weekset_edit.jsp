<%@ page language="java" contentType="text/html; charset=GBK"%>
<%@ page import="com.linewell.core.weekset.WeekSet"%>
<%@ page import="com.linewell.core.weekset.WeekSetManager"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.core.util.DateTime" %>
<%		
	String fn = "update";
	String unid = request.getParameter("unid");
	WeekSet weekSet = new WeekSetManager().doFindBeanByKey(unid);
	if (weekSet == null) {
		fn = "add";
		weekSet = new WeekSet();
		weekSet.setUnid(new UNIDGenerate().getUnid());
		weekSet.setCreatetime(DateTime.getNowDateTime());
	}
	
	request.setAttribute("path",request.getContextPath());
	request.setAttribute("weekSet",weekSet);
%>
<HTML>
<HEAD>
	<TITLE>生成模块</TITLE>
	
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/edit.css">
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/icon.css">
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="${path}/core/js/validation/style.css" />
	
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="${path}/core/js/datepicker/WdatePicker.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript">
		$(function(){
			$("#btnSave").bind("click",doSave);
			$("#btnClose").bind("click",doClose);
		});
		
		function doSave(){
			if($("#startdate").val() != "" && $("#enddate").val() != "" && $("#startdate").val() > $("#enddate").val()){
				top.lwin.alert('操作提示','开始时间不能大于结束时间！','warning');
				return;
			}
			if(validate.validate()){
				$("#jspForm").ajaxSubmit({
					dataType:'json',
					error:function(){
						top.lwin.errorService();
					},
					success:function(data){
						if(data.result){
							top.lwin.alert('操作提示','保存成功','info');
						}else{
							top.lwin.alert("信息提示","保存失败","error");
						}
						top.lwin.close(true);
					}
				});
			}
		}
		
		function doClose(){
			top.lwin.close(true);
		}
	</script>
</HEAD>
<BODY>
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/weekset.action">
		<input type="hidden" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" value="${weekSet.unid}">
		<input type="hidden" name="createtime" value="${weekSet.createtime}">
		<table width="98%" align="center" class="form_table_ext">
			<col width="20%" align="right">
			<col width="80%" align="left">
			<tr>
				<th>类　　型：</th>
				<td>
					<input type="radio" name="type" value="H" ${weekSet.type != 'O' ? "checked" : ""}>节假日&nbsp;&nbsp;
					<input type="radio" name="type" value="O" ${weekSet.type == 'O' ? "checked" : ""}>加班日
				</td>
			</tr>
			<tr>
				<th><font color="#ff0000">*</font>开始时间：</th>
				<td>
					<input type="text" id="startdate" name="startdate" class="Wdate" readonly value="${weekSet.startdate}" onclick="WdatePicker({skin:'whyGreen',isShowOthers:false})">
				</td>
			</tr>
			<tr>
				<th><font color="#ff0000">*</font>结束时间：</th>
				<td>
					<input type="text" id=enddate name=enddate class="Wdate" readonly value="${weekSet.enddate}" onclick="WdatePicker({skin:'whyGreen',isShowOthers:false})"/>
				</td>
			</tr>
			<tr>
				<th>状　　态：</th>
				<td>
					<input type="radio" name="state" value="Y" ${weekSet.state != 'N' ? "checked" : ""}>启用&nbsp;&nbsp;
					<input type="radio" name="state" value="N" ${weekSet.state == 'N' ? "checked" : ""}>禁用
				</td>
			</tr>
			<tr>
				<th>备　　注：</th>
				<td>
					<textarea id="memo" name=memo rows=5 style="width:90%">${weekSet.memo}</textarea>
				</td>
			</tr>
		</table>
		</form>
	</div>
</div>
<script type="text/javascript">
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	startdate:'required',
	      	enddate:'required'
	    },
	    messages:{
	    	startdate:'请选择[开始时间]',
	    	enddate:'请选择[结束]'
	    }
  	});	
</script> 
</BODY>
</HTML>