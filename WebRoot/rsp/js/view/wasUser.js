
//新增
function gAdd() {
	var treeId = "";
	var selectedNode = zTreeObj.getSelectedNodes()[0];
	if( selectedNode ) {
		treeId = selectedNode.id;
	}else{
		top.lwin.alert('信息提示','请选择地区','info',1500);
		return ;
	}
	top.popup.showModalDialog('rsp/jsp/was/user/was_user_edit.jsp?siteid=' + treeId,'个人/企业入库',viewWidth,viewHeigth);
}

//删除
function gDel(){
	del(top.appPath+'rsp/wasUserAction.action','del');
}
