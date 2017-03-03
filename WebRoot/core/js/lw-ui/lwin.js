/**
 * 系统弹出框
 * @author cyingquan@qq.com
 * @2011-01-14
 * @version 1.0
*/
var lwin = {
	text:function(){
		var text="";
		for(var i=0;i<top.popup.domIds.length;i++){
			text+=top.popup.domIds[i];
		}
		alert(text);
	},
	domIds:[],
	
	addDomId:function(domId){
		top.lwin.domIds[lwin.domIds.length] = "{\"domId\":\""+domId+"\"}";
	},
	/**
	 * 删除一个domId
	 */
	delDomId:function(domId){
		for(var i=top.lwin.domIds.length-1;i>=0;i--){
			if(top.lwin.domIds[i]){
				if(jQuery.parseJSON(top.lwin.domIds[i]).domId==domId){					
					top.lwin.domIds[i] = null;
					delete top.lwin.domIds[i];
				}
			}
		}
		top.lwin.domIdsNotNull();
	},
	/**
	 * 删除最后一个domId
	 */
	delLastDomId:function(){
		top.lwin.domIds[top.lwin.domIds.length-1]=null;
		top.lwin.domIdsNotNull();
	},
	
	/**
	 *  清除数组中空元素
	 */
	domIdsNotNull:function(){		
		var tmp = new Array();
		for(var i=0;i<top.lwin.domIds.length;i++){			
			if(top.lwin.domIds[i]!=null){
				tmp[tmp.length] = top.lwin.domIds[i];
			}
		}	
		top.lwin.domIds = tmp;
	},
	/**
	 * 获取最后一个DOM
	 */
	getLastDomId:function(){
		return top.lwin.domIds[top.lwin.domIds.length-1];
	},
	
	open:function(link,title,width,height,iconCls,fn){
		if(top.clientWidth<=width){
			width = top.clientWidth-30;
		}
		if(top.clientHeight<=height){
			height = top.clientHeight-30;							
		}
		top.lwin.showModalDialog(link,title,width,height,iconCls,fn);
	},
	/**
	 * 弹出通用选择框
	 * @param type	 		窗口类型（200：用户；201：部门）
	 * @param selNum 		选择类型（0：多选；1：单选）
	 * @param inputName 	存放窗口返回值的隐藏域标签ID
	 * @param inputSplit 	文本框或隐藏域数据分隔符
	 * @param outSplit 		打开窗口返回值分隔符
	 * @param arg 			预留参数以备扩展使用
	*/
	selectWindow:function(type, selNum, inputName, inputSplit, outSplit, arg){
		var args = "?type="+type+"&selNum="+selNum+"&inputName="+inputName+"&inputSplit="+inputSplit+"&outSplit="+outSplit+"&arg="+arg;
		var url = "core/select/jsp/selectWindow.jsp" + args;
		top.lwin.showModalDialog(url,'通用选择框',600,500,'icon-search');
	},	
	
	/**
	 * 弹出视图选择列表窗口
	 * @param viewId	 	视图id
	 * @param selType 		选择类型（1：单选；0:多选）
	 * @param input 		存放窗口返回的显示值的标签ID（多个以逗号隔开）
	 * @param field			视图列表中用于父窗口显示的字段名称（多个以逗号隔开）
	*/
	viewRecordWindow:function(viewId, selType, input, field){
		var args = "?viewId="+viewId+"&selType="+selType+"&input="+input+"&field="+field;
		var url = "core/view/cfg/choose_viewrecord.jsp" + args;
		top.lwin.showModalDialog(url, '视图列表记录选择', 800, 495, 'icon-search');
	},
	
	/**
	 * 弹出modal框
	 * @param link	iframe链接
	 * @param title 对话框标题
	 * @param width 宽度
	 * @param height 高度
	 * @param iconCls 图标样式
	*/
	showModalDialog:function(link,title,width,height,iconCls,fn){

		if(iconCls==undefined){
			iconCls = 'icon-save';
		}
		if(title==undefined){
			title = '窗口';
		}
		
		var domId = lwin.getRandom();
		top.lwin.addDomId(domId);
		//add by lijx 2013/09/23 用于审计管理.........start...........
		link += (link.indexOf("?")>-1?"&":"?")+"dwAuditFormTitle="+encodeURIComponent(encodeURIComponent(title));
		//.............end.........................................
		var randWin = "w_"+domId;
		var iframeId = "i_"+domId;
		top.jQuery("body").append("<div id=\""+randWin+"\"></div>");
		top.jQuery('#'+randWin).window({
			iconCls:iconCls,
			title: title,
			width: width,
			height: height,
			modal:true,
			//draggable:false,
			collapsible:false,
			minimizable:false,
			content:lwin.getContent(link,domId),
			onClose:function(){
				//top.jQuery('#'+randWin).remove();
				//top.lwin.delLastDomId();
				try{
					top.document.getElementById(iframeId).contentWindow.lwinClose();
				}catch(e){}
				
				top.lwin.delDomId(domId);
				
				if(fn == 'closeReloadView'){
					try{
						top.tabs.refreshTabGrid();
					}catch(e){}
				}
				//刷新父窗口list例表
				/*var domTmp = top.lwin.getLastDomId();
				if(domTmp){
					domTmp = jQuery.parseJSON(domTmp);
					top.jQuery('#i_'+domTmp.domId).contents().find("#list").datagrid('reload');
				}*/
			},
			onOpen:function(){
				/*
				top.document.getElementById(iframeId).onload=function(){
					alert(1);
				};*/
				/*
				jQuery("#"+iframeId).bind("load",function(){
					jQuery(this).contents().append("<div style='z-index:999999999'>ggggggggg</div>");
				});
				*/
				
			}
		});
		delete iframeId;
		delete randWin;
	},
	/**
	 * 弹出modal框
	 * @param link	iframe链接
	 * @param title 对话框标题
	 * @param width 宽度
	 * @param height 高度
	 * @param iconCls 图标样式
	*/
	showWin:function(link,title,width,height,iconCls){

		if(iconCls==undefined){
			iconCls = 'icon-save';
		}
		if(title==undefined){
			title = '窗口';
		}
		
		var domId = lwin.getRandom();
		top.lwin.addDomId(domId);
		
		var randWin = "w_"+domId;
		var iframeId = "i_"+domId;
		top.jQuery("body").append("<div id=\""+randWin+"\"></div>");
		top.jQuery('#'+randWin).window({
			iconCls:iconCls,
			title: title,
			width: width,
			height: height,
			modal:true,
			//draggable:false,
			collapsible:false,
			minimizable:false,
			content:lwin.getContent(link,domId),
			onClose:function(){
				//top.jQuery('#'+randWin).remove();
				//top.lwin.delLastDomId();
				top.lwin.delDomId(domId);
				
				//刷新父窗口list例表
				/*var domTmp = top.lwin.getLastDomId();
				if(domTmp){
					domTmp = jQuery.parseJSON(domTmp);
					top.jQuery('#i_'+domTmp.domId).contents().find("#list").datagrid('reload');
				}*/
			},
			onOpen:function(){
				/*
				top.document.getElementById(iframeId).onload=function(){
					alert(1);
				};*/
				/*
				jQuery("#"+iframeId).bind("load",function(){
					jQuery(this).contents().append("<div style='z-index:999999999'>ggggggggg</div>");
				});
				*/
				document.frames(iframeId).location.reload();
			}
		});
		delete iframeId;
		delete randWin;
	},
	/**
	 * 获取弹出窗口内容
	*/
	getContent:function(link,domId){
		
		var rand = "domId="+domId;
		if(link.indexOf("?")>-1){
			rand = "&"+rand;
		}else{
			rand = "?"+rand;
		}	
		var src = appPath + link;
		if(link.toLowerCase().indexOf('http://')==0){
			src = link;
		}
		src += rand;
		return "<iframe scrolling='auto' id='i_"+domId+"' name='i_"+domId+"' frameborder='0'  src='"+src+"' style='width:100%;height:100%;' style='padding:1px' marginheight='0' marginwidth='0'></iframe>";
		
		//return "<iframe scrolling='auto' id='"+iframeId+"' frameborder='0'  src='"+appPath+link+"' style='width:100%;height:100%;' style='padding:1px' marginheight='0' marginwidth='0'></iframe>";
	},
	close:function(fn,divNum){
		if(fn==undefined){
			fn = '';
		}
	
		//-- 为兼容旧方法
		if(!divNum || fn.toString()=='true'){
			divNum = 1;
		}
		if(!isNaN(divNum)){
			for(var i=0;i<divNum;i++){
				try{
					var domIdJson = jQuery.parseJSON(top.lwin.domIds[top.lwin.domIds.length-1]);
					var removedomId = domIdJson.domId;
					//top.jQuery("#i_"+removedomId).parent().parent().find(".panel-tool-close").click();
					top.jQuery('#w_'+removedomId).window('close');
				}catch(e){
				}
			}			
		}
		//--/ 为兼容旧
		
		//刷新父窗口
		if( fn=='refreshPwin' || fn=='pWin' ){
			var domTmp = top.lwin.getLastDomId();
			if(domTmp){
				domTmp = jQuery.parseJSON(domTmp);
				top.document.frames('i_'+domTmp.domId).location.reload();
				//("#i_"+domTmp.domId).window.location.reload()
				//alert( top.jQuery("#i_"+domTmp.domId)[0].window.location.reload() );
			}			
		}
		//刷新视图
		else if( fn=='refreshView' || fn=='reloadView' || fn.toString()=='true'){
			//var tab = top.jQuery("#tabs").tabs("getSelected");
			//var obj = tab.find("iframe").contents().find(".pagination-load").click();
			top.tabs.refreshTabGrid();
		}
		//关闭所有窗口
		else if(fn=='all'){
			var jsonArray = top.lwin.domIds;
			for(var i=0;i<jsonArray.length;i++){
				var domIdJson = jQuery.parseJSON(jsonArray[i]);
				var removedomId = domIdJson.domId;
				top.jQuery("#i_"+removedomId).parent().parent().find(".panel-tool-close").click();
			}
			top.tabs.refreshTabGrid();
		}else{
			//top.tabs.refreshTabGrid();
		}
	},
	refresh:function(fn){
		if(fn=='pWin' ){
			var parentObj = top.lwin.parent();//父窗口对象
    		parentObj.get(0).location.reload();			
		}else if(fn=='refreshView'){
			top.tabs.refreshTabGrid();
		} 
	},
	getRandom:function(){
		var rand = Math.random().toString();
		rand = rand.substring(2,rand.length);
		return rand;
	},
	alert:function(title,msg,icon,fadeOutMsgTime,refresh,close){
		if(icon==undefined){
			icon = "info";
		}
		
		var fn = fadeOutMsgTime;
		if(isNaN(fn) && fn){
			
			var outTime = refresh;//关闭时间
			top.jQuery.messager.alert(title,msg,icon);
			
			//关闭提示框
			if(fn.indexOf('close;')>-1){
				setTimeout(function(){
					top.jQuery('.messager-button a').eq(0).click();
				},outTime);	
			}
			//关闭窗口
			if(fn.indexOf('closeWin;')>-1){
				top.lwin.close();
			}
			//刷新视图
			if(fn.indexOf('reloadView;')>-1){
				top.tabs.refreshTabGrid();
			}
		
			return;
		}
		
		
		//兼容旧
		top.jQuery.messager.alert(title,msg,icon);
		if(fadeOutMsgTime){
			/*
			setTimeout(function(){
				top.jQuery('.window').fadeOut('slow');
				top.jQuery('.window-shadow').fadeOut('fast');
				top.jQuery('.window-mask').fadeOut('fast');
			},fadeOutMsgTime);
			*/			
			setTimeout(function(){
				top.jQuery('.messager-button a').eq(0).click();
				if(close){
					top.lwin.close();
				}
			},fadeOutMsgTime);			
		}
		if(refresh){
			var tab = top.jQuery("#tabs").tabs("getSelected");
			var obj = tab.find("iframe").contents().find(".pagination-load").click();
		}
	},
	/*
	 * 服务器通信通用出错提示
	*/
	errorService:function(){
		top.jQuery.messager.alert("信息提示","与服务器通信出错,请记录时间联系管理员,方便为您解决问题!","error");
	},
	/**
	 * 调整最后一层DIV,高/宽(窗口居中)
	*/
	resizeLast:function(width,height){
		if(top.clientWidth<=width){
			width = top.clientWidth-30;
		}
		if(top.clientHeight<=height){
			height = top.clientHeight-30;							
		}
		
		var domIdJson = jQuery.parseJSON(top.lwin.domIds[top.lwin.domIds.length-1]);
		var domId = domIdJson.domId;
		top.jQuery('#w_'+domId).window('resize',{
			height:height,
			width:width,
			left:(top.clientWidth-width)/2,
			top:(top.clientHeight-height)/2
		});
	},
	closeTop2:function(){
		var domIdJson = jQuery.parseJSON(top.lwin.domIds[top.lwin.domIds.length-2]);
		var removedomId = domIdJson.domId;
		top.jQuery("#i_"+removedomId).parent().parent().find(".panel-tool-close").click();
		//top.jQuery('#w_'+removedomId).remove();
	},
	/**
	 * jQuery document 对象
	*/
	parent:function(){
		var domIdJson = jQuery.parseJSON(top.lwin.domIds[top.lwin.domIds.length-2]);
		if(domIdJson!=null){
			var domId = domIdJson.domId;
			return top.jQuery(document.frames('i_'+domId).document);
		}else{
			return null;
		}
	},
	/**
	 * 原生 window 对象
	 */
	parentWin:function(){
		var domIdJson = jQuery.parseJSON(top.lwin.domIds[top.lwin.domIds.length-2]);
		if(domIdJson!=null){
			var domId = domIdJson.domId;
			return document.frames('i_'+domId).window;
		}
		return null;
	},
	setTitle:function(title){
		var domIdJson = jQuery.parseJSON(top.lwin.domIds[top.lwin.domIds.length-1]);
		var removedomId = domIdJson.domId;
		top.jQuery("#w_"+removedomId).window('setTitle',title);
	},
	curDocument:function(){
		var domIdJson = jQuery.parseJSON(top.lwin.domIds[top.lwin.domIds.length-1]);
		var domId = domIdJson.domId;
		return top.jQuery(document.frames('i_'+domId).document);
	}
}