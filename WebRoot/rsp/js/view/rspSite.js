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
	top.popup.showModalDialog('rsp/jsp/site/rsp_site_edit.jsp?belongto=' + treeId,'站点配置',viewWidth,viewHeigth);
}

//删除
function gDel(){
	del(top.appPath+'rsp/rspSiteAction.action','del');
}
