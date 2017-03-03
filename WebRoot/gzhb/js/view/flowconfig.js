//流程管理-新增
function gAdd() {
	var selectedNode = zTreeObj.getSelectedNodes()[0];
	if(null == selectedNode || typeof selectedNode == "undefined") {
		top.$.messager.alert('操作提示','请先选择所属模块','warning');
		return;	
	}else{
		treeId = selectedNode.id;
		treeName = selectedNode.name;
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
			top.lwin.showModalDialog('flow/flowDesigner/Main.html?appUnid='+belongToApp+'&isNew=0&flowUnid='+flowid,"流程管理",1000,500);
		}
	});
}

function gUpdateFlowInfo(){
	
	var id = "";
	var rows = $('#list').datagrid('getSelections');			
	if(rows.length == 0){
		rows = $('#list').treegrid('getSelections');	
	}
			
	if(rows.length == 0 || rows.length > 1) {
		top.$.messager.alert("操作提示","请选择一条记录进行操作");
		fadeOutMessage(2000);
		return;
	}
	var row = rows[0];
	
	id = row[golIdField];
	top.lwin.open('/core/flow/flowconfig_edit.jsp?unid='+ id,"流程基本信息",viewWidth,viewHeigth);
}


//视图双击重写
function onDblClickRow(rowIndex, rowData){

	var rows = $('#list').datagrid('getSelections');
	var row = rows[0];
	var flowid = row["FLOWID"];
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : 'flowconfig.action',
		data : {
			"fn" : 'getApp'
		},
		success : function(data){
			var belongToApp = data.belongToApp;
			top.lwin.showModalDialog('flow/flowDesigner/Main.html?appUnid='+belongToApp+'&isNew=0&flowUnid='+flowid,"流程管理",1000,500);
		}
	});
}