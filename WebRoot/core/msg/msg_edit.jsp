<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.message.*"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%@page import="com.linewell.core.util.UNIDGenerate"%>
<%@page import="com.linewell.core.util.DateTime"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%
    /*获取当前用户的信息*/
	Session ucapSession = (Session)session.getAttribute(Session.SESSION_NAME);
	User user = ucapSession.getUser();
	String menuType = request.getParameter("menutype");
    if (null == user) {
        response.sendRedirect("login.jsp");
        return;
    }
    
    String unid = request.getParameter("unid");
    if(!StrUtil.isNull(unid)){
    	response.sendRedirect("msg_receive.jsp?menutype="+menuType+"&unid="+unid);
    	return;
    }
    
    //获取消息的类型
    String msgtypeclass = request.getParameter("msgtype");
    String relevanceunid = request.getParameter("relevanceunid");
    String relevancetype = request.getParameter("relevancetype");
    relevancetype = StrUtil.isNull(relevancetype) ? "消息" : relevancetype;
    
    String tmpMsgClass = "";
    if (MsgType.SYSMSG.equals(msgtypeclass)) {
        tmpMsgClass = "系统消息";
    }
    if (MsgType.EFFIMSG.equals(msgtypeclass)) {
        tmpMsgClass = "催办消息";
    }
    if (MsgType.CROSSSYS.equals(msgtypeclass)) {
        tmpMsgClass = "跨系统消息";
    }
    
	Msg msg = new MsgManager().doFindBeanByKey(unid);
	String fn = "update";
	if (null == msg) {
		fn = "add";
		msg = new Msg();
		msg.setUnid(new UNIDGenerate().getUnid());
		msg.setRelevancetype(relevancetype);
		msg.setRelevanceunid(relevanceunid);
		msg.setSender(user.getDisplayName());
		msg.setSenderunid(user.getUnid());
		msg.setMsgtype(msgtypeclass);
		msg.setCreatetime(DateTime.getNowDateTime());
		msg.setApp_unid(ucapSession.getApp().getUnid());
	}
    
    request.setAttribute("path", request.getContextPath());
    request.setAttribute("msg", msg);
%>
<HTML>
<HEAD>
	<TITLE>短信编辑</TITLE>
	<META http-equiv=Content-Type content="text/html; charset=utf-8">
	<META http-equiv=pragma content=no-cache>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css"/>
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js" charset="gbk"></script>
	
</HEAD>
<BODY marginheight="0" marginwidth="0">
	<form id="jspForm" name="jspForm" method="post" action="${path}/Message.action">
	<input type="hidden" name="fn" value="<%=fn%>">
	<input type="hidden" name="unid" value="${msg.unid}">
	<input type="hidden" name="msgtype" value="${msg.msgtype}">
	<input type="hidden" name="senderunid" value="${msg.senderunid}">
	<input type="hidden" name="createtime" value="${msg.createtime}">
	<input type="hidden" name="relevancetype" value="${msg.relevancetype}">
	<input type="hidden" name="relevanceunid" value="${msg.relevanceunid}">
	<input type="hidden" name="app_unid" value="${msg.app_unid}">
	<div id="form_content">
		<div id="form_toolbar">
			<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 保存 </button>
			<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"/> 关闭 </button>
		</div>
		<div>
			<table width="100%" class="form_table_ext">
				<col width="15%" align="right">
				<col width="35%" align="left">
				<col width="15%" align="right">
				<col width="35%" align="left">
				<tr>
					<th>发送者：</th>
					<td colspan="3">
						<input type="text" readonly name=sender  style="width:40%" value="${msg.sender}"/>
					</td>
				</tr>
				<tr>
					<th>消息类型：</th>
					<td><%=tmpMsgClass%>
					</td>
					<th>消息级别：</th>
					<td>
						<select name="msglevel">
							<option value="普通消息">普通消息</option>
							<option value="紧急消息">紧急消息</option>
							<option value="特急消息">特急消息</option>
						</select>
					</td>
				</tr>
				<tr>
					<th>消息类型：</th>
					<td colspan="3">
						<label><input type="radio" name="needreply" id="needreply" value="0" checked="checked">不需要回复</label>
						<label><input type="radio" name="needreply" id="needreply" value="1">需要回复</label>
						<font color="#FF0000">(选择是否需要接收者回复信息)</font> 
					</td>
				</tr>
				<!--<tr id="effiMsg" style="display: none;">
	            	<td height="26" align="right" nowrap><div align="left">催办方式</div></td>
	               	<td colspan="3" align="left">
	               		<input type="checkbox" name="smsCheck" value="2" >短信方式催办
	               		<input type="checkbox" name="sysCheck" value="1" >系统催办消息
	              	</td>
	            </tr>
	            -->
				<tr>
					<th>接收类型：</th>
					<td colspan="3">
						<select name="revType" id="revType">
							<option value="person">系统人员</option>
							<option value="dept">部门</option>
						</select>
					</td>
				</tr>
			
				<tr id=person >
					<th>选择：</th>
					<td colspan="3">
						<input name="seldeptpersonname" type="text" id="seldeptpersonname" style="width:80%" readonly class="required" title="请选择人员">
						<input name="seldeptpersonunid" type="hidden" id="seldeptpersonunid" value=''>
						<input type="button" name="personbut" value="选择" onClick="selectPersion();">
					</td>
				</tr>
				<tr>
					<th>标题：</th>
					<td colspan="3">
						<input value="<%=msg.getTitle()%>" name="title" id="title" style="width:80%" type="text" class="required" title="请填写标题">
					</td>
				</tr>
				<tr>
					<th>发送内容：</th>
					<td colspan="3">
						<textarea name="content" style="width:80%" rows="8" id="content" class="required" title="请填写内容">${msg.content}</textarea>
					</td>
				</tr>
				<tr>
					<th>附件：</th>
					<td colspan="3" id="td_file">
						<input type="text" name="filepath" id="filepath" value="" style="width:77%" readonly>
       					<input id="uploadify" class="uploadify" type="file" name="file" style="display: none;"/>
					</td>
				</tr>			
			</table>
		</div>
	</div>
	</form>
	<script type="text/javascript">
		
	   	jQuery(function(){
			$("#btnSave").bind("click",doSave);
			$("#btnClose").bind("click",doClose);
		 	$(".uploadify").uploadify({   
	          	'uploader'       : '${path}/core/js/uploadify/uploadify.swf',   
	          	'script'         : '${path}/AppFile.action?belongTo=${msg.unid}',   
	          	'buttonImg'	     : '${path}/core/js/uploadify/theme/default/fill-090.png',
	          	'cancelImg'      : '${path}/core/js/uploadify/cancel.png',   
	          	'height'         : 16,
	  		  	'width'          : 16,
	          	'auto'           : true,   
	          	'multi'          : true,   
	          	'sizeLimit'      : 2048000, 
	          	'fileDataName'   :'file',
	          	//'fileDesc'       : '支持格式：doc,docx',
	          	//'removeCompleted' : false,
	          	'fileExt'         : '*.*;' ,
	          	onComplete:function(event, ID, fileObj, response, data){
		          	var json = $.parseJSON(response);
		          	if(json.success){
		          		var html = "<div style='margin:3px;'>";
			          	html += "<img src='${path}/core/themes/default/images/admin/icon/blue-document-word-text.png'/>";
			          	html += "<a href=\"javascript:downloadFile('"+json.unid+"')\">"+fileObj.name+"</a>";
			          	html += "</div>";
			          	$("#td_file").append(html);
		          		$("#filepath").val(json.appFile.file_path);
		          	}
	          	},
	          	onError:function(event,ID,fileObj,errorObj){
		       		if(errorObj.type=='File Size'){
		       			alert("文件过大");
		       		}
	          	}
	      	});
		})
		
		//文件下载	
		function downloadFile(unid){
			location.href = "${path}/core/file/file_download.jsp?unid="+unid;
		}
			
		function doSave(){
			if(validate.validate()){
				$("#jspForm").ajaxSubmit({
					dataType:'json',
					error:function(){
						top.lwin.errorService();
					},
					success:function(data){
						if(data.result){
							alert('操作成功！');
							top.lwin.close(true);
						}else{
							top.lwin.alert("信息提示","操作失败","error",1500);
						}
					}
				});
			}
		}
		
		function doClose(){
			top.lwin.close(true);
		}
		
		//选择消息接收人员	
		function selectPersion(){
			if($('#revType').val() == 'dept'){
				top.lwin.open("/core/permission/choose_personnel_range.jsp?displayId=seldeptpersonname&fn=getDept&hiddenId=seldeptpersonunid&separate=,","选择",600,450);
			}else if($('#revType').val() == 'person'){
				top.lwin.open("/core/permission/choose_personnel_range.jsp?displayId=seldeptpersonname&fn=getPersion&hiddenId=seldeptpersonunid&separate=,","选择",600,450);
			}
		}
	</script>
	<script type="text/javascript">
		var validate = new Validation('jspForm', { 
	    	immediate: true,
		    validators: {
		      	title:'required',
		      	content:'required'
		    },
		    messages:{
		    	title:'请填写[标题]',
		    	content:'请选择[内容]'
		    }
	  	});	
	</script>
</BODY>
</HTML>