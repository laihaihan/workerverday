<%@page contentType="text/html;charset=UTF-8"%>

<%@include file="/sys/jsp/jspSession.jsp"%> 
<%@page import ="org.apache.commons.lang.StringUtils" %>
<%@page import ="java.util.List" %>
<%@page import="com.linewell.ucap.frame.util.UnidsToCn" %>
<%@page import="com.linewell.ucap.util.UcapRequest"%>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%
	//取出用户所管理的部门ID和中文名称
	String deptIds = user.getAdminDeptUnids();
	String deptCns = "";
	 UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
	if (StringUtils.isNotEmpty(deptIds)){
		List<String> cnIds = UnidsToCn.getDeptNamesByDeptUnids(ucapRequest,deptIds);
		if (cnIds!=null){
			deptIds = cnIds.get(0);
			deptCns = cnIds.get(1);
		}
	} else {
		deptIds = "";
	}
	String adminDept= user.getEffectiveAdminDept();
	String adminDeptName = "";
	if (StringUtils.isNotEmpty(adminDept)){
		List<String> cnIds =UnidsToCn.getDeptNamesByDeptUnids(ucapRequest,adminDept);
		if (cnIds!=null){
			adminDeptName = cnIds.get(1);
		}
	}
 %>
<body>
<script type="text/javascript">
	Ext.onReady(function(){	
		if (!ucapSession.userJson.appAdmin){
			Ext.getDom("systemId").style.display="none";
		}
		var depts = "<%=deptIds%>";
		if (depts=="" ){
			Ext.getDom("deptId").style.display="none";
		} else {			
			depts = depts.split(",");
			
			var cns =  "<%=deptCns%>";
			cns = cns.split(",");
			var obj = Ext.getDom("dept");
			for(var i=0;i<depts.length;i++){
				ucapCommonFun.addOption(obj,depts[i],cns[i]);
			}
		}
		var userStr="";
		var v ="";
		if (ucapSession.userJson.userStatus==1){
			userStr="应用系统管理员";
			v="1";
		} else if (ucapSession.userJson.userStatus==2){
		
			userStr="为“"+"<%=adminDeptName%>"+"”的部门管理员";
			v="2";
		} else {
			userStr ="普通用户身份";
			v="3";
		}
		Ext.getDom("user").innerHTML = "    "+userStr;
		setRadio(v);
	});

	function setRadio(v){
		var field =["type"];
		var value = new Array();
		value[0]=  v
		var jsonValue = "{"+ucapCommonFun.getJsonValue(field,value)+"}";
		ucapCommonFun.bindForm(jsonValue);	
	}
</script>

<div id="userDialogHtml">
	<table border="0" >
		<tr>
			<td >
				当前用户身份是：<br>  <span  id ="user" class="red"></span>
				<br><div id="systemId" style="margin-bottom:21px">
					<input type="radio" name="type" id="type" value="1"/><span style="cursor:hand" onclick="setRadio('1');">切换为应用系统管理员</span>				
				</div>
				<div id="deptId" style="margin-bottom:21px">
					<span >
						<input type="radio" name="type" id="type" value="2" /><span style="cursor:hand" onclick="setRadio('2');">切换为部门管理员</span>
					</span>
						<select name="dept" id="dept"
								size="3" style="width:100% "></select> 	
				 							
				</div>

				<div style="margin-bottom:21px">
					<input type="radio" name="type" id="type" value="3"/><span style="cursor:hand" onclick="setRadio('3');">切换为个人身份</span>
				</div>
			</td>
		</tr>		
	</table>
</div>
</body>

	
