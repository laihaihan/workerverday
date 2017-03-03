<%@page contentType="text/html;charset=UTF-8"%>
<body>
<style> 
fieldset{ 
  margin:3px; 
  padding:5px; 
  margin-top:0; 
  overflow:hidden; 
  zoom:1; 
} 
.authDiv{
  padding:5px;
  display:inline;
  clear:both;
}

/*
 * 2012-5-14 add by xhuatang
 * 解决Ext的TreePanel滚动条在IE6无法显示的问题
 */
.ext-strict .ext-ie6 .x-layout-split{background-color: #dfe8f6;}
.ext-ie .x-tree .x-panel-body {position: relative;}
.ext-ie .x-tree .x-tree-root-ct{position: absolute;}
</style>
<div id="roleConfigdialogHtml">
<fieldset>
  <legend>基本信息</legend>
	<table class="tableSet" style="" >
	   <tr>
	    <th width="25%" align="right">
	    <input type="hidden" name="funid" id="funid" /> 
        <input type="hidden" name="type" id="type" />
        <input type="hidden"  name="belongToApp" id="belongToApp" />
        <input type="hidden"  name="unid" id="unid"/>
	    <span class="red">*</span>角色名称</th>
	    <td><input type="text" class="inputbox" name="rolename" id="rolename" style="width:95%" /></td>
	  </tr>
	  <tr>
	    <th width="25%" align="right"><span class="red">*</span>角色用户：</th>
	 	<td><input type="text" readonly class="inputred" name="users_Cn_" id="users_Cn_" style="width:93%" />
	 	<input type="text" class="inputbox" name="users" id="users" style="display:none"/>
	 	<input type="button" value="选" onclick="selectDataSD('200','0','users','','','','','umc');"/></td>
	  </tr>	  
	</table>
</fieldset>
<fieldset id="_UmcAuthHtml">
  <legend>授权</legend>
  <div id="authPostHtml" class="authDiv">
    <input type="checkbox" id="canCreate" name="canCreate"  /><label for="canCreate">是否有职位管理的权限</label>
  </div>
</fieldset>
</div>
  
</body>
