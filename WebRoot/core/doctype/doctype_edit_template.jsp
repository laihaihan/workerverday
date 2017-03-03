<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="com.linewell.core.attr.cfg.*"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	//获取文档所有模板列表
	List<UcapAttrConfig> attrs = new UcapAttrConfigManager().doFindListByConditionExceptBlob("attr_cfg_punid=?",new String[]{request.getParameter("unid")});
	request.setAttribute("attrs",attrs);
%>
<form id="uploadForm">
<table width="98%" bordercolordark="#FFFFFF" bordercolorlight="#ADADBD" cellpadding="1" cellspacing="0" border="1" style="WORD-WRAP: break-word" class="form_table_ext" id="tpl_table" style="table-layout:fixed;">
	<col width="40" align="center"/>
	<col width="290"/>
	<col width="200"/>
	<col width="290" align="center"/>
	<col/>
	<tr>
		<td align="center"><strong>序号</strong></td>
		<td align="center"><strong>名称</strong></td>
		<td align="center"><strong>类别</strong></td>
		<td align="center"><strong>文件</strong></td>
		<td align="center">操作
		</td>
	</tr>
	<s:if test="#request.attrs.size() > 0">
	<s:set name="size" value="#request.attrs.size()"></s:set>
	<s:iterator value="#request.attrs" id="attr" status="st">
	<tr  height="35px">
		<th align="center">${st.index + 1}<input type="hidden" name="attr_cfg_unid" value="${attr.attr_cfg_unid }"/></th>
		<td align="center"><input type="text" id="attr_cfg_caption" name="attr_cfg_caption" style="width:87%" value="${attr.attr_cfg_caption }"/>
		<td align="center">
			<select id="attr_cfg_type" name="attr_cfg_type" style="width:87%">
				<option value="0" ${attr.attr_cfg_type eq "0" ? "selected" : ""}>正文模板</option>
				<option value="1" ${attr.attr_cfg_type eq "1" ? "selected" : ""}>打印阅办单模板</option>
				<option value="2" ${attr.attr_cfg_type eq "2" ? "selected" : ""}>登记信息显示模板</option>
				<option value="3" ${attr.attr_cfg_type eq "3" ? "selected" : ""}>登记信息编辑模板</option>
				<option value="4" ${attr.attr_cfg_type eq "4" ? "selected" : ""}>文档日志显示模板</option>
				<option value="5" ${attr.attr_cfg_type eq "5" ? "selected" : ""}>审批意见显示模板</option>
				<option value="6" ${attr.attr_cfg_type eq "6" ? "selected" : ""}>显示阅办单模板</option>
				<option value="7" ${attr.attr_cfg_type eq "7" ? "selected" : ""}>其它</option>
			</select>
		</td>
		<td align="left" style="padding-left:30px;">
			<input type="hidden" id="pid" name="pid"  value="${attr.attr_cfg_unid }"/>
			<img src='${path}/core/themes/default/images/admin/icon/blue-document-word-text.png'/>
			<a href="javascript:downloadFile('${attr.attr_cfg_unid }')">${attr.attr_cfg_file_name}</a>&nbsp;
		</td>
		<td align="center">
			<img onclick="delFile(this);" src="${path}/core/js/easyui/themes/icons/delete.gif">
		</td>
	</tr>
	</s:iterator>
	</s:if>
	<tr id="uploadify" height="35px">
		<th align="center">${size + 1 }<input type="hidden" id="attr_cfg_unid" name="attr_cfg_unid" value=""/></th>
		<td align="center"><input type="text" id="attr_cfg_caption" name="attr_cfg_caption" style="width:87%"/>
		<td align="center">
			<select id="attr_cfg_type" name="attr_cfg_type" style="width:87%">
				<option value="0">正文模板</option>
				<option value="1">打印阅办单模板</option>
				<option value="2">登记信息显示模板</option>
				<option value="3">登记信息编辑模板</option>
				<option value="4">文档日志显示模板</option>
				<option value="5">审批意见显示模板</option>
				<option value="6">显示阅办单模板</option>
				<option value="7">其它</option>
			</select>
		</td>
		<td align="left" style="padding-left:20px;"><input type="text" name="savepath" id="savepath" value="" style="width:80%" readonly><input type="file" id="file" name="file" class="uploadify" style="display:none;"/></td>
		<td align="center">
			<!-- <img onclick="doAdd(this)" src="${path}/core/js/easyui/themes/icons/add.gif">&nbsp;&nbsp; 
			-->
			<img onclick="delFile(this)" src="${path}/core/js/easyui/themes/icons/delete.gif" name="lastDel" style="display:none;">
			
		</td>
	</tr>
</table>
<script type="text/javascript" language="javascript">
	//定义全局变量
	//新增模板
	var cloneTr = $("#tpl_table tr[id='uploadify']").clone(true);
	function doAdd(e){
		var tr = $(e).parent().parent();
		var clone;
		if(cloneTr == null) {
			cloneTr = tr.clone(true);
			clone = cloneTr
		} else {
			clone = cloneTr.clone(true);
		}
		var font=$('<font color="red">*</font>');
		clone.find('th').text(($("#tpl_table tr").length));
		clone.find(':text').val('');
		clone.find('select').attr('value','');
		$("#tpl_table").append(clone);
		$("input[name='file']").uploadify(uploadifySettings);
	}
	
	//删除模板
	function doDelete(e){
		if($("#tpl_table tr").length == 1){
			top.lwin.alert('操作提示','已经是最后一行了，不能删除！','warning',1500,true);
		}else{
			$(e).parent().parent().remove();
		}
		$("#tpl_table tr").each(function(index,obj){
			$(obj).find("th").text((index));//重新设置序号
		})
	}
	//删除文件
	function delFile(e){
		top.$.messager.confirm('操作提示','您确定删除该项吗?',function(r){
			var unid = $(e).parent().parent().find("input[name='pid']").val();
			if(r){
				jQuery.ajax({
					url:'${path}/attrCfg.action',
					type:'post',
					dataType:'json',
					data:{
						fn:'del',
						unid:unid
					},
					complete:function(response){
						doDelete(e);
					}
				});
			}
		});	
	}
	var uploadifySettings = {   
         	'uploader'       : '${path}/core/js/uploadify/uploadify.swf',   
          	'script'         : '${path}/attrCfg.action',
          	'scriptData'	 : {
          		attr_cfg_punid 	   : $("#unid").val(),
          		attr_cfg_file_name : ''
          	},
          	'buttonImg'	     : '${path}/core/js/uploadify/theme/default/fill-090.png',
          	'cancelImg'      : '${path}/core/js/uploadify/cancel.png',   
          	'height'         : 18,
  		  	'width'          : 49,
          	'auto'           : true,   
          	'multi'          : true,   
          	'sizeLimit'      : 2048000, 
          	'fileDataName'   :'file',
          	'folder'		 :'upload',
          	'fileDesc'       : '支持格式：doc,docx,txt',
          	'removeCompleted' : true,
          	'fileExt'         : '*.doc;*.docx;*.txt' ,
          	onComplete:function(event, ID, fileObj, response, data){
	          	var json = $.parseJSON(response);
	          	if(json.success){
	          		var filepath = "<%=GlobalParameter.CORE_FILEPATH%>"+fileObj.name;
	          		var obj = jQuery("#"+jQuery(event.target).attr('id'));
	          		var html = "";
	          		html += "<input type='hidden' name='"+obj.attr("pid")+"' value='"+json.unid+"'/>&nbsp;&nbsp;";
	          		html += "<img src='${path}/core/themes/default/images/admin/icon/blue-document-word-text.png'/>";
	          		html += "<a href=\"javascript:downloadFile('"+json.unid+"')\">"+fileObj.name+"</a>&nbsp;";
	          		html += "";
	          		obj.parent().html(html);
	          		$("img[name='lastDel']").show();
	          		$("#tpl_table tr:last").find("input[name='attr_cfg_caption']").val(json.file.attr_cfg_caption);
	          		$("#tpl_table tr:last").find("input[name='attr_cfg_unid']").val(json.file.attr_cfg_unid);
	          		doAdd(obj);
	          	}
          	},
          	onSelectOnce : function(event,data) {
          		var obj = jQuery("#"+jQuery(event.target).attr('id'));
          		var attr_file_name = obj.parent().parent().find("input[name='attr_cfg_caption']").val();
				var attr_type = obj.parent().parent().find("select[name='attr_cfg_type']").val();
				obj.uploadifySettings('scriptData',{
					'attr_cfg_punid' : $("#unid").val(),
					'attr_cfg_caption': attr_file_name,
					'attr_cfg_type' : attr_type
				});
          	},
          	onError:function(event,ID,fileObj,errorObj){
	       		if(errorObj.type=='File Size'){
	       			alert("文件过大");
	       		}
          	}
     };
     window.onload = function(){
     	$(".uploadify").uploadify(uploadifySettings);
     };
     //文件下载	
	function downloadFile(unid){
		location.href = "${path}/core/file/file_download2.jsp?unid="+unid;
	}
</script>
</form>