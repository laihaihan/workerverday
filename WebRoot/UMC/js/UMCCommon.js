/**
 * 用户管理中心公共页面
 * @author xhuatang@linewell.com
 * @date 2011-04-24
 */

/**
 * 用户管理中心的Session设置
 */
var UMCSession = {	
	UMCAction:"umcAction.action",
	isPlatFormManager:false, //是否为平台管理员
	uSession  	  : ucapSession, //ucap的Session
	manageDept    : "",          //管理的部门的ID
	canManagePost : false        //是否可管理职位	
};



/**
 * 获取锚点的名称
 * @param {} linkStr  链接对象
 * @return {String}   锚点的名称
 */
function getAnchor(linkStr) {
  if(!linkStr) linkStr = document.location.href;
  var args;
  linkStr += "";
  args = linkStr.split("#");
  if(!args[1]){
    return "";
  }
  return args[1];
}