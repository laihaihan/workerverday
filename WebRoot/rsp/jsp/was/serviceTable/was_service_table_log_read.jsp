<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<table align="center" width="98%" class="form_table_ext" id="table_list">
	<col width="15%">
	<col width="30%">
	<col width="25%">
	<col width="15%">
	<col width="15%">
	<tr height="25">
       	<th>表格类型</th>
		<th>表格名称</th>
       	<th>上传时间</th>
       	<th>操作记录</th>
       	<th>操作</th>
    </tr> 
    <s:if test="#request.tableList.size()>0">
		<s:iterator value="#request.tableList" id="table">	
			<s:if test='#table.del_flag=="Y"'>
				<tr align="center" id="tr_${table.unid}">
		        	<td>${table.type == "1" ? "空白表格" : "示例表格"}</td>
		        	<td><s:property value="#table.name"/></td>
		        	<td><s:property value="#table.createtime"/></td>
		        	<td>
		        		已删除
		        	</td>
		        	<td>
		        		<a class="btn" href="javascript:downloadTable('${table.fileunid}')">下载</a>
		        	</td>
		     	</tr> 
		     </s:if>
		</s:iterator>
	</s:if>
</table>
<script type="text/javascript">
	//下载表格	
	function downloadTable(unid){
		location.href = "${path}/core/file/file_download.jsp?unid="+unid;
	}
</script> 
