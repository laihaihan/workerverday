<%@page contentType="text/html;charset=UTF-8"%>
<%
	String unid=request.getParameter("unid");
 %>
<body>
<div id="columnsEditHtml">
<script type="text/javascript">
	Ext.onReady(function(){		
		var unid="<%=unid%>";
		if (unid!=""){
			ucapColumns.setValue(unid);
		} else {
			var node = ucapColumns.getSelectNode();
			if (node.id !=ucapColumns.newRootId){				
				Ext.getDom("funid").value = node.id;
				Ext.getDom("funid_Cn_").value = node.text;	
			}
		}
		//_UcapForm.tool.embellishForm("columnsEditHtml");
		//36380993267728D2563E49655E3A4D29
	});	 
</script>
<table class="tableSet"><COL width="25%">
<COL width="30%">
<COL width="15%">
<COL width="30%">
	<tr>
		<th>所属栏目:</th>
		<td colspan="3">
		 <span style="display:none;">
			<input type="text" class="inputbox" id="funid" name="funid"/>
			<input type="text" class="inputbox" id="unid" name="unid"/>
		</span>	
		  <input type="text" class="inputred" name="funid_Cn_"  />
		</td>	
	</tr>
	<tr>
		<th>栏目名称:</th>
		<td colspan="3"><input type="text" class="inputbox" id="name" name="name"/></td>
	</tr>
	<tr>
		<th>栏目类型:</th>
		<td><input type="radio" id="type" name="type" value="01"/>文章栏目
		<input type="radio" id="type" name="type" value="02"/>图片栏目</td>
		<th>是否可用:</th>
		<td ><input type="radio" id="useable" name="useable" value="true"/>是<input type="radio" id="useable" name="useable" value="false"/>否</td>
	</tr>
	
	<tr>
	    <th>栏目图片:</th>
		<td colspan="3"><input type="text" class="inputbox" id="imgpath" name="imgpath"/></td>
	</tr>
		<tr>
		<th>关联的栏目:</th>
		<td colspan="3"><input type="text" class="inputbox" id="connColumns" name="connColumns"/></td>
	</tr>
	<tr>
		<th>同时发布(复制)的栏目:</th>
		<td colspan="3"><input type="text" class="inputbox" id="copyColumns" name="copyColumns"/></td>
	</tr>
		<tr>
		<th>复制栏目后文章的状态:</th>
		<td><input type="text" class="inputbox" id="copyState" name="copyState"/></td>
		<th>RSS订阅条数:</th>
		<td><input type="text" class="inputbox" id="rssNum" name="rssNum"/></td>
	</tr>
	<tr>
		<th>链接地址:</th>
		<td colspan="3"><input type="text" class="inputbox" id="url" name="url"/></td>	
	</tr>
	<tr>
		<th>备注信息:</th>
		<td colspan="3"><input type="text" class="inputbox" id="remark" name="remark"/></td>	
	</tr>	
</table>
</div>

</body>