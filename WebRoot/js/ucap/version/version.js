/**
 * 打包更新js方法
 * @author yjianyou@linewell.com
 * @time 2010-7-27
 * @type 
 */
var ucapVersion={
	fileSplit:"<>",//文件名或目录分隔符
	tabs:"",
	unid:"",
	curNum:0,
	isNew:true,
	initVersion:function(unid){
		this.tabs = new Ext.TabPanel({
	        applyTo: '_pack_tabs',
	        autoTabs:true,
	        deferredRender:false,
	        autoHeight:true,
	        activeTab: 0,
	        animScroll:true,
	        plain:true,
	        enableTabScroll:true,
	        autoWidth:true
	  	 });
	  	if(typeof unid=="undefined") unid="";
	  	if (unid=="") {
	  		this.isNew = true;
	  	} else {
	  		$("packDefault").style.display="none";
	  		//$("packDefault").style.display="none";
	  		//Ext.query('type:button').style.display="none";
	  		this.isNew = false;
	  	}
	  	this.unid = unid;
	  	Ext.getCmp("ucap_pack_prv").disable();
	  	this.setDisable();
	  	this.getValue(unid);
	},
	/**
	 * 第一次设置值的处理
	 * @param {} unid
	 */
	getValue:function(unid){
		var req ={
			url : ucapSession.baseAction,
			params : {
				"type" : "versionRenew",
				"act" : "getValue",
				"unid":unid
			},
			callback : function(options, success, response) {
				if (success) {
					var json = Ext.util.JSON.decode(response.responseText);
					for (var key in json) {
						if ($(key)){
							if (ucapVersion.isNew ){
								if (",lastPackTime,lastPackVerb,packTime,packVerb,"
										.indexOf(","+key+",")>-1) continue;
							}
							$(key).value = json[key];
						}
					}
					ucapVersion.setSelect("unpackRes");
					ucapVersion.setSelect("packOtherRes");
					ucapVersion.setSelect("packFiles");
					ucapVersion.setSelect("unpackFiles");
				} 
			}
		};
		Ext.Ajax.request(req);
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
		var v = $F(field).split(ucapVersion.fileSplit);
		for(var i=0;i<v.length;i++){
			addOption(obj,v[i],v[i]);
		}
	},
	/**
	 * 前一步
	 */
	prv:function(){
		ucapVersion.curNum--;
		if (ucapVersion.curNum==0){
			Ext.getCmp("ucap_pack_prv").disable();
		}
		Ext.getCmp("ucap_pack_next").setText("下一步");
		Ext.getCmp("ucap_pack_next").enable();
		ucapVersion.setDisable();
	},
	/**
	 * 下一步
	 */
	next:function(){
		if (this.curNum+1==1){
			if ($F("packDir")==""){
				Ext.Msg.alert("提示信息","打包文件生成的路径不能为空！");
				return;
			}
		}
		if (this.curNum+1==2){
			if ($F("lastPackTime")==""){
				Ext.Msg.alert("提示信息","上次打包的时间不能为空！");
				return;
			}
		}
		if(this.curNum+1==this.tabs.items.length){
			//是打包操作
			$("unpackRes").value = getSelectValues($("unpackResSelect"),ucapVersion.fileSplit).value;
			$("packOtherRes").value = getSelectValues($("packOtherResSelect"),ucapVersion.fileSplit).value;
			$("packFiles").value = getSelectValues($("packFilesSelect"),ucapVersion.fileSplit).value;
			$("unpackFiles").value = getSelectValues($("unpackFilesSelect"),ucapVersion.fileSplit).value;
			var json = ucapCommonFun.getFormJSon("_pack_tabs");
			var req ={
				timeout:999999,
				url : ucapSession.baseAction,
				params : {
					"type" :"versionRenew",
					"act" : "doPack",
					"rootDir":$F("rootDir"),
					"unid":ucapVersion.unid
				},
				jsonData:json,
				callback : function(options, success, response) {
					_UcapForm.tool.hideLodingMsg();
					var returnText= response.responseText;
					if (success && (returnText.indexOf(".zip")>-1)) {
						Ext.Msg.alert("提示信息","资源打包成功！打包的文件为："+returnText);
						window.top.ucapSession.commonWin.close();
					} else {
						Ext.Msg.alert("提示信息","资源打包失败！错误如下："+response.responseText);
					}
				}
			};
			_UcapForm.tool.showLodingMsg("","正在打包要更新的资源，请稍等...");
			Ext.Ajax.request(req);	
			return
		}
		this.curNum++;
		if(this.curNum+1==this.tabs.items.length){
			Ext.getCmp("ucap_pack_next").setText("打包");
			if (!this.isNew){
				Ext.getCmp("ucap_pack_next").disable();
			}
		}
		Ext.getCmp("ucap_pack_prv").enable();
		this.setDisable();
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
		if (this.curNum==1 && this.isNew && $F("lastPackTime")=="" ){
			//说明是在第二步，且是新文档，则要取最后一个版本的记录
			var req ={
				url : ucapSession.baseAction,
				params : {
					"type" : "versionRenew",
					"act" : "getLast"
				},
				callback : function(options, success, response) {
					if (success && response.responseText!="") {
						var json = Ext.util.JSON.decode(response.responseText);
						var verb = 1;
						if (json['packTime']){
							$("lastPackTime").value = json['packTime']; //上次打包时间
							$("lastPackVerb").value = json['packVerb']; //上次版本号
							verb = parseInt($("lastPackVerb").value,10) + 1;
							$("dataSelect").style.display="none";
						} else {
							//说明是第一次打包
							$("dataSelect").style.display="";
						}
						$("packTime").value=json['serverTime']; //当前时间设置为服务器时间
						$("packVerb").value=verb; //当前版本
					} 
				}
			};
			Ext.Ajax.request(req);	
			return;
		};
		if (this.curNum==2 && this.isNew ){
			//说明是最后一步，则要根据前二步的相关信息，获取要更新的文件列表
			//根据打包的目录、不打包文件夹、额外打包的文件夹、lastPackTime上次打包时间到后台，获取更新的文件列表
			var json={};
			json['rootDir'] = $F("rootDir");
			json["unpackRes"] = getSelectValues($("unpackResSelect"),ucapVersion.fileSplit).value;
			json["packOtherRes"] = getSelectValues($("packOtherResSelect"),ucapVersion.fileSplit).value;
			json["lastPackTime"] = $F("lastPackTime");
			json["fileSplit"] = ucapVersion.fileSplit;
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
						ucapVersion.setCount();
					} 
					_UcapForm.tool.hideLodingMsg();
				}
			};
			removeAllItems(obj);
			$("countFiles").innerHTML="";
			$("allFile").innerHTML="";
			removeAllItems($("unpackFilesSelect"));//删除要排除的文件夹
			
			_UcapForm.tool.showLodingMsg("","正在搜索要打包的文件列表，请稍等...");
			Ext.Ajax.request(req);	
		}
	},
	/**
	 * 还原默认
	 */
	getDefault:function(){
		//说明是在第二步，且是新文档，则要取最后一个版本的记录
			var req ={
				url : ucapSession.baseAction,
				params : {
					"type" : "versionRenew",
					"act" : "getDefault"
				},
				callback : function(options, success, response) {
					if (success && response.responseText!="") {
						var json = Ext.util.JSON.decode(response.responseText);
						$("rootDir").value = json["rootDir"];
						$("packDir").value = json["packDir"];
						$("unpackRes").value=json["unpackRes"];
						$("packOtherRes").value=json["packOtherRes"];
						ucapVersion.setSelect("unpackRes");
						ucapVersion.setSelect("packOtherRes");
					} else {
						Ext.Msg.alert("提示信息","没有找到默认配置！");
					}
				}
			};
			Ext.Ajax.request(req);	
	},
	/**
	 * 增加文件夹或文件名称
	 * @param {} obj
	 */
	addOption:function(obj){
		Ext.Msg.prompt("对话框","请输入文件目录或文件名，可用*、？代替：",function(id,msg){
			if (id=="ok"){
				if (msg==""){
		 			Ext.Msg.alert("输入提示","名称不能为空！");
		 			return;
		 		}
		 		if (checkValExist(obj,msg) ){
		 			Ext.Msg.alert("输入提示",msg+"已经存在！");
		 			return;
		 		}
		 		addOption(obj,msg,msg);
			}
		},this);
	},
	/**
	 * 删除选中的值
	 * @param {} field
	 */
	delOption:function(field){
		var obj = $(field);		
		removeAllSelItem(obj);
		ucapVersion.setCount();
	},
	/**
	 * 设置要打包的文件个数
	 */
	setCount:function(){
		$("countFiles").innerHTML="(共"+$("packFilesSelect").options.length+"个文件)";
	},
	show:function(obj){
		$("allFile").innerHTML=obj.value;
	},
	upgrade:{
		tabs:"",
		//解压路径
		upgradePath:ucapHeader.attrCfgPath+"/upgrade",
		realPath:"",
		isNew:false,
		init:function(unid){
			this.tabs = new Ext.TabPanel({
		        applyTo: '_pack_tabs',
		        autoTabs:true,
		        deferredRender:false,
		        autoHeight:true,
		        activeTab: 0,
		        animScroll:true,
		        plain:true,
		        enableTabScroll:true,
		        autoWidth:true
		  	 });
		  	if(typeof unid=="undefined") unid="";
		  	if (unid=="") {
		  		this.tabs.items.itemAt(1).disable();
		  		this.isNew = true;
		  		$("maxAttr").innerHTML=ucapHeader.attrFileSizeMax+"M";
				$("attr_Path").innerHTML=this.upgradePath;
		  		Ext.getCmp("ucap_pack_exec").disable();
		  	} else {
		  		this.isNew = false;
		  		$("upFile").style.display="none";
		  		Ext.getCmp("ucap_pack_exec").hide();
		  		$("dbback").style.display="none"; 
		  		//根据unid获取值更新记录的值
		  		var req ={
					url : ucapSession.baseAction,
					params : {
						"type" : "versionRenew",
						"act" : "getUpgradeValue",
						"unid":unid
					},
					callback : function(options, success, response) {
						if (success && response.responseText!="") {
							var json = Ext.util.JSON.decode(response.responseText);
							for (var key in json) {
								if ($(key)){
									$(key).value = json[key];
								}
							}
							ucapVersion.setSelect("updateFiles");
						} 
					}
				};
				Ext.Ajax.request(req);
		  	}
		},
		upFile:function(){
			var fileName = $F("file");
			var files = fileName.split("\\");
			fileName = files[files.length-1];
			if(fileName==""){
				Ext.Msg.alert("提示信息", "上传的更新包不能为空！")
				return;
			}
			if (fileName.toLowerCase().indexOf(".zip")<0){
				Ext.Msg.alert("提示信息","更新包的扩展名必须为zip!");
				return
			}
			fileName = this.upgradePath+"/"+fileName;
			var realName = fileName;
			this.realPath  =realName.toLowerCase().replace(".zip","");//实际路径
			
			fileName = encodeURIComponent(encodeURIComponent(fileName)) ;
			//realName = encodeURIComponent(encodeURIComponent(realName)) ;
			Ext.getDom("fileUploadForm").action = "BackGroundService.upload?upgradeFileName="+fileName
					+"&upgradePath="+encodeURIComponent(encodeURIComponent(this.upgradePath));
			Ext.getDom("fileUploadForm").target="upload_hidd";
			Ext.getDom("hidd_fileUploadForm_submit").click();
			_UcapForm.tool.showLodingMsg("","正在上传更新的包，请稍等...");
			var getValue = function(){
				Ext.Ajax.request({url:appPath+'BackGroundService.upload?uploadStatus=&'+ucapCommonFun.getRandomString(), 
					success : function(a) { 
						var uploadInfo = Ext.decode(a.responseText);
						if(a.responseText=="false" || (uploadInfo["ReadTotalSize"]==uploadInfo["UploadTotalSize"])){
							_UcapForm.tool.hideLodingMsg();
							runner.stop(tasker);
							runner.stopAll();
							var size =parseInt(uploadInfo["UploadTotalSize"],10)/1024/1024
							size = Math.round(size,2);
							if (size>ucapHeader.attrFileSizeMax){
								Ext.Msg.alert("","上传文件的大小为"+size+"M,超过系统规定的大小"+ucapHeader.attrFileSizeMax+"M!");
								return;
							}
							//以下是获取更新包的信息传输到前台
							var req ={
								url : ucapSession.baseAction,
								params : {
									"type" : "versionRenew",
									"act" : "getCfgUpgrade",
									"fileName":realName,
									"upgradePath":ucapVersion.upgrade.upgradePath
								},
								callback : function(options, success, response) {
									if (success && response.responseText!="") {
										var json = Ext.util.JSON.decode(response.responseText);
										if (json && json["packTime"]){
											for (var key in json) {
												if ($(key)){
													$(key).value = json[key];
												}
											}
											$("packageDesc").value =json["packDesc"];
											$("updateFiles").value =json["packFiles"];
											ucapVersion.setSelect("updateFiles");
											$("countFiles").innerHTML="(共"+$("updateFilesSelect").options.length+"个文件)";
											$("upFile").style.display="none";
											Ext.getCmp("ucap_pack_exec").enable();
											$("backPath").innerHTML=ucapVersion.upgrade.realPath+"/back";
										} else {
											Ext.Msg.alert("提示信息",response.responseText);
										}
									} else {
										Ext.Msg.alert("提示信息","没有找到配置信息！");
									}
								}
							};
							Ext.Ajax.request(req);	
					     	return;
						}
					}
				}); 
			}
			var runner = new Ext.util.TaskRunner();
			var task = {
			    run:getValue,
			    interval: 100 //1 second
			}
			var tasker = runner.start(task);
		},
		backDo:function(){
			if ($F("packTime")==""){
				Ext.Msg.alert("提示信息","请先上传更新包！");
				return;
			}
			var back = checkboxValues("isBack");
			if (back=="1"){
				Ext.getCmp("ucap_pack_exec").setText("执行更新");
				Ext.getCmp("ucap_pack_exec").enable();
			} else {
				Ext.getCmp("ucap_pack_exec").disable();
			}
		},
		//下一步和执行更新操作
		exec:function(){
			Ext.getCmp("ucap_pack_exec").setText("执行更新");
			var back = checkboxValues("isBack")
			if (back!="1"){
				var item = ucapVersion.upgrade.tabs.items.itemAt(1);
				item.show();
				item.enable();
				Ext.getCmp("ucap_pack_exec").disable();
				return;
			};
			var json = ucapCommonFun.getFormJSon("_pack_tabs");
			var packPath = this.realPath;
			
			var req ={
				timeout:999999,
				url : ucapSession.baseAction,
				params : {
					"type" :"versionRenew",
					"act" : "execRenew",
					"realPath":this.realPath
				},
				jsonData:json,
				callback : function(options, success, response) {
					var returnText = response.responseText;
					_UcapForm.tool.hideLodingMsg();
					if (success){
						if ( returnText!="") {
							Ext.Msg.alert("提示信息",returnText)
						} else {
							Ext.Msg.alert("提示信息","本次更新包执行更新成功，请重新启动应用，以使更新生效！")
							window.top.ucapSession.commonWin.close();
						}
						
					} else {
						Ext.Msg.alert("提示信息","与服务器的交互超时！")
					}
				}
			};
			_UcapForm.tool.showLodingMsg("","正在对更新包进行更新操作，请稍等...");
			Ext.Ajax.request(req);	
		}
	}
}