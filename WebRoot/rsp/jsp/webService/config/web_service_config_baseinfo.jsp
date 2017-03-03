<%@ page language="java" pageEncoding="UTF-8"%>
<form id="baseForm" name="baseForm" action="view.action" method="post">
<table cellspacing="0" cellpadding="0" border="0" align="center" class="form_table">
<tbody>
<tr>					
	<td valign="top" style="padding-left: 0px;">						
		
		<input type="hidden" name="fn" value="saveBase">				
		<input type="hidden" name="unid" id="unid" value="${view.unid}">				
		<table cellspacing="0" cellpadding="0" border="0" style="border: 1px solid rgb(255, 255, 255); width: 100%;" class="form_table">
		<col width="17%" align="right" style="background: #fafafa" >
		<col width="33%" align="left">
		<col width="15%" align="right" style="background: #fafafa">
		<col width="35%" align="left">
		<tbody>
		<tr>
			<th>
				<span class="null">*</span>服务接口名称:
			</th>
			<td>
				<input type="text" id="webservice_name" name="webservice_name" value="${view.name}" style="width:80%" class="required"/>
			</td>
			<th>
				<span class="null">*</span>服务接口别名:
			</th>
			<td>
				<input type="text" id="wasservice_alias" name="webservice_name" value="${view.alias}" style="width:80%" class="required"/>
			</td>
		</tr>
		
		
						
		
		</tbody>						
		</table>											
	</td>
</tr>
</tbody>
</table>
</form>
			
<div style="text-align:center;padding:20px;">
	<s:if test="#request.view.unid.length()==32">
		<a href="javascript:copyView('${view.unid}')"  class="easyui-linkbutton" iconCls="icon-add">复制视图</a>
	</s:if>					
	<a ref="SQL语句" href="javascript:"  class="easyui-linkbutton step" iconCls="icon-add">下一步</a>
	<a href="javascript:"  class="easyui-linkbutton stepover" iconCls="icon-save">保存关闭</a>
</div>