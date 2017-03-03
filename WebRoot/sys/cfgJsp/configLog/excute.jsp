<%@page contentType="text/html;charset=UTF-8"%>
<%
	String currentViewId = request.getParameter("unid");
	String sSystemPath = request.getContextPath()+"/";
%>
<body>
<div id="exeDialogHtml">

<table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet">
  <col width="120"/>
  <col width="160"/>
  <col width="120"/>
  <col width="160"/>
  <tr style="display:none">
    <th>执行范围（SQL）</th>
    <td colspan="3"><input type="text" class="inputbox" name="exesql" id="sql"/></td>
  </tr>
  <tr>
    <th>开始时间</th>
    <td ><input type="text" class="inputbox" name="beginTime" id="beginTime" sourceType="05" /><IMG style="CURSOR: pointer;" onclick="WdatePicker({el:'beginTime'});" src="<%=sSystemPath %>js/ucap/calendar/skin/datePicker.gif" align=absMiddle/></td>
    <th>结束时间</th>
    <td ><input type="text" class="inputbox" name="endTime" id="endTime" sourceType="05"/><IMG style="CURSOR: pointer;" onclick="WdatePicker({el:'endTime'});" src="<%=sSystemPath %>js/ucap/calendar/skin/datePicker.gif" align=absMiddle/></td>
  </tr>
   <tr>
    <th>执行范围</th>
    <td colspan="3"><input type="checkbox" name="exerange" id="exerange" value="01" checked/>平台
    <input type="checkbox" name="exerange" id="exerange" value="02" checked/>用户
    <input type="checkbox" name="exerange" id="exerange" value="03" checked/>设计
    <input type="checkbox" name="exerange" id="exerange" value="04" checked/>界面
    <input type="checkbox" name="exerange" id="exerange" value="05" checked/>系统参数
    <input type="checkbox" name="exerange" id="exerange" value="06" checked/>其他
    </td>
  </tr>
  <tr>
    <th>执行后删除</th>
    <td colspan="3"><input type="radio" name="deleted" id="deleted" value="1"/>是<input type="radio" name="deleted" id="deleted" value="0" checked/>否</td>
  </tr>
</table>
</div>
</body>