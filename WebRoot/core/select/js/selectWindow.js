/**
 * zTree树对象
 * 
 */
var zTreeObj; 

/**
 * 列表选择对话框相关js
 * 
 */
var listSelect = {
	oldValue : "", 			// 原始值
	oldText:"",    			// 原始文本值
	inputSplit : ",", 		// 输入分隔符
	outSplit : ",", 		// 输出分隔符
	selNum : "0", 			// 树形选择框类型（0:复选框；1:单选框）
	type : "", 				// 选择类型
	inputType : "0", 		// 输入值类型
	outType : "0", 			// 输出类型
	currentType:"", 		// 当前选择类型
	treeDivId:"treeSelect", // 树形所在div的标识
	queryId:"queryId",		// 查询的id
	isTree:false,           // 当前选择是否为树形,是的话在添加和全添的方法不一样
	valTextSplit:"~$@s@$~", // 值名称的分隔符号
	showItems:null,         // 显示类型
	treeAction:"", 			// 树型的action
	checkModel: false,		// 级联方式
	allPath: false,			// 全路径选择
	inputTextId : "",		// 输入文本框id
	chkStyle : "checkbox",	// 节点选择框类型（checkbox：复选框；radio：单选框）
	isOnCheck : false,		// 标识是否为复选框勾选的事件
	initData : function(type, chcType, inputName, inputSplit, outSplit, arg){
		var value = top.lwin.parent().find('#'+inputName).val();
		var text = top.lwin.parent().find('#'+inputName+"_cn_").val();
		listSelect.inputTextId = inputName;
		listSelect.isTree = false;  //默认为普通选择
		listSelect.oldValue = value;
		listSelect.oldText = text||"";
		listSelect.type = type;
		//可选文本框类型
		if(chcType != "undefined" && chcType != "" && chcType != null && undefined != chcType){
			listSelect.selNum = chcType;
			if(chcType == "1"){
				listSelect.chkStyle = "radio";
			}
		}
		//输入字符串分隔符
		if (inputSplit != "undefined" && inputSplit != "" && inputSplit != null && undefined != inputSplit){
			listSelect.inputSplit = inputSplit;
		}
		//输出字符串分隔符
		if (outSplit != "undefined" && outSplit != "" && outSplit != null && undefined != outSplit){
			listSelect.outSplit = outSplit;	
		}
		/**
		* 1、ucapSession.baseAction为BaseAction在struts.xml文件中配置；
		* 2、BaseAction在ucapPlatform.jar文件中；
		* 3、在调用BaseAction时，通过读取verbs.properties文件找到名称为listSelect的值
		* 4、通过该值找到实现类，并且以此读取globalsession.xml文件获取各个类型的配置
		**/	
		var url = ucapSession.baseAction;
		url += "?type=listSelect&action=getShowType&selecttype=" + type+"&rand="+Math.random();
		var json;
		jQuery.ajax({
			url:url,
			type:'get',
			dataType:'json',
			async:false,
			success:function(response){
				json = response;
			}
		});
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		listSelect.showItems = json.items;
	},
	
	/**
	 * 初始化选择类型
	 */
	initTypes : function() {
		var radioHtml = "";
		var url = ucapSession.baseAction;
		url += "?type=listSelect&action=getTypes&selecttype=" + listSelect.type+"&rand="+Math.random();
		var json;
		jQuery.ajax({
			url:url,
			type:'get',
			dataType:'json',
			async:false,
			success:function(response){
				json = response;
			}
		});
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		
		var items = json.items;

		listSelect.initSelectedValue();
		if (undefined != items) {
			for (var i = 0; i < items.length; i++) {
				if (i == 0) {
					// 对其进行初始化
					listSelect.loadType(items[i].type);
				}
				if (undefined == items[i] || null == items[i])
					continue;
				if (undefined == radioHtml || radioHtml == "") {
					radioHtml = "<input type='radio' value='" + items[i].type
							+ "' name='select' id='select' checked>" + items[i].name
							+ "</input>"
				} else {
					radioHtml += "<input type='radio' value='" + items[i].type
							+ "' name='select' id='select'>" + items[i].name
							+ "</input>"
				}
			}
		}
		// 把当前选择类型框设置相应的td中
		jQuery("#selectTypeId").html(radioHtml);
	},
	
	/**
	 * 查询按钮方法
	 * 
	 */
	query : function() {
		var flag = true;
		var arg = jQuery("#" + listSelect.queryId).val();
		var nodes = zTreeObj.getNodesByParamFuzzy("name", arg, null);
		if(typeof(nodes) == "undefined" || nodes == null){
			top.jQuery.messager.alert('消息','当前没有可供检索的数据项！','info');
			return;
		} else {
			if(arg == null || arg == ""){
				top.jQuery.messager.alert('消息','请先输入关键字！','info');
				return;
			} else {
				jQuery("#queryBackButton").show();
				for(var i = 0; i < nodes.length; i++){
					if(nodes[i].name.indexOf(arg) >= 0){
						zTreeObj.selectNode(nodes[i]);
						flag = false;
					}
				}
			}
		}
		if(flag){
			top.jQuery.messager.alert('消息','未检索到所需数据项！','info');
		}
	},
	
	/**
	 * 返回按钮方法
	 * 
	 */
	queryBack : function() {
		jQuery("#" + listSelect.queryId).val("");
		zTreeObj.reAsyncChildNodes(null,'refresh');
		jQuery("#queryBackButton").hide();
	},
	
	/**
	 * 初始化通用选择框
	 * 
	 * @param {}
	 *            type 类型
	 * 
	 */
	loadType : function(type) {
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
		var btnAddAllId=jQuery("#btnAddAllId");
		if(type=="200" || type=="201" || showType=="01"){//200,201为用户、部门，采用树形的方式显示
			listSelect.hideCascadeCheck(listSelect.selNum);
			if(btnAddAllId)btnAddAllId.hide();//当树形时，隐藏全添按钮
			this.createTree();
		}
	},
	
	/**
	 * 创建树型
	 * 
	 */
	createTree:function(){
		var setting = {
			async:{
				enable: true,
				url:"tree.action?fn=tree&class=com.linewell.core.ucap.select.window.SelectWindowTree&type=" + listSelect.type,
				autoParam:["id",'parentunid']
			},
			check: {
				enable: true,
				chkboxType: { "Y": "", "N": ""},
				chkStyle: listSelect.chkStyle,
				radioType: "all"
				//autoCheckTrigger: true
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback:{
		    	onClick: nodeOnClick,
		    	onAsyncSuccess:function(){
		    		$(".root_close,.roots_close").click();
		    	},
		    	onCheck: zTreeOnCheck,
		    	onAsyncSuccess: zTreeOnAsyncSuccess
		    }			    
		};	
		jQuery.fn.zTree.init(jQuery("#" + this.treeDivId), setting);
		zTreeObj = $.fn.zTree.getZTreeObj(this.treeDivId);
		
		//点击树节点事件
		function nodeOnClick(event, treeId, treeNode) {
			listSelect.addOptionByValue(treeNode);
		}
		
		//勾选复选框事件
		function zTreeOnCheck(event, treeId, treeNode){
			listSelect.checkboxSelect(event, treeId, treeNode);
		}
		
		//异步加载成功事件
		function zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
		    listSelect.asyncSuccess(event, treeId, treeNode, msg);
		}
	},
	
	/**
	 * 级联选择复选框发生改变时，做出相应的变化
	 */
	checkChanged:function(obj){
	    if(obj.checked){
	        listSelect.checkModel = true;//节点选中：下级节点和上级父节点级联选中
	    } else {
	    	listSelect.checkModel = false;
	    }
	},
	
	/**
	 * 是否全路径选择
	 */
	 allPathSelect:function(obj){
	    if(obj.checked){
	        listSelect.allPath = true;
	    } else {
	    	listSelect.allPath = false;
	    }
	},
	
	/**
	 * 把selectOpt的对象，添加到结果中
	 * @param {} treeNode
	 */
	addOptionByValue:function(treeNode){
		var resultList = document.getElementById("resultList");
		for (var i = 0; i < resultList.options.length; i++) {
			var tmpOpt = resultList.options[i];
			if (tmpOpt.value == treeNode.id) {
				return;
			}
		}
		//包含路径执行操作
		if(listSelect.allPath){
			var id = treeNode.id;
			var name = "";
			var temp = "";
			do{
				temp = "/" + treeNode.name;
				temp += name;
				name = temp;
				treeNode = treeNode.getParentNode();
			}while(treeNode)
			if(name != "" && name != null){
				name = name.substr(1, name.length - 1);
			}
			ucapCommonFun.addOption(resultList,id,name);
		} else {
			ucapCommonFun.addOption(resultList,treeNode.id,treeNode.name);
		}
	},
	
	/**
	 * 隐藏级联选择框
	 */
	hideCascadeCheck:function(t){
		if(t == "0"){
			jQuery("#selectcheckId").show();
		} else{
			jQuery("#selectcheckId").hide();
		}
	},
	/**
	 * 添加已经勾选的复选框
	 */
	addSelect:function(){
		var nodes = zTreeObj.getCheckedNodes(true);
		if(nodes.length == 0){
			top.jQuery.messager.alert('消息','请先从左边树中选择所需添加项！','info');
			return;
		}
		if(nodes.length==1){
		var resultList = document.getElementById("resultList");
		if(resultList.options.length!=0){
		top.jQuery.messager.alert('消息','只能选择一个选项！','info');
			return;
		}
	}
		for(var i = 0; i < nodes.length; i++){
			listSelect.addOptionByValue(nodes[i]);
		}
	},
	
	/**
	 * 删除选中
	 */
	delSelect : function() {
		var resultList = document.getElementById("resultList");
		if(resultList.options.length == 0){
			top.jQuery.messager.alert('消息','当前右边列表中没有可供删除的项！','info');
			return;
		}
		if (resultList.selectedIndex < 0){
			top.jQuery.messager.alert('消息','请先从右边列表中点击选中需要删除的项！','info');
			return;
		}
		resultList.options.remove(resultList.selectedIndex);
	},
	/**
	 * 全部添加
	 */
	addAll:function(){
		var nodes = zTreeObj.transformToArray(zTreeObj.getNodes());
		for(var i = 0; i < nodes.length; i++){
			listSelect.addOptionByValue(nodes[i]);
		}
	},
	
	/**
	 * 删除所有选中
	 */
	delAll : function() {
		var resultList = document.getElementById("resultList");
		if(resultList.options.length == 0){
			top.jQuery.messager.alert('消息','当前右边列表中没有可供删除的项！','info');
			return;
		}
		if (undefined != resultList && resultList.options.length > 0) {
			var olength = resultList.options.length;
			for (var i = 0; i < olength; i++) {
				resultList.options.remove(0);
			}
		}
	},

	/**
	 * 初始化选中的值
	 */
	initSelectedValue : function() {
		var resultList = document.getElementById("resultList");
		// 先清空列表
		if (undefined != resultList && resultList.options.length > 0) {
			var olength = resultList.options.children();
			for (var i = 0; i < olength; i++) {
				resultList.children().remove();
			}
		}
		if(""!=listSelect.oldValue && ""!=listSelect.oldText){
			var oldValueArr = listSelect.oldValue.split(listSelect.inputSplit);
			var oldTextArr = listSelect.oldText.split(listSelect.inputSplit);
			var length = oldValueArr.length>oldTextArr.length?oldTextArr.length:oldValueArr.length;
			for(var i=0;i<length;i++){
				if("null"==oldValueArr[i] || oldValueArr[i]=="" || null==oldValueArr[i])continue;
				ucapCommonFun.addOption(resultList,oldValueArr[i],oldTextArr[i]);
			}
		}
	},
	
	/**
	 * 获取选择的结果值
	 */
	getResultValue:function(){
		var resultList = document.getElementById("resultList");
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
		var resultList = document.getElementById("resultList");
		if (resultList.selectedIndex < 0)
			return;
		ucapCommonFun.moveOption(resultList, direction);
	},
	
	/**
	 * 确认所选数据项
	 * 
	 */
	sureSelect:function(){
		var result = listSelect.getResultValue();
		if(result != null && result != ""){
			var resultArr = result.split(listSelect.valTextSplit);
			top.lwin.parent().find("#" + listSelect.inputTextId).val(resultArr[0]);
			top.lwin.parent().find("#" + listSelect.inputTextId +"_cn_").val(resultArr[1]);
			top.lwin.close();
		} else {
			top.jQuery.messager.alert('消息','请先选择所需项！','info');
		}
	},
	
	/**
	 * 复选框选择事件
	 */
	 checkboxSelect:function(event, treeId, treeNode){
	 	if(treeNode.isParent && listSelect.checkModel){
	 		listSelect.isOnCheck = true;
	 		zTreeObj.reAsyncChildNodes(treeNode, 'refresh');
	 	} else if(!treeNode.isParent && listSelect.checkModel){
	 		listSelect.dealParentCheckbox(treeNode);
	 	}
	 },
	 
	 /**
	 * 异步加载成功事件
	 */
	 asyncSuccess:function(event, treeId, treeNode, msg){
	 	if(listSelect.isOnCheck && listSelect.checkModel){
	 		//listSelect.isOnCheck = false;
	 		var nodes = treeNode.children;
	 		for(var i = 0; i < nodes.length; i++){
	 			if(treeNode.checked){
	 				zTreeObj.checkNode(nodes[i], true, false, true);
	 				zTreeObj.checkNode(treeNode, true, false, false);
	 			} else {
	 				zTreeObj.checkNode(nodes[i], false, false, true);
	 				zTreeObj.checkNode(treeNode, false, false, false);
	 			}
	 		}
	 		listSelect.dealParentCheckbox(treeNode);
	 	}
	 },
	 
	 /**
	 * 递归处理父复选框选中状态
	 */
	 dealParentCheckbox:function(nodeObj){
	 	if(typeof(nodeObj) != "undefined" && nodeObj != null && nodeObj != ""){
	 		var pNode = nodeObj.getParentNode();
	 		if(typeof(pNode) != "undefined" && pNode != null && pNode != ""){
	 			if(!nodeObj.checked){
	 				zTreeObj.checkNode(pNode, false, false, false);
	 				listSelect.dealParentCheckbox(pNode);
	 			} else {
	 				var isChecked = true;
	 				var nodes = pNode.children;
		 			for(var i = 0; i < nodes.length; i++){
		 				if(!nodes[i].checked){
		 					isChecked = false;
		 				}
		 			}
		 			zTreeObj.checkNode(pNode, isChecked, false, false);
		 			listSelect.dealParentCheckbox(pNode);
	 			}
 			} else {
 				return;
 			}
	 	} else {
	 		return;
	 	}
	 }
}