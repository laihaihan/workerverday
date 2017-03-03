
$(function(){
	$("input[type=text]:not(:disabled)").bind("change",function(){		
		hideTip($(this).attr("name"));
		$(this).css("border","1px solid #9bc");
	});
});
	
 
var TextValidation = {
	//设置警告样式(红色边框高亮显示)
	setWarning : function setWarning(obj){
		obj.css("border","1px solid red");
	},
	showTip : function showTip(areaId,content){
		$(":input[name='"+areaId+"']").poshytip({
			content: content,
			showOn: 'none',
			alignTo: 'target',
			alignX: 'right',
			alignY: 'center',
			offsetX:12
		});
		$(":input[name='"+areaId+"']").poshytip('show');
	},
	hideTip : function hideTip(areaId){
		$(":input[name='"+areaId+"']").poshytip('hide'); 
	},
	
	//验证是否为空
	checkNull : function checkNull(textName,textLabel){
		var msgContent = "";
		var textNames = new Array();
		var textLabels = new Array();
		textNames = textName.split(";"); //字符分割      
		textLabels = textLabel.split(";"); //字符分割 
		for (k = 0;k < textNames.length ;k++ ){			
			var textInput = $(":input[name='"+textNames[k]+"']");
			for(i=0;i<textInput.length;i++){
				if(textInput[i].value == ""){
					msgContent= textLabels[k];
					showTip(textNames[k],msgContent+'不能为空！');	
					setWarning($('#'+textNames[k]));
				}
			}
		}
		if(msgContent != ""){
			return false;
		}
		return true;
	},
 
 	//验证是否为数字
	checkNumber : function checkNumber(textName,textLabel){
		var msgContent = "";
		var textNames = new Array();
		var textLabels = new Array(); 
		textNames = textName.split(";"); //字符分割      
		textLabels = textLabel.split(";"); //字符分割 
		for (k = 0;k < textNames.length ;k++ ){			
			var textInput = $(":input[name='"+textNames[k]+"']");
			for(i=0;i<textInput.length;i++){
				if(textInput[i].value == ""){
					msgContent= textLabels[k];
					showTip(textNames[k],msgContent+'不能为空！');	
					setWarning($('#'+textNames[k]));
					continue;
				}
				
				if(textInput[i].value != "" && isNaN(textInput[i].value)){
					msgContent= textLabels[k];
					showTip(textNames[k],msgContent+'必须为数字！');	
					setWarning($('#'+textNames[k]));
				}
			}
		}
		if(msgContent != ""){
			return false;
		}	
		return true;
		
	},
	checkiPhone : function checkiPhone(textName,textLabel){
		var msgContent = "";
		var textNames = new Array();
		var textLabels = new Array(); 
		textNames = textName.split(";"); //字符分割      
		textLabels = textLabel.split(";"); //字符分割 
		var filter  = /^(1[3,5,8,7]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{3,7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/;
		
		for (k = 0;k < textNames.length ;k++ ){			
			var textInput = $(":input[name='"+textNames[k]+"']");
			for(i=0;i<textInput.length;i++){			
				if (!filter.test(textInput[i].value)){
					msgContent= textLabels[k];
					showTip(textNames[k],msgContent+'手机格式不正确！');	
					setWarning($('#'+textNames[k]));
				}
			}
		}
		if(msgContent != ""){
			return false;
		}	
		return true;		
		
	},
	//验证区号
	checkQh : function checkQh(textName,textLabel){
		var msgContent = "";
		var textNames = new Array();
		var textLabels = new Array(); 
		textNames = textName.split(";"); //字符分割      
		textLabels = textLabel.split(";"); //字符分割 
		var filter  =/^(0[1-9]{2,3})$/;
		for (k = 0;k < textNames.length ;k++ ){			
			var textInput = $(":input[name='"+textNames[k]+"']");
			for(i=0;i<textInput.length;i++){
			
				
				if (!filter.test(textInput[i].value)){
					msgContent= textLabels[k];
					showTip(textNames[k],msgContent+'输入的区号有误！');	
					setWarning($('#'+textNames[k]));
				}
			}
		}
		if(msgContent != ""){
			return false;
		}	
		return true;			
	},
	//验证座机
	checkZj : function checkZj(textName,textLabel){			 
		var msgContent = "";
		var textNames = new Array();
		var textLabels = new Array(); 
		textNames = textName.split(";"); //字符分割      
		textLabels = textLabel.split(";"); //字符分割 
		 var filter  =/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
		for (k = 0;k < textNames.length ;k++ ){			
			var textInput = $(":input[name='"+textNames[k]+"']");
			for(i=0;i<textInput.length;i++){
			
				
				if (!filter.test(textInput[i].value)){
					msgContent= textLabels[k];
					showTip(textNames[k],msgContent+'固定电话格式有误！');	
					setWarning($('#'+textNames[k]));
				}
			}
		}
		if(msgContent != ""){
			return false;
		}	
		return true;	
	},
	//验证邮箱
	checkEmail : function checkEmail(textName,textLabel){
		var msgContent = "";
		var textNames = new Array();
		var textLabels = new Array(); 
		textNames = textName.split(";"); //字符分割      
		textLabels = textLabel.split(";"); //字符分割 
		var filter  = /\b(^['_A-Za-z0-9-]+(\.['_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\.[A-Za-z0-9-]+)*((\.[A-Za-z0-9]{2,})|(\.[A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}))$)\b/;
		for (k = 0;k < textNames.length ;k++ ){			
			var textInput = $(":input[name='"+textNames[k]+"']");
			for(i=0;i<textInput.length;i++){
				if (!filter.test(textInput[i].value)){
					msgContent= textLabels[k];
					showTip(textNames[k],msgContent+'邮件格式错误！');	
					setWarning($('#'+textNames[k]));
				}
			}
		}
		if(msgContent != ""){
			return false;
		}	
		return true;			
	}
}

	