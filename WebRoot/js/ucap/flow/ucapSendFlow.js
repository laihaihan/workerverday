var sSystemPath ="/"+location.pathname.split("/")[1] +"/";
var _ucapSendServlet = sSystemPath +ucapFlowSys.servlet; 
var _ucapNodeDocXML; //取过来全部出口集的XML对象
var _ucapRangeDoc;   //某个节点的范围集的XML对象
var _ucapNextFlowUnid; //下一流程的UNID
var _ucapSendArray = new Array();    //保存返回信息的数组
var _curwin;
function _ucapSendDialogOnload(){
    if(window.top.ucapFlowSys){
    	_curwin = window.top.ucapFlowSys.flowWinObj||window; //流程操作的窗口对象
    }else{
    	_curwin = window;
    }
	_ucapSendArray = new Array();	
	var sUrl= ucapFlowSys.sUcapSystemPath+ucapFlowSys.servlet;
	if (window.top.ucapOpenFlow && window.top.ucapOpenFlow.isSubFlowDialog){
		//说明是子流程，要增加 实际流程配置的UNID 实际节点的 UNID
		//mdy by cjianyan@linewell.com 当打开当前窗体，如果不是新窗口。则获取值应该直接用ucapFlowFun 而不是直接用_curwin去获取。
		
		var actFlowUnid = _curwin.ucapFlowFun.flowValue.actFlowUnid ;
		
		if(actFlowUnid != null &&	actFlowUnid != ""  &&  "undefined" != actFlowUnid){
						
			sUrl +="?actFlowUnid="+_curwin.ucapFlowFun.flowValue.actFlowUnid+"&actNodeUnid="+
				_curwin.ucapFlowFun.flowValue.actNodeUnid;
				
		}else{		
			sUrl +="?actFlowUnid="+ucapFlowFun.flowValue.actFlowUnid+"&actNodeUnid="+
				ucapFlowFun.flowValue.actNodeUnid;
		}
	}	
	var para = {"ucapid":ucapFlowSys.actionParams[3],"sendType":_curwin.ucapFlowFun.flowValue.type,
				docUnid:_curwin.ucapFlowFun.flowValue.docUnid,instanceUnid:_curwin.ucapFlowFun.flowValue.instanceUnid};
	var requestConfig = {
		url:sUrl,
		params:para,
		callback:function(options,success,response){
			if (success){
				ucapFlowXmlOnLoad(response);
			} else {
				Ext.Msg.alert("提示","获取节点列表出错！参数："+Ext.encode(para));
			}
		}
	}
	Ext.Ajax.request(requestConfig); 
	if (_curwin.ucapFlowFun.flowValue.opinionNo!=""){
		if($("ucapOpinion").style)$("ucapOpinion").style.display="";
		//要初始化相关意见内容
		_ucapOpinionLoad();
	}
}
function ucapFlowXmlOnLoad(response){
	var result = response.responseText;
	var docs = _ucapXmlDom();
	docs.loadXML(result);	
	var flag = docs.selectSingleNode("//result/flag");
		if (flag) {
			if (flag.text == "false") {
			    var msgNode = docs.selectSingleNode("//result/msg");
				Ext.Msg.alert("提示",msgNode.text);
				return;
			   }
			}
	_ucapNodeDocXML = docs;
	var docRoot = _ucapNodeDocXML.selectSingleNode("//doc");
	var branchPattern = ucapGetAttributeValue(docRoot,"branchPattern");
	$("allUnid").style.display="none";
	if (branchPattern=="1"){
		$("allUnid").style.display="";
	}
	_ucapNextFlowUnid = ucapGetAttributeValue(docRoot,"flowUnid");//保留下一步骤流程配置的UNID
	var toSms = ucapGetAttributeValue(docRoot,"toSms");
	
	if(toSms=="1"){
	    var smsMsg = ucapGetAttributeValue(docRoot,"smsMsg");
	    if(null==smsMsg)smsMsg = "";
		$("smsSend").style.display = "";
		$("smsMsg").value = smsMsg;
	}
	
	//IM信息发送
	var toIms = ucapGetAttributeValue(docRoot,"toIms");
	if(toIms=="1"){
	    var imsMsg = ucapGetAttributeValue(docRoot,"imsMsg");
	    if(null==imsMsg)imsMsg = "";
		$("imsSend").style.display = "";
		$("imMsg").value = imsMsg;
	}
	//IM信息发送
	var nodes = _ucapNodeDocXML.selectNodes("//doc/node");
	if(nodes==null || nodes.length<1){
		return;
	}
	_ucapAuditType = ucapGetAttributeValue(docRoot,"auditTypeName").split(",");
	
	var names =ucapGetAttributeValue(nodes[0],"name");
	var ids = ucapGetAttributeValue(nodes[0],"id");
	for(var i=1;i<nodes.length;i++){
		names +=","+ ucapGetAttributeValue(nodes[i],"name");
	    ids +=","+ ucapGetAttributeValue(nodes[i],"id");	
	}	
	setOptions("nextNode",ids,names);
	NextNodeChange();	
}

function getNode(id){
	var nodes = _ucapNodeDocXML.selectNodes("//doc/node");	
	for(var i=0;i<nodes.length;i++){
		if (id == ucapGetAttributeValue(nodes[i],"id")) return nodes[i];	
	}	
}

//下一步骤改变引起的变化
function NextNodeChange(){
	//下一步骤改变引起的变化时，重新设置人员的选择范围，审批方式
	removeAllItems($("SelectRange"));
	removeAllItems($("NextApproveType"));
	removeAllItems($("SingleSelRange"));
	removeAllItems($("SingleSelResult"));	 	
	$("CommonSelRange").style.display="";
	$("srcTreeDiv").style.display="none";
	
	var sNode = $F("nextNode");
	var docRoot = _ucapNodeDocXML.selectSingleNode("//doc");
	var node = getNode(sNode);	
	var nodeType = ucapGetAttributeValue(node,"nodeType");
	$("endType").value ="";
	if (nodeType =="2"){
		//说明是流程的办理结束
		//办理结束时无需显示审批方式项 modify by zhua 2010-08-23
		$("approveType").style.display="none";
		$("displayEndFlowInfo").style.display="";
		$("endFlow").style.display="none";
		$("selRang").style.display="none";
		$("endType").value ="1";
		$("endDisPlay").innerHTML="结束流程";
		return "";
	}
	var isShuntSendConvergeNode=ucapGetAttributeValue(docRoot,"isShuntSendConvergeNode");
	if (isShuntSendConvergeNode=="0"){
		//说明是分流发送下，发送给聚合节点时，不能直接发送，只能按办理结束来处理
		var convergeNodeUnid=ucapGetAttributeValue(docRoot,"convergeNodeUnid");
		if (sNode==convergeNodeUnid){
			//说明只能按办理结束来处理
			//办理结束时无需显示审批方式项 modify by zhua 2010-08-23
			$("approveType").style.display="none";
			$("displayEndFlowInfo").style.display="";
			$("endFlow").style.display="none";
			$("selRang").style.display="none";
			$("endType").value ="2";
			$("endDisPlay").innerHTML="聚合节点";
			return;
		}
	}
	$("displayEndFlowInfo").style.display="none";
	$("selRang").style.display="";
	$("endFlow").style.display="";
	var sUrl =_ucapSendServlet+"?ucapid="+ucapFlowSys.actionParams[4];	
	sUrl += "&flowUnid="+ ucapGetAttributeValue(docRoot,"flowUnid")+"&curNodeUnid="+sNode+
		"&docUnid="+_curwin.ucapFlowFun.flowValue.docUnid+"&instanceUnid="+_curwin.ucapFlowFun.flowValue.instanceUnid;
	var requestConfig = {
		url:sUrl,
		callback:function(options,success,response){
			if (success){			
				ucapSetRangeValue(response);
			} else {
				Ext.Msg.alert("提示","获取参与者范围出错！参数为："+sUrl);
			}
		}
	}
	Ext.Ajax.request(requestConfig);	
}


function ucapSetRangeValue(response){
	var result = response.responseText;	
	var docs = _ucapXmlDom();
	docs.loadXML(result);	
	var flag = docs.selectSingleNode("//result/flag");
		if (flag) {
			if (flag.text == "false") {
			    var msgNode = docs.selectSingleNode("//result/msg");
				Ext.Msg.alert("提示",msgNode.text);
				return;
			   }
			}
	_ucapRangeDoc = docs;
	var sendNode = null;
	var nodes = docs.selectSingleNode("//doc").childNodes;
		
	if (nodes.length == 0) return;
	
	if(nodes.length==1 && nodes[0].tagName=="nodedSend"){
		sendNode = nodes[0];
	}else{
		var values = ucapGetAttributeValue(nodes[0],"value");
		var texts = ucapGetAttributeValue(nodes[0],"text");
		for (var i=1;i<nodes.length;i++){
			if(nodes[i].tagName=="nodedSend"){
				sendNode = nodes[i];
				continue;
			}
			 values += "," +ucapGetAttributeValue(nodes[i],"value");
			 texts += "," + ucapGetAttributeValue(nodes[i],"text");		
		}
	
		setOptions("SelectRange",values,texts);	
		//审批方式处理	
		var node = getNode($F("nextNode"));
		var auditType = ucapGetAttributeValue(node,"auditType");
		var type = auditType.split(",");	
		values = auditType;
		texts = _ucapAuditType[type[0]];
		for (var i=1;i<type.length;i++){
			values +=","+ type[i];
			texts  +=","+ _ucapAuditType[type[i]];
		}
		setOptions("NextApproveType", values,texts);
		SelectRangeChange();
	}
	
	if(null!=sendNode){
		var sendAuditType = ucapGetAttributeValue(sendNode,"auditType");
		var sendTransactorId = ucapGetAttributeValue(sendNode,"transactorId");
		var sendTransactorText = ucapGetAttributeValue(sendNode,"transactorName");		
		
		//mdy by cjianyan@linewell.com 2011-5-9
		if(null!=sendAuditType && sendAuditType!=""){
			//setOptions("SingleSelResult", sendTransactorId,sendTransactorText);
			$("NextApproveType").value = sendAuditType;
			ApproveTypeChange();
			//目前不显示之前设置过的主办人员和阅批人员
		}
	}
	
	
}
//人员选择范围改变引起的变化    
function SelectRangeChange(){
	var rang = $F("SelectRange");
	var values="",texts="";
	$("CommonSelRange").style.display="";
	$("srcTreeDiv").style.display="none";
	
	//判断当前节点是否为发送到不是具体人员
	var node = getNode($F("nextNode"));
	if (ucapGetAttributeValue(node,"transactorType")=="1"){
		var obj =getSelectValue($("SelectRange"),","); 
		setOptions("SingleSelRange", obj.value,obj.text);
		$("SingleSelRange").selectedIndex = -1;
		ApproveTypeChange();
		return;
	}
	
	if(rang.indexOf('UCAPFLOW_')>=0 || rang=="user"){
		var role = _ucapRangeDoc.selectSingleNode("//doc/"+rang);
		values =role.selectSingleNode("value").text;
		texts = role.selectSingleNode("text").text;
		setOptions("SingleSelRange", values,texts);
		$("SingleSelRange").selectedIndex = -1;
		ApproveTypeChange();
	} else 	if(rang.indexOf('dept')>=0||rang.indexOf('DEPT')>=0){
		//说明为部门
		$("CommonSelRange").style.display="none"
		$("srcTreeDiv").style.display="";
		openTree(rang);
		ApproveTypeChange();
	}  else {
		//说明可能职位或角色
		var requestConfig = {
			url:ucapFlowSys.sUcapSystemPath+ucapFlowSys.servlet,
			params:{"ucapid":ucapFlowSys.actionParams[5],"rangeId":rang},
			callback:function(options,success,response){
				if (success){
				
					rangeChange(response);
				} else {
					Ext.Msg.alert("提示","获取流程文档时出错！参数为："+par);
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}
}

//===========================csj
 
//返回值：随机数 = 小时 + 分钟 + 秒钟
function randomString(){
	var vDate = new Date();
	return(vDate.getHours().toString() + vDate.getMinutes().toString() + vDate.getSeconds().toString());
}
function openTree(tblUnid){
	try{
		loadfile("js/ucap/flow/xtree2b/js/xtree2.js","js");
		webFXTreeConfig;
		loadfile("js/ucap/flow/xtree2b/js/xloadtree2.js","js");
		webFXLoadTreeQueue;
		 loadfile("js/ucap/flow/xtree2b/css/xtree2.css","css");
	}catch(e){
		setTimeout ('openTree("'+tblUnid+'");',1000); 
		return;
	}
 
	try{
	initSrcData($( 'srcTreeDiv' ),tblUnid);}
	catch(e){setTimeout ('openTree("'+tblUnid+'");',1000);return;}
}
function initSrcData(oSrcData,tblUnid ){
	
	var sUrl =_ucapSendServlet+"?ucapid="+ucapFlowSys.actionParams[14];
	var  peopleTree;
	if( peopleTree == null){
		peopleTree = new WebFXLoadTree( "人员选择" ,sUrl+"&unid="+tblUnid);
	}		
	webFXTreeHandler.persistenceManager.cookieName = "linewell_peopleTree"+randomString()  ;
	for (var id in webFXTreeHandler.all) {
		if( webFXTreeHandler.all[id]._checked && !webFXTreeHandler.all[id].src){
			var val = webFXTreeHandler.all[id].id;
			if( val.length ==32){				 
				webFXTreeHandler.all[id]._checked=false;					 
			} 			
		}	 
	}
	oSrcData.innerHTML = peopleTree.toHtml();
	peopleTree.expand();
	 
}
function addTreeItem( destDataSel, srcDataSel,  multiSel ){
	if( destDataSel == null ){
		return;
	}		
		for (var id in webFXTreeHandler.all) {
			if( webFXTreeHandler.all[id]._checked && !webFXTreeHandler.all[id].src){
				var val = webFXTreeHandler.all[id].id;
				if( val.length ==32 && !checkValExist( destDataSel, val ) ){
					if( multiSel == 0 ){
						destDataSel.options.length = 0;
					}
					var oOption = document.createElement( "OPTION" );
					oOption.text = webFXTreeHandler.all[id].text;
					oOption.value = val;	
					destDataSel.add( oOption );
				}//end if ( !checkValExist				
			}	//end if( webFXTreeHandler
		}
	
}
function checkValExist( oSel, val ){
	for( var i = 0; i < oSel.length; i++ ){	
		if( val == oSel.options[ i ].value ){
			return true;			
		}
	}	
	return false;
}
//===========================end csj
function rangeChange(response){
	var result = response.responseText;
	var docs = _ucapXmlDom();
	docs.loadXML(result);	
	var doc = docs;
	//doc.loadXML(result);		
	var item = doc.selectSingleNode("//doc/item");
	var values;
	var texts;
	if (item){
		values = item.selectSingleNode("value").text;
		texts = item.selectSingleNode("text").text;
	}else{
		return;
	}
	setOptions("SingleSelRange", values,texts);
	$("SingleSelRange").selectedIndex = -1;
	ApproveTypeChange();
}
//审批方式引起的改变
var isMulti =0; //单多值标志
function ApproveTypeChange(){
 
	var ApproveType =$("NextApproveType");
    if(ApproveType == null) return false;
    if(ApproveType.options.length == 0) return false;
    
    //将SingleSelRange SingleSelResult 改为多值属性
   $("SingleSelRange").multiple=true;
   $("SingleSelResult").multiple=true;
  
   isMulti = 1;
    switch(ApproveType.value) {
       case "0":       
           $("SingleSelect").style.visibility="visible";
	       $("SingleSelect").style.display="";	
	      //单审批方式为单人时，选择按钮也要出现。modify by zhua 2010-08-23
	       $("MultiSelect").style.visibility="visible";
	       $("MultiSelect").style.display="";
           
           $("MainSelect").style.visibility="hidden";
	      $("MainSelect").style.display="none";
	       $("tomove").style.display="none";
	       //将SingleSelRange 改为单值属性
           $("SingleSelRange").multiple=false;        
           $("SingleSelResult").multiple=false;
             isMulti = 0;
            //判断已选择人员是否为多值，若是则只保留一个值
            if ($("SingleSelResult").options.length > 0)
               $("SingleSelResult").options.length = 1;
            break;
       case "4":
	   	 $("tomove").style.display="none";
           $("MainSelect").style.visibility="visible";
	      $("MainSelect").style.display="";
	       $("MainSelectButton").style.visibility="visible";
	      $("MainSelectButton").style.display="";
	      $("SingleSelect").style.visibility="hidden";
	      $("SingleSelect").style.display="none";	
            break;
       default:
	   	 $("tomove").style.display="";
           $("SingleSelect").style.visibility="visible";
	      $("SingleSelect").style.display="";	       
           $("MultiSelect").style.visibility="visible";
	      $("MultiSelect").style.display="";	
           $("MainSelect").style.visibility="hidden";
	      $("MainSelect").style.display="none";	
           break;
    };
    //如果为部门
    var rang = $F("SelectRange");
    if(rang.indexOf('_DEPT')>=0){
   
      var multiSelectdisType = $("MultiSelect").style.display;
      var mainSelectddisType = $("MainSelectButton").style.display;
 
		if (multiSelectdisType =="") 
		 {
              $("MultiSelect").style.display="none";
               $("deptMultiSelect").style.display="";
              $("deptMultiSelect").style.visibility="visible";
   		 } else if(mainSelectddisType ==""){
               $("MainSelectButton").style.display="none";
               $("deptMainSelectButton").style.display="";
              $("deptMainSelectButton").style.visibility="visible";
   		 }
    }else {
	     $("deptMultiSelect").style.display="none";
		$("deptMainSelectButton").style.display="none";
    		}
     
    //设置已选择人员的默认值
    if($("SingleSelRange").options.length == 1){
       //待选择范围为单人
       var sText =$("SingleSelRange").options[0].text;
       var sValue=$("SingleSelRange").options[0].value;
       if(ApproveType.options[ApproveType.selectedIndex].text == "主办从办"){
          if($("ApprSelResult").options.length == 0)
           $("ApprSelResult").options[0]=new Option(sText,sValue);
       } else
       {
         // if($("SingleSelResult").options.length == 0)
           $("SingleSelResult").options[0]=new Option(sText,sValue);      
       }
    }           
}

function iptSmsSendClk(obj){
	if(obj.checked){
		$("smsMsgShow").style.display = "";
	}else{
		$("smsMsgShow").style.display = "none";
	}
}

//是否短信提示的复选框
function smsSendMsgShow(obj){
	var smsMsg = $("smsMsg").value;
	Ext.MessageBox.show({
           title: '短信内容',
           width:300,
           buttons: Ext.MessageBox.OKCANCEL,
           multiline: true,
           value:smsMsg,
           fn: setMessage,
           animEl: 'mb3'
    });
}

function setMessage(btn, text){
	if(null!=text && text.trim()!=""){
		$("smsMsg").value = text;
	}
}

//IM信息发送  start
function imSend(obj){
	if(obj.checked){
		$("imMsgShow").style.display = "";
	}else{
		$("imMsgShow").style.display = "none";
	}
}

//是否IM提示的复选框
function imMsgShow(obj){
	var imMsg = $("imMsg").value;
	Ext.MessageBox.show({
           title: 'IM信息内容',
           width:300,
           buttons: Ext.MessageBox.OKCANCEL,
           multiline: true,
           value:imMsg,
           fn: setIMMessage,
           animEl: 'mb3'
    });
}

function setIMMessage(btn, text){
	if(null!=text && text.trim()!=""){
		$("imMsg").value = text;
	}
}
//IM信息发送  end

function SingleSelRangeDBClick(obj){
	 if ($F("NextApproveType")!="4") {
	  if(obj.selectedIndex>-1){
     		$("toRightBtnA").click();
	    }
	}
}
Array.prototype.uniq = function(){
    var tmp    = new Array;
    var length = this.length;

    for(var i = 0; i < length; i++) {
        var push = true;
        var item = this[i];

        for(var j = i + 1; j < length; j++) {
            if(this[j] == item) {
                push = false;
            }
        }

        if(push == true) {
            tmp.push(item)
        }
    }

    return tmp;
}
function getSelValue(){
	var tmpucapFlowReturn={
		nextNodeUnid		: "",   //下一节点的UNID
		auditType			: "",   //审批方式
		nodeTransactors 	: "",	 //节点办理人
		nodeTransactorids	: "",	//节点办理人ID
		notNodeTransactors 	: "",	 //非节点办理人
		notNodeTransactorids: "", 	//非节点办理人ID
		smsMsg:"",                  //发送短信内容
		imsMsg:""					//发送IM信息
	}	
	tmpucapFlowReturn.nextNodeUnid="";
	tmpucapFlowReturn.auditType="";
	tmpucapFlowReturn.nodeTransactors="";
	tmpucapFlowReturn.nodeTransactorids="";
	tmpucapFlowReturn.notNodeTransactors="";
	tmpucapFlowReturn.notNodeTransactorids="";	
	var o = getSelectValue("nextNode");
	tmpucapFlowReturn.nextNodeUnid = o.value;	
	if ($("NextApproveType").length==0){
	     Ext.Msg.alert("提示信息","审批方式不能为空");
	     return false;
	 }
	var sApproveType=$F("NextApproveType");
	var smsMsg = "";
	if($("iptSmsSend").checked){
		smsMsg = $("smsMsg").value;
	}
	if(null==smsMsg || smsMsg=="null")smsMsg = "";
	tmpucapFlowReturn.smsMsg = smsMsg;
	
	//IM
	var imsMessage = "";
	if($("imSend").checked){
		imsMessage = $("imMsg").value;
	}
	if(null==imsMessage || imsMessage=="null")imsMessage = "";
	tmpucapFlowReturn.imsMsg = imsMessage;
	//IM
	
	//赋下一步骤和下一审批方式
	tmpucapFlowReturn.auditType = sApproveType;
	 if( sApproveType!="4"){
	    if($("SingleSelResult").options.length==0 ){
	      	 Ext.Msg.alert("提示信息","对不起，您至少必须选择一个人员");         
	  		 return false;
	    }
	    //赋审批方式为“单人、多人并行、多人顺序、多人单审”时的值
		var obj =getSelectValues($("SingleSelResult"),","); 
		tmpucapFlowReturn.nodeTransactors = obj.text //节点办理人
		tmpucapFlowReturn.nodeTransactorids = obj.value	//节点办理人ID
	 }
	  else {
	    if($("ApprSelResult").options.length==0){
	      	 Ext.Msg.alert("提示信息","对不起，您至少必须选择一个主办人员");
	  		 return false;
	    }    
	    //赋审批方式为“主办从办”时的值   
	 	var obj =getSelectValues($("ApprSelResult"),",");    
	    tmpucapFlowReturn.nodeTransactors = obj.text //节点办理人
		tmpucapFlowReturn.nodeTransactorids = obj.value	//节点办理人ID
	 	var obj =getSelectValues($("CoApprSelResult"),",");    
	    tmpucapFlowReturn.notNodeTransactors = obj.text //非节点办理人
		tmpucapFlowReturn.notNodeTransactorids = obj.value	//非节点办理人ID
	 //判断是否有重复的值存在
		 var v = tmpucapFlowReturn.nodeTransactorids+","+ tmpucapFlowReturn.notNodeTransactorids;
		 var av =v.split(",").uniq();
		 var ab =v.split(",");
		 if (av.length!=ab.length){
		 	Ext.Msg.alert("提示信息","主办和阅批中不能有相同的人员！");
			return false;
	 	}
	 }
	 return tmpucapFlowReturn;
}

//按确定后赋主表单的值
function ucapFlowSendOk(){
	if ($("endFlow").style.display=="none"){
		//说明是办理结束		
		var tmpReturn={
			nextNodeUnid		: "",   //下一节点的UNID
			auditType			: ""   //审批方式，流程结束，审批方式默认为空
		}		
		tmpReturn.nextNodeUnid = $F("nextNode");
		//判断当前是否有 fatherFlowUnid 的值，如果有，则说明是子流程中直接返回到主流程
		var docRoot = _ucapNodeDocXML.selectSingleNode("//doc");
		if ($F("endType")=="1"){
			//说明是发送给 流程结束 节点
			_ucapSendArray[0]= 	tmpReturn;
			var fatherFlowUnid = ucapGetAttributeValue(docRoot,"fatherFlowUnid");
			var fatherNodeUnid = ucapGetAttributeValue(docRoot,"fatherNodeUnid");
			if (fatherFlowUnid!="" && fatherNodeUnid!=""){
				ucapFlowFun.subFlowSendMainFlow(fatherFlowUnid,fatherNodeUnid,tmpReturn.nextNodeUnid);
				return;
			}		
		} else if ($F("endType")=="2"){
			//说明是发送给聚合节点
			tmpReturn.auditType ="8888";  //用来标志是发送给聚合节点
			_ucapSendArray[0]= 	tmpReturn;
		}
	} else {
		var disType = $("allUnid").style.display;
		var getFlag = false;
		if (disType =="none" || _ucapSendArray.length==0) getFlag = true;
		if (getFlag){
			var tmp = getSelValue();
			if (tmp) {
				_ucapSendArray[_ucapSendArray.length] = tmp;
			} else 
			   return;
		} 
	}
	if (_curwin.ucapFlowFun.flowValue.opinionNo!=""){
		//调用意见的保存
		doOpinionOk();
	}
	//mdy by cjianyan@linewell.com 当打开当前窗体，如果不是新窗口。则获取值应该直接用ucapFlowFun 而不是直接用_curwin去获取。
	
	var endFlowUnid=_curwin.ucapFlowFun.flowValue.endFlowUnid;
	
	if(endFlowUnid != null &&	endFlowUnid != ""  &&  "undefined" != endFlowUnid){		
		_curwin.ucapFlowFun.sendFlowConfirm(_ucapNextFlowUnid,_ucapSendArray,_curwin.ucapFlowFun.flowValue.endFlowUnid);
	}else{
		_curwin.ucapFlowFun.sendFlowConfirm(_ucapNextFlowUnid,_ucapSendArray,ucapFlowFun.flowValue.endFlowUnid);
	}
}
//移除指定下标的数组元素
function delFromArray(obj){
	var ipos = obj.selectedIndex;
	if (ipos==-1) return;
	if (_ucapSendArray.length==0) return;
	_ucapSendArray.splice(ipos,1);
}
//分流节点函数 增加节点到指定的列表
function addUnidItem(oSel){	
	var tmp = getSelValue();
	if (tmp){
		addItem(oSel,$("nextNode"),1,1);
		//把当前选中的值，增加到数组中
		_ucapSendArray[_ucapSendArray.length] = tmp;			
	}
}
//选中的节点列表发生变时，要设置 下一节点，审批方式，
function changeUnidItem(){	
	var ipos = $("SelectAllUnid").selectedIndex;
	if (ipos<0) return ;
	SetOptionsValue("nextNode",$F("SelectAllUnid"));
	NextNodeChange();
//	alert(_ucapSendArray[ipos].auditType);
	SetOptionsValue("NextApproveType",_ucapSendArray[ipos].auditType);
	ApproveTypeChange();
	//设置办理人
	var sApproveType=$F("NextApproveType");
	
	if( sApproveType!="4"){
	 	setOptions("SingleSelResult",_ucapSendArray[ipos].nodeTransactorids,
	 		_ucapSendArray[ipos].nodeTransactors);
	} else {
		//说明是主办阅
		setOptions("ApprSelResult",_ucapSendArray[ipos].nodeTransactorids,
			_ucapSendArray[ipos].nodeTransactors);
	 	setOptions("CoApprSelResult",_ucapSendArray[ipos].notNodeTransactorids,
	 		_ucapSendArray[ipos].notNodeTransactors);		
	}
}
//查询
function _doQuery(nodeUnid,queryText){	
// if(queryText==null||queryText==""){
//		return; 
// }
	var sUrl =_ucapSendServlet+"?ucapid="+ucapFlowSys.actionParams[18];	
	sUrl += "&flowUnid="+"&curNodeUnid="+nodeUnid+
		"&docUnid="+_curwin.ucapFlowFun.flowValue.docUnid+"&instanceUnid="+_curwin.ucapFlowFun.flowValue.instanceUnid+"&queryText="+encodeURIComponent(encodeURIComponent(queryText));//queryText;
	var requestConfig = {
		url:sUrl,
		callback:function(options,success,response){
			if (success){
						var result = response.responseText;
						if(result.indexOf("false")==-1){
						  var docs = _ucapXmlDom();
						docs.loadXML(result);
						var docRoot = docs.selectSingleNode("//doc");
						 setOptions("SingleSelRange",docRoot.selectSingleNode("value").text,docRoot.selectSingleNode("text").text);
	                 	     $("CommonSelRange").style.display="";
	                 		 $("srcTreeDiv").style.display="none";
					}
			} else {
				Ext.Msg.alert("提示","获取参与者范围出错！参数为："+sUrl);
			}
		}
	}
	Ext.Ajax.request(requestConfig);	
 
}



