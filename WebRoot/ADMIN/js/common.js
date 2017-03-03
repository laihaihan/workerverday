/**
 * 管理中心公共js文件
 * 
 * @author xhuatang@linewell.com
 * @since 2011-11-30
 */

/*
 * 系统的路径
 */
var appPath = "/"
		+ location.pathname.split("/")[(location.pathname.indexOf("/") > 0
				? 0
				: 1)] + "/";

/**
 * 定义交互的页面
 */
var actionUrl = appPath + "app.action";