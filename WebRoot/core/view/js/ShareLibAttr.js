/**
 * 新增
*/
function gAdd(){
	var selectedNode = zTreeObj.getSelectedNodes()[0];
	if(null == selectedNode || typeof selectedNode == "undefined") {
		$.messager.alert('提示信息','请先选择所属用户！');
		return;
	}else if(selectedNode.id == "0"){
		$.messager.alert('提示信息','不能选择顶级节点！');
		return;
	}
	var userunid = selectedNode.id;
	top.popup.showModalDialog('/core/sharelib/sharelib_attr_edit.jsp?userunid=' + userunid,view.name,viewWidth,viewHeigth);
}