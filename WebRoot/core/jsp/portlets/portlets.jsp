<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="/core/params.jsp"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>jQuery UI Portlet</title>
		<link rel="stylesheet" href="./lib/themes/1.10/start/jquery-ui-1.10.2.custom.min.css" />
		<link rel="stylesheet" href="./css/jquery.portlet.css?v=1.1.3" />
		<script src="./lib/jquery-1.8.3.min.js" type="text/javascript"></script>
		<script src="./lib/jquery-ui-1.10.2.custom.min.js" type="text/javascript"></script>
		<script src="./script/jquery.portlet.js?v=1.1.3"></script>
		<script src="./portlets.js"></script>
		<script type="text/javascript">
		var winWidth = '';
		window.onresize = function(){
			//如果改变窗口大小自动刷新首页，用于自适应首页频道的宽高。
			if($("portlets") && $("portlets").innerHTML!=""){
				//window.location=window.location;
			}
		}
		$(function(){
			$.ajax({
				url:'shouyepeizhi.action',
				dataType:'json',
				cache:false,
				async:false,
				data:{
					fn:'getPortlets'
				},
				error:function(){
					top.popup.errorService();
				},
				success:function(data){
					var leftObj = new Array();
					var rightObj = new Array();
					var centerObj = new Array();
					//左
					for(var k in data.leftList){
						var temp = data.leftList[k];
						leftObj.push(makePortlet(temp,'${path}'));//创建portlet对象
					}
					//右
					for(var k in data.rightList){
						var temp = data.rightList[k];
						rightObj.push(makePortlet(temp,'${path}'));//创建portlet对象
					}
					//中
					for(var k in data.centerList){
						var temp = data.centerList[k];
						centerObj.push(makePortlet(temp,'${path}'));//创建portlet对象
					}
					create(winWidth,leftObj,centerObj,rightObj);
				}
			});
		});
		</script>
	</head>
	<body>
		<div style="margin-left:6px;">
			<div id='portlets'></div>
		</div>
	</body>
</html>