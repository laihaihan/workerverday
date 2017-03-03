var voice = {
	event : '',
	input : '',
	/**
	 * 语音初始化
	*/
	init:function(){
		voice.bindEvent();		
		voice.speak('');
	},
	bindEvent:function(){
		$('.key').bind('click',function(){
			voice.press($(this).attr('key'))
		});
	},
	press:function(key){
		if('6788F292C4C9703A083C005652A170C1'==$('#punid').val()){
			voice.log(key);
		}
		
		if('*'==key){
			$('#punid').val('0');
			key = '欢迎词';
		}
	
		$('.inputText').text($('.inputText').text()+key+' ');
		if('input'==voice.event){
			voice.input = voice.input+key;
		}else{
			$.ajax({
				url:'Voice.action',
				type:'post',
				dataType:'json',
				cache:false,
				data:{
					fn:'press',
					key:key,
					punid:$('#punid').val()
				},
				error:function(){
					alert('与服务器通信出错');
				},
				success:function(result){
					var obj = result.voice;
					if(obj){
						$('#punid').val(obj.unid);
						if(obj.event){
							var cTest = new fn(obj.event);
							cTest.func();
						}
						voice.speak(obj.text);
					}else{
						//voice.speak('输入错误,请重新输入');
						voice.speak(obj.text);
					}
				}
			});
		}
	},
	speak:function(text){
		try{
			window.clipboardData.clearData();
			window.clipboardData.setData("Text",text);
		}catch(e){}
	},
	log:function(key){
		$.ajax({
			url:'VapLog.action',
			type:'post',
			dataType:'json',
			cache:false,
			data:{
				fn:'add',
				type:key,
				intel:'18605051001',
				isconffix:'NO',
				isfixed:'否',
				itemcode:'123456'
			},
			error:function(){
				alert('与服务器通信出错');
			},
			success:function(result){
				
			}
		});;
	}
}
function fn(fn){
	this.func = new Function(fn);
}
voice.init();