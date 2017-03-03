/**
 * 权限设计的相关函数
 * llp@linewell.com
 */
var permission={

    rootName:"权限设计",       //树形根节点的名称
    
    sourceName:"",             //源对象名称
    sourceTitle:"",            //源标题
    sourceId:"",               //源标识 
    sourceFormId:"",           //源表单标识
    tree:null,                 //树形对象
    
    treeDivId:"targetTree",    //树形映射标识
    
    rootJson:null,             //节点对象
    
    /**
     * 初始化的类型
     * 
     * @param {} type 1：为业务权限；2：为按钮权限；3：组合表单页签权限
     */
    init:function(type){ 
        this.sourceId = Ext.getDom("sourceId").value;
        this.souceFormId = Ext.getDom("sourceFormId").value;
        
         var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"permission",action:"getSource",sourceId:this.sourceId,souceFormId:this.souceFormId},
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					var displayStr = exjson.sourceTitle+"："+exjson.sourceName;
					
					var sourceDisplayDiv = document.getElementById("sourceDisplay");
					
					sourceDisplayDiv.innerHTML = "<font color=red>"+displayStr+sourceDisplayDiv.innerHTML+"</font>";
					
					permission.createTree(type);
				}
			}
		}
		Ext.Ajax.request(requestConfig);
    },
    
    createTree:function(type){
    	var atype = "permission";
    	if("undefined"!=typeof(type) && type!="" ){
    		atype = type;
    	}
        Ext.DomHelper.applyStyles(Ext.get(this.treeDivId),'style="padding:3px 0px 0px 5px;"');
	 	Ext.getDom(this.treeDivId).innerHTML="";
	 	var onlyLeafCheckable = false;
	 	var checkModel = "";  //允许级联选择childCascade
	 	var roleId = document.getElementById("sourceId").value;
	 	var curAppUnid = "";
	 	if("undefined"!=typeof(ucapManagerTree) && null!=ucapManagerTree){
	 		curAppUnid = ucapManagerTree.curBelongToAppId;
	 	}
	 	if (null==this.rootJson){
	 		//说明是从头新建部门
	 		this.rootJson ={id:"root_id",text:this.rootName};
	 	}
	 	var root;	 	
	 	if (onlyLeafCheckable){
	 		root=new Ext.tree.AsyncTreeNode({
		 		id:this.rootJson.id,
				expanded: true,	
				text:this.rootJson.text			
			});	
	 	} else {
		 	 root=new Ext.tree.AsyncTreeNode({
		 		id:this.rootJson.id,
				expanded: true,	
			 	checked:false,
				text:this.rootJson.text			
			});	
	 	}	
		var loader = new Ext.tree.TreeLoader({
	         url : ucapSession.baseAction,
	         baseAttrs: {uiProvider: Ext.ux.TreeCheckNodeUI} 
	     });
		loader.on('beforeload', function(treeloader, node) {
		    var nodeType = node.attributes.nodeType;
		    var unid = node.attributes.value;
		    if(typeof(nodeType)=="undefined")nodeType = "";
		    if(typeof(unid)=="undefined")unid = "";
			//if (node.id=="root_id") return;
			treeloader.baseParams ={type:atype,action:"getTarget",roleId:roleId,unid:unid,nodeType:nodeType,belongToApp:curAppUnid}
         }, this);
         

		var tree=new Ext.tree.TreePanel({
			renderTo:this.treeDivId,
			root:root,
			animate:false,
			rootVisible:false,
			autoScroll:true,
			width:475,
			height:370,
			containerScroll: true,
			loader:loader,
			//扩展的属性
			onlyLeafCheckable:onlyLeafCheckable,  //是否只允许选择叶子节点
			checkModel:checkModel                //是否为单选或级选择
		});		
		//root.select();
		this.tree = tree;
    },
    
    /**
     * 
     * @param {} type
     * @param {} phtml
     * @param {} ptitle
     */
    config:function(type,phtml,ptitle,permissionType){
    	var formUnid = "";
		 var unid = "";
		if("undefined"!=typeof(type) && 1==type){
			unid=Ext.getDom("unid").value;
		}else{
			formUnid = view.viewBaseInfos[view.index].formId;
			unid=view.getSelecedUnid();
		}
	    if(null!=unid && unid.indexOf(",")>0){
	        unid = unid.substring(0,unid.indexOf(","));
	    }
	    if(unid==""){
            Ext.MessageBox.alert("信息提示","请选择要配置的角色！");
            return;
        }
		var html=phtml+"?unid="+unid+"&formId="+formUnid;
		
		var button=[
					{text:"确定",id:"btnOk",
						handler:function(){permission.disableBtn();
										   permission.permissionConfirm(permissionType);
						}},
					{text:"取消",id:"btnCancel",
					handler:function(){permission.disableBtn();
									   ucapSession.commonWin.close()}
					}];
		ucapSession.commonWin = new window.top.Ext.Window({//
			title:ucapSession.win.winImg+ptitle,
		    width:510,
		    closable:true,    //取消
		    modal: true,     
			height:470,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapSession.commonWin.show();
    },
    /**
     *设置按钮不可用
     *by@ cgc 2011.5.23
     */
     disableBtn:function(){
     		if(Ext.getCmp("btnOk")){
     	    	Ext.getCmp("btnOk").disable();
     	    }
     	    if(Ext.getCmp("btnCancel")){
     	    	Ext.getCmp("btnCancel").disable();   	
     	    }  	
     },
     
    
    /**
	 * 权限配置
	 * @param type 0或空为来源视图，1为来源角色分级
	 */
	permissionConfig:function(type){
		var html = "sys/cfgJsp/permission/permission.jsp";
		var title = "权限配置";
		this.config(type,html,title,1);
	},
	
	/**
	 * 按钮权限配置
	 * 
	 * @param {} type 
	 */
	subButtonPermissionConfig:function(type){
		var html = "sys/cfgJsp/permission/subButtonPermission.jsp";
		var title = "按钮权限配置";
		this.config(type,html,title,2);
	},
	
	/**
	 * 组合表单页签配置
	 * 
	 * @param {} type 
	 */
	cFormTabPermissionConfig:function(type){
		var html = "sys/cfgJsp/permission/cFormTabPermission.jsp";
		var title = "组合表单页签配置";
		this.config(type,html,title,3);
	},
	
	/**
	 *
	 */
	permissionConfirm:function(permissionType){
		var topWin = window.top;
	    var tree = topWin.permission.tree;
		var nodes = tree.getChecked();	
		var allNodes = topWin.permission.getAllNodes(tree);
		
		var systemIds = "";
		var menuIds = "";
		var moduleIds = "";
		var allSystemIds = "";
		var allMenuIds = "";
		var allModuleIds = "";
		var roleId = topWin.document.getElementById("sourceId").value;
		
		for(var i=0;i<nodes.length;i++){
			var unid = nodes[i].attributes.value;
			var saveType = nodes[i].attributes.saveType;

			if(saveType=="0"){
			    if(systemIds==""){
			        systemIds = unid;
			    }else{
			        systemIds +=","+unid;
			    }
			}
			
			if(saveType=="1"){
			    if(menuIds==""){
			        menuIds = unid;
			    }else{
			        menuIds +=","+unid;
			    }
			}
			
			if(saveType=="2"){
			    if(moduleIds==""){
			        moduleIds = unid;
			    }else{
			        moduleIds +=","+unid;
			    }
			}
		}
		
		for(var i=0;i<allNodes.length;i++){
		    var unid = allNodes[i].attributes.value;
		    var saveType = allNodes[i].attributes.saveType;
		    if(typeof(unid)=="undefined")continue;
		    if(saveType=="0"){
			    if(allSystemIds==""){
			        allSystemIds = unid;
			    }else{
			        allSystemIds +=","+unid;
			    }
			}
			
			if(saveType=="1"){
			    if(allMenuIds==""){
			        allMenuIds = unid;
			    }else{
			        allMenuIds +=","+unid;
			    }
			}
			
			if(saveType=="2"){
			    if(allModuleIds==""){
			        allModuleIds = unid;
			    }else{
			        allModuleIds +=","+unid;
			    }
			}
		}
		var json = "";
		var actionType = "permission";
		if(permissionType==1){
			json = "{systemIds:'"+systemIds+"',menuIds:'"+menuIds+"',moduleIds:'"+moduleIds+"',allSystemIds:'"+allSystemIds+"',allMenuIds:'"+allMenuIds+"',allModuleIds:'"+allModuleIds+"'}";
		}else if(permissionType==2){
			actionType = "subButtonPermission";
			json = "{subButtonIds:'"+menuIds+"',allSubButtonIds:'"+allMenuIds+"'}";
		}else if(permissionType==3){
			actionType = "cFormTabPermission";
			json = "{cFormTabIds:'"+menuIds+"',allCFormTabIds:'"+allMenuIds+"'}";
		}
		
		json = Ext.decode(json);
		//实现保存
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":actionType,"action":"save","roleId":roleId,"tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					//Ext.Msg.alert("提示","视图排序保存成功！");
					topWin.Ext.Msg.alert("提示","权限配置保存成功！");
					ucapSession.commonWin.close();
				} else {
					topWin.Ext.Msg.alert("提示","权限配置保存不成功，可能为网络断开连接！");
					ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 获取所有展开的节点
	 */ 
	getAllNodes:function(treePanel){
	   var startNode = treePanel.getRootNode();
        var r = [];
        var f = function(){
                r.push(this);
        };
        startNode.cascade(f);
        return r;
	},
	
	/**
	 * 级联选择复选框发生改变时，做出相应的变化
	 */
	checkChanged:function(obj){
	    var checkModel = "";  //允许级联选择
	    if(obj.checked){
	        checkModel = "cascade"//节点选中：下级节点和上级父节点级联选中
	    }
	    permission.tree.checkModel = checkModel;
	},
	
	/**
	 * 根据角色初始部门根节点，并创建相应的部门树
	 * yjy 2011-5-9 update
	 * @param renderTo 树展示的div
	 */
	initRoleDeptTree:function(renderTo){
		var deptRoleId="";//要根据角色ID取可授权的部门列表，这个是父角色
		var roleName="";
		if(typeof ucapRoleConfig!="undefined"){
			var node = ucapRoleConfig.getSelectNode();
			var rootIds= ucapRoleConfig.getParentNodeId(node);
			
			var vid=rootIds.split(",");
			if(vid.length>2){
				//说明是子角色，要取父角色，为倒数第二个，因第一个是 根节点
				deptRoleId = vid[vid.length-2];
				var ids = ucapRoleConfig.roleDeptIds.split(",");
				var cns = ucapRoleConfig.roleDeptIdsCn.split(",");
				var index = ids.indexOf(deptRoleId);
				if(index>-1){
					roleName =cns[index]+ "--";
				}
			} else {
				roleName="当前系统";
			}
			if($("_disName")) $("_disName").innerHTML =roleName+ "--";
		}
		var para; //,roleId:roleId
		
		var belongToAppId = typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:"";
	    var	para={type:"dept",act:"getDeptTree",unid:"",roleId:deptRoleId,
	    	isCheck:"isCheck",belongToAppId:belongToAppId}
	    //获取根节点对象	
 		var requestConfig = {
			url:"umcAction.action",
			params:para,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					if (response.responseText!="null" && response.responseText!=""){
						permission.rootJson = Ext.util.JSON.decode(response.responseText);
					} else {
						permission.rootJson = [];					
					}
					permission.createRoleDeptTree(renderTo);
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 根据角色创建部门树
	 */
	createRoleDeptTree:function(renderTo,roleName){
		Ext.DomHelper.applyStyles(Ext.get(renderTo),'style="padding:3px 0px 0px 5px;"');
    //alert("ok");
	 	if($(renderTo))$(renderTo).innerHTML="";
	 	//var checkModel = "childCascade";
	 	var checkModel ="";//"cascade";//选中节点时同时选中其上级 modify by zh 2010-6-1
	 	if (this.rootJson.length==0){
	 		//说明是从头新建部门
	 		this.rootJson ={id:"",text:"",checked:false};
	 	}
	 	var root=new Ext.tree.AsyncTreeNode({
	 		id:this.rootJson.id,
			expanded: true,	
			checked:this.rootJson.checked,
			text:"部门列表",
			children:this.rootJson
		});	
		var loader = new Ext.tree.TreeLoader({
	         url : "umcAction.action",
	         baseAttrs: {uiProvider: Ext.ux.TreeCheckNodeUI} 
	     });
		loader.on('beforeload', function(treeloader, node) {
			var belongToAppId = typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:"";
	    	var	para={type:"dept",act:"getDeptTree",unid:node.id,treeType:"role",
	    		isCheck:"isCheck",belongToAppId:belongToAppId};
				treeloader.baseParams =para;
         }, this);
         
		var tree=new Ext.tree.TreePanel({
			renderTo:renderTo,
			root:root,
			animate:false,
			enableDD: false, //允许拖放
			autoScroll:true,
			//width:375,
			height:290,
			containerScroll: true,
			loader:loader,
			onlyLeafCheckable:false,
			checkModel:checkModel,                //是否为单选或级选择
			rootVisible:false
		});
		
		this.tree = tree;
		roleAuthDept.tree = tree;
		
		tree.on('checkchange', function(node, checked) {
			var resultList = Ext.getDom("selectDepts");
            if(checked){
            	roleAuthDept.addItem();
            }else{
				for (var i = 0; i < resultList.options.length; i++) {
					var tmpOpt = resultList.options[i];
					if (tmpOpt.value == node.id) {
						resultList.options.remove(i);
						break;
					}
				}
            }
         }, tree);
	},
	
	/**
	 * 角色部门设置，根据角色设置此角色可管理的部门
	 * @param type 0或空为视图，1为来源分级
	 */
	roleDeptConfig:function(type){
		var unid = "";
		if("undefined"!=typeof(type) && 1==type){
			unid=Ext.getDom("unid").value;
		}else{
			unid=view.getSelecedUnid();
		}
	    if(null!=unid && unid.indexOf(",")>0){
	        unid = unid.substring(0,unid.indexOf(","));
	    }
	    if(unid==""){
            Ext.MessageBox.alert("信息提示","请选择要配置的角色！");
            return;
        }
		var html="sys/cfgJsp/permission/roleDept.jsp?roleId="+unid;
		var button=[
			{text:"确定",id:"btnOk",handler:function(){permission.disableBtn();permission.roleDeptConfirm()}},
			{text:"取消",id:"btnCancel",
				handler:function(){permission.disableBtn();ucapSession.commonWin.close()}
			}];
		ucapSession.commonWin = new Ext.Window({
			title:ucapSession.win.winImg+"角色部门权限设置",
		    width:600,
		    closable:true,    //取消
		    modal: true,     
			height:400,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapSession.commonWin.show();
	},
	
	/*
	 * 角色可管理的部门权限设置
	 */
	roleDeptConfirm:function(){
		var roleId = document.getElementById("roleId").value;
		var fn=function(){
			Ext.Msg.alert("提示","角色可管理的部门权限配置保存成功！");
			ucapSession.commonWin.close();
		};
		roleAuthDept.roleDeptConfirm(roleId,fn);
		
		/*var tree = permission.tree;
		var roleId = document.getElementById("roleId").value;
		var nodes = tree.getChecked();	
		var deptIds = null;
		for(var i=0;i<nodes.length;i++){
			if(null==deptIds){
				deptIds = nodes[i].id;
			}else{
				deptIds +=","+nodes[i].id;
			}
		}
		
		var json = "{roleId:'"+roleId+"',deptIds:'"+deptIds+"'}";
		
		json = Ext.decode(json);
		
		//实现保存
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"dept","act":"saveRoleDept"},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					Ext.Msg.alert("提示","角色可管理的部门权限配置保存成功！");
				} else {
					Ext.Msg.alert("提示","角色可管理的部门权限配置保存不成功，可能为网络断开连接！");
					ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);*/
	}
}

//add  by  fsm  2010.6.22
var  dvpermission={
    
    rootName:"权限设计",       //树形根节点的名称
    
    sourceName:"",             //源对象名称

    sourceTitle:"",            //源标题

    sourceId:"",               //源标识

    sourceFormId:"",           //源表单标识

    tree:null,                 //树形对象
    
    treeDivId:"targetTree",    //树形映射标识
    
    rootJson:null,             //节点对象
    
    //开始进行初始化
    init:function(){
        this.sourceId = Ext.getDom("sourceId").value;
        this.souceFormId =Ext.getDom("sourceFormId").value;
        var sourceDisplayDiv = document.getElementById("sourceDisplay"); 
        if(""==this.sourceId||null==this.sourceId)
        {
             sourceDisplayDiv.innerHTML= "<font color=red>"+"视图权限配置"+"</font>";
        } 
       else
       { 
             var requestConfig = {
			    url:ucapSession.baseAction,
			    params:{type:"permission",action:"getSource",sourceId:this.sourceId,souceFormId:this.souceFormId,userflag:"1"},
			    callback:function(options,success,response){
				    if (success){
					    var exjson = Ext.decode(response.responseText);
					    var exResult=ucapCommonFun.dealException(exjson);
					    if(!exResult)return;
					    var displayStr = exjson.sourceTitle+"："+exjson.sourceName;
    		
					    sourceDisplayDiv.innerHTML = "<font color=red>"+displayStr+sourceDisplayDiv.innerHTML+"</font>";
    					
				    }
			    }
		    }
		    Ext.Ajax.request(requestConfig);
		}
		 dvpermission.createTree("");
    },
    /**
	 * 权限配置
	 *@param t  :当t=1时，直接设置视图权限，不关联用户
	 */
	dvpermissionConfig:function(type,isDefault){
		var unid = "";
		var formUnid="";
		if("undefined"==typeof(isDefault) || !isDefault){
			if("undefined"!=typeof(type) && 1==type){
				unid=Ext.getDom("unid").value;
			}else{
				unid=view.getSelecedUnid();
				formUnid = view.viewBaseInfos[view.index].formId;
			}
	   	   if(null!=unid && unid.indexOf(",")>0){
	           unid = unid.substring(0,unid.indexOf(","));
	       }
	       if(unid==""){
                Ext.MessageBox.alert("信息提示","请选择要配置的角色！");//把用户改成了相应的角色
               return;
           }
		}
	   var html="sys/cfgJsp/permission/dvpermission.jsp?unid="+unid+"&formId="+formUnid;
	   var button=[
					{text:"确定",id:"btnOk",handler:function(){
					permission.disableBtn();
					dvpermission.dvpermissionConfirm();
					}},
					{text:"取消",id:"btnCancel",				
					handler:function(){permission.disableBtn();ucapSession.commonWin.close()}
					}];
		ucapSession.commonWin = new Ext.Window({
			title:ucapSession.win.winImg+"视图数据权限配置",
		    width:510,
		    closable:true,//取消
		    modal: true,
			height:470,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapSession.commonWin.show();
	},
	    
    createTree:function(){
        Ext.DomHelper.applyStyles(Ext.get(this.treeDivId),'style="padding:3px 0px 0px 5px;"');
	 	Ext.getDom(this.treeDivId).innerHTML="";
	 	var onlyLeafCheckable = false;
	 	var checkModel = "";  //允许级联选择childCascade
	 	var userId = document.getElementById("sourceId").value;
	 	if (null==this.rootJson){
	 		//说明是从头新建部门
	 		this.rootJson ={id:"root_id",text:this.rootName};
	 	}
	 	var root;	 	
	 	if (onlyLeafCheckable){
	 		root=new Ext.tree.AsyncTreeNode({
		 		id:this.rootJson.id,
				expanded: true,	
				text:this.rootJson.text			
			});	
	 	} else {
		 	 root=new Ext.tree.AsyncTreeNode({
		 		id:this.rootJson.id,
				expanded: true,	
			 	checked:false,
				text:this.rootJson.text			
			});	
	 	}		
		var loader = new Ext.tree.TreeLoader({
	         url : ucapSession.baseAction,
	         baseAttrs: {uiProvider: Ext.ux.TreeCheckNodeUI} 
	     });
	     
		loader.on('beforeload', function(treeloader, node) {
		    var nodeType = node.attributes.nodeType;
		    var unid = node.attributes.value;
		    if(typeof(nodeType)=="undefined")nodeType = "";
		    if(typeof(unid)=="undefined")unid = "";
			treeloader.baseParams ={type:"permission",action:"getdatarole",userId:userId,unid:unid,nodeType:nodeType}
         }, this);
         

		var tree=new Ext.tree.TreePanel({
			renderTo:this.treeDivId,
			root:root,
			animate:false,
			rootVisible:true,
			autoScroll:true,
			width:475,
			height:370,
			containerScroll: true,
			loader:loader,
			//扩展的属性
			onlyLeafCheckable:true,//onlyLeafCheckable,  //是否只允许选择叶子节点
			checkModel:checkModel,                //是否为单选或级选择
			rootVisible:false
		});		
	
		//root.select();
		this.tree = tree;
    },
	/**
	视图数据权限配置确定按钮
	*/
	dvpermissionConfirm:function()
	{
        var tree = dvpermission.tree;
		var nodes = tree.getChecked();	
		var allNodes = dvpermission.getAllNodes(tree);
		
		var viewIds = "";
		var roleIds = "";

		for(var i=0;i<nodes.length;i++){
		    var unid = nodes[i].attributes.value;
            var content= nodes[i].attributes.content;
			if(unid!=""&&content!="")
			{
			    if(viewIds=="")
			    {
			        viewIds = content;
			    }
			    else
			    {
			        viewIds +=","+content;
			    }
			    if(roleIds=="")
			    {
			        roleIds=dvpermission.getRadioValue("roleType_"+unid);//roleType_
			    }
			    else
			    {
			        roleIds+=","+dvpermission.getRadioValue("roleType_"+unid);
			    }
		    }
		}
		
        var userId = document.getElementById("sourceId").value;
		
		var json = "{viewIds:'"+viewIds+"',roleIds:'"+roleIds+"'}";
		json = Ext.decode(json);
		
		//实现保存
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"permission","action":"savedatarole","userId":userId,"tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					Ext.Msg.alert("提示","数据视图权限配置保存成功！");
					ucapSession.commonWin.close();
				} else {
					Ext.Msg.alert("提示","数据视图权限配置保存不成功，可能为网络断开连接！");
					ucapSession.commonWin.close();
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
		/**
	 * 获取所有展开的节点
	 */ 
	getAllNodes:function(treePanel){
	   var startNode = treePanel.getRootNode();
        var r = [];
        var f = function(){
                r.push(this);
        };
        startNode.cascade(f);
        return r;
	},
	
	/**
	 * 级联选择复选框发生改变时，做出相应的变化
	 */
	checkChanged:function(obj,type){
	    var checkModel = "";  //允许级联选择
	    if(obj.checked){
	        checkModel = "childCascade"
	    }
	 	if(type=="roleDept"){
	 		//createRoleDeptTree.checkModel=checkModel;
	 	}else{
	 		dvpermission.tree.checkModel = checkModel;
	 	}
		 
		 
	},

	getRadioValue:function(t)
    {
        var result =document.getElementById(t).value;
	    if(result=="")result="00";
	    return result;
    }

}
 