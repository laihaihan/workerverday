//防止模式对话框中取值错误 mdf by jc 20100618
var appPath = "/" + location.pathname.split("/")[(location.pathname.indexOf("/")>0?0:1)] + "/";
// var hostPath = location.split(appPath)[0];
var hostPath = location + "";
hostPath = hostPath.substring(0, hostPath.indexOf(appPath));
Ext.onReady(function() {
			Ext.namespace('ucapSession');
			Ext.namespace('ucapCommonFun');
			Ext.namespace('ucapButtonFunConfirm');
			Ext.QuickTips.init();
			window.onresize = ucapCommonFun.autoMenuHeight;
			try{
   				window.history.forward(1); //增加对后退的处理
			}catch(e){};
		});
if (typeof(ucapHeader) == "undefined") {
	var ucapHeader = {
		sUserStylePath : appPath + "uistyle/style_1/",
		menuType : 1,
		navType : 1,
		viewOpenType : 1,
		userJson : "",
		indexType : "",
		index : ""
	}
}

var ucapSession = {
	welcome:"欢迎使用UCAP系统&nbsp;&nbsp;",
	/**
	 * 日期选择框默认日期格式
	 * @type String
	 */
	defaultDateFormat:"yyyy-MM-dd",
	/**
	 * 日期时间选择框默认日期格式
	 * @type String
	 */
	defaultDateTimeFormat:"yyyy-MM-dd HH:mm:ss",
	/**
	 * 应用系统的路径
	 * 
	 * @type String
	 */
	appPath : appPath,
	hostPath : hostPath,
	/**
	 * 个性定义的资源路径 是在JSP中设置（header.jsp中有设置)
	 * 
	 * @type String
	 */
	sUserStylePath : ucapHeader.sUserStylePath,
	/**
	 * 个性化资源的图片路径
	 * 
	 * @type String
	 */
	sUserImgPath : ucapHeader.sUserStylePath + "ucapimages/",
	userJson : ucapHeader.userJson,
	indexType : ucapHeader.indexType,
	/**
	 * 视图打开方式 1表示是页签方式 2表示普通方式
	 * @type integer
	 */
	viewOpenType : ucapHeader.viewOpenType,
	appUnid : ucapHeader.appUnid,
	index : ucapHeader.index,
	/**
	 * 新建文档的方式 00 表示新窗口 01当前窗口 02 div窗口
	 * 
	 * @type
	 */
	newdocType : ucapHeader.newdocType,
	/**
	 * 打开文档的方式 00 表示新窗口 01当前窗口 02 div窗口
	 * 
	 * @type
	 */
	opendocType : ucapHeader.opendocType,
	baseAction : appPath + "BaseAction.action",
	/**
	 * 窗口去除header和footer后，中间的高度
	 * 
	 * @type Number
	 */
	middleHeight : 0,
	treeWidth:0,//自定义树的宽，只用于iframe中进行JSP页面开发 add by jc 20111201
	/**
	 * win窗口的默认设置
	 */
	win : {
		winImg : "<img src='"
				+ appPath
				+ "uistyle/images/icon/icon_87.gif' align='absmiddle' ></img>&nbsp;",
				//减小DIV弹出框的边距
		winBodyStyle : "background-color:#FFF;padding:1px 1px 1px 1px;"
	},
	mainLeft : "ucapMainLeft", // 包括菜单、模块的DIV
	portalID : "portal_id",
	ucapModuleId : "ucapModule",
	leftArrowheadId : "leftArrowhead",
	ucapViewId : "ucapView",
	portal_info : "portal_info",
	/**
	 * 普通窗口对象
	 * 
	 * @type
	 */
	commonWin : null,
	/**
	 * doc 的div 窗口对象
	 * 
	 * @type
	 */
	docWin : null,
	/**
	 * 用于表单通用关闭时存储上一个文档窗口对象
	 * add by jc 20110112
	 * @type 
	 */
	docWins : [],
	/**
	 * 增加旧的Ext窗体对象
	 */
	addDocWin:function(){
		if(this.docWin)
			this.docWins[this.docWins.length]=this.docWin;
	},
	userDefineWin : null,
	commonSelectWin : null,
	loginAppJson : "",
	/**
	 * 表单多值分隔符
	 * 
	 * @type String
	 */
	fvs_sp : ',',
	/**
	 * 用于在全局缓存中设置视图全局变量
	 * 设置及获取时都用window.top以保存一个IE窗口只有一个视图缓存
	 * @type 
	 */
	viewCache:{},
	setViewCache:function(viewId,key,value){
		if(!this.viewCache[viewId]){
			this.viewCache[viewId] = {};
		}
		this.viewCache[viewId][key] = value;
	},
	getViewCache:function(viewId,key){
		//alert(Ext.encode(this.viewCache[viewId][key]));
		var res = "";
		try{
			res = this.viewCache[viewId][key]||"";
		}catch(e){
			return null;
		}
		return res;
	},
	removeViewCache:function(viewId){
		if(this.viewCache[viewId])
			delete this.viewCache[viewId];
	}
}

Ext.BLANK_IMAGE_URL = ucapSession.appPath + 'uistyle/images/s.gif';// 替换图片文件地址为本地

var ucapCommonFun = {
	/**
	 * 页签被激活时触发的自定义事件
	 * @param {} tabid 页签ID
	 * @param {} ifrid 视图ID
	 */
	tabClickActivate:function(tabid,ifrid){
		//以下逻辑为每次单击激活页签时自动刷新页签内的视图数据
		var ifrWin = $(ifrid).contentWindow;
		if(ifrWin && ifrWin.view){
			ifrWin.view.refresh();
		}
	},
	 /**
	  * 指纹出错提示
	  * */
	DisplayError:function(ernum,errmessage,errtips ){
	 var supportinfo = "\r\n\r\n技术支持:\r\nWeb: http://www.izksoftware.com\r\nEmail: lzn@biometric.com.cn\r\n";	
		var message = "\r\nZKOnline错误\r\n=============\r\n\r\n错误号码: " + ernum + "\r\n错误信息: " + errmessage + "\r\n\r\n纠错提示:\r\n" + errtips + supportinfo;
		alert(message);	
	},
	/**
	 * 图片选择对话框的回调函数
	 * @param {} id
	 * @param {} value
	 */
	directoryFileFn:function(id,value){
		if($(id))$(id).value = value;
		ucapSession.docWin.close();
	},
	/**
	 * @author  cguangcong@linewell.com
	 * @since 2011-9-22 
	 * 设置Dom对象属性
	 * @param obj   DOM对象
	 * @param name  设置属性的名称
	 * @param value 设置属性的值（以IE的方式传值）
	 *	Demo
	 * 设置id=“test”的对象的readOnly属性
	 * var testObj=document.getElementById("test");
	 * ucapCommonFun.setAttr(testObj,"readOnly", true);
	 */
	setAttr: function(obj, name, value){
		switch(name.toLowerCase()){
			case "disabled":
			case "readonly":
			case "checked":
				obj[name] = value;
				break;
			default:
				if(!Ext.isIE){//其他浏览器					
					if(typeof value === "function"){
						value = "(" + value.toString() + ")()";
					}
					if("className" === name){
						name = "class";
					}							
				}//end if
				obj.setAttribute(name, value);
				break;
		}//end switch
	},
	/**
	 * @author  cguangcong@linewell.com
	 * @since 2011-9-22 
	 * 获取Dom对象属性
	 * @param obj   DOM对象
	 * @param name  获取属性的名称
	 *  Demo 
	 *  获取id="test"的对象的name属性
	 *	var testObj=document.getElementById("test");
	 *	ucapCommonFun.getAttr(testObj,"name");
	 */
	getAttr:function(obj, name){
		if(!obj){
			return "";
		}
		if(obj.getAttribute(name)){
			return obj.getAttribute(name);
		}
		var attrName = "obj." + name;
		if(undefined !== eval(attrName)){		
			return eval(attrName);
		}else if(undefined !== obj[name]){		
			return obj[name];
		}else{
			return "";
		}	
	},
	/**
	 * @author  cguangcong@linewell.com
	 * @since 2011-9-22 
	 * 在没有传入e（event）参数时，获取event事件，兼容ie和ff
	 */
	getEvent:function(){
		var theEvent = null;	
		if(window.event){
			theEvent = window.event;
		}else if(arguments[0]){
			theEvent = arguments[0];
		}else if(arguments.callee){
			var tmpCaller = arguments.callee.caller;
			while(tmpCaller){
				theEvent = tmpCaller.arguments[0];
				tmpCaller = tmpCaller.caller;
			}
		}
		return theEvent;			
	},
	/**
	 * logo图片选择对话框
	 * @param {} valueId 需要赋值的对象ID
	 * @param {} path 需要获取图片的目录路径
	 * @param {} title 对话框标题
	 * @param {} fn 回调函数
	 * @param {} width 对话框的宽
	 * @param {} height 对话框的高
	 */
	directoryLogoFile:function(valueId,path,title,fn,width,height){
		var requestConfig = {
			url : ucapSession.baseAction,
			params : {
				"type" : "directoryFile",
				"verb" : "getLogo",
				"webPath":path
			},
			callback : function(options, success, response) {
				if (success) {
					var exjson = Ext.decode(response.responseText);
					var exResult = ucapCommonFun.dealException(exjson);
					if (!exResult)
						return;
					var win = window;
					fn = (fn||"ucapCommonFun.directoryFileFn")+"(\""+valueId+"\",this.id)";
					var html = "<div>";
					//当前使用图标
					var imgValue = $(valueId).value;
					if(imgValue && imgValue!=""){
						html += "当前选择：<span onclick='"+fn+"' qtip='" + imgValue + "' id='" + imgValue + "' style='cursor:hand;'>" +
						"<img id='" + imgValue + "' src='" + appPath + path + "/" + imgValue + "'></span>&#160;&#160;<br/>";
					}else{
						html += "当前选择：无<br/>";
					}
								
					//最近使用过的图标
					//全部图标
					for (var i = 0; i < exjson.length; i++) {
						var file = exjson[i];
						html += "<a href='javascript:void(0);'><span onclick='"+fn+"' qtip='" + file.id + "' id='" + file.id + "' style='cursor:hand;'>" +
								"<img id='" + file.id + "' src='" + appPath + path + "/" + file.id + "'>&#160;&#160;"
								+ file.id + "</span></a>&#160;&#160;<br/>";
					}
					html += "</div>";
					var extWin = win.ucapSession.docWin = new win.Ext.Window({
						tbar:[
								//{text:"刷新"},
								//{text:"列表"},{text:"缩略图"},
								{text:"关闭",handler:function(){extWin.close();}}],
						title : ucapSession.win.winImg + (title||"图片选择框"),
						width : width||180,
						closable : true, // 关闭
						modal : true,
						height : height||250,
						bodyStyle : ucapSession.win.winBodyStyle+"overflow:auto;",
						html : html
					});
					extWin.show();
				} else {
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 图片选择对话框
	 * @param {} valueId 需要赋值的对象ID
	 * @param {} path 需要获取图片的目录路径
	 * @param {} title 对话框标题
	 * @param {} fn 回调函数
	 * @param {} width 对话框的宽
	 * @param {} height 对话框的高
	 */
	directoryFile:function(valueId,path,title,fn,width,height){
		var requestConfig = {
			url : ucapSession.baseAction,
			params : {
				"type" : "directoryFile",
				"verb" : "reload",
				"webPath":path
			},
			callback : function(options, success, response) {
				if (success) {
					var exjson = Ext.decode(response.responseText);
					var exResult = ucapCommonFun.dealException(exjson);
					if (!exResult)
						return;
					var win = window;
					fn = (fn||"ucapCommonFun.directoryFileFn")+"(\""+valueId+"\",this.id)";
					var html = "<div>";
					//当前使用图标
					var imgValue = $(valueId).value;
					if(imgValue && imgValue!=""){
						html += "当前选择：<span onclick='"+fn+"' qtip='" + imgValue + "' id='" + imgValue + "' style='cursor:hand;'>" +
						"<img id='" + imgValue + "' src='" + appPath + path + "/" + imgValue + "'></span>&#160;&#160;<br/>";
					}else{
						html += "当前选择：无<br/>";
					}
								
					//最近使用过的图标
					//全部图标
					for (var i = 0; i < exjson.length; i++) {
						var file = exjson[i];
						html += "<a href='javascript:void(0);'><span onclick='"+fn+"' qtip='" + file.id + "' id='" + file.id + "' style='cursor:hand;'>" +
								"<img id='" + file.id + "' src='" + appPath + path + "/" + file.id + "'>&#160;&#160;"
								+ file.id + "</span></a>&#160;&#160;<br/>";
					}
					html += "</div>";
					var extWin = win.ucapSession.docWin = new win.Ext.Window({
						tbar:[
								//{text:"刷新"},
								//{text:"列表"},{text:"缩略图"},
								{text:"关闭",handler:function(){extWin.close();}}],
						title : ucapSession.win.winImg + (title||"图片选择框"),
						width : width||180,
						closable : true, // 关闭
						modal : true,
						height : height||250,
						bodyStyle : ucapSession.win.winBodyStyle+"overflow:auto;",
						html : html
					});
					extWin.show();
				} else {
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	isHead : 1,// 二级页面head是否无收缩：0收缩,1无收缩
	/**
	 * 自动设置高度
	 */
	autoMenuHeight : function() {
		//防止非最大化窗口出现不必要的滚动条
		document.body.style.overflowY="hidden";
		//document.body.style.overflowY="auto";
		//对div打开表单页面，弹出窗口进行自适应设置 modify by fsm 20110428
		if(Ext.getCmp("openDocDiv")&&$("_UcapOpenDociFrame")){ 
		 	var docIframWidth=$("_UcapOpenDociFrame").style.width;
			 if(""!=docIframWidth){
				Ext.getCmp("openDocDiv").setWidth(parseInt(docIframWidth)+15);
			 }
		}

		var cint = ucapSession.viewOpenType==1?30:0; //如果是页签，则要减去页签的高度
		// try{
		var isHead = ucapCommonFun.isHead;
		var infoHeight = 0; //实际显示内容的大小变量 
		//try{
			var footHeight = parseInt((Ext.getDom("footer")||{}).clientHeight) || 0; //版权注释
			var headHeight = parseInt((Ext.getDom("headerBox")||{}).clientHeight) || 0; //logo头部
			//yjy 2011-4-21 update 保证如果页面前有 "-//W3C//DTD   标识时，不能正确取值
			//var clientHeight = Ext.getDoc().dom.body.clientHeight ; //窗口的高度
//			var bdy = (document.documentElement && document.documentElement.clientWidth)?
//						document.body:document.body;
//			var clientHeight = bdy.clientHeight;
			//解决用户管理中心用户管理界面显示不了的问题 by cgc 2011-11-03
			var clientHeight = document.compatMode=="CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight; 

			
			if(clientHeight==0) return ;
			infoHeight = clientHeight - (isHead ? headHeight : 0) - footHeight;

			var topHeight = parseInt((Ext.getDom("topLine")||{}).clientHeight) || 0 ;
			ucapSession.middleHeight = infoHeight - topHeight - 2;
			if($("toolbarBox")){//易用性的分级管理自适应
				ucapSession.middleHeight = clientHeight-150;
			}else  if($("ucapSystemButtonListBox")){//分级管理自适应
				ucapSession.middleHeight = ucapSession.middleHeight - parseInt($("ucapSystemButtonListBox").clientHeight+3);
				if($(ucapSession.mainLeft))$(ucapSession.mainLeft).style.height = ucapSession.middleHeight - parseInt($("ucapSystemTreeMenu").clientHeight) +"px";
				if($("ucapSystemMain"))$("ucapSystemMain").style.height = ucapSession.middleHeight+"px";				
			}
			//if($("ucapView"))$("ucapView").style.height = ucapSession.middleHeight;
			if (Ext.getDom("mainRight"))
				Ext.getDom("mainRight").style.height = (ucapSession.middleHeight) + "px";
			var leftArrowhead = Ext.getDom(ucapSession.leftArrowheadId);
			if (leftArrowhead && leftArrowhead.style.display!="none") {
				leftArrowhead.style.height = (ucapSession.middleHeight) + "px";
				if(!Ext.isIE){
					leftArrowhead.style.height = (ucapSession.middleHeight/2+20) + "px";
				}
				leftArrowhead.style.paddingTop = ((ucapSession.middleHeight)/ 2 - 20)+ "px";
			}
			//部门树
			if (Ext.getCmp("ucap_deptTree")) {
				Ext.getCmp("ucap_deptTree").setHeight(ucapSession.middleHeight - cint);
			}
			if (Ext.getCmp("ucap_dictTree")) {
				Ext.getCmp("ucap_dictTree").setHeight(ucapSession.middleHeight - cint);
			}
			if (Ext.getCmp("ucap_columnsTree")) {
				Ext.getCmp("ucap_columnsTree").setHeight(ucapSession.middleHeight - cint);
			}
			//防止首页窗口大小变化时报错 mdf by jc 20100708
			if(typeof(viewTabs)!="undefined" && viewTabs && viewTabs.tabs){
				viewTabs.tabs.setHeight(0);//使每次调用viewTabs.tabs.setHeight后布局都可以生效
				viewTabs.tabs.setHeight(ucapSession.middleHeight);
			}
			try{
				//视图类型为概要、图文并茂时调整表单高度
				var ght = ucapSession.middleHeight;
				var gridDiv = Ext.getDom(view.namePrefix+view.index);
				if(gridDiv){
					if("undefined"==typeof(view.noTbar) || view.noTbar!="true"){
						ght = ght-27;
					}
					if("undefined"==typeof(view.noBbar) || view.noBbar!="true"){
						ght = ght-27;
					}
					var searchDiv= Ext.getDom('search');
					if("undefiend"!=searchDiv && null!=searchDiv){
						ght=ght-searchDiv.offsetHeight;
					}
					gridDiv.style.height = (ght-cint-20)+"px";//firefox
				}
			}catch(e){}
			
			try{
				//视图类型为概要、图文并茂时出错
				if (ucapPortal && ucapPortal.portal) {
					ucapPortal.portal.setHeight(ucapSession.middleHeight);
				}
			}catch(e){}
			
			if (Ext.getCmp("ucapMenu_tree")) {
				Ext.getCmp("ucapMenu_tree").setHeight(ucapSession.middleHeight);
			}
			//树形展示模块
			if (Ext.getCmp("panelModuleTree")) {
				Ext.getCmp("panelModuleTree").setHeight(ucapSession.middleHeight-8);
			}
			try{
				//窗口调整得太小时会出现错误
				var infoDiv = Ext.query("div[id=info]");
				if (infoDiv && infoDiv.length > 0) {
					var iHeight = infoHeight - (24) * infoDiv.length - 37;
					for (var i = 0; i < infoDiv.length; i++) {
						infoDiv[i].style.height = iHeight + "px";
					}
				}
				infoDiv = Ext.query("div[id=ucap_menuFlex]");
				if (infoDiv && infoDiv.length > 0) {
					var iHeight = infoHeight - (28) * infoDiv.length - 19;
					for (var i = 0; i < infoDiv.length; i++) {
						infoDiv[i].style.height = iHeight + "px";
					}
				}
			}catch(e){}
		//}catch(Exception){}
		var ucapCenter = Ext.getCmp("ucapViewPreviewDiv_center");
		if(ucapCenter){
			if(ucapCenter.getEl().getWidth()<=0)
				ucapCenter.setWidth(ucapCenter.getEl().getWidth());//自适应大小
			if(ucapCenter.getEl().getHeight()<=0){
				ucapCenter.onResize();//自适应大小
			}
		}
	},
		/**
	 * 设置页签状态下视图的高度
	 */
	setIframeViewHeight:function(){
		ucapCommonFun.autoMenuHeight();
		document.body.style.overflowX="hidden";
		var ifr = Ext.query("iframe");
		if(ifr){
			var cint = ucapSession.viewOpenType==1?27:0;
			var height = ucapSession.middleHeight;
			if(viewTabs.tabs){
				var item=viewTabs.tabs.getActiveTab();
				var frameID = 'ifr'+(item.id||"").replace(/^(\w*_)/g,"");
				var ifrmW =document.frames?document.frames[frameID]:
						document.getElementById(frameID)==null?null:document.getElementById(frameID).contentWindow;//firefox
	            var iframes = Ext.query("iframe[tabid='"+item.id+"']");
	            var ifrm = $(frameID);
	            if(iframes && iframes.length==1){
	            	ifrmW = iframes[0].contentWindow;
	            	ifrm = iframes[0];
	            }
				if(ifrmW && ifrmW.ucapSession){
					ifrmW.document.body.style.overflowY="hidden";
					ifrmW.ucapSession.middleHeight=height-cint; //设置iframe窗口中 模块的高度为父模块高度-25
					//设置iframe的高度	
					ifrm.style.height =(height-cint)+"px"; 
					ifrmW.view.setGridHeight(); //设置视图的相关高度
				}  else {
					if (ifrmW && ! ifrmW.ucapSession){
						//说明是外面的URL
						ifrm.style.height =(height-cint)+"px"; 
						return;
					}
					//说明页面是直接load进来的，不是以iframe方式
					if (typeof ucapDept!="undefined"){
						//判断是否有部门
						var obj = Ext.getCmp(ucapDept.deptPanelId);
						if (obj) {
							//切换时，有BUG，因此要重新设置宽度
							obj.getComponent(ucapDept.columnId).setWidth(ucapDept.columnWidth);
							obj.setHeight(ucapSession.middleHeight - cint-6);
						}
					}
					if (typeof ucapDictConfig!="undefined"){
						//判断是否有字典树
						var obj = Ext.getCmp(ucapDictConfig.dictId);
						if (obj){
							obj.getComponent(ucapDictConfig.leftId).setWidth(ucapDictConfig.leftWidth);
							obj.setHeight(ucapSession.middleHeight - cint-6);
						}
					}
					if(view.setGridHeight)view.setGridHeight();
				}
			}else{
				if(view.setGridHeight)view.setGridHeight();
				//非页签嵌入iframe视图
				for(var i=0;i<ifr.length;i++){
					var srcUrl = ifr[i].src||"";
					//门户内的iframe不进行高度自适应 add by jc 20120411
					var isPortal = ucapCommonFun.getAttr(ifr[i],"isPortal")||false;
					//if(srcUrl.indexOf("sys/jsp/view.jsp")>-1 || srcUrl.indexOf("sys/jsp/document.jsp")>-1){
					if(srcUrl.indexOf("sys/jsp/index.jsp")==-1 && !isPortal){
						try{
							ifr[i].style.height=ucapSession.middleHeight+"px";
							ifr[i].contentWindow.document.body.style.overflow="hidden";
							ifr[i].contentWindow.ucapSession.middleHeight=ucapSession.middleHeight;
							ifr[i].contentWindow.view.setGridHeight();
						}catch(e){}
					}
				}//end for
			}
		} 
	},
	/**
	 * 设置页签状态下各页签中视图的宽度 在模块中调用 收缩时用
	 * @param {} intc 三级界面中视图宽度的误差值
	 */
	setIframeViewWidth:function(intc){
		var width = ucapCommonFun.setViewWidth();//设置当前窗口中视图的宽度，返回当前窗口视图的宽度
		var ifr = Ext.query("iframe");
		//判断如果是用户树或字典树，则宽度要加上树的宽度
		var viewWidth = width; //视图宽度
		//部门树
		if (typeof ucapModule!="undefined" && $(ucapModule.deductViewDivId)) {
			//在部门树及字典树中，取得的宽度已经是减去树的宽度，因此要加上此宽度
			width +=$(ucapModule.deductViewDivId).offsetWidth; 
		}
		if(ifr){
			if(viewTabs.tabs){
				//viewTabs.tabs.setWidth(0)
				viewTabs.tabs.setWidth(width);
			}
			for(var i=0;i<ifr.length;i++){
				var srcUrl = ucapCommonFun.getAttr(ifr[i],"src");
				//if(srcUrl.indexOf("sys/system/index.jsp")>-1 || srcUrl.indexOf("sys/jsp/view.jsp")>-1  || srcUrl.indexOf("sys/jsp/document.jsp")>-1){
				if(srcUrl.indexOf(".jsp")>-1){
					try{
						if (ifr[i].contentWindow.ucapCommonFun){
							ifr[i].contentWindow.document.body.style.overflowX="hidden";
							//首页频道DIV打开文档时，不进行宽度调整，解决首页频道打开DIV窗口时内容不会被截掉 mdf by jc 20120314
							if(srcUrl.indexOf("div=1")<-1){
								ifr[i].style.width = (width - (intc || 0))+"px";
							}
							ifr[i].contentWindow.ucapCommonFun.setViewWidth(viewWidth-(intc||0));
						}
					}catch(e){}
				}
			}
		}
	},
	/**
	 * 设置视图的宽度
	 * 
	 * @param divId
	 *            还需要减的view宽度 默认要减去 菜单或模块的宽度 即 ucapSession.mainLeft中的宽度 即不管
	 *            divId是否为空，都要减去
	 */
	setViewWidth : function(w) {
		var width;
		if (typeof w=="undefined"){
			width = Ext.getBody().getWidth();
			var divId ="";
			if (typeof ucapModule!="undefined") {
				divId = ucapModule.deductViewDivId;
			}
			if (typeof divId != "undefined" && divId != "") {
				var ids = divId.split(",");
				for (var i = 0; i < ids.length; i++) {
					if (typeof Ext.getDom(ids[i]) != "undefined"
							&& Ext.getDom(ids[i])) {
						width = width - Ext.getDom(ids[i]).offsetWidth;
					}
				}
			}
			// 下面减去 ucapSession.mainLeft 的宽度
			if ("undefined" != typeof Ext.getDom(ucapSession.mainLeft)
					&& Ext.getDom(ucapSession.mainLeft) != null) {
				width = width - Ext.getDom(ucapSession.mainLeft).offsetWidth;
				if (Ext.getDom(ucapSession.leftArrowheadId) != null) {
					width = width
							- Ext.getDom(ucapSession.leftArrowheadId).offsetWidth;
				}
			};
		} else {
			width =w;
		}
		//考虑视图分类的宽度
		var vcDiv = Ext.getDom("viewCategories");
		if ("undefined" != vcDiv && vcDiv != null) {
			if(Ext.isIE){
				width = width - vcDiv.offsetWidth - 5;
			}		
		}
		if ( typeof view == "undefined" || "undefined" == typeof view.namePrefix
				|| typeof view.viewBaseInfos == "undefined" || view.viewBaseInfos ==null)
					return width;
		//主要用于iframe中的有自定义tree时，tree的宽度 add by jc 20111201
		var treeWidth = ucapSession.treeWidth;
		width -= treeWidth;
		
		for (var i = 0; i < view.viewBaseInfos.length; i++) {
			var obj = Ext.getCmp(view.namePrefix + i);
			if(obj) obj.setWidth(width);
			//设置搜索栏宽度 add by jc 20100609
			var searchDiv= Ext.getDom('search');//查询
			if(searchDiv){
				searchDiv.style.width = width+"px";
			}
			//高级搜索
			var searchMoreDiv= $('searchMore_'+i);
			if("undefiend"!=searchMoreDiv && null!=searchMoreDiv){
				searchMoreDiv.style.width = width+"px";
			}
			
		}
		return width;
	},
	refreshParentView : function() {
		// ==1 说明是当前窗口 0 新窗口 2 div 都要刷新视图
		if (window.opener && window.opener.ucapCommonFun&&window.opener.ucapCommonFun.ucapCurOpenType != 1) {
			// 代表是新窗口打开
			window.opener.view.refresh();
			return null;
		}
		if (window.parent) {
			if(window.parent.ucapCommonFun.ucapCurOpenType==1 && window.parent.ucapHeader.openStyle==2){
				return null;
			}
			// 代表是div 窗口打开
			if (window.parent.ucapCommonFun.ucapCurOpenDocViewId != ""
					&& typeof window.parent.ucapCommonFun.ucapCurOpenDocViewId != "undefined") {
				var iframeView = window.parent.Ext.getDom("ifr"
						+ window.parent.ucapCommonFun.ucapCurOpenDocViewId);
				if (iframeView) {
					iframeView = iframeView.contentWindow;
					if (iframeView)
						iframeView.view.refresh();
				} else {
					if (window.parent.view)
						window.parent.view.refresh();
				}
			} else {
				if (window.parent.view){//页签式的视图刷新
					var viewMId = ucapCommonFun.getUrlParameter("viewMId");
					window.parent.view.refresh(viewMId);
				}
			}
			/**
			 * 视图编辑刷新
			 */
			var allView = _UcapForm.handler.allView;
			for (var view in allView) {
				var objView = $(view);
				if (objView && objView.tagName.toLowerCase() == "iframe") {
					var ifrWin = objView.contentWindow;
					if (ifrWin && ifrWin.view) {
						ifrWin.view.refresh();
					}
				}
			}
		}
	},

	/**
	 * 扩展功能前台统一执行方法，通过扩展功能标识及其它URL参数和json格式数据
	 * 
	 * @param {}
	 *            interactionId 扩展功能表识
	 * 
	 * @param {}
	 *            json json格式的数据对象
	 * 
	 * @param from
	 *            扩展功能执行时来自的地方，其中为0来自表单，为1来自视图,空或她值为其他的
	 */
	executeInteraction : function(interactionId, json, from) {
		var requestConfig = {
			url : ucapSession.baseAction,
			params : {
				"type" : "common",
				"sid" : interactionId
			},
			jsonData : json,
			callback : function(options, success, response) {
				// 扩展功能的回调函数不在由前台指定，而是直接由后台指定

				if (null != response.responseText
						&& response.responseText != "") {
					try {
						var resultJson = Ext.decode(response.responseText);
						var exResult = ucapCommonFun.dealException(resultJson);
						if (!exResult)
							return;

						var callBackFn = resultJson.callBackFn;
						if (callBackFn && "string" != callBackFn
								&& callBackFn != "") {
							eval(callBackFn + "(response.responseText);");
							// return;
						} else {
							var msg = resultJson.msg;
							var result = resultJson.result;
							if (null == msg || msg == "") {
								if (result == "true") {
									alert("操作成功");
								} else {
									alert("操作失败");
								}
							} else {
								alert(msg);
							}

							if ("undefined" != typeof(from)) {
								if (from == 0) {
									window.location = window.location;
									ucapCommonFun.refreshParentView();
								} else if (from == 1) {
									view.refresh();
								}
							}
						}
					} catch (Exception) {
						if (response.responseText.indexOf("true") >= 0) {
							alert("操作成功");
						} else {
							alert("操作失败");
						}
					}
				} else {
					Ext.Msg.alert("提示", "无返回操作结果提示信息！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 根据类型、UNIDS 取得对应的中文名称
	 * 
	 * @param {}
	 *            sourceType 来源值
	 * @param {}
	 *            unids 实际值
	 * @param {}
	 *            dictUnid 字典的配置UNID
	 */
	getDisplayNames : function(sourceType, unids, dictUnid) {
		var url = ucapSession.baseAction;
		if (typeof dictUnid == "undefined")
			dictUnid = "";
		url += "?unid=" + unids + "&sourceType=" + sourceType + "&dictUnid="
				+ dictUnid + "&type=getDisplayName&rand=" + Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		return conn.responseText;
	},
	/**
	 * 模块的菜单的点击事件
	 * 
	 * @param {}
	 *            id
	 * @param {}  type
	 *             01 视图  02 URL  04 JavaScript 
	 * @param {}
	 *            openType 01 新窗口打开 02 当前窗口打开 03 iframe方式打开
	 * @param {}  title 如果是视图，则为视图名称 或者为是来自菜单的标识
	 * 
	 * @param {}  purl 传入的url参数
	 * 
	 * @param {}  moduleUnid 业务模块标识
	 * 
	 * @param {} moduleItemId模块Item的UNID
	 */
	moduleMenuClk : function(id, type, openType, title,purl,moduleUnid,moduleItemId) {
		if(typeof id == "undefined" || typeof type == "undefined")return;
		type = parseInt(type, 10);
		//如果是分类09则不执行
		if(type==9)return false;
		
		//每次打开时都去使左侧对象可见 mdf by jc 20100721
		var dispalyState ="";//默认为可见
		if(typeof title !="undefined" && 1==title)
		{
			dispalyState ="none";
		}
		if($(ucapSession.mainLeft))$(ucapSession.mainLeft).style.display=dispalyState;
		if($(ucapSession.leftArrowheadId))$(ucapSession.leftArrowheadId).style.display=dispalyState;
		if($("panelModuleTree"))$("panelModuleTree").style.display=dispalyState;
		
		openType = parseInt(openType, 10);
		//以下就是当前窗口和以iframe方式打开	
		if (type == 1) {//视图方式
			this.indexOpen.openView(id, "", title,purl,moduleUnid);
			view.viewUrl = 'ucapCommonFun.moduleMenuClk("'+id+'","'+type+'","'+openType+'","'+title+'","'+purl+'")';
			return;
		} 
		if (type == 4) {//脚本方式
			this.evalJavaScript(id);
			return;
		}
		//下面为 type==2 的url方式;
		if (id.toLowerCase().indexOf("http://") == -1 && id.toLowerCase().indexOf("https://") == -1) {
			if(id && id.trim().indexOf(ucapSession.appPath)==-1)id = ucapSession.appPath + id;
		}
		if(id.toLowerCase().indexOf("?")>=0){
			id+="&appUnid="+ucapHeader.appUnid;
		}else{
			id+="?appUnid="+ucapHeader.appUnid;
		}			
		if(typeof(moduleUnid)!="undefined" && moduleUnid!=""){
			if(id.toLowerCase().indexOf("?")>=0){
				id = id+"&moduleUnid="+moduleUnid;
			}else{
				id = id+"?moduleUnid="+moduleUnid;
			}
		}
		//增加moduleItem的UNID add by jc 20110510
		if(typeof(moduleItemId)!="undefined" && moduleItemId!=""){
			if(id.toLowerCase().indexOf("?")>=0){
				id = id+"&moduleItemId="+moduleItemId;
			}else{
				id = id+"?moduleItemId="+moduleItemId;
			}
		}
		if (openType == "01" || openType == 1) {
			// 新窗口打开
			this.indexOpen.openUrl(id);
			return;
		} 	
		//去除首页频道的内容
		if (Ext.getDom(ucapSession.portalID))
			Ext.getDom(ucapSession.portalID).innerHTML="";
		if (Ext.getDom(ucapSession.portal_info))
			Ext.getDom(ucapSession.portal_info).style.display="none";
		if (typeof ucapPortal!="undefined") {
			ucapPortal.breakInit = true;
		}
		if((ucapHeader.openStyle==1 || ucapHeader.openStyle=="01") && Ext.getDom(ucapSession.ucapViewId) ){
			//判断是否是页签风格 并且要有 ucapViewId
			if(id && id.indexOf("ucapTitle")>-1){
				title = ucapCommonFun.getUrlParameter("ucapTitle",id);
			}
			var tabid = ucapCommonFun.getUrlParameter("unid",id);
			tabid=tabid.replace(/\W/g,"");//以url作为ID
			//var tabid =id.replace(/\W/g,"");//以url作为ID
			if (tabid!="") { 
				id +="&isTab=1";
			}else{
				//给Url一个ucapTabid，页签式打开时单击一次打开一个。add by jc 20100601 
				tabid = ucapCommonFun.getUrlParameter("ucapTabid",id);
			}
			if (openType == "02" || openType == 2 ) {//判断是否是当前窗口打开
				//以当前窗口打开，强制设置tabid为同一个
				tabid="_ucap_commpage";
				viewTabs.commonAddTab(ucapSession.ucapViewId,id,1,tabid,tabid,title);		
			} else {//以iframe方式打开
				if(tabid=="" || !tabid){
					tabid = Ext.id();//如果找不到文档ID则用Ext自增长ID
				}
				viewTabs.commonAddTab(ucapSession.ucapViewId,id,2,tabid,tabid,title);	
			}
		} else {//是普通页面方式
			if (openType == "02" || openType == 2 ) {//判断是否是当前窗口打开
				//分級管理才需要隐藏 yjy2011-5-17
				if(moduleUnid && window.location.href.indexOf("sys/system/index.jsp")>-1){
					if($(ucapSession.mainLeft))$(ucapSession.mainLeft).style.display="none";
					if($(ucapSession.leftArrowheadId))$(ucapSession.leftArrowheadId).style.display="none";
					if($("panelModuleTree"))$("panelModuleTree").style.display="none";
				}
				if($(ucapSession.portalID))$(ucapSession.portalID).innerHTML = "";
				var el = Ext.get(ucapSession.ucapViewId);
				var mgr = el.getUpdater();
				mgr.update({
							url : id,
							scripts : true
						});
				Ext.getDom(ucapSession.ucapViewId).style.height = ucapSession.middleHeight
						+ "px";
				ucapCommonFun.autoMenuHeight();	
				view.viewUrl = 'ucapCommonFun.moduleMenuClk("'+id.replace(ucapSession.appPath,"")+'","'+type+'","'+openType+'","'+title+'","'+purl+'")';
			} else {//以iframe方式打开
				//当前iframe打开
				if(id && id.indexOf(ucapCommonFun.getDocJspPath())==-1){
					view.viewUrl = id;//存储非三级界面的打开事件
					//id, type, openType, title,purl,moduleUnid
					//分級管理才需要隐藏 yjy2011-5-18
					//if(!moduleUnid){
					if(moduleUnid && window.location.href.indexOf("sys/system/index.jsp")>-1){
						if($(ucapSession.mainLeft))$(ucapSession.mainLeft).style.display="none";
						if($(ucapSession.leftArrowheadId))$(ucapSession.leftArrowheadId).style.display="none";
						if($("panelModuleTree"))$("panelModuleTree").style.display="none";
					}
				}else{
					//防止首页打开文档时出现中间一大片空白 add by jc 20100609
					if($(ucapSession.ucapViewId)){
						if(id.indexOf("openST=01")>-1){
							$(ucapSession.ucapViewId).style.styleFloat="";
						}else{
							$(ucapSession.ucapViewId).style.styleFloat="left";
						}
					}
				}
				var iframeid = "ifram_" + this.getRandomString();
				if(Ext.getDom(ucapSession.ucapViewId)){
					Ext.getDom(ucapSession.ucapViewId).innerHTML = this
						.getIframeHtml(id, iframeid,
								ucapSession.middleHeight);
					Ext.getDom(iframeid).src = id;	
				}else{
					//如果无法用当前页面打开则用新窗口打开页面（如：普通页面方式+当前页面打开）
					this.moduleMenuClk(id, type, "01", title,purl,moduleUnid);
				}
				
			}			
		}
	},
	/**
	 * 执行js脚本 有返回值 true 或 false
	 * 
	 * @param {}
	 *            js
	 */
	evalJavaScript : function(js) {
		if (typeof js == "undefined" || js == "")
			return true;
		try {
			return eval(js);
		} catch (e) {
			return false
		}
	},

	/**
	 * 后台调用过程中发生异常时，前台的统一处理
	 * 
	 * @param {}
	 *            json 后台返回的json对象
	 */
	dealException : function(json) {
		if (null != json && null != json.exceptionType) {
			if (json.exceptionType == "01") {// 说明发生了会话为空的异常了
				if (null != window.opener) {
					if (window.opener)
						window.opener.location.reload();
					window.close();
				} else {
					window.location.reload();
				}
			} else {
				alert(json.exceptionMsg);// 异常直接提示，不做其他处理
			}
			return false;
		}
		return true;
	},

	indexOpen : {
		/**
		 * 
		 * @param {}
		 *            id
		 * @param {}
		 *            type 1 表示打开模块 2表示打开视图 3表示打开URL 都是以新窗口打开 4表示脚本 9表示打开文档
		 * @param {}
		 *            openType 打开方式 01 当前页面 02新页面 03以iFrame方式嵌入 只对URL起作用
		 * @param isMenu
		 *            不为空，说明是从菜单中调用
		 */
		open : function(id, type, openType, isMenu) {
			if (type == 1) {
				this.openModule(id);
			} else if (type == 2) {
				this.openView(id, isMenu);
			} else if (type == 3) {
				ucapCommonFun.moduleMenuClk(id, 2, openType,isMenu);
			} else if (type == 4) {
				ucapCommonFun.evalJavaScript(id);
			} else if (type == 9) {
				this.openDoc(id);
			}
		},
		/**
		 * 打开首页面
		 */
		openMainPage : function(isRelod) {
			//modify by jc 打开首页时清楚原来打开的页签数据
			if(isRelod==true){
				window.location.reload();
				return;
			}
			if(!window.top)window.top.viewTabs.tabs=null;
			$(ucapSession.ucapViewId).innerHTML = "";
			$(ucapSession.ucapViewId).style.styleFloat="left";
			$(ucapSession.portalID).innerHTML = "";
			$(ucapSession.ucapModuleId).style.display = "none";
			if($(ucapSession.leftArrowheadId))$(ucapSession.leftArrowheadId).style.display = "none";
			//更改门户加载方式 mdf by jc 20120412
			if(typeof(jQuery)!="undefined" && jQuery("#portal_id")
										&& jQuery("#portal_id").ucapPortal){
				jQuery("#portal_info").css("display","none");
				jQuery.ajax({
				   type: "POST",
				   async : true,
				   url: appPath+"BaseAction.action",
				   data: "type=unitaryPortalAction&act=getPortalInfo",
				   dataType: "xml",
				   //dataType: "text",
				   success: function(data){
				   		//document.write(data);
				   		if(data){
							jQuery("#portal_id").ucapPortal("init",data);
							jQuery("#portal_id").css("overflow","auto");
							jQuery("#portal_id").ucapPortal("syncSize",{height:ucapSession.middleHeight});
							jQuery("#portal_id").ucapPortal("syncCenter");
						}
				   }
				});
			}else{
				ucapPortal.init();
			}

			
		},
		/**
		 * 根据视图标识进行打开视图，前提是在模块或菜单中进行点击调用
		 * @param {} id 视图ID
		 * @param {} isMenu 如果不为空说明是从菜单中进行调用
		 * @param {} title  视图的名称
		 * @param {} purl  打开视图的参数
		 * @param {} bModuleUnid 模块的标识
		 */
		openView : function(id, isMenu, title,purl,bModuleUnid,outTbarHeight,noQuery,noPreview,noSelfConfig,tabsp) {
			Ext.getDom(ucapSession.ucapViewId).style.styleFloat="left";
			if(!tabsp)tabsp="view_";
			if (typeof isMenu != "undefined" && isMenu != "") {
				if (Ext.getDom(ucapSession.ucapModuleId)) {
					Ext.getDom(ucapSession.ucapModuleId).innerHTML = "";
					Ext.getDom(ucapSession.ucapModuleId).style.display = "none";
				}
				if (Ext.getDom(ucapSession.leftArrowheadId)) {
					Ext.getDom(ucapSession.leftArrowheadId).style.display = "none";
				}
			}
			
			//viewId,renderto,title,hasTab,purl,bModuleUnid,outTbarHeight,noQuery,noPreview,noSelfConfig,tabsp
			if (ucapSession.viewOpenType == 1) {
				initView(id, ucapSession.ucapViewId, title, true,purl,bModuleUnid,outTbarHeight,noQuery,noPreview,noSelfConfig,tabsp);
			} else {
				initView(id, ucapSession.ucapViewId,"",false,purl,bModuleUnid,outTbarHeight,noQuery,noPreview,noSelfConfig,tabsp);
			}
			//防止视图打开时出现不必要的滚动条mdf by jc 20100609
			document.body.style.overflowY="hidden";
			//document.body.style.overflowY="auto";
		},
		
		/**
		 * 根据模块及菜单标识直接打开指定模块下的菜单，比如在首页中的快捷链接等
		 * @param {} menuId 菜单Id
		 * @param {} purl 额外的参数
		 */
		directOpenMenu:function(menuId,purl){
			//获取菜单所在模块菜单的索引及父级菜单信息，并打开相应的模块菜单
			var url =ucapSession.baseAction;
			url+="?type=menu&act=getMenuBelong&unid="+menuId+
			"&random="+ucapCommonFun.getRandomString();
			
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			conn.open("GET", url, false);
			conn.send(null);			
			var result = conn.responseText;
			var json = Ext.decode(result);	
			var exResult=ucapCommonFun.dealException(this.json);
			if(!exResult)return;
			
			var modulePos = json.modulePos;  //菜单索引
			var moduleUnid= json.moduleUnid; //菜单对应模块的标识
			
			//定位、打开模块
			if(moduleUnid){
				openMenuByModuleId(moduleUnid);	
			}
			//打开菜单项内容
			if(menuId){
				this.openModule(moduleUnid,menuId,purl);
			}
			//打开模块菜单
			if(modulePos){
				ucapModule.menuView(modulePos);
			}
				
		},
		
		/**
		 * 根据视图标识直接打开视图，比如在首页中的更多等
		 * @param {} viewId 视图标识
		 * @param {} purl 外部传入的条件
		 * @param {} moduleId 模块标识
		 * @param {} menuIndex 菜单位置
		 * @param {} menuId 菜单标识
		 */
		directOpenView:function(viewId,purl,moduleId,menuIndex,moduleIndex,menuId){
			var mi = 0;
			var modulePos = 0;
			var moduleUnid = "";
			if("undefined"==typeof(viewId) || null==viewId || viewId==""){
				Ext.MessageBox("请指定视图标识！");
				return;
			}
			if("undefined"==typeof(moduleId) || "undefined"==typeof(menuIndex) || "undefined"==typeof(moduleIndex)){
				var url =ucapSession.baseAction;
				url+="?type=getView&action=getViewBelong&viewId="+viewId+
				"&random="+ucapCommonFun.getRandomString();

				var conn = Ext.lib.Ajax.getConnectionObject().conn;
				conn.open("GET", url, false);
				conn.send(null);			
				var result = conn.responseText;
				//alert(result);
				var json = Ext.decode(result);	
				var exResult=ucapCommonFun.dealException(this.json);
				if(!exResult)return;
				
				moduleUnid = json.moduleUnid;
				mi = json.position;
				modulePos = json.modulePos;
			}else{
				moduleUnid = moduleId;
				mi = menuIndex;
				modulePos = moduleIndex;
			}
			//先打开菜单
			if(mi>0)
			{//modify by fsm
				FunOve(mi);
			}
			else
			{//说明  json.position==0，指没权限查看，所以打不开  modify by fsm
				return;
			}
			if(null==moduleUnid || moduleUnid==""){
				this.openView(viewId,"true","",purl);
			}else{
				this.openModule(moduleUnid,viewId,purl);
				if("undefined"!=typeof(modulePos) && modulePos>0)ucapModule.menuView(modulePos);
			}
		},
		openUrl : function(id) {
			window.open(id);
		},
		openModule : function(id,firstViewId,purl) {
			ucapModule.setModuleHtml(id, ucapSession.ucapModuleId,firstViewId,purl);
			ucapCommonFun.autoMenuHeight();
		},
		/**
		 * 首页上的打开文档(不是流程)代码
		 * 
		 * @param {}
		 *            id
		 */
		openDoc : function(id) {
			window.open(id);
		},
		/**
		 * 根据表单类型和表单标识进行新建文档
		 * @param {} formType 表单类型
		 × @param {} formId   表单标识
		 * @param {} heigtht  打开文档的高度，可以传入此参数
		 * @param {} width    打开文档的宽度，可以传入此参数
		 * @param {} type 打开方式，不存在时为按系统默认的打开方式
		 */
		newDocument:function(formType,formId,height,width,purl,type){
			 //无流程的打开
			var url = ucapCommonFun.getDocUrl("",formId,formType,purl);
			ucapCommonFun.ucapOpenDoc(url,0,(type||""),height,width);
		}
	},
	getDocJspPath:function(){
		var url = "";
		var docJspName = "document.jsp";
		try{
			docJspName = view.viewBaseInfos[(view.index||0)].jspUrl||docJspName;
		}catch(e){}
		if(docJspName!=null && docJspName.indexOf("/")>-1){
			url = ucapSession.appPath + docJspName;
		}else{
			url = ucapSession.appPath +"sys/jsp/"+docJspName;
		}
		return url;
	},
	getDocUrl:function(unid,formId,formType,purl){
		 //无流程的打开
		var url = ucapCommonFun.getDocJspPath();
		url+="?unid="+(unid||"")+"&type="+formType+"&formId="+formId+"&"+(purl||"");
		return url;
	},
	/**
	 * 新建流程的函数 没有参数（全部流程）
	 * 
	 * @openType 打开类型 如果为空，则以系统配置的为主 0 表示 新窗口，1表示当前窗口 2表示div方式
	 */
	newFlowDoc : function(openType) {
		var par = "0";
		if (typeof openType != "undefined" && openType != "")
			par = par + "~" + openType;
		ucapOpenFlow.openFlowDialog(ucapCommonFun.ucapOpenDoc, par);
	},
	/**
	 * 根据flowIds进行流程的新建
	 * @param {} flowIds
	 * @param openType 打开类型 如果为空，则以系统配置的为主 0 表示 新窗口，1表示当前窗口 2表示div方式
	 * @param parstr e.g.
	 * 					var parstr="key=value&key2=value2";
	 */
	newFlowDocByFlowIds : function(flowIds, openType, parstr) {
		var par = "0";
		if (typeof openType != "undefined" && openType != "")
			par = par + "~" + openType;
		if (typeof parstr != "undefined" && parstr != "")
			par = par + "~" + parstr.replace(/\&/ig,"~");
		ucapOpenFlow.openFlowDialogByFlowIds(flowIds,
				ucapCommonFun.ucapOpenDoc, par);
	},
	/**
	 * 当前打开文档的类型，如果为1，则文档保存时，不进行视图的刷新
	 * 
	 * @type String
	 */
	ucapCurOpenDocViewId : "",// 通过iframe中的视图打开文档时，视图的ID
	ucapCurOpenType : "",//打开类型 0 表示 新窗口，1表示当前窗口 2表示div方式 
	/**
	 * 打开文档的方法
	 * 
	 * @param {}
	 *            url 文档的Url
	 * @param {}
	 *            docType 0表示新建 1表示是旧文档打开（主要是取默认的方式不同） 如果docType有包括
	 *            ~字符串，则必须拆分成两个，一个是docType，另一个是 type
	 * @param {}
	 *            type 打开类型 0 表示 新窗口，1表示当前窗口 2表示div方式 如果为空，
	 *            则默认以 界面方案中的配置类型进行打开，或以视图中的配置为主
	 * @param {}
	 *            height 如果是div方式，则表示div的高度
	 * @param {}
	 *            width 如果是div方式，则表示div的宽度
	 * @param openST 文档打开来源类型01代表频道 02通过嵌入JSP的视图
	 * @param viewDocOpenType 频道视图文档打开方式00代表新窗口，02代表DIV窗口，【暂不使用01当前窗口】
	 */
	ucapOpenDoc : function(url, docType, type, height, width,openST,viewDocOpenType) {
		var purl = "";
		if ((typeof url == "undefined") || url == "") {
			Ext.Msg.alert("提示信息", "打开文档的Url不能为空!");
			return;
		}
		if (typeof docType == "undefined") {
			Ext.Msg.alert("提示信息", "文档的类型docType不能为空");
			return;
		}
		if (docType == "")
			docType = "0";
		if ((docType + "").indexOf("~") > -1) {
			var ts = (docType + "").split("~");
			docType = ts[0];
			if (typeof type == "undefined" || type == "") {
				type = ts[1];// changed by llp 09-06-08 ts.length-1
			}
			if (ts.length > 2) {
				purl = ts[2];
			}
		}
		docType = parseInt(docType, 10);
		if (typeof type == "undefined" || type == "") {
			var viewId = "";
			if(view && view.viewBaseInfos && view.viewBaseInfos.length){
				viewId = view.viewBaseInfos[0].viewId;
			}
			//增加判断是否有视图配置的值 yjy 2010-5-11 add
			if (docType == 0) {
				//mdf by jc 20100622
				var curNewDocType ="";
				if( window.top.ucapSession){
					curNewDocType = window.top.ucapSession.getViewCache(viewId,"opendocType");
				}else{
					curNewDocType = ucapSession.getViewCache(viewId,"opendocType");
				}
				//99-与系统默认一致modify by zh 2010-5-13
				if (null!=curNewDocType && curNewDocType !="" && curNewDocType !="99"){
					type = curNewDocType;
				} else{				
					type = ucapSession.newdocType;
				}
			} else {
				var curOpenDocType ="";
				if(window.top.ucapSession){
					curOpenDocType = window.top.ucapSession.getViewCache(viewId,"opendocType");
				}else{
					curOpenDocType = ucapSession.getViewCache(viewId,"opendocType");
				}
				if (null!=curOpenDocType && curOpenDocType !="" && curOpenDocType !="99"){
					type = curOpenDocType;
				} else {	
					type = ucapSession.opendocType;
				}
			}
			//频道中有流程的视图打开也要根据频道的打开方式打开 mdf by jc 20100913
			if((openST && "01"==openST) || ucapCommonFun.getUrlParameter("openST",url)){
				if(!viewDocOpenType){
					type = ucapCommonFun.getUrlParameter("viewDocOpenType",url)||"";
				}
				type = viewDocOpenType||"00";
			}
			type =parseInt(type,10);
		}
		var title = docType == 0 ? "文档新建" : "文档打开";
		type = parseInt(type, 10);
		var windoc = window;
		ucapCommonFun.ucapCurOpenDocViewId = "";
		if (window.top != window.self) {
			// 说明是在iframe中打开
			if(window.parent.ucapCommonFun)windoc = window.parent;
			windoc.ucapCommonFun.ucapCurOpenDocViewId = view.viewId;
		}
		// 获取当前url中r的值，即判断打开的文档是否可编辑
		var r = ucapCommonFun.getUrlParameter("r");
		if (r == "0" && r != "") {
			url = url + "r=" + r;
		}
		// add by llp ，以便可以接收外部参数，但在这边必须注意，purl中的参数名称不能和之前url中的参数名称重复
		if (null != purl && purl != "") {
			url += purl;
		}
		var divUrl = "&div=1";//用div弹出及在iframe中打开文档不要头部及底部
		windoc.ucapCommonFun.ucapCurOpenType = type;
		if (type == 1) {
			if(url.indexOf("&div=1")<0){
				url+=divUrl;
			}
			// 当前窗口 以 iframe 方式打开
			windoc.ucapCommonFun.moduleMenuClk(url, "02", "03",title);
		} else if (type == 2) {
			if(url.indexOf("&div=1")<0){
				url+=divUrl;
			}
			windoc.ucapCommonFun.ucapOpenDiv(url, height, width, windoc, title);
		} else {
			var top = 0;
		    var left = 0;
		    if(!width){
		        width = screen.availWidth-10;
		    }else{
		        left = (screen.availWidth-width)/2;
		    }
		    if(!height){
		        height = screen.availHeight-40;
		    }else{
		        top = (screen.availHeight-height)/2;
		    }
		    //winId不重复打开旧文档 modify by jc 20100420
		    //增加ucapTabid作为IE弹出弹的ID，允许同一个文档,在不同的ucapTabid时，可以打开多份 mdf by jc 20100716
		    var winId = ucapCommonFun.getUrlParameter("ucapTabid",url)||"";
		    winId = winId||ucapCommonFun.getUrlParameter("unid",url)||"";
		    //winId不允许出现-，帮增加下面代码 mdf by jc 20100830
		    winId = (winId||"").replace(/[-]/ig,"");
		    window.open(url,winId,"loaction=no,fullscreen=no,status=yes,toolbar=no," +
					"scrollbars=no,menubar=no,resizable=yes,top="+top+",left="+left+",width="
					+(width)+",height="+(height));		
			
		}
	},
	/**
	 * 根据参数打开表单
	 * @param {} unid 文档记录
	 * @param {} formId 主表单ID
	 * @param {} formType 主表单类型
	 * @param {} width	宽度
	 * @param {} height	高度
	 * @param {} purl 其它URL
	 */
	openViewDocList:function(unid,formId,formType,width,height,purl){
		//以下为默认值
		unid = unid||ucapCommonFun.getUrlParameter("unid")||"";
		//formId = formId||ucapCommonFun.getUrlParameter("formId");
		//formType = formType||ucapCommonFun.getUrlParameter("type");
		purl = purl||"";
		if(purl=="")purl += "&ucapTabid=tab_"+unid;
		//无流程的打开
		var docUrl = ucapCommonFun.getDocUrl(unid,formId,formType,(purl||""));
		window.open(docUrl);
		ucapCommonFun.ucapOpenDoc(docUrl,0,"",height,width);
	},
	/**
	 * 根据主文档UNID打开从表记录，有记录则打开，无记录则新建
	 * @param {} formId 表单id
	 * @param {} formType 表单类型
	 * @param {} width 宽度
	 * @param {} height 高度
	 * @param {} isNew 是否获取原有数据【0或1,false或true】
	 * @param {} purl URL上其它需要的固定参数
	 * @param {} otherActionUrl 旧文档otherActionUrl
	 * @param {} unid主文档UNID
	 * @param {} 从表formId对应主表单的表单unid
	 * @param {} 从表formId对应主表单的表单类型
	 * @param {} type打开方式，不存在时为按系统默认的打开方式
	 */
	openDocument:function(formId,formType,width,height,isNew,purl,otherActionUrl,unid,fformUnid,fformType,type){
		if(!formId || !formType){
			Ext.Msg.alert("系统提示","函数缺少参数【表单UNID、表单类型】!");
			return;
		}
		//主文档UNID
		unid = unid||ucapCommonFun.getUrlParameter("unid")||"";
		var mid = _UcapForm.cfg.mainUnid;//可能是显示表单和表单
		//var mainForm = _UcapForm.handler.getFormById(mid);//主表单对象
		//mid = mainForm?mainForm["form"]["unid"]:"";//主表单UNID
		//设置主表信息URL
		purl = (purl||"")+"&fformUnid="+mid+"&funid="+(unid||"");
		//新建一份从表文档
		var newDoc = function(){
			ucapCommonFun.indexOpen.newDocument(formType,formId,height,width,purl,type);
		}
		if(isNew=="" || !isNew)isNew=0;
		if(isNew==1){
			//直接打开无流程的新建文档
			newDoc();
		}else{
			fformUnid = fformUnid||ucapCommonFun.getUrlParameter("formId")||"";
			fformType = fformType||ucapCommonFun.getUrlParameter("type")||"";
			var ps = "type=getForm&act=getDocIsNew&unid="+unid+"&fformUnid="+fformUnid+"&fformType="+fformType
						+"&formId="+formId+"&formType="+formType+"&";
			//根据从表的表单formId、formType，及主表的表单id、文档unid及表单类型，获取记录是否存在，存在则isNew=0
			var requestConfig = {
				url:(otherActionUrl||ucapSession.baseAction),
				params:ps,
				callback:function(options,success,response){
					if (success){
						var flag = response.responseText;
						if(flag=="0")isNew=0;
						if(isNew!=1 && flag){
							flag = Ext.decode(flag);
							 //无流程的打开
							var docUrl = ucapCommonFun.getDocUrl(flag.unid,formId,formType,purl);
							//以系统默认的打开方式打开
							ucapCommonFun.ucapOpenDoc(docUrl,0,(type||""),height,width);
						}else{
							newDoc();
						}
					}
				}
			};
			Ext.Ajax.request(requestConfig);
		}
	},
	/**
	 * 以div的方式打开
	 * 
	 * @param {}
	 *            url iframe的地址
	 * @param {}
	 *            height 高度
	 * @param {}
	 *            width 宽度
	 * @param {}
	 *            windoc 要在那个window中打开
	 * @param {}
	 *            title 打开的标题
	 */
	ucapOpenDiv : function(url, height, width, windoc, title) {
		if (!windoc)
			windoc = window;
		if (typeof height == "undefined" || height == "") {
			height = windoc.document.body.clientHeight - 30;
		}
		if (typeof width == "undefined" || width == "") {
			width = windoc.document.body.clientWidth - 100;
		}
		if(url.indexOf("&div=1")<0){
			url = url + "&div=1";
		}
		var iframeId = "_UcapOpenDociFrame";
		// add by jc 20090618 防止同时打开二个三级DIV界面时出现问题
		if ($(iframeId)) {
			iframeId = "_UcapOpenDociFrame1";
		}
		var html = ' <iframe id="'
				+ iframeId
				+ '" name="_UcapSaveiFrame" '
				+ ' width="100%" height="100%" frameborder="0"  src=""></iframe>';
		windoc.ucapSession.docWin = new windoc.Ext.Window({
					id:"openDocDiv",
					title : ucapSession.win.winImg + title,
					width : width,
					closable : true, // 关闭
					maximizable : true, // 最大化
					modal : true,
					height : height,
					bodyStyle : ucapSession.win.winBodyStyle,
					html : html,
					
					/**
					 * 事件
					 */
					listeners:{
						/**
						 * 窗口移动事件
						 */
						move:function(win,x,y){
							var clientHeight = document.body.clientHeight;
							var clientWidth = document.body.clientWidth;
							var isReturn = true;
							if(x<0 && (x+win.getWidth)<0){
								x = 20-win.getWidth;
								isReturn = false;
							}
							if(x>clientWidth-30){
								x =clientWidth-30;
								isReturn = false;
							}
							if(y<0){
								y=0;
								isReturn = false;
							}
							if(y>clientHeight){
								y = clientHeight-30;
								isReturn = false;
							}
							if(isReturn)return;
						    win.setPosition(x,y);
						}//end move
					}//end listeners
				});
		windoc.ucapSession.docWin.show();
		windoc.Ext.getDom(iframeId).src = url;
	},
	/**
	 * 视图按钮相关显示与否的判断
	 * 
	 * @type
	 */
	viewButton : {
		/**
		 * 父文档是否为只可编辑，则返回真
		 * 
		 * @return {}
		 */
		fatherDocIsEdit : function() {
			if (window.parent) {
				return window.parent._UcapForm.cfg.isRead == 1;
			} else {
				return true;
			}
		}
	},
	buttonFun : {
		/**
		 * 修改用户信息
		 */
		modifyUser : function(unid, deptUnid) {
			var docJspPath = ucapCommonFun.getDocJspPath();
			window
					.open(docJspPath
							+ "?unid="
							+ unid
							+ "&type=03&formId=4A4357091F6399787EA58F85824F6E2F&deptUnid="
							+ deptUnid);
		},
		/**
		 * 切换用户身份 用户身份有 应用系统管理员 部门管理员 或 个人，如果当前用户只是个，则隐藏此操作 按钮的名称不能改
		 */
		changeUserStatus : function() {
			
			//2012-09-28 mdy by wyongjian@linewell.com
			//判断当前会话是否过期，过期则跳转到登录页面
			//解决BUG1107-页面长时间未进行操作，超时后，点击首页上的快捷方式，页面一片空白，建议跳转到登录页面的问题
			ucapCommonFun.isSessionOut();
			var html = "sys/cfgJsp/portal/selectUserStatus.jsp";
			var button = [{
						text : "确定",
						handler : function() {
							ucapButtonFunConfirm.changeUserStatusConfirm();
						}
					}, {
						text : "取消",
						handler : function() {
							ucapSession.commonWin.close();
						}
					}];
			ucapSession.commonWin = new Ext.Window({
						title : ucapSession.win.winImg + "切换用户身份",
						width : 210,
						closable : true, // 关闭
						modal : true,
						height : 300,
						bodyStyle : ucapSession.win.winBodyStyle,
						autoLoad : {
							url : ucapSession.appPath + html,
							scripts : true,
							nocache : true
						},
						buttons : button
					});
			ucapSession.commonWin.show();
		},
		/**
		 * 注销
		 */
		loginOut : function() {
			var requestConfig = {
				url : ucapSession.baseAction,
				params : {
					"type" : "loginWriteOff"
				},
				callback : function(options, success, response) {
					if (success) {
						var exjson = Ext.util.JSON
								.decode(response.responseText);
						var exResult = ucapCommonFun.dealException(exjson);
						if (!exResult)
							return;
						window.location = ucapSession.appPath + "login.jsp?loginOut=true";
						
					} else {
						Ext.Msg.alert("提示", "注销不成功，请重试！");
					}
				}
			}
			Ext.Ajax.request(requestConfig);
			
		},
		/**
		 * 切换系统
		 * 
		 * @param {}type
		 *            有值 说明是在 login中调用
		 */
		changeSystem : function(type) {
			
			//2012-09-28 mdy by wyongjian@linewell.com
			//判断当前会话是否过期，过期则跳转到登录页面
			//解决BUG1107-页面长时间未进行操作，超时后，点击首页上的快捷方式，页面一片空白，建议跳转到登录页面的问题
			ucapCommonFun.isSessionOut();
			if (typeof(type) == "undefined")
				type = "";
			loginType = type; // 是全局变更
			var html = "login/appSelect.jsp";
			var button = [{
						id:"changeSystemBtn",//设置确定按钮的id值
						text : "确定",
						
						//2012-03-27 mdy by fshaoming@linewell.com  
						//当数据加载完之前禁用确定按钮，以防止数据没加载完直接点击确定导致脚本报错
						disabled:true,
						handler : function() {
							ucapButtonFunConfirm.changeSystemConfirm();
						}
					}, {
						text : "取消",
						handler : function() {
							ucapSession.commonWin.close();
						}
					}];
			var title = "切换应用系统";
			if (type == "style") {
				title = "切换风格";
			}
			// modify by jc 解决登录时连续按两次回车时出现空的选择系统对话框的问题 20090914
			if (!Ext.get("ucap_loginWindow"))
				ucapSession.commonWin = new Ext.Window({
							id : "ucap_loginWindow",
							title : ucapSession.win.winImg + title,
							width : 500,
							closable : true, // 关闭
							modal : true,
							height : 420,
							autoScroll : true,
							bodyStyle : ucapSession.win.winBodyStyle,
							autoLoad : {
								url : ucapSession.appPath + html,
								scripts : true,
								nocache : true
							},
							buttons : button,
							//add by cjianyan@linewell.com 2011-6-1
							keys:[{ //处理键盘回车事件    
						         key:Ext.EventObject.ENTER,    
						         fn:function(){
						         	ucapButtonFunConfirm.changeSystemConfirm();
						         },    
						         scope:this   
						    }]  
						    //end
						});
			ucapSession.commonWin.show();
		},

		// 根据界面方案中不同的类型，进行转向
		gotoIndex : function(scheme) {
			var type = scheme.indexType;
			var index = scheme.index;
			
			//2012-09-01 add　by cxifu@linewell.com 实现可以登录后立即打开指定的菜单 
			//获取需要中转的菜单Id
			var menuId = scheme.menuId;
			if(null==menuId && typeof(menuId)=="undefined"){
				menuId="";
			}else{
				menuId="?menuId="+menuId;
			}
			//end add by cxifu@linewell.com
			
			if (typeof(type) == "undefined") {
				type = "01";
			}
			var iType = parseInt(type, 10);
			var indexJsp = "sys/jsp/index.jsp"+menuId;
			if (iType == 1 || iType == 2) {
				window.location.href = ucapSession.appPath + indexJsp;
			} else if (iType == 3) {
				// 打开URL
				window.location.href =index;
				//ucapCommonFun.indexOpen.openUrl(index);
			}
		},
		/**
		 * 用户自定义操作
		 */
		userDefine : function() {
			
			//2012-09-28 mdy by wyongjian@linewell.com
			//判断当前会话是否过期，过期则跳转到登录页面
			//解决BUG1107-页面长时间未进行操作，超时后，点击首页上的快捷方式，页面一片空白，建议跳转到登录页面的问题
			ucapCommonFun.isSessionOut();
			var title = "";
			if (ucapSession.userJson.userStatus == 3) {
				title = "个人自定义";
			} else if (ucapSession.userJson.userStatus == 2) {
				title = "部门自定义";
			} else {
				title = "应用系统管理员自定义";
			}
			var html = "sys/cfgJsp/portal/userDefine.jsp";
			var button = [{
						text : "关闭",
						handler : function() {
							ucapSession.userDefineWin.close();
						}
					}];
			ucapSession.userDefineWin = new Ext.Window({
						title : ucapSession.win.winImg + title,
						width : 210,
						closable : true, // 关闭
						modal : true,
						height : 330,
						bodyStyle : ucapSession.win.winBodyStyle,
						autoLoad : {
							url : ucapSession.appPath + html,
							scripts : true,
							nocache : true
						},
						buttons : button
					});
			ucapSession.userDefineWin.show();
		},
		/**
		 * 切换菜单样式
		 */
		changeMenuStyle : function() {
			var html = "sys/cfgJsp/portal/selectMenuType.jsp";
			var button = [{
						text : "确定",
						handler : function() {
							ucapButtonFunConfirm.schemeConfirm();
						}
					}, {
						text : "取消",
						handler : function() {
							ucapSession.commonWin.close();
						}
					}];
			ucapSession.commonWin = new Ext.Window({
						title : ucapSession.win.winImg + "切换菜单类型",
						width : 510,
						closable : true, // 关闭
						modal : true,
						height : 320,
						bodyStyle : ucapSession.win.winBodyStyle,
						autoLoad : {
							url : ucapSession.appPath + html,
							scripts : true,
							nocache : true
						},
						buttons : button
					});
			ucapSession.commonWin.show();
		},
		/**
		 * 切换导航栏样式
		 */
		changeNavStyle : function() {
			var html = "sys/cfgJsp/portal/selectNavType.jsp";
			var button = [{
						text : "确定",
						handler : function() {
							ucapButtonFunConfirm.schemeConfirm();
						}
					}, {
						text : "取消",
						handler : function() {
							ucapSession.commonWin.close();
						}
					}];
			ucapSession.commonWin = new Ext.Window({
						title : ucapSession.win.winImg + "切换导航栏类型",
						width : 210,
						closable : true, // 关闭
						modal : true,
						height : 200,
						bodyStyle : ucapSession.win.winBodyStyle,
						autoLoad : {
							url : ucapSession.appPath + html,
							scripts : true,
							nocache : true
						},
						buttons : button
					});
			ucapSession.commonWin.show();
		},
		/**
		 * 更改导航栏内容
		 */
		setNavContent : function() {
			var html = "sys/cfgJsp/nav/nav.jsp";
			var cut = "";
			if (ucapMenu.navigation && ucapMenu.navigation.navigation
					&& ucapMenu.navigation.navigation.shortcutCondition) {
				cut = ucapMenu.navigation.navigation.shortcutCondition;
			}
			html += "?cut=" + cut;
			var button = [{
						text : "确定",
						handler : function() {
							ucapButtonFunConfirm.navConfirm();
						}
					}, {
						text : "取消",
						handler : function() {
							ucapSession.commonWin.close();
						}
					}];
			ucapSession.commonWin = new Ext.Window({
						title : ucapSession.win.winImg + "导航栏内容定制",
						width : 410,
						closable : true, // 关闭
						modal : true,
						height : 240,
						bodyStyle : ucapSession.win.winBodyStyle,
						autoLoad : {
							url : ucapSession.appPath + html,
							scripts : true,
							nocache : true
						},
						buttons : button
					});
			ucapSession.commonWin.show();
		},
		/**
		 * 设置快捷方式
		 */
		setCuts : function() {
			var html = "sys/cfgJsp/cut/cut.jsp";
			var button = [{
						text : "关闭",
						handler : function() {
							ucapSession.commonWin.close();
						}
					}];
			ucapSession.commonWin = new Ext.Window({
						title : ucapSession.win.winImg + "快捷方式定制",
						width : 310,
						closable : true, // 关闭
						modal : true,
						height : 240,
						bodyStyle : ucapSession.win.winBodyStyle,
						autoLoad : {
							url : ucapSession.appPath + html,
							scripts : true,
							nocache : true
						},
						buttons : button
					});
			ucapSession.commonWin.show();
		},
		/**
		 * 界面方案设置
		 */
		setScheme : function() {
			var html = "sys/cfgJsp/portal/setScheme.jsp";
			var height = 230;
			if (ucapSession.userJson.userStatus != 3) {
				html = "sys/cfgJsp/unit/setScheme.jsp";
				height = 340;
			}
			var button = [{
						text : "确定",
						handler : function() {
							//如果上传框有值，则先进行logo的上传  modify by csj 2010.5.5
							var json = ucapCommonFun.getFormJSon("dialogHtml");
							if(json["file"]&&json["file"]!=""){
								ucapButtonFunConfirm.schemeLogoConfirm();
							}else{
							  ucapButtonFunConfirm.schemeConfirm();
							}
						}
					}, {
						text : "取消",
						handler : function() {
							ucapSession.commonWin.close();
						}
					}];
			ucapSession.commonWin = new Ext.Window({
						title : ucapSession.win.winImg + "界面方案设置",
						width : 500,
						closable : true, // 关闭
						modal : true,
						height : height,
						bodyStyle : ucapSession.win.winBodyStyle,
						autoLoad : {
							url : ucapSession.appPath + html,
							scripts : true,
							nocache : true
						},
						buttons : button
					});
			ucapSession.commonWin.show();
		},
		/**
		 * 恢复默认
		 */
		recover : function() {
			if (ucapSession.userJson.userStatus == 1) {
				Ext.Msg.alert("提示", "你当前身份是应用系统管理员，不能进行恢复操作！")
				return;
			}
			var html = "sys/cfgJsp/portal/recover.jsp";
			var button = [{
						text : "确定",
						handler : function() {
							ucapButtonFunConfirm.recoverConfirm();
						}
					}, {
						text : "取消",
						handler : function() {
							ucapSession.commonWin.close();
						}
					}];
			ucapSession.commonWin = new Ext.Window({
						title : ucapSession.win.winImg + "恢复默认设置",
						width : 210,
						closable : true, // 关闭
						modal : true,
						height : 290,
						bodyStyle : ucapSession.win.winBodyStyle,
						autoLoad : {
							url : ucapSession.appPath + html,
							scripts : true,
							nocache : true
						},
						buttons : button
					});
			ucapSession.commonWin.show();
		},
		/**
		 * 切换布局
		 */
		changeLayout : function() {
			
			//2012-09-28 mdy by wyongjian@linewell.com
			//判断当前会话是否过期，过期则跳转到登录页面
			//解决BUG1107-页面长时间未进行操作，超时后，点击首页上的快捷方式，页面一片空白，建议跳转到登录页面的问题
			ucapCommonFun.isSessionOut();
			var html = "sys/cfgJsp/portal/selectLayout.jsp";
			var button = [{
						text : "确定",
						handler : function() {
							ucapButtonFunConfirm.changeLayoutConfirm();
						}
					}, {
						text : "取消",
						handler : function() {
							ucapSession.commonWin.close();
						}
					}];
			ucapSession.commonWin = new Ext.Window({
						title : ucapSession.win.winImg + "切换布局",
						width : 550,
						closable : true, // 关闭
						modal : true,
						height : 430,
						bodyStyle : ucapSession.win.winBodyStyle,
						autoLoad : {
							url : ucapSession.appPath + html,
							scripts : true,
							nocache : true
						},
						buttons : button
					});
			ucapSession.commonWin.show();
		},
		
		setMainPage : function() {
			//return ' onclick="this.style.behavior=\'url(#default#homepage)\';'+ 'this.setHomePage(\'' + window.location + '\');" ';
			return 'onclick="ucapCommonFun.buttonFun.setHome(this);"';
		},
		//兼容ie与火狐 ，设置主页
		setHome:function (obj){
        	try{
                obj.style.behavior='url(#default#homepage)';
                obj.setHomePage(window.location);
        	} catch(e){
                if(window.netscape) {
                        try {
                            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                        } catch (e) {
                            alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
                        }
                        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                        prefs.setCharPref('browser.startup.homepage',window.location);
                 }
        	}
		},		
		analogDept : function() {
			alert("analogDept");
		},
		/**
		 * 加为收藏
		 */
		favorites : function() {
			//兼容IE及火狐,收藏夹 mdf by jc 20100915
			var title = window.title,url=window.location.href;
			var ua = navigator.userAgent.toLowerCase();
			try {
				window.external.addFavorite(url, title);
			} catch(e) {
				try {
					if(ua.indexOf("msie 8")>-1){
						window.external.AddToFavoritesBar(url,title,"");//IE8
					}else{
						window.sidebar.addPanel(title, url, "");//firefox
					}
				} catch(e) {
					alert("加入收藏失败，请使用Ctrl+D进行添加");
				}
			}
			
		return false;
		}
	},
	/**
	 * 绑定表单的属性及赋值
	 * 
	 * @param {} object,string
	 *            json 格式:{字段名称:{字段属性:属性值},字段名称:{字段属性:属性值}……}
	 *            e.g.{'input_select':{'temp':'tempvalue','value':'0','DictMap':{'key':'字典名',value:'值'}}}
	 * @param {} boolean
	 *            applyIf 是否覆盖对象已经存在的属性,默认为false不覆盖
	 * @param string 
	 * 			   postfixId 表单多记录扩展ID后缀
	 * 
	 * @param  int
	 * 				flag   =1 直接赋值
	 * 
	 * @return {Boolean}
	 */
	bindForm : function(json, applyIf,postfixId,flag) {
		// json格式:{字段名称:{字段属性:属性值},字段名称:{字段属性:属性值}……}
		// json =
		// "{'input_select':{'temp':'tempvalue','value':'0','DictMap':{'key':'字典名',value:'值'}}}";
		// alert(Ext.encode(json));
		if (Ext.isEmpty(json))
			return false;
		if (Ext.type(json) == 'string') {
			json = json.replace(/\n|\r/g, " ");
			json = Ext.util.JSON.decode(json);
		}
		if (Ext.type(json) == 'object') {
			var _v = "";
			var _domClick = function(path, o) {
				//对象的单击事件：主要用于checkbox，radio初始化选中状态
				try {
					path = path.replace(/(,)$/, "");
					var objs = Ext.DomQuery.select(path, o);
					Ext.each(objs, function(obj) {
								// alert(Ext.getDom("fitem_default_value").getAttribute("sourceType"));
								obj.click();
							});
				} catch (e) {
					alert(e.description);
				}
			};
			var getPDiv = function(ooo) {
				//返回当前对象最近的一个DIV窗口对象,用于单击事件中缩小范围select查找对象
				var fg = false;
				if (ooo) {
					var op = ooo.parentNode;
					if (op && op.tagName.toLowerCase() == "div") {
						fg = op;
					} else {
						fg = getPDiv(op);
					}
				}
				return fg;
			};
			for (var oldFkey in json) {
				var fkey = oldFkey+((postfixId && Ext.type(postfixId) == 'string')?postfixId:"");
				var o = Ext.getDom(fkey) || Ext.query("[id=" + fkey + "]")
						|| Ext.query("#" + fkey + "");
				if (typeof o == "undefined" || o == "" || o == null)
					continue;
				if (o && json[oldFkey] && Ext.type(json[oldFkey]) == 'object') {
					try {
						// 事件
						var bindEvs = function() {
							var itemEvs = json[oldFkey]["itemEvents"];
							if (itemEvs)
								for (var k = 0; k < itemEvs.length; k++) {
									var iev = itemEvs[k];
									// var ttt = "on"+iev["EType"];
									// Ext.apply(obe,{ttt:function(){alert();}});
									var allobj = Ext.query('[name=' + fkey
											+ '],[id=' + fkey + ']');
									for (var i = 0; i < allobj.length; i++) {
										Ext.get(allobj[i]).on(iev["eType"],
												function() {
													var obe = this;
													eval(iev["eValue"]
															+ "(obe)");
												}, allobj[i]);
									}

								}
						};
						bindEvs();
						// 属性赋值
						if (Ext.type(o) != "array") {
							if (!applyIf)
								Ext.applyIf(o, json[oldFkey]);
							else
								Ext.apply(o, json[oldFkey]);
						} else {
							o = o[0];
						}
						// 选择框、赋值
						// alert(Ext.encode(json[fkey]['value']));
						// _v = json[fkey]['value'];
						_v = json[oldFkey]['value'];
						// _v = "01"+ucapSession.fvs_sp+"02";
						switch (o.tagName.toLowerCase()) {
							case 'input' : {
								var oType="";
								if(ucapCommonFun.getAttr(o,"type")){//当没type这个属性时，firefox浏览器会报错
									oType=ucapCommonFun.getAttr(o,"type").toLowerCase();
								}
								switch (oType) {
									case 'checkbox' : {
										var rdv = _v;
										var path = "";
										if (Ext.type(rdv) == "array") {
											// 三级界面用到的数组值
											for (var i = 0; i < rdv.length; i++) {
												var v = _v[i]["value"] || "";
												path += '[id=' + fkey
														+ '][value="' + v
														+ '"],';
											}
										} else if (Ext.type(rdv) == "string") {
											// 二级界面用到的string值
											if (_v.indexOf(ucapSession.fvs_sp) > -1) {
												var ay_v = _v
														.split(ucapSession.fvs_sp);
												Ext.each(ay_v, function(v) {
															path += '[id='
																	+ fkey
																	+ '][value="'
																	+ v + '"],';
														});
											} else {
												path = '[id=' + fkey
														+ '][value="' + _v
														+ '"],';
											}
										}
										if (path)
											_domClick(path, getPDiv(o));
										break;
									}
									case 'radio' : {
										if (_v && _v[0]
												&& Ext.type(_v) != "string")
											_v = _v[0]["value"] || "";
										var path = '[id=' + fkey + '][value="'
												+ _v + '"],';
									    //初始化checked值，避免没有值时显示之前页的旧值的情况  cgc@2011-6-23
										if(""==_v){//添加值是否为空的判断  cgc@2011-8-29
											var objs = document.getElementsByName(o.id);
											for (var i = 0; i < objs.length; i++) {
												objs[i].checked = false;
											}
										}		
										_domClick(path, getPDiv(o));
										break;
									}
									default : {
										var cnObj = Ext.getDom(fkey + "_Cn_");
										if (_v && _v[0]
												&& Ext.type(_v) != "string") {

											if (cnObj)
												cnObj.value = "";
											Ext.each(_v, function(v, n) {
												var vt = v["text"];
												var vv = v["value"];
												//2012-10-11 add by chuiting@linewell.com
												//BUG1266如果标题中含有英文的单或双引号，并且该字段被流程中短信提示内容中引用，
												//则提交办理无法提交
												//表单字段显示内容包含有实体编号:（"&#60;"、"&#62;"、"&#38;"、"&#39;"、"&#34;"）
												//反转义替换为（小于号<、大于号>、与&、单引号'、双引号"）
												vt = ucapCommonFun.specialCharRep(vt);
												vv = ucapCommonFun.specialCharRep(vv);
												//end 2012-10-11 mdf by chuiting@linewell.com
												if (cnObj) {
													if (n == 0) {
														_v = (vv == undefined
																? vt
																: vv);
														cnObj.value = vt;
													} else {
														cnObj.value += ucapSession.fvs_sp
																+ vt;
														_v += ucapSession.fvs_sp
																+ (vv == undefined
																		? vt
																		: vv);
													}
												} else {
													if (n == 0) {
														_v = (vt == undefined
																? vv
																: vt);
													} else {
														_v += ucapSession.fvs_sp
																+ (vt == undefined
																		? vv
																		: vt);
													}
												}
											});
										}
										//新文档时HTML页面有默认值的时候不覆盖HTML上value的默认值modify by jc 20100702
										if(!flag&&(!ucapCommonFun.getAttr(o,"sourceType") || ucapCommonFun.getAttr(o,"sourceType")=="01")){
											//新文档及手工输入时以页面的默认值为准
											if(!o.value || o.value==""){
												o.value=_v;
											}else{
												var unid = ucapCommonFun.getUrlParameter("unid");
												if(unid)o.value=_v;
											}
										}
										else
										{
											//if(flag&&flag==1)
											o.value = _v;
										}
										//o.value = _v;
										//进行input特效的的绑定
										if(!ucapCommonFun.getAttr(o,"id")) ucapCommonFun.setAttr(o,"id",ucapCommonFun.getAttr(o,"name"));
										if(ucapCommonFun.getAttr(o,"dictionaryType")!="07"){
											//只读页面及录入助手中屏蔽以下焦点事件 mdf by jc 20100610
										    Ext.get(o).on('focus',function(){$(this).className='inputbox_focus';});
											Ext.get(o).on('blur',function(){$(this).className='inputbox';this.on("onmouseout",function(){$(this).className='inputbox';});});
											
											//Ext.get(o).on('focus',function(){Ext.get(o).dom.style.background="#CCFFFF";Ext.get(o).dom.style.border="#87B1C7 1px solid";});
											//Ext.get(o).on('blur',function(){Ext.get(o).dom.style.background="#FFFFFF";Ext.get(o).dom.style.border="#87B1C7 1px solid";});
										}
									}
								}
								break;
							}
							case 'select' : {
								if (_v && _v[0] && Ext.type(_v) != "string")
									_v = _v[0]["value"] || _v;
								var path = 'option[value="' + _v + '"]';
								var objs = Ext.DomQuery.select(path, o);
								Ext.each(objs, function(obj) {
											obj.selected = true;
										});
								break;
							}
							default : {
								// span/textarea/button
								if (_v && _v[0] && Ext.type(_v) != "string") {
									var result = _v[0].text;
									for (var n = 1; n < _v.length; n++) {
										result += ucapSession.fvs_sp
												+ _v[n].text;
									}
									_v = result;// 显示值取text、保存值取value
								}
								if (json && json[oldFkey]
										&& json[oldFkey].sourceType == "09") {
									_v = '<a class="red" onclick="window.open(\''
											+ _v
											+ '\');" target="_blank" style="cursor:hand;" title="单击下载文件">单击下载</a>';
								}
								//修改在IE中textarea对象保存不换行的问题。mdf by jc 20101015
								if(Ext.isIE==true){
									if(o.tagName.toLowerCase()=="textarea"){
										o.innerText = _v;
										
										//2012-09-26 add by qtianfa@linewell.com  对textArea控件进行重绘
		                                //解决BUG1248：解决表单设计器添加2个多行文本框，第二个文本框只显示一行数据
										
										//获取原来textarea控件的高度
										var originalHeight = o.offsetHeight;
										var objectHeight =(originalHeight+1)+"px";
										//重绘控件
										o.style.height = objectHeight;
										//end add
									
									}else if (o.innerHTML == undefined){
										o.text = _v;//firefox
									}else{
										o.innerHTML = _v;
									}
								}else{
									o.innerHTML = _v;
								}

							}
						}
						var isRead = json[oldFkey]["readOnly"];
						// isRead = true;
						if (isRead) {
							//修改日期选择框允许只读时可以选择日期 mdf by jc 20100723
							if (json && json[oldFkey]
										&& (json[oldFkey].sourceType == "05"||json[oldFkey].sourceType == "04")) {
								ucapCommonFun.setAttr(o,"readOnly", true);
							}else{
								try {
									var allobj = Ext.query('[name=' + fkey
											+ '],[id=' + fkey + ']');
									var btnId = "btn_" + fkey;
									for (var i = 0; i < allobj.length; i++) {
										//span本来就属于只读不可用，无须进行disabled
										if(allobj[i].tagName.toLowerCase()!="span"){
											ucapCommonFun.setAttr(allobj[i],"disabled", true);
										}
										if($(btnId)){
											//Ext.get(btnId).hide();
											$(btnId).remove();
										}
									}
								} catch (e) {
								}
							}
							ucapCommonFun.setAttr(o,"readOnly", true);
							//屏蔽只读Input的退格键
							Ext.get(o).on("keydown",function(){
								if(window.event.keyCode==8){
									window.event.returnValue=false;//阻止浏览器默认动作的执行
								}
							});
						}
					} catch (e) {
					}
				}
			}
		}
	},
	/**
	 * 获取指定的对象集的JSON
	 * 
	 * @param {}
	 *            form 范围内 div
	 * @param {}
	 *            root
	 * @param {}
	 *            type
	 * @return {Boolean}
	 */
	getFormJSon : function(form, root, type) {
		var formDom = Ext.getDom(form);
		if (!formDom)
			return false;
		form = "div#" + form + " input[type!=button],select,textarea";
		var result = [];
		if (Ext.type(form) == 'string') {
			/*
			 * var _form = Ext.getDom(form);
			 * 
			 * if(_form || Ext.type(_form)=='element'){ //form = _form; }else{
			 * _form = Ext.DomQuery.select(form); if(_form &&
			 * _form.length>0)form=_form; else return false; }
			 */
			// 以上注释换成下面这句
			form = Ext.DomQuery.select(form);
			Ext.each(form, function(obj, n) {
						result[n] = ucapCommonFun.getObjValueJson(obj, "",
								formDom);
					});
		}
		// alert(Ext.util.JSON.encode(result));
		var rjson = {};
		for (var k = 0; k < result.length; k++) {
			var re = result[k];
			rjson[re["k"]] = re["v"];
		}
		// alert(Ext.util.JSON.encode(rjson));
		return rjson;
	},
	/**
	 * 
	 * @param {}
	 *            obj 需要取值的对象
	 * @param {}
	 *            v 表单如果值为空,则用v作默认值
	 * @param {}
	 *            formDom 范围,用于check,radio等
	 * @param {}
	 * 			  aliasName HTML中input的ID与实际的字段名称不同时
	 * 				用于视图表单列表中获取的input的ID与实际表单字段ID不同的时候
	 * @return {}
	 */
	getObjValueJson : function(obj, v, formDom,aliasName) {
		// 进行selected的方法的绑定
		var s = {};
		//保证函数定义过就不在重新定义 mdf by jc 2011-11-30
		if (!Ext.DomQuery.pseudos['selected']){
			Ext.DomQuery.pseudos['selected'] = function(c) {
				//check,select对象的选择器selected的逻辑内容
				var r = [];
				for (var i = 0, l = c.length; i < l; i++) {
					if (c[i].selected == true) {
						r[r.length] = c[i];
					}
				}
				return r;
			};
		}
		formDom = (!formDom) ? document : formDom.dom;
		obj = Ext.getDom(obj);
		if (!obj)
			return s;
		var name = ucapCommonFun.getAttr(obj,"id") || ucapCommonFun.getAttr(obj,"name");
		var value = "";
		// var type = "";
		// result[name]=obj.value;
		switch (obj.tagName.toLowerCase()) {
			case 'input' : {
			var oType="";
				if(ucapCommonFun.getAttr(obj,"type")){//当没type这个属性时，firefox浏览器会报错
					oType=ucapCommonFun.getAttr(obj,"type").toLowerCase();
				}
				switch (oType) {
					case 'checkbox' : {
						var path = 'input:checked[id=' + name + ']';
						var objs = Ext.DomQuery.select(path, formDom);
						value = "";
						Ext.each(objs, function(obj, n) {
									if (n != 0)
										value += ucapSession.fvs_sp;
									value += obj.value;
								});
						break;
					}
					case 'radio' : {
						var path = 'input:checked[id=' + name + ']';
						var objs = Ext.DomQuery.select(path, formDom);
						if (objs && objs.length > 0)
							value = objs[0].value;
						break;
					}
					default : {
						var eeObj = Ext.fly("eWebEditor_" + obj.id);
						if (eeObj) {
							try {
								eval("obj.value = eWebEditor_" + obj.id
										+ ".getHTML()");
								//支持火狐和IE   @modify cguangcong@linewell.com 2011-10-09
								//obj.value = document.getElementById("eWebEditor_" + obj.id).contentWindow.getHTML();
							} catch (e) {
								// alert("获取文本编辑器时出错!");
							}
						}
						value = obj.value;
					}
				}
				break;
			}
			case 'select' : {
				var path = 'option:selected';
				var objs = Ext.query(path, obj);
				if (objs && objs.length > 0)
					value = objs[0].value;
				break;
			}
			case 'span' : {
				value = obj.innerHTML;
				break;
			}
			case 'div' : {
				value = obj.innerHTML;
				break;
			}
			default :
				value = obj.value;
		}
		s["k"] = aliasName||name;
		s["v"] = v || value;
		// s["t"]=type;
		return s;
	},
	/**
	 * 根据json对象对表单中的对象进行设置值
	 * 
	 * @param {}
	 *            json
	 * @param divID
	 */
	setFormValue : function(json, divId) {
//		var jsonStr = "";
//		for (fkey in json) {
//			var v = json[fkey];
//			if (typeof v == "string") {
////				单引号在替换的时候，多替换了一次出现错误  by@cgc 2011-6-15
////				v = v.replace(/'/g, "\\'").replace(/\\/g, "/");
//				v = v.replace(/'/g, "\\'");
//			} else if (v == null || v == undefined) {
//				v = "";
//			}
//			if (jsonStr == "") {
//				jsonStr = fkey + ":{value:'" + v + "'}";
//			} else {
//				jsonStr += "," + fkey + ":{value:'" + v + "'}";
//			}
//		}
//		jsonStr = "{" + jsonStr + "}";
//		this.bindForm(jsonStr, divId);
		//将JSON转成bindForm格式的数据源 mdf by jc 20110615
		var jsonObj = {};
		for (fkey in json) {
			jsonObj[fkey] = {};
			var v = json[fkey];
			jsonObj[fkey].value = v;
		}
//		this.bindForm(jsonObj, divId); 
		this.bindForm(jsonObj, divId,"",1); //解决解决快捷方式集，快捷方式信息没有联动显示的问题  by@cgc 2011-6-21

	},
	getJsonValue : function(field, value) {
		var json = "";
		value[0] += "";
		json += field[0] + ":{value:'" + value[0].replace(/'/g, "\\'") + "'}";
		for (var i = 1; i < field.length; i++) {
			if (typeof(value[i]) != "undefined")
				value[i] += "";
			json += "," + field[i] + ":{value:'"
					+ value[i].replace(/'/g, "\\'") + "'}";
		}
		return json;
	},
	selectTag : function(showContent, selfObj) {
		// 操作标签
		var tag = Ext.getDom("tableCustomMenu").getElementsByTagName("li");
		var taglength = tag.length;
		for (var i = 0; i < taglength; i++) {
			tag[i].className = "";
		}
		selfObj.className = "CustomMenuHover";
		// 操作内容
		for (var i = 0; i < taglength; i++) {
			Ext.getDom("tagContent" + i).style.display = "none";
		}
		Ext.getDom(showContent).style.display = "block";
	},
	/**
	 * 增加下垃项的值
	 * 
	 * @param {}
	 *            oSel
	 * @param {}
	 *            value
	 * @param {}
	 *            text
	 */
	addOption : function(oSel, value, text) {
		if (oSel == null) {
			return;
		}
		oSel.options.add(new Option(text, value));
	},
	/**
	 * 对list中的元素进行上下移动
	 * 
	 * @param {}
	 *            oSel
	 * 
	 * @param {}
	 *            option
	 */
	moveOption : function(oSel, index) {
		var result = false;
		if (null == oSel.options || oSel.options.length < 1) {
			return result;
		}
		for (var i = 0; i < oSel.options.length; i++) {
			var option = oSel.options[i];
			if (option.selected) {
				if (index < 0 && (i + index) < 0)
					return result;
				if (index > 0 && (i + index) > (oSel.options.length - 1))
					return result;
				var v = oSel.options[i].value;
				var it = oSel.options[i].text;//firefox
				oSel.options[i].value = oSel.options[i + index].value;
				oSel.options[i].text = oSel.options[i + index].text;//firefox
				oSel.options[i + index].value = v;
				oSel.options[i + index].text = it;//firefox
				oSel.options[i + index].selected = true;

				result = true;
				break;
			}
		}
		return result;
	},

	/**
	 * 获取url参数如index.htm?id=1 返回1
	 * url将URL中的字符串时进行分解获取参数name的实际值
	 * modify by jc 20100420
	 */
	getUrlParameter : function(name,url) {
		var params = null;
		if(url){
			params = url.replace(/[^\?\&]*(\?|&)/,"").split('&');
		}else{
			params = window.location.search.slice(1).split('&');
		}
		for (var i = 0; i < params.length; i++) {
			var temp = params[i].split("=");
			if (temp[0] == name) {
				//支持值里面有=，如&purl=unid=123&，取出的值为unid=123 mdf by jc 20110311
				return params[i].replace(/^[\w]*=/,"");
			}
		}
		return "";
	},
	isReload : function(sUrl) {
		var paramaters = sUrl.split("?");
		for (var i = 1; i < paramaters.length; i++) {
			var paramater = paramaters[i].split("&");
			for (var i = 0; i < paramater.length; i++) {
				var temp = paramater[i].split("=");
				if (temp[1] && temp[0] == "reload" && temp[1] == "true") {
					return true;
				}
			}
		}
		return false;

	},
	/**
	 * 获取父文档url参数中的值如index.htm?id=1 返回1
	 * 
	 * @param {}
	 *            name
	 * @return {String}
	 */
	getOpenerUrlParameter : function(name) {
		if (!this.haveOpener())
			return "";
		var params = window.opener.location.search.slice(1).split('&');
		for (var i = 0; i < params.length; i++) {
			var temp = params[i].split("=");
			if (temp[0] == name) {
				return temp[1];
			}
		}
		return "";
	},

	/**
	 * 在ifame中获取父窗口的参数
	 * 
	 * @param {}
	 *            name 参数名称
	 * @return {String} 参数值
	 */
	getParentUrlParameter : function(name) {
		var params = window.parent.location.search.slice(1).split('&');
		for (var i = 0; i < params.length; i++) {
			var temp = params[i].split("=");
			if (temp[0] == name) {
				return temp[1];
			}
		}
		return "";
	},

	/**
	 * 判断当前窗口是否有父文档
	 */
	haveOpener : function() {
		try{
			if (!window.opener)return false;
			if (typeof(window.opener.location + "") == "undefined")
				return false;
		}catch(e){
			//防止出现window.opener.location无权限错误 mdf by jc 20100630
			return false;
		}
		return true;
	},
	/**
	 * 用于AJAX的提交 根据当前的时间，计算不重复的字符串作为随机 返回值：随机数 = 小时 + 分钟 + 秒钟
	 */
	getRandomString : function() {
		var vDate = new Date();
		return (vDate.getHours().toString() + vDate.getMinutes().toString() + vDate
				.getSeconds().toString());
	},
	/**
	 * iframe设置
	 * 
	 * @param {}
	 *            id iframe的ID
	 * @param {}
	 *            url
	 * @return {}
	 */
	getIframeHtml : function(url, id, height) {
		if (typeof height == "undefined")
			height = "600";
		return '<iframe id="' + id + '" name="' + id + '" '
				+ ' width="100%" height="' + height + '" frameborder="0" src="'
				+ url + '"></iframe>';
	},
	/**
	 * iframe
	 * 
	 * @param {}
	 *            id iframe
	 * @param {}
	 *            url
	 * @return {}
	 */
	getSelfIframeHtml : function(url, id, height) {
		if (typeof height == "undefined")
			height = "100%";
		var js = ' onload="ucapCommonFun.iframeFitHeight(this)" ';
		return '<iframe id="' + id + '" name="' + id + '" ' + js
				+ ' width="100%" height="' + height + '" frameborder="0" src="'
				+ url + '"></iframe>';
	},
	iframeFitHeight : function(oIframe) {// Iframe窗口自适应高度 兼容IE6.0 FF2.0以上
		try {
			var oWin = oIframe.name
					? window.frames[oIframe.name]
					: oIframe.contentWindow;
			var height = oWin.document.body.scrollHeight;
			var width = oWin.document.body.scrollWidth;
			if (width < 600) {
				width = 600;
				oIframe.style.width = width + "px";
			}
			if (height < 500)
				height = 500;
			oIframe.style.height = height + "px";

		} catch (e) {
		}
	},

	/**
	 * 根据视图标识及文档标识获取相应的提示信息
	 * 
	 * @param {}
	 *            viewId 视图标识
	 * 
	 * @param {}
	 *            unid 文档标识
	 * 
	 */
	getViewTip : function(viewId, unid) {
		var url = ucapSession.baseAction;
		url += "?viewId=" + viewId + "&type=viewTip&unid=" + unid + "&rand="
				+ Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		if (null == conn.responseText || conn.responseText == "")
			return "";
		var json = Ext.util.JSON.decode(conn.responseText);
		var exResult = ucapCommonFun.dealException(json);
		if (!exResult)
			return;
		var jsonArr = json.items;
		if (typeof jsonArr == "undefined")
			return "";
		var qhtml = ucapCommonFun.getQHtml(json);

		return qhtml;
	},
	/**
	 * 通过把json数据转化成相应的html
	 * 
	 * @param {}
	 *            json
	 */
	getQHtml : function(json) {
		var qhtml = "<table class='titleTipTb'>";
		var jsonArr = json.items;
		for (var i = 0; i < jsonArr.length; i++) {
			qhtml += "<tr>";
			if(null!=jsonArr[i].title &&  jsonArr[i].title!=""){
				qhtml += "<td class='titleTipTitleTd' >" + jsonArr[i].title
					+ ":</td>";
			}
			qhtml += "<td class='titleTipVTd'>" + jsonArr[i].value + "</td>";// 支持图片，如<img
			// src="/ucap/...jpg"/>
			qhtml += "</tr>";
		}
		qhtml += "</table>";

		return qhtml;
	},
	/**
	 * 取字符串，超长部分加...
	 * @param {} s 字符串
	 * @param {} n 取的字数
	 * @return {}
	 */
	limitL:function(s,n){
		if(s.length > n){
		    return s.substring(0,n)+"...";
		}
		return s;
	},
	
    /*
     *创建表空间
     * add by fsm
     */ 
     createTableSpace:function(driverUrl){
    	var html="sys/cfgJsp/userInfo/createTableSpace.jsp?driverUrl="+driverUrl;
        var button=[
              {text:"创建",handler:function(){tableSpace.valCreateTable()}},
              {text:"取消",handler:function(){ucapSession.commonWin.close()}}
        ];
       	ucapSession.commonWin=new Ext.Window({
       		id:"ucap_space_div",
            title:ucapSession.win.winImg+"创建数据库",
                width : 750,
                height : 370,
                closable:true,
		        modal: true,
 			    bodyStyle:ucapSession.win.winBodyStyle,
			    autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			    buttons:button
           });
           ucapSession.commonWin.show();
     },//end  createtablespace
     //打包对话框 unid可为空  yjy2010-8-1
     popPack:function(unid){
     	if (typeof unid=="undefined") unid = "";
		var html="sys/cfgJsp/version/pack.jsp?unid="+unid;
		var button=[
			{text:"上一步",id:"ucap_pack_prv",handler:function(){window.top.ucapVersion.prv();}},
			{text:"下一步",id:"ucap_pack_next",handler:function(){window.top.ucapVersion.next();}},
			{text:"取消",handler:function(){	window.top.ucapSession.commonWin.close()}}
			    ];
   		window.top.ucapSession.commonWin=new window.top.Ext.Window({
        title:ucapSession.win.winImg+"打包对话框",
                width : 600,
                height : 570,
                closable:true,
		        modal: true,
 			    bodyStyle:ucapSession.win.winBodyStyle,
			    autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			    buttons:button
           });
		window.top.ucapSession.commonWin.show();
     },
     //更新对话框  yjy2010-8-1
     popUpgrade:function(unid){
     	if (typeof unid=="undefined") unid = "";
		var html="sys/cfgJsp/version/upgrade.jsp?unid="+unid;
		var button=[
			{text:"下一步",id:"ucap_pack_exec",handler:function(){window.top.ucapVersion.upgrade.exec()}},
			{text:"取消",handler:function(){	window.top.ucapSession.commonWin.close()}}
			    ];
   		window.top.ucapSession.commonWin=new window.top.Ext.Window({
        title:ucapSession.win.winImg+"更新对话框",
                width : 600,
                height : 570,
                closable:true,
		        modal: true,
 			    bodyStyle:ucapSession.win.winBodyStyle,
			    autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			    buttons:button
           });
		window.top.ucapSession.commonWin.show();
     },
     //表单映射对话框 yjy2010-8-3
     popCollate:function(){
     	var html="sys/cfgJsp/proxool/collate.jsp";
		var button=[
			{text:"上一步",id:"ucap_collate_prv",handler:function(){window.top.ucapCollate.prv();}},
			{text:"下一步",id:"ucap_collate_next",handler:function(){window.top.ucapCollate.next()}},
			{text:"取消",handler:function(){	window.top.ucapSession.commonWin.close()}}
			    ];
   		window.top.ucapSession.commonWin=new window.top.Ext.Window({
        title:ucapSession.win.winImg+"数据映射对话框",
                width : 600,
                height : 472,
                closable:true,
		        modal: true,
 			    bodyStyle:ucapSession.win.winBodyStyle,
			    autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			    buttons:button
           });
		window.top.ucapSession.commonWin.show();
     }, 
     
     /**
     *数据表配置生成 2011.3.22 cgc
     *
     */
     generateFormCfg:function(){
     	//读取模块unid  
     	var unid=window.top.ucapManagerTree.curBelongToModuleId;
     	if(null==unid||unid==""){
     		alert("请重新选择模块节点(表单配置)！");
     		return;
     	}
   	
     	var html="sys/cfgJsp/proxool/formcfg.jsp"
     	var button=[
			{text:"上一步",id:"ucap_formCfg_prv",handler:function(){window.top.ucapFormcfg.prv();}},
			{text:"下一步",id:"ucap_formCfg_next",handler:function(){window.top.ucapFormcfg.next()}},
			{text:"取消",handler:function(){	window.top.ucapSession.commonWin.close()}}
			    ];
   		window.top.ucapSession.commonWin=new window.top.Ext.Window({
        title:ucapSession.win.winImg+"表单配置生成对话框",
                width : 600,
                height : 472,
                closable:true,
		        modal: true,
		        moduleUnid:unid,//模块unid
 			    bodyStyle:ucapSession.win.winBodyStyle,
			    autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			    buttons:button
           });
		window.top.ucapSession.commonWin.show();
     },
     
     //2012-09-28 add by wyongjian@linewell.com
     //判断当前会话是否过期，过期则跳转到登录页面
     //解决BUG1107-页面长时间未进行操作，超时后，点击首页上的快捷方式，页面一片空白，建议跳转到登录页面的问题
     isSessionOut:function() {
  	   	var requestConfig = {
  	   		url : ucapSession.baseAction,
  	   		callback : function(options, success, response) {
  	   			if (success) {
  	   				var exjson = Ext.util.JSON.decode(response.responseText);  
  	   				if(typeof(exjson)=="object"){
  	   					if ("01"==exjson.exceptionType){
  	   						window.location.reload();
  	   					}
  	   				}				
  	   			} else {
  	   				Ext.Msg.alert("提示", "请重试！");
  	   			}
  	   		}
  	   	}
  	   	Ext.Ajax.request(requestConfig);
     },
     
     /**
      * 实体编号:（"&#60;"、"&#62;"、"&#38;"、"&#39;"、"&#34;"）反转义替换
      * 为（小于号<、大于号>、与&、单引号'、双引号"）
      * @author chuiting@linewell.com
      * @since 2012-10-12
      */
     specialCharRep : function(replaceStr) {
    	 var returnStr = replaceStr;
    	 if (returnStr) {
    		 returnStr = returnStr.replace(/&#38;/g,"&");
    		 returnStr = returnStr.replace(/&#60;/g,"<").replace(/&#62;/g,">")
 							.replace(/&#39;/g,"\'").replace(/&#34;/g,"\"");
    	 }
    	 return returnStr;
     }
     
}
/**
 * 按钮确认后执行的操作，均为私有方法 private，不能直接调用
 */
var ucapButtonFunConfirm = {
	/**
	 * 切换用户身份后的操作
	 */
	changeUserStatusConfirm : function() {
		var json = ucapCommonFun.getFormJSon("userDialogHtml");
		if(json.type==""){
			Ext.Msg.alert("提示", "请选择角色类型！");
			return;
		}
		if (json.type == "2" && json.dept == "") {
			Ext.Msg.alert("提示", "以部门管理员的身份登录，必须选择一个部门！");
			return;
		}
		var requestConfig = {
			url : ucapSession.baseAction,
			params : {
				"type" : "switchUserStatus",
				"userType" : json.type,
				"deptUnid" : json.dept
			},
			callback : function(options, success, response) {
				if (success) {
					var exjson = Ext.util.JSON.decode(response.responseText);
					var exResult = ucapCommonFun.dealException(exjson);
					if (!exResult)
						return;

					window.location.reload();
				} else {
					Ext.Msg.alert("提示", "切换用户身份不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 切换系统后的操作 private
	 */
	changeSystemConfirm : function() {
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		if (json.appList == "") {
			for (var i = 0; i < ucapSession.loginAppJson.appList.length; i++) {
				if (ucapSession.loginAppJson.lastApp == ucapSession.loginAppJson.appList[i].unid) {
					json.appList = i;
					break;
				}
			}
		}
		var requestConfig = {
			url : "login.action",
			params : {
				"type" : "afterChoose",
				"styleUnid" : ucapSession.loginAppJson.styleList[json.appStyle].unid,
				"isDefault" : json.defaultOption,
				"schemeUnid" : ucapSession.loginAppJson.scheme[json.appList].unid
			},
			jsonData : ucapSession.loginAppJson.appList[json.appList],
			callback : function(options, success, response) {
				if (success) {
					var jsonException = Ext.util.JSON
							.decode(response.responseText);
					var exResult = ucapCommonFun.dealException(jsonException);
					if (!exResult)
						return;
					ucapCommonFun.buttonFun
							.gotoIndex(ucapSession.loginAppJson.scheme[json.appList]);
				}
			}
		}
		Ext.Ajax.request(requestConfig);
		ucapSession.commonWin.hide();
	},
	/**
	 * 先上传logo再进行界面方案相关的设置
	 */
	schemeLogoConfirm : function() {
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		if(json["picture"]){
			var logoName=json["picture"].replace(/(^\s*)|(\s*$)/g, "");
			if(logoName==""){
		   Ext.Msg.alert("提示", "请输入logo图片名称");
		   return;
		 }
		logoName= encodeURIComponent(encodeURIComponent(logoName)) ;
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		var requestConfig = {
			url : ucapSession.baseAction,
			params : {
				"type" : "setScheme",
				"logoName" : logoName
			},
			jsonData : json,
			callback : function(options, success, response) {
				if (success) {
					var exjson = Ext.util.JSON.decode(response.responseText);
					var exResult = ucapCommonFun.dealException(exjson);
					if (!exResult) return;
					if (exjson.result &&exjson.result == true) {
					 Ext.getDom("fileUploadForm").action = "BackGroundService.upload?logoName="+logoName;
					 Ext.getDom("fileUploadForm").target="upload_hidd";
		 			 Ext.getDom("hidd_fileUploadForm_submit").click();
						Ext.MessageBox.show({title:"提示",msg:"自定义界面方案成功！",buttons:{yes:"确定"},fn:function(btn){//mdf by fsm 2010.1.17 修改了提示信息问题
						if(btn=="yes"){
							setTimeout(window.location.reload(),3000);
						}
					 }});		 
					}else{
				    	Ext.Msg.alert("提示", exjson.msg);
					}
				
				} else {
					Ext.Msg.alert("提示", "自定义设置不成功，请重新设置！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
		
		// alert(document.getElementById("upload_hidd").body.innerHTML);   
		//alert( upload_hidd.document.body.innerHTML);
		} 
	},
	/**
	 * 界面方案相关的设置
	 */
	schemeConfirm : function() {
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		var requestConfig = {
			url : ucapSession.baseAction,
			params : {
				"type" : "setScheme"
			},
			jsonData : json,
			callback : function(options, success, response) {
				if (success) {
					var exjson = Ext.util.JSON.decode(response.responseText);
					var exResult = ucapCommonFun.dealException(exjson);
					if (!exResult)
						return;
					window.location.reload();
				} else {
					Ext.Msg.alert("提示", "自定义设置不成功，请重新设置！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * private 切换布局，按确定后执行的方法
	 */
	changeLayoutConfirm : function() {
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		var requestConfig = {
			url : ucapSession.baseAction,
			params : {
				"type" : "portal",
				"act" : "changeLayout",
				"portalId" : ucapPortal.ucapPortalObj.unid
			},
			jsonData : json,
			callback : function(options, success, response) {
				if (success) {
					var exjson = Ext.util.JSON.decode(response.responseText);
					var exResult = ucapCommonFun.dealException(exjson);
					if (!exResult)
						return;
					ucapPortal.init();
					ucapSession.commonWin.close();
					// window.location.reload();
				} else {
					Ext.Msg.alert("提示", "切换布局不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	recoverConfirm : function() {
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		if (json.recover == "") {
			Ext.Msg.alert("提示", "请选一项进行恢复设置！");
			return;
		}
		var requestConfig = {
			url : ucapSession.baseAction,
			params : {
				"type" : "recover",
				"recoverType" : json.recover,
				"fvs_sp" : ucapSession.fvs_sp
			},
			callback : function(options, success, response) {
				if (success) {
					var exjson = Ext.util.JSON.decode(response.responseText);
					var exResult = ucapCommonFun.dealException(exjson);
					if (!exResult)
						return;

					window.location.reload();
				} else {
					Ext.Msg.alert("提示", "恢复不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	navConfirm : function() {
		var json = ucapCommonFun.getFormJSon("dialogNavHtml");
		var requestConfig = {
			url : ucapSession.baseAction,
			params : {
				"type" : "nav",
				act : "save"
			},
			jsonData : json,
			callback : function(options, success, response) {

				var exjson = Ext.util.JSON.decode(response.responseText);
				var exResult = ucapCommonFun.dealException(exjson);
				if (!exResult)
					return;

				if (success && response.responseText == "true") {
					ucapMenu.initNavigation();
					ucapSession.commonWin.close();
				} else {
					Ext.Msg.alert("提示", "导航栏设置不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
   /*
    *创建表空间
    *add by fsm
    */
    doCreateTable:function(json)
    {
        var requestConfig = {
        url:ucapSession.baseAction,
        params:{"type":"createTableSpace","action":"createtablespace"},
        jsonData:json,
        callback:function(options,success,response)
        {
            if(success)
            {
                var exjson=Ext.util.JSON.decode(response.responseText);
                if(exjson.result|| exjson.result=="true")
                {
                    Ext.Msg.alert("提示信息",exjson.msg);
                    // 表空间创建成功后将用户名、密码赋值到 业务库页面 modify by zhua 2010-06-29
                    $("user").value=json.userName;
                    $("password").value=json.userPassWord;
                      
                    //将url连接字符串赋值到业务库页面 modify by gchengzhi 2012-08-14
                    var  dbtype=json.dataBaseType;
                    if("GBase"==dbtype){
                    	var sourceAddress = json.serverAddress;
                    	var destAddress = sourceAddress.substr(0,sourceAddress.lastIndexOf("\/")+1)+json.tablespaceName;
                    	$("url").value = destAddress;
                    }
                    if(Ext.getCmp("ucap_space_div")){
                    	Ext.getCmp("ucap_space_div").close();
                    }
                        
                }
                else
                {
                    Ext.Msg.alert("提示信息",exjson.msg);
                }
            }
            else
            {
                Ext.Msg.alert("提示","操作失败！");
                if(Ext.getCmp("ucap_space_div")){
                    	Ext.getCmp("ucap_space_div").close();
                    }
            }
        }
    }
    _UcapForm.tool.showLodingMsg();
    Ext.Ajax.request(requestConfig);
 }

}
function $F(id) {
	return $(id).value;
}
function $(id) {
	return Ext.getDom(id);
}
/**
 * 取字段的值，允许多张表单的取值
 * 
 * @param {}
 *            fileName 字段名称
 * @param number或者$index
 *            index 如果是在表单是否可编辑上可以配置成$index作为参数值如：$("字段名",$index)
 * @return {}
 */
function $V(fileName,index) {
	try {
		if(null!=index && typeof(index)!="undefined"){
			return _UcapForm.tool.getViewFormValue(fileName, index, true);
		}
		return _UcapForm.tool.getFormValue(fileName, true);
	} catch (e) {
		return ""
	};
}
function loadfile(_sUrl, filetype) {
	if (!isjscssfile(_sUrl, filetype)) {
		var filename = "http://" + location.host + appPath + _sUrl;
		if (filetype == "js") { // 判断文件类型
			var fileref = document.createElement('script');// 创建标签
			ucapCommonFun.setAttr(fileref,"type", "text/javascript");// 定义属性type的值为text/javascript
			ucapCommonFun.setAttr(fileref,"src", filename);// 文件的地址
		} else if (filetype == "css") { // 判断文件类型
			var fileref = document.createElement("link");
			ucapCommonFun.setAttr(fileref,"rel", "stylesheet");
			ucapCommonFun.setAttr(fileref,"type", "text/css");
			ucapCommonFun.setAttr(fileref,"href", filename);
		}
		if (typeof fileref != "undefined")
			document.getElementsByTagName("head")[0].appendChild(fileref);
	}
}
function isjscssfile(_sUrl, filetype) {
	var filename = _sUrl;
	var targetelement = (filetype == "js") ? "script" : (filetype == "css")
			? "link"
			: "none";// 得到文件类型使用的相应标签名
	var targetattr = (filetype == "js") ? "src" : (filetype == "css")
			? "href"
			: "none";// 得到属性名
	// 得到所有的用来连接外部文件的标签
	var allsuspects = document.getElementsByTagName(targetelement);
	for (var i = allsuspects.length; i >= 0; i--) { // search backwards within
		// nodelist for matching
		// elements to remove
		if (allsuspects[i]
				&& ucapCommonFun.getAttr(allsuspects[i],targetattr) != null
				&& ucapCommonFun.getAttr(allsuspects[i],targetattr).indexOf(filename) != -1)
			return true;
	}
	return false;
}
//帮助手册
function searchHelp(att){
	if(window.parent.name !="help"){
		window.open(hostPath+appPath+"help/help.html#"+att,"help");
	}
}
//转向到三级管理中心中
function gotoManager(){
	window.open(hostPath+appPath+"sys/system/index.jsp");
}
/**
 * 转向到门户配置中心
 */
function gotoPortalConfig(){
	window.open(hostPath+appPath+"sys/system/portal.jsp");
}

/**
 * 打开流程列表进行流程设计
 * modify by lliangjian@linewell.com 2011-10-23 flex流程设计器
 * 
 * @param isRate 是否为在分级管理的情况下打开 true为是，false为否
 * 
 * @param flowUnid 流程unid,设计器将打开此流程
 * 
 * @param punid 流程unid,设计器中的流程列表将只读取些流程
 * 
 * @param isNew 是否是新建流程,1表示新建，其它是修改
 */
function gotoVisualFlow(isRate, flowUnid, punid, isNew) {
	if (!flowUnid) {
		flowUnid = "";
	}
	if (!punid) {
		punid = "";
	}
	if (!isNew || isNew != "1") {
		isNew = "0";
	}
	var winParam = "width=" + window.screen.width + ",height="
			+ window.screen.height + "top=0,left=0,resizable=yes";
	if ("undefined" != typeof(isRate) && isRate) {
		var belongToApp = typeof(ucapManagerTree) != "undefined"
				? ucapManagerTree.curBelongToAppId
				: "";
		var belongToModule = typeof(ucapManagerTree) != "undefined"
				? ucapManagerTree.curBelongToModuleId
				: "";
		window.open(hostPath + appPath + "flow/flowDesigner/Main.html?"
						+ "appUnid=" + belongToApp + "&moduleUnid="
						+ belongToModule + "&isNew=" + isNew + "&flowUnid="
						+ flowUnid + "&punid=" + punid, "", winParam);
	} else {
		window.open(hostPath + appPath + "flow/flowDesigner/Main.html?"
						+ "appUnid=" + ucapHeader.appUnid + "&isNew=" + isNew
						+ "&flowUnid=" + flowUnid + "&punid=" + punid, "",
				winParam);
//		window.open(hostPath + appPath + "sys/jsp/visualflow.jsp?appUnid="
//				+ ucapHeader.appUnid + "&showTree=1");
	}
}

function openWorkFlowByPunid(u)
{
	gotoVisualFlow(false,u,u);
}

/**
 * 浏览器类型的判断--获取浏览器的类型
 * @param {} nav
 */
function checkBrowser()
{
	var sUserAgent = navigator.userAgent;
	if(navigator.userAgent.indexOf("MSIE")>-1) {
		return "MSIE".toLowerCase ();//ie
	}
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>-1){
		return "Firefox".toLowerCase ();//火狐
	}
	if(isSafari=navigator.userAgent.indexOf("Safari")>-1) {
		return "Safari".toLowerCase ();
	} 
	if(isCamino=navigator.userAgent.indexOf("Camino")>-1){
		return "Camino".toLowerCase ();
	}
	if(isMozilla=navigator.userAgent.indexOf("Gecko/")>-1){
		return "Gecko".toLowerCase ();
	}
}

Ext.ns("Ucap.JsModuleLoader");
//自定义类继承 Ext.util.Observable   
Ucap.JsModuleLoader = function(config) {     
    // /属性构建     
    Ext.apply(this, config);     
    this.addEvents({     
        "loaded" : true
    });     
}     
Ext.extend(Ucap.JsModuleLoader, Ext.util.Observable, {    
    dom: new Array(),   
    loadedCount: 0,   
    // /定义属性及其默认参数和事件         
    load: function(path) {     
        var th = this;   
        if(path.script){   
            if(!path.script.pop) path.script = [path.script];     
           //创建结点;   
	        for (var i=0; i<path.script.length; i++) {   
	             //alert("path.script[i]=" + path.script[i]);       
	             this.dom[i] = document.createElement("script");     
	             this.dom[i].src = path.script[i];     
	             document.getElementsByTagName("head")[0].appendChild(this.dom[i]);                        
	         }     
	            
	         //注册事件;   
	         for(var i=0; i<this.dom.length; i++){   
	            if(Ext.isIE){   
	                this.dom[i].onreadystatechange = this.fireLoaded.createDelegate(this);   
	            }else{     
	                this.dom[i].onload = this.fireLoaded.createDelegate(this);   
	            }
	         }   
  
       }                       
    },   
    fireLoaded: function(){   
        for (var i=0; i<this.dom.length; i++) {   
            if (this.dom[i].readyState && this.dom[i].readyState == "loading")      
                return;     
            else  
                this.loadedCount++;                            
        }     
        if(this.loadedCount >= this.dom.length)   
        {      
            this.fireEvent('loaded', this);
            this.dom = new Array();
            this.loadedCount = 0;
        }                                  
    }              
});  
//构建map对象 add by zhua@linewell.com
var customMap={
	struct:function (key, value) {   
		 this.key = key;   
		 this.value = value;   
	},
	putValue:function (key, value){   
		 for (var i = 0; i < this.arr.length; i++) {   
			 if ( this.arr[i].key === key ) {   
				this.arr[i].value = value;   
				  return;   
			 }   
	 	 }   
	 	this.arr[this.arr.length] = new customMap.struct(key, value);   
	},
	getValue:function (key) {   
		 for (var i = 0; i < this.arr.length; i++) {   
			if ( this.arr[i].key === key ) {   
			 return this.arr[i].value;   
			 }   
		 }   
		 return null;   
	 },
	 remove:function (key) {   
		 for (var i = 0; i < this.arr.length; i++) {   
			 v = this.arr.pop();   
			 if ( v.key === key ) {   
				continue;   
			 }   
			this.arr.unshift(v);   
		 }   
   },
   size:function () {   
 		return this.arr.length;   
  }, 
   
 	isEmpty:function () {   
 		return this.arr.length <= 0;   
	 },  
 	Map:function () {   
		this.arr = new Array();   
		 this.getValue = customMap.getValue;   
		 this.putValue = customMap.putValue;   
		 this.remove = customMap.remove;   
		 this.size = customMap.size;   
		 this.isEmpty = customMap.isEmpty;   
	}   
}

/**
 * 解决IE9的Range不存在createContextualFragment方法导致Ext出错的BUG by xhuatang@linewell.com 2011-3-23
 */
if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment)
{	
	Range.prototype.createContextualFragment = function(html)
	{
		var frag = document.createDocumentFragment(), 
		div = document.createElement("div");
		frag.appendChild(div);
		div.outerHTML = html;
		return frag;
	};
}
