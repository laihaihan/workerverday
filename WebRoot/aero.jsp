<%@ page language="java" pageEncoding="UTF-8"%>
<%
request.setAttribute("path", request.getContextPath());
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<META http-equiv=pragma content=no-cache>
<title>网上行政审批系统</title>
<link href="${path}/core/js/aerowindowdevelopment/skins/AeroWindow.css" rel="stylesheet">
<script src="${path}/core/js/aerowindowdevelopment/js/jquery-1.7.1.min.js" type="text/javascript"></script>
<link href="${path}/core/js/aerowindowdevelopment/skins/jquery-ui-1.8.18.custom.css" type="text/css" rel="stylesheet">
<link href="${path}/core/js/aerowindowdevelopment/images/tip-darkgray/tip-darkgray.css" type="text/css" rel="stylesheet">
<script src="${path}/core/js/aerowindowdevelopment/js/jquery-ui-1.8.18.custom.min.js" type="text/javascript"></script>
<script src="${path}/core/js/aerowindowdevelopment/js/jquery.easing.1.3.js" type="text/javascript"></script>
<script src="${path}/core/js/aerowindowdevelopment/js/jquery.poshytip.min.js" type="text/javascript"></script>
<script src="${path}/core/js/aerowindowdevelopment/js/AeroDialog.v0.3.js" type="text/javascript" language="javascript"></script>

<script type="text/javascript" src="/app/core/js//tipswindown/tipswindown.js"></script>
	
</head>

<body>
<div id="DesktopIcons">
  <ul style="display: none">
    <li><a href="http://www.baidu.com">
    <img src="${path}/core/js/aerowindowdevelopment/images/Icons/icon_photos.png">新增业务</a>
    <li><a href="${path}/view.action?fn=grid&viewId=E44CD321CC8A15EC5B38C8723505D6E9&_rand=0.4225550112771103&modId=AAF300D78EB938A4DE51A3B3A732A6F2"><img src="${path}/core/js/aerowindowdevelopment/images/Icons/icon_ipod.png">收件管理</a>
    <li><a href="${path}/view.action?fn=grid&viewId=886C83131BE919B0AED2A142DC2D67A3&_rand=0.9454741760855538&modId=4F6D6B1A9483C064B64DC25B3A420CA8"><img src="${path}/core/js/aerowindowdevelopment/images/Icons/icon_weather.png">待办业务</a>
  	
  </ul>
</div>
<div id='222' style="display: none;"><iframe src="http://www.google.com.hk/webhp?hl=zh-CN&sourceid=cnhp" width="100%" height="100%" style="display:none; border: 0px;" frameborder="0" id="222-iframe"></iframe></div>
<div id="Start-Menu" class="Start-position">
	<li><a href="http://www.baidu.com"><img src="${path}/core/js/aerowindowdevelopment/images/Icons/icon_photos.png" align="absmiddle"><span>新增业务</span></a>
    <li><a href="${path}/view.action?fn=grid&viewId=E44CD321CC8A15EC5B38C8723505D6E9&_rand=0.4225550112771103&modId=AAF300D78EB938A4DE51A3B3A732A6F2"><img src="${path}/core/js/aerowindowdevelopment/images/Icons/icon_ipod.png" align="absmiddle"><span>收件管理</span></a>
    <li><a href="${path}/view.action?fn=grid&viewId=886C83131BE919B0AED2A142DC2D67A3&_rand=0.9454741760855538&modId=4F6D6B1A9483C064B64DC25B3A420CA8"><img src="${path}/core/js/aerowindowdevelopment/images/Icons/icon_weather.png" align="absmiddle"><span>待办业务</span></a>
</div>
<script type="text/javascript">
$(document).ready(function(){
	var desktop = $("body #DesktopIcons");
	var desktop_icons = $("a", desktop);
	$("ul", desktop).css("display", "none");

	desktop_icons.each(function(index) {
	  if ($(this).attr('href') !== undefined)
		$(this).AeroWindowLink();
	});
	
	
	desktop_icons.remove();
	$('#DesktopIcons table').poshytip({
		className: 'tip-darkgray',
		bgImageFrameSize: 11,
		offsetX: -25,
		showTimeout:0,
		content:function(){return $('p',$(this)).html()},
		allowTipHover: false,
		fade: false,
		slide: false
	});
});
function winOpen(){
	var winUrl = "http://www.baidu.com";
		window.showModalDialog(winUrl);
		//tipsWindown("标题","text:提示信息内容","250","150","true","","true","text")

}
</script>
</body>
</html>
