<%@ page language="java"  pageEncoding="gb2312"%>
<input class="button_buttonBar ref" type="button" id="newDocmentButton" value="ÐÂÔö" onclick="dbViewForm.newDocument();"/>
<input class="button_buttonBar ref" type="button" id="editDocmentButton" value="±à¼­" onclick="dbViewForm.openDocument();"/>
<input class="button_buttonBar ref" type="button" id="deleteDocmentButton" value="É¾³ý" onclick="dbViewForm.deleteForm();"/>
<input class="button_buttonBar ref" type=button value="Ë¢ÐÂ" onclick="initDBView(null,dbViewForm.viewUnid,'<%=params %>',dbViewForm.isEdit,dbViewForm.formUnid)"/>

<script>
	if(dbViewForm.isEdit == false){
		Ext.getDom("newDocmentButton").style.display="none";
		Ext.getDom("editDocmentButton").style.display="none";
		Ext.getDom("deleteDocmentButton").style.display="none";
	}

</script>