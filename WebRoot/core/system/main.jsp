<%@page language="java" pageEncoding="UTF-8"%>
<div data-options="region:'center',title:'当前位置：'" id="center">
<div id="tabs" class="easyui-tabs" fit="true" border="false">
</div>
</div>
<!-- 右健菜单 -->
<div id="tabMenu" class="easyui-menu" style="width:150px;">
	<div id="tabMenu-close">关闭标签</div>
	<div id="tabMenu-closeall">关闭全部标签</div>
	<div id="tabMenu-closeother">关闭其它标签</div>
	<div class="menu-sep"></div>	
	<div id="tabMenu-closeleft">关闭左侧标签</div>
	<div id="tabMenu-closeright">关闭右侧标签</div>
	<div class="menu-sep"></div>
 </div>

<!-- 关闭标签例表 -->
<div id="recycleTabs" class="easyui-menu" style="width:150px;">
	<div id="recycleTabs-remove">清除关闭的标签列表</div>
	<div class="menu-sep"></div>
</div>
<!-- 标签设置页 -->
<div id="setTabs" class="setTabs">
	<table border="0" width="100%">
	<tr>
		<td colspan="2"><b>标签项最大个数</b>:</td>		
	</tr>
	<tr>
		<td width="60">建议:</td>
		<td>
			<select onchange="$('#tabNum').val(this.value)">
				<option value="fit" selected="selected">自适应</option>
				<option value="7">1024分辨率7个</option>
				<option value="9">1152分辨率9个</option>
				<option value="10">1280分辨率10个</option>
			</select>
		</td>
	</tr>
	<tr>
		<td>自定义:</td>
		<td><input type="text" id="tabNum" name="tabNum" value="fit" size="4" onclick="this.select()"/></td>
	</tr>
	<tr>
		<td height="35" colspan="2" align="center"><input type="button" value="确定" onclick="setTabNum();"/> <input type="button" value="关闭" onclick="$('#setTabs').toggle('fast')"/></td>
	</tr>
	</table>
</div>
<script type="text/javascript">
$(function(){
	var setTabNum = $.cookie('setTabNum');
	if(setTabNum==null){
		setTabNum="";
	}
	$("#setTabs select").val(setTabNum);
	$("#tabNum").val(setTabNum);
});
function setTabNum(){
	var num = $("#tabNum").val();
	$.cookie('setTabNum',num,{expires:365});
	$("#setTabs").fadeOut("fast");
}
</script>
<!-- 标签设置页 -->
