Ext.namespace('compareResultTree');
compareResultTree = {
	dataUrl : ucapSession.baseAction + "?type=pushUpdateAction",
	viewId : "",
	rootJson : null,
	addIcon : "<img  src=" + ucapSession.appPath + "uistyle/images/"
			+ "add.gif  align='absmiddle' qtip='新增-主系统新增资源'/>",
	delIcon : "<img  src=" + ucapSession.appPath + "uistyle/images/"
			+ "delete.gif  align='absmiddle' qtip='删除-主系统中不存在资源'/>",
	revertIcon : "<img  src=" + ucapSession.appPath + "uistyle/images/"
			+ "revert.gif  align='absmiddle' qtip='返原-版本号一致，但子系统有修改'/>",
	collisionIcon : "<img  src=" + ucapSession.appPath + "uistyle/images/"
			+ "collision.gif  align='absmiddle' qtip='主系统和子系统资源都有修改'/>",
	updateIcon : "<img  src=" + ucapSession.appPath + "uistyle/images/"
			+ "update.gif  align='absmiddle' qtip='主系统中资源有修改，子系统没有修改'/>",
	curBelongToModuleId : "",

	type:1, //1表示是业务模块推送，2表示是菜单
	
	isInitLoad : false,
	/**
	 * 
	 * @param {}
	 *            appUnid 所在系统的UNID
	 * @param {}
	 *            renderto 树所在DIV
	 * @param {}
	 *            moduleId 模块UNID或为空（说明是全部模块）
	 * @param {}
	 *            moduleName 模块名称或为“业务模块”
	 * @param {}
	 *            opType push--主系统的推送 update--代表子系统的更新
	 */
	appInit : function(appUnid, renderto, moduleId, moduleName, opType) {
		$("memo").innerHTML = "图标说明：" + this.addIcon + " 新增 " + this.updateIcon
				+ " 更新 " + this.collisionIcon + " 冲突 " + this.revertIcon
				+ " 返原 " + this.delIcon + " 删除";
		var appType = "compareApp";
		this.type = 1;
		
		var subAppUnid = "&moduleId=" + moduleId;
		if (ucapManagerTree.menuName==moduleName){
			appType = "menu";
			this.type = 2;
			subAppUnid = "";
			if (opType =="update"){
				//更新时moduleId 为主系统的unid
				subAppUnid ="&subAppUnid=" + appUnid;  //appUnid为子系统的unid
				appUnid = moduleId;
			}			
		}
		var url = compareResultTree.dataUrl
							+ "&act="+appType+"&mainAppId=" + appUnid
							+ "&opType=" + opType + subAppUnid;
			
		
		moduleName = decodeURI(moduleName);
		var loader = new Ext.tree.TreeLoader({
					url : url,
					baseAttrs : {
						uiProvider : Ext.ux.TreeCheckNodeUI
					}
				});
		var root = new Ext.tree.AsyncTreeNode({
			id : "compareResultTree-rootid",
			unid : moduleId,
			text : moduleName,
			draggable : false,
			// checked:false,
			expanded : true
				// 展开根节点下的节点
			});
		moduleName = encodeURI(encodeURI(moduleName));
		/** ************************ 创建表格面板************************* */
		var contacterTree = new Ext.tree.TreePanel({
			border : false,
			lines : true, // 为false去掉树的线
			rootVisible : true,
			autoScroll : true,
			animate : true,
			autoHeight : true,
			autoWidth : true,
			renderTo : renderto,
			enableDD : false, // 允许树可以拖拽
			containerScroll : true,
			// 设置数据加载
			loader : loader,
			// 设置树形的根节点
			root : root,
			checkModel :this.type==1?"cascade":"childCascade", // 是否为单选或级选择
			listeners : {
				beforeload : function(node) {
					var unid = node.attributes.unid;
					var url = compareResultTree.dataUrl;
					//if (opType =="update") return; 解决子系统更新时元素没展示的问题 modify by zhua@linewel 2012-3-28
					if (!node.isLeaf()) {
						var resourceType = node.attributes.resourceType;// 类型（1/主系统下展示
						// 2-子系统下展示）
						if (resourceType != 1 && resourceType != 2)
							return;
						var recType = node.attributes.recType;
						var subAppUnid = node.attributes.subAppUnid;
						var mainAppUnid = node.attributes.mainAppUnid;
						if (compareResultTree.type ==2 ){
							if (subAppUnid=="") return; // 说明是在子系统中的更新操作，不用再取值了
							url +="&act=getMenuRec&mainAppId=" + mainAppUnid+ "&subAppUnid="+ subAppUnid;
						} else {
							var subManagerUnid = node.attributes.subManagerId;
							var mainManagerUnid = node.attributes.mainManagerId;
							url += "&act=getRec&mainAppId=" + mainAppUnid
									+ "&resourceType=" + resourceType + "&recType="
									+ recType + "&subAppUnid=" + subAppUnid
									+ "&mainManagerUnid=" + mainManagerUnid
									+ "&subManagerUnid=" + subManagerUnid;
						}
						var requestConfig = {
							url : url,
							callback : function(options, success, response) {
								if (success) {
									var mjson = Ext.decode(response.responseText);
									var iconPath = ucapSession.appPath + "uistyle/images/";
									compareResultTree.addNode(node,mjson);
								}
							}
						};
						Ext.Ajax.request(requestConfig);
					}
				},
			 	load:function(node){
			 		var mChildrens=node.childNodes;
	        		for(var m=0;m<mChildrens.length;m++){
	        			compareResultTree.setTextIcon(mChildrens[m]);
	        		}
				}
			}// end listeners
		});
		compareResultTree.contacterTree = contacterTree;
		root.select();
		// 打开第一个可以展示右边数据的节点
		// ucapManagerTree.openRight(root);
	},// end init
	/**
	 * yjy add 2011-11-13 递归创建节点
	 * @param {} node
	 * @param {} mjson
	 */
	addNode:function(node,mjson){
		var  check =node.attributes.checked;
		for (var i = 0; i < mjson.length; i++) {
			mjson[i].uiProvider = Ext.ux.TreeCheckNodeUI;
			mjson[i].checkModel = compareResultTree.contacterTree.checkModel;
			
			var newNode = new Ext.tree.TreeNode(mjson[i]);
			var rState = newNode.attributes.state;
			if (rState == 999  && mjson[i].children.length==0){
				//说明是没有变化，当前是文件夹，下面没有子，则不加载
				continue;
			}
			newNode.checkModel = compareResultTree.contacterTree.checkModel;
			compareResultTree.setTextIcon(newNode);
			newNode.attributes.checked = check;
			node.appendChild(newNode);
			if(mjson[i].children){
				compareResultTree.addNode(newNode,mjson[i].children);
			}
		}
	},
	setTextIcon:function(newNode){
		//if (!newNode.isLeaf()) return;
		var rState = newNode.attributes.state;
		if (rState == 4) {
			// 更新
			newNode.text = newNode.text+ compareResultTree.updateIcon;
		} else if (rState == 2) {
			// 删除
			newNode.text = newNode.text + compareResultTree.delIcon;
		} else if (rState == 1) {
			// 新增
			newNode.text = newNode.text + compareResultTree.addIcon;
		} else if (rState == 3) {
			// 冲突
			newNode.text = newNode.text + compareResultTree.collisionIcon;
		} else if (rState == 5) {
			// 返原
			newNode.text = newNode.text+ compareResultTree.revertIcon;
		}
	},
	// 确定验证
	valChecked : function(typeName) {
		var tree = compareResultTree.contacterTree;
		var nodes = tree.getChecked();
		if (nodes.length < 1) {
			Ext.Msg.alert("提示信息", "请选择" + typeName + "的资源！");
			return;
		}
		var json = {ele:[]};
		
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			//if (node.isLeaf() ){
			 var rState = node.attributes.state;
			 if(rState>=1 && rState<=5){
				if ( node.attributes.type != 0) {
					var att = node.attributes;
					delete att.children; //yjy 2011-11-14删除子的
					delete att.loader;
					json.ele[json.ele.length] = att;
					
				}	
			}
		}
		//alert(Ext.encode(json));
		if (json.ele.length == 0) {
			Ext.Msg.alert("提示信息", "请选择" + typeName + "的资源！");
			return;
		}
		Ext.Msg.confirm("系统信息提示",
			"<p>您确定要进行" + typeName + "操作？</p>单击是通过，单击否取消", function(yn) {
			if (yn == "yes") {
				var winobj = window.top;
				
				var actName  ="";
				if (compareResultTree.type == 1){
					actName = "push";
				} else {
					actName = "menuPush";
				};
				
				winobj.Ext.MessageBox.show({
						msg : '正在'+typeName+'中，如果选中记录多，速度会稍慢，请稍等...',
						progressText : '更新中...',
						width : 300,
						wait : true,
						waitConfig : {
							interval : 300
						},
						icon : Ext.MessageBox.INFO
				});
				var requestConfig = {
					url : ucapSession.baseAction,
					params : {
						type : "pushUpdateAction",
						act : actName
					},
					jsonData : json,
					callback : function(options, success, response) {
						if (success) {
							winobj.Ext.MessageBox.hide();
							var result = response.responseText;
							if (result == "true"){
								winobj.Ext.Msg.alert("提示信息", typeName+"操作成功!");
								ucapSession.commonWin.close();
							}else {
								winobj.Ext.Msg.alert("提示信息",  typeName+"操作失败!");
							}
						}
					}
				}
				Ext.Ajax.request(requestConfig);
			}
		})
	}
}
