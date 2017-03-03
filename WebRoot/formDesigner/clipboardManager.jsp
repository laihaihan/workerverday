<%@page contentType="text/html;charset=UTF-8"%>
<html>
	<head>
	    <script>
	    
	    document.onkeyup = function(e){
	    	if(!e) e = window.event;	
	    	if(e.ctrlKey&&e.keyCode==86){  //按下 Ctrl+V 组合键
	           
	        }  
	    }
	    
	    //获取剪贴板内容
	    function getClipboardData(){
	    	var html="";
	    	//获取Word中拷贝的内容
	    	html=getWordCopyData();
	    	//调用Flex的方法
	    	var flexApp = parent.FABridge.flash.root();
			flexApp.pasteCallBack(html);
		}

		function getWordCopyData() {
			var wordContent = document.getElementById("wordCopyDataHtml")
			wordContent.innerHTML = "" ;
			
			var wordCopyTextRange = document.body.createTextRange() ;
			wordCopyTextRange.moveToElementText(wordContent) ;
			wordCopyTextRange.execCommand("Paste") ;
			
			var str = wordContent.innerHTML ;
			wordContent.innerHTML = "" ;
			
			return cleanWordHtml(str) ;
		}

		/**
		function cleanWordHtml(html) {
			html = html.replace(/<\/?SPAN[^>]*>/gi, "" );
			html = html.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3") ;
			html = html.replace(/<(\w[^>]*) style="([^"]*)"([^>]*)/gi, "<$1$3") ;
			html = html.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3") ;
			html = html.replace(/<\\?\?xml[^>]*>/gi, "") ;
			html = html.replace(/<\/?\w+:[^>]*>/gi, "") ;
			html = html.replace(/&nbsp;/, " " );
			
			return html;
		}
		*/
		
		function cleanWordHtml(html) {
			html = htmlDecode(html);
			html = html.replace(/<\/?SPAN[^>]*>/gi, "" );
			html = html.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3") ;
			html = html.replace(/<(\w[^>]*) style="([^"]*)"([^>]*)/gi, "<$1$3") ;
			html = html.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3") ;
			html = html.replace(/<\\?\?xml[^>]*>/gi, "") ;
			html = html.replace(/<\/?\w+:[^>]*>/gi, "") ;
			html = html.replace(/&nbsp;/, " " );
			
			html = html.split(/<P\s+[^>]+>/gi).join("");
			html = html.split("<P>").join("");
			html = html.split("</P>").join("<BR/>");
			
			//html = html.replace(/ /," ");
			//var re =new RegExp("(<P)([^>]*>.*?)(<\\/P>)","gi");
			//html = html.replace(re,"<div$2</div>");  
				
			return html;
		}
		
		function htmlDecode(text){
			if (text==null){return "";}
			text = text.split("&amp;").join("&") ;
			text = text.split("&quot;").join("\"") ;
			text = text.split("&lt;").join("<") ;
			text = text.split("&gt;").join(">") ;
			text = text.split("&nbsp;").join(" ");
			return text;
		}

	    </script>
	</head>
	<body style="margin-top: 0px">
		<div id="wordCopyDataHtml" style="width: 1px; height: 1px; overflow: hidden; visibility: hidden; position: absolute;"></div>
	</body>
</html>