/**
 * 配置日志的相关操作
 * 
 * @type 
 */
var configLog = {
   	/**
	 * 配置信息导出
	 */
	exportLog:function(){
		//首先看下有没有选中记录的，有的话就按照选中的记录进行导入
		var str="";
		if(view.viewBaseInfos[view.index].viewType!="02" && view.viewBaseInfos[view.index].viewType!="03"){
			var grid = Ext.getCmp(view.namePrefix+view.index);
			var selectedRow = grid.getSelectionModel().getSelections();
			if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
			for(var i=0;i<selectedRow.length;i++){
				var row = selectedRow[i];
				str+=","+row.data[grid.getColumnModel().getDataIndex(1)];
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
		str = str.substring(1);
		
		if(null!=str && str!=""){
			configLogFun.exportUnids(str);
			return;
		}
	
		var html="sys/cfgJsp/configLog/export.jsp";
		var button=[
					{text:"确定",handler:function(){configLogFun.exportSet()}},
					{text:"取消",
					handler:function(){ucapSession.commonWin.close()}
					}];
		ucapSession.commonWin = new Ext.Window({
			title:ucapSession.win.winImg+"导出信息设置",
		    width:650,
		    closable:true,    //取消
		    modal: true,     
			height:180,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapSession.commonWin.show();

		
	},
	
	/**
	 * 配置信息导入
	 */
	importLog:function(){
		var html="sys/cfgJsp/configLog/import.jsp";
		var button=[
					{text:"确定",handler:function(){configLogFun.doImport()}},
					{text:"取消",
					handler:function(){ucapSession.commonWin.close()}
					}];
		ucapSession.commonWin = new Ext.Window({
			title:ucapSession.win.winImg+"导入信息设置",
		    width:650,
		    closable:true,    //取消
		    modal: true,     
			height:150,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapSession.commonWin.show();
	},
	
	/**
	 * 配置信息执行
	 */
	execute:function(){
		//首先看下有没有选中记录的，有的话就按照选中的记录进行导入
		var str="";
		if(view.viewBaseInfos[view.index].viewType!="02" && view.viewBaseInfos[view.index].viewType!="03"){
			var grid = Ext.getCmp(view.namePrefix+view.index);
			var selectedRow = grid.getSelectionModel().getSelections();
			if(null==selectedRow.length || undefined==selectedRow.length)selectedRow = new Array(selectedRow);
			for(var i=0;i<selectedRow.length;i++){
				var row = selectedRow[i];
				str+=","+row.data[grid.getColumnModel().getDataIndex(1)];
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
		str = str.substring(1);
		
		if(null!=str && str!=""){
			configLogFun.executeUnids(str);
			return;
		}
		var html="sys/cfgJsp/configLog/excute.jsp";
		var button=[
					{text:"确定",handler:function(){configLogFun.executeSet()}},
					{text:"取消",
					handler:function(){ucapSession.commonWin.close()}
					}];
		ucapSession.commonWin = new Ext.Window({
			title:ucapSession.win.winImg+"执行信息设置",
		    width:650,
		    closable:true,    //取消
		    modal: true,     
			height:200,
			bodyStyle:ucapSession.win.winBodyStyle,
			autoLoad:{url:ucapSession.appPath+html,scripts:true,nocache: true},
			buttons:button
		});
		ucapSession.commonWin.show();
	}
}

var configLogFun={
	
	/**
	 * 有选中记录的情况
	 * 
	 * @param {} json
	 */
	exportUnids:function(unids){
		var json = null;
		
		if("undefined"!=typeof(unids) && unids!=""){
			json = "{unids:'"+unids+"'"+"}";
		}
		json = Ext.decode(json);
		configLogFun.doExport(json);
		
	},
	
	/**
	 * 有选中记录的情况
	 * 
	 * @param {} json
	 */
	exportSet:function(){
		var json = ucapCommonFun.getFormJSon("expDialogHtml");
		configLogFun.doExport(json);
		
	},
	executeUnids:function(unids){
		var json = null;
		
		if("undefined"!=typeof(unids) && unids!=""){
			json = "{unids:'"+unids+"'"+"}";
		}
		json = Ext.decode(json);
		configLogFun.doExecute(json);
	},
	executeSet:function(){
		var json = ucapCommonFun.getFormJSon("exeDialogHtml");
		configLogFun.doExecute(json);
	},
	
	/**
	 * 执行导出
	 * 
	 * @param {} json
	 */
	doExport:function(json){
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"configLog","action":"export","tmp":ucapCommonFun.getRandomString()},
			jsonData:json,			
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);
					if(exjson.result || exjson.result=="true"){
						Ext.Msg.alert("提示",exjson.msg);
						if(ucapSession.commonWin){
							ucapSession.commonWin.close();
						}
					}else{
						Ext.Msg.alert("提示",exjson.msg);
					}
				} else {
					Ext.Msg.alert("提示","导出不成功！");
					if(ucapSession.commonWin){
							ucapSession.commonWin.close();
						}
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 执行导入
	 */
	doImport:function(){
		var json = ucapCommonFun.getFormJSon("impDialogHtml");
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"configLog","action":"import","tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					if(exjson.result || exjson.result=="true"){
						Ext.Msg.alert("提示",exjson.msg);
						if(ucapSession.commonWin){
							ucapSession.commonWin.close();
						}
					}else{
						Ext.Msg.alert("提示",exjson.msg);
					}
				} else {
					Ext.Msg.alert("提示","导入不成功！");
					if(ucapSession.commonWin){
							ucapSession.commonWin.close();
						}
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	
	/**
	 * 执行导入
	 */
	doExecute:function(json){		
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"configLog","action":"excute","tmp":ucapCommonFun.getRandomString()},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					if(exjson.result || exjson.result=="true"){
						Ext.Msg.alert("提示",exjson.msg);
						if(ucapSession.commonWin){
							ucapSession.commonWin.close();
						}
					}else{
						Ext.Msg.alert("提示",exjson.msg);
					}
				} else {
					Ext.Msg.alert("提示","执行不成功！");
					if(ucapSession.commonWin){
							ucapSession.commonWin.close();
						}
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	}
}