<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@page import="com.linewell.ucap.platform.authorized.scheme.SchemeManager"%>
<%@page import="com.linewell.ucap.platform.authorized.scheme.Scheme"%>
<!DOCTYPE html>
<%
/**
 * 界面建模
 * @author xhuatang@linewell.com
 * @since 2011-12-01
 */
//获取应用系统的unid
String appUnid = request.getParameter("appUnid");
String portalId=request.getParameter("portalId");
//如果为空，则为非法访问，直接退出不做处理
if(StringUtils.isEmpty(appUnid)
        || StringUtils.isEmpty(portalId)){
    return;
}
//切换系统
App app=new App();
AppManager am= new AppManager();
app=am.doFinByUnid(appUnid);
String json = JSONObject.fromObject(app).toString();
//如果为空，则为非法访问，直接退出不做处理
//if(StringUtils.isEmpty(appUnid)) return;
SchemeManager sm = new SchemeManager();
Scheme scheme = sm.getSchemeByAppId(appUnid,ucapSession);
String schemeUnid = scheme.getUnid();
//是否是系统构建
String isNewSys = request.getParameter("isNewSys");
%>
<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>界面建模 | 新建应用系统 —— 南威UACP支撑平台</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
<script language="javascript" src="<%= systemPath %>default/js/jquery-1.6.1.min.js"></script>
<script language="javascript" src="<%= systemPath %>default/js/linewell/linewell.core.js"></script>
<script language="javascript" src="<%= systemPath %>default/js/linewell/linewell.utils.js"></script>
<script language="javascript" src="<%= systemPath %>default/js/jquery.json-2.2.min.js"></script>

<script type="text/javascript" src="<%=systemPath%>js/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ext/ext-all.js"></script>
<!-- script type="text/javascript" src="<%=systemPath%>js/ext/ext-all.gzjs"></script-->
<script type="text/javascript"	src="<%=systemPath%>js/ext/ext-lang-zh_CN.js"></script>
<!--以上代码建议在开发过程中使用各个js，而具体的运行中直接采用ucap-min.js-->
<script type="text/javascript" src="<%=systemPath%>js/ucap/util/common.js"></script>

<script language="javascript" src="../js/common.js"></script>
<script language="javascript" src="../js/pageStep.js"></script>
<link href="../style/build.css" rel="stylesheet" type="text/css" />
<script language="javascript">
Ext.onReady(function(){
    var json = '<%=json%>';
    var requestConfig = {
		url : "login.action",
		params : {
			"type" : "afterChoose",
			"styleUnid" : "370146850068000044001738",
			"isDefault" : "",
			"schemeUnid" : "<%=schemeUnid%>"
		},
		jsonData : Ext.decode(json),
		callback : function(options, success, response) {
			if (success) {
				var jsonException = Ext.util.JSON
							.decode(response.responseText);
				var exResult = ucapCommonFun.dealException(jsonException);
				if (!exResult)return;
			}
		}
	}
	Ext.Ajax.request(requestConfig);
});

//打开脚本调试
//var JS_DEBUG = true;


//定义上一步的链接
pageStep.preUrl = "moduleSetting.jsp?appUnid=<%= appUnid%>&isNewSys=<%=isNewSys%>";

//定义下一步的链接
pageStep.nextUrl = "sysPreview.jsp?appUnid=<%= appUnid%>&portalId=<%=portalId%>&isNewSys=<%=isNewSys%>";

//pageStep.nextUrl = appPath + "login.jsp?appUnid=<%= appUnid%>";

/**
 * 处理下一步的逻辑
 */
pageStep.nextAction = function(){
    //window.open(this.nextUrl);
    this.canGoNext = true;
}

/**
 * 处理上一步的逻辑
 */
pageStep.preAction = function(){
    this.canGoPre = true;   
}

/**
*页面切换事件
*/
function tranPage(type,obj){
	//子菜单视图unid
	var menuViewUnid="36A5BCC7A1DDAAB92A7B88AE4DF244D3";
	//导航栏视图unid
	var navViewUnid="C01A8BC2DE0E879216694D2F6F9CAD1A";
	//快捷方式视图unid
	var shortcutuViewUnid="DAF49440DA563762098F261D05682DF1";
	//界面方案视图unid
	var schemeViewUnid="217E5C09CF43B37EE89C03F2C73E8D14";
	//频道视图的unid
	var channelUnid="5E99F86B205891448F60456216605FCF";
	//平台管理系统unid
	var curAppUnid="<%=appUnid%>";//"475C4D7E257F5EAF7CCDF46AE0FE35BD";
	
	if(!type)return;
	var jsp="";
	if(1==type){//门户配置
		jsp="<%=systemPath%>ADMIN/scheme/portal.jsp?appUnid=<%=appUnid %>&portalId=<%=portalId %>";
	}else if(2==type){//菜单
		jsp="<%=systemPath%>ADMIN/scheme/menu.jsp?appUnid=<%=appUnid %>";
	}else if(3==type){//子菜单
		jsp="<%=systemPath%>ADMIN/default/view/view.jsp?viewId="+menuViewUnid+"&isTab=1&isConfig=1&moduleUnid=&purl=&belongToAppId=<%=appUnid%>";
	}else if(4==type){//导航栏
		jsp="<%=systemPath%>ADMIN/default/view/view.jsp?viewId="+navViewUnid+"&&isTab=1&isConfig=1&moduleUnid=&purl=&belongToAppId="+curAppUnid+"";
	}else if(5==type){//快捷方式
		jsp="<%=systemPath%>ADMIN/default/view/view.jsp?viewId="+shortcutuViewUnid+"&&isTab=1&isConfig=1&moduleUnid=&purl=&belongToAppId="+curAppUnid+"";
	}else if(6==type){//界面方案
		jsp="<%=systemPath%>ADMIN/default/view/view.jsp?viewId="+schemeViewUnid+"&&isTab=1&moduleUnid=&purl=&belongToAppId="+curAppUnid+"";
	}else if(7==type){//门户频道
		jsp="<%=systemPath%>ADMIN/default/view/view.jsp?viewId="+channelUnid+"&&isTab=1&moduleUnid=&purl=&belongToAppId="+curAppUnid+"";
	}
	if(jsp&&""!=jsp){
		 var iframeObj = document.getElementById("pageFrame").contentWindow;
		 iframeObj.location.href = jsp;
	}
	jQuery(".iMTitleList li").removeClass("selected");
	jQuery(obj).addClass("selected");
}

</script>
</head>
<body>
<!-- 左区域 begin-->
<div class="iMAreaLeft">

	<!-- 标题 -->
	<div class="iMTitle">
		<img alt=""
					src="<%=systemPath%>ADMIN/style/images/scheme/interfaceModelingTitle.png" />
		<a>界面建模</a>		
	</div>
	
	<!-- 列表区域 -->
	<ul class="iMTitleList">
				<li onclick="tranPage(1,this)">
					<img alt="" src="<%=systemPath%>ADMIN/style/images/scheme/001.png" />
					<a>门户配置</a>
				</li>
				<li onclick="tranPage(2,this)">
					<img alt="" src="<%=systemPath%>ADMIN/style/images/scheme/002.png" />
					<a>菜单</a>
				</li>
				<li onclick="tranPage(3,this)">
					<img alt="" src="<%=systemPath%>ADMIN/style/images/scheme/003.png" />
					<a>子菜单</a>
				</li>
				<li onclick="tranPage(5,this)">
					<img alt="" src="<%=systemPath%>ADMIN/style/images/scheme/005.png" />
					<a>快捷方式</a>
				</li>
				<li onclick="tranPage(4,this)">
					<img alt="" src="<%=systemPath%>ADMIN/style/images/scheme/004.png" />
					<a>导航栏</a>
				</li>	
				<li onclick="tranPage(6,this)">
					<img alt="" src="<%=systemPath%>ADMIN/style/images/scheme/006.png" />
					<a>界面方案</a>
				</li>
				<li onclick="tranPage(7,this)">
					<img alt="" src="<%=systemPath%>ADMIN/style/images/scheme/007.png" />
					<a>频道</a>
				</li>
	</ul>
</div>
<!-- 左区域 end-->

<!-- 右区域 begin-->
<div class="iMAreaRight">
	<!--<div style="background:black;width:1000px; height:2000px;"></div>-->
				<iframe src="<%=systemPath%>ADMIN/scheme/portal.jsp?appUnid=<%=appUnid %>&portalId=<%=portalId %>" width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="pageFrame"  name="pageFrame"></iframe>
</div> 
<!-- 右区域 end-->
</body>
</html>