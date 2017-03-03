<%@page contentType="text/html;charset=UTF-8"%>
<%
	String unid=request.getParameter("unid");
 %>
<body>
<div id="deptEditHtml">
<table class="tableSet" >
	  <tr>
	    <th width="18%">部门名称</th>
	    <td width="36%"><input type="text" class="inputbox" name="name" id="name"  /></td>
	    <th width="18%">部门别名</th>
	    <td ><input type="text" class="inputbox" name="alias" id="alias"  /></td>
	   </tr>
	  <tr>
	   
           <th>是否业务部门</th>
         <td>
           <input name="isBusiness" type="radio" id="isBusiness" value="1"/>
         是
          <input name="isBusiness" type="radio" id="isBusiness" value="0" checked/> 
          否
          </td>
           <th>是否启用：</th>
         <td>
           <input name="isEnabled" type="radio" id="isEnabled" value="1" checked/>
         是
          <input name="isEnabled" type="radio" id="isEnabled" value="0"/> 
          否
          </td>
      </tr>
	 
<!--   <tr>
    <th>部门编号：</th>
	  <td colspan="3"><input id="serialNumber" name="serialNumber" type="text" class="inputbox" disabled  /></td>
  </tr> -->
	   <tr>
	   	<th>上级部门</th>
	    <td colspan="3" >
	    <span style="display:none;">
	     <input type="text" class="inputbox" name="belongto"  id="belongto" />
	    </span>
	      <input type="text" class="inputred" name="belongto_Cn_" id="belongto_Cn_" readOnly  />
	       <input type="button" name="btnselect" value="选" onclick="selectDataSD('201',1,'belongto')"/>
	   </tr>
	  <tr>
	    <th>部门领导</th>
	    <td colspan="3" >
	    	 <input type="text" class="inputbox" name="leaders" id="leaders" 
	    	  nameEn="leaders" source="200" sourceType="20"
	    	  />
	
	    </td>
	  </tr>
	  <tr>
	    <th>部门管理员</th>
	    <td colspan="3" ><input type="text" class="inputbox" name="admins" id="admins" 
	     nameEn="admins" source="200" sourceType="20"
	    />
	   </td>
	  </tr>
	  <tr>
	    <th>隶属部门</th>
	    <td colspan="3" ><input type="text" class="inputbox" name="underdept" id="underdept" 
	     nameEn="underdept" source="201" sourceType="20"/>
	   </td>
	  </tr>
	 </table>
</div>
<script type="text/javascript">
	Ext.onReady(function(){		
		var unid="<%=unid%>";
		//alert(unid);
		if (unid!=""){
			ucapUmcDept.setValue(unid);
		} else {
			var node = ucapUmcDept.getSelectNode();
			if (node.id !=ucapUmcDept.newRootId){		
				Ext.getDom("belongto").value = node.id;
				Ext.getDom("belongto_Cn_").value = node.text;				
			}
		}
		_UcapForm.tool.embellishForm("deptEditHtml");
	//		Ext.getDom("source_Cn_").value = viewName;
	});	 

</script>
</body>