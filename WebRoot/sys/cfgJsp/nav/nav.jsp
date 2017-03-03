<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.frame.util.GlobalUtils"%>
<%@page import="com.linewell.ucap.util.UcapRequest" %>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%
	UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
	String cut = ucapRequest.getParameter("cut");
	String cutCn="";
	if (cut!=null && !"".equals(cut)){
		
		cutCn= GlobalUtils.getShortCuts(ucapRequest).getDisplayName(cut);
		if ("".equals(cutCn)) cutCn = cut;
	}	
 %>
<body>
<script type="text/javascript">
	Ext.onReady(function(){	
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"nav",act:"getDefNav","random":ucapCommonFun.getRandomString()},
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);
					ucapCommonFun.setFormValue(json.navigation);	
					_UcapForm.tool.embellishForm("dialogNavHtml");	
					Ext.getDom("shortcutCondition_Cn_").value="<%=cutCn%>";						
				}else{
					Ext.MessageBox.alert("提示信息","无法获取相应的导航栏信息！");
				}
			}
		}	
		Ext.Ajax.request(requestConfig);
	});	
</script>

<div id="dialogNavHtml">
<span style="display:none">
	<input id="unid" name="unid" type="text"  />
	<input id="belongToDepts" name="belongToDepts" type="text" class="inputbox" />
	<input id="belongToApp" name="belongToApp" type="text" class="inputbox" />
	<input id="belongToUsers" name="belongToUsers" type="text" class="inputbox" />
	<input id="punid" name="punid" type="text" class="inputbox" />
</span>
<table border="0" class="tableSet" >
<COL width="25%">
<COL width="75%">

 <tr>
    <th> 导航栏名称：</th>
 	<td><input id="name" name="name" type="text" class="inputbox" /></td>
  </tr>
  <tr>
    <th> 欢迎信息：</th>
  <td><input id="message" name="message" type="text" class="inputbox" />
        </td>
  </tr>
  <tr>
    <th>欢迎信息位置：</th>
    <td><input name="messagePosition" id="messagePosition" type="radio" value="01" />
      左
      <input type="radio" name="messagePosition" id="messagePosition" value="03"/>
      右</td>
  </tr>
  <tr>
    <th>快捷方式：</th>
    <td><input type="text" id="shortcutCondition" name="shortcutCondition" class="inputbox" 
    	 nameEn="shortcutCondition" source="209" sourceType="20" isSingle="1"    
    />
    </td>
  </tr> 
</table>
</div>
</body>


	
