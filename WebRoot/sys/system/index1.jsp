<%@page contentType="text/html;charset=UTF-8"%>
<html>
  <head>
    <title>资源分级管理</title>
	<%@include file="/sys/jsp/session.jsp"%>
	<SCRIPT language=javascript src="<%=sSystemPath%>js/ucap/pushUpdate/compareResultTree.js"></SCRIPT>
	<script>
	//向左收缩页面及页签最大化用到
	function pagebarleft(div,img)
	{
		div=$(div);   
	    img=$(img);
		if (div.style.display=="") 
		{	img.src="images/arrow_02.gif";
			img.alt="伸展";
			div.style.display="none";
		}
		else
		{	img.src="images/arrow_01.gif";
			img.alt="收缩";
			div.style.display="";
		}
		///设置表格宽度
		//if(ucapCommonFun && ucapModule)
			//ucapCommonFun.setViewWidth(ucapModule.deductViewDivId);
		//ucapCommonFun.autoMenuHeight();
		//设置当前页面的视图宽度
			if (ucapSession.viewOpenType==1) {
				//如果是页签式的，还要重调所有iframe中视图的宽度
				ucapCommonFun.setIframeViewWidth();
			} else {
				if(ucapCommonFun && ucapModule)ucapCommonFun.setViewWidth();
			}
	}
	</script>
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
  </head>
  <body>
	<div>
		<div class="ucapSystemButtonList">
			<div class="ucapSystemButtonListLeft"></div>
			<div id="ucapSystemButtonListBox" class="ucapSystemButtonListBox">
				<ul>
					<li btnType="01" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:void(0);">
						<img src="images/icon_create_1.gif" align="absmiddle" />新建节点</a></li>
							
					<!-- <li class="textDisable"-->
					<li btnType="02" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:void(0);">
						<img src="images/icon_create_2.gif" align="absmiddle" />新建系统</a></li>
					
					<li btnType="03" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:void(0);">
						<img src="images/icon_create_3.gif" align="absmiddle" />新建模块</a></li>
					<!-- 
					<li btnType="04" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:void(0);">
						<img src="images/icon_00_00_01.gif" align="absmiddle" />刷新</a></li>
						 -->
					<li btnType="05" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:void(0);">
						<img src="images/icon_00_00_04.gif" align="absmiddle" />复制</a></li>
						
					<li btnType="06" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:void(0);">
						<img src="images/icon_edit.gif" align="absmiddle" />修改</a></li>
						
					<li btnType="07" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:void(0);">
						<img src="images/icon_del.gif" align="absmiddle" />删除</a></li>
				    <li btnType="08" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:void(0);">
						<img src="images/icon_del.gif" align="absmiddle" />代码生成</a></li>
					<!-- 
					<li btnType="08" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:void(0);">
						<img src="images/icon_00_00_02.gif" align="absmiddle" />推送</a></li>
					<li btnType="09" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:void(0);">
						<img src="images/icon_00_00_03.gif" align="absmiddle" />比较</a></li>
					<li btnType="10" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:void(0);">
						<img src="images/icon_00_00_05.gif" align="absmiddle" />更新</a></li>
						 -->
				</ul>
			</div>
		</div>
		
		<div id="ucapSystemMain" class="ucapSystemMain">
			<div id="ucapSystemLeft" class="ucapSystemLeft">
				<!-- <div class="search">&#160;&#160;名称：
				  <input type="text" name="ucapSystemLeft_search_name" style="width:100px;"/>
				  <a href="javascript:void(0);" onclick="searchTest('ucapSystemLeft_search_name');"><img src="images/btn_search.gif" width="50" height="22" border="0" align="absmiddle"/></a></div>
				   -->
				<div class="ucapSystemTree">
					<div id="ucapSystemTreeMenu" class="ucapSystemTreeMenu">
						<div style="float:left;width:90%;text-align:center;">分 级 管 理</div>
						<div style="padding:2 5 0 0;float:right;">
							<img src="images/icon_00_00_01.gif" style="cursor:hand;" qtip="刷新" onclick="ucapManagerTree.refreshNode();"/>
						</div>
					</div>
					<div id="ucapMainLeft" class="ucapSystemTreeContent"></div>
					<div id="leftPortl" style="display:none"></div>
					<div id="ucapModule" class="ucapModule" style="display:none"></div>
				</div>
			</div>
			<div id="leftArrowhead"  class="leftArrowhead" onclick="pagebarleft('ucapSystemLeft','ucapSystemLeftBar')" style="display:none1;">
				<img id="ucapSystemLeftBar" src="images/arrow_01.gif" border="0"/>
			</div>
			<div id="ucapView" style="float:right;clear:right;" class="ucapSystemContent"></div>
		</div>
		<div id="portal_id" class="rightPortal" style="display:none;">	
		</div>
		<div id ="portal_info" align="center" style="display:none;"></div>
	</div>
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
		    //ucapCommonFun.autoMenuHeight();
		    //document.body.style.overflowY="hidden";
		    try{
				//设置index.jsp页面自适应宽度与高度
				window.onresize = function(){
					ucapCommonFun.setIframeViewHeight();
					ucapCommonFun.setIframeViewWidth();
				}
			}catch(e){}
		});
		//function searchTest(name){
			//ucapManagerTree.contacterTree.root.findChild("text",$(name).value);
		//}
    </script>
  </body>
</html>
