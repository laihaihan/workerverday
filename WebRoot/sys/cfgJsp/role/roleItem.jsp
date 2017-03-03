<%@page contentType="text/html;charset=UTF-8"%>
<body>
<div id="roleConfigdialogHtml">
<table class="tableSet">
<br>
   <tr>
    <th width="25%" align="right"><span class="red">*</span>角色名称：</th>
    <td><input type="text" class="inputbox" name="rolename" id="rolename" style="width:95%" /></td>
  </tr>
  <tr>
    <th width="25%" align="right"><span class="red">*</span>角色用户：</th>
 	<td><input type="text" class="inputbox" name="users_Cn_" id="users_Cn_" style="width:93%" />
 	<input type="text" class="inputbox" name="users" id="users" style="display:none"/>
 	<input type="button" value="选" onclick="selectDataSD('200','0','users');"/></td>
  </tr>
  <tr style="display:none">
    <th width="16%"><span class="red">*</span>所属应用系统</th>
 	<td ><input type="text" class="inputbox" name="belongToApp" id="belongToApp" style="width:95%" /></td>
 	<th width="16%"><span class="red">*</span>角色标识</th>
 	<td ><input type="text" class="inputbox" name="funid" id="funid" style="width:95%" /><input type="text" class="inputbox" name="unid" id="unid" style="width:95%" /><input type="text" class="inputbox" name="type" id="type" style="width:95%" /></td>
  </tr>
   <tr>
    <th width="25%" align="right">排序号：</th>
    <!-- 2012-10-16 mdf by chuiting@linewell.com
   新建角色时，排序号手动输入一个号，保存时不会存入输入的号，而是自动生成一个号
   添加说明"排序号未输入或者输入0，则排序号为自增长" -->
 	<td><input type="text" class="inputbox" value="0"  name="sort" id="sort" style="width:93%"  onblur="if(isNaN(this.value)){alert('排序值必须为数字！');this.focus();this.value='0';}" />
 	<br/><span class="red">注：排序号未输入或者输入0，则排序号为自增长</span></td>
 	<!-- end 2012-10-16 mdf by chuiting@linewell.com -->
  </tr>
</table>
</div>
</body>
