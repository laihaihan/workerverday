function gLook(){
	
	var id = "";
	var rows = $('#list').datagrid('getSelections');			
	if(rows.length == 0){
		rows = $('#list').treegrid('getSelections');	
	}
			
	if(rows.length == 0) {
		top.$.messager.alert("操作提示","请选择一条记录进行操作");
		fadeOutMessage(2000);
		return;
	}
	
	if( rows.length > 1)
	{
	    top.$.messager.alert("操作提示","请只选择一条记录进行操作");
		fadeOutMessage(2000);
		return;
	}
	var row = rows[0];
	
	id = row[golIdField];
	
			$.ajax({
		url : "staff.action",
		dataType : "json",
		async : false,
		type : "post",
		
		data : {
			fn : "checkini",
			docunid: id
		},
		success:function(data){  
		if(data.result){
		top.lwin.open('/staffwork/jsp/staff/afterini.jsp?unid='+ id,"流程初始化",viewWidth,viewHeigth);
		}
		else{
		top.lwin.open('/staffwork/jsp/staff/beforeini.jsp?unid='+ id,"流程初始化",viewWidth,viewHeigth);
		
		}
        } 		
	
		
	
	});
}

function gDel(){

var id = "";
	var rows = $('#list').datagrid('getSelections');			
	if(rows.length == 0){
		rows = $('#list').treegrid('getSelections');	
	}
			
	if(rows.length == 0) {
		top.$.messager.alert("操作提示","请选择一条记录进行操作");
		fadeOutMessage(2000);
		return;
	}
	
	if( rows.length > 1)
	{
	    top.$.messager.alert("操作提示","请只选择一条记录进行操作");
		fadeOutMessage(2000);
		return;
	}
	var row = rows[0];
	
	id = row[golIdField];
	
			$.ajax({
		url : "staff.action",
		dataType : "json",
		async : false,
		type : "post",
		
		data : {
			fn : "checkini",
			docunid: id
		},
		success:function(data){  
		if(data.result){
		alert("已经初始化流程的表单无法删除");
		}
		else{
		del('staff.action','del');		
		
		}
        } 		
	
		
	
	});

}

function gApply(){
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
		url : "staff.action",
		dataType : "json",
		async : false,
		type : "post",
		
		data : {
			fn : "checkini",
			docunid: id
		},
		success:function(data){  
		if(data.result){
		alert("已经流程初始化");
		}
		else{
		
		$.ajax({
		url : "staff.action",
		dataType : "json",
		async : false,
		type : "post",
		
		data : {
			fn : "iniflow",
			unid: id
		},
		success:function(data){  
		
		top.$.messager.alert("操作提示","流程配置操作成功");
		
        }  
     });
		
		}
        } 		
	
		
	
	});
}

function onDblClickRow(rowIndex,rowData){

var id = rowData["UNID"];

			$.ajax({
		url : "staff.action",
		dataType : "json",
		async : false,
		type : "post",
		
		data : {
			fn : "checkini",
			docunid: id
		},
		success:function(data){  
		if(data.result){
		
		top.lwin.open('/staffwork/jsp/staff/afterini.jsp?unid='+ id,"流程初始化",viewWidth,viewHeigth);
		}
		else{
		top.lwin.open('/staffwork/jsp/staff/beforeini.jsp?unid='+ id,"流程初始化",viewWidth,viewHeigth);
		
		}
        } 		
	
		
	
	});
}

