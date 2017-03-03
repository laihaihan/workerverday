<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.rsp.resource.ResourceBaseInfoManager" %>
<%@ page import="com.linewell.core.util.DateTime" %>
<%@ page import="com.linewell.core.rsp.mapping.*" %>
<%@ page import="com.linewell.core.rsp.*" %>
<%@ page import="java.util.List" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<% 
	String type = request.getParameter("type");
	String materialid = request.getParameter("materialid");
	String userunid = request.getParameter("userunid");
	String condition = "punid=? and effectivedate>=?";
	//ShareMapping shareMap =new ShareMappingManager().doFindByMaterialid(materialid);
	
	//if(null!=shareMap && "Y".equals(shareMap.getIaautomapp())){
	//	condition = "punid=? and materialid='"+materialid+"' and effectivedate>=?";
	//}
	String[] params = new String[]{userunid,DateTime.getNowDateTime("yyyy-MM-dd")};
	List list = new ResourceBaseInfoManager().doFindListByCondition(condition,params);
	request.setAttribute("path", request.getContextPath());
	request.setAttribute("list", list);
%>
<HTML>
<HEAD>
	<TITLE>共享材料信息列表</TITLE>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<META http-equiv=Content-Type content="text/html; charset=utf-8">
	
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript">
		$(function(){
			$("#btnSubmit").bind("click",doSubmit);
			$("#btnClose").bind("click",doClose);
		});
		
		function doSubmit(){
			if($(":checkbox:checked").length == 0){
				top.popup.alert("信息提示","请至少选择一个材料！","warning");
			}else{
				$(":checkbox:checked").each(function(index,obj){
					var a = $(obj).next();
					var html = "<div style='margin-top:5px'>";
					html += "<input type='hidden' name='<%=materialid%>_sharelib' value='"+$(obj).val()+"'/>&nbsp;&nbsp;";
					html += "&nbsp;&nbsp;<img src='${path}/core/themes/default/images/admin/icon/blue-document-word-text.png'/>";
					html += "<a href='"+a.attr("href")+"'>"+a.html()+"</a>&nbsp;&nbsp;";
					html += "<button onclick='$(this).parent().remove()' class='btn'>删除</button>";
					html += "</div>";
					var parentObj = top.lwin.parent();//父窗口对象
					//alert(html);
					parentObj.find("#<%=materialid%>_tr").find(".sp_sharelib").after(html);
				});
				top.popup.close(true);
			}
		}
		
		function doClose(){
			top.popup.close(true);
		}
		//文件下载
		function downloadFile(unid){
			location.href = "${path}/core/rsp/rspfile_download.jsp?unid="+unid+"&from=rsp&action=<%=RspConstant.LOG_ACTION_DOWNLOAD_RES%>";
		}
	</script>
</HEAD>
<BODY text=#000000 bgColor=#ffffff><br>
	<table width="90%" border="1" align="center" cellpadding="0" cellspacing="0" bordercolorlight="#666666" bordercolordark="#FFFFFF">				
		<tr align="center" height="30">
           	<td width="50"><b>序号</b></td>
           	<td><b>材料列表</b></td>
       	</tr>
		<s:if test="#request.list.size()>0">
			<s:iterator value="#request.list" id="shareLibAttr" status="status">
				<tr>
	            	<td align="center"><s:property value="#status.index+1"/></td>
	             	<td>
	             		<input type="checkbox" name="checkedItems" value="${shareLibAttr.unid}">
	             		<a href="javascript:downloadFile('${shareLibAttr.unid}')">${shareLibAttr.filename}</a>
	             	</td>
	         	</tr>
         	</s:iterator>
        </s:if>
	</table><br>
	<center>
		<input type="button" class="btn" id="btnSubmit" value="确 定">&nbsp;&nbsp;&nbsp;
		<input type="button" class="btn" id="btnClose" value="关 闭">
	</center>
</BODY>
</HTML>	