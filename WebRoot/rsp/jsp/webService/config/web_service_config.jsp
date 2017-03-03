<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.core.view.View"%>
<%@page import="com.linewell.core.view.ViewManager"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.view.column.Column"%>
<%@page import="com.linewell.core.view.button.ButtonManager"%>
<%@page import="com.linewell.core.view.query.QueryManager"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/core/params.jsp" %>
<%
	//String viewId = request.getParameter("viewId");
	//String title = request.getParameter("title");

	//ViewManager viewManager = new ViewManager();
	//ButtonManager btnManager = new ButtonManager();
	
	//View view = viewManager.getView(viewId);
	
	//request.setAttribute("view",view);
	//request.setAttribute("idColumn",viewManager.getIdColumn(viewId));
	//request.setAttribute("columnList",viewManager.getColumnList(viewId));
	//request.setAttribute("queryList",QueryManager.getInstance().doFindByViewId(viewId));
	//request.setAttribute("btnList",btnManager.getBtnList());
	//request.setAttribute("subBtnList",btnManager.getSubBtnList(viewId));
	
	//List<Column> columnList = viewManager.getColumnList(viewId);
	
	Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
	App app = ucapSession.getApp();
	request.setAttribute("jndi",app.getUnid());
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
	<title>视图配置</title>
	
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
	${import_jquery}
	${import_easyui}
	${import_autocomplete}	
	${import_validation}
	${import_theme}	
	<script type="text/javascript" src="${corejs}/lw-ui/load.js"></script>
	<script type="text/javascript" src="${corejs}/gb2py.js"></script>
</head>

<body bgcolor="#ECF2FE">

	<div id="tabs" class="easyui-tabs" fit="true" border="true" style="heigth:500px">
	
		<div title="基本信息" style="overflow: hidden;">
			<%@include file="web_service_config_baseinfo.jsp" %>
		</div>
		
		<div title="数据配置" style="overflow: hidden;">
			<%@include file="web_service_config_sql.jsp" %>
		</div>
		<div title="预览" style="overflow: hidden;">
			<%@include file="web_service_config_sql.jsp" %>
		</div>
		
	</div>
	
	<script type="text/javascript">
	var viewUnid = '${view.unid}';
	var columns = '';
	
	$(function(){
		
		//绑定视图类型事件
		$(':radio[name=type]').bind('click',function(){
			if($(this).val() == 1){
				$('#treeUrl').show();
			}else{
				$('#treeUrl').hide();
			}
		});
		
		//step配置步骤按钮绑定事件
		$(".step").bind("click",function(){
			var ref = $(this).attr("ref");
			$("#tabs").tabs("select",ref);
		});
		
		//保存关闭按钮
		$('.stepover').bind('click',function(){
			$('#baseForm').ajaxSubmit({
				async:false,
				dataType:'json',
				cache:false,
				error:function(){
					alert('保存失败');
				},
				success:function(result){
					if(result.success){
						top.lwin.close(true);
					}else{
						alert('保存失败');
					}
				}
			}); 
		});
		$('.close').bind('click',function(){
			$('#filed').window('close');
		});
		
		//为idField绑定保存事件
		$(':radio[name=rownumbers]').click(function(){
			saveIdField();
		});
		$(':radio[name=checkbox]').click(function(){
			saveIdField();
		});
		$('#idField').change(function(){
			saveIdField();
		});
		
		$('#btnSave').click(function(){
			btnSave();
		});
		$('#btnUpdate').click(function(){
			btnUpdate();
		});
		
		$(':radio[name=sourceType]').click(function(){
			if($(this).val()==3){
				$('#tr_dataClass').show();
			}else{
				$('#tr_dataClass').hide();
			}
		});
		
		//按钮事件
		bindButtonList();
		
		//删除字段
		delField();
		
		$('#field').change(function(){
			if($(this).val().indexOf('_null')==0 || $(this).val()==''){
				$('#width').val('');
			}else{
				$('#width').val('10');
			}
		});		
		
		$('#displayCN').change(function(){	
			if($(this).attr('checked')){
				$('#field option').each(function(){
					var comment = $(this).attr('comment');
					if( comment && comment.length>0){
						$(this).text(comment);
					}
				});
				$('#idField option').each(function(){
					var comment = $(this).attr('comment');
					if( comment && comment.length>0){
						$(this).text(comment);
					}
				});
			}else{
				$('#field option').each(function(){
					var column = $(this).attr('column');
					if( column && column.length>0){
						$(this).text(column);
					}
				});
				$('#idField option').each(function(){
					var column = $(this).attr('column');
					if( column && column.length>0){
						$(this).text(column);
					}
				});
			}
		});
		
		$(".displaySimple").bind('change',function(){
			var name = $(this).attr('name');
			name = name.substring(0,name.indexOf('_ck'));
			var obj = $(":checked[name="+name+"_ck]");
			if(obj.length==2){
				$(':hidden[name='+name+']').val(1);
			}else{
				$(':hidden[name='+name+']').val(obj.val());
			}
		});
		
		
		//按钮权限
		$('#btnLimits').bind('click',function(){
			top.lwin.open('core/view/cfg/button_edit.jsp?viewUnid='+viewUnid,'按钮权限',640,480);
		});
		
		//搜索框
		var list = new Array();
		$("#buttonList option").each(function(index){
			list[index] = $(this).text();
		});
		
		$("#tags").autocomplete(list, {
			width: 200,
			max: 10,
			highlight: false,
			scroll: true,
			scrollHeight: 300
		});
		function log(event, data, formatted) {
			var obj = $("#buttonList option[title="+formatted+"]");
			if($("#subbuttonList option[value="+obj.val()+"]").length==0){
				var clone = obj.clone();
				$("#subbuttonList").append(clone);
				clone.attr('subName',clone.attr('btnName'));
				clone.attr('subSort',$("#subbuttonList option").length-1);
				
				addSubButton(obj);
			}
		}
		$(":text, textarea").result(log).next().click(function() {
			$(this).prev().search();
		});
		
		$('#name').bind('focusout',function(){
			if($('#alias').val()==''){
				$('#alias').val(getSpell($('#name').val()));
			}		
		});
		
	
		//为tab绑定选中事件
		$("#tabs").tabs({
		});
	
	});	
	
	var contextmenuObj;
	
	function bindColumnMenu(){
		$('.column').bind('contextmenu',function(e){
			$('#menu-field').menu('show', {
				left: e.pageX,
				top: e.pageY
			});
			contextmenuObj = $(this);		
			return false;
		});
	}
	
	$('.column').bind('contextmenu',function(e){
		$('#menu-field').menu('show', {
			left: e.pageX,
			top: e.pageY
		});
		contextmenuObj = $(this);		
		return false;
	});
	
	//删除字段
	function delField(){
		$('#del-field').bind('click',function(){
			var obj = contextmenuObj.find('a');
			var columnUnid = obj.attr('unid');
			
			$.messager.confirm('操作提示', '您确定删除字段吗?', function(r){
				if (r){
					$.ajax({
						url:'view.action',
						cache:false,
						dataType:'json',
						data:{
							fn:'delField',
							columnUnid:columnUnid
						},
						error:function(){
							top.lwin.errorService();
						},
						success:function(data){
							if(data.success){
								if(obj.parent().parent().find('.column').length==1 && $('.rowField').length >1){
									obj.parent().parent().remove();
								}else{
									obj.parent().remove();
								}
							}else{
								alert('删除失败');
							}
						}			
					});
				}
			});
			
			
			
		});
	}
	
	//左右移字段
	function moveField(tag){
			
		if('left'==tag){
			contextmenuObj.prev().before(contextmenuObj.clone(true));
		}else if('right'==tag){
			contextmenuObj.next().after(contextmenuObj.clone(true));
		}
		
		
		contextmenuObj.remove();
		saveSort();		
	}
	
	
	//id field 保存
	function saveIdField(){
		$('#fieldForm').ajaxSubmit({
			dataType:'json',
			async:false,
			data:{
				viewUnid:viewUnid
			},
			error:function(){
			},
			success:function(result){
				$('#idFieldUnid').val(result.idFieldColumn.unid);
			}
		}); 
	}
	
	
	var trDom;
	//字段编辑
	function fieldEdit(e){
		$('#empty').val('_empty'+(Math.random()+'').substring(2,4));
		
		trDom = $(e).parent().parent();
		var id = $(e).attr('unid');		
		if(id){
			$.ajax({
				url:'view.action',
				cache:false,
				dataType:'json',
				async:false,
				data:{
					fn:'getColumn',
					columnUnid:id
				},
				error:function(){
					top.lwin.errorService();
				},
				success:function(result){
					$('#columnUnid').val(id);
					$('#title').val(result.column.title);
					$('#align').val(result.column.align);
					$('#width').val(result.column.width);
					
					var field = result.column.field;
					if(field.indexOf('_empty')==0 || (field.indexOf('_null')==0 && result.column.width !='') ){
						$('#empty').attr('selected',true);
						
					}else if(field.indexOf('_null')==0 && result.column.width==''){
						$('#null').attr('selected',true);
						
					}else{
						$('#field').val(result.column.field);
					}
					
					$('#sortable').val(result.column.sortable);
					$('#formatter').val(result.column.formatter);
					$('#sort').val(result.column.sort);
					
					if(result.column.merge==1){
						$('#merge').attr('checked',true);
					}
					
					if(result.column.rowspan){
						$('#rowspan').val(result.column.rowspan);
					}
					if(result.column.colspan){
						$('#colspan').val(result.column.colspan);	
					}								
				}
			});
		}else{
			$('#columnUnid').val('');
			$('#title').val('');
			$('#align').val('');
			$('#width').val('');
			$('#field').val('');
			$('#sortable').val('');
			$('#formatter').val('');
			
			var tr = $(e).parent().parent();
			var sort = tr.attr('row')*100+ tr.find('.column').length;	
			$('#sort').val(sort);
		}
		
		$('#filed').window('open');
	}
	
	//保存按钮
	function btnSave(){	
		$('#btnUnid').val('');
		$('#subUnid').val('');
		
		if($('#subSort').val()==''){
			$('#subSort').val($("#subbuttonList option").length-1);
		}
		
		$('#btnForm').ajaxSubmit({
			async:false,
			dataType:'json',
			data:{
				viewUnid:viewUnid,
				fn:'saveBtn'	
			},
			error:function(result){
				alert('数据错');
			},
			success:function(result){
				if(result){
					var btn = result.btn;
					var btnHtml = "<option value=\""+btn.BUTTON_UNID+"\"" +
								"title=\""+btn.BUTTON_NAME+"\"" + 
								"btnUnid=\""+btn.BUTTON_UNID+"\"" + 
								"btnName=\""+btn.BUTTON_NAME+"\"" + 
								"btnFn=\""+btn.BUTTON_FN+"\"" + 
								"subUnid = \"\"" + 
								"subName = \"\"" + 
								"subImg = \"\" style='color:red'>"+btn.BUTTON_NAME+"</option>";	
								
					var subHtml = 	"<option value=\""+btn.BUTTON_UNID+"\"" +
									"title=\""+btn.SUB_NAME+"\"" + 
									"btnUnid=\""+btn.BUTTON_UNID+"\"" + 
									"btnName=\""+btn.BUTTON_NAME+"\"" + 
									"btnFn=\""+btn.BUTTON_FN+"\"" + 
									"subUnid=\""+btn.SUB_UNID+"\"" + 
									"subImg=\""+btn.SUB_IMG+"\"" + 
									"subSort=\""+btn.SUB_SORT+"\"" + 
									"fnPath=\""+btn.FN_PATH+"\"" + 
									"subName=\""+btn.SUB_NAME+"\" style='color:red'>"+btn.SUB_NAME+"</option>";
						
					
					
					$("#buttonList").append(btnHtml);					
					$("#subbuttonList").append(subHtml);
				}
			}
		});
	}
	
	//更新子按钮
	function btnUpdate(){
	
		var btnfn =  $('#btnFn').val();		
		if(btnfn == 'gAdd'){
			$('#subImg').val('icon-add');							
		}else if(btnfn == 'gDel'){
			$('#subImg').val('icon-del');				
		}else if($('#subImg').val()==''){
			$('#subImg').val('icon-application');		
		}
		
		if($('#subSort').val()==''){
			$('#subSort').val($("#subbuttonList option").length-1);
		}
	
		$('#btnForm').ajaxSubmit({
			async:false,
			dataType:'json',
			data:{
				viewUnid:viewUnid,
				fn:'saveSubBtn'	
			},
			error:function(result){
				alert('数据错');
			},
			success:function(result){
				var obj = $("#subbuttonList:selected");
				if(obj.length==0){
					obj = $("#subbuttonList option:last");
				}			
				
				obj.attr('btnUnid',result.btn.BUTTON_UNID);
				obj.attr('btnName',result.btn.BUTTON_NAME);
				obj.attr('btnFn',result.btn.BUTTON_FN);
				
				if(result.btn.SUB_UNID){
					obj.attr('subUnid',result.btn.SUB_UNID);
				}
				if(result.btn.SUB_IMG){
					obj.attr('subImg',result.btn.SUB_IMG);
				}
				if(result.btn.SUB_NAME){
					obj.attr('subName',result.btn.SUB_NAME);
				}
				if(result.btn.FN_PATH){
					obj.attr('fnPath',result.btn.FN_PATH);
				}
				
				$('#btnUnid').val(result.btn.BUTTON_UNID);
				$('#subUnid').val(result.btn.SUB_UNID);
			}
		});
	}
	
	//字段保存
	function saveFieldEdit(){		
	
		/*
		var columnUnid = $('#columnUnid').val();
		var title = $('#title').val();
		var align = $('#align').val();
		var width = $('#width').val();
		var field = $('#field').val();
		var sortable = $('#sortable').val();
		var formatter = $('#formatter').val();
		*/
		
		var field = $('#field').val();
		if(field.indexOf('_empty')==0){
			if($('#width').val()==''){
				alert('请填写宽度');
				$('#width').focus();
				return;
			}
			
		}else if(field.indexOf('_null')==0){
			if($('#width').val()!=''){
				$('#width').val('');
			}
		}
		
		
		var sort = $('#sort').val();
		if(!sort){
			$('#sort').val($('.column').length+1);
		}
		
		$('#saveFieldForm').ajaxSubmit({
			async:false,
			cache:false,
			dataType:'json',
			data:{
				viewUnid:viewUnid				
			},
			error:function(result){
				alert('数据错');
			},
			success:function(result){
				if(result.success){
					//var colspan = $('.emptyField').attr('colspan');
					
					var align = result.column.align;
					if('2'==align){
						align = 'center';
					}else if('3'==align){
						align = 'right';
					}else{
						align = 'left';
					}
					var tdHtml = '<td id="'+result.column.unid+'" class="'+result.column.unid+' column"'
						+'colspan="'+result.column.colspan+'" rowspan="'+result.column.rowspan+'"'
						+'align="'+align+'">'
						+'<a href="javascript:" onclick="fieldEdit(this)" unid="'+result.column.unid+'" title="'+result.column.title+'">'+result.column.title+'</a>'
						+'</td>'
					
					if(result.fn=='save'){
						trDom.find('td:last').after(tdHtml);
						
					}else if(result.fn=='update'){
						$('.'+result.column.unid).before(tdHtml);
						$('.'+result.column.unid+':last').remove();
					}
					
					bindColumnMenu();
					
					//$('.emptyField').attr('colspan',colspan-1);
					
					/*
					var fieldHtml = '<div id="'+result.column.unid+'">'
								   +'<input type="hidden" name="columnUnid" value="'+result.column.unid+'">'
								   +'<input type="hidden" name="title" value="'+result.column.title+'">'
								   +'<input type="hidden" name="align" value="'+result.column.align+'">'
								   +'<input type="hidden" name="width" value="'+width+'">'
								   +'<input type="hidden" name="field" value="'+field+'">'
								   +'<input type="hidden" name="sortable" value="'+sortable+'">'
								   +'<input type="hidden" name="formatter" value="'+formatter+'">'
								   +'</div>';					
					$('#fieldForm').append(fieldHtml);
					*/
					$('#saveFieldForm').resetForm();
					$('#filed').window('close');
					
					//调整顺序
					saveSort();		
				}
			}
		}); 		
	}
	
	function saveSort(){
		var sorts = '';
		$('.rowField').each(function(i){
			var base = (i + 1) * 100;					
			$(this).find('.column').each(function(j,e){			
				sorts += $(e).attr('id')+','+(base+j)+';';
			});			
		});	
		$.post('view.action',{fn:'saveSort',sorts:sorts});
	}
	
	
	//复制sql系统参数
	function copyText(e){
		var rng = document.body.createTextRange(); 
		rng.moveToElementText(e); 
		rng.scrollIntoView(); 
		rng.select(); 
		rng.execCommand("Copy"); 
		rng.collapse(false);
		alert("复制成功!");
	}
	
	
	function bindButtonList(){
		//为左边例表绑定双击事件,用于双击添加到右侧例表
		$("#buttonList").bind("dblclick",function(){
			var obj = $(this).find(":selected");
			if($("#subbuttonList option[value="+obj.val()+"]").length==0){
				var clone = obj.clone();
				$("#subbuttonList").append(clone);
				clone.attr('subName',clone.attr('btnName'));
				clone.attr('subSort',$("#subbuttonList option").length-1);
				addSubButton(clone);
			}			
		});
		
		//为右边例表绑定双击事件,用于双击删除该选中项
		$("#subbuttonList").bind("dblclick",function(){
			var obj = $(this).find(":selected");
			delSubButton(obj);
		});
		
		//为添加按钮绑定单击事件,用于把左侧项选中添加到右侧
		$("#buttonAdd").bind("click",function(){
			var obj = $("#buttonList option:selected");
			if($("#subbuttonList option[value="+obj.val()+"]").length==0){
				addSubButton(obj);			
			}
		});
		
		//为删除按钮绑定单击事件,用于删除右侧选中项
		$("#buttonDel").bind("click",function(){
			var obj = $("#subbuttonList option:selected");
			delSubButton(obj);
		});
		
		//为右边例表绑定单击事件
		$("#subbuttonList").bind("click",function(){
			var obj = $(this).find(":selected");
			
			$('#btnUnid').val(obj.attr('btnUnid'));
			$('#btnName').val(obj.attr('btnName'));
			$('#btnFn').val(obj.attr('btnFn'));
			
			//alert(obj.attr('subUnid'));
			
			$('#subUnid').val(obj.attr('subUnid'));
			$('#subImg').val(obj.attr('subImg'));
			$('#subName').val(obj.attr('subName'));	
			$('#subSort').val(obj.attr('subSort'));	
			$('#fnPath').val(obj.attr('fnPath'));	
		});
	}
	
	/**
	 * 移除子按钮
	*/
	function delSubButton(obj){
		$.ajax({
			url:"view.action?fn=delSubButton",
			type:"post",
			async:false,
			dataType:"json",
			data:{
				subUnid:$("#subUnid").val()
			},
			success:function(responseText){
				if(responseText.success){						
					obj.remove();
					$("#btnForm")[0].reset(); 
				}					
			}						
		});
	}
	
	function addSubButton(obj){
		$('#btnUnid').val(obj.attr('btnUnid'));
		$('#btnName').val(obj.attr('btnName'));
		$('#btnFn').val(obj.attr('btnFn'));
		
		$('#subUnid').val(obj.attr('subUnid'));
		$('#subImg').val(obj.attr('subImg'));
		$('#subName').val(obj.attr('subName'));
		$('#subSort').val(obj.attr('subSort'));
		
		btnUpdate();
	}
	
	function rowEdit(){
		var obj = $('.rowField:last');
		var clone = obj.clone();
		clone.attr('row',parseInt(obj.attr('row'))+1);
		
		clone.find('.column').remove();
		
		obj.after(clone);
		
		
	}
	
	function changeDisplayType(e){
		var val = $(e).val();
		if(val!=1 && val!=4){
			$(e).next().show();
		}else{
			$(e).next().hide();
		}
	}
	
	function changeDic(e){
		var obj = new Object(); 
		window.showModalDialog(top.appPath+'/core/view/cfg/choose_dic.jsp?_rand'+Math.random(),obj,'dialogWidth=800px;dialogHeight=495px');
		if(obj.dicttype){
			$(e).prev().val(obj.dicttype);
		}
	}
	
	//全选搜索字段sField
	function selectAllSField(e){
		if($(e).attr("checked")){
			$(":checkbox[name=field]").attr("checked",true);
		}else{
			$(":checkbox[name=field]").attr("checked",false);
		}	
	}
	
	//复制视图
	function copyView(id){
		$.ajax({
			url:'view.action',
			type:'post',
			dataType:'json',
			data:{
				fn:'copyView',
				viewUnid:id
			},
			success:function(responseText){
				if(responseText.success){
					alert("复制成功!");
					//location.href=top.appPath+'/admin/view/cfg/view_cfg.jsp?viewId='+responseText.unid;
					location.href='view_cfg.jsp?viewId='+responseText.unid;
				}
			}		
		});
	}
	
	function moveBtn(tag){
		var orig = $('#subbuttonList option:selected');
		if('up'==tag){
			var dest = orig.prev();
			dest.before(orig);
			
		}else if('down'==tag){
			var dest = orig.next();
			dest.after(orig);
		}
	
		var ids = '';
		$('#subbuttonList option').each(function(index){
			if(index > 0){
				ids += ',';
			}
			ids =  ids + $(this).attr('subUnid');
		});
		
		$.ajax({
			url:'view.action',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				fn:'moveBtn',
				ids:ids
			},
			error:function(){
				top.lwin.errorService();
			},
			success:function(reslut){
			}
		});
	}
	
	
	function moveQueryUp(e){
		var target = $(e).parent().parent().prev();
		var clone = $(e).parent().parent().clone(true);
		if(target.hasClass('query')&&target.css('display')!='none'){
			$(e).parent().parent().remove();
			target.before(clone);
		}else{
			alert('已是最上层');
		}	
	}
	
	</script>
	
</body>

</html>