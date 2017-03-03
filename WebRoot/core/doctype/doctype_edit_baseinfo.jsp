<%@ page language="java" pageEncoding="UTF-8"%>
<form id="jspForm" name="jspForm" method="post" action="${path}/doctype.action">
<input type="hidden" id="fn" name="fn" value="<%=fn%>">
<input type="hidden" name="unid" id="unid" value="<%=doctype.getUnid()%>">
<input type="hidden" name="opertime" id="opertime" value="${doctype.opertime }">
<input type="hidden" name="updatetime" id="udatetime" value="<%=dt.getNowTime() %>">
<table align="center" width="98%" bordercolordark="#FFFFFF" bordercolorlight="#ADADBD" cellpadding="5" cellspacing="0" border="1" style="WORD-WRAP: break-word" class="form_table_ext">
	<col width="100"/>
	<col width="250"/>
	<col width="100"/>
	<col width="250"/>
	<tr>
		<td width="120" class="kuan">
			<font color="red">*</font>文件类型名称：</td>
		<td width="580" colspan="3">
			<input class="input" type="text" id="name" name="name" value="${doctype.name }"/>
		</td>
	</tr>
	<tr>
		<td width="120" class="kuan"><font color="red">*</font>绑定模块：</td>
		<td width="240" id="selectFormId">
			<input class="input" type="hidden" id="moduleid" name="moduleid" value="${doctype.moduleid }"/>
			<input class="input" type="hidden" id="moduleName" name="moduleName" value="${doctype.module}"/>
			<input type="text" id="module" name="module" value="" class="easyui-combotree" data-options="url:'get_data.php',required:true" style="width:200px;"/>
		</td>
		<td width="100" class="kuan">绑定流程：</td>
		<td width="240">
			<input class="input" type="hidden" id="flowid" name="flowid" value="${doctype.flowid }" />
			<input class="input" type="hidden" id="flowName" name="flowName" value="${doctype.flow }" />
			<input type="text" id="flow" name="flow" value=""  class="easyui-combotree" data-options="url:'get_data.php',required:true" style="width:200px;"/>
		</td>
	</tr>
	<tr style="display:none">
		<td width="120" class="kuan">
			<font color="red">*</font>文档权限：</td>
		<td colspan="3" id="selectSecurityId"></td>
	</tr>
	<tr>
		<td width="120" class="kuan">包含的文件字：</td>
		<td colspan="3">
			<input class="input" type="hidden" id="containdocwords" name="containdocwords" style="BORDER: #E3E3E3 1px solid; HEIGHT: 18px;width:88%;" value="${doctype.containdocwords }"/>
			<input class="input" type="text" id="containdocwordsdis" name="containdocwordsdis" style="BORDER: #E3E3E3 1px solid; HEIGHT: 18px;width:88%;" value="${doctype.containdocwordsdis }"/>
			<input name="Submit" type="button" class="button3" onClick="doSelect(0,'containdocwords','containdocwordsdis')" value="选择"/>
		</td>
	</tr>
	<tr>
		<td width="120" class="kuan">联合编号文件字：</td>
		<td colspan="3">
			<input class="input" type="hidden" id="combinedocwords" name="combinedocwords" style="BORDER: #E3E3E3 1px solid; HEIGHT: 18px;width:88%;" value="${doctype.combinedocwords }"/>
			<input class="input" type="text" id="combinedocwordsdis" name="combinedocwordsdis" style="BORDER: #E3E3E3 1px solid; HEIGHT: 18px;width:88%;" value="${doctype.combinedocwordsdis }"/>
			<input name="Submit2" type="button" class="button3" onClick="doSelect(0,'combinedocwords','combinedocwordsdis')" value="选择"/>
		</td>
	</tr>
	</form>
	<form id="sequenceForm" name="sequenceForm">
	<tr>
		<td class="kuan" colspan="4">
			<div align="left">
				<strong>流水号模式</strong>
			</div>
		</td>
	</tr>
	<tr>
		<td width="120" class="kuan">
			<font color="red">*</font>序号初始值：</td>
		<td width="240">
			<input class="input" type="text" id="initnumber" name="initnumber" maxlength="7"  value="${sequence.initnumber }"/>
		</td>
		<td width="100" class="kuan">
			<font color="red">*</font>序号位数：</td>
		<td width="240">
			<input class="input" type="text" maxlength="2" id="numbercount" name="numbercount" value="${sequence.numbercount }"/>
		</td>
	</tr>
	<tr>
		<td width="100" class="kuan">
			年度：</td>
		<td width="250">
			<input class="input" title="系统将自动更新年度" type="text" maxlength="7"id="currentyear" name="currentyear" title="系统将自动更新年度" value="${sequence.currentyear }" />
		</td>
		<td width="100" class="kuan">
			是否可重复：</td>
		<td width="250">
			<input  class="input"  type="radio" maxlength="2" name="canrepeat" value="true" style="width:24"/>
			是
			<input class="input" type="radio" maxlength="2" name="canrepeat" value="false" style="width:24" checked/>
			否
		</td>
	</tr>
	<tr>
		<!--colspan="3" -->
		<td width="100" class="kuan">自动调整编号：</td>
		<td width="250" title="系统将根据编号修改情况，调整自增长值">
			<input  class="input"  type="radio" maxlength="2" name="autoadjust" value="true" style="width:24"/>
			是
			<input class="input" type="radio" maxlength="2" name="autoadjust" value="false" style="width:24" checked/>
			否
		</td>
		<td width="100" class="kuan">启用重新编号：</td>
		<td width="250" title="系统将自动重新编号">
			<input  class="input"  type="radio" maxlength="2" name="refreshsequence" value="true" style="width:24"/>
			是
			<input class="input" type="radio" maxlength="2" name="refreshsequence" value="false" style="width:24" checked/>
			否
		</td>
	</tr>
	<tr>
		<td width="120" class="kuan"><font color="red">*</font>序号样式：</td>
		<td colspan="3">
			<input class="input" type="text" id="formatstring" name="formatstring" value="${sequence.formatstring }"/>
		</td>
	</tr>
	<tr>
		<td width="14%" class="kuan">样式说明：</td>
		<td width="86%" class="kuanleft" colspan="3">
			<strong>流水号一般由年度和序号组成。例:"{年度}{序号}"。{年度}、{序号}等"{}"中的内容为系统内置变量。</strong>
		</td>
	</tr>
	</form>
	<form id="dwsequenceForm" name="dwsequenceForm">
	<tr>
		<td class="kuan" colspan="4">
			<div align="left">
				<strong>文件字号模式</strong>
			</div>
		</td>
	</tr>
	<tr>
		<td width="120" class="kuan">
			<font color="red">*</font>序号初始值：</td>
		<td width="240">
			<input class="input" type="text" maxlength="7" id="initnumber" name="initnumber" value="${dwSequence.initnumber }"/>
		</td>
		<td width="100" class="kuan">
			<font color="red">*</font>序号位数：</td>
		<td width="240">
			<input class="input" type="text" maxlength="2" id="numbercount" name="numbercount" value="${dwSequence.numbercount }"/>
		</td>
	</tr>
	<tr>
		<td width="100" class="kuan" title="系统将自动更新年度">
			年度：</td>
		<td width="250">
			<input class="input" type="text" title="系统将自动更新年度"  maxlength="7" name="currentyear" value="${dwSequence.currentyear }"/>
		</td>
		<td width="100" class="kuan">
			是否可重复：</td>
		<td width="250">
			<input  class="input"  type="radio" maxlength="2" name="canrepeat" value="true" style="width:24"/>
			是
			<input class="input" type="radio" maxlength="2" name="canrepeat" value="false" style="width:24" checked/>
			否
		</td>
	</tr>
	<tr>
		<td width="100" class="kuan">自动调整编号：</td>
		<td width="250" title="系统将根据编号修改情况，调整自增长值">
			<input  class="input"  type="radio" maxlength="2" name="autoadjust" value="true" style="width:24"/>
			是
			<input class="input" type="radio" maxlength="2" name="autoadjust" value="false" style="width:24" checked/>
			否
		</td>
		<!--文件号模式***************************************************-->
		<td width="100" class="kuan">启用重新编号：</td>
		<td width="250" title="系统将自动重新编号">
			<input  class="input"  type="radio" maxlength="2" name="refreshsequence" value="true" style="width:24"/>
			是
			<input class="input" type="radio" maxlength="2" name="refreshsequence" value="false" style="width:24" checked/>
			否
		</td>
	</tr>
	<!--***************************************************-->
	<tr>
		<td width="120" class="kuan"><font color="red">*</font>序号样式：</td>
		<td colspan="3">
			<input class="input" type="text" maxlength="255" id="formatstring" name="formatstring" value="${dwSequence.formatstring }">
		</td>
	</tr>
	<tr>
		<td width="14%" class="kuan">样式说明：</td>
		<td width="86%" class="kuanleft" colspan="3">
			<strong>一般由字号、年度和序号组成.例:"闽{年度}{序号}"。{字号}、{年度}等"{}"中的内容为系统内置变量。</strong>
		</td>
	</tr>
	</form>
</table>