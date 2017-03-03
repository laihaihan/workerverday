var chaXunBanJian = {
	init:function(){
		voice.event = 'input';
		voice.input = '';
		$('.key').bind('click',function(){
			if($(this).attr('key')=='#'){
				chaXunBanJian.selectApas(voice.input);
				voice.input = '';
			}
		});
	},
	selectApas:function(projid){
		$.ajax({
			url:'Voice.action',
			type:'post',
		//	dataType:'json',
			cache:false,
			data:{
				fn:'selectApas',
				projid:projid
			},
			error:function(){
				alert('与服务器通信出错');
			},
			success:function(result){
				voice.speak(result);
			}
		});
	}
}