/**
 * yjy 2010-7-15
 * JS接口API
 */
var ucapApi={
	/**
	 * 同步获取首页频道的内容
	 */
	getAllChannels:function(){
		var url =ucapSession.baseAction;
		url+="?type=portal&act=getValue";
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);			
		var result = conn.responseText;
		if (result.indexOf("error")>-1){
			Ext.Msg.alert("提示信息","无法获取频道相关信息！");
			return;
		};
		var json = Ext.decode(result);
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		return json.channels;
	},
	/**
	 * 设置首页内容API
	 * @param {} callBackFun 回调函数 
	 *   回调函数 默认参数为 paraChannel 和i,j
	 */
	getPortal:function(callBackFun){
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"portal","act":"getValue"},
			callback:function(options,success,response){
					if (success){
						var json = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(json);
						if(!exResult)return;
						var channels =json.channels;
						for(var i=0;i<channels.length;i++){
							if (typeof(channels[i].items)=="undefined") continue;
							for(var j=0;j<channels[i].items.length;j++){
								ucapApi.setItemPortal(channels[i].items[j],callBackFun,i,j);
							}
						}
					} else {
						Ext.Msg.alert("提示信息","无法获取频道相关信息！");
						Ext.getDom("portal_id").innerHTML="";
						Ext.getDom("portal_info").style.display="none";
					}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 
	 * @param {} channelItem   框架中单个频道的对象
	 * @param {} callBackFun   回调函数 默认参数为 paraChannel和i,j paraChannel格式如下
		  var paraChannel={	
				id:"", //显示频道的ID
				html:"",//如果有值，说明不用去后台取值，可能是图片、URL等
				style:"", //频道样式01 列表 02 图文环绕 03图文并茂 04 FLASH 05 视频 06 音乐 07 图片 08快捷方式 09 URL 10表格方式
				embelish:"", //频道自定义函数
				content:[], //记录内容
				docImg:"",  //记录的前置图标
				imgNum:0,  //图片所在的列
				imgWidth:"80", //图片宽度
				imgHeight:"80", //图片的高度
				url:"",       //URL地址
				unidName:"id", //主键的名称
				rowNum:"",    //显示的记录个数
				roll:"",   //方向
				rollamount:"",//速度
				docType:9, //1 表示打开模块 2表示打开视图 3表示打开URL 9表示打开文档
				sourceType:"",//1 视图、2 RSS、3 JSON 4 URL 5快捷方式
				viewInfo:{},//来源是视图时，保存视图的相关信息
				column:9999//视图的列数
			}
	 * 
	 * @param {} divId 一般设置为要把此频道的值设置的div
	 * @param {} i  表示频道中的第i列
	 * @param {} j  表示第i列中的第j个
	 */
	setItemPortal:function(channelItem,callBackFun,i,j){
		ucapPortal.setItemPortal(channelItem,callBackFun,i,j);
	},
	getMenu:function(callBackFun){
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"menu",act:"getAllMenu"},
			callback:function(options,success,response){
				callBackFun.call(this,success,response.responseText);
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	getNavigation:function(callBackFun){
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"nav",act:"getNav"},
			callback:function(options,success,response){
				callBackFun.call(this,success,response.responseText);
			}
		}
		Ext.Ajax.request(requestConfig);
	}
}

	