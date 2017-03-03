/**
 * 菜单定制 模块定制方法
 * @author yjy
 */
Ext.namespace('ucapMenuConfig'); 

var ucapMenuConfig={
	/**
	 * 1表示是菜单定制 2表示是模块定制
	 * @type Number
	 */
	type:1,
	/**
	 * html类型 1表示菜单项 2表示模块根 3表示模块的项 4表示菜单的根
	 * @type Number
	 */
	htmlType:1,
	title:"",
	leftWidth:185,
	displayName:"",
	saveNewImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_103.gif" +'"/>',
	saveImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_29.gif" +'"/>',
	closeImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_102.gif" +'"/>',

	rootUnid:"",   //根节点UNID
	belongToAppId:"",   //所属系统UNID
	treeJson:[],      //树的来源值
	oldJson:[],  //旧的json值
	html:"",
	tree:null,  //当前树的对象
	root:null,  //根节点的对象
	newRootId:"_ucapMenuNew",
	height:500,
	saveFlag:false, //当前菜单是否有更改过的标志，主要是用来刷新父页面
	isNewFlag:false, //判断是否为新增状态，在保存后，此值设置为false,新建时设置为true
	preHtml:"", //前一步的HTML，避免html重复加载
	cutNode:null,  //剪切的节点对象
	win:"",
	innerHtml_1:null,
	innerHtml_2:null,
	innerHtml_3:null,
	innerHtml_4:null,
	/**
	 * 初始化相关变量值
	 */
	initValue:function(){
		this.oldJson = null;
		this.preHtml ="";
		this.tree = null;
		this.treeJson=[];
	},
	/**
	 * 分级管理中打开菜单定制对话框 public
	 * @param node 当前节点对象
	 */
	openMenu:function(node){
	 var belongToAppId = node.attributes.belongToAppId;
	 if(belongToAppId&&belongToAppId!="")
	 {
	 	this.belongToAppId=belongToAppId;
	 }
	 this.openMenuConfig();
	},
	/**
	 * 打开菜单定制对话框 public
	 * @param isNew 如果为真，说明是要新建一个菜单
	 * @param isNotInitWin 是否不用初始化窗口，为空默认为需要
	 */
	openMenuConfig:function(isNew,isNotInitWin){
	 //	isNew  = true;
		if (typeof(isNotInitWin)=="undefined") isNotInitWin  = false;
		
		this.initValue();
		if (!isNew || typeof(isNew)=="undefined"){
			this.isNewFlag = false;
		} else {
			this.isNewFlag = isNew;
		}
		this.type=1;
		this.title="系统"; 
		this.displayName="应用系统";
		if (!isNotInitWin) ucapMenuConfig.initWinBox();
		//装载菜单对象
		this.createMenuTree();
	},
	/**
	 * 视图上的打开文档
	 * @param {} moduleUnid
	 */
	openModeuleByView:function(moduleUnid){
		(window.top.ucapMenuConfig||this).openModuleConfig(moduleUnid);
		//this.openModuleConfig(moduleUnid);
	},
	/**
	 * 打开模块定制对话框 public
	 * @param moduleUnid 如果为空，说明是要新建一个菜单
	 * @param isNotInitWin 是否不用初始化窗口，为空默认为需要
	 */
	openModuleConfig:function(moduleUnid,isNotInitWin){
		var isNew = false;
		if (typeof moduleUnid =="undefined" || moduleUnid=="") {
			moduleUnid="";
			isNew =true;
		}
		if (typeof isNotInitWin =="undefined") isNotInitWin ="";
		this.initValue();
		this.isNewFlag = isNew;
	    this.html="sys/cfgJsp/menuModule/moduleRoot.jsp";
		this.type=2;
		this.title="模块"; 
		if (this.isNewFlag){
			this.rootUnid = this.newRootId;
			this.displayName = "新建模块";
		} else {
			this.createModuleTree(moduleUnid);
		}
		if (isNotInitWin=="")  this.initWinBox();
		this.createTree();
	},
	/**
	 * 生成树型菜单
	 */
	createMenuTree:function(){
		if (this.isNewFlag){
			//说明是新建菜单		
			ucapMenuConfig.rootUnid = this.newRootId;	
			ucapMenuConfig.createTree();
			return;
		}
		if(this.belongToAppId&&this.belongToAppId!=""){
			var menuActionParams={type:"menu",act:"getAllMenu",menuType:"tree",edit:"1",belongToAppId:this.belongToAppId};
		}else{
			var menuActionParams={type:"menu",act:"getAllMenu",menuType:"tree",edit:"1"};
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:menuActionParams,
			callback:function(options,success,response){
				
				if (response.responseText==""){
					ucapMenuConfig.isNewFlag = true;
					ucapMenuConfig.rootUnid = ucapMenuConfig.newRootId;	
					ucapMenuConfig.createTree();
					return;
				} else	if (success){
					var json = Ext.util.JSON.decode(response.responseText);					
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					if (typeof json.uiMenu == "undefined"){
						ucapMenuConfig.treeJson =[];
					} else{
						ucapMenuConfig.treeJson = json.uiMenu;
					}
					ucapMenuConfig.rootUnid = json.unid;
					ucapMenuConfig.displayName = json.name;
					ucapMenuConfig.createTree();
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 生成模块菜单
	 */
	createModuleTree:function(moduleUnid){
		var url =ucapSession.baseAction;
		url+="?type=module&act=getModuleMenuConfig&moduleUnid="+moduleUnid+
				"&random="+ucapCommonFun.getRandomString();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);			
		var result = conn.responseText;
		if (result.indexOf("error")>-1){
			Ext.Msg.alert("提示","从后台获取模块内容时出错，模块的ID为"+moduleUnid);
			return "";
		}
		var json = Ext.decode(result);
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		this.displayName = json.displayName;
		this.moduleUnid = json.unid;  	
		this.rootUnid = this.moduleUnid;
		if (typeof json.uiModule =="undefined"){
			this.treeJson=[];
		} else {
			this.treeJson = json.uiModule;
		}
		//ucapModule.json = this.treeJson;
		//ucapModule.allJson.unid =this.moduleUnid;
		//ucapModule.displayName = this.displayName;
	},
	
	/**
	 * private
	 */
    initWinBox:function(){   
     	var buttonItems=[
	  		//{text: '复制',id:"copy", handler: onItemClick},
	      //  {text: '剪切',id:"cut", handler: onItemClick},
	      //  {text: '粘贴',id:"paste",disabled:true, handler: onItemClick},
	      //  {text: '移动',id:"move", handler: onItemClick},
	        {text: '重命名',id:"menuFileRename",handler:onItemClick},'-',
	        {text: '删除', id:"menuFileDelete",handler: onItemClick}
	  		];
		var toolbar=[
	    	{text: '文件',menu :{items: [{text: '新建',id:"menuFileNew", handler: onItemClick},'-',
	                        {text: '关闭',id:"menuFileClose", handler: onItemClick}]}},
	        {text: '编辑', menu :{items: buttonItems}},
	        {text: '查看',menu :{items: [{text: '展开',id:"menuExpand", handler: onItemClick},
	        	{text: '折叠',id:"menuCollapse", handler: onItemClick},
	        	{text: '全部展开',id:"menuExpandAll", handler: onItemClick},
	        	{text: '全部折叠',id:"menuCollapseAll", handler: onItemClick}
	        	]}},
	          '-',
	         {text: '新建',id:"menuNew", handler: onItemClick},
	         {text: '删除', id:"menuDelete",handler: onItemClick},
	         {text:'恢复默认',id:"menuRecover",handler:onItemClick},
	         {text:'变更生效',id:"menuAppChange",handler:onItemClick},
	         '-'
	      ];
    	ucapMenuConfig.win = new Ext.Window({
            title: ucapSession.win.winImg+this.title+'定制窗口',
            closable:true,
            width:700,
            height:this.height,
            modal: true, 
            bodyStyle:ucapSession.win.winBodyStyle,
            tbar:toolbar,
            plain:true,
            layout: 'border',
            items:[
            	{title:'<div id="menuConfigTitle"></div>',
	             region:'west',	            
	             html:'<div id="leftTree">正在加载菜单，请稍等......</div>',
	             width:this.leftWidth,
	             autoScroll:true,
	             collapsible:true, 
	             split: true},
	            {
	             id:"centerId",
	             region:"center",
	             html:'<div id="ucapCenter"></div>',
	          //   bodyStyle:ucapSession.win.winBodyStyle,
//	             autoLoad:{url:ucapSession.appPath+this.html,scripts:true,nocache: true},
	             buttonAlign:"right",
	             tbar:['->',
	             	{text:this.saveNewImg+"保存并新增下一个",handler:function(){
	             				ucapMenuConfig.save("",1)} },
	             	{text:this.saveImg+"保存",id:"menuSave",handler:function(){
	             				ucapMenuConfig.save()} },
	             	{text:this.closeImg+"关闭",id:"menuClose",handler: onItemClick}
	             	]
	            }          
            ]
        });
        ucapMenuConfig.win.show();  
        var bar = ucapMenuConfig.win.getTopToolbar();
        bar.addField(
        	new Ext.form.Checkbox({name:'saveInfo',fieldLabel:'1',
        	   boxLabel:'保存成功时有提示',checked:true})        		
        );
     	if (ucapSession.userJson.userStatus==1){
     		Ext.getCmp("menuRecover").setDisabled(true);
     	}     	
     	//注册窗口的关闭事件
     	ucapMenuConfig.win.on("beforeclose",function(){
     		try{
	     		if (ucapMenuConfig.saveFlag && ucapSession.userJson.userStatus!=1){
					
	     			//如果是系统管理员，则不提示
	      			if (ucapMenuConfig.type ==1){
	     				ucapMenu.init();	
	     			} else {
	     				ucapModule.setModuleHtml(ucapModule.moduleUnid,ucapSession.ucapModuleId);
	     			}
	     			ucapMenuConfig.saveFlag = false;					
					
	     		}
     		} catch(e){};
     	});
		
		//2011-12-09 add by xhuatang@linewell.com 添加关闭事件
		ucapMenuConfig.win.on("close", function(){
			//2011-12-09 add by xhuatang@linewell.com 添加对顶部窗口事件注册刷新的支持
            if(window.top.regEvents
              && window.top.regEvents.refresh){
                try {
                    window.top.regEvents.refresh();
                }catch(e){
                    
                }                       
            }
		});
     	
    },
	/**
	 * private
	 */
	createTree:function(){
		this.preHtml = "";
     	this.tree = null;
    	this.htmlType="";
		var title=this.title+"菜单定制";
		this.setWinTitle(title);
	 	Ext.DomHelper.applyStyles(Ext.get("leftTree"),'style="padding:3px 0px 0px 5px;"');
	 	Ext.getDom("leftTree").innerHTML="";
	 	var root;
	 	if (typeof(this.treeJson)!="undefined" ){
		 	root=new Ext.tree.AsyncTreeNode({
				expanded: true,		
				id:this.rootUnid,
				text:this.displayName,
				children: this.treeJson 
			});	
	 	} else {
	 		root=new Ext.tree.AsyncTreeNode({
				expanded: true,		
				id:this.rootUnid,
				leaf:true,
				text:this.displayName
			});	
	 	}
		var tree=new Ext.tree.TreePanel({
			renderTo:"leftTree",
			root:root,
			animate:true,
			rootVisible:true,
			enableDD: true, //允许拖放
			autoScroll:true,
			 containerScroll: true,
			//width:this.leftWidth-5,
			//height:ucapMenuConfig.height-92,//避免模块配置在IE浏览器出现双y轴滚动条的问题  by cgc 2011-11-03
			loader: new Ext.tree.TreeLoader({
				dataUrl:""
			})
		});	
		if(!Ext.isIE){//避免模块配置在IE浏览器出现双y轴滚动条的问题  by cgc 2011-11-03
			tree.setHeight(ucapMenuConfig.height-92);		
		}	
		tree.on("click",function(node){
			if(node.id!=ucapMenuConfig.newRootId){
				ucapMenuConfig.isNewFlag = false;
			}
			ucapMenuConfig.loadHtml();			
		});
		tree.addListener('movenode', ucapMenuConfig.handleMoveNode); 
		
		tree.on('contextmenu', menuShow);
        function menuShow ( node )
          {
          	node.select();//让右击是选中当前节点     
          	ucapMenuConfig.setButtonState(); 
            treeRightMenu.show(node.ui.getAnchor());
                               
         };
        var treeRightMenu = new Ext.menu.Menu({ 
             items: [ 
	             { 	 id:'menuRightNew',
	                 text: '新建',
	                 icon:"",
	                 handler:onItemClick 
	             },                 
	             { 	 id:'menuRightDelete',
	                 text: '删除',
	                 icon:"",
	                 handler:onItemClick 
	             },/*{
	             	 id:"menuCut",
	                 text: "剪切", 
	                 icon: "",
	                 handler:onItemClick
	              },{
	             	 id:"menuPaste",
	                 text: "粘贴", 
	                 disabled:true,
	                 icon: "",
	                 handler:onItemClick
	              },*/{
	                 text: "重命名", 
	                 icon: "",
	                 handler:function(){onItemClick("menuRename")}
	              }
             ]
         });             
		
		
		  //树形节点上的移动
       // tree.on("moveNode",ucapMenuConfig.handleMoveNode);
         // 添加 树的右键菜单
       // tree.on('contextMenu', menuShow);
               
		this.tree  =tree;
		root.select();
		this.root = root;		
		this.loadHtml();
	},
	/**
	 * @param isNotLoad 如果为ture 则不用LOAD 数据，只是进行htmlType类型的判断
	 * private
	 */
	loadHtml:function(isNotLoad){
		var notLoad = false;
		if (typeof(isNotLoad)!="undefined") notLoad = isNotLoad;
		
		var node = this.getSelectNode();
		var unid= node.id;
		var params ;
		//如果是新建子项状态，则要进行判断，如果是在根节点，则以模块子项装载页面
		if (ucapMenuConfig.type==2){
			if (node.id ==this.root.id){
				//如果是根节点，则进行判断
				if (node.id == this.newRootId || !this.isNewFlag){
					//是新建
					this.htmlType =2
				} else {
					this.htmlType =3;	
				}
			} else {
				this.htmlType =3;	
			}
			if (this.htmlType == 2){
				params ={"type":"module","act":"getModuleRoot","unid":unid,"random":ucapCommonFun.getRandomString()};
				ucapMenuConfig.html="sys/cfgJsp/menuModule/moduleRoot.jsp";
			} else {
				params ={"type":"module","act":"getModuleItem","unid":unid,"random":ucapCommonFun.getRandomString()};
				ucapMenuConfig.html="sys/cfgJsp/menuModule/module.jsp";
			}				
		} else {
			if (node.id ==this.root.id){
				//如果是根节点，则进行判断
				if (node.id == this.newRootId || !this.isNewFlag){
					//是新建
					this.htmlType =4
				} else {
					this.htmlType =1;	
				}
			} else {
				this.htmlType =1;	
			}
			if (this.htmlType ==4){
				ucapMenuConfig.html="sys/cfgJsp/menuModule/menuRoot.jsp";
				params ={"type":"menu","act":"getMenuRoot","unid":unid,"random":ucapCommonFun.getRandomString()}; //说明是菜单
			} else {
				ucapMenuConfig.html="sys/cfgJsp/menuModule/menu.jsp";
				params ={"type":"menu","act":"getMenuItem","unid":unid,"random":ucapCommonFun.getRandomString()}; //说明是菜单
			}
		};
		if (notLoad) return;
		if (this.isNewFlag){
			ucapMenuConfig.preHtml ="";
		};
		if(this.htmlType ==1 && ucapMenuConfig.innerHtml_1!=null){
		    Ext.getDom("ucapCenter").innerHTML = ucapMenuConfig.innerHtml_1;
		    ucapMenuConfig.setValue(unid,params);
		    return;
		}else if(this.htmlType ==2 && ucapMenuConfig.innerHtml_2!=null){
		    Ext.getDom("ucapCenter").innerHTML = ucapMenuConfig.innerHtml_2;
		    ucapMenuConfig.setValue(unid,params);
		    return;
		}else if(this.htmlType ==3 && ucapMenuConfig.innerHtml_3!=null){
		    Ext.getDom("ucapCenter").innerHTML = ucapMenuConfig.innerHtml_3;
		    ucapMenuConfig.setValue(unid,params);
		    return;
		}else if(this.htmlType ==4 && ucapMenuConfig.innerHtml_4!=null){
		    Ext.getDom("ucapCenter").innerHTML = ucapMenuConfig.innerHtml_4;
		    ucapMenuConfig.setValue(unid,params);
		    return;
		}
		var url=ucapSession.appPath+ucapMenuConfig.html;
		if (ucapMenuConfig.preHtml!=ucapMenuConfig.html){
			
			var el = Ext.get("ucapCenter");
			var mgr = el.getUpdater();
			mgr.update({
		        url: url,
		        scripts:true
			});			
			mgr.on("update",function(){
				if (ucapSession.userJson.userStatus!=1){
					if (Ext.getDom("systemSet"))
					   Ext.getDom("systemSet").style.display="none";
				};	
				if(ucapMenuConfig.htmlType ==1){
		            ucapMenuConfig.innerHtml_1 = Ext.getDom("ucapCenter").innerHTML;
		        }else if(ucapMenuConfig.htmlType ==2){
		            ucapMenuConfig.innerHtml_2 = Ext.getDom("ucapCenter").innerHTML;
		        }else if(ucapMenuConfig.htmlType ==3){
		            ucapMenuConfig.innerHtml_3 = Ext.getDom("ucapCenter").innerHTML;
		        }else if(ucapMenuConfig.htmlType ==4){
		            ucapMenuConfig.innerHtml_4 = Ext.getDom("ucapCenter").innerHTML;
		        }
				ucapMenuConfig.setValue(unid,params)				
			})
			/*Ext.get("ucapCenter").load({url: url},{},function(){
				if (ucapSession.userJson.userStatus!=1){
					if (Ext.getDom("systemSet"))
					   Ext.getDom("systemSet").style.display="none";
				};				
				ucapMenuConfig.setValue(unid,params)}
		    );*/
		    
		    
		    ucapMenuConfig.preHtml = ucapMenuConfig.html;
		} else {
			ucapMenuConfig.setValue(unid,params);
		}			
	},
	setButtonState:function(){
		if(!Ext.getCmp("menuNew"))return;
		var node = ucapMenuConfig.getSelectNode();
		//进行新建按钮的权限过滤，如果是叶子节点，不能再新建
		if (ucapMenuConfig.root.id == ucapMenuConfig.newRootId){
			//不能新建
			Ext.getCmp("menuNew").setDisabled(true);
			Ext.getCmp("menuRightNew").setDisabled(true);
			Ext.getCmp("menuFileNew").setDisabled(true);
			Ext.getCmp("menuDelete").setDisabled(true);
			Ext.getCmp("menuRightDelete").setDisabled(true);
			Ext.getCmp("menuFileDelete").setDisabled(true);
			return;
		} else {
			Ext.getCmp("menuDelete").setDisabled(false);
			Ext.getCmp("menuRightDelete").setDisabled(false);
			Ext.getCmp("menuFileDelete").setDisabled(false);
		}
		
		/*if (ucapMenuConfig.root.id == node.id){
			//根节点
			Ext.getCmp("cut").setDisabled(true);
			Ext.getCmp("menuCut").setDisabled(true);
		} else {
			Ext.getCmp("menuCut").setDisabled(false);
			Ext.getCmp("cut").setDisabled(false);
		}*/
		if( !node.isLeaf() ||  node.id == ucapMenuConfig.root.id || ucapMenuConfig.oldJson.type=="09" ){
			//允许新建
		    Ext.getCmp("menuFileNew").setDisabled(false);
			Ext.getCmp("menuNew").setDisabled(false);
			Ext.getCmp("menuRightNew").setDisabled(false);	
		} else {
			//不能新建
			Ext.getCmp("menuFileNew").setDisabled(true);
			Ext.getCmp("menuNew").setDisabled(true);
			Ext.getCmp("menuRightNew").setDisabled(true);
		}

	},
	/**
	 * private
	 */
	setValue:function(unid,params,flag){
		if (this.isNewFlag) {
			ucapMenuConfig.setButtonState();
			return; //新建状态，不用加载数据
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			callback:function(options,success,response){
				if (success){
					var json = Ext.decode(response.responseText);					
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
				//	alert("设置"+Ext.encode(json))
					ucapCommonFun.setFormValue(json);
					if (json!=null){
						if (Ext.getDom("interaction_Cn_")){
							Ext.getDom("interaction_Cn_").value =
								ucapCommonFun.getDisplayNames("227",Ext.getDom("interaction").value);
						}
						if (Ext.getDom("unuseScopes_Cn_")){
							Ext.getDom("unuseScopes_Cn_").value = 
								ucapCommonFun.getDisplayNames("200,201,202,203",Ext.getDom("unuseScopes").value);
						}
						if (Ext.getDom("useScopes_Cn_")){
							Ext.getDom("useScopes_Cn_").value =
								ucapCommonFun.getDisplayNames("200,201,202,203",Ext.getDom("useScopes").value);
						}
						try{
							if (Ext.getDom("smallPicture")) titleModuleIconChange(Ext.getDom("smallPicture"));
							if (Ext.getDom("bigPicture")) titleModuleBigIconChange(Ext.getDom("bigPicture"));
							if (Ext.getDom("picture")) titleMenuIconChange(Ext.getDom("picture"));
						}catch(e){};
					}
					ucapMenuConfig.oldJson = ucapCommonFun.getFormJSon("menuConfigdialogHtml");
					ucapMenuConfig.setButtonState();
				} else {
					Ext.Msg.alert("提示","取值不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * name 有值，说明是通过改名进行的
	 * @param {} name
	 * @param newflag 为1，说明是保存并新建下一个
	 */
	save:function(msgName,newflag){
		if (typeof newflag =="undefined") newflag ="";
		var isSaveInfo = ucapCommonFun.getObjValueJson("saveInfo").v;
		
		var isRename = true;
		if (typeof(msgName)=="undefined" || msgName==""){
			isRename = false;		
		}
		var json;
		if (!isRename ){
			json = ucapCommonFun.getFormJSon("menuConfigdialogHtml");
			if (newflag==""){
				if (Ext.encode(ucapMenuConfig.oldJson)==Ext.encode(json)){
					Ext.Msg.alert("保存提示","当前数据未更改，无须保存！");
					return ;
				}
			}
		} else {
			//自己组装Json格式
			ucapMenuConfig.loadHtml(true);
			if (ucapMenuConfig.htmlType==2){
				json = {displayName:msgName};
			} else {
				json = {name:msgName};
			}			
		}
		var node = ucapMenuConfig.getSelectNode();
		var unid = node.id;
		var flag = "";
		if (ucapMenuConfig.isNewFlag) {
			if (node.id==ucapMenuConfig.root.id){
				//说明是在根节点在新建 
				flag="newSaveByRoot";
			} else {
				flag ="newSave";	
			}
		}
		var params;
		if (ucapMenuConfig.htmlType ==1){
			params ={"type":"menu","act":"saveMenuItem",flag:flag,"unid":unid,"random":ucapCommonFun.getRandomString()}; //说明是菜单
		} else if (ucapMenuConfig.htmlType ==2){
			//  增加在分级管理中对模块跟得所属应用系统设置  csj2009.12.29
			if(view.purl.indexOf("belongToAppId")!=-1){
				var belongToAppId="";
				var tempParams =view.purl.split('&');
				for (var i = 0; i < tempParams.length; i++) {
					var temp = tempParams[i].split("=");
					if (temp[0] == "belongToAppId") {
						belongToAppId= temp[1];
						break;
					}
				}
				params ={"type":"module","act":"saveModuleRoot",flag:flag,"unid":unid,"belongToAppId":belongToAppId,"random":ucapCommonFun.getRandomString()};
			//end  增加在分级管理中对模块跟得所属应用系统设置  csj2009.12.29
			}else{
				params ={"type":"module","act":"saveModuleRoot",flag:flag,"unid":unid,"random":ucapCommonFun.getRandomString()};
	   		 }
		} else if (ucapMenuConfig.htmlType ==3){
			params ={"type":"module","act":"saveModuleItem",flag:flag,"unid":unid,"random":ucapCommonFun.getRandomString()};
		} else if (ucapMenuConfig.htmlType ==4){
			if(this.belongToAppId&&this.belongToAppId!=""){
			params ={"type":"menu","act":"saveMenuRoot",flag:flag,"unid":unid,"belongToAppId":this.belongToAppId,"random":ucapCommonFun.getRandomString()};				
			}else{
			params ={"type":"menu","act":"saveMenuRoot",flag:flag,"unid":unid,"random":ucapCommonFun.getRandomString()};
			}
			
		}		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					ucapMenuConfig.oldJson = ucapCommonFun.getFormJSon("menuConfigdialogHtml");
					if (!isRename && isSaveInfo !="" && newflag=="") Ext.Msg.alert("提示","保存信息成功！");
					if(ucapMenuConfig.isNewFlag){
						//新建 文档的保存
						ucapMenuConfig.newSaveConfig(json,response);
					} else {
					    //旧文档的保存	
						ucapMenuConfig.oldSaveConfig(json,response);
					}
					if (newflag==1){
						//说明是保存后要继续新建文档
						//alert("okadaa");
						var node = ucapMenuConfig.getSelectNode();
						if (node.id != ucapMenuConfig.tree.getRootNode().id){
							//说明不是根节点	
							node.parentNode.select();
						}						
						ucapMenuConfig.isNewFlag = true;
						ucapMenuConfig.loadHtml();						
					}
					ucapMenuConfig.setButtonState();
				} else {
					Ext.Msg.alert("提示","保存不成功，请重试！");
				}
			}
		}		
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 新建文档后的保存操作 private
	 * @param {} json
	 */
	newSaveConfig:function(json,response){
		//这是后台返回是父节点的JSON
		var node = ucapMenuConfig.getSelectNode();
	    var mjson = Ext.decode(response.responseText);
		if (node.id == ucapMenuConfig.newRootId){
			//说明是根节点自己的保存,只需替换根节点就可以
			node.id=mjson.unid;
			if (ucapMenuConfig.type==1){
				node.setText(mjson.name);
			} else{
				node.setText(mjson.displayName);
			}	
			node.leaf= true;
			ucapMenuConfig.rootUnid = node.id;
			ucapMenuConfig.root = node;
		} else {		
			if (node.id==ucapMenuConfig.root.id){
				//如果是在根节点上进行的新建
				//要替换根节点的ID，因为后台有可能是新增的根节点 根节点的值，放在 text对象中
				node.id = mjson.text;				
				ucapMenuConfig.rootUnid = node.id;
				ucapMenuConfig.root = node;
			}
			//恢复实际的值
			mjson.text = (json.name);					
			//在当前节点下追加一个子节点
			node.expand();
			var newNode = new Ext.tree.TreeNode(mjson);	
			node.leaf = false;
			node.icon="";
			node.appendChild(newNode);			
			newNode.select();			
			
		}
		ucapMenuConfig.isNewFlag  = false;
	},
	/**
	 * 旧文档的操作操作 private
	 * @param {} json
	 */
	oldSaveConfig:function(json,response){
		ucapMenuConfig.saveFlag = true;			
		var node = ucapMenuConfig.getSelectNode();			
		if (response.responseText.indexOf("nochange")>-1){
			//说明只是对旧对象进行保存，只要更新名称就可以了	
			if (ucapMenuConfig.htmlType==2){
				node.setText(json.displayName);
			} else {
				node.setText(json.name);	
			}			
		} else {
			//说明是新增一个对象，则要替换当前节点
			var mjson = Ext.decode(response.responseText);	
			if (node.id==ucapMenuConfig.root.id){
			  //说明是根节点的保存
				node.id=mjson.unid;
				if (ucapMenuConfig.type==1){
					node.setText(mjson.name);
				} else{
					node.setText(mjson.displayName);
				}
			} else {
				node.id =mjson.id;
				node.attributes.belongToUsers = mjson.belongToUsers;
				node.attributes.belongToDepts = mjson.belongToDepts;
				node.setText(mjson.text);
				node.qtip = mjson.qtip;							
			}						
		}
	},
	getSelectNode:function(){
		return ucapMenuConfig.tree.getSelectionModel().getSelectedNode();	
	},
	setWinTitle:function(title){
		Ext.getDom("menuConfigTitle").innerHTML= title;	
	},
	paste:function(){
		var node = ucapMenuConfig.getSelectNode();
		ucapMenuConfig.handleMoveNode(ucapMenuConfig.tree,ucapMenuConfig.cutNode,
			ucapMenuConfig.cutNode.parentNode,node.parentNode,node.parentNode.indexOf(node));
		
		ucapMenuConfig.cutNode = null;
		Ext.getCmp("paste").setDisabled(true);
		Ext.getCmp("menuPaste").setDisabled(true);
	},
	/**
	 * 树的移动
	 */
	handleMoveNode:function(tree,node,oldParent,newParent,index){
		var type = "module";
		if(ucapMenuConfig.type==1){
			type = "menu";
		}
/*		Ext.MessageBox.alert("move","nodeid="+node.id+"newIndex:"+index+";OLDPARENTID:"+
			oldParent.id+";newParentId:"+newParent.id);
*/	 	var oldParentType ="item";
		if (oldParent.id == ucapMenuConfig.root.id){
			//说明是根节点
			oldParentType="root";
		}
		var newParentType ="item";
		if (newParent.id == ucapMenuConfig.root.id){
			//说明是根节点
			newParentType="root";
		}
		var params={type:type,act:"move",unid:node.id,index:index,oldParentId:oldParent.id,
				newParentId:newParent.id,oldParentType:oldParentType,newParentType:newParentType,
				"random":ucapCommonFun.getRandomString()};

		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					if (response.responseText=="false"){
						Ext.Msg.alert("移动提示","移动不能被保存，无法生效！");
						return;
					}
					ucapMenuConfig.saveFlag = true;
				} else {
					Ext.Msg.alert("移动提示","移动不能被保存，无法生效！")	;
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 删除选中节点的树，包括下面的所有子树
	 * @param infoFlag 是否要删除的提示，默认为true
	 */
	deleteNode:function(infoFlag){
		if (typeof (infoFlag) =="undefined") infoFlag =true;
		var deleteNodeAct =function(){
			var unid = node.id;
			var flag = "item";
			var fatherUnid="";
			var fatherType="item";
			if (node.id == ucapMenuConfig.root.id){
				flag = "root";
			} else {
				fatherUnid = node.parentNode.id;
			}
			if (fatherUnid==ucapMenuConfig.root.id){
				fatherType = "root";
			}
			var type="module";
			if (ucapMenuConfig.type==1){
				type="menu";
			} 
			var params ={"type":type,"act":"delete",flag:flag,"unid":unid,fatherUnid:fatherUnid,
						fatherType:fatherType,
						"random":ucapCommonFun.getRandomString()};
			var requestConfig = {
				url:ucapSession.baseAction,
				params:params,
				callback:function(options,success,response){
					if (success){	
						var exjson = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(exjson);
						if(!exResult)return;
						
						ucapMenuConfig.saveFlag = true;
						var node = ucapMenuConfig.getSelectNode();
						if (flag!="root"){
							var mjson = Ext.decode(response.responseText);
							var pnode = node.parentNode;
							if (pnode.id == ucapMenuConfig.root.id){
								node.parentNode.id = mjson.unid;
								ucapMenuConfig.rootUnid = mjson.unid;
								ucapMenuConfig.root = pnode;							
							} else {
								pnode.id = mjson.id;
							}
							node.remove();
							pnode.select();
							ucapMenuConfig.loadHtml();
						} else {
							//说明是删除整棵树
							if (response.responseText!="newtree"){
								//node.remove();
								//要重新加载树
								var mjson = Ext.decode(response.responseText);
								if (ucapMenuConfig.type==1){									
									ucapMenuConfig.treeJson = mjson.uiMenu;
									ucapMenuConfig.rootUnid = mjson.unid;
									ucapMenuConfig.displayName = mjson.name;
									ucapMenuConfig.createTree();
								} else {				
									ucapMenuConfig.displayName = mjson.displayName;
									ucapMenuConfig.moduleUnid = mjson.unid;  
									ucapMenuConfig.treeJson = mjson.uiModule;
									ucapMenuConfig.rootUnid = mjson.unid;
									ucapMenuConfig.createTree();
									//ucapMenuConfig.createModuleTree(ucapModule.allJson.unid);
								}
							} else{
								//说明已经是空的对象
								if (ucapMenuConfig.type==1){
									ucapMenuConfig.openMenuConfig("",1);	
								} else {
									ucapMenuConfig.openModuleConfig("",1);
								}
							}
						}
					} else {
						Ext.Msg.alert("提示","删除或恢复不成功，请重试！");
					}
				}
			}		
			Ext.Ajax.request(requestConfig);
    	};
		var node = ucapMenuConfig.getSelectNode();
		if (infoFlag){
			var msg="";
			var nodemsg = "";
			if (!node.isLeaf()){
				nodemsg = "<br><br>删除时将同时删除其下所有的子节点"
			}
			if (ucapSession.userJson.userStatus==1){
				//说明是系统管理员	
				msg = "你当前是应用系统管理员身份，" +nodemsg+
						"且此操作不可恢复，你是否确定删除？";	
			} else if (ucapSession.userJson.userStatus==2){
				//说明是部门管理员
				msg = "你当前是部门管理员身份，" +nodemsg+
						"你是否确定删除？";	
			} else {
			 //说明是个人		
				msg ="你是否确定要删除选中的节点" +nodemsg+
						"？";	
			}
			Ext.MessageBox.confirm("删除提示",msg,function(id){
				if (id=="yes"){
	        		deleteNodeAct();
	    		}
			});	    	
		} else {
			deleteNodeAct();
		}
    	
	}
}
var onItemClick=function(btn){
	var id = btn.id || btn;
	switch (id) {
	case "menuNew":{   		
		ucapMenuConfig.isNewFlag = true;
		ucapMenuConfig.loadHtml();
		break;
	}
	case "menuRightNew":
		ucapMenuConfig.isNewFlag = true;
		ucapMenuConfig.loadHtml();
		break;
	case "menuFileNew":{
		ucapMenuConfig.isNewFlag = true;
		ucapMenuConfig.loadHtml();
		break;
	}
	case "menuRecover":{
		Ext.MessageBox.confirm("恢复提示","你是否确定恢复整个菜单<br>你自定义的所有节点" +
				"都将被删除，并恢复到初始状态，请确认？",
			  function(id){
					if (id=="yes"){
		    			ucapMenuConfig.root.select();   
		        		ucapMenuConfig.deleteNode(false);
		    		} 
			 },this
		);	
		break;
	}
	case "menuDelete":{
		ucapMenuConfig.deleteNode();
		break;
	}
	case "menuRightDelete":{
		ucapMenuConfig.deleteNode();
		break;
	}
	case "menuFileDelete":{
		ucapMenuConfig.deleteNode();
		break;
	}
	case "menuClose":
	case "menuFileClose":{		
		ucapMenuConfig.win.close();		
   	  	break;
	}
	case "menuExpandAll":
		ucapMenuConfig.getSelectNode().expand(true);
		break;
	case "menuExpand":
		ucapMenuConfig.getSelectNode().expand();
		break;
	case "menuCollapseAll":
		ucapMenuConfig.getSelectNode().collapse(true);
		break;
	case "menuCollapse":
		ucapMenuConfig.getSelectNode().collapse();
		break;
	case "menuRename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
			if (id=="ok"){
				if (msg==""){
		 			Ext.Msg.alert("改名提示","名称不能为空！");
		 			return;
		 		}
				ucapMenuConfig.save(msg);
			}
		},this);
		break;
	case "menuFileRename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
			if (id=="ok"){
				ucapMenuConfig.save(msg);
			}
		},this);
		break;
	case "menuAppChange":
		if (ucapMenuConfig.type ==1){
			ucapMenu.init();	
		} else {
			ucapModule.setModuleHtml(ucapModule.moduleUnid,ucapSession.ucapModuleId);
		}
		ucapMenuConfig.saveFlag = false;
		break;
/*	case "cut":
		ucapMenuConfig.cutNode = ucapMenuConfig.getSelectNode();
		Ext.getCmp("paste").setDisabled(false);
		Ext.getCmp("menuPaste").setDisabled(false);
		break;
	case "menuCut":
		ucapMenuConfig.cutNode = ucapMenuConfig.getSelectNode();
		Ext.getCmp("paste").setDisabled(false);
		Ext.getCmp("menuPaste").setDisabled(false);
		break;
	case "paste":
		ucapMenuConfig.paste();
		break;
	case "menuPaste":
		ucapMenuConfig.paste();
		break;
*/	
	default :
       alert(btn.id+"代码未实现！");
	} 
}