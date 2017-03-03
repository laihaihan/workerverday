//来源类型
function typeRender(value){
	if('01' == value){
		value = 'URL';
	}else if('02' == value){
		value = '视图';
	}
	return value;
}

//新增
function gAdd() {
	var treeId = "";
	var treeName = "";
	var selectedNode = zTreeObj.getSelectedNodes()[0];
	if(null == selectedNode || typeof selectedNode == "undefined") {
		top.$.messager.alert('操作提示','请先在<font color="red">左侧</font>选择角色','warning');
		return;	
	}else{
		treeId = selectedNode.id;
		treeName = selectedNode.name;
	}
	top.lwin.open('core/jsp/shouyepeizhi/shouyepeizhi_edit.jsp?roleId=' + treeId+"&roleName="+encodeURIComponent(encodeURIComponent(treeName)),view.name,viewWidth,viewHeigth);
}