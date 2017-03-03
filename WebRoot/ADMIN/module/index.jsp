<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@include file="../include/session.jsp"%>
<%
/**
 * 模块管理首页
 * @author 
 * @since 
 */
//获取应用系统的unid
String appUnid = request.getParameter("appUnid");
//如果为空，则为非法访问，直接退出不做处理
if (StringUtils.isEmpty(appUnid))
    return;

//业务模块标识
String moduleUnid = request.getParameter("moduleUnid");
//是否为更新操作的标识
boolean isUpdate = true;
if(StringUtils.isEmpty(moduleUnid)){
    moduleUnid = "";
    isUpdate = false;
}
%>
<!DOCTYPE html>
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<title>业务建模</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
<script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
<script language="javascript" src="../js/jquery.timers.js"></script>
<link href="style/stytle.css" rel="stylesheet" type="text/css"/>
<link href="../style/popNewForm.css" rel="stylesheet" type="text/css"/>
<%@include file="../include/platformresources.jsp"%>
<script language="javascript">
/**
 * 当前步骤的索引
 */
var stepIndex = 0;

/**
 * 作为父窗口的事件
 */
var parentEvent = {
    stepAdd : function(){stepIndex ++;}
};
/**
 * 模拟当前所属模块unid
 */
var ucapManagerTree = {
    curBelongToModuleId : "<%=moduleUnid%>"
};

//iframe默认的链接
var defaultUrl = "moduleInfo.jsp?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>";

//iframe连接的前缀数组
var UrlPreArray = ["moduleInfo.jsp","formList.jsp","configBuildFrame.jsp","formUIDesigner.jsp","viewList.jsp","visualflow.jsp"];

//iframe连接的参数
var urlParamter = "?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>&showTree=1";

//是否为流程
var isFlow = true;

(function($){

/**
 * 页面加载完成
 */
$(function(){

    //定义iframe对象 
    var iframeObj = document.getElementById("formFrame").contentWindow;   
    
    //上一步按钮
    var $btnPre = $("#footerBtnPre");
    
    //下一步按钮
    var $btnNext = $("#footerBtnNext");
    
    //确定
    var $btnOk = $("#footerBtnOk");
    
    
    
    /**
     * 加载模块视图
     * param moduleUnid 模块unid
     */
    parentEvent.showModuleView = function(moduleUnid){
    	var iframeObj = document.getElementById("popFrame");      
		iframeObj.src = "../sysManager/moduleViewList.jsp?moduleUnid=" + moduleUnid + "&appUnid=<%=appUnid%>&"+ Math.random();
		$("#moduleViewSelect").show();
    }
    
    /**
     * 执行步骤的事件
     */
    function postEvent(){        
        //第一步执行的事件，重新加载父窗口数据
        if(window.opener && window.opener.pageEvent
            && 0 === stepIndex){     
            //由于要更新缓存 ，1秒以后更新主页面的内容   
            $(window).oneTime("1s", "reloaddata", function(){
                window.opener.pageEvent.reloadData();
            });
        }
    }  
    
    /**
     * 是否显示流程的导航
     * @param isShow true为显示
     */
    parentEvent.showFlowNav = function(isShow){
    	isFlow = isShow;
        if(isShow){
            $(".navBtn:eq(5)").show();
            //若改变是否为流程，导航的链接发生改变，需要重新定义导航按钮的单击事件
            if(urlParamter.indexOf("&isFlow=1")<0){
            	urlParamter += "&isFlow=1";
	            loadNavEvent(<%=isUpdate%>);
            }
        }else{
            $(".navBtn:eq(5)").hide();
             if(urlParamter.indexOf("&isFlow=1")>0){
            	urlParamter = urlParamter.replace(/&isFlow=1/,"");
	            loadNavEvent(<%=isUpdate%>);
             }
        }
    }
    
    /**
     * 定义导航栏选中
     */
    function navSet(){
    	//更新模块时的样式处理方式
    	if(<%=isUpdate%>){
    		$(".navBtn").removeClass("on");
    		$(".navBtn").addClass("over");
    		$(".navBtn:eq("+stepIndex+")").removeClass("over");
    		$(".navBtn:eq("+stepIndex+")").addClass("on");
    	}
    	//添加模块时的样式处理方式
    	else{
    		$(".navBtn").removeClass("on");
	        $(".navBtn").removeClass("over");
	        $(".navBtn:lt("+stepIndex+")").addClass("over");
	        $(".navBtn:eq("+stepIndex+")").addClass("on");  
    	}
    }
    /**
     * iframe 页面加载完成
     */    
    $("#formFrame").load(function(){
        
	    var stepObj = iframeObj.pageStep; 
	    if(null === stepObj){
	       alert("加载页面失败！");
	       return;
	    }
	    
	    //通过判断是否可以跳转到上一步处理相应的逻辑
	    if(stepObj.preUrl){
	        $btnPre.show();	  
	        
	        //先解除所有click事件的绑定
	        $btnPre.unbind("click");
	        
	        $btnPre.click(function(){
	           stepObj.preAction();         
               //alert(stepObj.canGoPre);      
               if(stepObj.canGoPre){
                  stepIndex --;     
                  navSet();          
                  iframeObj.location.href = stepObj.preUrl + "&" + Math.random();            
               }
	        });
	    }else{
	       $btnPre.hide();
	    }
	    
	    //通过判断是否可以跳转到下一步处理相应的逻辑
	    if(stepObj.nextUrl){
	        $btnOk.hide();
	        $btnNext.show();        
	        
	        $btnNext.unbind("click");	        
	        //先解除所有click事件的绑定
	        $btnNext.click(function(){
	           stepObj.nextAction();
               if(stepObj.canGoNext){
                  postEvent();  
                  stepIndex ++;    
                  navSet();      
                  iframeObj.location.href = stepObj.nextUrl + "&" + Math.random();            
               }
            });
	    }else{
	       //最后一步
		    $btnOk.click(function(){
		    iframeObj.pageStep.nextAction();
		    	if(stepObj.canGoNext){
		        	window.close();  
		        }      
		    });
           $btnNext.hide();
           $btnOk.show();
        }
    });
    
    /**
     * 添加导航栏各个导航步骤的事件
     * @param isLoad true为添加
     */
     function loadNavEvent(isLoad){
    	  if(isLoad){
	    	 $(".navBtn").each(function(){
	    		var $this = $(this);
	    		$this.css("cursor","pointer")
	    		$this.unbind("click");
	    		$this.click(function(){
	    				$(".navBtn").removeClass("on");
	    				$(".navBtn").addClass("over");
	    				$this.removeClass("over");
	    				$this.addClass("on");
	    				var currentIndex = $this.index();
	    				//为第一步导航进行切换时，调用保存的方法
	    				if(stepIndex===0){
	    					//保存当前配置：即调用下一步的方法
		    				var stepObj = iframeObj.pageStep; 
		    				stepObj.nextAction();
	    				}
	    				stepIndex = currentIndex;
	    				var currentUrl = UrlPreArray[currentIndex]+urlParamter;
	    				iframeObj.location.href = currentUrl + "&" + Math.random();
	    		});
	    	});
    	 }
     }
    
     <%if(isUpdate){%>
     		//如果为更新模块时的初始化操作
		    if(isFlow){
		    	 defaultUrl +="&isFlow=1";
		    	 urlParamter +="&isFlow=1";
		     }
            $(".navBtn:eq(0)").addClass("on");
            $(".navBtn:gt(0)").addClass("over");
     		loadNavEvent(true);
    
     <%}%>
    //加载默认链接
    iframeObj.location.href = defaultUrl + "&" + Math.random();

});
})(jQuery);

/**
 * 获取父窗口url的参数
 */
function getParentUrlParameter (name) {
		var params = window.parent.location.search.slice(1).split('&');
		for (var i = 0; i < params.length; i++) {
			var temp = params[i].split("=");
			if (temp[0] == name) {
				return temp[1];
			}
		}
		return "";
}
</script>
</head>
<body>
<!-- 主区域 begin-->
<div class="areaMain">
  <iframe 
   scrolling="auto" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" id="formFrame"></iframe>
</div>
<!-- 主区域 end-->
<!--页眉 begin-->
<div class="header">
	<!-- LOGO -->
	<div class="logo">
	</div>
	<!-- 子LOGO -->
	<div class="logoSub">
	</div>
	<!-- 导航 -->
	<div class="nav">
		<!-- 基本信息 -->
		<div class="navBtn on">
			<h1>1</h1>
			<h2>基本信息</h2>
		</div>
		<!-- 数据表配置 -->
		<div class="navBtn">
			<h1>2</h1>
			<h2>数据表配置</h2>
		</div>
		<!-- 数据表配置 -->
        <div class="navBtn">
            <h1>3</h1>
            <h2>视图展示列</h2>
        </div>
		<!-- 展示配置 -->
		<div class="navBtn">
			<h1>4</h1>
			<h2>展示配置</h2>
		</div>
		<!-- 视图配置 -->
		<div class="navBtn">
			<h1>5</h1>
			<h2>视图配置</h2>
		</div>
		<!-- 流程配置 -->
		<div class="navBtn">
			<h1>6</h1>
			<h2>流程配置</h2>
		</div>
	</div>
</div>
<!--页眉 end-->
<!--页脚 begin-->
<div class="footer ">
	<!-- 按钮区域 -->
	<div class="footerBtn">
		<!-- 上一步 -->
		<div class="footerBtnPre" id="footerBtnPre" style="display:none"></div>
		<!-- 下一步 -->
		<div class="footerBtnNext" id="footerBtnNext" style="display:none"></div>
		<!-- 完成 -->
		<div class="footerBtnOk" id="footerBtnOk" style="display:none"></div>
	</div>
</div>
<!-- 内容 -->
        <div id="moduleViewSelect" class="popNewForm" style="display:none;" >
        	<div class="popNewFormTitle">请选择要展示在首页的的视图</div>
        	<div class="popmoduleViewContent">
	        <iframe width="100%" height="100%" 
	           frameborder="0" marginheight="0" marginwidth="0" id="popFrame"></iframe>
	        </div>
        </div>
<!--页脚 end-->
</body>
</html>
