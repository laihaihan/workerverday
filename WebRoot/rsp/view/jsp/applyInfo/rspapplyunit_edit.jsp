<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.rsp.applyInfo.unit.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	RspApplyUnit rspApplyUnit = new RspApplyUnitManager().doFindBeanByKey(unid);
	if (null == rspApplyUnit) {
		fn = "add";
		rspApplyUnit = new RspApplyUnit();
		rspApplyUnit.setUnit_unid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("rspApplyUnit", rspApplyUnit);
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
		<form id="jspForm" name="jspForm" method="post" action="${path}/rsp/rspApplyUnitAction.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=rspApplyUnit.getUnit_unid()%>">
		<input type="hidden" name="unit_unid" id="unit_unid"  value="${rspApplyUnit.unit_unid}"/>
		<table width="98%" align="center" class="form_table_ext">
			<col width="20%" align="right">
			<col width="30%" align="left">
			<col width="20%" align="right">
			<col width="30%" align="left">
			<tr>
				<th><font color="red"></font>个人/企业名称：</th>
				<td colspan="3">
					<input type="text" name="unit_name" id="unit_name" style="width:96%" value="${rspApplyUnit.unit_name}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>地址：</th>
				<td colspan="3">
					<input type="text" name="unit_address" id="unit_address" style="width:96%" value="${rspApplyUnit.unit_address}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>手机：</th>
				<td>
					<input type="text" name="unit_mobile" id="unit_mobile" style="width:90%" value="${rspApplyUnit.unit_mobile}"/>
				</td>
				<th><font color="red"></font>身份证号：</th>
				<td>
					<input type="text" name="unit_idcard" id="unit_idcard" style="width:90%" value="${rspApplyUnit.unit_idcard}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>银行账号：</th>
				<td>
					<input type="text" name="unit_bank_account" id="unit_bank_account" style="width:90%" value="${rspApplyUnit.unit_bank_account}"/>
				</td>
				<th><font color="red"></font>注册编号：</th>
				<td>
					<input type="text" name="unit_regist_code" id="unit_regist_code" style="width:90%" value="${rspApplyUnit.unit_regist_code}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>纳税人识别号：</th>
				<td>
					<input type="text" name="unit_taxpayer_code" id="unit_taxpayer_code" style="width:90%" value="${rspApplyUnit.unit_taxpayer_code}"/>
				</td>
				<th><font color="red"></font>组织机构代码：</th>
				<td>
					<input type="text" name="unit_org_code" id="unit_org_code" style="width:90%" value="${rspApplyUnit.unit_org_code}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>法人代表：</th>
				<td>
					<input type="text" name="unit_legal_man" id="unit_legal_man" style="width:90%" value="${rspApplyUnit.unit_legal_man}"/>
				</td>
				<th><font color="red"></font>注册资金：</th>
				<td>
					<input type="text" name="unit_regist_money" id="unit_regist_money" style="width:90%" value="${rspApplyUnit.unit_regist_money}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>经营面积：</th>
				<td>
					<input type="text" name="unit_manage_area" id="unit_manage_area" style="width:90%" value="${rspApplyUnit.unit_manage_area}"/>
				</td>
				<th><font color="red"></font>经营期限：</th>
				<td>
					<input type="text" name="unit_manage_duration" id="unit_manage_duration" style="width:90%" value="${rspApplyUnit.unit_manage_duration}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>经营范围：</th>
				<td colspan="3">
					<input type="text" name="unit_manage_scope" id="unit_manage_scope" style="width:96%" value="${rspApplyUnit.unit_manage_scope}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>企业类型：</th>
				<td>
					<input type="text" name="unit_enterprise_type" id="unit_enterprise_type" style="width:90%" value="${rspApplyUnit.unit_enterprise_type}"/>
				</td>
				<th><font color="red"></font>行业：</th>
				<td>
					<input type="text" name="unit_industry" id="unit_industry" style="width:90%" value="${rspApplyUnit.unit_industry}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>股东：</th>
				<td>
					<input type="text" name="unit_shareholder" id="unit_shareholder" style="width:90%" value="${rspApplyUnit.unit_shareholder}"/>
				</td>
				<th><font color="red"></font>联系人：</th>
				<td>
					<input type="text" name="unit_contact_man" id="unit_contact_man" style="width:90%" value="${rspApplyUnit.unit_contact_man}"/>
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