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
	<TITLE>����ģ��</TITLE>
	
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
				top.lwin.alert('������ʾ','��ʼʱ�䲻�ܴ��ڽ���ʱ�䣡','warning');
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
							top.lwin.alert('������ʾ','����ɹ�','info');
						}else{
							top.lwin.alert("��Ϣ��ʾ","����ʧ��","error");
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
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> ���� </button>
		<button class="form_btn" id="btnClose"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"> �ر� </button>
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
				<th>�ࡡ���ͣ�</th>
				<td>
					<input type="radio" name="type" value="H" ${weekSet.type != 'O' ? "checked" : ""}>�ڼ���&nbsp;&nbsp;
					<input type="radio" name="type" value="O" ${weekSet.type == 'O' ? "checked" : ""}>�Ӱ���
				</td>
			</tr>
			<tr>
				<th><font color="#ff0000">*</font>��ʼʱ�䣺</th>
				<td>
					<input type="text" id="startdate" name="startdate" class="Wdate" readonly value="${weekSet.startdate}" onclick="WdatePicker({skin:'whyGreen',isShowOthers:false})">
				</td>
			</tr>
			<tr>
				<th><font color="#ff0000">*</font>����ʱ�䣺</th>
				<td>
					<input type="text" id=enddate name=enddate class="Wdate" readonly value="${weekSet.enddate}" onclick="WdatePicker({skin:'whyGreen',isShowOthers:false})"/>
				</td>
			</tr>
			<tr>
				<th>״����̬��</th>
				<td>
					<input type="radio" name="state" value="Y" ${weekSet.state != 'N' ? "checked" : ""}>����&nbsp;&nbsp;
					<input type="radio" name="state" value="N" ${weekSet.state == 'N' ? "checked" : ""}>����
				</td>
			</tr>
			<tr>
				<th>������ע��</th>
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
	    	startdate:'��ѡ��[��ʼʱ��]',
	    	enddate:'��ѡ��[����]'
	    }
  	});	
</script> 
</BODY>
</HTML>