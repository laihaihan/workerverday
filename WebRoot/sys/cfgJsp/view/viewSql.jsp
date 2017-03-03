<%@page contentType="text/html;charset=UTF-8"%>

<body>
<script type="text/javascript">
	Ext.onReady(function(){
		_UcapViewFun.getSqlAndTime();
	});
</script>
<table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet2">
  <tr>
   <th width="17%">验证结果：</th>
   <td  width="83%"><input readonly id="result" size=40></input>
   </td>
  </tr>
   <tr>
   <th width="17%">sql语句为：</th>
   <td width="83%"> <textarea readonly style="width:100%;" rows="15" id="sql"></textarea>
   </td>
  </tr>
   
  </table>
   
 
</body>