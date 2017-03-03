<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.util.ClobUtil"%>
<%@ page import="com.linewell.core.util.StrUtil"%>
<%@ page import="com.linewell.core.util.DateTime" %>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.ucap.session.Session" %>
<%@ page import="com.linewell.ucap.platform.cache.user.User" %>
<%@page import="com.linewell.core.notice.info.NoticeInfo"%>
<%@page import="com.linewell.core.notice.info.NoticeInfoManager"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
	User user = ucapSession.getUser();
	
	String fn = "update";
	String unid = request.getParameter("unid");
	NoticeInfo noticeInfo = new NoticeInfoManager().doFindBeanByKey(unid);
	if (null == noticeInfo) {
		fn = "add";
		noticeInfo = new NoticeInfo();
		noticeInfo.setUnid(new UNIDGenerate().getUnid());
		noticeInfo.setCreate_userunid(user.getUnid());
		noticeInfo.setCreate_username(user.getDisplayName());
		noticeInfo.setCreate_time(DateTime.getNowDateTime());
		noticeInfo.setApp_unid(ucapSession.getApp().getUnid());
	}
	
	request.setAttribute("noticeInfo", noticeInfo);
	request.setAttribute("path", request.getContextPath());
%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript">
		$(function(){
			$("#btnSave").bind("click",doSave);
			$("#btnPublish").bind("click",doPublish);
			$("#btnClose").bind("click",doClose);
		});
		
		function doSave(){
			if(validate.validate()){
				$("#jspForm").ajaxSubmit({
					dataType:'json',
					error:function(){
						top.popup.errorService();
					},
					success:function(data){
						top.popup.alert('操作提示','操作成功','info');
						top.popup.close(true);
					}
				});
			}
		}
		
		function doPublish(){
			$("#publish_userunid").val("<%=user.getUnid()%>");
			$("#publish_username").val("<%=user.getDisplayName()%>");
			$("#publish_time").val("<%=DateTime.getNowDateTime()%>");
			doSave();
		}
		
		function doClose(){
			top.popup.close(true);
		}
	</script>
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 保存 </button>
		<button class="form_btn" id="btnPublish"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 发布 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/NoticeInfo.action" enctype="multipart/form-data">
		<input type="hidden" name="fn" value="<%=fn%>">
		<input type="hidden" name="app_unid" value="${noticeInfo.app_unid}">
		<input type="hidden" name="unid" value="${noticeInfo.unid}">
		<input type="hidden" name="create_userunid" value="${noticeInfo.create_userunid}">
		<input type="hidden" name="publish_userunid" id="publish_userunid" value="${noticeInfo.publish_userunid}">
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">
		   	<tr>
		      	<th><font color="#FF0000">*</font>公告标题：</th>
		       	<td colspan="3">
		       		<input type="text" name="title" id="title" style="width:90%" value="${noticeInfo.title}">	
		       	</td>
		   	</tr>
			<tr>
				<th>创建人员：</th>
				<td>
					<input type="text" name="create_username" style="width:90%" value="${noticeInfo.create_username}" readonly/>
				</td>
				<th>创建时间：</th>
				<td>
					<input type="text" name="create_time" style="width:77%" value="${noticeInfo.create_time}" readonly/>
				</td>
			</tr>
			<tr>
				<th>发布人员：</th>
				<td>
					<input type="text" name="publish_username" id="publish_username" style="width:90%" value="${noticeInfo.publish_username}" readonly/>
				</td>
				<th>发布时间：</th>
				<td>
					<input type="text" name="publish_time" id="publish_time" style="width:77%" value="${noticeInfo.publish_time}" readonly/>
				</td>
			</tr>
			<tr>
				<th>重要等级：</th>
				<td>
					<select name="important_level">
						<option value="1" ${noticeInfo.important_level=="1" ? "selected" : ""}>普通</option>
						<option value="2" ${noticeInfo.important_level=="2" ? "selected" : ""}>重要</option>
					</select>
				</td>
				<th><font color="#FF0000">*</font>排序号：</th>
				<td>
					<input type="text" name="sortid" id="sortid" style="width:77%" value="${noticeInfo.sortid}"/>
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<textarea name="content" id="content" style="width:100%;display:none" rows="5"><%=StrUtil.formatNull(ClobUtil.clobToStr(noticeInfo.getContent())) %></textarea>
		          	<IFRAME ID="eWebEditor1" src="${path}/eWebEditor/ewebeditor.htm?id=content&style=coolblue" frameborder="0" scrolling="no" width="750" height="450"></IFRAME>
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
	      	title:'required',
	      	sortid:'float'
	    },
	    messages:{
	    	title:'请填写[公告标题]',
	    	sortid:'[排序号]必须为数字'
	    }
  	});	
</script> 
</body>
</html>