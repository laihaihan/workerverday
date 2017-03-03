/**
 * 下拉树ComboBoxTree
 * @extend Ext.form.ComboBox
 * @xtype 'combotree'
 * 
 * @author chengbao_zhu
 */

/**
 * ----------------------
 * Demo ComboBoxTree
 * ----------------------
 */
 /*-------------------------------------------------*
	treecombo = {
		fieldLabel : '片&nbsp;&nbsp;&nbsp;&nbsp;源&nbsp;&nbsp;&nbsp;&nbsp;类&nbsp;&nbsp;&nbsp;&nbsp;别',
		width : 127,
		xtype : 'combotree',
		passName : 'videoCategory',
		allowUnLeafClick : false,
		treeHeight:200,
		tree : new Ext.tree.TreePanel({
			rootVisible : false,
			root : new Ext.tree.AsyncTreeNode({
				id : 'CategoryRoot',
				text : "影片分类",
				expanded : true,
				loader : new Ext.tree.TreeLoader({
					dataUrl : UrlPpts.ajax.vdocategory + '?method=tree'
				})
			})
		}),
		allowBlank : false
	}
*-----------------------------------------------------*/

ComboBoxTree = Ext.extend(Ext.form.ComboBox, {

	/**
	 * ------------------------------------- 
	 * 作为隐藏域的name属性

	 * -------------------------------------
	 */
	passName : 'id',

	/**
	 * ------------------------------------- 
	 * 是否允许非叶子结点的单击事件
	 * 
	 * @default false 
	 * -------------------------------------
	 */
	allowUnLeafClick : true,

	/**
	 * --------------------- 
	 * 树渲染的模板tpl 
	 * ---------------------
	 */
	// tpl: '<div id="treeTpl"></div>', //html代码
	/**
	 * -----------------------
	 * 树显示的高度，默认为180
	 * -----------------------
	 */
	treeHeight : 180,

	store : new Ext.data.SimpleStore({
		fields : [],
		data : [[]]
	}),
	
	//Default
	editable : false, // 禁止手写及联想功能

	mode : 'local',
	triggerAction : 'all',
	maxHeight : 500,
	selectedClass : '',
	onSelect : Ext.emptyFn,
	emptyText : '请选择...',

	/**
	 * 清空值

	 */
	clearValue : function() {
		if (this.passField) {
			this.passField.value = '';
		}

		this.setRawValue('');
			},
	
	/**
	 * 设置传值

	 * @param passvalue
	 */
	setPassValue: function(passvalue){
		if (this.passField)
			this.passField.value = passvalue;
	},

	/**
	 * -------------------------------------- 
	 * 下拉树被点击事件添加一处理方法
	 * @param node
	 * --------------------------------------
	 */
	onTreeSelected : function(node) {

	},

	/**
	 * ---------------------------------- 
	 * 树的单击事件处理
	 * @param node,event
	 * ----------------------------------
	 */
	treeClk : function(node, e) {
		if (!node.isLeaf() && !this.allowUnLeafClick) {
			e.stopEvent();// 非叶子节点则不触发

			return;
		}
		this.setValue(node.text);// 设置option值

		this.collapse();// 隐藏option列表

		if (this.passField)
			this.passField.value = node.id;// 以树的节点ID传递


		// 选中树节点后的触发事件

		this.fireEvent('treeselected', node);

	},

	/**
	 * 初始化

	 * Init
	 */
	initComponent : function() {
		ComboBoxTree.superclass.initComponent.call(this);
		this.tree.autoScroll = true;
		this.tree.height = this.treeHeight;
		this.tree.containerScroll = false;
		this.tplId = Ext.id();
		// overflow:auto"
		this.tpl = '<div id="' + this.tplId + '" style="' + this.treeHeight
				+ '";overflow:hidden;"></div>';

		/**
		 * ----------------------- 
		 * 添加treeselected事件，

		 * 选中树节点会激发这个事
		 * 件， 参数为树的节点

		 * ------------------------
		 */
		this.addEvents('treeselected');
		// this.on('treeselected',this.onTreeSelected,this);
	},

	/**
	 * ------------------
	 * 事件监听器 
	 * Listener
	 * ------------------
	 */
	listeners : {
		'expand' : {
			fn : function() {
				if (!this.tree.rendered && this.tplId) {

					this.tree.render(this.tplId);

				}
				this.tree.show();
			},
			single : true
		},

		'render' : {
			fn : function() {

				this.tree.on('click', this.treeClk, this);

				/**
				 * ------------------------------------------- 
				 * 创建隐藏输入域<input />
				 * 并将其dom传给passField 
				 * ------------------------------------------
				 */
				if (this.passName) {
					this.passField = this.getEl().insertSibling({
						tag : 'input',
						type : 'hidden',
						name : this.passName,
						id : this.passId || Ext.id()
					}, 'before', true)
				}

				this.passField.value = this.passValue !== undefined
						? this.passValue
						: (this.value !== undefined ? this.value : '');

				this.el.dom.removeAttribute('name');
			}
		},
		'beforedestroy' : {
			fn : function(cmp) {
				this.purgeListeners();
				this.tree.purgeListeners();
			}
		}
	}

});

/**
 * --------------------------------- 
 * 将ComboBoxTree注册为Ext的组件,以便使用
 * Ext的延迟渲染机制，xtype:'combotree' 
 * ---------------------------------
 */
Ext.reg('combotree', ComboBoxTree);


var userComboBoxTree = {
    dataUrl:"",
	fixedDataUrl:ucapSession.baseAction+"?type=getView&action=getCategory",
	viewId:"",
	index:0,
	rootJson:null,
	deptId:"",
	rootText:"视图分类",
    init:function(viewId,renderto,index,categoryItemType,rootText,linkUrl){
        if("undefined"!=typeof(rootText) && rootText!=""){
		    userComboBoxTree.rootText = rootText;
		}
		var url = "";
		if("undefined"!=typeof(categoryItemType) && categoryItemType=="05"){
		    url=ucapSession.appPath+linkUrl;
		}else{
		    url = userComboBoxTree.fixedDataUrl;
		}
		 userComboBoxTree.dataUrl = url;
		if(url.indexOf("?")>=0){
		    url = url+"&viewId="+viewId;
		}else{
		    url = url+"?viewId="+viewId;
		}
		url+="&rand="+Math.random();
		userComboBoxTree.viewId = viewId;
		if("undefined"!=typeof(categoryItemType) && categoryItemType=="04"){
			//获取根节点对象

			var rurl =ucapSession.baseAction;
			rurl+="?action=getDeptTree&type=treeSelect&unid=&rand="+Math.random();
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			conn.open("GET", rurl, false);
			conn.send(null);
			var exjson = Ext.util.JSON.decode(conn.responseText);	
			var exResult=ucapCommonFun.dealException(exjson);
			if(!exResult)return;
			
			if("undefined"!=typeof(conn.responseText) && conn.responseText!=""){
				userComboBoxTree.rootJson = Ext.util.JSON.decode(conn.responseText)[0];
				deptId = this.rootJson.id;
				url+="&deptUnid="+deptId;
			}else{
				userComboBoxTree.rootJson = {id:viewId,text:userComboBoxTree.rootText};	
			}
			//树形根节点加载完毕

		}else{
			userComboBoxTree.rootJson = {id:viewId,text:userComboBoxTree.rootText};
		}
        //定义一个树形

        var contenttree = new Ext.tree.TreePanel({
            rootVisible:true,  
            root:new Ext.tree.AsyncTreeNode({
                id : userComboBoxTree.rootJson.id,
                text: userComboBoxTree.rootJson.text, 
                draggable:false,       
                //checked:false,
                expanded: true   // 展开根节点下的节点

            }),
            //设置树形的根节点
            loader:new Ext.tree.TreeLoader({
                requestMethod: 'GET',
                dataUrl:url  
            }),
            listeners:{
               	click : function(node){
               		var searchValue = "";
               		var pcateUrl = "";
               		while(node.id!=userComboBoxTree.viewId){
               			if("undefined"==typeof(node.attributes.name) || node.attributes.name==""){
               				break;
               			}
               			if(searchValue.indexOf(node.attributes.name)>=0){
               				node = node.parentNode;
               				continue;
               			}
               			if(searchValue==""){
               				searchValue=view.fieldDbType+node.attributes.name+view.fieldEndPrefix+view.sqlLikeKey
               				+view.fieldConstType+node.attributes.value+view.fieldEndPrefix;
               				pcateUrl = node.attributes.name+"="+node.attributes.value;
               			}else{
               				searchValue=view.fieldDbType+node.attributes.name+view.fieldEndPrefix+view.sqlLikeKey
               				+view.fieldConstType+node.attributes.value+view.fieldEndPrefix+view.sqlAnd+searchValue;
               				pcateUrl+="&"+node.attributes.name+"="+node.attributes.value;
               			}
               			node = node.parentNode;
               			if(null==node || "undefined"==typeof(node)){
               				break;
               			}
               		}
               		//重新加载视图中的数据
               		view.reloadByCon(index,searchValue,"00",pcateUrl);                      
                }
            }
        });
        //树在Load时自动展开
        contenttree.on('load', function(node, checked) {
            node.expand();
            //展开所有子节点
            //node.eachChild(function(child) {
                //child.expand();    
            //});      
        }/*, contenttree*/);
      
        /**
         * 树形加载前的事件
         */
        contenttree.on('beforeload', 
            function(node){ 
			    if(!node.isLeaf()){
				    var url = userComboBoxTree.dataUrl+"&viewId="+userComboBoxTree.viewId+"&itemName="+node.attributes.name; 
				    var conn = "";         //上级的条件

				    while(node.id!=userComboBoxTree.viewId){
					    if(conn.indexOf(node.attributes.name)>=0){
						    node = node.parentNode;
						    continue;
					    }
    					
               		    if(conn==""){
               	    	    conn=view.fieldDbType+node.attributes.name+view.fieldEndPrefix+view.sqlLikeKey
               	    	    +view.fieldConstType+node.attributes.value+view.fieldEndPrefix;
               		    }else{
               			    conn=view.fieldDbType+node.attributes.name+view.fieldEndPrefix+view.sqlLikeKey
               			    +view.fieldConstType+node.attributes.value+view.fieldEndPrefix+view.sqlAnd+conn;
               		    }
               		    node = node.parentNode;
               		    if(null==node || "undefined"==typeof(node)){
               			    break;
               		    }
               	    }//end while
				    url+="&conn="+escape(conn);
			        contenttree.loader.dataUrl=url; 
    			     
			    }//end if
             }
         ); 
          //定义下拉树对象

        var contenttreecombo = new ComboBoxTree({
            //autoHeight:true,
            //autoWidth :true,
            title:"视图分类列表：",
            renderTo : "search",
            allowBlank : true,
            //allowUnLeafClick:false,//只允许选择叶子  
            treeHeight:180,
            width:180,
            emptyText:'--请选择一个视图分类查询--',
            tree:contenttree  
        });
        contenttreecombo.render();
        if(contenttreecombo && $(contenttreecombo.getId()) && $(contenttreecombo.getId()).parentNode)
            $(contenttreecombo.getId()).parentNode.style.margin="2px 0;";
    }
};