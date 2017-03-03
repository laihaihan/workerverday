<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="include/session.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>南威UACP支撑平台</title>
<script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
<script language="javascript" src="<%= systemPath %>default/js/jquery.cookie.js"></script>
<script language="javascript" src="<%= systemPath %>default/js/common.js"></script>
<script type="text/javascript" src="js/index.js"></script>
<link href="style/index.css" rel="stylesheet" type="text/css" />
</head>

<body>

<!-- LOGO图标 -->
<div class="logo">
</div>

<!-- 注销 -->
<div class="logout">
	<a href="javascript:void(0);" onclick="logout();">用户注销</a>
</div>

<!-- 帮助中心 -->
<div class="help">
	<a href="../help/help.html" target="_blank">帮助中心</a>
</div>

<!--内容区域 begin-->
<div class="area_content">

	<!--按钮区域 begin-->
	<div class="area_button">
		
		<!-- AMC 应用建模中心 -->
		<div class="button" onclick="index.openAmc();" >
			<img alt="" src="style/images/build.png" />
			<a>应用系统构建</a>
		</div>
		
		<!-- CMC 分级管理中心 -->
        <div class="button" onclick="index.openManager();" >
            <img alt="" src="style/images/admin.png" />
            <a>应用系统管理</a>
        </div>
		
		<!-- PCC 参数配置中心 -->
		<div class="button" onclick="index.openPmc();" >
			<img alt="" src="style/images/pcc.png" />
			<a>参数配置中心</a>	
		</div>
		
		<!-- UMC 用户管理中心 -->
		<div class="button" onclick="index.openUmc();" >
			<img alt="" src="style/images/umc.png" />
			<a>用户管理中心</a>	
	
		</div>
		
		
		
		<!-- UDDI UDDI中心  -->
		<div class="button" onclick="index.openUDDI();" >
			<img alt="" src="style/images/uddi.png" />
			<a>UDDI中心</a>	
	
		</div>
		
		<!-- GCT 代码生成工具 -->
		<div class="button" onclick="index.openGct();" >
			<img alt="" src="style/images/gct.png" />
			<a>代码生成工具</a>
		</div>
		
		
		<!-- VMC 版本控制中心 -->
		<div class="button" onclick="index.openVmc();" >
			<img alt="" src="style/images/vmc.png" />
			<a>版本控制中心</a>	
	
		</div>
		
		<!-- DIC  数据集成中心 -->
		<div class="button" onclick="index.openDic();" >
			<img alt="" src="style/images/dic.png" />
			<a>数据集成中心</a>	
	
		</div>
		
		<!-- MMC 监控中心 -->
		<div class="button" onclick="index.openMmc();" >
			<img alt="" src="style/images/mmc.png" />
			<a>监控中心</a>	
	
		</div>		
		
	</div>
	<!--按钮区域 end-->
</div>
<!--内容区域 end-->


<!--页脚 begin-->
<div class="footer">
	Powered by Ucap © 2001-2011, Linewell Inc.
</div>
<!--页脚 end-->

</body>

</html>
