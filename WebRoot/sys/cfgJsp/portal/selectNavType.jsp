<%@page contentType="text/html;charset=UTF-8"%>
<body>
<script type="text/javascript">
	Ext.onReady(function(){		
		var field=["navigationType"];
		var value=[ucapMenu.navigationType];
		var	jsonValue = "{"+ucapCommonFun.getJsonValue(field,value)+"}";
		ucapCommonFun.bindForm(jsonValue);
	});
</script>

<div id="dialogHtml">
	<table border="0" align="center">
		<tr>
			<td ><br>
				请选择导航栏的样式
				<br>
			<select name="navigationType"  id="navigationType">
		    	<option value="1">在右上角</option>
		    	<option value="2">中间居左</option>
		    	<option value="3">中间居中</option>
		    	<option value="4">中间居右</option>
	   		</select>
		</td>
		</tr>		
</table>
</div>
</body>


	
