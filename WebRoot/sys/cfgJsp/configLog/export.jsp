<%@page contentType="text/html;charset=UTF-8"%>
<%
	String currentViewId = request.getParameter("unid");
	String sSystemPath = request.getContextPath()+"/";
	
%>
<body >
<div id="expDialogHtml">
<table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet">
  <col width="120"/>
  <col width="160"/>
  <col width="120"/>
  <col width="160"/>
  <tr style="display:none">
    <th>导出SQL<br></th>
    <td colspan="3">&lt;<input type="text" class="inputbox" name="expsql" id="sql"/><br></td>
  </tr>
   <tr>
    <th>开始时间</th>
    <td ><input type="text" class="inputbox" name="beginTime" id="beginTime" sourceType="05" /><IMG style="CURSOR: pointer;" onclick="WdatePicker({el:'beginTime'});" src="<%=sSystemPath %>js/ucap/calendar/skin/datePicker.gif" align=absMiddle/></td>
    <th>结束时间</th>
    <td ><input type="text" class="inputbox" name="endTime" id="endTime" sourceType="05"/><IMG style="CURSOR: pointer;" onclick="WdatePicker({el:'endTime'});" src="<%=sSystemPath %>js/ucap/calendar/skin/datePicker.gif" align=absMiddle/></td>
  </tr>
   <tr>
    <th>导出范围</th>
    <td colspan="3"><input type="checkbox" name="exprange" id="exprange" value="01" checked/>平台
    <input type="checkbox" name="exprange" id="exprange" value="02" checked/>用户
    <input type="checkbox" name="exprange" id="exprange" value="03" checked/>设计
    <input type="checkbox" name="exprange" id="exprange" value="04" checked/>界面
    <input type="checkbox" name="exprange" id="exprange" value="05" checked/>系统参数
    <input type="checkbox" name="exprange" id="exprange" value="06" checked/>其他
    </td>
  </tr>
  
</table>
<span style="color:red">提示：所导出的数据将保存为当前系统WEB-INF\下的configLog.json文件</span>
</div>
</body>