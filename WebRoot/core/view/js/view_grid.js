///////////////////////////////////////视图内部调用//////////////////////////////////////////////
//获取选中行的id
function getId(){
	var id = "";
	var rows = $('#list').datagrid('getSelections');
	if(rows.length==1){
		id = rows[0][golIdField];
	}else{
		top.popup.alert("信息提示","请选择一行进行操作！","warning",1500);
	}
	return id;
}

//通用刷新
function gReload(){
	jQuery(".pagination-load").click();
	refreshTree();
}

//通用新增方法
function gAdd(){			
	top.lwin.open(view.openContent+"&"+queryString,view.name,viewWidth,viewHeigth);
}

//通用删除方法
function gDel(){
	del(view.alias+'.action','del');			
}

//通用视图双击
function onDblClickRow(rowIndex, rowData){
	if(view.openContent && view.openContent.length>0 && view.openType=='1'){
		top.lwin.open(view.openContent+rowData[idField],view.name,viewWidth,viewHeigth);
	}
}




//导出数据
function onExp(){
	var rows = getSelections();
	if(rows.length <= 0){
		top.lwin.alert('信息提示','请选择至少一行进行操作','warning',1500);
	}else{
		var ids = "";
		for(var i=0;i<rows.length;i++){
			ids = ids+"'"+rows[i][golIdField]+"'";
			if(i<rows.length-1){
				ids+=",";
			}
		}	
		window.open(top.appPath+'core/view/view_exp.jsp?ids='+ids+"&_rand="+Math.random());
	}
}

//导入数据
function onImport(){
	top.lwin.open('core/view/view_imp.jsp','导入视图数据',480,300);
}

/*
 * 搜索
*/
var search = {
	/*
	 * 初始化搜索框
	*/
	init:function(type){
		if(type==1){
			var clone = jQuery("#s_div").clone(true);
			jQuery("#s_div").remove();
			clone.css("display","");
			
			jQuery(".datagrid-toolbar").append(clone);
			
			
			//2.绑定事件
			jQuery("#_kw").bind("click",function(){
				jQuery(this)[0].select();
				//jQuery(this).val("");
			});
			jQuery("#_field").bind("click",function(){
				
			});			
		}
	},
	searchSimple:function(){
		var _kw = jQuery("#_kw").val();
		var _field = jQuery("#_field").val();
		
		if(_kw=='请输入关键字'){
			top.jQuery.messager.alert("信息提示","请输入关键字","info");
			fadeOutMessage(1000);
		}else{
			jQuery('#list').datagrid("load",{
				fn:'grid_list',
				viewId:viewId,
				_kw:_kw,
				_field:_field,
				_search:"1",
				ID:getTreeId(),
				onLoadSuccess:function(){
					setTimeout(function(){
						jQuery(".datagrid-body .datagrid-cell").highlight(_kw);
					},500);
					
				}
			});	
		}			
	},
	displayAdvanced:function(){
		jQuery('#advanced').toggle('fast');
	}
}


jQuery(function(){
	search.init(1);
	
	jQuery("#_kw").autocomplete("view.action?viewId="+view.unid+"&fn=FieldAutoComplete", {
		width: 250,
		extraParams:{
				_field:jQuery('#_field option:eq(0)').val()
		}
	});
	
	
	jQuery('#_field').bind('change',function(){
		jQuery("#_kw").setOptions({
			extraParams:{
				_field:jQuery('#_field').val()
			}
		});
		jQuery("#_kw").flushCache();
	});
	
	jQuery("#_kw").keydown(function(event){
		switch(event.keyCode) {
	    	case 13:{
	    		search.searchSimple();
	    		break;
	    	}
	    	default:{
	    		
	    	}
		}
	});	
	
	
	jQuery('#s_btn_close').click(function(){
		jQuery('#advanced').hide('fast');
	});
	
	jQuery(window).resize(function(){
		setTimeout(function(){
			location.href=location.href;
			/*
			jQuery('#list').datagrid('resize', {
				width:document.body.clientWidth-6,
				height:document.body.clientHeight-6,
				pageSize:getPageSize()
			});
			*/	
		},300);
	});
});

//获取表单值
function getFieldVal(name){
	var val = '';
	
	//文本框
	var text = jQuery('#advanced :text[name='+name+']');
	if( text.length>0){
		val = text.val();
	}
	
	//单选框
	var radio = jQuery('#advanced :radio[name='+name+']:checked');
	if( radio.length>0){
		val = radio.val();
	}
	
	//下拉框
	var select = jQuery('#advanced select[name='+name+'] option:selected');
	if( select.length>0){
		val = select.val();
	}
	
	return val;
}

//弹出消息窗淡出
function fadeOutMessage(time){
	setTimeout(function(){
		top.jQuery('.window').fadeOut('slow');
		top.jQuery('.window-shadow').fadeOut('fast');
		top.jQuery('.window-mask').fadeOut('fast');
	},time);
}

function onExpTable(){			
	expTable.showFiled();
}


/**
 * 表格导出
*/
var expTable = {
	showFiled:function(){
		var text = "<div id=\"tableExp\" style=\"border:1px solid #7DAAD4;background:#E3EEFB;position:absolute;z-index:9999;width:480px;height:296px;top:40px;left:50%;margin-left:-240px;\">";
		
		jQuery('.datagrid-header-inner table tbody tr td').each(function(index){
			var title = jQuery(this).text().replace(/^\s+|\s+jQuery/g,"");
			if(title != '' && title.length > 1){
				text += "<label><input type='checkbox' class='exp-title' checked='true' index='"+index+"' text='"+jQuery(this).text()+"' value='"+jQuery(this).attr('field')+"'>"+jQuery(this).text()+"</label>";
			}			
		});
		
		text+="<div style='position:absolute;bottom:15px;'>";
		text+="<input type='button' value='导出' onclick='expTable.expExcel()'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		text+="<input type='button' value='关闭' onclick='jQuery(\"#tableExp\").remove()'>";
		text+="</div>";
		
		text+="</div>";
		jQuery('body').append(text);
	},
	expExcel:function(){
		//1.表头
		var headers = '';
		jQuery('.exp-title:checked').each(function(index){
			var text = jQuery.trim(jQuery(this).attr('text'));
			headers += (index==0?text:','+text);
		});
		
		//2.字段
		var fields = '';
		jQuery('.exp-title:checked').each(function(index){
			var val = jQuery.trim(jQuery(this).val());
			fields += (index==0?val:','+val);
		});
		
		//3.生成Excel
		var viewunid = view.unid;
		window.open(top.appPath +'/core/view/view_grid_exp.jsp?headers='+encodeURI(headers)+'&fields='+encodeURI(fields)+'&_rand='+Math.random()+'&viewunid='+viewunid);
	}
}
//获取 datagrid.pageSize 每页显示条数
function getPageSize(rowHeight){
	if(rowHeight==undefined){
		rowHeight = 26;
	}
	var height = jQuery(document).height()-90;
	return parseInt(height/rowHeight);
}
//获取 datagrid.pageList 
function getpageList(){
	return [10,20,30,40,50,getPageSize()];
}
//删除操作
function del(url,fn){
	var listId = 'list';
	var ids = '';
	var rows = jQuery('#'+listId+'').datagrid('getSelections');
	if(rows.length == 0){
		rows = jQuery('#'+listId+'').treegrid('getSelections');
	}
	if(rows==''){
		top.jQuery.messager.alert("信息提示","请至少选择一项,再进行操作","info");
		fadeOutMessage(1000);
	}else{
		top.jQuery.messager.confirm('操作提示', '您确定删除该项吗?', function(r){
			if (r){
				for(var i=0;i<rows.length;i++){
					ids = ids+"'"+rows[i][golIdField]+"'";
					if(i<rows.length-1){
						ids+=",";
					}
				}
				jQuery.ajax({
					url:url,
					type:"post",
					dataType:'json',
					data:{
						ids:ids,
						fn:fn
					},
					success:function(responseText){
						if(responseText!=null && (responseText.success || responseText.result || responseText==true) ){
							top.jQuery.messager.alert("信息提示","删除成功","info");						
							fadeOutMessage(1000);
							top.tabs.refreshTabGrid();
							
						}else{
							top.jQuery.messager.alert("信息提示","删除失败","error");	
						}						
					},
					error:function(responseText){
						top.lwin.errorService();
					}
				});
			}
		});		
	}
}

function expExcelForJs(){
	$('.datagrid-view1').remove();
	var curTbl = $('.datagrid-view')[0];
	var oXL = new ActiveXObject("Excel.Application");//创建AX对象excel
	var oWB = oXL.Workbooks.Add();//获取workbook对象
	var oSheet = oWB.ActiveSheet;//激活当前sheet
	
	var sel = document.body.createTextRange();
	sel.moveToElementText(curTbl);//把表格中的内容移到TextRange中
	sel.select();//全选TextRange中内容
	sel.execCommand("Copy");//复制TextRange中内容
	
	oSheet.Paste();//粘贴到活动的EXCEL中
	oXL.Visible = true;//设置excel可见属性
}