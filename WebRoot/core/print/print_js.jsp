<%@ page language="java" pageEncoding="UTF-8" %>
<script type="text/javascript">
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnNext").bind("click",doNext);
		$("#tabs").tabs({});
		if($("#fn").val() == "add"){
			$("#tabs").tabs('disable',1);
		}
	})
	
	//保存
	function doSave(){
		if(validate.validate()){
			$('#jspForm').ajaxSubmit({
				dataType:'json',
				error:function(){
					top.popup.errorService();
				},
				success:function(data){
					if(data.result){
						$('#fn').val('update');
						$('#tabs').tabs('enable',1);
						$('#iframe').attr('src','print_field_cfg.jsp?print_unid=${print.print_unid}');//刷新页签内容
					}else{
						top.lwin.alert('操作提示','保存失败','error');
					}
				}
			});
		}
	}
	
	//下一步
	function doNext(){
		doSave();
		$('#tabs').tabs('select',1);
	}
</script>

<script type="text/javascript">
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	print_name:'required',
	      	print_sql:'required'
	    },
	    messages:{
	    	print_name:'必填',
	    	print_sql:'必填'
	    }
  	});	
</script> 