var viewBaseInfo={
	viewId:"",            //视图标识
	formId:"",            //表单标识
	sourceType:"",        //来源类型
	sourceUnid:"",        //来源类型标识
	formType:"",          //表单类型
	isSonView:false,      //是否有子视图
	sonViewIds:"",        //子视图标识
	previewType:"",        //预览方式
	categoryType:"",       //视图分类中的位置，如果视图分类为“00”则表示为没有分类
	checkPosition:"",      //选项列位置
	pageSize:20,
	viewType:"",           //视图类型
	openJs:"",             //打开的js函数
	isFlowItem:false,      //是否有流程字段
	advancedJson:null,     //高级查询的json配置
	categoryItemType:"",   //分类字段的类型
	categoryItemName:"",   //分类字段的名称
	categoryItemValue:"",  //分类字段的值
	isEdit:false,          //是否直接进入编辑状态
	formItemsJson:null,     //视图编辑中json格式的数据
	loadJs:"",              //视图加载完执行的js函数
	addRowjs:"",            //可编辑表格增加行的js函数
	onlysaveSelected:false,  //只保存选中行,为true只保存选中，false的话保存所有行
	operationPos:-1,          //操作列所在的位置
	opendocType:"",           //打开文档的方式   yjy 2010-5-10 add
	newdocType:"",             //新建文档的方式   yjy 2010-5-10 add
	previewSize:300,				//预览大小	add by jc 20100612
	searchBarState:0,				//搜索栏的隐藏显示  0隐藏 1显示 add by fsm  2010.9.14
	jspUrl:""	,					//显示的JSP名称
	isSimpleLink:false			//是否以单列打开
}

var view={
    
	viewType:"01",
	
	//actionParams:{"type":"getView","viewId:":viewId,"punid":punid},
	viewId:"",
	
	viewUrl:"",//目前主要用于文档以当前页面打开方式，存储URL或者js事件
	
	renderto:"",
	
	hasTab:false,
	
	//dataUrl:"http://localhost:8081/xmmss/resJson2.jsp?1=1",
	dataUrl:ucapSession.baseAction+"?type=getView&action=getData&isHavDp="+globalVariables.is_hav_data_permission+"&isHavDr="+globalVariables.is_hav_data_role,
	
	checkPosition:"",
	
	width:822,
	
	json:null,
	
	displayName:"",
	
	viewBaseInfos:null,
	
	namePrefix:"viewdiv_",
	
	pageSize:10,
	
	index:0,

	sqlLikeKey:'~!@0~!@5',        //SQL中like的关键字
	
	sqlAnd:'~!@AND@!~',           //SQL并且的关键字(AND)连接
	
	sqlOr:'~!@OR@!~',               //SQL并且的关键字(OR)连接
	
	sqlLTEQ:'~!@0~!@2',               //SQL并且的关键字(<=)连接
	
	sqlGTEQ:'~!@0~!@1',               //SQL并且的关键字(>=)连接
	
	sqlEQ:'~!@0~!@0',               //SQL并且的关键字(=)连接
	
	fieldDbType:'~!@DB@!~',         //数据库字段
	
	fieldConstType:'~!@CL@!~',      //常量字段
	
	fieldEndPrefix:'~!@E@!~',        //结束符
	
	currentGridIndex:0,              //当前选中表格的索引
	
	purl:"",                         //上级父的url标识
	
	mouseOverIndex:-1,               //鼠标移动所在行识别
	
	outOtherHeight:0,                //外部其它资源高度,如用户管理用户视图上面有了按钮，其相应的高度应该发生变化
	
	pcateUrl:"",                     //分类查询传入的值
	
	isSingle:"",           		     //是否为单选
	
	recordSplit:"",         		 //行分隔符号
	
	colSplit:"",             		 //列分隔符号
	
	isTab:"",                        //是否来自页签
	
	noTbar:"",                       //没有按钮区
	
	noBbar:"",                       //没有分页
	
	gridHeight:0,                     //表格高度
	
	gridWidth:0,                      //表格宽度
	
	stores:null,                      //数据存储容器
	
	advPrefix:"$_A_$",                //作为高级查询的前缀
	
	moduleUnid:"",                    //业务模块标识
	
	enableDragDrop:false,	//GridPanel行的拖动 add by jc 20110303
	
	deleteViewData:[],		//可编辑表格删除的数据 add by fsm 20110428
	
	
	iframePreId : "ifr",    //加iframe时ID的前缀add by cguangcong@linewell.com 2011-09-23
	
	commonSelectFieldNamePrefix:"~display~ids~",//编辑表格通用选择框字段对象名称后缀 add by jc 20120228
	/**
	 * 根据视图标识进行初始化视图
	 * 
	 * @param {} viewids 视图标识
	 * 
	 * @param rendprefix 绚烂位置的名称，如位置为“view_0”,那么rendprefix就为“view_”
	 */
	initview:function(viewid,render,noQuery,noPreview,noSelfConfig){
		var viewIds = viewid.split(",");
		//if(rendprefix!=undefined && rendprefix!="")view.namePrefix = rendprefix;
		for(var j=0;j<viewIds.length;j++){
			
			if(undefined==viewIds[j] || viewIds[j]==""){
				continue;
			}
			if(view.getIndexFromBaseInfo(viewIds[j])>=0)return;
			
			var initResult = view.init(viewIds[j]);
			
			if(!initResult)return;
			
			var index = view.viewBaseInfos.length-1;
			
			//判断是视图展示类型 add by jc 
			if(view.viewBaseInfos[index].viewType=="04"){
				//从后台获取视图记录数,记录UNID,表单对应的HTML
				view.createFormGridDiv(viewIds[j],index,render);
				return;
				//view.viewBaseInfos[index].viewType="01";
			}
			
			//视图预览 add by jc 20100609
			var previewType = view.viewBaseInfos[index].previewType;
			//打开方式为普通并且视图预览方式存在，并且是否预览为空
			if(ucapHeader.openStyle==2 && (!noPreview || noPreview==true) && previewType && previewType!="00"){
				initJspView(viewid,render,view.purl,noQuery,true,noSelfConfig);
				return;
			}
			
			view.createGridDiv(index,render);
			
	    	//初始化简单查询
	    	if("undefined"!=noQuery && (noQuery==true || noQuery=="true")){
	    		var queryDiv = Ext.getDom("search");
	    		if(undefined!=queryDiv && null!=queryDiv){
	    			queryDiv.style.display="none";
	    		}
	    	}else{
	    		view.initSimpleSelect(view.json,index);
				view.initAdvancedSelect(view.json,index);
	    	}
	    	
	    	/** mdy by cjianyan 此处代码不因此在这里，因放在view.viewBaseInfos[index].categoryType=="03" && index==0)
	    	//搜索栏状态的隐藏显示 add by fsm 2010.9.14
			var searchDiv = Ext.getDom("search");
		 	if(undefined!=searchDiv && null!=searchDiv){
				 if((view.viewBaseInfos[index].categoryType=="03" && index==0)||(view.json.query && view.json.query.querySimpleItems&&view.json.query.querySimpleItems.length>0)||(view.json.query && view.json.query.queryAdvancedItems&&view.json.query.queryAdvancedItems.length>0))
				 {
			    	searchDiv.style.display="";
			    	viewBaseInfo.searchBarState=1;
				 }
				 else
				 {	 
				 	searchDiv.style.display="none";
				 	viewBaseInfo.searchBarState=0;
				 }
			 }//end
	    	*/
	    	
			if(view.viewBaseInfos[index].viewType=="02"){//列表型视图
				view.loadOtherGrid(viewIds[j],index,"",noPreview,noSelfConfig);
			}else if(view.viewBaseInfos[index].viewType=="03"){//图文并茂型视图
				view.loadOtherGrid(viewIds[j],index,"",noPreview,noSelfConfig);
			}else{//普通类型视图
				view.loadCommonGrid(viewIds[j],index,noPreview,noSelfConfig);
			}
			//中间树形
			if(view.viewBaseInfos[index].categoryType=="02" && index==0){//只有第一个视图才进行建立视图分类
				viewTree.init(view.viewBaseInfos[index].viewId,'viewCategories',index,view.viewBaseInfos[index].categoryItemType,view.viewBaseInfos[index].categoryItemName);
			}
			else if(view.viewBaseInfos[index].categoryType=="03" && index==0){
				// add by cjianyan 2011-3-31 显示下拉树形 搜索栏显示
				var searchDiv = Ext.getDom("search");
				searchDiv.style.display="";
			    viewBaseInfo.searchBarState=1;
			    //end
			    userComboBoxTree.init(view.viewBaseInfos[index].viewId,'viewCategories',index,view.viewBaseInfos[index].categoryItemType,view.viewBaseInfos[index].categoryItemName,view.viewBaseInfos[index].categoryItemValue);
			}
			//采用递归进行创建子视图
			if(view.viewBaseInfos[index].sonViewIds!=""){
				view.initview(view.viewBaseInfos[index].sonViewIds,render,noQuery,noPreview,noSelfConfig);
			}
		}
	},
	
	/**
	 * 进行视图刷新
	 */
	refreshView:function(viewid,render,noQuery,noPreview,noSelfConfig){
		var viewIds = viewid.split(",");
		for(var j=0;j<viewIds.length;j++){
			
			if(undefined==viewIds[j] || viewIds[j]==""){
				continue;
			}
			var index = view.getIndexFromBaseInfo(viewid);
			var initResult = view.init(viewIds[j],index);
			if(!initResult)return;
			view.createGridDiv(index,render);
	    	//初始化简单查询
	    	if("undefined"!=typeof(noQuery) && (noQuery==true || noQuery=="true")){
	    		var queryDiv = Ext.getDom("search");
	    		if(undefined!=queryDiv && null!=queryDiv){
	    			queryDiv.style.display="none";
	    		}
	    	}else{
	    		view.initSimpleSelect(view.json,index);
				view.initAdvancedSelect(view.json,index);
	    	}	    	
			if(view.viewBaseInfos[index].viewType=="02"){
				view.loadOtherGrid(viewIds[j],index,"",noPreview,noSelfConfig);
			}else if(view.viewBaseInfos[index].viewType=="03"){//列表型视图
				view.loadOtherGrid(viewIds[j],index,"",noPreview,noSelfConfig);
			}else{//图文并茂型视图
				view.loadCommonGrid(viewIds[j],index,noPreview,noSelfConfig);
			}
			//中间树形
			if(view.viewBaseInfos[index].categoryType=="02" && index==0){//只有第一个视图才进行建立视图分类
				viewTree.init(view.viewBaseInfos[index].viewId,'viewCategories',index,view.viewBaseInfos[index].categoryItemType,view.viewBaseInfos[index].categoryItemName);
			}
			else if(view.viewBaseInfos[index].categoryType=="03" && index==0){
				// add by cjianyan 2011-3-31 显示下拉树形 搜索栏显示
				var searchDiv = Ext.getDom("search");
				searchDiv.style.display="";
			    viewBaseInfo.searchBarState=1;
			    //end
			    userComboBoxTree.init(view.viewBaseInfos[index].viewId,'viewCategories',index,view.viewBaseInfos[index].categoryItemType,view.viewBaseInfos[index].categoryItemName,view.viewBaseInfos[index].categoryItemValue);
			}
			//采用递归进行创建子视图
			if(view.viewBaseInfos[index].isSonView && view.viewBaseInfos[index].sonViewIds!=""){
				view.initview(view.viewBaseInfos[index].sonViewIds,render,noQuery,noPreview,noSelfConfig);
			}
		}
		view.deleteViewData=[];
	},
	
	/**
	 * 判断视图id是否已在列表中
	 *  
	 * @param {} viewId
	 */
	getIndexFromBaseInfo:function(viewId){
		var result = -1;
		if(undefined!=view.viewBaseInfos && view.viewBaseInfos.length>0){
			for(var i=0;i<view.viewBaseInfos.length;i++){
				var vbi = view.viewBaseInfos[i];
				if(vbi.viewId==viewId){
					result = i;
					break;
				}
			}
		}
		
		return result;
	},
	
	/**
	 * 创建视图容器，div
	 * @param {} index 视图位置索引
	 * @param {} render reader位置
	 */
	createGridDiv:function(index,render){
		//创建表格的div
		var mainDiv = document.getElementById(render);
		mainDiv.innerHTML="";
		if(view.viewBaseInfos[0].categoryType=="02"){
			var mainLeft = Ext.getDom("viewCategories");
			if(undefined==mainLeft){
				mainLeft = document.createElement("div");
				//mainLeft.style="overflow:auto; height:590px;border:1px solid #c3daf9;"
				mainLeft.id = "viewCategories";
				mainDiv.appendChild(mainLeft);
			}
		}
		var mainRight = Ext.getDom("mainRight");
		if(undefined==mainRight){
			mainRight = document.createElement("div");
			mainRight.id = "mainRight";
			mainRight.style.styleFloat="left";
			//防止有视图分类时视图加载到分类底下
			//mainRight.style.width="100%";
			mainDiv.appendChild(mainRight);
		}
		//普通搜索
		var searchNewDiv = document.createElement("div");
		var searchNewDivHtml = "<div id=\"searchLeft\" class=\"searchLeft\"></div>";
		
		searchNewDivHtml+="<div id=\"searchBox\" class=\"searchBox\"><div id=\"sim_searchBox\" style=\"float:left\"><img src=\""+ucapSession.sUserImgPath+"icon_search.gif\" align=\"absmiddle\" /> 搜索：";
		searchNewDivHtml+="<input name='keyword' type='text' class='searchinputbox' onkeydown='view.kdSearch("+index+")' id='keyword' onmousedown=\"if(this.value=='请输入搜索关键字')this.value=''\" value='请输入搜索关键字' size='20' />";
		searchNewDivHtml+=" 在 <select name=\"searchName\" id='simpleSearchSelect_"+index+"'>";
		searchNewDivHtml+="<option value='0'>请选择搜索范围</option>";
		searchNewDivHtml+="</select> <input type=\"button\" value=\"搜索\" id=\"simpleSearch_"+index+"\" class=\"btn1\" onclick=\"view.search("+index+")\"></div><div class=\"adv_sch_box\"> <input type=\"button\" class=\"btn1\" id=\"advancedSearch_"+index+"\" onclick=\"view.setSearchMore(this,"+index+")\" value=\"▼高级搜索\" /></div></div>";
		searchNewDiv.innerHTML = searchNewDivHtml;		
		searchNewDiv.id="search";
		searchNewDiv.className="search";//add by jc 20091222
		mainRight.appendChild(searchNewDiv);
				
		//高级搜索
		var searchMoreNewDiv = document.createElement("div");
		searchMoreNewDiv.id = "searchMore_"+index;
		searchMoreNewDiv.style.display="none";
		mainRight.appendChild(searchMoreNewDiv);
		//创建视图div
		var gridDiv = document.createElement("div");
		gridDiv.id = view.namePrefix+index;
		mainRight.appendChild(gridDiv);
		//创建表单div
//		var formDiv = document.createElement("div");
//		formDiv.id = "formdiv_"+index;
//		formDiv.style.width="100%";
//		formDiv.style.border="#BAD1D7 1px solid";
//		mainRight.appendChild(formDiv);
	},
	/**
	 * 组装视图类型为表单列表方式时的逻辑
	 * @param {} index
	 * @param {} render
	 * @author JC_Seekart
	 */
	createFormGridDiv:function(curViewId,index,render){
		//从后台获取视图记录数,记录UNID,表单对应的HTML
		if(view.viewBaseInfos[index].formType=="03"){
			alert("组合表单不支持视图表单列表方式展示,请重新配置视图!");
			return;
		}
		var url = view.getViewDataUrl(curViewId);
		url += "&viewType=getViewFormList";
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var viewFormList = Ext.decode(conn.responseText);
		
		if(viewFormList){
			var data = viewFormList.root;
			var formType = viewFormList.formType;
			var formUnid = viewFormList.formUnid;
			var formPrimary = viewFormList.formPrimary;
			//初始化全局变量，用于新增，删除及其它扩展方法，只支持最后一个调用到此方法的视图
			view.viewFormManager.curViewId = curViewId;
			view.viewFormManager.viewFormList = viewFormList;
			//加载默认模板，以后将实现自定义方法
			var embellishJsName = view.viewBaseInfos[index].embellishJsName;
			var html = "";
			if(embellishJsName){
				try{
					//自定义渲染
					html = eval(embellishJsName+"(data,curViewId,viewFormList,formPrimary)");
				}catch(e){
					html = view.viewFormManager.loadDefModel(data,curViewId,viewFormList,formPrimary);
					Ext.Msg.alert("系统提示信息","自定义渲染事件出错，采用默认加载方式!");
				}
			}else{
				html = view.viewFormManager.loadDefModel(data,curViewId,viewFormList,formPrimary);
			}
			$(render).innerHTML = html;
			view.viewFormManager.setHeight();
			//视图加载完毕后执行相应的函数 add by jc 20100919
			if(null!=view.viewBaseInfos[index].loadjs && view.viewBaseInfos[index].loadjs!=""){
				if(view.viewBaseInfos[index].loadjs.indexOf(")")>0){
					eval(view.viewBaseInfos[index].loadjs);
				}else{
					eval(view.viewBaseInfos[index].loadjs+"()");
				}
			}
			//渲染文档并加载文档旧数据
			view.viewFormManager.loadFormData(data,curViewId,formType,formUnid,formPrimary);
		}
	},
	/**
	 * 先进性初始化
	 */
	init:function(currentViewId,index){
		
		var url =ucapSession.baseAction;
		url+="?viewId="+currentViewId+"&type=getView&rand="+Math.random();
		//加入视图打开中的其他参数，以便在逻辑可进行调用 add by llp 2010-07-15
		var urlsp = url.split("?");
		url = url.substring(urlsp[0].length+1);
		var urljson = Ext.urlDecode(url);
		var purljson = Ext.urlDecode(view.purl);
		Ext.apply(purljson,urljson);
		url = urlsp[0]+"?"+Ext.urlEncode(purljson);
		//end
		
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		view.json = Ext.util.JSON.decode(conn.responseText);
		var exresult = ucapCommonFun.dealException(view.json);
		if(!exresult)return false;
		
		if(null==view.viewBaseInfos){
			view.viewBaseInfos = new Array();
		}
		//alert(view.json.unid);
		//new一个对象，以免是对对原有值的替换
		var viewBaseInfo = new Object();
		viewBaseInfo.viewId = view.json.punid;
		viewBaseInfo.formId = view.json.formUnid;
		viewBaseInfo.formType = view.json.formType;
		viewBaseInfo.sourceType = view.json.sourceType;
		viewBaseInfo.sourceUnid = view.json.sourceUnid;
		viewBaseInfo.previewType = view.json.previewType;
		viewBaseInfo.isSonView = view.json.sonView;
		viewBaseInfo.pageSize = view.json.pageSize;
		if(isNaN(viewBaseInfo.pageSize)){
			viewBaseInfo.pageSize=0;
		}else if(parseInt(viewBaseInfo.pageSize)<=0){
			viewBaseInfo.pageSize = 20;
		}
		viewBaseInfo.categoryType = view.json.categories;
		viewBaseInfo.checkPosition = view.json.checkPosition;
		viewBaseInfo.sonViewIds = view.json.sonViewUnids;
		viewBaseInfo.viewType = view.json.type;
		viewBaseInfo.openJs = view.json.openJs;
		//add by jc 20100527
		viewBaseInfo.embellishJsName = view.json.embellishJsName;
		viewBaseInfo.saveValidateJsName = view.json.saveValidateJsName;
		viewBaseInfo.previewSize = view.json.previewSize;
		//add by jc 20100915
		viewBaseInfo.jspUrl = view.json.jspUrl;
		viewBaseInfo.isSimpleLink = view.json.simpleLink;
		
		if("undefined"!=typeof(view.json.flowItem)){
			viewBaseInfo.isFlowItem = view.json.flowItem;
		}
		
		if(undefined==view.json.categoryItems || view.json.categoryItems.length==0){
			viewBaseInfo.categoryType = "00";
		}else{
			viewBaseInfo.categoryItemType = view.json.categoryItems[0].itemType;
			viewBaseInfo.categoryItemName = view.json.categoryItems[0].itemCn;
			viewBaseInfo.categoryItemValue = view.json.categoryItems[0].itemValue;
			if(viewBaseInfo.categoryType==""){
				viewBaseInfo.categoryType="01";
			}
		}
		
		var isEdit=1; //默认为可编辑  -1不能查看 0 只读 1可编辑
		//如果是子视图，则文档的打开权限要根据父文档的权限来判断
		if (window.parent && window.parent._UcapForm && window.parent._UcapForm.cfg){
			if("undefined"!=typeof(window.parent._UcapForm.cfg.isRead) && null!=window.parent._UcapForm.cfg.isRead){
				isEdit = window.parent._UcapForm.cfg.isRead;	
			}
		}
		//如果父文档不可编辑的话，则视图也默认不可编辑
		if(typeof(isEdit)!="undefined" && isEdit==1){
			viewBaseInfo.isEdit = view.json.edit;
		}else{
			viewBaseInfo.isEdit = false;
		}
		
		//视图加载完毕的js函数
		viewBaseInfo.loadjs=view.json.loadjs;
		viewBaseInfo.addRowjs = view.json.addRowjs;
		viewBaseInfo.onlysaveSelected = view.json.onlysaveSelected;
		
		//yjy 2010-5-10
		viewBaseInfo.opendocType = view.json.opendocType;
		viewBaseInfo.newdocType  = view.json.newdocType;
		
		//设置自定义视图文档打开方式add by jc 20100622
		//2011-12-07 modify by xhuatang@linewell.com 更改内嵌iframe直接获取顶层窗口的bug
		var winObj = window.top;
		if(typeof(winObj.ucapSession) === "undefined"){
			winObj = window;
		}
		winObj.ucapSession.setViewCache(viewBaseInfo.viewId,"opendocType",viewBaseInfo.opendocType);
		winObj.ucapSession.setViewCache(viewBaseInfo.viewId,"newdocType",viewBaseInfo.newdocType);
		
		if(undefined==index || index<0){
			view.viewBaseInfos[view.viewBaseInfos.length] = viewBaseInfo;
		}else{
			view.viewBaseInfos[index] = viewBaseInfo;
		}
		
		return true;
	},
	
	/**
	 * 初始化简单查询
	 * @param {} json
	 */
	initSimpleSelect:function(json,index){
		var query = json.query;
		if(undefined==query)return;
		var simpleItem = query.querySimpleItems;
		if(undefined==simpleItem)return;
		var simpleSearchSelect = Ext.getDom("simpleSearchSelect_"+index);
		if(simpleItem && simpleItem.length==0){
			$("sim_searchBox").style.display="none";
		}else{
			$("sim_searchBox").style.display="";
			viewBaseInfo.searchBarState=1;
		}
		for(var i=0;i<simpleItem.length;i++){
			ucapCommonFun.addOption(simpleSearchSelect,simpleItem[i].itemNameEn,simpleItem[i].itemNameCn);
		}
	},
	
	/**
	 * 初始化高级查询 
	 * 更改视图高级查询，改成与三级页面一样的绑定方式 yjy 2010 4 3
	 * @param {} json
	 */
	initAdvancedSelect:function(json,index){
		/*
		var query = json.query;
		if("undefined"==typeof(query) || query==null){
			var searchDiv = Ext.getDom("search");
			searchDiv.style.display="none";
			return;
		}
		var advancedItem = query.queryAdvancedItems;
		
		if("undefined"==typeof(advancedItem) || advancedItem==null || advancedItem.length<1){
			Ext.getDom("advancedSearch_"+index).style.display="none";
			return;
		}
		view.viewBaseInfos[index].advancedJson=advancedItem;
		var advancedDiv = Ext.getDom("searchMore_"+index);
		
		var tri = 0;
		var html ="";
		for(var i=0;i<advancedItem.length;i++){
			var inputHtml = "";
			if(advancedItem[i].hasBegin){
				inputHtml +="<span> 从 <input type=\"text\" id='"+advancedItem[i].itemNameEn+"_1' name='"+advancedItem[i].itemNameEn+"_1' ";
				inputHtml +=" sourceType='"+advancedItem[i].dataType+"' source='"+advancedItem[i].dataSource+"'" +
						" columnMap='"+advancedItem[i].columnMap+"' dictionaryType='"+advancedItem[i].dictionaryType+"' "+
						" isSingle='"+advancedItem[i].isSingle+"' /></span>";
				inputHtml +="<span> 至 <input type=\"text\" id='"+advancedItem[i].itemNameEn+"_2' name='"+advancedItem[i].itemNameEn+"_2' ";
				inputHtml +=" sourceType='"+advancedItem[i].dataType+"' source='"+advancedItem[i].dataSource+"'" +
						" columnMap='"+advancedItem[i].columnMap+"' dictionaryType='"+advancedItem[i].dictionaryType+"' "+
						" isSingle='"+advancedItem[i].isSingle+"' /></span>";
			}else{
				inputHtml +="<input class=inputbox type=\"text\" id='"+advancedItem[i].itemNameEn+"' name='"+advancedItem[i].itemNameEn+"' ";
				inputHtml +=" sourceType='"+advancedItem[i].dataType+"' source='"+advancedItem[i].dataSource+"'" +
						" columnMap='"+advancedItem[i].columnMap+"' dictionaryType='"+advancedItem[i].dictionaryType+"' "+
						" isSingle='"+advancedItem[i].isSingle+"' />";
			}
			if(tri%2==0){
				html+="<tr>";
				html+="<th height='20' class=\"head\">"+advancedItem[i].itemNameCn+"</th>";
				if((advancedItem.length<=(i+1)) || advancedItem[i+1].hasBegin){
					html+="<td colspan='3'>";
					html+=inputHtml;
					html+="</td>";
					html+="</tr>"
					tri=tri+2;
				}else{
					if(advancedItem[i].hasBegin){
						html+="<td colspan='3'>";
						html+=inputHtml;
						html+="</td>";
						tri=tri+2;
					}else{
						html+="<td>"+inputHtml+"</td>"
						tri=tri+1;
					}
				}
			}else{
				html+="<th height='20' class=\"head\">"+advancedItem[i].itemNameCn+"</th>";
				html+="<td>"
				html+=inputHtml+"</td>";
				html+="</tr>";
				tri=tri+1;
			}
		}
		if(html!=""){
			if(html.substring(html.length-5,html.length)!="</tr>"){
				html=html.substring(0,html.length-5);
			}else{
				html=html.substring(0,html.length-10);
			}
			html +="</td></tr><tr><td colspan='4'  align='right'><input type='button' class='btn1' value='搜索' onclick='view.advancedSearch("+index+")'/>&nbsp;&nbsp;<input type='button' class='btn1' value='重置'  qtip='重置视图数据'   onclick='view.advancedSeaReset("+index+")'/>&nbsp;</td></tr>";
		}
		html = "<table class=\"table2\"><COL width=\"15%\"><COL width=\"35%\"><COL width=\"15%\"><COL width=\"35%\">"+html;
		html+="</table>";
		advancedDiv.innerHTML = html;
		_UcapForm.tool.embellishForm("searchMore_"+index);
		*/
/*		*/
		var query = json.query;
		if("undefined"==typeof(query) || query==null){
			var searchDiv = Ext.getDom("search");
			searchDiv.style.display="none";
			return;
		}
		var advancedItem = query.queryAdvancedItems;
		
		if("undefined"==typeof(advancedItem) || advancedItem==null || advancedItem.length<1){
			Ext.getDom("advancedSearch_"+index).style.display="none";
			//增加代码 用于判断是否显示搜索栏
			var querySimpleItems = query.querySimpleItems;
			if("undefined"==typeof(querySimpleItems) || querySimpleItems==null || querySimpleItems.length<1){
				var searchDiv = Ext.getDom("search");
				searchDiv.style.display="none";
			}//end
			return;
		}
		else
		{//当有高级查询的时候，设置searchBarState=1，表示有搜索栏，视图必须减去相应的高度 add  by fsm
			viewBaseInfo.searchBarState=1;
		}
		
		view.viewBaseInfos[index].advancedJson=advancedItem;
		
		var advancedDiv = Ext.getDom("searchMore_"+index);
		
		var tri = 0;
		var html ="";//<table class='table2'>
		var timeFormat = "yyyy-MM-dd";
		for(var i=0;i<advancedItem.length;i++){
			advancedItem[i].itemNameEn = view.advPrefix+advancedItem[i].itemNameEn;
			var inputHtml = "";
			timeFormat = "yyyy-MM-dd";
			if(advancedItem[i].hasBegin){
				if("undefined"!=typeof(advancedItem[i].dataType) && (advancedItem[i].dataType=="04" || advancedItem[i].dataType=="05")){
					inputHtml+="&nbsp;从&nbsp;&nbsp;<input type=\"text\" name='"+advancedItem[i].itemNameEn+"_1' id='"+advancedItem[i].itemNameEn+"_1' class=\"inputsearchbox\" readOnly/>";
					//add by llp 2012-04-20
					//增加时间格式设置
					if(advancedItem[i].dataType=="05")timeFormat=timeFormat+" HH:mm:ss";
					
					//2012-06-20 mdf by cxifu@linewell.com
					//给起始日期设置最大日期为结束日期的值－maxDate（起始日期不得大于结束日期）
					inputHtml+="<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""+advancedItem[i].itemNameEn+"_1\",dateFmt:\""+timeFormat+"\",maxDate:$(\""+advancedItem[i].itemNameEn+"_2\").value});' src='"+ucapSession.appPath+"js/ucap/calendar/skin/datePicker.gif' width=16 align=absMiddle/>";
					inputHtml+="&nbsp;&nbsp;到&nbsp;&nbsp;<input type=\"text\" name='"+advancedItem[i].itemNameEn+"_2' id='"+advancedItem[i].itemNameEn+"_2' class=\"inputsearchbox\" readOnly/>";
					//mdy by llp 2012-04-20
					//设置放到前面
					//if(advancedItem[i].dataType=="05")timeFormat=timeFormat+" HH:mm:ss";
					
					//2012-06-20 mdf by cxifu@linewell.com
					//给结束日期设置最小日期为开始日期的值－minDate（结束日期不得小于开始日期）
					inputHtml+="<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""+advancedItem[i].itemNameEn+"_2\",dateFmt:\""+timeFormat+"\",minDate:$(\""+advancedItem[i].itemNameEn+"_1\").value});' src='"+ucapSession.appPath+"js/ucap/calendar/skin/datePicker.gif' width=16 align=absMiddle/>";
				}else{
					inputHtml+="&nbsp;从&nbsp;&nbsp;<input type=\"text\" name='"+advancedItem[i].itemNameEn+"_1' id='"+advancedItem[i].itemNameEn+"_1' class=\"inputsearchbox\"/>";
					inputHtml+="&nbsp;&nbsp;到&nbsp;&nbsp;<input type=\"text\" name='"+advancedItem[i].itemNameEn+"_2' id='"+advancedItem[i].itemNameEn+"_2' class=\"inputsearchbox\"/>";
				}			
			}else{
				if("undefined"!=typeof(advancedItem[i].dataType) && advancedItem[i].dataType=="20"){
					inputHtml+="<input type=\"hidden\" id='"+advancedItem[i].itemNameEn+"' name='"+advancedItem[i].itemNameEn+"' class=\"inputsearchbox\"/>";
					inputHtml+="<input type=\"text\" id='"+advancedItem[i].itemNameEn+"_Cn_' name='"+advancedItem[i].itemNameEn+"_Cn_' class=\"inputred\" readOnly/>";
					inputHtml+="<input type='button' class='btn1' name='btnselect' value='选择' onclick=\""+"selectDataSD('"+advancedItem[i].dataSource+"',1,'"+advancedItem[i].itemNameEn+"')"+"\"/>";
				}else if("undefined"!=typeof(advancedItem[i].dataType) && advancedItem[i].dataType=="03"){
					inputHtml+="<select id='"+advancedItem[i].itemNameEn+"' name='"+advancedItem[i].itemNameEn+"'>"+advancedItem[i].optionValue+"</select>";
				}else if("undefined"!=typeof(advancedItem[i].dataType) && advancedItem[i].dataType=="02"){
					inputHtml+="<input type=\"text\" id='"+advancedItem[i].itemNameEn+"' name='"+advancedItem[i].itemNameEn+"' class=\"inputsearchbox\"/>";
					//inputHtml+="<input type=\"text\" id='"+advancedItem[i].itemNameEn+"_Cn_' name='"+advancedItem[i].itemNameEn+"_Cn_' class=\"inputred\" readOnly/>";
					//selectView(_ss,fieldNames,nameEn,_t,_ev,_sTitle,_purl,_recordSplitl,_colSplit,_sWidth,_sHeight);
					inputHtml+="<input type='button' class='btn1' name='btnselect' id='btnselect' value='选择' onclick=\""
									+"selectView.call($('"+advancedItem[i].itemNameEn+"'),'"+advancedItem[i].dataSource+"','"+advancedItem[i].columnMap+"','"
									+advancedItem[i].itemNameEn+"')"+"\"/>";		//by@cgc   2011-7-27
				}else{
					inputHtml+="<input type=\"text\" id='"+advancedItem[i].itemNameEn+"' name='"+advancedItem[i].itemNameEn+"' class=\"inputsearchbox\"/>";
				}
				if("undefined"!=typeof(advancedItem[i].dataType) && (advancedItem[i].dataType=="04" || advancedItem[i].dataType=="05")){
					//add by llp 2012-04-20
					//增加时间格式设置
					if(advancedItem[i].dataType=="05")timeFormat=timeFormat+" HH:mm:ss";
					inputHtml+="<IMG style='CURSOR: pointer' onclick='WdatePicker({el:\""+advancedItem[i].itemNameEn+"\",dateFmt:\""+timeFormat+"\"});' src='"+ucapSession.appPath+"js/ucap/calendar/skin/datePicker.gif' width=16 align=absMiddle/>";
				}
			}
			if(tri%2==0){
				html+="<tr>";
				html+="<th height='20' class=\"head\">"+advancedItem[i].itemNameCn+"</th>";
				if((advancedItem.length<=(i+1)) || advancedItem[i+1].hasBegin){
					html+="<td colspan='3'>";
					html+=inputHtml;
					html+="</td>";
					html+="</tr>"
					tri=tri+2;
				}else{
					if(advancedItem[i].hasBegin){
						html+="<td colspan='3'>";
						html+=inputHtml;
						html+="</td>";
						tri=tri+2;
					}else{
						html+="<td>"+inputHtml+"</td>";
						tri=tri+1;
					}
				}
			}else{
				html+="<th height='20' class=\"head\">"+advancedItem[i].itemNameCn+"</th>";
				html+="<td>";
				html+=inputHtml+"</td>";
				html+="</tr>";
				tri=tri+1;
			}
		}
		
		if(html!=""){
			if(html.substring(html.length-5,html.length)!="</tr>"){
				html=html.substring(0,html.length-5);
			}else{
				html=html.substring(0,html.length-10);
			}
			//html +="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' class='btn1' value='搜索' onclick='view.advancedSearch("+index+")'/></td></tr>";
			html +="</td></tr><tr><td colspan='4'  align='right'><input type='button' class='btn1' value='搜索' onclick='view.advancedSearch("+index+")'/>&nbsp;&nbsp;<input type='button' class='btn1' value='重置'  qtip='重置视图数据'   onclick='view.advancedSeaReset("+index+")'/>&nbsp;</td></tr>";
		}
		html = "<table class=\"table2\">"+'<COL width="15%"><COL width="35%"><COL width="15%"><COL width="35%">'+html;
		html+="</table>";
		advancedDiv.innerHTML = html;
		/**/
	},
	//高级搜索的重置--fsm-2010.2.4
	advancedSeaReset:function(index)
	{
	    var divobj = Ext.getDom("searchMore_"+index);
		var inputObjs = divobj.getElementsByTagName("input");
			for(var i=0;i<inputObjs.length;i++){
			var inputObj = inputObjs[i];
			if(ucapCommonFun.getAttr(inputObj,"type")!="button")
				inputObj.value="";
			}
			view.reset();
	},
	/**
	 * 设置高级检索
	 * @param {} obj
	 * @param {} index 视图索引
	 */
	setSearchMore:function(obj,index){
		var searchMoreDiv= document.getElementById('searchMore_'+index);
		var divHeight = searchMoreDiv.offsetHeight;
    	if(searchMoreDiv.style.display==''){  
    		var gridPanel = null;
    		if(view.viewBaseInfos[index].viewType=="02" || view.viewBaseInfos[index].viewType=="03"){
    			gridPanel = Ext.getDom(view.namePrefix+index);
    			gridPanel.style.height=gridPanel.offsetHeight+divHeight;
    		}else{
    			gridPanel = Ext.getCmp(view.namePrefix+index);
    			gridPanel.setHeight(gridPanel.getInnerHeight()+gridPanel.getFrameHeight()+divHeight);
    		}
    		searchMoreDiv.style.display='none';
    		obj.value = "▼高级搜索";
    	}else{
    		searchMoreDiv.style.display='';
			divHeight = searchMoreDiv.offsetHeight;
    		var gridPanel = null;
    		var innerWidth = 0;
    		if(view.viewBaseInfos[index].viewType=="02" || view.viewBaseInfos[index].viewType=="03"){
    			gridPanel = Ext.getDom(view.namePrefix+index);
    			innerWidth = gridPanel.style.width;
    			innerWidth = innerWidth.replace("px","");
    			gridPanel.style.height=gridPanel.offsetHeight-divHeight;
    		}else{
    			gridPanel = Ext.getCmp(view.namePrefix+index);
    			innerWidth = gridPanel.getInnerWidth()+gridPanel.getFrameWidth();
    			gridPanel.setHeight(gridPanel.getInnerHeight()+gridPanel.getFrameHeight()-divHeight);
    		}
    		//宽度取不到，则防止宽度为负数出错（用户视图为概要类型时会出错）
    		if(innerWidth>2)
    			if(searchMoreDiv)searchMoreDiv.style.width =innerWidth-2;
    		obj.value = "▲高级搜索";
    	}
    	//防止视图打开时出现不必要的滚动条mdf by jc 20100609
		document.body.style.overflowY="hidden";
		//document.body.style.overflowY="auto";
    },
    
    /**
     * 根据子视图标识和父文档id重新加载子视图
     * 
     * @param {} sonViewIds 子视图标识
     * 
     * @param {} pdid 子视图上级数据标识
     */
    reloadSonView:function(sonViewIds,pdid){
    	if(undefined==sonViewIds || sonViewIds=="")return;
    	
    	var svds = sonViewIds.split(",");
    	
    	for(var i=0;i<svds.length;i++){
    		var vid = svds[i];
    		var vbi = null;
    		var index = -1;
    		for(var j=0;j<view.viewBaseInfos.length;j++){
    			if(view.viewBaseInfos[j].viewId==vid){
    				vbi = view.viewBaseInfos[j];
    				index = j;
    			}
    		}
    		
    		if(null!=vbi){
    			//普通视图
    			if(vbi.viewTyp=="02"){//列表视图
    				view.loadOtherGrid(vid,index,pdid);
    			}else if(vbi.viewTyp=="03"){//图文并茂视图
    				view.loadOtherGrid(vid,index,pdid);
    			}else{
    				var grid = Ext.getCmp(view.namePrefix+index);
    				grid.getStore().baseParams={pdid:pdid};
    				grid.getStore().reload({params:{start:0,limit:vbi.pageSize}});
    			}
    		}
    	}
    },
    
    /**
     * 获取视图数据的连接地址
     * @return {}
     */
    getViewDataUrl:function(curViewId){
    	try{
    		var url;
	    	//var node = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
	    	var belongToAppId = typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:false;
	    	if(belongToAppId){
	    		  url = view.dataUrl+"&rand="+Math.random()+"&viewId="+curViewId+"&belongToAppId="+belongToAppId;
	    	}
	    	else{
	    		  url = view.dataUrl+"&rand="+Math.random()+"&viewId="+curViewId;
	    	}	
    	}catch(e){
    		  url = view.dataUrl+"&rand="+Math.random()+"&viewId="+curViewId;
    	}
		var urlsp = url.split("?");
		url = url.substring(urlsp[0].length+1);
		var urljson = Ext.urlDecode(url);
		var purljson = Ext.urlDecode(view.purl);
		Ext.apply(purljson,urljson);
		url = urlsp[0]+"?"+Ext.urlEncode(purljson);
		
		return url;
    },
	
	/**
	 * 加载普通类型的视图数据
	 * 
	 * @param {} index
	 */
	loadCommonGrid:function(curViewId,index,noPreview,noSelfConfig){
		var searchDiv= Ext.getDom('search');
		var width = document.body.offsetWidth;
		var vcDiv = Ext.getDom("viewCategories");
		var gridJspHeight = 0;
		if("undefiend"!=searchDiv && null!=searchDiv && searchDiv.offsetWidth>0){
			width = searchDiv.offsetWidth;
			//firefox  start
			if(!Ext.isIE){//判断当浏览器为非IE,视图宽度重新计算 add by cguancong@linewell.com
				width = document.body.offsetWidth;
				var mainLeft = Ext.getDom("ucapMainLeft");
				if("undefined"!=typeof(mainLeft) && mainLeft!=null && mainLeft.offsetWidth>0){
					width = width-mainLeft.offsetWidth-8;
					if("undefined"!=typeof(vcDiv) && vcDiv!=null){
						width=width+2;
					}
				}
			}
			//firefox end
			if("undefined"!=typeof(vcDiv) && vcDiv!=null){
				width = width;
			}
		}else{
			var gridAutoHeight=false;
			if("undefined"!=typeof(vcDiv) && vcDiv!=null){
				if (Ext.isIE) {
					width = width - vcDiv.offsetWidth - 6;
				}
			}
			var mainLeft = Ext.getDom("ucapMainLeft");
			if("undefined"!=typeof(mainLeft) && mainLeft!=null && mainLeft.offsetWidth>0){
				width = width-mainLeft.offsetWidth-8;
				if("undefined"!=typeof(vcDiv) && vcDiv!=null){
					width=width+2;
				}
			}
		}

		//iframe时宽度要做适当的变化
		if("undefined"==typeof(isFromJsp) || isFromJsp!="true"){//不是来自ifame的情况
			gridAutoHeight = false;
		}else{			
			var pIframe = window.parent.Ext.getDom(view.iframePreId+curViewId);
			pIframe = window.parent.Ext.getDom("_UcapSelectiFrame")||pIframe;//获取视图列的iframe
			if("undefined"!=typeof(pIframe) && null!=pIframe && parseInt(pIframe.style.height)>0){
				gridJspHeight = parseInt(pIframe.style.height);
				var vcDiv = Ext.getDom("viewCategories");
				if("undefined"!=typeof(vcDiv) && null!=vcDiv){
					vcDiv.style.height = gridJspHeight;
				}
				var searchDiv= Ext.getDom('search');
				if("undefiend"!=searchDiv && null!=searchDiv){
					if(viewBaseInfo.searchBarState>0)//add by fsm
						gridJspHeight=gridJspHeight-searchDiv.offsetHeight;//减去查询的高度
				}
				gridAutoHeight = false;
			}else{
				gridAutoHeight = true;
			}
		}
		var url = view.getViewDataUrl(curViewId);
		// 定义列模型
		var items = null;
		var remoteSort = true;
		
		//如果是编辑就通过编辑模型获取编辑的列数据
		if(view.viewBaseInfos[index].isEdit){
			//在高级查询，如果是有来自字典类型的数据，那么在编辑视图中没法适用，主要是因为下面语句把select给弄没了
			items =Ext.decode(view.getEditColumnModuleJson(index,view.json));
			remoteSort = false;
		}else{
			items =Ext.decode(view.getColumnModuleJson(view.json,index));
		}
		
		var cm = new Ext.grid.ColumnModel(
			items
		);
		
		// 定义数据源为远程代理和JSON数据格式
		var ds = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : url
			}),
			reader : new Ext.data.JsonReader(
				{
					totalProperty : 'totalProperty',
					root : 'root'
				}, 
		    	view.getJsonReader(view.json)
			),
			remoteSort:remoteSort         //设置排序方式为后台排序，后台获取的参数的方式：排序名称的参数为：sort,排序方式的参数为:dir
		});//end ds
		
		// 定义复选框
		var sm = null;
		if(view.isSingle=="1"){
			sm = new Ext.grid.RowSelectionModel({singleSelect:true});
		}else{
			sm = new Ext.grid.CheckboxSelectionModel();
		}
		
		var gridTbar = null;
		if("undefined"==typeof(view.noTbar) || view.noTbar!="true"){
			gridTbar = new Ext.Toolbar({
				items:view.getTBarJson(view.json,index,noPreview,noSelfConfig)
			});
		}
		
		var gridBbar = null;
		if("undefined"==typeof(view.noBbar) || view.noBbar!="true"){
			gridBbar = new Ext.PagingToolbar({
				pageSize : view.viewBaseInfos[index].pageSize,
				store : ds,
				displayInfo : true,//为false，不显示视图的记录信息，单显示分页
				displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
				emptyMsg : "没有记录"
			});
		}
		
		// 设置所有列字段默认排序
		// 定义一个表格面板
		var grid = null;
		
		if(view.viewBaseInfos[index].isEdit){
			//width=width-14;
			grid = new Ext.grid.EditorGridPanel({
				id : view.namePrefix+index,// 设置标识ID，方便以后引用！
				stripeRows: true,//让grid相邻两行背景色不同，具体颜色值还可修改ext-all.css中的.x-grid3-row-alt颜色值
				cm : cm,// 列模型
				ds : ds,// 数据源
				sm : sm,// 复选框
				loadMask:true,  //
				autoHeight:gridAutoHeight,
				autoWidth:false,
				width:width,
				tbar :gridTbar,
				// 表格底部分页工具栏
				bbar : gridBbar,
				//是否单击就进入编辑状态
				clicksToEdit:1,
				
				renderTo : view.namePrefix+index
	
			});
			
		}else{
			grid = new Ext.grid.GridPanel({
				id : view.namePrefix+index,// 设置标识ID，方便以后引用！
				//以下三个属性去掉，就可实现去掉表格面板的边框
				//title : view.displayName,// 标题
				//header:true,//是否显示标题栏，为false则不显示
				stripeRows: true,//让grid相邻两行背景色不同，具体颜色值还可修改ext-all.css中的.x-grid3-row-alt颜色值
				cm : cm,// 列模型
				ds : ds,// 数据源
				sm : sm,// 复选框
				loadMask:true,  //
				autoHeight:gridAutoHeight,// 自动设置高度，这个配置很重要
				autoWidth:false,
				width : width,
				//x : 1,// 设置初始位置横坐标
				//y : 1,// 设置初始位置纵坐标
				//floating : false,// 设置浮动，能否拖动成功就靠它了,注意设置浮动后它就置顶了
				
				// UI视图配置
				//强制设置了表格的宽度，此属性去点，表格中列的宽度就可以根据列设置的宽度
				viewConfig : {
					forceFit : false
				},
				// 表格顶部动作或按钮工具栏
				
				tbar :gridTbar,
					
				// 表格底部分页工具栏
				bbar : gridBbar,
				enableDragDrop:view.enableDragDrop,//GridPanel行的拖动 add by jc 20100303	
				renderTo : view.namePrefix+index
	
			});
			
			grid.on("headerclick",view.headerclick);
		
			//鼠标移过去的提示信息
			if(view.json.messageType!="" && view.json.messageType!="01"){
				grid.on("mouseover",view.mouseover);
			}
		
			//视图上列移动的数据实现	
			grid.getColumnModel().on('columnmoved', view.columnMove);
			//视图上行双击的事件添加实现
			grid.on('rowdblclick', view.rowdbClick);
			
			//单元格单击事件实现
			grid.on('cellclick', view.cellclick);
		}
		if("undefined"==typeof(isFromJsp) || isFromJsp!="true"){
			if(!gridAutoHeight)view.setGridHeight(grid);
		}else{
			if(!gridAutoHeight){
				grid.setHeight(gridJspHeight);
			}
		}
		//2011-12-30 modify by cguangcong@linewell.com 数据排序字段在获取数据前清除 bug1052
		if(null!=grid.getStore().getSortState()){
			grid.getStore().getSortState().field=null;
		}
		//modify by jc 20100401移动部分代码先后执行顺序，使视图加载时出现正在加载中信息
		// 加载首页数据，每页显示10条记录
		ds.load({
			params : {
				start : 0,
				limit : view.viewBaseInfos[index].pageSize
			}
		});//end ds.load	
		//add by jc设置视图数据源到全局变量
		if(null==view.stores)view.stores = new Array();
		view.stores[view.index] = ds;
		cm.defaultSortable = true;
		//视图加载完毕后执行相应的函数
		if(null!=view.viewBaseInfos[index].loadjs && view.viewBaseInfos[index].loadjs!=""){
			if(view.viewBaseInfos[index].loadjs.indexOf(")")>0){
				eval(view.viewBaseInfos[index].loadjs);
			}else{
				eval(view.viewBaseInfos[index].loadjs+"()");
			}
		}
		
	},
	
	/**
	 * 列表型视图的数据加载
	 * 
	 * @param {} curViewId
	 * 
	 * @param {} index
	 */
	loadOtherGrid:function(curViewId,index,pdid,noPreview,noSelfConfig){
		view.index = index;
		var searchDiv= Ext.getDom('search');
		var width = document.body.offsetWidth;
		var vcDiv = Ext.getDom("viewCategories");
		var gridJspHeight = 0;
		if(ucapSession.middleHeight==0)ucapCommonFun.autoMenuHeight();
		var ght = ucapSession.middleHeight;
		if("undefiend"!=searchDiv && null!=searchDiv){
			if(viewBaseInfo.searchBarState>0)//add by fsm
				ght=ght-searchDiv.offsetHeight;
		}

		if("undefiend"!=searchDiv && null!=searchDiv && searchDiv.offsetWidth>0){
			width = searchDiv.offsetWidth;
		}else{
			if("undefined"!=typeof(vcDiv) && vcDiv!=null){
				width = width-vcDiv.offsetWidth-6;
			}
			var mainLeft = Ext.getDom("ucapMainLeft");
			if("undefined"!=typeof(mainLeft) && mainLeft!=null && mainLeft.offsetWidth>0){
				width = width-mainLeft.offsetWidth-8;
				if("undefined"!=typeof(vcDiv) && vcDiv!=null){
					width=width+2;
				}
			}
		}
		if("undefined"!=typeof(vcDiv) && vcDiv!=null){
			vcDiv.style.height=ucapSession.middleHeight;
		}
		
		var url =view.getViewDataUrl(curViewId);
		var gridDiv = Ext.getDom(view.namePrefix+index);
		if(ght<=0)ght=388;
		if("undefined"==typeof(view.noTbar) || view.noTbar!="true"){
			var gridTbar = null;
			gridTbar = new Ext.Toolbar({
				items:view.getTBarJson(view.json,index,noPreview,noSelfConfig)
			});
		
			var bottomDiv = document.createElement("div");
			gridDiv.parentNode.insertBefore(bottomDiv,gridDiv);
			//bottomDiv.style = "width:100%;height:30px;";
			//bottomDiv.style.width=width;
			bottomDiv.style.styleFloat = "left";
			//bottomDiv.style.heigth =30;
			bottomDiv.id = "listButtonDiv";
			gridTbar.render("listButtonDiv");
			ght = ght-27;
		}
		
		if("undefined"!=typeof(view.noBbar) || view.noBbar!="true"){
			ght = ght-27;
		}
		
		gridDiv.style.margin="0px 0px";
		gridDiv.style.border="#BAD1D7 0px solid";
		gridDiv.style.padding="4px";
		gridDiv.style.height=ght;
		gridDiv.style.overflow="auto";
		//gridDiv.style.width = width;
		
		//加入分页栏
		// 定义数据源为远程代理和JSON数据格式
		var ds = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : url
			}),
			reader : new Ext.data.JsonReader(
				{
					totalProperty : 'totalProperty',
					root : 'root'
				}, 
		    	view.getJsonReader(view.json)
			)
		});//end ds
		// 加载首页数据，每页显示10条记录
		ds.load({
			params : {
				start : 0,
				limit : view.viewBaseInfos[index].pageSize
			}
		});//end ds.load
		
		if(view.viewBaseInfos[index].viewType=="02"){
			ds.on("load",view.listOnLoad);
		}else if(view.viewBaseInfos[index].viewType=="03"){
			ds.on("load",view.imageOnLoad);
		}
		
		if(null==view.stores)view.stores = new Array();
		view.stores[view.index] = ds;
		if("undefined"==typeof(view.noBbar) || view.noBbar!="true"){
			var gridBbar = null;
			gridBbar = new Ext.PagingToolbar({
				pageSize : view.viewBaseInfos[index].pageSize,
				store : ds,
				displayInfo : true,//为false，不显示视图的记录信息，单显示分页
				displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
				emptyMsg : "没有记录"
			});
		
			var pagingDiv = document.createElement("div");
			gridDiv.parentNode.appendChild(pagingDiv);
			//pagingDiv.style.width=width;
			pagingDiv.style.styleFloat = "left";
			pagingDiv.id = "pagingButtonDiv";
			gridBbar.render("pagingButtonDiv");
		}
	},
	
	/**
	 * 列表式数据加载时的数据变化
	 * @param {} ds
	 * @param {} records
	 * @param {} options
	 */
	listOnLoad:function(ds,records,options){
		var listHtml="<table class=table3 cellSpacing=0 cellPadding=0 width=\"100%\" border=0>";
		listHtml+="<col width='50%'/>";
		listHtml+="<col width='50%'/>";
		if(null!=records){
			for(var i=0;i<records.length;i=i+2){
				listHtml+="<tr>";
				for(var u=0;u<2;u++){
					var vdata = null;
					if((i+u)<records.length)vdata = records[i+u].data;
					
					listHtml+="<TD"+((i/2)%2!=0?" class=tdHover":"")+">";
					
					if(null==vdata){
						listHtml+="&nbsp;<A class=tableText href=\"#\">&nbsp;";
					}else{
						var k=0;
						for(var j in vdata){
							if(k>0 && k<3){
								listHtml+="&nbsp;"+vdata[j];
							}else if(k==0){
								listHtml+="<INPUT id=selectid type=hidden name=selectid value='"+vdata[j]+"'/><img src=\""+ucapSession.sUserImgPath+"icon_file.gif\">&nbsp;";
								listHtml+="<A class=tableText href=\"javascript:view.openViewDoc('"+vdata[j]+"','"+view.viewBaseInfos[view.index].formType+"','"+view.viewBaseInfos[view.index].formId+"',"+view.viewBaseInfos[view.index].isFlowItem+")\""+">";
							}
							k++;
						}
					}
					
					listHtml+="</A></TD>";
				}
				
				
				listHtml+="</tr>";
			}
		}
		
		
		listHtml+="</table>";
		
		var gridDiv = Ext.getDom(view.namePrefix+view.index);
		if(gridDiv)gridDiv.innerHTML = listHtml;
	},
	
	/**
	 * 列表式数据加载时的数据变化
	 * @param {} ds
	 * @param {} records
	 * @param {} options
	 */
	imageOnLoad:function(ds,records,options){
		var imageHtml="<table class=table5>";
		imageHtml+="<col width='25%'/>";
		imageHtml+="<col width='25%'/>";
		imageHtml+="<col width='25%'/>";
		imageHtml+="<col width='25%'/>";
		if(null!=records){
			var tempUnid=null;
			for(var i=0;i<records.length;i=i+4){
				var titleHtml = "<tr>";
				imageHtml+="<tr>";
				for(var u=0;u<4;u++){
					var vdata = null;
					if((i+u)<records.length)vdata = records[i+u].data;
					
					imageHtml+="<td>";
					titleHtml+="<td>";
					if(null==vdata){
						imageHtml+="&nbsp;";
						titleHtml+="&nbsp;";
					}else{
						var k=0;
						for(var j in vdata){
							if(k==1){
								//通过img可以打开表单 modify by  fsm 2010.7.26
								imageHtml+="<A href=\"javascript:view.openViewDoc('"+tempUnid+"','"+view.viewBaseInfos[view.index].formType+"','"+view.viewBaseInfos[view.index].formId+"',"+view.viewBaseInfos[view.index].isFlowItem+")\"  ><img height=125 width=145 src=\""+vdata[j]+"\"></A>";
							}else if(k==2){
								if(null!=vdata[j] && vdata[j].length>13){
									titleHtml+=vdata[j].substring(0,13)+"..."+"</A>";
								}else{
									titleHtml+=vdata[j]+"</A>";
								}
							}else if(k==0){
								titleHtml+="<INPUT id=selectid type=checkbox name=selectid value='"+vdata[j]+"'/>";
								titleHtml+="<A class=tableText href=\"javascript:view.openViewDoc('"+vdata[j]+"','"+view.viewBaseInfos[view.index].formType+"','"+view.viewBaseInfos[view.index].formId+"',"+view.viewBaseInfos[view.index].isFlowItem+")\""+">";
								tempUnid=vdata[j];
							}
							k++;
						}
						if(k<2){
							titleHtml+="未知名称</A>";
						}
						
					}
					
					titleHtml+="</td>";
					imageHtml+="</td>";
				}
				
				titleHtml+="</tr>";
				imageHtml+="</tr>"+titleHtml;
			}
		}
		
		imageHtml+="</table>";
		var gridDiv = Ext.getDom(view.namePrefix+view.index);
		gridDiv.innerHTML = imageHtml;
	},
	
	/**
	 * 单元格编辑后的事件,做为单元格事件的参考
	 * 
	 * @param {} obj
	 */
	focus:function(f){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		
		var selectModule = grid.getSelectionModel();
		//获取表格所在的行
		var row = selectModule.getSelected();
		
		//设置相应单元格的值
		f.setValue("设置单元格的值!");
	},
	
	/**
	 * @param insertDataJson 符合json格式的数据 String
	 * 
	 * 在可编辑表格中插入一行数据
	 * 
	 */
	insertEditorGridData:function(insertDataJson){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var recordJson = "";
		var dataJson = "";
		var toLoadData = true;
		if("undefined"!=typeof(insertDataJson) && insertDataJson!=""){
			dataJson = insertDataJson;
			toLoadData = false;
		}
		var colCount = grid.getColumnModel().getColumnCount(false);
		var beginIndex = 1;
		if(view.viewBaseInfos[view.index].checkPosition!="02")beginIndex=0;
		var curSeqNum= grid.getStore().getCount();
		for(var j=beginIndex;j<colCount;j++){
			var dataIndex =  grid.getColumnModel().getDataIndex(j);
			//增加视图序号add by jc 20100610
			if(dataIndex=="~display~opr~" || dataIndex=="~display~seqnum~"){
				if(dataIndex=="~display~seqnum~"){
					if(recordJson==""){
						recordJson+="{name:'"+dataIndex+"'}";
						if(toLoadData)dataJson+="'"+dataIndex+"'"+":'"+(curSeqNum+1)+"'";
					
					}else{
						recordJson+=",{name:'"+dataIndex+"'}";
						if(toLoadData)dataJson+=",'"+dataIndex+"'"+":'"+(curSeqNum+1)+"'";
					}
				}
				
				continue;
			}
			var itemJson = view.getItemJsonByItemUnid(view.viewBaseInfos[view.index].formItemsJson,dataIndex);
			var val = "";
			if(null!=itemJson && null!=itemJson.uiItemValueList){
				//将编辑表格展示的内容总是显示为中文显示值，不显示值，值由保存时统一进行替换。 mdf by jc 20111223
				var valueList = itemJson.uiItemValueList;
				for(var k=0;k<valueList.length;k++){
					//alert(typeof(valueList[k].value));
					if(val==""){
						val = valueList[k].text;
						//val = typeof(valueList[k].value)=="undefined"?valueList[k].text:valueList[k].value;
					}else{
						//val +=","+typeof(valueList[k].value)=="undefined"?valueList[k].text:valueList[k].value;
						val +=","+valueList[k].text;
					}
				}
			}
			//给JSON的Key加上单引号 mdf by jc 20120229
			if(recordJson==""){
				recordJson+="{name:'"+dataIndex+"'}";
				if(toLoadData)dataJson+="'"+dataIndex+"':'"+val+"'";
				
			}else{
				recordJson+=",{name:'"+dataIndex+"'}";
				if(toLoadData)dataJson+=",'"+dataIndex+"':'"+val+"'";
			}
		}
		var Record =  Ext.data.Record.create(Ext.decode("["+recordJson+"]"));
		var r = new Record(Ext.decode("{"+dataJson+"}"));
		var rowCount = grid.getStore().getCount();
		grid.stopEditing();
		grid.getStore().insert(rowCount, r);
       	grid.startEditing(rowCount, beginIndex+1);
	},
	
	/**
	 * 删除表格中的数据
	 */
	deleteEditorGridData:function(){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var selectedRow = grid.getSelectionModel().getSelections();
		if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
		
		var vb = view.viewBaseInfos[view.index];
		if(!vb.isEdit)return;
		var formUnid=vb.formId,formType=vb.formType;
		var beginIndex = 1; 
		if(vb.checkPosition!="02")beginIndex=0;
		
		for(var i=0;i<selectedRow.length;i++){
			
			var unidIndex = grid.getColumnModel().getDataIndex(beginIndex);
			var t={};
			var row = selectedRow[i];
			t["formUnid"] = formUnid;
			t["formType"] =formType;
			t["isDel"] = "true";
			t["isFlowItem"]=vb.flowItem==1?'true':'false';
			var unid=row.data[unidIndex];
			t["docUnid"] = unid;
			var strResult=Ext.encode(row.json);
			 if(""!=strResult&&null!=strResult&&"null"!=strResult) {
			 	strResult="["+strResult+"]";
			 }
			 else {
			 	strResult="";
			 }
			t["strResult"] =strResult;
			t["unid"] =unid;
			t["isNew"] = "0";
			if(""!=unid&&null!=unid)
			{
				view.deleteViewData[view.deleteViewData.length]=t;
			}
			grid.getStore().remove(row);
		}
	},
	/**
	 * add by fsm 2011-4-28
	 * 获取可编辑表格删除的数据
	 * @param {} jresutl
	 */
	getDeleteEditorGridDatas:function(jresutl)
	{
		var obj=view.deleteViewData;
		for(var i=0;i<obj.length;i++){
			var o= obj[i];
			jresutl[jresutl.length]=o;
		}
	},
	
	/**
	 * 根据编辑视图中配置增加函数，在回车的时候进行增加，如果没有配置此函数，则回车时则不增加
	 */
	addEditorGridRow:function(){
		if(null!=view.viewBaseInfos[0].addRowjs && ""!=view.viewBaseInfos[0].addRowjs){
			if(view.viewBaseInfos[0].addRowjs.indexOf(")")>0){
				eval(view.viewBaseInfos[0].addRowjs);
			}else{
				eval(view.viewBaseInfos[0].addRowjs+"()");
			}
		}
	},
	/**
	 * 用于获取视图表单列表获取保存数据用的。
	 * 目前在form.js的保存中调用
	 * @param {} mainForm 主表单JSON
	 * @param {} isNew 主表单是否为新建，如果有值则是旧文档，无值则是新文档
	 * @param {} jresult 在文档保存时存放提交到后台的保存数据
	 * @param {} sp 表单列表的后缀
	 * @param {} formValidatorMode 表单验证模式
	 * @return {Boolean}
	 * @author JC_Seekart
	 */
	getViewFormDatas:function(mainForm,isNew,jresult,sp,formValidatorMode){
		//表单验证模式modify by jc 20100512
		if(null==formValidatorMode || typeof(formValidatorMode)=="undefined"){
			formValidatorMode = 2;
		}
		if(!Validator.Validate(_UcapForm.mainDiv,formValidatorMode)){
			return false;
		}
		if(!sp)sp="_pox_";
		var mid = mainForm["form"]["unid"];
		var all = _UcapForm.handler.allViewFormList;
		for(var vf in all){
			for(var i=0;i<all[vf].length;i++){
				var singleForm = all[vf][i];
				if(singleForm)
					_UcapForm.singleFormData(singleForm,mid,mainForm,isNew,jresult,sp+(i+1));
			}
		}
		return true;
	},
	/**
	 * 获取可编辑后的数据
	 * 
	 */
	getEditorGridDatas:function(){
		var vb = view.viewBaseInfos[view.index];
		if(!vb.isEdit)return "[]";
		var formUnid=vb.formId,formType=vb.formType;
		var grid = Ext.getCmp(view.namePrefix+view.index);
		//如果没有指定只保存选中行的数据的话，那么保存所有行
		if(!vb.onlysaveSelected){
			grid.getSelectionModel().selectAll();
		}		
		var rowCount = grid.getSelectionModel().getCount();   //表格中的行数
		
		if(rowCount<1)return "[]";
		
		var datas="[";
		
		var colCount = grid.getColumnModel().getColumnCount(false);
		
		var beginIndex = 1;
		
		var dictDataJson = view.dictSelectDataJson;//编辑表格字典全局缓存对象
		
		if(vb.checkPosition!="02")beginIndex=0;
		for(var i=0;i<rowCount;i++){
			var row = grid.getSelectionModel().getSelections()[i];
			var unidIndex = grid.getColumnModel().getDataIndex(beginIndex);
			//不是新增并且没有过的话，直接跳过
			if((row.data[unidIndex]!=null && row.data[unidIndex]!="") && !row.dirty)continue;
			if(datas!="["){
				datas+=",{";
			}else{
				datas+="{";
			}
			datas+="formUnid:'";
			if(vb.sourceType=="01"){
				datas+=vb.sourceUnid;
			}else{
				datas+=vb.formId;
			}
			datas+="',unid:'"+(row.data[unidIndex]||"")+"',isNew:";
			
			if(null==row.data[unidIndex] || row.data[unidIndex]==""){
				datas+="'1'"
			}else{
				datas+="'0'"
			}
			
			datas+=",item:[";
			var rowValue = "";
			for(var j=beginIndex;j<colCount;j++){
				var dataIndex =  grid.getColumnModel().getDataIndex(j);
				//过滤视图序号mdf by jc 20100610
				if(dataIndex==unidIndex || dataIndex=="~display~opr~" || dataIndex=="~display~seqnum~" || 
					(dataIndex && dataIndex.indexOf(view.commonSelectFieldNamePrefix)>-1))continue;
				//不是新增并且没有过的话，直接跳过
				if((null!=row.data[unidIndex] && row.data[unidIndex]!="") && !row.isModified(dataIndex))continue;
				//视图验证 add by jc 20100513
				var errMsg = Validator.ValidateByData(dataIndex,(row.data[dataIndex]||""),"",formUnid,formType);
				if(errMsg!=true){
					return "{error:'视图第"+(i+1)+"行："+errMsg+"!'}";
				}
				//视图验证结束<---
				//将编辑表格中的中文显示内容替换成数据库保存需要的存储值。 mdf by jc 20111223
				rowValue = row.data[dataIndex];
				//替换字典中文值为需要保存的值
				var isDictFlag = false;
				if(dictDataJson[dataIndex]){
					rowValue = dictDataJson[dataIndex][rowValue];
					isDictFlag = true;
				}
				if(!isDictFlag){
					//判断是否存在通用选择框的实际保存值 mdf by jc 20120228
					var idsValue = row.data[dataIndex+view.commonSelectFieldNamePrefix];
					if(typeof(idsValue)!="undefined"){
						//设置通用选择框的保存值
						rowValue = idsValue;
					}
				}
				datas+="{k:'"+dataIndex+"',v:"+Ext.encode(view.formatDate((rowValue||"")))+"},";
			}
			datas=datas.substring(0,datas.length-1);
			datas+="]";
			datas+="}";
		}
		datas+="]";
		return datas;
	},
	
	/**
	 * 设置表格高度
	 * documentHeight为文档中表格高度
	 */
	setGridHeight:function(grid,documentHeight){
		//mdf by jc 20100527视图表单列表高度设置
		if(view && view.viewBaseInfos && view.viewBaseInfos[view.index]){
			if(view.viewBaseInfos[view.index].viewType=="04"){
				view.viewFormManager.setHeight();
				return;
			}
		}
		//以下是普通的设置
		var searchDiv= Ext.getDom('search');//查询
		var vcDiv = Ext.getDom("viewCategories");//分类
		if("undefined"==typeof(grid) || grid==null){
			grid = Ext.getCmp(view.namePrefix+view.index);
		}
		//if("undefiend"==typeof(grid) || grid==null)return;
		if(ucapSession.middleHeight==0){
			ucapCommonFun.autoMenuHeight();
		}
		var ght = ucapSession.middleHeight;
		if("undefiend"!=searchDiv && null!=searchDiv){
			ght=ght-searchDiv.offsetHeight;
		}
		//高级搜索
		var searchMoreDiv= $('searchMore_'+view.index);
		if("undefiend"!=searchMoreDiv && null!=searchMoreDiv){
			ght=ght-searchMoreDiv.offsetHeight;
		}
		if (typeof grid!="undefined" && grid){
			grid.setHeight(documentHeight||(ght-view.outOtherHeight));
		}
		if (Ext.getDom(view.namePrefix+view.index)){
		   //说明是图文并茂	
			if("undefined"==typeof(view.noTbar) || view.noTbar!="true"){
				ght = ght-27;
			}
			if("undefined"==typeof(view.noBbar) || view.noBbar!="true"){
				ght = ght-27;
			}
			var searchDiv= Ext.getDom('search');
			if("undefiend"!=searchDiv && null!=searchDiv){
				ght=ght-searchDiv.offsetHeight;
			}
			try{
				Ext.getDom(view.namePrefix+view.index).style.height = ght-20;
			}catch(e){}
		}
		//alert("视图调度="+ght+"  "+view.outOtherHeight)
		if("undefined"!=typeof(vcDiv) && vcDiv!=null){
			vcDiv.style.height=ucapSession.middleHeight;
		}
	},
	
	/**
	 * 鼠标移过去的触发事件代码
	 * 
	 * @param {} e
	 * @param {} t
	 */
	mouseover:function(e,t){
		//var grid = Ext.getCmp(view.namePrefix+view.index);
		var curViewId = "";
		//alert(mouseOverIndex);
		var rowIndex = this.getView().findRowIndex(t);
		
		if(rowIndex==view.mouseOverIndex)return;
		
		view.mouseOverIndex = rowIndex;
		
		var row = this.getStore().getAt(view.mouseOverIndex);
		
		if(null==row || typeof(row)=="undefined")return;
		
		var columnIndex = 0;
		var vbi = view.viewBaseInfos[view.getGridNum(this.id)];
		if(vbi.checkPosition=="02"){
			columnIndex=1;
			
		}
		curViewId = vbi.viewId;
			
		var unid = row.data[this.getColumnModel().getDataIndex(columnIndex)];
		
		var qhtml = ucapCommonFun.getViewTip(curViewId,unid);
		
		Ext.QuickTips.register({
			target: e.target,
			text:qhtml, //'<table><tr><td>编辑:</td><td>文本</td></tr><tr><td>fdkfk:</td><td>fdkfk</td></tr></table>',
			autoHide: true,
			hideDelay: 0,
			showDelay: 0
		})
	},
	
	/**
	 * 获取视图列的json格式数据
	 * 
	 * @param {} json
	 */
	getColumnModuleJson:function(json,index){
		//先判断是否有选项列
		var columnModuleJson = "";
		view.checkPosition = json.checkPosition;
		
		//columnModuleJson="new Ext.grid.RowNumberer()";
		//左边
		var opos=0;
		if(view.checkPosition=="02"){
			columnModuleJson+="new Ext.grid.CheckboxSelectionModel()";
			opos--;
		}
		
		var viewItems = json.viewItems;
		for(var i=0;i<viewItems.length;i++){
			if(undefined==typeof(viewItems[i].itemNameEn) || viewItems[i].itemNameEn=="")continue;
			if(viewItems[i].itemNameEn=="~display~opr~"){
				view.viewBaseInfos[index].operationPos = i-opos;
			}
			if(columnModuleJson==""){
				columnModuleJson="{header:'"+viewItems[i].displayName+"'";
			}else{
				columnModuleJson=columnModuleJson+",{header:'"+viewItems[i].displayName+"'";
			}
			columnModuleJson+=",dataIndex:'"+viewItems[i].itemNameEn.toLowerCase()+"'";
			//操作列不进行排序，~display~opr~为操作列的名称 myd by llp 2010-05-31
			//视图序号列不进行排序，~display~seqnum~为操作列的名称 mdf by jc 20100610
			if(viewItems[i].itemNameEn.toLowerCase()=="~display~opr~"
					|| viewItems[i].itemNameEn.toLowerCase()=="~display~seqnum~"){
				columnModuleJson+=",sortable:false"
			}
			
			var columnWidth = viewItems[i].width;
			
			var widthType = viewItems[i].widthType;
			
			if(!viewItems[i].display){
				columnModuleJson+=",hidden:true,hideable:false";
				opos++;
			}
			
			if(widthType=="02"){
				columnWidth = view.width*columnWidth/100;
			}
			
			columnModuleJson+=",width:"+columnWidth;
			
			if(viewItems[i].conversion!=""){
				columnModuleJson+=",renderer:"+viewItems[i].conversion;
			}
			columnModuleJson+="}";
		}//列加载完毕
		
		//右边
		if(view.checkPosition=="03"){
			columnModuleJson+=",new Ext.grid.CheckboxSelectionModel()";
		}
		columnModuleJson = "["+columnModuleJson+"]";
		
		return columnModuleJson;
	},
	
	/**
	 * 获取可编辑表格的列模型
	 * 
	 * @param {} json 列数据模型
	 */
	getEditColumnModuleJson:function(index,json){
		//先根据当前的index属性获取当前的视图展示的表单，以便获取其中的字段信息,直接从先前的表单中进行获取
		var vbi = view.viewBaseInfos[index];
		var url =ucapSession.baseAction;
		url+="?formType="+vbi.formType+"&formId="+vbi.formId+"&type=getForm&rand="+Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var itemsJson = Ext.util.JSON.decode(conn.responseText);			
		var exResult=ucapCommonFun.dealException(itemsJson);
		if(!exResult)return;
		
		view.viewBaseInfos[index].formItemsJson = itemsJson;
		var opos=0;
		//先判断是否有选项列
		var columnModuleJson = "";
		view.checkPosition = json.checkPosition;
		
		//columnModuleJson="new Ext.grid.RowNumberer()";
		//左边
		if(view.checkPosition=="02"){
			columnModuleJson+="new Ext.grid.CheckboxSelectionModel()";
			opos--;
		}
		/**
		 * 封装获取表格列模型对象的JSON方法 mdf by jc 20120224
		 * @param itemJson 表单字段JSON
		 * @param viewItem
		 * @param isCommonSelect
		 */
		var getColumnModuleJson = function(itemJson,viewItem,isCommonSelect){
			var colIsEdit=true;
			var _columnModuleJson="{header:'"+viewItem.displayName+"'";
			if(isCommonSelect==true){
				//在列模型中创建_ids索引
				_columnModuleJson+=",dataIndex:'"+viewItem.itemNameEn.toLowerCase()+view.commonSelectFieldNamePrefix+"'";
				//默认_ids字段不能进行编辑
				colIsEdit=false;
			}else{
				_columnModuleJson+=",dataIndex:'"+viewItem.itemNameEn.toLowerCase()+"'";
			}
			
			var columnWidth = viewItem.width;
			
			var widthType = viewItem.widthType;
			
			if(isCommonSelect==true){
				//不显示_ids字段
				_columnModuleJson+=",hidden:true,hideable:false";
			}else{
				if(!viewItem.display){
					_columnModuleJson+=",hidden:true,hideable:false";
					opos++;
				}
			}
			
			if(widthType=="02"){
				columnWidth = view.width*columnWidth/100;
			}
			
			_columnModuleJson+=",width:"+columnWidth;
			
			if(viewItem.conversion!=""){
				_columnModuleJson+=",renderer:"+viewItem.conversion;
			}else{
				if(null!=itemJson && (itemJson.item.sourceType=="04" || itemJson.item.sourceType=="05")){
					_columnModuleJson+=",renderer:view.formatDate";
				}
			}
			
			//var editor = view.getEditerByItemJson(itemJson,viewItem);
			//if(null!=editor && editor!=""){
			//	columnModuleJson += ","+editor;
			//}		
			
			//判断iseditjs，为0,或者返回false时不可编辑否则可编辑 add  by  fsm  10.7.22
 			if (typeof viewItem.iseditjs!="undefined" && viewItem.iseditjs!=""){
				  colIsEdit = ucapCommonFun.evalJavaScript(viewItem.iseditjs);}
 			if(colIsEdit)
			{
			     var editor = view.getEditerByItemJson(itemJson,viewItem);
 			      if(null!=editor && editor!=""){
				      _columnModuleJson += ","+editor;
			      }
			}
			//end

			_columnModuleJson+="}";
			return _columnModuleJson;
		}
		
		var viewItems = json.viewItems;
		for(var i=0;i<viewItems.length;i++){
			if(undefined==typeof(viewItems[i].itemNameEn) || viewItems[i].itemNameEn=="")continue;
			if(viewItems[i].itemNameEn=="~display~opr~"){
				view.viewBaseInfos[index].operationPos = i-opos;
			}
			var itemJson = view.getItemJsonByItemUnid(itemsJson,viewItems[i].itemUnid);
			//加入通用选择框_ids模型JSON的组装 mdf by jc 20120224
			if(columnModuleJson==""){
				columnModuleJson += getColumnModuleJson(itemJson,viewItems[i]);
			}else{
				columnModuleJson += ","+getColumnModuleJson(itemJson,viewItems[i]);
			}
			if(null!=itemJson && (itemJson.item.sourceType=="20" || 
					(null!=itemJson.item.itemShow && itemJson.item.sourceType=="03" && itemJson.item.itemShow["dictionaryType"]=="03"))){
				//是通用选择框与字典弹出框类型，构造编辑视图隐藏列模型 mdf by jc 20120229
				columnModuleJson += ","+getColumnModuleJson(itemJson,viewItems[i],true);
			}
			
		}//列加载完毕
		//document.write(columnModuleJson);
		//右边
		if(view.checkPosition=="03"){
			columnModuleJson+=",new Ext.grid.CheckboxSelectionModel()";
		}
		columnModuleJson = "["+columnModuleJson+"]";
		
		return columnModuleJson;
	},
	
	/**
	 * 格式化日期格式的数据
	 * 
	 * @param {} value
	 * @return {}
	 */
	formatDate:function(value){
		try{
			return value.format("Y-m-d");
		}catch(Exception){
			return value;
		}
    },

	
	/**
	 * 通过itemsjson及itemUnid获取到相应的item对象
	 * 
	 * @param {} itemsJson itemsJson对象
	 * 
	 * @param {} itemUnid 字段标识
	 */
	getItemJsonByItemUnid:function(itemsJson,itemUnid){
		var itemJson = null;
		
		if(null!=itemsJson && itemsJson.uiItemList.length>0){
			for(var i=0;i<itemsJson.uiItemList.length;i++){
				var tmpItemJson = itemsJson.uiItemList[i];
				if(null!=tmpItemJson && null!=tmpItemJson.item && (itemUnid==tmpItemJson.item.unid || tmpItemJson.item.nameEn.toLowerCase()==itemUnid)){
					itemJson = tmpItemJson;
					break;
				}
			}
		}

		return itemJson;
	},
	dictSelectDataJson:{},//编辑表格字典下拉内容缓存对象。 add by jc 20111223
	
	/**
	 * 通过域字段的itemJson获取editor对象
	 *  
	 * @param {} itemJson
	 */
	getEditerByItemJson:function(itemJson,viewItem){
		var editJson = "";
		if(null==itemJson || null==itemJson.item)return editJson;
		switch(itemJson.item.sourceType){
			case '10'://扩展字典类型
			case '02':
				editJson="editor: new Ucap.form.ViewSelectField({readOnly:true";
				if(viewItem.onclick!=""){
					editJson+=",listeners:{focus:"+viewItem.onclick+"}";//列单击事件
				}
				//add by jc 20090818
				if(viewItem.onchange!=""){
					editJson+=",listeners:{change:function(field,e){ "+viewItem.onchange+" }}";//值改变时事件
				}
				editJson+=",itemSource:'"+itemJson.item.source+"'";//来源值
				editJson+=",nameEn:'"+itemJson.item.nameEn+"'";//字段名称
				editJson+=",selNum:'"+(itemJson.item.isSingle||"")+"'";//是否单选
				editJson+=",columnMap:'"+(itemJson.item.columnMap||"")+"'";//选择的列名称集合
				editJson+="})";
				break;
			case '03':
				if(itemJson.item.itemShow["dictionaryType"]=="03"){
					editJson="editor: new Ucap.form.CommonSelectField({readOnly:true";
					if(viewItem.onclick!=""){
						editJson+=",listeners:{focus:"+viewItem.onclick+"}";//列单击事件
					}
					//add by jc 20090818
					if(viewItem.onchange!=""){
						editJson+=",listeners:{change:function(field,e){ "+viewItem.onchange+" }}";//值改变事件
					}
					//type,selNum,inputName,conValue,outputFunc,inputSplit, outSplit,treeType
					//alert(Ext.encode(itemJson.item));
					editJson+=",itemSource:'204'";//来源值
					editJson+=",nameEn:'"+itemJson.item.nameEn+"'";//字段名称
					editJson+=",selNum:'"+(itemJson.item.isSingle||"")+"'";//是否单选
					editJson+=",conValue:'"+(itemJson.item.source||"")+"'";//条件为字典的UNID
					editJson+="})";
				}else{
					editJson="editor: new Ext.form.ComboBox({typeAhead:true,triggerAction:'all',transform:'"
					+itemJson.item.nameEn.toLowerCase()+"',lazyRender:true,listClass: 'x-combo-list-small'";
					if(null!=itemJson.item.itemShow){//加入只读属性
						if("undefined"!=typeof(itemJson.item.itemShow.readOnly) && itemJson.item.itemShow.readOnly){//如果字段只读的话
							editJson+=",readOnly:true";
						}
					}
					editJson+="})";
					
					var dictSelect = document.getElementById(itemJson.nameEn);
					if("undefined"==typeof(dictSelect) || null==dictSelect){
						dictSelect = document.createElement("select");
						dictSelect.id = itemJson.item.nameEn.toLowerCase();
						dictSelect.name = itemJson.item.nameEn.toLowerCase();
						dictSelect.style.display = "none";
						//设置编辑表格全局字典缓存对象。 mdf by jc 20111223
						var tempItem = this.dictSelectDataJson[dictSelect.id] = {};
						if(null!=itemJson.dictTree && null!=itemJson.dictTree.children){
							for(var i=0;i<itemJson.dictTree.children.length;i++){
								ucapCommonFun.addOption(dictSelect,itemJson.dictTree.children[i].text,itemJson.dictTree.children[i].text);
								tempItem[itemJson.dictTree.children[i].text]=itemJson.dictTree.children[i].value;
							}
						}
						
						document.body.insertBefore(dictSelect,null);//firefox中参数不能省
					}
				}
				
				break;
			case '04':
				//mdy by caijianyan@linewell.com 2011-6-1 这里没有判断用户是否有输入数据来源的日期格式
				if(null==itemJson.item.source ||""==itemJson.item.source ){
					editJson="editor:new Ext.form.DateField({format:'yyyy-MM-dd'";
				}else{
					editJson="editor:new Ext.form.DateField({format:'"+itemJson.item.source+"'";
				}
				//end
				if(null!=itemJson.item.itemShow){
					if("undefined"!=typeof(itemJson.item.itemShow.readOnly) && itemJson.item.itemShow.readOnly){//如果字段只读的话
						editJson+=",readOnly:true";
					}
				}
				editJson+="})";
				break;
			case '05':
				//mdy by caijianyan@linewell.com 2011-6-1 这里没有判断用户是否有输入数据来源的日期格式
				if(null==itemJson.item.source ||""==itemJson.item.source ){
					editJson="editor:new Ext.form.DateField({format:'yyyy-MM-dd HH:mm'";
				}else{
					editJson="editor:new Ext.form.DateField({format:'"+itemJson.item.source+"'";
				}
				//end
				if(null!=itemJson.item.itemShow){
					if("undefined"!=typeof(itemJson.item.itemShow.readOnly) && itemJson.item.itemShow.readOnly){//如果字段只读的话
						editJson+=",readOnly:true";
					}
				}
				editJson+="})";
				break;
			case '20':
				editJson="editor: new Ucap.form.CommonSelectField({readOnly:true";
				if(viewItem.onclick!=""){
					editJson+=",listeners:{focus:"+viewItem.onclick+"}";//
				}
				//add by jc 20090818
				if(viewItem.onchange!=""){
					editJson+=",listeners:{change:function(field,e){ "+viewItem.onchange+" }}";//
				}
				//type,selNum,inputName,conValue,outputFunc,inputSplit, outSplit,treeType
				//alert(Ext.encode(itemJson.item));
				editJson+=",itemSource:'"+itemJson.item.source+"'";//
				editJson+=",nameEn:'"+itemJson.item.nameEn+"'";//
				editJson+=",selNum:'"+(itemJson.item.isSingle||"")+"'";//
				editJson+="})";
				break;
			default:
				if(itemJson.item.length>500){
					editJson="editor: new Ext.form.TextArea({";
					if(viewItem.onclick!=""){
						editJson+="listeners:{show:view.setTextAreaHeight,focus:"+viewItem.onclick+"}";//具体onclick事件的编写可以参考view.focus方法
					}else{
						editJson+="listeners:{show:view.setTextAreaHeight}";
					}
				}else{
					editJson="editor: new Ext.form.TextField({";
					if(viewItem.onclick!=""){
						editJson+="listeners:{focus:"+viewItem.onclick+"}";//具体onclick事件的编写可以参考view.focus方法
					}
					//add by jc 20090818
					if(viewItem.onchange!=""){
						editJson+="listeners:{change:function(field,e){ "+viewItem.onchange+" }}";//
					}
					if(null!=itemJson.item.itemShow){
						if("undefined"!=typeof(itemJson.item.itemShow.readOnly) && itemJson.item.itemShow.readOnly){//如果字段只读的话
							if(viewItem.onclick!="")editJson+=",";
							editJson+="readOnly:true";
						}
					}
				}
				
				editJson+="})";
		}
		
		return editJson;
	},
	/**
	 * 设置编辑表格中大文本框的高度，以便用户的输入
	 * 
	 * @param {} f
	 */
	setTextAreaHeight:function(f){
		f.setHeight(120);
		var textArea = document.getElementById(f.id);
		var div = textArea.parentNode;
		var toppx = div.style.top;
		var re = /px/g;
		toppx = toppx.replace(re,"");
		if(toppx>120){
		    div.style.top = toppx-120+20;
		}
	},
	
	/**
	 * 获取视图列json格式数据
	 * @param {} json
	 */
	getJsonReader:function(json){
		var itemsJson = view.viewBaseInfos[view.index].formItemsJson;
		var jsonReader = "";
		var viewItems = json.viewItems;
		
		for(var i=0;i<viewItems.length;i++){
			var tmpItemJson = viewItems[i];
			if(undefined==typeof(tmpItemJson.itemNameEn) || tmpItemJson.itemNameEn=="")continue;
			if(jsonReader==""){
				jsonReader+="{name:'"+tmpItemJson.itemNameEn.toLowerCase()+"'}";
			}else{
				jsonReader+=",{name:'"+tmpItemJson.itemNameEn.toLowerCase()+"'}";
			}
			//如果是通用选择框则组装_ids字段 add by jc 20120228
			if(null!=itemsJson){
				var itemJson = view.getItemJsonByItemUnid(itemsJson,tmpItemJson.itemUnid);
				if(null!=itemJson && (itemJson.item.sourceType=="20" || 
					(null!=itemJson.item.itemShow && itemJson.item.sourceType=="03" && itemJson.item.itemShow["dictionaryType"]=="03"))){
					//是通用选择框与字典弹出框类型，增加Reader对象 mdf by jc 20120229
					jsonReader+=",{name:'"+tmpItemJson.itemNameEn.toLowerCase()+view.commonSelectFieldNamePrefix+"'}";
				}
			}
		}
		jsonReader="["+jsonReader+"]";
		return Ext.util.JSON.decode(jsonReader);
	},
	
	/**
	 * 获取工具栏上的json
	 * 
	 * @param {} json
	 */
	getTBarJson:function(json,index,noPreview,noSelfConfig){
		var TBarJson = "";
		var buttonItems = json.subButtonList;
		for(var i=0;i<buttonItems.length;i++){
			if (typeof  buttonItems[i].button == "undefined" || buttonItems[i].button =="null"
			   || buttonItems[i].button ==null || buttonItems[i].displayPosition=="02") continue;
			if("undefined"!=typeof(buttonItems[i].js) && buttonItems[i].js!=""){
				var result = ucapCommonFun.evalJavaScript(buttonItems[i].js);
				if(!result)continue;
			}  
			if(TBarJson==""){
				TBarJson = "{id:'btn"+buttonItems[i].unid+"'";
			}else{
				TBarJson+=",{id:'btn"+buttonItems[i].unid+"'";
			}
			TBarJson+=",text:'"+buttonItems[i].name+"'";
			//加上按钮的提示信息
			if(buttonItems[i].tip!=null && buttonItems[i].tip!=""){
				TBarJson+=",tooltip:'"+buttonItems[i].tip+"'";
			}
			if("undefined"!=typeof(buttonItems[i].picture) && buttonItems[i].picture!=""){
				TBarJson+=",icon:'"+ucapSession.sUserImgPath+buttonItems[i].picture+"'";
				TBarJson+=",iconCls:'x-btn-text-icon'";
			}
			var codeType = buttonItems[i].button.codeType;
			
			if(codeType=="01"){
				TBarJson+=",handler:function(){view.index="+index+";"+buttonItems[i].button.code+"}}";
			}else if (codeType=="02"){//扩展功能
				TBarJson+=",handler:function(){view.index="+index+";"+"view.executeInteration('"+buttonItems[i].button.code+"')}}";
			} else if (codeType=="03"){
				//说明是流程新建窗口
				TBarJson+=",handler:function(){view.index="+index+";"+"ucapCommonFun.newFlowDocByFlowIds('"+buttonItems[i].button.code+"')}}";
			}
		}//end for
		
		//目前作为测试时使用，保证在按钮没有配置的情况下，每个视图上都有相应的按钮
		if(TBarJson==""){
			TBarJson = "{id:'btnAdd',text:'新增',handler:function(){view.index="+index+";view.newDocument()"+"}}";
			TBarJson += ",{id:'btndelete',text:'删除',handler:function(){view.index="+index+";"+"view.deleteDocument()"+"}}";
			TBarJson += ",{id:'btnmodify',text:'修改',handler:function(){view.index="+index+";"+"view.openDocument(3)"+"}}";
			TBarJson += ",{id:'btnrefresh',text:'刷新',handler:function(){view.index="+index+";"+"view.refresh()"+"}}";
			TBarJson += ",{id:'btnreset',text:'重置',handler:function(){view.index="+index+";"+"view.reset()"+"}}";
		}

		
		if(TBarJson!=""){
			TBarJson=TBarJson+",'->'";
		}else{
			TBarJson=TBarJson+"'->'";
		}
		
		//实现是本身这个用户能自定义
		if(ucapHeader.selfConfig && ("undefined"==typeof(noSelfConfig) || !(noSelfConfig==true || noSelfConfig=="true"))){
			TBarJson+=",{id:'btnselfconfig"+index+"',text:'自定义',";
			TBarJson+="iconCls: 'preview-bottom',menu:{id:'selfconfig-menu"+index+"',cls:'reading-menu',width:100,items:[";
			TBarJson+="{text:'基本信息',checked:true,group:'rp-group',handler:function(){view.selfConfig('01',"+index+")},scope:this}";
			TBarJson+=",{text:'视图列',checked:true,group:'rp-group',handler:function(){view.selfConfig('02',"+index+")},scope:this}";
			TBarJson+=",{text:'简单查询',checked:true,group:'rp-group',handler:function(){view.selfConfig('03',"+index+")},scope:this}";
			TBarJson+=",{text:'高级查询',checked:true,group:'rp-group',handler:function(){view.selfConfig('04',"+index+")},scope:this}";
			TBarJson+=",{text:'视图排序',checked:true,group:'rp-group',handler:function(){view.selfConfig('05',"+index+")},scope:this}";
			TBarJson+=",{text:'视图分类',checked:true,group:'rp-group',handler:function(){view.selfConfig('06',"+index+")},scope:this}";
			if(typeof(ucapSession.userJson.userStatus)!="undefined" && ucapSession.userJson.userStatus=="1"){
				TBarJson+=",{text:'视图条件',checked:true,group:'rp-group',handler:function(){view.selfConfig('07',"+index+")},scope:this}";
				TBarJson+=",{text:'视图按钮',checked:true,group:'rp-group',handler:function(){view.selfConfig('08',"+index+")},scope:this}";
			}
			//
			TBarJson+=",{text:'恢复默认',checked:false,group:'rp-group',handler:function(){view.selfConfig('10',"+index+")},scope:this}]}}";
		}
		//TBarJson += ",{id:'btnselfconfig',text:'自定义',handler:function(){view.index="+index+";"+"view.selfConfig()"+"}}";
		TBarJson += ",{id:'btnno',text:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}";
		TBarJson="["+TBarJson+"]";
		
		return Ext.util.JSON.decode(TBarJson);
	},
	
	/**
	 * 根据列名称获取表格选中行中指定列的值，列如果多个的话，采用逗号","隔开
	 * 
	 * @param {} colNames 获取的列名称
	 * 
	 * @param {} outsplit 输出分隔符号
	 */
	getColumnValueByName:function(colName){
		var result = "";
		var osplit = "";
		if("undefined"==typeof(colName) || colName=="")return result;
		//为避免视图列字段为大写时取不到值，统一转小写  modify by zhua 2010-09-07
		colName=colName.toLowerCase();
		var colNames = colName.split(",");
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var selectedRow = grid.getSelectionModel().getSelections();
		if(null==selectedRow.length || "undefined"==typeof(selectedRow.length)){
			selectedRow = new Array(selectedRow);
		}
		
		for(var i=0;i<selectedRow.length;i++){
			var row = selectedRow[i];
			if(result!="")result = result+view.recordSplit;
			for(var j=0;j<colNames.length;j++){
				if("undefined"==typeof(result) || result==""){
					result = row.data[colNames[j]];
				}else{
					result+=view.colSplit+row.data[colNames[j]];
				}
			}
			if(view.isSingle=="1")break;//如果是单选，则执行一次就跳出循环
		}

		return result;
	},
	
	/**
	 * 私有方法，通过表格的标识获取表格序号
	 * @param {} gridId
	 * @return {}
	 */
	getGridNum:function(gridId){
		var result = 0;
		if(gridId!=""){
			result = Number(gridId.replace(view.namePrefix,""));
		}
		
		return result;
	},
	
	/**
	 * 获取表格的当前行数
	 */
	getGridRowCount:function(){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var rownum = grid.getStore().getCount(); 
		return rownum;
	},
	
	/**
	 * 视图列移动函数
	 * @param {} columnModal
	 * @param {} oldIndex
	 * @param {} newIndex
	 */
	columnMove:function(columnModal,oldIndex, newIndex){	
		if(view.viewBaseInfos[view.currentGridIndex].checkPosition=="02"){
			oldIndex = oldIndex-1;
			newIndex = newIndex-1;
		}
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"sortViewColumn",
					"viewId":view.viewBaseInfos[view.currentGridIndex].viewId,"oldIndex":oldIndex,"newIndex":newIndex},
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
				} else {
					Ext.Msg.alert("提示","移动失败，下次登录时将不起作用！");
				}
			}
		}
		
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 设置单击列所在的表格
	 * @param {} grid
	 * @param {} columnIndex
	 * @param {} e
	 */
	headerclick:function(grid,columnIndex,e){
		view.currentGridIndex = view.getGridNum(grid.id);
	},
	
	/**
	 * 视图行双击函数
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} e
	 */
	rowdbClick:function(grid,rowIndex,e){
		var gridNum = view.getGridNum(grid.id);
		var vbi = view.viewBaseInfos[gridNum];
		var openJs = vbi.openJs;
		
		//如果打开的脚本为0的话，则不打开相应的文档
		if(openJs=="0")return;
		
		if(vbi.isSonView){
			var row = grid.getStore().getAt(rowIndex);
			var columnIndex = 0;
			
			if(view.viewBaseInfos[gridNum].checkPosition=="02"){
				columnIndex=1;
			}
			
			var unid = row.data[grid.getColumnModel().getDataIndex(columnIndex)];
			
			view.openDocument(1,gridNum,unid,vbi.formType,vbi.formId);
		}
	},
		
	
	/**
	 * 普通视图的列单击函数
	 * 
	 * @param {} grid
	 * @param {} rowIndex
	 * @param {} columnIndex
	 * @param {} e
	 */
	cellclick:function(grid, rowIndex, columnIndex, e){
		if(columnIndex==0)return;
		var gridNum = view.getGridNum(grid.id);
		//if(view.viewBaseInfos[gridNum].operationPos==(columnIndex-1))return;
		//columnIndex-1 必须有且只有一个隐藏列才起作用，否则会有问题 mdf by jc 20100831
		if(grid.getColumnModel().getDataIndex(columnIndex)=="~display~opr~")return;
		var vbi = view.viewBaseInfos[gridNum];
		var openJs = vbi.openJs;
		//以单列打开，默认为第二列，隐藏列算在内 add by jc 20100916
		var isSimpleLink = vbi.isSimpleLink;
		if(isSimpleLink && columnIndex!=2){
			return;
		}
		//如果打开的脚本为0的话，则不打开相应的文档
		if(openJs=="0")return;
		
		if(!vbi.isSonView){
			var row = grid.getStore().getAt(rowIndex);
			var columnIndex = 0;
			
			if(view.viewBaseInfos[gridNum].checkPosition=="02"){
				columnIndex=1;
			}
			
			var unid = row.data[grid.getColumnModel().getDataIndex(columnIndex)];
			//视图预览事件 mdf by jc 20100609
			var previewType = view.viewBaseInfos[gridNum].previewType;
			//默认的宽度与高度
			if(previewType && previewType!="00"){
				view.viewPreview(unid);
			}else{
				view.openDocument(1,gridNum,unid,vbi.formType,vbi.formId);
			}
		}
	},
	
	/**
	 * 视图预览
	 * 
	 * @param {} index
	 */
	preview:function(val,index){
		var formDiv = Ext.getDom("formdiv_"+index);
		
		if(val=="00"){
			formDiv.style.display="none";
		}else{
			formDiv.style.display="";
		}
	},
	
	/**
	 * 根据扩展功能的标识执行扩展功能
	 * 
	 * @param {} sid
	 */
	executeInteration:function(sid){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var gridNum = view.getGridNum(grid.id);
		var selectedRow = grid.getSelectionModel().getSelections();
		if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
		var str="";
		for(var i=0;i<selectedRow.length;i++){
			var row = selectedRow[i];
			str+=","+row.data[grid.getColumnModel().getDataIndex(1)];
		}
		if(str!="")str = str.substring(1);
		//视图配置信息
		var vbi = view.viewBaseInfos[gridNum];
		var json = "{unid:'"+str+"',type:'"+vbi.formType+"',formId:'"+vbi.formId+"'}";
		//alert(json);
		//开始执行扩展功能
		ucapCommonFun.executeInteraction(sid,Ext.decode(json),1);
	},
	
	/**
	 * 普通文档新建窗口
	 */
	newDocument:function(){
		this.openDocument(2);
	},
	/**
	 * 获取分篇信息
	 * @param {} docUnid 当前文档unid
	 * @param {} viewId 当前视图unid
	 * @param {} verb 操作类型 0:第一篇；1：上一篇；2：下一篇；3：最后一篇
	 * @return {unid:unid,error:error}
	 */
	getDocPaper:function(docUnid,viewId,verb){
		var vbi = null;
		
		for(var i=0;i<view.viewBaseInfos.length;i++){
			if(view.viewBaseInfos[i].viewId==viewId){
				vbi = view.viewBaseInfos[i];
				break;
			}
		}
		var unid = "";
  		var error = "";
		if(vbi.viewType=="01"){
			var grid = Ext.getCmp(view.namePrefix+view.index);
			var rowCount = grid.getStore().getCount();
			var beginIndex = 1;
			if(vbi.checkPosition!="02")beginIndex=0;
			if(rowCount>0){
				var unidIndex = grid.getColumnModel().getDataIndex(beginIndex);
				var row = null;
				if(verb=="0"){
					row = grid.getStore().getAt(0);
				}else if(verb=="3"){
					row = grid.getStore().getAt(rowCount-1);
				}else{
					for(var i=0;i<rowCount;i++){
						row = grid.getStore().getAt(i);
						var tmpUnid = row.data[unidIndex];
						if(tmpUnid==docUnid){
							if(verb=="1"){
								if(i==0){
									error = "当前文档已经是本视图第一篇了";
								}else{
									row = grid.getStore().getAt(i-1);
								}
							}else if(verb=="2"){
								if(i>=rowCount-1){
									error = "当前文档已经是本视图最后一篇了";
								}else{
									row = grid.getStore().getAt(i+1);
								}
							}
							break;
						}
					}
				}
				if(null!=row)unid = row.data[unidIndex];
			}else{
				error = "当前视图中没有文档！";
			}			
		}else{
			var oes=document.all("selectid");
  			var url = null;
  			if(null==oes.length || undefined==oes.length)oes = new Array(oes);
  			if(verb=="0"){
  				unid = oes[0].value;
  			}else if(verb=="3"){
  				unid = oes[oes.length-1].value;
  			}else{
  				for(var i=0;i<oes.length;i++){
  					if(oes[i].value==docUnid){
  						if(verb=="1"){
  							if(i==0){
  								error = "当前文档已经是本视图第一篇了";
  							}else{
  								unid = oes[i-1].value;
  							}
  						}else if(verb=="2"){
  							if(i>=(oes.length-1)){
  								error = "当前文档已经是本视图最后一篇了";
  							}else{
  								unid = oes[i+1].value;
  							}
  						}
  						break;
  					}
  				}
  			}
  			
		}
		var result = {"unid":unid,"error":error};
		return result;
	},
	
	/**
	 * yjy 视图上文档打开 只能在视图上调用
	 * @type 1 表示是 视图或首页中的单击打开 2 表示是新建文档 3 表示要通过 选中一个文档后，再打开
	 * 如果为空，要重新取值
	 * @param {} obj
	 */
	openDocument:function(type,gridNum,unid,formType,formId){
		var vbi = null;
		if("undefined"==typeof(type) || type==""){
			Ext.Msg.alert("提示信息","openDocument打开文档type的类型不能为空");
			return;
		}
		if("undefined"==typeof(gridNum) || "undefined"==typeof(unid) || "undefined"==typeof(formType) || "undefined"==typeof(formId)){
			var grid = Ext.getCmp(view.namePrefix+view.index);
			//gridNum = view.getGridNum(grid.id);
			vbi = view.viewBaseInfos[view.index];
			if (type==3){
				var row = grid.getSelectionModel().getSelected();
				var unidIndex = 1;
				if(undefined==row || row==null){
					Ext.MessageBox.alert("提示","请选择要打开的文档!");
					return;
				}
				unid = row.data[grid.getColumnModel().getDataIndex(unidIndex)];
			};
			if(typeof unid=="undefined") unid="";
			formType = vbi.formType;
			formId=vbi.formId;
		}else{
			vbi = view.viewBaseInfos[gridNum];
		}	
		var tmpUrl = view.filterSql(view.purl);
		if(tmpUrl==""){
			tmpUrl = view.pcateUrl;
		}else{
			if(tmpUrl.substring(tmpUrl.length-1)=="&"){
				tmpUrl=tmpUrl+view.pcateUrl;
			}else{
				tmpUrl=tmpUrl+"&"+view.pcateUrl;
			}
		}
		tmpUrl = view.filterSql(tmpUrl);
		if(type==3 || type==2){
			this.openViewDoc(unid,formType,formId,vbi.isFlowItem,tmpUrl);
		}else{
			this.openViewDoc(unid,formType,formId,vbi.isFlowItem,tmpUrl,vbi.openJs);
		}
	},
	/**
	 * yjy 视图中打开（首页上也可调用此方法） 也在 视图的配置js中用 view.openViewDoc(height,width)进行调用
	 * @param {} unid       文档的Unid
	 * @param {} formType   文档类型
	 * @param {} formId     容器的ID
	 * @param {} isFlowItem  是否为流程，默认为 false
	 * @param {} tmpUrl     打开文档时，其他的url参数，格式为 text=999&num=333
	 * @param {} openJs     打开的方法  可为空
	 * @height div窗口的高度
	 * @width  div窗口的宽度
	 * @param {} viewId 视图来源
	 * @param {} openST 文档打开来源类型01频道、02通过嵌入JSP的视图
	 * @param {}viewDocOpenType 当openST=01时频道视图文档打开方式【00为新窗口，02为DIV窗口，注意当前窗口01目前不提供】
	 * @param{} channelId yjy 2011-3-25 增加，主要是在首页打开视图时传入频道所在divId
	 */
	openViewDoc:function(unid,formType,formId,isFlowItem,tmpUrl,openJs,height,width,viewId,openST,viewDocOpenType,channelId){
		if(!viewId && (!openST || openST=="undefined"))viewId = this.viewId;
		if(!openST)openST="";
		if(typeof isFlowItem=="undefined" ) isFlowItem = false;
		if(undefined!=openJs && openJs!=""){
			var openCode = openJs.substring(0,openJs.indexOf("("));
			//执行相应的脚本
			var ib = openJs.indexOf("(")+1;
			var iEnd = openJs.indexOf(")");
			var par = openJs.substring(ib,iEnd);
			if(par.trim()=="") {
				par="";
			} else {par = ","+par};
			var js;
			if (openJs.indexOf("OpenFlowDocByTodoUnid")>-1){
				js = openCode+"('"+unid+"',ucapCommonFun.ucapOpenDoc,'"+par+"&viewMId="+viewId+"&openST="+openST+"')";	
			} else{
				if(tmpUrl && tmpUrl.indexOf("'")>=0){
					var re = /'/g;
					tmpUrl = tmpUrl.replace(re,"");
				}
				js = openCode+"('"+unid+"','"+formType+"','"+
					formId+"',"+isFlowItem+",'"+tmpUrl+"',''"+par+",'"+viewId+"','"+openST+"')";
			}
			ucapCommonFun.evalJavaScript(js);
		}else{//默认普通打开方式
			
			if(isFlowItem){
				//有流程字段则采用流程的方式打开
				//csj 2009.8.6 
				//ucapOpenFlow.openOldFlowDoc("&type="+formType+"&unid="+unid,ucapCommonFun.ucapOpenDoc,1); 
				//频道中有流程的视图打开也要根据频道的打开方式打开,common.js中有具体的调用 mdf by jc 20100913
				//ucapOpenFlow.openOldFlowDoc("&unid="+unid+"&viewMId="+viewId+"&openST="+openST,ucapCommonFun.ucapOpenDoc,1);
				//解决频道打开流程文档div窗口再次无法以DIV弹出问题 mdf by jc 20120314
				var param="&unid="+unid+"&viewMId="+viewId+"&openST="+openST+"&viewDocOpenType="+
				    viewDocOpenType;
				//yjy 2011-3-25 add 在打开的流程文档URL增加当前频道的divId
				if(openST=="01"){
					//说明是在首页频道中打开
					if(typeof channelId!="undefined" ){
						param += "&cnId="+channelId;
					};
				}
				ucapOpenFlow.openOldFlowDoc(param,ucapCommonFun.ucapOpenDoc,1);
			}else{
			    //无流程的打开
				var url = ucapCommonFun.getDocJspPath();
				try{
						//var managerNode = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
			    		var belongToAppId = typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:false;
				    	if(belongToAppId){
							url+="?unid="+unid+"&belongToAppId="+belongToAppId+"&type="+formType+"&formId="+formId+"&viewMId="+viewId+"&openST="+openST;
						} else{
							url+="?unid="+unid+"&type="+formType+"&formId="+formId+"&viewMId="+viewId+"&openST="+openST;
						}
				}
				catch(e){
						url+="?unid="+unid+"&type="+formType+"&formId="+formId+"&viewMId="+viewId+"&openST="+openST;
				}
				
						
				if(undefined!=tmpUrl && tmpUrl!=""){
						url+="&"+tmpUrl;
				}
				var flag=(unid==""?0:1);
				ucapCommonFun.ucapOpenDoc(url,flag,"",height,width,openST,viewDocOpenType);
			}
		}
	},
	/**
	 * 删除视图中选中的文档
	 * @param {} callbackFn 删除成功后的回调函数
	 */
	deleteDocument:function(callbackFn){
		var str="";
		var strResult="";
		if(view.viewBaseInfos[view.index].viewType!="02" && view.viewBaseInfos[view.index].viewType!="03"){
			var grid = Ext.getCmp(view.namePrefix+view.index);
			var selectedRow = grid.getSelectionModel().getSelections();
			if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
			//strResult="[";
			for(var i=0;i<selectedRow.length;i++){
				var row = selectedRow[i];
				str+=","+row.data[grid.getColumnModel().getDataIndex(1)];
				//删除文档的json数据，删除后记录到操作日志里 modify by  fsm 2010.1.20
				if(i==0)
				{
					strResult+=Ext.encode(row.json);
				}
				else
				{
					strResult+=","+Ext.encode(row.json);
				} 
			}
			if(""!=strResult&&null!=strResult&&"null"!=strResult)
			{
				strResult="["+strResult+"]";
			}
			else
			{
				strResult="";
			}
		}else{
			var oes=document.all("selectid");
  			var url = null;
  			if(null==oes.length || undefined==oes.length)oes = new Array(oes);
  			for (i=0;i<oes.length;i++){
  				if (oes[i].checked){
  			   		str =str+","+oes[i].value; 
  				}
  			}
		}
		if(str==""){
			Ext.MessageBox.alert("提示","请选择要删除的文档！");
			return;
		}
		str = str.substring(1);
		//str="["+str+"]";
		Ext.MessageBox.confirm("确认","是否确认要删除选中的文档！",function(btn){
			if(btn=="yes"){
				// 判断为全部删除
				if (grid.getStore().getCount() == (selectedRow.length)){
					var jsonResult=Ext.util.JSON.decode(strResult);
					if(jsonResult.length>0){
						var rs=jsonResult[0];
						// 判断是否为删除字段配置页
						if((typeof rs["fitem_unid"]!="undefined") && (typeof rs["fitem_name_cn"]!="undefined")){
							Ext.Msg.alert("提示", "不能删除所有列，最少得保存一列；建议删除整个表单或者修改字段信息！");
							return;
						}
					}	
				}	
			
				//调用删除方法进行删除
				view.deleteDoc(str,view.viewBaseInfos[view.index].formId,view.viewBaseInfos[view.index].formType,strResult,view.viewBaseInfos[view.index].isFlowItem,callbackFn);
			}
		});
	},
	/**
	 * by@cgc 2011-8-25
	 * 删除用户及同步删除IM中的用户
	 * @param {} callbackFn
	 */
	synDeleteImUser:function(callbackFn){
		var str="";
		var strNames="";
		var strResult="";
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var selectedRow = grid.getSelectionModel().getSelections();
		if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
		for(var i=0;i<selectedRow.length;i++){
			var row = selectedRow[i];
			str+=","+row.data[grid.getColumnModel().getDataIndex(1)];
			strNames+=","+row.data[grid.getColumnModel().getDataIndex(2)];
			//删除文档的json数据，删除后记录到操作日志里 modify by  fsm 2010.1.20
			if(i==0){
				strResult+=Ext.encode(row.json);
			}
			else{
				strResult+=","+Ext.encode(row.json);
			} 
		}
		if(""!=strResult&&null!=strResult&&"null"!=strResult){
			strResult="["+strResult+"]";
		}else{
			strResult="";
		}		
		if(str==""){
			Ext.MessageBox.alert("提示","请选择要删除的文档！");
			return;
		}
		str = str.substring(1);
		strNames=strNames.substring(1);
		Ext.MessageBox.confirm("确认","是否确认要删除选中的文档！",function(btn){
			if(btn=="yes"){	
				//调用删除方法进行删除
				view.deleteDoc(str,view.viewBaseInfos[view.index].formId,view.viewBaseInfos[view.index].formType,strResult,view.viewBaseInfos[view.index].isFlowItem,callbackFn);
				synDeleteUser(strNames);
			}else{
				return;
			}
		});
	},

	
	/**
	 * 删除流程文档
	 * @param {} docUnids 文档标识，如果多个则以逗号"，"分隔
	 * @param {} formId     表单标识
	 * @param {} formType 表单类型，“01”，表单，“02”，显示表单，“03”组合表单
	 * @param {} strResult  记录操作日志的标题,json格式的字符串{title,"关于..."}
	 * @param {} isFlowItem 是否为流程记录 true,false
	 * @param {} callbackFn 回调函数
	 */
	deleteDoc:function(docUnids,formId,formType,strResult,isFlowItem,callbackFn){
		var json = {"formUnid":formId,formType:formType,docUnid:docUnids,"strResult":strResult,"isFlowItem":view.viewBaseInfos[view.index].isFlowItem};
		var para="";
		var belongToAppId = ucapCommonFun.getUrlParameter("belongToAppId");
		if(belongToAppId){
			para={"type":"getForm","act":"delete","belongToAppId":belongToAppId};
		}else {
			var belongToAppId = window.top.ucapCommonFun.getUrlParameter("belongToAppId");
			if(belongToAppId){
				para={"type":"getForm","act":"delete","belongToAppId":belongToAppId};
			}else{
				try{
					var belongToAppId = typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:false;
					if(belongToAppId&&belongToAppId!=""){
					   para={"type":"getForm","act":"delete","belongToAppId":belongToAppId};
				    }else {
				    	para={"type":"getForm","act":"delete"};
				    }
				}catch (e){
					para={"type":"getForm","act":"delete"};
				}
			}
		}
		var _callbackFn = callbackFn||"";
		var requestConfig = {
			url:ucapSession.baseAction,
			params:para,
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					Ext.Msg.alert("提示","删除文档成功！");
					//view.refresh();
					if(view.viewBaseInfos[view.index].isEdit)
					{
						view.deleteEditorGridData();
					}
					else
					{
						view.refresh();
					}//当可直接编辑表格视图，删除后，不刷新视图 modify by fsm  10.7.15
					//增加回调函数 add by jc 20100716
					ucapCommonFun.evalJavaScript(_callbackFn);
				} else {
					Ext.Msg.alert("提示","删除文档不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 删除表单事件
	 */ 
	deleteFormEvent:function(){
		var str="";
		var strResult="";
		if(view.viewBaseInfos[view.index].viewType!="02" && view.viewBaseInfos[view.index].viewType!="03"){
			var grid = Ext.getCmp(view.namePrefix+view.index);
			var selectedRow = grid.getSelectionModel().getSelections();
			if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
			//strResult="[";
			for(var i=0;i<selectedRow.length;i++){
				var row = selectedRow[i];
				str+=","+row.data[grid.getColumnModel().getDataIndex(1)];
				if(i==0)
				{
					strResult+=Ext.encode(row.json);
				}
				else
				{
					strResult+=","+Ext.encode(row.json);
				} 
			}
			if(""!=strResult&&null!=strResult&&"null"!=strResult)
			{
				strResult="["+strResult+"]";
			}
			else
			{
				strResult="";
			}
		}else{
			var oes=document.all("selectid");
  			var url = null;
  			if(null==oes.length || undefined==oes.length)oes = new Array(oes);
  			for (i=0;i<oes.length;i++){
  				if (oes[i].checked){
  			   		str =str+","+oes[i].value; 
  				}
  			}
		}
		if(str==""){
			Ext.MessageBox.alert("提示","请选择要删除的文档！");
			return;
		}
		str = str.substring(1);
		//str="["+str+"]";
		Ext.MessageBox.confirm("确认","是否确认要删除选中的文档！",function(btn){
			if(btn=="yes"){
				var json = {"formUnid":view.viewBaseInfos[view.index].formId,formType:view.viewBaseInfos[view.index].formType,docUnid:str,"strResult":strResult};
				var para= {"type":"getForm","act":"deleteFormEvent"};
				var requestConfig = {
					url:ucapSession.baseAction,
					params:para,
					jsonData:json,
					callback:function(options,success,response){
						if (success){
							var exjson = Ext.util.JSON.decode(response.responseText);	
							var exResult=ucapCommonFun.dealException(exjson);
							if(!exResult)return;
							
							Ext.Msg.alert("提示","删除文档成功！");
							view.refresh();
							
						} else {
							Ext.Msg.alert("提示","删除文档不成功！");
						}
					}
				}
				Ext.Ajax.request(requestConfig);
				
			}
		});
	},
	/**
	 * 分级管理删除用户
	 */
	deleteUserDocument:function(){
		var str="";
			var grid = Ext.getCmp(view.namePrefix+view.index);
			var selectedRow = grid.getSelectionModel().getSelections();
			if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
			for(var i=0;i<selectedRow.length;i++){
				var row = selectedRow[i];
				str+=","+row.data[grid.getColumnModel().getDataIndex(1)];
			}
		if(str==""){
			Ext.MessageBox.alert("提示","请选择要删除的文档！");
			return;
		}
		//var node = ucapManagerTree.contacterTree.getSelectionModel().getSelectedNode();
	    var belongToAppId = typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:false;
		str = str.substring(1);
		//str="["+str+"]";
		Ext.MessageBox.confirm("确认","是否确认要删除选中的文档！",function(btn){
			if(btn=="yes"){
				var json = {"belongToAppId":belongToAppId,"formUnid":view.viewBaseInfos[view.index].formId,formType:view.viewBaseInfos[view.index].formType,docUnid:str};
				var requestConfig = {
					url:ucapSession.baseAction,
					params:{"type":"getForm","act":"deleteUser"},
					jsonData:json,
					callback:function(options,success,response){
						if (success){
							var exjson = Ext.util.JSON.decode(response.responseText);	
							var exResult=ucapCommonFun.dealException(exjson);
							if(!exResult)return;
							
							Ext.Msg.alert("提示","删除文档成功！");
							view.refresh();
							
						} else {
							Ext.Msg.alert("提示","删除文档不成功！");
						}
					}
				}
				Ext.Ajax.request(requestConfig);
				
			}
		});
	},
	/**
	 * 回收站上的操作，包括文档的还原很删除
	 * 
	 * @param {} type
	 */
	recycleDoc:function(type){
		var action = "delete";
		var actionTip = "删除";
		
		if("undefined"!=typeof(type) && type==1){
			action = "restore";
			actionTip = "还原";
		}
		
		var grid = Ext.getCmp(view.namePrefix+view.index);
		var selectedRow = grid.getSelectionModel().getSelections();
		if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
		var str="";
		for(var i=0;i<selectedRow.length;i++){
			var row = selectedRow[i];
			str+=","+row.data[grid.getColumnModel().getDataIndex(1)];
		}
		if(str==""){
			Ext.MessageBox.alert("提示","请选择要"+actionTip+"的文档！");
			return;
		}
		str = str.substring(1);
		//str="["+str+"]";
		Ext.MessageBox.confirm("确认","是否确认要"+actionTip+"选中的文档！",function(btn){
			if(btn=="yes"){
				var json = {docUnid:str};
				var requestConfig = {
					url:ucapSession.baseAction,
					params:{"type":"recycle","action":action},
					jsonData:json,
					callback:function(options,success,response){
						if (success){
							var exjson = Ext.util.JSON.decode(response.responseText);	
							var exResult=ucapCommonFun.dealException(exjson);
							if(!exResult)return;
							
							Ext.Msg.alert("提示",actionTip+"文档成功！");
							view.refresh();
							
						} else {
							Ext.Msg.alert("提示",actionTip+"文档不成功！");
						}
					}
				}
				Ext.Ajax.request(requestConfig);
				
			}
		});
			
	},
	/**
	 * 
	 * @type 
	 */
	filterSql:function(purl){
		//过滤父url
		if(undefined==purl || purl=="" || purl=="null" || purl==null)return "";
		
		var canHasInstanceId = true;
		
		if(purl.indexOf("funid=")>=0)canHasInstanceId=false;
		
		var purls = purl.split("&");
		var tmpUrl = "";
		for(var i=0;i<purls.length;i++){
			var tmpName = purls[i].substring(0,purls[i].indexOf("="));
			if(tmpName=="unid" || tmpName=="type" || tmpName=="formId")continue;
			
			if(!canHasInstanceId && tmpName=="instanceUnid"){
				continue;
			}
			
			if(tmpUrl==""){
				tmpUrl =  purls[i];
			}else{
				tmpUrl+="&"+purls[i];
			}	
		}
		
		return tmpUrl;
	},
	
	/**
	 * 进行刷新当前视图
	 */
	refresh:function(viewMId){
		var index = null,win=window;
		var myview = win.view;
		if(myview && null!=myview.getIndexFromBaseInfo){
			if(viewMId){
				//此if里面的代码目前主要用于页签式方式，保存文档时刷新原视图用的
				index = myview.getIndexFromBaseInfo(viewMId);
				//判断当前window里面是否存在此视图
				if(index==-1){
					/**
					 * 用于递归所有iframe里的iframe
					 * 根据视图UNID返回其window对象及视图index
					 */
					var fn = function(viewMId,wins){
						var ix = -1;
						var iframes = (wins||window).Ext.query("iframe");//所有的iframe
						for (var i = 0; i < iframes.length; i++) {
							var ifrWin = iframes[i].contentWindow;
							if(ifrWin.view && ifrWin.view.getIndexFromBaseInfo){
								ix = ifrWin.view.getIndexFromBaseInfo(viewMId);
								if(ix==-1){
									ix = fn(viewMId,ifrWin);
									if(ix!=-1){
										//找到返回并退出for循环
										return ix;
									}
								}else{
									//找到相应的iframe就返回其window对象
									win = ifrWin;
									return ix;
								}
							}//end if
						}//end for
						return ix;
					};//递归函数fn结束
					index = fn(viewMId);
					myview = win.view;
				}
			}
			if(null==index || index==-1){
				index = myview.index;
			}
			//具体的刷新逻辑
			if(myview.viewBaseInfos && myview.viewBaseInfos[index] && myview.viewBaseInfos[index].viewType!="02" 
				&& myview.viewBaseInfos[index].viewType!="03"){
				try{
					var grid = win.Ext.getCmp(myview.namePrefix+index);
					if (grid){
						grid.getStore().removeAll();
						grid.getBottomToolbar().updateInfo();
						//grid.getStore().reload();
						grid.getStore().reload({params:{start:0,limit:myview.viewBaseInfos[index].pageSize}});
					} else {
						//要取嵌入视图的view	
					}
				}catch(e){};
			}else{
				if(null!=myview.stores && null!=myview.stores[index])myview.stores[index].reload();
			}
		}
		view.deleteViewData=[];//视图刷新 重置view.deleteViewData 
	},
	
	/**
	 * 视图重置操作，清空视图上的查询信息
	 */
	reset:function(){
		var grid = Ext.getCmp(view.namePrefix+view.index);
		if(grid){
			var keywordObj = Ext.getDom("keyword");
			keywordObj.value = "";
			
			var divobj = Ext.getDom("searchMore_"+view.index);
			var inputObjs = divobj.getElementsByTagName("input");
			for(var i=0;i<inputObjs.length;i++){
				var inputObj = inputObjs[i];
				if(inputObj.type=="text" && inputObj.value!=""){
					inputObj.value="";
				}
			}
			inputObjs = divobj.getElementsByTagName("textarea");
			for(var i=0;i<inputObjs.length;i++){
				inputObjs[i].value="";
			}
			grid.getStore().removeAll();
			grid.getBottomToolbar().updateInfo();
			grid.getStore().baseParams={extracon:"",categorycon:""};
			grid.getStore().reload({params:{start:0,limit:view.viewBaseInfos[view.index].pageSize}});
		}
		view.deleteViewData=[];//视图刷新 重置view.deleteViewData 
	},
	
	/**
	 * 视图当中的个人自定义
	 */
	selfConfig:function(type,index){
		var currrentViewId = view.viewBaseInfos[index].viewId;
		
		if(type=="01"){//视图基本信息
			viewConfig.configViewInfo(currrentViewId);
		}else if(type=="02"){//视图列
			viewConfig.configViewColumns(currrentViewId);
		}else if(type=="03"){//视图简单查询
			viewConfig.configSimpleQuery(currrentViewId);
		}else if(type=="04"){//视图高级查询
			viewConfig.configAdvancedQuery(currrentViewId);
		}else if(type=="05"){//视图排序
			viewConfig.configSortItem(currrentViewId);
		}else if(type=="06"){//视图分类
			viewConfig.configCategoryItem(currrentViewId);
		}else if(type=="07"){//视图条件
			viewConfig.configViewCondition(currrentViewId);
		}else if(type=="08"){//子按钮配置
			viewConfig.configSubButton(currrentViewId);
		}else if(type=="10"){//恢复默认
			viewConfig.configRestoreDefault(currrentViewId);
		}
		
		view.currentGridIndex = index;
	},
	
	/**
	 * 查询时按回车触发的事件
	 * 
	 * @param {} index
	 */
	kdSearch:function(index){
		if(event.keyCode==13){//回车时进行查询
			view.search(index);
		}
	},
	
	/**
	 * 视图中简单查询的操作
	 * 
	 * @param {} index
	 */
	search:function(index){
		var searchValue = "";
		var theEvent = ucapCommonFun.getEvent();
		var srcElement = theEvent.srcElement;
		if (!srcElement){
		       srcElement = theEvent.target;
		}
		var divobj=srcElement.parentElement||srcElement.parentNode;

		var options = Ext.getDom("simpleSearchSelect_"+index).options;
		var inputObjs = divobj.getElementsByTagName("input");
		var inputObj = null;
		
		for(var i=0;i<inputObjs.length;i++){
			if(inputObjs[i].name=="keyword"){
				inputObj = inputObjs[i];
				break;
			}
		}
		//mdy by llp 2010-06-01 在搜索关键字可以允许输入","或"，"作为分隔符，查询不同的数据
		var inputObjVal = null;
		if("undefined"!=typeof(inputObj.value) && inputObj.value.indexOf("，")>0){
			inputObjVal = inputObj.value.split("，");
		}else{
			inputObjVal = inputObj.value.split(",");
		}
		//add by cxifu@linewell.com 2012-06-19
		//搜索时去除关键字的前后空格
		if(null!=inputObjVal && null!=inputObjVal.length && inputObjVal.length>0){
			for(var i=0;i<inputObjVal.length;i++){
				inputObjVal[i]=inputObjVal[i].trim();
			}
		}
		//end add by cxifu
		for(var i=1;i<options.length;i++){
			var option = options[i];
			if(option.selected)searchValue="";
			for(var j=0;j<inputObjVal.length;j++){
				if(searchValue==""){
				    searchValue =view.fieldDbType+option.value+view.fieldEndPrefix+view.sqlLikeKey+view.fieldConstType+inputObjVal[j]+view.fieldEndPrefix;
			    }else{
				    searchValue =searchValue+view.sqlOr+view.fieldDbType+option.value+view.fieldEndPrefix+view.sqlLikeKey+view.fieldConstType+inputObjVal[j]+view.fieldEndPrefix;
			    }
			}
			if(option.selected){
				break;
			}
		}
		view.reloadByCon(index,searchValue,"01");
	},
	
	
	/**
	 * 高级查询
	 * 
	 * @param {} index
	 */
	advancedSearch:function(index){
		var searchValue = "";
		var divobj = Ext.getDom("searchMore_"+index);
		var inputObjs = divobj.getElementsByTagName("input");
		for(var i=0;i<inputObjs.length;i++){
			var inputObj = inputObjs[i];
			var inputObjName = (inputObj.name||inputObj.id).replace(view.advPrefix,"");
			//if(inputObj.type=="text" && inputObj.value!=""){//modify by jc 解决通用选择框无法正常取到值
			if((inputObj.type=="text"||inputObj.type=="hidden") && inputObj.value!=""){
				//mdf by cxifu@linewell.com 2012-06-19
				//搜索时去除关键字的前后空格
				var inputObjValue=inputObj.value.trim();
				if(view.hasBeginInputName(inputObjName,index)){				
					if(inputObjName.lastIndexOf("_1")>0){
						searchValue=searchValue+view.fieldDbType+inputObjName.substring(0,inputObjName.length-2)+view.fieldEndPrefix
						+view.sqlGTEQ+view.fieldConstType+inputObjValue+view.fieldEndPrefix+view.sqlAnd;
					}else{
						searchValue=searchValue+view.fieldDbType+inputObjName.substring(0,inputObjName.length-2)+view.fieldEndPrefix
						+view.sqlLTEQ+view.fieldConstType+inputObjValue+view.fieldEndPrefix+view.sqlAnd;
					}
				}else{
					//不存在name时
					if(!inputObjName || inputObjName.lastIndexOf("_Cn_")>0){
						continue;
					}
					var inputName =inputObjName;
					//if(inputName.lastIndexOf("_Cn_")>0)inputName = inputName.substring(0,inputName.lastIndexOf("_Cn_"));
					searchValue=searchValue+view.fieldDbType+inputName+view.fieldEndPrefix+view.sqlLikeKey+view.fieldConstType+inputObjValue+view.fieldEndPrefix+view.sqlAnd;
				}
			}
		}
		var selectObjs = divobj.getElementsByTagName("select");
		for(var i=0;i<selectObjs.length;i++){
			var selectObj = selectObjs[i];
			if(selectObj.value=="")continue;
			searchValue=searchValue+view.fieldDbType+selectObj.name.replace(view.advPrefix,"")+view.fieldEndPrefix
						+view.sqlEQ+view.fieldConstType+selectObj.value+view.fieldEndPrefix+view.sqlAnd;
		}
		if(searchValue==""){
			Ext.MessageBox.alert("信息提示","请针对查询字段输入相应的查询值！");
			return;
		}
		searchValue = searchValue.substring(0,searchValue.length-view.sqlAnd.length);
		view.reloadByCon(index,searchValue,"01");
	},
	
	/**
	 * 判断一个对象列表是否已经有包含inputname对象，有返回true，否则返回false
	 * 
	 * @param {} inputObjs 判断一个对象列表
	 * 
	 * @param {} inputName 输入框名称
	 */
	hasInputByName:function(inputObjs,inputName){
		var result = false;
		for(var i=0;i<inputObjs.length;i++){
			var inputObj = inputObjs[i];
			if(inputObj.name==(inputName+"_Cn_")){
				result = true;
				break;
			}
		}
		return result;
	},
	
	/**
	 * 根据外部条件
	 * @param {} index
	 * @param {} extracon
	 */
	reloadByCon:function(index,searchValue,type,pcateUrl){
		if("undefined"!=typeof(pcateUrl)){
			view.pcateUrl = pcateUrl;
		}
		if(view.viewBaseInfos[index].viewType!="02" && view.viewBaseInfos[index].viewType!="03"){
			//根据外部条件重新加载表格中的数据
			var grid = Ext.getCmp(view.namePrefix+index);
		
			if(undefined!=type && type=="01"){
				if("undefined"!=typeof(grid.getStore().baseParams.categorycon)){
					grid.getStore().baseParams={extracon:searchValue,categorycon:grid.getStore().baseParams.categorycon};
				}else{
					grid.getStore().baseParams={extracon:searchValue};
				}
			}else{
				grid.getStore().baseParams={categorycon:searchValue};
			}
			grid.getStore().removeAll();
			grid.getBottomToolbar().updateInfo();
			grid.getStore().reload({params:{start:0,limit:view.viewBaseInfos[index].pageSize}});
		}else{
			//根据外部条件重新加载表格中的数据
			if(undefined!=type && type=="01"){
				if("undefined"!=typeof(view.stores[index].baseParams.categorycon)){
					view.stores[index].baseParams={extracon:searchValue,categorycon:view.stores[index].baseParams.categorycon};
				}else{
					view.stores[index].baseParams={extracon:searchValue};
				}
			}else{
				view.stores[index].baseParams={categorycon:searchValue};
			}
			//grid.getStore().removeAll();
			//grid.getBottomToolbar().updateInfo();
			view.stores[index].reload({params:{start:0,limit:view.viewBaseInfos[index].pageSize}});
		}
	},
	
	/**
	 * 根据一个字段名称判断一个字段是否为起字段
	 * @param {} inputName
	 * @param {} index
	 * @return {}
	 */
	hasBeginInputName:function(inputName,index){
		var result = false;

		var advancedQueryItems = view.viewBaseInfos[index].advancedJson;
		if(inputName.substr(inputName.length-2)=="_1" ||  inputName.substr(inputName.length-2)=="_2"){
			inputName = inputName.substr(0,inputName.length-2);
		}else{
			return result;
		}
		if(undefined!=advancedQueryItems){
			for(var i=0;i<advancedQueryItems.length;i++){
				var advancedQueryItem = advancedQueryItems[i];
				if(advancedQueryItem.itemNameEn==view.advPrefix+inputName && advancedQueryItem.hasBegin){
					return true;
				}
				
			}
		}
		
		return result;
	},
	
	/**
	 * 加载视图中的字段列表
	 * 
	 * @param {} viewId
	 */
	loadItemsConfig:function(viewId){
		var json = null;
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"viewSelfConfig","action":"getFormItemEnCn",
					"viewId":viewId},
			callback:function(options,success,response){
				if (success){
					json = Ext.util.JSON.encode(response.responseText);					
					var exResult=ucapCommonFun.dealException(json);
					if(!exResult)return;
					return json;
				} else {
					Ext.Msg.alert("提示","表单字段或数据库视图字段加载不成功！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 根据视图标识获取视图名称
	 * 
	 * @param {} viewIds 视图标识
	 */
	getViewDisplayName:function(viewIds){
		var tjson=null;
		var url =ucapSession.baseAction;
		
		url+="?viewIds="+viewIds+"&action=getViewName&type=getView&rand="+Math.random();
		
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var exjson = Ext.util.JSON.encode(conn.responseText);					
		var exResult=ucapCommonFun.dealException(exjson);
		if(!exResult)return;
		
		return conn.responseText;
	//tjson = Ext.util.JSON.decode(conn.responseText);
		//return tjson.titles;
	},
	/*
	 * 通过表格中选中行的标识集，
	 * @param {} viewIds 以","分隔的字符串
	 */
	getSelecedUnid:function(){
	    var str = "";
	    if(view.viewBaseInfos[view.index].viewType!="02" && view.viewBaseInfos[view.index].viewType!="03"){
			var unidIndex = 0;
			if(view.viewBaseInfos[view.index].checkPosition=="02"){
				unidIndex=1;
			}
			var grid = Ext.getCmp(view.namePrefix+view.index);
			var selectedRow = grid.getSelectionModel().getSelections();
			if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
			for(var i=0;i<selectedRow.length;i++){
				var row = selectedRow[i];
				str+=","+row.data[grid.getColumnModel().getDataIndex(unidIndex)];
			}
		}else{
			var oes=document.all("selectid");
  			var url = null;
  			if(null==oes.length || undefined==oes.length)oes = new Array(oes);
  			for (i=0;i<oes.length;i++){
  				if (oes[i].checked){
  			   		str =str+","+oes[i].value; 
  				}
  			}
		}
		if(str!="")str = str.substring(1);
		return str;
	},
	/**
	 * 视图编辑保存前验证函数
	 * @param {} jsondata 保存前的Json数据
	 * @return {Boolean}
	 */
	viewSaveValidator:function(jsondata){
		return true;
	},
	curViewPreviewUnid:null,
	/**
	 * 视图预览功能，目前只支持表单，不支持组合表单
	 * @param {} unid
	 */
	viewPreview:function(unid){
		if(!unid)unid="";//unid不存在时为在预览窗口中新建
		//获取布局对象用来自适应大小
		var ucapViewport = Ext.getCmp("ucap_Viewport");
		if(ucapViewport==null){
			Ext.Msg.alert("系统提示","视图预览对象加载不成功！");
			return;
		}
		var formType = view.viewBaseInfos[view.index].formType;
		var formUnid = view.viewBaseInfos[view.index].formId;
		var curViewId = view.viewBaseInfos[view.index].viewId;
		var previewType = view.viewBaseInfos[view.index].previewType;
		var previewSize = parseInt(view.viewBaseInfos[view.index].previewSize)||ucapViewport.getEl().getHeight()/2;
		var defWidth = 0, defHeight = 0;
		
		if(previewType){
			switch(previewType){
				case "01":
					previewType = "north";
					defHeight = 1;
					break;
				case "02":
					previewType = "south";
					defHeight = 1;
					break;
				case "03":
					previewType = "west";
					defWidth = 1;
					break;
				case "04":
					previewType = "east";
					defWidth = 1;
					break;
				default:
					previewType = "east";
					defWidth = 1;
			}
			var renderto = "ucapViewPreviewDiv";
			curViewId = null;
			
			var ucapVP = Ext.getCmp("ucapViewPreviewDiv_"+previewType);
			/**
			 * 实际视图区域，用来放视图
			 */
			var ucapCenter = Ext.getCmp("ucapViewPreviewDiv_center");
			/**
			 * 调整视图的宽度与高度事件
			 */
			ucapCenter.on("resize",function(obj,width,height){
				try{
					if(ucapCenter.hidden){
						//当视图隐藏时,表单进行宽或高的最大化
						if(defHeight){
							ucapVP.setHeight(Ext.getBody().getHeight());
						}
						if(defWidth){
							ucapVP.setWidth(Ext.getBody().getWidth());
						}
					}else{
						if(obj.getEl().getHeight()>0 && height<150 && height>0){
							//将预览窗口还原到默认大小,防止视图被完全遮挡
							ucapVP.setHeight(previewSize);
							//obj.setHeight(150);//不用这个的原因是：resize事件会死循环
						}
						ucapCommonFun.setViewWidth(width);//设置视图宽度
						ucapSession.middleHeight = height;//设置高度时会用到
						view.setGridHeight();//设置视图高度
					}
					ucapViewport.syncSize();//自适应大小
				}catch(e){}
			});
			//当前打开的文档与上次打开的文档相同则不重新加载
			if(this.curViewPreviewUnid!=unid){
				//显示预览窗口
				if(!ucapCenter.hidden){
					if(defWidth)ucapVP.setWidth(previewSize);
					if(defHeight)ucapVP.setHeight(previewSize);
				}
				if($("ucapViewFormData_"+previewType)){
					$("ucapViewFormData_"+previewType).innerHTML = '<div id="toolBar">\
																			<div id="_ucapFormDocTitle" style="float:left;position:absolute;padding:5px 0px 0px 5px;"></div>\
																			<div id="toolBarButton"><!-- 按钮区 --></div>\
																			</div>\
																			<div id="ucapViewPreviewDiv">\
																			</div>';
				}
				_UcapForm.cfg.unid = unid;//设置文档UNID,文档保存时需要用到
				//设置curViewId=null时表单initAjax中将把表单JSON设置到普通表单的JSON中
				view.viewFormManager.loadDocFormData(unid,curViewId,formType,formUnid,renderto);
				//加载按钮
				_UcapForm.tool.setButton(_UcapForm.cfg.subButtonList,"toolBarButton");
				this.curViewPreviewUnid = unid;
			}
			ucapVP.show();
			//ucapVP.hide();
			ucapViewport.syncSize();//自适应大小
		}
	},
	/**
	 * 视图预览布局
	 */
	newViewport:function(renderto){
		var defWidth = Ext.getBody().getWidth()/2;
		var defHeight = Ext.getBody().getHeight()/2;
		/**
		 * 顶部按钮栏事件
		 * 按钮对象obj,需要操作的对象otherId,操作是宽还是高wh
		 */
		var maxDivFun = function(obj,otherId,wh){
			if(obj.text=="最大化"){
				Ext.getCmp("ucapViewPreviewDiv_center").hide();
				if(!wh){
					Ext.getCmp(otherId).setWidth("auto");
				}else{
					//Ext.getCmp(otherId).setHeight("100%");
					Ext.getCmp(otherId).setHeight(Ext.getBody().getHeight());
				}
				obj.setText("显示视图");
			}else{
				Ext.getCmp("ucapViewPreviewDiv_center").show();
				if(!wh){
					Ext.getCmp(otherId).setWidth(defWidth);
				}else{
					Ext.getCmp(otherId).setHeight(defHeight);
				}
				obj.setText("最大化");
			}
			Ext.getCmp("ucap_Viewport").syncSize();
		};
		/**
		 * 取消预览
		 * 按钮对象obj,需要操作的对象otherId,操作是宽还是高wh
		 */
		var hideDivFun = function(obj,otherId,wh){
				Ext.getCmp("ucapViewPreviewDiv_center").show();
				if(!wh){
					Ext.getCmp(otherId).setWidth(defWidth);
				}else{
					Ext.getCmp(otherId).setHeight(defHeight);
				}
				Ext.getCmp(otherId).hide();
				Ext.getCmp("ucap_Viewport").syncSize();
				//设置为最大化按钮
		};
		//目前为创建view.jsp中的布局
		new Ext.Viewport({
			id:"ucap_Viewport",
			layout:"border",
			hideMode:"display",
			//monitorResize:true,
			items:[
				{
					id:"ucapViewPreviewDiv_north",
					region:"north",
					height:defHeight,
					autoScroll:true,
					collapsible: true,
					split: true,
//					title:"视图预览",
					hideMode:"display",
					hidden:true,
					items:{
						tbar:[
								{text:'最大化',handler:function(obj){
									maxDivFun(obj,"ucapViewPreviewDiv_north",1);
								}},
								{
									text:'取消预览',handler:function(obj){
										hideDivFun(obj,"ucapViewPreviewDiv_north",1);
								}}
								], 
						html:'<div id="ucapViewFormData_north"></div>'
					}
				},
				{
					id:"ucapViewPreviewDiv_south",
					region:"south",
					height:defHeight,
					autoScroll:true,
					collapsible: true,
					split: true,
//					title:"视图预览",
					hideMode:"display",
					hidden:true,
					items:{
						tbar:[
								{text:'最大化',handler:function(obj){
									maxDivFun(obj,"ucapViewPreviewDiv_south",1);
								}},
								{
									text:'取消预览',handler:function(obj){
										hideDivFun(obj,"ucapViewPreviewDiv_south",1);
								}}
								], 
						html:'<div id="ucapViewFormData_south"></div>'
					}
				},
				{
					id:"ucapViewPreviewDiv_center",
					region:"center",
					//title:"视图数据",
					//autoScroll:true,
					minWidth:550,
					minHeight:150,
					html:"<div id='ucapviewdiv'></div>"
				},
				{
					id:"ucapViewPreviewDiv_west",
					region:"west",
					width:defWidth,
					autoScroll:true,
					collapsible: true,
					split: true,
//					title:"视图预览",
					hideMode:"display",
					hidden:true,
					items:{
						tbar:[
								{text:'最大化',handler:function(obj){
									maxDivFun(obj,"ucapViewPreviewDiv_west");
								}},
								{
									text:'取消预览',handler:function(obj){
										hideDivFun(obj,"ucapViewPreviewDiv_west");
								}}
								], 
						html:'<div id="ucapViewFormData_west"></div>'
					}
				},
				{
					id:"ucapViewPreviewDiv_east",
					region:"east",
					width:defWidth,
					autoScroll:true,
					collapsible: true,
					split: true,
//					title:"视图预览",
					hideMode:"display",
					hidden:true,
					items:{
						tbar:[
								{text:'最大化',handler:function(obj){
									maxDivFun(obj,"ucapViewPreviewDiv_east");
								}},
								{
									text:'取消预览',handler:function(obj){
										hideDivFun(obj,"ucapViewPreviewDiv_east");
								}}
								], 
						html:'<div id="ucapViewFormData_east"></div>'
					}
				}
			]
		}); 
	}
}//end view
/**
 * 视图表单列表管理工具
 * @type json
 * add by jc 20100527
 */
view.viewFormManager = {
	/**
	 * 当前视图表单列表的视图UNID
	 * @type string
	 */
	curViewId:null,
	/**
	 * 当前视图表单列表的JSON
	 * @type  json
	 */
	viewFormList:null,
	/**
	 * 刷新重新加载，iframe嵌入时可用
	 */
	reload:function(){
		if(window.top!=window){
			window.location.reload();
		}
	},
	/**
	 * 全选
	 */
	selectedAll:function(){
		var curViewId=this.curViewId,viewFormList=this.viewFormList;
		var path = 'input[curViewId=' + curViewId + ']';
		var objs = Ext.DomQuery.select(path);
		for(var i=0;i<objs.length;i++){
			var o = objs[i];
			if(ucapCommonFun.getAttr(o,"checked")==false)o.click();
		}
	},
	/**
	 * 反向选择所有
	 */
	reverseAll:function(){
		var curViewId=this.curViewId,viewFormList=this.viewFormList;
		var path = 'input[curViewId=' + curViewId + ']';
		var objs = Ext.DomQuery.select(path);
		for(var i=0;i<objs.length;i++){
			var o = objs[i];
			o.click();
		}
	},
	/**
	 * 清除所有选择
	 */
	cleanSelectedAll:function(){
		var curViewId=this.curViewId,viewFormList=this.viewFormList;
		var path = 'input:checked[curViewId=' + curViewId + ']';
		var objs = Ext.DomQuery.select(path);
		for(var i=0;i<objs.length;i++){
			var o = objs[i];
			o.click();
		}
	},
	/**
	 * 设置视图表单列表高度
	 */
	setHeight:function(){
		if($(_UcapForm.mainDiv)){
			if($("_ucap_viewFormButton")){
				if(ucapSession.middleHeight==0){
					ucapCommonFun.autoMenuHeight();
				}
				var btnH = ($("_ucap_viewFormButton").offsetHeight);
				$(_UcapForm.mainDiv).style.height = ucapSession.middleHeight-btnH;
			}
		}
	},
	/**
	 * 根据视图表单列表集，从后台加载旧文档数据
	 * @param {} data
	 * @param {} formType
	 * @param {} formUnid
	 * @param {} formPrimary
	 */
	loadFormData:function(data,curViewId,formType,formUnid,formPrimary){
		if(data && data.length>0){
			for (var i = 0; i < data.length; i++) {
				var rowNum = i+1;
				var unid = data[i][formPrimary];
				var renderto = curViewId+"_"+rowNum;
				var poxName = null;
				//从后台加载旧文档表单数据
				_UcapForm.ucapForm.initAjax(unid,formType,formUnid,null,null,1,curViewId,renderto,rowNum,poxName);
				//this.loadDocFormData(unid,formType,formUnid,renderto,rowNum);
			}
		}else{
			//新文档无数据时，自动增加一条新记录
			view.viewFormManager.addForm();
		}
	},
	/**
	 * 加载单一文档表单数据
	 * @param {} unid
	 * @param {} curViewId
	 * @param {} formType
	 * @param {} formUnid
	 * @param {} renderto
	 * @param {} rowNum
	 */
	loadDocFormData:function(unid,curViewId,formType,formUnid,renderto,rowNum){
		rowNum = rowNum||1;
		renderto = renderto||(curViewId+"_"+rowNum);
		var poxName = null;
		//从后台加载旧文档表单数据
		_UcapForm.ucapForm.initAjax(unid,formType,formUnid,
													null,null,1,curViewId,renderto,rowNum,poxName);
	},
	/**
	 * 默认的HTML模板主体
	 * @param {} curViewId
	 * @param {} rowNum
	 * @param {} unid
	 * @return {}
	 */
	getDefMHtml:function(curViewId,rowNum,unid){
			//记录标题区
			//记录体
			var mHtml='<table width="98%" id="table_'+curViewId+"_"+rowNum+'">\
							<tr><td style="width:20px;">\
									<input type="checkbox" rowNum="'+rowNum+'" curViewId="'+curViewId+'" value="'+unid+'"/>';
			mHtml+='</td><td>\
							<div id="'+curViewId+"_"+rowNum+'">正在加载,请稍后……</div></td></tr></table>';
			//mHtml+='<span style="float:left;width:95%;"><br/></span>';//分隔空行
			return mHtml;
	},
	/**
	 * 加载模板HTML,参数为data
	 * @param {} data
	 * @param {} curViewId
	 * @param {} viewFormList
	 * @param {} formPrimary
	 * @return {}
	 */
	loadDefModel:function(data,curViewId,viewFormList,formPrimary){
		var mHtml = '<div id="'+_UcapForm.mainDiv+'" class="showContent" style="border:1px solid #B2CDD5;">';
		//总标题区
		//数据区
		if(data && data.length>0){
			for (var i = 0; i < data.length; i++) {
				var rowNum = i+1;
				var unid = data[i][formPrimary];
				mHtml += this.getDefMHtml(curViewId,rowNum,unid);
			}
		}
		mHtml+='</div>';
		//按钮区
		//alert(Ext.encode(view.json.subButtonList));
		var subBtn = view.json.subButtonList;
		if(subBtn && subBtn.length>0){
			mHtml += '<div style="width:100%;text-align:center;" id="_ucap_viewFormButton">' ;
			//mHtml+='<input type="button" class=btnChannel value="新增" onclick="view.viewFormManager.addForm()"/>&#160;';
			//mHtml+='<input type="button" class=btnChannel value="删除" onclick="view.viewFormManager.delForm()"/>&#160;';
			for(var i=0;i<subBtn.length;i++){
				var code = subBtn[i].button.code;
				var codeType = subBtn[i].button.codeType;
				var buttonName = subBtn[i].name;
				if(codeType=="01"){
					mHtml+='<input type="button" class=btnChannel value="'+buttonName+'" onclick="'+code+'"/>&#160;';
				}else if (codeType=="02"){
					//扩展功能
					mHtml+='<input type="button" class=btnChannel value="'+buttonName+'" onclick="view.executeInteration('+code+')"/>&#160;';
				} else if (codeType=="03"){
					//说明是流程新建窗口
					mHtml+='<input type="button" class=btnChannel value="'+buttonName+'" onclick="ucapCommonFun.newFlowDocByFlowIds('+code+')"/>&#160;';
				}
			}
			mHtml += '</div>';
		}
		return mHtml;
	},
	/**
	 *  新增，用于新增表单信息
	 * @param {} addType 默认0在尾巴追加,1为顶部追加
	 */
	addForm:function(addType){
		var curViewId=this.curViewId,viewFormList=this.viewFormList;
		var vfl = _UcapForm.handler.getViewFormList(curViewId);
		var size = vfl?vfl.length:0;
		var rowNum = size+1;
		switch(addType){
			case 1:{
				Ext.DomHelper.insertFirst(_UcapForm.mainDiv,this.getDefMHtml(curViewId,rowNum,""));
				break;
			}
			default:
				Ext.DomHelper.append(_UcapForm.mainDiv,this.getDefMHtml(curViewId,rowNum,""));
		}
		
		var renderto = curViewId+"_"+rowNum;
		var poxName = null;
		//加载表单数据
		_UcapForm.ucapForm.initAjax("",viewFormList.formType,viewFormList.formUnid,
													null,null,1,curViewId,renderto,rowNum,poxName);
	},
	/**
	 * 删除，新文档可以直接删除。
	 * 旧文档需要删除的时候同时删除数据库记录,
	 * 单击保存时才真正删除
	 */
	delForm:function(){
		var curViewId=this.curViewId,viewFormList=this.viewFormList;
		var path = 'input:checked[curViewId=' + curViewId + ']';
		var objs = Ext.DomQuery.select(path);
		if(objs.length>0){
			Ext.Msg.confirm("系统提示","确定要删除选中的选项吗？",function(b){
				if(b=="yes"){
					for(var i=0;i<objs.length;i++){
						var o = objs[i];
						var rn = parseInt(ucapCommonFun.getAttr(o,"rowNum"));
						Ext.get('table_'+curViewId+"_"+rn).remove();
						//在全局缓存中设置删除标记，让后台去处理
						if(o.value==""){
							//新增状态的删除,直接删除全局中的对象
							_UcapForm.handler.removeViewForm(curViewId,rn-1);
						}else{
							//旧文档状态的删除，做个删除标记
							var curForm = _UcapForm.handler.getViewForm(curViewId,rn-1);
							curForm["isDel"] = "true";
						}
					}
				}
			})
		}else{
			Ext.Msg.alert("系统提示","至少选择一项要删除的选项");
		}
	}
}

//页签型视图的方法分装
var viewTabs={
	tabs:null,
	isInit:false,
	tabViewIds:null,
	closeabled:true,
	/**
	 * yjy 2010.3.31 增加一个通用的TAB方法
	 * @param {} divid 要显示页签的ID
	 * @param {} url   要显示页签的内容
	 * @param {} type 1表示是普通的HTML页面，2表示是iframe页面
	 * @param {} tabid 页签对象ID
	 * @param {} ifrid iframe的ID
	 * @param {} title 要显示页签的标题
	 * @param {} index 页签显示索引
	 */
	commonAddTab:function(divid,url,type,tabid,ifrid,title,index){
		if(typeof index=="undefined") index=0;//只要不为0就可以
		if(ucapSession.middleHeight==0){
			ucapCommonFun.autoMenuHeight();
		}
		var ght = ucapSession.middleHeight;
		ght = ght-25;//减去页签的高度
		if(null==title || title==undefined){
			title = "未知";
		}
		var html="";
		var auto = url.indexOf("http://")>-1?"auto":"no";
		if (type==2) {//说明是iframe页面
			html = "<iframe tabid='"+tabid+"' name='ifr"+ifrid+"' id='ifr"+ifrid+"' src='' style='width:100%;height:"//src属性去掉，避免打开时执行两次jsp页面
					+ght+"px' marginwidth='0'  hspace='0' vspace='0' frameborder='0' scrolling='"+(auto||"no")+"'></iframe>";
		}
		
		//2011-12-07 modify by xhuatang@linewell.com 更改内嵌iframe直接获取顶层窗口的bug
		var winobj =window.top;
		if(typeof(winobj.viewTabs) === "undefined"){
			winobj = window;
		}
		winobj.viewTabs.init(divid);
		var itemTab = winobj.viewTabs.tabs.getItem(tabid);
		if (!itemTab){
			var tabPanel = winobj.viewTabs.tabs.add({
				id:tabid,
				title:"<div qtip='"+title+"'>"+ucapCommonFun.limitL(title,6)+"</div>",
				header:false,
				html:html,
				listeners:{
　　　　　　　　　 activate:function(){
								try{
									//执行页签单击JS自定义扩展函数 add by jc 20100818
									view.tabUserActivate(tabid,ifrid);								
								}catch(e){
								}
								//2012-01-11 cguangcong@linewell.com解决bug1063
								winobj.ucapCommonFun.setIframeViewHeight();
                                winobj.ucapCommonFun.setIframeViewWidth();
							}
　　　　　		},
				closable:winobj.viewTabs.closeabled
	        });
	        if(index==0)tabPanel.show();
	        if (type==2) {
	        	var iframes = winobj.Ext.query("iframe[tabid='"+tabid+"']");
				if(iframes && iframes[0]) iframes[0].src = url;
	        }
		} else {
			if(title!="文档打开")itemTab.setTitle(title);
			itemTab.show();
		}
		if (type==1) {
		   // 说明是普通页面方式
			var el = winobj.Ext.get(tabid);
			var mgr = el.getUpdater();
			mgr.update({
				url : url,
				scripts : true
			});
	   } 	       
	},
	/**
	 * 只提供给视图用
	 * @param {} divid 要显示页签的ID
	 * @param {} viewId 视图UNID
	 * @param {} title 页签标题
	 * @param {} index 页签显示索引
	 * @param {} bModuleUnid 所属模块
	 * @param {} tabid 页签对象ID
	 */
	addTab:function(divid,viewId,title,index,bModuleUnid,tabid){
		//yjy 增加判断，如果title为空，则先根据viewId来取值 2010 3 31
		if (typeof title=="undefined" || title=="" || null==title){
			title = view.getViewDisplayName(viewId);
		}
		if(!bModuleUnid || bModuleUnid=="undefined")bModuleUnid="";
		var url=ucapSession.appPath+"sys/jsp/view.jsp?viewId="+viewId+"&isTab=1&moduleUnid="+bModuleUnid;
		var re = /&/g;
		var purl = view.purl.replace(re,"~$*$~");
		purl = "&purl="+purl;
		url = url + purl;
		this.commonAddTab(divid,url,2,(tabid||viewId),viewId,title,index);//视图都是以iframe方式打开
	},
	init:function(renderto){
		if($(renderto) && $(renderto).innerHTML!="" && viewTabs.isInit){
			if(null!=viewTabs.tabViewIds && viewTabs.tabViewIds.length>0){
				viewTabs.tabViewIds.splice(0,viewTabs.tabViewIds.length);//移除所有的视图id
			}
			return;
		}
		if(ucapSession.middleHeight==0){
			ucapCommonFun.autoMenuHeight();
		}
		var ght = ucapSession.middleHeight;
		ght = ght-20;//减去页签的高度
		
		Ext.getDom(renderto).innerHTML="";
		viewTabs.tabs = new Ext.TabPanel({
        	renderTo:renderto,
        	activeTab:0,
        	resizeTabs:true, // turn on tab resizing
        	minTabWidth: 65,
        	tabWidth:85,
        	resizeTabs:false,
        	enableTabScroll:true,
        	height:ght,
			bodyBorder:false,
			frame:false,
			//autoWidth:true,
        	defaults: {autoScroll:false},
            plugins: new Ext.ux.TabCloseMenu(),
             //yjy 2010-5-11 增加双击关闭事件
            initEvents: function () {   
	            Ext.TabPanel.superclass.initEvents.call(this);   
	            this.on('add', this.onAdd, this, {   
	                target: this  
	            });   
	            this.on('remove', this.onRemove, this, {   
	                target: this  
	            });   
	            this.mon(this.strip, 'mousedown', this.onStripMouseDown, this);   
	            this.mon(this.strip, 'contextmenu', this.onStripContextMenu, this);   
	            if (this.enableTabScroll) {   
	                this.mon(this.strip, 'mousewheel', this.onWheel, this);   
	            }   
	            this.mon(this.strip, 'dblclick', this.onTitleDblClick, this);   
	        },
	        
	        listeners:{//add by llp,允许第一个页签被关闭，但是如果只有一个页签的情况下不允许关闭
	        	beforeremove:function(tab,component){
	        		if(tab.items.length<2){
	        			Ext.MessageBox.alert('操作提示', '当前只有一个页签不允许关闭！');
	        			return false;
	        		}
	        	}
	        },
	        
            onTitleDblClick: function (e, target, o) {   
	            var t = this.findTargets(e);
	            //防止双击非页签时出错 mdf by jc 20100621
	            if (t && t.item && t.item.fireEvent('beforeclose', t.item) !== false && t.item.closable) {   
	                t.item.fireEvent('close', t.item);   
	                this.remove(t.item);   
	            }   
	        }
    	});
     	viewTabs.isInit=true;
	},
	
	/**
	 * 根据视图id删除其中已存在项
	 * @param {} vid
	 */
	removeTabId:function(vid){
		if(viewTabs.tabViewIds && undefined!=viewTabs.tabViewIds.length && viewTabs.tabViewIds.length>0){
			for(var i=0;i<viewTabs.tabViewIds.length;i++){
				if(viewTabs.tabViewIds[i]==vid){
					viewTabs.tabViewIds.splice(i,1);
					break;
				}
			}
		}
	},
	
	/**
	 * 页签删除事件
	 * @param {} item
	 * @param {} c
	 */
	tabRemove:function(item,c){
		viewTabs.removeTabId(c.id);
	}
}


Ext.ux.TabCloseMenu = function(){
    var tabs, menu, ctxItem;
    this.init = function(tp){
        tabs = tp;
        tabs.on('contextmenu', onContextMenu);
    }
    function onContextMenu(ts, item, e){
        if(!menu){ // create context menu on first right click
            menu = new Ext.menu.Menu([{
                id: tabs.id + '-close',
                text: '关闭页签',
                handler : function(){
                	viewTabs.removeTabId(item.id);
                    tabs.remove(ctxItem);
                }
            },{
                id: tabs.id + '-close-others',
                text: '关闭其它页签',
                handler : function(){
                    tabs.items.each(function(item){
                        if(item.closable && item != ctxItem){
                        	viewTabs.removeTabId(item.id);
                            tabs.remove(item);
                        }
                    });
                }
            },{
            	id:tabs.id+'max',
            	text:'最大化',
            	handler:function(){
            		var max=function(dis){
            			if($("leftArrowhead"))$("leftArrowhead").style.display=dis?"":"none";
        				if($("topLine"))$("topLine").style.display=dis?"":"none";
        				var head=Ext.getDom("headerBox");
            			if (head){
            				head.style.display=dis;
            				pagebartop();
            			}
            			
            			var mod=$("ucapModule");
            			if (typeof(ucapModule)!="undefined" && mod && mod.style){
            				mod.style.display=dis;
            				//防止分级管理出错
            				if(ucapModule.pagebarleft)ucapModule.pagebarleft();
            			}
            			//分级管理左边
        				if(typeof pagebarleft != "undefined"){
        					pagebarleft('ucapSystemLeft','ucapSystemLeftBar');
        				}
            		}
            		if (this.text=="最大化"){
            			max("");
            			this.setText("还原");
            		} else {
            			max("none");
            			this.setText("最大化");
            		}
            	}
            }]);
        }
        ctxItem = item;
        var items = menu.items;
        items.get(tabs.id + '-close').setDisabled(!item.closable);
        var disableOthers = true;
        tabs.items.each(function(){
            if(this != item && this.closable){
                disableOthers = false;
                return false;
            }
        });
        items.get(tabs.id + '-close-others').setDisabled(disableOthers);
        menu.showAt(e.getPoint());
    }
};

//开始加载
/**
 * 初始化视图
 * @param {} viewId 视图标识
 * @param {} renderto 绚烂的div标识
 * @param {} isQuery 是否有查询 true时没有
 * @param {} noPreview 是否没有预览 true时没有
 * @param {} noSelfConfig 是否没有自定义 true时没有
 */
function initView(viewId,renderto,title,hasTab,purl,bModuleUnid,outTbarHeight,noQuery,noPreview,noSelfConfig,tabsp) {
	//var hasShow = false; 
	if (Ext.getDom(ucapSession.portalID))
		Ext.getDom(ucapSession.portalID).innerHTML="";
	if (Ext.getDom(ucapSession.portal_info))
		Ext.getDom(ucapSession.portal_info).style.display="none";
	if (typeof ucapPortal!="undefined") {
		ucapPortal.breakInit = true;
	}
	//外部
	if("undefined"==typeof(purl)){
		view.purl = "";
	}else{
		view.purl = purl;
	}
	if("undefined"!=typeof(outTbarHeight)){
		view.outOtherHeight = outTbarHeight;
	}else{
		view.outOtherHeight = 0;
	}
	
	var viewIds = viewId.split(",");
	var titles = [];
	if(viewIds.length>1){
		if(undefined==hasTab || !hasTab){
			if(undefined!=viewTabs.tabViewIds && viewTabs.tabViewIds.length>0){
				viewTabs.tabViewIds.splice(0,viewTabs.tabViewIds.length);//移除所有的视图id
			}
			viewTabs.isInit = false;
		}
		var tls = view.getViewDisplayName(viewId);
		//alert(viewId+"  "+tls);
		titles = tls.split(",");
		hasTab = true;
	} 
	if(undefined==hasTab || !hasTab){
		view.viewBaseInfos = new Array();
		view.viewId = viewId;
		view.renderto = renderto;
		Ext.QuickTips.init();// 浮动信息提示
		view.initview(viewId,renderto,noQuery,noPreview,noSelfConfig);
		view.moduleUnid = bModuleUnid;
		view.hasTab = false;
	}else{
		for(var i=0;i<viewIds.length;i++){
			var tmpViewId = viewIds[i];
			//传入页签IDmdf by jc 20101020
			var ucapTabid = ucapCommonFun.getUrlParameter("ucapTabid",purl);
			var tabid = ucapTabid||((tabsp||Ext.id()) + tmpViewId);
			view.hasTab = true;
			if(undefined!=viewTabs.tabViewIds && viewTabs.tabViewIds.length>0 && viewTabs.isInit){
				var hasTab = false;
				if(viewTabs.tabs)viewTabs.tabs.items.each(function(item){
					//页签不支持从菜单中打开相同ID的视图，效果只会打开一次
			 		if(item.id==tabid){
			 			try{
			 				viewTabs.tabs.activate(item.id);
			 				if($(renderto).innerHTML!="")hasTab = true;
			 			}catch(e){}
			 			//Ext.getDom('ifr'+viewId).src = ucapSession.appPath+"sys/jsp/view.jsp?viewId="+viewId;
			 		}
             	})
             	if(hasTab)return;
			}
			//viewTabs.init(renderto); 
			if(i<titles.length){
				viewTabs.addTab(renderto,tmpViewId,titles[i],i,bModuleUnid,tabid);
			}else{
				viewTabs.addTab(renderto,tmpViewId,title,i,bModuleUnid,tabid);
			}
			if(undefined==viewTabs.tabViewIds){
				viewTabs.tabViewIds = new Array();
			}
			viewTabs.tabViewIds[viewTabs.tabViewIds.length]=tmpViewId;
			//alert("*");
		}
		if(viewIds.length>1)viewTabs.tabs.show(viewIds[0]);
		ucapCommonFun.setIframeViewHeight();
	}

};//end ready


function initFormJspView(viewId,renderto,purl,bModuleUnid,noQuery,noPreview,noSelfConfig,isTab,noTbar,noBbar,isSingle,recordSplit,colSplit){
	Ext.QuickTips.init();// 浮动信息提示

	view.viewBaseInfos = new Array();//重新定义视图的定义信息
	
	view.renderto = renderto;
	view.viewId = viewId;
	view.hasTab = false;
	
	if("undefined"!=typeof(isSingle))view.isSingle = isSingle;
	if("undefined"!=typeof(recordSplit))view.recordSplit=recordSplit;
	if("undefined"!=typeof(colSplit))view.colSplit = colSplit;
	if("undefined"!=typeof(isTab))view.isTab=isTab;
	if("undefined"!=typeof(noTbar))view.noTbar = noTbar;
	if("undefined"!=typeof(noBbar))view.noBbar = noBbar;
	if("undefined"!=typeof(bModuleUnid))view.moduleUnid = bModuleUnid;
	
	if(undefined==purl){
		view.purl = "";
	}else{
		view.purl = purl;
	}
	
	view.initview(viewId,renderto,noQuery,noPreview,noSelfConfig);
}
/**
 * 采用iframe方式的表格视图
 * @param {} viewId 视图标识
 * @param {} renderto 渲染地址
 * @param {} purl 父url
 * @param {} noQuery 是否有查询
 * @param {} noPreview 是否可预览
 * @param {} noSelfConfig 是否有自定义
 */
function initJspView(viewId,renderto,purl,noQuery,noPreview,noSelfConfig) {
	if("undefined"!=typeof(renderto) && renderto!=""){
		var pdiv = Ext.getDom(renderto);
		//当组合表单只有一个视图表单列表时高度的设置add by jc 20100630
		var getViewFormListHeight=function(){
			ucapCommonFun.autoMenuHeight();
			//防止在没有上一条下一条时表单打开失败,mdf by jc 20110729
			var ucap_topMenu = parseInt(($("ucap_topMenu")?$("ucap_topMenu").clientHeight:"0"))||0;
			var footHeight = parseInt($("footer")?$("footer").clientHeight:"0")||0;
			var headHeight = parseInt($("toolBarButton")?$("toolBarButton").clientHeight:($("secondToolBar")?$("secondToolBar").clientHeight:0))||0;
			return (ucapSession.middleHeight-ucap_topMenu-footHeight-headHeight)||0;
		};
		var viewHeight = window.documentHeight||getViewFormListHeight()||300;
		var test_ucap = Ext.getCmp("test_ucap");
		if(test_ucap){
			test_ucap.destroy();
		}
		pdiv.innerHTML = "";
		new Ext.Panel({
			id:"test_ucap",
			renderTo:renderto,
			html:"<iframe name=\"" + view.iframePreId + viewId+"\" id=\"" + view.iframePreId +viewId+"\" style='width:100%;height:"+viewHeight+"px;' scrolling='no' marginwidth='1' frameborder='0' ></iframe>"
		});
		//pdiv.innerHTML = "<iframe name=\"ifr"+viewId+"\" id=\""+viewId+"\" style='width:100%;height:"+viewHeight+"px;' scrolling='no' marginwidth='1' frameborder='0' src='false'></iframe>";
		//alert(purl);
		var re = /&/g;
		
		purl = purl.replace(re,"~$*$~");
		
		var frmUrl = ucapSession.appPath+"sys/jsp/view.jsp?viewId="+viewId+"&purl="+purl;
		
		if("undefined"!=typeof(noQuery)){
			frmUrl+="&noQuery="+noQuery;
		}
		
		if("noPreview"!=typeof(noPreview)){
			frmUrl+="&noPreview="+noPreview;
		}
		if("noSelfConfig"!=typeof(noSelfConfig)){
			frmUrl+="&noSelfConfig="+noSelfConfig;
		}
		var isEdit=1; //默认为可编辑  -1不能查看 0 只读 1可编辑
		//如果是子视图，则文档的打开权限要根据父文档的权限来判断
		if (window.parent && window.parent._UcapForm){
			isEdit = window.parent._UcapForm.cfg.isRead;	
		}
		if (typeof isEdit=="undefined" || "undefined"==isEdit || !isEdit){
			isEdit  = _UcapForm.cfg.isRead;
		}
		if (isEdit!=1){
			isEdit ="&r=0";
		} else {
			isEdit="&r=1";	
		}
		Ext.getDom(view.iframePreId+viewId).src = frmUrl+isEdit;
	}
};//end ready

//重写以下这个方法，表格的行就允许多选
/*
Ext.override(Ext.grid.RowSelectionModel,{	
	clickMulSelect : true,
	handleMouseDown : function(g, rowIndex, e){       
		if(e.button !== 0 || this.isLocked()){
        	return;
    	};
    	var view = this.grid.getView();
		//shift 多行选择
    	if(e.shiftKey && !this.singleSelect && this.last !== false){			
        	var last = this.last;
        	this.selectRange(last, rowIndex, e.ctrlKey);
        	this.last = last; // reset the last
        	view.focusRow(rowIndex);
    	}else{			
        	var isSelected = this.isSelected(rowIndex);			
        	if((e.ctrlKey || this.clickMulSelect) && isSelected){
            	this.deselectRow(rowIndex);
        	}else if(!isSelected || this.getCount() > 1){
            	this.selectRow(rowIndex, e.ctrlKey || e.shiftKey || this.clickMulSelect);
            	view.focusRow(rowIndex);
        	}
     	}
 	}
});
*/

//重写这个方法，以便回车时，鼠标可以移动本行的下一单元格
Ext.override(Ext.grid.RowSelectionModel, {   
    onEditorKey : function(field, e) {    
       var k = e.getKey(), newCell, g = this.grid, ed = g.activeEditor;   
       var shift = e.shiftKey;    
       var colCount = g.getColumnModel().getColumnCount(false);
       var rowCount = g.getStore().getCount();//获取当前的行数
       
       if (k == e.ENTER) {   
            e.stopEvent();   
            ed.completeEdit();   
            if (shift) {   
                   newCell = g.walkCells(ed.row, ed.col - 1, -1,this.acceptsNav, this);   
            } else {
            	 if(rowCount==(ed.row+1) && colCount==(ed.col+1)){
            	   	view.addEditorGridRow();
            	 }else{
            	   	newCell = g.walkCells(ed.row, ed.col + 1, 1,this.acceptsNav, this);   
            	 }
            	 //newCell = g.walkCells(ed.row, ed.col + 1, 1,this.acceptsNav, this);   
            }   
        } else if (k == e.TAB) {   
            e.stopEvent();   
            ed.completeEdit();   
            newCell = g.walkCells(ed.row, ed.col - 1, -1,this.acceptsNav, this); 
//            if (this.moveEditorOnEnter !== false) {   
//               if(shift) {   
//                    newCell = g.walkCells(ed.row - 1, ed.col, -1,this.acceptsNav, this);   
//               } else {   
//                    newCell = g.walkCells(ed.row + 1, ed.col, 1,this.acceptsNav, this);   
//               }   
//            }   
       } else if (k == e.ESC) {   
            ed.cancelEdit();   
       }   
       if (newCell) {
       		g.getSelectionModel().selectRow(newCell[0]);
            g.startEditing(newCell[0], newCell[1]);   
       }   
    }   
});
//应用系统相关数据删除
function delSysDataByUnid(){
	var grid = Ext.getCmp(view.namePrefix+view.index);
	var selectedRow = grid.getSelectionModel().getSelections();
	if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
	var str="";
	for(var i=0;i<selectedRow.length;i++){
		var row = selectedRow[i];
		str+=","+row.data[grid.getColumnModel().getDataIndex(1)];
	}
	if(str==""){
		Ext.MessageBox.alert("提示","请选择要删除的应用系统！");
		return;
	}
	str = str.substring(1);
	Ext.MessageBox.confirm("确认","是否确认要删除选中的应用系统所有数据！",function(btn){
		if(btn=="yes"){
			var json = {sysUnid:str};
			//alert(Ext.encode(json));
			var requestConfig = {
				url:ucapSession.baseAction,
				params:{"type":"delSysData"},
				jsonData:json,
				callback:function(options,success,response){
					if (success){
						var exjson = Ext.util.JSON.decode(response.responseText);					
						var exResult=ucapCommonFun.dealException(exjson);					
						if(!exResult)return;					
						if(exResult==true){
							Ext.Msg.alert("提示","数据删除成功！");
							view.refresh();
						}else{							
							Ext.Msg.alert("提示","数据删除不成功！");
						}
						
					} else {						
						Ext.Msg.alert("提示","数据删除不成功！");
					}
				}
			}
			Ext.Ajax.request(requestConfig);
			
		}
	});
}
//单位-部门-用户级联删除
function delUserCascade(){
	var grid = Ext.getCmp(view.namePrefix+view.index);
	var selectedRow = grid.getSelectionModel().getSelections();
	if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
	var str="";
	for(var i=0;i<selectedRow.length;i++){
		var row = selectedRow[i];
		str+=","+row.data[grid.getColumnModel().getDataIndex(1)];
	}
	if(str==""){
		Ext.MessageBox.alert("提示","请选择要删除的单位！");
		return;
	}
	str = str.substring(1);
	Ext.MessageBox.confirm("确认","是否确认要删除选中的单位、部门及其用户！",function(btn){
		if(btn=="yes"){
			var json = {unitUnid:str};
			//alert(Ext.encode(json));
			var requestConfig = {
				url:ucapSession.baseAction,
				params:{"type":"delUserCascade"},
				jsonData:json,
				callback:function(options,success,response){
					if (success){
						var exjson = Ext.util.JSON.decode(response.responseText);					
						var exResult=ucapCommonFun.dealException(exjson);					
						if(!exResult)return;					
						if(exResult==true){
							Ext.Msg.alert("提示","数据删除成功！");
							view.refresh();
						}else{							
							Ext.Msg.alert("提示","数据删除不成功！");
						}
						
					} else {						
						Ext.Msg.alert("提示","数据删除不成功！");
					}
				}
			}
			Ext.Ajax.request(requestConfig);
			
		}
	});
}
/**
 * 编辑表格-通用选择框Ext对象封装
 * add by jc 20120223
 */
Ext.namespace('Ucap.form.CommonSelectField'); 
Ucap.form.CommonSelectField = Ext.extend(Ext.form.TriggerField, {
	triggerClass : 'x-form-commonselectfield-trigger',
	readOnly : true,
	curEditGrid:null,
	defaultAutoCreate : {
		tag : "input",
		type : "text",
		size : "10",
		autocomplete : "off"
	},
	initComponent : function() {
		Ucap.form.CommonSelectField.superclass.initComponent.call(this);
	},
	onDestroy : function() {
		Ucap.form.CommonSelectField.superclass.onDestroy.call(this);
	},
	setValues:function(json){
		var value = json.value;
		var text = json.text;
		if(null==this.curEditGrid){
			this.curEditGrid = Ext.getCmp(view.namePrefix+view.index);
		}
		var selectModule = this.curEditGrid.getSelectionModel();
		//获取表格所在的行
		var row = selectModule.getSelected();
		row.data[this.nameEn.toLowerCase()+view.commonSelectFieldNamePrefix+""]=value;
		$(this.id).value = text;
		this.setValue(text);
	},
	getValues:function(){
		//alert($(this.id).value);
		if(null==this.curEditGrid){
			this.curEditGrid = Ext.getCmp(view.namePrefix+view.index);
		}
		var json = {};
		json.text = $(this.id).value;
		
		var selectModule = this.curEditGrid.getSelectionModel();
		//获取表格所在的行
		var row = selectModule.getSelected();
		json.value = row.data[this.nameEn.toLowerCase()+view.commonSelectFieldNamePrefix]||"";
		return json;
	},
	onTriggerClick : function() {
		if (this.disabled) {
			return;
		}
		var json = this.getValues();
		var type=this.itemSource,selNum=this.selNum,text=json.text,value=json.value;
		if("204"==type){
			//字典弹出框
			var conValue = this.conValue;
			window.top.selectEditGridSD(204,selNum,text,value,this,conValue);
		}else{
			//通用选择框
			window.top.selectEditGridSD(type,selNum,text,value,this);
		}
		
	}
});
Ext.reg('CommonSelectField', Ucap.form.CommonSelectField);
/**
 * 编辑表格-视图列弹出框Ext对象封装
 * add by jc 20120223
 */
Ext.namespace('Ucap.form.ViewSelectField'); 
Ucap.form.ViewSelectField = Ext.extend(Ext.form.TriggerField, {
	triggerClass : 'x-form-commonselectfield-trigger',
	readOnly : true,
	defaultAutoCreate : {
		tag : "input",
		type : "text",
		size : "10",
		autocomplete : "off"
	},
	initComponent : function() {
		Ucap.form.ViewSelectField.superclass.initComponent.call(this);
	},
	onDestroy : function() {
		Ucap.form.ViewSelectField.superclass.onDestroy.call(this);
	},
	onTriggerClick : function() {
		if (this.disabled) {
			return;
		}
		var viewId=this.itemSource,selNum=this.selNum,columnMap=this.columnMap;
		//调用视图列表弹出框
		window.top.selectEditGridView.call($(this.id),viewId,columnMap,$(this.id),selNum);
		
	}
});
Ext.reg('CommonSelectField', Ucap.form.ViewSelectField);
