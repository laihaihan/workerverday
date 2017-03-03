<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%
	/**
	 * 数据库配置
	 * @author xhuatang@linewell.com
	 * @since 2011-12-01
	 */
	//获取应用系统的unid
	String appUnid = request.getParameter("appUnid");
	//如果为空，则为非法访问，直接退出不做处理
	if (StringUtils.isEmpty(appUnid))
		return;

	String unitId = request.getParameter("unitId");
	String unitAdminId = request.getParameter("unitAdminId");
	if (null == unitId)
		unitId = "";
	if (null == unitAdminId)
		unitAdminId = "";
%>
<html>
	<head>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
		<title>数据库配置 | 新建应用系统 —— 南威UACP支撑平台</title>
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
		<script language="javascript"
			src="<%=systemPath%>default/js/jquery-1.6.1.min.js"></script>
		<script language="javascript"
			src="<%=systemPath%>default/js/linewell/linewell.core.js"></script>
		<script language="javascript"
			src="<%=systemPath%>default/js/linewell/linewell.utils.js"></script>
		<script language="javascript"
			src="<%=systemPath%>default/js/jquery.json-2.2.min.js"></script>
		<script language="javascript"
			src="<%=systemPath%>default/js/jquery.cookie.js"></script>
		<script language="javascript" src="../js/common.js"></script>
		<script language="javascript"
			src="../js/linewell.ucap.admin.settings.js"></script>
		<script language="javascript" src="../js/pageStep.js"></script>
		<script language="javascript" src="../js/jquery.tipHelp.js"></script>
		<%@include file="../include/platformresources.jsp"%>
		<link href="../style/build.css" rel="stylesheet" type="text/css" />
		<link href="../style/tip.css" rel="stylesheet" type="text/css" />
		<script language="javascript">
//打开脚本调试
//var JS_DEBUG = true;
var isCreate=true;

//jQuery转义$
(function($){


//页面加载后的脚本
$(function(){
    
    /**
     * 单击打开表单标题的事件
     */
    $(".formTitle").click(function(){
        var $this = $(this);
        var tbId = "#" + $this.attr("openId");
        if($this.hasClass("open")){
            $(tbId).slideUp();
            $this.removeClass("open");
        }else{
            $(tbId).slideDown();
            $this.addClass("open");            
        }
    });
    
    /**
    *绑定复选框的改变事件
    */
    $("#isSplitData").change(function(){
        var $this = $(this);
        var chk =$this.attr("checked");
        var isChecked = chk ? true : false;        
        changeDataType(isChecked);
    });
    
    //初始化连接数据
    proxoolManager.getProxool("initProxoolCallBack");
   
    $("#tipDiv").tipHelp();
})
})(jQuery);

/**
 * 改变数据的类型
 * @param isChecked 是否选中
 */
var changeDataType = function(isChecked){    
       
    if(isChecked){
        isCreate=true;
        jQuery("#proxoolHtml").slideDown(); 
    }else{
        isCreate=false;
        jQuery("#proxoolHtml").slideUp();       
    }
}

/**
 * 初始化proxool后的回调函数
 * @param obj 传回的的对象
 */
function initProxoolCallBack(obj){
    //cookie的名称
    var isNewAppCookieName = linewell.ucap.admin.settings.cookies.IS_NEW_APP_COOKIE;
        
	//是否被选中
    var isCheck =  false;    
    
    //转换为JSON
    var exjson = Ext.util.JSON.decode(obj);
    
    //判断取回的结果是否存在
    if(exjson && exjson.driverProperties
       &&  exjson.driverProperties.length > 0){          
         var user = "";
         var password = "";
         for (var i = 0; i < exjson.driverProperties.length; i++) {
             if (exjson.driverProperties[i].name == "user") {                    
                 user = exjson.driverProperties[i].value;                    
             } else {
                 password = exjson.driverProperties[i].value;
             }
         }         
         
         //如果用户名，密码都不存在
         if("" !== user 
            && "" !== password){             
             jQuery.cookie(isNewAppCookieName, "false");
             isCheck = true;
         }
    }
    
    //false:根据后台的数据判断是否显示配置信息
    if(!isCheck){	    
	    //是否否新的应用
	    var isNewAppCookie = jQuery.cookie(isNewAppCookieName);	    
	    isCheck = ("true" === isNewAppCookie) ? true : false;    	
    }
    
    
    
    jQuery("#isSplitData").attr("checked", isCheck);
   
    //设置被选中   
    changeDataType(isCheck);
}

/**
 * 验证表单
 * @return true为验证成功
 */ 
function varidateForm(){
    if(!jQuery("#isSplitData").attr("checked")){
        return true;
    }
    if(!jQuery("#url").val()){
        alert("请输入链接名称！");
        jQuery("#url").focus();
        return false;
    }
    
    if(!jQuery("#driverClass").val()){
        alert("请输入驱动类！");
        jQuery("#driverClass").focus();
        return false;
    }
    
    if(!jQuery("#user").val()){
        alert("请输入数据库用户名！");
        jQuery("#user").focus();
        return false;
    }
    
    if(!jQuery("#password").val()){
        alert("请输入数据库密码！");
        jQuery("#password").focus();
        return false;
    }
    
    return true;
}

/**
* 执行保存完回调函数
* @param obj 返回保存完的数据
*/
function saveProxoolCallBack(obj){
    pageStep.canGoNext = true;    
    try{           
       var winParent = window.parent;
       if(winParent  && winParent.parentEvent){
           winParent.parentEvent.stepAdd();
       }
       pageStep.next();            
     }catch(e){}
    pageStep.next();
}

//定义上一步的链接
pageStep.preUrl = "appSetting.jsp?appUnid=<%=appUnid%>";

//定义下一步的链接
pageStep.nextUrl = "moduleSetting.jsp?appUnid=<%=appUnid%>&isNewSys=1";

/**
 * 处理下一步的逻辑
 */
pageStep.nextAction = function(){
    if(varidateForm()){
		//保存
		if(isCreate){
			proxoolFun.valModify(false,null,null,'<%=appUnid%>',"saveProxoolCallBack");
		}else{
			this.canGoNext = true;
		}
		jQuery.cookie(linewell.ucap.admin.settings.cookies.IS_NEW_APP_COOKIE, "false");
    }
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
		<div style="height: 30px; padding-left: 30px;">
			<input type="checkbox" id="isSplitData" name="isSplitData"
				checked=checked></input>
			<span style="font-size: 12px; font-weight: bold;"><label
					for="isSplitData">
					是否需要创建独立业务库
				</label> </span>
		</div>
		<div id="proxoolHtml" style="display: none;">

			<div class="formTitle open" openId="tbBase">
				数据库配置信息
			</div>
			<div id="tbBase">
				<table class="tableSet3" align="center" border="0">
					<colgroup>
						<col width="20%">
					</colgroup>
					<tr>
						<th>
							<span class="red">*</span>URL连接串(driver-url)：
						</th>
						<td colspan="3">
							<input type="text" class="inputbox" name="url" id="url" />
						</td>
					</tr>
					<tr>
						<th>
							<span class="red">*</span>驱动类(driver-class)：
						</th>
						<td>
							<input type="text" class="inputbox" name="driverClass"
								id="driverClass" />
						</td>

					</tr>
					<tr>
						<th>
							<span class="red">*</span>用户名(user)：
						</th>
						<td>
							<input type="text" class="inputbox" name="user" id="user" />
							<a href="#"
								onclick="javascirpt:ucapCommonFun.createTableSpace($F('url'));"><font
								color=red>创建表空间</font> </a>
						</td>
					</tr>
					<tr>
						<th>
							<span class="red">*</span>密码(password)：
						</th>
						<td>
							<input type="text" class="inputbox" name="password" id="password" />
						</td>
					</tr>
				</table>
			</div>

			<!-- 标题 -->
			<div class="formTitle" openId="tbAdv">
				高级选项
			</div>

			<div id="tbAdv" style="display: none;">
				<table class="tableSet3" align="center" border="0">
					<colgroup>
						<col width="20%">
					</colgroup>
					<tr>
						<th>
							连接状态的间隔(house-keeping-sleep-time)：
						</th>
						<td>
							<input type="text" class="inputbox" name="house" id="house" />
						</td>
					</tr>
					<tr>
						<th>
							最大的等待请求数(simultaneous-build-throttle)：
						</th>
						<td>
							<input type="text" class="inputbox" name="simultaneous"
								id="simultaneous" />
						</td>
					</tr>
					<tr>
						<th>
							保持的空闲连接数(prototype-count)：
						</th>
						<td>
							<input type="text" class="inputbox" name="prototype"
								id="prototype" />
						</td>
					</tr>
					<tr>
						<th>
							最大连接数(maximum-connection-count)：
						</th>
						<td>
							<input type="text" class="inputbox" name="maximum" id="maximum" />
						</td>
					</tr>
					<tr>
						<th>
							最小连接数(minimum-connection-count)：
						</th>
						<td>
							<input type="text" class="inputbox" name="minimum" id="minimum" />
							<input type="text" name="alias" style="display: none;" id="alias"
								value="<%=appUnid%>">
							<input type="text" name="unitId" style="display: none;"
								id="unitId" value="<%=unitId%>">
							<input type="text" name="unitAdminId" style="display: none;"
								id="unitAdminId" value="<%=unitAdminId%>">
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div id="tipDiv">
			业务数据库支持与配置库相同或者建立独立的业务数据库进行相关业务数据的存储。
			<br />
			默认为独立业务库，通过单击“是否需要创建独立业务库”可以实现业务库独立或者与配置数据库相同的状态切换。当状态为需要配置独立业务库时，可以通过输入DBA的用户名、密码，进行相应的表空间创建，并保存到相应的配置信息中。
		</div>
	</body>
</html>