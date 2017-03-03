<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.rsp.applyuser.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@	page import="com.linewell.core.util.DateTime"%>
<%@	page import="com.linewell.core.dict.*"%>
<%@	page import="com.linewell.core.rsp.RspConstant"%>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	RspApplyuser rspApplyuser = new RspApplyuserManager().doFindBeanByKey(unid);
	if (null == rspApplyuser) {
		fn = "add";
		rspApplyuser = new RspApplyuser();
		rspApplyuser.setUnid(new UNIDGenerate().getUnid());
		rspApplyuser.setCreatetime(DateTime.getNowDateTime());
		rspApplyuser.setDatafrom(RspConstant.DATAFROM_SHOU_GONG);
	}
	
	request.setAttribute("rspApplyuser", rspApplyuser);
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
		<button class="form_btn" id="btnSave"> 
			<img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 
		</button>
		<button class="form_btn" id="btnClose"> 
			<img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 
		</button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/RspApplyuser.action">
		<input type="hidden"  id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid"  value="<%=rspApplyuser.getUnid()%>">
		<input type="hidden" name="createtime" id="createtime"  value="${rspApplyuser.createtime}"/>
		<input type="hidden" name="modifytime" id="modifytime"  value="${rspApplyuser.modifytime}"/>
		<input type="hidden" name="datafrom" id="datafrom"  value="${rspApplyuser.datafrom}"/>
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<tr>
				<th><font color="red">*</font>用户名称：</th>
				<td colspan="3">
					<input type="text" name="username" id="username" style="width:90%" value="${rspApplyuser.username}"/>
				</td>
			</tr>
			<tr>
				<th>用户简称：</th>
				<td>
					<input type="text" name="useralias" id="useralias" style="width:90%" value="${rspApplyuser.useralias}"/>
				</td>
				<th>用户编码：</th>
				<td >
					<input type="text" name="usercode" id="usercode" style="width:75%" value="${rspApplyuser.usercode}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>用户类型：</th>
				<td >
					<%=new ApasDictBussiness().getRadio("共享库-用户类型","usertype",rspApplyuser.getUsertype()) %>
				</td>
				<th>传真号码：</th>
				<td>
					<input type="text" name="fax" id="fax" style="width:75%" value="${rspApplyuser.fax}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>手机号码：</th>
				<td >
					<input type="text" name="mobile" id="mobile" style="width:90%" value="${rspApplyuser.mobile}"/>
				</td>
		
				<th>电话号码：</th>
				<td >
					<input type="text" name="phone" id="phone" style="width:75%" value="${rspApplyuser.phone}"/>
				</td>
			</tr>
			<tr>
				<th>Email地址：</th>
				<td >
					<input type="text" name="email" id="email" style="width:90%" value="${rspApplyuser.email}"/>
				</td>
				<th>CA证书KEY：</th>
				<td >
					<input type="text" name="cakey" id="cakey" style="width:75%" value="${rspApplyuser.cakey}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>联系地址：</th>
				<td colspan="3">
					<input type="text" name="address" id="address" style="width:90%" value="${rspApplyuser.address}"/>
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
		top.lwin.close(true);
	}

	//表单验证
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      		username:'required',
	      		mobile:['required','mobilephone'],
	      		address:'required',
	      		email:'email'
	    },
	    messages:{
	    		username:'请填写[用户名称]',
	    		mobile:['请填写[手机号码]','[格式不正确]'],
	    		address:'请填写[联系地址]',
	    		email:'[邮件格式不正确]'
	    }
  	});	
</script> 
</body>
</html>
