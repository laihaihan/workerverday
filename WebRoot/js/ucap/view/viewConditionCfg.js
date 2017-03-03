/**
 * 视图条件自定义
 * 
 * @type 
 */
var viewConditionCfg = {
	
    compareCfgs:["~!@0~!@0","~!@0~!@1","~!@0~!@2","~!@0~!@3","~!@0~!@4","~!@0~!@5","~!@0~!@6"
    ,"~!@0~!@7","~!@0~!@8","~!@0~!@9","~!@0~!@A","~!@0~!@B","~!@0~!@C","~!@0~!@D"],
    
    compareSqls:[" = "," >= "," <= "," > "," < "," LIKE "," LIKE "," LIKE "," NOT LIKE "," IS NULL "," IS NOT NULL "," != "," IN "," NOT IN "],

    hideCompareCfgs:["~!@0~!@5","~!@0~!@6","~!@0~!@7","~!@0~!@8","~!@0~!@C","~!@0~!@D"],
    
    hideSelOptions:["~!@DB@!~","~!@FW@!~"],  //当比较符是包含和属于时，此值类型无意义
    
    hideSelOptionsCn:["数据库字段","流程字段"],     
    
	dbItems:null,               //数据库字段列表
	
	flowItems:null,             //流程字段列表
	
	sysParamsItems:null,        //系统参数列表
	
	cfgType:"1",                //配置类型，为手工输入或者为配置，0：手工输入；1：配置
	
	condition:"",               //视图条件
	
	conditionCn:"",             //视图条件的中文配置
	
	optionSplit:"~@$<br/>$@~", //option间的分隔符号
	
	fieldEndPrefix:"~!@E@!~",   //字段结束标识符
		
	/**
	 * 先初始化数据界面
	 */
	init:function(viewId){
		//先初始化视图配置界面(1)获取数据库字段 (2)、获取流程字段 (3)、获取系统变量
		if(!viewId)return;
		viewConditionCfg.getViewCondition(viewId);
		var manaulTable = Ext.getDom("manualCfg");
		var sysTable = Ext.getDom("sysCfg");
		if(viewConditionCfg.conditionCn.trim()=="" && viewConditionCfg.condition!=""){//为手工输入条件
			viewConditionCfg.cfgType = 0;
			viewConditionCfg.checkRadio('0');
			
			
			manaulTable.style.display="";
			sysTable.style.display = "none";
			
			var conInput = Ext.getDom("contextarea");
			if(conInput.innerText){
				conInput.innerText = viewConditionCfg.condition;
			}else if(conInput.textContent ){
				conInput.textContent=viewConditionCfg.condition;
			}
		}else{
			viewConditionCfg.cfgType = 1;
			viewConditionCfg.checkRadio('1');
			manaulTable.style.display="none";
			sysTable.style.display = "";
			
			var cons = viewConditionCfg.condition.split(viewConditionCfg.optionSplit);
			var conCns = viewConditionCfg.conditionCn.split(viewConditionCfg.optionSplit);
			
			var resultCn = Ext.getDom("resultsSel_CN");
			
			//循环所有条件
			for(var i=0;i<cons.length;i++){
				ucapCommonFun.addOption(resultCn,cons[i],conCns[i]);
			}
		}
		//并且开始初始化选择界面,手工输入的时候也进行加载，否则在切换时无法看到数据库字段列表 mdy by llp
		viewConditionCfg.initSel(viewId,"~!@DB@!~","leftSel_CN");
		viewConditionCfg.initSel(viewId,"~!@DB@!~","rightSel_CN");
	},
	
	/**
	 * 选中radio的状态值
	 * 
	 * @param {} val
	 */
	checkRadio:function(val){
		var radios = document.getElementsByName("cfgType");
		for(var i=0;i<radios.length;i++)
		{
			if(radios[i].value==val){
				radios[i].checked=true;
			}
		}
	},
	
	
	/**
	 * 根据视图标识获取数据库视图绑定的字段
	 * 
	 * @param {} viewId
	 */
	getDbItems:function(viewId,refresh){
		/**
		 * 如果不为空的话以及不是刷新的话则不重新加载
		 */
		if(undefined!=viewConditionCfg.dbItems && null!=viewConditionCfg.dbItems && !refresh)return;
		
		viewConditionCfg.dbItems = new Array();
		
		var url =ucapSession.baseAction;
		url+="?viewId="+viewId+"&type=viewSelfConfig&action=getFormItemEnCn&from=viewSelfCondition";
		url += "&rnd=" + Math.random();//添加随机数，解决jsp页面缓存显示旧数据的问题  by@cgc 2011-7-12
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);			
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		if(!json)return;
		
		var items = json.items;

		//alert(Ext.util.JSON.encode(json));
		if(undefined!=items){
			for(var i=0;i<items.length;i++){
				if(undefined==items[i] || null==items[i])continue;
				viewConditionCfg.dbItems[i] = items[i];
			}
		}
	},
	
	/**
	 * 获取流程字段列表
	 * 
	 * @param {} viewId
	 */
	getFlowItems:function(){
		/**
		 * 如果不为空的话以及不是刷新的话则不重新加载
		 */
		if(undefined!=viewConditionCfg.flowItems && null!=viewConditionCfg.flowItems)return;
		viewConditionCfg.flowItems = new Array();
		
		var url =ucapSession.baseAction;
		url+="?type=viewSelfConfig&action=getFlowItems";
		url += "&rnd=" + Math.random();//添加随机数，解决jsp页面缓存显示旧数据的问题  by@cgc 2011-7-12
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);		
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		if(!json)return;
		
		var items = json.items;

		//alert(Ext.util.JSON.encode(json));
		if(undefined!=items){
			for(var i=0;i<items.length;i++){
				if(undefined==items[i] || null==items[i])continue;
				viewConditionCfg.flowItems[i] = items[i];
			}
		}
	},
	
	/**
	 * 获取系统参数列表
	 * 
	 * @param {} viewId
	 */
	getSysParams:function(){
		/**
		 * 如果不为空的话以及不是刷新的话则不重新加载（新增的话怎么办？？---csj）
		 */
		//if(undefined!=viewConditionCfg.sysParamsItems && null!=viewConditionCfg.sysParamsItems)return;
		viewConditionCfg.sysParamsItems = new Array();
		var url =ucapSession.baseAction;
		var belongToAppId = typeof(ucapManagerTree)!="undefined"?ucapManagerTree.curBelongToAppId:false;
			if(belongToAppId){
			url+="?type=viewSelfConfig&action=getSysParams&belongToAppId="+belongToAppId;
			}else{
				belongToAppId = ucapCommonFun.getUrlParameter("belongToAppId");
				if(belongToAppId){
					url+="?type=viewSelfConfig&action=getSysParams&belongToAppId="+belongToAppId;
				}else{
				url+="?type=viewSelfConfig&action=getSysParams";
				}
			}
			url += "&rnd=" + Math.random();//添加随机数，解决jsp页面缓存显示旧数据的问题  by@cgc 2011-7-12
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);		
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		if(!json)return;
		
		var items = json.items;

		//alert(Ext.util.JSON.encode(json));
		if(undefined!=items){
			for(var i=0;i<items.length;i++){
				if(undefined==items[i] || null==items[i])continue;
				viewConditionCfg.sysParamsItems[i] = items[i];
			}
		}
	},
	
	/**
	 * 通过视图标识获取已经配置好的视图条件
	 * 
	 * @param {} viewId
	 */
	getViewCondition:function(viewId){
		var url =ucapSession.baseAction;
		url+="?viewId="+viewId+"&type=viewSelfConfig&action=getViewCondition&rand="+Math.random();
		
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);

		var json = Ext.util.JSON.decode(conn.responseText);		
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		if(!json)return;
		
		//设置视图条件
		viewConditionCfg.condition = json.condition;
		viewConditionCfg.conditionCn = json.conditionCn;

	},
	
	/**
	 * 初始化比较运算符值选项，当比较符是包含和属于时隐藏数据库字段和流程变量
	 * @author cxifu@linewell.com 2012/06/12
	 */
	initSeloptions:function(viewId,type,selOpsName){
		//根据类型以及相应选择列名称进行初始化
		var items = null;
		if(typeof(selOpsName)=="string"){
			selOpsName = Ext.getDom(selOpsName);
		}
		
		//去除不必要的配置项
		if(viewConditionCfg.hideCompareCfgs.indexOf(type)>=0){
			var length = selOpsName.options.length;
			var values=new Array();
			for(var i=0;i<length;i++){
				var value=selOpsName.options[i].value;
				if(viewConditionCfg.hideSelOptions.indexOf(value)<0){
					values.push(selOpsName.options[i]);
				}
			}
			selOpsName.options.length=0;
			for(var i=0;i<values.length;i++){
				selOpsName.options.add(values[i]);
			}
		}else{//添加选项
			var isAdd=true;
			length = viewConditionCfg.hideSelOptions.length;
			for(var j=0;j<selOpsName.options.length;j++){
				var value=selOpsName.options[j].value;
				if(viewConditionCfg.hideSelOptions.indexOf(value)>=0){
					isAdd=false;
					break;
				}
			}
			if(isAdd){
				for(var i=0;i<length;i++){
					selOpsName.options.add(new Option(viewConditionCfg.hideSelOptionsCn[i],viewConditionCfg.hideSelOptions[i]));
				}
			}	
		}
		viewConditionCfg.initSel(viewId,selOpsName.value,"rightSel_CN");
	},
	initSel:function(viewId,type,selName){
		//根据类型以及相应选择列名称进行初始化
		var items = null;
		if(typeof(selName)=="string"){
			selName = Ext.getDom(selName);
		}
		
		//先清空所有选项
		var length = selName.options.length;
		for(var i=0;i<length;i++){
			selName.options.remove(0);
		}
		selName.style.display="";
		var re = /Sel/g;
		var inputName = Ext.getDom(selName.id.replace(re,"Input"));
		inputName.style.display = "none";
		if(type=="~!@DB@!~" || type=="~!@FW@!~"){
			if(type=="~!@DB@!~"){
				viewConditionCfg.getDbItems(viewId,false);
				items = viewConditionCfg.dbItems;
			}else{
				items = viewConditionCfg.getFlowItems();
				items = viewConditionCfg.flowItems;
			}
			
			for(var i=0;i<items.length;i++){
				ucapCommonFun.addOption(selName,items[i].nameEn,items[i].nameCn);
			}
		}else if(type=="~!@XY@!~"){
			viewConditionCfg.getSysParams();
			items = viewConditionCfg.sysParamsItems;
			for(var i=0;i<items.length;i++){
				ucapCommonFun.addOption(selName,items[i].unid,items[i].name);
			}
		}else{
			selName.style.display = "none";
			inputName.style.display = "";
		}
	},
	
	/**
	 * 在配置的情况下设置条件值
	 */
	setCondition:function(){
		//先初始化
		viewConditionCfg.condition = ""; 
		viewConditionCfg.conditionCn = "";
		var topWin = viewConfig.topWindow;
		if(null==topWin)topWin = window;
		
		if(viewConditionCfg.cfgType=="0"){//手工输入
			viewConditionCfg.condition = Ext.getDom("contextarea").innerText||Ext.getDom("contextarea").textContent  ;
		}else{
			var selectCn = topWin.Ext.getDom("resultsSel_CN");
			
			for(var i=0;i<selectCn.options.length;i++){
				var option = selectCn.options[i];
				if(viewConditionCfg.condition==""){
					viewConditionCfg.condition = option.value;
					viewConditionCfg.conditionCn = option.text;//firefox
				}else{
					viewConditionCfg.condition +=viewConditionCfg.optionSplit+option.value;
					viewConditionCfg.conditionCn += viewConditionCfg.optionSplit+option.text;//firefox
				}
			}//end for
			
		}//end if(viewConditionCfg.cfgType
	},
	
	/**
	 * 配置方式的转化
	 */
	cfgTypeChange:function(obj){
		var ct = "";
		if(obj.checked){
			ct = obj.value;
		}
		var cfgManualTable = Ext.getDom("manualCfg");
		var cfgSysTable = Ext.getDom("sysCfg");
		//manualCfg,sysCfg
		if(ct=="0"){
			cfgManualTable.style.display = "";
			cfgSysTable.style.display = "none";
			viewConditionCfg.changeConToManual();
			if(viewConditionCfg.condition!=""){//mdy by llp 2010-05-31 类型切换时，条件配置值消失的问题
				//Ext.getDom("contextarea").innerHTML = viewConditionCfg.condition.replace(viewConditionCfg.optionSplit,"");
				try{
					var coditionStr=viewConditionCfg.condition.replace(viewConditionCfg.optionSplit,"");
					Ext.getDom("contextarea").value = coditionStr;
				}catch(e){
					
				}
			}
		}else{
			cfgManualTable.style.display = "none";
			cfgSysTable.style.display = "";
		}
		viewConditionCfg.cfgType = ct;
	},
	
	/**
	 * 把系统配置条件向手工输入条件转换
	 */
	changeConToManual:function(){
		viewConditionCfg.setCondition();
		for(var i=0;i<viewConditionCfg.compareCfgs.length;i++){
			viewConditionCfg.condition = viewConditionCfg.condition.replace(viewConditionCfg.compareCfgs[i],viewConditionCfg.compareSqls[i]);
		}
	},
	
	//与操作相关的功能
	
	/**
	 * 增加条件,如果index不为空的话则为更新条件
	 */
	addCon:function(index){
		var leftFieldType = Ext.getDom("leftseloptions_CN");
		var leftFieldName = Ext.getDom("leftSel_CN");
		var leftInputName = Ext.getDom("leftInput_CN");
		var compareType = Ext.getDom("compareTypeSel_CN");
		
		var rightFieldType = Ext.getDom("rightseloptions_CN");
		var rightFieldName = Ext.getDom("rightSel_CN");
		var rightInputName = Ext.getDom("rightInput_CN");
		var andOr = Ext.getDom("andOrSel_CN");
		
		var con = "";
		
		if(leftFieldType.selectedIndex<0){
			Ext.MessageBox.alert("提示","请选择字段类型");
			return;
		}
		
		if(leftFieldType.value!="~!@UR@!~" && leftFieldType.value!="~!@CL@!~"){
			if(leftFieldName.selectedIndex<0){
				Ext.MessageBox.alert("提示","请选择相应的字段");
				return;
			}
		}else{
			if(leftInputName.value==""){
				Ext.MessageBox.alert("提示","请输入相应的字段值");
				return;
			}
		}
		
		if(compareType.selectedIndex<0){
			Ext.MessageBox.alert("提示","请选择比较方式");
			return;
		}
		
		if(compareType.value!="~!@0~!@9" && compareType.value!="~!@0~!@A"){
			if(rightFieldType.selectedIndex<0){
				Ext.MessageBox.alert("提示","请选择条件值类型");
				return;
			}
			
			if(rightFieldType.value!="~!@UR@!~" && rightFieldType.value!="~!@CL@!~"){
				if(rightFieldName.selectedIndex<0){
					Ext.MessageBox.alert("提示","请选择条件值");
					return;
				}
			}
			
			if(leftFieldType.value!="~!@UR@!~" && leftFieldType.value!="~!@CL@!~"){
				con=leftFieldType.value+leftFieldName.value+viewConditionCfg.fieldEndPrefix;
				conCn=leftFieldName.options[leftFieldName.selectedIndex].text;
			}else{
				con=leftFieldType.value+leftInputName.value+viewConditionCfg.fieldEndPrefix;
				conCn = leftInputName.value;
			}
			
			con = con+compareType.value+rightFieldType.value;
			conCn=conCn+" "+compareType.options[compareType.selectedIndex].text+" ";
			
			if(rightFieldType.value!="~!@UR@!~" && rightFieldType.value!="~!@CL@!~"){
				con+=rightFieldName.value+viewConditionCfg.fieldEndPrefix;
				conCn+=rightFieldName.options[rightFieldName.selectedIndex].text
			}else{
				con+=rightInputName.value+viewConditionCfg.fieldEndPrefix;
				conCn+=rightInputName.value;
			}
			con+=andOr.value;
			
			if(andOr.value!=""){
				conCn+=" "+andOr.options[andOr.selectedIndex].text;
			}
		}else{
			con= leftFieldType.value+leftFieldName.value+viewConditionCfg.fieldEndPrefix+compareType.value+andOr.value;
			conCn= leftFieldName.options[leftFieldName.selectedIndex].text
			+compareType.options[compareType.selectedIndex].text+" "+andOr.options[andOr.selectedIndex].text;
		}
		
		var option = new Option(conCn,con);
		
		var conSelect = Ext.getDom("resultsSel_CN");
		//增加条件到列表中
		if(undefined==index || index<0){
			conSelect.options.add(option,conSelect.selectedIndex+1);
		}else{
			conSelect.options[index]= option;
		}
	},
	
	/**
	 * 刷新条件
	 */
	refreshCon:function(){
		//刷新条件
		var conSelect = Ext.getDom("resultsSel_CN");
		if(conSelect.selectedIndex<0)return;
		var conSelect = Ext.getDom("resultsSel_CN");
		viewConditionCfg.addCon(conSelect.selectedIndex);
	},
	
	/**
	 * 删除条件
	 */
	delCon:function(){
		var conSelect = Ext.getDom("resultsSel_CN");
		if(conSelect.selectedIndex<0)return;
		
		conSelect.options.remove(conSelect.selectedIndex);
	},
	
	/**
	 * 加左边括号
	 */
	addLeftBracked:function(){
		var conSelect = Ext.getDom("resultsSel_CN");
		var option = new Option("(","(");
		conSelect.options.add(option,conSelect.selectedIndex);
	},
	
	/**
	 * 加右边括号
	 */
	addRightBracked:function(){
		var conSelect = Ext.getDom("resultsSel_CN");
		var option = new Option(")",")");
		conSelect.options.add(option,conSelect.selectedIndex+1);
	},
	
	/**
	 * 加右边括号及并且
	 */
	addRightBrackedAnd:function(){
		var conSelect = Ext.getDom("resultsSel_CN");
		var option = new Option(")并且",")~!@AND@!~");
		conSelect.options.add(option,conSelect.selectedIndex+1);
	},
	
	/**
	 * 加右边括号及或者
	 */
	addRightBrackedOr:function(){
		var conSelect = Ext.getDom("resultsSel_CN");
		var option = new Option(")或者",")~!@OR@!~");
		conSelect.options.add(option,conSelect.selectedIndex+1);
	},
	
	/**
	 * 进行移动视图配置条件
	 * 
	 * @param {} direction 1:为向下移动，-1为向上移动
	 */
	moveConItem:function(direction){
		if(Ext.getDom("resultsSel_CN").selectedIndex<0)return;
		ucapCommonFun.moveOption(Ext.getDom("resultsSel_CN"),direction);
	},
	
	/**
	 * 对选择的节点进行切换
	 * 
	 * @param {} obj
	 */
	selectParseAndSet:function(obj){
		if(obj.selectedIndex<0)return;
		
		var connValue = obj.value;
		
		if(connValue=="" || connValue=="(" || connValue==")" || connValue==")~!@AND@!~" || connValue==")~!@OR@!~")return;
		
		var leftFieldType = connValue.substring(0,8);
		connValue = connValue.substring(8);
		var leftFieldVal = connValue.substring(0,connValue.indexOf(viewConditionCfg.fieldEndPrefix));
		connValue=connValue.substring(connValue.indexOf(viewConditionCfg.fieldEndPrefix)+viewConditionCfg.fieldEndPrefix.length);
		var compareType = connValue.substring(0,8);
		connValue = connValue.substring(8);
		var rightFieldType="";
		var rightFieldValue="";
		
		var andOr = "";
		
		if(compareType!="~!@0~!@9" && compareType!="~!@0~!@A"){//比较类型不是“为空”或“不为空”
			rightFieldType = connValue.substring(0,8);
			connValue=connValue.substring(8);
			rightFieldValue=connValue.substring(0,connValue.indexOf(viewConditionCfg.fieldEndPrefix));
			
			andOr = connValue.substring(connValue.indexOf(viewConditionCfg.fieldEndPrefix)+viewConditionCfg.fieldEndPrefix.length);
		}else{
			andOr = connValue;
		}
		
		//进行设置值
		Ext.getDom("leftseloptions_CN").value = leftFieldType;
		viewConditionCfg.initSel("",leftFieldType,'leftSel_CN');
		
		if(leftFieldType=="~!@UR@!~" || leftFieldType=="~!@CL@!~"){
			Ext.getDom("leftInput_CN").value = leftFieldVal;
		}else{
			Ext.getDom("leftSel_CN").value = leftFieldVal;
		}
		
		Ext.getDom("compareTypeSel_CN").value = compareType;
		
		Ext.getDom("rightseloptions_CN").value = rightFieldType;
		viewConditionCfg.initSel("",rightFieldType,'rightSel_CN');
		if(rightFieldType=="~!@UR@!~" || rightFieldType=="~!@CL@!~"){
			Ext.getDom("rightInput_CN").value = rightFieldValue;
		}else{
			Ext.getDom("rightSel_CN").value = rightFieldValue;
		}
		
		Ext.getDom("andOrSel_CN").value=andOr;
	}
}