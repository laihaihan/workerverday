<%@ page language="java" contentType="text/html; charset=utf-8" %>
<table width="98%">
	<tr>
		<td>
			<table width="100%">
				<tr>
					<td align="right">
						项目名称：<input type="text" name="projectName" id="projectName" size="30">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						申报时间：<input type="text" name="beginTime" id="beginTime" size="15" class="Wdate" onclick="WdatePicker({skin:'whyGreen',isShowOthers:false})" readonly="readonly" style="cursor:hand"/> 至
								<input type="text" name="endTime" id="endTime" size="15" class="Wdate" onclick="WdatePicker({skin:'whyGreen',isShowOthers:false})" readonly="readonly" style="cursor:hand"/>	
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" id="btnQuery" value="查 询">
					</td>
				</tr>
			</table>
			<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="form_table_ext" id="apply_history">				
				<tr align="center" height="30">
			       	<th width="50">序号</th>
			       	<th>项目名称</th>
			       	<th>审批事项</th>
			       	<th width="150">申报号</th>
			       	<th width="120">申报时间</th>
			       	<th width="50">操作</th>
			   	</tr>
			</table>
		</td>
	</tr>
</table>     	