//新增
function gAdd() {
	var treeId = "";
	var treeName = "";
	var selectedNode = zTreeObj.getSelectedNodes()[0];
	if(null == selectedNode || typeof selectedNode == "undefined") {
		top.$.messager.alert('操作提示','请先在<font color="red">左侧</font>模型','warning');
		return;	
	}else{
		treeId = selectedNode.id;
		treeName = selectedNode.name;
	}
	top.lwin.open('core/jsp/appmaterial/appmaterial_edit.jsp?punid=' + treeId,view.name,viewWidth,viewHeigth);
}