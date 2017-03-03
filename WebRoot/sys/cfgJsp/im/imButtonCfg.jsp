<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>IM按钮配置</title>
    
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" type="text/css" href="./css/ucap.css"/>
	<link rel="stylesheet" type="text/css" href="./css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="./css/ext-patch.css" />
	<link rel="stylesheet" type="text/css" href="./js/ucap/calendar/skin/WdatePicker.css" />
	<script type="text/javascript" src="./js/ext/ext-base.js"></script>
	<script type="text/javascript" src="./js/ext/ext-all.js"></script>
	<!-- script type="text/javascript" src="./js/ext/ext-all.gzjs"></script-->
	<script type="text/javascript"	src="./js/ext/ext-lang-zh_CN.js"></script>
	<SCRIPT language=javascript src="./js/im/imButtonConfig.js"></SCRIPT>
	<script type="text/javascript"	src="./js/ucap/util/common.js"></script>
	<script type="text/javascript"	src="./js/ucap/portal/form.js"></script>
	<SCRIPT language=javascript src="./js/im/imServerConfig.js"></SCRIPT>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link href="./uistyle/style_1/css/ucap.css" type="text/css" rel="stylesheet">
	<link href="./uistyle/style_1/css/ext-all.css" type="text/css" rel="stylesheet">
	<link href="./uistyle/style_1/css/ext-patch.css" type="text/css" rel="stylesheet">
	<link href="./js/ucap/calendar/skin/WdatePicker.css" type="text/css" rel="stylesheet">
  </head>
  <script type="text/javascript">
  window.onload=initImBtnCfg;
  
</script>
  
  <body  class=" ext-gecko " style="overflow-x: hidden;overflow-y:auto">
		<div id="toolBar">
			<div
				style="float: left; position: absolute; padding: 5px 0px 0px 5px;"
				id="_ucapFormDocTitle"></div>
			<div id="toolBarButton">
				<button onmouseout="this.className='btnn1'"
					onmouseover="this.className='btnn3'" class="btnn1"
					onclick="addItem();" style="width: 56px;" title="新增">
					<div class="btnn5">
						<img style="align:absMiddle"
							src="./uistyle/style_1/ucapimages/default_btn.gif">
						&nbsp;新增
					</div>
				</button>
				<button onmouseout="this.className='btnn1'"
					onmouseover="this.className='btnn3'" class="btnn1"
					onclick="saveItem();" style="width: 56px;"
					title="保存">
					<div class="btnn5">
						<img style="align:absMiddle"
							src="./uistyle/style_1/ucapimages/default_btn.gif">
						&nbsp;保存
					</div>
				</button>
				<button onmouseout="this.className='btnn1'"
					onmouseover="this.className='btnn3'" class="btnn1"
					onclick="closeWindow();" style="width: 56px;" title="关闭">
					<div class="btnn5">
						<img  style="align:absMiddle"
							src="./uistyle/style_1/ucapimages/default_btn.gif">
						&nbsp;关闭
					</div>
				</button>
			</div>
		</div>
	</body>
</html>
