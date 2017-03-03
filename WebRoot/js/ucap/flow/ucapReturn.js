var userNames = new Array();
var userIds = new Array;
var _ucapNextFlowUnid;
var _ucapNodeDocXML;
var _curwin;
function returnDialogOnload(){	
	if(window.top.ucapFlowSys){
    	_curwin = window.top.ucapFlowSys.flowWinObj||window; //流程操作的窗口对象
    }else{
    	_curwin = window;
    }
	var para = {"ucapid":ucapFlowSys.actionParams[9],"sendType":_curwin.ucapFlowFun.flowValue.type,
				docUnid:_curwin.ucapFlowFun.flowValue.docUnid,instanceUnid:_curwin.ucapFlowFun.flowValue.instanceUnid};
	var requestConfig = {
		url:ucapFlowSys.sUcapSystemPath+ucapFlowSys.servlet,
		params:para,
		callback:function(options,success,response){
			if (success){
			
				ucapReturnXmlOnLoad(response);
			} else {
				Ext.Msg.alert("提示","获取办理过的节点列表不成功");
			}
		}
	}
	Ext.Ajax.request(requestConfig);
		  
	if (_curwin.ucapFlowFun.flowValue.opinionNo!=""){
		//_ucapOpinionValue.name = "退回意见";
		_ucapOpinionValue.type = "98";
		_ucapOpinionValue.sendType = "2"
		$("ucapOpinion").style.display="";
		//要初始化相关意见内容
		_ucapOpinionLoad();
	}
}
function ucapReturnXmlOnLoad(response){
	var result = response.responseText;
	var docs = _ucapXmlDom();
	docs.loadXML(result);
	_ucapNodeDocXML = docs;
	var docRoot = _ucapNodeDocXML.selectSingleNode("//doc");
	_ucapNextFlowUnid = ucapGetAttributeValue(docRoot,"flowUnid");//保留下一步骤流程配置的UNID
	var node = _ucapNodeDocXML.selectSingleNode("//doc/node");
	if(node == null ){
		return;
	}
	var names =ucapGetAttributeValue(node,"name");
	var ids = ucapGetAttributeValue(node,"id");
	setOptions("SingleSelRange",ids,names);
	$("SingleSelRange").selectedIndex = 0;
	var userNode =  _ucapNodeDocXML.selectSingleNode("//doc/user");
	userNames = ucapGetAttributeValue(userNode,"name").split(",");
	userIds = ucapGetAttributeValue(userNode,"id").split(",");	
	changeUnidItem();	
}
//选中的节点列表发生变时，要重新设置人员，
function changeUnidItem(){	
	var ipos = $("SingleSelRange").selectedIndex;
	if (ipos<0) return ;
	setOptions("SingleSelResult",userIds[ipos],userNames[ipos]);
}
//按确定后赋主表单的值
function returnSendOk(){
	var tmpucapFlowReturn={
		nextNodeUnid		: "",   //下一节点的UNID
		auditType			: "",   //审批方式
		nodeTransactors 	: "",	 //节点办理人
		nodeTransactorids	: "",	//节点办理人ID
		notNodeTransactors 	: "",	 //非节点办理人
		notNodeTransactorids: "" 	//非节点办理人ID
	}	
	var obj =getSelectValues($("SingleSelResult"),","); 
	tmpucapFlowReturn.nodeTransactors = obj.text //节点办理人
	tmpucapFlowReturn.nodeTransactorids = obj.value	//节点办理人ID
	tmpucapFlowReturn.nextNodeUnid=$F("SingleSelRange");
	tmpucapFlowReturn.auditType="0";
	var _ucapSendArray = new Array();
	_ucapSendArray[0]= tmpucapFlowReturn;
	if (_curwin.ucapFlowFun.flowValue.opinionNo!=""){
		//调用意见的保存
		//mdy by llp 2012-04-12,增加返回值判断，如果返回为false，则不继续继续提交，如果为true才继续
		var result = doOpinionOk();
		if(!result)return;
	}
	_curwin.ucapFlowFun.sendFlowConfirm(_ucapNextFlowUnid,_ucapSendArray);
}
function checkValExist( oSel, val ){
	for( var i = 0; i < oSel.length; i++ ){	
		if( val == oSel.options[ i ].value ){
			return true;			
		}
	}	
	return false;
}
function SingleSelRangeDBClick(obj){
  if(obj.selectedIndex>-1){
    		$("toRightBtnA").click();
    }
}
 