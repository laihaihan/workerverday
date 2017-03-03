<%@page contentType="text/html;charset=UTF-8"%>
<% 
	response.setHeader("Cache-Control","no-store"); 
	response.setHeader("Pragrma","no-cache"); 
	response.setDateHeader("Expires",0); 
%>

<body>
<div id="dialogHtml">
	<table border="0" cellpadding="0" cellspacing="0" align="center" class="styleBox">
	  <tr id="appListid">
	    <td height="30">应用系统选择：<br><select id="appList" name="appList">
			</select>
	    </td>
	  </tr>
	  <tr>
	    <td class="styleMainBox">
	    	<ul>
	    		<div id="radioHtml"></div>
	         </ul>
	    </td>
	  </tr>
	  <tr>
	    <td height="20"><input type="checkbox" name="defaultOption" id="defaultOption" value="1"/>
	      <span id="defaultText">下次登录不再弹出该页面</span></td>
	  </tr>
	</table>
</div>

<script type="text/javascript">
	Ext.onReady(function(){
		var type = loginType;
		if(typeof(type)=="undefined") type ="";
		var json = ucapSession.loginAppJson;
		if ( type!="login"){
			//说明是进入系统后的切换系统
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			var url = ucapSession.baseAction+"?type=getAppAndStyle"+"&"+
				ucapCommonFun.getRandomString();
			conn.open("GET",url,false);
			conn.send(null);			
			json = Ext.decode(conn.responseText);
			Ext.getDom("defaultText").innerText = "保存为默认";
			window.parent.ucapSession.loginAppJson = json;	
			//alert(Ext.encode(json));
		};
		if (type=="style"){
			Ext.getDom("appListid").style.display="none";
		} else {		
			var oSel = Ext.getDom("appList");
			for (i = 0; i < json.appList.length; i++ ){
				ucapCommonFun.addOption(oSel,i,json.appList[i].displayName);
				if (json.appList[i].unid!="" && json.appList[i].unid==json.lastApp){
					oSel.selectedIndex = i;
				}
			};
			if (oSel.selectedIndex==-1) oSel.selectedIndex = 0;	
		};
	//	alert(json.lastStyle);
		var html="";
		var ck;
		var flag = true;
		for (i = 0; i < json.styleList.length; i++ ){
			if (json.styleList[i].unid!="" && json.styleList[i].unid==json.lastStyle){
				ck=" checked";
				flag = false;
			} else 
			    ck="";			    
			html +='<li><img  onclick="setRadio('+i+')"  title="'+json.styleList[i].description+'" src="'+
					ucapSession.appPath+json.styleList[i].picture+'" /><br/>';
			html +='<input type="radio" id="appStyle" name="appStyle" '+'value="'+i+'" '+ck+' />';
			html += '<a href="javascript:void(0)" onclick="setRadio('+i+')" >'+json.styleList[i].name+'</a>';
			html +='</li>';
		}
		Ext.getDom("radioHtml").innerHTML = html;
		//如果没有默认风格，设置一个默认风格
		if (flag){
			setRadio(0);		
		}
		
		//2012-03-27 mdy by fshaoming@linewell.com
		//启用确定按钮 
		if(Ext.getCmp("changeSystemBtn"))Ext.getCmp("changeSystemBtn").setDisabled(false);
	});
	function getFormJSon(){
		return ucapCommonFun.getFormJSon("dialogHtml");
	}
 	function setRadio(v){ 	
 		var field =["appStyle"];
		var value = new Array();
		value[0]=  v;
		var jsonValue = "{"+ucapCommonFun.getJsonValue(field,value)+"}";
		ucapCommonFun.bindForm(jsonValue);	
	}	
</script>
</body>