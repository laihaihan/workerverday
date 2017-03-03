/*
function getPortalInfo(){
	//type=unitaryPortalAction
	//act=getPortalInfo
	var $ = jQuery;
	$.ajax({
	   type: "POST",
	   async : true,
	   url: sSystemPath+"BaseAction.action",
	   data: "type=unitaryPortalAction&act=getPortalInfo",
	   dataType: "xml",
	   success: function(data){
	     $(data).find("PortalInfo>page>width").each(function(){
	     	alert($(this).text());
	     });
	   }
	});
}
*/
/**
 * 门户组件
 */
(function($){
	//门户容器
	var portal = $('<div class="portalArea" style="margin: 0;padding: 0;"></div>');
	
	var defaultConfig = {
	};
	/**
	 * 初始化门户
	 */
	function init(target, param){
		//渲染门户组件
		$(target).append(portal);
		/**
		 * 初始化门户宽高（放在页签渲染前，防止滚动条提前出现）
		 */
		var portalWidth = $(param).find("PortalInfo>page>width").text();
	    var portalHeight = $(param).find("PortalInfo>page>height").text()-100;
	    //alert(portalHeight);
	    //是否自适应宽度
		var isAutoAdaption = $(param).find("PortalInfo>page>isAutoAdaption").text();
		portal.data("isAutoAdaption",isAutoAdaption);
		if(isAutoAdaption=="1"){
			var bodyWidth = $(document).width();
			var headerBox = $("#headerBox").height();
			var topLine = $("#topLine").height();
			var footer = $("#footer").height();
			if(parseInt(portalHeight)>($(document).height()-headerBox-topLine-footer)){
				//16为滚动条宽度，目前还未找到计算滚动条宽度的办法
				portal.data("perWidth",(parseInt(bodyWidth)-16)/parseInt(portalWidth));
			}else{
				portal.data("perWidth",(parseInt(bodyWidth))/parseInt(portalWidth));
			}
			portalWidth = bodyWidth;
		}
		syncSize(target, {width:portalWidth,height:portalHeight});
		//设置门户信息对象到门户组件对象
		$(target).data("portal",portal);
		/**
		 * 渲染频道页签
		 */
		$(param).find("PortalInfo>channels>channelInfo").each(function(){
	     	//根据param中的频道数组渲染频道
			addUcapChannel($(target),$(this));
	     });
		//portal.css("overflow","auto");
	}
	
	/**
	 * 调整高度、宽度
	 */
	function syncSize(target, param){
		var portalWidth = param.width||portal.data("portalWidth");//门户宽度
		var portalHeight = param.height||portal.data("portalHeight");//门户高度
		//alert(portalHeight);
		$(target).css("width",portalWidth);
		$(target).css("height",portalHeight);
		portal.data("portalWidth",portalWidth);
		portal.data("portalHeight",portalHeight);
	}
	
	/**
	 * 增加一个频道
	 */
	function addUcapChannel(target, param){
		//创建频道
		var channel = $('<div class="channelArea" style="position: absolute;"></div>');
		//将门户组件对象设置到频道对象中
		channel.data("ucapPortal",target);
		//将频道放到门户容器中
		portal.append(channel);
		channel.ucapChannel("init",param);
		
	}
	
	/**
	 * Ucap平台首页门户居中，非平台请勿调用此方法！
	 */
	function syncCenter(target, param){
		//自适应时不居中
		if(portal.data("isAutoAdaption")=="1"){
			return;
		}
		//设置门户容器宽度为全屏宽度
		$(target).css("width","100%");
		var portalWidth = portal.data("portalWidth");
		portal.css("position","absolute");
		if(portalWidth!="" && portalWidth!="100%"){
			portal.css("left","50%");
			portal.css("margin-left",-portalWidth/2);
			//syncSize($(target), {width:portalWidth+20})
		}
		//else{
		//	$(target).css("margin-left",-parseInt($(document.body).css("width"))/2);
		//}
		
	}
	/**
	 * 门户组件接口函数
	 */
	$.fn.ucapPortal = function(options, param){
		param = param || {};
		if (typeof options == 'string'){
			switch(options){
			case 'init':
				return this.each(function(){
					init(this, param);
				});
			case 'addUcapChannel':
				return this.each(function(){
					addUcapChannel(this, param);
				});
			case 'syncSize':
				return this.each(function(){
					syncSize(this, param);
				});
			case 'syncCenter':
				return this.each(function(){
					syncCenter(this, param);
				});
			}
		}
		return this;
	};
})(jQuery);
   

/**
 * 频道组件
 */
(function($){
	var channel;//频道对象
	
	/**
	 * 设置频道全局数据缓存
	 * @param key 全局Key
	 * @param value 全局Value
	 */
	function _setData(key,value){
		channel.data(key,value);
	}
	
	/**
	 * 获取频道全局数据缓存
	 * @param key 全局Key
	 */
	function _getData(key){
		return channel.data(key);
	}
	
	var defaultConfig = {
		width:500,
		height:300
	};
	/**
	 * 初始化频道
	 */
	function init(target, param){
		if(param){
			//设置频道宽高
			var width = $(param).children("width").text();
			var portal = channel.data("ucapPortal").data("portal");
			//自适应
			if(portal && portal.data("isAutoAdaption")=="1"){
				width = parseInt(portal.data("perWidth")*parseInt(width));
			}
			var height = $(param).children("height").text();
			_setData("width",width);
			_setData("height",height);
			
			var portlet = $(param).children("portlet");
			var portletDisplay = $(param).children("portletDisplay");
			//频道内容的HTML
			var html = "";
			var embellish = portlet.children("embellish").text();
			if(null!=embellish && ""!=embellish){
				//设置坐标
				_setXY(target,param);
				//设置宽高
				$(target).css("width",width);
				$(target).css("height",height);
				try{
					embellish = embellish.replace(/(\(.*\)[;]?)$/,'');//过滤掉函数(参数)
					var fn = function(){return eval(embellish+".call($(target),$(param))")};
					html = fn();
					//getExtGrid(target);
					if(typeof(html)=="string" && ""!=html){
						var content = $(target).append(html);
						return content;
					}
				}catch(e){
					html = "<div>频道渲染事件配置错误！"+e.message+"</div>";
					return $(target).append(html);
				}
				return $(target);
			}
			//设置全局变量：是否有标题
			_setData("isShowTitle",portletDisplay.children("isShowTitle").text());
			//设置全局变量：是否有边框
			_setData("isShowBorder",portletDisplay.children("isShowBorder").text());
			
			//设置坐标
			_setXY(target,param);
			
			var panel = $('<div class="channel" style="width:480px;height:290px;"></div>');
			
			//将频道渲染到频道容器
			$(target).append(panel);
			
			//渲染频道边框
			panel.append($('<b class="b1" style="width:472px;"></b>\
				<b class="b2" style="width:476px;"></b>\
				<b class="b3" style="width:478px;"></b>\
				<b class="b4" style="width:480px;"></b>\
				<b class="b5" style="width:480px;"></b>\
				<b class="b6" style="width:478px;"></b>'));
			//渲染频道标题、频道图标
			var titlePicture = portletDisplay.children("titlePicture").text();
			var channelName = portletDisplay.children("channelName").text();
			var channelTitleDiv = $('<div class="channelTitle ">\
				<img src=""><span>'+channelName+'</span>\
			</div>').appendTo(panel);
			if(!titlePicture){
				channelTitleDiv.children("img").css("display","none");
			}else{
				channelTitleDiv.children("img").attr("src",appPath+titlePicture);
			}
			//渲染频道工具栏
			//渲染频道内容容器
			var channelContent = $('<div class="channelContentBorder" style="width:100%; height:261px;overflow:hidden">\
				</div>');
			
			panel.append(channelContent);
			
			var content = $('<div class="channelContent" style="width:100%; height:100%;">\
				</div>').appendTo(channelContent);
			
			
			syncSize($(target),width,height);
			
			var isShowBorder = _getData("isShowBorder");
			if("0"==isShowBorder){
				//加载无边框样式（注：无边框时会同时无标题）
				panel.addClass("noBorder");
			}else{
				var isShowTitle = _getData("isShowTitle");
				if("0"==isShowTitle){
					//加载无标题样式
					panel.addClass("noTitle");
				}
			}
			
			html = setContent(content, portlet, portletDisplay);
			if(typeof(html)=="string" && ""!=html){
				//加载频道HTML内容
				$(target).append(html);
			}
			return $(target);
		}
	}
	
	/**
	 * 设置目标对象坐标
	 */
	function _setXY(target,param){
		var left = $(param).children("x").text();
		var portal = channel.data("ucapPortal").data("portal");
		//自适应
		if(portal && portal.data("isAutoAdaption")=="1"){
			left = parseInt(portal.data("perWidth")*parseInt(left));
		}
		//设置坐标
		var top = $(param).children("y").text();
		$(target).css("top",top);
		$(target).css("left",left);
	}
	
	/**
	 * 设置目标对象坐标
	 */
	function setXY(target,x,y){
		$(target).css("top",y);
		$(target).css("left",x);
	}
		
	/**
	 * 获取滚动效果的HTML
	 * @param html 滚动的HTML内容
	 * @param paraChannel 滚动的参数{rollType:"up",rollSpeed:"100"}
	 */
	function getMarqueeHTML(html,paraChannel){
		var result ='<marquee behavior="scroll" direction="'+(paraChannel.rollType||"up")+'" scrollamount="'
			+paraChannel.rollSpeed+'"'+'" onmouseover="this.stop()" onmouseout="this.start()">' + html + '</marquee>';
		return result;
	}
	/**
	 * 表格WebService展示
	 */
	function loadWebServiceExtGridData(target,paraChannel){
		/**
		 * 回调函数
		 */
		var callBack = function(data){
			var recordList = [];
			var openJs = $(data).find("doc>info>click").text()||1;
			var i=0;
			var fields = [],myData = [],columns=[];
			$(data).find("doc>items>item").each(function(){
				if(i==0){
					//渲染表格标题
					var pk = 0;
					$(this).children().each(function(i){
						if(pk==0){
							columns[columns.length] = {id:this.tagName,header:$(this).text(),sortable: true, dataIndex: this.tagName};
						}else{
							columns[columns.length] = {header:$(this).text(),sortable: true, dataIndex: this.tagName};
						}
						fields[fields.length]={name:this.tagName};
						pk++;
					});
				}else{
					//渲染表格数据区
					var row = [];
					$(this).children().each(function(i){
						row[row.length]=$(this).text();
					});
					myData[myData.length] = row;
				}
				i++;
			});
			_getExtGrid(target,fields,columns,myData);
		};
		var url = paraChannel.source;
		url = $("<div>"+url+"</div>").text();
		var param = _parserUrl(url)||{};
		var method = param["op"];
		_ajaxWebService(url,method,param,callBack);
		
	}
	/**
	 * 表格列表
	 */
	function _getExtGrid(target,fields,columns,myData,clickEvent){
		var store = new Ext.data.SimpleStore({
	        fields: fields
	    });
    	store.loadData(myData);
	    var grid = new Ext.grid.GridPanel({
	        store: store,
	        columns: columns,
	        height:parseInt(_getData("height")),
	        width:parseInt(_getData("width"))-2,
	        title:""
	    });
	    //渲染到目标DIV中
	    grid.render(target);
	    /**
	     * 单击事件
	     */
	    if(null!=clickEvent && typeof(clickEvent)=="string" && ""!=clickEvent){
	    	grid.on("click",function(){
		    	var selectedRow = grid.getSelectionModel().getSelections();
		    	if(selectedRow.length==1){
		    		var id = selectedRow[0].data[grid.getColumnModel().getDataIndex(0)];
		    		var obj = this;
		    		clickEvent = clickEvent.replace(/(\(.*\)[;]?)$/,'');//过滤掉函数(参数)
					var fn = function(){return eval(clickEvent+".call(obj,id)")};
					fn();
		    	}
		    });
	    }//end if(null!=clickEvent && typeof(clickEvent)=="string" && ""!=clickEvent){
	}
	/**
	 * JS通过平台的action访问WebService
	 */
	function _ajaxWebService(url,method,param,callBack){
		$.ajax({
			type: "POST",
			async : true,
			contentType: "application/json", 
			url: appPath+"BaseAction.action?type=WebServiceAction",
			data: $.toJSON({url:url,method:method,param:param}),
			processData:false,
			dataType: "xml",
			success: function(data){
				callBack(data);
			}
		});
	}
	
	/**
	 * 符合平台WebService数据格式的列表渲染
	 */
	function loadWebServiceData(target,paraChannel){
		var callBack = function(data){
			var recordList = [];
			var openJs = $(data).find("doc>info>click").text()||1;
			$(data).find("doc>items>item").each(function(){
				var row = {};
				$(this).children().each(function(i){
					row[this.tagName]=$(this).text();
				});
				recordList[recordList.length]=row;
			});
			_loadCallBack(target,paraChannel,{recordList:recordList,viewInfo:{openJs:openJs}})
		};
		var url = paraChannel.source;
		url = $("<div>"+url+"</div>").text();
		var param = _parserUrl(url)||{};
		var method = param["op"];
		_ajaxWebService(url,method,param,callBack);
		
//		var url = "http://webservice.webxml.com.cn/WebServices/WeatherWS.asmx?wsdl";
//		var method = "getWeather";
//		var param = {};
//		param = {theCityCode:"0591",theUserID:""};
	}
	
	/**
	 * 渲染列表样式的渲染逻辑
	 */
	function _loadCallBack(target,paraChannel,data){
		var paraChannelTpl={
			id:"", //显示频道的ID
			html:"",//如果有值，说明不用去后台取值，可能是图片、URL等
			style:paraChannel.style||"01", //频道样式01 列表 02 图文环绕 03图文并茂 04 FLASH 05 视频 06 音乐 07 图片 08快捷方式 09 URL 10表格方式 11多页签
			embelish:"", //频道自定义函数
			content:data.recordList, //记录内容
			docImg:"",  //记录的前置图标
			imgNum:0,  //图片所在的列
			imgWidth:"80", //图片宽度
			imgHeight:"80", //图片的高度
			url:"",       //URL地址
			unidName:"id", //主键的名称
			rowNum:"",    //显示的记录个数
			//roll:"",   //方向
			//rollamount:"",//速度
			docType:9, //1 表示打开模块 2表示打开视图 3表示打开URL 9表示打开文档
			sourceType:"",//1 视图、2 RSS、3 JSON 4 URL 5快捷方式
			viewInfo:data.viewInfo||{},//来源是视图时，保存视图的相关信息
			divId:"",//当前频道对应的DivId yjy 2011-3-25 add
			column:'9999'//视图的列数
		};
	 	if (paraChannel.sourceType == "05"){
	 		//快捷方式
			paraChannelTpl.content = data.shortCutList;
		} else if(paraChannel.sourceType=="02"){	
			//RSS		
			paraChannelTpl.docType = 3;
			paraChannelTpl.content = data.rssItems;
		}
		$.extend(paraChannelTpl, paraChannel);
		//获取主键名称
		if(paraChannelTpl.content){
			for(var t in paraChannelTpl.content[0]) {
	    		paraChannelTpl.unidName = t;
	    		break;
			}
		}
		if(!paraChannel.column)paraChannel.column = 99999;
		var html = "";
		switch(paraChannel.style){
			case "01":
				html = ucapChannel.html.getClomnHtml(paraChannelTpl);
				break;
			case "02":
				html = ucapChannel.html.getGraphicHtml(paraChannelTpl);
				break;
			case "03":
				html = ucapChannel.html.getIllustrationsHtml(paraChannelTpl);
				break;
			case "08":
				html = ucapChannel.html.getShortcutsHtml(paraChannelTpl);
				break;
		}
		//判断是否有滚动效果
		if(paraChannel.roll!="false"){
			$(target).append(getMarqueeHTML(html,paraChannelTpl));
		}else{
			$(target).append(html);
		}
	}
	
	/**
	 * 获取列表的数据内容
	 * @param target
	 * @param paraChannel
	 */
	function loadData(target,paraChannel){
		$.ajax({
			type: "POST",
			async : true,
			url: appPath+"BaseAction.action",
			data: "type=portal&act=getPortletValue&portletDisUnid="+paraChannel.unid,
			dataType: "json",
			success: function(data){
				if(data){
					_loadCallBack(target,paraChannel,data)
				}
			}
		});
	}
	
	/**
	 * 修改频道宽度
	 */
	function syncSize(target, width, height){
		width = width||defaultConfig.width;
		height = height||defaultConfig.height;
		var bs = $(target).find("b");
		if(bs.length==6){
			$(bs[0]).css("width",width-8);
			$(bs[1]).css("width",width-4);
			$(bs[2]).css("width",width-2);
			$(bs[3]).css("width",width);
			$(bs[4]).css("width",width);
			$(bs[5]).css("width",width-2);
		}
		$(target).find(".channel").css("width",width);
		$(target).find(".channel").css("height",height);
		$(target).find(".channelContentBorder").css("width",width);
		if(_getData("isShowBorder")!="0"){
			if(_getData("isShowTitle")!="0"){
				//有边框有标题
				$(target).find(".channelContentBorder").css("height",height-29);
			}else{
				//有边框，无标题
				$(target).find(".channelContentBorder").css("height",height-5);
			}
		}else{
			//无边框有标题、无边框无标题
			$(target).find(".channelContentBorder").css("height",height);
		}
		
	}
	
	/**
	 * 
	 * @param target
	 * @param param
	 */
	function setHeader(target, param){
		
	}

	/**
	 * 
	 * @param content
	 * @param portlet
	 * @param portletDisplay
	 */
	function setContent(content, portlet,portletDisplay){
		//频道样式（01 列表 02 图文环绕 03图文并茂 04 FLASH 05 视频 06 音乐 07 图片 08快捷方式 09 URL 10表格方式 11多页签）
		var style = portlet.children("style").text();
		var sourceType = portlet.children("sourceType").text();
		var paraChannel = {};
		//滚动方向
		paraChannel.rollType = portletDisplay.children("rollType").text();
		//滚动速度
		paraChannel.rollSpeed = portletDisplay.children("rollSpeed").text();
		//是否有滚动
		paraChannel.roll = portletDisplay.children("roll").text();
		//设置打开方式
		var sourceType = portlet.children("sourceType").text();
		paraChannel.sourceType = sourceType;
		
		if (sourceType==1){		
			paraChannel.docType = 9;
		} else if(sourceType==2){			
			paraChannel.docType = 3;
		}
		var setParaChannel = function(){
			//设置频道样式
			paraChannel.style = style;
			//设置频道主键信息
			paraChannel.unid = portletDisplay.children("unid").text();
			//设置频道名称信息
			paraChannel.channelName = portletDisplay.children("channelName").text();
			//设置频道高度信息
			paraChannel.channelHeight = portletDisplay.children("channelHeight").text();
			//设置频道标题图片信息
			paraChannel.titlePicture = portletDisplay.children("titlePicture").text();
			//设置频道数据图片信息
			paraChannel.dataPicture = portletDisplay.children("dataPicture").text();
			//20120502 add by cxifu@linewell.com 设置频道数据显示列数以及数据显示的前置
			paraChannel.docImg = appPath+portletDisplay.children("dataPicture").text();
			paraChannel.column = portlet.children("column").text();
			
			//设置频道记录数信息
			paraChannel.rowNum = portletDisplay.children("rowNum").text();
			
		};
		//频道内容的HTML
		var html = "";
		switch(style){
			case "01":
				//列表
				setParaChannel();
				//必须设置为空，平台原代码不用执行此渲染函数。
				//paraChannel.embellish = portlet.children("embellish").text();
				if("01"==sourceType){
					loadData(content,paraChannel);
				}else if("07"==sourceType){
					
					//加载列表数据
					var source = portlet.children("source").text()||"";
					if(source && source.toLowerCase().indexOf("http://") == -1 
											&& source.toLowerCase().indexOf("https://") == -1){
						source = appPath + source;
					}
					paraChannel.source = source;
					//加载列表数据
					loadWebServiceData(content,paraChannel);
				}
				
				break;
			case "09":
				//URL方式
				var url = portlet.children("source").text()||"";
				if(url.toLowerCase().indexOf("http://")==-1 && url.toLowerCase().indexOf("https://")==-1){
					url = ucapSession.appPath + url;
				}
				var ifr = $('<iframe isPortal=true frameborder="0" src=""></iframe>').appendTo(content);
				ifr.attr("src",url);
				break;
			case "10":
				//表格方式(视图view)
				if("07"==sourceType){
					var source = portlet.children("source").text()||"";
					if(source && source.toLowerCase().indexOf("http://") == -1 
											&& source.toLowerCase().indexOf("https://") == -1){
						source = appPath + source;
					}
					paraChannel.source = source;
					loadWebServiceExtGridData($(content).get(0),paraChannel);
				}else{
					var url = getViewIframeSrc(portlet.children("source").text());
					var ifr = $('<iframe isPortal=true frameborder="0" src=""></iframe>').appendTo(content);
					ifr.attr("src",url);
				}
				break;
			case "02":
				//图文环绕
				setParaChannel();
				loadData(content,paraChannel);
				break;
			case "03":
				//图文并茂
				setParaChannel();
				loadData(content,paraChannel);
				break;
			case "08":
				//快捷方式
				setParaChannel();
				loadData(content,paraChannel);
				break;
			case "04"://Flash
				paraChannel.url = portlet.children("source").text();
				$(content).append(ucapChannel.html.getFlashHtml(paraChannel));
				break;
			case "05"://视频
				paraChannel.url = portlet.children("source").text();
				$(content).append(ucapChannel.html.getVideoHtml(paraChannel));
				break;
			case "06"://音乐
				paraChannel.url = portlet.children("source").text();
				$(content).append(ucapChannel.html.getMusicHtml(paraChannel));
				break;
			case "07"://图片
				paraChannel.url = portlet.children("source").text();
				$(content).append(ucapChannel.html.getImgHtml(paraChannel));
				break;
			case "11":
				var tabsHeight = _getData("height");//页签高度
				
				//默认为无边框有标题、无边框无标题，无需重新计算
				if(_getData("isShowBorder")!="0"){
					if(_getData("isShowTitle")!="0"){
						//有边框有标题
						tabsHeight = _getData("height")-29-2;
					}else{
						//有边框，无标题
						tabsHeight = _getData("height")-5;
					}
				}
				
				var div = $('<div></div>').tabs({
					height:tabsHeight,
					//border:false,
					plain:false,
					onSelect:function(title){
						//单击页签时才加载数据
						var tab = $(this).children("div");
						var tab_portlet = tab.data("portlet");
						var tab_portletDisplay = tab.data("portletDisplay");
						if(!tab.html() && tab && tab_portlet && tab_portletDisplay){
							//加载页签内容
							setContent(tab,tab_portlet,tab_portletDisplay);
						}
					}
					}).appendTo(content);
				var firstTitle = "";
				portlet.find("sourceChannels>channelInfo").each(function(){
					var tab_portlet = $(this).children("portlet");
					var tab_portletDisplay = $(this).children("portletDisplay");
					var tab = $("<div></div>");
					var tabTitle = tab_portlet.children("name").text();
					$(div).tabs("add",{
						title:tabTitle||"未命名", 
						fit:true,
						content:tab,
						closable:false
					});
					//必须放在页签add后面，以保证tab在触发onSelect时不渲染页签内容
					tab.data("portlet",tab_portlet);
					tab.data("portletDisplay",tab_portletDisplay);
					if(""==firstTitle)firstTitle=tabTitle;
				});
				//触发选择事件，加载第一个页签数据
				div.tabs("select",firstTitle);
				break;
		}
		//滚动效果
		if(paraChannel.roll!="false"){
			html = getMarqueeHTML(html,paraChannel);					
		}
		return html;
	}
	/**
	 * 频道组件接口
	 */
	$.fn.ucapChannel = function(options, param){
		channel = $(this);
		param = param||defaultConfig;
		if (typeof options == 'string'){
			switch(options){
			case 'init'://初始化频道
				return this.each(function(){
					if(!_getData("$init")){
						init(this, param);
						_setData("$init",true);
					}
				});
			case 'syncSize'://重构频道宽高
				if(null==param) param = {};
				return this.each(function(){
					syncSize(this, param.width,param.height);
				});
			case 'setContent'://设置频道内容
				return this.each(function(){
					setContent(this, param);
				});
			case 'setXY'://设置频道坐标
				if(null==param) param = {};
				return this.each(function(){
					setXY(this, param.x,param.y);
				});
			}
		}
	};
	/**
	 * 调用Ucap平台封装的访问WebService的Action
	 * @param url 需要访问的WebService地址
	 * 					webserviceUrl?op=服务方法名&服务参数名1=参数值1&服务参数名2=参数值2
	 * @param callBack 处理WebService返回的XML对象的回调函数
	 */
	$.fn.ucapChannel.ajaxWebService = function(url,callBack){
		if(url && url.toLowerCase().indexOf("http://") == -1 
								&& url.toLowerCase().indexOf("https://") == -1){
			url = appPath + url;
		}
		url = $("<div>"+url+"</div>").text();
		var param = _parserUrl(url)||{};
		var method = param["op"];
		_ajaxWebService(url,method,param,callBack);
	}
	
	/**
	 * 根据视图的UNID，返回iframe用的URL值
	 * @param {} viewId
	 */
	function getViewIframeSrc(viewId){
		var url=ucapSession.hostPath+ucapSession.appPath +
			"sys/jsp/view.jsp?viewId="+viewId+"&noQuery=true&noPreview=true&noTbar=true&noBbar=true";
		return url;
	}
})(jQuery);

/**
 * 解析URL并转换为json形式
 * @param {} tourl
 */
function _parserUrl(tourl){
	if (!tourl)
		return;
	var paramsArr = tourl.split('?')[1].split('&');
	var args = {}, argsStr = [], param, name, value;
	args['url'] = encodeURIComponent(tourl.split('?')[0]); // 首先载入url,问号"?"前面的部分
	for (var i = 0; i < paramsArr.length; i++) {
		param = paramsArr[i].split('=');
		name = param[0], value = param[1]||"";
		if (name == "")
			name = "unkown";
		if (typeof args[name] == "undefined") { // 参数尚不存在
			args[name] = value;
		} else if (typeof args[name] == "string") { // 参数已经存在则保存为数组
			args[name] = [args[name]];
			args[name].push(value);
		} else { // 已经是数组的
			args[name].push(value);
		}
	}

	var showArg = function(x) { // 转换不同数据的显示方式
		if (typeof(x) == "string" && !/\d+/.test(x))
			return "'" + x + "'"; // 字符串
		if (x instanceof Array)
			return "[" + x + "]"; // 数组
		return x; // 数字
	}
	args.toString = function() {// 组装成json格式
		for (var i in args)
			argsStr.push(i + ':' + showArg(args[i]));
		return '{' + argsStr.join(',') + '}';
	}
	return args; // 以json格式返回获取的所有参数
} 
