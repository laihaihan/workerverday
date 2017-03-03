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
	$.ajax({
		type:'post',
		url:"xinzenghuibao.action?unid="+ id+ "&modId="+modId+"&fn=iniFlow",
		async:false,
		error:function(){
			top.lwin.errorService();
		},
		success:function(html){
			top.lwin.alert('信息提示','操作成功','info',1500);
			//top.tabs.refreshTabGrid();
			window.location.reload();
		}
	});
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