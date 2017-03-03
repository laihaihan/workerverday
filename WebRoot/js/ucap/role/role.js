/**
 * 角色定制
 * 
 * @author llp
 */
Ext.namespace('ucapRoleConfig'); 

var ucapRoleConfig={
	title:"",
	roleId:"ucap_roleTree",
	leftId:"_ucap_roleId",
	leftWidth:200,
	displayName:"",
	saveNewImg:'<img align="absmiddle" src="'+ucapSession.appPath+"uistyle/images/icon/icon_103.gif" +'"/>',
	saveImg:'<img align="absmiddle" src="'+ucapSession.appPath+"uistyle/images/icon/icon_29.gif" +'"/>',
	closeImg:'<img align="absmiddle" src="'+ucapSession.appPath+"uistyle/images/icon/icon_102.gif" +'"/>',
	treeJson:[],      //树的来源值
	oldJson:[],  //旧的json值
	rootUnid:"", //根节点的值，如果是新建则== newRootId，否则为_dictTree
	rootName:"角色列表", //根节点的名称
	tree:null,  //当前树的对象
	newRootId:"_ucapRoleNew",
	root:null,
	isNewFlag:false, //判断是否为新增状态，在保存后，此值设置为false,新建时设置为true
	/**
	 * 初始化角色
	 */
	initRole:function(){
		this.oldJson = null;
		this.tree = null;
		this.treeJson=[];
		
		var belongToAppId = typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:false;
        var para;
    	if(belongToAppId){
    		para={type:"role",act:"getRoleTreeRoot",unid:"",curAppUnid:belongToAppId}
    	}else{
    		para={type:"role",act:"getRoleTreeRoot",unid:""}
    	}

		//获取根节点对象	
 		var requestConfig = {
			url:ucapSession.baseAction,
			params:para,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					if (response.responseText!="null" && response.responseText!=""){
						var rootJson = Ext.util.JSON.decode(response.responseText)[0];
						if("undefined"==rootJson.rootUnid || null==rootJson.rootUnid || rootJson.rootUnid==""){
							ucapRoleConfig.rootUnid = this.newRootId;
							ucapRoleConfig.isNewFlag = true;
						}else{
							ucapRoleConfig.rootUnid = rootJson.rootUnid;
							ucapRoleConfig.rootName = rootJson.rootName;
						}
						//装载角色对象
						ucapRoleConfig.initWinBox();
						ucapRoleConfig.createRoleTree();
					} else{
						Ext.MessageBox.alert("提示","无法获取当前此用户可管理的角色列表！");
					}
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},	
	/**
	 * 生成树型角色
	 */
	createRoleTree:function(){
		if (this.isNewFlag){
			//说明是新建角色		
			ucapRoleConfig.rootUnid = this.newRootId;	
			ucapRoleConfig.createTree();
			return;
		}
		ucapRoleConfig.createTree();		
	},
	/**
	 * private
	 */
    initWinBox:function(){   
		var toolbar=[
	         {text: '新建',id:"roleNew", handler: onRoleItemClick},
	         {text: '删除', id:"roleDelete",handler: onRoleItemClick},
	         {text: '缺省数据权限', id:"dataRoleDefaultConfig",handler: onRoleItemClick},
	         '-'
	      ];
	    var height = ucapSession.middleHeight;
	    if (height < 300) height=500;
	    Ext.getDom("roleTree").innerHTML="";
    	var panel = new Ext.Panel({
            plain:true,
            id:this.roleId,
            applyTo:"roleTree",
            layout: 'border',
            height:height,
     //       bodyStyle:ucapSession.win.winBodyStyle,
            tbar:toolbar,
            items:[
            	{
            	 id:this.leftId,
	             region:'west',	            
	             html:'<div id="roleleftTree">正在加载角色，请稍等......</div>',
	             width:this.leftWidth,
	             autoScroll:true,
	             collapsible:true,
	             split: true
	           },
	            {
	             region:"center",
	             html:'<div id="ucapRoleCenter"></div>',
	             buttonAlign:"right",
	             tbar:['->',
	             	{text:this.saveNewImg+"保存并新增下一个",handler:function(){
	             				ucapRoleConfig.save("",1)} },
	             	{text:this.saveImg+"保存",id:"dictSave",handler:function(){
	             				ucapRoleConfig.save()} },
	             	{text:"组合表单页签权限",id:"permissionConfig",handler:function(){
	             				permission.cFormTabPermissionConfig(1)} },
	                {text:"按钮权限",id:"permissionConfig",handler:function(){
	             				permission.subButtonPermissionConfig(1)} },
	             	{text:"业务权限",id:"permissionConfig",handler:function(){
	             				permission.permissionConfig(1)} },
	             	{text:"部门权限",id:"roleDeptConfig",handler:function(){
	             				permission.roleDeptConfig(1)} },
	                {text:"数据权限",id:"dataRoleConfig",handler:function(){
	             				dvpermission.dvpermissionConfig(1)} }
	             	]
	            }          
            ]
        });

        var bar = panel.getTopToolbar();
        bar.addField(
        	new Ext.form.Checkbox({name:'saveInfo',fieldLabel:'1',
        	   boxLabel:'保存成功时有提示',checked:true})        		
        );       
    },
	/**
	 * private
	 */
	createTree:function(){
  	 	Ext.DomHelper.applyStyles(Ext.get("roleleftTree"),'style="padding:3px 0px 0px 5px;"');
	 	Ext.getDom("roleleftTree").innerHTML="";
	 	var root=new Ext.tree.AsyncTreeNode({
			expanded: true,		
			id:this.rootUnid,
			text:this.rootName
		});	
		var loader = new Ext.tree.TreeLoader({
	         url : ucapSession.baseAction
	     });
		loader.on('beforeload', function(treeloader, node) {
			var unid=node.id;
			if (node.id==ucapRoleConfig.newRootId) unid="";
			var belongToApp = typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:"";
			treeloader.baseParams ={type:"role",act:"getRoleTree",flag:"edit",unid:unid,curAppUnid:belongToApp};
         }, this);

		var tree=new Ext.tree.TreePanel({
			renderTo:"roleleftTree",
			root:root,
			animate:true,
			rootVisible:true,
			enableDD: true, //允许拖放
			autoScroll:true,
			containerScroll: true,
			loader: loader
		});		
		tree.on("click",function(node){
			if (node.id == ucapRoleConfig.newRootId || node.id==""){
				ucapRoleConfig.isNewFlag = true;
				Ext.getCmp("roleDelete").setDisabled(false);
				Ext.getCmp("roleRightDelete").setDisabled(false);
				Ext.getCmp("roleNew").setDisabled(false);
				Ext.getCmp("roleRightNew").setDisabled(false);
			} else {
				ucapRoleConfig.isNewFlag = false;
			}
			ucapRoleConfig.loadHtml();	
		});
		tree.addListener('movenode', ucapRoleConfig.handleMoveNode); 
		
		tree.on('contextmenu', dictShow);
        function dictShow ( node )
          {
          	node.select();//让右击是选中当前节点     
          	ucapRoleConfig.setButtonState(); 
            treeRightRole.show(node.ui.getAnchor());                               
         };
        var treeRightRole = new Ext.menu.Menu({ 
             items: [ 
	             { 	 id:'roleRightNew',
	                 text: '新建',
	                 icon:"",
	                 handler:onRoleItemClick 
	             },                 
	             { 	 id:'roleRightDelete',
	                 text: '删除',
	                 icon:"",
	                 handler:onRoleItemClick 
	             },{
	             	 id:"roleRename",
	                 text: "重命名", 
	                 icon: "",
	                 handler:function(){onRoleItemClick("roleRename");}
	              }
             ]
         });   
         //设置第一个为选中
        tree.on('load', function(node){   
        	if (node.id == ""){
        		var fnode = node.firstChild;
        		if (fnode==null) {
        			ucapRoleConfig.isNewFlag = true;
        			node.select();        			
        		} else {
	         		var path ="/"+ucapRoleConfig.rootUnid+"/"+ fnode.id;
	       			ucapRoleConfig.tree.selectPath(path);
        		}
        		ucapRoleConfig.loadHtml();
        	}else{
        		node.select();
        		ucapRoleConfig.loadHtml();
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
		
		var html="sys/cfgJsp/role/roleItem.jsp";
		var url=ucapSession.appPath+html;
		Ext.get("ucapRoleCenter").load({url: url},{},function(){	
			if (ucapSession.userJson.userStatus!=1){
				if (Ext.getDom("systemSet"))
				   Ext.getDom("systemSet").style.display="none";
			}
			ucapRoleConfig.setValue(unid);}
	    );
	},
	setButtonState:function(){
		var node = ucapRoleConfig.getSelectNode();
		//进行新建按钮的权限过滤
		var disabled = true;//默认为不能删除
		if (node.id==ucapRoleConfig.rootUnid){
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
		Ext.getCmp("roleDelete").setDisabled(disabled);
		Ext.getCmp("roleRightDelete").setDisabled(disabled);
		//Ext.getCmp("roleFileDelete").setDisabled(disabled);
	},
	/**
	 * private
	 */
	setValue:function(unid){
		Ext.getDom("rolename").focus();
		if (unid==ucapRoleConfig.newRootId)return;
		if (this.isNewFlag) {
			ucapRoleConfig.setButtonState();
			Ext.getDom("funid").value = unid;
			return; //新建状态，不用加载数据
		}
		var	params ={"type":"role","act":"getRoleItem","unid":unid,
		 		"random":ucapCommonFun.getRandomString()};
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			callback:function(options,success,response){
				if (success){
					var json = Ext.decode(response.responseText);				
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					ucapCommonFun.setFormValue(json,"roleConfigdialogHtml");
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
			json = ucapCommonFun.getFormJSon("roleConfigdialogHtml");
			if (Ext.getDom("rolename").value==""){
				Ext.Msg.alert("保存提示","角色名称不能为空！");
				Ext.getDom("rolename").focus();
				return ;	
			}
		} else {
			//自己组装Json格式
			ucapRoleConfig.loadHtml(true);
			json = {name:msgName};
		}
		var node = ucapRoleConfig.getSelectNode();
		var unid = node.id;
		var flag = "";
		if (ucapRoleConfig.isNewFlag) {
			if (node.id==this.newRootId){
				//说明是在根节点在新建 
				flag="newSaveByRoot";
			} else {
				flag ="newSave";	
			}
		} else {
			flag = "oldSave";
		}
		if(isRename){
			flag = "rename";  //修改名称
		}
		
		var params;
		params ={"type":"role","act":"save",flag:flag,"unid":unid,"random":ucapCommonFun.getRandomString()}; //说明是角色
		var requestConfig = {
			url:ucapSession.baseAction,
			params:params,
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					ucapRoleConfig.oldJson = ucapCommonFun.getFormJSon("roleConfigdialogHtml");
					if (!isRename && isSaveInfo !="" && newflag=="") Ext.Msg.alert("提示","保存信息成功！");
					if(ucapRoleConfig.isNewFlag){
						//新建 文档的保存
						ucapRoleConfig.newSaveConfig(json,response);
					} else {
					    //旧文档的保存	
						ucapRoleConfig.oldSaveConfig(json,response);
					}
					if (newflag==1){
						//说明是保存后要继续新建文档
						var node = ucapRoleConfig.getSelectNode();
						node.parentNode.select();											
						ucapRoleConfig.isNewFlag = true;
						ucapRoleConfig.loadHtml();						
					}
					ucapRoleConfig.setButtonState();
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
		var node = ucapRoleConfig.getSelectNode();
	    var mjson = Ext.decode(response.responseText);
		//在当前节点下追加一个子节点
		node.expand();
		var newNode = new Ext.tree.TreeNode(mjson);	
		node.leaf = false;
		node.icon="";
		node.appendChild(newNode);			
		newNode.select();
		ucapRoleConfig.isNewFlag  = false;
	},
	/**
	 * 旧文档的操作操作 private
	 * @param {} json
	 */
	oldSaveConfig:function(json,response){
		ucapRoleConfig.saveFlag = true;			
		var node = ucapRoleConfig.getSelectNode();
		var mjson = Ext.decode(response.responseText);
		if (mjson.result){
			//说明只是对旧对象进行保存，只要更新名称就可以了	
			node.setText(json.rolename);
		} else {
			//说明是新增一个对象，则要替换当前节点
			//alert(response.responseText);
			node.id =mjson.unid;
			if (mjson.belongToUsers)
				node.attributes.belongToUsers = mjson.belongToUsers;
			if (mjson.belongToDepts)
				node.attributes.belongToDepts = mjson.belongToDepts;
			node.setText(mjson.dictName);									
		}
	},
	getSelectNode:function(){
		return ucapRoleConfig.tree.getSelectionModel().getSelectedNode();	
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
		if (newParent.id != ucapRoleConfig.root.id){
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
						var treeLoad = ucapRoleConfig.tree.getLoader();
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
			if (node.id == ucapRoleConfig.root.id){
				flag = "root";
			} 		
			var params ={"type":"role","act":"delete",flag:flag,"unid":unid,
						"random":ucapCommonFun.getRandomString()};
			var requestConfig = {
				url:ucapSession.baseAction,
				params:params,
				callback:function(options,success,response){
					if (success){
						var json = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(json);
						if(!exResult)return;
						
						ucapRoleConfig.saveFlag = true;
						var node = ucapRoleConfig.getSelectNode();
						var num = parseInt(response.responseText,10);
						if (num<1 && infoFlag){
							Ext.Msg.alert("删除提示","你所选的角色你没有权限删除！");							
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
							ucapRoleConfig.loadHtml();
						} else {
							//说明是删除整棵树，重新加载树
							ucapRoleConfig.initDict();
						}
					} else {
						Ext.Msg.alert("提示","删除不成功，请重试！");
					}
				}
			}		
			Ext.Ajax.request(requestConfig);
    	};
		var node = ucapRoleConfig.getSelectNode();
		if (infoFlag){
			var msg="";
			var nodemsg = "";
			if (!node.isLeaf()){
				nodemsg = "<br><br>删除时将同时删除其下所有的子节点";
			}
			msg = "你是否确定删除？";	
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

var onRoleItemClick=function(btn){
	var id = btn.id || btn;
	switch (id) {
	case "roleNew":{   		
		ucapRoleConfig.isNewFlag = true;
		ucapRoleConfig.loadHtml();
		break;
	}
	case "roleDelete":{
		ucapRoleConfig.deleteNode();
		break;
	}
	case "dataRoleDefaultConfig":{
		dvpermission.dvpermissionConfig(1,true);
		break;
	}
	case "roleRightNew":{
		ucapRoleConfig.isNewFlag = true;
		ucapRoleConfig.loadHtml();
		break;
	}
	case "roleRightDelete":{
		ucapRoleConfig.deleteNode();
		break;
	}
	case "roleRename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
			if (id=="ok"){
				if (msg==""){
		 			Ext.Msg.alert("改名提示","名称不能为空！");
		 			return;
		 		}
				ucapRoleConfig.save(msg);
			}
		},this);
		break;
	default :
       alert(btn.id+"代码未实现！");
	} 
}

