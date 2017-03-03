var ucapFormcfg={
	fileSplit:",",
	tabs:"",
	curNum:0,
	itemsList:{},//保存所有已选择的字段列表
	unItemsList:{},//保存所有排除的字段列表	
	init:function(){
		this.tabs = new Ext.TabPanel({
	        applyTo: '_formcfg_tabs',
	        autoTabs:true,
	        deferredRender:false,
	        autoHeight:true,
	        activeTab: 0,
	        animScroll:true,
	        plain:true,
	        enableTabScroll:true,
	        autoWidth:true
	  	 });
	  	//
	  	var url = ucapSession.baseAction;
		url += "?act=getAssignApp&type=managerAction&rand=" + Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);
		
		var appSelect = Ext.getDom("appSelect");
		if (null != json && null != json.apps&&json.apps.length!=0&& null!=json.apps[0]) {
			for (var i = 0; i < json.apps.length; i++) {
				var appJson = json.apps[i];
				ucapCommonFun.addOption(appSelect, appJson.unid, appJson.name);
			}
		}
	  	
		this.setDisable();
		Ext.getCmp("ucap_formCfg_prv").disable();
		Ext.getCmp("ucap_formCfg_next").disable();
		
	},
	dateChange:function(){
		Ext.getCmp("ucap_formCfg_next").enable();
	},
	setDisable:function(){
		for(var i=0;i<this.tabs.items.length;i++){
			var item = this.tabs.items.itemAt(i);
			if (i==this.curNum){
				item.enable();
				item.show();
			} else {
				item.disable();
			}
		}
	},
	/**
	 * 根据input字段的值，设置相应的选择框的值
	 * @param {} field
	 */
	setSelect:function(field){
		var selectField = field+"Select";
		var obj = $(selectField);
		removeAllItems(obj);
		if ($F(field)=="") return;
		var v = $F(field).split(ucapFormcfg.fileSplit);
		for(var i=0;i<v.length;i++){
			addOption(obj,v[i],v[i]);
		}
	},
	/**
	 * 前一步
	 */
	prv:function(){
		ucapFormcfg.curNum--;
		if (ucapFormcfg.curNum==0){
			Ext.getCmp("ucap_formCfg_prv").disable();
		}
		Ext.getCmp("ucap_formCfg_next").setText("下一步");
		Ext.getCmp("ucap_formCfg_next").enable();
		ucapFormcfg.setDisable();
	},
	/**
	 * 下一步
	 */
	next:function(){
		if (this.curNum+1==1){
			//获取所有的表单列表 ,当前是第一步，要到第二步，即选择所有的表列表	
			
			//获取未配置的表
			var obj=$("allTableSelect");
			var req ={
				url : ucapSession.baseAction,
				params : {
					"type" : "specialFormManager",
					"act" : "getTablsNew",
					"dataSourceUnid":$F("appSelect")
				},
				callback : function(options, success, response) {
					if (success) {
			
						var json = Ext.util.JSON.decode(response.responseText);
						
						for(var fKey in json){
							if(fKey=="errMsg"){
								alert(Ext.encode(json["errMsg"]));
							}
							if(fKey=="sucess"){
								var jsonStr=Ext.util.JSON.decode(Ext.encode(json["sucess"]))
								if(jsonStr && jsonStr[0]){
								for (var i=0;i<jsonStr.length;i++) {
									var str=Ext.encode(jsonStr[i]["nameEn"]).toString();						
									addOption(obj,jsonStr[i]["nameEn"],jsonStr[i]["nameEn"]);							
								}
							}else{
								alert("没有需要配置的数据表！");
								}	
							}
						}
							
					}
				}
			};
			removeAllItems(obj);
			Ext.Ajax.request(req);
			
			//获取已配置的表
			var objCfg=$("tablesCfg");
			var reqCfg={
				url : ucapSession.baseAction,
				params : {
					"type" : "specialFormManager",
					"act" : "getTablsCfg",  /////
					"dataSourceUnid":$F("appSelect")
				},
				callback:function(options, success, response){
					if(success){
						var json=Ext.util.JSON.decode(response.responseText);						
						if(json && json[0]){
							for (var i=0;i<json.length;i++) {
								var str=Ext.encode(json[i]["nameEn"]).toString();						
								addOption(objCfg,json[i]["nameEn"],json[i]["nameEn"]);							
								}
							}
					}
				}
			};
			
			removeAllItems(objCfg);
			Ext.Ajax.request(reqCfg);
			
			
		}
		if (this.curNum+1==2){
			//当前是第二步，要到最后一步
			var selTableObj = getSelectValues($("selTableSelect"),ucapFormcfg.fileSplit);
			$("selTable").value = getSelectValues($("selTableSelect"),ucapFormcfg.fileSplit).value;
			if ($F("selTable")==""){
				Ext.Msg.alert("提示信息","需要配置的表不能为空，请重新选择！");
				return;
			}

			//获取表对应的所有字段
			var belongToModuleUnid=window.top.ucapSession.commonWin.moduleUnid;	//模块unid
			ucapFormcfg.formInfoList =[];
			var obj=$("allSelTableSelect");
			var req ={
				url : ucapSession.baseAction,
				params : {
					"type" : "specialFormManager",
					"act" : "getTabInfosCfg",
					"tabNames":$F("selTable"),
					"dataSourceUnid":$F("appSelect"),
					"moduleUnid":belongToModuleUnid
				},
				callback : function(options, success, response) {
					if (success) {
						var json = Ext.util.JSON.decode(response.responseText);
						
						for(var i=0;i<json.length;i++){
							var s="";
							for (var j=0;j<json[i].items.length;j++){
								s +=","+json[i].items[j]["nameEn"];
							}
							ucapFormcfg.itemsList[i]=s;
						}
						obj.selectedIndex=0;
						ucapFormcfg.selTabChange();						
					} 
				}
			};
			removeAllItems(obj);
			//设置已选择的表单列表
			var v = $F(selTable).split(ucapFormcfg.fileSplit);
			var t = selTableObj.text.split(ucapFormcfg.fileSplit);
			for(var i=0;i<v.length;i++){
				addOption(obj,v[i],t[i]);
			}
			Ext.Ajax.request(req);
		}
		if(this.curNum+1==this.tabs.items.length){
			//是执行操作
			var tabs=$F("selTable").split(ucapFormcfg.fileSplit);
			for(var i=0;i<tabs.length;i++){
				if (ucapFormcfg.itemsList[i]=="" || ucapFormcfg.itemsList[i]==ucapFormcfg.fileSplit){
					Ext.Msg.alert("提示信息","表："+tabs[i]+"，要配置的字段不能为空，请重新选择！");
					return
				}
			}
			var belongToModuleUnid=window.top.ucapSession.commonWin.moduleUnid;
			var req ={
				timeout:999999,
				url : ucapSession.baseAction,
				params : {
					"type" :"specialFormManager",
					"act" : "doActCfg",
					"tabs":$F("selTable"),
					"allItems":Ext.encode(ucapFormcfg.itemsList),		
					"moduleUnid":belongToModuleUnid,			
					"dataSourceUnid":$F("appSelect")
				},
				callback : function(options, success, response) {
					_UcapForm.tool.hideLodingMsg();
					var returnText= response.responseText;
					if (success && (returnText.indexOf("true")>-1)) {
						Ext.Msg.alert("提示信息","表单配置生成成功！");
						window.top.ucapSession.commonWin.close();									
					} else {
						Ext.Msg.alert("提示信息","表单配置生成失败！");
					}
					//2011-12-09 add by xhuatang@linewell.com 添加对顶部窗口事件的支持
                    if(window.top.parentEvent
                      && window.top.parentEvent.refresh){                           
                        window.top.parentEvent.refresh();                           
                    }
				}
			};
			_UcapForm.tool.showLodingMsg("","正在进行表单配置的操作，请稍等...");
			Ext.Ajax.request(req);	
			return
		}
		this.curNum++;
		if(this.curNum+1==this.tabs.items.length){
			Ext.getCmp("ucap_formCfg_next").setText("执行");
		}
		Ext.getCmp("ucap_formCfg_prv").enable();
		this.setDisable();
	},
	selTabChange:function(){
		var obj=$("allSelTableSelect");
		var index= obj.selectedIndex;
		
		var itemsEns =ucapFormcfg.itemsList[index];
		var items= itemsEns.split(ucapFormcfg.fileSplit);
		var itemObj = $("itemsSelect");
		removeAllItems(itemObj);
		for(var i=0;i<items.length;i++){
			if (items[i]=="")continue;
			addOption(itemObj,items[i],items[i]);
		}
		//排除的处理
		var otherObj = $("unItemsSelect");
		removeAllItems(otherObj);
		var unItemsEns = ucapFormcfg.unItemsList[index];
		if (typeof unItemsEns=="undefined") return;
		var unItems= unItemsEns.split(ucapFormcfg.fileSplit);
		for(var i=0;i<unItems.length;i++){
			if (unItems[i]=="")continue;
			addOption(otherObj,unItems[i],unItems[i]);
		}
		
	},
	setFormItem:function(){
		var obj=$("allSelTableSelect");
		var index= obj.selectedIndex;
		//重新设置 form中的items和otherItems的值
		var itemsV = getSelectValues($("itemsSelect"),ucapFormcfg.fileSplit).value;
		var unItemsV = getSelectValues($("unItemsSelect"),ucapFormcfg.fileSplit).value;
		ucapFormcfg.itemsList[index]=itemsV;
		ucapFormcfg.unItemsList[index]=unItemsV;
	},
	/**
	 * 在下一步或前一步中调用，设置按钮的状态及相关的值
	 */
	setDisable:function(){
		for(var i=0;i<this.tabs.items.length;i++){
			var item = this.tabs.items.itemAt(i);
			if (i==this.curNum){
				item.enable();
				item.show();
			} else {
				item.disable();
			}
		}	
	},
	
	/**
	 * 删除选中的值
	 * @param {} field
	 */
	delOption:function(field){
		var obj = $(field);		
		removeAllSelItem(obj);
	},
	
	/**
	*
	*	
	*/
	
	moveOption:function(e1, e2){
		for ( var i = 0; i < e1.options.length; i++) {
			if (e1.options[i].selected) {
				var e = e1.options[i];
				e2.options.add(new Option(e.text, e.value));
				e1.remove(i);
			}
		}
	},
	moveAllOptions:function(e1,e2){
		for(var i=e1.options.length-1;i>=0; i--){
			var e=e1.options[i];
			e2.options.add(new Option(e.text, e.value));
				e1.remove(i);
		}
		
	}
	
	
	
}


