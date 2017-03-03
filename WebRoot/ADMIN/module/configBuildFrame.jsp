<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%
/**
 * 配置生成信息
 * @author by xhuatang@linewell.com
 * @since 2011-12-01
 */
//获取业务模块标识
String moduleUnid = request.getParameter("moduleUnid");
//系统的UNID
String appUnid = request.getParameter("appUnid");
//如果是不存在系统与模块传值，直接默认为出错，退出不做处理
if(StringUtils.isEmpty(moduleUnid) 
		|| StringUtils.isEmpty(appUnid)){
    return;
}

//是否有流程
String isFlow = request.getParameter("isFlow");
if(StringUtils.isEmpty(isFlow)){
    isFlow = "";
}
%>
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>是否为流程的选择</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />	
	<link href="style/pop.css" rel="stylesheet" type="text/css" />
	<script language="javascript"
	   src="<%=systemPath%>default/js/jquery-1.6.1.min.js"></script>
	<script language="javascript" src="../js/pageStep.js"></script>
	<%@include file="../include/platformresources.jsp"%>
<style>
html{overflow:hidden;}
body{overflow:hidden;scroll:no;}
.topToolbar{/*line-height:30px;height:30px;padding-left:10px;*/height:0;}
#areaMain{position:absolute;top:0px;bottom:10px;right:0px;left:0px;}
#areaMain iframe{overflow:hidden;}
/*fix ie6 and ie7 bug*/
*html #areaMain,*+html #areaMain {   
   /*padding-bottom:55px;   /* Height of the footer */
   height: expression(documentElement.clientHeight);
}
</style>	
<script language="javascript">
/**
 * 当前步骤的索引
 */
var stepIndex = 0;

(function($){

/**
 * 页面加载完成
 */
$(function(){
    
    
    //如果有流程，自动选择
    if("<%= isFlow%>" === "1"){
        $("#isFlow").attr("checked", true);
    }
    
    
    //iframe对象
    var iframeObj = document.getElementById("formFrame").contentWindow;
    
    //iframe的链接
    var defaultIframeUrl = "viewcolumnsConfig.jsp?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>&isFlow=<%=isFlow%>";
    
    /**
     * 定义导航栏选中
     */
    function navSet(){        
    	 
    }
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
	    
	    return;
	    
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
                  iframeObj.location.href = stepObj.preUrl;            
               }
	           
	        });
	    }else{
	       $btnPre.hide();
	    }
	    
	    //通过判断是否可以跳转到下一步处理相应的逻辑
	    if(stepObj.nextUrl){
	        $btnNext.show();
	        $btnNext.unbind("click");
	        
	        //先解除所有click事件的绑定
	        $btnNext.click(function(){
	           stepObj.nextAction();
               if(stepObj.canGoNext){  
                  stepIndex ++;    
                  navSet();      
                  iframeObj.location.href = stepObj.nextUrl;            
               }
            });
	    }else{
           $btnNext.hide();
        }
    });
    
    var iframeUrl = defaultIframeUrl;
         
    //加载表单
    iframeObj.location.href = iframeUrl;

});

})(jQuery);


//定义上一步的链接
pageStep.preUrl = "formList.jsp?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>&isFlow=<%=isFlow%>";

//定义下一步的链接
pageStep.nextUrl = "formUIDesigner.jsp?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid%>&isFlow=<%=isFlow%>";

/**
 * 处理下一步的逻辑
 */
pageStep.nextAction = function(){
     //定义iframe对象 
    var iframeObj = document.getElementById("formFrame").contentWindow;
    if(undefined!=iframeObj && null!=iframeObj){
    	iframeObj.saveViewColumns();
    }
    
    //保存
    this.canGoNext = true;
}

/**
 * 处理上一步的逻辑
 */
pageStep.preAction = function(){
    this.canGoPre = true;   
}

</script>  	
  </head>
  <body>
  <!-- 主区域 begin-->
<div class="areaMain" id="areaMain">
        <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" id="formFrame" name="formFrame"></iframe>
        <!-- 按钮区 -->
		<div class="popBtns" style="display:none;">
			<input name="Button1" type="button" value="下一步" id="footerBtnNext" style="display:none;"/>
			<input name="Button1" type="button" value="上一步" id="footerBtnPre" style="display:none;"/>
		</div>
</div>
<!-- 主区域 end-->
  </body>
</html>