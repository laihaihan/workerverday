<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<!DOCTYPE html>
<html>

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>应用系统管理中心</title>
<link rel="stylesheet" type="text/css" href="<%=userStylePath%>css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=userStylePath%>css/ext-patch.css" />
<link href="../style/systemManage.css" rel="stylesheet" type="text/css" />

<!-- <script type="text/javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script> -->
<script type="text/javascript" src="<%=systemPath%>js/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ext/ext-all.js"></script> 
<script type="text/javascript"  src="<%=systemPath%>js/ext/ext-lang-zh_CN.js"></script>

<script type="text/javascript" src="<%=systemPath%>js/ucap/util/common.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/portal/menuConfig.js">  </script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/portal/form.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/view/view.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/view/viewTree.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/view/viewConfig.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/view/viewConditionCfg.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/dept/dept.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/dict/dictTree.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/util/validator.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/util/treeUi.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/select/listSelect.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/shortCut/shortConfig.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/calendar/WdatePicker.js" ></SCRIPT>
<SCRIPT type="text/javascript" src="<%=systemPath%>js/ucap/flow/ucapFlow.js"></SCRIPT>
<script type="text/javascript" src="<%=systemPath%>js/ucap/configLog/configLog.js" ></SCRIPT>
<script type="text/javascript" src="<%=systemPath%>js/ucap/userInfo/modifyPassword.js" ></SCRIPT>
<script type="text/javascript" src="<%=systemPath%>js/ucap/changeDB/changeDB.js" ></SCRIPT>
<script type="text/javascript" src="<%=systemPath%>js/ucap/function/function.js" ></SCRIPT>
<script type="text/javascript" src="<%=systemPath%>js/ucap/permission/permission.js"></script>
<SCRIPT language=javascript src="<%=systemPath%>js/ucap/portal/sysindex.js"></SCRIPT>
<SCRIPT language=javascript src="<%=systemPath%>js/ucap/unit/unit.js"></SCRIPT>
<SCRIPT language=javascript src="<%=systemPath%>js/ucap/util/ComboBoxTree.js"></SCRIPT>
<SCRIPT language=javascript src="<%=systemPath%>js/ucap/userInfo/synUser.js"></SCRIPT>
<SCRIPT type="text/javascript" src="<%=systemPath%>js/ucap/pushUpdate/compareResultTree.js"></SCRIPT>

<style type="text/css">
<!--
td {
    font-size:12px;
}
a, a:link, a:visited {
    color:#484848;
    text-decoration:none;
}
a:hover {
    color:#F00;
    text-decoration:none;
}
img {
    border:0;
}
.ucapSystemHeader {
    width:100%;
    height:75px;
    background:url(images/top_bg.gif) repeat-x center;
}
.ucapSystemToolBox {
    width:340px;
    height:65px;
    background:url(images/top_right.gif) no-repeat right center;
    float:right;
    padding:10px 0px 0px 80px; 
    color:#022B56;
}
.userText {
    color:#FFF;
    font-weight:bold;
}
.quitText, a.quitText:link, a.quitText:visited {
    color:#FF0;
    text-decoration:none;
}
a.quitText:hover {
    color:#F00;
    text-decoration:none;
}
.ucapSystemButtonList {
    height:31px;
    background:#FFF url(images/button_list_bg.gif) repeat-x center top;
    clear:both;
}
.ucapSystemButtonListLeft {
    width:24px;
    height:31px;
    float:left;
}
.ucapSystemButtonListBox {
    height:24px;
    float:left; 
    padding-top:3px!important;
}
.ucapSystemButtonListBox ul {
    list-style:none;
    margin-left:0px;
    margin-top:0px;
    padding-left:0px;
}
.ucapSystemButtonListBox ul li {
    float:left;
    width:85px;
    height:24px;
    text-align:center;
    padding-top:3px;
}
.ucapSystemButtonListBox ul li img {
    margin-right:5px;
}
.textDisable {
    color:#999;
}
.ucapSystemButtonListSelect {
    background:url(images/button_bg.gif) no-repeat right;
}

.ucapSystemMain {
    background-color:#FFF;
    border-top:none;
}
.ucapSystemLeft {
    width:222px;
    float:left;
}
.ucapSystemSearch {
    width:260px;
    height:40px;
    background:url(images/search_menu_bg.gif) no-repeat center;
    margin:3px;
    padding:15px 0px 0px 54px;
}
.ucapSystemTree {
    margin:0px 1px 1px 1px;
}
.ucapSystemTreeMenu {
    width:220px;
    height:24px;
    background:url(images/tree_menu_bg.gif) repeat-x center top;
    text-align:center;
    color:#FFF;
    font-weight:bold;
}
.ucapSystemTreeContent {
    width:220px;
    overflow:auto;
    border:#BDC6CB 1px solid;
    border-top:none;
    padding:1px 0px 0px 1px;
}
.ucapSystemContraction {
    width:7px;
    background-color:#E0F1FA;
    padding-top:272px;
    float:left;
    cursor:pointer;
}
.ucapSystemContent {
    width:auto;
    float:left;
    word-break:break-all;
}
.ucapSystemFooter {
    width:100%;
    height:18px;
    padding-top:7px;
    text-align:center;
    color:#FFF;
    clear:both;
}
-->
</style>

<script language="javascript">
/*//转义jQuery
(function($){

//加载完成执行
$(function(){
});//加载完成执行 end

})(jQuery);//转义jQuery end*/
</script>

<script type="text/javascript">
Ext.onReady(function(){
    //窗口最大化方法
    if(window.top == window.self){
        window.self.moveTo(0,0);
        window.self.resizeTo(screen.availWidth,screen.availHeight); 
    }
    
    if(window.top && window.top!=window && window.top.$(ucapSession.ucapModuleId) && window.top.$(ucapSession.leftArrowheadId)){
        window.top.$(ucapSession.ucapModuleId).style.display = "none";
        window.top.$(ucapSession.leftArrowheadId).style.display = "none";
        window.top.ucapCommonFun.autoMenuHeight();
    }
    ucapManagerTree.init("","ucapMainLeft");
    try{
        //设置index.jsp页面自适应宽度与高度
        window.onresize = function(){
            ucapCommonFun.setIframeViewHeight();
            ucapCommonFun.setIframeViewWidth();
        }
    }catch(e){}
});
</script>
</head>

<body>

<!--页眉 begin-->
<div class="topBox ">
	<!-- LOGO -->
	<div class="logo">
	</div>	
</div>
<!--页眉 end-->

<!--当前位置 begin-->
<div class="siteBox">
	<!-- Icon -->
	<div class="siteIcon"></div>
	<ul id="urlNav">
		<!-- <li><b>当前位置：</b></li>
		<li><a href="#">平台</a></li>
		<li>&gt;</li>
		<li><a href="#">系统</a></li>
		<li>&gt;</li>
		<li><a href="#">模块</a></li> -->
	</ul>
</div>
<!--当前位置 end-->

<!-- 中间区域 begin-->
<div class="midBox">
	<!-- 左区域 -->
	<div class="leftBox">
	
		<!-- 工具栏 -->
		<div class="treeToolBar">
		<dl>
			<dt>新建：</dt>
			<dd id="btnNewNode">
				<img src="../style/images/systemManage/btnAddNode.png" border="0"/>
				节点
			</dd>
			<dd id="btnNewSys">
				<img src="../style/images/systemManage/btnAddSystem.png" border="0"/>
				<label for="btnNewSys">系统</label>
			</dd>
			<dd id="btnNewModule">
				<img src="../style/images/systemManage/btnAddModule.png" border="0"/>
				模块
			</dd>
		</dl>
		
		<dl>
			<dt>操作：</dt>
			<dd id="btnCopy">
				<img src="../style/images/systemManage/btnCopy.png" border="0" id="fuzhi"/>
				复制
			</dd>
			<dd id="btnEdit">
				<img src="../style/images/systemManage/btnEdit.png" border="0"/>
				修改
			</dd>
			<dd id="btnDel">
				<img src="../style/images/systemManage/btnDelete.png" border="0"/>
				删除
			</dd>
		</dl>
		</div>
		
		<!-- 树 -->
		<div class="leftBoxTree" id="ucapMainLeft"></div>
	</div>
	
	<!-- 分隔条 -->
	<div class="separatorBox">
		<div class="separatorBtn" id="separatorBtn"></div>
	</div>
	
	<!-- 右区域 -->
	<div class="rightBox">
		<iframe src="appList.jsp" id="iframe" frameborder="0" ></iframe>
	</div>
</div>
<!-- 主区域 end-->

<!--页脚 begin-->
<div class="bottomBox ">
	Powered by Ucap © 2001-2011, Linewell Inc.	
</div>
<!--页脚 end-->

</body>

</html>
