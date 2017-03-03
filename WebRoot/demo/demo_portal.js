var demoPortal = {
	load:function(){
		this.init();
	},
	init:function(){
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"portal","act":"getValue","random":ucapCommonFun.getRandomString()},
			callback:function(options,success,response){
				if (success){
					if ( response.responseText==""){
						Ext.Msg.alert("提示信息","无法获取频道相关信息，可能是没有配置！");
						Ext.getDom("portal_id").innerHTML="";
						Ext.getDom("portal_info").style.display="none";
						return;
					}
					
					var json = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					$("demo_div").innerHTML = Ext.encode(json);
					ucapPortal.channels = json.channels;
					ucapPortal.ucapPortalObj = json.portal;
					ucapPortal.createPortal("demo_portal_div",1200);
				} else {
					Ext.Msg.alert("提示信息","无法获取频道相关信息！");
					return;
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}
};