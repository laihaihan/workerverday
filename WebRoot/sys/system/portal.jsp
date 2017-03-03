<%@page contentType="text/html;charset=UTF-8"%>
<html>
  <head>
     <title>门户配置中心</title>
	<%@include file="/sys/jsp/session.jsp"%>
	<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>/css/portal.css" />
	<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/index.js">	</script>
	<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/portalConfig.js"></script>
	<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/Portal.js"></script>
	<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/miframe.js"></script>
	<SCRIPT language=javascript src="<%=sSystemPath%>js/user/user.js"></SCRIPT>
	<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/menu.js"></script>
	<script type="text/javascript">
			Ext.onReady(function(){
			//加载门户列表
			portalConfig.initSelectPortal();
				var o =Ext.getDom("leftArrowhead1");
				o.style.height=Ext.getDoc().dom.body.clientHeight;
				Ext.getDom("portalIds").style.height=Ext.getDoc().dom.body.clientHeight-65;
			});
			
			window.resize=function()
			{
				var o =Ext.getDom("leftArrowhead1");
				o.style.height=Ext.getDoc().dom.body.clientHeight;
				Ext.getDom("portalIds").style.height=Ext.getDoc().dom.body.clientHeight-65;
			}
				//向左收缩页面及页签最大化用到
	function pagebarleft(div,img)
	{
		var value=Ext.getDom("portalIds").value;
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
		///ucapPortal.init(value);//加载门户
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
		width:4px;
		height:31px;
		float:left;
	}
	.ucapSystemButtonListBox {
		height:24px;
		float:left;	
		padding-top:0px;*padding-top:3px;
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
		text-align:left;
		padding-top:6px;
	}
	.ucapSystemButtonListBox ul li img {
		margin-right:5px;
	}
	.textDisable {
		color:#999;
	}
	.ucapSystemButtonListSelect {
		background:url(images/button_bg.gif) repeat right;
	}

	.ucapSystemMain {
		background-color:#FFF;
		border-top:none;
	}
	.ucapSystemLeft {
		width:260px;
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
		width:260px;
		height:24px;
		background:url(images/tree_menu_bg.gif) repeat-x center top;
		text-align:center;
		color:#FFF;
		font-weight:bold;
	}
	.ucapSystemTreeContent {
		width:260px;
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
	.leftArrowhead1{margin-bottom:-100000px;float:left;cursor:pointer;} 
	.leftArrowhead1{
	width:7px;
	float:left;
	padding-top:0px;
	background: url(../../uistyle/style_1/ucapimages/left_arrowhead_bg.gif) repeat-y center top;
	cursor:pointer;
	
}
	-->
	</style>
  
  </head>
  <body>
  <div>
		
		
		<div id="ucapSystemMain" class="ucapSystemMain">
			<div id="ucapSystemLeft" class="ucapSystemLeft">
			<div class="ucapSystemButtonList">
			<div class="ucapSystemButtonListLeft"></div>
			<div id="ucapSystemButtonListBox" class="ucapSystemButtonListBox">
				<ul>
					<li btnType="01" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:portalConfig.newPortal();">
						<img src="images/icon_create_1.gif" align="absmiddle" />新建门户</a></li>
						
					<li btnType="02" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:portalConfig.copyPortal();">
						<img src="images/icon_00_00_04.gif" align="absmiddle" />复制门户</a></li>
				
						
					<li btnType="03" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:portalConfig.deletePoral();">
						<img src="images/icon_del.gif" align="absmiddle" />删除门户</a></li>
				</ul>
			</div>
		</div>
				<div class="ucapSystemTree">
					<div id="ucapSystemTreeMenu" class="ucapSystemTreeMenu">
						<div style="float:left;width:90%;text-align:center;">可管理的门户列表</div>
						<div style="padding:2 5 0 0;float:right;">
							<img src="images/icon_00_00_01.gif" style="cursor:hand;" qtip="刷新" onclick="portalConfig.initSelectPortal();"/>
						</div>
					</div>
					<div id="ucapMainLeft" class="ucapSystemTreeContent">
					 	<select name="portalIds" id="portalIds" multiple="multiple" style="height: 100%;width:250px" onchange="portalConfig.changeSelectPortal();">
                        </select>
                      
					</div>
				</div>
			</div>
			<div id="leftArrowhead1"  class="leftArrowhead1" onclick="pagebarleft('ucapSystemLeft','ucapSystemLeftBar')" style="display:none1;">
				<img id="ucapSystemLeftBar" src="images/arrow_01.gif" border="0" style="display:none";/>
			</div>
			<div id="dialogPortalHtml" style="float:right;clear:right;" class="ucapSystemContent">
			<div class="ucapSystemButtonList">
			<div class="ucapSystemButtonListLeft"></div>
			<div id="ucapSystemButtonListBox" class="ucapSystemButtonListBox" style="width:99%">
				<ul style=float:right>
					<li btnType="04" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:portalConfig.selectPortalListConfirm();">
						<img src="images/icon_edit.gif" align="absmiddle" />保存门户</a></li>
							<li btnType="05" onmouseover="this.className='ucapSystemButtonListSelect'" onmouseout="this.className=''">
						<a href="javascript:this.close();">
						<img src="images/icon_del.gif" align="absmiddle" />关闭</a></li>
						</ul>
			</div>
		</div>
			 <table class="tableSet" id="systemSet" >
                        <tr>
                            <td width="20%">
                                门户名称</td>
                            <td >
                                <input type="text" class="inputbox" name="name" id="name" />
                                  <input type="text" class="inputbox" name="unid" id="unid" style="display: none;" />
                            </td>
                        </tr>
                        <tr>
                            <td >
                                使用范围</td>
                            <td >
                                <input type="text" class="inputbox" name="useScopes" id="useScopes" style="display: none;" />
                                <textarea class="inputred" readonly name="useScopes_Cn_" id="useScopes_Cn_" ></textarea>
                                <input type="button" value="选" onclick="selectDataSD('203','0','useScopes');" />
                            </td>
                        </tr><%--
                        <tr>
                            <td>
                                不能使用范围</td>
                            <td>
                                <input type="text" class="inputbox" id="unuseScopes" name="unuseScopes" style="display: none;" />
                                <textarea class="inputred" readonly id="unuseScopes_Cn_" name="unuseScopes_Cn_" ></textarea>
                                <input type="button" value="选" onclick="selectDataSD('203','0','unuseScopes');" />
                            </td>
                        </tr>
                           --%>
                           <input type="text" class="inputbox" id="unuseScopes" name="unuseScopes"  style="display: none;"/>
                                <textarea class="inputred" readonly id="unuseScopes_Cn_" name="unuseScopes_Cn_" style="display: none;"></textarea>
                                <input type="button" value="选" onclick="selectDataSD('203','0','unuseScopes');" style="display: none;"/>
                           <tr>
                            <td colspan="2">
                            	<div id="portal_id" class="rightPortal" >	
								</div>
								<div id ="portal_info" style="display: none;" ></div>
								<div id ="portalcfgid" style="display: none;" >门户配置的标志，存在这个id则表明是在配置门户</div>
                            </td>
                        </tr>
                    </table>
			</div>
		</div>
	</div>
  </body>
</html>
