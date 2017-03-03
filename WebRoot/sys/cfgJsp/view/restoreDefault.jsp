<%@page contentType="text/html;charset=UTF-8"%>
<body>
<script language="javascript">
	function checkAll(){
		var restoreTypes = document.getElementsByName("restoreType");
		var restoreAll = document.getElementById("restoreTypeAll");
		for(var i=0;i<restoreTypes.length;i++){
			restoreTypes[i].checked = restoreAll.checked;
		}
	}
</script>
<div id="rdDialogHtml">

<table border="1" align="center" cellpadding="0" cellspacing="0" class="tableSet">
  <tr>
    <td>
       <ul>
       		<li><input type="checkbox" name="restoreType" value="all" id="restoreTypeAll" onClick="checkAll();"/>全部
       		<li>&nbsp;
       		<li><input type="checkbox" name="restoreType" id="restoreType" value="01"/>视图基本信息
       		<li>&nbsp;
       		<li><input type="checkbox" name="restoreType" id="restoreType" value="02"/>视图列
       		<li>&nbsp;
       		<li><input type="checkbox" name="restoreType" id="restoreType" value="03"/>视图排序
       		<li>&nbsp;
       		<li><input type="checkbox" name="restoreType" id="restoreType" value="04"/>简单查询
       		<li>&nbsp;
       		<li><input type="checkbox" name="restoreType" id="restoreType" value="05"/>高级查询
       		<li>&nbsp;
       		<li><input type="checkbox" name="restoreType" id="restoreType" value="06"/>视图分类
       		<li>&nbsp;
       </ul>
    </td>
  </tr>
</table>
</div>
</body>