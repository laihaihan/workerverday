<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.util.UNIDGenerate"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@page import="com.linewell.ucap.admin.module.ModuleWrapper"%>
<%@page import="com.linewell.ucap.admin.build.wrapper.PortalBuild"%>
<%
/**
 * 业务建模
 * @author xhuatang@linewell.com
 * @since 2011-12-01
 */
//获取应用系统的unid
String appUnid = request.getParameter("appUnid");

//如果为空，则为非法访问，直接退出不做处理
if(StringUtils.isEmpty(appUnid)){
	return;
}
PortalBuild pb =new PortalBuild();
//获取当前应用系统的门户unid
String portalId=pb.getPortalUnid(appUnid);//request.getParameter("portalId");
String isFlag="1";//是否需要创建门户 1： 是   0： 否
if(StringUtils.isEmpty(portalId)){//未创建过门户
	UNIDGenerate generater = new UNIDGenerate();
	portalId = generater.getUnid();
	isFlag="1";
}else{//已创建过门户
	isFlag="0";
}

String funid = "";
funid = ModuleWrapper.getModuleFunid(appUnid);
//是否是系统构建
String isNewSys = request.getParameter("isNewSys");
%>
<!DOCTYPE html>
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>业务建模 | 新建应用系统 —— 南威UACP支撑平台</title>
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
<script language="javascript" src="../js/gb2py.js"></script>


<link href="../style/moduleSetting.css" rel="stylesheet" type="text/css" />
<link href="../style/popNewForm.css" rel="stylesheet" type="text/css" />
<link href="../style/tip.css" rel="stylesheet" type="text/css" />
<script language="javascript">
//打开脚本调试
var JS_DEBUG = false;

//定义appUnid
var appUnid = "<%= appUnid%>";

//定义当前页面的事件
var pageEvent = {};

//定义上一步的链接
pageStep.preUrl = "dbSetting.jsp?appUnid=<%= appUnid%>";

//定义下一步的链接
pageStep.nextUrl = "uiSetting.jsp?appUnid=<%= appUnid%>&portalId=<%=portalId%>&isNewSys=<%=isNewSys%>";

/**
*生成门户以及生成菜单
*@param  ids 默认要生成门户的视图ids，多个用逗号隔开
*/
function buildPortalMenu(ids,isGen){
    //定义action的链接地址
    var actionUrl = appPath + "BaseAction.action?type=buildAction&act=buildPoral&isFlag=<%=isFlag%>&portalId=<%=portalId%>&appUnid="+appUnid;
    if(isGen&&"1"==isGen){//重新生成门户
    	actionUrl=actionUrl+"&isGen="+isGen;
    }
    
    var appName = "";
    if(window.parent && window.parent.appName){
    	appName = window.parent.appName;
    }
    //定义提交的参数值
	var menuActionParams={
	   "viewIds"  : ids,
	   "appName" : appName
	};
	
	// 提交到后台
    $.ajax({
       type : "post",
       url : actionUrl,
       data : jQuery.toJSON(menuActionParams),
       dataType : "json",
       contentType : "application/json",
       async : false,
       success : function(data, textStatus) {          
          pageStep.canGoNext = true;
          try{           
            var winParent = window.parent;
            if(winParent
                && winParent.parentEvent){
                winParent.parentEvent.stepAdd();
            }
            pageStep.next();            
          }catch(e){
          
          }
       },
       error : function() {                                           
           alert("加载数据失败！");
       },
       statusCode : {// 处理错误状态
           404 : function() {
               alert("加载模块数据失败！");
           }
       }
   });// end ajax
}

/**
 * 加载选择视图的对话框
 */
function showViewSelect(){
    //定义iframe对象 
    var iframeObj = document.getElementById("popFrame").contentWindow;
    
    iframeObj.location.href = "viewSelect.jsp?appUnid=" + appUnid + "&" + Math.random();
     
    $("#viewSelect").show();
}

/**
 * 处理下一步的逻辑
 */
pageStep.nextAction = function(){
	showViewSelect();
};

/**
 * 处理上一步的逻辑
 */
pageStep.preAction = function(){
    this.canGoPre = true;   
};

//模块图标的路径
var moduleIconPath = "../style/images/module/";

//默认的模块图标
var defaultModuleIcon = "businessModelingBtn_0.png";

//取消、删除按钮图标
var cancleIcon = "cancel.png";

//加载jquery
(function($){
//页面加载完成后执行
$(function(){


//添加弹出窗口的事件 begin

/**
 * 关闭窗口的事件
 */
$("#viewSelectCloseBtn,#btnCancel").click(function(){
    $("#viewSelect").hide();
}); 


/**
 * 弹出框加载完成后的事件
 */
$("#popFrame").load(function(){
    var iframeObj = document.getElementById("popFrame").contentWindow;
    if(iframeObj.getSelectView){
        $("#btnOk").unbind("click");
        $("#btnOk").click(function(){
            var viewIds = iframeObj.getSelectView();
            if(viewIds){
                //添加视图到频道
                buildPortalMenu(viewIds,"1");
            }else{
                alert("请选择要生成频道的视图！");
            }
        });
        $("#btnSkip").unbind("click");
        //绑定跳过按钮事件
        $("#btnSkip").click(function(){
        	if("<%=isFlag%>" === "1"){//还没创建门户，不允许跳过
        		alert("您还没有创建过门户，不允许跳过！");
        		return;
        	}else{
        		buildPortalMenu("");
        	}
        });
    }    
});
//添加弹出窗口的事件 end

/**
 * 打开模块
 * @param moduleId 模块ID
 */
function openModule(moduleId){    
    var moduleUrl = "../module?appUnid=<%= appUnid%>&isNewSys=<%= isNewSys%>";
    if(moduleId) moduleUrl += "&moduleUnid=" + moduleId;
    window.open(moduleUrl, "moduleWin_" + moduleId,
        "height=" + (window.screen.availHeight) + ",width=" + screen.width + "," + 
        "top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no");
}

/**
 * 重设表单
 */
function resetNewForm(){
    $(".popNewForm #name").val("");
    $(".popNewForm #nameEn").val("");
    $(".popNewForm #picture").val("");
}

/**
 * 添加模块的事件
 */
$(".moduleAdd").click(function(){   
   openModule();
});

/**
 * 模块快速添加
 */
$(".moduleFastAdd").click(function(){   
    resetNewForm();
    $(".popNewForm").show();
});

/**
 * 隐藏模块添加的事件
 */
$(".newFormCloseBtn").click(function(){   
    $(".popNewForm").hide();
});


/**
 * 选择图片的事件
 */
$("#picture").change(function(){
    var icon = "../style/images/module/businessModelingBtn_0.png";
    
    var littlePic = $(this).val(); 
    if(littlePic){
        icon = "../style/" + littlePic;
    }
    
    $("#showBigPic").attr("src", icon);
});

/**
 * 保存模块
 */ 
$("#btnSaveNewForm").click(function(){
    var name = $(".popNewForm #name").val();
    var nameEn = $(".popNewForm #nameEn").val();
    var picture = $(".popNewForm #picture").val();
    var isFlow = $(".popNewForm #isFlowYes:checked").val();
    if(!isFlow){
        isFlow = "0";
    }    
    
    if(!name){
        alert("请输入模块名称！");
        $(".popNewForm #name").focus();
        return;    
    } 
    
    if(!nameEn || !/^[a-z]+$/.test(nameEn)){
        alert("请输入模块英文名称！\n英文名称全部为小写英文字母组成！");
        $(".popNewForm #nameEn").focus();
        return;    
    }   
    
    
    //提交的JSON对象
    var postJson = {
        "unid"       : "",
        "funid"      : "<%= funid%>",
        "edit"       : "1",
        "type"       : "01",
        "belongApp"  : "<%= appUnid%>",
        "sourceType" : "02",
        "name"       : name,
        "nameEn"     : nameEn,
        "isFlow"     : isFlow,
        "picture"    : picture
    };
    
    //url
    var actionUrl = appPath + "BaseAction.action?type=managerAction&act=saveModule&isNew=true";
    
    
    // 提交到后台
    $.ajax({
       type : "post",
       url : actionUrl,
       data : jQuery.toJSON(postJson),
       dataType : "json",
       contentType : "application/json",
       async : false,
       success : function(data, textStatus) {     
         resetNewForm();     
         loadData("<%= appUnid%>");
       },
       error : function() {                                           
           alert("加载数据失败！");
       },
       statusCode : {// 处理错误状态
           404 : function() {
               alert("加载模块数据失败！");
           }
       }
   });// end ajax   
});



//定义取消的图标的路径
var cancleIconPath = moduleIconPath + cancleIcon;

//取消图标的jQuery模板
var $cancleIconTemplate = $("<img src='" + cancleIconPath + "'/>")    
    .addClass("cancleIcon");

/**
 * 删除模块
 */
function deleteModule(moduleUnid){
    //获取模块数据的链接
    var actionUrl = appPath + "BaseAction.action?type=managerAction";   
    
    //定义参数值
    var postData = {
        "act"      : "delete",//操作为删除
        "funid"    : moduleUnid,//删除的模块unid
        "nodeType" : "01"//节点的类型，01为模块
    };
    
    // 提交到后台
    $.ajax({
       type : "post",
       url : actionUrl,
       data : postData,
       dataType : "json",
       contentType : "application/json",
       async : false,
       success : function(data, textStatus) {          
          loadData(appUnid);
          changeModuleStatus(false);
       },
       error : function() {                                           
           alert("加载模块数据失败！");
       },
       statusCode : {// 处理错误状态
           404 : function() {
               alert("加载模块数据失败！");
           }
       }
   });// end ajax
}

/**
 * 改变模块状态
 * @param isNormal 是否为正常状态
 */
function changeModuleStatus(isNormal){    
    if(!isNormal){       
       $(".businessModelingBtn").unbind("click");
       $(".businessModelingBtn").each(function(){
           var $this = $(this);
           var delModuleUnid = $this.attr("moduleUnid");          
           $cancleIcon = $cancleIconTemplate.clone();
           $cancleIcon.click(function(){
               if(confirm("此操作无法恢复！确定要删除选择的节点吗？")){
                    deleteModule(delModuleUnid);
               }
           });
           $cancleIcon.appendTo($this);        
       });    
       $("body").dblclick(function(){
            changeModuleStatus(!isNormal);
       });   
       $("#moduleManage").val("取消");
    }else{
       $("body").unbind("dblclick");       
       $(".businessModelingBtn").click(function(){
           openModule($(this).attr("moduleUnid"));
       });       
       
       $(".businessModelingBtn .cancleIcon").remove();
       $("#moduleManage").val("管理");       
    }
}

/**
 * 管理按钮的事件
 */
$("#moduleManage").click(function(){ 
    var $moduleManage = $(this); 
    if("管理" === $moduleManage.val()){
       changeModuleStatus(false);
	   $moduleManage.val("取消");
	}else{
	   changeModuleStatus(true);
	   $moduleManage.val("管理");
	}
});


/**
 * 通过JSON获取模块列表
 * @param moduleJson 模块的JSON对象
 */
function getModuleList(moduleJson){
    //按钮列表对象
    var $moduleList = $("#moduleListBtns");
    
    //模块的模板
    var $moduleTemplate = $("<div></div>").addClass("businessModelingBtn");
        
    for(var i = 0; i < moduleJson.length; i ++){
        var moduleUnid = moduleJson[i].unid;
        var moduleIcon = moduleJson[i].picture;
        var moduleName = moduleJson[i].name;
        if(!moduleIcon){
            moduleIcon = defaultModuleIcon;
        }else{
            moduleIcon = moduleIcon.substring(moduleIcon.lastIndexOf("/") + 1);
        }
        moduleIcon = moduleIconPath + moduleIcon;
        
        //建立一个模块 
        var $module = $moduleTemplate.clone();
        $module.attr("moduleUnid", moduleUnid);
        
        //添加单击事件
        $module.click(function(){          
            $(this).stopTime("moduleDown"); 
            if("管理" === $("#moduleManage").val()){
                openModule($(this).attr("moduleUnid"));
            }
        });
        
        //添加mousedown的事件
        $module.mousedown(function(){
           $(this).oneTime("1s", "moduleDown", function(){
                changeModuleStatus(false);
           });
        });
        
        $module.mouseup(function(){
            $(this).stopTime("moduleDown");
        });
        
        
       
        
        //构建图片
        var $moduleImg = $("<img />").attr("src", moduleIcon).addClass("moduleIcon");
        $moduleImg.appendTo($module);
        
        //构建链接
        var $moduleLink = $("<a></a>").text(moduleName);
        $moduleLink.appendTo($module);
        
        $module.appendTo($moduleList);
    }
}

/**
 * 加载所属应用的模块数据
 * @param appUnid 应用的UNID
 */
function loadData(appUnid){
    //获取模块数据的链接
    var actionUrl = appPath + "BaseAction.action?type=managerAction&" + Math.random();
    
    //传递的参数
    var postData = {
        "act"     : "getModuleList",
        "appUnid" : appUnid
    };
    // 提交到后台
    $.ajax({
       type : "post",
       url : actionUrl,
       data : postData,
       dataType : "json",
       contentType : "application/json",
       async : false,
       success : function(data, textStatus) {
          $("#moduleListBtns").html("");
          if(data.length > 0){
            if(null !== data[0]){
                $("#moduleNum").text(data.length);                
                lw.utils.debug($.toJSON(data));
                getModuleList(data);
            }else{
                $("#moduleNum").text(0);
            }
          }                                             
          
       },
       error : function() {                                           
           alert("加载模块数据失败！");
       },
       statusCode : {// 处理错误状态
           404 : function() {
               alert("加载模块数据失败！");
           }
       }
   });// end ajax
}
loadData(appUnid);

/**
 * 定义页面重新加载的事件
 */
pageEvent.reloadData = function(){
    loadData(appUnid);    
}

	//中文输入的操作,获取拼音首字母    
	$("#name").blur(function(){
	
	    //获取中文字符串
	    var gbStr = $("#name").val();
	    
	    //获取拼音首字母
	    var pyStr = getSpell(gbStr, true).toLowerCase();
	    
	    //设置英文字符串
	    $("#nameEn").val(pyStr);
	});

$('#tipDiv').tipHelp();
});//页面加载完成后执行 end
})(jQuery);//加载jquery end
</script>
</head>
<body>
<!-- 主区域 begin-->
<div class="areaMain">
    <!-- 工具栏区域 -->
    <div class="businessModelingToolBar">
        <h1>业务建模</h1>
        <h2>共</h2>
        <h3 id="moduleNum">0</h3>
        <h2>个模块</h2>
        <input class="toolBarAdd moduleAdd" name="toolAddBtn" id="toolAddBtn" type="button" value="添加" title="添加模块" />
        <input class="toolBarFastAdd moduleFastAdd" name="toolFastAddBtn" id="toolFastAddBtn" type="button" value="快速添加" title="快速添加模块" />
        <input class="toolBarMg" id="moduleManage" name="toolManageBtn" id="toolManageBtn" type="button" value="管理" title="已有模块删除管理" />
    </div>
    
    <!--按钮区域 begin-->
    <div class="businessModelingBtns" id="moduleListBtns">
     
    </div>
    <!--按钮区域 end-->
    
    <!-- 添加模块按钮 -->
    <div class="businessModelingBtnAdd moduleAdd">添加模块</div>


<!-- 选择视图div begin -->
<div id="viewSelect" class="pop" style="display:none;">
        
        <!-- 标题 -->
        <div class="popTitle">请选择要生成频道的视图</div>
        
        <!-- 关闭按钮 -->
        <input class="popCloseBtn" name="divClose" type="button" id="viewSelectCloseBtn" />
        
        <!-- 内容 -->
        <div class="popContent">
	        <iframe frameborder="0" id="popFrame"></iframe>
        </div>
        
        <!-- 按钮区 -->
        <div class="popBtns">
            <input name="btnCancel" id="btnCancel" type="button" value="取 消"/>
            <input name="btnSkip" id="btnSkip" type="button" value="跳过" />
            <input name="btnOk" id="btnOk" type="button" value="确 定" />
        </div>
</div>     
<!-- 选择视图div end -->   

<!-- 新模块表单 begin -->
<div class="popNewForm">
    
    <!-- 标题 -->
    <div class="popNewFormTitle ">新建模块</div>
    
    <!-- 关闭按钮 -->
    <input class="popNewFormCloseBtn newFormCloseBtn" name="btnClose" type="button" />
    
    <!-- 内容 -->
    <div class="popNewFormContent">
        <!-- 通用表格 -->
        <table class="popNewFormTable" >
            <tr>
                <!-- 标题行 -->
                <td class="titleTd"><span style="color:#ff0000;">*</span>名称：</td>            
                <!-- 内容行 -->
                <td><input class="popNewFormTi" name="name" id="name" type="text"></td>
            </tr>
            <tr>
                <!-- 标题行 -->
                <td class="titleTd"><span style="color:#ff0000;">*</span>英文名称：</td>
                <!-- 内容行 -->
                <td><input class="popNewFormTi" name="nameEn" id="nameEn" type="text"></td>
            </tr>   
            <tr>
				<!-- 标题行 -->
				<td class="titleTd"><span style="color:#ff0000;">*</span>是否流程：</td>
				<!-- 内容行 -->
				<td>
					<input name="isFlow" id="isFlowYes" type="radio" value="1" checked/>
					<label for="isFlowYes">是</label>
					<input name="isFlow" id="isFlowNo" type="radio" value="0"/>
					<label for="isFlowNo">否</label>
				</td>
			</tr>     
            <tr>
                <!-- 标题行 -->
                <td class="titleTd">图标：</td>
                <!-- 内容行 -->
                <td>
                    <select class="popNewFormTableIconSelect" id="picture" name="picture">
                        <option value="">无</option>
			              <%
			                for(int i=1;i<11;i++){%>
			                  <option value="<%="images/module/businessModelingBtn_"+i+".png"%>"><%=i%></option>
			             <% }%>
                    </select>
                    <img class="" id="showBigPic" src="../style/images/module/businessModelingBtn_0.png" >
                </td>
            </tr>
        </table>    
    </div>
        
    <!-- 按钮区 -->
    <div class="popNewFormBtns">
        <input class="newFormCloseBtn" name="Button1" type="button" value="取 消" />
        <input name="Button1" type="button" id="btnSaveNewForm" value="保 存" />
    </div>  

</div>
<!-- 新模块表单 end -->
	
</div>
<!-- 主区域 end-->
<div id="tipDiv">
　　通过业务建模中心添加及管理，实现业务模块的新建、删除、以及相应的配置管理。<br/>
<ul>
<li><b>模块添加：</b>单击“添加”按纽或者单击页面右下角的“+”图标可以进入业务模块的添加页面；</li>
<li><b>模块管理：</b>单击“管理”按纽，即可进入模块的删除状态，“管理”按纽状态变成“取消”，单击可切换回普通状态；</li>
<li><b>模块修改：</b>单击需要修改的业务模块，即可进入模块修改页。</li>
</ul>
</div>
</body>
</html>