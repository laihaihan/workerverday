var xdoc;
var itype;
var FillFlag;
var CombineFlag;
var _ucapOpinionDocXml;  //意见对象
var iNo;                //意见类型
var opinionName;        //意见名称
var docUnid;            //文档unid
var instanceUnid;       //实例标识
var opinionTime="";     //意见时间
var opinionContent;     //意见内容
var state="";           //意见状态 
var userId;             //用户标识
var unid="";            //意见标识
var _opinionConfirmFn;  //按确定后要执行的函数
var _opinionConfirmFnPar;//按确定后要执行的函数的参数
var _curwin;
//文档加载时实现的对象
function _ucapOpinionLoad(docId,instanceId){	
	if (_curwin==null) _curwin = window.top.ucapFlowSys.flowWinObj||window;
	iNo = _curwin._ucapOpinionValue.type;
	opinionName = _curwin._ucapOpinionValue.name;	
	docUnid =  _curwin.ucapFlowFun.flowValue.docUnid;
	if(typeof(docId) != "undefined"){
	    docUnid=docId;
	}
	instanceUnid = _curwin.ucapFlowFun.flowValue.instanceUnid;
	if(typeof(instanceId) != "undefined"){
	    instanceUnid=instanceId;
	}
	var requestConfig = {
		url:ucapFlowSys.sUcapSystemPath+ucapFlowSys.servlet,
		params:{"ucapid":"opinionInfo","docUnid":docUnid,
			"instanceUnid":instanceUnid,opinionType:iNo},
		callback:function(options,success,response){
			if (success){
				_ucapOpinionXmlOnLoad(response);
				itype =1;
				initDoc();
			} else {
				Ext.Msg.alert("提示","获取意见时出错！");
			}
		}
	}
	Ext.Ajax.request(requestConfig);
}

//获取到意见相关的xml后的信息处理
//originalRequest从后台返回的request对象
function _ucapOpinionXmlOnLoad(response){
	//$("OpinionList").style.height = "300px";
	//$("Opinion").style.posHeight = 300;
	//alert("ok");
	var result = response.responseText;	
	var _ucapOpinionDocXml = _ucapXmlDom();
	_ucapOpinionDocXml.loadXML(result);	
	
	var docRoot = _ucapOpinionDocXml.selectSingleNode("//doc");
	var isDisplay = ucapGetAttributeValue(docRoot,"isReplacer");
	userId = ucapGetAttributeValue(docRoot,"userid");
	var sendType = ucapGetAttributeValue(docRoot,"sendType");
	var completeType = ucapGetAttributeValue(docRoot,"completeType");
	if (sendType!="" && typeof(_opinionConfirmFn)=="undefined" ){
		_opinionConfirmFn = ucapFlowFun.sendFlow;
		_opinionConfirmFnPar = sendType; 
	}
	if (completeType!="" && typeof(_opinionConfirmFn)=="undefined" ){
		_opinionConfirmFn =ucapFlowFun.completeFlow;
		_opinionConfirmFnPar = completeType; 
	}
//	//鉴于应用部门对于“代理时间”，此功能的应用较少，先隐藏这功能  by@cgc 2011-9-7
//	if(isDisplay=="true"){
//		document.getElementById("proxytr").style.display="";
//	}
	var opinionElement = docRoot.selectSingleNode("opinion");
	if (opinionElement==null) return;
	if(opinionElement){
		state = ucapGetAttributeValue(opinionElement,"state");
		unid =  ucapGetAttributeValue(opinionElement,"unid");
		opinionContent = opinionElement.text;
		if(opinionContent!="undefined"){
			opinionContent = opinionContent.replace("<![CDATA[","").replace("]]>","");
		}
		$("opinionTextarea").innerText = opinionContent;
	}
}

function getNewXmlDoc(){
	var xmlDoc = _ucapXmlDom();
	var head = xmlDoc.createProcessingInstruction("xml","version='1.0' encoding='GBK'");	
	xmlDoc.appendChild(head);
	var root = xmlDoc.createElement("doc");
	xmlDoc.appendChild(root);
	var table = xmlDoc.createElement("table");
	root.appendChild(table);
	return xmlDoc;
}
function initDoc(){	
	var requestConfig = {
		url:ucapFlowSys.sUcapSystemPath+ucapFlowSys.servlet,
		params:{"ucapid":"readOpinion",userId:userId},
		callback:function(options,success,response){
			if (success){	
				
				var result = response.responseText;	
				xdoc = _ucapXmlDom();
				xdoc.loadXML(result);	
				//初始化相关的信息
				
				if (itype==1) {							
					opType(0);
					initOpnContent();
				}
			} else {
				Ext.Msg.alert("提示","判断当前用户是否有发送权限时出错！");
			}
		}
	}
	Ext.Ajax.request(requestConfig);
}

function opType(type){
	$("OpinionType0").checked=false;
	$("OpinionType1").checked=false;
	$("OpinionType2").checked=false;	
	$("OpinionType"+type).checked=true;
	
	FillFlag=type;
	CombineFlag = 0;	
	setOpinionSel();
}
function initOpnContent(){
	if (xdoc==null) return;
	if ($F("Opinion").trim()!="") return;
	var recordopn = xdoc.selectSingleNode("//recordopn");
	if (recordopn==null) return;
	if (recordopn) {
		$("Opinion").value = recordopn.text;
		opinionTime =getAttributeValue(recordopn,"opinionTime");
	}
}
function initUser(){
	if (xdoc==null) return;
	var op =$("OpinionList");
	removeAllItems(op);
	var user = xdoc.selectSingleNode("//user");
	if (user ==null) return;
	var items = user.childNodes;	
	for (var i=0 ;i<items.length;i++){
		var unid = items[i].getAttribute("unid");
		addOption(op, unid,items[i].text );
	}
}
function initPub(){
	if (xdoc==null) return;
	var pub = xdoc.selectSingleNode("//pub");
	if (pub ==null) return;
	var pubopn = pub.selectSingleNode("pubopinion");
	setOpinionOptions("OpinionList",pubopn.text,pubopn.text,";");
}
function initMood(){
	if (xdoc==null) return;
	var pub = xdoc.selectSingleNode("//pub");
	if (pub ==null) return;
	var mood = pub.selectSingleNode("mood");
	setOpinionOptions("OpinionList",mood.text,mood.text,";");
}
function initAction(){
	if (xdoc==null) return;
	var pub = xdoc.selectSingleNode("//pub");
	if (pub ==null) return;
	var action = pub.selectSingleNode("action");
	setOpinionOptions("OpinionList",action.text,action.text,";");
}
function initMode(){
	if (xdoc==null) return;
	var pub = xdoc.selectSingleNode("//pub");
	if (pub ==null) return;
	var mode = pub.selectSingleNode("mode");
	setOpinionOptions("OpinionList",mode.text,mode.text,";");
}

function setOpinionOptions(fieldname,values,texts,sep){
	removeAllItems($(fieldname));
	var vt =values.split(sep);
	var vv =texts.split(sep);
	for (var i=0;i<vt.length;i++)
		addOption($(fieldname), vv[i],vt[i] );
	$(fieldname).selectedIndex = 0;
}
function setOpinionSel(){
     $("deleOpinion").style.visibility = "hidden";
     $("btnReturn").style.visibility = "hidden";
	if (FillFlag==2)
	{
	     if(CombineFlag==0)
		{
			initMood();
		}else{
			$("btnReturn").style.visibility = "visible";
		
			if(CombineFlag==1)
			{
				initAction();
			}else
			{
				initMode();
			}
		}
	}else
	{
		if(FillFlag==0)
		{
		    $("deleOpinion").style.visibility="visible";
		    $("deleOpinion").style.display = "";
			initUser();
		}else
		{
			initPub();
		}
	}
}
function Add(){
	if($("OpinionList").selectedIndex != -1)
	{
		var sep="";
		for (var i=0; i < $("OpinionList").options.length; i++){
		if ($("OpinionList").options[i].selected){	
		       $("Opinion").value = $F("Opinion") + sep + $("OpinionList").options[i].text;
				if(CombineFlag!=0) { sep="、";};
			}
		}
	}
}
function addClick(){
	Add();
	if(FillFlag==2)
	{
		if(CombineFlag <= 1)
		{
			CombineFlag=CombineFlag+1;
		}
	}
	setOpinionSel();
}


function returnOpn(){
	if(FillFlag==2)
	{
		if(CombineFlag=1)
		{
			CombineFlag=CombineFlag-1;
		}
		setOpinionSel();
	}
}

//删除我的意见
function deleUserOpn(){
	if(FillFlag!=0 || $("OpinionList").selectedIndex == -1) {
		alert("请先选择要删除的个人意见！");
		return;
	}
	var requestConfig = {
		url:ucapFlowSys.sUcapSystemPath+ucapFlowSys.servlet,
		params:{"ucapid":"delOpinion",userId:userId,
				opinionId:$F("OpinionList")},
		callback:function(options,success,response){
			if (success){
				itype =1;
				initDoc();
				//Ext.Msg.alert("提示信息","删除意见成功！")
			} else {
				Ext.Msg.alert("提示","删除意见时出错！");
			}
		}
	}
	Ext.Ajax.request(requestConfig);	
	
}

//添加我的意见
function addUserOpn(){
	if(document.getElementById("opinionTextarea").innerText==""){
		Ext.Msg.alert("提示信息","请选择或输入意见内容！");
		return;
	}
	//构造xml
	var xmlDoc = _ucapXmlDom();
	var head = xmlDoc.createProcessingInstruction("xml","version='1.0' encoding='GBK'");
	xmlDoc.appendChild(head);
	var root = xmlDoc.createElement("doc");
	xmlDoc.appendChild(root);
	var opn = xmlDoc.createElement("opinion");
	root.appendChild(opn);
	opn.text="<![CDATA["+document.getElementById("opinionTextarea").innerText+"]]>";
	
	var requestConfig = {
		url:ucapFlowSys.sUcapSystemPath+ucapFlowSys.servlet,
		params:{"ucapid":"addOpinion",userId:userId},
		xmlData:xmlDoc,
		callback:function(options,success,response){
			if (success){
				itype =1;
				initDoc();
				//Ext.Msg.alert("提示信息","增加为个人意见成功！")
			} else {
				Ext.Msg.alert("提示","意见增加时出错！");
			}
		}
	}
	Ext.Ajax.request(requestConfig);	
	
}


function GetRadioValue(field){
	for(var i=0;i<field.length;i++)
	{
	 if(field[i].checked)
		{
		return field[i].value;}
	 }
	 return null;
}

//按确定后赋主表单的值
//type如果有值，则不提示意见保存成功
function doOpinionOk(_ucapNextFlowUnid,_ucapSendArray,opinionConfirmFn){ 
	if (typeof _ucapNextFlowUnid=="undefined") _ucapNextFlowUnid="";
	//if (_curwin==null) _curwin = window.top.ucapFlowSys.flowWinObj||window;
	_curwin = window.top.ucapFlowSys.flowWinObj||window;
	if(document.getElementById("opinionTextarea").innerText==""){
		Ext.Msg.alert("提示信息","请选择或输入意见内容！");
		//mdy by llp 2012-4-12，返回为false，以便调用的地方进行判断。   原来为：return;
		return false;
	}
   	var xmlDoc = getNewXmlDoc();
	var table = xmlDoc.selectSingleNode("//table");
	addAttrib(table,"docunid",docUnid);
	addAttrib(table,"nowappr",userId);
	addAttrib(table,"instanceUnid",instanceUnid);
	
	var root = xmlDoc.selectSingleNode("//doc");
	var opinion = xmlDoc.createElement("opinion");
	root.appendChild(opinion);
	
	addAttrib(opinion,"unid",unid);
	addAttrib(opinion,"name",opinionName);
	addAttrib(opinion,"type",iNo);
	addAttrib(opinion,"state",state);
	addAttrib(opinion,"agentTime",document.all("proxyTime").value);
	opinion.text="<![CDATA["+document.getElementById("opinionTextarea").innerText+"]]>";
	var requestConfig = {
		url:ucapFlowSys.sUcapSystemPath+ucapFlowSys.servlet,
		params:{"ucapid":ucapFlowSys.actionParams[13]},
		xmlData:xmlDoc,
		callback:function(options,success,response){
			if (success){
				ucapOpinionSaveAfer(response,_ucapNextFlowUnid,_ucapSendArray,docUnid,opinionConfirmFn);
			} else {
				Ext.Msg.alert("提示","保存意见时出错！");
			}
		}
	}
	Ext.Ajax.request(requestConfig);	
	//add by llp 2012-04-12,增加返回值，以便调用的地方进行判断
	return true;
}

function ucapOpinionSaveAfer(response,_ucapNextFlowUnid,_ucapSendArray,docUnid,opinionConfirmFn){
	var result = response.responseText;	
	var docs = _ucapXmlDom();
	docs.loadXML(result);	
	var flag = docs.selectSingleNode("//result/flag");
	if (flag){
		if (flag.text=="false"){
			var msgNode = docs.selectSingleNode("//result/msg");
	  		Ext.Msg.alert("提示信息",msgNode.text);
	  		return;
		} else {
		if(typeof(opinionConfirmFn)!="undefined"){
		_opinionConfirmFn=opinionConfirmFn;
		}
			if(_curwin._ucapOpinionValue.sendType=="1" && typeof(_opinionConfirmFn)!="undefined"){//如果为直接发送
				try{
					_opinionConfirmFn.call(this,_opinionConfirmFnPar);
				}catch(e){
					Ext.Msg.alert("提示信息","保存意见成功！");
				}
			} else if (_curwin._ucapOpinionValue.sendType=="2" || _curwin._ucapOpinionValue.sendType=="3") {
				//说明是在发送中设置意见
			} else if (_curwin._ucapOpinionValue.completeType!=""){
				//说明是办理结束中调用，则要重新调用,mdy by llp 07-16 原来为：ucapFlowFun.completeFlow(
				if(_curwin){
					_curwin.ucapFlowFun.completeFlow(_curwin._ucapOpinionValue.completeType,"-99","","",docUnid,instanceUnid);
				}else{
					ucapFlowFun.completeFlow(_curwin._ucapOpinionValue.completeType,"-99","","",docUnid,instanceUnid);
				}
			}else if(_ucapNextFlowUnid!=""){
				ucapFlowFun.sendFlowConfirm(_ucapNextFlowUnid, _ucapSendArray,
 											"");
			}
			else {
				Ext.Msg.alert("提示信息","保存意见成功！");
			}
		}
	} else {
		Ext.Msg.alert("提示信息","意见保存出错！");
	}	
}