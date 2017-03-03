<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.staffSys.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@include file="/core/params.jsp" %>

<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	Staff staff = new StaffBusiness().doFindBeanByKey(unid);
	
	Staff staff1 = new Staff();

	if (null == staff) {
		fn = "add";
		staff = new Staff();
		staff.setUnid(new UNIDGenerate().getUnid());
		
		
	}
	
	request.setAttribute("staff", staff);
	
	request.setAttribute("path", request.getContextPath());
	
	 path = request.getContextPath();  
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/"; 
%>

<html>
<head>
	${import_theme}
	${import_jquery}
	${import_validation}
	${import_poshytip}
	        <base href="<%=basePath%>">  
        <title>Upload</title>  
 <!--装载文件-->  
        <link href="css/default.css" rel="stylesheet" type="text/css" />  
        <link href="staffwork/jsp/staff/uploadify.css" rel="stylesheet" type="text/css" />  
        <script type="text/javascript" src="staffwork/jsp/staff/jquery.uploadify.min.js"></script>  
        <script type="text/javascript" src="staffwork/jsp/staff/jquery.uploadify.min.js/swfobject.js"></script>  
        <script type="text/javascript" src="staffwork/jsp/staff/jquery.uploadify.v2.1.4.js"></script>  
   <!--ready事件-->  

</head>
<body>
	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/staff.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=staff.getUnid()%>">
		
       
		
		<table width="98%" align="center" class="form_table">
		<caption style="font-size:26px;font-weight：bold">人员入职单</caption>
			<tr>
  <th width=100px align=right><font color='red'>*</font>姓名</th>
  <td>
    <input  style='width:375px' type='text' name='staff[]name' id='name' value='${staff.name}'/>
  </td>
  <th width=100px align=right><font color='red'>*</font>性别</th>
 
   
  <td>
    <input type="radio" id="test" name="sex" value="男" ${staff.sex eq '男'?'checked="checked"':''} > 男
    <input type="radio" id="test" name="sex" value="女" ${staff.sex eq '女'?'checked="checked"':''} >  女
  </td>
</tr>
<tr>
  <th width=100px align=right><font color='red'>*</font>职务</th>
  <td>
    
    <select name='staff[]job' id='job' value='${staff.job}'>
  <option value ="volvo">Volvo</option>
  <option value ="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>
  </td>
  <th width=100px align=right><font color='red'>*</font>所属部门</th>
  <td>
  <input  style='width:325px' type='text' name='staff[]department' id='department_cn_' value='${staff.department}''/>
     <input type="button" name="btnselect" value="选择" onclick="top.lwin.selectWindow('201','0','department');"/>
	 <input type="hidden" name="staff[]department" id="department"/>
   
  </td>
</tr>
<tr>
  <th width=100px align=right><font color='red'>*</font>入职日期</th>
  <td>
    <input  style='width:375px' class="Wdate" onClick="WdatePicker()" type='text' name='staff[]date_time' id='date_time' value='${staff.date_time}'/>
  </td>
  <th width=100px align=right><font color='red'>*</font>直属上级</th>
  
  <td>
    <input style='width:325px' type='text' name='staff[]leader' id='leader_cn_' value='${staff.leader}'/>
    <input type="button" name="btnselect" value="选择" onclick="top.lwin.selectWindow('200','0','leader');"/>
	 <input type="hidden" name="staff[]leader" id="leader" />  
  </td>
</tr>
</table>
<tr>
<table  width="98%" align="center" class="form_table">
<caption style="font-size:20px;font-weight：bold">联系方式</caption>
  <th width=100px align=right><font color='red'>*</font>联系方式</th>
  <td>
    <input  style='width:375px' type='text' name='staff[]contact' id='contact' value='${staff.contact}'/>
  </td>
  <th width=100px align=right><font color='red'>*</font>座机</th>
  <td>
    <input  style='width:375px'  type='text' name='staff[]telephone' id='telephone' value='${staff.telephone}'/>
  </td>
</table>
<table id="testtable">
<tr>
  <th width=100px align=right><font color='red'>*</font>电子邮件</th>
  <td>
    <input  style='width:675px' type='text' name='staff[]email' id='email' value='${staff.email}'/>
 
  </td>
</tr>
</table>
  
           
</tr>

<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>


</tr>
</table>

<table width="98%" align="center" class="form_table">
<caption style="font-size:20px;font-weight：bold">附件资料</caption>
<tr>
<th width=100px align=right><font color='red'>*</font>学历证书</th>
  <td>

<%
  		if(staff!=null && staff.getDiploma()!=null){
  			String diploma = staff.getDiploma();
  			diploma = diploma.substring(diploma.lastIndexOf("/")+1,diploma.length());
  	%>
  			<input type="hidden" id="diplomaDel" name="diplomaDel" value="0">
  			<div><a href="${path}${staff.diploma}" target="_blank"><%=diploma%></a> <button onclick="delDiploma(this)">删除</button></div>
  	<%
  		}
  	 %>
    <input style="width:600px;" type="file" name="diploma" id="diploma" value=${staff.diploma}/><br>
  </td>
</tr>
<tr>
  <th width=100px align=right><font color='red'>*</font>简历</th>
  <td>
      <%
  		if(staff!=null && staff.getResume()!=null){
  			String resume = staff.getResume();
  			resume = resume.substring(resume.lastIndexOf("/")+1,resume.length());
  	%>
  			<input type="hidden" id="resumeDel" name="resumeDel" value="0">
  			<div><a href="${path}${staff.resume}" target="_blank"><%=resume%></a> <button onclick="delResume(this)">删除</button></div>
  	<%
  		}
  	 %>
    <input style="width:600px;" type="file" name="resume" id="resume" value=${staff.resume}/><br>

  </td>
  
</tr>
<tr>
<div>
<th width=100px align=right><font color='red'>*</font>其他</th>
<div>
  <input type="button"   class="btn btn-success"  value="增加"  onclick="add_jietu()"/>
  </div>
<div id="add_jietu">
  
   <%
  		if(staff!=null && staff.getResume()!=null){
  			String resume = staff.getResume();
  			resume = resume.substring(resume.lastIndexOf("/")+1,resume.length());
  	%>
  			<input type="hidden" id="resumeDel" name="resumeDel" value="0">
  			<div><a href="${path}${staff.resume}" target="_blank"><%=resume%></a> <button onclick="delResume(this)">删除</button></div>
  	<%
  		}
  	 %>
  <input style="width:600px;" type="file" name="other" id="other" value=${staff.other}/><br>
    
 
  
  </div>
  
</div>  

</tr>
		</table>





   
<script type="text/javascript">
	//绑定事件
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
	});
	
	function doSave(){
		if(checkForm()){
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






function checkForm(){
		var flag = true;
		if(!TextValidation.checkNull("staff[]name","姓名")){
			flag = false;
		}
		if(!TextValidation.checkNull("staff[]contact","联系方式")){
			flag = false;
		}
		if(!TextValidation.checkEmail("staff[]email","电子邮件")){
			flag = false;
		}
		return flag;
	}

 function delResume(el){
    	$("#resumeDel").val('1');
    	$(el).parent().remove();  
    	}
    	
 function delDiploma(el){
    	$("#diplomaDel").val('1');
    	$(el).parent().remove();  
    	}
    	
	//保存表单信息
</script> 
</body>
</html>