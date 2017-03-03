<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%
/**
 * 新建应用系统的页面
 * @author xhuatang@linewell.com
 * @since 2011-12-01
 */
//获取应用系统的unid
String appUnid = request.getParameter("appUnid");
if(StringUtils.isEmpty(appUnid)){
	appUnid = "";
}
%>
<!DOCTYPE html>
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>应用建模平台</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
<script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
<script language="javascript" src="<%=systemPath%>default/js/linewell/linewell.core.js"></script>
<script language="javascript" src="<%=systemPath%>default/js/jquery.cookie.js"></script>
<script language="javascript" src="../js/linewell.ucap.admin.settings.js"></script>
<link href="../style/build.css" rel="stylesheet" type="text/css" />
<!-- start以下是应用extjs库 -->
<link rel="stylesheet" type="text/css" href="<%=userStylePath%>css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=userStylePath%>css/ext-patch.css" />
<link rel="stylesheet" type="text/css" href="<%=systemPath%>js/ucap/calendar/skin/WdatePicker.css" />
<script type="text/javascript" src="<%=systemPath%>js/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ext/ext-all.js"></script> 
<script type="text/javascript"  src="<%=systemPath%>js/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/util/common.js"></script>
<!--end -->
<style type="text/css">
*html html,*html body{overflow:hidden;}
*{
    margin: 0;
    padding: 0; 
}
html,body{
    height:100%;
    width:100%;
    margin: 0;
    padding: 0;    
}

#container {
   min-height:100% !important;
   height:100%;
   position:relative;  
}

#header{
}

/*fix ie6 and ie7 bug*/
*html #areaMain,*+html #areaMain {   
   /*padding-bottom:55px;   /* Height of the footer */
   height: expression(documentElement.clientHeight-55-87);
}

#footer {
   position:absolute;
   bottom:0;
   width:100%;
   height:55px;   /* Height of the footer */
}
</style>
<script language="javascript">

/**
 * 应用系统名称
 */
var appName = "";

/**
 * 当前步骤的索引
 */
var stepIndex = 0;


/**
 * 作为父窗口的事件
 */
var parentEvent = {
    
};

//iframe默认的链接
var defaultUrl = "appSetting.jsp?appUnid=<%= appUnid %>";

(function($){

//默认数据分离
$.cookie(linewell.ucap.admin.settings.cookies.IS_NEW_APP_COOKIE, 
    "<%= appUnid %>" == "" ? "true" : "false");
    
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
    
    //最后一步
    $btnOk.click(function(){
        window.close();
    });

    /**
     * 定义导航栏选中
     */
    function navSet(){

         	for(var i=1; i<6; i++){
         	
      		$(".navBtn"+i+"_on").addClass("navBtn"+i);
      		$(".navBtn"+i+"_on").removeClass("navBtn"+i+"_on");
      		
      		$(".navBtn"+i+"_over").addClass("navBtn"+i);
      		$(".navBtn"+i+"_over").removeClass("navBtn"+i+"_over");
      		
      		
      		if(i == (stepIndex+1)){
      		
      			$(".navBtn"+i).addClass("navBtn"+i+"_on");
      			$(".navBtn"+i).removeClass("navBtn"+i);
      		}
      		else if(i < (stepIndex+1)){
      			$(".navBtn"+i).addClass("navBtn"+i+"_over");
      			$(".navBtn"+i).removeClass("navBtn"+i);   		
      		}   		
      	}	    		
    }
    
    parentEvent.stepAdd = function(){stepIndex ++;navSet();}
    
    /**
     * iframe 页面加载完成
     */    
    $("#formFrame").load(function(){       
	    var $btnPre = $("#footerBtnPre");
	    var $btnNext = $("#footerBtnNext");
	    
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
	        
	        //上一步单击事件     
	        $btnPre.click(function(){
	           stepObj.preAction();     
	                 
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
	        
	        
	        //先解除所有click事件的绑定
	        $btnNext.unbind("click");
	        
	        //下一步单击事件
	        $btnNext.click(function(){
	           stepObj.nextAction();
	              if(stepObj.canGoNext){  
	                 stepIndex ++;    
	                 navSet();      
	                 iframeObj.location.href = stepObj.nextUrl + "&" + Math.random();            
	              }
	           });
	    }else{
	       $btnOk.show();
           $btnNext.hide();
        }
    });
    
    //加载默认链接,在load后面加载 ，保证每次都可以加载到
    iframeObj.location.href = defaultUrl + "&" + Math.random();

});

})(jQuery);

</script>
</head>

<body>

<div id="container">

    <!--页眉 begin-->
	<div id="header" class="header">
	
	    <!-- LOGO -->
	    <div class="logo">
	    </div>
	
	    <!-- 导航 -->
	    <div class="nav">
	        <!-- 按钮区 -->
	        <div class="navButtons">
	            <!-- 系统配置 -->
	            <div class="navBtn1_on"></div>
	        
	            <!-- 间隔 -->
	            <div class="navGap"></div>
	        
	            <!-- 数据库配置 -->
	            <div class="navBtn2"></div>
	            
	            <!-- 间隔 -->
	            <div class="navGap"></div>
	            
	            <!-- 业务建模 -->
	            <div class="navBtn3"></div>
	            
	            <!-- 间隔 -->
	            <div class="navGap"></div>
	            
	            <!-- 界面建模 -->
	            <div class="navBtn4"></div>
	
	            <!-- 间隔 -->
	            <div class="navGap"></div>
	            
	            <!-- 系统预览 -->
	            <div class="navBtn5"></div>         
	
	        </div>
	    </div>
	    
	</div>
	<!--页眉 end-->
	
	<!-- 主区域 begin-->
	<div id="areaMain" class="areaMain">
	    <iframe width="100%" height="100%" 
	       frameborder="0" marginheight="0" marginwidth="0" id="formFrame"></iframe>
	</div>
	<!-- 主区域 end-->	
	
	<!--页脚 begin-->
	<div id="footer" class="footer">
	
	    <!-- 按钮区域 -->
	    <div class="footerBtn">
	    
	        <!-- 上一步 -->
	        <div class="footerBtnPre" id="footerBtnPre" style="display:none;"></div>
	
	        <!-- 下一步 -->
	        <div class="footerBtnNext" id="footerBtnNext" style="display:none;"></div>
	        
	        <!-- 完成 -->
            <div class="footerBtnOk" id="footerBtnOk" style="display:none"></div>
	    </div>
	    
	</div>
	<!--页脚 end-->
</div>

</body>

</html>
