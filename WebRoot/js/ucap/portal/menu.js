/**
 * 菜单相关的函数
 * yjianyou@linewell.com
 */
Ext.onReady(function(){
	Ext.namespace('ucapMenu'); 
	Ext.namespace('ucapClk'); 
	if (Ext.getDom("ucapMenu")) ucapMenu.init();
});
var ucapClk ={	
	/**
	 * 设置单击事件
	 * @param {} id
	 * @param {} type 1 表示打开模块 2表示打开视图 3表示打开URL 4表示打开文档
	 * @param {} openType 打开方式 01 当前页面 02新页面 03以iFrame方式嵌入
	 * @param {} otherclk 要附加的事件
	 * @return { html格式的 事件}
	 */
	getClk:function(id,type,openType,otherclk){
		if(typeof openType=="undefined" || openType=="") openType = 1;
		if (type=="") type =9;
		if (typeof(type)=="String") type = parseInt(type);
		if (typeof(openType)=="String") openType = parseInt(openType);
		if (typeof(otherclk)=="undefined") otherclk="";
		return " onclick=\""+otherclk+"; " +
				"ucapCommonFun.indexOpen.open('"+id+"',"+type+",'"+openType+"',1)\" ";
	},
	/**
	 * 设置单击事件
	 * @param {} id
	 * @param {} type 1 表示打开模块 2表示打开视图 3表示打开URL 4表示打开文档
	 * @param {} openType 打开方式 01 当前页面 02新页面 03以iFrame方式嵌入
	 * @param {} otherclk 要附加的事件
	 * @return { html格式的 事件}
	 */
	getClkJs:function(id,type,openType,otherclk){
		if(typeof openType=="undefined" || openType=="") openType = 1;
		if (type=="") type =9;
		if (typeof(type)=="String") type = parseInt(type);
		if (typeof(openType)=="String") openType = parseInt(openType);
		if (typeof(otherclk)=="undefined") otherclk="";
		return "ucapCommonFun.indexOpen.open('"+id+"',"+type+",'"+openType+"',1)";
	}
}
//首页面菜单的设置
var ucapMenu={
	headerHeight:100,//默认头部的高度
	/**
	 * 导航栏的位置  0 没有 1--在LOGO的右边，2--中间居左 3中间居中 4中间居右
	 * @type Number
	 */
	navigationType:ucapHeader.navType, 
	menuContent:null, //菜单的内容
	navigation:{},//导航栏的内容 
	/**
	 * 菜单的类型 1 页签式，2下拉菜单 3大图标 4小图标 5树型 6伸宿型
	 * @type Number
	 */
	menuType:ucapHeader.menuType,
	menuAlign:"right", //菜单的位置 
	menuCount:0,      //一级菜单的个数
	menuIconNum:6,    //图标显示的个数
	menuArray:new Array(), //多级菜单对象
	descsort:' navText ',
	downImg3:'<img src="'+ucapSession.sUserImgPath+'arrow_drop2.gif" align="middle" />',
	downImg4:'<img src="'+ucapSession.sUserImgPath+'arrow_drop3.gif" align="middle" />',
	flxDownIcon:'<img height="6px" width="9px" align="absmiddle" src="'+ucapSession.sUserImgPath+'arrow_drop.gif" ',
	bigImg:"uistyle/images/big/b",
	littleImg:"uistyle/images/icon/icon_",
	gif:".gif",
	//2012-09-01 add by cxifu@linewell.com 是否打开默认菜单项（如果有传菜单Id时不打开默认）
	isOpenDefaultItem:true,
	initHeight:function(){
		//this.headerHeight  =100;//变量已经存在默认值没必要重新设置默认值。mdf by jc 20111130
		if (this.navigationType>1){
			this.headerHeight +=29;
		}
		if (ucapSession.indexType=="02"){
			//说明是首页直接进入模块，则不显示菜单
			Ext.getDom("headerBox").style.height=this.headerHeight+"px";		
			ucapCommonFun.autoMenuHeight();
			return;
		}
		if (this.menuType==1 || this.menuType ==2){
			Ext.getDom("ucapMenu").style.display="";
			this.headerHeight +=28;
		}

		if (this.menuType==5 ){
			Ext.getDom("leftPortl").innerHTML = '<div id="leftBox">' +
					'<span id="menuTitle">正在加载菜单，请稍等...</span></div>';
		}
		if ( this.menuType==6){
			Ext.getDom("leftPortl").innerHTML = '<div id="leftBox" class="flexMenu" >' +
					'<span id="menuTitle">正在加载菜单，请稍等...</span></div>';
		}
		if (this.menuType==3){
			Ext.getDom("iconUcapMenu").style.display="";
			Ext.getDom("iconMenu").style.display="";
		} 
		if (this.menuType==4){
			Ext.getDom("iconUcapMenu").style.display="";
			Ext.getDom("iconMenu2").style.display="";
		}
		
		//2012-03-28 mdy by fshaoming@linewell.com 
		//设置平台头部的高度,平台高度默认为100
		if(globalVariables.headerHeight && globalVariables.headerHeight>0 &&100!=globalVariables.headerHeight){
			//设置头部高度
			this.headerHeight=globalVariables.headerHeight;
			//隐藏超出的内容
			Ext.getDom("headerBox").style.overflow="hidden";
		}
		Ext.getDom("headerBox").style.height=this.headerHeight+"px";
		ucapCommonFun.autoMenuHeight();
	},
	init:function(){
		this.initHeight();
		this.initNavInfo();
		this.menuContent=[];
		ucapMenu.initNavigation();
		
		if (ucapSession.indexType=="02"){
			ucapCommonFun.indexOpen.openModule(ucapSession.index);
			return;
		}
		
		if (this.menuType == 5){
			this.setMenu();
			return;
		}
		var menuActionParams={type:"menu",act:"getAllMenu",menuType:this.menuType,
			"random":ucapCommonFun.getRandomString()};
		var requestConfig = {
			url:ucapSession.baseAction,
			params:menuActionParams,
			callback:function(options,success,response){
				
				var exjson = Ext.decode(response.responseText);
				var exResult=ucapCommonFun.dealException(exjson);
				if(!exResult)return;
				
				if (response.responseText==""){
					Ext.getDom("ucapMenu").innerHTML ="系统没有配置菜单";
					Ext.getDom("leftPortl").innerHTML ="";					
					return;
				}
				if (success){
					ucapMenu.menuContent = Ext.util.JSON.decode(response.responseText);
					//ucapMenu.menuContent =json.uiMenu;
					ucapMenu.setMenu();
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	setMenu:function(){
		this.menuCount = this.menuContent.length;
		this.initMenu();	
		ucapCommonFun.autoMenuHeight();
	},
	/**
	 * 导航栏初始化
	 */
	initNavInfo:function(){
		
		if (this.navigationType == 0) {	
			Ext.getDom("topBarToolBox").style.display="none";
			Ext.getDom("navigation_top").style.display="none";
			return;
		}
		//样式为1，说明导航栏在上面的右边，为2说明在LOGO的下面
		if (this.navigationType==1){
			Ext.getDom("topBarToolBox").style.display="";
			Ext.getDom("navigation_top").style.display="";
		} else {
			Ext.getDom("topBarToolBox").style.display="none";
			Ext.getDom("navigation_top").style.display="none";
			var nav = Ext.getDom("navigation");
			nav.style.display="";
			nav.style.position="absolute";
			nav.style.top=(this.headerHeight -29)+"px";
			nav.innerHTML="正在加载导航栏，请稍等......";
			var align = "";
			if (this.navigationType==2){
				align = "left";
			} else if (this.navigationType==3){
				align = "center";
			} else {
				align = "right";
			};
			nav.style.textAlign = align;
			//Ext.DomHelper.applyStyles(nav,'style="textAlign:'+align+'"');
			
		}	
	},
	/**
	 * 导航栏的处理
	 * @param {} topBarTool
	 */
	initNavigation:function(){	
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"nav",act:"getNav","random":ucapCommonFun.getRandomString()},
			callback:function(options,success,response){
				if (success){
					var json = Ext.util.JSON.decode(response.responseText);					
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					
					ucapMenu.navigation = json;
					if (typeof(json)=="undefined" || response.responseText=="null") {
						Ext.getDom("topBarToolBox").style.display="none";
						Ext.getDom("navigation_top").style.display="none";
						return;
					}
					var nav = json.navigation;
					var cuts = json.uiShortcuts;
					var navigation ="";
					if(nav.messagePosition=="01"){
						navigation ="&nbsp;&nbsp;"+nav.displayMessage;
					}				
					for(var i=0;i<cuts.length;i++){
						var clk="";
						//这个代码需要进行优化，目前先以这种方式，应该做成自定义项可以定义使用范围和不能使用范围
						if(!ucapHeader.selfConfig && cuts[i].content.indexOf(".userDefine()")>=0)continue;
						if (cuts[i].content.indexOf("gotoPortalConfig()")>=0&&ucapSession.userJson.userStatus != 1)continue;//过滤门户配置按钮add by fsm
						var cutHtml = ucapMenu.getCutHtml(cuts[i]);
						if("undefined"==typeof(cutHtml) || cutHtml=="")continue;
						navigation +="&nbsp;&nbsp;"+cutHtml;						
					}	
					if(nav.messagePosition=="03"){
						navigation +="&nbsp;&nbsp;"+nav.displayMessage;
					}
					if (ucapMenu.navigationType==1){
						Ext.getDom("topBarToolBox").innerHTML  = navigation;
					} else {
						Ext.getDom("navigation").innerHTML=navigation;
					}						
				}
			}
		}
		Ext.Ajax.request(requestConfig);	
		
	},	
	/**
	 * 菜单的处理处理
	 * menuType 
	 * menuAlign left左边 center中间 right右边
	 */
	initMenu:function(){
		//2012-09-01 add　by cxifu@linewell.com 实现可以登录后立即打开指定的菜单 
		var menuId=ucapCommonFun.getUrlParameter("menuId");
		if(null!=menuId && typeof(menuId)!="undefined" && menuId!=""){
			this.isOpenDefaultItem=false;			
		}
		if (this.menuType==1){
			this.setTagMenu();
		} else if(this.menuType==2){
			this.setDownMenu();
		} else if (this.menuType==3 || this.menuType == 4){
			this.setIconMenu();
		} else if (this.menuType ==6){
			this.setFlexMenu();
		} else if (this.menuType == 5){
			this.setTreeMenu();
		}
		
		//如果有传菜单Id，则打开相应的菜单
		if(!this.isOpenDefaultItem){
			ucapCommonFun.indexOpen.directOpenMenu(menuId);
		}
		
	},	
	/**
	 * 页签式菜单设置
	 */
	setTagMenu:function(){
		this.headerHeight +=25;
		var menuHtml ='<div class="menu"><div class="mainMenu">';
		var firstClk = "";
		for (var i=0;i<this.menuContent.length;i++){
			var clk="";
			var icon="";
			clk = ' onclick="FunOve('+(i+1)+')"';			
			if (this.menuContent[i].menu==null){
				//说明下面没有菜单
				var otherclk = 'FunOve('+(i+1)+')';
				//start 解决来源内容为js，方法中带引号出错的问题 by@cgc 2011-8-4
				if(this.menuContent[i].type=="04"){
					if(this.menuContent[i].content.indexOf("\"")>0){
						this.menuContent[i].content=this.menuContent[i].content.replace(/\"/g, "&quot;");
					}
					if(this.menuContent[i].content.indexOf("\'")>0){
						this.menuContent[i].content=this.menuContent[i].content.replace(/\'/g,  "&quot;");
					}							
				}
				//end 解决来源内容为js，方法中带引号出错的问题 by@cgc 2011-8-4		
				clk=ucapClk.getClk(this.menuContent[i].content,this.menuContent[i].type,
					this.menuContent[i].openType,otherclk);
				if(i==0)firstClk = ucapClk.getClkJs(this.menuContent[i].content,this.menuContent[i].type,
					this.menuContent[i].openType,"");
			}
			/*if (this.menuContent[i].icon!=""){
				icon='<img align="absmiddle" src="'+this.menuContent[i].icon+ '"/>';
			}*/
			var cls ="menuText1";
			if (i==0){
				cls ="menuText2";
			}
			menuHtml+='<div class="'+cls+'" id="menu_'+(i+1)+'"'+clk+' qtip="'+
					(this.menuContent[i].tip==undefined?"":this.menuContent[i].tip)+'" '+
					//2012-08-06 add by cxifu@linewell.com 增加一个记录模块标识的属性，用于根据模块标识查看模块页签。
					'moduleId="'+this.menuContent[i].content+'"'+
					'>'+icon+this.menuContent[i].text+'</div>';
		}
		menuHtml+='</div>';			
		var thirdMenu = new Array();
		var thirdItem = new Array();
		var con=0;
		for(var i=0;i<this.menuContent.length;i++){
			var secMenu = this.menuContent[i].menu;
			var cls ="subMenu1";
			if (i==0) cls ="subMenu";
			menuHtml+='<div class="'+cls+'" id="subMenu_'+(i+1)+'">';
			if (secMenu!=null){					
				for(var k=0;k<secMenu.length;k++){ 
					var clk="";
					var icon="";
					var img ="";
					var menuOver="";
					if (secMenu[k].menu!=null){
						thirdMenu[con]=k+'_'+i;
						thirdItem[con]=secMenu[k].menu;
						con++;		
						icon= this.descsort;
					} else {
						menuOver ="onmouseover='menuMouseover("+i+")'";
						clk=ucapClk.getClk(secMenu[k].content,secMenu[k].type,secMenu[k].openType);
					}
					/*if (secMenu[k].icon!=""){
						img='<img src="'+secMenu[k].icon+ '"/>';
					}*/
			
					menuHtml+='<a href="javascript:void(0)" id="sub_'+k+'_'+i+'" '+menuOver+'  class="subMenuText '+icon+'" '+clk
						+' qtip="'+(secMenu[k].tip==undefined?"":secMenu[k].tip)
						+'" '+'>&nbsp;&nbsp;'+img+secMenu[k].text;
					menuHtml+='</a>&nbsp;&nbsp;|';
				}
			} else {
				//使欢迎使用UCAP系统可用户自定义 mdf by jc 20100914
				menuHtml+='<a href="javascript:void(0)" class="subMenuText">'+(ucapSession.welcome||"")+'</a>';
			}
			menuHtml +='</div>';
		}
		Ext.getDom("ucapMenu").innerHTML = menuHtml;
		//下面增加下拉的菜单
		for (var i=0;i<thirdMenu.length;i++){
			this.menuArray[i]=this.addMenu("sub_"+thirdMenu[i],thirdItem[i]);
		}
		
//2012-09-01 mfdf　by cxifu@linewell.com 实现可以登录后立即打开指定的菜单，此时不执行打开默认菜单的逻辑
if(firstClk!="" && this.isOpenDefaultItem){
	ucapCommonFun.evalJavaScript(firstClk);
}
	},
	/**
	 * 设置下拉菜单
	 */
	setDownMenu:function(){ 
		var thirdMenu = new Array();
		var thirdItem = new Array();
		var con=0;
		var menuHtml ='<div class="menu2">';		
		menuHtml +='<ul style="float:'+this.menuAlign+';padding-right:20px;">';
		var firstClk = "";
		for(var i=0;i<this.menuContent.length;i++){
			var clk="";
			var icon="";
			var menuOver="this.className='menu2_hover'";
			if (this.menuContent[i].menu!=null){
				thirdMenu[con]=i;
				thirdItem[con]=this.menuContent[i].menu;
				con++;
				icon= "class='"+this.descsort+"'";
			} else {
				clk=ucapClk.getClk(this.menuContent[i].content,this.menuContent[i].type,this.menuContent[i].openType);
				menuOver =" onmouseover='menuMouseover("+i+")'";
				if(i==0)firstClk = ucapClk.getClkJs(this.menuContent[i].content,this.menuContent[i].type,
					this.menuContent[i].openType,"");
			}				
			menuHtml += "<li "+' qtip="'+(this.menuContent[i].tip==undefined?"":this.menuContent[i].tip)+'" '+ clk+" id='subMenu_"+i+"' "+ menuOver+"><a href='javascript:void(0)'"+icon+" >";
			menuHtml +=this.menuContent[i].text;
			menuHtml +="</a></li>";				
		}
		
		menuHtml +='</ul></div>';
		Ext.getDom("ucapMenu").innerHTML = menuHtml;
		//下面增加下拉的菜单
		for (var i=0;i<thirdMenu.length;i++){
			this.menuArray[i]=this.addMenu("subMenu_"+thirdMenu[i],thirdItem[i]);
		}
		
		//2012-09-01 mfdf　by cxifu@linewell.com 实现可以登录后立即打开指定的菜单，此时不执行打开默认菜单的逻辑
		if(firstClk!="" && this.isOpenDefaultItem){
			ucapCommonFun.evalJavaScript(firstClk);
		}
	},
	/**
	 * 设置图标式菜单
	 */
	setIconMenu:function(){ 
		var thirdMenu = new Array();
		var thirdItem = new Array();
		var con=0;
		var menuHtml='<ul>';
		var licls = "";
		var iconMenuName = "iconMenu";
		var br="<br/>";
		var iconName="";
		var firstClk = "";
		if (this.menuType==4){
			Ext.getDom("rollBox").style.className="rollBox2";
			Ext.getDom("leftBotton").style.className="leftBotton2";
			Ext.getDom("ISL_Cont").style.className="Cont2";
			Ext.getDom("scrCont").style.className="ScrCont2";	
			br="";
			licls="2";
		} else {
			Ext.getDom("rollBox").style.className="rollBox";
			Ext.getDom("leftBotton").style.className="leftBotton2";
			Ext.getDom("ISL_Cont").style.className="Cont";
			Ext.getDom("scrCont").style.className="ScrCont";
		}		
		for(var i=0;i<this.menuContent.length;i++){
			var clk ="";
			var menuOver="";
			var down="";
			var qtip="";
			var icon="";
			var imgCls="";
			if (this.menuType==3){
					icon = this.bigImg;
					imgCls="img2";
			}else {
					icon = this.littleImg;
					imgCls="img1";
			}					
			if (this.menuContent[i].menu!=null){
				thirdMenu[con]=i;
				thirdItem[con]=this.menuContent[i].menu;
				con++;
				if (this.menuType==3){
					down=this.downImg3;	
				} else {
					down=this.downImg4;	
				}
			} else {				
				menuOver ="onmouseover='menuMouseover("+i+")'";
				clk=ucapClk.getClk(this.menuContent[i].content,this.menuContent[i].type,
									this.menuContent[i].openType);
				qtip=' qtip="'+(this.menuContent[i].tip==undefined?"":this.menuContent[i].tip)+'" ';
				if(i==0)firstClk = ucapClk.getClkJs(this.menuContent[i].content,this.menuContent[i].type,
					this.menuContent[i].openType,"");
			}
			menuHtml +='<li '+qtip+clk+' class="iconImg'+licls+'"><a href="javascript:void(0)" id="subMenu_'+i+'" '
					+menuOver+'  class="iconTitle '+'">';
			if (typeof(this.menuContent[i].icon)=="undefined"){
				icon +=(i+1)+this.gif;	
				icon = ucapSession.appPath+icon;
			} else {
				icon = this.menuContent[i].icon;
			}			
			if(this.menuType==3){
				menuHtml +='<img '+imgCls+' src="'+icon+'"/>'+down+br;
				menuHtml += this.menuContent[i].text;
			} else {
				menuHtml +='<img '+imgCls+' src="'+icon+'"/>';
				menuHtml += this.menuContent[i].text;
				menuHtml += down;
			}

			menuHtml +='</a></li><li></li>';
		}
		menuHtml +='</ul>';
		Ext.getDom("iconMenuInfo").style.display="none";
		Ext.getDom("iconMenu"+licls).innerHTML = menuHtml;
		if (this.menuCount<=this.menuIconNum){
			Ext.getDom("rightBotton").style.display="none";
		}
		//下面增加下拉的菜单
		for (var i=0;i<thirdMenu.length;i++){
			this.menuArray[i]=this.addMenu("subMenu_"+thirdMenu[i],thirdItem[i]);
		}
		
		//2012-09-01 mfdf　by cxifu@linewell.com 实现可以登录后立即打开指定的菜单，此时不执行打开默认菜单的逻辑
		if(firstClk!="" && this.isOpenDefaultItem){
			ucapCommonFun.evalJavaScript(firstClk);
		}
	},
	/**
	 * 设置伸缩式菜单伸缩
	 */
	setFlexMenu:function(){
		var thirdMenu = new Array();
		var thirdItem = new Array();
		var con=0;
		var firstClk = "";
		var panelItems = new Array();
		for (var i=0;i<this.menuContent.length;i++){
			var firstIcon = this.menuContent[i].icon;
			if (typeof(firstIcon)=="undefined" || firstIcon==""){
				firstIcon = '<img class="img1" src="'+ucapSession.appPath+this.littleImg+(i+1)+this.gif+ '"/>';;
			} else {
				firstIcon ='<img class="img1" src="'+firstIcon+ '"/>';
			}
			var title = firstIcon+ this.menuContent[i].text;			
			var html="";			
			html +=' <div class="leftContentText" id="ucap_menuFlex" >';
			html +='<ul>';
			if (this.menuContent[i].menu!=null){
				var secMenu = this.menuContent[i].menu;
				for(var k=0;k<secMenu.length;k++){ 
					var id= k+'_'+i;
					if (secMenu[k].menu!=null){
						thirdMenu[con]=id;
						thirdItem[con]=secMenu[k].menu;
						con++;		
					}; 
					html+=this.getFlexHtml(secMenu[k],i,k,thirdMenu,thirdItem,con);
				}				
			} else {
				html+=this.getFlexHtml(this.menuContent[i],i,0);
				if(i==0)firstClk = ucapClk.getClkJs(this.menuContent[i].content,this.menuContent[i].type,
					this.menuContent[i].openType,"");
			}
			html +='</ul>';
			html +='</div>';
			var item = new Ext.Panel({
		        title: title,
		        html: html,
		        autoHeight:true
		    });
		    panelItems[i] = item;
		}		
    
		Ext.getDom("menuTitle").style.display="none";
		
	    var accordion = new Ext.Panel({
	        renderTo:'leftBox',
	        id:"ucapMenu_tree",
	        margins:'5 0 5 5',
	        split:true,
	        height:ucapSession.middleHeight,
	       // autoHeight:true,
	        layout:'accordion',
	        items: panelItems
	    });
		//下面增加下拉的菜单
		for (var i=0;i<thirdMenu.length;i++){		
			this.menuArray[i]=this.addMenu("sub_"+thirdMenu[i],thirdItem[i]);
		}
		
		//2012-09-01 mfdf　by cxifu@linewell.com 实现可以登录后立即打开指定的菜单，此时不执行打开默认菜单的逻辑
		if(firstClk!="" && this.isOpenDefaultItem){
			ucapCommonFun.evalJavaScript(firstClk);
		}
	},
	getFlexHtml:function(obj,i,k){
		var html ="";
		var clk="";
		var icon="";
		var img ="";
		var menuOver="";
		var id= k+'_'+i;
		if (obj.menu!=null){
			icon= this.flxDownIcon+'id="sub_'+id+'"  />';
		} else {
			var otherclk="ucapMenu.setClkCls('subcls_"+id+"')";
			menuOver ="onmouseover='menuMouseover("+i+")'";
			clk=ucapClk.getClk(obj.content,obj.type,obj.openType,otherclk);
		}
		
		html+='<li class="leftContentTextli" onmouseover="this.className=\'leftContentText2\'" onmouseout="this.className=\'leftContentTextli\'">' +
				'<a href="javascript:void(0)" '+menuOver+'  class="leftIconText2" '+clk
				+' qtip="'+obj.tip+'" '+'>';
		var imgIcon ="";
		if (typeof(obj.icon)=="undefined"){
			var no =((k*7)+1) % 93+1;
			imgIcon =ucapSession.appPath+ "uistyle/images/icon/icon_"+no+".gif";
		} else {
			imgIcon = obj.icon;
		}
		html +='<img  align="absmiddle" src="'+imgIcon+ '"/>'+icon;
		html +='<span id="subcls_'+id+'" selectText="cls" >'+obj.text+'</span></a></li>';
		return html;
	},
	/**
	 * 伸缩菜单选中时的处理
	 * @param {} id
	 */
	setClkCls:function(id){
		var allCls = Ext.query("span[selectText=cls]");
		for(var i=0;i<allCls.length;i++){
			allCls[i].className ="";
		}
		Ext.getDom(id).className='leftTextHover';
	},
	/**
	 * 设置树型菜单
	 */
	setTreeMenu:function(){
		Ext.DomHelper.applyStyles(Ext.get("leftBox"),'style="padding:8px 0px 0px 5px;"');
		var url = ucapSession.baseAction+"?type=menu&act=getAllMenu&menuType=tree";
		var root=new Ext.tree.AsyncTreeNode({
			id:"root",	
			expanded: true,		
			text:"UCAP系统"
		});	
		Ext.getDom("leftBox").innerHTML="";
		var tree=new Ext.tree.TreePanel({
			renderTo:"leftBox",
			id:"ucapMenu_tree",
			root:root,
			rootVisible:false,
			autoScroll:true,
			height:ucapSession.middleHeight,
			//autoHeight:true,
			width:185,
			listeners:{
				load:function(node)
				{
					if(node && node.firstChild){
						node.firstChild.select();
						ucapCommonFun.indexOpen.open(node.firstChild.attributes.content,node.firstChild.attributes.type);
					}
				}
			},
			loader: new Ext.tree.TreeLoader({
				dataUrl:url
			})
		});
		var loader = tree.getLoader();
		loader.on("load",function(){
			if (Ext.getDom("menuTitle"))
				Ext.getDom("menuTitle").innerHTML="";
		});
		tree.on("click",function(node){
			//2012-09-01 mfdf　by cxifu@linewell.com 实现可以登录后立即打开指定的菜单，此时不执行打开默认菜单的逻辑
			if(typeof node.attributes.content =="undefined" && !this.isOpenDefaultItem) return;
			ucapCommonFun.indexOpen.open(node.attributes.content,node.attributes.type);
		})
	},
	/**
	 * 简化的菜单点击事件
	 * @param {} id 对应 content
	 * @param {} type  对应 type
	 * @ismenu 有值 说明是菜单中调用
	 */
	clk:function(id,type,isMenu){
		ucapCommonFun.indexOpen.open(id,type,isMenu);
	},
	/**
	 * 
	 * @param {} id
	 * @param {} items
	 * @return {}
	 */
	addMenu:function(id,items,e){
		var menu=new Ext.menu.Menu();
	 	menu.minWidth = 100;	
	 	var menu = new Ext.menu.Menu({
		  items: items
	    });
		var h=Ext.get(id);
		if (typeof(e)=="undefined") e="mouseover";
		h.on(e,function(e){
			menu.show(h);
		});	
		return menu;
	},
	/**
	 * 获取单个快捷方式的内容
	 * @param {} cutobj
	 * @param flag 有值，默认图标和文字都提示
	 * @return {}
	 */
	getCutHtml:function(cutobj,flag){
		if (typeof flag =="undefined") flag="";
		var type = parseInt(cutobj.type,10);
		var clk="";
		if (type==1){
			//是模块
			clk = ucapClk.getClk(cutobj.content,1,1);
		} else if (type==2){	
			//说明是视图
			clk = ucapClk.getClk(cutobj.content,2,1);
		} else if (type==3){
			//说明是JS脚本 
			if (cutobj.content.indexOf("ucapCommonFun.buttonFun.setMainPage")>-1){
				//说明是设置为首页代码
				clk = ucapCommonFun.buttonFun.setMainPage();	
			}else if (cutobj.content.indexOf("ucapCommonFun.buttonFun.changeUserStatus")>-1){
				//说明是改变用户身份的代码，要判断当前用户是否有，如果只是个人，则隐藏此按钮
				if (ucapSession.userJson.appAdmin || ucapSession.userJson.adminDeptUnids!=""){
					//说明是系统管理员或是部门管理员
					var titleinfo="";
					if(ucapSession.userJson.userStatus==3){
						titleinfo="当前用户身份是普通用户";
					} else if (ucapSession.userJson.userStatus==2){
						titleinfo="当前用户身份是部门管理员";
					} else {
						titleinfo="当前用户身份是应用系统管理员";
					}
					cutobj.tip +="  " + titleinfo;
					clk = ' onclick="'+cutobj.content+'"';
				} else{
					return "";
				}
			}/* else if(cuts[i].content.indexOf("ucapCommonFun.buttonFun.userDefine")>-1){
					clk = ucapCommonFun.buttonFun.setUserDefine();
			}*/ else {
				clk = ' onclick="'+cutobj.content+'"';
			}
		} else if (type==4){
			//说明是URL
			clk = ucapClk.getClk(cutobj.content,3,3);
		}
		var navImg="";
		if (clk!=""){
			
			//mdy by wyongjian@linewell.com 2012-08-21
			//IE6使用a href="javascript:void(0)"后导致window.location失效，改为a href="###"
			//解决BUG1237-IE6:分级管理中心的导航栏内容显示不出来
			navImg ='<a href="###" title="'+cutobj.tip+'" '+clk+' >';
			navImgPic ='<img src="'+ucapSession.appPath+cutobj.picturePath+'" align="absmiddle" />';
			if (flag!=""){
				//说明显示图标文字
				navImg += navImgPic + "&nbsp;"+cutobj.name;
			} else {
				if (cutobj.displayType=="01"){
					//说明显示图标
					navImg += navImgPic;
				} else if (cutobj.displayType=="02"){
					//说明只显示文字
					navImg += cutobj.name;
				} else if (cutobj.displayType=="03"){
					//说明显示图标文字
					navImg += navImgPic + "&nbsp;"+cutobj.name;
				}
			}
			navImg+='</a>';//modify by jc
		};
		return navImg;
	}
}
/**
 * 菜单的打开事件 * 
 * @type  1 表示打开模块 2表示打开视图 3表示打开URL 4表示打开文档
 */
 

var menuMouseover =function(obj,num){
	for(var i=0;i<ucapMenu.menuCount;i++){
		if (ucapMenu.menuArray[i])
		  ucapMenu.menuArray[i].hide();
	}
}

/**
 * 根据模块id打开对应的模块页签
 * @param moduleId 模块的Id
 */
function openMenuByModuleId(moduleId){
	//只有页签式菜单才需要有切换的效果
	if(ucapMenu.menuType!=1)return;
	var openingModule;
	var openingModuleIndex;
	for(var i=1;i<(ucapMenu.menuCount+1);i++){
		if(moduleId && Ext.getDom("menu_"+i) && Ext.getDom("menu_"+i).moduleId==moduleId){
			openingModuleIndex=i;
			openingModule=Ext.getDom("menu_"+i);
		}
		if(Ext.getDom("menu_"+i))
			Ext.getDom("menu_"+i).className="menuText1";
		if(Ext.getDom("subMenu_"+i))
			Ext.getDom("subMenu_"+i).className="subMenu1";
	}
	if(openingModule)
		openingModule.className="menuText2";
	if(Ext.getDom("subMenu_"+openingModuleIndex))
		Ext.getDom("subMenu_"+openingModuleIndex).className="subMenu";
}


function pagebartop(){
	var div=Ext.getDom("headerBox");
	var img = Ext.getDom("top");
	if (div.style.display==""){
		img.src=ucapSession.sUserImgPath+"arrowhead_top_2.gif";
		img.alt="展开";
		div.style.display="none";
		ucapCommonFun.isHead = 0;
	}else{
		img.src=ucapSession.sUserImgPath+"arrowhead_top_1.gif";
		img.alt="收缩";
		div.style.display="";
		ucapCommonFun.isHead = 1;
	}
	if (ucapSession.viewOpenType==1) {
		ucapCommonFun.setIframeViewHeight();
	} else {;
		//ucapCommonFun.autoMenuHeight();	
		//设置iframe的高度
		ucapCommonFun.setIframeViewHeight();
		//重新设置表格的高度
		view.setGridHeight();
	}
	//防止视图打开时出现不必要的滚动条mdf by jc 20100609
	document.body.style.overflowY="hidden";
	//document.body.style.overflowY="auto";
	
	try{
		//门户高度调整 add by jc 20120411
		jQuery("#portal_id").ucapPortal("syncSize",{height:ucapSession.middleHeight});
		jQuery("#portal_id").ucapPortal("syncCenter");
	}catch(e){}
	
}
function FunOve(index){
	for(var i=1;i<(ucapMenu.menuCount+1);i++){
		if(Ext.getDom("menu_"+i))
			Ext.getDom("menu_"+i).className="menuText1";
		if(Ext.getDom("subMenu_"+i))
			Ext.getDom("subMenu_"+i).className="subMenu1";
	}
	if(Ext.getDom("menu_"+index))
		Ext.getDom("menu_"+index).className="menuText2";
	if(Ext.getDom("subMenu_"+index))
		Ext.getDom("subMenu_"+index).className="subMenu";
}

//图片滚动列表 
var Speed = 10; //速度(毫秒) 
var Space = 5; //每次移动(px) 
var PageWidth = 111; //翻页宽度 
var fill = 0; //整体移位 
var MoveLock = false; 
var MoveTimeObj; 
var Comp = 0; 
function GetObj(objName){
	return Ext.getDom(objName);
} 
function ISL_GoUp(){ //上翻开始 
	if(MoveLock) return; 
	MoveLock = true; 
	MoveTimeObj = setInterval('ISL_ScrUp();',Speed); 
} 
function ISL_StopUp(){ //上翻停止 
	clearInterval(MoveTimeObj); 
	if(GetObj('ISL_Cont').scrollLeft % PageWidth - fill != 0){ 
		Comp = fill - (GetObj('ISL_Cont').scrollLeft % PageWidth); 
		CompScr(); 
	} else{ 
		MoveLock = false; 
	} 
} 
function ISL_ScrUp(){ //上翻动作 
	GetObj('ISL_Cont').scrollLeft -= Space ; 
} 
function ISL_GoDown(){ //下翻 
	clearInterval(MoveTimeObj); 
	if(MoveLock) return; 
	MoveLock = true; 
	ISL_ScrDown(); 
	MoveTimeObj = setInterval('ISL_ScrDown()',Speed); 
} 
function ISL_StopDown(){ //下翻停止 
	clearInterval(MoveTimeObj); 
	if(GetObj('ISL_Cont').scrollLeft % PageWidth - fill != 0 ){ 
		Comp = PageWidth - GetObj('ISL_Cont').scrollLeft % PageWidth + fill; 
		CompScr(); 
	}else{ 
		MoveLock = false; 
	} 
} 
function ISL_ScrDown(){ //下翻动作 
	GetObj('ISL_Cont').scrollLeft += Space ; 
} 
function CompScr(){ 
	var num; 
	if(Comp == 0){MoveLock = false;return;} 
	if(Comp < 0){ //上翻 
		if(Comp < -Space){ 
		   Comp += Space; 
		   num = Space; 
		}else{ 
		   num = -Comp; 
		   Comp = 0; 
		} 
		GetObj('ISL_Cont').scrollLeft -= num; 
		setTimeout('CompScr()',Speed); 
	}else{ //下翻 
		if(Comp > Space){ 
		   Comp -= Space; 
		   num = Space; 
		}else{ 
		   num = Comp; 
		   Comp = 0; 
		} 
		GetObj('ISL_Cont').scrollLeft += num; 
		setTimeout('CompScr()',Speed); 
	} 
	var n = ucapMenu.menuCount-ucapMenu.menuIconNum;
	if(GetObj('ISL_Cont').scrollLeft >= n * PageWidth ){
		GetObj("rightBotton").style.display="none";
	} else {
		GetObj("rightBotton").style.display="";
	}
	if(GetObj('ISL_Cont').scrollLeft <= 0){
		GetObj("leftBotton").style.display="none";
	} else {
		GetObj("leftBotton").style.display="";
	}
} 

