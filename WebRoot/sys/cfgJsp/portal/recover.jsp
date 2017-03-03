<%@page contentType="text/html;charset=UTF-8"%>
<body>
<script type="text/javascript">
	function getFormJSon(){
		return ucapCommonFun.getFormJSon("dialogHtml");
	}
	function selectCheck(){
		var obj = document.getElementsByName("recover");
		var flag =Ext.getDom("selectAll").checked;
		for(var i=0;i<obj.length;i++){
			obj[i].checked  = flag;
		}		
	}
</script>

<div id="dialogHtml">
<table align="center" class="tableCustom" >
  <tr>
    <td> 请选择要恢复的选项<br><input type="checkbox" name="selectAll" id="selectAll" value ="1" onclick="selectCheck()"/>
      全部选中<br>
   </td>
  </tr>
  <tr>
    <td >
    	<ul>
            <li><input type="checkbox" name="recover" id="recover" value ="1"/>界面布局</li><%--
            <li><input type="checkbox" name="recover" id="recover" value ="2"/>菜单</li>
            <li><input type="checkbox" name="recover" id="recover" value ="3"/>导航栏</li>
            --%><li><input type="checkbox" name="recover" id="recover" value ="4"/>界面方案</li>         
    	</ul>
    </td>
  </tr>
</table>
</div>
</body>

	
