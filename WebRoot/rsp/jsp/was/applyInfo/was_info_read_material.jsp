<%@ page contentType="text/html;charset=utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<table width="98%" border="0" cellpadding="0" cellspacing="0" class="form_table_ext">
<col style="padding:3px;" width="30px;">
<col style="padding:3px;">
<col style="padding:3px;">
<col style="padding:3px;" width="80">
<col style="padding:3px;" width="60">
<col style="padding:3px;" width="250">
<tr>
    <th align="center">序号</th>
    <th>材料名称</th>
    <th>备注</th>
    <th>接收方式</th>
     <th>状态</th>
    <th>文件</th>
</tr>
<s:iterator value="#request.attrList" id="attr" status="status">
<s:if test='#request.attr.del_flag=="N"'>
<tr>
	<td align="center">${status.index+1}、</td>
	<td>${attr.name}</td>
	<td>${attr.memo}</td>
	<td>
		${attr.savestate eq 'check'?'纸质收取':''}
		${attr.savestate eq 'upload'?'上传':''}
		${attr.savestate eq 'noneed'?'无需收取':''}
	</td>
	<td>
		${attr.ischecked eq 'N' ? '<span style="color:red">未收取</span>' : ''}
		${attr.ischecked eq 'Y' ? '<span style="color:green">已收取</span>' : ''}
	</td>	
	<td>
		<s:if test="!@com.linewell.core.util.StrUtil@isNull(#request.attr.file)">
			<img src='${path}/core/themes/default/images/admin/icon/blue-document-word-text.png'/>
			<a href="javascript:downloadFile('${attr.file.file_unid }')">
				${attr.file.file_name}
			</a>
		</s:if>
	</td>
</tr>
</s:if>
</s:iterator>
</table>
<script type="text/javascript">
//文件下载
function downloadFile(unid){
	location.href = "${path}/core/file/file_download.jsp?unid="+unid;
}
</script>