
var ucapDept = {
	rootJson:[],
	tree:null,
	isNewFlag:false,  //是否新建部门的标志
	newRootId:"_ucapDeptNew",
	deptId:"deptleftTree",
	deptPanelId:"ucap_deptTree", //面板对象ID
	columnId:"_dept_column", //左边树的ID
	columnWidth:180, //左边的宽度
	userViewId:"02EA017398D04F4500151416001D0000", //用户视图UNID
	userManagerViewId:"13718B29A64AFF9B3834C0896D5D1704", //分级管理用户视图UNID
	oldJson:[],  //旧的json值
	editDeptWin:null,  //窗口对象
	renameValue:"",    //重命名的名称
	initDept:function(){
		//如果不是管理员身份也不进行过滤
//		if (ucapSession.userJson.userStatus==3){
//			return;			
//		}
		var buttonItems=[
			{text: '编辑部门',handler:function(){onDeptItemClick("edit")}},
	        {text: '重命名',handler:function(){onDeptItemClick("rename")}},'-',
	        {text: '删除部门',handler: function(){onDeptItemClick("delete")}}
	  		];
		var toolbar=[
	    	{text: '文件',menu :{items: [{text: '新建部门',handler:function(){onDeptItemClick("new")} }]}},
	        {text: '编辑', menu :{items: buttonItems}},
	        {text: '查看',menu :{items: [{text: '展开',id:"deptExpand", handler: onDeptItemClick},
	        	{text: '折叠',id:"deptCollapse", handler: onDeptItemClick},
	        	{text: '全部展开',id:"deptExpandAll", handler: onDeptItemClick},
	        	{text: '全部折叠',id:"deptCollapseAll", handler: onDeptItemClick}
	        	]}},
	    	  '-',
	         {text: '新建部门',handler:function(){onDeptItemClick("new")}},
	         {text: '编辑部门',handler: function(){onDeptItemClick("edit")}},
	         {text: '删除部门',handler: function(){onDeptItemClick("delete")}}
	      ];
	    var height = ucapSession.middleHeight;
	    if (height < 300) height=500;
	    
		var panel = new Ext.Panel({
			id:"ucap_deptTree",
	   		applyTo:"deptTree",
            //bodyStyle:ucapSession.win.winBodyStyle,
            plain:true,
            layout: 'border',
            height:height,
            tbar:toolbar,
            autoWidth:true,
            //width:500,
            items:[
            	{title:'部门列表',
            	 id:this.columnId,
	             region:'west',	            
	             html:'<div id="'+this.deptId+'">正在加载部门列表，请稍等......</div>',
	             width:this.columnWidth,
	             autoScroll:true,
	             collapsible:true, 
	             height:height-10,
	             split: true},
	            {
	             region:"center",
	             contentEl:"deptHtml",
	             autoWidth:true,
	             buttonAlign:"right"
	            }          
            ]
        });
        ucapCommonFun.autoMenuHeight();
        var belongToAppId = typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:false;
        var para;
    	if(belongToAppId){
    		para={type:"dept",act:"getDeptTree",unid:"",belongToAppId:belongToAppId}
    	}else{
    		para={type:"dept",act:"getDeptTree",unid:""}
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
						ucapDept.rootJson = Ext.util.JSON.decode(response.responseText)[0];
					} else {
						ucapDept.rootJson = [];					
					}
					ucapDept.createTree("");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},	
	createTree:function(){
		Ext.DomHelper.applyStyles(Ext.get(this.deptId),'style="padding:3px 0px 0px 5px;"');
	 	if($(this.deptId))$(this.deptId).innerHTML="";
	 	if (this.rootJson.length==0){
	 		//说明是从头新建部门
	 		this.rootJson ={id:ucapDept.newRootId,text:""};
	 	}
	 	var root=new Ext.tree.AsyncTreeNode({
	 		id:this.rootJson.id,
			expanded: true,	
			text:this.rootJson.text
		});	
		var loader = new Ext.tree.TreeLoader({
	         url : ucapSession.baseAction
	     });
		loader.on('beforeload', function(treeloader, node) {
			try{
			//var managerNode = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
			var belongToAppId =typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:false;
	    	if(belongToAppId){
			if (node.id==ucapDept.newRootId) return;
				treeloader.baseParams ={type:"dept",act:"getDeptTree",unid:node.id,belongToAppId:belongToAppId};
			}else{
			if (node.id==ucapDept.newRootId) return;
				treeloader.baseParams ={type:"dept",act:"getDeptTree",unid:node.id};
				 }
			}
			catch(e){
					if (node.id==ucapDept.newRootId) return;
					treeloader.baseParams ={type:"dept",act:"getDeptTree",unid:node.id};
			}
         }, this);

		var tree=new Ext.tree.TreePanel({
			renderTo:this.deptId,
			root:root,
			animate:true,
			rootVisible:true,
			enableDD: true, //允许拖放
			autoScroll:true,
			containerScroll: true,
			loader:loader
		});		
	
		this.tree = tree;
		tree.on("click",function(node){
			ucapDept.setUserView(node.id);
		});
		tree.addListener('movenode', ucapDept.handleMoveNode); 
		
		tree.on('contextmenu', menuShow);
        function menuShow ( node )
          {
          	node.select();//让右击是选中当前节点     
            treeRightMenu.show(node.ui.getAnchor());
                               
         };
        var treeRightMenu = new Ext.menu.Menu({ 
             id: 'treeMenuContext',
             items: [ 
	             {   text: '新建部门',
	                 icon:"",
	                 handler:function(){onDeptItemClick("new")} 
	             },  
	             {   text: '编辑部门',
	                 icon:"",
	                 handler:function(){onDeptItemClick("edit")} 
	             }, 
	             { 
	                 text: '删除部门',
	                 icon:"",
	                 handler:function(){onDeptItemClick("delete")}  
	             },
	             {
	                 text: "重命名", 
	                 icon: "",
	                 handler:function(){onDeptItemClick("rename")}
	              }
             ]
         });           

		this.tree  =tree;
		root.select();
		ucapDept.setUserView(root.id);
	},
	/**
	 * 树的移动
	 */
	handleMoveNode:function(tree,node,oldParent,newParent,index){
		var posIndex=index+1;
		var flag="";
		if (index==newParent.childNodes.length-1){
			//说明是在最后一个
			posIndex = index-1;
			flag="1";
		}
		
		var posNode = newParent.childNodes[posIndex];
		var params={type:"dept",act:"move",unid:node.id,posDeptId:posNode.id,
				newParentId:newParent.id,
				"random":ucapCommonFun.getRandomString(),flag:flag};

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
	 */
	deleteNode:function(){
		var deleteNodeAct =function(){
			var unid = node.id;
			var params ={"type":"dept","act":"delete","unid":unid};
			var requestConfig = {
				url:ucapSession.baseAction,
				params:params,
				callback:function(options,success,response){
					if (success){
						var exjson = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(exjson);
						if(!exResult)return;
						
						var node = ucapDept.getSelectNode();
						//看能否找到下一个节点的记录，如果是默认选中，如果本身是最后一个，则取前一个
						//如果就自己一个，则默认取上一节点的
						var newnode;
						if (node.id!=ucapDept.tree.getRootNode().id){
							if (node.nextSibling){
								newnode = node.nextSibling;
							} else if(node.previousSibling){
								newnode = node.previousSibling;
							} else {
								newnode = node.parentNode;
							}
							newnode.select();
							ucapDept.setUserView(newnode);
							node.remove();
						} else{
							ucapDept.rootJson=[];
							ucapDept.createTree();
							//alert("根节点删除");
						}		
					//	pnode.select();
					//	ucapDept.loadHtml();
					} else {
						Ext.Msg.alert("提示","删除不成功，请重试！");
					}
				}
			}		
			Ext.Ajax.request(requestConfig);
    	};
		var node = ucapDept.getSelectNode();
		var msg="删除本部门时，将同时删除其下所有的部门及所有对应的用户，此操作不可恢复，请确认?";
		Ext.MessageBox.confirm("删除提示",msg,function(id){
			if (id=="yes"){
        		deleteNodeAct();
    		}
		});	
	},
	//根据部门ID，设置根节点的值
	setValue:function(unid){
	//	this.setEmpty();
		//获取根节点对象
 		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"dept",act:"getDept",unid:unid},
			callback:function(options,success,response){
				if (success){
					var json = Ext.decode(response.responseText);					
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					if(null !=json["otherAttributes"]){
						for(fKey in json["otherAttributes"]){
							var val=json["otherAttributes"][fKey];
							json[fKey]=val;
						}
					}
					ucapCommonFun.setFormValue(json);
					ucapDept.oldJson = ucapCommonFun.getFormJSon("deptEditHtml");
				}
			}
		}
		Ext.Ajax.request(requestConfig);		
	},
	getSelectNode:function(){
		return ucapDept.tree.getSelectionModel().getSelectedNode();	
	},	
	/**
	 * 保存部门
	 * @param {} name 不为空，说明是从重命名过来的
	 * @param flag 为1，说明是保存并新建下一个
	 */
	saveDept:function(name,flag){
		if (typeof name=="undefined") name = "";
		if (typeof flag=="undefined") flag = "";
		
		if (name=="") {
			if (Ext.getDom("name").value.trim()==""){
				Ext.Msg.alert("保存提示","部门名称不能为空！");
				return;
			}
			var json = ucapCommonFun.getFormJSon("deptEditHtml");
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
		var punid = node.id;
		if (node.id == this.newRootId) punid="";
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"dept",act:"save",punid:punid,flag:this.isNewFlag},
			jsonData:json,
			callback:function(options,success,response){
				if (success){	
					var json = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					ucapDept.oldJson = ucapCommonFun.getFormJSon("deptTreeHtml");
					//Ext.Msg.alert("提示","保存信息成功！");
					if(ucapDept.isNewFlag){
						//新建 文档的保存
						ucapDept.newSaveConfig(json,response,flag);
					} else {
					    //旧文档的保存	
						ucapDept.oldSaveConfig(json,response,flag);
					}
					ucapDept.editDeptWin.close();
					if (flag==1){
						ucapDept.newEditDept();				
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
		var node = ucapDept.getSelectNode();
	    var mjson = Ext.decode(response.responseText);
		if (node.id == ucapDept.newRootId){
			//说明是根节点自己的保存,只需替换根节点就可以
			node.id = mjson.id;
			node.setText(mjson.text);
			node.leaf = true;
		} else {				
			//在当前节点下追加一个子节点
			node.expand();
			var newNode = new Ext.tree.TreeNode(mjson);	
			node.leaf = false;
			node.icon="";
			node.appendChild(newNode);			
			//newNode.select();	
			//ucapDept.setUserView(newNode);
		}
		ucapDept.isNewFlag  = false;
	},
	/**
	 * 旧文档的操作操作 private
	 * @param {} json
	 */
	oldSaveConfig:function(json,response){
		
		var node = ucapDept.getSelectNode();
		//说明只是对旧对象进行保存，只要更新就可以了
		if (Ext.getDom("name")){
			node.setText(Ext.getDom("name").value);
		} else {
			node.setText(ucapDept.renameValue);
			ucapDept.renameValue = "";
		}
	},
	/**
	 * 根据部门的ID，打开视图
	 * @param {} node
	 */
	setUserView:function(deptUnid){		
		var viewId=this.userViewId;
		try{
			//var managerNode = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
	    	var belongToAppId = typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:false;
		    	if(belongToAppId&&belongToAppId!='475C4D7E257F5EAF7CCDF46AE0FE35BD'){
				 viewId=this.userManagerViewId;
				} 
			}
			catch(e){
			}
		var cint = ucapSession.viewOpenType==1?25:0;
		initView(viewId,"userView","","","deptUnid="+deptUnid,"",26+cint);
		ucapModule.deductViewDivId =ucapDept.columnId;
		ucapCommonFun.setViewWidth();
		ucapCommonFun.autoMenuHeight();
	},
	/**
	 * 弹出窗口进行部门的新建或保存
	 */
	newEditDept:function(unid){	
		ucapDept.isNewFlag=false; //避免新建和编辑混淆 by cgc 2011.5.12
		var title;
		if (typeof unid == "undefined" || unid==this.newRootId){
			title = "新建部门";
			unid="";
			this.isNewFlag = true;			
		} else {
			title = "编辑部门";
		}
		var html="sys/cfgJsp/dept/dept.jsp?unid="+unid;
		var button=[
				{text:"保存并新增下一个",
					handler:function(){ucapDept.saveDept("",1);}},
				{text:"保存并关闭",
					handler:function(){ucapDept.saveDept();}},
				{text:"取消",
					handler:function(){ucapDept.editDeptWin.close()}}	
			];
		this.editDeptWin = new Ext.Window({
				title:ucapSession.win.winImg+title,
		        width:500,
		        closable:true,    //关闭
		        modal: true,     
				height:360,
				bodyStyle:ucapSession.win.winBodyStyle,
				autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
				buttons:button
			});
		this.editDeptWin.show();
	}
}
var onDeptItemClick=function(btn){
	var id = btn.id || btn;
	switch (id) {
	case "new":{   
		ucapDept.newEditDept();
		break;
	}
	case "newWin":{   	
		window.open(window.location,"_blank");
		break;
	}
	case "edit":{   
		var node = ucapDept.getSelectNode();
		ucapDept.newEditDept(node.id);
		break;
	}
	case "delete":{
		ucapDept.deleteNode();
		break;
	}
	case "deptExpandAll":
		ucapDept.getSelectNode().expand(true);
		break;
	case "deptExpand":
		ucapDept.getSelectNode().expand();
		break;
	case "deptCollapseAll":
		ucapDept.getSelectNode().collapse(true);
		break;
	case "deptCollapse":
		ucapDept.getSelectNode().collapse();
		break;
	case "rename":
		Ext.Msg.prompt("改名对话框","请输入新的名称：",function(id,msg){
		 	if (id=="ok"){
		 		if (msg==""){
		 			Ext.Msg.alert("改名提示","部门名称不能为空！");
		 			return;
		 		}
		 		ucapDept.renameValue = msg;
				ucapDept.saveDept(msg);
			}
		},this);		
		break;
	default :
       alert(btn.id+"代码未实现！");
	} 
}