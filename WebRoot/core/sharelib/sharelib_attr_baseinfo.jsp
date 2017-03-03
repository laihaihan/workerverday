<%@ page language="java" contentType="text/html; charset=utf-8" %>
<form action="${path}/ShareLibAttr.action" method="post" name="jspForm" id="jspForm" enctype="multipart/form-data">
<input type="hidden" name="fn" value="<%=fn%>" />
<input type="hidden" name="unid" value="${shareLibAttr.unid}" />
<input type="hidden" name="belongto" value="${shareLibAttr.belongto}" />
<table width="98%" border="0" align="center" cellpadding="0" cellspacing="0" class="form_table_ext">
	<col width="15%" align="right"/>
	<col width="35%" align="left"/>
	<col width="15%"align="right"/>
	<col width="35%" align="left"/>
	<tr>
      	<td><font color="#FF0000">*</font>所属用户：</td>
       	<td colspan="3">
       		<input type="text" name="username" id="username" value="${shareLibUser.name}" style="width:77%" readonly>
       	</td>
   	</tr>
   	<tr>
      	<td><font color="#FF0000">*</font>文件名称：</td>
       	<td colspan="3">
       		<input type="text" name="filename" id="filename" value="${shareLibAttr.filename}" style="width:77%">
       	</td>
   	</tr>
   	<tr>
      	<td><font color="#FF0000">*</font>上传文件：</td>
       	<td colspan="3">
       		<input type="text" name="filepath" id="filepath" value="${shareLibAttr.filepath}" style="width:77%" readonly>
       		<input id="uploadify" class="uploadify" type="file" name="file" style="display: none;"/>	
       	</td>
   	</tr>
   	<tr>
      	<td><font color="#FF0000">*</font>有效期限：</td>
       	<td>
       		<input id="expiry_date" name="expiry_date" type="text" value="${shareLibAttr.expiry_date}" size="10" class="Wdate" onclick="WdatePicker({el:$dp.$('expiry_date'),skin:'whyGreen',isShowOthers:false})" readonly="readonly" style="cursor:hand;width:77%"/>
       	</td>
      	<td><font color="#FF0000">*</font>材料类型：</td>
       	<td>
       		<select name="type">
       			<option value="1" ${shareLibAttr.type == 1 ? "selected" : ""}>申报材料</option>
       			<option value="2" ${shareLibAttr.type == 2 ? "selected" : ""}>证照</option>
       			<option value="9" ${shareLibAttr.type == 9 ? "selected" : ""}>其他</option>
       		</select>
       	</td>
   	</tr>
   	<tr>
      	<td><font color="#FF0000">*</font>文件下载：</td>
       	<td colspan="3">
       		<img src='${path}/core/themes/default/images/admin/icon/blue-document-word-text.png'/>
       		<a href="javascript:downloadFile('${shareLibAttr.unid}')">${shareLibAttr.filename}</a>
       	</td>
   	</tr>
</table>
</form>

<script type="text/javascript">
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	filename:'required',
	      	filepath:'required',
	      	expiry_date:'required'
	    },
	    messages:{
	    	filename:'请填写[文件名称]',
	    	filepath:'请上传文件',
	    	expiry_date:'请选择[有效期限]'
	    }
  	});	
</script> 