/**
 * 栏目树型菜单
 * @author yjy
 * @type 
 */
var ucapColumns = {
	rootJson:[],
	tree:null,
	isNewFlag:false,  //是否新建栏目的标志
	newRootId:"_ucapColumnsNew",
	rootUnid:"",
	name:"",
	rootName:"栏目列表",
	columnsId:"columnsleftTree",
	articleViewId:"1C624EABEFBDFD66DD355F34F96F6D2B", //文章视图UNID
	columnViewId:"89D77181566300FC29877BB02E39DB3A", //栏目视图UNID
	oldJson:[],  //旧的json值
	editColumnsWin:null,  //窗口对象
	renameValue:"",    //重命名的名称
	type:1,            //1表示栏目 2表示文章
	initColumns:function(unid,rootName,type){
		if (typeof type=="undefined") type ="1";
		type = parseInt(type,10);
		this.type = type;
//		if (ucapSession.userJson.userStatus==3){
//			return;			
//		}
		var buttonItems=[
			{text: '编辑栏目',handler:function(){onColumnsItemClick("edit");}},
	        {text: '重命名',handler:function(){onColumnsItemClick("rename");}},'-',
	        {text: '删除栏目',id:"columnsDelete",handler: function(){onColumnsItemClick("delete");}}
	  		];
	  	var toolbar=[];
	  	if (this.type==1){
			toolbar=[
		    	{text: '文件',menu :{items: [{text: '新建栏目',handler:function(){onColumnsItemClick("new");} }]}},
		        {text: '编辑', menu :{items: buttonItems}},
		        {text: '查看',menu :{items: [{text: '展开',id:"columnsExpand", handler: onColumnsItemClick},
		        	{text: '折叠',id:"columnsCollapse", handler: onColumnsItemClick},
		        	{text: '全部展开',id:"columnsExpandAll", handler: onColumnsItemClick},
		        	{text: '全部折叠',id:"columnsCollapseAll", handler: onColumnsItemClick}
		        	]}}
		        ,
		         '-',
		         {text: '新建栏目',handler:function(){onColumnsItemClick("new")}},
		         {text: '编辑栏目',handler: function(){onColumnsItemClick("edit")}},
		         {text: '删除栏目',id:"columnsFileDelete",handler: function(){onColumnsItemClick("delete");}}
		      ];
	  	};
	    var height = ucapSession.middleHeight;
	    if (height < 300) height=500;
		var panel = new Ext.Panel({
			id:"ucap_columnsTree",
	   		applyTo:"columnsTree",
            //bodyStyle:ucapSession.win.winBodyStyle,
            plain:true,
            layout: 'border',
            height:height,
            tbar:toolbar,
            autoWidth:true,
            //width:500,
            items:[
            	{title:'栏目列表',
	             region:'west',	            
	             html:'<div id="'+this.columnsId+'">正在加载栏目列表，请稍等......</div>',
	             width:180,
	             autoScroll:true,
	             collapsible:true, 
	             height:height-10,
	             split: true},
	            {
	             region:"center",
	             contentEl:"columnsHtml",
	             autoWidth:true,
	             buttonAlign:"right"
	            }          
            ]
        });
        ucapCommonFun.autoMenuHeight();
        if (typeof unid !="undefined" && unid !="null" && unid!=""){
			this.rootUnid = unid;
			if (typeof rootName !="undefined" && rootName!="null" && rootName!="")
				this.rootName = rootName;
		} else {
			this.rootUnid = this.newRootId;
		}		
		ucapColumns.createTree("");		
	},	
	createTree:function(){
		Ext.DomHelper.applyStyles(Ext.get(this.columnsId),'style="padding:3px 0px 0px 5px;"');
	 	Ext.getDom(this.columnsId).innerHTML="";
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
			if (node.id==ucapColumns.newRootId) unid="";
			treeloader.baseParams ={"type":"columns",act:"getColumnsTree",flag:"edit",unid:unid};
         }, this);
		var enDD = false;
		if (this.type==1) enDD= true;
		var tree=new Ext.tree.TreePanel({
			renderTo:this.columnsId,
			root:root,
			animate:true,
			rootVisible:true,
		 	enableDD: enDD, //允许拖放
			autoScroll:true,
			containerScroll: true,
			loader: loader
		});		
		tree.on("click",function(node){
			var unid=node.id;
			if (node.id==ucapColumns.newRootId) unid="1";
			ucapColumns.setColumnsView(unid);
		});

		if (this.type==1){
			tree.addListener('movenode', ucapColumns.handleMoveNode); 
			tree.on('contextmenu', columnsShow);
	        function columnsShow ( node )
	          {
	          	node.select();//让右击是选中当前节点     
	            treeRightMenu.show(node.ui.getAnchor());
	         };
	        var treeRightMenu = new Ext.menu.Menu({ 
	             id: 'treeMenuContext',
	             items: [ 
		             {   text: '新建栏目',
		                 icon:"",
		                 handler:function(){onColumnsItemClick("new");} 
		             },  
		             {   text: '编辑栏目',
		                 icon:"",
		                 handler:function(){onColumnsItemClick("edit");} 
		             }, 
		             { 
		                 text: '删除栏目',
		                 id:"columnsRightDelete",
		                 icon:"",
		                 handler:function(){onColumnsItemClick("delete");}  
		             },
		             {
		                 text: "重命名", 
		                 icon: "",
		                 handler:function(){onColumnsItemClick("rename");}
		              }
	             ]
	         });     
		}
		this.tree  =tree;
		var unid="1";
		//if (this.type==1){
			root.select();
		//}
		/* else {
			var nodes = root.childNodes ;
			if (nodes.length>0){
				nodes[0].select();
				unid=nodes[0].id;
				alert(nodes[0].id+nodes[0].text);
			}
		}*/
		ucapColumns.setColumnsView(unid);
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
		var newParentId = newParent.id;
		if (newParent.id==ucapColumns.rootUnid){
			newParentId="";
		}
		var posNode = newParent.childNodes[posIndex];
		var params={type:"columns",act:"move",unid:node.id,posColumnsId:posNode.id,
				newParentId:newParentId,
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
					return false;
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 删除选中节点的树，包括下面的所有子树
	 */
	deleteNode:function(){
		var deleteNodeAct =function(){
			var unid = node.id;
			var params ={"type":"columns","act":"delete","unid":unid};
			var requestConfig = {
				url:ucapSession.baseAction,
				params:params,
				callback:function(options,success,response){
					if (success){	
						var exjson=Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(exjson);
						if(!exResult)return;
						
						var node = ucapColumns.getSelectNode();
						//看能否找到下一个节点的记录，如果是默认选中，如果本身是最后一个，则取前一个
						//如果就自己一个，则默认取上一节点的
						var newnode;
						if (node.id!=ucapColumns.tree.getRootNode().id){
							if (node.nextSibling){
								newnode = node.nextSibling;
							} else if(node.previousSibling){
								newnode = node.previousSibling;
							} else {
								newnode = node.parentNode;
							}
							newnode.select();
							ucapColumns.setColumnsView(newnode);
							node.remove();
						} else{
							ucapColumns.rootJson=[];
							ucapColumns.createTree();
							//alert("根节点删除");
						}		
					//	pnode.select();
					//	ucapColumns.loadHtml();
					} else {
						Ext.Msg.alert("提示","删除不成功，请重试！");
					}
				}
			}		
			Ext.Ajax.request(requestConfig);
    	};
		var node = ucapColumns.getSelectNode();
		if (node.id==this.newRootId){
			Ext.Msg.alert("提示信息","根节点不能删除！");
			return;
		}
		var msg="删除本栏目时，将同时删除其下所有的栏目及所有对应的文档，此操作不可恢复，请确认?";
		Ext.MessageBox.confirm("删除提示",msg,function(id){
			if (id=="yes"){
        		deleteNodeAct();
    		}
		});	
	},
	//根据栏目ID，设置值
	setValue:function(unid){
	//	this.setEmpty();
		//获取节点对象
 		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"columns",act:"getColumns",unid:unid},
			callback:function(options,success,response){
				if (success){
					var json = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					ucapCommonFun.setFormValue(json);
					ucapColumns.oldJson = ucapCommonFun.getFormJSon("columnsEditHtml");
				}
			}
		}
		Ext.Ajax.request(requestConfig);		
	},
	getSelectNode:function(){
		return ucapColumns.tree.getSelectionModel().getSelectedNode();	
	},	
	/**
	 * 保存栏目
	 * @param {} name 不为空，说明是从重命名过来的
	 * @param flag 为1，说明是保存并新建下一个
	 */
	saveColumns:function(name,flag){
		if (typeof name=="undefined") name = "";
		if (typeof flag=="undefined") flag = "";
		
		if (name=="") {
			if (Ext.getDom("name").value.trim()==""){
				Ext.Msg.alert("保存提示","栏目名称不能为空！");
				return;
			}
			var json = ucapCommonFun.getFormJSon("columnsEditHtml");
			if (flag!=1){
				if (Ext.encode(this.oldJson)==Ext.encode(json)){
					Ext.Msg.alert("保存提示","当前文档未更改，无须保存！");
					return ;
				}
			}
		} else {
			var json = {name:name};
		}
		var node = this.getSelectNode();
		var funid = node.id;
		if (node.id == this.newRootId) funid="";
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"columns",act:"save",funid:funid,flag:this.isNewFlag},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					ucapColumns.oldJson = ucapCommonFun.getFormJSon("columnsTreeHtml");
					//Ext.Msg.alert("提示","保存信息成功！");
					Ext.MessageBox.show({
			           title: '系统提示',
			           msg: '保存信息成功!',
			           buttons: Ext.MessageBox.OK
			       });
			        setTimeout(function(){
			            Ext.MessageBox.hide();
			        }, 1000);
					if(ucapColumns.isNewFlag){
						//新建 文档的保存
						ucapColumns.newSaveConfig(json,response,flag);
					} else {
					    //旧文档的保存	
						ucapColumns.oldSaveConfig(json,response,flag);
					}
					ucapColumns.isNewFlag = false;
					ucapColumns.editColumnsWin.close();
					if (flag==1){
						ucapColumns.newEditColumns();				
					}
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
		var node = ucapColumns.getSelectNode();
	    var mjson = Ext.decode(response.responseText);
		if (node.id == ucapColumns.newRootId){
			//说明是根节点自己的保存,只要替换根节点就可以
			node.id = this.rootUnid;
			node.setText(this.rootName);
			node.leaf = true;
		}
		//在当前节点下追加一个子节点
		node.expand();
		var newNode = new Ext.tree.TreeNode(mjson);	
		node.leaf = false;
		node.icon="";
		node.appendChild(newNode);	
		ucapColumns.isNewFlag  = false;
	},
	/**
	 * 旧文档的操作操作 private
	 * @param {} json
	 */
	oldSaveConfig:function(json,response){
		
		var node = ucapColumns.getSelectNode();
		//说明只是对旧对象进行保存，只要更新就可以了
		if (Ext.getDom("name")){
			node.setText(Ext.getDom("name").value);
		} else {
			node.setText(ucapColumns.renameValue);
			ucapColumns.renameValue = "";
		}
	},
	/**
	 * 根据栏目的ID，打开视图
	 * @param {} node
	 */
	setColumnsView:function(columnsUnid){	
		this.setButtonState();
		if (this.type==1){
			initView(this.columnViewId,"columnsView","","","funid="+columnsUnid,26);
		} else {
			var text = this.getSelectNode().text;
			initView(this.articleViewId,"columnsView","","","funid="+columnsUnid+"&fcn="+text,0);
		}
		ucapModule.deductViewDivId =ucapColumns.columnsId;
		ucapCommonFun.setViewWidth();
	},
	setButtonState:function(){
		if (ucapColumns.type!=1) return;
		var node = ucapColumns.getSelectNode();
		//进行按钮的权限过滤
		if (node.id == ucapColumns.newRootId){
			//根节点不能新建
			Ext.getCmp("columnsDelete").setDisabled(true);
			Ext.getCmp("columnsRightDelete").setDisabled(true);
			Ext.getCmp("columnsFileDelete").setDisabled(true);
			return;
		} else {
			Ext.getCmp("columnsDelete").setDisabled(false);
			Ext.getCmp("columnsRightDelete").setDisabled(false);
			Ext.getCmp("columnsFileDelete").setDisabled(false);
		}
	},
	/**
	 * 弹出窗口进行栏目的新建或保存
	 */
	newEditColumns:function(unid){		
		var title;
		if (typeof unid == "undefined" || unid==this.newRootId){
			title = "新建栏目";
			unid="";
			this.isNewFlag = true;			
		} else {
			title = "编辑栏目";
		}
		var html="sys/cfgJsp/columns/columns.jsp?unid="+unid;
		var button=[
				{text:"保存并新增下一个",
					handler:function(){ucapColumns.saveColumns("",1);}},
				{text:"保存并关闭",
					handler:function(){ucapColumns.saveColumns();}},
				{text:"取消",
					handler:function(){ucapColumns.editColumnsWin.close();}}	
			];
		this.editColumnsWin = new Ext.Window({
				title:ucapSession.win.winImg+title,
		        width:600,
		        closable:true,    //关闭
		        modal: true,     
				height:400,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		this.editColumnsWin.show();
	}
}
var onColumnsItemClick=function(btn){
	var id = btn.id || btn;
	switch (id) {
	case "new":{   		
		ucapColumns.newEditColumns();
		break;
	}
	case "edit":{   
		var node = ucapColumns.getSelectNode();
		ucapColumns.newEditColumns(node.id);
		break;
	}
	case "delete":{
		ucapColumns.deleteNode();
		break;
	}
	case "columnsExpandAll":
		ucapColumns.getSelectNode().expand(true);
		break;
	case "columnsExpand":
		ucapColumns.getSelectNode().expand();
		break;
	case "columnsCollapseAll":
		ucapColumns.getSelectNode().collapse(true);
		break;
	case "columnsCollapse":
		ucapColumns.getSelectNode().collapse();
		break;
	case "rename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
		 	if (id=="ok"){
		 		if (msg==""){
		 			Ext.Msg.alert("改名提示","栏目名称不能为空！");
		 			return;
		 		}
		 		ucapColumns.renameValue = msg;
				ucapColumns.saveColumns(msg);
			}
		},this);		
		break;
	default :
       alert(btn.id+"代码未实现！");
	} 
}