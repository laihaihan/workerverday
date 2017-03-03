
var tmpAppPath = top.appPath;
if(!tmpAppPath){
	tmpAppPath = "/" + location.pathname.split("/")[(location.pathname.indexOf("/")>0?0:1)] + "/";
}
//document.writeln("<div id=\"d_mask\" style=\"position:absolute;left:0;top:0;width:100%; height: 100%;overflow:hidden; display: block;filter:alpha(opacity=40);opacity:0.40; z-index:9998;background:#EFEFEF\"></div>");
document.writeln("<div id=\"d_mask\" style=\"position:absolute;width:100%; height: 100%; display: block; z-index:9998;background:#EFEFEF\"></div>");
document.writeln("<div id=\"d_load\" style='position:absolute;left:48%;top:48%;z-index:9999'><img src='"+tmpAppPath+"/core/themes/default/images/admin/loading_b.gif'></div>");
/*
window.onload = function(){
	setTimeout(function(){
		document.getElementById("d_mask").style.display = "none";
		document.getElementById("d_load").style.display = "none";
	},50);
}
*/

 setTimeout(function(){
		document.getElementById("d_mask").style.display = "none";
		document.getElementById("d_load").style.display = "none";
},250);

/**
 * 使用方法
 * eg:在样式后加入(样式前加入会影响页面效果)
 * 	<script type="text/javascript" src="应用路径/core/js/lw-ui/load.js"></script>
 *
 */
