<%@page contentType="text/html;charset=UTF-8"%>
<body>
<div id="menuConfigdialogHtml">
<table class="tableSet">
  <tr>
    <th width="16%"><span class="red">*</span>显示名称</th>
    <td width="38%"><input type="text" class="inputbox" name="displayName" id="displayName" style="width:95%" /></td>
    <th width="16%"><span class="red">*</span>配置名称</th>
    <td ><input type="text" class="inputbox" name="name"  id="name"  /></td>
    </tr>
  <tr>  
    <th width="16%"><span class="red">*</span>模块样式</th>
    <td >
     <input type="radio"  name="style"  id="style"  value="01"  />树型
     <input type="radio" name="style"  id="style"  value="02" />普通展开</td>  
    <th width="16%">标题图标</th>
    <td ><input type="text" class="inputbox" name="picture" id="picture" style="width:95%"/></td>
  </tr> 
    <tr>  
    <th width="16%"><span class="red">*</span>模块类型</th>
    <td >
     <input type="radio"  name="type"  id="type"  value="01"  checked/>应用系统
     <input type="radio" name="type"  id="type"  value="02" />平台
     </td>  

  </tr> 
  </table><br>
  <!-- 
  	2012-08-17 mdf by cxifu@linewell.com 隐藏显示条件配置域，统一入口在角色的“业务权限”来配置权限
   -->
<table class="tableSet" id="systemSet" style="display: none;">
  <tr >
    <th rowspan="3" width="16%">显示条件</th>
    <td width="16%">使用范围</td>
    <td colspan="2"><input type="text" class="inputbox" id="useScopes" name="useScopes" style="display:none;"/>
        <input type="text" readonly class="inputred" name="useScopes_Cn_" id="useScopes_Cn_" />
    <input type="button" value="选" onclick="selectDataSD('200,201,202,203','0','useScopes');"/>
  </tr>
  <!--tr>
    <td>不能使用范围</td>
    <td colspan="2"><input type="text" class="inputbox" id="unuseScopes" name="unuseScopes" style="display:none;"/>
    <input type="text" readonly class="inputred" id="unuseScopes_Cn_" name="unuseScopes_Cn_" />
    <input type="button" value="选" onclick="selectDataSD('200,201,202,203','0','unuseScopes');"/>
   </tr -->
  <tr>
    <td>扩展功能</td>
    <td colspan="2"><input type="text" class="inputbox" id="interaction" name="interaction" style="display:none;"/>
     <input type="text" readonly class="inputred" id="interaction_Cn_" name="interaction_Cn_"/>
    <input type="button" value="选" onclick="selectDataSD('227','0','interaction');"/>
   </tr> 
</table> 
</div>
</body>