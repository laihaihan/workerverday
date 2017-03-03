<%@page contentType="text/html;charset=UTF-8"%>
  <%@include file="/sys/jsp/jspSession.jsp"%>
<body>
<script type="text/javascript">

	Ext.onReady(function(){
	
		var requestConfig = {
				url:ucapSession.baseAction,
				params : {					
					type :"peedingUser",
					act :"getUserMessage",
					userUnid:ucapSession.userJson.unid			
				},
				callback : function(options, success, response) {
					if (success) {
						var jsons = response.responseText;
						jsons=Ext.decode(jsons);
						var json = jsons[0];
						Ext.getDom("user_display_name").value=json.user_display_name;
						Ext.getDom("user_mail").value=json.user_mail;
						Ext.getDom("user_mobile").value=json.user_mobile;
						Ext.getDom("user_message_number").value=json.user_message_number;
						Ext.getDom("user_proxys").value=json.user_proxys;
						Ext.getDom("user_proxys_Cn_").value= ucapCommonFun.getDisplayNames("200",json.user_proxys,"");
						Ext.getDom("user_leaders").value= ucapCommonFun.getDisplayNames("200",json.user_leaders,"");
						Ext.getDom("depts").value= ucapCommonFun.getDisplayNames("201",json.user_depts,"");				
					} else {
						Ext.Msg.alert("提示信息", "后台逻辑处理出现错误！");
					}
				}
			}
		Ext.Ajax.request(requestConfig);
		
	});
</script>
<div id="modifyPersoanalHtml">

<table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet">
  <col width="120"/>
  <col width="160"/>
  <col width="120"/>
  <col width="160"/>
  <TR>
	<TH><SPAN class=red>*</SPAN> 用户名：</TH>
	<TD><INPUT id=user_display_name class="inputred" name=user_display_name readonly/> </TD>
	<TH>电子邮箱： </TH>
	<TD ><INPUT id=user_mail class=inputbox name=user_mail/> </TD>
  </TR>
  <TR>
	<TH><SPAN class=red>*</SPAN> 所属部门：</TH> 
	<TD><INPUT id=depts name=depts  class="inputred" readonly/>
	 </TD>
	<TH>直属上级： </TH>
	<TD ><INPUT id=user_leaders  class="inputred" readonly name=user_leaders /></TD>
  </TR>
	<TR>
	<TH>手机： </TH>
	<TD><INPUT id=user_mobile class=inputbox name=user_mobile/> </TD>
	<TH>即时通讯号码：</TH>
	<TD><INPUT id=user_message_number class=inputbox name=user_message_number/> </TD></TR>
  <tr>
    <th  align=right>日常代理人设置：</th>
    <td colspan="3">
    	<input type="hidden" class="inputbox" name="user_proxys" id="user_proxys" />
    	<input type=Text width=150 height=100  class="inputred" name="user_proxys_Cn_" id="user_proxys_Cn_" />
    	<input type="button" value="选" onclick="selectDataSD('200','1','user_proxys');" />
    </td>
  </tr>
</table>
</div>
</body>

