function iniFlow(){
	
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
	
	top.lwin.open('/core/flow/iniflow.jsp?unid='+ id + '&modId='+modId,"流程初始化",viewWidth,viewHeigth);
}



function flowwork(){
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
	
	top.lwin.open('/core/flow/document/document.jsp?unid='+ id,"流程初始化",800,600);
}