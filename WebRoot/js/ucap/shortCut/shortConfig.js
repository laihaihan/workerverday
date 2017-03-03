/**
 * 菜单定制 快捷方式集定制方法
 * @author yjy
 */
Ext.namespace('ucapShortConfig'); 
var ucapShortConfig={
	/**
	 * html类型 1表示菜单项 2表示根
	 * @type Number
	 */
	htmlType:1,
	title:"",
	leftWidth:185,
	displayName:"",
	name:"",
	saveNewImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_103.gif" +'"/>',
	saveImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_29.gif" +'"/>',
	closeImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_102.gif" +'"/>',

	rootUnid:"",   //根节点UNID
	treeJson:[],      //树的来源值
	oldJson:[],  //旧的json值
	html:"",
	tree:null,  //当前树的对象
	root:null,  //根节点的对象
	newRootId:"_ucapShortNew",
	height:500,
	isNewFlag:false, //判断是否为新增状态，在保存后，此值设置为false,新建时设置为true
	preHtml:"", //前一步的HTML，避免html重复加载
	cutNode:null,  //剪切的节点对象
	win:"",
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
	 * 视图上的打开文档
	 * @param {} ShortUnid
	 */
	openShortByView:function(ShortUnid){
		//this.openShortConfig(ShortUnid);
		(window.top.ucapShortConfig||this).openShortConfig(ShortUnid);
	},
	/**
	 * 打开快捷方式集定制对话框 public
	 * @param ShortUnid 如果为空，说明是要新建一个菜单
	 * @param isNotInitWin 是否不用初始化窗口，为空默认为需要
	 */
	openShortConfig:function(shortUnid,isNotInitWin){
		var isNew = false;
		if (typeof shortUnid =="undefined" || shortUnid=="") {
			shortUnid="";
			isNew =true;
		}
		if (typeof isNotInitWin =="undefined") isNotInitWin ="";
		this.initValue();
		this.isNewFlag = isNew;
		this.title="快捷方式集"; 
		if (this.isNewFlag){
			this.rootUnid = this.newRootId;
			this.displayName = "新建快捷方式集";
			//2012-10-08 add by chuiting@linewell.com
			//先编辑快捷方式集，再新增快捷方式集，此时的"配置用名称"为编辑时快捷方式集的名称
			//新增时"配置用名称"置为空
			this.name = "";
			//end 2012-10-08 add by chuiting@linewell.com
		} else {
			this.createShortTree(shortUnid);
		}
		if (isNotInitWin=="")  this.initWinBox();
		this.createTree();
	},
	/**
	 * 生成快捷方式集菜单
	 */
	createShortTree:function(shortUnid){
		var url =ucapSession.baseAction;
		url+="?type=short&act=getShortTree&shortUnid="+shortUnid+
				"&random="+ucapCommonFun.getRandomString();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);			
		var result = conn.responseText;
		
		if (result.indexOf("error")>-1){
			Ext.Msg.alert("提示","从后台获取快捷方式集内容时出错，快捷方式集的ID为"+shortUnid);
			return "";
		}
		var json = Ext.decode(result);
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		this.displayName = json.displayName;
		this.name = json.name;
		this.shortUnid = json.unid;  	
		this.rootUnid = this.shortUnid;
		if (typeof json.shortcuts =="undefined"){
			this.treeJson=[];
		} else {
			this.treeJson = json.shortcuts;
		}
	},
	
	/**
	 * private
	 */
    initWinBox:function(){   
     	var buttonItems=[
	        {text: '重命名',id:"shortFileRename",handler:onShortItemClick},'-',
	        {text: '删除', id:"shortFileDelete",handler: onShortItemClick}
	  		];
		var toolbar=[
	    	{text: '文件',menu :{items: [{text: '新建',id:"shortFileNew", handler: onShortItemClick},'-',
	                        {text: '关闭',id:"shortFileClose", handler: onShortItemClick}]}},
	        {text: '编辑', menu :{items: buttonItems}},
	        {text: '查看',menu :{items: [{text: '展开',id:"shortExpand", handler: onShortItemClick},
	        	{text: '折叠',id:"shortCollapse", handler: onShortItemClick},
	        	{text: '全部展开',id:"shortExpandAll", handler: onShortItemClick},
	        	{text: '全部折叠',id:"shortCollapseAll", handler: onShortItemClick}
	        	]}},
	          '-',
	         {text: '新建',id:"shortNew", handler: onShortItemClick},
	         {text: '删除', id:"shortDelete",handler: onShortItemClick},
	         '-'
	      ];
    	ucapShortConfig.win = new Ext.Window({
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
	             html:'<div id="leftTree">正在加载，请稍等......</div>',
	             width:this.leftWidth,
	             autoScroll:true,
	             collapsible:true, 
	             split: true},
	            {
	             id:"centerId",
	             region:"center",
	             html:'<div id="ucapShortCenter"></div>',
	          //   bodyStyle:ucapSession.win.winBodyStyle,
//	             autoLoad:{url:ucapSession.appPath+this.html,scripts:true,nocache: true},
	             buttonAlign:"right",
	             tbar:['->',
	                //2012-10-08 mdf by chuiting@linewell.com
	                //修改按钮名称，"保存并新增下一下"修改为"保存并新增下一个"
	             	{text:this.saveNewImg+"保存并新增下一个",handler:function(){
	             	//end 2012-10-08 mdf by chuiting@linewell.com
	             				ucapShortConfig.save("",1);} },
	             	{text:this.saveImg+"保存",id:"shortSave",handler:function(){
	             				ucapShortConfig.save();} },
	             	{text:this.closeImg+"关闭",id:"shortClose",handler: onShortItemClick}
	             	]
	            }          
            ]
        });
        ucapShortConfig.win.show();  
        var bar = ucapShortConfig.win.getTopToolbar();
        bar.addField(
        	new Ext.form.Checkbox({name:'saveInfo',fieldLabel:'1',
        	   boxLabel:'保存成功时有提示',checked:true})        		
        );
    },
	/**
	 * private
	 */
	createTree:function(){
		this.preHtml = "";
     	this.tree = null;
    	this.htmlType="";
		var title=this.title+"定制";
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
			height:ucapShortConfig.height-92,
			loader: new Ext.tree.TreeLoader({
				dataUrl:""
			})
		});		
		tree.on("click",function(){
			ucapShortConfig.isNewFlag = false;
			ucapShortConfig.loadHtml();			
		});
		tree.addListener('movenode', ucapShortConfig.handleMoveNode); 
		
		tree.on('contextmenu', menuShow);
        function menuShow ( node )
          {
          	node.select();//让右击是选中当前节点     
          	ucapShortConfig.setButtonState(); 
            treeRightMenu.show(node.ui.getAnchor());
                               
         };
        var treeRightMenu = new Ext.menu.Menu({ 
             items: [ 
	             { 	 id:'shortRightNew',
	                 text: '新建',
	                 icon:"",
	                 handler:onShortItemClick 
	             },                 
	             { 	 id:'shortRightDelete',
	                 text: '删除',
	                 icon:"",
	                 handler:onShortItemClick 
	             },{
	                 text: "重命名", 
	                 icon: "",
	                 handler:function(){onShortItemClick("shortRename");}
	              }
             ]
         });             
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
		//如果是新建子项状态，则要进行判断，如果是在根节点，则以快捷方式集子项装载页面
		if (node.id ==this.root.id){
			//如果是根节点，则进行判断
			this.htmlType =2;			
		} else {
			this.htmlType =1;	
		}
		if (this.isNewFlag && node.id != this.newRootId ){
			this.htmlType =1;
		}
		if (this.htmlType == 2){
			ucapShortConfig.html="sys/cfgJsp/short/shortRoot.jsp";
		} else {
			params ={"type":"short","act":"getShortItem","unid":unid,"random":ucapCommonFun.getRandomString()};
			ucapShortConfig.html="sys/cfgJsp/short/shortMenu.jsp";
		}	
		if (notLoad) return;
		if (this.isNewFlag){
			ucapShortConfig.preHtml ="";
		};
		var url=ucapSession.appPath+ucapShortConfig.html;
		if (ucapShortConfig.preHtml!=ucapShortConfig.html){
			ucapShortConfig.preHtml = ucapShortConfig.html;
			var el = Ext.get("ucapShortCenter");
			var mgr = el.getUpdater();
			mgr.update({
		        url: url,
		        scripts:true
			});			
			mgr.on("update",function(){
				if (ucapShortConfig.htmlType==2){
					if (node.id == ucapShortConfig.rootUnid){
						if (Ext.getDom("displayName")) Ext.getDom("displayName").value = ucapShortConfig.displayName;
						if (ucapShortConfig.name && Ext.getDom("name")) Ext.getDom("name").value = ucapShortConfig.name;
					}
					ucapShortConfig.setButtonState();					
				} else {
					ucapShortConfig.setValue(unid,params);
				}
				
			})
		    
		} else {
			if (ucapShortConfig.htmlType==2) return;
			ucapShortConfig.setValue(unid,params);
		}			
	},
	setButtonState:function(){
		var node = ucapShortConfig.getSelectNode();
		//进行新建按钮的权限过滤，如果是叶子节点，不能再新建
		if (ucapShortConfig.root.id == ucapShortConfig.newRootId){
			//不能新建
			Ext.getCmp("shortNew").setDisabled(true);
			Ext.getCmp("shortRightNew").setDisabled(true);
			Ext.getCmp("shortFileNew").setDisabled(true);
			Ext.getCmp("shortDelete").setDisabled(true);
			Ext.getCmp("shortRightDelete").setDisabled(true);
			Ext.getCmp("shortFileDelete").setDisabled(true);
			return;
		} else {
			Ext.getCmp("shortDelete").setDisabled(false);
			Ext.getCmp("shortRightDelete").setDisabled(false);
			Ext.getCmp("shortFileDelete").setDisabled(false);
		}
		if( !node.isLeaf() ||  node.id == ucapShortConfig.root.id ){
			//允许新建
		    Ext.getCmp("shortFileNew").setDisabled(false);
			Ext.getCmp("shortNew").setDisabled(false);
			Ext.getCmp("shortRightNew").setDisabled(false);	
		} else {
			//不能新建
			Ext.getCmp("shortFileNew").setDisabled(true);
			Ext.getCmp("shortNew").setDisabled(true);
			Ext.getCmp("shortRightNew").setDisabled(true);
		}
	},
	/**
	 * private
	 */
	setValue:function(unid,params,flag){
		if (this.isNewFlag) {
			ucapShortConfig.setButtonState();
			return; //新建状态，不用加载数据
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			callback:function(options,success,response){
				if (success){
					if (response.responseText==null || response.responseText=="null" ) return;
					var json = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					if(typeof json =="undefined" || json==null) return;
					ucapCommonFun.setFormValue(json);					
					if(json==undefined || "undefined"!=typeof(json.picturePath)){
						Ext.getDom("titleIconImg").src =ucapSession.appPath+ json.picturePath;
					}
				 	ucapShortConfig.oldJson = ucapCommonFun.getFormJSon("shortConfigdialogHtml");
				 	ucapShortConfig.setButtonState();
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
			json = ucapCommonFun.getFormJSon("shortConfigdialogHtml");
//			alert(Ext.encode(json));
			if (newflag==""){
				if (Ext.encode(ucapShortConfig.oldJson)==Ext.encode(json)){
					Ext.Msg.alert("保存提示","当前数据未更改，无须保存！");
					return ;
				}
			}
		} else {
			//自己组装Json格式
			ucapShortConfig.loadHtml(true);
			if (ucapShortConfig.htmlType==2){
				json = {displayName:msgName};
			} else {
				json = {name:msgName};
			}			
		}
		var node = ucapShortConfig.getSelectNode();
		var unid = node.id;
		var flag="old";
		var parentId="";
		if (this.isNewFlag){
			flag="new";
			parentId = ucapShortConfig.root.id;
		}
		var params;
		if (ucapShortConfig.htmlType ==2){
			//  增加在分级管理中对模块跟得所属应用系统设置  csj2009.12.30
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
				  params ={"type":"short","act":"saveShortRoot",flag:flag,"unid":unid,"belongToAppId":belongToAppId,"random":ucapCommonFun.getRandomString()}; //说明是菜单
				}else{
				params ={"type":"short","act":"saveShortRoot",flag:flag,"unid":unid,"random":ucapCommonFun.getRandomString()}; //说明是菜单
				}
			
		} else if (ucapShortConfig.htmlType ==1){
			params ={"type":"short","act":"saveShortItem",flag:flag,"unid":unid,parentId:parentId,"random":ucapCommonFun.getRandomString()};
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
					
					ucapShortConfig.oldJson = ucapCommonFun.getFormJSon("shortConfigdialogHtml");
					if (!isRename && isSaveInfo !="" && newflag=="") Ext.Msg.alert("提示","保存信息成功！");
					if(ucapShortConfig.isNewFlag){
						//新建 文档的保存
						ucapShortConfig.newSaveConfig(json,response);
					} else {
					    //旧文档的保存	
						ucapShortConfig.oldSaveConfig(json,response);
					}
					if (newflag==1){
						//说明是保存后要继续新建文档
						//alert("okadaa");
						var node = ucapShortConfig.getSelectNode();
						if (node.id != ucapShortConfig.tree.getRootNode().id){
							//说明不是根节点	
							node.parentNode.select();
						}						
						ucapShortConfig.isNewFlag = true;
						ucapShortConfig.loadHtml();		
					}
					ucapShortConfig.setButtonState();
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
		var node = ucapShortConfig.getSelectNode();
	    var mjson = Ext.decode(response.responseText);
	  
		if (node.id == ucapShortConfig.newRootId){
			//说明是根节点自己的保存,只需替换根节点就可以
			node.id=mjson.unid;
			node.setText(mjson.displayName);
			node.leaf= true;
			ucapShortConfig.rootUnid = node.id;
			ucapShortConfig.root = node;
		} else {						
			//在当前节点下追加一个子节点
			node.expand();
			var newNode = new Ext.tree.TreeNode({
				id:mjson.unid,
				text:mjson.name,
				leaf:true
			});	
			node.leaf = false;
			node.icon="";
			node.appendChild(newNode);			
			newNode.select();			
			
		}
		ucapShortConfig.isNewFlag  = false;
	},
	/**
	 * 旧文档的操作操作 private
	 * @param {} json
	 */
	oldSaveConfig:function(json,response){
		ucapShortConfig.saveFlag = true;			
		var node = ucapShortConfig.getSelectNode();			
		if (response.responseText.indexOf("nochange")>-1){
			//说明只是对旧对象进行保存，只要更新名称就可以了	
			if (ucapShortConfig.htmlType==2){
				node.setText(json.displayName);
			} else {
				node.setText(json.name);	
			}			
		} else {
			//说明是新增一个对象，则要替换当前节点
			var mjson = Ext.decode(response.responseText);	
			if (node.id==ucapShortConfig.root.id){
			  //说明是根节点的保存
				node.id=mjson.unid;
				node.setText(mjson.displayName);	
			} else {
				node.id =mjson.unid;
				node.setText(mjson.name);						
			}						
		}
	},
	getSelectNode:function(){
		return ucapShortConfig.tree.getSelectionModel().getSelectedNode();	
	},
	setWinTitle:function(title){
		Ext.getDom("menuConfigTitle").innerHTML= title;	
	},	
	/**
	 * 树的移动
	 */
	handleMoveNode:function(tree,node,oldParent,newParent,index){
		var posIndex=index+1;
		if (index==newParent.childNodes.length-1){
			//说明是在最后一个
			posIndex = index-1;
		}		
		var posNode = newParent.childNodes[posIndex];
		var params={type:"short",act:"move",unid:node.id,posCutId:posNode.id,
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
			if (node.id == ucapShortConfig.root.id){
				flag = "root";
			} 	
			var params ={"type":"short","act":"delete",flag:flag,"unid":unid,
						"random":ucapCommonFun.getRandomString()};
			var requestConfig = {
				url:ucapSession.baseAction,
				params:params,
				callback:function(options,success,response){
					if (success){	
						var exjson = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(exjson);
						if(!exResult)return;
						
						ucapShortConfig.saveFlag = true;
						var node = ucapShortConfig.getSelectNode();
						if (flag!="root"){
							var pnode = node.parentNode;							
							node.remove();
							pnode.select();							
							ucapShortConfig.loadHtml();
						} else {
							//说明已经是空的对象
							ucapShortConfig.openShortConfig("",1);
							ucapShortConfig.name="";
						//	ucapShortConfig.displayName="";
						}
					} else {
						Ext.Msg.alert("提示","删除不成功，请重试！");
					}
				}
			}		
			Ext.Ajax.request(requestConfig);
    	};
		var node = ucapShortConfig.getSelectNode();
		if (infoFlag){
			var msg="";
			var nodemsg = "";
			if (!node.isLeaf()){
				nodemsg = "<br><br>删除时将同时删除其下所有的子节点";
			}
			msg ="你是否确定要删除选中的节点" +nodemsg+
					"？";				
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
var onShortItemClick=function(btn){
	var id = btn.id || btn;
	switch (id) {
	case "shortNew":{   		
		ucapShortConfig.isNewFlag = true;
		ucapShortConfig.loadHtml();
		break;
	}
	case "shortRightNew":
		ucapShortConfig.isNewFlag = true;
		ucapShortConfig.loadHtml();
		break;
	case "shortFileNew":{
		ucapShortConfig.isNewFlag = true;
		ucapShortConfig.loadHtml();
		break;
	}
	case "shortDelete":{
		ucapShortConfig.deleteNode();
		break;
	}
	case "shortRightDelete":{
		ucapShortConfig.deleteNode();
		break;
	}
	case "shortFileDelete":{
		ucapShortConfig.deleteNode();
		break;
	}
	case "shortClose":{
		ucapShortConfig.win.close();
   	  	break;
	}
	case "shortFileClose":{
		ucapShortConfig.win.close();
   	  	break;
	}
	case "shortExpandAll":
		ucapShortConfig.getSelectNode().expand(true);
		break;
	case "shortExpand":
		ucapShortConfig.getSelectNode().expand();
		break;
	case "shortCollapseAll":
		ucapShortConfig.getSelectNode().collapse(true);
		break;
	case "shortCollapse":
		ucapShortConfig.getSelectNode().collapse();
		break;
	case "shortRename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
			if (id=="ok"){
				if (msg==""){
		 			Ext.Msg.alert("改名提示","名称不能为空！");
		 			return;
		 		}
				ucapShortConfig.save(msg);
			}
		},this);
		break;
	case "shortFileRename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
			if (id=="ok"){
				ucapShortConfig.save(msg);
			}
		},this);
		break;
	
	default :
       alert(btn.id+"代码未实现！");
	} 
}