/**
 * 排序
 * @type 
 */
var sortItem={
	sortItem:"",
	
	json:null
}

/**
 * 视图自定义对象，
 * 
 * @type 
 */
var viewConfig={
	
	hasViewColumnConfig:false,
	
	topWindow:null,
	
	/**
	 * 自定义视图的基本信息
	 * 
	 * @param {} viewid
	 */
	configViewInfo:function(viewId){
	    this.topWindow = window.top;
		var html="sys/cfgJsp/view/viewinfo.jsp?unid="+viewId;
		var button=[
					{text:"确定",handler:function(){viewConfigFun.viewInfoConfirm(viewId)}},
					{text:"取消",
					handler:function(){ucapSession.commonWin.close()}
					}];
		ucapSession.commonWin = new this.topWindow.Ext.Window({
			title:ucapSession.win.winImg+"视图基本信息自定义",
		    width:650,
		    closable:true,    //取消
		    modal: true,     
			height:260,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			//html:ucapSession.win.getIframeHtml("viewInfoConfig",html),
			buttons:button
		});
		ucapSession.commonWin.show();
	},
	/**
	 * 自定义视图列
	 * 
	 * @param {} viewId
	 */
	configViewColumns:function(viewId){
		this.topWindow = window.top;
		var html="sys/cfgJsp/view/viewcolumns.jsp?unid="+viewId+"&personalconfig=1";
		var button=[{text:"确定",handler:function(){viewConfigFun.viewColumnsConfigConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new this.topWindow.Ext.Window({
				title:ucapSession.win.winImg+"视图列自定义",
		        width:880,
		        closable:true,    //取消
		        modal: true,     
				height:400,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 自定义简单查询
	 * @param {} viewId
	 */
	configSimpleQuery:function(viewId){
	    this.topWindow = window.top;
		var html="sys/cfgJsp/view/querySimpleItem.jsp?unid="+viewId+"&personalconfig=1";
		var button=[{text:"确定",handler:function(){viewConfigFun.querySimpleItemConfigConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close()}}	
			];
			ucapSession.commonWin = new this.topWindow.Ext.Window({
				title:ucapSession.win.winImg+"简单查询自定义",
		        width:480,
		        closable:true,    //取消
		        modal: true,     
				height:440,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 自定义高级查询
	 * 
	 * @param {} viewId
	 */
	configAdvancedQuery:function(viewId){
		this.topWindow = window.top;
		var html="sys/cfgJsp/view/queryAdvancedItem.jsp?unid="+viewId+"&personalconfig=1";
		var button=[{text:"确定",handler:function(){viewConfigFun.queryAdvancedItemConfigConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close()}}	
			];
			ucapSession.commonWin = new this.topWindow.Ext.Window({
				title:ucapSession.win.winImg+"高级查询自定义",
		        width:480,
		        closable:true,    //取消
		        modal: true,     
				height:440,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 自定义排序信息
	 * 
	 * @param {} viewId
	 */
	configSortItem:function(viewId){
		this.topWindow = window.top;
		var html="sys/cfgJsp/view/sortItem.jsp?unid="+viewId+"&personalconfig=1";
		//var html="sys/cfgJsp/view/viewcolumns.jsp?viewId="+viewId;
		
		var button=[{text:"确定",handler:function(){viewConfigFun.sortItemConfigConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new this.topWindow.Ext.Window({
				title:ucapSession.win.winImg+"视图排序自定义",
		        width:480,
		        closable:true,    //取消
		        modal: true,     
				height:420,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 自定义分类信息
	 * @param {} viewId
	 */
	configCategoryItem:function(viewId){
		this.topWindow = window.top;
		var html="sys/cfgJsp/view/categoryitem.jsp?unid="+viewId+"&personalconfig=1";
		var button=[{text:"确定",handler:function(){viewConfigFun.viewCategoriesConfigConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new this.topWindow.Ext.Window({
				title:ucapSession.win.winImg+"视图分类自定义",
		        width:880,
		        closable:true,    //取消
		        modal: true,     
				height:420,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 视图自定义恢复默认
	 * 
	 * @param {} viewId
	 */
	configViewCondition:function(viewId){
		this.topWindow = window.top;
		var html="sys/cfgJsp/view/viewConditionCfg.jsp?unid="+viewId+"&personalconfig=1";
		//var html="sys/cfgJsp/view/viewcolumns.jsp?viewId="+viewId;
		
		var button=[{text:"确定",handler:function(){viewConfigFun.viewConditionConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new this.topWindow.Ext.Window({
				title:ucapSession.win.winImg+"视图条件",
		        width:880,
		        closable:true,    //取消
		        modal: true,     
				height:420,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 视图自定义恢复默认
	 * 
	 * @param {} viewId
	 */
	configSubButton:function(viewId){
		this.topWindow = window.top;
		var html="sys/cfgJsp/subbutton/subbutton.jsp?unid="+viewId+"&personalconfig=1&btntype=03";
		//var html="sys/cfgJsp/view/viewcolumns.jsp?viewId="+viewId;
		
		var button=[{text:"确定",handler:function(){viewConfigFun.subButtonConfigConfirm(viewId,"1");}},
					{text:"取消",handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new this.topWindow.Ext.Window({
				title:ucapSession.win.winImg+"视图子按钮",
		        width:880,
		        closable:true,    //取消
		        modal: true,     
				height:400,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	},
	/**
	 * 视图自定义恢复默认
	 * 
	 * @param {} viewId
	 */
	configRestoreDefault:function(viewId){
		this.topWindow = window.top;
		var html="sys/cfgJsp/view/restoreDefault.jsp?unid="+viewId;
		//var html="sys/cfgJsp/view/viewcolumns.jsp?viewId="+viewId;
		
		var button=[{text:"确定",handler:function(){viewConfigFun.restoreDefaultConfirm(viewId);}},
					{text:"取消",handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new this.topWindow.Ext.Window({
				title:ucapSession.win.winImg+"恢复默认",
		        width:280,
		        closable:true,    //取消
		        modal: true,     
				height:320,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
	}
	
}

/**
 * 视图自定义中相关的功能实现
 * 
 * @type 
 */
var viewConfigFun={
	
	viewConfigItems:null,//默认
	
	viewCofigColumns:null,//视图列
	
	viewConfigCategoriesItems:null,//视图分类列
	
	viewSortItems:null,            //视图排序列
	
	viewQuerySimpleItems:null,     //视图简单查询
	
	viewQueryAdvancedItems:null,   //视图高级查询
	
	subButtonItems:null,           //子按钮列表
	
	itemConfigList:null,           //字段列表
	
	buttonConfigList:null,         //按钮列表
	
	/**
	 * 恢复默认
	 */
	restoreDefaultConfirm:function(viewId){
		var topWin = viewConfig.topWindow;
		if(null==topWin)topWin = window;
		var json = topWin.ucapCommonFun.getFormJSon("rdDialogHtml");
		var restoreType = json.restoreType;
		if(undefined==restoreType || restoreType==""){
			topWin.Ext.MessageBox.alert("提示","请选择要恢复默认的类型！");
			return;
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"restoreDefault",
					"viewId":viewId,"restoreType":restoreType,"tmp":ucapCommonFun.getRandomString()},
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					viewConfigFun.viewConfigRefresh(viewId);
					ucapSession.commonWin.close();
				} else {
					topWin.Ext.Msg.alert("提示","恢复默认不成功！");
					ucapSession.commonWin.close();
				}
			}
		}
		Ext.Ajax.request(requestConfig);
		
	},
	
	/**
	 * 视图条件保存
	 * 
	 * @param {} viewId 视图标识
	 */
	viewConditionConfirm:function(viewId,personnalConfig){
	    var topWin = viewConfig.topWindow;
	    if(null==topWin)topWin = window;
		topWin.viewConditionCfg.setCondition();
		var json={condition:topWin.viewConditionCfg.condition,conditionCn:topWin.viewConditionCfg.conditionCn};

		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"saveViewCondition",
					"viewId":viewId,"tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(viewId);
						ucapSession.commonWin.close();
					}else{
						topWin.Ext.Msg.alert("提示","条件配置保存成功！");
					}
				} else {
					Ext.Msg.alert("提示","条件配置不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 把数组转化为json对象
	 * 
	 * @param {} viewId
	 */
	convertArray2Json:function(bfield,configInfoItems){
		
		var jsonString="";
		
		for(var i=0;i<configInfoItems.length;i++){
			var json = configInfoItems[i];
			
			if(undefined!=bfield && bfield!="" && bfield.length>0){
				for(var j=0;j<bfield.length;j++){
					if(json[bfield[j]]=="1"){
						json[bfield[j]]=true;
					}else{
						json[bfield[j]]=false;
					}
				}
			}
			
			if(jsonString==""){
				jsonString = Ext.util.JSON.encode(json);
			}else{
				jsonString +=","+Ext.util.JSON.encode(json);
			}
		}
		
		jsonString="{items:["+jsonString+"]}";
		
		return Ext.util.JSON.decode(jsonString);
	},
	/**
	 * 视图自定义后的刷新功能
	 */
	viewConfigRefresh:function(viewId){
		var griddiv = Ext.getDom(view.renderto);
		if(undefined==griddiv || null==griddiv)return;
		griddiv.innerHTML = "";
		view.refreshView(viewId,view.renderto,false);
	},
	
	/**
	 * 视图基本信息自定义
	 * @param {} viewId
	 */
	viewInfoConfirm:function(viewId){
		var topWin = viewConfig.topWindow;
		if(null==topWin)topWin = window;
		var json = topWin.ucapCommonFun.getFormJSon("dialogHtml");
		if(json["turnPage"]=="1"){
			json["turnPage"] = true;
		}else{
			json["turnPage"] = false;
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"saveViewInfo",
					"viewId":viewId,"tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					viewConfigFun.viewConfigRefresh(viewId);
					ucapSession.commonWin.close();
				} else {
					topWin.Ext.Msg.alert("提示","视图基本信息自定义不成功！");
					ucapSession.commonWin.close();
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	
	/**
	 * 加载视图中的字段列表
	 * 
	 * @param {} viewId
	 */
	loadItemsConfig:function(viewId,listName){
		viewConfigFun.itemConfigList = new Array();
		var url =ucapSession.baseAction;
		url+="?viewId="+viewId+"&type=viewSelfConfig&action=getFormItemEnCn";
		url+="&tmp="+ucapCommonFun.getRandomString();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);		
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		if(!json)return;
		
		var itemList = Ext.getDom(listName);
		var items = json.items;

		//alert(Ext.util.JSON.encode(json));
		if(undefined!=items){
			for(var i=0;i<items.length;i++){
				if(undefined==items[i] || null==items[i])continue;
				viewConfigFun.itemConfigList[i] = items[i];
				ucapCommonFun.addOption(itemList,items[i].unid,items[i].nameCn);
			}
			//加入一个操作列，以方便应用系统进行配置
			if(listName=="vwItemList"){
				ucapCommonFun.addOption(itemList,"~display~opr~","操作列");
				//Ext自增长序号列add by jc 20100610
				ucapCommonFun.addOption(itemList,"~display~seqnum~","序号列");
			}
		}
	},
	
	/**
	 * 视图列排序的自定义保存
	 * 
	 * @param {} viewId
	 */
	viewColumnsConfigConfirm:function(viewId,personnalConfig){
		var topWin = viewConfig.topWindow;
		if(null==topWin)topWin = window;
		var json = topWin.ucapCommonFun.getFormJSon("viDialogHtml");
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			for(var i=0;i<topWin.viewConfigFun.viewCofigColumns.length;i++){
				var tmpJson = topWin.viewConfigFun.viewCofigColumns[i];
				if(tmpJson.itemUnid==json.itemUnid){
					topWin.viewConfigFun.viewCofigColumns[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		var bfield=["statistics","displayCn","display"];
		json = viewConfigFun.convertArray2Json(bfield,topWin.viewConfigFun.viewCofigColumns);
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"setViewColumn",
					"viewId":viewId,"tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					//Ext.Msg.alert("提示","视图排序保存成功！");
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(viewId);
						ucapSession.commonWin.close();
					}else{
						topWin.Ext.Msg.alert("提示","视图列配置保存成功！");
					}
				} else {
					topWin.Ext.Msg.alert("提示","视图列配置保存不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 加载视图列信息
	 * 
	 * @param {} viewId 视图标识
	 * 
	 * @param {} listName 所在列标名称
	 */
	loadViewItemsConfig:function(viewId,listName){
		viewConfigFun.viewCofigColumns = new Array();
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"getViewColumns",
					"viewId":viewId,"tmp":ucapCommonFun.getRandomString()},
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);				
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					if(!json)return;
					
					var itemList = Ext.getDom(listName);
					var viewItems = json.viewItems;
					if(undefined!=viewItems && viewItems){
						for(var i=0;i<viewItems.length;i++){
							if(undefined==viewItems[i] || null==viewItems[i])continue;
							viewConfigFun.viewCofigColumns[i] = viewItems[i];
							var option = ucapCommonFun.addOption(itemList,viewItems[i].itemUnid,viewItems[i].displayName);
						}
					}
					
				} else {
					Ext.Msg.alert("提示","表单字段或数据库视图字段加载不成功！")
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 增加视图列基本信息
	 * 
	 * @param {} obj
	 */
	addViewColumn:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		
		if(obj.selectedIndex<0)return;
		
		var selectOpt = obj.options[obj.selectedIndex];
		
		var viewColumnList = Ext.getDom("viewColumnList");

		for(var i=0;i<viewColumnList.options.length;i++){
			var tmpOpt = viewColumnList.options[i];
			if(tmpOpt.value ==selectOpt.value){
				return;
			}
		}
		
		ucapCommonFun.addOption(viewColumnList,selectOpt.value,selectOpt.text);
//		var field=["itemUnid","displayName","width","widthType"];
//		var value=[selectOpt.value,selectOpt.text,"100","01"];
		//添加来源字段 resourceName by@cgc 2011-6-14
		var field=["itemUnid","displayName","resourceName","width","widthType"];
		var value=[selectOpt.value,selectOpt.text,selectOpt.text,"100","01"];
		var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
		ucapCommonFun.bindForm(jsonValue,false,"",1);
		
		//直接调用保存
		viewConfigFun.saveViewColumn(viewId);
	},
	
	/**
	 * 删除视图列
	 * 
	 * @param {} obj 视图列所在位置
	 * 
	 * @param {} viewId 视图标识
	 */
	delViewColumn:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		if(obj.selectedIndex<0)return;
		
		//从数组中移除此元素
		viewConfigFun.viewCofigColumns.splice(obj.selectedIndex,1);
		obj.remove(obj.selectedIndex);	
		
		Ext.getDom("itemUnid").value="";
	},
	
	changeViewColumn:function(obj,viewId){
		var json = ucapCommonFun.getFormJSon("viDialogHtml");

		if(undefined!=json.itemUnid && json.itemUnid!=""){
			for(var i=0;i<viewConfigFun.viewCofigColumns.length;i++){
				var tmpJson = viewConfigFun.viewCofigColumns[i];
				if(tmpJson.itemUnid==json.itemUnid){
					viewConfigFun.viewCofigColumns[i] = json;
					break;
				}
			}

			
		}//end if(undefined!=json.s
		if(obj.selectedIndex<0)return;
		
		for(var i=0;i<viewConfigFun.viewCofigColumns.length;i++){			
			var json = viewConfigFun.viewCofigColumns[i];
			if(json.itemUnid==obj.value){
				//modify by jc 20090818
//				var field=["itemUnid","displayName","width","widthType","statistics",
//					"displayCn","onclick","conversion","display","messageType","message","converseInteraction","converseInteraction_Cn_","onfocus","onfocusout","onchange","iseditjs"];//add by fsm
				//添加来源字段 resourceName by@cgc 2011-6-14
				var field=["itemUnid","displayName","resourceName","width","widthType","statistics",
					"displayCn","onclick","conversion","display","messageType","message","converseInteraction","converseInteraction_Cn_","onfocus","onfocusout","onchange","iseditjs"];//add by fsm
				var display="0";
				if(undefined!=json.display && (json.display==true || json.display=="1")){
					display = "1";
				}
				var statistics="0";
				if(undefined!=json.statistics && (json.statistics==true || json.statistics=="1")){
					statistics = "1";
				}
				var displayCn="0";
				if(undefined!=json.displayCn && (json.displayCn==true || json.displayCn=="1")){
					displayCn = "1";
				}
				//start 解决视图配置的时候，视图字段保存后，变成显示字段名称，需要知道是来自哪个源字段  by@cgc  2011-6-14
				var viewColumnList = Ext.getDom("vwItemList");
				var resourceName=null;
				for (var i = 0; i < viewColumnList.options.length; i++) {
					var tmpOpt = viewColumnList.options[i];
					if (tmpOpt.value == json.itemUnid) {
						resourceName = tmpOpt.text;
						break;
					}
				}
				//end 解决视图配置的时候，视图字段保存后，变成显示字段名称，需要知道是来自哪个源字段  by@cgc  2011-6-14
				//modify by jc 20090818
//				var value=[json.itemUnid,json.displayName,json.width,json.widthType,statistics
//					,displayCn,json.onclick,json.conversion,display,json.messageType,json.message,json.converseInteraction,json.converseInteraction_Cn_,json.onfocus,json.onfocusout,json.onchange,json.iseditjs];
				//添加来源字段 resourceName by@cgc 2011-6-14
				var value=[json.itemUnid,json.displayName,resourceName,json.width,json.widthType,statistics
					,displayCn,json.onclick,json.conversion,display,json.messageType,json.message,json.converseInteraction,json.converseInteraction_Cn_,json.onfocus,json.onfocusout,json.onchange,json.iseditjs];
				//alert(Ext.util.JSON.decode(json));
				var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
				ucapCommonFun.bindForm(jsonValue,false,"",1);
				break;
			}
		}
	},
	/**
	 * 保存视图列配置
	 * 
	 * @param {} viewId 视图标识
	 */
	saveViewColumn:function(viewId){
		var json = ucapCommonFun.getFormJSon("viDialogHtml");		
		
		if(json.itemUnid==""){
			return;
		}
		
		viewConfigFun.viewCofigColumns[viewConfigFun.viewCofigColumns.length] = json;
	},
	
	/**
	 * 进行移动视图列
	 * @param {} viewId
	 * @param {} direction
	 */
	moveViewColumn:function(viewId,direction){
		var oldIndex = Ext.getDom("viewColumnList").selectedIndex;
		var result = ucapCommonFun.moveOption(Ext.getDom("viewColumnList"),direction);
		
		if(result){
			
			var tmpJson = viewConfigFun.viewCofigColumns[oldIndex+direction];
			viewConfigFun.viewCofigColumns[oldIndex+direction] =viewConfigFun.viewCofigColumns[oldIndex]; 
			viewConfigFun.viewCofigColumns[oldIndex] = tmpJson;
			
		}
	},
	
	/**
	 * 视图列排序的自定义保存
	 * 
	 * @param {} viewId
	 */
	viewCategoriesConfigConfirm:function(viewId,personnalConfig){
		var topWin = viewConfig.topWindow;
		if(null==topWin)topWin = window;
		var json = topWin.ucapCommonFun.getFormJSon("ciDialogHtml");
		
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			
			for(var i=0;i<topWin.viewConfigFun.viewConfigCategoriesItems.length;i++){
				var tmpJson = topWin.viewConfigFun.viewConfigCategoriesItems[i];
				if(tmpJson.itemUnid==json.itemUnid){
					topWin.viewConfigFun.viewConfigCategoriesItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		json = viewConfigFun.convertArray2Json("",topWin.viewConfigFun.viewConfigCategoriesItems);
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"setCategoryItem",
					"viewId":viewId},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					//Ext.Msg.alert("提示","视图排序保存成功！");
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(viewId);
						ucapSession.commonWin.close();
					}else{
						topWin.Ext.Msg.alert("提示","视图分类保存成功！");
					}
				} else {
					topWin.Ext.Msg.alert("提示","视图分类保存不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 加载视图列信息
	 * 
	 * @param {} viewId 视图标识
	 * 
	 * @param {} listName 所在列标名称
	 */
	loadCategoryItemsConfig:function(viewId,listName){
		viewConfigFun.viewConfigCategoriesItems = new Array();
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"getCategoryItems",
					"viewId":viewId},
			callback:function(options,success,response){
				if (success){					
					var json = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					if(!json)return;
					
					var itemList = Ext.getDom(listName);
					var viewItems = json.categoryItems;
					if(undefined!=viewItems && viewItems){
						for(var i=0;i<viewItems.length;i++){
							if(undefined==viewItems[i] || null==viewItems[i])continue;
							viewConfigFun.viewConfigCategoriesItems[i] = viewItems[i];
							var option = ucapCommonFun.addOption(itemList,viewItems[i].itemUnid,viewItems[i].itemCn);
						}
					}
					
				} else {
					Ext.Msg.alert("提示","表单字段或数据库视图字段加载不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 增加视图列基本信息
	 * 
	 * @param {} obj
	 */
	addCategoryItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		
		if(obj.selectedIndex<0)return;
		
		var selectOpt = obj.options[obj.selectedIndex];
		
		var viewColumnList = Ext.getDom("categoryItemList");

		for(var i=0;i<viewColumnList.options.length;i++){
			var tmpOpt = viewColumnList.options[i];
			if(tmpOpt.value ==selectOpt.value){
				return;
			}
		}
		
		ucapCommonFun.addOption(viewColumnList,selectOpt.value,selectOpt.text);
		
		var field=["itemUnid","itemCn","itemType","itemValue","itemSort"];
		var value=[selectOpt.value,selectOpt.text,"01","","01"];
		var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
		ucapCommonFun.bindForm(jsonValue,false,"",1);
		
		//直接调用保存
		viewConfigFun.saveCategoryItem(viewId);
	},
	
	/**
	 * 删除视图列
	 * 
	 * @param {} obj 视图列所在位置
	 * 
	 * @param {} viewId 视图标识
	 */
	delCategoryItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		if(obj.selectedIndex<0)return;
		
		//从数组中移除此元素
		viewConfigFun.viewConfigCategoriesItems.splice(obj.selectedIndex,1);
		obj.remove(obj.selectedIndex);	
		
		Ext.getDom("itemUnid").value="";
	},
	
	changeCategoryItem:function(obj,viewId){
		var json = ucapCommonFun.getFormJSon("ciDialogHtml");
		
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			for(var i=0;i<viewConfigFun.viewConfigCategoriesItems.length;i++){
				var tmpJson = viewConfigFun.viewConfigCategoriesItems[i];
				if(tmpJson.itemUnid==json.itemUnid){
					viewConfigFun.viewConfigCategoriesItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		if(obj.selectedIndex<0)return;
		
		for(var i=0;i<viewConfigFun.viewConfigCategoriesItems.length;i++){
			
			var json = viewConfigFun.viewConfigCategoriesItems[i];
			if(json.itemUnid==obj.value){
				var field=["itemUnid","itemCn","itemType","itemValue","beginIndex",
					"endIndex","itemSort"];
				
				var value=[json.itemUnid,json.itemCn,json.itemType,json.itemValue,json.beginIndex,json.endIndex,json.itemSort];
				//alert(Ext.util.JSON.decode(json));
				var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
				ucapCommonFun.bindForm(jsonValue,false,"",1);
				break;
			}
		}
	},
	
	/**
	 * 保存视图列配置
	 * 
	 * @param {} viewId 视图标识
	 */
	saveCategoryItem:function(viewId){
		var json = ucapCommonFun.getFormJSon("ciDialogHtml");
		
		if(json.itemUnid==""){
			return;
		}
		
		viewConfigFun.viewConfigCategoriesItems[viewConfigFun.viewConfigCategoriesItems.length] = json;
	},
	
	/**
	 * 进行移动视图列
	 * @param {} viewId
	 * @param {} direction
	 */
	moveCategoryItem:function(viewId,direction){
		var oldIndex = Ext.getDom("categoryItemList").selectedIndex;
		var result = ucapCommonFun.moveOption(Ext.getDom("categoryItemList"),direction);
		
		if(result){
			
			var tmpJson = viewConfigFun.viewConfigCategoriesItems[oldIndex+direction];
			viewConfigFun.viewConfigCategoriesItems[oldIndex+direction] =viewConfigFun.viewConfigCategoriesItems[oldIndex]; 
			viewConfigFun.viewConfigCategoriesItems[oldIndex] = tmpJson;
			
		}
	},
	
	/**
	 * 加载视图列信息
	 * 
	 * @param {} viewId 视图标识
	 * 
	 * @param {} listName 所在列标名称
	 */
	loadSortItemsConfig:function(viewId,listName){
		viewConfigFun.viewSortItems = new Array();
		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"getSortItems",
					"viewId":viewId},
			callback:function(options,success,response){
				if (success){					
					var json = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					if(!json)return;
					
					var itemList = Ext.getDom(listName);
					var sortItems = json.sortItems;
					if(undefined!=sortItems){
						for(var i=0;i<sortItems.length;i++){
							if(undefined==sortItems[i] || null==sortItems[i])continue;
							viewConfigFun.viewSortItems[i] = sortItems[i];
							var option = ucapCommonFun.addOption(itemList,sortItems[i].sortItem,viewConfigFun.getItemNameCn(sortItems[i].sortItem));
						}
					}
					
				} else {
					Ext.Msg.alert("提示","表单字段或数据库视图字段加载不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	

	/**
	 * 增加视图排序
	 * 
	 * @param {} obj
	 * 
	 * @param {} viewId
	 */
	addSortItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		
		if(obj.selectedIndex<0)return;
		
		var selectOpt = obj.options[obj.selectedIndex];
		
		var sortItemList = Ext.getDom("sortItemList");

		for(var i=0;i<sortItemList.options.length;i++){
			var tmpOpt = sortItemList.options[i];
			if(tmpOpt.value ==selectOpt.value){
				return;
			}
		}
		
		ucapCommonFun.addOption(sortItemList,selectOpt.value,selectOpt.text);
		
		var field=["sortItem","sortType"];
		var value=[selectOpt.value,"01"];
		var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
		ucapCommonFun.bindForm(jsonValue,false,"",1);
		
		//直接调用保存
		viewConfigFun.saveSortItem(viewId);
	},
	
	/**
	 * 保存排序列
	 * @param {} viewId
	 */
	saveSortItem:function(viewId){
		var json = ucapCommonFun.getFormJSon("siDialogHtml");
		
		if(json.sortItem==""){
			return;
		}
		
		viewConfigFun.viewSortItems[viewConfigFun.viewSortItems.length] = json;
	},
	
	/**
	 * 删除排序列
	 * @param {} obj
	 * @param {} viewId
	 */
	delSortItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		if(obj.selectedIndex<0)return;
		
		//从数组中移除此元素
		viewConfigFun.viewSortItems.splice(obj.selectedIndex,1);
		obj.remove(obj.selectedIndex);
	},
	
	/**
	 * 获取点击json格式的数据
	 * @param {} obj
	 * @param {} viewId
	 */
	changeSortItem:function(obj,viewId){
		var json = ucapCommonFun.getFormJSon("siDialogHtml");
		if(undefined!=json.sortItem && json.sortItem!=""){
			
			for(var i=0;i<viewConfigFun.viewSortItems.length;i++){
				var tmpJson = viewConfigFun.viewSortItems[i];
				if(tmpJson.sortItem==json.sortItem){
					viewConfigFun.viewSortItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		if(obj.selectedIndex<0)return;
		for(var i=0;i<viewConfigFun.viewSortItems.length;i++){
			json = viewConfigFun.viewSortItems[i];
			
			if(json.sortItem==obj.value){
				var field=["sortItem","sortType"];
				var value=[json.sortItem,json.sortType];
				var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
				ucapCommonFun.bindForm(jsonValue,false,"",1);
				break;
			}
		}
	},
	
	/**
	 * 移动视图排序zid
	 * 
	 * @param {} viewId
	 * @param {} direction
	 */
	moveSortItem:function(viewId,direction){
		var oldIndex = Ext.getDom("sortItemList").selectedIndex;
		var result = ucapCommonFun.moveOption(Ext.getDom("sortItemList"),direction);
		
		if(result){
			
			var tmpJson = viewConfigFun.viewSortItems[oldIndex+direction];
			viewConfigFun.viewSortItems[oldIndex+direction] =viewConfigFun.viewSortItems[oldIndex]; 
			viewConfigFun.viewSortItems[oldIndex] = tmpJson;
			
		}
	},
	
	
	/**
	 * 视图列排序的自定义保存
	 * 
	 * @param {} viewId
	 */
	sortItemConfigConfirm:function(viewId,personnalConfig){
		var topWin = viewConfig.topWindow;
		if(null==topWin)topWin = window;
		var json = topWin.ucapCommonFun.getFormJSon("siDialogHtml");
		//alert(Ext.encode(json));
		if(undefined!=json.sortItem && json.sortItem!=""){
			
			for(var i=0;i<topWin.viewConfigFun.viewSortItems.length;i++){
				var tmpJson = topWin.viewConfigFun.viewSortItems[i];
				if(tmpJson.sortItem==json.sortItem){
					topWin.viewConfigFun.viewSortItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		json = viewConfigFun.convertArray2Json("",topWin.viewConfigFun.viewSortItems);
		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"setSortItem",
					"viewId":viewId},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(viewId);
						ucapSession.commonWin.close();
					}else{
						topWin.Ext.Msg.alert("提示","视图排序保存成功！");
					}
				} else {
					topWin.Ext.Msg.alert("提示","视图排序保存不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	
	
	
	
	/**
	 * 加载视图查询信息
	 * 
	 * @param {} viewId 视图标识
	 * 
	 * @param {} listName 
	 */
	loadQuerySimpleItemsConfig:function(viewId,listName){
		viewConfigFun.viewQuerySimpleItems = new Array();
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"getSimpleQueryItems",
					"viewId":viewId},
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);				
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					var itemList = Ext.getDom(listName);
					var querySimpleItems = json.items;

					if(undefined!=querySimpleItems && querySimpleItems){
						for(var i=0;i<querySimpleItems.length;i++){
							if(undefined==querySimpleItems[i] || null==querySimpleItems[i])continue;
							viewConfigFun.viewQuerySimpleItems[i] = querySimpleItems[i];
							var option = ucapCommonFun.addOption(itemList,querySimpleItems[i].itemUnid,viewConfigFun.getItemNameCn(querySimpleItems[i].itemUnid));
						}
					}
					
				} else {
					Ext.Msg.alert("提示","视图简单查询列加载不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	
	/**
	 * 增加视图排序
	 * 
	 * @param {} obj
	 * 
	 * @param {} viewId
	 */
	addQuerySimpleItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		
		if(obj.selectedIndex<0)return;
		
		var selectOpt = obj.options[obj.selectedIndex];
		
		var querySimpleItemList = Ext.getDom("querySimpleItemList");

		for(var i=0;i<querySimpleItemList.options.length;i++){
			var tmpOpt = querySimpleItemList.options[i];
			if(tmpOpt.value ==selectOpt.value){
				return;
			}
		}
		
		ucapCommonFun.addOption(querySimpleItemList,selectOpt.value,selectOpt.text);
		
		var field=["itemUnid","itemNameCn"];
		var value=[selectOpt.value,selectOpt.text];
		var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
		ucapCommonFun.bindForm(jsonValue,false,"",1);
		
		//直接调用保存
		viewConfigFun.saveQuerySimpleItem(viewId);
	},
	
	/**
	 * 保存排序列
	 * @param {} viewId
	 */
	saveQuerySimpleItem:function(viewId){
		var json = ucapCommonFun.getFormJSon("qsDialogHtml");
		
		if(json.sortItem==""){
			return;
		}
		
		viewConfigFun.viewQuerySimpleItems[viewConfigFun.viewQuerySimpleItems.length] = json;
	},
	
	/**
	 * 删除排序列
	 * @param {} obj
	 * @param {} viewId
	 */
	delQuerySimpleItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		if(obj.selectedIndex<0)return;
		
		//从数组中移除此元素
		viewConfigFun.viewQuerySimpleItems.splice(obj.selectedIndex,1);
		obj.remove(obj.selectedIndex);
	},
	
	/**
	 * 获取点击json格式的数据
	 * @param {} obj
	 * @param {} viewId
	 */
	changeQuerySimpleItem:function(obj,viewId){
		var json = ucapCommonFun.getFormJSon("qsDialogHtml");
		
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			
			for(var i=0;i<viewConfigFun.viewQuerySimpleItems.length;i++){
				var tmpJson = viewConfigFun.viewQuerySimpleItems[i];
				if(tmpJson.itemUnid==json.itemUnid){
					viewConfigFun.viewQuerySimpleItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		if(obj.selectedIndex<0)return;
		for(var i=0;i<viewConfigFun.viewQuerySimpleItems.length;i++){
			json = viewConfigFun.viewQuerySimpleItems[i];
			
			if(json.itemUnid==obj.value){
				var field=["itemUnid","itemNameCn"];
				var value=[json.itemUnid,json.itemNameCn];
				var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
				ucapCommonFun.bindForm(jsonValue,false,"",1);
				break;
			}
		}
	},
	
	/**
	 * 移动视图排序zid
	 * 
	 * @param {} viewId
	 * @param {} direction
	 */
	moveQuerySimpleItem:function(viewId,direction){
		var oldIndex = Ext.getDom("querySimpleItemList").selectedIndex;
		var result = ucapCommonFun.moveOption(Ext.getDom("querySimpleItemList"),direction);
		
		if(result){
			
			var tmpJson = viewConfigFun.viewQuerySimpleItems[oldIndex+direction];
			viewConfigFun.viewQuerySimpleItems[oldIndex+direction] =viewConfigFun.viewQuerySimpleItems[oldIndex]; 
			viewConfigFun.viewQuerySimpleItems[oldIndex] = tmpJson;
			
		}
	},
	
	/**
	 * 视图列排序的自定义保存
	 * 
	 * @param {} viewId
	 */
	querySimpleItemConfigConfirm:function(viewId,personnalConfig){
		var topWin = viewConfig.topWindow;
		if(null==topWin)topWin = window;
		var json = topWin.ucapCommonFun.getFormJSon("qsDialogHtml");
		
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			
			for(var i=0;i<topWin.viewConfigFun.viewQuerySimpleItems.length;i++){
				var tmpJson = topWin.viewConfigFun.viewQuerySimpleItems[i];
				if(tmpJson.itemUnid==json.itemUnid){
					topWin.viewConfigFun.viewQuerySimpleItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		json = viewConfigFun.convertArray2Json("",topWin.viewConfigFun.viewQuerySimpleItems);
		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"setSimpleQueryItem",
					"viewId":viewId},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(viewId);
						ucapSession.commonWin.close();
					}else{
						topWin.Ext.MessageBox.alert("提示","视图简单查询自定义成功！");
					}
				} else {
					topWin.Ext.MessageBox.alert("提示","视图简单查询自定义不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	
	
	
	
	
	//高级查询
	/**
	 * 加载视图查询信息
	 * 
	 * @param {} viewId 视图标识
	 * 
	 * @param {} listName 
	 */
	loadQueryAdvancedItemsConfig:function(viewId,listName){
		viewConfigFun.viewQueryAdvancedItems = new Array();
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"getAdvancedQueryItems",
					"viewId":viewId},
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);					
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					var itemList = Ext.getDom(listName);
					var queryAdvancedItems = json.items;

					if(undefined!=queryAdvancedItems && queryAdvancedItems){
						for(var i=0;i<queryAdvancedItems.length;i++){
							if(undefined==queryAdvancedItems[i] || null==queryAdvancedItems[i])continue;
							viewConfigFun.viewQueryAdvancedItems[i] = queryAdvancedItems[i];
							var option = ucapCommonFun.addOption(itemList,queryAdvancedItems[i].itemUnid,viewConfigFun.getItemNameCn(queryAdvancedItems[i].itemUnid));
						}
					}
					
				} else {
					Ext.Msg.alert("提示","视图高级查询列加载不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 增加视图排序
	 * 
	 * @param {} obj
	 * 
	 * @param {} viewId
	 */
	addQueryAdvancedItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		
		if(obj.selectedIndex<0)return;
		
		var selectOpt = obj.options[obj.selectedIndex];
		
		var queryAdvancedItemList = Ext.getDom("queryAdvancedItemList");

		for(var i=0;i<queryAdvancedItemList.options.length;i++){
			var tmpOpt = queryAdvancedItemList.options[i];
			if(tmpOpt.value ==selectOpt.value){
				return;
			}
		}
		
		ucapCommonFun.addOption(queryAdvancedItemList,selectOpt.value,selectOpt.text);
		
		var field=["itemUnid","itemNameCn","hasBegin"];
		var value=[selectOpt.value,selectOpt.text,"0"];
		var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
		ucapCommonFun.bindForm(jsonValue,false,"",1);
		
		//直接调用保存
		viewConfigFun.saveQueryAdvancedItem(viewId);
	},
	
	/**
	 * 保存排序列
	 * @param {} viewId
	 */
	saveQueryAdvancedItem:function(viewId){
		var json = ucapCommonFun.getFormJSon("qaDialogHtml");
		if(json.sortItem==""){
			return;
		}
		viewConfigFun.viewQueryAdvancedItems[viewConfigFun.viewQueryAdvancedItems.length] = json;
	},
	
	/**
	 * 删除排序列
	 * @param {} obj
	 * @param {} viewId
	 */
	delQueryAdvancedItem:function(obj,viewId){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		if(obj.selectedIndex<0)return;
		
		//从数组中移除此元素
		viewConfigFun.viewQueryAdvancedItems.splice(obj.selectedIndex,1);
		obj.remove(obj.selectedIndex);
	},
	
	/**
	 * 获取点击json格式的数据
	 * @param {} obj
	 * @param {} viewId
	 */
	changeQueryAdvancedItem:function(obj,viewId){
		var json = ucapCommonFun.getFormJSon("qaDialogHtml");
		
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			
			for(var i=0;i<viewConfigFun.viewQueryAdvancedItems.length;i++){
				var tmpJson = viewConfigFun.viewQueryAdvancedItems[i];
				if(tmpJson.itemUnid==json.itemUnid){
					viewConfigFun.viewQueryAdvancedItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		if(obj.selectedIndex<0)return;
		for(var i=0;i<viewConfigFun.viewQueryAdvancedItems.length;i++){
			json = viewConfigFun.viewQueryAdvancedItems[i];
			
			if(json.itemUnid==obj.value){
				var field=["itemUnid","itemNameCn","hasBegin"];
				var hasBegin = "0";
				if(undefined!=json.hasBegin && (json.hasBegin==true || json.hasBegin=="1")){
					hasBegin="1";
				}
				var value=[json.itemUnid,json.itemNameCn,hasBegin];
				var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
				ucapCommonFun.bindForm(jsonValue,false,"",1);
				break;
			}
		}
	},
	
	/**
	 * 移动视图排序zid
	 * 
	 * @param {} viewId
	 * 
	 * @param {} direction
	 */
	moveQueryAdvancedItem:function(viewId,direction){
		var oldIndex = Ext.getDom("queryAdvancedItemList").selectedIndex;
		var result = ucapCommonFun.moveOption(Ext.getDom("queryAdvancedItemList"),direction);
		
		if(result){
			
			var tmpJson = viewConfigFun.viewQueryAdvancedItems[oldIndex+direction];
			viewConfigFun.viewQueryAdvancedItems[oldIndex+direction] =viewConfigFun.viewQueryAdvancedItems[oldIndex]; 
			viewConfigFun.viewQueryAdvancedItems[oldIndex] = tmpJson;
			
		}
	},
	
	/**
	 * 视图列排序的自定义保存
	 * 
	 * @param {} viewId
	 */
	queryAdvancedItemConfigConfirm:function(viewId,personnalConfig){
		var topWin = viewConfig.topWindow;
		if(null==topWin)topWin = window;
		var json = topWin.ucapCommonFun.getFormJSon("qaDialogHtml");
		if(undefined!=json.itemUnid && json.itemUnid!=""){
			
			for(var i=0;i<topWin.viewConfigFun.viewQueryAdvancedItems.length;i++){
				var tmpJson = topWin.viewConfigFun.viewQueryAdvancedItems[i];
				if(tmpJson.itemUnid==json.itemUnid){
					topWin.viewConfigFun.viewQueryAdvancedItems[i] = json;
				}
			}
			
		}//end if(undefined!=json.s
		
		var bfield=["hasBegin"];
		json = viewConfigFun.convertArray2Json(bfield,topWin.viewConfigFun.viewQueryAdvancedItems);
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"setAdvancedQueryItem",
					"viewId":viewId},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(viewId);
						ucapSession.commonWin.close();
					}else{
						topWin.Ext.MessageBox.alert("提示","视图高级查询自定义成功！");
					}
				} else {
					topWin.Ext.MessageBox.alert("提示","视图高级查询自定义不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 根据字段id获取中文名称
	 * @param {} itemUnid
	 * @return {}
	 */
	getItemNameCn:function(itemUnid){
		var nameCn = "";
		
		for(var i=0;i<viewConfigFun.itemConfigList.length;i++){
			var item = viewConfigFun.itemConfigList[i];
			if(item.unid==itemUnid){
				nameCn = item.nameCn;
				break;
			}
		}
		
		return nameCn;
	},
	
	
	
	/**
	 * 加载子按钮配置
	 * @param {} btntype 按钮类型
	 * @param {} listName 加载到哪个对象名称
	 * @param {} belongToModuleId 按钮所属模块ID
	 */
	loadButtonsConfig:function(btntype,listName,belongToModuleId,belongToAppId){
		viewConfigFun.buttonConfigList = new Array();
		var url =ucapSession.baseAction;
		url+="?btntype="+btntype+"&type=subButton&action=getButtons&belongToModuleId="+belongToModuleId+"&belongToAppId="+belongToAppId;
		url+="&"+ucapCommonFun.getRandomString();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);		
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		if(!json)return;
		
		var buttonList = Ext.getDom(listName);
		var items = json.items;

		if(undefined!=items){
			for(var i=0;i<items.length;i++){
				if(undefined==items[i] || null==items[i])continue;
				viewConfigFun.buttonConfigList[i] = items[i];
				ucapCommonFun.addOption(buttonList,items[i].unid,items[i].name);
			}
		}
	},
	
	
	/**
	 * 视图列排序的自定义保存
	 * 
	 * @param {} viewId
	 */
	subButtonConfigConfirm:function(belongto,personnalConfig,formId,callbackFun){
		var topWin = viewConfig.topWindow;
		var tmpFormId = "";
		if("undefined"!=typeof(formId) && formId!="")tmpFormId = formId;
		if(null==topWin)topWin = window;
		var json = topWin.ucapCommonFun.getFormJSon("sbDialogHtml");
		
		if(undefined!=json.buttonUnid && json.buttonUnid!=""){
			
			for(var i=0;i<topWin.viewConfigFun.subButtonItems.length;i++){
				var tmpJson = topWin.viewConfigFun.subButtonItems[i];
				if(tmpJson.buttonUnid==json.buttonUnid){
					topWin.viewConfigFun.subButtonItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		var bfield=["display"];
		json = viewConfigFun.convertArray2Json(bfield,topWin.viewConfigFun.subButtonItems);
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"subButton","action":"saveSubButtons",
					"belongto":belongto,"formId":tmpFormId,"tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					//Ext.Msg.alert("提示","视图排序保存成功！");
					if(undefined!=personnalConfig && personnalConfig=="1"){
						viewConfigFun.viewConfigRefresh(belongto);
						if(ucapSession.commonWin)ucapSession.commonWin.close();
					}else{
						topWin.Ext.Msg.alert("提示","子按钮配置成功！");
					}
					//执行保存后的回调函数
					if("undefined"!=typeof(callbackFun) && callbackFun && ""!=callbackFun){
						eval(callbackFun);
					}
					
				} else {
					topWin.Ext.Msg.alert("提示","子按钮配置不成功！");
					if(undefined!=personnalConfig && personnalConfig=="1")ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 加载视图列信息
	 * 
	 * @param {} viewId 视图标识
	 * 
	 * @param {} listName 所在列标名称
	 */
	loadSubButtonsConfig:function(belongto,listName){
		viewConfigFun.subButtonItems = new Array();
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"subButton","action":"getSubButtons",
					"belongto":belongto},
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);						
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					var itemList = Ext.getDom(listName);
					var subButtonItems = json.items;
					if(undefined!=subButtonItems && subButtonItems){
						for(var i=0;i<subButtonItems.length;i++){
							if(undefined==subButtonItems[i] || null==subButtonItems[i])continue;
							viewConfigFun.subButtonItems[i] = subButtonItems[i];
							var option = ucapCommonFun.addOption(itemList,subButtonItems[i].buttonUnid,subButtonItems[i].name);
						}
					}
					
				} else {
					Ext.Msg.alert("提示","子按钮列表加载不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 增加视图列基本信息
	 * 
	 * @param {} obj
	 */
	addSubButton:function(obj){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		
		if(obj.selectedIndex<0)return;
		var selectOpt = obj.options[obj.selectedIndex];
		
		var subButtonList = Ext.getDom("subbuttonList");

		for(var i=0;i<subButtonList.options.length;i++){
			var tmpOpt = subButtonList.options[i];
			if(tmpOpt.value ==selectOpt.value){
				return;
			}
		}
		ucapCommonFun.addOption(subButtonList,selectOpt.value,selectOpt.text);
		//2012-09-24 mdf by chuiting@linewell.com
		//BUG1260视图按钮配置：先选中一个已有的按钮，在从左侧的按钮列表添加按钮，则原来选中的按钮会被覆盖掉
		//除了按钮名称、按钮标识、子按钮名称、是否显示设值外，其它表单属性赋值为空
		//var field=["buttonName","buttonUnid","name","display"];
		//var value=[selectOpt.text,selectOpt.value,selectOpt.text,"1"];
		var field = [ "unid", "buttonName", "buttonUnid", "name", "display",
				"picture", "useScopes", "interaction", "js", "altKey", "menu",
				"tip", "displayPosition" ];
		var value = [ "", selectOpt.text, selectOpt.value, selectOpt.text, "1",
				"", "", "", "", "", "", "", "" ];
		// end 2012-09-24 mdf by chuiting@linewell.com
		var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
		ucapCommonFun.bindForm(jsonValue,false,"",1);
		
		//直接调用保存
		viewConfigFun.saveSubButton();
	},
	
	/**
	 * 删除视图列
	 * 
	 * @param {} obj 视图列所在位置
	 * 
	 * @param {} viewId 视图标识
	 */
	delSubButton:function(obj){
		if("string"==typeof(obj)){
			obj = Ext.getDom(obj);
		}
		if(obj.selectedIndex<0)return;
		
		//从数组中移除此元素
		viewConfigFun.subButtonItems.splice(obj.selectedIndex,1);
		obj.remove(obj.selectedIndex);	
		
		Ext.getDom("buttonUnid").value="";
	},
	
	changeSubButton:function(obj){
		var json = ucapCommonFun.getFormJSon("sbDialogHtml");
		
		if(undefined!=json.buttonUnid && json.buttonUnid!=""){
			for(var i=0;i<viewConfigFun.subButtonItems.length;i++){
				var tmpJson = viewConfigFun.subButtonItems[i];
				if(tmpJson.buttonUnid==json.buttonUnid){
					viewConfigFun.subButtonItems[i] = json;
					break;
				}
			}
			
		}//end if(undefined!=json.s
		
		if(obj.selectedIndex<0)return;
		for(var i=0;i<viewConfigFun.subButtonItems.length;i++){
			
			var json = viewConfigFun.subButtonItems[i];
			if(json.buttonUnid==obj.value){
				var field=["unid","buttonName","buttonUnid","name","display","picture","useScopes","interaction","js","altKey","menu","tip","displayPosition"];
				var display="0";
				if(undefined!=json.display && (json.display==true || json.display=="1")){
					display = "1";
				}			
				var value=[json.unid,json.buttonName,json.buttonUnid,json.name,display,json.picture,json.useScopes
					,json.interaction,json.js,json.altKey,json.menu,json.tip,json.displayPosition];
				//alert(Ext.util.JSON.decode(json));
				var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
				ucapCommonFun.bindForm(jsonValue,false,"",1);
				break;
			}
		}
		//add by jc 20090827扩展功能、使用范围的中文取值
		$("useScopes_Cn_").value = ucapCommonFun.getDisplayNames("200,201,202,203",$("useScopes").value,"20");
		//$("unuseScopes_Cn_").value = ucapCommonFun.getDisplayNames("200,201,202,203",$("unuseScopes").value,"20");
		$("interaction_Cn_").value = ucapCommonFun.getDisplayNames("227",$("interaction").value,"20");
	},
	
	/**
	 * 保存视图列配置
	 * 
	 * @param {} viewId 视图标识
	 */
	saveSubButton:function(){
		var json = ucapCommonFun.getFormJSon("sbDialogHtml");

		if(undefined==json.buttonUnid || json.buttonUnid==""){
			return;
		}
		
		viewConfigFun.subButtonItems[viewConfigFun.subButtonItems.length] = json;
	},
	
	/**
	 * 进行移动子按钮
	 * 
	 * @param {} belongto
	 * 
	 * @param {} direction
	 */
	moveSubButton:function(direction){
		var oldIndex = Ext.getDom("subbuttonList").selectedIndex;
		var result = ucapCommonFun.moveOption(Ext.getDom("subbuttonList"),direction);
		
		if(result){
			
			var tmpJson = viewConfigFun.subButtonItems[oldIndex+direction];
			viewConfigFun.subButtonItems[oldIndex+direction] =viewConfigFun.subButtonItems[oldIndex]; 
			viewConfigFun.subButtonItems[oldIndex] = tmpJson;
			
		}
	}
	
}