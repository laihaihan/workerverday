//新增
function executeTask() {
	var rows = $('#list').datagrid('getSelections');
	if(rows.length == 0){
		rows = $('#list').treegrid('getSelections');	
	}
	
	if(rows.length > 0){
		alert("执行成功");	
	}else{
		top.lwin.alert("信息提示","请选择一个要执行的定时任务","warning",1500);
	}
	
}

/**
* 说明：清除定时任务执行的次数
**/
function clearExecutedCount(){
	var rows = $('#list').datagrid('getSelections');
	if(rows.length == 0){
		top.lwin.alert("消息","请至少选择一个要清除的任务！","info");
		return;
	}
	if(rows.length > 0){
		var unids = "";
		for(var i = 0; i < rows.length; i++){
			if(i == rows.length - 1){
				unids += rows[i]['UNID'];
			} else {
				unids += (rows[i]['UNID'] + ",");
			}
		}
		$.ajax({
			type : 'post',
			dataType : 'json',
			url : 'TaskScheduling.action',
			data : {
				'fn' : 'clearCount',
				'unids' : unids
			},
			success : function(data){
				if(data.result){
					top.lwin.alert("消息","清除定时任务执行次数成功！","info");
					top.tabs.refreshTabGrid();
				} else {
					top.lwin.alert("消息","清除定时任务执行次数失败！","error");
				}
			},
			error : function(){
				top.lwin.alert("消息","清除定时任务执行次数失败！","error");
			}
		});
	}
}
