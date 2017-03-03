<%@page language="java" pageEncoding="UTF-8"%>
<form name="jspForm" id="jspForm" action="${path}/print.action" method="post">
<input type="hidden" name="fn" id="fn" value="<%=fn%>" />
<input type="hidden" name="print_unid" value="${print.print_unid}" />
<input type="hidden" name="punid" value="${print.punid}" />

<table width="99%" class="form_table_ext" align="center">
	<col width="80" align="right">
	<col align="left">
	<col>
	<tr>
		<th>
			单据名称：
		</th>
		<td>
			<input type="text" name="print_name" id="print_name" class="required" title="必填" value="${print.print_name}" style="width:80%"/>
		</td>
	</tr>
	<tr>
		<th>
			背景图片：
		</th>
		<td>
			<input type="text" name="print_background" id="print_background" readonly="readonly" value="${print.print_background}" style="width:80%"/>
			<input type="file" name="file_upload" id="file_upload"/>
		</td>
	</tr>
	<tr>
		<th>
			SQL：
		</th>
		<td>
			<textarea rows="10" name="print_sql" id="print_sql" class="required" style="width:80%">${print.print_sql}</textarea>
		</td>
	</tr>
	<tr>
		<td colspan="2" align="center" style="padding-top:10px;padding-bottom:10px">
			<input type="button" value="保存" id="btnSave">
			<input type="button" value="下一步" id="btnNext">
		</td>
	</tr>
</table>
</form>

<!-- 材料附件上传脚本 -->
<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css" />
<script type="text/javascript" src="${path}/core/js/uploadify/swfobject.js"></script>
<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js" charset="gbk"></script>
<script type="text/javascript">
	$(function(){
		$("#file_upload").uploadify({   
			'uploader'        : '${path}/core/js/uploadify/uploadify.swf',   
	        'script'          : '${path}/AppFile.action?fn=upload',   
	        'buttonImg'	      : '${path}/core/js/uploadify/theme/default/fill-090.png',
	        'cancelImg'       : '${path}/core/js/uploadify/cancel.png',   
	        'height'          : 16,
	  		'width'           : 16,
	        'auto'            : true,   
	        'multi'           : true,   
	        'sizeLimit'       : 2048000, 
	        'fileDataName'	  :'file',
	        'fileDesc'        : '支持格式：jpg,jpeg,gif,bmp',
	        'removeCompleted' : true,
	        'fileExt'         : '*.jpg;*.jpeg;*.gif;*.bmp',
	        onComplete:function(event, ID, fileObj, response, data){
				var json = $.parseJSON(response);
	          	if(json.success){
	          		$('#print_background').val(json.appFile.file_path);
	          	}
	        },
	        onError:function(event,ID,fileObj,errorObj){
				if(errorObj.type=='File Size'){
	       			alert("文件过大");
	       		}
			}
	    });
	});	     
</script>