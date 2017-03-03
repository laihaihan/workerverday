//流程管理-新增
function gAdd() {
	var selectedNode = zTreeObj.getSelectedNodes()[0];
	var nodes = zTreeObj.getNodes();
	if(nodes.length == 1 && (nodes[0]).name == '当前无可选项'){
		top.$.messager.alert('操作提示','请先到《部门管理》中增加部门','warning');
		return;
	} else {
		if(null == selectedNode || typeof selectedNode == "undefined") {
			top.$.messager.alert('操作提示','请先选择所属部门','warning');
			return;	
		}else{
			treeId = selectedNode.id;
			treeName = selectedNode.name;
		}
	}
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : 'flowconfig.action',
		data : {
			"punid" : treeId,
			"name" : treeName,
			"fn" : 'add'
		},
		success : function(data){
			var flowid = data.flowid;
			var belongToApp = data.belongToApp;
			top.lwin.showModalDialog(view.openContent+"&"+queryString+"&treeId="+treeId,"用户管理",800,400);
		}
	});
}

//通用视图双击
function onDblClickRow(rowIndex, rowData){
	if(view.openContent && view.openContent.length>0 && view.openType=='1'){
		//根据所选记录页面标题字段，显示记录页面窗口标题
		var viewName = "";
		if(typeof(view.editTitle) == "undefined" || view.editTitle == null || view.editTitle == ""){
			viewName = view.name;
		} else {
			viewName = eval("rowData." + view.editTitle);
		}
		top.lwin.open(view.openContent+rowData[idField]+"&"+queryString,viewName,viewWidth,viewHeigth);
	}
}

//通用删除方法
function gDel(){
	del(view.alias+'.action?app_unid='+appUnid,'del');			
}