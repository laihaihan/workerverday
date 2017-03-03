<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.staffSys.*"%>
<%@page import="com.linewell.emailSys.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.flow.config.FlowConfigBusiness"%>

<%@	page import="com.linewell.core.dict.ApasDictBussiness"%>

<%@	page import="java.util.*"%>


<%@include file="/core/params.jsp" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	staff staff = new staffBusiness().doFindBeanByKey(unid);
    List emailList=null;
	

	if (null == staff) {
		fn = "add";
		staff = new staff();
		staff.setUnid(new UNIDGenerate().getUnid());
		
		
	}else{
		emailList = new emailBusiness().doFindListByBelong(unid);
		
	}
	
		
	request.setAttribute("staff", staff);
	
	
	request.setAttribute("path", request.getContextPath());
	
	 path = request.getContextPath();  
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/"; 

	//文档id
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String appUnid = ucapsession.getApp().getUnid();
	
	FlowConfigBusiness flowConfigBusiness = new FlowConfigBusiness();
	//流程unid
	String flowUnid = flowConfigBusiness.getFlowUnidByInstanceUnid(unid,appUnid);
	//流程实例unid
    String instanceUnid = flowConfigBusiness.getInstanceUnid(unid,appUnid);
%>
<html>
<head>
	${import_theme}
	${import_jquery}
	${import_validation}
	${import_poshytip}
	
	${import_easyui}
	${import_theme}
	        <base href="<%=basePath%>">  
        <title>Upload</title>  
 <!--装载文件-->  
        <link href="css/default.css" rel="stylesheet" type="text/css" />  
        <link href="staffwork/jsp/staff/uploadify.css" rel="stylesheet" type="text/css" />  
        <script type="text/javascript" src="staffwork/jsp/staff/jquery.uploadify.min.js"></script>  
        <script type="text/javascript" src="staffwork/jsp/staff/jquery.uploadify.min.js/swfobject.js"></script>  
        <script type="text/javascript" src="staffwork/jsp/staff/jquery.uploadify.v2.1.4.js"></script>  
        
    <link rel="stylesheet" type="text/css" href="http://www.jeasyui.net/Public/js/easyui/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="http://www.jeasyui.net/Public/js/easyui/themes/icon.css">
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.6.1.min.js"></script>
	<script type="text/javascript" src="http://www.jeasyui.net/Public/js/easyui/jquery.easyui.min.js"></script>
   <!--ready事件-->  
	<base target="_self">

	
	<script type="text/javascript" src="${path}/core/js/lw-ui/load.js"></script>
</head>
<body>
	<div class="easyui-tabs" id="tt">
	<div title="基本信息" style="padding:10px;">
		
<div id="form_content" >
	<div id="form_toolbar">
	<%@include file="/core/flow/document/document_button.jsp"%>
		<button class="form_btn" id="btnEdit"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 修改 </button>
		<button class="form_btn" id="btnSend"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 送审</button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/staff.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=staff.getUnid()%>">
		
       
		
		<table width="98%" align="center" class="form_table">
		<caption style="font-size:26px;font-weight：bold">人员入职单</caption>
			<tr>
  <th width=100px align=right>姓名</th>
  <td>
   ${staff.name}
  </td>
  <th width=100px align=right>性别</th>
 
   
  <td>
   ${staff.sex}
    
  </td>
</tr>
<tr>

  <th width=100px align=right>职务</th>
 
     <td>
    ${staff.job}
   

  </td>
  <th width=100px align=right>所属部门</th>
  <td>
${staff.department}
  
   
  </td>
</tr>
<tr>
  <th width=100px align=right>入职日期</th>
  <td>
${staff.date_time}
  </td>
  <th width=100px align=right>直属上级</th>
  
  <td>
   ${staff.leader}
   
  </td>
</tr>
</table>


<table  width="100%" align="center" class="form_table">
<caption style="font-size:20px;font-weight：bold">联系方式</caption>
<tr>
  <th width=100px align=right>联系方式</th>
  <td>
   ${staff.contact}
  </td>
  <th width=100px align=right>座机</th>
  <td>
   ${staff.telephone}
  </td>
  </tr>

<tr>
  <th width=100px align=right>电子邮件</th>
  <td>
  <%
  		if(emailList!=null){
  			for(int i=1;i<emailList.size();i++){
  				email email = (email)emailList.get(i);
  	%>
  	<div> <%=email.getEmail_addr()%></div>
  	<%
  			}
  		}
  	%>
  
  

 
  </td>

  
           
</tr>




</table>

<table width="98%" align="center" class="form_table">
<caption style="font-size:20px;font-weight：bold">附件资料</caption>
<tr>
<th width=100px align=right>学历证书</th>
  <td>

<%
  		if(staff!=null && staff.getDiploma()!=null){
  			String diploma = staff.getDiploma();
  			diploma = diploma.substring(diploma.lastIndexOf("/")+1,diploma.length());
  	%>
  			
  			<div><a href="${path}${staff.diploma}" target="_blank"><%=diploma%></a></div>
  	<%
  		}
  	 %>
 
  </td>
</tr>
<tr>
  <th width=100px align=right>简历</th>
  <td>
      <%
  		if(staff!=null && staff.getResume()!=null){
  			String resume = staff.getResume();
  			resume = resume.substring(resume.lastIndexOf("/")+1,resume.length());
  			
  			
  				
  	%>
  			
  			<div><a href="${path}${staff.resume}" target="_blank"><%=resume%></a></div>
  	<%
  		}
  	 %>
    

  </td>
  
</tr>
<tr>

<th width=100px align=right>其他</th>
<td>

 <%
  		if(staff!=null && staff.getOther()!=null){
  			String others = staff.getOther();
  			String[] otherArr = others.split(",");
			for (int i = 0; i < otherArr.length; i++) {
				String filePath = otherArr[i];
				otherArr[i] = otherArr[i].substring(otherArr[i].lastIndexOf("/")+1,filePath.length());
				%>
  	<div><a href="${path}<%=filePath%>" target="_blank"><%=otherArr[i]%></a></div>
  	<%}%>
<%}%>
 

</td>
</tr>
</table>

</form>
</div>
</div>
	
		<fieldset style="width:99%">
			<legend>办理情况</legend>
			<table width="95%" border="0" align="center" cellpadding="3" cellspacing="2">
				<tr>
					<td>
						<font color="red">红色：当前办理；</font>
						<font color="blue">蓝色：已办理；</font>
						<font color="gray">灰色：未办理；</font>
						
						<img src="${path}/core/ucap/flow/flow_image.jsp?docUnid=<%=unid %>&flowUnid=<%=flowUnid%>"/>
						<%--
						<iframe src="${path}/core/ucap/flow/flow_div.jsp?docUnid=<%=unid%>&flowUnid=<%=flowUnid%>" width="100%" frameborder="0" id="FlowHandleWindow"></iframe>
						--%>
					</td>
				</tr>
			</table>
		</fieldset>
</div>	

	
	<div title="审批意见"  style="padding:10px;">
		  <%@ include file="/core/flow/document/document_opinion.jsp"%>
	</div>
	<div title="流转日志"  style="padding:10px;">
		 <%@ include file="/core/flow/document/document_log.jsp"%>
	</div>
</div>
<%@include file="/core/flow/document/document_js.jsp"%>
</body>





 

   
<script type="text/javascript">



	//绑定事件
	$(function(){
		
		$("#btnEdit").bind("click",doEdit);
		$("#btnSend").bind("click",doSend);
	});
	
	

    function doEdit(){
		top.lwin.open('/staffwork/jsp/staff/staff_edit.jsp?unid=<%=unid%>',"修改",1000,600); 
	}
	
	function doSend(){
		 var id = document.getElementById('unid').value;
	$.ajax({
		url : "staff.action",
		dataType : "json",
		async : false,
		type : "post",
		
		data : {
			fn : "iniflow",
			unid: id
		},
		success:function(data){  
		
		top.$.messager.alert("操作提示","流程配置操作成功");
		
        }  
     });
	top.lwin.close();
	}
	//表单验证





	//保存表单信息
</script> 
</body>
</html>