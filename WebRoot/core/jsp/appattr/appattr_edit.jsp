<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.appattr.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	AppAttr appattr = new AppAttrBusiness().doFindBeanByKey(unid);
	if (null == appattr) {
		fn = "add";
		appattr = new AppAttr();
		appattr.setUnid(new UNIDGenerate().getUnid());
	}
	
	request.setAttribute("appattr", appattr);
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
		<form id="jspForm" name="jspForm" method="post" action="${path}/appattr.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=appattr.getUnid()%>">
		<input type="hidden" name="unid" id="unid" value="<%=appattr.getPunid()%>">
		<table width="98%" align="center" class="form_table">
			<tr>
  <th width=100px align=right><font color='red'>*</font>材料名称：</th>
  <td>
    <input  style='width:375px' type='text' name='appattr[]attrname' id='appattr[]attrname' value='${appattr.attrname}'/>
  </td>
  <th width=100px align=right><font color='red'>*</font>材料类型：</th>
  <td>
    <input  style='width:375px'  type='text' name='appattr[]attrtype' id='appattr[]attrtype' value='${appattr.attrtype}'/>
  </td>
</tr>
<tr>
  <th width=100px align=right><font color='red'>*</font>创建时间：</th>
  <td>
    <input  style='width:375px' type='text' name='appattr[]createtime' id='appattr[]createtime' value='${appattr.createtime}'/>
  </td>
  <th width=100px align=right><font color='red'>*</font>排序：</th>
  <td>
    <input  style='width:375px'  type='text' name='appattr[]sortid' id='appattr[]sortid' value='${appattr.sortid}'/>
  </td>
</tr>
<tr>
  <th width=100px align=right><font color='red'>*</font>材料说明：</th>
   <td colspan='3'>
   <input  style='width:100%' type='text' name='appattr[]meno' id='appattr[]meno' value='${appattr.meno}'/>
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