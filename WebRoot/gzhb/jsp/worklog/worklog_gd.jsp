<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.work.worklog.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.core.util.DateTime"%>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String username = uSession.getUser().getDisplayName();
	String userid = uSession.getUser().getUnid();
	
	WorkLog worklog = new WorkLogBusiness().doFindBeanByKey(unid);
 
	
	request.setAttribute("worklog", worklog);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	${import_theme}
	${import_jquery} 
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
 		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/worklog.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=worklog.getUnid()%>"> 
		<input type="hidden" name="shenpirenid" id="shenpirenid" value="<%=userid%>">
		<input type="hidden" name="shenpiren" id="shenpiren" value="<%=username%>">
		<input type="hidden" name="zhuangtai" id="zhuangtai" value="<%=worklog.getZhuangtai()%>">
		<input type="hidden" name="shenpishijian" id="shenpishijian" value="<%=DateTime.getNowDateTime()%>">
 		<table width="98%" align="center" class="form_table">
			<tr>
			  <th colspan="4"  style="weith:100%" align="center"> <%=worklog.getHuibaoren()%>今日计划</th>
 			</tr>
			<tr>
 			  <td colspan="4">
 			    ${worklog.huibaoneirong}
			  </td>
			</tr>
			 <tr>
			  <th colspan="4"   style="weith:100%" align="center"> <%=worklog.getHuibaoren()%>今日总结</th>
			</tr>
			 <tr>
 			  <td colspan="4">
 			    ${worklog.jinrizongjie}
 			  </td>
			</tr>
			
			
			<tr>
			  <th  colspan="4"  style="weith:100%" align="center"><%=worklog.getShenpiren()%> 审批意见</th>
 			</tr>
			<tr>
 			  <td colspan="4">
 			     ${worklog.shenpiyijian}
			  </td>
			</tr>
		</table>
			<iframe  width='100%' frameborder='0' src='${path}/core/file/file_coreupload.jsp?unid=${worklog.unid}'></iframe>
		</form>
	</div>
</div>
<script type="text/javascript">
	//绑定事件
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
		$("#btnGuiDang").bind("click",doGuiDang); 
	});
	
	
	//归档结束
	function doGuiDang(){
		if(yanzhengend()){
 			$("#zhuangtai").val("结束");
 			if($("#shenpiyijian").val()==''){
 				$("#shenpiyijian").val() == '已阅';
 			}
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					if(data.result){
						top.lwin.alert('信息提示','操作成功','info',1500);
						window.location.href="worklog_sy.jsp?unid="+$("#unid").val();
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
	 			}
			});
		}		
    }
	 
	
	function yanzhengend(){
		if($("#shenpiyijian").val() == ''){
			top.lwin.alert('信息提示','请填写意见','info',2500);
			return  false;
		}
		return true;
	}
	
	
	//保存表单信息
	function doSave(){
		if(yanzhengend()){
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					if(data.result){
						top.lwin.alert('信息提示','操作成功','info',1500);
						$("#fn").val("update");
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
	 			}
			});
		} 
		
 	}
	
	//关闭窗口
	function doClose(){
		top.lwin.close("true");
	}

 	
</script> 
</body>
</html>