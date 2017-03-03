<%@ page language="java" pageEncoding="UTF-8" %>
<SCRIPT language=Jscript>
	$(function(){
		$("#btnClose").bind("click",doClose);
		$('#tabs').tabs();
		
		$('#gettype_names').combotree({
			url: '${path}/ApasMaterialGetType.action?fn=getSelect&checkedItems=${material.gettype_unids}', 
	    	multiple:true, //多选
			onChange:function(newValue, oldValue){
				$('#gettype_unids').val(newValue);
			}
		}); 
		
		$('#sub_materialname').combotree({
			url: '${path}/ApasMaterialClassify.action?fn=getSelect&serviceid=${material.serviceid}',
			onChange:function(newValue, oldValue){
				$('#sub_materialid').val(newValue);
			},
			onLoadSuccess:function(){
				$('#sub_materialname').combotree("setValue","${material.sub_materialid}");
			}
		});
	});
	
	//查看附件
	function doSelectMaterial(unid){
		top.lwin.open("/rsp/jsp/was/serviceMaterial/was_servcie_material_read.jsp?unid="+unid,"审批材料",750,500);
	}
	//保存表单信息
	function doSave(){
		if($("#infoname").val() == ""){
			top.lwin.alert('操作提示','材料名称不能为空','warning','1500',true);
			return;
		}
		if($('#gettype_names').combotree("getValues") == ""){
			top.lwin.alert('操作提示','请选择材料收取方式','warning','1500',true);
			return;
		}
		
		$("#jspForm").ajaxSubmit({
			dataType:'json',
			error:function(){
				top.lwin.errorService();
			},
			success:function(data){
				if(data.result){
					top.lwin.alert('操作提示','操作成功','info','1500',true);
					location.reload();
				}else{
					top.lwin.alert('操作提示','操作失败','error','1500',true);
				}
			}
		});
	}
	
	//关闭窗口
	function doClose(){
		top.lwin.close(true);
	}
	
	//复制
	function doCopy(unid){
		top.lwin.open("/was/jsp/service/material/material_copy.jsp?unid="+unid,"审批材料复制",500,300);
	}
	
	//编辑
	function doEdit(unid){
		location.href = "material_edit.jsp?unid="+unid;
	}
	
	//删除
	function doDelete(unid){
		$.ajax({
			url:'ApasMaterial.action',
			type:'post',
			dataType:'json',
			data:{
				fn:'del',
				unid:unid
			},
			success:function(data){
				if(data.result){
					$("#tr_"+unid).remove();
				}
			}
		});
	}

	//选择材料分类
	function selectClassify() {
		top.lwin.open("was/jsp/service/material/material_classify_select.jsp?serviceid=${material.serviceid}","选择材料分类",400,400);
	}
	
	//选择材料收取方式
	function selectGetType(){
		top.lwin.open("/was/jsp/service/material/material_gettype_select.jsp?gettype_unids=${material.gettype_unids}",'选择面材料收取方式',350,400);
	}
	
	//编辑材料收取方式
	function editGetType(){
		top.lwin.open("/was/jsp/service/material/material_gettype_edit.jsp",'编辑材料收取方式',700,400);
	}
	
	//设置材料分类
	function editClassify(){
		top.lwin.open('/was/jsp/service/material/material_classify_edit.jsp?sunid=${material.serviceid}','设置材料分类',800,500);	
	}
	
	function reloadMaterialname(){
		$('#sub_materialname').combotree('reload');
	}
	function reloadGettypeNames(){
		$('#gettype_names').combotree('reload');
	}
</SCRIPT>