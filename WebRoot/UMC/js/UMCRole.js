/**
 * 角色定制
 * 在原来role.js的基础上进行更改，以适应UMC中应用 
 * yjy 2011-4-30
 */
Ext.namespace('ucapRoleConfig');

var ucapRoleConfig = {
	actionUrl : "umcAction.action", // 设置统一的action获取入口 by
										// xhuatang@linwell.com
	roleId : "ucap_roleTree",
	leftId : "_ucap_roleId",
	leftWidth : 200,
	displayName : "",
	saveNewImg : '<img align="absmiddle" src="' + ucapSession.appPath
			+ "uistyle/images/icon/icon_103.gif" + '"/>',
	saveImg : '<img align="absmiddle" src="' + ucapSession.appPath
			+ "uistyle/images/icon/icon_29.gif" + '"/>',
	closeImg : '<img align="absmiddle" src="' + ucapSession.appPath
			+ "uistyle/images/icon/icon_102.gif" + '"/>',
	treeJson : [], // 树的来源值
	oldJson : [], // 旧的json值
	rootUnid : "", // 根节点的值，如果是新建则== newRootId，否则为_dictTree
	rootName : "角色列表", // 根节点的名称
	tree : null, // 当前树的对象
	newRootId : "_ucapRoleNew",
	roleDeptIds : "",// 角色第一级的列表
	roleDeptIdsCn:'',//角色第一级对应的中文名称
	roleType : "",
	isUMCApp:false, //是否为UMC中的角色
	root : null,
	isNewFlag : false, // 判断是否为新增状态，在保存后，此值设置为false,新建时设置为true
	isAdmin : false,// 是否为管理员，包括应用系统管理员与平台管理员
	curFirstRoleUnid:"",//当前第一级角色ID
	roleHaveAuth:null, //应用系统的角色是否有管理部门的授权权限
	/**
	 * 初始化角色
	 * 
	 * @param roleType
	 *            如果有值，则说明是从UMC过来的
	 */
	initRole : function(roleType) {
		if (typeof roleType == "undefined") {
			roleType = "";
			this.isUMCApp = false;
		} else {
			roleType = "1"; // 1表示是组织架构角色
			this.isUMCApp = true;
			if (UMCSession && UMCSession.isPlatFormManager) {
				this.isAdmin = true;
			}
		}
		
		//判断是否应用系统管理员
		if (ucapSession.userJson.userStatus == 1){
			this.isAdmin = true;
		}	
		
		this.roleType = roleType;
		this.oldJson = null;
		this.tree = null;
		this.treeJson = [];

		this.belongToAppId = typeof(ucapManagerTree) != "undefined"
				? ucapManagerTree.curBelongToAppId
				: "";
		var para = {
			type : "role",
			act : "getRoleTree",
			unid : "",
			curAppUnid : this.belongToAppId,
			roleType : this.roleType
		};

		// 获取根节点对象
		var requestConfig = {
			url : ucapRoleConfig.actionUrl,
			params : para,
			callback : function(options, success, response) {
				if (success) {
					var exjson = Ext.decode(response.responseText);
					var exResult = ucapCommonFun.dealException(exjson);
					if (!exResult)	return;
					if (response.responseText != "null"
							&& response.responseText != "") {
						ucapRoleConfig.treeJson = Ext.util.JSON.decode(response.responseText);// 可能是多值
						ucapRoleConfig.isNewFlag = false;
					} else {
						ucapRoleConfig.isNewFlag = true;
					}
					ucapRoleConfig.rootUnid = ucapRoleConfig.newRootId;
          
                    
					// 装载角色对象
					ucapRoleConfig.initWinBox();
					ucapRoleConfig.createTree();
					ucapRoleConfig.setButtonState();
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * private
	 */
	initWinBox : function() {
		var toolbar = [{
					text : '新建',
					id : "roleNew",
					handler : onRoleItemClick
				}, {
					text : '删除',
					id : "roleDelete",
					handler : onRoleItemClick
				}, '-'];
		
		//“角色”界面一共有四种情况： add by zzhan@linewell.com 2112-02-22
		//1.应用平台的“用户管理”界面：内容区域的高度=middleHeight-页签的高度
		//2.UMC的中“用户”界面 ：内容区域的高度=浏览器高度-header高度-footer高度
		//3.旧版本“分级管理中心”的“角色”界面：内容区域的高度=浏览器高度-工具栏的高度-页签高度
		//4.新版本“应用管理系统”的 “角色”界面：内容区域的高度-header高度-地址栏高度-工具栏高度-页签高度-footer高度
		var height;
		//考虑兼容性
		var documentHeight = document.compatMode=="CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
		if(Ext.getDom("topLine")){//应用平台有topLine伸缩条
			height = ucapSession.middleHeight - (window.top.viewTabs?25:0);
		}else if(Ext.getDom("toolbarBox")){ //新版本“应用管理系统”
			var newHeaderHeight = Ext.query(".topBox ")[0].offsetHeight;
			var newSiteHeight = Ext.query(".siteBox")[0].offsetHeight;
			var newToolbarHeight = Ext.getDom("toolbarBox").offsetHeight;
			var newFooterHeight = Ext.query(".bottomBox ")[0].offsetHeight;
			height = documentHeight - newHeaderHeight - newSiteHeight - newToolbarHeight - (window.top.viewTabs?25:0) -  newFooterHeight;
		}
		else if(Ext.getDom("ucapSystemButtonListBox")){//旧版本“分级管理中心”
			//2012-07-24 mdf by chuiting@linewell.com
			//修改BUG:1223省厅OA界面性"分级管理中心，角色树形数据太多时，没有出现滚动条
			var headerHeight = Ext.getDom("headerBox").offsetHeight + 4;//header高度
			height = documentHeight - Ext.query(".ucapSystemButtonListBox")[0].offsetHeight -(window.top.viewTabs?25:0) - headerHeight;
			//end 2012-07-24 mdf by chuiting@linewell.com
		}
		else{//UMC的中“用户”界面
			var headerHeight =  Ext.getDom("headerBox").offsetHeight;
			var footerHeight = Ext.query(".footer")[0].offsetHeight;
			height = documentHeight-headerHeight-footerHeight;
		}
		Ext.getDom("roleTree").innerHTML = "";
		var tbar =['->',
	             	{text:this.saveNewImg+"保存并新增下一个",id:"btnSaveAndNew",handler:function(){
	             				ucapRoleConfig.save("",1)} },
	             	{text:this.saveImg+"保存",id : "btnSave",handler:function(){
	             				ucapRoleConfig.save()} }
	             	];
	     if(!this.isUMCApp){
	     	tbar.push([
	             	{text:"组合表单页签权限",id:"formConfig",handler:function(){
	             				permission.cFormTabPermissionConfig(1)} },
	                {text:"按钮权限",id:"btnConfig",handler:function(){
	             				permission.subButtonPermissionConfig(1)} },
	             	{text:"业务权限",id:"appConfig",handler:function(){
	             				permission.permissionConfig(1)} },
	                {text:"数据权限",id:"dataRoleConfig",handler:function(){
	             				dvpermission.dvpermissionConfig(1)} }
	             				//,
	             	//{text:"分级管理权限",id:"managerConfig",handler:function(){
	             				//ucapPopedomTree.init(1)}}
	             ])
	     }
       
      //判断是否有可管理的角色的JSON add by xhuatang@linewell.com 2011-05-13      
	    if(this.roleHaveAuth && ucapRoleConfig.treeJson.length > 0){
	    	tbar.push([{ text:"部门权限",id:"deptRoleConfig",handler:function(){
	             				permission.roleDeptConfig(1)} }])
	    }else{
        ucapRoleConfig.setButtonState();
      }
		
		var panel = new Ext.Panel({
					plain : true,
					id : this.roleId,
					applyTo : "roleTree",
					layout : 'border',
					height : height,
					// bodyStyle:ucapSession.win.winBodyStyle,
					tbar : toolbar,
					items : [{
								id : this.leftId,
								region : 'west',
								html : '<div id="roleleftTree">正在加载角色，请稍等......</div>',
								width : this.leftWidth,
                                
                                //2012-05-14 add by xhuatang
                                //定义面板不能滚动
								autoScroll : false,
								collapsible : true,
								split : true,
                                layout : "fit"
							}, {
								region : "center",
								contentEl : '_UmcRoleDept',
								buttonAlign : "right",
								autoWidth:true,
								tbar : tbar
							}]
				});
		var bar = panel.getTopToolbar();
		bar.addField(new Ext.form.Checkbox({
							name : 'saveInfo',
							fieldLabel : '1',
							boxLabel : '保存成功时有提示',
							checked : true
						}));
	},
	/**
	 * private
	 */
	createTree : function() {
		Ext.DomHelper.applyStyles(Ext.get("roleleftTree"),
				'style="padding:3px 0px 0px 5px;"');
                
		Ext.getDom("roleleftTree").innerHTML = "";
		var root = new Ext.tree.AsyncTreeNode({
					expanded : true,
					id : this.rootUnid,
					text : this.rootName,
					children : this.treeJson
				});
		// 是否显示根节点
		var rootVisible = false;
		// 如果是管理员可以看到根节点下面的所有节点 by xhuatang
		if (this.isAdmin) {
			rootVisible = true;
		};
		if(!ucapRoleConfig.isNewFlag){
			//获取顶级ID列表
			this.roleDeptIds = this.treeJson[0].id;
			this.roleDeptIdsCn = this.treeJson[0].text;
			for (var i = 1; i < this.treeJson.length; i++) {
				this.roleDeptIds += "," + this.treeJson[i].id;
				this.roleDeptIdsCn +="," + this.treeJson[i].text;
			}
		}
		var loader = new Ext.tree.TreeLoader({
					url : ucapRoleConfig.actionUrl
				});
		loader.on('beforeload', function(treeloader, node) {
					var unid = node.id;
					if (node.id == ucapRoleConfig.newRootId)
						unid = "";
					treeloader.baseParams = {
						type : "role",
						act : "getRoleTree",
						flag : "edit",
						unid : unid,
						curAppUnid : ucapRoleConfig.belongToAppId,
						roleType : ucapRoleConfig.roleType
					};
				}, this);

		var tree = new Ext.tree.TreePanel({
					renderTo : "roleleftTree",
					root : root,
					animate : true,
					rootVisible : rootVisible,
					enableDD : true, // 允许拖放
					autoScroll : true,
					containerScroll : true,
					loader : loader,                    
                    layout : 'fit',
                    
                    //2012-07-24 add by chuiting@linewell.com
                    //定义树形面板的高度为父面板的宽度
                    width : Ext.get(ucapRoleConfig.leftId).getWidth() - 6,
                    //end 2012-07-24 add by chuiting@linewell.com
                    
                    //2012-05-14 add by xhuatang
                    //定义树形面板的高度为父面板的高度
                    //2012-07-24 mdf by chuiting@linewell.com
                    height : Ext.get(ucapRoleConfig.leftId).getHeight() - 10
				});
		tree.on("click", function(node) {
					if (node.id == ucapRoleConfig.newRootId || node.id == "") {
						ucapRoleConfig.isNewFlag = true;
						Ext.getCmp("roleDelete").setDisabled(false);
						Ext.getCmp("roleRightDelete").setDisabled(false);
						Ext.getCmp("roleNew").setDisabled(false);
						Ext.getCmp("roleRightNew").setDisabled(false);
					} else {
						ucapRoleConfig.isNewFlag = false;
					}
					// 设置按纽的状态，如果是根节点非管理员不能更改 by xhuatang@linwell.com
					ucapRoleConfig.setButtonState();
					ucapRoleConfig.loadHtml();
				});
		tree.addListener('movenode', ucapRoleConfig.handleMoveNode);

		tree.on('contextmenu', dictShow);
		function dictShow(node) {
			node.select();// 让右击是选中当前节点
			ucapRoleConfig.setButtonState();
			treeRightRole.show(node.ui.getAnchor());
		};
		var treeRightRole = new Ext.menu.Menu({
					items : [{
								id : 'roleRightNew',
								text : '新建',
								icon : "",
								handler : onRoleItemClick
							}, {
								id : 'roleRightDelete',
								text : '删除',
								icon : "",
								handler : onRoleItemClick
							}, {
								id : "roleRename",
								text : "重命名",
								icon : "",
								handler : function() {
									onRoleItemClick("roleRename");
								}
							}]
				});
		// 设置第一个为选中

		this.tree = tree;
		this.root = root;
		var node = root;
		if (!this.isNewFlag) {
			var path = "/" + this.rootUnid + "/" + this.treeJson[0].id;
			this.tree.selectPath(path);
			node = tree.getSelectionModel().getSelectedNode();
		}
		node.select();
		ucapRoleConfig.loadHtml();
		// 如果是管理员
		if (this.isAdmin &&   this.isUMCApp) {
			$("_disName").innerHTML = "“平台管理员”";
			this.loadAuthDept();
		}
	},
	/**
	 * 判断是否是顶级节点
	 * 
	 * @param {}
	 *            node 节点对象
	 * @return 是否为顶级节点
	 */
	checkIsRootNode : function(node) {
		var idArray = this.roleDeptIds.split(",");
		for (var i = 0; i < idArray.length; i++) {
			if (idArray[i] == node.id) {
				return true;
			}
		}
		return false;
	},
	/**
	 * private
	 */
	loadHtml : function() {
		var node = this.getSelectNode();
		var unid = node.id;
		
		if (this.isUMCApp){
			if (!this.isAdmin && this.isUMCApp) {
				if (this.checkIsRootNode(node)) {
					this.loadAuthDept(unid);
					$("ucapRoleCenter").innerHTML="";
					//return;
				}
			}
			//要判断选中节点的根节点是否已经加载，如果没有，则要再重新加载
			if (!this.isAdmin && this.isUMCApp){
				var nodeids = this.getParentNodeId(node);
				//取出当前节点的第一个节点
				var ids = this.roleDeptIds.split(",");
				var curFirstId ="";
				for(var i=0;i<ids.length;i++){
					if(ids[i]!="" && nodeids.indexOf(ids[i])>-1){
						//说明找到
						curFirstId = ids[i];
						break;
					}
				}
				//2012-08-29 mdf by chuiting@linewell.com
				//1242-UMC：授权-角色列表，切换角色时，可授权部门列表没有刷新
				//根据选中节点的根节点，重新加载可授权部门列表
				//if(curFirstId!=this.curFirstRoleUnid){
					//说明是换了一个角色ID，需要重新加载
					this.loadAuthDept(curFirstId);
				//}
				//end 2012-08-29 mdf by chuiting@linewell.com
			}
			//2012-08-29 mdf by chuiting@linewell.com
			//1242-UMC：授权-角色列表，切换角色时，可授权部门列表没有刷新
			//重新加载可授权部门列表
			else {
				this.loadAuthDept();
			}
			//end 2012-08-29 mdf by chuiting@linewell.com
		}
		var html;
		if(this.isUMCApp){
			 html = "UMC/role/roleItem.jsp?" + Math.random();
		} else {
			 html = "sys/cfgJsp/role/roleItem.jsp?" + Math.random();
		}
		var url = ucapSession.appPath + html;
		Ext.get("ucapRoleCenter").load({
					url : url
				}, {}, function() {
					ucapRoleConfig.setValue(unid);
				});
	},
	/**
	 * 递归获取当前节点的所有上级节点
	 * @param {} node
	 * @return {}
	 */
	getParentNodeId:function(node){
		var ids = node.id;
		var parentNode = node.parentNode;		
		if (parentNode)	
				ids += ","+ucapRoleConfig.getParentNodeId(parentNode);
		return ids;
	},
	setButtonState : function() {
		var node = ucapRoleConfig.getSelectNode();
    
		// 进行新建按钮的权限过滤
		var disabled = false;// 默认为不能删除
		// 如果不是管理员的角色，且不在新增的状态下，处理权限 by xhuatang@linewell.com
    // 判断是否没有选中节点，没有选中，默认是没有权限 by xhuatang@linewell.com 2011-05-13
		if (null == node || (false == ucapRoleConfig.isAdmin
				&& ucapRoleConfig.checkIsRootNode(node))) {
			disabled = true;
		}
    try{
  		Ext.getCmp("roleDelete").setDisabled(disabled);
  		Ext.getCmp("roleRightDelete").setDisabled(disabled);
  		Ext.getCmp("roleRename").setDisabled(disabled);
  		Ext.getCmp("btnSaveAndNew").setDisabled(disabled);
  		Ext.getCmp("btnSave").setDisabled(disabled);
  		if (Ext.getCmp("deptRoleConfig")) Ext.getCmp("deptRoleConfig").setDisabled(disabled);
  		
  		 if(!this.isUMCApp){
  		 	Ext.getCmp("formConfig").setDisabled(disabled);
  		 	Ext.getCmp("btnConfig").setDisabled(disabled);
  		 	Ext.getCmp("appConfig").setDisabled(disabled);
  		 	Ext.getCmp("dataRoleConfig").setDisabled(disabled);
  	     }
  		// 如果是在新增的状态下，保存都是可以用的
  		if (true == ucapRoleConfig.isNewFlag) {
  			Ext.getCmp("btnSaveAndNew").setDisabled(false);
  			Ext.getCmp("btnSave").setDisabled(false);
  		}
    }catch(e){
      
    }
	},
	/**
	 * private
	 */
	setValue : function(unid) {
		
		//清空
		if(typeof (roleAuthDept)!="undefined" && document.getElementById(roleAuthDept.selectId) ) 
			document.getElementById(roleAuthDept.selectId).options.length=0;
		
		Ext.getDom("rolename").focus();
		if (unid == ucapRoleConfig.newRootId) {
			// 说明是平台管理员新建
			ucapRoleConfig.setButtonState();
			if (this.isUMCApp) Ext.getDom("type").value = this.roleType;
			return;
		}
		if(this.isUMCApp){
			if (this.isAdmin) {
				$("_UmcAuthHtml").style.display = "";
			} else {
				$("_UmcAuthHtml").style.display = "none";
			}
		}
		if (this.isNewFlag) {
			ucapRoleConfig.setButtonState();
			Ext.getDom("funid").value = unid;
			if(this.isUMCApp) Ext.getDom("type").value = this.roleType;
			return; // 新建状态，不用加载数据
		}

		var params = {
			"type" : "role",
			"act" : "getRoleItem",
			"unid" : unid,
			"random" : ucapCommonFun.getRandomString()
		};
		var requestConfig = {
			url : ucapRoleConfig.actionUrl,
			params : params,
			callback : function(options, success, response) {
				if (success) {
					var json = Ext.decode(response.responseText);
					var exResult = ucapCommonFun.dealException(json);
					if (!exResult)
						return;
					ucapCommonFun.setFormValue(json, "roleConfigdialogHtml");
					if(ucapRoleConfig.isUMCApp){
						$("canCreate").checked = false;
						if (json.canCreate) {
							$("canCreate").checked = true;
						}
						// 要加载当前角色能授权的部门列表
						if (typeof roleAuthDept!="undefined") 
								roleAuthDept.loadDeptByRoleId(unid);
					}
				} else {
					Ext.Msg.alert("提示", "取值不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * private
	 * 
	 * @param {}
	 *            roleUnid
	 */
	loadAuthDept : function(roleUnid) {
		if(!this.isUMCApp) return;
		if(typeof roleUnid!="undefined"){
			var ids = this.roleDeptIds.split(",");
			var cns = this.roleDeptIdsCn.split(",");
			var index = ids.indexOf(roleUnid);
			if(index>-1){
				$("_disName").innerHTML =cns[index]+ "--";
			}
		}
		// 根据角色加载当前角色可授权的部门列表
		if (!roleUnid) roleUnid="";
		this.curFirstRoleUnid = roleUnid;
		
		var url = ucapSession.appPath + "UMC/auth/roleAuthDept.jsp?unid="
				+ roleUnid + "&" + Math.random();
		var el = Ext.get("_UmcDeptList");
		var mgr = el.getUpdater();
		mgr.update({
					url : url,
					scripts : true
				});
	},
	/**
	 * name 有值，说明是通过改名进行的
	 * 
	 * @param {}
	 *            name
	 * @param newflag
	 *            为1，说明是保存并新建下一个
	 */
	save : function(msgName, newflag) {
		if (typeof newflag == "undefined")
			newflag = "";
		var isSaveInfo = ucapCommonFun.getObjValueJson("saveInfo").v;

		var isRename = true;
		if (typeof(msgName) == "undefined" || msgName == "") {
			isRename = false;
		}

		if (Ext.getDom("rolename").value == "") {
			Ext.Msg.alert("保存提示", "角色名称不能为空！");
			Ext.getDom("rolename").focus();
			return;
		}
		if (Ext.getDom("users").value == "") {
			// Ext.Msg.alert("保存提示","角色的用户不能为空！");
			// return ;
		}
		var json;
		if (!isRename) {
			json = ucapCommonFun.getFormJSon("roleConfigdialogHtml");
			delete(json.users_Cn_);
			if(this.isUMCApp){
				if ($("canCreate").checked) {
					json.canCreate = true;
				} else {
					json.canCreate = false;
				}
			}
		} else {
			// 自己组装Json格式
			ucapRoleConfig.loadHtml(true);
			json = {
				name : msgName
			};
		}
		//alert(Ext.encode(json));
		//return;
		var node = ucapRoleConfig.getSelectNode();
		var unid = node.id;
		var flag = "";
		if (ucapRoleConfig.isNewFlag) {
			if (node.id == this.newRootId) {
				// 说明是在根节点在新建
				flag = "newSaveByRoot";
			} else {
				flag = "newSave";
			}
		} else {
			flag = "oldSave";
		}
		if (isRename) {
			flag = "rename"; // 修改名称
		}
		var params;
		params = {
			"type" : "role",
			"act" : "save",
			flag : flag,
			"unid" : unid,
			curAppUnid : ucapRoleConfig.belongToAppId,
			roleType : ucapRoleConfig.roleType,
			"random" : ucapCommonFun.getRandomString()
		}; // 说明是角色
		var requestConfig = {
			url : ucapRoleConfig.actionUrl,
			params : params,
			jsonData : json,
			callback : function(options, success, response) {
				if (success) {
					var exjson = Ext.decode(response.responseText);
					var exResult = ucapCommonFun.dealException(exjson);
					if (!exResult)
						return;

					ucapRoleConfig.oldJson = ucapCommonFun
							.getFormJSon("roleConfigdialogHtml");
					if (!isRename && isSaveInfo != "" && newflag == "")
						Ext.Msg.alert("提示", "保存信息成功！");
					var roleUnid="";
					if (ucapRoleConfig.isNewFlag) {
						// 新建 文档的保存
						ucapRoleConfig.newSaveConfig(json, response);
						roleUnid =exjson.id;
					} else {
						// 旧文档的保存
						ucapRoleConfig.oldSaveConfig(json, response);
						roleUnid = unid;
					}
					
					//保存成功，同步保存部门角色
					if(ucapRoleConfig.isUMCApp) roleAuthDept.roleDeptConfirm(roleUnid);
					
					if (newflag == 1) {
						// 说明是保存后要继续新建文档
						var node = ucapRoleConfig.getSelectNode();
						node.parentNode.select();
						ucapRoleConfig.isNewFlag = true;
						ucapRoleConfig.loadHtml();
					}
					ucapRoleConfig.setButtonState();
				} else {
					Ext.Msg.alert("提示", "保存不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 新建文档后的保存操作 private
	 * 
	 * @param {}
	 *            json
	 */
	newSaveConfig : function(json, response) {
		// 这是后台返回是父节点的JSON
		var node = ucapRoleConfig.getSelectNode();
		var mjson = Ext.decode(response.responseText);
		// 在当前节点下追加一个子节点
		node.expand();
		var newNode = new Ext.tree.TreeNode(mjson);
		node.leaf = false;
		node.icon = "";
		node.appendChild(newNode);
		newNode.select();
		ucapRoleConfig.isNewFlag = false;
	},
	/**
	 * 旧文档的操作操作 private
	 * 
	 * @param {}
	 *            json
	 */
	oldSaveConfig : function(json, response) {
		ucapRoleConfig.saveFlag = true;
		var node = ucapRoleConfig.getSelectNode();
		var mjson = Ext.decode(response.responseText);
		if (mjson.result) {
			// 说明只是对旧对象进行保存，只要更新名称就可以了
			node.setText(json.rolename);
		} else {
			// 说明是新增一个对象，则要替换当前节点
			// alert(response.responseText);
			node.id = mjson.unid;
			if (mjson.belongToUsers)
				node.attributes.belongToUsers = mjson.belongToUsers;
			if (mjson.belongToDepts)
				node.attributes.belongToDepts = mjson.belongToDepts;
			node.setText(mjson.dictName);
		}
	},
	getSelectNode : function() {
    //添加为空配置 by xhuatang@linwell.com 2011-05-13
    if(null == ucapRoleConfig.tree 
      || null == ucapRoleConfig.tree.getSelectionModel){
        return null;
      }
		return ucapRoleConfig.tree.getSelectionModel().getSelectedNode();
	},
	/**
	 * 树的移动
	 */
	handleMoveNode : function(tree, node, oldParent, newParent, index) {

		var posIndex = index - 1;
		// posNode后续的节点要进行处理，即序号要加1，而新移动节点的序号等于posNode节点的位置
		var posNode = newParent.childNodes[posIndex];
		var posNodeId = "";
		if (typeof(posNode) != "undefined") {
			posNodeId = posNode.id;
		}
		var newParentId = "";
		if (newParent.id != ucapRoleConfig.root.id) {
			// 说明不是根节点
			newParentId = newParent.id;
		}
		var params = {
			type : "dict",
			act : "move",
			unid : node.id,
			posNode : posNodeId,
			newParentId : newParentId,
			"random" : ucapCommonFun.getRandomString()
		};
		var requestConfig = {
			url : ucapRoleConfig.actionUrl,
			params : params,
			callback : function(options, success, response) {
				if (success) {
					if (response.responseText == "false") {
						Ext.Msg.alert("移动提示", "移动不能被保存，无法生效！");
						return;
					} else {
						// 替换新的节点，并且要重新加载所有的子节点
						var mjson = Ext.decode(response.responseText);
						var exResult = ucapCommonFun.dealException(mjson);
						if (!exResult)
							return;

						node.id = mjson.id;
						node.attributes.belongToUsers = mjson.belongToUsers;
						node.attributes.belongToDepts = mjson.belongToDepts;
						node.setText(mjson.text);
						var treeLoad = ucapRoleConfig.tree.getLoader();
						treeLoad.load(node);
					}
				} else {
					Ext.Msg.alert("移动提示", "移动不能被保存，无法生效！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 删除选中节点的树，包括下面的所有子树
	 * 
	 * @param infoFlag
	 *            是否要删除的提示，默认为true
	 */
	deleteNode : function(infoFlag) {
		if (typeof(infoFlag) == "undefined")
			infoFlag = true;
		var deleteNodeAct = function() {
			var unid = node.id;
			var flag = "item";
			if (node.id == ucapRoleConfig.root.id) {
				flag = "root";
			}
			var params = {
				"type" : "role",
				"act" : "delete",
				flag : flag,
				"unid" : unid,
				"random" : ucapCommonFun.getRandomString()
			};
			var requestConfig = {
				url : ucapRoleConfig.actionUrl,
				params : params,
				callback : function(options, success, response) {
					if (success) {
						var json = Ext.decode(response.responseText);
						var exResult = ucapCommonFun.dealException(json);
						if (!exResult)
							return;

						ucapRoleConfig.saveFlag = true;
						var node = ucapRoleConfig.getSelectNode();
						var num = parseInt(response.responseText, 10);
						if (num < 1 && infoFlag) {
							Ext.Msg.alert("删除提示", "你所选的角色你没有权限删除！");
							return;
						}
						if (flag != "root") {
							var newnode;
							if (node.nextSibling) {
								newnode = node.nextSibling;
							} else if (node.previousSibling) {
								newnode = node.previousSibling;
							} else {
								newnode = node.parentNode;
							}
							node.remove();
							newnode.select();
							ucapRoleConfig.loadHtml();
						} else {
							// 说明是删除整棵树，重新加载树
							ucapRoleConfig.initDict();
						}
					} else {
						Ext.Msg.alert("提示", "删除不成功，请重试！");
					}
				}
			}
			Ext.Ajax.request(requestConfig);
		};
		var node = ucapRoleConfig.getSelectNode();
		if (infoFlag) {
			var msg = "";
			var nodemsg = "";
			if (!node.isLeaf()) {
				nodemsg = "<br><br>删除时将同时删除其下所有的子节点";
			}
			msg = "你是否确定删除？";
			Ext.MessageBox.confirm("删除提示", msg, function(id) {
						if (id == "yes") {
							deleteNodeAct();
						}
					});
		} else {
			deleteNodeAct();
		}

	}
}

var onRoleItemClick = function(btn) {
	var id = btn.id || btn;
	switch (id) {
		case "roleNew" : {
			ucapRoleConfig.isNewFlag = true;
			ucapRoleConfig.loadHtml();
			break;
		}
		case "roleDelete" : {
			ucapRoleConfig.deleteNode();
			break;
		}
		case "dataRoleDefaultConfig" : {
			dvpermission.dvpermissionConfig(1, true);
			break;
		}
		case "roleRightNew" : {
			ucapRoleConfig.isNewFlag = true;
			ucapRoleConfig.loadHtml();
			break;
		}
		case "roleRightDelete" : {
			ucapRoleConfig.deleteNode();
			break;
		}
		case "roleRename" :
			Ext.Msg.prompt("改名对话框", "请输入新的名称：", function(id, msg) {
						if (id == "ok") {
							if (msg == "") {
								Ext.Msg.alert("改名提示", "名称不能为空！");
								return;
							}
							ucapRoleConfig.save(msg);
						}
					}, this);
			break;
		default :
			alert(btn.id + "代码未实现！");
	}
}
