//新增
function gAdd() {
	var frameid=self.frameElement.getAttribute('id');
	var viewId='1875EB99AA0651844E1B2B5A7D213B78'
	top.popup.showModalDialog('rsp/jsp/was/applyInfo/select_service.jsp?frameid='+frameid+"&viewId="+viewId,'请选择事项',viewWidth,viewHeigth);
}

//删除
function gDel(){
	del(top.appPath+'rsp/wasInfoAction.action','del');
}
