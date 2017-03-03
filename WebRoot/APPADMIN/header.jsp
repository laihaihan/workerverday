<%@page contentType="text/html;charset=UTF-8"%>
<head>
<%@include file="/sys/jsp/session.jsp"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/menu.js">	</script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/module/module.js">	</script>

</head>
<body>
<!-- Header Begin-->
<div id="headerBox" class="headerBox">
	<div id="topBar" class="topBar">
    	<div id="logo" class="logo"><img src="<%=sUserStylePath%>ucapimages/<%=logoName%>" /></div>
        <div id="topBarBox" class="topBarBox">
        	<div id="navigation_top" style="display:none">
	        	<div id="topBarTool" class="topBarTool">
	            	<div id="topBarToolLeft" class="topBarToolLeft"></div>
	                <div id="topBarToolBox" class="topBarToolBox">正在加载导航栏，请稍等......</div>
	                <div id="topBarToolRight" class="topBarToolRight"></div>
	            </div>
            </div>
            <!-- 菜单开始  -->
        	<div id=iconUcapMenu class="iconUcapMenu" style="display:none">
		        	<div class="rollBox" id="rollBox">
				      <div id ="leftBotton" style="display:none" class="LeftBotton" onmousedown="ISL_GoUp()" onmouseup="ISL_StopUp()" onmouseout="ISL_StopUp()"></div>
				      <div class="Cont" id="ISL_Cont">
						<span id = "iconMenuInfo" style="display:" class="red">正在加载菜单，请稍等......</span>				      
				        <div class="ScrCont" id="scrCont">
				          <div id="List1">
				            <!-- 大小图标 begin -->
				            <div id="iconMenu" style="display:none" class="iconMenu"></div>
				            <div id="iconMenu2" style="display:none" class="iconMenu2"></div>
				            <!-- 大小图标 end -->
				          </div>
				          <div id="List2"></div>
				        </div>
				      </div>
				      <div id ="rightBotton" class="RightBotton" onmousedown="ISL_GoDown()" onmouseup="ISL_StopDown()" onmouseout="ISL_StopDown()"></div>
				 	</div> 
				 </div>
			 </div>   
        </div>
        <!-- Menu Begin-->        
        <div id="ucapMenu" style="display:none">
        	<div class="menuBack">正在加载菜单，请稍等.....</div>
        </div>
        <!-- Menu End-->     
         <div id="navigation" style="display:none" class="userBar"></div>      
    </div> 
	<div id="topLine" class="topLine" onclick="pagebartop()">
		<img id="top" src="<%=sUserStylePath%>ucapimages/arrowhead_top_1.gif" alt="收缩"/></div>
	<div id="ucapMainLeft" class="ucapview">
		<div id="leftPortl" class="leftPortl"></div>
		<div id="ucapModule" class="ucapModule" style="display:none"></div>
	 </div>
	<div><!-- 防止ucapView与leftArrowhead换行显示 add by jc 20100618 -->
		<div id=leftArrowhead class="leftArrowhead" style="display:none" onclick="ucapModule.pagebarleft()">
			<img id=leftBar class="leftBar" src="<%=sUserStylePath%>ucapimages/arrowhead_left_1.gif" name="leftBar"/></div>
	   <div id="ucapView" style="float:right;clean:right"></div>
   </div>
 </body>	

