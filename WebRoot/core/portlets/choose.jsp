<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.view.View"%>
<%@page import="com.linewell.core.view.column.Column"%>
<%@page import="com.linewell.core.db.JdbcSession"%>
<%@page import="com.linewell.core.db.JdbcFactory"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/core/params.jsp" %>
<%
	String type = request.getParameter("type");//人员范围类型
	String displayId = request.getParameter("displayId");
	String hiddenId = request.getParameter("hiddenId");
	String separate = request.getParameter("separate");
	String fn = request.getParameter("fn");
	String viewId = request.getParameter("viewId");
	String columns = request.getParameter("columns");
	
	if(StringUtils.isEmpty(separate)){
		separate = ",";
	}
	
	JdbcSession jdbc = JdbcFactory.getSession(GlobalParameter.APP_CORE);
	
	List<View> viewList = jdbc.queryForEntityList(View.class);	
	List<Column> columnList = jdbc.queryForEntityList(Column.class,"where view_unid='"+viewId+"'");
	
	request.setAttribute("type",type);
	request.setAttribute("path",request.getContextPath());
	request.setAttribute("viewId",viewId);
	request.setAttribute("columns",columns);
	request.setAttribute("viewList",viewList);
	request.setAttribute("columnList",columnList);
	
%>
<html>
<head>
	${import_theme}
	<script type="text/javascript" src="${corejs}/jquery.js"></script>
	<script type="text/javascript" src="${corejs}/jquery.form.js"></script>
	
	<link rel="stylesheet" type="text/css" href="${corejs}/validation/style.css" />
	<script type="text/javascript" src="${corejs}/validation/validation-min.js"></script>
</head>
<body>
	<div id="form_content">
		<div id="form_toolbar">
			<button class="form_btn" onclick="choose.submit()"> <img align="absMiddle" src="${path}/core/themes/default/images/admin/default_btn.gif"> 确定 </button>
			<button class="form_btn" onclick="top.popup.close()"> <img align="absMiddle" src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
		</div>
		<div>
			<table width="100%"  class="form_table">
			<col width="33%">
			<col width="33%">
			<col width="33%">
			<tr height="20px;">
				<th>视图</th>
				<th>字段</th>
				<th>已选字段</th>
			</tr>
			<tr>
				<td valign="top">
					<select id="viewList" style="width: 100%;" size="15" name="viewList" onchange="choose.clickView()">
					<s:iterator value="#request.viewList" id="view">
						<option value="${view.unid}" ${viewId eq view.unid?'selected=true':''}>${view.name}</option>
					</s:iterator>
             		</select>				
				</td>
				<td align="top">
	                <select id="columnList" style="width: 200;" size="15" name="columnList" ondblclick="choose.dbclickColumn()">
	                	<s:iterator value="#request.columnList" id="column">
	                 	<s:if test='#column.title!=null'>
	                 		<option value="${column.unid}">${column.title}</option>
	                 	</s:if>						
						</s:iterator>    		
	                </select>		
	            </td>
				<td align="top">
					<select id="chooseList" style="width: 100%;" size="15" name="chooseList" ondblclick="choose.delChoose()">
						<s:iterator value="#request.columnList" id="column">
	                 	<s:if test='#request.columns.indexOf(#column.unid)>-1'>
	                 		<option value="${column.unid}">${column.title}</option>
	                 	</s:if>						
						</s:iterator>
             		</select>
				</td>
			</tr>
			</table>
		</div>
	</div>
	
	<script type="text/javascript">
	var choose = {
		init:function(){
			var domIdJson = jQuery.parseJSON(top.popup.domIds[top.popup.domIds.length-2]);
			var domId = domIdJson.domId;
			var displayVal = top.$("#i_"+domId).contents().find("#<%=displayId%>").val().split('<%=separate%>');
			var hiddenVal = top.$("#i_"+domId).contents().find("#<%=hiddenId%>").val().split('<%=separate%>');
			if(displayVal[0].length>0){
				for(var i=0;i<displayVal.length;i++){
					choosePersonnel.addTo(displayVal[i],hiddenVal[i]);
				}
			}			
		},
		//单击视图,显示字段
		clickView:function(){
			var viewId = $('#viewList').val();
			$.ajax({
				type:'post',
				url:'portlet.action',
				dataType:'json',
				data:{
					fn:'getViewColumn',
					viewId:viewId
				},
				error:function(){
					
				},
				success:function(responseText){
					if(responseText.length>0){
						$('#columnList').empty();
						$('#chooseList').empty();
						for(var i=0;i<responseText.length;i++){
							if(responseText[i].title.length>0){
								var html = "<option value=\""+responseText[i].unid+"\">"+responseText[i].title+"</option>";
								$('#columnList').append(html);
							}							
						}
					}					
				}
			});
		},
		//双击字段添加到已选中
		dbclickColumn:function(){
			var option = $('#columnList :selected');			
			if( $('#chooseList option[value='+option.val()+']').length==0 ){
				var html = "<option value=\""+option.val()+"\">"+option.text()+"</option>";
				$('#chooseList').append(html);
			}
		},	
		//删除已选中
		delChoose:function(){
			$('#chooseList :selected').remove();
		},	
		submit:function(){
			var columns = "";
			$('#chooseList option').each(function(){
				columns += $(this).val()+",";
			});
			columns = columns.substring(0,columns.lastIndexOf(","));
			
			var domIdJson = jQuery.parseJSON(top.lwin.domIds[top.lwin.domIds.length-2]);
			var domId = domIdJson.domId;
			top.$("#i_"+domId).contents().find("#portlet_src_text").val($('#viewList :selected').text());
			top.$("#i_"+domId).contents().find("#portlet_src").val($('#viewList :selected').val());
			top.$("#i_"+domId).contents().find("#portlet_view_column").val(columns);
			top.lwin.close();
			
		}
	}
	
	</script>
</body>
</html>