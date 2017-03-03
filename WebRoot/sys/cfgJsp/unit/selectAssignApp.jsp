<%@page contentType="text/html;charset=UTF-8"%>
<%
	//单位标识，这个标识为单位已经建好部门组织的相对应组织
	String unitId = request.getParameter("unitId");             
	//单位对应的管理员标识，为在单位建好部门的同时，以此同时所建立起来的部门管理员
	String unitAdminId = request.getParameter("unitAdminId");
%>
<body>
<script type="text/javascript">
	Ext.onReady(function(){
		appAssign.initSelectApp();
	});

</script>
<div id="sapDialogHtml">
<input name="unitId" id="unitId" value="<%=unitId%>" style="display:none;"/>
<input name="unitAdminId" id="unitAdminId" value="<%=unitAdminId%>" style="display:none;"/>
<table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet">
  <col width="120"/>
  <col width="240"/>
  <tr>
    <th>应用系统名称：</th>
    <td>          
    	<select name="appId" id="appId">
        </select>
   </td>
  </tr>
</table>
</div>
</body>