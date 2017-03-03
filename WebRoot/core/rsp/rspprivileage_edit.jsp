<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.rsp.privilege.*"%>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.core.util.DateTime" %>
<%@page import="com.linewell.core.dict.*"%>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String punid = request.getParameter("punid");
	ApasDictBussiness dictBus = new ApasDictBussiness();
	RspPrivileage rspPrivileage = new RspPrivileageManager().doFindBeanByKey(unid);
	if (null == rspPrivileage) {
		fn = "add";
		rspPrivileage = new RspPrivileage();
		rspPrivileage.setUnid(new UNIDGenerate().getUnid());
		rspPrivileage.setCreatetime(DateTime.getNowDateTime());
		rspPrivileage.setResourceid(punid);
		rspPrivileage.setVisit(1);
		rspPrivileage.setDownload(1);
		rspPrivileage.setUse(1);
		rspPrivileage.setWrite(1);
		
	}
	request.setAttribute("rspPrivileage", rspPrivileage);
	request.setAttribute("path", request.getContextPath());
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
		<button class="form_btn" id="btnSave"> 
			<img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 
		</button>
		<button class="form_btn" id="btnClose"> 
			<img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 
		</button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/rspprivileage.action">
		<input type="hidden"  id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="unid" id="unid"  value="<%=rspPrivileage.getUnid()%>">
		<input type="hidden" name="resourceid" id="resourceid"  value="${rspPrivileage.resourceid}"/>
		<input type="hidden" name="createtime" id="createtime"  value="${rspPrivileage.createtime}"/>
		<input type="hidden" name="ownerid" id="ownerid"  value="${rspPrivileage.ownerid}"/>
		<table width="98%" align="center" class="form_table_ext">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<col width="15%" align="right">
			<col width="35%" align="left">
			<tr>
				<th><font color="red">*</font>类型</th>
				<td colspan="3">
					<%=dictBus.getRadio("共享库-权限类型","ownertype",Long.valueOf(rspPrivileage.getOwnertype()).toString() ) %>
				</td>
			</tr>
					
			<tr>
				<th><font color="red">*</font>拥有者名称</th>
				<td colspan="3">
					<input type="text" name="ownername" id="ownername" readonly style="width:90%" value="${rspPrivileage.ownername}"/>
					<input type="button" id="btnChoose" value="选择" >
				</td>
			</tr>
			<tr>
				<th><font color="red">*</font>是否有访问权限</th>
				<td >
					<%=dictBus.getRadio("共享库-权限设置","visit",Long.valueOf(rspPrivileage.getVisit()).toString() ) %>
				</td>
				<th><font color="red">*</font>是否有写权限</th>
				<td >
					
					<%=dictBus.getRadio("共享库-权限设置","write",Long.valueOf(rspPrivileage.getWrite()).toString() ) %>
				</td>
				
			</tr>
					
			<tr>
				<th><font color="red">*</font>是否有下载权限</th>
				<td >
				<%=dictBus.getRadio("共享库-权限设置","download",Long.valueOf(rspPrivileage.getDownload()).toString() ) %>
				</td>
			
				<th><font color="red">*</font>是否有调用权限</th>
				<td >
					<%=dictBus.getRadio("共享库-权限设置","use",Long.valueOf(rspPrivileage.getUse()).toString() ) %>
				</td>
		
			
			<tr>
			
					</table>
		</form>
	</div>
</div>
<script type="text/javascript">
	//绑定事件
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
		$("#btnChoose").bind("click",chooseType);
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
						if($('#fn').val()=='add'){							
							//location.href='?unid='+$('#unid').val();
						}
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
					
				}
			});
		}
	}
	
	//关闭窗口
	function doClose(){
		top.lwin.close();
	}
	//选择所属事项
		function chooseType() {
			var type =$('input:radio[name="ownertype"]:checked').val(); 
			var range ="";
			var url = "${path}/was/tree/service_select.jsp?type=checkbox";
			var fn="getRole";
			//角色
			if(0==type){
				url ="${path}/core/permission/choose_personnel_range.jsp";
				fn="getRole";
				range="3";
			}
			//部门
			else if(1==type){
				 url = "${path}/was/tree/dept_select.jsp?type=checkbox";
				 fn="getDept";
				 range="1";
			}
			//人员
			else if(2==type){
				 url = "${path}/was/tree/user_select.jsp?type=checkbox";
				 fn="getPersion";
				 range="0";
			}
			
			top.lwin.open("/core/permission/choose_personnel_range.jsp?displayId=ownername&fn="+fn+"&type="+range+"&hiddenId=ownerid&separate=,","选择",600,450);
			/*
			var returnValue  =window.showModalDialog(url,0, "dialogHeight=480px;dialogWidth=500px;center=y;resizable=1;status=0;scroll=1;");
			if(null!=returnValue){
				var arry =returnValue.split(",");
				var unids="";
				var names="";
				for(var i=0;i<arry.length-1;i++){
					unids+=arry[i].split("|")[1]+",";
					names+=arry[i].split("|")[2]+",";
				}
	        	jQuery("#ownerid").val(unids);
	        	jQuery("#ownername").val(names);
	        }*/
		}

	//表单验证
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	
	    },
	    messages:{
	    	
	    }
  	});	
</script> 
</body>
</html>
