<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<title>应用系统构建流程</title>
		<link href="../style/systemIndex.css" rel="stylesheet" type="text/css" />
		<%
			String nodeId = request.getParameter("nodeId");
		%>
		<script type="text/javascript">
			window.onload=function(){
				var nodeId="<%=nodeId%>";
				var navHtml=window.top.ucapManagerTree.setAppNavigationChart(nodeId);
				var moduleHtml=window.top.ucapManagerTree.appModuleNavHtml;
				if(document.getElementById("navHtml") && document.getElementById("businessModuleBtns")){
					document.getElementById("businessModuleBtns").innerHTML=moduleHtml;
					document.getElementById("navHtml").innerHTML=navHtml;
				}
			}
</script>
	</head>
	<body style="overflow-y:auto;overflow-x:hidden;">
		<div class="content">
			<!--应用元素 begin-->
			<div class="contentItem">
				<!-- 空白行 -->
				<div class="blank"></div>
				<!--标题-->
				<div class="title">
					<img src="../style/images/systemIndex/appElementsIcon.png" />
					应用元素
				</div>
				<!--树容器-->
				<ul class="treeContainer" id="navHtml">
					<!-- 界面元素
					<li>
						<dl>
							<dt>
								<img src="../style/images/systemIndex/folder.png" />
								界面元素
							</dt>
							<dd>
								<img src="../style/images/systemIndex/treeIcon/1.png" />
								界面风格
							</dd>
							<dd>
								<img src="../style/images/systemIndex/treeIcon/2.png" />
								快捷方式集
							</dd>
							<dd>
								<img src="../style/images/systemIndex/treeIcon/3.png" />
								导航栏
							</dd>
							<dd>
								<img src="../style/images/systemIndex/treeIcon/4.png" />
								频道
							</dd>
							<dd>
								<img src="../style/images/systemIndex/treeIcon/5.png" />
								界面方案
							</dd>
						</dl>
					</li>
					 -->
				</ul>
			</div>
			<!--应用元素 end-->

			<!--业务模块 begin-->
			<div class="contentItem">
				<!-- 空白行 -->
				<div class="blank"></div>
				<!--标题-->
				<div class="title">
					<img src="../style/images/systemIndex/businessModuleIcon.png" />
					业务模块
				</div>
				<!-- 空白行 -->
				<div class="blank"></div>
				<!--按钮区域 begin-->
				<div class="businessModuleBtns" id="businessModuleBtns">
					<!--业务模块范例 
					<div class="businessModuleBtn">
						<img alt="" src="../style/images/systemIndex/businessModule.png" />
						<a>业务模块范例</a>
					</div>
					-->
				</div>
				<!--按钮区域 end-->
			</div>
			<!--业务模块 end-->
		</div>
		<!--系统说明 end-->
	</body>
</html>
