<%@page contentType="text/html;charset=UTF-8"%>
<body>
<div id="dictConfigdialogHtml">
<table class="tableSet">
<br>
   <tr>
    <th width="16%"><span class="red">*</span>字典名称</th>
    <td width="38%"><input type="text" class="inputbox" name="dictName" id="dictName" style="width:95%" /></td>
    <th width="16%"><span class="red">*</span>具体值</th>
 	<td ><input type="text" class="inputbox" name="value" id="value" style="width:95%" /></td>
  </tr>
  <tr style="display:none">
    <th width="16%"><span class="red">*</span>所属应用系统</th>
 	<td ><input type="text" class="inputbox" name="belongToApp" id="belongToApp" style="width:95%" /></td>
  </tr>
</table>
<br>
<table class="tableSet" id="systemSet">
 <tr>
    <th width="16%">可编辑用户集</th>
    <td colspan="3"><input type="text" class="inputred" name="editors" id="editors" style="display:none" />
 <TEXTAREA type="text" class="inputred" readonly  rows="3"  id="editors_Cn_" name="editors_Cn_" style="width:95%"></TEXTAREA>
 
  <input type="button" value="选" onclick="selectDataSD('200,201,202,203','0','editors');"/>
    </td>
    </tr>
</table>  
</div>
</body>