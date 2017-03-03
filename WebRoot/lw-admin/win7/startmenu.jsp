<%@ page language="java" pageEncoding="UTF-8"%>
	
<!--开始菜单-->
<div id="start_menu_panel" style="display: none">
  <div class="panel-user">
    <div class="avatar"> <img src="${path}/core/js/win7style/startmenu/images/avatar_0.jpg" align="absmiddle">
    </div>
    <div class="name"><%=user.getDisplayName()%></div>
		<div class="tools">
			<a class="logout" href="#"  onclick="logout()"  title="注销"></a>
		</div>
	</div>
  
	<div class="panel-menu">
		<!---一级菜单 开始--->
		<!-- 一级菜单 -->
		<div id="first_panel">
				<ul id="first_menu">
				</ul>
		</div>
		<!---一级菜单 结束--->
		<!-- 二级级菜单 -->
		<div id="second_panel">
			<div class="second-panel-menu" id="second-panel-menu-id">
				
			</div>
		</div>
	</div>
  <!--//startmenu--> 