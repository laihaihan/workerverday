/**
 * 复制当前文档，包含多页签
 */
function copyResource() {

	var formId = ucapCommonFun.getUrlParameter("formId");
	var formType = ucapCommonFun.getUrlParameter("type");
	var unid = ucapCommonFun.getUrlParameter("unid");

	var requestConfig = {
		url : ucapSession.baseAction,
		params : {
			"type" : "copyAction",
			"formId" : formId,
			"formType" : formType,
			"unid" : unid
		},
		callback : function(options, success, response) {
			if (success) {
				var exjson = Ext.util.JSON.decode(response.responseText);
				if (exjson.result || exjson.result == "true") {
					var lh = location.href.replace(/([&]*unid=[\w]*)/ig,
							"unid=" + exjson.unid);
					window.open(lh);
					Ext.Msg.alert("提示", exjson.msg);

				} else {
					Ext.Msg.alert("错误信息", exjson.msg);
				}
			} else {
				Ext.Msg.alert("错误信息", "复制失败，请检查网络！");
			}
		}
	}
	Ext.Ajax.request(requestConfig);
}

/**
 * 应用系统指派相关的逻辑实现
 * @type 
 */
var appAssign = {
	initAssign:function(unitId,unitAdminId,deptName,unid){
		var html="sys/cfgJsp/unit/selectAssignApp.jsp?unitId="+unitId+"&unitAdminId="+unitAdminId;
		var button=[
			{text:"确定",handler:function(){
				var appId = $("appId").value;
				var requestConfig ={
					url:ucapSession.baseAction,
					params:'type=managerAction&act=isCreate&unitId='+unitId+"&unitAdminId="+unitAdminId+"&appId="+appId,
					callback:function(options,success,response){
							if (success){
								var flag = response.responseText;
								if(flag=="false"){
									appAssign.selectConfirm(deptName,unid);
									win.close();
								}
								else{
									alert("此应用服务已经提供给此单位，请选择其它应用系统或退出！");
								}
							}
					}
				};
				Ext.Ajax.request(requestConfig);
//				appAssign.selectConfirm(deptName);
				}},
			{text:"取消",
					handler:function(){win.close()}
			}];
		var win = ucapSession.commonWin = new Ext.Window({
			title:ucapSession.win.winImg+"指派应用系统",
		    width:650,
		    closable:true,    //取消
		    modal: true,     
			height:260,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			//html:ucapSession.win.getIframeHtml("viewInfoConfig",html),
			buttons:button
		});
		ucapSession.commonWin.show();
	},
	
	/**
	 * 初始化可选择的应用系统
	 */
	initSelectApp : function() {
		var url = ucapSession.baseAction;
		url += "?act=getAssignApp&type=managerAction&rand=" + Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);

		var appSelect = Ext.getDom("appId");
		if (null != json && null != json.apps) {
			for (var i = 0; i < json.apps.length; i++) {
				var appJson = json.apps[i];
				ucapCommonFun.addOption(appSelect, appJson.unid, appJson.name);
			}
		}
	},
	
	selectConfirm:function(deptName,unid){
		var unitId = Ext.getDom("unitId").value;
		var unitAdminId = Ext.getDom("unitAdminId").value;
		var appId = Ext.getDom("appId").value;
		var html="sys/cfgJsp/proxool/proxool.jsp?unitId="+unitId+"&unitAdminId="+unitAdminId+"&unid="+appId;
		var button=[
			{text:"确定",handler:function(){
				window.top.proxoolFun.valModify(deptName,"",win,unid);
				}},
			{text:"取消",
					handler:function(){win.close()}
		}];
		var win = ucapSession.commonWin = new window.top.Ext.Window({
			title:ucapSession.win.winImg+"指定业务库",
		    width:650,
		    closable:true,    //取消
		    modal: true,     
			height:400,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			//html:ucapSession.win.getIframeHtml("viewInfoConfig",html),
			buttons:button
		});
		ucapSession.commonWin.show();
	}
};