<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.work.worklog.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.core.util.DateTime"%>
<%@page import="com.linewell.core.ucap.user.UserManager"%>
<%@page import="com.linewell.core.ucap.user.User"%>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String username = uSession.getUser().getDisplayName();
	String userid = uSession.getUser().getUnid();
	
	WorkLog worklog = new WorkLogBusiness().doFindBeanByKey(unid);
	if (null == worklog) {
		fn = "add";
		worklog = new WorkLog();
		worklog.setUnid(new UNIDGenerate().getUnid());
		worklog.setHuibaoshijian(DateTime.getNowDateTime());
		worklog.setHuibaoren(username);
		worklog.setHuibaoneirongid(userid);
	}
	
	//当前用户直属领导
	String leaders = uSession.getUser().getLeaders();

	
	
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
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		 <%
		 if(null != leaders&&fn == "update"){ 
			 String[] leaderArray = leaders.split(",");
			 for(int i =  0 ; i < leaderArray.length ; i ++ ){
					UserManager um = new UserManager();
					User userTmp = um.doFindBeanByKey(leaderArray[i]);
			 %>
			 <button class="form_btn" onclick="doSend('<%=userTmp.getUser_unid()%>','<%=userTmp.getUser_display_name()%>');"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 送<%=userTmp.getUser_display_name() %></button>
			 <%
			 }
		 }
		 
		 %>
 		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/worklog.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=worklog.getUnid()%>">
		<input type="hidden" name="huibaoren" id="huibaoren" value="<%=worklog.getHuibaoren()%>">
		<input type="hidden" name="huibaoneirongid" id="huibaoneirongid" value="<%=worklog.getHuibaoneirongid()%>">
		<input type="hidden" name="huibaoshijian" id="huibaoshijian" value="<%=worklog.getHuibaoshijian()%>">
		<input type="hidden" name="shenpirenid" id="shenpirenid" value="">
		<input type="hidden" name="shenpiren" id="shenpiren" value="">
 		<table width="98%" align="center" class="form_table">
			 
			<tr>
			  <th  colspan="4"  style="weith:100%" align="center"> 上班了，今天你想要做什么！</th>
 			</tr>
			<tr>
 			  <td colspan="4">
 			    <textarea rows="8" cols="130"  name='worklog[]huibaoneirong' id='huibaoneirong' >${worklog.huibaoneirong}</textarea>
			  </td>
			</tr>
			 <tr>
			  <th colspan="4"   style="weith:100%" align="center"> 下班了，今天你做了什么！</th>
			</tr>
			 <tr>
 			  <td colspan="4">
 			    <textarea rows="8" cols="130"  name='worklog[]jinrizongjie' id='jinrizongjie' >${worklog.jinrizongjie}</textarea>
 			  </td>
			</tr>
			 <tr>
 			  <td colspan="4">
 			   ${worklog.shenpiren}意见： ${worklog.shenpiyijian}
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
 	});
	 
	
	//送审阅
	function doSend(shenpirenid,shenpiren){
		if(yanzhengstar()){
 			$("#fn").val("send");
 			$("#shenpirenid").val(shenpirenid);
 			$("#shenpiren").val(shenpiren); 
 			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					if(data.result){
						top.lwin.alert('信息提示','操作成功','info',1500);
						window.location.href="worklog_edit.jsp?unid="+$("#unid").val();
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
	 			}
			});
		}
    }
	
	
	function yanzhengstar(){
		if($("#huibaoneirong").val() == ''){
			top.lwin.alert('信息提示','今天你打算了什么？','info',2500);
			return  false;
		}
		return true;
	}
	
	function yanzhengend(){
		if($("#jinrizongjie").val() == ''){
			top.lwin.alert('信息提示','今天你做了什么？','info',2500);
			return  false;
		}
		return true;
	}
	
	
	//保存表单信息
	function doSave(){ 
		$("#jspForm").ajaxSubmit({
			dataType:'json',
			error:function(){
				top.lwin.errorService();
			},
			success:function(data){
				if(data.result){
					top.lwin.alert('信息提示','操作成功','info',1500);
					window.location.href="worklog_edit.jsp?unid="+$("#unid").val();
				}else{
					top.lwin.alert('信息提示','操作失败','error',1500);
				}
 			}
		});
 	}
	
	//关闭窗口
	function doClose(){
		top.lwin.close("true");
	}

 	
</script> 
</body>
</html>