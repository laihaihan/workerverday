/**
 * 打包更新js方法
 * @author yjianyou@linewell.com
 * @time 2010-7-27
 * @type 
 */
var ucapCollate={
	fileSplit:",",
	tabs:"",
	curNum:0,
	itemsList:{},//保存所有已选择的字段列表
	unItemsList:{},//保存所有排除的字段列表	
	init:function(){
		this.tabs = new Ext.TabPanel({
	        applyTo: '_collate_tabs',
	        autoTabs:true,
	        deferredRender:false,
	        autoHeight:true,
	        activeTab: 0,
	        animScroll:true,
	        plain:true,
	        enableTabScroll:true,
	        autoWidth:true
	  	 });
	  	var url = ucapSession.baseAction;
		url += "?type=listSelect&selecttype=230&rand="+Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);	
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		var items = json.items;
		if (undefined != items && items.length!=0 && null!=items[0]) {
			var obj = $("dateSourceSelect");
			for (var i = 0; i < items.length; i++){
				addOption(obj,items[i].id,items[i].name);
			}
		}		
		this.setDisable();
		Ext.getCmp("ucap_collate_prv").disable();
		Ext.getCmp("ucap_collate_next").disable();
		
	},
	dateChange:function(){
		Ext.getCmp("ucap_collate_next").enable();
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
		var v = $F(field).split(ucapCollate.fileSplit);
		for(var i=0;i<v.length;i++){
			addOption(obj,v[i],v[i]);
		}
	},
	/**
	 * 前一步
	 */
	prv:function(){
		ucapCollate.curNum--;
		if (ucapCollate.curNum==0){
			Ext.getCmp("ucap_collate_prv").disable();
		}
		Ext.getCmp("ucap_collate_next").setText("下一步");
		Ext.getCmp("ucap_collate_next").enable();
		ucapCollate.setDisable();
	},
	/**
	 * 下一步
	 */
	next:function(){
		if (this.curNum+1==1){
			//获取所有的表单列表 ,当前是第一步，要到第二步，即选择所有的表列表
			var obj=$("allTableSelect");
			var req ={
				url : ucapSession.baseAction,
				params : {
					"type" : "specialFormManager",
					"act" : "getTabls",
					"dataSourceUnid":$F("dateSourceSelect")
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
										if(null!=jsonStr[i]["nameCn"]&&jsonStr[i]["nameCn"]!=""){
											addOption(obj,jsonStr[i]["nameEn"],jsonStr[i]["nameCn"]);	
										}else{
											addOption(obj,jsonStr[i]["nameEn"],jsonStr[i]["nameEn"]);
										}
																
									}
								}
							}
						}
					} 
				}
			};
			removeAllItems(obj);
			Ext.Ajax.request(req);
		}
		if (this.curNum+1==2){
			//当前是第二步，要到最后一步
			var selTableObj = getSelectValues($("selTableSelect"),ucapCollate.fileSplit);
			$("selTable").value = getSelectValues($("selTableSelect"),ucapCollate.fileSplit).value;
			if ($F("selTable")==""){
				Ext.Msg.alert("提示信息","要映射的表不能为空，请重新选择！");
				return;
			}
			//获取表对应的所有字段
			ucapCollate.formInfoList =[];
			var obj=$("allSelTableSelect");
			var req ={
				url : ucapSession.baseAction,
				params : {
					"type" : "specialFormManager",
					"act" : "getTabInfos",
					"tabNames":$F("selTable"),
					"dataSourceUnid":$F("dateSourceSelect")
				},
				callback : function(options, success, response) {
					if (success) {
						var json = Ext.util.JSON.decode(response.responseText);
						
						for(var i=0;i<json.length;i++){
							var s="";
							for (var j=0;j<json[i].items.length;j++){
								s +=","+json[i].items[j]["nameEn"];			
							}
							ucapCollate.itemsList[i]=s;
						}
						obj.selectedIndex=0;
						ucapCollate.selTabChange();
					} 
				}
			};
			removeAllItems(obj);
			//设置已选择的表单列表
			var v = $F(selTable).split(ucapCollate.fileSplit);
			var t = selTableObj.text.split(ucapCollate.fileSplit);
			for(var i=0;i<v.length;i++){
				addOption(obj,v[i],t[i]);
			}
			Ext.Ajax.request(req);
		}
		if(this.curNum+1==this.tabs.items.length){
			//是执行操作
			var tabs=$F("selTable").split(ucapCollate.fileSplit);
			for(var i=0;i<tabs.length;i++){
				if (ucapCollate.itemsList[i]=="" || ucapCollate.itemsList[i]==ucapCollate.fileSplit){
					Ext.Msg.alert("提示信息","表："+tabs[i]+"，要映射的字段不能为空，请重新选择！");
					return
				}
			}
			var req ={
				timeout:999999,
				url : ucapSession.baseAction,
				params : {
					"type" :"specialFormManager",
					"act" : "doAct",
					"tabs":$F("selTable"),
					"allItems":Ext.encode(ucapCollate.itemsList),
					"dataSourceUnid":$F("dateSourceSelect")
				},
				callback : function(options, success, response) {
					_UcapForm.tool.hideLodingMsg();
					var returnText= response.responseText;
					if (success && (returnText.indexOf("true")>-1)) {
						Ext.Msg.alert("提示信息","表单映射成功！");
						window.top.ucapSession.commonWin.close();
					} else {
						Ext.Msg.alert("提示信息","表单映射失败！");
					}
				}
			};
			_UcapForm.tool.showLodingMsg("","正在进行表单映射的操作，请稍等...");
			Ext.Ajax.request(req);	
			return
		}
		this.curNum++;
		if(this.curNum+1==this.tabs.items.length){
			Ext.getCmp("ucap_collate_next").setText("执行");
		}
		Ext.getCmp("ucap_collate_prv").enable();
		this.setDisable();
	},
	selTabChange:function(){
		var obj=$("allSelTableSelect");
		var index= obj.selectedIndex;
		
		var itemsEns =ucapCollate.itemsList[index];
		var items= itemsEns.split(ucapCollate.fileSplit);
		var itemObj = $("itemsSelect");
		removeAllItems(itemObj);
		for(var i=0;i<items.length;i++){
			if (items[i]=="")continue;
			addOption(itemObj,items[i],items[i]);
		}
		//排除的处理
		var otherObj = $("unItemsSelect");
		removeAllItems(otherObj);
		var unItemsEns = ucapCollate.unItemsList[index];
		if (typeof unItemsEns=="undefined") return;
		var unItems= unItemsEns.split(ucapCollate.fileSplit);
		for(var i=0;i<unItems.length;i++){
			if (unItems[i]=="")continue;
			addOption(otherObj,unItems[i],unItems[i]);
		}
		
	},
	setFormItem:function(){
		var obj=$("allSelTableSelect");
		var index= obj.selectedIndex;
		//重新设置 form中的items和otherItems的值
		var itemsV = getSelectValues($("itemsSelect"),ucapCollate.fileSplit).value;
		var unItemsV = getSelectValues($("unItemsSelect"),ucapCollate.fileSplit).value;
		ucapCollate.itemsList[index]=itemsV;
		ucapCollate.unItemsList[index]=unItemsV;
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
		if (this.curNum==2 && this.isNew ){
			//说明是最后一步，则要根据前二步的相关信息，获取要更新的文件列表
			//根据打包的目录、不打包文件夹、额外打包的文件夹、lastPackTime上次打包时间到后台，获取更新的文件列表
			var json={};
			json['rootDir'] = $F("rootDir");
			json["unpackRes"] = getSelectValues($("unpackResSelect"),ucapCollate.fileSplit).value;
			json["packOtherRes"] = getSelectValues($("packOtherResSelect"),ucapCollate.fileSplit).value;
			json["lastPackTime"] = $F("lastPackTime");
			json["fileSplit"] = ucapCollate.fileSplit;
			var obj = $("packFilesSelect");
			var req ={
				timeout:999999,
				url : ucapSession.baseAction,
				params : {
					"type" :"versionRenew",
					"act" : "getPackResList"
				},
				jsonData:json,
				callback : function(options, success, response) {
					if (success && response.responseText!="") {
						var json = Ext.util.JSON.decode(response.responseText);
						for (var i=0;i<json.length;i++) {
							addOption(obj,json[i],json[i]);
						}
						ucapCollate.setCount();
					} 
					_UcapForm.tool.hideLodingMsg();
				}
			};
			removeAllItems(obj);
			_UcapForm.tool.showLodingMsg("","正在搜索要打包的文件列表，请稍等...");
			Ext.Ajax.request(req);	
		}
	},
	/**
	 * 删除选中的值
	 * @param {} field
	 */
	delOption:function(field){
		var obj = $(field);		
		removeAllSelItem(obj);
	}
}