/*
 * 门户配置的相关JS 处理方法
 * fshaoming@linewell.com
 * 
 */


var portalConfig={
	
	portallist:[],//所有门户对象列表
	jsonObj:null,
	/**
	 * 获取系统的门户列表
	 */
	initSelectPortal:function()
	{
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"portal","act":"getPortals","random":ucapCommonFun.getRandomString()},
			callback:function(options,success,response){
				if (success){
					if ( response.responseText==""){
						Ext.Msg.alert("提示信息","无法获取门户相关信息！");
						return;
					}
					if ( response.responseText=="nochange"){
						Ext.Msg.alert("提示信息","没权限!");
						return;
					}
					var json = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					this.portallist =json.portals;
					//jsonObj=json;
					var portalIds = Ext.getDom("portalIds");
					portalIds.options.length = 0;
					for(var i=0;i<this.portallist.length;i++)
					{
						ucapCommonFun.addOption(portalIds,this.portallist[i].unid,this.portallist[i].name==""?"无定义":this.portallist[i].name+"");
					}
					Ext.getDom("portalIds").selectedIndex=0;
					portalConfig.changeSelectPortal();
					
				} else {
					Ext.Msg.alert("提示信息","无法获取门户相关信息！");
					return;
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 选择保存门户后的操作
	 */
	selectPortalListConfirm : function() {
		var portalIds = Ext.getDom("portalIds");
		if(portalIds.value.trim()=="")
		{
			Ext.Msg.alert("提示信息","请选择门户！");
			return;
		}
		
		var json = ucapCommonFun.getFormJSon("dialogPortalHtml");
		if(json.useScopes==""){
			Ext.Msg.alert("提示信息","请配置可使用范围！");
			return;
		}
		var requestConfig = {
			url : ucapSession.baseAction,
			params : {
				"type" : "portal",
				 "act" : "savePortalsBaseInfo",//保存门户的基本信息
				 "random":ucapCommonFun.getRandomString()
			},
			jsonData : json,
			callback : function(option, success, response) {
				if (success) {
				var exjson = Ext.util.JSON.decode(response.responseText);
				var exResult = ucapCommonFun.dealException(exjson);
				
				var index=Ext.getDom("portalIds").selectedIndex;
				this.portallist[index]=json;
				Ext.getDom("portalIds").options[index].text=json.name; 
				if (!exResult)return;
				if(response.responseText=="true")
				{
					Ext.Msg.alert("提示", "应用到门户成功！");
				}
				
				} else {
					Ext.Msg.alert("提示", "应用到门户失败！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 门户选择改变时事件(双击)
	 * @param {} v
	 */
	changeSelectPortal:function()
	{
		var index = Ext.getDom("portalIds").selectedIndex;
		var value=Ext.getDom("portalIds").value;
		Ext.getDom("unid").value=value;
		var json=portallist[index];
		if(null!=json)
		{
			var field=["unid","name","useScopes","unuseScopes"];
			var value=[json.unid,json.name,json.useScopes,json.unuseScopes];
			var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
			ucapCommonFun.bindForm(jsonValue,false,"",1);
		}
		$("useScopes_Cn_").value = ucapCommonFun.getDisplayNames("203",$("useScopes").value,"20");
		$("unuseScopes_Cn_").value = ucapCommonFun.getDisplayNames("203",$("unuseScopes").value,"20");
		Ext.getDom("portal_id").innerHTML="";
		ucapPortal.init(value);//加载门户
	},
	/**
	 * 删除门户
	 */
	deletePoral:function()
	{
		var unid = Ext.getDom("portalIds").value;
		if(""==unid)
		{
			Ext.Msg.alert("提示信息","请选择要删除的门户！");
			return;
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"portal","act":"deletePortal","unid":unid,"random":ucapCommonFun.getRandomString()},
			callback:function(options,success,response){
				if (success){
					if ( response.responseText=="true"){
						var delIndex=Ext.getDom("portalIds").selectedIndex;
						Ext.getDom("portalIds").options.remove(delIndex);
						this.portallist.splice(delIndex,1);//删除
						
						Ext.getDom("portalIds").selectedIndex=portallist.length-1;
						//Ext.getDom("portalIds").options[portallist.length-1].selected = true;
						portalConfig.changeSelectPortal();
						
						Ext.Msg.alert("提示信息","删除门户成功！");
					}
					else
					{
						Ext.Msg.alert("提示信息","删除门户失败！");
					}
					return;
					
				} else {
					Ext.Msg.alert("提示信息","删除门户失败！");
					return;
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 新建门户
	 */
	newPortal:function()
	{
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"portal","act":"newPortal","random":ucapCommonFun.getRandomString()},
			callback:function(options,success,response){
				if (success){
					if ( response.responseText==""){
						Ext.Msg.alert("提示信息","无法新建门户！");
						return;
					}
					var json = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					ucapCommonFun.addOption(portalIds,json.unid,json.name);
					this.portallist.push(json);//添加数组
					Ext.getDom("portalIds").selectedIndex=portallist.length-1;
					//Ext.getDom("portalIds").options[portallist.length-1].selected = true;
					portalConfig.changeSelectPortal();
					
				} else {
					Ext.Msg.alert("提示信息","门户新建失败！");
					return;
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 复制门户
	 */
	copyPortal:function()
	{
		var unid = Ext.getDom("portalIds").value;
		if(""==unid)
		{
			Ext.Msg.alert("提示信息","请选择要复制的门户！");
			return;
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"portal","act":"copyPortal","unid":unid,"random":ucapCommonFun.getRandomString()},
			callback:function(options,success,response){
				if (success){
					 if ( response.responseText==""){
						Ext.Msg.alert("提示信息","无法复制门户！");
						return;
					}
					var json = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					ucapCommonFun.addOption(portalIds,json.unid,json.name);
					this.portallist.push(json);
					Ext.getDom("portalIds").selectedIndex=portallist.length-1;
					//Ext.getDom("portalIds").options[portallist.length-1].selected = true;
					portalConfig.changeSelectPortal();
				} else {
					Ext.Msg.alert("提示信息","门户复制失败！");
					return;
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}
	
}


  




