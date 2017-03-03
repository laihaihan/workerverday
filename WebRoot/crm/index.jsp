<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List" %>
<%@page import="com.linewell.ucap.session.Session" %>
<%@page import="com.linewell.ucap.platform.authorized.app.App" %>
<%@page import="com.linewell.ucap.ui.navigation.UiShortcut" %>
<%@page import="com.linewell.ucap.ui.navigation.UiNavigation" %>
<%@page import="com.linewell.ucap.platform.authorized.menu.Menu" %>
<%@page import="com.linewell.ucap.platform.authorized.menu.MenuItem" %>
<%@page import="com.linewell.ucapx.common.WebAppUtils" %>
<%@page import="com.linewell.ucapx.login.LoginApi" %>
<%@page import="com.linewell.ucapx.navigation.NavApi" %>
<%@page import="com.linewell.ucapx.shortcut.ShortcutSetsApi" %>
<%@page import="com.linewell.ucapx.menu.MenuApi" %>
<%@include file="default/common.jsp"%> 
<%@include file="include/indexFn.jsp"%> 
<%
/**
 * CRM首页
 * @auth xhuatang@linewell.com
 * @since 2011-07-01
 */
%>
<%
//获取当前用户可管理的应用列表
LoginApi loginApi = new LoginApi();
String currentUserId = ucapSession.getUser().getUnid();
List<App> userAppList = loginApi.getUserAppList(currentUserId);

//获取导航的列表
NavApi navApi = new NavApi();
UiNavigation navObj = navApi.getUiNavigation(ucapSession);

//获取快捷方式
//String shortcutId = navObj.getUiShortcuts()
//ShortcutSetsApi shortcutApi = new ShortcutSetsApi();
//List<Shortcut> shortcutList = shortcutApi.getList(shortcutId, ucapSession);
List<UiShortcut> uiShortcutList = navObj.getUiShortcuts();

//获取菜单
MenuApi menuApi = new MenuApi();
Menu menu = menuApi.getMenu(ucapSession);


%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta content="南威客户关系管理系统" name="keywords" />
<meta content="南威客户关系管理系统" name="description" />
<link href="favicon.ico" rel="icon" type="image/x-icon" /> 
<link href="favicon.ico" rel="shortcut icon" type="image/x-icon" /> 
<link href="favicon.ico" rel="bookmark" type="image/x-icon" /> 
<title>南威客户关系管理系统</title>
<link href="style/index.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../uistyle/style_1/css/ext-all.css" />
<script language="javascript" src="<%= systemPath%>default/js/jquery-1.6.1.min.js"></script>
<script language="javascript" src="<%= systemPath%>default/js/common.js"></script>

<script type="text/javascript" src="<%= systemPath%>js/ext/ext-base.js"></script>
<script type="text/javascript" src="<%= systemPath%>js/ext/ext-all.js"></script>
<script type="text/javascript"  src="<%= systemPath%>js/ext/ext-lang-zh_CN.js"></script>
<script language="javascript" src="<%= systemPath%>js/ucap/select/listSelect.js"></script>
<script language="javascript" src="js/common.js"></script>
<script language="javascript" src="js/extCommon.js"></script>




<script language="javascript">
$(document).ready(function(){
  /**
   * 隐藏、展开左右区域
   */
  $("#btnAreaSeparate").click(function(){
    var $areaMainSeparate = $("#area_main_separate");
    var $areaMainLeft = $("#area_main_left");
    var $areaMainRight = $("#area_main_right");
    
    if($areaMainLeft.css("display") !== "none"){
        $areaMainLeft.hide();
        $areaMainSeparate.css("left", 4);
        $areaMainRight.css("left",13);    
    }else{ 
      $areaMainLeft.show();
      $areaMainSeparate.css("left", 213);
      $areaMainRight.css("left",224);    
    }
  });
  /**
   * 选择应用系统
   */
  $("#gotoAppSel").change(function(){
    alert($(this).val());
  });
  
  $("#search").click(function(){
    ucapSelect.selectDataSD("200,201",0,"search_keyword");
  });
  
  //第一个元素被选中
  var $selectedTabItem = $(".nav_tab").find(".nav_tab_item").eq(0).addClass("current");
  
  //获取所有的TabItem对象
  var $navTabItems = $(".nav_tab").find(".nav_tab_item");
  
  $("#time_now")
  
  /**
   * 定义事件
   */
  $navTabItems
    .mouseover(function(){})
    .mouseout(function(){})
    .click(function(){//单击事件,定义当前为选中
      $selectedTabItem.removeClass("current");
      $("#submenu_" + $selectedTabItem.attr("menuId")).hide();
      
      $selectedTabItem = $(this);
      $selectedTabItem.addClass("current");
      $("#submenu_" + $(this).attr("menuId")).show();
    });
});

/**
 * 根据菜单上的配置内容展示模块
 *
 */
function showModule(){
    var curObj = window.event.srcElement;
     
    var moduleUnid = curObj.content;
    
    var url = appPath+"BaseAction.action?type=module&act=getModuleMenu&moduleUnid="+moduleUnid+"&rand="+Math.random();
    var conn = Ext.lib.Ajax.getConnectionObject().conn;
    conn.open("GET", url, false);
    conn.send(null);
    var moduleJson = Ext.util.JSON.decode(conn.responseText);
    
    var uiModuleList = moduleJson.uiModule;
    
    var subMenuHtml = "";
    
    if(undefined!=uiModuleList && uiModuleList){
        for(var i=0;i<uiModuleList.length;i++){
            var uiModule = uiModuleList[i];
            var uiModuleHtml = "";
            
            if("01"==uiModule.type){
                //打开视图
                uiModuleHtml= "<a href=\"javascript:void(0);\" onclick=\"showView('" + uiModule.contents + "')\" id=\"link" + uiModule.id + "\">" + uiModule.text + "</a>\n";
            }
            else if("02"==uiModule.type){
                uiModuleHtml = "<a href=\""+uiModule.contents+"\"";
                
                if("01"==uiModule.openType){
                    uiModuleHtml+=" target=\"_top\"";
                }else if("02"==uiModule.openType){
                    uiModuleHtml+=" target=\"_blank\"";
                }else if("03"==uiModule.openType){
                    uiModuleHtml+=" target=\"right_frame\"";
                }
                uiModuleHtml+=uiModule.text+"</a>";
            }else if("04"==uiModule.type){
                uiModuleHtml= "<a href=\"javascript:void(0);\" onclick=\"" + uiModule.contents + "\" id=\"link" + uiModule.id + "\">" + uiModule.text + "</a>\n";
            }else if("09"==uiModule.type){
                //打开模块
            }
            
            if(""==subMenuHtml){
                subMenuHtml = "<div>"+uiModuleHtml;
            }else{
                subMenuHtml+=uiModuleHtml;
            }
        }
        subMenuHtml+="</div>";
    }
    
    nav_submenu.innerHTML = subMenuHtml;
}

/**
 * 展示视图
 */
function showView(viewId){
    document.getElementById("right_frame").src=appPath+"default/view/jsp/view.jsp?viewId="+viewId;
}

/**
 * CRM用户登出
 */
var crmLogout = function(){
  // 与Action的交互
  jQuery.ajax({
     type : "POST",
     url : actionUrl,
     data : "type=CrmLogin&act=Logout",
     async : true,
     // 提交成功处理
     success : function(json) {
       // 如果返回的是错误信息
       if (json && json.exceptionMsg) {
         alert(json.exceptionMsg);
         return ;
       }    
         
       //登录首页
       window.location = appPath + "crm/login.jsp";
       
     },
     // 处理错误状态
     statusCode : {
       404 : function() {
         alert('page not found');
       }
     }
   });
};
</script>
</head>
<body>

<!--页眉 begin-->
<div class="header">
  <!-- LOGO -->
  <div class="logo">
  </div>
  <!--顶部导航_right begin-->
  <div class="top">
    <div class="top_nav">
      <%
      if(null != uiShortcutList){
          for(UiShortcut item : uiShortcutList){
      %>
      <%= getShortcutUrl(item) %>
      <%
          }
      }
      %>
    </div>
    <!-- 空白行 -->
    <div class="top_blank">
    </div>
    <div class="toright">
      选择应用程序： <select id="gotoAppSel" name="gotoAppSel">
      <option value="">请选择应用系统</option> 
      <%
        if(null != userAppList){
          for(App app : userAppList){%>    
            <option value="<%=app.getUnid()%>"><%=app.getName()%></option>
          <%
          }
        }
        %>
      </select> </div>
    <!-- 空白行 -->
    <div class="top_blank">
    </div>
    <!-- 显示时间 -->
    <div class="toright" id="time_now">
      2011年6月28日 14:43:37</div>
  </div>
  <!--顶部导航_right end--></div>
<!--页眉 end-->

<!-- 导航 begin -->
<div class="nav">
  <!--页签 begin-->
  <div class="nav_tab" id="nav_tab">
    <%
    //子菜单Str
    String subMenuStr = "";
    subMenuStr += "\t<div class=\"nav_submenu\" id=\"nav_submenu\">\n";
    //获取菜单
    for(MenuItem item : menu.getMenuItems()){
        //默认的主菜单打开页面
      String defaultUrl = getMenuItemUrl(item);
      //临时的URL
      String tmpUrl = "";
        //defaultUrl = getMenuItemUrl(item);
        int i = 0;      
        //subMenuStr += "\t\t<div id=\"submenu_" + item.getUnid() + "\">\n";        
      //获取子菜单
      if(item.getMenuItems() != null){        
        for(MenuItem subItem : item.getMenuItems()){         
          tmpUrl = getMenuItemUrl(subItem);
          subMenuStr += "\t\t\t" + tmpUrl;
          if(0 == i){
              defaultUrl = tmpUrl;
          }
          i++;
        }
      }
      //subMenuStr += "\t\t</div>\n";
    %>  
    <div class="nav_tab_item" menuId="<%= item.getUnid() %>">
      <%= defaultUrl %>
    </div>
    <%
    }
    subMenuStr += "</div>\n";
    %>
  </div>
  <!--页签 end-->
  
  <!--子菜单 begin-->
  <%= subMenuStr %>
  <!--子菜单 end-->  
</div>
<!-- 导航 end -->
  
<!-- 左区域 -->
<div class="area_main_left" id="area_main_left">
  <!-- 搜索区域 -->
  <div class="left_search">
    <h3>搜索</h3>
    <!-- 空白行 -->
    <div class="blank">
    </div>
    <select>
      <option>- - 全部 - -</option>
      <option>营销计划</option>
      <option>潜在客户</option>
      <option>客户</option>
      <option>联系人</option>
      <option>业务机会</option>
      <option>合同</option>
      <option>产品</option>
    </select>
    <!-- 空白行 -->
    <div class="blank">
    </div>
    <input id="search_keyword_Cn_" maxlength="50" name="search_keyword_Cn_"></input>
    <input id="search_keyword" maxlength="50" name="search_keyword" onblur="if (this.value=='') {this.value='搜索关键字';this.style.color='#808080'}" onclick="if (this.value=='搜索关键字') {this.value='';this.style.color='#000000'};getIE(this)" onkeydown="EnterKey(this.value)" onkeyup="seachlist(this.value)" size="20" style="color: #808080" title="可以使用*或空格来分隔2个以上条件" type="text" value="搜索关键字" /><p>
    </p>
    <!-- 空白行 -->
    <div class="blank">
    </div>
    <input id="search" class="left_search_button" type="button" value="搜索" />
    <!-- 空白行 -->
    <div class="blank">
    </div>
    <a href="#">高级搜索</a>
    <input id="allword" class="left_search_checkbox" name="allword" type="checkbox" value="True"/><label for="allword">完全相等</label>
  </div>
  <!-- 菜单区域 -->
  <div class="left_menu">
    <h4>新建</h4>
    <!-- 空白行 -->
    <div class="blank">
    </div>
    <!-- 空白行 -->
    <div class="blank">
    </div>
    <select>
    <option>新建...</option>
    <option>任务</option>
    <option>营销计划</option>
    <option>潜在客户</option>
    <option>客户</option>
    <option>联系人</option>
    <option>业务机会</option>
    <option>销售目标</option>
    <option>合同</option>
    <option>产品</option>
    <option>公司文件</option>
    <option>统计图</option>
    </select> </div>
  <!-- 菜单区域 -->
  <div class="left_menu">
    <h4>最新操作</h4>
    <!-- 空白行 -->
    <div class="blank">
    </div>
    <!-- 空白行 -->
    <div class="blank">
    </div>
    <a href="#">最新操作类型1</a>
    <!-- 空白行 -->
    <div class="blank">
    </div>
    <a href="#">最新操作类型1</a>
    <!-- 空白行 -->
    <div class="blank">
    </div>
    <a href="#">最新操作类型2</a>
    <!-- 空白行 -->
    <div class="blank">
    </div>
    <a href="#">最新操作类型3</a> </div>
  <!-- 菜单区域 -->
  <div class="left_menu">
    <h4>消息和报警</h4>
    <!-- 空白行 -->
    <div class="blank">
    </div>
    <!-- 空白行 -->
    <div class="blank">
    </div>
    <a>欢迎使用南威CRM</a>
    <!-- 空白行 -->
    <div class="blank">
    </div>
  </div>
</div>
<!-- 分隔条 -->
<div class="area_main_separate" id="area_main_separate">
  <input name="Button" id="btnAreaSeparate" type="button" value="" /> 
</div>
<!-- 右区域 -->
<div class="area_main_right" id="area_main_right">
  <iframe class="module" src="main.jsp" id="right_frame"></iframe></div>
</body>

</html>