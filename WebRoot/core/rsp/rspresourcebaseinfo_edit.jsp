<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.rsp.resource.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.core.util.DateTime"%>
<%@page import="com.linewell.core.dict.*"%>
<%@page import="com.linewell.core.rsp.RspConstant"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>

<%
	Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
    if (null == ucapSession || null == ucapSession.getApp()) {
        response.sendRedirect("login.jsp");
        return;
    }
	
	String fn = "update";
	String unid = request.getParameter("unid");
	String punid = request.getParameter("punid");
	String type =request.getParameter("type");
	
	ResourceBaseInfo resourceBaseInfo = new ResourceBaseInfoManager().doFindBeanByKey(unid);
	if (null == resourceBaseInfo) {
		fn = "add";
		resourceBaseInfo = new ResourceBaseInfo();
		resourceBaseInfo.setUnid(new UNIDGenerate().getUnid());
		resourceBaseInfo.setPunid(punid);
		resourceBaseInfo.setCreatetime(DateTime.getNowDateTime());
		resourceBaseInfo.setModifytime(DateTime.getNowDateTime());
		resourceBaseInfo.setStatus(RspConstant.STATUS_DAI_SHEN_HE);
		resourceBaseInfo.setDatafrom(RspConstant.DATAFROM_SHOU_GONG);
		resourceBaseInfo.setSavestyle(RspConstant.SAVESTYLE_DATABASE);
	}
	if("audit".equals(type)){
		fn=type;
		User user = ucapSession.getUser();
		resourceBaseInfo.setAuditor(user.getName());
		resourceBaseInfo.setAudittime(DateTime.getNowDateTime());
		
	}
	ApasDictBussiness dictBus = new ApasDictBussiness();
	request.setAttribute("resourceBaseInfo", resourceBaseInfo);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css"/>
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/default/easyui.css"/>
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/icon.css"/>
	<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css"/>
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/datepicker/WdatePicker.js"></script><script type="text/javascript" src="${path}/core/js/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js" charset="gbk"></script>
	
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/ResourceBaseInfo.action">
		<input type="hidden"  id="fn" name="fn" value="<%=fn%>">
		<%if(!"audit".equals(fn)){%>
			<input type="hidden" name="status" id="status"  value="<%=resourceBaseInfo.getStatus()%>">
		<%} %>
		<input type="hidden" name="unid" id="unid"  value="<%=resourceBaseInfo.getUnid()%>">
		<input type="hidden" name="punid" id="punid"  value="${resourceBaseInfo.punid}"/>
		<input type="hidden" name="offerdeptid" id="offerdeptid"  value="${resourceBaseInfo.offerdeptid}"/>
		<input type="hidden" name="serviceid" id="serviceid"  value="${resourceBaseInfo.serviceid}"/>
		<input type="hidden" name="materialid" id="materialid"  value="${resourceBaseInfo.materialid}"/>
		<input type="hidden" name="createtime" id="createtime"  value="${resourceBaseInfo.createtime}"/>
		<input type="hidden" name="modifytime" id="modifytime"  value="${resourceBaseInfo.modifytime}"/>
		<input type="hidden" name="extendxml" id="extendxml"  value="${resourceBaseInfo.extendxml}"/>
		<input type="hidden" name="datasize" id="datasize"  value="${resourceBaseInfo.datasize}"/>
		<input type="hidden" name="datafrom" id="datafrom"  value="${resourceBaseInfo.datafrom}"/>
		<input type="hidden" name="savestyle" id="savestyle"  value="${resourceBaseInfo.savestyle}"/>
		<table width="98%" align="center" class="form_table_ext">
			<col width="20%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="30%" align="left">
			
			<tr>
				<th><font color="red">*</font>资源名称：</th>
				<td colspan="3">
					<input type="text" name="resourcename" id="resourcename" style="width:90%" value="${resourceBaseInfo.resourcename}"/>
				</td>
			</tr>
			<tr>
				<th>资源简称：</th>
				<td colspan="3">
					<input type="text" name="resourcealias" id="resourcealias" style="width:90%" value="${resourceBaseInfo.resourcealias}"/>
				</td>
			</tr>
			<tr>
				<th>资源编码：</th>
				<td colspan="3">
					<input type="text" name="resourcecode" id="resourcecode" style="width:90%" value="${resourceBaseInfo.resourcecode}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>资源类别：</th>
				<td colspan="3">
					<%=dictBus.getRadio("共享库-资源类别","category",resourceBaseInfo.getCategory()) %>
				</td>
			</tr>
			<tr>
				<th>区域编码：</th>
				<td >
					<input type="text" name="areacode" id="areacode" style="width:90%" value="${resourceBaseInfo.areacode}"/>
				</td>
				<th>区域名称：</th>
				<td >
					<input type="text" name="areaname" id="areaname" style="width:75%" value="${resourceBaseInfo.areaname}"/>
				</td>
			</tr>	
			<tr>
				<th><font color="red">*</font>提供单位名称：</th>
				<td colspan="3">
					<input type="text" name="offerdept" id="offerdept" style="width:90%" value="${resourceBaseInfo.offerdept}"/>
				</td>
			</tr>
			<tr>
		      	<th><font color="#FF0000">*</font>上传文件：</th>
		       	<td colspan="3">
		       		<input type="text" name="savepath" id="savepath" value="${resourceBaseInfo.savepath}" style="width:77%" readonly>
		       		<input id="uploadify" class="uploadify" type="file" name="file" style="display: none;"/>	
		       	</td>
		   	</tr>				
			<tr>
				<th>文件名称：</th>
				<td colspan="3">
					<input type="text" name="filename" id="filename" style="width:90%" value="${resourceBaseInfo.filename}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>有效截至日期：</th>
				<td colspan="3">
					<input type="text" name="effectivedate" id="effectivedate" class="Wdate" style="width:90%" value="${resourceBaseInfo.effectivedate}"
					onclick="WdatePicker({el:$dp.$('effectivedate'),skin:'whyGreen',isShowOthers:false})"  readonly/>
				</td>
			</tr>
			<%if("audit".equals(type)){ %>
			<tr>
				<th><font color="red">*</font>审核人员：</th>
				<td>
					<input type="text" name="auditor" id="auditor" readonly style="width:90%" value="${resourceBaseInfo.auditor}"/>
				</td>
				<th><font color="red">*</font>审核时间：</th>
				<td>
					<input type="text" name="audittime" id="audittime" style="width:75%" readonly value="${resourceBaseInfo.audittime}"/>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>审核结果：</th>
				<td colspan="3">
					<%=dictBus.getRadio("共享库-审核结果","status",resourceBaseInfo.getStatus()) %>
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>审核意见：</th>
				<td colspan="3">
					<textarea name="auditopinion" id="auditopinion" style="width:90%" rows="5">${resourceBaseInfo.auditopinion}</textarea>
				</td>
			</tr>
			<%} %>
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
		top.lwin.close(true);
	}

	//表单验证
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	resourcename:'required',
	      	offerdept:'required',
	      	savepath:'required',
	      	effectivedate:'required',
	      	auditopinion:'required'
	    },
	    messages:{
	    	resourcename:'请填写[资源名称]',
	      	offerdept:'请填写[提供单位名称]',
	      	savepath:'请上传文件',
	    	effectivedate:'请选择[有效日期]',
	    	auditopinion:'请填写[审核意见]'
	    }
  	});	
 	jQuery(function(){
	 	$(".uploadify").uploadify({   
          	'uploader'       : '${path}/core/js/uploadify/uploadify.swf',   
          	'script'         : '${path}/AppFile.action?belongTo=${resourceBaseInfo.unid}',   
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
	          		$("#savepath").val(json.appFile.file_path);
	          		$("#filename").val(fileObj.name);
	          		$("#datasize").val(fileObj.size);
	          		
		          	var html = "<a href=\"javascript:downloadFile('"+json.unid+"')\">"+fileObj.name+"</a>";
		          	$(".form_table_ext").eq(0).find("img").next().remove();
		          	$(".form_table_ext").eq(0).find("img").parent().append(html);
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
</script> 
</body>
</html>
