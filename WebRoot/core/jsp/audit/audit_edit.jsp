<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.audit.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate"%>
<%@include file="/core/params.jsp"%>
<%
    String fn = "update";
    String unid = request.getParameter("unid");

    Audit audit = new AuditBusiness().doFindBeanByKey(unid);
    if (null == audit) {
        fn = "add";
        audit = new Audit();
        audit.setUnid(new UNIDGenerate().getUnid());
    }

    request.setAttribute("audit", audit);
    request.setAttribute("path", request.getContextPath());
%>

<html>
	<head>
		${import_theme} ${import_jquery} ${import_validation}
	</head>
	<body>
		<div id="form_content">
			<div id="form_toolbar">
				<button class="form_btn" id="btnClose">
					<img src="${path}/core/themes/default/images/admin/default_btn.gif">
					关闭
				</button>
			</div>
			<div>
				<form id="jspForm" name="jspForm" method="post" action="${path}/audit.action">
					<input type="hidden" id="fn" name="fn" value="<%=fn%>">
					<input type="hidden" name="unid" id="unid" value="<%=audit.getUnid()%>">
					<table width="98%" align="center" class="form_table">
						<tr>
							<th width=100px align=right>
								<font color='red'>*</font>用户名
							</th>
							<td>
								${audit.ouser_cn_}
							</td>
							<th width=100px align=right>
								<font color='red'>*</font>登录账号
							</th>
							<td>
								${audit.account}
							</td>
						</tr>
						<tr>
							<th width=120px align=right>
								<font color='red'>*</font>客户端浏览器
							</th>
							<td>
								${audit.clientbrowser}
							</td>
							<th width=100px align=right>
								<font color='red'>*</font>客户端IP
							</th>
							<td colspan='3'>
								<p>
									${audit.clientip}
								</p>
							</td>
						</tr>
						<tr>
							<th width=100px align=right>
								<font color='red'>*</font>系统名称
							</th>
							<td>
								${audit.appname}
							</td>
							<th width=100px align=right>
								<font color='red'>*</font>操作时间
							</th>
							<td>
								${audit.createtime}
							</td>
						</tr>
						<tr>
							<th width=100px align=right>
								<font color='red'>*</font>操作信息
							</th>
							<td colspan="3">
								${audit.remark}
							</td>
						</tr>
					</table>
				</form>
			</div>
		</div>
		<script type="text/javascript">
	//绑定事件
	$(function(){
		$("#btnClose").bind("click",doClose);
	});
	
	//关闭窗口
	function doClose(){
		top.lwin.close(true);
	}
</script>
	</body>
</html>