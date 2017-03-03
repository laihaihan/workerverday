/**
 * 菜单
 * @type 
 */
var demoMenu = {
	load:function(){
		this.init();
	},
	init:function(){
		//alert(ucapHeader.menuType);
		var menuActionParams={type:"menu",act:"getAllMenu",menuType:ucapHeader.menuType,
			"random":ucapCommonFun.getRandomString()};
			
		var requestConfig = {
			url:ucapSession.baseAction,
			params:menuActionParams,
			callback:function(options,success,response){
				
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					//alert(response.responseText);
					
					if (response.responseText==""){
						$("demo_div").innerHTML ="系统没有配置菜单";		
						return;
					}
					
					$("demo_div").innerHTML = response.responseText;
					
					var menuJson = Ext.decode(response.responseText);
					if(null==menuJson)return;
					
					//简单的菜单渲染
					$("demo_menu_div").innerHTML="<b>菜单：</b>";
					for(var i=0;i<menuJson.length;i++){
						$("demo_menu_div").innerHTML += " <a href=javascript:demoModule.load('"+menuJson[i].content+"')  >" + menuJson[i].text+"</a>";
					}
				}
				
			}
		}
		Ext.Ajax.request(requestConfig);
	}
};