/**
 * 模块
 * @type 
 */
var demoModule = {
	displayName:"",
	
	//模块样式 01 树形	02  普通展开	03 置顶展开	 (03暂不实现等同02)
	style:"",
	allJson:null,
	uiModule:null,
	leftnode:null,
	//加载模块
	load:function(unid){
		this.init(unid);
	},
	//初始化模块数据
	init:function(unid){
		var url =ucapSession.baseAction;
		url+="?type=module&act=getModuleMenu&moduleUnid="+unid+
				"&random="+ucapCommonFun.getRandomString();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null); 
		var exjson = Ext.decode(conn.responseText);
		var exResult=ucapCommonFun.dealException(exjson);
		if(!exResult)return;
		$("demo_div").innerHTML ="";
		if (conn.responseText==""){
			$("demo_div").innerHTML ="菜单没有配置模块";		
			return;
		}
		
		$("demo_div").innerHTML = conn.responseText;
		
		var json = Ext.decode(conn.responseText);
		if(null==json)return;
		
		this.allJson=json;
		this.displayName =json.displayName;
		this.style = json.style;  
		this.uiModule=json.uiModule; 
		if (this.style=="01"){
			//说明是树形菜单
			this.setTreeMenu();
		} else {
			//说明是伸缩菜单 
			this.setFlxMenu();
		}
	},
	/*
	 树形菜单
	 */
	setTreeMenu:function(){
		 $("demo_module_div").innerHTML="";
		 
		 Ext.DomHelper.applyStyles(Ext.get("demo_module_div"),'style="padding:8px 0px 0px 5px;"');
		 var root=new Ext.tree.AsyncTreeNode({
			id:"demo_module_div",	
			expanded: true,		
			text:this.displayName,
			children: this.allJson.uiModule 
		 });	
		 var tree=new Ext.tree.TreePanel({
			id:"panelModuleTree",
			renderTo:"demo_module_div",
			root:root,
			rootVisible:true,
			autoScroll:true,
			width:165,
			loader: new Ext.tree.TreeLoader({
				dataUrl:""
			})
		 });	
		 var treeRightMenu = new Ext.menu.Menu({
             items: [{text: '展开', handler: function(){
	                    this.leftnode.expand();
	                 }},
	        		{text: '折叠', handler: function(){
	        			this.leftnode.collapse()}
	        		},{text: '全部展开', handler: function(){
	                    this.leftnode.expand(true);
	                 }},
	        		{text: '全部折叠', handler: function(){
	        			this.leftnode.collapse(true)}
	        		}
	          ]
        })
		tree.on("click",function(node){
			if(null!=node.attributes.contents)
				initFormJspView(node.attributes.contents,"demo_view_div");
		})
		tree.on('contextmenu',  function (node ){
		       this.leftnode = node;
	           treeRightMenu.show(node.ui.getAnchor());                               
         	}
        ); 
		$("demo_module_name").innerHTML=this.displayName;
	},
	/*
	 * 伸缩菜单
	 */
	setFlxMenu:function(){
		 $("demo_module_div").innerHTML=""; 
		 var html="<div><ul>";
		for(var i =0;i<this.uiModule.length;i++)
		{
			var _jsonMenu=this.uiModule[i];
			var _children=this.uiModule[i].children;
			html+="<li><b>"+_jsonMenu.text+"</b></li>";
			for(var j=0;j<_children.length;j++)
			{
				var _jsonModule=_children[j];
				html+="<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:initFormJspView(\""+_children[j].contents+"\",\"demo_view_div\")'>"+_jsonModule.text+"</a></li>";
			} 
		}
		html+="</ul></div>";
		$("demo_module_div").innerHTML=html; 
		$("demo_module_name").innerHTML="模块："+this.displayName;
	}
};