<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.staffSys.*"%>
<%@page import="com.linewell.emailSys.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	
	List emailList = null;
	
	staff staff = new staffBusiness().doFindBeanByKey(unid);
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
%>

<html>
<head>
	${import_theme}
	${import_jquery}
	${import_validation}
	${import_poshytip}
	<link rel="stylesheet" type="text/css" href="uploadify.css">
<script type="text/javascript" src="../../../core/js/datepicker/WdatePicker.js"></script>
</head>
<body MS_POSITIONING="GridLayout">	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/staff.action"  runat='server' enctype="multipart/form-data">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid" value="<%=staff.getUnid()%>">
		<div style="width:100%;text-align:center;font-size:26px;font-weight: bold;" >人员入职单</div>
		<table width="98%" align="center" class="form_table">
			<tr>
  <th width=100px align=justify><font color='red'>*</font>姓名</th>
  
  <td>
    <input  style='width:375px' type='text' name='name' maxlength='4' id='name' value='${staff.name}' onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4E00-\u9FA5]/g,''))" />
  </td>
  <th width=100px align=justify><font color='red'>*</font>性别</th>
  <td>
   		<input type='radio' name='staff[]sex' value='男' checked="checked" ${staff.sex eq '男'?'checked="checked"':''}>男
   		<input type='radio' name='staff[]sex' value='女' ${staff.sex eq '女'?'checked="checked"':''}>女
  </td>
</tr>
<tr>
  <th  width=100px align=justify>职务</th>
  <td>
  <style type="text/css">
  

div.justify 
{ 
　　text-align: justify; width:200px; font-size:15px; color:red; 
　　border:1px solid blue; height:18px;
}
div.justify > span 
{ 
　　display: inline-block /* Opera */; 
　　padding-left: 100%; 
}

  
  </style>
    <select  name='staff[]job' id='job' style="width:375px;leght">
      <option value='软件工程师' ${staff.job eq '软件工程师'?'selected="selected"':''}>软件工程师</option>
	  <option value="测试工程师" ${staff.job eq '测试工程师'?'selected="selected"':''}>测试工程师</option>
	  <option value="实施工程师" ${staff.job eq '实施工程师'?'selected="selected"':''}>实施工程师</option>
	  <option value="经理" ${staff.job eq '经理'?'selected=true':''}>经理</option>
	  <option value="项目经理" ${staff.job eq '项目经理'?'selected=true':''}>项目经理</option>
	</select>
  </td>
  <th width=100px align=justify><font color='red'>*</font>所属部门</th>
  <td>
     <input  style='width:325px' type='text' name='staff[]department' id='department_cn_' value='${staff.department}'/>
    <input type="hidden" name='staff[]department' id='department' value='${staff.department}'/>
    <img alt="" onclick="top.lwin.selectWindow('201','1','department');" src="${path}/core/themes/default/images/admin/btn_channel_bg.gif "/>
  </td>
</tr>
<tr>
  <th width=100px align=justify><font color='red'>*</font>入职日期</th>
  <td>
    <input  style='width:375px' class="Wdate" onclick="WdatePicker()" type='text' name='staff[]date_time' id='date_time' value='${staff.date_time}'/>
  </td>
  <th width=100px align=justify><font color='red'>*</font>直属上级</th>
  <td>
    <input  style='width:325px' type='text' name='staff[]leader' id='leader_cn_' value='${staff.leader}'/>
    <input type="hidden" name='staff[]leader' id='leader' value='${staff.leader}'/>
    <img alt="" onclick="top.lwin.selectWindow('200','1','leader');" src="${path}/core/themes/default/images/admin/btn_channel_bg.gif "/>
  </td>
</tr>
</table>
<table width="98%" align="center" class="form_table">
<caption style="font-size:18px;font-weight: bold;">联系方式</caption>
<tr>
  <th width=100px align=justify><font color='red'>*</font>联系方式</th>
  <td>
    <input  style='width:375px' type='text' name='staff[]contact' maxlength='11' id='contact' value='${staff.contact}'/>
  </td>
  <th width=100px align=justify><font color='red'>*</font>座机</th>
  <td>
    <input  style='width:375px'  type='text' name='staff[]telephone' id='telephone' maxlength='13' value='${staff.telephone}'>
  </td>
</tr>
    </table>
<table width="98%" align="center" class="form_table">
<tr>
  <th width=100px align=justify><font color='red'>*</font>电子邮件</th>
  <td>
  <div id="EmailContent">
  	<%
  		if(emailList!=null){
  			for(int i=0;i<emailList.size();i++){
  				email email = (email)emailList.get(i);
  	%>
  	<div id="jspEmail<%=i %>"><input  style='width:600px' type='text' name='email' id='email' value='<%=email.getEmail_addr() %>'  /><a href=javascript:delEmail('jspEmail<%=i %>');>删除</a></div>
  	<%
  			}
  		}else{
  	%>
  	<div> <input  style='width:600px' type='text' name='email'  /></div>
  	<%		
  		}
  	%>
  	<input type="button"   class="btn btn-success"  value="增加" id="newemail" onClick="addEmail()" />
  </td>
    </table>
<table width="98%" align="center" class="form_table">
<caption style="font-size:18px;font-weight: bold;">附件资料</caption>
  <th width=100px align=justify><font color='red'>*</font>学历证书</th>
  <td>
  	<%
  		if(staff!=null && !StrUtil.isNull(staff.getDiploma())){
  			String diploma = staff.getDiploma();
  			diploma = diploma.substring(diploma.lastIndexOf("/")+1,diploma.length());
  	%>
  	      <input type="hidden" id="degreeDel" name="degreeDel" value="0">
  	<div><a href="${path}${staff.diploma}" target="_blank"><%=diploma %></a><img alt="" onclick="delDegree(this)" src="${path}/core/themes/default/images/admin/btnn_icon_03.gif"></div>
  	<%
  		}
  	 %><br/>
  	
    <input  style='width:600px'  type='file' name='diploma' id='diploma' value='${staff.diploma}'/></div>
       
  </td>
</tr>
<tr>
  <th width=100px align=justify><font color='red'>*</font>简历</th>
  <td>
  <%
  		if(staff!=null && !StrUtil.isNull(staff.getResume())){
  			String resume = staff.getResume();
  			resume = resume.substring(resume.lastIndexOf("/")+1,resume.length());
  	%>
  			<input type="hidden" id="resumeDel" name="resumeDel" value="0">
  			<div><a href="${path}${staff.resume}" target="_blank"><%=resume%></a> <img alt="" onclick="delResume(this)" src="${path}/core/themes/default/images/admin/btnn_icon_03.gif"/></div>
  	<%
  		}
  	 %><br/>
    <input  style='width:600px' type='file' name='resume' id='resume' onclick="checktype()" value='${staff.resume}' />
  </td>
  </tr>
  <tr>
  <th width=100px align=justify>其他</th>
  <td> 
   <div id="uploadContent">
    <div id=div2>
    <%
  		if(staff!=null && !StrUtil.isNull(staff.getOther())){
  			String others = staff.getOther();
  			String[] otherArr = others.split(",");
			for (int i = 0; i < otherArr.length; i++) {
				String filePath = otherArr[i];
				otherArr[i] = otherArr[i].substring(otherArr[i].lastIndexOf("/")+1,filePath.length());
				%>
  	<div><a href="${path}<%=filePath %>" target="_blank"><%=otherArr[i] %></a><img alt="" onclick="delOther1(this)" src="${path}/core/themes/default/images/admin/btnn_icon_03.gif"/></div>
  	<%
			}
  		}
  	 %><br/>
  	 <input  style='width:600px'  type='file' name='other' id='other' value='${staff.other}' /></div></div>
   <input type="button"   class="btn btn-success"  value="增加"  onclick="addOther()"/>
  </td>
</tr>
		</table>
		
		</form>
	</div>
</div>
<script type="text/javascript">
	function test(){
		var emails = document.getElementsByName('email');
		var leng = emails.length;
		if(emails>1){
			for(var i=0 ;i<leng;i++){
			}
		}
	}

  function checktype(){
  	var fileName = document.getElementById("resume").value;
	  if(fileName==""){
	    alert("请选择要上传的doc文件!");
	  return false;
  }
  //lastIndexOf如果没有搜索到则返回为-1
 	 
}

	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
	});
	
	//保存表单信息
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
	
	function checkForm(){
		var flag = true;
		if(!TextValidation.checkNull("name","姓名"))
		{
			flag = false;
		}
		if(!TextValidation.checkNull("staff[]sex","性别"))
		{
			flag = false;
		}
		if(!TextValidation.checkNull("staff[]leader","直属上级"))
		{
			flag = false;
		}
		if(!TextValidation.checkNull("staff[]department","所属部门"))
		{
			flag = false;
		}
		if(!TextValidation.checkEmail("email","邮件")){
			flag = false;
		}
		if(!TextValidation.checkiPhone("staff[]contact","联系方式"))
		{ 
			flag = false;
		}
		if(!TextValidation.checkZj("staff[]telephone","座机"))
		{
			flag = false;
		}
		var fileName = document.getElementById("resume").value;
		if(fileName.lastIndexOf(".")!=-1){
		    	var fileType = (fileName.substring(fileName.lastIndexOf(".")+1,fileName.length)).toLowerCase();
		   	 	var suppotFile = new Array();
		    	suppotFile[0] = "doc";
		   		 for(var i =0;i<suppotFile.length;i++){
		      if(suppotFile[i]==fileType){
		        document.getElementById("resume").style.display="";
		        flag = true ;
		      } else {
		        alert("简历不支持该文件类型"+fileType);
		        document.getElementById("resume").innerHTML='<INPUT TYPE="file" NAME="resume" id="resume"/>';//因为IE不支持file控件清空，所有只有重新动态的追加file控件了
		        //document.getElementById("resume").value="";
		        flag = false ;
		      }
		    }
		}
		//check email
		var emails = document.getElementsByName('email');
		if(emails.length>1){
			var srcEmail = emails[0].value;
			for(var i=1 ;i<emails.length;i++){
				var emailVal = emails[i].value;
				if(srcEmail==emailVal){
					flag = false;
					alert('邮箱重复');
					return ;
				}
			}
		}
		
		return flag;
	}
	//关闭窗口
	function doClose(){
		top.lwin.close();
	}
	

	
	var count= 0 ;   
   	function addOther() { 
        count++; 
        //自增id不同的HTML对象，并附加到容器最后
        var newDiv = "<div id=divOther" + count +">"
            + " <input id=file" + count + " type=file style='width:600px' name=other>"
            + " <a href=javascript:delOther('divOther" + count + "');>删除</a>"
            + " </div>";   
          document.getElementById("uploadContent").insertAdjacentHTML("beforeEnd", newDiv);     
    }   
    //删除指定元素
    function delOther(divb) { 
        count--; 
        document.getElementById(divb).parentNode.removeChild(document.getElementById(divb));   
    }   
     function addEmail() { 
        count++; 
        var newDiv = "<div id=divEmail" + count +">"
            + " <input id=Email1" + count + " type=text style='width:600px' name=email>"
            + " <a href=javascript:delEmail('divEmail" + count + "');>删除</a>"
            + " </div>";   
            $('#newemail').before($(newDiv));
    }   
    function delEmail(divc) { 
        count--; 
        document.getElementById(divc).parentNode.removeChild(document.getElementById(divc));   
    }  
    
    function delResume(el){
    	$("#resumeDel").val('1');
    	$(el).parent().remove();
    }
    function delDegree(el){
    	$("#degreeDel").val('1');
    	$(el).parent().remove();
    }
    function delOther1(el){
    	$("#otherDel1").val('1');
    	$(el).parent().remove();
    }
   
	
</script> 
</body>
</html>