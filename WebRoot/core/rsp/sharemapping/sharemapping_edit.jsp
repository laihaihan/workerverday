<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.rsp.mapping.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@	page import="com.linewell.apas.service.material.ApasMaterialManager"%>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	ShareMapping shareMapping = new ShareMappingManager().doFindBeanByCondition(" materialid = '"+unid+"'");
	if (null == shareMapping) {
		fn = "add";
		shareMapping = new ShareMapping();
		shareMapping.setUnid(new UNIDGenerate().getUnid());
		shareMapping.setMaterialid(unid);
	}
	
	request.setAttribute("shareMapping", shareMapping);
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
		<form id="jspForm" name="jspForm" method="post" action="${path}/ShareMapping.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=shareMapping.getUnid()%>">
		<input type="hidden" name="materialid" id="materialid" value="<%=shareMapping.getMaterialid()%>">
		<input type="hidden" name="serviceid" id="serviceid" value="<%=shareMapping.getServiceid()%>">
		<table width="98%" align="center" class="form_table_ext">
			<col width="20%" align="right">
			<col width="80%" align="left">
			<tr style="display: none">
				<th>是否自动填充：</th>
				<td>
					<input type="radio" name="iaautomapp" id="iaautomapp" value="Y" <%="Y".equals(shareMapping.getIaautomapp())?"checked":"" %>>是
					<input type="radio" name="iaautomapp" id="iaautomapp" value="N" <%=!"Y".equals(shareMapping.getIaautomapp())?"checked":"" %>>否
				</td>
			</tr>
			<tr>
				<th>是否启用：</th>
				<td>
					<input type="radio" name="isvalid" id="isvalid" value="Y" <%="Y".equals(shareMapping.getIsvalid())?"checked":"" %>>是
					<input type="radio" name="isvalid" id="isvalid" value="N" <%=!"Y".equals(shareMapping.getIsvalid())?"checked":"" %>>否
				</td>
			</tr>
			<tr>
				<th>开始时间：</th>
				<td>
					<input type="text" id=validbtime name=validbtime class="Wdate" value="${shareMapping.validbtime}" onclick="WdatePicker({skin:'whyGreen',isShowOthers:false})"/>
				</td>
			</tr>
			<tr>
				<th>截止时间：</th>
				<td>
					<input type="text" id=validetime name=validetime class="Wdate" value="${shareMapping.validetime}" onclick="WdatePicker({skin:'whyGreen',isShowOthers:false})"/>
				</td>
			</tr>
			<tr>
				<th>关联的材料：</th>
				<td>
					<input size="80" type="text" id=mappingmaterialidvalue name=mappingmaterialidvalue value="<%=new ApasMaterialManager().setIdsToNames(shareMapping.getMappingmaterialids()) %>"/>
					<input size="80" type="hidden" id=mappingmaterialids name=mappingmaterialids value="${shareMapping.mappingmaterialids}"/>
					<input type="button" class="btnOnlyChannel"  id="btnselMaterial">
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
		$("#btnselMaterial").bind("click",selMateriate);
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
							location.href='?unid=<%=unid%>';
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

	function selMateriate(){
		var url = "${path}/was/tree/material_select.jsp?_rand="+Math.random();
		var returnValue  =window.showModalDialog(url,0, "dialogHeight=480px;dialogWidth=500px;center=y;resizable=1;status=0;scroll=1;");
		if(null!=returnValue){
			var arry =returnValue.split(";");
        	jQuery("#mappingmaterialidvalue").val(arry[1]);
        	jQuery("#mappingmaterialids").val(arry[0]);
        }
	}

	//表单验证
	var validate = new Validation('jspForm', {
    	immediate:true,
	    validators:{
	      	
	    },
	    messages:{
	    	
	    }
  	});	
</script> 
</body>
</html>
