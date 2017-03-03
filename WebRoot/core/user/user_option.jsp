<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.db.JDBCTool"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	User user = ucapsession.getUser();
	
	String sql = "select * from ucap_opinion t where t.opinion_user_unid='"+user.getUnid()+"' order by t.opinion_sort";
	List opinionList = JDBCTool.doSQLQueryList(GlobalParameter.APP_UCAP,sql);
	
	request.setAttribute("path",request.getContextPath()); 
	request.setAttribute("opinionList",opinionList); 
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
			<button class="form_btn" id="btnSave"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
			<button class="form_btn" id="btnClose"> <img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
		</div>
		<div style="background: #ffffff">		
			<form id="jspForm" name="jspForm" method="post" action="${path}/UserCenter.action" class="required-validate">
			<input type="hidden" name="fn" value="setUserOpinion">
			<input type="hidden" name="userunid" value="<%=user.getUnid() %>">
			<table width="100%" class="form_table_ext">
				<col width="80" align="right" style="padding-right:5px;">
				<col align="left">
				<s:if test="#request.opinionList.size()>0">
					<s:iterator value="#request.opinionList" id="opinion">
					<tr>
						<th><font color="red">*</font>常用意见${opinion.opinion_sort}：</th>
						<td>
							<input type="text" name="opinion" style="width:70%;" value="${opinion.opinion_content}" class="required" title="必填">
							<img onclick="doAdd(this)" src="${path}/core/js/easyui/themes/icons/add.gif">&nbsp;&nbsp;
							<img onclick="doDelete(this)" src="${path}/core/js/easyui/themes/icons/delete.gif">
						</td>
					</tr>
					</s:iterator>			
				</s:if>
				<s:else>
				<tr>
					<th><font color="red">*</font>常用意见1：</th>
					<td>
						<input type="text" name="opinion" style="width:70%;" class="required" title="必填">
						<img onclick="doAdd(this)" src="${path}/core/js/easyui/themes/icons/add.gif">&nbsp;&nbsp;
						<img onclick="doDelete(this)" src="${path}/core/js/easyui/themes/icons/delete.gif">
					</td>
				</tr>
				</s:else>			
			</table>
			</form>
		</div>
	</div>
	
	<script type="text/javascript">
		$(function(){
			$(".form_table_ext img").css("cursor","hand");
			$("#btnSave").bind("click",doSave);
			$("#btnClose").bind("click",doClose);
		});
		
		//保存表单信息
		function doSave(){
			var validate = new Validation('jspForm');
			if(validate.validate()){
				$("#jspForm").ajaxSubmit({
					dataType:'json',
					error:function(){
						top.lwin.errorService();
					},
					success:function(data){
						if(data.result){
							reloadUser();
							top.popup.close('pWin');
						}else{
							top.lwin.alert('操作提示','操作失败','error');
						}
					}
				});
			}
		}
		
		//关闭窗口
		function doClose(){
			//top.popup.close();
			//关闭窗口并刷新父页面,因为提交页面调用时、要再次刷新才能把新增加的个人意见显示出来、以供选择 modify by zwenyu 20120727
			top.popup.close('pWin');
		}
		
		//新增意见
		function doAdd(e){
			var tr = $(e).parent().parent();
			var clone = tr.clone(true);//复制当前行
			var font=$('<font color="red">*</font>');
			clone.find('th').text('常用意见'+($(".form_table_ext tr").length + 1) + "：").prepend(font);
			clone.find(':text[name=opinion]').val('');
			$(".form_table_ext").append(clone);
			$(':text[name=opinion]:last').focus();
		}
		
		//删除意见
		function doDelete(e){
			if($(".form_table_ext tr").length == 1){
				top.lwin.alert('操作提示','已经是最后一行了，不能删除！','warning',1500,true);
			}else{
				$(e).parent().parent().remove();
			}
			$(".form_table_ext tr").each(function(index,obj){
				$(obj).find("th").text("常用意见" + (index + 1) + "：");//重新设置序号
			})
		}
		function reloadUser(){
			$.ajax({
				cache:false,
				async:false, //同步执行（默认Ajax为异步）
				url:'UserCenter.action',
				data: {
		   			fn:'reloadUser',
		   			type:'UserCenter',
		   			userunid:'<%=user.getUnid()%>'
		   		},
				success:function(responseText){
					top.lwin.alert('操作提示','操作成功','info');
				},
				error:function(responseText){
					top.popup.errorService();
				}
			});
		}
	</script>
</body>
</html>