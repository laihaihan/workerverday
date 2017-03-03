/**
 * 模块相关的函数
 * yjianyou@linewell.com
 */
//Ext.namespace('ucapModule'); 
var ucapModule={
	displayName:"",//模块名称
 	picture:"",//模块前置图标
 	moduleDivId:"",  //要展示的容器
	/**
	 * 模块样式 01 树形	02  普通展开	03 置顶展开	 (03暂不实现等同02)
	 * "text","icon","id","children","qtip"
	 * @type String
	 */
	style:"",
	defaultLeaf:"",//默认打开的叶子
	width:165,  //模块的宽度
	allJson:null,
	json:null,//从后台获取对象
	littleImg:"uistyle/images/icon/icon_",
	bodyStyle:"",//树的背景样式，默认无背景	add by jc 20111130
	rootVisible:true,//是否显示树的根节点，默认为显示	add by jc 20111130
	lines:true,//是否显示树的虚线 add by jc 20111201
	leftNode:null,
	firstNodePath:"", //树中第一个叶子路径
	moduleUnid:"",//模块的UNID
	deductViewDivId:"",   //视图宽度还需要减的DIV，可以多值，以,分隔
	/**
	 * 设置模块菜单的HTML内容 对外调用的方法
	 * @param {} moduleUnid 模块的UNID
	 */
	setModuleHtml:function(moduleUnid,moduleDivId,firstViewId,purl){
		//alert(moduleUnid+moduleDivId);
		if (typeof(moduleUnid)=="undefined"){
			Ext.Msg.alert("提示","模块的UNID不能为空！");
			return "";
		};
		if (typeof(moduleDivId)=="undefined"){
			Ext.Msg.alert("提示","模块的容器不能为空！");
			return "";
		};
		if (Ext.getDom(moduleDivId)==null){
			Ext.Msg.alert("提示","模块的容器div不能为空！");
			return "";
		}
		if (Ext.getDom(ucapSession.portalID))
				Ext.getDom(ucapSession.portalID).innerHTML="";
		if (Ext.getDom(ucapSession.ucapModuleId))
			Ext.getDom(ucapSession.ucapModuleId).innerHTML="";
		if (Ext.getDom(ucapSession.portal_info))
			Ext.getDom(ucapSession.portal_info).style.display="none";
				
		this.moduleDivId = moduleDivId;
		this.moduleUnid = moduleUnid;
		Ext.DomHelper.applyStyles(Ext.get(moduleDivId),'style="padding:0px;"');
		Ext.getDom(this.moduleDivId).style.display="";
		Ext.getDom(ucapSession.leftArrowheadId).style.display="";
		//this.pagebarleft(ucapSession.leftArrowheadId,"leftBar")
		Ext.DomHelper.overwrite(this.moduleDivId,"");
		var url =ucapSession.baseAction;
		url+="?type=module&act=getModuleMenu&moduleUnid="+this.moduleUnid+
				"&random="+ucapCommonFun.getRandomString();

		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);			
		var result = conn.responseText;
		if (result.indexOf("error")>-1){
			Ext.Msg.alert("提示","从后台获取模块内容时出错，模块的ID为"+moduleUnid);
			return "";
		}
		this.json = Ext.decode(result);	
		var exResult=ucapCommonFun.dealException(this.json);
		if(!exResult)return;
		return  this.getHtml(firstViewId,purl);
	},
	getHtml:function(firstViewId,purl){
		this.displayName =this.json.displayName;
		this.style = this.json.style;
		this.picture = this.json.picture;
		if (typeof(this.picture)=="undefined"){
			this.picture = ucapSession.appPath+this.littleImg+"68.gif";
		}
		this.picture = '<img  align="absmiddle"  class="img1" src="'+this.picture+ '"/>';
		this.allJson = this.json;
		this.json = this.json.uiModule;
		if (this.style=="01"){
			//说明是树形菜单
			this.setTreeMenu(firstViewId,purl);
		} else {
			//说明是伸缩菜单
			this.setFlxMenu(firstViewId,purl);
		}
	},
	setTreeMenu:function(firstViewId){
		Ext.DomHelper.applyStyles(Ext.get(this.moduleDivId),'style="padding:8px 0px 0px 5px;'+this.bodyStyle+'"');
		var root=new Ext.tree.AsyncTreeNode({
			id:"moduleTree",	
			expanded: true,		
			text:this.displayName,
			children: this.json 
		});	
		var tree=new Ext.tree.TreePanel({
			id:"panelModuleTree",
			renderTo:this.moduleDivId,
			root:root,
			rootVisible:this.rootVisible,
			bodyStyle:this.bodyStyle,
			lines:this.lines,//是否显示树的虚线 add by jc 20111201
			autoScroll:true,
			width:165,
			loader: new Ext.tree.TreeLoader({
				dataUrl:""
			})
		});	
		var treeRightMenu = new Ext.menu.Menu({ 
             items: [{text: '自定义', icon:"",hidden:!ucapHeader.selfConfig,
	                 handler:function(){
	                 	ucapMenuConfig.openModuleConfig(ucapModule.moduleUnid);
	                 }},{text: '展开', handler: function(){
	                    ucapModule.leftnode.expand();
	                 }},
	        		{text: '折叠', handler: function(){
	        			ucapModule.leftnode.collapse()}
	        		},{text: '全部展开', handler: function(){
	                    ucapModule.leftnode.expand(true);
	                 }},
	        		{text: '全部折叠', handler: function(){
	        			ucapModule.leftnode.collapse(true)}
	        		}
	          ]
        })
		tree.on("click",function(node){
			ucapModule.menuClk(node);
		})
		tree.on('contextmenu',  function (node ){
		       ucapModule.leftnode = node;
	           treeRightMenu.show(node.ui.getAnchor());                               
         	}
        ); 
        var firstPath = this.getFirstPath(this.json,firstViewId);
        if(!firstPath && "undefined"!=firstViewId)firstPath=this.getFirstPath(this.json);
        var path ="/moduleTree/"+ firstPath;
  //      tree.expandPath(path);
        tree.selectPath(path);
        var node = tree.getSelectionModel().getSelectedNode();
        ucapModule.menuClk(node);
   },
   /**
    * 伸缩式菜单格式
    */
	setFlxMenu:function(firstViewId,purl){
		var defaultOpenModule=0;//默认打开模块
		Ext.DomHelper.applyStyles(Ext.get(this.moduleDivId),'style="width:'+this.width+';"');
		var html='<div id="leftMenuTitle" class="leftMenuTitle">';
		html +='<div id="leftTitleText" class="leftTitleText" qtip="'+this.displayName+'">'+this.picture+
				ucapCommonFun.limitL(this.displayName,7)+'&nbsp;&nbsp;</div>';
		if(ucapHeader.selfConfig){
			html +='<div id="leftMenuTool" class="leftMenuTool">';
			html +='<a href="javascript:void(0)" title="自定义" onclick="ucapMenuConfig.openModuleConfig(\'' +
				this.moduleUnid+
				'\');">';
			html +='<img src="'+ucapSession.sUserImgPath+'left_inc_2.gif"  align="absmiddle"  />';
			html+="</a></div> ";
		}
		html +='</div>';
		var thirdMenu = new Array();
		var thirdItem = new Array();
		//增加树形根节点的图标 add by jc 20100830
		var icons = new Array();
		var con=0;
		var firstId = "";//取第一个叶子节点的ID
		var linkId = "";
		var linkPurl = "";
		if("undefined"!=typeof(purl))linkPurl = purl;
		for (var i=0;i<this.json.length;i++){	
			if(!this.json[i].leaf && this.json[i].defaultOpen=="1"){
				defaultOpenModule=i;
			}
			var clk = 'ucapModule.menuView('+i+')';
			html +='<div class="leftChannel"><div class="leftChannelTitleText" '+' onclick="'+clk+'"><div class="leftText">';
			var firstIcon = this.json[i].icon;
			if (typeof(firstIcon)=="undefined" || firstIcon==""){
				firstIcon = '<img  align="absmiddle"  class="img1" src="'+ucapSession.appPath+this.littleImg+(i+10)+".gif"+ '"/>';;
			} else {
				firstIcon ='<img  align="absmiddle" class="img1" src="'+firstIcon+ '"/>';
			}
			html +=firstIcon+'<a href="javascript:void(0)" class="leftChannelText" qtip="'+this.json[i].text+'" >'
						+ucapCommonFun.limitL(this.json[i].text,8)+'</a></div>';
			html +='<div class="leftInc"><img name ="infoImg" id="infoImg" src="'+ucapSession.sUserImgPath+
						'flexup.gif" align="absmiddle" title="展开" /></div>';					
			html +=' </div><div class="leftContentText" style="display:none;" id="info" name="info">';
			html +='<ul>';
			if (this.json[i].children!=null){
				var secMenu = this.json[i].children;
				for(var k=0;k<secMenu.length;k++){ 
					var clk="";
					var img ="";
					var id= k+'_'+i;
					var hasDeaultOpen=false;
					
					if (secMenu[k].children!=null){
						thirdMenu[con]=id;
						thirdItem[con]=secMenu[k].children;
						icons[con]=secMenu[k].icon;
						con++;		
						html +='<div class="moduleleftTree" id="tree_'+id+'">'+secMenu[k].text+'</div>';
					} else {
						var otherclk="ucapModule.setClkCls('modulecls_"+id+"')";
						//moduleItemId模块Item的UNID mdf by jc 20110510
						
						//start 当来源类型为js，其他参数带引号前台报错的解决     by@cgc 2011-6-13
						//将单双引号替换为html格式的双引号
						if(secMenu[k].type=="04"){
							 if(secMenu[k].contents.indexOf("\"")>0){
								secMenu[k].contents=secMenu[k].contents.replace(/\"/g, "&quot;");
							 }
							 if(secMenu[k].contents.indexOf("\'")>0){
								secMenu[k].contents=secMenu[k].contents.replace(/\'/g,  "&quot;");
							 }							
						}
						//end 当来源类型为js，其他参数带引号前台报错的解决     by@cgc 2011-6-13

						clk=ucapModule.getClk(secMenu[k].contents,secMenu[k].type,
									secMenu[k].openType,otherclk,secMenu[k].text,'',secMenu[k].moduleUnid,secMenu[k].id);
						
						//2012-08-06 add　by cxifu@linewell.com 
						//增加判断如果菜单项的Id与传进来的Id相等，则打开菜单项的内容,实现可以根据菜单id快捷打开菜单
						if(linkId=="" && ((null!=secMenu[k].contents && secMenu[k].contents.indexOf(firstViewId)>=0)
								|| secMenu[k].id==firstViewId)){
							//moduleItemId模块Item的UNID mdf by jc 20110510
							linkId= ucapModule.getClkEvent(secMenu[k].contents,secMenu[k].type,
									secMenu[k].openType,otherclk,secMenu[k].text,linkPurl,secMenu[k].moduleUnid,secMenu[k].id);
						}
						//判断是否为默认打开的视图 modify by zhua@linewell 2010-11-14
					    //if(firstId=="" && i==0 && secMenu[k].defaultOpen=="1"){
						if(secMenu[k].leaf && secMenu[k].defaultOpen=="1"){
							//moduleItemId模块Item的UNID mdf by jc 20110510
							firstId = ucapModule.getClkEvent(secMenu[k].contents,secMenu[k].type,
									secMenu[k].openType,otherclk,secMenu[k].text,linkPurl,secMenu[k].moduleUnid,secMenu[k].id);
							   hasDeaultOpen=true;
					    }
						html+='<li class="leftContentTextli" onmouseover="this.className=\'leftContentText2\'" onmouseout="this.className=\'leftContentTextli\'">' +
							'<a href="javascript:void(0)"  class="leftIconText2" '+clk
							+' qtip="'+secMenu[k].tip+'" '+'>';
						var imgIcon="";
						if (typeof(secMenu[k].icon)=="undefined"){
							var no =((k*7)+1) % 93+1;
							imgIcon =ucapSession.appPath+ this.littleImg+no+".gif";
						} else {
							imgIcon = secMenu[k].icon;
						}
						html +='<img  align="absmiddle"  src="'+imgIcon+ '"/>';
						html +='<span id="modulecls_'+id+'" selectText="modulecls" >'+secMenu[k].text+'</span></a></li>';
						//没有设置默认打开则默认打开第一个 modify by zhua@linewell 2010-11-14
					    if(!hasDeaultOpen && firstId=="" && i==0){			    
					    	var otherclk="ucapModule.setClkCls('modulecls_0_0')";
					    	//moduleItemId模块Item的UNID mdf by jc 20110510
							var k=0;
					    	firstId = ucapModule.getClkEvent(secMenu[k].contents,secMenu[k].type,
											secMenu[k].openType,otherclk,secMenu[k].text,linkPurl,secMenu[k].moduleUnid,secMenu[k].id);
				    	}
					}					
				}
			}
			html +='</ul></div></div>';
		}
		Ext.getDom(this.moduleDivId).innerHTML = html;
	
		ucapModule.menuView(defaultOpenModule);
		
		if(linkId!=""){
			ucapCommonFun.evalJavaScript(linkId);
		}else if (firstId!=""){
			ucapCommonFun.evalJavaScript(firstId);
		}
		//下面增加树的菜单
		//如果 firstId 为空，则说明要从树中找到第一个叶子节点
		for (var i=0;i<thirdMenu.length;i++){
			var tree = this.addTree("tree_"+thirdMenu[i],thirdItem[i],icons[i]);
			if (i==0 && firstId==""){
				var path ="/"+tree.getRootNode().id+"/"+ this.getFirstPath(thirdItem[i]);
				tree.selectPath(path);
			    var node = tree.getSelectionModel().getSelectedNode();
			    ucapModule.menuClk(node);
			}
		}		
	},	
	//向左收缩2
	 pagebarleft:function(){
		var div=Ext.getDom("ucapModule");   
	    var img=Ext.getDom("leftBar");
	    if(div){
			if (div.style.display=="") 
			{	img.src=ucapSession.sUserImgPath+"arrowhead_left_2.gif";
				img.alt="伸展";
				div.style.display="none";			
			}
			else
			{	img.src=ucapSession.sUserImgPath+"arrowhead_left_1.gif";
				img.alt="收缩";
				div.style.display="";
				
			}
			ucapCommonFun.autoMenuHeight();
			//设置当前页面的视图宽度
			if (ucapSession.viewOpenType==1) {
				//如果是页签式的，还要重调所有iframe中视图的宽度
				ucapCommonFun.setIframeViewWidth();
			} else {
				//ucapCommonFun.setViewWidth();
				ucapCommonFun.setIframeViewWidth();
			}
			//防止视图打开时出现不必要的滚动条mdf by jc 20100609
			document.body.style.overflowY="hidden";
			//document.body.style.overflowY="auto";
	    }
	},
	addTree:function(id,item,rootIcon){
		Ext.DomHelper.applyStyles(Ext.get(id),'style="padding:0px 0px 0px 0px;"');
		var root=new Ext.tree.AsyncTreeNode({
			expanded: true,		
			text:Ext.getDom(id).innerHTML,
			icon:rootIcon||"",
			children: item 
		});	
		Ext.getDom(id).innerHTML="";
		var tree=new Ext.tree.TreePanel({
			renderTo:id,
			root:root,
			rootVisible:true,
			autoScroll:true,
			autowidth:true,//width:this.width,这样的话，宽度太宽，会导致滚动条的时候撑开
			loader: new Ext.tree.TreeLoader({
				dataUrl:""
			})
		});		
		tree.on("click",function(node){
			ucapModule.menuClk(node);
		})
		return tree;
	},
	/**
	 * 伸缩菜单选中时的处理
	 * @param {} id
	 */
	setClkCls:function(id){
		var allCls = Ext.query("span[selectText=modulecls]");
		for(var i=0;i<allCls.length;i++){
			allCls[i].className ="";
		}
		Ext.getDom(id).className='leftTextHover';
	},
	/**
	 *菜单事件 
	 * @param {} node
	 */
	menuClk:function(node,purl){
		//alert(node.attributes.contents+node.attributes.type+node.attributes.openType);
		if(null!=node)
		{
			//参数加入模块ITEM的Unid mdf by jc 20110510
			ucapCommonFun.moduleMenuClk(node.attributes.contents,
				node.attributes.type,node.attributes.openType,node.text,purl,node.attributes.moduleUnid,node.attributes.id);
		}
	},
	/**
	 * 递归查找第一个叶子节点，并返回整个路径
	 * @param {} json
	 * @return {}
	 */
	getFirstPath:function(json,firstViewId){
		if("undefined"!=typeof(firstViewId)){
			var str;
			for(var i=0;i<json.length;i++){
				str="";
				if(json[i].leaf){
					//2012-08-06 add　by cxifu@linewell.com 
					//增加判断如果菜单项的Id与传进来的Id相等，则打开菜单项的内容,实现可以根据菜单id快捷打开菜单
					if(json[i].contents.indexOf(firstViewId)>=0 || json[i].id==firstViewId)return json[i].id;
				}else{
					var childPath=ucapModule.getFirstPath(json[i].children,firstViewId);
					str= json[i].id+"/"+childPath;
					if(childPath!=""&&null!=childPath&&typeof childPath!="undefined")break;//当取下级时，取到值时直接跳出，否则继续查找
					//return json[i].id+"/"+ucapModule.getFirstPath(json[i].children,firstViewId);
				}
			}
			return str;
		}else{
			//判断是否为默认打开的视图 modify by zhua@linewell 2010-11-14
			var hasDeaultOpen=false;
			for(var i=0;i<json.length;i++){
				if(json[i].defaultOpen=="1"){
					if (json[i].leaf){
						hasDeaultOpen=true;
						return json[i].id;
						
					} else {
						return json[i].id+"/"+ucapModule.getFirstPath(json[i].children);
					} 
				}
			}	
			//树形展示没设置默认时，默认打开第一个
			if(!hasDeaultOpen)
			{
				for(var i=0;i<json.length;i++){
					if (json[i].leaf){
							return json[i].id;
							
						} else {
							return json[i].id+"/"+ucapModule.getFirstPath(json[i].children);
						} 
				}	
			}
		}
	},
	/**
	 * 设置单击事件
	 * @param {} id
	 * @param {} type 1 表示打开模块 2表示打开视图 3表示打开URL 4表示打开文档
	 * @param {} openType 打开方式  01新窗口打开	02  当前窗口打开
	 * @param {} otherclk 要附加的事件
	 * @param {} title 标题
	 * @param {} purl 传入的url参数
	 * @param {} bModuleUnid 业务模块标识
	 * @param {} moduleItemId模块Item的UNID
	 * @return { html格式的 事件}
	 * 参数加入模块ITEM的Unid mdf by jc 20110510
	 */
	getClk:function(id,type,openType,otherclk,title,purl,bModuleUnid,moduleItemId){
		return " onclick=\""+this.getClkEvent(id,type,openType,otherclk,title,purl,bModuleUnid,moduleItemId)+"\" ";
	},
	/**
	 * 设置单击事件
	 * @param {} id
	 * @param {} type 1 表示打开模块 2表示打开视图 3表示打开URL 4表示打开文档
	 * @param {} openType 打开方式  01新窗口打开	02  当前窗口打开
	 * @param {} otherclk 要附加的事件
	 * @param {} title 标题
	 * @param {} purl 传入的url参数
	 * @param {} bModuleUnid 业务模块标识
	 * @param {} moduleItemId模块Item的UNID
	 * @return { html格式的 事件}
	 * 参数加入模块ITEM的Unid mdf by jc 20110510
	 */
	getClkEvent:function(id,type,openType,otherclk,title,purl,bModuleUnid,moduleItemId){
		if (typeof(otherclk)=="undefined") otherclk="";
		return otherclk+";ucapCommonFun.moduleMenuClk('"+id+"',"+type+","+openType+",'"+title+"','"+purl+"','"+(bModuleUnid||"")+"','"+moduleItemId+"') ";
	},
	menuView:function(i){
		var infos=document.getElementsByName("info");
		var infoImgs = document.getElementsByName("infoImg");
		//2012-03-28 mdf by zzhan@linewell.com
		//增加infos[i]和infoImgs[i]是否为undefined的判断
		var curInfo = infos[i];
		var curInfoImg = infoImgs[i];
		if (curInfo && curInfoImg && curInfo.style && curInfo.style.display=="") {
			curInfo.style.display="none";
			curInfoImg.src =ucapSession.sUserImgPath+'flexup.gif';
			curInfoImg.title="展开";
			return;
		}
		for (var j=0; j<infos.length; j++){
			if (i==j){
				infoImgs[j].src =ucapSession.sUserImgPath+'flexdown.gif';
				infoImgs[j].title="收缩";
				infos[j].style.display='';
			} else {
				infos[j].style.display='none';
				infoImgs[j].title="展开";
				infoImgs[j].src =ucapSession.sUserImgPath+'flexup.gif';
			}
		}
	}
}
 