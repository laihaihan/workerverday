Ext.namespace('ucapManagerTree'); 
Ext.namespace('ucapPopedomTree'); 
ucapManagerTree = {
	dataUrl:ucapSession.baseAction+"?act=get&type=managerAction&funid=",
	viewId:"",
	rootJson:null,
	curBelongToAppId:"",
	curBelongToModuleId:"",
	bussinessName:"业务模块",
	menuName:"菜单配置",
	isInitLoad:false,
	/**
	 * 
	 * @param {} viewId
	 * @param {} renderto
	 * @param {} index
	 * @param {} categoryItemType
	 */
	init:function(funid,renderto){
		/*add by jc 20090813 组合当前URL上的参数*/
		//var ourl = Ext.urlDecode(view.purl);
		//delete ourl["type"];
		//url += "&"+Ext.urlEncode(ourl);
		if(!funid){
			//获取根节点对象
			var url = ucapManagerTree.dataUrl+"&"+Math.random();
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			conn.open("GET", url, false);
			conn.send(null);
			var exjson = Ext.util.JSON.decode(conn.responseText);	
			//alert(conn.responseText);
			//$("ucapView").innerText = conn.responseText;
			var exResult=ucapCommonFun.dealException(exjson);
			if(!exResult)return;
			viewTree.rootJson = exjson[0];
			//树形根节点加载完毕
		}
		var loader = new Ext.tree.TreeLoader({
       		url:ucapManagerTree.dataUrl+viewTree.rootJson.unid+"&"+Math.random()
       	});
       	var root = new Ext.tree.AsyncTreeNode({
       		id:"ucapManagerTree-rootid",
           	unid: viewTree.rootJson.unid,
           	text: viewTree.rootJson.text,
           	type:viewTree.rootJson.type,
           	belongToAppId:viewTree.rootJson.belongToAppId,
           	belongToModuleId:viewTree.rootJson.belongToModuleId,
           	sourceType:viewTree.rootJson.sourceType,
           	draggable:false,        
           	//checked:false,
           	expanded: true   // 展开根节点下的节点
       	});
       	var pushJson={ 
             items: [ 
	             { 	 id:'refreshNode',
	                 text: '刷新',
	                 icon:"",
	                 handler:ucapManagerTree.refreshNode
	             },
	             { 	 id:'allCollapse',
	                 text: '全部收起',
	                 icon:"",
	                 handler:function(){ucapManagerTree.contacterTree.root.collapseChildNodes();}
	             },
	             { 	 id:'modifyNode',
	                 text: '修改',
	                 icon:"",
	                 handler:ucapManagerTree.modifyNode
	             },
	             { 	 id:'deleteNode',
	                 text: '删除',
	                 icon:"",
	                 handler:ucapManagerTree.deleteNode
	             },
	             { 	 id:'pushModule',
	                 text: '推送',
	                 icon:"",
	                 handler:ucapManagerTree.pushModule
	             }
             ]
         };
         var updateJson={ 
             items: [ 
	             { 	 id:'refreshNode',
	                 text: '刷新',
	                 icon:"",
	                 handler:ucapManagerTree.refreshNode
	             },
	             { 	 id:'allCollapse',
	                 text: '全部收起',
	                 icon:"",
	                 handler:function(){ucapManagerTree.contacterTree.root.collapseChildNodes();}
	             },
	             { 	 id:'modifyNode',
	                 text: '修改',
	                 icon:"",
	                 handler:ucapManagerTree.modifyNode
	             },
	             { 	 id:'deleteNode',
	                 text: '删除',
	                 icon:"",
	                 handler:ucapManagerTree.deleteNode
	             },
	              { 	 id:'updateModule',
	                 text: '更新',
	                 icon:"",
	                 handler:ucapManagerTree.updateModule
	             }
             ]
         }
         var def={ 
             items: [ 
	             { 	 id:'refreshNode',
	                 text: '刷新',
	                 icon:"",
	                 handler:ucapManagerTree.refreshNode
	             },
	             { 	 id:'allCollapse',
	                 text: '全部收起',
	                 icon:"",
	                 handler:function(){ucapManagerTree.contacterTree.root.collapseChildNodes();}
	             },
	             { 	 id:'modifyNode',
	                 text: '修改',
	                 icon:"",
	                 handler:ucapManagerTree.modifyNode
	             },
	             { 	 id:'deleteNode',
	                 text: '删除',
	                 icon:"",
	                 handler:ucapManagerTree.deleteNode
	             }
             ]
         };
       
        var dictShow = function (node)
          {
          	var treeRightDict=null;
          	node.select();//让右击是选中当前节点     
          	ucapManagerTree.filterBtn(node);
          	//判断当前所在的系统是否为主版本系统 yjy 2010-6-24 add
          	var appId= node.attributes.belongToAppId;
          	var isMainApp = "false";
          	if (appId!="" && (node.attributes.type=="01" || node.text==ucapManagerTree.bussinessName
          	 || ucapManagerTree.menuName==node.text )){
	          	var url = ucapSession.baseAction+"?type=managerAction&act=getAppFlag&appId="+appId;
				var conn = Ext.lib.Ajax.getConnectionObject().conn;
				conn.open("GET", url, false);
				conn.send(null);
				isMainApp = conn.responseText;	
          	}
          	if( (node.attributes.type=="01" || node.text==ucapManagerTree.bussinessName  
          		|| ucapManagerTree.menuName==node.text) 
          	     && isMainApp=="true"){//推送 yjy 2010-6-7新增业务模块全部的推送和更新
          	     	treeRightDict = new Ext.menu.Menu(pushJson);;
          	}else if( (node.attributes.type=="01" || node.text==ucapManagerTree.bussinessName
          			|| ucapManagerTree.menuName==node.text) 
          	     && isMainApp!="true"){//更新
          		 treeRightDict = new Ext.menu.Menu(updateJson); 
          	}else{
          		 treeRightDict = new Ext.menu.Menu(def);
          	}
            treeRightDict.show(node.ui.getAnchor());                             
         };
       /************************** 创建表格面板**************************/
       var contacterTree = new Ext.tree.TreePanel({
			border:false,
			lines:true,            //为false去掉树的线
			rootVisible:true,              
			autoScroll:true,
			animate:true,    
			autoHeight : true,
			autoWidth : true,
			renderTo : renderto,         
			enableDD: false,         // 允许树可以拖拽
			containerScroll: true,
           	//设置数据加载
           	loader:loader ,
           	//设置树形的根节点
           	root:root,
           	listeners:{
              	click : this.openRight,
               	beforeload:function(node){ 
               		var unid = node.attributes.unid;
	               	var url = ucapManagerTree.dataUrl+(unid||"");
	               	if(!node.isLeaf()){
				  		var type = node.attributes.type;//类型（系统00/模块01/平台02）
				  		switch(type){
							case "00":{//系统
								//给url加上当前节点unid(即系统unid)
								url += "&belongToModuleId=&belongToAppId="+unid;
								break;
							}
							case "01":{//模块
								//给url加上当前节点unid(即模块unid)、当前节点的系统unid(即系统unid)
								var belongToAppId = node.attributes.belongToAppId;
								url += "&belongToModuleId="+unid+"&belongToAppId="+belongToAppId;
								break;
							}
							default:{
								var belongToAppId = node.attributes.belongToAppId;
								var belongToModuleId = node.attributes.belongToModuleId;
								url += "&belongToModuleId="+belongToModuleId+"&belongToAppId="+belongToAppId;
							}
						}
						//《----测试
						//var conn = Ext.lib.Ajax.getConnectionObject().conn;
						//conn.open("GET", url, false);
						//conn.send(null);
						//$("ucapView").innerHTML += "<br/>"+url+conn.responseText;
						//测试-----》
						this.loader.url = url;
					}
		        },
		        load:function(node){
		        	if(null==node)return;
		        	var _fn = function(ne){
		        		if(!ne.isLeaf()){
		        			ne.expand();
		        			if(ne.firstChild)_fn(ne.firstChild);
		        		}else{
		        			ne.select();
		        			ucapManagerTree.openRight(ne);
		        			ucapManagerTree.isInitLoad = true;
		        		}
		        	};
		        	//选择展开的第一个子节点，并且打开
		        	if(!ucapManagerTree.isInitLoad){
		        		_fn(node);
		        	}
		        }
           	}//end listeners
     	});
     	 contacterTree.on('contextmenu', dictShow);
     	ucapManagerTree.contacterTree = contacterTree;
     	root.select();
     	ucapManagerTree.filterBtn(root);
     	//打开第一个可以展示右边数据的节点
     	ucapManagerTree.openRight(root);
  	}//end init
  	,
  	openRight:function(node){
  		//alert(node.attributes.unid);
  		if(null==node)return;
  		var sourceType = node.attributes.sourceType;//来源类型(JS00/视图01/分类02/URL03)
  		var sourceUnid = node.attributes.sourceUnid;//来源内容
  		var type = node.attributes.type;//类型（系统00/模块01/平台02）
  		var edit = node.attributes.edit;//是否可编辑（否0/是1）
  		var unid = node.attributes.unid;
  		//用于设置叶子节点并且来源不是分类时的所属系统及模块
  		if(node.isLeaf() && sourceType!="02"){
  			ucapManagerTree.curBelongToAppId = node.attributes.belongToAppId||"";
  			ucapManagerTree.curBelongToModuleId = node.attributes.belongToModuleId||"";
  		}
  		//if(sourceType)
  		switch(sourceType){
			case "00":{//js
				ucapManagerTree.openJS(node,sourceUnid);
				break;
			}
			case "01":{//视图
				ucapManagerTree.openView(node,sourceUnid);
				break;
			}
			case "02":{//分类
				ucapManagerTree.openAssort(node,sourceUnid);
				break;
			}
			case "03":{//URL
				ucapManagerTree.openUrl(node,sourceUnid);
				break;
			}
			default:{
				alert("来源类型配置错误sourceType="+sourceType);
			}
		}
		ucapManagerTree.filterBtn(node);
	},
	//打开JS
	openJS:function(node,sourceUnid){
		if (window.top != window.self) {
			eval("window.top."+sourceUnid);
		}else{
			eval(sourceUnid);
		}
	},
	//打开视图
	openView:function(node,sourceUnid){
		//var divId = "ucapView";
		//$(divId).innerHTML = "";
		var viewId = sourceUnid;
		//view.initview(viewId,divId);
		var belongToAppId = node.attributes.belongToAppId;
		var belongToModuleId = node.attributes.belongToModuleId;
		var purl = "&belongToAppId="+belongToAppId+"&belongToModuleId="+belongToModuleId;
		//alert(purl);id, isMenu, title,purl,bModuleUnid,outTbarHeight,noQuery,noPreview,noSelfConfig,tabsp
		//node.id+"_"给分级管理的视图加上ID允许不同的节点相同的视图能进行多次打开
		ucapCommonFun.indexOpen.openView(viewId,0,node.text,purl,"","","","","",node.id+"_");
		//initView(viewId,divId,"","",purl);
		view.viewUrl = "";
		if (Ext.getDom(ucapSession.leftArrowheadId)) {
			Ext.getDom(ucapSession.leftArrowheadId).style.display = "";
		}
	},
	//打开url
	openUrl:function(node,sourceUnid){
		var url = sourceUnid;
		ucapCommonFun.moduleMenuClk(url,"02","02","");
		//alert("打开URL"+url);
	},
	//打开分类
	openAssort:function(node,sourceUnid){
		//alert("打开分类");
	},
	//修改
	modifyNode:function(){
		var node = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
		var type = node.attributes.type;
		var unid = node.attributes.unid;
		var edit = (node?node.attributes.edit:"");
		if(edit!="1"){
			Ext.Msg.alert("系统提示","【"+node.attributes.text+"】是系统资源,不允许修改!")
			return;
		}
		var formType = "";
		var formId = "";
		var height,width;
		switch(type){
			case "00":{//系统00
				formType = "01";
				formId = "E8C39880D4FE6B8E8D826F89272CC9DF";
				ucapManagerTree.openDoc(unid,formType,formId,height,width,unid);
				break;
			}
			case "01":{//模块01
//				formType = "02";
//				formId = "02303CFE7296D94BF137A2B0CBF94EE1";
//				height=200;
//				width=550;
//				ucapManagerTree.openDoc(unid,formType,formId,height,width);
				ucapManagerTree.newModule(unid);
				break;
			}
			case "02":{//平台02
				break;
			}
			default:{//默认
				formType = "02";
				formId = "8A831C618C4759250584A16B2FCCE470";
				height=500;
				width=650;
				ucapManagerTree.openDoc(unid,formType,formId,height,width,unid);
			}
		}
		
	},
	//删除
	deleteNode:function(){
		var node = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
		if(null==node){
			Ext.Msg.alert("请选择一个要删除的节点！");return;
		}
		if(node.id=="ucapManagerTree-rootid"){
			Ext.Msg.alert("禁止删除根节点！");return;
		}
		if(node.id=="475C4D7E257F5EAF7CCDF46AE0FE35BD"){
			Ext.Msg.alert("禁止删除此系统！");return;
		}
		var edit = (node?node.attributes.edit:"");
		if(edit!="1"){
			Ext.Msg.alert("此节点禁止删除");
			return;
		}
		Ext.Msg.confirm("系统提示","此操作无法恢复！确定要删除选择的节点吗？",function(a,b){
			if(a=="yes"){
				var unid = node.attributes.unid;
				var type = node.attributes.type||"";
				var url = ucapSession.baseAction+"?act=delete&type=managerAction&funid="+unid+"&nodeType="+type;
				var conn = Ext.lib.Ajax.getConnectionObject().conn;
				conn.open("GET", url, false);
				conn.send(null);
				if(conn.responseText=="1"){
					node.remove();
					Ext.Msg.alert("系统提示","删除操作成功!");
				}
			}
		});
		
		//$("ucapView").innerHTML += "<br/>"+conn.responseText;
	},
	/**
	 * @param {} type =1  为推送 2 为更新
	 */
	pushOrUpdate:function(type){
		var node = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
		var appUnid=node.attributes.belongToAppId;
		var moduleUnid=node.attributes.unid;//业务模块UNID
		var moduleName=encodeURI(encodeURI(node.text));//模块名称
		var unid = node.attributes.unid;
		if (node.text == this.menuName){
			//说明是菜单的推送
			moduleUnid = node.attributes.relsourceApp; //取主系统对应UNID
		};
		if (node.text == this.bussinessName){
			//说明是业务模块推送
			moduleUnid="";//把模块的UNID清空
		};
		var typeName="推送";
		var opType="push";
		if (type==2){
			opType="update";
			typeName ="更新";
		};
		var valChecked=function(typeName){
			compareResultTree.valChecked(typeName);
		};
		var html="sys/cfgJsp/pushUpdate/compare.jsp?appUnid="+appUnid+"&moduleUnid="+moduleUnid+"&moduleName="+
					moduleName+"&opType="+opType;
		var button=[
			{text:typeName,handler:function(){
				valChecked(typeName);
			}},
			{text:"取消",
					handler:function(){ucapSession.commonWin.close()}
		}];
		ucapSession.commonWin = new window.top.Ext.Window({
			title:ucapSession.win.winImg+"请所选所要"+typeName+"的资源",
		    width:650,
		    closable:true,    //取消
		    modal: true,     
			height:400,
			autoScroll:true,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapSession.commonWin.show();		
	},
	//推送
	pushModule:function(){
		ucapManagerTree.pushOrUpdate(1);
	},
	//更新
	updateModule:function(){
		ucapManagerTree.pushOrUpdate(2);
	},
	searchNode:function(){
	},
	//复制
	copyNode:function(){
		var node = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
		if(null==node){
			alert("请选择一个要复制的节点");return;
		}
		Ext.Msg.confirm("系统提示","确定要进行复制操作吗？",function(a,b){
			if(a=="yes"){
				var unid = node.attributes.unid;
				var html="sys/cfgJsp/proxool/proxool.jsp?unitId=notNull&unid="+unid;
			var button=[
				{text:"确定",handler:function(){
					window.top.proxoolFun.valModify("","",win);
					}},
				{text:"取消",
						handler:function(){win.close()}
			}];
		var win = ucapSession.commonWin = new window.top.Ext.Window({
			title:ucapSession.win.winImg+"指定业务库",
		    width:650,
		    closable:true,    //取消
		    modal: true,     
			height:400,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapSession.commonWin.show();
//				var url = ucapSession.baseAction+"?act=copy&type=managerAction&funid="+unid+"&"+Math.random();
//				var conn = Ext.lib.Ajax.getConnectionObject().conn;
//				conn.open("GET", url, false);
//				conn.send(null);
//				if(conn.responseText=="1"){
//					ucapManagerTree.refreshNode();
//					Ext.Msg.alert("系统提示","复制操作成功!");
//				}
				
			}
		});
		//$("ucapView").innerHTML += "<br/>"+conn.responseText;
	},
	//刷新
	refreshNode:function(isParant){
		//ucapManagerTree.init("","ucapMainLeft");
		try{
			var node = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
			if(node){
				if(!node.isLeaf()){
					if(isParant){
						node.parentNode.reload();
						node.select();
					}else{
						node.reload();
					}
				}
				else{
					node.parentNode.reload();
					node.parentNode.select();
				}
			}
			else ucapManagerTree.contacterTree.root.reload();
		}catch(e){}
	},
	//新建节点
	newNode:function(formId,formType,height,width){
		var node = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
		var obj = {};
		obj.belongToModuleId = node.attributes.unid;
		ucapManagerTree.newSystem.call(obj,formId,formType,height,width);
	},
	//新建模块
	newModule:function(unid){//formId,formType,height,width
		this.topWindow = window.top;
		var node = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
		var funid = node.attributes.unid;
		var belongToAppId =node.attributes.belongToAppId;
		var html="sys/cfgJsp/manager/businessModule.jsp?unid="+unid+"&funid="+funid+"&belongToAppId="+belongToAppId;
		//var html="sys/cfgJsp/view/viewcolumns.jsp?viewId="+viewId;
		var button=[{text:"确定",handler:function(){sysConfigFun.moduleInfoConfirm(unid);}},
					{text:"取消",handler:function(){ucapSession.commonWin.close();}}	
			];
			ucapSession.commonWin = new this.topWindow.Ext.Window({
				title:ucapSession.win.winImg+"模块设置",
		        width:600,
		        closable:true,    //取消
		        modal: true,     
				height:160,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		ucapSession.commonWin.show();
//		var node = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
//		var obj = {};
//		obj.belongToAppId = node.attributes.unid;
//		obj.appUnid=node.attributes.belongToAppId;
//		ucapManagerTree.newSystem.call(obj,formId,formType,height,width);
	},
	//新建系统
	newSystem:function(formId,formType,height,width){
		var belongToAppId = this.belongToAppId||"";
		var belongToModuleId = this.belongToModuleId||"";
		var purl = "belongToAppId="+belongToAppId+"&belongToModuleId="+belongToModuleId+"&appUnid="+this.appUnid;
		ucapCommonFun.indexOpen.newDocument(formType,formId,height,width,purl);
	},
	openDoc:function(unid,formType,formId,height,width,purl,belongToAppId){
		 //无流程的打开
		var url = ucapSession.appPath +"sys/jsp/";
		url+="document.jsp?unid="+unid+"&belongToAppId"+belongToAppId+"&type="+formType+"&formId="+formId+"&"+(purl||"");
		ucapCommonFun.ucapOpenDoc(url,1,"",height,width);
	},
	
	/**
	 * 生成模块代码
	 */
	generateCode:function(){
		var node = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
		var moduleId =node.attributes.unid;
		var appUnid = node.attributes.belongToAppId;
		var operateType="module";//node.attributes.type;
		if(moduleId ==""){
			Ext.Msg.alert("验证提示","模块标识不能为空！");
			return;
		}
		window.open(ucapSession.appPath+"CODE/index.jsp?moduleId="+moduleId+"&appUnid="+appUnid);
	},
	//按钮使用权限的过滤
	filterBtn:function(node){
		var type = (node?node.attributes.type:"");
		var fn = function(str){
			var btns = Ext.query("div#ucapSystemButtonListBox li");
			var str_btns = Ext.query("div#ucapSystemButtonListBox li"+str);
			if(btns)Ext.each(btns,function(btn){
				btn.disabled=false;
				if(ucapCommonFun.getAttr(btn,"onck")!="1"){
					ucapCommonFun.setAttr(btn,"onck","1");
					switch(ucapCommonFun.getAttr(btn,"btnType")){
						case "01":{
							Ext.get(btn).on("click",function(){ucapManagerTree.newNode('8A831C618C4759250584A16B2FCCE470','02',500,650);});
							break;
						}
						case "02":{
							Ext.get(btn).on("click",function(){ucapManagerTree.newSystem('E8C39880D4FE6B8E8D826F89272CC9DF','01');});
							break;
						}
						case "03":{
							Ext.get(btn).on("click",function(){ucapManagerTree.newModule('');});
							break;
						}
						case "04":{//刷新
							Ext.get(btn).on("click",function(){ucapManagerTree.refreshNode();});
							break;
						}
						case "05":{//复制
							Ext.get(btn).on("click",function(){ucapManagerTree.copyNode();});
							break;
						}
						case "06":{//修改
							Ext.get(btn).on("click",function(){ucapManagerTree.modifyNode();});
							break;
						}
						case "07":{//删除
							Ext.get(btn).on("click",function(){ucapManagerTree.deleteNode();});
							break;
						}
						case "08":{//代码生成
							Ext.get(btn).on("click",function(){ucapManagerTree.generateCode();});
							break;
						}
					}
				}
			});
			if(str_btns)Ext.each(str_btns,function(btn){
				btn.disabled=true;
			});
		};
		var str = "";
		switch(type){
			case "00":{//系统00
				str = '[btnType=02],[btnType=03],[btnType=08]';
				if(node.attributes.belongToAppId && node.attributes.belongToAppId!=""){
					//禁止复制副本系统
					str += ',[btnType=05]';
				}else if(node.attributes.unid=="475C4D7E257F5EAF7CCDF46AE0FE35BD"){
					//禁止复制平台设计管理系统
					str += ',[btnType=05]';
				}
				break;
			}
			case "01":{//模块01
				str = '[btnType=02],[btnType=03],[btnType=05]';
				break;
			}
			case "02":{//平台02
				str = '[btnType=03],[btnType=05]';
				break;
			}
			case "03":{//平台02
				str = '[btnType=02]';
				break;
			}
			default:{
				var sourceType = (node?node.attributes.sourceType:"");
				//alert(sourceType);//来源类型(JS00/视图01/分类02/URL03)
				switch(sourceType){
					case "02":{//分类
						str = '[btnType=02],[btnType=03],[btnType=05]';
						var text = (node?node.text:"");
						if(text=="业务模块"){
							str = '[btnType=02],[btnType=05]';
						}
						break;
					}
					default:{
						str = '[btnType=01],[btnType=02],[btnType=03],[btnType=05]';
					}
				}
			}
		}
		var edit = (node?node.attributes.edit:"");
		if(edit!="1")str+=",[btnType=06],[btnType=07],[btnType=08]";
		fn(str);
	}
};

var sysConfigFun={
	moduleInfoConfirm:function(unid){
		//var topWin = viewConfig.topWindow;
		//if(null==topWin)topWin = window;
		var json = ucapCommonFun.getFormJSon("dialogHtml");
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"managerAction","act":"saveModule","tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					ucapSession.commonWin.close();
					if(unid && ""!=unid){
						ucapManagerTree.refreshNode(true);
					}else{
						ucapManagerTree.refreshNode();
					}
				} else {
					topWin.Ext.Msg.alert("提示","视图基本信息自定义不成功！");
					ucapSession.commonWin.close();
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}
};

//ucapPopedomTree = function(){
//	
//	return {
//		init:function(){
//			
//		}
//	};
//}
ucapPopedomTree = {
	dataUrl:ucapSession.baseAction+"?act=get&type=popedomAction&roleId=",
	rootJson:null,
	roleId:null,
	/**
	 * 
	 * @param {} viewId
	 * @param {} renderto
	 * @param {} index
	 * @param {} categoryItemType
	 */
	init:function(type){
		var roleId = "";
	    if("undefined"!=typeof(type) && 1==type){
			roleId=Ext.getDom("unid").value;
		}else{
			roleId=view.getSelecedUnid();
			 if(null!=roleId && roleId.indexOf(",")>0){
	           roleId = roleId.substring(0,roleId.indexOf(","));
	       }
		}
		if(roleId==""){
            Ext.MessageBox.alert("信息提示","请选择要配置的角色！");//把用户改成了相应的角色
            return;
        }
		ucapPopedomTree.roleId = roleId;		
		
		var renderto = "ucapPopedomTree-div-tree";
		var html = '<div id="'+renderto+'"></div>';
		var button = null;
		var sTitle = "权限配置对话框";
		var height = document.body.clientHeight-50;
		var width = document.body.clientWidth/2;
		var button=[
			{text:"确定",handler:function(){
					var tree = ucapPopedomTree.contacterTree;
					var nodes = tree.getChecked();	
					//alert(nodes.length);
					var unid = "";
					for(var i=0;i<nodes.length;i++){
						unid += ","+nodes[i].attributes.unid;
					}
					var json = {id:unid.substring(1)};
					var requestConfig = {
						url:ucapSession.baseAction,
						params:{type:"popedomAction",act:"update",roleId:ucapPopedomTree.roleId},
						jsonData:json,
						callback:function(options,success,response){
							if (success){
//								var exjson = Ext.decode(response.responseText);
//								var exResult=ucapCommonFun.dealException(exjson);
//								if(!exResult)return;
//								alert(response.responseText);
								var result = response.responseText;								
								if(result=="0")alert("设置失败");
								else{
									alert("设置成功!");
									ucapSession.commonWin.close();
								}
							}
						}
					}
				Ext.Ajax.request(requestConfig);
			}},
			{text:"取消",handler:function(){ucapSession.commonWin.close()}}	
		];
		
		ucapSession.commonWin = new Ext.Window({
			title:ucapSession.win.winImg+(sTitle||"选择对话框"),
	        closable:true,    //关闭
	        modal: true,     
	        bodyStyle:ucapSession.win.winBodyStyle,
	        autoScroll:true,
	        height:height,
	        width:width,
			html:html,
			//autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapSession.commonWin.show();
		//alert($("ucapPopedomTree-div-tree"));
		var loader = new Ext.tree.TreeLoader({
       		url:ucapPopedomTree.dataUrl+roleId+"&"+Math.random(),
       		baseAttrs: {uiProvider: Ext.ux.TreeCheckNodeUI}
       	});
       	var root = new Ext.tree.AsyncTreeNode({
           	unid: "",
           	text: "权限配置根节点",
           	draggable:false,        
           	checked:false,
           	expanded: true   // 展开根节点下的节点
       	});
       	var contacterTree = new Ext.tree.TreePanel({
			border:false,
			lines:true,            //为false去掉树的线
			rootVisible:false,              
			autoScroll:true,
			animate:true,    
			autoHeight : true,
			autoWidth : true,
			renderTo : renderto,         
			enableDD: false,         // 允许树可以拖拽
			containerScroll: true,
			onlyLeafCheckable:false,  //是否只允许选择叶子节点
			checkModel:"cascade",                //是否为单选或级选择
           	//设置数据加载
           	loader:loader ,
           	//设置树形的根节点
           	root:root,
           	listeners:{
              	click : function(){},
               	beforeload:function(node){ 
               		this.loader.url = ucapPopedomTree.dataUrl+roleId+"&"+Math.random();
               	}
           	}
       	});
       	contacterTree.expandAll();//展开全部
       	ucapPopedomTree.contacterTree = contacterTree;
       	//ucapPopedomTree.contacterTree.checkModel = "childCascade";
	}

};