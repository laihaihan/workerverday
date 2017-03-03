// ucap流程函数
/**
 * yjy 2008-5-17更新成div方式，并采用extjs的处理方法
 * 
 * @type
 */

var ucapFlowSys = {
	sUcapSystemPath : "/" + location.pathname.split("/")[1] + "/",
	/**
	 * 流程的提交的servelet
	 * 
	 * @type String
	 */
	servlet : "WorkFlowServlet",
	commSelect : "js/ucap/flow/commonSelect.jsp",
	sendJsp : "js/ucap/flow/ucapFlowSend.jsp",
	sendReadOnlyJsp : "js/ucap/flow/ucapFlowSendReadOnly.jsp",
	returnJsp : "js/ucap/flow/ucapFlowReturn.jsp",
	transferJsp : "js/ucap/flow/ucapFlowTransfer.jsp",
	opinionJsp : "js/ucap/flow/OpinionDialog.jsp",
	actionParams : ["getFlowList", "getNodeList", "flowjsp", "getSendFlowInfo",
			"getParticipants", "getUnidsByRolePos", "getSubFlowInfo",
			"sendFlow", "completeFlow", "getReturnFlowInfo", "returnFlow",
			"getTransferInfo", "oldFlowJsp", "OpinionSave", "ucapXtree",
			"getFlowListByIds", "getFlowJspByTodoUnid", "getDefaultType",
			"getParticipantsByFilter"],
	split_str : "!@#",// 多值分隔符
	openFlowDocFun : "", // 新建流程或打开流程文档的外部函数
	openFlowDocFunParams : "",// 对应的参数
	sendWin : null,
	flowWinObj:null,  //执行流程的实际窗口
	par : "",
	/**
	 * 普通选择框的值
	 * 
	 * @type
	 */
	selectDialogParam : {
		title : "",// 标题
		info : "",// 提示信息
		values : "",// 多值
		texts : "", // 多值
		callBack : null
		// 回调函数，默认参数为选中的值的对象
	},
	sendFlowDialogRead : {
		nextApproveType : "",// 审批方式
		nextNode : "",// 节点名称
		values : ""// 人员名称
	}
}
/**
 * 流程打开对话框
 * 
 * @type
 */
var ucapOpenFlow = {
	isSubFlowDialog : false, // 是否为子流程发送框的标志
	/**
	 * 发送对话框的返回值
	 * 
	 * @type
	 */
	flowReturn : {
		nextNodeUnid : "", // 下一节点的UNID
		auditType : "", // 审批方式
		nodeTransactors : "", // 节点办理人
		nodeTransactorids : "", // 节点办理人ID
		notNodeTransactors : "", // 非节点办理人
		notNodeTransactorids : "" // 非节点办理人ID
	},
	/**
	 * 弹出所有的当前用户可创建的流程
	 * 
	 * @param {function}
	 *            openCallBack回调函数 默认参数为URL
	 * @param {object}
	 *            openCallBackParam，外面调用时的参数
	 */
	openFlowDialog : function(openCallBack, openCallBackParam) {
		window.top.ucapFlowSys.flowWinObj = window;
		var winobj = window.top;
		this.isSubFlowDialog = false;
		if (typeof openCallBack != "undefined") {
			if (typeof openCallBack != "function") {
				winobj.Ext.Msg.alert("提示信息", "回调函数只能是函数，不能是字段串(默认参数为新建流程文档的URL)");
				return;
			}
		}
		winobj.ucapFlowSys.openFlowDocFun = openCallBack;
		winobj.ucapFlowSys.openFlowDocFunParams = openCallBackParam;
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : {
				"ucapid" : ucapFlowSys.actionParams[0]
			},
			callback : function(options, success, response) {
				if (success) {
					ucapOpenFlow._flowBox(response);
				} else {
					winobj.Ext.Msg.alert("提示", "获取流程列表不成功");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 外部可传流程配置的ID进行新建流程对话框 flowIds为流程配置的所有ID列表以“,”分隔
	 * 
	 * @param {}
	 *            flowIds
	 * @param {}
	 *            openCallBackParam，外面调用时的参数
	 * @param {}
	 *            openCallBack
	 */
	openFlowDialogByFlowIds : function(flowIds, openCallBack, openCallBackParam) {
		//保证能取到实际的文档的相关对象
		window.top.ucapFlowSys.flowWinObj = window;
		var winobj = window.top;
		this.isSubFlowDialog = false;
		if (typeof openCallBack != "undefined") {
			if (typeof openCallBack != "function") {
				winobj.Ext.Msg.alert("提示信息", "回调函数只能是函数，不能是字段串(默认参数为新建流程文档的URL)");
				return;
			}
		}
		winobj.ucapFlowSys.openFlowDocFun = openCallBack;
		winobj.ucapFlowSys.openFlowDocFunParams = openCallBackParam;
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : {
				"ucapid" : ucapFlowSys.actionParams[15],
				"flowIds" : flowIds
			},
			callback : function(options, success, response) {
				if (success) {
					ucapOpenFlow._flowBox(response);
				} else {
					winobj.Ext.Msg.alert("提示", "获取流程列表不成功");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 获取流程列表后执行的方法
	 * 
	 * @param {}
	 *            response
	 * @subFlow 有值说明是子流程调用 private 不能在外部调用
	 */
	_flowBox : function(response) {
		var result = response.responseText;
		var docs = _ucapXmlDom();
		var winobj =window.top;
		docs.loadXML(result);
		var flag = docs.selectSingleNode("//result/flag");
		if (flag) {
			if (flag.text == "false") {
				var msgNode = docs.selectSingleNode("//result/msg");
				winobj.Ext.Msg.alert(msgNode.text);
				return;
			}
		}
		var flow = docs.selectNodes("//flow");
		winobj.ucapFlowSys.selectDialogParam.values = flow[0].getAttribute("id");
		winobj.ucapFlowSys.selectDialogParam.texts = flow[0].getAttribute("name");
		winobj.ucapFlowSys.selectDialogParam.title = "新建流程对话框";
		winobj.ucapFlowSys.selectDialogParam.info = "请选择一个流程";
		winobj.ucapFlowSys.selectDialogParam.callBack = ucapOpenFlow.openFlowByFlowUnid;
		for (var i = 1; i < flow.length; i++) {
			winobj.ucapFlowSys.selectDialogParam.values += ucapFlowSys.split_str
					+ flow[i].getAttribute("id");
			winobj.ucapFlowSys.selectDialogParam.texts += ucapFlowSys.split_str
					+ flow[i].getAttribute("name");
		}
		if (flow.length > 1) {
			// 说明有多个流程列表，要弹出流程选择框
			ucapOpenFlow.openCommSelect(winobj.ucapFlowSys.selectDialogParam.callBack);
		} else {
			// 说明只有一个流程，则不弹出对话框，直接进行节点的判断
			ucapOpenFlow
					.openFlowByFlowUnid(winobj.ucapFlowSys.selectDialogParam.values);
		}
	},
	/**
	 * 弹出通用的选择框
	 */
	openCommSelect : function(callBack) {
		var html = ucapFlowSys.commSelect;
		var button = [{
					text : "确定",
					id : "commonConfirm",
					handler : function() {
						ucapOpenFlow.commonSelectConfirm(callBack);
					}
				}, {
					text : "取消",
					handler : function() {
						ucapSession.commonWin.close()
					}
				}];
		var title = window.top.ucapFlowSys.selectDialogParam.title;
		ucapSession.commonWin = new  Ext.Window({
					title : ucapSession.win.winImg + title,
					width : 500,
					closable : true, // 关闭
					modal : true,
					height : 300,
					bodyStyle : ucapSession.win.winBodyStyle,
					autoLoad : {
						url : ucapSession.appPath + html,
						scripts : true,
						nocache : true
					},
					buttons : button
				});
		ucapSession.commonWin.show();
	},
	commonSelectConfirm : function(callBack) {
		
		var winobj = window ;
		var json = winobj.ucapCommonFun.getFormJSon("dialogSelectHtml");
		var value = json.ucap_selects;
		var par = json.par;
		if (value == "") {
			winobj.Ext.Msg.alert("提示信息", "请选择一个值！");
			return;
		}
		try {
			if (typeof callBack == "string") {
				ucapCommonFun.evalJavaScript(callBack + "('" + value + "','"
						+ par + "')");
			} else {
				 callBack.call(this, value, par);
			}
			  ucapSession.commonWin.close();
		} catch (e) {
		}
	},
	/**
	 * 根据流程ID，判断是否有多个可初始化的节点，如果是，则弹出节点选择框，否则返回流程ID、表单ID
	 * 
	 * @param {}
	 *            flowId 单个流程的UNID
	 */
	openFlowByFlowUnid : function(flowId) {
		var winobj = window.top;
		window.top.ucapFlowSys.flowWinObj = window;
		var nodeAction = function(response) {
			var result = response.responseText;
			var docs = _ucapXmlDom();
			docs.loadXML(result);
			var flag = docs.selectSingleNode("//result/flag");
			if (flag && flag.text == "false") {
				winobj.Ext.Msg.alert("提示", "您没有新建此流程的权限");
				return;
			}
			var nodes = docs.selectNodes("//nodes/node");
			winobj.ucapFlowSys.selectDialogParam.values = nodes[0].getAttribute("id")
					+ "~@" + nodes[0].getAttribute("formid") + "~@" + flowId;
			winobj.ucapFlowSys.selectDialogParam.texts = nodes[0].text;
			winobj.ucapFlowSys.selectDialogParam.title = "选择节点对话框";
			winobj.ucapFlowSys.selectDialogParam.info = "请选择一个要进入的节点";
			winobj.ucapFlowSys.selectDialogParam.callBack = ucapOpenFlow.openFlowByNodeUnid;
			for (var i = 1; i < nodes.length; i++) {
				winobj.ucapFlowSys.selectDialogParam.values += ucapFlowSys.split_str
						+ nodes[i].getAttribute("id") + "~@"
						+ nodes[i].getAttribute("formid") + "~@" + flowId;
				winobj.ucapFlowSys.selectDialogParam.texts += ucapFlowSys.split_str
						+ nodes[i].text;
			}
			if (nodes.length > 1) {
				// 说明要弹出节点选择对话框
				ucapOpenFlow
						.openCommSelect(winobj.ucapFlowSys.selectDialogParam.callBack);
			} else {
				// 说明当前流程只有一个节点，可直接根据流程ID和节点ID进入下一步骤
				ucapOpenFlow
						.openFlowByNodeUnid(winobj.ucapFlowSys.selectDialogParam.values);
			}
		};
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : {
				"ucapid" : ucapFlowSys.actionParams[1],
				"flowid" : flowId
			},
			callback : function(options, success, response) {
				if (success) {
					nodeAction(response);
				} else {
					winobj.Ext.Msg.alert("提示", "获取节点列表不成功");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * nodeid为三个值 ，以~@分开，第一个值 为节点的UNID，第二个值为表单的UNID，第三个值为流程配置的UNID
	 * 
	 * @param {}
	 *            nodeid
	 */
	openFlowByNodeUnid : function(nodeid) {
		var ids = nodeid.split("~@");
		var sPara = "&flowid=" + ids[2] + "&nodeid=" + ids[0] + "&formid="
				+ ids[1] + "&unid=";

		if (window.top.ucapOpenFlow.isSubFlowDialog) {
			// 说明是子流程调用
			var actFlowId = ids[2];
			var actNodeId = ids[0];
			ucapFlowFun.subFlowSendFlow(actFlowId, actNodeId, "");
			return;
		}
		var winobj = window.top;

		/**
		 * 新建流程对话框，确认后执行的方法
		 */
		var openFlow = function(response) {
				var result = response.responseText;
			var docs = _ucapXmlDom();
			docs.loadXML(result);
			var node = docs.selectSingleNode("//result");
			var sUrl = ucapFlowSys.sUcapSystemPath + node.text + sPara;
			if (typeof(winobj.ucapFlowSys.openFlowDocFun) == "function") {
				if (typeof(winobj.ucapFlowSys.openFlowDocFunParams) != "undefined") {
					if (node.text == "") {
						sUrl = ids[0];
					}
				}
				winobj.ucapFlowSys.openFlowDocFun.call(this, sUrl,
						winobj.ucapFlowSys.openFlowDocFunParams);
			} else {
				if (node.text == "") {
					winobj.Ext.Msg.alert("提示信息",
							"找不到此流程对应的表单，可能是取表单的接口未实现，或此流程对应的表单ID为空！");
					return;
				}
				//window.open(sUrl);
			}
		}
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : {
				"ucapid" : ucapFlowSys.actionParams[2],
				"formid" : ids[1]
			},
			callback : function(options, success, response) {
				if (success) {
					openFlow(response);
				} else {
					winobj.Ext.Msg.alert("提示", "根据流程表单，获取JSP文件时出错！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 上一页下一页查看旧流程文档的方法
	 * 
	 * @param {}
	 *            ucapOpenFlow.openOldFlowPageDoc("&unid="+unid+"&viewMId="+viewId+"&openST="+openST);
	 */
	openOldFlowPageDoc : function(par) {
			var openPostFn = function(result) {
			var docs = _ucapXmlDom();
			docs.loadXML(result);
			var flow = docs.selectNodes("//instance");
			if (!flow || !flow[0]) {
				Ext.Msg.alert("文档打开提示", "你没有权限打开此文档！");
				return;
			}
			var node = flow[0];

			var jsp = node.getAttribute("jsp");

			var instance = node.getAttribute("id");
			if (flow && flow.length == 1) {
			} else {
				// 说明有多个流程实例，取出一个
				jsp = flow[1].getAttribute("jsp");
				instance = flow[1].getAttribute("id");
			}
		if (jsp != "") {
			var p = "";
			if (jsp.indexOf("?") > -1) {
				p = "&";
			} else {
				p = "?";
			}
			par = p + "instanceUnid=" + instance + par;
			var sUrl = ucapFlowSys.sUcapSystemPath + jsp + par;
			return sUrl;
		} else
			Ext.Msg.alert("提示信息", '此流程对应的JSP文件未配置,请与管理员联系!');
		};
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
			conn.open("GET", ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet + "?ucapid="+ ucapFlowSys.actionParams[12] + par, false);
			conn.send(null);
		return openPostFn(conn.responseText);
		 
	},
	
	
	/**
	 * 查看旧流程文档的方法
	 * 
	 * @param {}
	 *            par ="unid=文档的UNID"
	 * @param {}
	 *            openCallBackParam，外面调用时的参数
	 * @param openCallBack
	 *            回调函数，默认第一个为URL，第二个为 openCallBackParam
	 */
	openOldFlowDoc : function(par, openCallBack, openCallBackParam) {
		window.top.ucapFlowSys.flowWinObj = window;
		var winobj = window.top;
		if (typeof openCallBack != "undefined") {
			if (typeof openCallBack != "function") {
				winobj.Ext.Msg.alert("提示信息", "回调函数只能是函数，不能是字符串(默认参数为流程文档的URL)");
				return;
			}
		}
		winobj.ucapFlowSys.openFlowDocFun = openCallBack;
		winobj.ucapFlowSys.openFlowDocFunParams = openCallBackParam;
		var openPostFn = function(response) {
			var result = response.responseText;
			var docs = _ucapXmlDom();
			docs.loadXML(result);
			var flow = docs.selectNodes("//instance");
			if (!flow || !flow[0]) {
				winobj.Ext.Msg.alert("文档打开提示", "你没有权限打开此文档！");
				return;
			}
			var node = flow[0];

			var jsp = node.getAttribute("jsp");

			var instance = node.getAttribute("id");
			if (flow && flow.length == 1) {
				ucapOpenFlow._openDocByInstance(jsp + "~@" + instance, par);
			} else {
				// 说明有多个流程实例，要弹出对话框让其选择
				winobj.ucapFlowSys.selectDialogParam.values = jsp + "~@" + instance;
				winobj.ucapFlowSys.selectDialogParam.texts = flow[0].text;
				winobj.ucapFlowSys.selectDialogParam.title = "要进入的流程选择对话框";
				winobj.ucapFlowSys.selectDialogParam.info = "请选择一个你要进入的流程";
				winobj.ucapFlowSys.selectDialogParam.callBack = ucapOpenFlow._openDocByInstance;
				winobj.ucapFlowSys.par = par;
				for (var i = 1; i < flow.length; i++) {
					jsp = flow[i].getAttribute("jsp");
					instance = flow[i].getAttribute("id");
					winobj.ucapFlowSys.selectDialogParam.values += ucapFlowSys.split_str
							+ jsp + "~@" + instance;
					winobj.ucapFlowSys.selectDialogParam.texts += ucapFlowSys.split_str
							+ flow[i].text;
				}
				ucapOpenFlow
						.openCommSelect(winobj.ucapFlowSys.selectDialogParam.callBack);
			}
		};
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet + "?" + par,
			params : {
				"ucapid" : ucapFlowSys.actionParams[12]
			},
			callback : function(options, success, response) {
				if (success) {
					openPostFn(response);
				} else {
					winobj.Ext.Msg.alert("提示", "获取流程文档时出错！参数为：" + par);
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 打开旧文档后，执行的方法
	 */
	_openDocByInstance : function(jsp_instanceid, par) {
		var v = jsp_instanceid.split("~@");
		var jsp = v[0];
		var instance = v[1];
		var winobj = window.top;
		if (jsp != "") {
			var p = "";
			if (jsp.indexOf("?") > -1) {
				p = "&";
			} else {
				p = "?";
			}
			par = p + "instanceUnid=" + instance + par;
			var sUrl = ucapFlowSys.sUcapSystemPath + jsp + par;
			if (typeof(winobj.ucapFlowSys.openFlowDocFun) == "function") {
				if (typeof(winobj.ucapFlowSys.openFlowDocFunParams) != "undefined") {
					// sUrl += ucapFlowSys.openFlowDocFunParams;
				}
				winobj.ucapFlowSys.openFlowDocFun.call(this, sUrl,
						winobj.ucapFlowSys.openFlowDocFunParams);
			} else {
				 window.open(sUrl);
			}
		} else
			winobj.Ext.Msg.alert("提示信息", '此流程对应的JSP文件未配置,请与管理员联系!');
	},
	/**
	 * 根据待办事宜UNID，打开流程文档
	 * 
	 * @param {string}
	 *            todoUnid
	 * @param {function}
	 *            openCallBack回调函数 默认参数为URL
	 * @param {object}
	 *            openCallBackParam，外面调用时的参数
	 */
	OpenFlowDocByTodoUnid : function(todoUnid, openCallBack, openCallBackParam) {
		if (typeof(todoUnid) == "undefined")
			todoUnid = "";
		var winobj =window.top;
		if (todoUnid == "") {
			winobj.Ext.Msg.alert("提示信息", "待办事宜文档的UNID不能为空!");
			return;
		}
		winobj.ucapFlowSys.openFlowDocFun = openCallBack;
		winobj.ucapFlowSys.openFlowDocFunParams = openCallBackParam;
		var OpenPostTodoFn = function(response) {
			var result = response.responseText;
			var docs = _ucapXmlDom();
			docs.loadXML(result);
			var flow = docs.selectNodes("//instance");
			var node = flow[0];
			if(null==node){
				alert("找不到流程记录!");return;
			}
			var jsp = node.getAttribute("jsp");
			var instance = node.getAttribute("id");
			var docunid = node.getAttribute("docUnid");
			var par = "&unid=" + docunid;
			ucapOpenFlow._openDocByInstance(jsp + "~@" + instance, par);
		}
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : {
				"ucapid" : ucapFlowSys.actionParams[16],
				"todoUnid" : todoUnid
			},
			callback : function(options, success, response) {
				if (success) {
					OpenPostTodoFn(response);
				} else {
					winobj.Ext.Msg.alert("提示", "获取流程文档时出错！参数为：" + par);
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}
}

var ucapFlowFun = {
	// 流程对话框相关值
	flowValue : {
		docUnid : "", // 实际文档的UNID
		instanceUnid : "", // 流程实例的UNID
		docTitle : "", // 实际文档的标题
		actFlowUnid : "", // 点击子流程时，实际流程配置ID
		actNodeUnid : "", // 点击子流程时，实际的节点ID
		/**
		 * 1-发送 2 分流发送 3 子流程发送 4更改流程对话框 5 退回 6转办
		 * 
		 * @type String
		 */
		type : "", // 发送类型
		opinionNo : "", // 如果不为空，则意见对话框显示在发送框的下面
		endFlowUnid : "" // 流程结束的节点UNID
	},
	sendFlowDialogConfirmFun : "", // 发送对话框确认后执行的函数
	completeFlowConfirmFun : "", // 办理结束后，执行的函数
	actionName : new Array("办理结束", "撤办", "收回", "阅批结束", "结束此流程", "收回子流程",
			"退回上一节点", "", "子流程退回", "收回转办","","","返回办理人"),

	/**
	 * 初始化相关值
	 */
	_initValue : function() {
		// 流程对话框相关值
		this.flowValue = new Object();
		//alert(1);
		if(window.top.ucapOpenFlow)window.top.ucapOpenFlow.isSubFlowDialog = false;
	},

	sendFlowOpinion : function(opinionNo) {
		var winobj =window.top;
		winobj.ucapFlowSys.flowWinObj = window;
		this._initValue();
		if (typeof(opinionNo) == "undefined")
			opinionNo = "";
		this.flowValue.opinionNo = opinionNo;

		// 获取 当前文档的UNID 和流程实例的UNID
		this.flowValue.docUnid = ucapGetUrlParameter("unid");
		if (this.flowValue.docUnid == "") {
			winobj.Ext.Msg.alert("提示信息", "当前文档是新文档，请先保存！");
			return;
		}
		this.flowValue.instanceUnid = ucapGetUrlParameter("instanceUnid");

		this.flowValue.type = "1";
		var height = 360; // 高度
		var width = 500; // 宽度
		var para = {
			"ucapid" : ucapFlowSys.actionParams[17],
			docUnid : ucapFlowFun.flowValue.docUnid,
			instanceUnid : ucapFlowFun.flowValue.instanceUnid
		};
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : para,
			callback : function(options, success, response) {
				if (success) {
					var result = response.responseText;
					if (result.indexOf("false") == -1) {
						var docs = _ucapXmlDom();
						docs.loadXML(result);
						var docRoot = docs.selectSingleNode("//doc");
						var mode = ucapGetAttributeValue(docRoot, "mode");// 0--不弹出对话框,1--弹出对话框不可修改,2--弹出对话框并选择
						if ((typeof(mode) == "undefined" || mode == null
								|| mode == "" || mode == "2")) {
							var callBack = ucapFlowFun.ucapFlowSendOk; // 默认发送对话框要执行的方法
							if (ucapFlowFun.flowValue.opinionNo != "") {
								height += 120;
							}
							ucapFlowFun.openSendFlowDialog(
									ucapFlowSys.sUcapSystemPath
											+ ucapFlowSys.sendJsp, width,
									height, callBack);
						} else if (mode == "0" || mode == "1") {
							var tmpucapFlowReturn = {
								nextNodeUnid : "", // 下一节点的UNID
								auditType : "", // 审批方式
								nodeTransactors : "", // 节点办理人
								nodeTransactorids : "", // 节点办理人ID
								notNodeTransactors : "", // 非节点办理人
								notNodeTransactorids : "" // 非节点办理人ID
							}
							var _ucapNextFlowUnid = ucapGetAttributeValue(
									docRoot, "flowid");
							tmpucapFlowReturn.auditType = ucapGetAttributeValue(
									docRoot, "auditType");
							tmpucapFlowReturn.nextNodeUnid = ucapGetAttributeValue(
									docRoot, "transition");
							var transactor = docRoot
									.getElementsByTagName("transactor");
							var notTransactor = docRoot
									.getElementsByTagName("notTransactors");
							if (transactor.length > 0) {
								tmpucapFlowReturn.nodeTransactorids = transactor[0]
										.selectSingleNode("value").text;
								tmpucapFlowReturn.nodeTransactors = transactor[0]
										.selectSingleNode("name").text;
							}
							if (notTransactor.length > 0) {

								if (typeof(notTransactor[0]) != "undefined") {
									tmpucapFlowReturn.nodeTransactorids = notTransactor[0]
											.selectSingleNode("value").text;
									tmpucapFlowReturn.nodeTransactors = notTransactor[0]
											.selectSingleNode("name").text;
								}
							}
							var _ucapSendArray = new Array();
							_ucapSendArray[0] = tmpucapFlowReturn;
							if (mode == "0") {
								var sUrl = ucapFlowSys.sUcapSystemPath
										+ ucapFlowSys.opinionJsp;

								ucapOpinion.openDialogDefault(sUrl, height,
										width, "18", _ucapNextFlowUnid,
										_ucapSendArray);
							} else if (mode == "1") {
								winobj.ucapFlowSys.sendFlowDialogRead.values = tmpucapFlowReturn.nodeTransactors;
								winobj.ucapFlowSys.sendFlowDialogRead.nextNode = ucapGetAttributeValue(
										docRoot, "nodeName");
								winobj.ucapFlowSys.sendFlowDialogRead.nextApproveType = ucapGetAttributeValue(
										docRoot, "auditName");
								ucapFlowFun.openSendFlowDialogReadOnly(
										ucapFlowSys.sUcapSystemPath
												+ ucapFlowSys.sendReadOnlyJsp,
										width, height, _ucapNextFlowUnid,
										_ucapSendArray);
							}
						}
					} else {
						var callBack = ucapFlowFun.ucapFlowSendOk; // 默认发送对话框要执行的方法
						if (ucapFlowFun.flowValue.opinionNo != "") {
							height += 150;
						}
						ucapFlowFun.openSendFlowDialog(
								ucapFlowSys.sUcapSystemPath
										+ ucapFlowSys.sendJsp, width, height,
								callBack);
					}
				} else {
					winobj.Ext.Msg.alert("提示", "获取默认类型时出错！参数为：" + Ext.encode(para));
				}
			}
		}
		Ext.Ajax.request(requestConfig);
		return;

	},
	/**
	 * 发送对话框 type =1 发送对话框 ＝2分流发送 3子流程发送框 ＝4更改流程对话框 5退回 6 转办 opinionNo
	 * 有值，说明要同时显示意见对话框
	 * 
	 * @param {}
	 *            type
	 * @param {}
	 *            opinionNo
	 * @param sendFlowDialogConfirmFun
	 * 
	 * @param isValidate 流程在操作前是否进行验证，为空或为true都进行验证，为false则不进行验证
	 */
	sendFlow : function(type, opinionNo, sendFlowDialogConfirmFun,isValidate) {
		window.top.ucapFlowSys.flowWinObj = window;
		var winobj = window.top;
		
		if(typeof(isValidate)=="undefined" || isValidate){
			if(!ucapFlowFun._validate("validateSend",type))return;
		}
		
		this._initValue();
		if (typeof(opinionNo) == "undefined")
			opinionNo = "";
		this.flowValue.opinionNo = opinionNo;

		// 获取 当前文档的UNID 和流程实例的UNID
		this.flowValue.docUnid = ucapGetUrlParameter("unid");
		if (this.flowValue.docUnid == "") {
			winobj.Ext.Msg.alert("提示信息", "当前文档是新文档，请先保存！");
			return;
		}
		this.flowValue.instanceUnid = ucapGetUrlParameter("instanceUnid");
		if (typeof(type) == "string") {
			if (type == "")
				type = "0";
			type = parseInt(type);
		}
		this.flowValue.type = type;
		var height = 360; // 高度
		var width = 500; // 宽度
		if (type == 2) {
			// 说明有分流发送
			height += 60;
		}
		if (type == 3) {
			
			// 说明是子流程
			var para = {
				"ucapid" : ucapFlowSys.actionParams[6],
				"sendType" : ucapFlowFun.flowValue.type,
				docUnid : ucapFlowFun.flowValue.docUnid,
				instanceUnid : ucapFlowFun.flowValue.instanceUnid
			};
			var requestConfig = {
				url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
				params : para,
				
				callback : function(options, success, response) {
				
					if (success) {
						window.top.ucapOpenFlow.isSubFlowDialog = true;
						ucapOpenFlow._flowBox(response);
					} else {
						winobj.Ext.Msg
								.alert("提示", "获取流程文档时出错！参数为："
												+ Ext.encode(para));
					}
				}
			}
			Ext.Ajax.request(requestConfig);
			return;
		} else if (type == 5) {
			// 说明是退回对话框
			height = 305;
			if (ucapFlowFun.flowValue.opinionNo != "") {
				_ucapOpinionValue.name = "退回意见";
				_ucapOpinionValue.type = "98";
				height += 155;
			}
			var callBack = ucapFlowFun.returnSendOk;
			this.openSendFlowDialog(ucapFlowSys.sUcapSystemPath
							+ ucapFlowSys.returnJsp, width, height, callBack);
		} else if (type == 6) {
			// 说明是转办对话框
			height = 305;
			if (ucapFlowFun.flowValue.opinionNo != "") {
				height += 155;
			}
			var callBack = ucapFlowFun.transSendOk;
			this.openSendFlowDialog(ucapFlowSys.sUcapSystemPath
							+ ucapFlowSys.transferJsp, width, height, callBack);
		} else if (type == 1) {
			// 说明是普通发送框
			// modify by csj 2009.5.31
			var para = {
				"ucapid" : ucapFlowSys.actionParams[17],
				docUnid : ucapFlowFun.flowValue.docUnid,
				instanceUnid : ucapFlowFun.flowValue.instanceUnid
			};
			var requestConfig = {
				url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
				params : para,
				callback : function(options, success, response) {
					if (success) {
						var result = response.responseText;
						if (result.indexOf("false") == -1) {
							var docs = _ucapXmlDom();
							docs.loadXML(result);
							var docRoot = docs.selectSingleNode("//doc");
							var mode = ucapGetAttributeValue(docRoot, "mode");// 0--不弹出对话框,1--弹出对话框不可修改,2--弹出对话框并选择
							if ((typeof(mode) == "undefined" || mode == null
									|| mode == "" || mode == "2")) {
								var callBack = ucapFlowFun.ucapFlowSendOk; // 默认发送对话框要执行的方法
								if (ucapFlowFun.flowValue.opinionNo != "") {
									height += 80;
								}
								ucapFlowFun.openSendFlowDialog(
										ucapFlowSys.sUcapSystemPath
												+ ucapFlowSys.sendJsp, width,
										height, callBack);
							} else if (mode == "0" || mode == "1") {
								var tmpucapFlowReturn = {
									nextNodeUnid : "", // 下一节点的UNID
									auditType : "", // 审批方式
									nodeTransactors : "", // 节点办理人
									nodeTransactorids : "", // 节点办理人ID
									notNodeTransactors : "", // 非节点办理人
									notNodeTransactorids : "" // 非节点办理人ID
								}
								var _ucapNextFlowUnid = ucapGetAttributeValue(
										docRoot, "flowid");
								tmpucapFlowReturn.auditType = ucapGetAttributeValue(
										docRoot, "auditType");
								tmpucapFlowReturn.nextNodeUnid = ucapGetAttributeValue(
										docRoot, "transition");
								var transactor = docRoot
										.getElementsByTagName("transactor");
								var notTransactor = docRoot
										.getElementsByTagName("notTransactors");
								if (transactor.length > 0) {
									tmpucapFlowReturn.nodeTransactorids = transactor[0]
											.selectSingleNode("value").text;
									tmpucapFlowReturn.nodeTransactors = transactor[0]
											.selectSingleNode("name").text;
								}
								if (notTransactor.length > 0) {

									if (typeof(notTransactor[0]) != "undefined") {
										tmpucapFlowReturn.nodeTransactorids = notTransactor[0]
												.selectSingleNode("value").text;
										tmpucapFlowReturn.nodeTransactors = notTransactor[0]
												.selectSingleNode("name").text;
									}
								}
								var _ucapSendArray = new Array();
								_ucapSendArray[0] = tmpucapFlowReturn;
								if (mode == "0") {
									ucapFlowFun.sendFlowConfirm(
											_ucapNextFlowUnid, _ucapSendArray,
											"");
								} else if (mode == "1") {
									ucapFlowSys.sendFlowDialogRead.values = tmpucapFlowReturn.nodeTransactors;
									ucapFlowSys.sendFlowDialogRead.nextNode = ucapGetAttributeValue(
											docRoot, "nodeName");
									ucapFlowSys.sendFlowDialogRead.nextApproveType = ucapGetAttributeValue(
											docRoot, "auditName");
									ucapFlowFun
											.openSendFlowDialogReadOnly(
													ucapFlowSys.sUcapSystemPath
															+ ucapFlowSys.sendReadOnlyJsp,
													width, height,
													_ucapNextFlowUnid,
													_ucapSendArray);
								}
							}
						} else {
							var callBack = ucapFlowFun.ucapFlowSendOk; // 默认发送对话框要执行的方法
							if (ucapFlowFun.flowValue.opinionNo != "") {
								height += 80;
							}
							ucapFlowFun.openSendFlowDialog(
									ucapFlowSys.sUcapSystemPath
											+ ucapFlowSys.sendJsp, width,
									height, callBack);
						}
					} else {
						winobj.Ext.Msg
								.alert("提示", "获取默认类型时出错！参数为："
												+ Ext.encode(para));
					}
				}
			}
			Ext.Ajax.request(requestConfig);
			return;

		} else {
			var callBack = ucapFlowFun.ucapFlowSendOk; // 默认发送对话框要执行的方法
			if (ucapFlowFun.flowValue.opinionNo != "") {
				height += 120;
			}
			ucapFlowFun.openSendFlowDialog(ucapFlowSys.sUcapSystemPath
							+ ucapFlowSys.sendJsp, width, height, callBack);
		}
	},

	/**
	 * 流程挂起 10-挂起 11-恢复
	 */
	waitFlow : function(type) {
		// 获取 当前文档的UNID 和流程实例的UNID
		this.flowValue.docUnid = ucapGetUrlParameter("unid");
		var winobj = window.top;
		if (this.flowValue.docUnid == "") {
			winobj.Ext.Msg.alert("提示信息", "当前文档是新文档，请先保存！");
			return;
		}
		this.flowValue.instanceUnid = ucapGetUrlParameter("instanceUnid");
		var para = {
			"ucapid" : ucapFlowSys.actionParams[8],
			"completeType" : type,
			docUnid : ucapFlowFun.flowValue.docUnid,
			instanceUnid : ucapFlowFun.flowValue.instanceUnid
		};
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : para,
			callback : function(options, success, response) {
				if (success) {
					var result = response.responseText;
					var docs = _ucapXmlDom();
					docs.loadXML(result);
					var flag = docs.selectSingleNode("//result/flag");
					if (flag && flag.text == "true") {
						var msgNode = docs.selectSingleNode("//result/msg");
						alert(msgNode.text);
						window.location = window.location;
					} else {
						winobj.Ext.Msg.alert("提示", "流程挂起时出错");
					}
				} else {
					winobj.Ext.Msg.alert("提示", "流程挂起时出错");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
		return;
	},

	/**
	 * 在子流程的发送中，调用发送给子流程的对话框
	 * 
	 * @param {}
	 *            actFlowId 子流程的流程ID
	 * @param {}
	 *            actNodeId 子流程的节点ID
	 * @param {}
	 *            endFlowUnid 流程结束的ID，可为空，主要是在“发送框中”调用
	 */
	subFlowSendFlow : function(actFlowId, actNodeId, endFlowUnid) {
		ucapFlowFun.flowValue.actFlowUnid = actFlowId; // 点击子流程时，实际流程配置ID
		ucapFlowFun.flowValue.actNodeUnid = actNodeId; // 点击子流程时，实际的节点配置ID
		window.top.ucapOpenFlow.isSubFlowDialog = true;
		if (typeof(endFlowUnid) == "undefined")
			endFlowUnid = "";
		ucapFlowFun.flowValue.endFlowUnid = endFlowUnid;
		if (ucapSession.commonWin)
			ucapSession.commonWin.close();
		//	_ucapSendDialogOnload();
 		var callBack = ucapFlowFun.ucapFlowSendOk; // 默认发送对话框要执行的方法
 		ucapFlowFun.openSendFlowDialog(ucapFlowSys.sUcapSystemPath
 						+ ucapFlowSys.sendJsp, 500, 400, callBack); // 弹出流程发送对话框
	},
	/**
	 * 在子流程的发送到结束节点后，返回给主流程时调用发送的对话框
	 * 
	 * @param {}
	 *            actFlowId 主流程的流程ID
	 * @param {}
	 *            actNodeId 主流程的节点ID
	 * @param {}
	 *            endFlowUnid 流程结束的ID，可为空，主要是在“发送框中”调用
	 */
	subFlowSendMainFlow : function(actFlowId, actNodeId, endFlowUnid) {
		ucapFlowFun.flowValue.actFlowUnid = actFlowId; // 点击子流程时，实际流程配置ID
		ucapFlowFun.flowValue.actNodeUnid = actNodeId; // 点击子流程时，实际的节点配置ID
		window.top.ucapOpenFlow.isSubFlowDialog = true;
		if (typeof(endFlowUnid) == "undefined")
			endFlowUnid = "";
		ucapFlowFun.flowValue.endFlowUnid = endFlowUnid;
		if (ucapSession.commonWin)
			ucapSession.commonWin.close();
		_ucapSendDialogOnload();
 	 
	},
	/**
	 * 发送后的确定
	 * 
	 * @param {}
	 *            nextFlowUnid
	 * @param {}
	 *            sendValueArray
	 * @param {}
	 *            endFlowUnid
	 */
	sendFlowConfirm : function(nextFlowUnid, sendValueArray, endFlowUnid) {
		var flowXmlDoc = __getSendXmlDoc(nextFlowUnid, sendValueArray,
				endFlowUnid);
		if(ucapFlowSys.sendWin){
			ucapFlowSys.sendWin.close();
		}
		var winobj = window.top;
		winobj.Ext.MessageBox.show({
					msg : '正在提交中，请稍等...',
					progressText : '提交...',
					width : 300,
					wait : true,
					waitConfig : {
						interval : 300
					},
					icon : Ext.MessageBox.INFO
				});
		var requestConfig = {
			url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
			params : {
				"ucapid" : ucapFlowSys.actionParams[7],
				"sendType" : this.flowValue.type,
				docUnid : this.flowValue.docUnid,
				instanceUnid : this.flowValue.instanceUnid
			},
			xmlData : flowXmlDoc,
			callback : function(options, success, response) {
				if (success) {
					winobj.Ext.MessageBox.hide();
					var fn = ucapFlowFun.sendFlowDialogConfirmFun;
					if (typeof(fn) != "function")
						fn = ucapFlowFun.sendFlowPost;
					fn.call(this, response, ucapFlowFun.flowValue.type);
				} else {
					winobj.Ext.Msg.alert("提示", "发送给后时出错！");
				}
			}
		};
		Ext.Ajax.request(requestConfig);
	},
	sendFlowPost : function(response, type) {
		var result = response.responseText;
		var docs = _ucapXmlDom();
		docs.loadXML(result);
		var flag = docs.selectSingleNode("//result/flag");
		if (flag && flag.text == "true") {
			//刷新父视图列表mdy by fshaoming@linewell.com
			ucapCommonFun.refreshParentView();
			alert("提交给下一步骤成功！");
			// start 显示发送后节点的表单 modify by cguangcong@linewell.com 2011-10-13	
			var url = document.location.href;
			var unid = ucapCommonFun.getUrlParameter("unid",url);
			var instanceUnid = ucapCommonFun.getUrlParameter("instanceUnid",url); 
			var jsp;
			var requestConfig = {
				url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet + "?unid="+unid+"&instanceUnid="+instanceUnid,
				params : {
					"ucapid" : ucapFlowSys.actionParams[12]
				},
				callback : function(options, success, response) {
					if (success) {
						var result=response.responseText;
						var docs = _ucapXmlDom();
						docs.loadXML(result);
						var flow = docs.selectNodes("//instance");
						var node = flow[0];
						jsp = node.getAttribute("jsp");
						jsp+="&instanceUnid="+instanceUnid+"&unid="+unid;
						if(ucapSession.opendocType ==1 || ucapSession.opendocType==2){
							jsp += "&div=1";
						}
						window.location =appPath+"/"+jsp;
					} else {
						winobj.Ext.Msg.alert("提示", "获取流程文档时出错！参数为：" + jsp);
					}
				}
			}
			Ext.Ajax.request(requestConfig);
			// end 显示发送后节点的表单 modify by cguangcong@linewell.com 2011-10-13	
//			window.location = window.location;
		} else {
			var msgNode = docs.selectSingleNode("//result/msg");
			alert(msgNode.text);
			window.location = window.location;
		}
		//yjy add 2011-3-25 刷新首页频道 cnId begin
		var cnId = ucapCommonFun.getUrlParameter("cnId");
		if (typeof cnId!="undefined"){				
			var windoc;
			if (window.top != window.self) {
				// 说明是在iframe中打开
				windoc = window.parent;					
			} else {
				windoc = window.opener;
			}
			try{
				windoc.ucapPortal.updateChannel(cnId);
			}catch(e){};
		}			
		//3.25 end
	},
	openSendFlowDialog : function(url, width, height, callBack) {
		var curwin = window.top.ucapFlowSys.flowWinObj;
		var button = [{
					text : "确定",
					id : "commonConfirm",
					handler : function() {
						if (typeof callBack == "function") {
							callBack.call(this)
						} else {
							Ext.Msg.alert("提示信息", "没有正确设置回调函数：" + callBack);
						}
					}
				}, {
					text : "取消",
					handler : function() {
						ucapFlowSys.sendWin.close()
					}
				}];
		ucapFlowSys.sendWin = new window.top.Ext.Window({
					title : ucapSession.win.winImg + "发送对话框",
					width : width,
					closable : true, // 关闭
					modal : true,
					height : height,
					//bodyStyle : ucapSession.win.winBodyStyle,
					autoLoad : {
						url : url,
						scripts : true,
						nocache : true
					},
					buttons : button
				});
		ucapFlowSys.sendWin.show();
	},
	openSendFlowDialogReadOnly : function(url, width, height,
			_ucapNextFlowUnid, _ucapSendArray) {
		var button = [{
			text : "确定",
			handler : function() {
				ucapFlowFun.sendFlowConfirm(_ucapNextFlowUnid, _ucapSendArray,
						"");
			}
		}, {
			text : "取消",
			handler : function() {
				ucapFlowSys.sendWin.close();
			}
		}];
		ucapFlowSys.sendWin = new window.top.Ext.Window({
					title : ucapSession.win.winImg + "发送对话框",
					width : width,
					closable : true, // 关闭
					modal : true,
					height : height,
					bodyStyle : ucapSession.win.winBodyStyle,
					autoLoad : {
						url : url,
						scripts : true,
						nocache : true
					},
					buttons : button
				});
		ucapFlowSys.sendWin.show();
	},
	/**
	 * type 0 办理结束(多人并行、多人顺序或分流状态下办理结束) 1 表示上一节点收回 2－表示本节点收回 3－表示阅批结束 4－表示结束流程
	 * 5－表示子流程收回 6－退回上一节点 7 表示是发送中发送到结束节点，8 子流程退回 9－－表示收回转办 opinionNo
	 * 有值，说明要同时显示意见对话框，只在退回时有用到，其他情况，均为空 结束流程有可能的是：主流程中的结束，子流程中的结束，分流状态下的结束流程
	 * subFlowUnid 表示是要收回的子流程的实例UNID
	 */
	completeFlow : function(type, opinionNo, OpinionName, subFlowUnid,docUnid,instanceUnid) {
		window.top.ucapFlowSys.flowWinObj = window;
		var winobj = window.top;
		
		if(!ucapFlowFun._validate("validateComplete",type))return;
		
		this._initValue();
		if (typeof(opinionNo) == "undefined")
			opinionNo = "";
		if (typeof(OpinionName) == "undefined")
			OpinionName = "";
		if (typeof(subFlowUnid) == "undefined")
			subFlowUnid = "";
		this.flowValue.opinionNo = opinionNo;
		// 获取 当前文档的UNID 和流程实例的UNID
		this.flowValue.docUnid = ucapGetUrlParameter("unid");
		if(docUnid){
		this.flowValue.docUnid =docUnid;
		}
		if (this.flowValue.docUnid == "") {
			winobj.Ext.Msg.alert("提示信息", "当前文档是新文档，请先保存！");
			return;
		}
		var subFlowCallBack = function(response) {
			var result = response.responseText;
			var docs = _ucapXmlDom();
			docs.loadXML(result);
			var flow = docs.selectNodes("//subFlow");
			var node = flow[0];
			var name = node.text;
			var subFlowUnid = node.getAttribute("subFlowInstanceId");
			if (flow && flow.length == 1) {
				ucapFlowFun._subFlowCompleteFlow(subFlowUnid);
			} else {

				// 说明有多个子流程实例，要弹出对话框让其选择
				winobj.ucapFlowSys.selectDialogParam.values = flow[0]
						.getAttribute("subFlowInstanceId");
				winobj.ucapFlowSys.selectDialogParam.texts = flow[0].text;
				winobj.ucapFlowSys.selectDialogParam.title = "要收回的子流程选择对话框";
				winobj.ucapFlowSys.selectDialogParam.info = "请选择一个你要收回的子流程";
				winobj.ucapFlowSys.selectDialogParam.callBack = ucapFlowFun._subFlowCompleteFlow;
				for (var i = 1; i < flow.length; i++) {
					winobj.ucapFlowSys.selectDialogParam.values += ucapFlowSys.split_str
							+ flow[i].getAttribute("subFlowInstanceId");;
					winobj.ucapFlowSys.selectDialogParam.texts += ucapFlowSys.split_str
							+ flow[i].text;
				}
				ucapOpenFlow
						.openCommSelect(winobj.ucapFlowSys.selectDialogParam.callBack);
			}
		}
		this.flowValue.instanceUnid = ucapGetUrlParameter("instanceUnid");
		if(instanceUnid){
		this.flowValue.instanceUnid =instanceUnid;
		}
		_ucapOpinionValue.completeType = "";
		var continueFun = function() {
			var sUrl = ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet;
			if (type == "5" && subFlowUnid != "") {
				sUrl += "?subFlowUnid=" + subFlowUnid;
			}
			var requestConfig = {
				url : sUrl,
				params : {
					"ucapid" : ucapFlowSys.actionParams[8],
					"completeType" : type,
					docUnid : ucapFlowFun.flowValue.docUnid,
					instanceUnid : ucapFlowFun.flowValue.instanceUnid
				},
				callback : function(options, success, response) {
					if (success) {
						if (type == "5" && subFlowUnid == "") {
							subFlowCallBack(response);
						} else {
							var fn = ucapFlowFun.completeFlowConfirmFun;
							if (typeof(fn) != "function"){
								fn = ucapFlowFun.sendFlowPost;
							}else{
								fn.call(this, response, type);
								window.location = window.location;
							}
						}
					} else {
						winobj.Ext.Msg.alert("提示", "发送给后时出错！");
					}
				}
			}
			Ext.Ajax.request(requestConfig);
		}
		if (ucapFlowFun.flowValue.opinionNo != "" && opinionNo != "-99") {
			// 弹出意见对话框 == -99 表示是在意见对话框中调用的
			if (OpinionName == "")
				OpinionName = "退回意见";
			_ucapOpinionValue.name = OpinionName;
			_ucapOpinionValue.completeType = type;
			ucapOpinion.opinionDialog(null, ucapFlowFun.flowValue.opinionNo);
			return;
		} else {
			if (opinionNo != "-99") {
				if (type != "5" || subFlowUnid != "") {
					winobj.Ext.MessageBox.confirm("提示信息", "你是否确定要执行"
									+ this.actionName[type] + "操作?", function(
									id) {
								if (id == "yes") {
									continueFun();
								} else {
									return;
								}
							});
				} else {
					continueFun();
				}
			} else {
				continueFun();
			}
		}
	},
	/**
	 * 发送的确定
	 */
	ucapFlowSendOk : function() {
		window.top.ucapFlowSendOk();// 在ucapSendFlow.js中，必须要动态加载成功后才能执行
	},
	/**
	 * 退回的确定
	 */
	returnSendOk : function() {
		window.top.returnSendOk();// 在ucapReturn.js中，必须要动态加载成功后才能执行
	},
	/**
	 * 转办的确定
	 */
	transSendOk : function() {
		window.top.transSendOk(); // 在ucapTrans.js中，必须要动态加载成功后才能执行
	},
	_subFlowCompleteFlow : function(subFlowUnid) {
		ucapFlowFun.completeFlow("5", "", "", subFlowUnid);
	},
	
	/**
	 * 进行发送等操作前的验证，验证通过的话返回tue,否则返回false
	 * @param {} validateOperaction
	 * @param {} actionType
	 */
	_validate:function(validateOperaction,actionType){
		window.top.ucapFlowSys.flowWinObj = window;
		var winobj = window.top;
		if(ucapGetUrlParameter("unid")=="" || ucapGetUrlParameter("instanceUnid")=="")return true;
		var url = ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet;
		url += "?ucapid="+validateOperaction+"&operationType="+actionType+"&docUnid="+ucapGetUrlParameter("unid")+"&instanceUnid="+ucapGetUrlParameter("instanceUnid")+"&rand="+Math.random();
		var conn = winobj.Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		
		var docs = _ucapXmlDom();
		docs.loadXML(conn.responseText);
		var flag = docs.selectSingleNode("//result/flag");
		if (flag) {
				if (flag.text == "false") {
						//validateFlag = false;
						var msgNode = docs.selectSingleNode("//result/msg");
						winobj.Ext.Msg.alert("提示",msgNode.text);
						return false;
				}
		}
		
		return true;
	},	
	/**
	 * yjy 2011-3-18 add 可以通过按钮的名称执行在流程配置中的此按钮对应的事件
	 * @param {} buttonName 按钮名称
	 * @param {} executeFlag  执行前或执行后事件的标志  0 表示是执行前 1表示是执行后
	 * @return {Boolean}
	 */
	executeButtonEvent:function(buttonName,executeFlag){
		if(ucapGetUrlParameter("unid")=="" || ucapGetUrlParameter("instanceUnid")=="")return true;
		var url = ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet;
		url += "?ucapid=executeEvent&executeFlag="+executeFlag+"&buttonName="+escape(escape(buttonName))+"&docUnid="+ucapGetUrlParameter("unid")+"&instanceUnid="+ucapGetUrlParameter("instanceUnid")+"&rand="+Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		
		var docs = _ucapXmlDom();
		docs.loadXML(conn.responseText);
		var flag = docs.selectSingleNode("//result/flag");
		if (flag) {
				if (flag.text == "false") {			
						return false;
				}
		}		
		return true;
	}
}

// 意见对话框的相关参数
var _ucapOpinionValue = {
	name : "", // 意见名称
	type : "", // 意见类型，用数字进行定义
	sendType : "", // 是否直接发送,为1为直接发送,否则为不直接发送
	completeType : "" // 办理结束时，调用的意见对话框
}
var _ucapOpinionSend = {
	opinionObj : null,
	type : ""
}

/**
 * 意见对话框
 * 
 * @type
 */
var ucapOpinion = {
	/**
	 * 意见弹出窗口脚本 obj当前意见按狃对象，type意见类型，可在配置意见按狃中进行配置 sendType = 1
	 * 表示，点击意见后，再弹出发送对话框 sendType = 2 表示，意见和发送对话框合并在一起显示 ，但是通过意见按钮进行调用 sendType =
	 * 6 表示，退回上一节点 sendType=3 意见与默认类型集成
	 * 
	 * @param {}
	 *            obj
	 * @param {}
	 *            type
	 * @param {}
	 *            sendType
	 */
	win : null,
	/**
	 * 外部调用的方法
	 * 
	 * @param {}
	 *            obj 按钮对象 用 this 参数
	 * @param {}
	 *            type 意见类型 区别各个不同的意见 可用 1 2 3 等
	 * @param {}
	 *            sendType 意见中集成发送操作
	 * @param {}
	 *            height 意见对话框高度
	 * @param {}
	 *            width 意见对话框宽度
	 * @param {}
	 *            size 意见输入框的高度 默认为18
	 */
	opinionDialog : function(obj, type, sendType, height, width, size,_opinionConfirmFn) {
		window.top.ucapFlowSys.flowWinObj = window;
		var winobj = window.top;
		if (ucapFlowFun.flowValue.docUnid == "") {
			ucapFlowFun.flowValue.docUnid = ucapGetUrlParameter("unid");
			ucapFlowFun.flowValue.instanceUnid = ucapGetUrlParameter("instanceUnid");
		}
		if (ucapFlowFun.flowValue.docUnid == "") {
			winobj.Ext.Msg.alert("提示信息","当前是新文档，请先保存！");
			return;
		}
		if (typeof size == "undefined")
			size = "18";
		// 设置url
		var sUrl = ucapFlowSys.sUcapSystemPath + ucapFlowSys.opinionJsp+"?type="+type;

		if (typeof(type) == "undefined")
			type = "99";
		if (obj)
			_ucapOpinionValue.name = obj.innerText;
		_ucapOpinionValue.type = type;

		if (typeof(sendType) == "undefined")
			sendType = "";
		_ucapOpinionValue.sendType = sendType;
		_ucapOpinionSend.type = "";
		if (sendType == "2" || sendType == "3") {
			// 要判断当前用户是否有发送权限，如果有，则弹出发送对话框，否则不变
			_ucapOpinionSend.opinionObj = obj;
			_ucapOpinionSend.type = type;
			var requestConfig = {
				url : ucapFlowSys.sUcapSystemPath + ucapFlowSys.servlet,
				params : {
					"ucapid" : "opinionInfo",
					docUnid : ucapFlowFun.flowValue.docUnid,
					instanceUnid : ucapFlowFun.flowValue.instanceUnid
				},
				callback : function(options, success, response) {
					if (success) {
						ucapOpinion.getSend(response, sendType);
					} else {
						winobj.Ext.Msg.alert("提示", "判断当前用户是否有发送权限时出错！");
					}
				}
			}
			Ext.Ajax.request(requestConfig);
		} else {
			// 调用方法进行弹出新窗口
			this.openDialog(sUrl, height, width, size,_opinionConfirmFn);
		}
	},
	getSend : function(response, opinionSendType) {
		var result = response.responseText;
		var docs = _ucapXmlDom();
		docs.loadXML(result);
		var docRoot = docs.selectSingleNode("//doc");
		var sendType = ucapGetAttributeValue(docRoot, "sendType");
		if (sendType != "") {
			// 说明有发送权限，要弹出带意见的发送框
			if (opinionSendType == "2") {
				ucapFlowFun.sendFlow(sendType, "1");
			} else if (opinionSendType == "3") {
				ucapFlowFun.sendFlowOpinion("1");
			}
		} else {
			// 重新调用意见对话框，但把sendType从2变成1
			ucapOpinion.opinionDialog(_ucapOpinionSend.opinionObj,
					_ucapOpinionSend.type, "1");
		}
	},
	openDialog : function(url, height, width, size,_opinionConfirmFn) {
		var winobj =window.top;
		if (typeof size == "undefined")
			size = "";
		url += (url.indexOf("?")>-1)?"&":"?";
		url += "size=" + size;
		if(typeof(ucapFlowFun.flowValue.docUnid) != "undefined"){
			url=url+"&docUnid="+ucapFlowFun.flowValue.docUnid;
		}
		if(typeof(ucapFlowFun.flowValue.instanceUnid) != "undefined"){
			url=url+"&instanceUnid="+ucapFlowFun.flowValue.instanceUnid;
		}
		if (typeof height == "undefined" || height == "") {
			height = winobj.document.body.clientHeight - 150;
		}
		if (typeof width == "undefined" || width == "") {
			width = winobj.document.body.clientWidth - 120;
		}
		var button = [{
					text : "确定",
					id : "commonConfirm",
					handler : function() {
						if (typeof doOpinionOk=="undefined"){
							window.top.doOpinionOk('',undefined,_opinionConfirmFn);
						} else {
							doOpinionOk('',undefined,_opinionConfirmFn);
						}
						ucapOpinion.win.close();
					}
				}, {
					text : "取消",
					handler : function() {
						ucapOpinion.win.close()
					}
				}];
		ucapOpinion.win = new winobj.Ext.Window({
					title : ucapSession.win.winImg + "意见填写框",
					width : width,
					closable : true, // 关闭
					modal : true,
					height : height,
					maximizable : true,
					bodyStyle : ucapSession.win.winBodyStyle,
					autoLoad : {
						url : url,
						scripts : true,
						nocache : true
					},
					buttons : button
				});
		ucapOpinion.win.show();
	},
	openDialogDefault : function(url, height, width, size, _ucapNextFlowUnid,
			_ucapSendArray) {
		var winobj =window.top;
		if (typeof size == "undefined")
			size = "";
		url = url + "?size=" + size;
		if (typeof height == "undefined" || height == "") {
			height = winobj.document.body.clientHeight - 150;
		}
		if (typeof width == "undefined" || width == "") {
			width = winobj.document.body.clientWidth - 120;
		}
		var button = [{
					text : "确定",
					id : "commonConfirm",
					handler : function() {
						if (typeof doOpinionOk=="undefined"){
							window.top.doOpinionOk(_ucapNextFlowUnid, _ucapSendArray);
						} else {
							doOpinionOk(_ucapNextFlowUnid, _ucapSendArray);
						}
						ucapOpinion.win.close();
					}
				}, {
					text : "取消",
					handler : function() {
						ucapOpinion.win.close()
					}
				}];
		ucapOpinion.win = new winobj.Ext.Window({
					title : ucapSession.win.winImg + "意见填写框",
					width : width,
					closable : true, // 关闭
					modal : true,
					height : height,
					maximizable : true,
					bodyStyle : ucapSession.win.winBodyStyle,
					autoLoad : {
						url : url,
						scripts : true,
						nocache : true
					},
					buttons : button
				});
		ucapOpinion.win.show();
	}

}

function __createXmlDoc() {
	var flowXmlDoc = _ucapXmlDom();
	var head = flowXmlDoc.createProcessingInstruction("xml",
			"version='1.0' encoding='GBK'");
	flowXmlDoc.appendChild(head);
	var root = flowXmlDoc.createElement("doc");
	flowXmlDoc.appendChild(root);
	var flow = flowXmlDoc.createElement("ucapFlow");
	root.appendChild(flow);
	return flowXmlDoc;
}
function __getSendXmlDoc(nextFlowUnid, sendValueArray, endFlowUnid) {
	// 生成一个xml post 到后台
	var flowXmlDoc = __createXmlDoc();
	var flow = flowXmlDoc.selectSingleNode("//ucapFlow");
	addAttrib(flow, "nextFlowUnid", nextFlowUnid);
	addAttrib(flow, "nextFlowType", ucapFlowFun.flowValue.type);
	if (sendValueArray[0].auditType == "") {
		addAttrib(flow, "endFlowNodeUnid", sendValueArray[0].nextNodeUnid);
		return flowXmlDoc;
	} else {
		if (typeof(endFlowUnid) != "undefined" && endFlowUnid != "") {
			addAttrib(flow, "endFlowNodeUnid", endFlowUnid);
		} else {
			addAttrib(flow, "endFlowNodeUnid", "");
		}
	}
	if (sendValueArray[0].auditType == "8888") {
		// 表示是否在分流状态下发送给聚合节点，但由于是多路聚合，只能当结束分流处理
		addAttrib(flow, "isSendConvergeNodeId", "1");
		return flowXmlDoc;
	}
	addAttrib(flow, "isSendConvergeNodeId", "");
	for (var i = 0; i < sendValueArray.length; i++) {
		var sendValue = flowXmlDoc.createElement("sendValue");
		flow.appendChild(sendValue);
		var node = flowXmlDoc.createElement("nextNodeUnid");
		node.text = sendValueArray[i].nextNodeUnid;
		sendValue.appendChild(node);
		var node = flowXmlDoc.createElement("auditType");
		node.text = sendValueArray[i].auditType;
		sendValue.appendChild(node);
		var node = flowXmlDoc.createElement("nodeTransactorids");
		node.text = sendValueArray[i].nodeTransactorids;
		sendValue.appendChild(node);
		var node = flowXmlDoc.createElement("notNodeTransactorids");
		node.text = sendValueArray[i].notNodeTransactorids;
		//add by cjianyan@linewell.com 2011-5-9 之前存在由于增加了下面的判断方法，把这个给去掉了。
		sendValue.appendChild(node);
		//end
		if(typeof(sendValueArray[i].smsMsg)!="undefined"){
			var node = flowXmlDoc.createElement("smsMsg");
			node.text = "<![CDATA["+sendValueArray[i].smsMsg+"]]>";
			sendValue.appendChild(node);
			createMessageListXml(flowXmlDoc,flow,"1",node.text,"");//获取消息的列表对象
		}
		//加入发送Im消息内容的属性  add by fsm@linewell.com
		if(typeof(sendValueArray[i].imsMsg)!="undefined"){
			var node = flowXmlDoc.createElement("imsMsg");
			node.text = "<![CDATA["+sendValueArray[i].imsMsg+"]]>";
			sendValue.appendChild(node);
			createMessageListXml(flowXmlDoc,flow,"2",node.text,"");//获取消息的列表对象
		}
	}
	return flowXmlDoc;
}

/**
 * 获取消息的列表对象
 * @param {} flowXmlDoc
 * @param {} flow
 * @param {} type
 * @param {} msg
 * @param {} title
 * @param {} link
 */
function createMessageListXml(flowXmlDoc,flow,type,msg,title,link)
{
	var sendMessage = flowXmlDoc.createElement("sendMessage");
	flow.appendChild(sendMessage);
	
	var node = flowXmlDoc.createElement("type");
	node.text = type;
	sendMessage.appendChild(node);
	
	var node = flowXmlDoc.createElement("msg");
	node.text = msg;
	sendMessage.appendChild(node);
	
	var node = flowXmlDoc.createElement("title");
	node.text = title;
	sendMessage.appendChild(node);
	if(!link)
	{
		link="sys/jsp/document.jsp?type=03&formId={formId}&instanceUnid={instanceUnid}&unid={docUnid}";
	}
	var node = flowXmlDoc.createElement("link");
	node.text = link;
	
	sendMessage.appendChild(node);
}

// 获取url参数如index.htm?id=1 用ucapGetUrlParameter('id') 返回1
function ucapGetUrlParameter(name) {
	var params = location.search.slice(1).split('&');
	for (var i = 0; i < params.length; i++) {
		var temp = params[i].split("=");
		if (temp[0] == name) {
			return temp[1];
		}
	}
	return "";
}
function _ucapXmlDom() {
	// 通过对象/属性检测法，判断是IE来是Mozilla
	if (window.ActiveXObject) {
		var arrSignatures = ["MSXML2.DOMDocument.5.0",
				"MSXML2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0",
				"MSXML2.DOMDocument", "Microsoft.XmlDom"];

		for (var i = 0; i < arrSignatures.length; i++) {
			try {

				var oXmlDom = new ActiveXObject(arrSignatures[i]);

				return oXmlDom;

			} catch (oError) {
				// ignore
			}
		}

		throw new Error("MSXML is not installed on your system.");

		// 同上
	} else if (document.implementation
			&& document.implementation.createDocument) {

		var oXmlDom = document.implementation.createDocument("", "", null);

		// 创建Mozilla版本的parseError对象
		oXmlDom.parseError = {
			valueOf : function() {
				return this.errorCode;
			},
			toString : function() {
				return this.errorCode.toString()
			}
		};

		// 初始化parseError对象
		oXmlDom.__initError__();

		oXmlDom.addEventListener("load", function() {
					this.__checkForErrors__();
					this.__changeReadyState__(4);
				}, false);
		//firefox并不支持selectSingleNode和selectNodes方法;
			//下面两段是用XPath来解决firefox模拟selectSingleNode和selectNodes方法, add by fsm
            XMLDocument.prototype.selectSingleNode = Element.prototype.selectSingleNode = function (xpath){
                 var  x = this .selectNodes(xpath)   
                 if ( ! x || x.length < 1 ) return   null ;   
                 return  x[ 0 ];   
            }   
            XMLDocument.prototype.selectNodes = Element.prototype.selectNodes = function (xpath){
                 var  xpe  =   new  XPathEvaluator();   
                 var  nsResolver  =  xpe.createNSResolver( this .ownerDocument  ==   null ?
                     this .documentElement :  this .ownerDocument.documentElement);   
                 var  result  =  xpe.evaluate(xpath,  this , nsResolver,  0 ,  null );   
                 var  found  =  [];   
                 var  res;   
                 while  (res  =  result.iterateNext())   
                    found.push(res);   
                 return  found;   
            }

		return oXmlDom;

	} else {
		throw new Error("Your browser doesn't support an XML DOM object.");
	}
}
// 以下为创建通用的XML DOM 方法

var _sUserAgent = navigator.userAgent;
var _isOpera = _sUserAgent.indexOf("Opera") > -1;
var _isIE = _sUserAgent.indexOf("compatible") > -1
		&& _sUserAgent.indexOf("MSIE") > -1 && !_isOpera;
var _isKHTML = _sUserAgent.indexOf("KHTML") > -1
		|| _sUserAgent.indexOf("Konqueror") > -1
		|| _sUserAgent.indexOf("AppleWebKit") > -1;

var _isMoz = _sUserAgent.indexOf("Gecko") > -1 && !_isKHTML;
// 如果是Mozilla
if (_isMoz) {
	Document.prototype.readyState = 0;
	Document.prototype.onreadystatechange = null;

	Document.prototype.__changeReadyState__ = function(iReadyState) {
		this.readyState = iReadyState;

		if (typeof this.onreadystatechange == "function") {
			this.onreadystatechange();
		}
	};
	// 初始化parseError对象
	Document.prototype.__initError__ = function() {
		this.parseError.errorCode = 0;
		this.parseError.filepos = -1;
		this.parseError.line = -1;
		this.parseError.linepos = -1;
		this.parseError.reason = null;
		this.parseError.srcText = null;
		this.parseError.url = null;
	};

	Document.prototype.__checkForErrors__ = function() {

		if (this.documentElement.tagName == "parsererror") {

			var reError = />([\s\S]*?)Location:([\s\S]*?)Line Number (\d+), Column (\d+):<sourcetext>([\s\S]*?)(?:\-*\^)/;

			reError.test(this.xml);

			this.parseError.errorCode = -999999;
			this.parseError.reason = RegExp.$1;
			this.parseError.url = RegExp.$2;
			this.parseError.line = parseInt(RegExp.$3);
			this.parseError.linepos = parseInt(RegExp.$4);
			this.parseError.srcText = RegExp.$5;
		}
	};

	// 定义Mozilla的loadXML方法
	Document.prototype.loadXML = function(sXml) {

		this.__initError__();

		this.__changeReadyState__(1);

		var oParser = new DOMParser();
		var oXmlDom = oParser.parseFromString(sXml, "text/xml");

		while (this.firstChild) {
			this.removeChild(this.firstChild);
		}

		for (var i = 0; i < oXmlDom.childNodes.length; i++) {
			var oNewNode = this.importNode(oXmlDom.childNodes[i], true);
			this.appendChild(oNewNode);
		}

		// 载入后检查错误
		this.__checkForErrors__();

		// 没有问题，设置readyState属性为4
		this.__changeReadyState__(4);

	};

	Document.prototype.__load__ = Document.prototype.load;

	Document.prototype.load = function(sURL) {
		this.__initError__();
		this.__changeReadyState__(1);
		this.__load__(sURL);
	};

	Node.prototype.__defineGetter__("xml", function() {
				var oSerializer = new XMLSerializer();
				return oSerializer.serializeToString(this, "text/xml");
			});
}
// 为节点node增加 一属性值
function addAttrib(node, attribName, value) {
	var attrib = node.ownerDocument.createAttribute(attribName);
	attrib.value = value;
	node.setAttributeNode(attrib);
}
function ucapGetAttributeValue(node, str) { /* 取出属性值 */
	var sTr = node.getAttribute(str);
	if (sTr == null) {
		return "";
	} else {
		return sTr.trim();
	}
}
// 去掉字符串首尾空格
String.prototype.trim = function() {
	var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
	return (m == null) ? "" : m[1];
}
// 打开可视化设计器
function _ucapVisualFlow() {
	window.open(sUcapSystemPath + "jsp/common/visualflow.jsp");
}
