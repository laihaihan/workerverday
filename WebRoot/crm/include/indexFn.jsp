<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List" %>
<%@page import="com.linewell.ucap.ui.navigation.UiShortcut" %>
<%@page import="com.linewell.ucap.platform.authorized.menu.MenuItem" %>
<%
/**
 * CRM首页的方法对象
 * @auth xhuatang@linewell.com
 * @since 2011-07-01
 */
%>
<%!
//默认的iframe的ID
String defaultTargetId = "right_frame";

/**
 * 通过MenuItem对象构建链接
 * @param item 菜单对象
 * @return     菜单项的链接
 */
String getMenuItemUrl(MenuItem item){
	String tmpUrl = "";	
	//打开的方式
	String openType = item.getOpenType();
	//菜单的类型
	String menuType = item.getType();
	//URL打开的时候
	if("03".equals(menuType)){		
    	tmpUrl = "<a href=\"" + item.getContent() + "\"";
    	//当前页面
    	if("01".equals(openType)){
    		tmpUrl += " target=\"_top\"";
    	}else if("02".equals(openType)){//新页面
    		tmpUrl += " target=\"_blank\"";
    	}else if("03".equals(openType)){//iframe方式
    		tmpUrl += " target=\"" + defaultTargetId + "\"";
    	}
   		tmpUrl += " id=\"link" + item.getUnid() + "\">" + item.getName() + "</a>\n" ;
  	}else if("04".equals(menuType)){
    	tmpUrl = "<a href=\"javascript:void(0);\" onclick=\"" + item.getContent() + "\" id=\"link" + item.getUnid() + "\">" + item.getName() + "</a>\n";
  	}else{
  		if(!"".equals(item.getExecuteContent())){
  		    String executeType = item.getExecuteType();
  			if("01".equals(executeType)){//脚本
  				tmpUrl = "<a href=\"javascript:void(0);\" onclick=\"" + 
  				  item.getExecuteContent() + "\" id=\"link" + item.getUnid() + 
  				  "\" content=\""+item.getContent()+"\">" + item.getName() + "</a>\n";
  			}else if("02".equals(executeType)){//url
  				tmpUrl = "<a href=\"" + item.getExecuteContent() + "\"";
  		    	//当前页面
  		    	if("01".equals(openType)){
  		    		tmpUrl += " target=\"_top\"";
  		    	}else if("02".equals(openType)){//新页面
  		    		tmpUrl += " target=\"_blank\"";
  		    	}else if("03".equals(openType)){//iframe方式
  		    		tmpUrl += " target=\"" + defaultTargetId + "\"";
  		    	}
  		   		tmpUrl += " id=\"link" + item.getUnid() + "\">" + item.getName() + "</a>\n" ;
  			}else{
  			   tmpUrl = "<a href=\"" + item.getContent() + "\" target=\"" + defaultTargetId + 
  			       "\" id=\"link" + item.getUnid() + "\">" + item.getName() + "</a>\n" ;
  			}
  		}else{
  			tmpUrl = "<a href=\"" + item.getContent() + "\" target=\"" + 
  			   defaultTargetId + "\" id=\"link" + item.getUnid() + "\">" + item.getName() + "</a>\n" ;
  		}
  	}
	return  tmpUrl;
}

/**
 * 获取快捷方式的URL
 * @param item 快捷方式对象
 * @return     快捷方式的链接
 */
String getShortcutUrl(UiShortcut item){
	String tmpUrl = "";
	//如果是按钮
	if("03".equals(item.getType())){
    tmpUrl = "<a href=\"javascript:void(0);\"  "
           + "\" onclick=\"javascript:" + item.getContent() + "\">" + 
           item.getName() + "</a>";
	}else if("04".equals(item.getType())){//如果是链接
    tmpUrl = "<a href=\"" + item.getContent() + "\" target=\"" +
            defaultTargetId + "\" >" +
            item.getName() + "</a>";
	}
	return tmpUrl;
}
%>