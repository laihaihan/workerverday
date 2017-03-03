<%@page contentType="text/html;charset=UTF-8"%>
<%
	String appId = request.getParameter("unid");
	String unitId = request.getParameter("unitId");
	String unitAdminId = request.getParameter("unitAdminId");
	if(null==unitId)unitId = "";
	if(null==unitAdminId)unitAdminId = "";
	String sSystemPath = request.getContextPath()+"/";
%>
<body>
<div id="proxoolHtml">
<input type="text" name="alias"  style="display:none;" id="alias" value="<%=appId%>">
<input type="text" name="unitId"  style="display:none;" id="unitId" value="<%=unitId%>">
<input type="text" name="unitAdminId"  style="display:none;" id="unitAdminId" value="<%=unitAdminId%>">
<table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet">
  <col width="120"/>
  <col width="160"/>
  <col width="120"/>
  <col width="160"/>
  <tr>
    <th>driver-url：</th>
    <td colspan="3"><input type="text" class="inputbox" name="url"    id="url"/></td>
  </tr>
  <tr>
    <th>driver-class：</th>
    <td ><input type="text" class="inputbox" name="driverClass" id="driverClass" /></td>
    
  </tr>
  <tr>
  <th>user：</th>
   <td ><input type="text" class="inputbox" style="width:75%" name="user" id="user"  />
   <a href="#" onclick="javascirpt:window.top.ucapCommonFun.createTableSpace($F('url'));"><font color=red>创建表空间</font></a>
   </td>
  </tr>
  <tr>
  <th>password：</th>
   <td ><input type="text" class="inputbox" name="password" id="password" /></td>
  </tr>
  <tr>
  <th>house-keeping-sleep-time：</th>
   <td ><input type="text" class="inputbox" name="house" id="house" /></td>
  </tr>
  <tr>
  <th>simultaneous-build-throttle：</th>
   <td ><input type="text" class="inputbox" name="simultaneous" id="simultaneous" /></td>
  </tr>
   <tr>
  <th>prototype-count：</th>
   <td ><input type="text" class="inputbox" name="prototype" id="prototype" /></td>
  </tr>
   <tr>
  <th>maximum-connection-count：</th>
   <td ><input type="text" class="inputbox" name="maximum" id="maximum" /></td>
  </tr>
   <tr>
  <th>minimum-connection-count：</th>
   <td ><input type="text" class="inputbox" name="minimum" id="minimum" /></td>
  </tr>
  <tr>
  <th colspan="4"><br>提示：确定前请确认数据库用户以及相应表空间已经创建。
  如果未创建可通过user后面的"创建表空间"进行创建。如果已创建，可直接输入用户名跟密码。
  </tr>
</table>
</div>
</body>
<script>
proxoolManager.getProxool();
</script>