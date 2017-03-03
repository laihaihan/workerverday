//新增
function gAdd() {
	var treeId = "";
	var selectedNode = zTreeObj.getSelectedNodes()[0];
	if( selectedNode ) {
		treeId = selectedNode.id;
	}else{
		top.lwin.alert('信息提示','请先选中右边树形菜单某一项值','info',3500);
		return ;
	}
	top.popup.showModalDialog('/rsp/jsp/contents/contents_edit.jsp?belongto=' + treeId,'添加类目名称',viewWidth,viewHeigth);
}
//删除
function gDel(){
	del(top.appPath+'rsp/contentsAction.action','del');
}
