/**
 * 用户管理中心组织架构管理
 * @type Object
 */
var ucapUmcDept = {
    /**
     * 根的JSON对象
     * @type  Object
     */
    rootJson: [],
    
    /**
     * 树的对象
     * @type Tree
     */
    tree: null,
    
    /**
     * 交互的地址
     * @type String
     */
    actionUrl: "umcAction.action",
    
    /**
     * 是否为新建部门的标志
     * @type Boolean
     */
    isNewFlag: false,
    
    /**
     * 新的根节点ID
     * @type String
     */
    newRootId: "_ucapDeptNew",
    
    /**
     * 部门的对象ID
     * @type String
     */
    deptId: "deptleftTree",
    
    /**
     * 部门所属面板对象ID
     * @type String
     */
    deptPanelId: "ucap_deptTree",
    
    /**
     * 左边树的ID
     * @type String
     */
    columnId: "_dept_column",
    
    /**
     * 左边的宽度
     * @type Number
     */
    columnWidth: 180,
    
    /**
     * 用户管理中心用户视图UNID
     * @type String
     */
    userViewId: "02EA017398D04F4500151416001D0000",
    
    /**
     * 分级管理的用户视图UNID
     * @type String
     */
    userManagerViewId: "13718B29A64AFF9B3834C0896D5D1704",
    
    /**
     * 旧的json值
     * @type Array
     */
    oldJson: [],
    
    /**
     * 窗口对象
     * @type Object
     */
    editDeptWin: null,
    
    /**
     * 重命名的名称
     * @type String
     */
    renameValue: "",
    
    /**
     * 树的类型
     * @type String
     */
    treeType: "",
    
    /**
     * 所属应用系统
     * @type String
     */
    belongToAppId: "",
    
    /**
     * 是否为可管理部门
     * @type Boolean
     */
    isAppManager: false,
    
    /**
     * 应用系统管理员是否有管理用户或部门的权限，true表示有
     * @type
     */
    appManagerHaveAuthDept: null,
    
    /**
     * 部门管理员是否有管理本部门及下级子部门和人员的权限，true表示有，默认为false
     * @type
     */
    deptManagerHaveAuthDept: null,
    
    /**
     * 应用系统的角色是否管理部门的权限
     * @type
     */
    appRoleHaveAuthDept: null,
    
    /**
     * 可管理的部门ID
     * @type String
     */
    managerDeptId: "",
    
    
    //  /**
    //   * 修改用户的页面名称 add by xhuatang@linewell.com 2011-05-12
    //   * @type String
    //   */
    //  editUserPageName : ucapSession.appPath + "UMC/editUser.jsp",
    
    /**
     * 初始化组织架构
     * @param {String} type 类型 app:应用系统 umc:用户管理中心
     */
    initDept: function(type){
        this.isAppManager = false;
        if (typeof type == "undefined") {
            this.treeType = "app";
        }
        else {
            this.treeType = "umc";
            //如果是用户管理中心，使用独立视图  add by xhuatang@linewell.com
            this.userViewId = "373AAFB3853CC7D1F11CA5631E597CB8";
            this.isAppManager = true;
        }
        //判断是否为分级管理且用户为系统管理员，如果是则说明可以管理部门和用户
        var location = window.location + "";
        if (location.indexOf(ucapSession.appPath + "sys/system/index.jsp") > -1 &&
        ucapSession.userJson.userStatus == 1) {
            this.isAppManager = true;
            
        }
        
        //如果应用系统可管理部门和用户，且当前用户为应用系统管理员
        if (this.appManagerHaveAuthDept && ucapSession.userJson.userStatus == 1) {
            this.isAppManager = true;
            
        }
        
        //应用系统管理员是否有管理用户或部门的权限，且当前用户是部门管理员
        if (this.deptManagerHaveAuthDept && typeof(ucapSession.userJson.effectiveAdminDept) != "undefined" &&
        ucapSession.userJson.effectiveAdminDept != "") {
            this.isAppManager = true;
            
            this.managerDeptId = ucapSession.userJson.effectiveAdminDept;
        }
        this.belongToAppId = typeof(ucapManagerTree) != "undefined" ? ucapManagerTree.curBelongToAppId : "";
        
        var para = {
            type: "dept",
            act: "getDeptTree",
            unid: "",
            treeType: this.treeType,
            managerDept: this.managerDeptId,
            belongToAppId: this.belongToAppId
        };
        
        //获取根节点对象	
        var requestConfig = {
            url: ucapUmcDept.actionUrl,
            params: para,
            callback: function(options, success, response){
                if (success) {
                    var exjson = Ext.decode(response.responseText);
                    var exResult = ucapCommonFun.dealException(exjson);
                    if (!exResult) 
                        return;
                    if (response.responseText != "null" && response.responseText != "") {
                        //ucapUmcDept.isAppManager = true;//有值，也显示为真
                        ucapUmcDept.rootJson = Ext.util.JSON.decode(response.responseText);//yjy 2011-4-26去掉[0] 有可能是多值
                    }
                    else {
                        ucapUmcDept.rootJson = [];
                    }
                    
                    //          //如果配置了角色不可管理，把返回的部门清空 modify by xhuatang@linewell.com 2011-05-13
                    //          if(!this.appRoleHaveAuthDept && ucapUmcDept.rootJson.length > 0){
                    //            ucapUmcDept.rootJson = [];
                    //          }       				
                    //如果应用角色有管理部门的权限，且可管理根部门不为空，则为真 modify by xhuatang@linewell.com 2011-05-13
                    if (ucapUmcDept.appRoleHaveAuthDept && ucapUmcDept.rootJson.length > 0) {
                        this.isAppManager = true;
                        //alert(this.appRoleHaveAuthDept);
                    }
                    
                    
                    
                    
                    //如果当前系统是平台系统且当前用户是管理员，则也可以编辑
                    if (ucapSession.userJson.userStatus == 1 &&
                    ucapHeader.appUnid == "475C4D7E257F5EAF7CCDF46AE0FE35BD") {
                        this.isAppManager = true;
                    }
                    
                    ucapUmcDept.initWinBox();
                    ucapUmcDept.createTree("");
                }
            }
        }
        Ext.Ajax.request(requestConfig);
    },
    
    /**
     * 初始化窗口内容
     */
    initWinBox: function(){
        var buttonItems = [];
        var toolbar = [];
        //alert(ucapUmcDept.isAppManager);
        if (ucapUmcDept.isAppManager) {
            buttonItems = [{
                text: '编辑部门',
                handler: function(){
                    onDeptItemClick("edit")
                }
            }, {
                text: '重命名',
                handler: function(){
                    onDeptItemClick("rename")
                }
            }, '-', {
                text: '删除部门',
                handler: function(){
                    onDeptItemClick("delete")
                }
            }];
            toolbar = [{
                text: '文件',
                menu: {
                    items: [{
                        text: '新建部门',
                        handler: function(){
                            onDeptItemClick("new")
                        }
                    }]
                }
            }, {
                text: '编辑',
                menu: {
                    items: buttonItems
                }
            }, {
                text: '查看',
                menu: {
                    items: [{
                        text: '展开',
                        id: "deptExpand",
                        handler: onDeptItemClick
                    }, {
                        text: '折叠',
                        id: "deptCollapse",
                        handler: onDeptItemClick
                    }, {
                        text: '全部展开',
                        id: "deptExpandAll",
                        handler: onDeptItemClick
                    }, {
                        text: '全部折叠',
                        id: "deptCollapseAll",
                        handler: onDeptItemClick
                    }]
                }
            }, '-', {
                text: '新建部门',
                handler: function(){
                    onDeptItemClick("new")
                }
            }, {
                text: '编辑部门',
                handler: function(){
                    onDeptItemClick("edit")
                }
            }, {
                text: '删除部门',
                handler: function(){
                    onDeptItemClick("delete")
                }
            }];
        }
        else {
            toolbar = [{
                text: '查看',
                menu: {
                    items: [{
                        text: '展开',
                        id: "deptExpand",
                        handler: onDeptItemClick
                    }, {
                        text: '折叠',
                        id: "deptCollapse",
                        handler: onDeptItemClick
                    }, {
                        text: '全部展开',
                        id: "deptExpandAll",
                        handler: onDeptItemClick
                    }, {
                        text: '全部折叠',
                        id: "deptCollapseAll",
                        handler: onDeptItemClick
                    }]
                }
            }];
        }
        var height = ucapSession.middleHeight;
        if (height < 300) 
            height = 500;
        
        var panel = new Ext.Panel({
            id: ucapUmcDept.deptPanelId,
            applyTo: "deptTree",
            //bodyStyle:ucapSession.win.winBodyStyle,
            plain: true,
            layout: 'border',
            height: height,
            tbar: toolbar,
            autoWidth: true,
            items: [{
                title: '部门列表',
                id: ucapUmcDept.columnId,
                region: 'west',
                html: '<div id="' + ucapUmcDept.deptId + '">正在加载部门列表，请稍等......</div>',
                width: ucapUmcDept.columnWidth,
                
                //2012-05-18 add by xhuatang fix bug-1097
                //部门面板的BUG，更改以保证父面板不出动滚动条，在树形上出现滚动条
                autoScroll: false,
                layout : "fit",
                collapsible: false,
                height: height - 10,
                split: true
            }, {
                region: "center",
                el: "deptHtml"
            }]
        });
        ucapCommonFun.autoMenuHeight();
    },
    
    /**
     * 添加树形控件
     */
    createTree: function(){
        Ext.DomHelper.applyStyles(Ext.get(this.deptId), 'style="padding:3px 0px 0px 5px;"');
        if ($(this.deptId)) 
            $(this.deptId).innerHTML = "";
        if (this.rootJson.length == 0) {
            //说明是从头新建部门
            this.isNewFlag = true;
            this.rootJson = [{
                id: ucapUmcDept.newRootId,
                text: "部门列表"
            }];
        }
        else {
            this.isNewFlag = false;
        }
        
        var root = new Ext.tree.AsyncTreeNode({
            id: "_UMCDEPT",
            expanded: true,
            text: "部门列表",
            children: this.rootJson
        });
        
        var loader = new Ext.tree.TreeLoader({
            url: ucapUmcDept.actionUrl
        });
        loader.on('beforeload', function(treeloader, node){
            if (node.id == ucapUmcDept.newRootId) 
                return;
            treeloader.baseParams = {
                type: "dept",
                act: "getDeptTree",
                unid: node.id,
                treeType: this.treeType,
                belongToAppId: this.belongToAppId
            };
        }, this);
       
       
        //2012-05-18 add by xhuatang fix bug-1097 
        //定义树形的高度
        var treeHeight = Ext.get(ucapUmcDept.columnId).getHeight() - 33;        
        //2012-08-14 mdf by chuiting@linewell.com
        //BUG1227：IE6:分级管理中心，用户配置的部门树形滚动条位置不正确
        //资源分级管理的用户管理中的用户部门树形、UMC下的用户部门树形、
        //系统管理中的用户配置部门列表是同一个树形，
        //ie6下UMC的用户部门树形需要扣除头部的高度
        //umcUserPage为UMC下的用户管理界面的dom节点
        var umcUserPageDom = Ext.getDom("umcUserPage");
        //umcUserPageDom不为空，则为UMC下的用户部门树
        if (null != umcUserPageDom) {
        	//IE6的Bug，需要扣除头部的高度
            if(this.isIE6()){
                treeHeight -= 90;
            }
        }
        //end 2012-08-14 mdf by chuiting@linewell.com
        
        var tree = new Ext.tree.TreePanel({
            renderTo: this.deptId,
            root: root,
            animate: true,
            rootVisible: false,
            enableDD: true, //允许拖放
            autoScroll: true,
            containerScroll: true,
            loader: loader,
            
            //2012-05-18 add by xhuatang fix bug-1097 
            //更改属性面板的高度、宽度与父面板保持一致
            layout : "fit",
            width:Ext.get(ucapUmcDept.columnId).getWidth() - 6,
            height: treeHeight
        });
        
        
        
        this.tree = tree;
        tree.on("click", function(node){
            ucapUmcDept.setUserView(node.id);
        });
        tree.addListener('movenode', ucapUmcDept.handleMoveNode);
        
        if (this.isAppManager) {
            function menuShow(node){
                node.select();//让右击是选中当前节点     
                treeRightMenu.show(node.ui.getAnchor());
            };
            tree.on('contextmenu', menuShow);
            var treeRightMenu = new Ext.menu.Menu({
                id: 'treeMenuContext',
                items: [{
                    text: '新建部门',
                    icon: "",
                    handler: function(){
                        onDeptItemClick("new")
                    }
                }, {
                    text: '编辑部门',
                    icon: "",
                    handler: function(){
                        onDeptItemClick("edit")
                    }
                }, {
                    text: '删除部门',
                    icon: "",
                    handler: function(){
                        onDeptItemClick("delete")
                    }
                }, {
                    text: "重命名",
                    icon: "",
                    handler: function(){
                        onDeptItemClick("rename")
                    }
                }]
            });
        }
        
        this.tree = tree;
        var path = "/_UMCDEPT/" + this.rootJson[0].id;
        this.tree.selectPath(path);
        var node = tree.getSelectionModel().getSelectedNode();
        
        node.select();
        ucapUmcDept.setUserView(node.id);
    },
    
    /**
     * 树节点移动的操作
     * @param {Tree} tree      树形对象
     * @param {Node} node      树的节点对象
     * @param {Node} oldParent 旧的父节点对象
     * @param {Node} newParent 新的父节点对象
     * @param {Int}  index     索引值
     */
    handleMoveNode: function(tree, node, oldParent, newParent, index){
        var posIndex = index + 1;
        var flag = "";
        if (index == newParent.childNodes.length - 1) {
            //说明是在最后一个
            posIndex = index - 1;
            flag = "1";
        }
        
        var posNode = newParent.childNodes[posIndex];
        var params = {
            type: "dept",
            act: "move",
            unid: node.id,
            posDeptId: posNode.id,
            newParentId: newParent.id,
            "random": ucapCommonFun.getRandomString(),
            flag: flag
        };
        
        var requestConfig = {
            url: ucapUmcDept.actionUrl,
            params: params,
            callback: function(options, success, response){
                if (success) {
                    var exjson = Ext.decode(response.responseText);
                    var exResult = ucapCommonFun.dealException(exjson);
                    if (!exResult) 
                        return;
                    
                    if (response.responseText == "false") {
                        Ext.Msg.alert("移动提示", "移动不能被保存，无法生效！");
                        return;
                    }
                }
                else {
                    Ext.Msg.alert("移动提示", "移动不能被保存，无法生效！");
                }
            }
        }
        Ext.Ajax.request(requestConfig);
    },
    
    /**
     * 删除选中节点的树，包括下面的所有子树
     */
    deleteNode: function(){
        var deleteNodeAct = function(){
            var unid = node.id;
            var params = {
                "type": "dept",
                "interfaceMode":globalVariables?globalVariables.del_dept_mode:""||"",////删除部门执行扩展功能模式
                "interfaceBefore":globalVariables?globalVariables.del_dept_before:""||"",//删除部门前的扩展功能
                "interfaceAfter":globalVariables?globalVariables.del_dept_after:""||"",////删除部门后的扩展功能
                "act": "delete",
                "unid": unid
            };
            var requestConfig = {
                url: ucapUmcDept.actionUrl,
                params: params,
                callback: function(options, success, response){
                    if (success) {
                        var exjson = Ext.decode(response.responseText);
                        var exResult = ucapCommonFun.dealException(exjson);
                        if (!exResult) 
                            return;
                        
                        var node = ucapUmcDept.getSelectNode();
                        //看能否找到下一个节点的记录，如果是默认选中，如果本身是最后一个，则取前一个
                        //如果就自己一个，则默认取上一节点的
                        var newnode;
                        if (node.id != ucapUmcDept.tree.getRootNode().id) {
                            if (node.nextSibling) {
                                newnode = node.nextSibling;
                            }
                            else 
                                if (node.previousSibling) {
                                    newnode = node.previousSibling;
                                }
                                else {
                                    newnode = node.parentNode;
                                }
                            newnode.select();
                            ucapUmcDept.setUserView(newnode);
                            node.remove();
                        }
                        else {
                            ucapUmcDept.rootJson = [];
                            ucapUmcDept.createTree();
                            //alert("根节点删除");
                        }
                        //	pnode.select();
                        //	ucapUmcDept.loadHtml();
                    }
                    else {
                        Ext.Msg.alert("提示", "删除不成功，请重试！");
                    }
                }
            }
            Ext.Ajax.request(requestConfig);
        };
        var node = ucapUmcDept.getSelectNode();
        var msg = "删除本部门时，将同时删除其下所有的部门及所有对应的用户，此操作不可恢复，请确认?";
        Ext.MessageBox.confirm("删除提示", msg, function(id){
            if (id == "yes") {
                deleteNodeAct();
            }
        });
    },
    
    /**
     * 根据部门ID，设置根节点的值
     * @param {String} unid
     */
    setValue: function(unid){
        //	this.setEmpty();
        //获取根节点对象
        var requestConfig = {
            url: ucapUmcDept.actionUrl,
            params: {
                type: "dept",
                act: "getDept",
                unid: unid
            },
            callback: function(options, success, response){
                if (success) {
                    var json = Ext.decode(response.responseText);
                    var exResult = ucapCommonFun.dealException(json);
                    if (!exResult) 
                        return;
                    if (null != json["otherAttributes"]) {
                        for (fKey in json["otherAttributes"]) {
                            var val = json["otherAttributes"][fKey];
                            json[fKey] = val;
                        }
                    }
                    ucapCommonFun.setFormValue(json);
                    $("belongto_Cn_").value = json["belongto_Cn_"]; //setFormValue 不能设置 Cn的值
                    ucapUmcDept.oldJson = ucapCommonFun.getFormJSon("deptEditHtml");
                }
            }
        }
        Ext.Ajax.request(requestConfig);
    },
    
    /**
     * 获取选中的节点
     * @return {Node} 返回节点对象
     */
    getSelectNode: function(){
        return ucapUmcDept.tree.getSelectionModel().getSelectedNode();
    },
    
    /**
     * 保存部门
     * @param {} name 不为空，说明是从重命名过来的
     * @param flag 为1，说明是保存并新建下一个
     */
    saveDept: function(name, flag){
        if (typeof name == "undefined") 
            name = "";
        if (typeof flag == "undefined") 
            flag = "";
        //标识编辑部门时，上级部门是否有修改  true ：有修改 ，false：没修改
        var editParentFlag=false;
        if (name == "") {
            if (Ext.getDom("name").value.trim() == "") {
                Ext.Msg.alert("保存提示", "部门名称不能为空！");
                return;
            }
            var json = ucapCommonFun.getFormJSon("deptEditHtml");
            if (flag != 1) {
            	if(this.oldJson.belongto!=json.belongto){
            		editParentFlag=true;
            	}
                if (Ext.encode(this.oldJson) == Ext.encode(json)) {
                    Ext.Msg.alert("保存提示", "当前文档未更改，无须保存！");
                    return;
                }
            }
        }
        else {
            var json = {
                name: name
            };
        }
        
        var node = this.getSelectNode();
        var punid = node.id;
        if (node.id == this.newRootId) 
            punid = "";
        var requestConfig = {
            url: this.actionUrl,
            params: {
                type: "dept",
                act: "save",
                "interfaceMode":globalVariables?globalVariables.save_dept_mode:""||"",////保存部门执行扩展功能模式
                "interfaceBefore":globalVariables?globalVariables.save_dept_before:"",//操作保存部门的前的扩展功能
                "interfaceAfter":globalVariables?globalVariables.save_dept_after:"",//操作保存部门的后的扩展功能
                punid: punid,
                flag: this.isNewFlag
            },
            jsonData: json,
            callback: function(options, success, response){
                if (success) {
                    var json = Ext.decode(response.responseText);
                    var exResult = ucapCommonFun.dealException(json);
                    if (!exResult) 
                        return;
                    
                    ucapUmcDept.oldJson = ucapCommonFun.getFormJSon("deptTreeHtml");
                    //Ext.Msg.alert("提示","保存信息成功！");
                    if (ucapUmcDept.isNewFlag) {
                        //新建 文档的保存
                        ucapUmcDept.newSaveConfig(json, response, flag);
                    }
                    else {
                        //旧文档的保存	
                        ucapUmcDept.oldSaveConfig(json, response, flag);
                        if(editParentFlag&&ucapUmcDept.tree.root){//修改了父节点的情况下
                        	ucapUmcDept.tree.root.reload();
                        	ucapUmcDept.tree.root.expandChildNodes();
                        }
                    }
                    ucapUmcDept.editDeptWin.close();
                    if (flag == 1) {
                        ucapUmcDept.newEditDept();
                    }
                }
                else {
                    Ext.Msg.alert("提示", "保存不成功，请重试！");
                }
            }
        }
        Ext.Ajax.request(requestConfig);
        
    },
    
    /**
     * 新建文档后的保存操作 private
     * @param {} json
     */
    newSaveConfig: function(json, response){
        //这是后台返回是父节点的JSON
        var node = ucapUmcDept.getSelectNode();
        var mjson = Ext.decode(response.responseText);
        if (node.id == ucapUmcDept.newRootId) {
            //说明是根节点自己的保存,只需替换根节点就可以
            node.id = mjson.id;
            node.setText(mjson.text);
            node.leaf = true;
        }
        else {
        	//2012-09-17 mdf by chuiting@linewell.com
        	//BUG1257：新建部门后需要刷新页面才显示
            //在当前节点下追加一个子节点
        	//2012-03-29 mdy by fshaoming@linewell.com
        	//判断当如果节点已经展开则添加新增的节点，如果还没展开，就直接展开节点，防止出现新增部门后有两个相同的节点
        	var newNode = new Ext.tree.TreeNode(mjson);
            node.leaf = false;
            node.icon = "";
            node.appendChild(newNode);
            node.select();
            node.expand();
            //end 2012-09-17 mdf by chuiting@linewell.com
            //newNode.select();	
            //ucapUmcDept.setUserView(newNode);
        }
        ucapUmcDept.isNewFlag = false;
    },
    
    /**
     * 旧文档的操作操作 private
     * @param {} json
     */
    oldSaveConfig: function(json, response){
    
        var node = ucapUmcDept.getSelectNode();
        //说明只是对旧对象进行保存，只要更新就可以了
        if (Ext.getDom("name")) {
            node.setText(Ext.getDom("name").value);
        }
        else {
            node.setText(ucapUmcDept.renameValue);
            ucapUmcDept.renameValue = "";
        }
    },
    
    /**
     * 根据部门的ID，打开视图
     * @param {} node
     */
    setUserView: function(deptUnid){
        var viewId = this.userViewId;
        try {
            //var managerNode = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
            var belongToAppId = typeof(ucapManagerTree) != "undefined" ? ucapManagerTree.curBelongToAppId : false;
            if (belongToAppId && belongToAppId != '475C4D7E257F5EAF7CCDF46AE0FE35BD') {
                viewId = this.userManagerViewId;
            }
        } 
        catch (e) {
        }
        var cint = ucapSession.viewOpenType == 1 ? 25 : 0;
        
        initView(viewId, "userView", "", "", "deptUnid=" + deptUnid, "", 26 + cint);
        if (typeof ucapModule != "undefined") {
            ucapModule.deductViewDivId = ucapDept.columnId;
            ucapCommonFun.setViewWidth();
            ucapCommonFun.autoMenuHeight();
        }
    },
    
    /**
     * 弹出窗口进行部门的新建或保存
     */
    newEditDept: function(unid){
        var title;
        this.isNewFlag = false;
        if (typeof unid == "undefined" || unid == this.newRootId) {
            title = "新建部门";
            unid = "";
            this.isNewFlag = true;
        }
        else {
            title = "编辑部门";
        }
        var html = "UMC/dept/dept.jsp?unid=" + unid;
        var button = [{
            text: "保存并新增下一个",
            handler: function(){
                ucapUmcDept.saveDept("", 1);
            }
        }, {
            text: "保存并关闭",
            handler: function(){
                ucapUmcDept.saveDept();
            }
        }, {
            text: "取消",
            handler: function(){
                ucapUmcDept.editDeptWin.close()
            }
        }];
        this.editDeptWin = new Ext.Window({
            title: ucapSession.win.winImg + title,
            width: 500,
            closable: true, //关闭
            modal: true,
            height: 310,
            bodyStyle: ucapSession.win.winBodyStyle,
            autoLoad: {
                url: ucapSession.appPath + html,
                scripts: true,
                nocache: true
            },
            buttons: button
        });
        this.editDeptWin.show();
    },
    
    /**
     * 打开修改用户的页面  add by xhuatang@linewell.com 2011-05-12
     * @param {String} unid     打开的用户的UNID
     * @param {String} formType 打开的表单的类型
     * @param {String} formId   代开用户所属表单的UNID
     */
    openEditUserPage: function(unid, formType, formId){
        //    var paramsStr = "unid=" + unid
        //                 + "&formType=" + formType
        //                 + "&formId=" + formId
        //                 + "&deptId=" + this.selectedDeptUnid;
        //    var userPageUrl = this.editUserPageName + "?" + paramsStr;
        //    window.open(userPageUrl);
        var node = this.getSelectNode();
        var id = node.id;
        var text = Ext.encode(node.text);
        UMCUserManager.edit(unid, formType, formId, id, text);
    },
    
    //2011-12-05 add by xhuatang@linewell.com ie类型的判断
    isIE: function(){
        return !!window.ActiveXObject
    },
    isIE6: function(){
        return this.isIE && !window.XMLHttpRequest
    },
    isIE8: function(){
        return ucapUmc.isIE && !!document.documentMode
    },
    isIE7: function(){
        return ucapUmc.isIE && !ucapUmc.isIE6 && !ucapUmc.isIE8
    },
    /**
     * 2011-12-05 add by xhuatang@linewell.com 更改UMC用户属性在IE6设置高度的BUG
     */
    fixIe6Bug: function(){
        if (!this.isIE6()) 
            return;
        
        var leftTreeHeight = Ext.get("ucapView").getHeight() - ucapUmc.otherViewHeight + 25;
        var leftTree = Ext.getCmp("_dept_column");
		if(!leftTree) return;
        leftTree.setHeight(leftTreeHeight);
        
        var umcGrid = Ext.getCmp(view.namePrefix + "0");
        if (typeof(umcGrid) === "undefined" || null === umcGrid) 
            return;
        var gridWidth = Ext.get("umcMainRight").getWidth();
        gridWidth = gridWidth - 7;
        umcGrid.setWidth(gridWidth);
    },
	
	/**
	 * 2011-12-12 add by xhuatang@linewell.com 重设视图的尺寸
	 */
	resetViewSize : function(){
		if(typeof view != "undefined"){
	      var viewGrid = Ext.getCmp(view.namePrefix + "0");
	      if(viewGrid
		      && Ext.get("umcMainRight") && Ext.get("ucapView")){
		  	
		  	//需要设置的宽度
            var tmpWidth =  Ext.get("umcMainRight").getWidth();
			
            //设置的高度
            var tmpHeight = Ext.get("ucapView").getHeight() - ucapUmc.otherViewHeight
				    
		    //如果是IE6则不需要调用此代码
		    if (!this.isIE6()) {
				viewGrid.setWidth(0);
				viewGrid.setHeight(0);
			}else{
				tmpHeight -= 5;
			}			
			
			
			var searchObj = Ext.getDom("search_0");
			if(searchObj){
				if (searchObj.scrollHeight === 0) {
					tmpHeight += 30;
				}
			}
			
	        viewGrid.setWidth(tmpWidth);
	        viewGrid.setHeight(tmpHeight);
	        
	        //2011-12-05 add by xhuatang@linewell.com 更改UMC用户属性在IE6设置高度的BUG 
	        this.fixIe6Bug();
	      };
	    }
	}
}

/**
 * 组织架构按钮事件
 * @param {Button} btn 按钮对象
 */
var onDeptItemClick = function(btn){
    var id = btn.id || btn;
    switch (id) {
        case "new":{
            ucapUmcDept.newEditDept();
            break;
        }
        case "newWin":{
            window.open(window.location, "_blank");
            break;
        }
        case "edit":{
            var node = ucapUmcDept.getSelectNode();
            ucapUmcDept.newEditDept(node.id);
            break;
        }
        case "delete":{
            ucapUmcDept.deleteNode();
            break;
        }
        case "deptExpandAll":
            ucapUmcDept.getSelectNode().expand(true);
            break;
        case "deptExpand":
            ucapUmcDept.getSelectNode().expand();
            break;
        case "deptCollapseAll":
            ucapUmcDept.getSelectNode().collapse(true);
            break;
        case "deptCollapse":
            ucapUmcDept.getSelectNode().collapse();
            break;
        case "rename":
            Ext.Msg.prompt("改名对话框", "请输入新的名称：", function(id, msg){
                if (id == "ok") {
                    if (msg == "") {
                        Ext.Msg.alert("改名提示", "部门名称不能为空！");
                        return;
                    }
                    ucapUmcDept.renameValue = msg;
                    ucapUmcDept.saveDept(msg);
                }
            }, this);
            break;
        default:
            alert(btn.id + "代码未实现！");
    }
}
