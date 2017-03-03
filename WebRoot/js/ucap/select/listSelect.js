/**
 * 对ucap平台中通用选择对话框进行分装
 */

/**
 * 通用选择对话框
 * 
 * @param {} type 类型，通用选择对话框的类型，包括全局缓存中的所有类型，而且允许其多个的组合，如“203,204,205”
  * @param {} selNum 选择结果返回值，用于区分单选或多选 1为单选，0为多选，默认为多选
  * @param {} inputName 要设置字段的名称或id
 * @param {}  conValue 条件值，用于选择对话框用户选择适外部输入的条件值，多值以逗号“,”分隔，允许为空
  * @param {} outputFunc 点击确定后执行的函数 (默认参数为一对象 obj ={text:"",value:""} )
  * @param {} inputSplit 输入分隔符号，默认值为","
 * @param {}  outSplit 输出分隔符号，默认为","
*  @param {} treeType 用来判断是否来值UMC中的选择，有值为是 yjy2011-5-5          
 * 如果type 为 204 字典，则conValue中是字典的UNID
 * 
 * type 为228，说明是栏目的树型选择
 * 
 */
function selectDataSD(type,selNum,inputName,conValue,outputFunc,
		inputSplit, outSplit,treeType) {
	var valueObj = Ext.getDom(inputName);
	var textObj = Ext.getDom(inputName+"_Cn_");
	var value = valueObj.value;
	var text = textObj.value;
	var parms = {};
	parms.type = type;
	parms.selNum = selNum;
	parms.conValue = conValue;
	parms.outputFunc = outputFunc;
	parms.inputSplit = inputSplit;
	parms.outSplit = outSplit;
	parms.treeType = treeType;
	parms.valueObj = valueObj;
	parms.textObj = textObj;
	parms.value = value;
	parms.text = text;
	//调用通用选择框核心逻辑方法
	selectCommonDataSD(parms);
}

/**
 * 编辑表格通用选择框字段的单击事件方法
 * add by jc 20120224
 * @param {} type 选择框类型
 * @param {} selNum 是否单选
 * @param {} text 展示的值
 * @param {} value 数据库保存的值
 * @param {} inputObj 编辑表格输入来源对象
 * @param {} conValue 条件值
 */
function selectEditGridSD(type,selNum,text,value,inputObj,conValue){
	var parms = {};
	parms.type = type;
	parms.selNum = selNum;
	parms.value = value;
	parms.text = text;
	parms.inputObj = inputObj;
	parms.conValue = conValue;
	//调用通用选择框核心逻辑方法
	selectCommonDataSD(parms);
}

/**
 * 通用选择对话框
 * mdf by jc 20120224 抽取原通用选择框的核心方法出来
 * @param {} parms 通用选择框JSON对象
 * 
 */
function selectCommonDataSD(parms) {
	var type = parms.type;//类型，通用选择对话框的类型，包括全局缓存中的所有类型，而且允许其多个的组合，如“203,204,205”
	var selNum = parms.selNum;//选择结果返回值，用于区分单选或多选 1为单选，0为多选，默认为多选
	var conValue = parms.conValue;//条件值，用于选择对话框用户选择适外部输入的条件值，多值以逗号“,”分隔，允许为空
	var outputFunc = parms.outputFunc;//点击确定后执行的函数 (默认参数为一对象 obj ={text:"",value:""} )
	var inputSplit = parms.inputSplit;//输入分隔符号，默认值为","
	var outSplit = parms.outSplit;//outSplit 输出分隔符号，默认为","
	var treeType = parms.treeType;//用来判断是否来值UMC中的选择，有值为是
	var valueObj = parms.valueObj;//数据库保存的值的存储对象
	var textObj = parms.textObj;//展示的值的存储对象
	var value = parms.value;//数据库保存的值
	var text = parms.text;//展示的值
	var inputObj = parms.inputObj;//编辑表格输入来源对象
	
	//yjy2011-5-5 add
	ucapTreeSelect.treeType="";
	if (typeof treeType !="undefined"){
		ucapTreeSelect.treeType="umc";
	}
	if (typeof selNum =="undefined") selNum = "0";	
	
	listSelect.isTree = false;  //默认为普通选择		
	
	var html = "sys/jsp/select/listSelect.jsp?type="+type;	
	
	listSelect.oldValue = value;
	listSelect.oldText = text||"";
	listSelect.selNum = selNum;
	listSelect.conValue = conValue;
	listSelect.type = type;	
	if (undefined != inputSplit && inputSplit!="") //yjy 2011-4-15 add 不为空串判断
		listSelect.inputSplit = inputSplit;
	if (undefined != outSplit && outSplit!="" ) //yjy 2011-4-15 add 不为空串判断
		listSelect.outSplit = outSplit;		
	
	var width=520;
	var height=420;
	/**
	 * 获得通用选择框显示类型属性  showType:00-左树形，其他-左右列表 modify by zhua 2010-02-1 
	 * */	
	var url = ucapSession.baseAction;
	//流程列表-999时，action=getTypes  modify by zhua 2010-09-8
	if(undefined != type&&type=="999"){
		url += "?type=listSelect&action=getTypes&selecttype=" + type+"&rand="+Math.random();
	}else{
		url += "?type=listSelect&action=getShowType&selecttype=" + type+"&rand="+Math.random();
	}
	var conn = Ext.lib.Ajax.getConnectionObject().conn;
	conn.open("GET", url, false);
	conn.send(null);
	var json = Ext.util.JSON.decode(conn.responseText);	
	var exResult=ucapCommonFun.dealException(json);
	if(!exResult)return;
	//var items = json.items;
	listSelect.showItems = json.items;
	
//	var showType="";
//	var showName="";
//	var actionName="";
//	var actionType="";
//	
//	if ("undefined"!= typeof(items) && items.length>0) {
//			showType=items[0].showType;
//			showName=items[0].rootName;
//			actionType=items[0].actionType;
//			actionName=items[0].actionName;
//	}

	if (listSelect.showItems && listSelect.showItems[0].showType=="00"){ //树型
		
		listSelect.isTree = true; 
		if (typeof conValue=="undefined") conValue ="";
		
		if(type=="204"){
			html = "sys/jsp/select/commonTreeSelect.jsp?unid="+conValue+"&type="+type;
		}else{
			html = "sys/jsp/select/commonTreeSelect.jsp?conValue="+conValue+"&type="+type;
		}
		ucapTreeSelect.rootName =listSelect.showItems[0].rootName;
		ucapTreeSelect.actionType=listSelect.showItems[0].actionType;
		ucapTreeSelect.act =listSelect.showItems[0].actionName;
	
		ucapTreeSelect.selectType = selNum;	
		
		
		if(selNum=="1" ||selNum==1 ){
			width=210;
			height=300;	
			if (conValue==""){
				height=410;
			}
			ucapTreeSelect.width = width-40;
			ucapTreeSelect.height = height - 90;
		} else {
			height=410;
			ucapTreeSelect.width = 190;
			ucapTreeSelect.height = height - 90;
		}
		
		
	} else  {
		
		if(undefined!=conValue)html+="&conValue="+conValue;
		//html+="&oldValue="+oldValue;//这个参数没用到		
		if(undefined!=selNum)html+="&selNum="+selNum;	
		if(undefined!=inputSplit)html+="&inputSplit="+inputSplit;
		if(undefined!=outSplit)html+="&outSplit="+outSplit;
		
	}

	var button = [{
				text : "确定",
				handler : function() {
					if (listSelect.isTree && listSelect.selNum==1){
						listSelect.treeAddSelect.createInterceptor(listSelect.treeCurAddSelect)();
						//if (!flag) return;
					}
					var value = listSelect.getSelectedValue();
					var text = value.substring(value.indexOf(listSelect.valTextSplit)+listSelect.valTextSplit.length);
					value=value.substring(0,value.indexOf(listSelect.valTextSplit));
					//设置保存值
					if(valueObj){
						valueObj.value = value;
					}
					//设置实际值
					if(textObj){
						textObj.value = text;
					}
					//设置编辑表格通用选择的值到编辑表格对应对象中
					if(inputObj){
						inputObj.setValues({text:text,value:value});
					}
					if(undefined!=outputFunc && outputFunc!="" && typeof outputFunc =="string"){//回调函数
						try{
							(function(){
								var args = {"value":value,"text":text};
								eval(outputFunc+"(args);");
							})();
						}catch(e){
							alert("执行回调函数【"+outputFunc+"】失败!");
						}
					}
					ucapSession.commonSelectWin.close();					
				}
			}, {
				text : "取消",
				handler : function() {
					ucapSession.commonSelectWin.close();
				}
			}];
	ucapSession.commonSelectWin = new Ext.Window({
				title : ucapSession.win.winImg + "通用选择框",
				width : width,
				closable : true, // 关闭
				modal : true,
				height : height,
				//bodyStyle : ucapSession.win.winBodyStyle,
				bodyStyle : "background-color:#FFF;",
				autoLoad : {
					url : ucapSession.appPath + html,
					scripts : true,
					nocache : true
				},
				buttons : button
			});
	ucapSession.commonSelectWin.show();
}
//视图选择框
/**
 * 
 * @param {} viewId 视图的UNID
 * @param fieldNames 要选择的视图字段名称
 * @param {} inputName 要设置字段的名称或id
 * @param {} isSingle 单多选标志 默认为单选  1 表示单选 其他值表示多选(但不能为空）
 * @param {} recordSplit 多记录之间的分隔符 默认为：~RECORD_UCAP~ ，注意不能用正则中的特殊字符
 * @param {} colSplit    单记录，列之间的分隔符 默认为：~COL_UCAP~ ，注意不能用正则中的特殊字符
 * @param {} purl   视图的外部条件参数 类似  unid=88999&type=1;主要用于视图条件的配置（配置成URL参数）
 * @param {} callBack 回调函数，默认参数为选中的值 格式为Json格式  {"value":v,"text":v}
 * 			 其中 value是有包括各分隔符的原始值 text是把分隔符变化空格
 * @param {} sTitle  对话框标题名称
 * @param {} sWidth  对话框宽度
 * @param {} sHeight  对话框高度
 * 
 * modify by jc 20100303 增加宽度高度
 * e.g.视图列配置步骤：
 * 一、在表单字段配置中进行数据配置
 * 二、callBack,sTitle,purl,recordSplit,colSplit,sWidth,sHeight等这些参数只有配置在表单字段相对应的HTML页面的input对象上。如：
 * <input id="视图列ID" name="视图列ID" callBack="回调函数" sWidth="200" sHeight="500"/>
 * 当一二两步完成后，此表单在用户打开时就可以按照相关的配置展示了
 */
function selectView(viewId,fieldNames,inputName,isSingle,callBack,sTitle,purl,recordSplit,colSplit,sWidth,sHeight){
	var valueObj = Ext.getDom(inputName);
	var textObj = Ext.getDom(inputName+"_Cn_");
	var params = {};
	params.valueObj = valueObj;
	params.textObj = textObj;
	
	params.viewId = viewId;
	params.fieldNames = fieldNames;
	params.isSingle = isSingle;
	params.callBack = callBack;
	params.sTitle = sTitle;
	params.purl = purl;
	params.recordSplit = recordSplit;
	params.colSplit = colSplit;
	params.sWidth = sWidth;
	params.sHeight = sHeight;
	//调用视图列表核心逻辑
	selectCommonView.call(this,params);
}

/**
 * 编辑视图字段的视图列表弹出框
 * @param {} viewId 视图的UNID
 * @param fieldNames 要选择的视图字段名称
 * @param {} inputObj 来源值的对象
 * @param {} isSingle 单多选标志 默认为单选  1 表示单选 其他值表示多选(但不能为空）
 * @param {} isSingle
 */
function selectEditGridView(viewId,fieldNames,inputObj,isSingle){
	var params = {};
	params.valueObj = inputObj;
	params.textObj = null;
	
	params.viewId = viewId;
	params.fieldNames = fieldNames;
	params.isSingle = isSingle;
	//调用视图列表核心逻辑
	selectCommonView.call(this,params);
}

/**
 * 视图列表选择框核心逻辑方法
 * @param {} params 参数列表，参数说明见selectView函数的参数
 */
function selectCommonView(params){
	var viewId = params.viewId;
	var fieldNames = params.fieldNames;
	var conValue = params.conValue;
	var isSingle = params.isSingle;
	var callBack = params.callBack;
	var sTitle = params.sTitle;
	var purl = params.purl;
	var recordSplit = params.recordSplit;
	var colSplit = params.colSplit;
	var sWidth = params.sWidth;
	var sHeight = params.sHeight;
	var inputObj = params.valueObj;
	var descCnObj = params.textObj;
	
	var recSplit ="~RECORD_UCAP~";
	var cSplit = "~COL_UCAP~";
	if (typeof fieldNames=="undefined" || fieldNames==""){
		Ext.Msg.alert("提示信息","要选择的视图列名称不能为空！");
		return;
	}
	if (typeof viewId=="undefined" || viewId==""){
		Ext.Msg.alert("提示信息","视图的UNID不能为空！");
		return;
	}
	if (typeof isSingle =="undefined" || isSingle=="") isSingle = "1"; //默认单选
	if (typeof recordSplit =="undefined" || recordSplit=="") recordSplit = recSplit;
	if (typeof colSplit =="undefined" || colSplit=="") colSplit = cSplit;
	
	var html="sys/jsp/view.jsp";	
	html+="?viewId="+viewId;
	html+="&noPreview=true&noTbar=true";
	if (typeof purl!="undefined" && purl !=""){
		purl = purl.replace(/&/g,"~$*$~");
		html +="&purl="+purl;
	}
	html +="&isSingle="+isSingle+"&recordSplit="+recordSplit+"&colSplit="+colSplit;
	var selectConfirm =function(){
		var ifrWin = window.top.Ext.getDom("_UcapSelectiFrame").contentWindow;
		var v=ifrWin.view.getColumnValueByName(fieldNames);
		var args = {"value":v,"text":v.replace(/(~RECORD_UCAP~|~COL_UCAP~)/g," ")};
//		if(typeof inputName !="undefined" && inputName!=""){
//			if(typeof(inputName)=='string'){
//				var descCn = Ext.getDom((inputName+"_Cn_"));
//				inputName = Ext.getDom(inputName);
//				if (inputName) inputName.value = args.text;
//				if(descCn)descCn.value = v;
//			}			
//		}
		if(inputObj)inputObj.value = args.text;
		if(descCnObj)descCnObj.value = args.v;
		
		if(undefined!=callBack && callBack!="" && typeof callBack =="string"){//回调函数
			try{
				(function(){					
					eval(callBack+"(args,ifrWin);");
				})();
			}catch(e){
				alert("执行回调函数【"+callBack+"】失败!");
			}
		}
		//先隐藏再关闭,add by jc 2010-10-18
		//ucapSession.commonWin.hide();
		ucapSession.commonWin.close();
		if(this){this.focus();}//设置对话框关闭后视图列文本框获取焦点,解决视图列选择后，其他文本框无法获取焦点的问题 
								//解决字段没传入时，获取焦点失败 modify by cgc 2011.5.6
	/*	var obj = $("blobtest");
		eval(" eWebEditor_"+obj.id+".setHTML(v)");*/
	}
	var button=[{text:"确定",handler:function()
		{selectConfirm();}},
			{text:"取消",
			handler:function(){ucapSession.commonWin.close()}}	
	];
	var btnHeight = 38;
	//自定义按钮 add by jc 20100917
	var btnEventName = ucapCommonFun.getAttr(this,"btnEventName");
	if(typeof btnEventName != "undefined" && btnEventName != "" && btnEventName!=null){
		var btnResult = ucapCommonFun.evalJavaScript(btnEventName+"();");
		if(Ext.type(btnResult)=="array"){
			button = btnResult;
		}
	}
	//无按钮时
	if(button==null || button.length==0)btnHeight = 0;
	
	var height = window.top.document.body.clientHeight-100;
//	var width = window.top.document.body.clientWidth/2;
	var height = 300;
	var width = 550;
	if(sWidth)width = sWidth;
	if(sHeight)height = sHeight;
	var iframeHeight = height - 33 - btnHeight;
	
	html = ucapSession.hostPath+ucapSession.appPath+html;
	html =' <iframe id="_UcapSelectiFrame" name="_UcapSelectiFrame" ' +
		' style="width:100%;height:'+(iframeHeight)+'px;" frameborder="0"  src="'+html+'" scrolling=\'no\' marginwidth=\'1\' frameborder=\'0\'></iframe>'
	ucapSession.commonWin = new window.top.Ext.Window({
		title:ucapSession.win.winImg+(sTitle||"视图列选择对话框"),
        width:(width>550)?width:550,//有视图分类的不能低于720
        //minWidth:550,
        closable:true,    //关闭
        modal: true,     
        resizable:false,
        autoScroll:true,
		height:(height>300)?height:300,
	//	bodyStyle:ucapSession.win.winBodyStyle,
		html:html,
		listeners:{
			"resize":function(a,b,c){
//				ucapCommonFun.autoMenuHeight();	
				//if(window.top.$("_UcapSelectiFrame"))window.top.$("_UcapSelectiFrame").style.height = c-71;
//				window.top.ucapCommonFun.setIframeViewHeight();
//				window.top.ucapCommonFun.setIframeViewWidth();
			}
		},
		//autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
		buttons:button
	});
	ucapSession.commonWin.show();
}

/**
 * 相应的选中值的值类型以及相应的值
 * 
 * @type
 */
var selectValue = {
	type : "", // 类型
	value : "", // 对应值
	test: ""    //对应的文本值
}
/**
 * 列表选择对话框相关js
 * 
 * @type
 */
var listSelect = {

	selectValues : null, // 选中的对应值对象

	oldValue : "", // 原始值
	
	oldText:"",    //原始文本值

	inputSplit : ",", // 输入分隔符

	outSplit : ",", // 输出分隔符

	selNum : 0, // 选择个数

	type : "", // 选择类型

	conValue : "", // 条件值

	inputType : "0", // 输入值类型

	outType : "0", // 输出类型
	
	currentType:"", //当前选择类型
	
	treeDivId:"treeSelect",   //树形所在div的标识
	
	queryId:"queryId",//查询的id
	
	commSelectId:"selectList",         //普通选择框的ID标识
	
	deptRootId:"_deptroot-undefined",//树形根节点默认标识
	
	rootJson:null,                     //树形根节点对象
	
	tree:null,                       //树形对象 TreePanel
	
	isTree:false,                    //当前选择是否为树形,是的话在添加和全添的方法不一样
	
	valTextSplit:"~$@s@$~",//值名称的分隔符号
	
	showItems:null,            //显示类型
	
	treeAction:"", 			//yjy 2011-5-17 树型的action
	
	checkModel:"",				//级联方式
	
	/**
	 * 初始化选择类型
	 */
	initTypes : function() {
		var radioHtml = "";
		var url = ucapSession.baseAction;
		url += "?type=listSelect&action=getTypes&selecttype=" + listSelect.type+"&rand="+Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);	
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		var items = json.items;

		listSelect.initSelectedValue();
		if (undefined != items) {
			for (var i = 0; i < items.length; i++) {
				if (i == 0) {
					// 对其进行初始化
					listSelect.loadType(items[i].type, listSelect.conValue);
				}
				if (undefined == items[i] || null == items[i])
					continue;
				if (undefined == radioHtml || radioHtml == "") {
					radioHtml = "<input type='radio' value='" + items[i].type
							+ "' name='select' id='select' checked onClick='listSelect.radioClick(this);'>" + items[i].name
							+ "</input>"
				} else {
					radioHtml += "<input type='radio' value='" + items[i].type
							+ "' name='select' id='select' onClick='listSelect.radioClick(this);'>" + items[i].name
							+ "</input>"
				}
			}
		}

		// 把当前选择类型框设置相应的td中
		Ext.getDom("selectTypeId").innerHTML = radioHtml;
	},
	//返回
	queryBack : function() {
		Ext.getDom(this.queryId).value="";
		Ext.getDom("queryBackButton").style.display="none";
		//start  查询返回，重新加载树形,获取操作类actionType与操作名actionName   mdy by fsm
		var showType = "";
        var actionName="";
        var actionType="";
        if(listSelect.showItems){
        	for(var i=0;i<listSelect.showItems.length;i++){
        		if(listSelect.showItems[i].type==listSelect.currentType){
        			showType =  listSelect.showItems[i].showType;
        			actionType = listSelect.showItems[i].actionType;
        			actionName =  listSelect.showItems[i].actionName;
        		}
        	}
        }
		//end
		if( listSelect.isTree){
			//树形
			this.loadTree(listSelect.currentType,listSelect.conValue,actionType,actionName);
		}else{
			if( listSelect.currentType =="200" ||  listSelect.currentType=="201" || listSelect.currentType=="203"){//200,201,203为用户、部门、角色 
				this.loadTree(listSelect.currentType,listSelect.conValue,actionType,actionName);
			}else{
			//列表
				var itemList = Ext.getDom(this.commSelectId);
				var queryList = Ext.getDom("queryList");
				//清空列表
	 			if (undefined != itemList && itemList.options.length > 0) {
					var olength = itemList.options.length;
					for (var i = 0; i < olength; i++) {
						itemList.options.remove(0);
					  }
				    }
				if (undefined != itemList) {
					var olength = queryList.options.length;
					for (var i = 0; i < olength; i++) {
						if(queryList[i].text&&queryList[i].text!=''){
							  ucapCommonFun.addOption(itemList, queryList[i].value, queryList[i].text);
							 
						}
					}
				 }
			 }
		}
		
	},
	//查询
	query : function() {
		Ext.getDom("queryBackButton").style.display="";
		if( listSelect.isTree){
			//树形
			 this.queryTree();
		}else{
			if( listSelect.currentType =="200" ||  listSelect.currentType=="201" || listSelect.currentType=="203"){//200,201,203为用户、部门、角色 
				 this.queryTree();
			}else{
			//列表
			 this.queryList();
			 }
		}
		
	},
	queryList : function() {
		var queryText=Ext.getDom(this.queryId).value;
		//删除左右两端的空格  
		queryText=queryText.replace(/(^\s*)|(\s*$)/g, "");   
		 var itemList = Ext.getDom(this.commSelectId);
			//列表
			var queryList = Ext.getDom("queryList");
			//先将值保存到queryList
			if(undefined != queryList && queryList.options.length==0){
				var olength = itemList.options.length;
				for (var i = 0; i < olength; i++) {
						if(itemList[i].text&&itemList[i].text!=''){
						  ucapCommonFun.addOption(queryList, itemList[i].value, itemList[i].text);
						}
			   }
			}
			//清空列表
 			if (undefined != itemList && itemList.options.length > 0) {
				var olength = itemList.options.length;
				for (var i = 0; i < olength; i++) {
					itemList.options.remove(0);
				  }
			    }
			    //查询
			if (undefined != itemList  ) {
				var olength = queryList.options.length;
				for (var i = 0; i < olength; i++) {
					if(queryList[i].text&&queryList[i].text!=''){
						if(queryText==''){
						  ucapCommonFun.addOption(itemList, queryList[i].value, queryList[i].text);
						}else if(queryList[i].text.indexOf(queryText)!=-1){
						  ucapCommonFun.addOption(itemList, queryList[i].value, queryList[i].text);
						}
					}
				}
			 }
		
	},
	queryTree : function() {
		var queryText=Ext.getDom(this.queryId).value;
		//删除左右两端的空格  
		queryText=queryText.replace(/(^\s*)|(\s*$)/g, "");  
		 var itemList = Ext.getDom(this.commSelectId);
			//树形 
		   	if ( queryText=='') {
	    	//start  查询返回，重新加载树形,获取操作类actionType与操作名actionName   mdy by fsm
				var showType = "";
		        var actionName="";
		        var actionType="";
		        if(listSelect.showItems){
		        	for(var i=0;i<listSelect.showItems.length;i++){
		        		if(listSelect.showItems[i].type==listSelect.currentType){
		        			showType =  listSelect.showItems[i].showType;
		        			actionType = listSelect.showItems[i].actionType;
		        			actionName =  listSelect.showItems[i].actionName;
		        		}
		        	}
		        }
			//end
	     	this.loadTree(listSelect.currentType,listSelect.conValue,actionType,actionName);
	     } else {
			Ext.getDom(this.treeDivId).style.display="none";
			Ext.getDom(this.commSelectId).style.display="";
			this.isTree = false;
			if (this.selNum =="1"){
				Ext.getDom(this.commSelectId).multiple=false;
			} else {
				Ext.getDom(this.commSelectId).multiple=true;
			}
			var url = ucapSession.baseAction;
			var belongToAppId = ucapCommonFun.getUrlParameter("belongToAppId");
			if(belongToAppId){
				url += "?type=listSelect&action=query&conval=" + listSelect.conValue+"&queryText="+encodeURIComponent(encodeURIComponent(queryText)) + "&selecttype=" + listSelect.currentType+ "&belongToAppId=" + belongToAppId+"&rand="+Math.random();
			}else {
				try{
					var belongToAppId = typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:false;
					if(belongToAppId&&belongToAppId!=""){
						url += "?type=listSelect&action=query&conval=" + listSelect.conValue+"&queryText="+encodeURIComponent(encodeURIComponent(queryText)) + "&selecttype=" + listSelect.currentType+ "&belongToAppId=" + belongToAppId+"&rand="+Math.random();
			    	}else {
			    		url += "?type=listSelect&action=query&conval=" + listSelect.conValue+"&queryText="+encodeURIComponent(encodeURIComponent(queryText)) + "&selecttype=" + listSelect.currentType+"&rand="+Math.random();
			    	}
				}catch (e){
					url += "?type=listSelect&action=query&conval=" + listSelect.conValue+"&queryText="+encodeURIComponent(encodeURIComponent(queryText)) + "&selecttype=" + listSelect.currentType+"&rand="+Math.random();
				}
			}
			var conn = Ext.lib.Ajax.getConnectionObject().conn;
			conn.open("GET", url, false);
			conn.send(null);
			var json = Ext.util.JSON.decode(conn.responseText);
			var exResult=ucapCommonFun.dealException(json);
			if(!exResult)return;
			var itemList = Ext.getDom(this.commSelectId);
			var items = json.items;
			// 先清空列表
			if (undefined != itemList && itemList.options.length > 0) {
				var olength = itemList.options.length;
				for (var i = 0; i < olength; i++) {
					itemList.options.remove(0);
				}
			}
			if (undefined != items) {
				for (var i = 0; i < items.length; i++) {
					if (undefined == items[i] || null == items[i])
						continue;
					ucapCommonFun.addOption(itemList, items[i].id, items[i].name);
				}
			}
		 }
	},

	/**
	 * 初始化通用选择框
	 * 
	 * @param {}
	 *            type 类型
	 * 
	 * @param {}
	 *            conValue 条件值
	 */
	loadType : function(type, conValue) {
		//设置当前类型
		listSelect.currentType = type;
		
		var showType = "";
        var actionName="";
        var actionType="";
        
        if(listSelect.showItems){
        	for(var i=0;i<listSelect.showItems.length;i++){
        		if(listSelect.showItems[i].type==type){
        			showType =  listSelect.showItems[i].showType;
        			actionType = listSelect.showItems[i].actionType;
        			actionName =  listSelect.showItems[i].actionName;
        		}
        	}
        }
		var btnAddAllId=Ext.getDom("btnAddAllId");
		if(type=="200" || type=="201" || showType=="01"){//200,201为用户、部门，采用树形的方式显示
			listSelect.hideCascadeCheck(1);
			if(btnAddAllId)btnAddAllId.style.display="none";//当树形时，隐藏全添按钮
			this.loadTree(type,conValue,actionType,actionName);
		}else{
			this.loadList(type,conValue);
			if(btnAddAllId)btnAddAllId.style.display="";//当列表时，显示全添按钮
			listSelect.hideCascadeCheck();
		}

		// 初始化选中的值
		//listSelect.initSelectedValue();
	},
	
	/**
	 * 加载列表
	 * 
	 * @param {} type
	 * 
	 * @param {} conValue
	 */
	loadList:function(type,conValue){
		var unid = ucapCommonFun.getUrlParameter("unid");
		if(type==223 && !unid){
			//表单字段列表选择框在新建时不允许列出所有字段
			if(!conValue || conValue==""){
				conValue = "-";
			}
		}
		Ext.getDom(this.treeDivId).style.display="none";
		Ext.getDom(this.commSelectId).style.display="";
		this.isTree = false;
		if (this.selNum =="1"){
			Ext.getDom(this.commSelectId).multiple=false;
		} else {
			Ext.getDom(this.commSelectId).multiple=true;
		}
		
		var url = ucapSession.baseAction;
		//增加分级管理 通用选择框中所属应用系统 csj 2009.12.30
		var belongToAppId = ucapCommonFun.getUrlParameter("belongToAppId");
		
		//扩展功能显示全部
		if(227==type){
			url += "?type=listSelect&conval=" + conValue + "&selecttype=" + type+"&rand="+Math.random();
		}else{
			if(belongToAppId){
				url += "?type=listSelect&conval=" + conValue + "&selecttype=" + type+ "&belongToAppId=" + belongToAppId+"&rand="+Math.random();
			}else {
				try{
					var belongToAppId=typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:false;
					if(belongToAppId&&belongToAppId!=""){
						url += "?type=listSelect&conval=" + conValue + "&selecttype=" + type+ "&belongToAppId=" + belongToAppId+"&rand="+Math.random();
		    		}else {
		    			url += "?type=listSelect&conval=" + conValue + "&selecttype=" + type+"&rand="+Math.random();
		    		}
				}catch (e){
		          	url += "?type=listSelect&conval=" + conValue + "&selecttype=" + type+"&rand="+Math.random();
				}
			}
		}
		//end 增加分级管理 通用选择框中所属应用系统 csj 2009.12.30
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		var itemList = Ext.getDom(this.commSelectId);
		var items = json.items;
		// 先清空列表
		if (undefined != itemList && itemList.options.length > 0) {
			var olength = itemList.options.length;
			for (var i = 0; i < olength; i++) {
				itemList.options.remove(0);
			}
		}
	
		if (undefined != items) {
			for (var i = 0; i < items.length; i++) {
				if (undefined == items[i] || null == items[i])
					continue;
				
				ucapCommonFun.addOption(itemList, items[i].id, items[i].name);
			}
		}
	},
	
	/**
	 * 加载树形数据
	 * 
	 * @param {} type
	 * 
	 * @param {} conValue
	 */
	loadTree:function(type,conValue,actionType,actionName){
		Ext.getDom(this.treeDivId).style.display="";
		Ext.getDom(this.commSelectId).style.display="none";
		if("undefined"==typeof(actionType) || null==actionType)actionType="treeSelect";
		if("undefined"==typeof(actionName) || null==actionName)actionName="getDeptTree";
		this.isTree = true;
		//yjy2011-5-17 add
		if(actionType=="treeSelect"){
			this.treeAction = "umcAction.action";
		} else {
			this.treeAction = ucapSession.baseAction;
		}
		//为解决分级管理中不同应用系统树形相同问题 add by zhua@linewell.com 2012-3-12 
		var curAppUnid=ucapCommonFun.getUrlParameter("belongToAppId");
		//获取根节点对象
 		var requestConfig = {
			url:this.treeAction, //ucapSession.baseAction, yjy 2011-5-17 
			params:{type:actionType,action:actionName,unid:"",selectType:type,treeType:ucapTreeSelect.treeType,belongToAppId:curAppUnid},//yjy 2011-5-2 add selectType
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					
					if (response.responseText!="null"){
						listSelect.rootJson = Ext.util.JSON.decode(response.responseText);//yjy 2011-4-30 去掉[0]
					} else {
						this.rootJson = null;					
					}
					listSelect.createTree(type,conValue,actionType,actionName);
				}
			}
		}
		Ext.Ajax.request(requestConfig);
		//树形根节点加载完毕
	},
	
	/**
	 * 创建树型
	 * 
	 * @param {} type 加载类型
	 * 
	 * @param {} conValue 相应的条件值
	 */
	createTree:function(type,conValue,actionType,actionName){
		Ext.DomHelper.applyStyles(Ext.get(this.treeDivId),'style="padding:3px 0px 0px 5px;"');
	 	Ext.getDom(this.treeDivId).innerHTML="";
	 	var onlyLeafCheckable = false;
	 	if(type=="200") onlyLeafCheckable = false;
	 	var checkModel =listSelect.checkModel;// "childCascade";  //允许级联选择
	 	if(listSelect.selNum==1){
	 		listSelect.hideCascadeCheck();
	 		checkModel = "single";
	 		onlyLeafCheckable = true;
	 	} 
	 	if (null==this.rootJson){
	 		//说明是从头新建部门
	 		this.rootJson ={id:this.deptRootId,text:"部门列表"};
	 	}
	 	var root;	
	 	
	 	//根节点名称
	 	
	 	var rootName = "部门列表";
	 	if(this.rootJson.text){
	 		rootName = this.rootJson.text;
	 	}
	 	if (onlyLeafCheckable){
	 		root=new Ext.tree.AsyncTreeNode({
		 		id:this.rootJson.id,
				expanded: true,	
				text:rootName,
				children:this.rootJson //yjy2011-5-17
			});	
	 	} else {
		 	 root=new Ext.tree.AsyncTreeNode({
		 		id:this.rootJson.id,
				expanded: true,	
			 	checked:false,
				text:rootName,//this.rootJson.text,
				children:this.rootJson //yjy2011-5-17	
			});	
	 	}		
		var loader = new Ext.tree.TreeLoader({
	         url : this.treeAction,//ucapSession.baseAction,
	          baseAttrs: {uiProvider: Ext.ux.TreeCheckNodeUI} 
	     });
		loader.on('beforeload', function(treeloader, node) {
			if (node.id==this.deptRootId) return;
				var belongToAppId = ucapCommonFun.getUrlParameter("belongToAppId");
				if(belongToAppId){
					treeloader.baseParams ={type:actionType,action:actionName,unid:node.id,selectType:type,
					  	belongToAppId:belongToAppId,treeType:ucapTreeSelect.treeType}
				}else{
					treeloader.baseParams ={type:actionType,action:actionName,unid:node.id,
						selectType:type,treeType:ucapTreeSelect.treeType}
					 }
         }, this);
         
         //2011-12-22 modify cguangcong@linewell.com 添加节点属性，用来判断选择时是否选择非叶节点 
		 var flagTreeRoot = true;
		 //end 添加节点属性，用来判断选择时是否选择非叶节点 
         var listeners = {
         	dblclick : function(node){
				if("undefined" != typeof(node.attributes.ucapAddTreeRoot)){
					flagTreeRoot = node.attributes.ucapAddTreeRoot;
		 		}
         		if(listSelect.currentType=="200" || !flagTreeRoot){
         			if(!node.isLeaf())return;
         		}
         		if(listSelect.selNum==1)listSelect.delAll();
         		var obj={value:node.id,text:node.text};
         		listSelect.addOptionByValue(obj);
         	}
         }

		var tree=new Ext.tree.TreePanel({
			renderTo:this.treeDivId,
			root:root,
			animate:false,
			rootVisible:false,//true, yjy2011-4-30
			autoScroll:true,
			width:190,
			height:270,
			containerScroll: true,
			loader:loader,
			//扩展的属性
			onlyLeafCheckable:onlyLeafCheckable,  //是否只允许选择叶子节点
			checkModel:checkModel,                //是否为单选或级选择
			listeners:listeners                   //节点上的相应事件,主要是双击时可以添加直接添加
		});		
	
		/**add by cjianyan@linewell.com 2011-4-27
		 * 选中左边树形的项，会将选项直接添加到右边，如果取消选项，则删除左边对应取消的选项
		 */		
		tree.on('checkchange', function(node, checked) {
			if(listSelect.selNum== 1 && checked){
				var resultList = Ext.getDom("resultList");
				for (var i = 0; i < resultList.options.length; i++) {
					resultList.options.remove(tmpOpt);
				}
			}
            if(checked){
            	var unid = node.id;
				if (listSelect.type=="204"){
					//是字典
					if (ucapTreeSelect.valueType=="value"){
						unid = node.attributes.value;
					}
				}
				if("undefined" != typeof(node.attributes.ucapAddTreeRoot)){
					flagTreeRoot = node.attributes.ucapAddTreeRoot;
		 		}
				if((listSelect.currentType !="200" && flagTreeRoot)|| node.isLeaf()){//2011-12-22 添加判断条件
					var obj={value:unid,text:node.text};
					listSelect.addOptionByValue(obj);
				}
            }else{
            	var resultList = Ext.getDom("resultList");
				for (var i = 0; i < resultList.options.length; i++) {
					var tmpOpt = resultList.options[i];
					if (tmpOpt.value == node.id) {
						resultList.options.remove(i);
						break;
					}
				}
            }
            
            //node.expand();//mdy by fsm 修改点击复选框不展开子节点的问题
            if(listSelect.selNum != 1 && listSelect.tree.checkModel =="childCascade" ){
                node.attributes.checked = checked;
                node.eachChild(function(child) {
                    child.ui.toggleCheck(checked);
                    child.attributes.checked = checked;
                    child.fireEvent('checkchange', child, checked);
                });
             }
         }, tree);
         
		//root.select();
		this.tree = tree;
	},
	/**
	 * add by fsm
	 * 级联选择复选框发生改变时，做出相应的变化
	 */
	checkChanged:function(obj){
	    var checkModel = "";  //允许级联选择
	    if(obj.checked){
	        checkModel = "childCascade"//节点选中：下级节点和上级父节点级联选中
	    }
	    listSelect.tree.checkModel = checkModel;
	    listSelect.checkModel = checkModel;
	},
	/**
	 * 隐藏级联选择框
	 */
	hideCascadeCheck:function(t)
	{
		if(t)
		{
			Ext.get("selectcheckId").show();
		}
		else
		{
			Ext.get("selectcheckId").hide();//selectcheckId  checkCascade
		}
	},
	/**
	 * radio 单击事件
	 * 
	 * @param {} obj
	 */
	radioClick:function(obj){
		if(!obj.checked){
			return;
		}
		var ctype = obj.value;
		
		if(ctype==listSelect.currentType)return;
		
		var resultList = Ext.getDom("resultList");
		
		if(undefined!=resultList){
			if(null==listSelect.selectValues){
				listSelect.selectValues = new Array();
			}
			var index = -1;
			
			for(var i=0;i<listSelect.selectValues.length;i++){
				var sv = listSelect.selectValues[i];
				if(sv.type==listSelect.currentType){
					index = i;
					break;
				}
			}
			
			var selectValue = new Object();
			selectValue.type = listSelect.currentType;
			var tmpValue = listSelect.getResultValue();
			if(undefined!=tmpValue && tmpValue!=""){
				selectValue.value = tmpValue.substring(0,tmpValue.indexOf(listSelect.valTextSplit));
				selectValue.text = tmpValue.substring(tmpValue.indexOf(listSelect.valTextSplit)+listSelect.valTextSplit.length);
			}

			if(index<0){
				listSelect.selectValues[listSelect.selectValues.length] = selectValue;
			}else{
				listSelect.selectValues[index]=selectValue;
			}
		}
		
		listSelect.loadType(ctype,listSelect.conValue);
	},

	/**
	 * 初始化选中的值
	 */
	initSelectedValue : function() {
		var resultList = Ext.getDom("resultList");

		// 先清空列表
		if (undefined != resultList && resultList.options.length > 0) {
			var olength = resultList.options.length;
			for (var i = 0; i < olength; i++) {
				resultList.options.remove(0);
			}
		}
		
		if(""!=listSelect.oldValue && ""!=listSelect.oldText){
			var oldValueArr = listSelect.oldValue.split(listSelect.inputSplit);
			var oldTextArr = listSelect.oldText.split(listSelect.inputSplit);
			
			var length = oldValueArr.length>oldTextArr.length?oldTextArr.length:oldValueArr.length;
			
			for(var i=0;i<length;i++){
				if("null"==oldValueArr[i] || oldValueArr[i]=="" || null==oldValueArr[i])continue;//modify by  fsm 11.1.17
				ucapCommonFun.addOption(resultList,oldValueArr[i],oldTextArr[i]);
			}
		}
		
//		var itemList = Ext.getDom(this.commSelectId);
//		
//		//当前类型是否已经有选中值
//		var cvalue = listSelect.oldValue;
//		if(undefined!=listSelect.selectValues){
//			for(var i=0;i<listSelect.selectValues.length;i++){
//				var tmpSv = listSelect.selectValues[i];
//				if(tmpSv.type == listSelect.currentType){
//					cvalue = tmpSv.value;
//				}
//			}
//		}
//
//		if (undefined != itemList && itemList.options.length > 0) {
//			for (var i = 0; i < itemList.options.length; i++) {
//				var option = itemList.options[i];
//
//				if (listSelect.inputType == "0") {
//					if (cvalue.indexOf(option.value) >= 0) {
//						ucapCommonFun.addOption(resultList,option.value,option.innerText);
//					}
//				} else {
//					if (cvalue.indexOf(option.innerText) >= 0) {
//						ucapCommonFun.addOption(resultList,option.value,option.innerText);
//					}
//				}
//			}
//		}

	},
	
	/**
	 * 获取选择的结果值
	 */
	getResultValue:function(){
		var resultList = Ext.getDom("resultList");
		var val="";
		var text="";
		
		if(undefined!=resultList.options && resultList.options.length>0){
			for(var i=0;i<resultList.options.length;i++){
				var tmpOpt = resultList.options[i];
				var tmpVal = "";
				var tmpTxt = "";
				tmpTxt = tmpOpt.text;
				tmpVal = tmpOpt.value;
				if(val==""){
					val = tmpVal;
				}else{
					val+=listSelect.outSplit+tmpVal;
				}				
				if(text==""){
					text = tmpTxt;
				}else{
					text+=listSelect.outSplit+tmpTxt;
				}
			}
		}
		
		return val+listSelect.valTextSplit+text;
	},

	/**
	 * 移动选择的结果值
	 * 
	 * @param {}
	 *            direction 移动方向，1向下移动，-1向上移动
	 */
	moveResult : function(direction) {
		var resultList = Ext.getDom("resultList");
		if (resultList.selectedIndex < 0)
			return;
		ucapCommonFun.moveOption(resultList, direction);
	},
	addSelect:function(){
		if(this.isTree){
			//this.treeAddSelect();
			listSelect.treeAddSelect.createInterceptor(listSelect.treeCurAddSelect)();
		} else {
			this.commonAddSelect();
		}
	},
	/**
	 * 用户扩展的自定义选择事件
	 * @return {Boolean} 如果需要自定义后不执行treeAddSelect请返回false
	 */
	treeCurAddSelect:function(){
		//todo 界面加载后执行listSelect.treeCurAddSelect=function(){return false;};函数体内容写法参照treeAddSelect方法
		//并且方法内容要兼容原来treeAddSelect的方法，不能影响原来选择框的功能。
		//Begin-------------以下注释可以忽略，存在Bug
		//注意：如果界面有一个以上的通用选择框，通用自定义的通用选择框就必须有个回调函数，
		//回调函数中最后一行代码加上这句：listSelect.treeCurAddSelect=function(){return true;};
		//-----------End
		return true;
	},
	treeAddSelect:function(){
		var tree = listSelect.tree;
		var nodes = tree.getChecked();		
		if (listSelect.selNum == 1 && nodes.length>0) {//如果都没有选中元素则不添加,add "&& nodes.length>0" by llp,修改单选值无法选中的问题
			// 先清空列表
			listSelect.delAll();
		}	
		for(var i=0;i<nodes.length;i++){
			//2011-12-22 modify cguangcong@linewell.com 添加节点属性，用来判断选择时是否选择非叶节点 
			var flagTreeRoot = true;
			if("undefined" != typeof(nodes[i].attributes.ucapAddTreeRoot)){
				flagTreeRoot = nodes[i].attributes.ucapAddTreeRoot;
			}
			//end 添加节点属性，用来判断选择时是否选择非叶节点 
			var unid = nodes[i].id;
			if (listSelect.type=="204"){
				//是字典
				if (ucapTreeSelect.valueType=="value"){
					unid = nodes[i].attributes.value;
				}
			}else if(listSelect.currentType=="200" || !flagTreeRoot){//2011-12-22 增加判断条件
				if(!nodes[i].isLeaf())continue;
			}
			
			var obj={value:unid,text:nodes[i].text};
			listSelect.addOptionByValue(obj);	
		}
		return true;
		
	},
	/**
	 * 增加选中
	 */
	commonAddSelect : function() {
		var selectList = Ext.getDom(this.commSelectId);
		if (selectList.selectedIndex < 0)
			return;
		var resultList = Ext.getDom("resultList");
		if (listSelect.selNum == 1) {// 先清空列表
			// 先清空列表
			listSelect.delAll();
		}
		for (var i=0;i<selectList.options.length;i++){
			if (selectList.options[i].selected) {
				var val = selectList.options[i];
				listSelect.addOptionByValue(val);				
			}
		}
	},
	addAll:function(){
		if (this.isTree){
			this.treeAddAll();	
		} else {
			this.commonAddAll();
		}
	},
	treeAddAll:function(){
		
	},
	/**
	 * 增加全部
	 */
	commonAddAll : function() {
		var selectList = Ext.getDom(this.commSelectId);
		var resultList = Ext.getDom("resultList");
		if (undefined == selectList || selectList.options.length < 0)
			return;
		for (var i = 0; i < selectList.options.length; i++) {
			var selectOpt = selectList.options[i];			
			this.addOptionByValue(selectOpt);		
		}

	},

	/**
	 * 删除选中
	 */
	delSelect : function() {
		var resultList = Ext.getDom("resultList");
		if (resultList.selectedIndex < 0)
			return;

		resultList.options.remove(resultList.selectedIndex);
	},

	/**
	 * 删除所有选中
	 */
	delAll : function() {
		var resultList = Ext.getDom("resultList");

		if (undefined != resultList && resultList.options.length > 0) {
			var olength = resultList.options.length;
			for (var i = 0; i < olength; i++) {
				resultList.options.remove(0);
			}
		}
	},
	/**
	 * 把selectOpt的对象，添加到结果中
	 * @param {} selectOpt
	 */
	addOptionByValue:function(selectOpt){
		var resultList = Ext.getDom("resultList");
		for (var i = 0; i < resultList.options.length; i++) {
			var tmpOpt = resultList.options[i];
			if (tmpOpt.value == selectOpt.value) {
				return;
			}
		}
		// 增加完毕
		ucapCommonFun.addOption(resultList,selectOpt.value,selectOpt.text);

	},
	/**
	 * 获取所有的选择值
	 */
	getSelectedValue:function(){
		var selectedValue = "";
		var selectedText = "";
		
		if(undefined!=listSelect.selectValues && listSelect.selectValues.length>0){
			for(var i=0;i<listSelect.selectValues;i++){
				if(listSelect.selectValues[i].type!=listSelect.currentType){
					if(selectedValue==""){
						selectedValue = listSelect.selectValues[i].value;
						selectedText = listSelect.selectValues[i].text;
					}else{
						selectedValue +=listSelect.outSplit+listSelect.selectValues[i].value;
						selectedText +=listSelect.outSplit+listSelect.selectValues[i].text;
					}
				}
			}
		}
		
		var tmpValue = listSelect.getResultValue();
		if(tmpValue!=""){
			if(selectedValue==""){
				selectedValue = tmpValue.substring(0,tmpValue.indexOf(listSelect.valTextSplit));
			}else{
				selectedValue +=listSelect.outSplit+ tmpValue.substring(0,tmpValue.indexOf(listSelect.valTextSplit));
			}
			
			if(selectedText==""){
				selectedText = tmpValue.substring(tmpValue.indexOf(listSelect.valTextSplit)+listSelect.valTextSplit.length);
			}else{
				selectedText +=listSelect.outSplit+tmpValue.substring(tmpValue.indexOf(listSelect.valTextSplit)+listSelect.valTextSplit.length);
			}
		}		
		return selectedValue+listSelect.valTextSplit+selectedText;
	}
}


//以下是树型选择的方法
var	ucapTreeSelect={
	rootUnid:"", 
	rootName:"字典列表",
	selectType:"1", //单，多选的标志 1表示单选
	inputName:"",   //要设置的字段名称
	inputSplit:"",  //输入的分隔符
	outSplit:"",    //输出的分隔符
	valueType:"value",  //值的类型 有 id value 
	// 多选: 'multiple'(默认)
	// 单选: 'single'
	// 级联多选: 'cascade'(同时选父和子);'parentCascade'(选父);'childCascade'(选子)
	checkModel:"childCascade", 
	//是否只能选择叶子
	onlyLeafCheckable:true,
	height:"",
	width:"",
	actionType:"",  //参数
	act:"",
	leaf:"",//是否强制为叶子节点
	treeType:"",//有值，说明是从UMC过来
	tree:null,
	/**
	 * unid如果为空，则说明可以同时选上级节点及叶子节点
	 * @param {} unid
	 * @param {} rootName
	 */
	createTree:function(unid,rootName,conValue){
		if(typeof unid =="undefined" || unid==null || unid=="" ){			
			unid="_root";
			this.valueType = "id";
		} else {
			this.valueType ="value";
			this.rootName = rootName;
		}	
		this.rootUnid = unid;		
		Ext.getDom("multiSelect").style.display="";
		Ext.getDom("commonSelectTree").innerHTML="";
		Ext.DomHelper.applyStyles(Ext.get("commonSelectTree"),'style="padding:0px;"');

		if(this.selectType=="1"){
			this.checkModel="single";
			Ext.getDom("multiSelect").style.display="none";
			//this.width =170;
			//this.height=210;
		} else {
			this.checkModel = "childCascade";
		//	this.width =190;
		//	this.height=320;
		}
		if (unid=="_root"){
		//	this.checkModel ="cascade";
			this.onlyLeafCheckable = false;
		}
	 	var root=new Ext.tree.AsyncTreeNode({
			expanded: true,		
			id:this.rootUnid,
			text:this.rootName
		});	
	
		var loader = new Ext.tree.TreeLoader({
	         url : ucapSession.baseAction
	     });
		loader.on('beforeload', function(treeloader, node) {
			var unid=node.id;
			if (unid=="_root") unid="";
			var curAppUnid=ucapCommonFun.getUrlParameter("belongToAppId");
			treeloader.baseParams ={type:ucapTreeSelect.actionType,act:ucapTreeSelect.act,unid:unid,leaf:ucapTreeSelect.leaf,curAppUnid:curAppUnid,conValue:conValue},
			treeloader.baseAttrs= { uiProvider: Ext.ux.TreeCheckNodeUI } 
         }, this);
         var listeners = {
         	dblclick : function(node){
         		if(!node.isLeaf())return;
         		if(this.selectType=="1")listSelect.delAll();
         		//解决取不到UNID mdf by jc 20100909
         		var _v = node.id;
         		if (listSelect.type=="204"){//字典弹出框，取字典值不取unid
         			_v = node.attributes.value;
         		}
         		var obj={value:_v,text:node.text};
         		listSelect.addOptionByValue(obj);
         	}
         }
		var tree=new Ext.tree.TreePanel({
			renderTo:"commonSelectTree",
			root:root,
			animate:false,
			checkModel: this.checkModel,   //对树的级联多选
   			onlyLeafCheckable: this.onlyLeafCheckable,//对树所有结点都可选
			rootVisible:true,
			autoScroll:true,
			//autoWidht:true,
			//autoHeight:true,
			width:this.width,
			containerScroll: true,
			height:this.height,
			loader: loader,
			listeners:listeners
		});		
		listSelect.tree = tree;
		ucapTreeSelect.leaf = "";
		listSelect.initSelectedValue();
	}
}