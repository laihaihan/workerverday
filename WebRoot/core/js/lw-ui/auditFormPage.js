 /**
 * 表单审计管理日志
 * @author lijx
 * @2013-09-25
 * @version 1.0
*/
jQuery(function(){
	var oldData = JSON.stringify($('#jspForm').serializeFiledInfoForm());
	jQuery('#form_toolbar .form_btn,.easyui-menubutton,.easyui-linkbutton').bind('click',function(){
		var newData = JSON.stringify($('#jspForm').serializeFiledInfoForm());
		jQuery.ajax({
			url:'audit.action',
			type:"POST",
			dataType:'json',
			data:{
				btnName:encodeURIComponent(encodeURIComponent(jQuery(this).text())),
				viewName:encodeURIComponent(encodeURIComponent("")),
				oldData :oldData,
				newData :newData,
				fn:'formButton'
			}
		});
	});
});

//将表单转换成json数据以便主表单统一提交
jQuery.fn.serializeFiledInfoForm = function(){
	var json =  {"list" : []};
	var o = {};
	json["list"].push(o);
    var a = this.serializeArray();
    jQuery.each(a, function() {
        if (o[this.name] || o[this.name] == "") {
        	o = {};
        	json["list"].push(o);
        	o[this.name] = this.value;
        } else {
        	this.name = jQuery.trim(jQuery('*[name='+this.name+']').parent().prev().text().replace(/[*]/g,''));
        	if(this.name || this.name != ""){
	            o[this.name] = this.value;
        	}
        }
       
    });
    return json;
};