<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.style.StyleManager"%>
<%@page import="com.linewell.ucap.platform.cache.style.Style"%>
<% 
	//WEB 应用路径
	String sSystemPath = request.getContextPath()+"/";
	Session ucapSession = (Session) request.getSession().getAttribute(
				Session.SESSION_NAME); 
	if(null==ucapSession)return;
	//个人样式
	Style style = ucapSession.getStyle();
	if(null==style){
		StyleManager sm = new StyleManager();
		style = sm.doFindAll().get(0);
		ucapSession.setStyle(style);
	}
	String sUserStylePath =sSystemPath+style.getPath()+"/";
%>
<html>
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ucap.css"/>
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-patch.css" />
<script type="text/javascript" src="<%=sSystemPath%>js/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ext/ext-all.js"></script>
<script type="text/javascript"	src="<%=sSystemPath%>js/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript"	src="<%=sSystemPath%>js/ucap/util/treeUi.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/util/common.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/select/listSelect.js"></script>
	<head>
	    <script>
	    var isCallBack=true;
	    //弹出选择窗口
	    function showSelectWindow(args){
		    if(null!=args){
			    var type=args[0]||"204";
			    var selNum=args[1]||"0";
			    var inputSplit=args[2]||"";
			    var outSplit=args[3]||"";
			    $("fitem_default_value").value=args[4]||"";
			    $("fitem_default_value_Cn_").value=args[5]||"";
			    var conValue=args[6]||"";
		    	selectDataSD(type,selNum,"fitem_default_value",conValue,"selectedCallBack",inputSplit,outSplit);
		    	ucapSession.commonSelectWin.setPosition(-10, -30);
		    	ucapSession.commonSelectWin.setWidth(ucapSession.commonSelectWin.width+17);
		    	ucapSession.commonSelectWin.setHeight(400);
		    	ucapSession.commonSelectWin.show(); 
		    	ucapSession.commonSelectWin.on("beforeclose",function(){
		    		if(isCallBack){
			    		selectedCallBack({selectWindow:'selectWindow'});
		    		}
		    	});
		    }else{
				alert("参数传递不正确!");
		    }
		}
		
		/*
		Ext.onReady(function(){
			selectDataSD("218",1,"fitem_default_value","","selectedCallBack");
		});
		*/
		
		//选择完后的回调函数
		function selectedCallBack(obj){
			isCallBack=false;
			var flexApp = parent.FABridge.flash.root();
			//调用Flex的方法
			flexApp.selectedCallBack(objToStr(obj));
		}
		//将对象转换成字符串传回Flex
		function objToStr(obj){
			if(null==obj)return "";
			var result="{";
			for(items in obj){
				var str="result+=\"'\"+items+\"':'\"+obj."+items+"+\"',\";";					
				eval(str);
			}
			result=result.substring(0,result.length-1);
			result+="}";
			return result;
		}
		
		function showObj(obj){
			var objStr="";
			for(items in obj){
				var str="objStr+=items+'='+obj."+items+"+'\\n';";
				eval(str);
			}
			return objStr;
		}
	    </script>
	</head>
	<body style="margin-top: 0px">
	<input type="hidden" id="fitem_default_value_Cn_" value="" class="inputred" />
	<input type="hidden" id="fitem_default_value" value=""/>
	  <center>
	  <br/><br/><br/><br/><br/><br/>
	  <!-- 
	  	<input type="button" onclick="selectedCallBack({selectWindow:'selectWindow'})" value="返回"/>
	   -->
	  </center>
	</body>
</html>