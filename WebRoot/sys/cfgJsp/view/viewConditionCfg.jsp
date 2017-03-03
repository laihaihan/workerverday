<%@page contentType="text/html;charset=UTF-8"%>
<%
	String currentViewId = request.getParameter("unid");
	String personalconfig=request.getParameter("personalconfig");
%>

<body>
<script type="text/javascript">
	Ext.onReady(function(){
		viewConditionCfg.dbItems = null;
		viewConditionCfg.init("<%=currentViewId%>");
	});
</script>
<table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet2">
  <tr>
   <th width="17%">视图选择条件配置方式：</th>
   <td width="83%"><input name="cfgType" id="cfgType" type="radio" value="1" onClick="viewConditionCfg.cfgTypeChange(this)"/>配置
      <input name="cfgType" id="cfgType" type="radio" value="0" onClick="viewConditionCfg.cfgTypeChange(this)"/>
      手工输入SQL&nbsp;&nbsp;&nbsp;如果新建文档，请在选择好视图来源后，点击“<a href="javascript:void()" onclick="alert(1);">更新字段</a>”。
   </td>
  </tr>
  </table>
  <table width="100%"  bgcolor="#F4F9FD" border="1" bordercolordark="#FFFFFF" cellspacing="0" bordercolorlight="#006633" style="display: " id="sysCfg">
  <tr>
    <td height="30" colspan="3">
	<select name="leftseloptions_CN" id="leftseloptions_CN" onChange="viewConditionCfg.initSel('<%=currentViewId%>',this.value,'leftSel_CN')">
      <option value="~!@DB@!~">数据库字段</option>
	  <option value="~!@FW@!~">流程字段</option>
	  <option value="~!@XY@!~">系统变量</option>
	  <option value="~!@UR@!~">URL变量</option>
	  <option value="~!@CL@!~">手工输入</option>
    </select>&nbsp;
      <select name="leftSel_CN" id="leftSel_CN">
	  	<option value="1">用户名称</option>
      </select><INPUT name="leftInput_CN" id="leftInput_CN" type="text" style="display:none">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <!-- 
      	add by cxifu@linewell.com 2012/06/12
      	增加onChange="viewConditionCfg.initSeloptions方法，当比较符是包含、属于时隐藏数据库字段和流程字段
       -->
      <select name="compareTypeSel_CN" id="compareTypeSel_CN" onChange="viewConditionCfg.initSeloptions('<%=currentViewId%>',this.value,'rightseloptions_CN')">
        <option value="~!@0~!@0">等于</option>
		<option value="~!@0~!@B">不等于</option>
		<option value="~!@0~!@1">大于等于</option>
		<option value="~!@0~!@2">小于等于</option>
		<option value="~!@0~!@3">大于</option>
		<option value="~!@0~!@4">小于</option>
		<option value="~!@0~!@5">包含</option>
		<option value="~!@0~!@6">左包含</option>
		<option value="~!@0~!@7">右包含</option>
		<option value="~!@0~!@8">不包含</option>
		<option value="~!@0~!@9">为空</option>
		<option value="~!@0~!@A">不为空</option>
		<option value="~!@0~!@C">属于</option>
		<option value="~!@0~!@D">不属于</option>
      </select>&nbsp;
      <select name="rightseloptions_CN" id="rightseloptions_CN" onChange="viewConditionCfg.initSel('<%=currentViewId%>',this.value,'rightSel_CN')">
	  	<option value="~!@DB@!~">数据库字段</option>
	  	<option value="~!@XY@!~">系统变量</option>
	  	<option value="~!@FW@!~">流程字段</option>
	  	<option value="~!@UR@!~">URL变量</option>
	  	<option value="~!@CL@!~">手工输入</option>
      </select>&nbsp;
      <select name="rightSel_CN" id="rightSel_CN">
        <option value="1">用户名称</option>
      </select><INPUT name="rightInput_CN" id="rightInput_CN" type="text" style="display:none">&nbsp;  
	  <select name="andOrSel_CN" id="andOrSel_CN">
        <option value="">无</option>
		<option value="~!@AND@!~">并且</option>
		<option value="~!@OR@!~">或者</option>
      </select>    
	  </td>
  </tr>
  <tr>
    <td width="80%"><SELECT style="WIDTH: 100%" size=16 name="resultsSel_CN" id="resultsSel_CN" onChange="viewConditionCfg.selectParseAndSet(this);"></SELECT></td>
    <td width="4%" align="center"><a href="javascript:void(0)" onClick="viewConditionCfg.moveConItem(-1)"><img src="../../uistyle/style_1/ucapimages/arrow_asc.gif" /></a><br />
    <br /><a href="javascript:void(0)" onClick="viewConditionCfg.moveConItem(1)"><img src="../../uistyle/style_1/ucapimages/arrow_desc.gif" /></a></td>
	<td>
        <input name="btnAdd" type="button" class="btnChannel" id="btnAdd" value="增加条件" onClick="viewConditionCfg.addCon();"/>
        <br/>
        <br/>
        <input name="btnRefresh" type="button" class="btnChannel" id="btnRefresh" value="更新条件" onClick="viewConditionCfg.refreshCon();"/>
        <br/>
        <br/>
        <input name="btnAddLeftBracket" type="button" class="btnChannel" id="btnAddLeftBracket" value="增加（" onClick="viewConditionCfg.addLeftBracked();"/>
        <br/>
        <br/>
        <input name="btnAddRightBracked" type="button" class="btnChannel" id="btnAddRightBracked" value="增加）" onClick="viewConditionCfg.addRightBracked();"/>
        <br/>
        <br/>
        <input name="btnAddRightBracked" type="button" class="btnChannel" id="btnAddRightBracked" value="增加）并且" onClick="viewConditionCfg.addRightBrackedAnd();"/>
        <br/>
        <br/>
        <input name="btnAddRightBracked" type="button" class="btnChannel" id="btnAddRightBracked" value="增加）或者" onClick="viewConditionCfg.addRightBrackedOr();"/>
        <br/>
        <br/>
        <input name="btnDel" type="button" class="btnChannel" id="btnDel" value="删除条件" onClick="viewConditionCfg.delCon();"/>        
    </td>
  </tr>
</table>
<table width="100%"  cellspacing="0" cellpadding="0" style="display:none " id="manualCfg">
  <tr>
  <td>
  	<textarea style="width:100%;height:245px" rows="15" id="contextarea"></textarea>
  </td>
  </tr>
</table>
<table width="100%" cellspacing="0" cellpadding="0" >
  <tr>
  <td>
  	视图手工输入条件说明:(数据库字段前缀:~!@DB@!~,流程字段前缀:~!@FW@!~,URL字段前缀:~!@UR@!~,系统参数：~!@XY@!~)，结束标记均为~!@E@!~。</br>
  	例：field_1=~!@XY@!~user_unid~!@E@!~ or  field_1=~!@UR@!~punid~!@E@!~（如果条件中不需要用数据库字段、流程字段、URL字段、系统参数，则SQL语句中的条件怎么写就怎么配置即可）
  </td>
  </tr>
  <%if(null==personalconfig || !personalconfig.equals("1")){%>
  <tr><td align="center"><input type="button" name="btnSave" id="btnSave" class="btnChannel" value="保存" onClick="viewConfigFun.viewConditionConfirm('<%=currentViewId%>')"/></td></tr>
  <%}%>
</table>
</body>