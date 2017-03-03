/**
 * 字典定制 模块定制方法
 * @author yjy
 */
Ext.namespace('ucapDictConfig'); 

var ucapDictConfig={
	title:"",
	dictId:"ucap_dictTree",
	leftId:"_ucap_dictId",
	leftWidth:200,
	displayName:"",
	saveNewImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_103.gif" +'"/>',
	saveImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_29.gif" +'"/>',
	closeImg:'<img align="absmiddle" src="'+ucapSession.appPath+
				"uistyle/images/icon/icon_102.gif" +'"/>',
	treeJson:[],      //树的来源值
	oldJson:[],  //旧的json值
	rootUnid:"", //根节点的值，如果是新建则== newRootId，否则为_dictTree
	rootName:"字典列表", //根节点的名称
	tree:null,  //当前树的对象
	newRootId:"_ucapDictNew",
	root:null,
	isNewFlag:false, //判断是否为新增状态，在保存后，此值设置为false,新建时设置为true
	/**
	 * 初始化字典
	 */
	initDict:function(unid,rootName){
		if (ucapSession.userJson.userStatus==3){
			return;			
		}
	//	var unid="";
		this.oldJson = null;
		this.tree = null;
		this.treeJson=[];
		if (typeof unid !="undefined" && unid !="null"){
			this.rootUnid = unid;
			if (typeof rootName !="undefined" && rootName!="null" && rootName!="")
				this.rootName = rootName;
		} else {
			this.rootUnid = this.newRootId;
		}
		ucapDictConfig.initWinBox();
		//装载字典对象
		this.createDictTree();
	},	
	/**
	 * 生成树型字典
	 */
	createDictTree:function(){
		if (this.isNewFlag){
			//说明是新建字典		
			ucapDictConfig.rootUnid = this.newRootId;	
			ucapDictConfig.createTree();
			return;
		}
		ucapDictConfig.createTree();		
	},
	/**
	 * private
	 */
    initWinBox:function(){   
     	var buttonItems=[
	        {text: '重命名',id:"dictFileRename",handler:onDictItemClick},'-',
	        {text: '删除', id:"dictFileDelete",handler: onDictItemClick}
	  		];
		var toolbar=[
	    	{text: '文件',menu :{items: [{text: '新建',id:"dictFileNew", handler: onDictItemClick},'-',
	                        {text: '关闭',id:"dictFileClose", handler: onDictItemClick}]}},
	        {text: '编辑', menu :{items: buttonItems}},
	        {text: '查看',menu :{items: [{text: '展开',id:"dictExpand", handler: onDictItemClick},
	        	{text: '折叠',id:"dictCollapse", handler: onDictItemClick},
	        	{text: '全部展开',id:"dictExpandAll", handler: onDictItemClick},
	        	{text: '全部折叠',id:"dictCollapseAll", handler: onDictItemClick}
	        	]}},
	          '-',
	         {text: '新建',id:"dictNew", handler: onDictItemClick},
	         {text: '删除', id:"dictDelete",handler: onDictItemClick},
	         {text:'恢复默认',id:"dictRecover",handler:onDictItemClick},
	         '-'
	      ];
	    var height = ucapSession.middleHeight;
	    if (height < 300) height=500;
	    Ext.getDom("dictTree").innerHTML="";
    	var panel = new Ext.Panel({
            plain:true,
            id:this.dictId,
            applyTo:"dictTree",
            layout: 'border',
            height:height,
     //       bodyStyle:ucapSession.win.winBodyStyle,
            tbar:toolbar,
            items:[
            	{
            	 id:this.leftId,
	             region:'west',	            
	             html:'<div id="dictleftTree">正在加载字典，请稍等......</div>',
	             width:this.leftWidth,
	             autoScroll:true,
	             collapsible:true,
	             split: true
	           },
	            {
	             region:"center",
	             html:'<div id="ucapDictCenter"></div>',
	             buttonAlign:"right",
	             tbar:['->',
	             	{text:this.saveNewImg+"保存并新增下一项",handler:function(){
	             				ucapDictConfig.save("",1)} },
	             	{text:this.saveImg+"保存",id:"dictSave",handler:function(){
	             				ucapDictConfig.save()} }
	             	]
	            }          
            ]
        });

        var bar = panel.getTopToolbar();
        bar.addField(
        	new Ext.form.Checkbox({name:'saveInfo',fieldLabel:'1',
        	   boxLabel:'保存成功时有提示',checked:true})        		
        );     
        if (ucapSession.userJson.userStatus==1){
     		Ext.getCmp("dictRecover").setDisabled(true);
     	}   
    },
	/**
	 * private
	 */
	createTree:function(){
  	 	Ext.DomHelper.applyStyles(Ext.get("dictleftTree"),'style="padding:3px 0px 0px 5px;"');
	 	Ext.getDom("dictleftTree").innerHTML="";
	 	var root=new Ext.tree.AsyncTreeNode({
			expanded: true,		
			id:this.rootUnid,
			text:this.rootName
		});	
		var loader = new Ext.tree.TreeLoader({
	         url : ucapSession.baseAction,
	         baseAttrs:{uiProvider:Ext.ux.TreeCheckNodeUI} //绑定属性的设置 by@cgc 2011-8-9
	     });
		loader.on('beforeload', function(treeloader, node) {
			var unid=node.id;
		//	if (unid==ucapDictConfig.newRootId) return;
//			alert(unid+"  "+ucapDictConfig.rootUnid )
			if (node.id==ucapDictConfig.newRootId) unid="";
			var belongToApp = typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:"";
			treeloader.baseParams ={type:"dict",act:"getDictTree",flag:"edit",unid:unid,curAppUnid:belongToApp};
         }, this);

		var tree=new Ext.tree.TreePanel({
			renderTo:"dictleftTree",
			root:root,
			animate:true,
			rootVisible:true,
			enableDD: true, //允许拖放
			autoScroll:true,
			containerScroll: true,
			checkModel : "single", //设置树形为单选模式 by@cgc 2011-8-9
			loader: loader
		});
		//将焦点移到复选框为选中的项上 by@cgc  2011-8-10
		tree.on("check",function(node,checked){
			if(checked){
				node.select();
				ucapDictConfig.loadHtml();
			}
		});
		tree.on("click",function(node){
			if (node.id == ucapDictConfig.newRootId){
				ucapDictConfig.isNewFlag = true;
			} else {
				ucapDictConfig.isNewFlag = false;
			}
			//设置点击时，复选框为选中状态  by@cgc  2011-8-10
			var checked = true;
			node.attributes.checked = checked;
			node.ui.toggleCheck(checked);
			
			ucapDictConfig.loadHtml();			
		});
		tree.addListener('movenode', ucapDictConfig.handleMoveNode); 
		
		tree.on('contextmenu', dictShow);
        function dictShow ( node )
          {
          	node.select();//让右击是选中当前节点     
          	ucapDictConfig.setButtonState(); 
            treeRightDict.show(node.ui.getAnchor());                               
         };
        var treeRightDict = new Ext.menu.Menu({ 
             items: [ 
	             { 	 id:'dictRightNew',
	                 text: '新建',
	                 icon:"",
	                 handler:onDictItemClick 
	             },                 
	             { 	 id:'dictRightDelete',
	                 text: '删除',
	                 icon:"",
	                 handler:onDictItemClick 
	             },{
	                 text: "重命名", 
	                 icon: "",
	                 handler:function(){onDictItemClick("dictRename");}
	              }
             ]
         });   
         //设置第一个为选中
        tree.on('load', function(node){   
        	if (node.id == ucapDictConfig.rootUnid){
        		var fnode = node.firstChild;
        		if (fnode==null) {
        			ucapDictConfig.isNewFlag = true;
        			node.select();        			
        		} else {
	         		var path ="/"+ucapDictConfig.rootUnid+"/"+ fnode.id;
	       			ucapDictConfig.tree.selectPath(path);
        		}
        		ucapDictConfig.loadHtml();
        	}
         });
        
		this.tree  =tree;
		this.root = root;
		//root.select();
		ucapCommonFun.autoMenuHeight();
	},
	/**
	 * private
	 */
	loadHtml:function(){
		var node = this.getSelectNode();
		var unid= node.id;
		var html="sys/cfgJsp/dict/dictItem.jsp";
		var url=ucapSession.appPath+html;
		Ext.get("ucapDictCenter").load({url: url},{},function(){	
			if (ucapSession.userJson.userStatus!=1){
				if (Ext.getDom("systemSet"))
				   Ext.getDom("systemSet").style.display="none";
			}
			ucapDictConfig.setValue(unid);}
	    );
	},
	setButtonState:function(){
		var node = ucapDictConfig.getSelectNode();
		//进行新建按钮的权限过滤
/*		if (node.id == ucapDictConfig.newRootId){
			//不能新建
			Ext.getCmp("dictNew").setDisabled(true);
			Ext.getCmp("dictRightNew").setDisabled(true);
			Ext.getCmp("dictFileNew").setDisabled(true);
			Ext.getCmp("dictDelete").setDisabled(true);
			Ext.getCmp("dictRightDelete").setDisabled(true);
			Ext.getCmp("dictFileDelete").setDisabled(true);
			return;
		} else {
			Ext.getCmp("dictDelete").setDisabled(false);
			Ext.getCmp("dictRightDelete").setDisabled(false);
			Ext.getCmp("dictFileDelete").setDisabled(false);
		}*/
		//允许新建
/*	    Ext.getCmp("dictFileNew").setDisabled(false);
		Ext.getCmp("dictNew").setDisabled(false);
		Ext.getCmp("dictRightNew").setDisabled(false);	*/
		//下面进行删除权限的判断"attributes":{"belongToUsers":"100001"}
		var disabled = true;//默认为不能删除
		if (node.id==ucapDictConfig.rootUnid){
			//说明是根节点都可以删除
			disabled = false;
		} else {
			
			var attr =node.attributes.attributes;	
			if (typeof attr=="undefined") attr= node.attributes;
			if (ucapSession.userJson.userStatus==1){
				//系统管理员
				disabled = false;
			} else if (ucapSession.userJson.userStatus==2){
				//部门管理员
				if (typeof attr.belongToDepts!="undefined"){
					if (attr.belongToDepts ==ucapSession.userJson.effectiveAdminDept )
						disabled = false;					
				}
			} else if (ucapSession.userJson.userStatus==3){
				//是个人
				if (typeof attr.belongToUsers!="undefined"){
					if (attr.belongToUsers ==ucapSession.userJson.unid )
						disabled = false;
				}				
			}
		}
		Ext.getCmp("dictDelete").setDisabled(disabled);
		Ext.getCmp("dictRightDelete").setDisabled(disabled);
		Ext.getCmp("dictFileDelete").setDisabled(disabled);
		
		
	},
	/**
	 * private
	 */
	setValue:function(unid){
		Ext.getDom("dictName").focus();
		if (unid==ucapDictConfig.newRootId)return;
		if (this.isNewFlag) {
			ucapDictConfig.setButtonState();
			return; //新建状态，不用加载数据
		}
		var	params ={"type":"dict","act":"getDictItem","unid":unid,
		 		"random":ucapCommonFun.getRandomString()};
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
					if (Ext.getDom("editors_Cn_")){
						Ext.getDom("editors_Cn_").value = 
							ucapCommonFun.getDisplayNames("200,201,202,203",Ext.getDom("editors").value);
					}
					ucapDictConfig.oldJson = ucapCommonFun.getFormJSon("dictConfigdialogHtml");
					ucapDictConfig.setButtonState();
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
			
			var belongToApp=typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:"";
			if(belongToApp==""){
				belongToApp=ucapSession.appUnid;
			}
			json = ucapCommonFun.getFormJSon("dictConfigdialogHtml");
			json ={name:json.dictName,value:json.value,editors:json.editors,belongToApp:belongToApp};
			if (newflag==""){
				if (Ext.encode(ucapDictConfig.oldJson)==Ext.encode(json)){
					Ext.Msg.alert("保存提示","当前数据未更改，无须保存！");
					return ;
				}
			}
			
			if (Ext.getDom("dictName").value==""){
				Ext.Msg.alert("保存提示","字典名称不能为空！");
				Ext.getDom("dictName").focus();
				return ;	
			}
		} else {
			//自己组装Json格式
			ucapDictConfig.loadHtml(true);
			json = {name:msgName};
		}
		var node = ucapDictConfig.getSelectNode();
		var unid = node.id;
		var flag = "";
		if (ucapDictConfig.isNewFlag) {
			if (node.id==ucapDictConfig.root.id){
				//说明是在根节点在新建 
				flag="newSaveByRoot";
			} else {
				flag ="newSave";	
			}
		} else {
			flag = "oldSave";
		}
		var params;
		params ={"type":"dict","act":"save",flag:flag,"unid":unid,"random":ucapCommonFun.getRandomString()}; //说明是字典
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					//解决保存成功后，没有出现提示信息的问题。modify by zhua@linewell.com 2012-02-23
					_UcapForm.tool.hideLodingMsg();
					if(exjson){//字典值及名称的唯一性验证 mdf by jc 20100701
						if(typeof(exjson.name) == "boolean" && exjson.name==false ){//mdf by fsm 修改了出现字典重复但保存成功的问题
							Ext.Msg.alert("保存失败","字典名称重复,请修改后再保存!");
							return;
						}
						if(typeof(exjson.value) =="boolean" &&exjson.value==false){//mdf by fsm 11.1.17
							Ext.Msg.alert("保存失败","字典值重复,请修改后再保存!");
							return;
						}
					}
					ucapDictConfig.oldJson = ucapCommonFun.getFormJSon("dictConfigdialogHtml");
					if (!isRename && isSaveInfo !="" && newflag=="") Ext.Msg.alert("提示","保存信息成功！");
					if(ucapDictConfig.isNewFlag){
						//新建 文档的保存
						ucapDictConfig.newSaveConfig(json,response);
					} else {
					    //旧文档的保存	
						ucapDictConfig.oldSaveConfig(json,response);
					}
					if (newflag==1){
						//说明是保存后要继续新建文档
						var node = ucapDictConfig.getSelectNode();
						node.parentNode.select();											
						ucapDictConfig.isNewFlag = true;
						ucapDictConfig.loadHtml();						
					}
					ucapDictConfig.setButtonState();
				} else {
					Ext.Msg.alert("提示","保存不成功，请重试！");
				}
			}
		}
		_UcapForm.tool.showLodingMsg();
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 新建文档后的保存操作 private
	 * @param {} json
	 */
	newSaveConfig:function(json,response){
		//这是后台返回是父节点的JSON
		var node = ucapDictConfig.getSelectNode();
	    var mjson = Ext.decode(response.responseText);
		//在当前节点下追加一个子节点
		node.expand();
		mjson.uiProvider=Ext.ux.TreeCheckNodeUI;//设置新增节点具有check的扩展功能  by@cgc 2011-8-11
		var newNode = new Ext.tree.TreeNode(mjson);	
		node.leaf = false;
		node.icon="";
		node.appendChild(newNode);			
		newNode.select();
		ucapDictConfig.isNewFlag  = false;
	},
	/**
	 * 旧文档的操作操作 private
	 * @param {} json
	 */
	oldSaveConfig:function(json,response){
		ucapDictConfig.saveFlag = true;			
		var node = ucapDictConfig.getSelectNode();	
		if (response.responseText.indexOf("nochange")>-1){
			//说明只是对旧对象进行保存，只要更新名称就可以了	
			node.setText(json.name);					
		} else {
			//说明是新增一个对象，则要替换当前节点
			//alert(response.responseText);
			var mjson = Ext.decode(response.responseText);	
			node.id =mjson.unid;
			if (mjson.belongToUsers)
				node.attributes.belongToUsers = mjson.belongToUsers;
			if (mjson.belongToDepts)
				node.attributes.belongToDepts = mjson.belongToDepts;
			node.setText(mjson.dictName);									
		}
	},
	getSelectNode:function(){
		return ucapDictConfig.tree.getSelectionModel().getSelectedNode();	
	},
	/**
	 * 树的移动
	 */
	handleMoveNode:function(tree,node,oldParent,newParent,index){
	
		var posIndex=index-1;
		//posNode后续的节点要进行处理，即序号要加1，而新移动节点的序号等于posNode节点的位置
		var posNode = newParent.childNodes[posIndex];
		var posNodeId ="";
		if (typeof(posNode)!="undefined"){
			posNodeId = posNode.id;
		}
		var newParentId = "";
		if (newParent.id != ucapDictConfig.root.id){
			//说明不是根节点
			newParentId= newParent.id;
		}
		var params={type:"dict",act:"move",unid:node.id,posNode:posNodeId,
					newParentId:newParentId,
				"random":ucapCommonFun.getRandomString()};
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			callback:function(options,success,response){
				if (success){
					if (response.responseText=="false"){
						Ext.Msg.alert("移动提示","移动不能被保存，无法生效！");
						return;
					} else{
						//替换新的节点，并且要重新加载所有的子节点
						var mjson = Ext.decode(response.responseText);	
						var exResult=ucapCommonFun.dealException(mjson);
						if(!exResult)return;
					
						node.id =mjson.id;
						node.attributes.belongToUsers = mjson.belongToUsers;
						node.attributes.belongToDepts = mjson.belongToDepts;
						node.setText(mjson.text);
						var treeLoad = ucapDictConfig.tree.getLoader();
						treeLoad.load(node);
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
			var belongToAppId = ucapManagerTree.curBelongToAppId;
			if("undefined" == belongToAppId || null == belongToAppId ||"" == belongToAppId){
				belongToAppId = ucapSession.appUnid;
			}
			if (node.id == ucapDictConfig.root.id){
				flag = "root";
			}
			var params ={"type":"dict","act":"delete",flag:flag,"unid":unid,"appUnid":belongToAppId,
						"random":ucapCommonFun.getRandomString()};
			var requestConfig = {
				url:ucapSession.baseAction,
				params:params,
				callback:function(options,success,response){
					if (success){
						var json = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(json);
						if(!exResult)return;
						
						ucapDictConfig.saveFlag = true;
						var nodes = ucapDictConfig.tree.getChecked();
						var node = nodes[nodes.length-1];
						var num = parseInt(response.responseText,10);
						if (num<1 && infoFlag){
							Ext.Msg.alert("删除提示","你所选的字典你没有权限删除！");							
							return;
						}
						if (flag!="root"){
							var newnode;
							if (node.nextSibling){
								newnode = node.nextSibling;
							} else if(node.previousSibling){
								newnode = node.previousSibling;
							} else {
								newnode = node.parentNode;
							}
							node.remove();
							newnode.select();
							ucapDictConfig.loadHtml();
						} else {
							//说明是删除整棵树，重新加载树
							ucapDictConfig.initDict();
						}
					} else {
						Ext.Msg.alert("提示","删除不成功，请重试！");
					}
				}
			}		
			Ext.Ajax.request(requestConfig);
    	};
		//var node = ucapDictConfig.getSelectNode();
    	//start  复选框选中的节点为，要删除的节点  by@cgc 2011-8-9 
		var nodes =this.tree.getChecked();
		var node;
		if(nodes.length<1){
			Ext.Msg.alert("提示","请选择您要删除的节点！");
			return;
		}else{
			node=nodes[nodes.length-1];
		}
		//end 复选框选中的节点为，要删除的节点  by@cgc 2011-8-9
		if (infoFlag){
			var msg="";
			var nodemsg = "";
			if (!node.isLeaf()){
				nodemsg = "<br><br>删除时将同时删除其下所有的子节点";
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
var onDictItemClick=function(btn){
	var id = btn.id || btn;
	switch (id) {
	case "dictNew":{   		
		ucapDictConfig.isNewFlag = true;
		ucapDictConfig.loadHtml();
		break;
	}
	case "dictRightNew":
		ucapDictConfig.isNewFlag = true;
		ucapDictConfig.loadHtml();
		break;
	case "dictFileNew":{
		ucapDictConfig.isNewFlag = true;
		ucapDictConfig.loadHtml();
		break;
	}
	case "dictDelete":{
		ucapDictConfig.deleteNode();
		break;
	}
	case "dictRightDelete":{
		ucapDictConfig.deleteNode();
		break;
	}
	case "dictFileDelete":{
		ucapDictConfig.deleteNode();
		break;
	}
	case "dictClose":{
		ucapDictConfig.win.close();
   	  	break;
	}
	case "dictFileClose":{
		ucapDictConfig.win.close();
   	  	break;
	}
	case "dictExpandAll":
		ucapDictConfig.getSelectNode().expand(true);
		break;
	case "dictExpand":
		ucapDictConfig.getSelectNode().expand();
		break;
	case "dictCollapseAll":
		ucapDictConfig.getSelectNode().collapse(true);
		break;
	case "dictCollapse":
		ucapDictConfig.getSelectNode().collapse();
		break;
	case "dictRename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
			if (id=="ok"){
				if (msg==""){
		 			Ext.Msg.alert("改名提示","名称不能为空！");
		 			return;
		 		}
				ucapDictConfig.save(msg);
			}
		},this);
		break;
	case "dictFileRename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
			if (id=="ok"){
				if (msg==""){
		 			Ext.Msg.alert("改名提示","名称不能为空！");
		 			return;
		 		}
				ucapDictConfig.save(msg);
			}
		},this);
		break;
	case "dictRecover":{
		Ext.MessageBox.confirm("恢复提示","你是否确定恢复整个字典<br>你自定义的所有字典" +
				"都将被删除，并恢复到初始状态，请确认？",
			  function(id){
					if (id=="yes"){
		    			ucapDictConfig.root.select();   
		        		ucapDictConfig.deleteNode(false);
		    		} 
			 },this
		);	
		break;
	}
	default :
       alert(btn.id+"代码未实现！");
	} 
}