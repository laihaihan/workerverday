<%@page contentType="text/html;charset=UTF-8"%>
<%
String funid = request.getParameter("funid");
String belongToAppId = request.getParameter("belongToAppId");
String unid = request.getParameter("unid");
if(null==funid)funid="";
if(null==belongToAppId)belongToAppId="";
if(null==unid)unid = "";
%>

<body>
<script type="text/javascript">
	Ext.onReady(function(){
	    var unid = "<%=unid%>";
	    if(null==unid || ""==unid){
	    	var funid="<%=funid%>";
			var belongToAppId="<%=belongToAppId%>";
			//分级管理新建模块时的所属系统UNID modify by zh 2010-6-9
			Ext.getDom("type").value="01";
			Ext.getDom("sourceType").value="02";
			Ext.getDom("funid").value=funid ;
			Ext.getDom("belongApp").value=belongToAppId ;
			Ext.getDom("edit").value="1";
	    }else{
	    	var url = ucapSession.baseAction+"?";
			url += "type=managerAction&act=getModule&unid="+unid+"&rand="+Math.random();
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			conn.open("GET", url, false);
			conn.send(null);
			var jsonObject = Ext.decode(conn.responseText);
			var exResult=ucapCommonFun.dealException(jsonObject);
			if(!exResult)return;
			var field=["unid","funid","edit","type","belongApp"
			,"sourceType","name","nameEn","sort","picture"];
			var value = [jsonObject.unid,jsonObject.funid,jsonObject.edit,jsonObject.type,
			jsonObject.belongApp,jsonObject.sourceType,jsonObject.name,jsonObject.nameEn,jsonObject.sort,jsonObject.picture];
			var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
			ucapCommonFun.bindForm(jsonValue,false,"",1);
	    }

	});
</script>
<div id="dialogHtml">
<span style="display:none">
<input type="text" class="inputbox" id="unid" name="unid"/>
<input type="text" class="inputbox" id="funid" name="funid"/>
<input type="text" class="inputbox" id="edit" name="edit" />
<input type="text" class="inputbox" id="type" name="type" />
<input type="text" class="inputbox" id="belongApp" name="belongApp" />
<input type="text" class="inputbox" id="sourceType" name="sourceType" sourceType="01" />
</span>
<table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet">
  <col width="120"/>
  <col width="160"/>
  <col width="120"/>
  <col width="160"/>
 	<tr>
		<th>名称:</th>
		<td><input type="text" class="inputbox" id="name" name="name"/></td>
		<th>英文名称:</th>
		<td><input type="text" class="inputbox" id="nameEn" name="nameEn"/></td>
	</tr>
	<tr>
		<th>排序号:</th>
		<td><input type="text" class="inputbox" id="sort" name="sort"/></td>
        <th>前置图标:</th>
		<td><input type="text" class="inputbox" id="picture" name="picture"/></td>
	</tr>
</table>
</div>
</body>
