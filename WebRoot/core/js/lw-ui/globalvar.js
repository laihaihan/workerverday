/**
 * 定义JS全局变量
 * @author cyingquan@qq.com
 * @2011-01-06
 * @version 1.0
*/
//应用路径
var appPath = "/" + location.pathname.split("/")[(location.pathname.indexOf("/")>0?0:1)] + "/";

//主机host
var hostPath = location + "";
hostPath = hostPath.substring(0, hostPath.indexOf(appPath));

//屏幕高度
var clientHeight;

//屏幕宽度
var clientWidth;

//操作DOM对象 id
var parentDomId;
var domId;

//定义全局
var globalSession = {
	appPath : appPath,
	hostPath : hostPath,
	//平台action入口
	ucapBaseAction : appPath + "BaseAction.action",
	//审批action入口
	commonAction : appPath + "CommonAction.action"
};
jQuery(function(){
	clientHeight = document.body.clientHeight;
	clientWidth = document.body.clientWidth;
});