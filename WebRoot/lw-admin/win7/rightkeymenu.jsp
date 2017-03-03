<%@ page language="java" pageEncoding="UTF-8"%>
<div id="mm" style="width:120px;display: none">
	<div onclick="javascript:window.location.reload();">刷新</div>
	<div onclick="autoOrderShortcut();">自动排序</div>
	<div  id="defaulshortcuts" onclick="setDefaulShortcuts();" style="display: none">设置快捷方式</div>
	<div onclick="chooseStyle();">样式选择</div>
	<div onclick="chooseSys();">系统切换</div>
	<div class="menu-sep"></div>
	<div>
		<span>个人中心</span>
		<div style="width:150px;">
			<div onclick="setUserInfo();">个人信息</div>
			<div onclick="setUserPassword();">修改密码</div>
			<div onclick="setUserOpinion();">常用意见</div>
			<div onclick="setUserService();">过滤事项</div>
			<div onclick="setCallWinInfo();">叫号机屏幕显示号</div>
		</div>
	</div>
	<div onclick="chooseDeskTop();">桌面设置</div>
	<div onclick="logout();">注销</div>
	<div class="menu-sep"></div>
	<div>Exit</div>
</div>

<div id="shortcut" style="width:170px;display: none">
	<div id="sendShortcut" onclick="sendDesktopShortcut()">发送到桌面快捷方式</div>
	<div class="menu-sep"></div>
	<div>Exit</div>
</div>

<div id="desktopShortcut" style="width:170px;display: none">
	<div id="delShortcut" onclick="delDesktopShortcut()">删除</div>
	<div class="menu-sep"></div>
	<div>Exit</div>
</div>