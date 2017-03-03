<%@ page language="java" pageEncoding="UTF-8" %>
<table width="98%" align="center" class="form_table_ext">
	<tr align="center">
	    <th width="30">序号</th>
	    <th>材料名称</th>
	    <th width="25%">创建时间</th>
	    <th width="25%">备注</th>
	    <th width="120">操作</th>
	</tr>
    <s:iterator value="#request.materialList" id="mal" status="table_status">
	<tr align="center" id="tr_${mal.unid}">
		<td>${table_status.index+1}</td>
		<td>${mal.infoname}</td>
		<td>${mal.createtime}</td>
		<td>${mal.memo}</td>
		<td>
	        <a class="btn" href="javascript:doSelectMaterial('${mal.unid}')">查看</a>
		</td>
	</tr>
	</s:iterator>		
</table>
