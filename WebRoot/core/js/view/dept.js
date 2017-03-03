//通用视图双击
function onDblClickRow(rowIndex, rowData){
	if(view.openContent && view.openContent.length>0 && view.openType=='1'){
		//根据所选记录页面标题字段，显示记录页面窗口标题
		var viewName = "";
		if(typeof(view.editTitle) == "undefined" || view.editTitle == null || view.editTitle == ""){
			viewName = view.name;
		} else {
			viewName = eval("rowData." + view.editTitle);
		}
		top.lwin.open(view.openContent+rowData[idField]+"&"+queryString,viewName,viewWidth,viewHeigth);
	}
}

//通用删除方法
function gDel(){
	del(view.alias+'.action?app_unid='+appUnid,'del');			
}

/**
 * 说明： 部门是否启用列转换函数
 * 参数： val 当前值
 */
 function isEnabled(val){
 	if(val == '0'){
 		return '禁用';
 	} else if(val == '1'){
 		return '启用';
 	}
}

/**
 * 说明： 部门是否业务部门列转换函数
 * 参数： val 当前值
 */
 function isBusiness(val){
 	if(val == '0'){
 		return '否';
 	} else if(val == '1'){
 		return '是';
 	}
}