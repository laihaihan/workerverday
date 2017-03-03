<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="com.linewell.core.util.ClobUtil" %>
<%@ page import="com.linewell.core.form.content.*" %>
<%@ page import="com.linewell.core.form.design.*" %>


<%
	request.setAttribute("path", request.getContextPath());

	String punid = request.getParameter("punid");
	FormContentManager formContentManager = new FormContentManager();
	FormContent formContent = formContentManager.doFindBeanByKey(punid);
	
	FormDesignBussiness formDesignBussiness = new FormDesignBussiness();
	List list = formDesignBussiness.getVerificationList(punid);
%>
<html>
	<head>
		<title>自定义表单验证</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
		<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
		<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
		<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
		<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
		<%=ClobUtil.clobToStr(formContent.getLinkcontent()) %>
		<%=ClobUtil.clobToStr(formContent.getScriptcontent()) %>
		<%=ClobUtil.clobToStr(formContent.getCsscontent()) %>
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
	</div>
	<form  id="jspForm" name="jspForm" method="post"  action="${path}/FormDesign.action" method="post">
		<input type="hidden" name="punid" value="<%=punid%>">
		<input type="hidden" name="fn" value="verification">
		<%
		out.println(ClobUtil.clobToStr(formContent.getBodycontent()));
		%>
	</form>
	
	
	</body>
</html>

<script type="text/javascript">
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
		
		
		//重构页面
		 jQuery("#jspForm :input").each(function(){
			if(jQuery(this).attr('type')!='hidden'){
				var afterhtmlcontent = "<select id='"+jQuery(this).attr('name')+"' name='"+jQuery(this).attr('name')+"'>";
				afterhtmlcontent = afterhtmlcontent + "<option value='0'>---请选择验证方式---</option>";
				afterhtmlcontent = afterhtmlcontent + "<option value='1'>不允许空验证</option>";
				afterhtmlcontent = afterhtmlcontent + "<option value='2'>数字验证</option>";
				afterhtmlcontent = afterhtmlcontent + "<option value='3'>日期验证</option>";
				afterhtmlcontent = afterhtmlcontent + "<option value='4'>邮件验证</option>";
				afterhtmlcontent = afterhtmlcontent + "<option value='5'>浮点型验证</option>";
				afterhtmlcontent = afterhtmlcontent + "<option value='6'>只允许输入英文字母验证</option>";
				afterhtmlcontent = afterhtmlcontent + "<option value='7'>只允许输入字母或者数字验证</option>";
				afterhtmlcontent = afterhtmlcontent + "</select>";
		     	jQuery(this).after(afterhtmlcontent);
				jQuery(this).remove();
			}
		  });
		  
		  <%//填充上次选中值
			if(null != list && list.size()>0){
				for(int i = 0 ;i <list.size(); i ++){
					FormDesign formDesign = (FormDesign)list.get(i);
			%>
					jQuery("#<%=formDesign.getColumnname()%>").val("<%=formDesign.getVerifymodule()%>");
			<%		
				}
			}
		  %>		
	});
	
	function doSave(){
		$("#jspForm").ajaxSubmit({
			dataType:'json',
			error:function(){
				top.lwin.alert("信息提示","操作失败","error");
			},
			success:function(data){
				if(data.result){
					top.lwin.alert('操作提示','操作成功','info');
				}else{
					top.lwin.alert("信息提示","操作失败","error");
				}
				top.lwin.close(true);
			}
		});
		
	}
	
	function doClose(){
		top.lwin.close();
	}
	
	
	
</script>	