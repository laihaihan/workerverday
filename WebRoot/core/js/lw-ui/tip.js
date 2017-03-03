/**
 * jquery弹出层插件
 *
 * @author qcongyong
 * @data 2012-04-25
*/ 
(function ($) { 
	$.fn.tipDiv = function (options) {
		var defaults = {
			type: 'text',	//参数类型(text:显示文本内容   id:显示元素id的内容   url:显示url页面的内容)
			value:''		//参数值
		};
		var opts = $.extend(defaults, options);
		this.each(function () {
			//鼠标进入事件
			$(this).bind("mouseover",function(e){
				$(this).css({cursor:'hand',border:'1px solid #336699'});
				if($("#tipDiv").length == 0){
					var style = "border:1px solid;background:#fff;z-index:99;position:absolute;left:"+e.pageX+";top:"+e.pageY + 20;
					$('body').append("<div id='tipDiv' style='"+style+"'></div>");
				}else{
					$("#tipDiv").fadeIn('slow');
				}
				
				switch(opts.type) {
					case "text":
						$("#tipDiv").html(opts.value);
						break;
					case "id":
						$("#tipDiv").append($("#"+opts.value));//将当前提示内容加入提示区
						$("#tipDiv #"+opts.value).siblings().remove();//只显示当前提示内容
						$("#tipDiv #"+opts.value).show();
						break;
					case "url":
						$.ajax({
							type:'post',
							url:opts.value,
							async:false,
							error:function(){
								$("#tipDiv").html("<p>加载数据出错...</p>");
							},
							success:function(html){
								$("#tipDiv").html(html);
							}
						});
						break;
					default:$("#tipDiv").fadeOut();	
				}
			});
			
			//鼠标离开事件
			$(this).bind("mouseout",function(e){
				$(this).css('border','0');
				$("#tipDiv").fadeOut();	
			});
			
			//鼠标移动事件
			$(this).bind("mousemove",function(e){
	            $('#tipDiv').css({position:"absolute", 'left':e.pageX, 'top':e.pageY + 20});
			});
		})
	}
})(jQuery);

/**
 * jquery提示窗口插件
 *
 * @author qcongyong
 * @data 2012-04-25
*/ 
(function ($) { 
	$.fn.tipWindow = function (options) {
		var defaults = {
			width	: '300',	//窗口宽度
			height	: '100',	//窗口高度
			top		: 'auto',	//窗口左上角纵坐标
			left	: 'auto',	//窗口左上角横坐标
			drag	: true,		//窗口是否可拖动
			type	: 'text',	//参数类型(text:显示文本内容   id:显示元素id的内容   url:显示url页面的内容)
			value	: '',		//参数值
			style	: ''		//扩展样式
		};
		
		//窗口默认居中
		var opts = $.extend(defaults, options);
		if(opts.top == 'auto'){
			opts.top = ($('body').height()-opts.height)/2;
		}
		if(opts.left == 'auto'){
			opts.left = ($('body').width()-opts.width)/2;
		}
		
		this.each(function () {
			//鼠标点击事件
			$(this).bind("click",function(e){
				$(this).css({cursor:'hand'});
				if($("#tipWindow").length == 0){
					var dragFunction = opts.drag ? "onmousedown='onDrag(this,event)'" : "";
					var style = "border:1px solid;background:#fff;z-index:99;position:absolute;" + opts.style;
					style += "width:"+opts.width+"px;height:"+opts.height+"px;top:"+opts.top+"px;left:"+opts.left+"px;"
					var html = "<div id='tipWindow' style='"+style+"' "+dragFunction+">";
					html += "<table width='100%'>";
					
					//按钮区
					html += "<tr>";
					html += "<td align='right' style='border: 1px solid #A6C9E1;height:25px;background:#DEECFD'>";
					html += "<button style='height:25px;border:medium none;background:#DEECFD;cursor:hand;' onclick='$(\"#tipWindow\").hide(\"slow\")'>";
					html += "<img src='"+top.globalSession.appPath+"/core/themes/default/images/admin/default_btn.gif'> 关闭";
					html += "</button>";
					html += "</td>";
					html += "</td>";
					
					//提示区
					html += "<tr><td style='padding:5px;'><div id='content' style='height:"+(opts.height-40)+"px;overflow-y:auto'></td></tr>";
					
					html += "</table>";
					html += "</div>";
					$('body').append(html);
				}else{
					$("#tipWindow").show('slow');
				}
				
				switch(opts.type) {
					case "text":
						$("#tipWindow #content").html(opts.value);
						break;
					case "id":
						$("#tipWindow #content").append($("#"+opts.value));//将当前提示内容加入提示区
						$("#tipWindow #content #"+opts.value).siblings().remove();//只显示当前提示内容
						$("#tipWindow #content #"+opts.value).show();
						break;
					case "url":
						$.ajax({
							type:'post',
							url:opts.value,
							error:function(){
								$("#tipWindow #content").html("<p>加载数据出错...</p>");
							},
							success:function(html){
								$("#tipWindow #content").html(html);
							}
						});
						break;
					default:$("#tipWindow").hide('slow');	
				}
			});
		})
	}
})(jQuery);

/**
 * jquery元素拖动插件
 *
 * @author qcongyong
 * @data 2012-04-25
*/ 
(function ($) { 
	$.fn.drag = function (options) {
		var bool=false;
	    var offsetX=0;
	    var offsetY=0;
	    this.css("position","absolute");//将元素改成绝对定位，这样才可拖动
	    
		this.each(function () {
			//鼠标按下事件
			$(this).bind("mousedown",function(e){
	       		bool=true;
	          	$(this).css('cursor','move');
	           	offsetX = event.offsetX;
	         	offsetY = event.offsetY;
	        });	
	        
			//鼠标放开事件   	
	       	$(this).bind("mouseup",function(){
	           	bool=false;
	            $(this).css('cursor','default');
	        });
	        
			//鼠标拖动事件    
	        $(this).bind("mousemove",function(e){
	            if(!bool) return;
	            var x = e.pageX-offsetX;
	            var y = e.pageY-offsetY;
	            $(this).css("left", x);
	            $(this).css("top", y);
	        });
		})
	}
})(jQuery);
	
//鼠标拖动窗口
function onDrag(elem,event){
	elem.style.position = "absolute";
	var deltaX = event.clientX - parseInt(elem.style.left);
 	var deltaY = event.clientY - parseInt(elem.style.top);
 	event.cancelBubble = true;//用于判断鼠标是否按住
 	document.attachEvent("onmousemove",moveHandler);
 	document.attachEvent("onmouseup",upHandler);
 	elem.style.cursor = "move";
 	
 	function moveHandler(e){
   		if(!e) e = window.event;
   		if(e.cancelBubble = true){
   			//窗口的距离=鼠标当前位置-鼠标与窗口的距离
	   		elem.style.left = (e.clientX - deltaX) + "px";
	   		elem.style.top = (e.clientY - deltaY) + "px";
   		}
 	}
 	
 	function upHandler(e){
  		if(!e)  e = window.event;
        e.cancelBubble = false;
     	document.detachEvent("onmousemove",moveHandler);
     	document.detachEvent("onmouseup",upHandler);
 		elem.style.cursor = "default";
 	}
}