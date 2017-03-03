<%@ page language="java" pageEncoding="UTF-8" %>
<table width="98%" align="center" class="form_table_ext">
	<tr align="center">
	    <th width="30">序号</th>
	    <th>内容</th>
	    <th width="80">操作</th>
	</tr>
    <s:iterator value="#request.noticeList" id="notice" status="table_status">
	<tr align="center" id="tr_${notice.unid}">
		<td>${table_status.index+1}</td>
		<td>${notice.content}</td>
		<td>
			<a class="btn" href="javascript:doEdit('${notice.unid}')">查看</a>
		</td>
	</tr>
	</s:iterator>		
</table>