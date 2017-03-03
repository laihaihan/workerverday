/**
 * 说明： 重写视图的新增方法，添加树形节点的id值参数传递
 */
function gAdd() {
	var treeId = "";
	var selectedNode = zTreeObj.getSelectedNodes()[0];
	if(null == selectedNode || typeof selectedNode == "undefined") {
		top.$.messager.alert('操作提示','请先在<font color="red">左侧</font>应用系统树中选择节点','warning');
		return;	
	}else{
		treeId = selectedNode.id;
	}
	top.lwin.open('core/buttonapplication/buttonapplication_edit.jsp?roleunid=' + treeId,view.name,viewWidth,viewHeigth);
}

/**
 * 说明： 通用视图双击方法
 * 参数： rowIndex 当前行下标
 *      rowData  当前记录数据集合
 */
function onDblClickRow(rowIndex, rowData){
	var treeId = "";
	var selectedNode = zTreeObj.getSelectedNodes()[0];
	if(null == selectedNode || typeof selectedNode == "undefined") {
		top.$.messager.alert('操作提示','请先在<font color="red">左侧</font>应用系统树中选择节点','warning');
		return;	
	}else{
		treeId = selectedNode.id;
	}
	if(view.openContent && view.openContent.length>0 && view.openType=='1'){
		top.lwin.open(view.openContent+rowData[idField] + '&roleunid=' + treeId,view.name,viewWidth,viewHeigth);
	}
}

/**
 * 说明： 导航栏按钮类型列转换函数
 * 参数： val 当前值
 */
function getButtonType(val){
	if(val == '4'){
		return '<span>导航栏按钮</span>';
	}
}

/**
 * 说明： 导航栏图片样式列转换函数
 * 参数： val 当前值
 */
function getImgStyle(val){
	if(val == '0'){
		return '<span>小图标</span>';
	} else if(val == '1'){
		return '<span>大图标</span>';
	}
}

/**
 * 说明： 导航栏图标显示列转换函数
 * 参数： val 当前值
 */
function getDisplayImg(val){
	if(val == '0'){
		return '<span>文字</span>';
	} else if(val == '1'){
		return '<span>图标</span>';
	}
}

/**
 * 说明： 导航栏按钮种类列转换函数
 * 参数： val 当前值
 */
function getButtonKind(val){
	if(val == '0'){
		return '<span>默认</span>';
	} else if(val == '1'){
		return '<span>自定义</span>';
	}
}