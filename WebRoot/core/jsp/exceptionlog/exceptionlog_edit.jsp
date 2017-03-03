<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.log.exception.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate"%>
<%@page import="com.linewell.core.util.ClobUtil"%>
<%@include file="/core/params.jsp"%>
<%
    String fn = "update";
    String unid = request.getParameter("unid");

    ExceptionLog exceptionlog = new ExceptionLogBusiness().doFindBeanByKey(unid);
    if (null == exceptionlog) {
        fn = "add";
        exceptionlog = new ExceptionLog();
        exceptionlog.setUnid(new UNIDGenerate().getUnid());
    }

    request.setAttribute("exceptionlog", exceptionlog);
    request.setAttribute("path", request.getContextPath());
%>

<html>
	<head>
		${import_theme} ${import_jquery} ${import_validation}
	</head>
	<body>
		<div id="form_content">
			<div id="form_toolbar">
				<button class="form_btn" id="btnSave">
					<img src="${path}/core/themes/default/images/admin/default_btn.gif">
					保存
				</button>
				<button class="form_btn" id="btnClose">
					<img src="${path}/core/themes/default/images/admin/default_btn.gif">
					关闭
				</button>
			</div>
			<div>
				<form id="jspForm" name="jspForm" method="post" action="${path}/exceptionlog.action">
					<input type="hidden" id="fn" name="fn" value="<%=fn%>">
					<input type="hidden" name="unid" id="unid" value="<%=exceptionlog.getUnid()%>">
					<table width="98%" align="center" class="form_table">
						<tr>
							<th width=100px align=right>
								<font color='red'>*</font>用户名
							</th>
							<td>
								${exceptionlog.username}
							</td>
							<th width=100px align=right>
								<font color='red'>*</font>发生时间
							</th>
							<td>
								${exceptionlog.createtime}
							</td>
						</tr>
						<tr>
							<th width=100px align=right>
								<font color='red'>*</font>异常级别
							</th>
							<td>
								${exceptionlog.elevel}
							</td>
							<th width=100px align=right>
								<font color='red'>*</font>调用方法
							</th>
							<td>
								${exceptionlog.method}
							</td>
						</tr>
						<tr>
							<th width=150px align=right>
								<font color='red'>*</font>异常发生的位置
							</th>
							<td colspan="3">
								${exceptionlog.location}
							</td>
						</tr>
						<tr>
							<th width=100px align=right>
								<font color='red'>*</font>异常信息
							</th>
							<td colspan="3">
								<%=ClobUtil.clobToStr(exceptionlog.getMessage()) %>
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