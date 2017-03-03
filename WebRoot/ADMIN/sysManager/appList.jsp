<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.util.UNIDGenerate"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="com.linewell.ucap.platform.authorized.app.AppManager"%>
<%@page import="java.util.List"%>

<%
/**
 * 应用系统列表展示页
 * @author zzhan@linewell.com
 * @since 2011-12-22
 */
List<App> appList = new AppManager().getAppBySession(ucapSession);
 int appCount = (null == appList ? 0 : appList.size());
%>
<!DOCTYPE html>
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>平台 | 系统管理 —— 南威UACP支撑平台</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
<script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
<script language="javascript" src="<%= systemPath %>default/js/linewell/linewell.core.js"></script>
<script language="javascript" src="<%= systemPath %>default/js/linewell/linewell.utils.js"></script>
<script language="javascript" src="<%= systemPath %>default/js/jquery.json-2.2.min.js"></script>
<script language="javascript"  src="<%=systemPath%>default/js/jquery.cookie.js"></script>

<script language="javascript" src="../js/common.js"></script>
<script language="javascript"  src="../js/linewell.ucap.admin.settings.js"></script>
<script language="javascript" src="../js/pageStep.js"></script>
<script language="javascript" src="../js/jquery.timers.js"></script>
<script language="javascript" src="../js/jquery.tipHelp.js"></script>

<link href="../style/moduleSetting.css" rel="stylesheet" type="text/css" />
<link href="../style/popNewForm.css" rel="stylesheet" type="text/css" />
<link href="../style/tip.css" rel="stylesheet" type="text/css" />
<script language="javascript">
//加载jquery
(function($){

   //页面加载完成后执行
   $(function(){
   			
   	//应用系统图标的路径
	var appIconPath = "../style/images/module/";

	//默认的应用系统图标
	var defaultAppIcon = "businessModelingBtn_0.png";

	//取消、删除按钮图标
	var cancleIcon = "cancel.png";		
	
   	//定义取消的图标的路径
    var cancleIconPath = appIconPath + cancleIcon;

   //取消图标的jQuery模板
    var $cancleIconTemplate = $("<img src='" + cancleIconPath + "'/>").addClass("cancleIcon");
    		
   	/**
	 * 管理按钮的事件
	 */
	$(".appManage").click(function(){ 
	    var $appManage = $(this); 
	    if("管理" === $appManage.val()){
	       changeAppStatus(false);
		   $appManage.val("取消");
		}else{
		   changeAppStatus(true);
		   $appManage.val("管理");
		}
	});

     /**
 		* 改变模块状态
 		* @param isNormal 是否为正常状态
 		*/
	function changeAppStatus(isNormal){    
	    if(!isNormal){       
	       $(".businessModelingBtn").unbind("click");
	       $(".businessModelingBtn").each(function(){
	           var $this = $(this);
	           var delAppUnid = $this.attr("unid");          
	           $cancleIcon = $cancleIconTemplate.clone();
	           $cancleIcon.click(function(){
	               if(confirm("此操作无法恢复！确定要删除选择的节点吗？")){
	               		//TODO
	                    //deleteApp(delAppUnid);
	               }
	           });
	           $cancleIcon.appendTo($this);        
	       });    
	       $("body").dblclick(function(){
	            changeAppStatus(!isNormal);
	       });   
	       $("#appManage").val("取消");
	    }else{
	       $("body").unbind("dblclick");       
	       $(".businessModelingBtn").click(function(){
	           openApp($(this).attr("unid"),$(this).attr("name"));
	       });       
	       $(".businessModelingBtn .cancleIcon").remove();
	       $(".appManage").val("管理");    
	    }
	}
	
    /**
	 * 应用系统点击件
	 */
	$(".businessModelingBtn").each(function(){
		var $app = $(this);
		 $app.click(function(){
	           openApp($app.attr("unid"),$app.attr("name"));
	       });   
	    
		 /*
		//添加mousedown的事件
        $app.mousedown(function(){
           $(this).oneTime("1s", "appDown", function(){
                changeAppStatus(false);
           });
        });
		//添加mouseup的事件
        $app.mouseup(function(){
            $(this).stopTime("appDown");
        });
        */
	});
	
	/**
 	 * 打开应用系统
     * @param appUnId 应用系统ID
     */
	function openApp(appUnId,name){ 
		window.top.ucapManagerTree.navNodeEvent(name);
	}
	
	   /**
 		* 初始化图片
 		*/
 		//TODO
 		function initImg(){
 			 $(".businessModelingBtn").each(function(){
 			 		var $this = $(this);
 			 		var src = $this.find("img").attr("src");
 			 });
 		}
   			
   });//页面加载完成后执行 end
})(jQuery);//加载jquery end
</script>
</head>
<body>
<!-- 主区域 begin-->
<div class="areaMain">
    <!-- 工具栏区域 -->
    <div class="businessModelingToolBar">
        <h1>平台</h1>
        <h2>共</h2>
        <h3><%=appCount %></h3>
        <h2>个应用系统</h2>
        <!--  
        <input class="toolBarAdd appAdd" name="toolAddBtn" id="appAdd" type="button" value="添加" />
        <input class="toolBarMg appManage" id="appManage" name="toolManageBtn" type="button" value="管理" />
        -->
    </div>
    
    <!--按钮区域 begin-->
    <div class="businessModelingBtns" id="appListBtns">
     	<!--应用系统列表 -->
			<%
		   		if(null != appList){
					for(App app:appList){	 
			%>
		   	<div class="businessModelingBtn" unid="<%=app.getUnid()%>" name="<%=app.getName() %>">
				<img alt="" src="../style/images/module/businessModelingBtn_0.png" class="moduleIcon"/>
				<a><%=app.getDisplayName()%></a>
			</div>	    
			<%}}%>		
    </div>
    <!--按钮区域 end-->
    
     
    <!-- 添加模块按钮 -->
    <!-- 
    <div class="businessModelingBtnAdd appAdd">新建应用系统</div>
     -->
</div>
<!-- 主区域 end-->
</body>
</html>