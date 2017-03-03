<%@page contentType="text/html;charset=UTF-8"%>

<%
/**
 * 引用平台的资源
 * @author xhuatang@linewell.com
 * @since 2011-11-29
 */
%>
<link rel="stylesheet" type="text/css" href="<%=userStylePath%>css/ucap.css"/>
<link rel="stylesheet" type="text/css" href="<%=userStylePath%>css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=userStylePath%>css/ext-patch.css" />
<link rel="stylesheet" type="text/css" href="<%=systemPath%>js/ucap/calendar/skin/WdatePicker.css" />

<script type="text/javascript" src="<%=systemPath%>js/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ext/ext-all.js"></script>
<!-- script type="text/javascript" src="<%=systemPath%>js/ext/ext-all.gzjs"></script-->
<script type="text/javascript"  src="<%=systemPath%>js/ext/ext-lang-zh_CN.js"></script>
<!--以上代码建议在开发过程中使用各个js，而具体的运行中直接采用ucap-min.js-->

<script type="text/javascript" src="<%=systemPath%>js/ucap/util/common.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/portal/menuConfig.js">  </script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/portal/form.js"></script>

<!-- 
    //2012-08-07  mdy by wyongjian@linewell.com  
    //解决BUG1158-应用建模：系统配置页面滚动条没显示出来
    //应用建模：系统配置页面引入必要的js文件	
-->
<script type="text/javascript" src="<%=systemPath%>js/ucap/util/globalVariables.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/view/view.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/view/viewTree.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/view/viewConfig.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/view/viewConditionCfg.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/dept/dept.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/dict/dictTree.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/util/validator.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/util/treeUi.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/select/listSelect.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/shortCut/shortConfig.js"></script>
<script type="text/javascript" src="<%=systemPath%>js/ucap/calendar/WdatePicker.js" ></SCRIPT>
<SCRIPT type="text/javascript" src="<%=systemPath%>js/ucap/flow/ucapFlow.js"></SCRIPT>
<script type="text/javascript" src="<%=systemPath%>js/ucap/configLog/configLog.js" ></SCRIPT>
<script type="text/javascript" src="<%=systemPath%>js/ucap/userInfo/modifyPassword.js" ></SCRIPT>
<script type="text/javascript" src="<%=systemPath%>js/ucap/changeDB/changeDB.js" ></SCRIPT>
<script type="text/javascript" src="<%=systemPath%>js/ucap/function/function.js" ></SCRIPT>
<script type="text/javascript" src="<%=systemPath%>js/ucap/permission/permission.js"></script>
<SCRIPT language=javascript src="<%=systemPath%>js/ucap/portal/sysindex.js"></SCRIPT>
<SCRIPT language=javascript src="<%=systemPath%>js/ucap/unit/unit.js"></SCRIPT>
<SCRIPT language=javascript src="<%=systemPath%>js/ucap/util/ComboBoxTree.js"></SCRIPT>
<SCRIPT language=javascript src="<%=systemPath%>js/ucap/userInfo/synUser.js"></SCRIPT>
<style>
/*修正EXT在文档加入标准后出现checkbox上移的bug for ext*/
.ext-ie input.x-tree-node-cb{margin-bottom:-5px;}
</style>
