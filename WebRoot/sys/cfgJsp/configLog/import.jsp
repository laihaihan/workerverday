<%@page contentType="text/html;charset=UTF-8"%>
<%
	String currentViewId = request.getParameter("unid");
%>
<body>
<div id="impDialogHtml">
<table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet">
  <col width="120"/>
  <col width="160"/>
  <col width="120"/>
  <col width="160"/>
  <tr>
    <th>导入时执行</th>
    <td colspan="3"><input type="radio" name="excuted" id="excuted" value="1"/>是<input type="radio" name="excuted" id="excuted" value="0" checked/>否</td>
  </tr>
</table>
<span style="color:red">注意：请确认当前系统WEB-INF\下的configLog.json文件是否存在!</span>
</div>
</body>