/**
 * 验证码获取
 *
*/ 
var checkCode = {
	//验证码集合
	str : "0 1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m n o p q r s t u v w x y z",
	
	//生成验证码(字母+数字)
	create:function(imgId){
		var rand = "";
		var arr = checkCode.str.split(" ");
		var url = globalSession.appPath + "/core/checkCode/write_img.jsp";
		for(i=0;i<4;i++){
			rand += arr[Math.round(Math.random()*(arr.length-1))];  
		}
		$('#'+imgId).html("<img id='img_"+imgId+"' rand='"+rand+"' src='"+url+"?rand="+rand+"'>");
	},
	
	//验证码校验
	validate:function(textId,imgId){
		return $('#'+textId).val() == $('#img_'+imgId).attr('rand');
	}
}