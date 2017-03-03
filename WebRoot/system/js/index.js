var ucapSystemPanel = Ext.Viewport;
var appPath = "/"
		+ location.pathname.split("/")[(location.pathname.indexOf("/") > 0
				? 0
				: 1)] + "/";
var initIndex = function() {
	// Logo
	var header = {
		region : 'north',
		contentEl : 'ucap_system_header'
	};
	// 模块
	var module = new Ext.Panel({
		region : 'west',
		width : 198,
		layout : 'border',
		cls : '',
		margins : '10 10 10 10',
		contentEl : 'ucap_system_content',
		items : [new Ext.Panel({
							contentEl : 'ucap_system_module_top',
							region : 'north'
						}), new Ext.Panel({
					autoScroll : true,
					contentEl : 'ucap_system_module_center',
					region : 'center',
					style : 'border-left:1px #d9d9d9 solid;border-right:1px #d9d9d9 solid;'
				}), new Ext.Panel({
							contentEl : 'ucap_system_module_bottom',
							region : 'south'
						})]
	});
	// 页脚
	var footer = {
		region : 'south',
		height : 24,
		cls : 'footer',
		html : 'Powered by Ucap © 2001-2011, Linewell Inc.',
		contentEl : 'ucap_system_footer'
	};

	// 右侧内容区域
	var content = new Ext.Panel({
		region : 'center',
		layout : 'border',
		cls : '',
		margins : '10 10 10 0',
		contentEl : 'ucap_system_content',
		items : [new Ext.Panel({
							contentEl : 'ucap_system_content_top',
							region : 'north'
						}), new Ext.Panel({
					id : 'ucapSystemCenterPanel',
					layout : 'border',
					contentEl : 'ucap_system_content_center',
					region : 'center',
					style : 'border-left:1px #d9d9d9 solid;border-right:1px #d9d9d9 solid;',
					items : [new Ext.Panel({
						id : "ucap_system_doc",
						split : true,
						autoScroll : true,
						width : 450,
						collapsible : true,
						hideCollapseTool : true,// 隐藏折叠按钮
						titleCollapse : true, // 点击标题可以折叠
						unstyled : true,
						tbar : [{
									text : '保存',
									id : "saveButton",
									handler : function() {
										configFileView.saveForm(true);
									}
								}, {
									text : '关闭',
									handler : function() {
										Ext.getCmp("ucap_system_doc").hide();
										Ext.getCmp("ucapSystemCenterPanel")
												.syncSize();
									}
								}

						],
						// collapsedCls:'FFF',
						// baseCls:'FFF',
						// cls:'FFF',
						// bodyStyle:'background-color:#FFF;',
						style : 'padding:0 10 0 10;background-color:#FFF;',
						html : '<div id="ucap_system_document" class="content_top_content">文档</div>',
						region : 'east',
						contentEl : 'ucap_system_content_left'
					}), new Ext.Panel({
						id : "ucap_system_panel",
						// autoScroll : true,
						style : 'padding:0 10 0 10;background-color:#FFF;',
						html : '<div id="ucap_system_grid">\
   									<div id="viewDiv">\
   									<div id="grid"></div>\
   									</div>\
			        				</div>',
						region : 'center',
						contentEl : 'ucap_system_content_right'
					})]
				}), new Ext.Panel({
							contentEl : 'ucap_system_content_footer',
							region : 'south'
						})]
	});

	var border = new ucapSystemPanel({
				style : 'background-color:#f5f4f2;',
				layout : 'border',
				items : [header, module, footer, content]
			});

	Ext.getCmp("ucap_system_panel").on("hide", function() {
				// Ext.getCmp("ucap_system_doc").columnWidth=1;
				Ext.getCmp("ucapSystemCenterPanel").syncSize();
			});

	Ext.getCmp("ucap_system_doc").on("hide", function() {
				// Ext.getCmp("ucap_system_panel").columnWidth=1;
				Ext.getCmp("ucapSystemCenterPanel").syncSize();
			});
};

/**
 * 初始化模块
 */
var initModule = function() {
	var div = Ext.get("ucap_system_module_center");
	var html = "";
	var moduleNames = ucapModuleConfig.moduleNames;
	for (var i = 0; i < moduleNames.length; i++) {
		var mn = moduleNames[i];
		if (mn.child && mn.child.length > 0) {
			mn.action = 'subModuleToggle(this);';// +mn.action;
		}
		html += '<div id="menu_'
				+ i
				+ '"class="list_menu" onclick=\''
				+ mn.action
				+ '\' menuTitle="'
				+ mn.name
				+ '" >\
					<img alt="" class="list_menu_icon" src="./images/folder_user.png" />\
					<a href=\'javascript:void(0);\'>'
				+ mn.name + '</a> </div>';
		if (mn.child && mn.child.length > 0) {
			for (var j = 0; j < mn.child.length; j++) {
				html += '<div style="display:none;" parentId="menu_'
						+ i
						+ '" class="list_submenu" onclick=\''
						+ mn.child[j].action
						+ '\' '
						+ ' menuTitle="'
						+ mn.name
						+ '-'
						+ mn.child[j].name
						+ '" >\
					<img alt="" class="list_menu_icon" src="./images/folder_user.png" />\
					<a href="javascript:void(0);">'
						+ mn.child[j].name + '</a> </div>';
			}
		}
		html += '<div class="blank"></div>';
	}
	div.update(html);
};

/**
 * 子模块的显示隐藏
 * 
 * @param {}
 *            obj
 */
var subModuleToggle = function(obj) {
	if (null != obj) {
		var id = obj.id;
		// 根据父节点查找所有对应的子节点
		var subMenus = Ext.query("div[parentId=" + id + "]");
		for (var i = 0; i < subMenus.length; i++) {
			var extObj = Ext.get(subMenus[i]);
			// 设置隐藏模式
			extObj.setVisibilityMode(Ext.Element.DISPLAY);
			// 展开时单击第一个节点
			if (i == 0 && !extObj.isDisplayed()) {
				extObj.dom.click();
			}
			// 显示或隐藏对象
			extObj.toggle(true);
		}
	}
};

/**
 * 用户注销
 */
var loginOut = function() {
	var requestConfig = {
		url : ucapSession.baseAction,
		params : {
			"type" : "loginWriteOff"
		},
		callback : function(options, success, response) {
			if (success) {
				var exjson = Ext.util.JSON.decode(response.responseText);
				var exResult = ucapCommonFun.dealException(exjson);
				if (!exResult)
					return;
				window.location = ucapSession.appPath
						+ "system/login.jsp?loginOut=true";

			} else {
				Ext.Msg.alert("提示", "注销不成功，请重试！");
			}
		}
	}
	Ext.Ajax.request(requestConfig);
};

/**
 * 初始化视图--对应文件类型的视图
 * 
 * @param {}
 *            obj
 * @param {}
 *            params
 */
function initView(obj, params) {

	Ext.getCmp("ucap_system_doc").hide();
	// Ext.getCmp("ucapSystemCenterPanel").syncSize();
	obj = Ext.get(obj);
	if (obj) {
		Ext.getDom("cur_nav_msg").innerHTML = obj.dom.getAttribute("menuTitle");
		selectedDivClass(obj);
	}
	// 打开视图
	configFileView.initView(params);
}

/**
 * 初始化视图---对应数据库视图
 * 
 * @type
 */
function initDBView(obj, unid, params, flag, formUnid) {

	dbViewForm.isEdit = flag;
	if (flag) {
		dbViewForm.formUnid = formUnid;
	}
	obj = Ext.get(obj);
	if (obj) {
		Ext.getDom("cur_nav_msg").innerHTML = obj.dom.getAttribute("menuTitle");
		selectedDivClass(obj);
	}
	dbViewForm.viewUnid = unid;
	var url;
	if (params) {
		params = "&" + params;
		url = "./jsp/viewJsp.jsp?viewId=" + unid + params;
	} else {
		url = "./jsp/viewJsp.jsp?viewId=" + unid;
	}

	if (Ext.getCmp("ucap_system_doc").hidden == false) {
		Ext.getCmp("ucap_system_doc").hide();
		// Ext.getCmp("ucap_system_doc").doLayout() ;
	}
	var ucap_system_grid = Ext.getDom("ucap_system_grid");
	var viewDiv = Ext.getDom("viewDiv");
	if (viewDiv) {
		ucap_system_grid.removeChild(viewDiv);
	}
	viewDiv = document.createElement("div");
	viewDiv.id = "viewDiv";
	ucap_system_grid.appendChild(viewDiv);
	viewDiv.innerHTML = "<div id=\"docForm\" ></div>";
	var doc = Ext.get("docForm");
	var docUpdater = doc.getUpdater();
	docUpdater.update({
				url : url,
				scripts : true

			});
}
/**
 * 初始化文档
 * 
 * @param {}
 *            obj 点击左边菜单的对象
 * @param {}
 *            filePath 文件路径
 * @param {}
 *            action 对应的action
 * @param {}
 *            formUnid 对应的表单ID
 * @param {}
 *            docUnid 对应的文档ID
 */
function initDocForm(obj, filePath, action, formUnid, docUnid) {

	obj = Ext.get(obj);
	if (obj) {
		Ext.getDom("cur_nav_msg").innerHTML = obj.dom.getAttribute("menuTitle");
		selectedDivClass(obj);
	}
	if (Ext.getCmp("ucap_system_doc").hidden == false) {
		Ext.getCmp("ucap_system_doc").hide();
	}

	var ucap_system_grid = Ext.getDom("ucap_system_grid");
	var viewDiv = Ext.getDom("viewDiv");
	if (viewDiv) {
		ucap_system_grid.removeChild(viewDiv);
	}
	viewDiv = document.createElement("div");
	viewDiv.id = "viewDiv";
	viewDiv.innerHTML = "<div id=\"docForm\"></div>";
	ucap_system_grid.appendChild(viewDiv);

	var doc = Ext.get("docForm");
	var docUpdater = doc.getUpdater();
	var sUrl = appPath + filePath;
	if (action) {
		docForm.action = action;
	}
	if (formUnid) {
		docForm.formUnid = formUnid;
	}
	if (docUnid) {
		docForm.docUnid = docUnid;
	}
	docUpdater.update({
				url : sUrl,
				scripts : true,
				callback : docForm.initForm
			});

}

/**
 * 选择菜单的样式
 * 
 * @param {}
 *            obj
 */
function selectedDivClass(obj) {
	// 查找所有一级菜单
	var selObjs = Ext.query("div[class^='list_menu']");
	if (selObjs.length > 0) {
		//移除selected样式
		for (var i = 0; i < selObjs.length; i++) {
			Ext.get(selObjs[i]).removeClass("selected");
		}
	}
	//查找所有二级菜单
	var selSubObjs = Ext.query("div[class^='list_submenu']");
	if (selSubObjs.length > 0) {
		//移除selected样式
		for (var i = 0; i < selSubObjs.length; i++) {
			Ext.get(selSubObjs[i]).removeClass("selected");
		}
	}
	//给当前对象设置selected样式
	if (obj.hasClass("list_menu")) {
		obj.addClass("selected");
	} else if (obj.hasClass("list_submenu")) {
		obj.addClass("selected");
	}
}
