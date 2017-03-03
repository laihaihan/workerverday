
/**
 * 系统的路径
 * @author yjianyou@linewell.com
 * @since 2011-08-16
 */
var appPath = "/" + 
	location.pathname.split("/")[(location.pathname.indexOf("/")>0?0:1)] + "/";
	
var index={
		/**
		 * 应用建模中心
		 */
	   openAmc:function(){
            window.open("build/", "buildWin",
                "height=" + (window.screen.availHeight) + ",width=" + screen.width + "," + 
                "top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no");
	   },
	   /**
		 * 参数配置中心
		 */
	   openPmc:function(){
	   	    window.open(appPath +"system/index.jsp");
	   },
	   /**
		 * 用户管理中心
		 */
	   openUmc:function(){
	   	    window.open(appPath +"UMC");
	   },
	   /**
		 * 分级管理中心
		 */
	   openManager:function(){
	   	    window.open(appPath +"sys/system/index.jsp");
	   },
	   /**
		 * UDDI中心
		 */
	   openUDDI:function(){
	   	    window.open(appPath +"UDDI");
	   },
	   /**
		 * 代码生成工具
		 */
	   openGct:function(){
	   	    window.open(appPath +"CGT/index.jsp");
	   },
	   /**
		 * 版本控制中心
		 */
	   openVmc:function(){
	   	    window.open(appPath +"TOOLS/VMC");
	   },
	    /**
		 *  数据集成中心
		 */
	   openDic:function(){
	   	    window.open(appPath +"TOOLS/DIC");
	   },
	    /**
		 * 监控中心 
		 */
	   openMmc:function(){
	   	    window.open(appPath +"TOOLS/MMC");
	   }
	}
	
/**
 * 用户登出
 */
var logout = function(){
  // 与Action的交互
  jQuery.ajax({
     type : "POST",
     url : actionUrl,
     data : "type=ucapLogin&act=Logout",
     async : true,
     // 提交成功处理
     success : function(json) {
       // 如果返回的是错误信息
       if (json && json.exceptionMsg) {
         alert(json.exceptionMsg);
         return ;
       }    
         
       //登录首页
       window.location = "login.jsp";
       
     },
     // 处理错误状态
     statusCode : {
       404 : function() {
         alert('page not found');
       }
     }
   });
};