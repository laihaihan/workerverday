var lwin = {
	/**
	 * 弹出modal框
	 *
	 * @param link	iframe链接
	 * @param title 对话框标题
	 * @param width 宽度
	 * @param height 高度
	 * @param iconCls 图标样式
	 * @param modal 是否模式对话框
	*/
	open:function(link,title,width,height,iconCls,modal){
		if(iconCls==undefined){
			iconCls = 'icon-save';
		}
		if(title==undefined){
			title = '窗口';
		}
		
		if(top.clientWidth<=width){
			width = top.clientWidth-30;
		}
		if(top.clientHeight<=height){
			height = top.clientHeight-30;							
		}
		
		var domId = getRandom();	
		_winCookie.store(domId);
		_winCookie.store("win",domId);
		_winCookie.modify("win","domId",domId);
		
		var randWin = "w_"+domId;
		var iframeId = "i_"+domId;
		top.$("body").append("<div id=\""+randWin+"\"></div>");
		top.$('#'+randWin).window({
			iconCls:iconCls,
			title: title,
			width: width,
			height: height,
			modal:modal,
			//draggable:false,
			collapsible:false,
			minimizable:false,
			content:lwin.getContent(link,domId),
			onClose:function(){				
				top.$('#'+randWin).remove();
				_winCookie.remove(domId);
			}
		});
	},
	/**
	 * 关闭弹出框
	 *
	 * @param refresh 是否刷新父窗口
	*/
	close:function(refresh){
		var domId = top._winCookie.getJson()['win'].domId;
		top.$("#i_"+domId).parent().parent().find(".panel-tool-close").click();
		top.$('#w_'+domId).remove();
		if(refresh){
			var tab = top.$("#tabs").tabs("getSelected");
			var obj = tab.find("iframe").contents().find(".pagination-load").click();
		}
	},
	/**
	 * 打印提示信息
	 *
	 * @param title 提示框标题
	 * @param msg 提示信息
	 * @param icon 图标
	 * @param fadeOutMsgTime 提示框淡出时间
	 * @param refresh 是否刷新父窗口
	 * @param close 是否提示框
	*/
	alert:function(title,msg,icon,fadeOutMsgTime,refresh,close){
		if(icon==undefined){
			icon = "info";
		}
		top.$.messager.alert(title,msg,icon);
		if(fadeOutMsgTime){		
			setTimeout(function(){
				top.$('.messager-button a').eq(0).click();
				if(close){
					top.lwin.close();
				}
			},fadeOutMsgTime);			
		}
		if(refresh){
			var tab = top.$("#tabs").tabs("getSelected");
			var obj = tab.find("iframe").contents().find(".pagination-load").click();
		}
	},
	/*
	 * 服务器通信通用出错提示
	*/
	errorService:function(){
		top.$.messager.alert("信息提示","与服务器通信出错,请记录时间联系管理员,方便为您解决问题!","error");
	},
	/**
	 * 调整最后一层DIV,高/宽(窗口居中)
	*/
	resizeLast:function(width,height){
		var domId =  top._winCookie.getJson()['win'].domId;
		top.$('#w_'+domId).window('resize',{
			height:height,
			width:width,
			left:(top.clientWidth-width)/2,
			top:(top.clientHeight-height)/2
		});
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
		return "<iframe scrolling='auto' id='i_"+domId+"' name='i_"+domId+"' frameborder='0'  src='"+appPath+link+rand+"' style='width:100%;height:100%;' style='padding:1px' marginheight='0' marginwidth='0'></iframe>";
	},
	parent:function(){
		var domIdJson = jQuery.parseJSON(top.lwin.domIds[top.lwin.domIds.length-2]);
		var domId = domIdJson.domId;
		//alert( top.$("#i_"+removedomId).length );
		//alert( top.$("#i_"+domId).contents().find('#test').attr('id') );
		//alert( top.document.frames('i_'+domId).document.getElementById('test').value );
		//alert( top.$(document.frames('i_'+domId).document).find('#test').val()+1 );
		return top.$(document.frames('i_'+domId).document);
	}
}







/**
 * 获取随机数
*/
function getRandom(){
	var rand = Math.random().toString();
	rand = rand.substring(2,rand.length);
	return rand;
}