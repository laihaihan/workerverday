<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.appmaterial.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String punid = request.getParameter("punid");
	
	AppMaterial appmaterial = new AppMaterialBusiness().doFindBeanByKey(unid);
	if (null == appmaterial) {
		fn = "add";
		appmaterial = new AppMaterial();
		appmaterial.setUnid(new UNIDGenerate().getUnid());
		appmaterial.setPunid(punid);
	}
	
	request.setAttribute("appmaterial", appmaterial);
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
		<form id="jspForm" name="jspForm" method="post" action="${path}/appmaterial.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=appmaterial.getUnid()%>">
		<input type="hidden" name="punid" id="punid" value="<%=appmaterial.getPunid()%>">
		<table width="98%" align="center" class="form_table">
<tr>
  <th width=100px align=right><font color='red'>*</font>资料名称</th>
  <td>
    <input  style='width:375px' type='text' name='appmaterial[]infoname' id='appmaterial[]infoname' value='${appmaterial.infoname}'/>
  </td>
  
  <th width=100px align=right><font color='red'>*</font>类型</th>
  <td>
    <input  style='width:375px' type='text' name='appmaterial[]attrtype' id='appmaterial[]attrtype' value='${appmaterial.attrtype}'/>
  </td>
</tr>
<tr>
  <th width=100px align=right><font color='red'>*</font>资料说明</th>
  <td colspan="3">
  	<textarea rows="5" cols="120"  name='appmaterial[]meno' id='appmaterial[]meno' >${appmaterial.meno}</textarea>
  </td>
</tr>
<tr>
  <th width=100px align=right><font color='red'>*</font>排序号</th>
  <td colspan="3">
    <input  style='width:865px'  type='text' name='appmaterial[]sortid' id='appmaterial[]sortid' value='${appmaterial.sortid}'/>
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