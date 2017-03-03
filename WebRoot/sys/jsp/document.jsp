<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<% 
  String div = request.getParameter("div");
  String sSystemPath = request.getContextPath()+"/";
  //add by llp 2012-06-04 ,判断是否有流程，有的话加载流程的相关js
  String instanceUnid = request.getParameter("instanceUnid");
  String flowUnid = request.getParameter("flowid");
  boolean isFlow = false;
  if(StringUtils.isNotEmpty(flowUnid) || StringUtils.isNotEmpty(instanceUnid)){
	  isFlow = true;
  }
%>
<jsp:include  page="/sys/jsp/session.jsp"/>
<!-- mdy by llp 2012-06-04 由于发送对话框在有时打开会出现延时（30s）加载的情况，在ucapFlowSend.jsp脚本动态加载改在document.jsp中进行静态加载 -->
<!--具体参考修改原因参考BUG1182-->
<%if(isFlow){%>
<SCRIPT language=javascript src="<%=sSystemPath%>js/ucap/flow/ucapCommonOptions.js"></SCRIPT>
<SCRIPT language=javascript src="<%=sSystemPath%>js/ucap/flow/ucapSendFlow.js"></SCRIPT>
<SCRIPT language=javascript src="<%=sSystemPath%>js/ucap/flow/ucapOpinion.js"></SCRIPT>
<%}%>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
<div style="display:none;" id="ucap_document_title"></div>
<!-- Header Begin-->
<%

String buttonDivName="toolBarButton";
if ("1".equals(div) ){
	buttonDivName="secondToolBar";
}
String unid = request.getParameter("unid");
String type = request.getParameter("type");
String formId = request.getParameter("formId");
String openDirect = request.getParameter("openDirect");
String r = request.getParameter("r");

%>
<!-- 顶部菜单 -->
<div id="ucap_topMenu" class="topMenu" style="display:none;">
</div>
<%
 if ("1".equals(div)){
%>
	<div>
	<div id="_ucapFormDocTitle" style="float:left;position:absolute;padding:5px 0px 0px 5px;"></div>
	<div id="<%=buttonDivName%>"><!-- 按钮区 --></div>
	</div>
<%
}else if("-1".equals(div)){
	//隐藏按钮
%>
	<!-- 
	<div style="display:none;">
	<div id="_ucapFormDocTitle" style="float:left;position:absolute;padding:5px 0px 0px 5px;"></div>
	<div id="<%=buttonDivName%>"></div>
	</div>
	 -->
<%
}else{ 
%>
	<div id="toolBar">
	<div id="_ucapFormDocTitle" style="float:left;position:absolute;padding:5px 0px 0px 5px;"></div>
	<div id="<%=buttonDivName%>"><!-- 按钮区 --></div>
	</div>
<%}%>
<!-- Header End -->
<!-- 放置页签及页签相应DIV -->
<div id="_ucap_main_body">
	<div id="_ucap_main_div" class="showBox">
	</div>
	<div id="rightMenu">
	  <!-- 右侧区 -->
	</div>
</div>
<%
if(  div==null || !"1".equals(div)) {
 %>
<%@include file="/sys/jsp/footer.jsp"%>
<%} %>
</body>
<script language="javascript">
	var _ucapDocLoad = false;//用于二级界面页签加载时判断不再执行document.jsp页面的Ext.onReady()事件
	var _ucapDistb = "<%=div%>";
	var _ucapButtonDivName ="<%=buttonDivName%>";
	Ext.onReady(function(){
		//增加流程提示的js函数 
		ucapFlowFun.completeFlowConfirmFun=completeFlowConfirmFun;
		ucapFlowFun.sendFlowDialogConfirmFun=sendFlowDialogConfirmFun;
		//end 增加流程提示的js函数 csj 2010.3.16 
		if(_ucapDocLoad)return;
		var unid = "<%=unid%>";;
		var type = "<%=type%>";
		var formId = "<%=formId%>";
		//是否是从其他地方直接打开，这时可能 opener（即没有父文档)为空
		var openDirect ="<%=openDirect%>";		
		if (typeof openDirect=="undefined") openDirect ="";
		if (!ucapCommonFun.haveOpener() && openDirect=="" && !window.parent){
			Ext.Msg.alert("查看提示","当前文档的父文档已被关闭，不能查看");
			return;
		}
		var r = "<%=r%>"; //有值只会在 iframe的视图中
		if (r==0 && r!=""){
			_UcapForm.cfg.fatherIsRead = 0;
		} else {
			_UcapForm.cfg.fatherIsRead = 1;
		}
		_UcapForm.ucapForm(unid,type,formId);
		_ucapDocLoad = true;
		//进行多页签的高度设置
		/*
		*divId,用于放视图iframe的容器，目前只有form.js中调用时用到
		*/
		var setDocuemntHeight = function(divId){
			if(window.top!=window.self){
				//防止首页出现Y滚动条 modify by jc 20100421
				window.top.document.body.style.overflowY="hidden";
			}
			var intHC = 13;//高度误差值
			var intWC = 23;
			var footHeight = parseInt($("footer")?$("footer").clientHeight:"0")||0;
			var headHeight = parseInt($("<%=buttonDivName%>").clientHeight)||0;
			var clientHeight = Ext.getDoc().dom.body.clientHeight;
			var infoHeight = clientHeight-headHeight-footHeight;
			var ucap_topMenu = parseInt($("ucap_topMenu").clientHeight)||0;
			$("_ucap_main_div").style.height=(infoHeight-intHC-ucap_topMenu)+"px";
			if(type=="03"){
				var showMenu = parseInt($("showMenu")?$("showMenu").clientHeight:"0")||0;
				$("showTabBody").style.height=(infoHeight-intHC-ucap_topMenu-showMenu)+"px";
				window.documentHeight = infoHeight-intHC-ucap_topMenu-showMenu;
			}else{
				$("showBoxNoTab").style.height=(infoHeight-intHC-ucap_topMenu)+" px";
				window.documentHeight = infoHeight-intHC-ucap_topMenu;
			}
			ucapCommonFun.setIframeViewWidth(intWC);
			var ifr = null;
			//窗口发生变化时,iframe属性为ucapAutoHeight!=no的所有iframe高度自适应,mdf by jc 20100716
			if(!divId){
				ifr = Ext.query("iframe[ucapAutoHeight!='no']");
			}else{
				ifr = Ext.query("div#"+divId+" iframe[ucapAutoHeight!='no']");
			}
			if(ifr){
				for(var i=0;i<ifr.length;i++){
					if(ifr[i].contentWindow.view){
						var viewHeight = window.documentHeight||300;
						ifr[i].style.height = (viewHeight)+"px";
						ifr[i].contentWindow.view.setGridHeight(null,viewHeight);
					}
				}
			}
		};
		try{
			setDocuemntHeight();
			//设置三级界面自适应高度
			window.onresize = setDocuemntHeight;
		}catch(e){}
		
		//2011-12-12 modify by xhuatang@linewell.com 添加打开的文档被iframe内嵌时的高、宽
		try{
            var winObj = window.top;
            //如果是在iframe打开，则执行该事件
            if(window.location.href !== winObj.location.href){
                if(!winObj.ucapCommonFun || "02" === ucapSession.opendocType){//2011-12-20 modify by cguangcong@linewell.com
                														      //判断当前为div打开时，不重新计算高宽 bug1039
                    return;
                }
	            winObj.ucapCommonFun.setIframeViewHeight();
	            winObj.ucapCommonFun.setIframeViewWidth();
            }
        }catch(e){
        }
		//Ext模板测试
		//_ucap_form();
		//_UcapForm.ucapForm.selectTag(0);
		

	});
	
</script>
