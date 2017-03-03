<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.rsp.applyInfo.person.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.core.dict.ApasDictBussiness" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	ApasDictBussiness apasDictBussiness  =new ApasDictBussiness();
	RspApplyPerson rspApplyPerson = new RspApplyPersonManager().doFindBeanByKey(unid);
	if (null == rspApplyPerson) {
		fn = "add";
		rspApplyPerson = new RspApplyPerson();
		rspApplyPerson.setPerson_unid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("rspApplyPerson", rspApplyPerson);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/datepicker/WdatePicker.js"></script>
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/rsp/rspApplyPersonAction.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="person_unid" id="person_unid" value="${rspApplyPerson.person_unid}"/>
		<input type="hidden" name="unid" id="unid" value="<%=rspApplyPerson.getPerson_unid()%>">
		<table width="98%" align="center" class="form_table_ext">
			<col width="18%" align="right">
			<col width="32%" align="left">
			<col width="18%" align="right">
			<col width="32%" align="left">
			<tr>
				<th><font color="red">*</font>用户名称：</th>
				<td>
					<input type="text" name="person_username" id="person_username" style="width:90%" value="${rspApplyPerson.person_username}"/>
				</td>
				<th><font color="red"></font>用户简称：</th>
				<td>
					<input type="text" name="person_useralias" id="person_useralias" style="width:90%" value="${rspApplyPerson.person_useralias}"/>
				</td>	
			</tr>
	  		<tr>
				<th><font color="red"></font>用户类型：</th>
				<td>
					<select name="person_usertype" id="person_usertype" style="width:90%">
			            <%=apasDictBussiness.getSelectList("用户类型", rspApplyPerson.getPerson_usertype())%>
			        </select>
				</td>
				<th><font color="red"></font>手机号码：</th>
				<td>
					<input type="text" name="person_mobile" id="person_mobile" style="width:90%" value="${rspApplyPerson.person_mobile}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>电话号码：</th>
				<td>
					<input type="text" name="person_phone" id="person_phone" style="width:90%" value="${rspApplyPerson.person_phone}"/>
				</td>
				<th><font color="red"></font>Email地址：</th>
				<td>
					<input type="text" name="person_email" id="person_email" style="width:90%" value="${rspApplyPerson.person_email}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>联系地址：</th>
				<td colspan="3">
					<input type="text" name="person_address" id="person_address" style="width:96%" value="${rspApplyPerson.person_address}"/>
				</td>
			</tr>	
			<tr>
				<th><font color="red"></font>传真号码：</th>
				<td>
					<input type="text" name="person_fax" id="person_fax" style="width:90%" value="${rspApplyPerson.person_fax}"/>
				</td>
				<th><font color="red"></font>内外网有效性：</th>
				<td>
					<select name="person_enable" id="person_enable" style="width:90%">
			            <%=apasDictBussiness.getSelectList("内外网有效性", rspApplyPerson.getPerson_enable())%>
			        </select>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>用户标识：</th>
				<td>
					<input type="text" name="person_usercode" id="person_usercode" style="width:90%" value="${rspApplyPerson.person_usercode}"/>
				</td>
				<th><font color="red"></font>CA证书KEY：</th>
				<td>
					<input type="text" name="person_cakey" id="person_cakey" style="width:90%" value="${rspApplyPerson.person_cakey}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>创建时间：</th>
				<td>
					<input type="text" id="person_createtime" name="person_createtime" class="Wdate" readonly value="${rspApplyPerson.person_createtime}" onclick="WdatePicker({skin:'whyGreen',isShowOthers:false})">
				</td>
				<th><font color="red"></font>修改时间：</th>
				<td>
					<input type="text" id="person_modifytime" name="person_modifytime" class="Wdate" readonly value="${rspApplyPerson.person_modifytime}" onclick="WdatePicker({skin:'whyGreen',isShowOthers:false})">
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>操作者unid：</th>
				<td>
					<input type="text" readonly name="person_operunid" id="person_operunid" style="width:90%" readonly value="${rspApplyPerson.person_operunid}"/>
				</td>
				<th><font color="red"></font>操作者：</th>
				<td>
					<input type="text" readonly name="person_opername" id="person_opername" style="width:90%" value="${rspApplyPerson.person_opername}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red"></font>数据来源：</th>
				<td colspan="3">
					<input type="text" name="person_datafrom" id="person_datafrom" style="width:96%" value="${rspApplyPerson.person_datafrom}"/>
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