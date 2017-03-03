/**
 * 快捷方式js
 */
var demoShortcut={
	load:function(){
		this.init();
	},
	init:function(){
		//获取频道
		var json = Ext.decode($("demo_div").innerHTML);
		if(!json || !json.channels){
			alert("请先单击频道，加载频道数据");
			return;
		}
		
		//获取频道中的快捷方式信息
		var channelsJson = json.channels;
		var shortcutJson = null;
		for(var i=0;i<channelsJson.length;i++){
			var itemsJson = channelsJson[i].items;
			if(itemsJson){
				for(var j=0;j<itemsJson.length;j++){
					//快捷方式style为08
					if(itemsJson[j].style == "08"){
						shortcutJson=itemsJson[j];
					}
				}
			}
		}
		
		//到数据库获取快捷方式
		if(!shortcutJson){
			alert("频道中没有快捷方式");
		}
		else{
			var shortActionParams = {"type":"portal","act":"getPortletValue",portletDisUnid:shortcutJson.id,"random":ucapCommonFun.getRandomString()};
			
			var requestConfig = {
				url:ucapSession.baseAction,
				params:shortActionParams,
				callback:function(options,success,response){
					if(success){
						
						var exjson = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(exjson);
						if(!exResult){
							return;
						}
						if (response.responseText==""){
							$("demo_div").innerHTML ="快捷方式没有内容";		
							return;
						}
						
						$("demo_div").innerHTML = response.responseText;
					}
				}
			}
			Ext.Ajax.request(requestConfig);
		}
	},
	/**
	 * 自定义快捷方式渲染
	 * @param {} paraChannel 频道参数
	 * @return {String}	渲染完成后的HTML代码
	 */
	myShortcut:function(paraChannel){
		var buttons = paraChannel.content;	//获取所有快捷方式
		var htmlStr = "";					//保存快捷方式HTML
		for(var i=0;i<buttons.length;i++){
			htmlStr += '<img src="'+ ucapSession.appPath + buttons[i].picturePath + '" />';	//添加图片
			htmlStr += '<font face="楷体_GB2312" size=5><a href="javascript:void(0)"'+' onclick="' + buttons[i].content + '">' + buttons[i].name + '</a></font><br/>'  //添加链接
		}
		return htmlStr;
	}
};