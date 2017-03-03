<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@page contentType="text/html;charset=UTF-8"%> 
<%@page import="java.util.List"%>
<%@page import="java.util.Map"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@page import="com.linewell.ucapx.app.AppApi"%>
<%@page import="com.linewell.ucap.manager.Managers"%>
<%@page import="com.linewell.ucapx.businessmodule.BusinessModuleApi"%>
<%@page import="com.linewell.ucapx.redevelop.codetool.module.ModuleFormManager"%>
<%
//获取除平台以外的所有应用系统
AppApi appApi = new AppApi();
List<App> appList = appApi.getAppListExceptPlat();

//出错直接返回，不做处理
if(null == appList || appList.isEmpty()){
	return;
}


//当前应用系统的unid
App currentApp = null;

//应用的UNID
String appUnid = request.getParameter("appUnid");

if(StringUtils.isEmpty(appUnid)){
	//取得第一个APP为当前应用系统
	currentApp = appList.get(0);
}else{
	//获取当前appUnid的列表
	for(App item : appList){
		if(appUnid.equals(item.getUnid())){
			  currentApp = item;	
			  break;
		}
	}
}

//出错直接返回，不做处理
if(null == currentApp){
	  return;
}

appUnid = currentApp.getUnid();

//获取当前应用下的所有的模块
BusinessModuleApi businessModuleApi = new BusinessModuleApi();
List<Managers> currentModules = businessModuleApi.getModuleList(currentApp.getUnid());

ModuleFormManager moduleFormManager = new ModuleFormManager();
Map<String,Boolean> modulesStatus = moduleFormManager.getModuleStatus(currentModules);
%>
<%
String redirect = request.getParameter("redirect");
if(null == redirect)redirect = "";
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>第一步、选择代码生成的模块 - 代码生成工具</title>
<%@include file="include/common.jsp"%>

<script language="javascript" src="js/modulePrompt.js"></script>
<script language="javascript" src="js/jquery-appselector.js"></script>

<script type="text/javascript">
//选中模块的jQuery对象
var $selectedModule = null;

//页面加载完成后执行的代码
jQuery(function(){
(function($){
  /**
   * 选中的应用系统
   */
  var selectedAppId = "";
  /**
   * 加载下拉应用的事件
   */
  $(".selectbox").appSelector(function(selectedVal){
    if(selectedVal){
      selectedAppId = selectedVal;
      var url = "?appUnid=" + selectedAppId;
      window.top.location.href = url;      
    }
  });
  
  var selectedModuleId = "<%= moduleId%>";
  
  
  if(!selectedModuleId || 'null' === selectedModuleId){
        $selectedModule = $(".area_tree_list_title div:first");
  }else{
        $selectedModule = $(".area_tree_list_title div[id='" + selectedModuleId +"']");
  }
  
  /**
   * 对模块的选择
   */
  $(".area_tree_list_title div").click(function(){
		$(".area_tree_list_title div").removeClass("current");
	    $(this).addClass("current");   
	    $selectedModule = $(this);
	    formRelation.init($(this).attr("id"));
  });
  
  $selectedModule.click();
  
  //
  $("#appNameEn").blur(function(){
      var result = validateNameEn($(this).val());
      if(!result){
        showNameEnError();
      }
  });
  
})(jQuery);//把jQuery作为参数传递进去执行，保证可以用$
});

//应用系统的设置是否保存
var appSettingSaved = false;

/**
 * 显示英文名称错误
 * @param $obj 英文名称的对象
 */
function showNameEnError(){
    var $obj = $("#appNameEn");
    Ext.Msg.alert("提醒","应用系统的英文名称必须首字符为字母，其他为字母或者数字的组合，并不能超过20个字符！",function(){$obj.select();$obj.focus();});
}
  
/**
 * 下一步
 */
function nextStep(){
    if(!appSettingSaved){
        Ext.Msg.alert("警告！", "请先输入应用系统英文名称并保存才能生成模块代码！", function(){$("#appNameEn").focus();});
        
        return;
    }
    
    	
	var formIds = formRelation.allIds;
	
	if (formIds==""){
		Ext.Msg.alert("警告！", "当前业务模块没有表单，无法生成代码！");
		return;
	}
	
    var moduleId = $selectedModule.attr("id");
    //当前选中的模块
    //var $selectedModule = $(".area_tree_list_title div:[id='" + moduleId + "']");
    //出错，不做处理
    if(!$selectedModule){
        return;            
    }
    
    //是否已经生成过代码,直接通过class来判断即可
    var isGeneratored = $selectedModule.hasClass("generated");
    
    if(!moduleId && !formIds){
     return; 
    }
    var toUrl = "step2.jsp?moduleId=" + moduleId +
         "&redirect=<%=redirect%>" + "&appUnid=<%=appUnid%>";
    
    //如果已经生成过代码
    if(isGeneratored){    
		//是否存在新表
		var existsNewForm = (formRelation.newIds!="");
		
		//调用确认窗口
		modulePrompt.show(existsNewForm, function(tp,formIds){	
			//覆盖生成
			if(modulePrompt.GeneratorType.override == tp){
				toUrl += "&tp=2";
			}else if(modulePrompt.GeneratorType.onlyNew == tp){//只生成新表的操作
	            toUrl += "&tp=1";
			}else{
	            Ext.Msg.alert("警告！", "请先选择代码的生成模式！");
	            return;
			}
			window.top.location.href = toUrl+"&formIds=" + formIds;
		});
	}else{
	  
	  window.top.location.href = toUrl+"&formIds=" + formIds;
	}
}
	
/**
 * 上一步
 */
function backStep(){
	var redirect = "<%=redirect%>";
	var moduleId = "<%=moduleId%>";
	var formIds = "<%=formIds%>";
	if("1"==redirect){
		this.location.href = "index.jsp?moduleId="+moduleId+"&formIds="+formIds;
	}else{
		//转到选择模块界面
	}
	
}
//保存应用系统英文名称
function appSave(){
	var nameEn = $("#appNameEn").val();
	
	var validateResult = validateNameEn(nameEn);
	
	if(!nameEn || !validateResult){
	   showNameEnError();
	   return;
	}
	
	
	
	var para = {type:"generate",action:"saveApp",nameEn:nameEn,appUnid:"<%=appUnid%>"};
	var requestConfig = {
		url:formRelation.baseAction,
		params:para,
		callback:function(options,success,response){
			if (success && response.responseText=="true"){
			    appSettingSaved = true;
				Ext.Msg.alert("提醒","保存系统英文名称成功！");
			} else {
				Ext.Msg.alert("提醒","保存系统英文名称不成功！");
			}
		}
	};
 	Ext.Ajax.request(requestConfig);
}


    
 
</script>
</head>

<body>
<input type="hidden" name="moduleId" id="moduleId" value="<%=moduleId%>"/>
<!--底区域-->
<div class="area_bg_bottom ">
</div>

<!--主区域 begin-->
<div class="area_main_public">
	<!--标题-->
	<div class="area_title"><img src="style/images/title_1.gif" alt="" /></div>
	<!--下一步-->
	<a class="button_next" href="javascript:nextStep();">
	</a>
	<!--上一步-->
	<a class="button_pre" href="javascript:backStep();">
	</a>
	
	<!--下拉框-->
  <div class="selectbox">
      <div class="selectbox_text">
        <%= currentApp.getName() %>
      </div>
      
      <div class="app_selector">
        <ul>
          <%
          for(App item : appList){
          %>
          <li><a href="javascript:void(0);" id="<%= item.getUnid()%>"><%= item.getName() %></a></li>
          <%
          }
          %>
        </ul>
      </div>      
  </div>
  
  <div class="app_setting"><b>当前应用系统英文名称：</b>
  <%if(StringUtils.isEmpty(currentApp.getNameEn())) { %>
    <input id="appNameEn" name="appNameEn" 
    title ="模块的英文名称必须首字符为字母，其他为字母或者数字的组合，并不能超过20个字符"
    value="<%=currentApp.getNameEn()%>" class="app_eninput" /> 
  	<button name="appBtn" onclick="appSave();" >保存名称</button>
  <%}  else { %>
  		<span><font color="red"><%=currentApp.getNameEn()%></font></span>
  		<script language="javascript">appSettingSaved = true;</script> 
  <%
  	}%> 
  </div>
  
  <!--树区域-->
  <div class="area_tree">
      <!--列表区域-->
      <div class="area_tree_list">
            <!--列表标题文字-->
            <div class="area_tree_list_title">
              <%
              if(null != currentModules){
	              for(Managers item : currentModules){
	            	  String list_class = "list_title";
	            	  if(null!=modulesStatus && modulesStatus.get(item.getUnid())){
	            		  list_class = "list_title generated";
	            	  }
	              %>
	              <div class="<%= list_class %>" id="<%= item.getUnid() %>"><%= item.getName() %></div>
	              <%
	              }
              }
              %>                   
            </div>

      </div>
      <!-- .area_tree_tree begin -->
      <div class="area_tree_tree"  id="formTree">
      </div>
  </div>
  <!--文字说明区域-->
  <div class="area_text_tree">   
    <div><b>说明：</b>请选择需要生成代码的业务模块，以生成相应的前后台代码。</div>
    <div style="text-indent:12px;"><b>1、</b>其中“<img src="style/images/generated.gif" />”表示已经已经生成过代码的业务模块。</div>
    <div style="text-indent:12px;"><b>2、</b>系统英文名称是为方便生成包名和前台的脚本目录。</div>
  </div>
	
	
</div>
<!--主区域 end-->
</body>
</html>