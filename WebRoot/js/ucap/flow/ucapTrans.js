var _ucapNodeDocXML;
var _ucapSendOKFN;  //按确定后执行的函数
var isMulti;
var _curwin;
function _ucapTransferOnload(){	
	_curwin = window.top.ucapFlowSys.flowWinObj||window; //流程操作的窗口对象
	isMulti=1; //单多值标志
	var requestConfig = {
		url:ucapFlowSys.sUcapSystemPath+ucapFlowSys.servlet,
		params:{"ucapid":ucapFlowSys.actionParams[11],docUnid:_curwin.ucapFlowFun.flowValue.docUnid,
			instanceUnid:_curwin.ucapFlowFun.flowValue.instanceUnid,sendType:_curwin.ucapFlowFun.flowValue.type},
		callback:function(options,success,response){
			if (success){
				//mdy by llp 2011-05-18 具体为ucapFlowXmlOnLoad->ucapTransFlowXmlOnLoad
				ucapTransFlowXmlOnLoad(response);
			} else {
				Ext.Msg.alert("提示","获取转办信息时出错！");
			}
		}
	}
	Ext.Ajax.request(requestConfig);
	if (_curwin.ucapFlowFun.flowValue.opinionNo!=""){
		$("ucapOpinion").style.display="";
		//要初始化相关意见内容
		_ucapOpinionLoad();
	}
}
/**
 * mdy by llp 2011-05-18
 * 
 * ucapFlowXmlOnLoad名称已在ucapSendFlow.js中使用，所以把此名称改为ucapTransFlowXmlOnLoad
 * 
 * @param {} response
 */
function ucapTransFlowXmlOnLoad(response){
	var result = response.responseText;
	var docs = _ucapXmlDom();
	docs.loadXML(result);
	
	_ucapNodeDocXML = docs;
	var docRoot = _ucapNodeDocXML.selectSingleNode("//doc");	
	var deptUnid = ucapGetAttributeValue(docRoot,"deptUnid");
	openTree(deptUnid);
}

//按确定后赋主表单的值
function transSendOk(){
	var tmpSendArray={
		nextNodeUnid		: "",   //下一节点的UNID
		auditType			: "",   //审批方式
		nodeTransactors 	: "",	 //节点办理人
		nodeTransactorids	: "",	//节点办理人ID
		notNodeTransactors 	: "",	 //非节点办理人
		notNodeTransactorids: "" 	//非节点办理人ID		
	}	
	var o = getSelectValues($("SingleSelResult"));
	//判断选择的用户是否在所有办理人中，或者在转办人中，如果是则返回True
	if (o.value==""){
		Ext.Msg.alert("提示信息","您必须选择一个转办人员！");
		return;
	}
	var unids=o.value.split(",");
	var names=o.text.split(",");
	var docRoot = _ucapNodeDocXML.selectSingleNode("//doc");	
	var allApprUnids = ucapGetAttributeValue(docRoot,"allApprUnids")+",";
	var transactorUnids = ucapGetAttributeValue(docRoot,"transactorUnids")+",";
	for(var i=0;i<unids.length;i++){
		if (allApprUnids.indexOf(unids[i]+",")>-1){
			Ext.Msg.alert("提示信息","“"+names[i]+"”已经在当前流程的办理人中，请重新选择！");
			return;
		}
		if (transactorUnids.indexOf(unids[i]+",")>-1){
			Ext.Msg.alert("提示信息","“"+names[i]+"”已经在当前流程的转办人中，请重新选择！");
			return;
		}
	}
	tmpSendArray.nodeTransactorids = o.value;
	tmpSendArray.nodeTransactors = o.text;
	tmpSendArray.auditType =$F("trans");
	var _ucapSendArray = new Array();
	_ucapSendArray[0]= tmpSendArray;
	if (ucapFlowFun.flowValue.opinionNo!=""){
		//调用意见的保存
		doOpinionOk();
	}
	_curwin.ucapFlowFun.sendFlowConfirm("",_ucapSendArray);
}
