/**
 * 视图对外方法
*/

//获取选中树节点id
function getTreeId(){
	var id;
	if(zTreeObj){		
		var selectedNode = zTreeObj.getSelectedNodes()[0];
		if(selectedNode){
			id = selectedNode.id;
		}
	}
	return id;
}

/**
 * 获取视图选中行
 * 如获取一行
**/
function getSelections(){
	var rows = jQuery('#list').datagrid('getSelections');
	if(rows.length == 0){
		rows = $('#list').treegrid('getSelections');	
	}
	return rows;
}

/**
 * 获取当前页行
 */
 
 function getRows(){
 	var rows = jQuery('#list').datagrid('getRows');
	return rows;
 }
 
 /**
 * 获取当前索引row
 */
 
 function getRow(index){
 	var row;
 	
 	var rows = jQuery('#list').datagrid('getRows'); 	
 	if(rows.length>index){
 		row = rows[index];
 	}
 	
	return rows[index];
 }
