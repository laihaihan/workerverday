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

		
<div id="form_content" >
	<div id="form_toolbar">
	
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
   <th width='15%' align=justify><font color='red'>*</font>姓<span style="padding-left:60px"></span>名</th>
  
  <td width = '35%'>
   ${staff.name}
  </td>
  <<th width='15%' align=justify><font color='red'>*</font>性<span style="padding-left:60px"></span>别</th>
  <td width = '35%'>
   ${staff.sex}
    
  </td>
</tr>
<tr>

 <th  th width='15%' align=justify>职<span style="padding-left:65px"></span>务</th>
  <td th width='35%'>
    ${staff.job}
   

  </td>
   <th  width='15%' align=justify><font color='red'></font>所<span style="padding-left:10px"></span>属<span style="padding-left:10px"></span>部<span style="padding-left:10px"></span>门</th>
  <td  width='35%'>
${staff.department}
  
   
  </td>
</tr>
<tr>
   <th width='15%' align=justify><font color='red'></font>入<span style="padding-left:10px"></span>职<span style="padding-left:10px"></span>日<span style="padding-left:10px"></span>期</th>
  <td width='35%'>
${staff.date_time}
  </td>
 <th width='15%' align=justify><font color='red'></font>直<span style="padding-left:10px"></span>属<span style="padding-left:10px"></span>上<span style="padding-left:10px"></span>级</th>
  <td width='35%'>
   ${staff.leader}
   
  </td>
</tr>
</table>


<table  width="100%" align="center" class="form_table">
<caption style="font-size:20px;font-weight：bold">联系方式</caption>
<tr>
 <th width='15%' align=justify><font color='red'>*</font>联<span style="padding-left:10px"></span>系<span style="padding-left:10px"></span>方<span style="padding-left:10px"></span>式</th>
  <td width='35%'>
   ${staff.contact}
  </td>
  <th width='15%' align=justify><font color='red'>*</font>座<span style="padding-left:60px"></span>机</th>
  <td width='35%'>
   ${staff.telephone}
  </td>
  </tr>

    </table>
<table width="98%" align="center" class="form_table">
<tr>
 <th width=135px align=justify><font color='red'>*</font>电<span style="padding-left:10px"></span>子<span style="padding-left:10px"></span>邮<span style="padding-left:10px"></span>件</th>
  <td>
  <%
  		if(emailList!=null){
  			for(int i=0;i<emailList.size();i++){
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
    	
<table width="98%" align="center" class="form_table">
    	
<tr>
<iframe  width='100%' frameborder='0' src='${path}/core/file/diploma_coreupload_read.jsp?unid=${staff.unid}&file_type=diploma'></iframe>
	</tr>
	<tr>
		<iframe  width='100%' frameborder='0' src='${path}/core/file/resume_coreupload_read.jsp?unid=${staff.unid}&file_type=resume'></iframe>
</tr>
<tr>
 

		 
				<iframe  width='100%' frameborder='0' src='${path}/core/file/other_coreupload_read.jsp?unid=${staff.unid}&file_type=other'></iframe>
	
	
		
		
		
		
		
	 </tr>	
	 
		
		 </table>
</table>

</form>
</div>
</div>

	
	


	

</body>





 

   
<script type="text/javascript">



	//绑定事件
	$(function(){
		
		$("#btnEdit").bind("click",doEdit);
		$("#btnSend").bind("click",doSend);
	});
	
	

    function doEdit(){
        top.lwin.close();
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