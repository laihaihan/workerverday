<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/sys/jsp/jspSession.jsp"%> 
<!-- 开发调试用 -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ucap.css"/>
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-patch.css" />
<link rel="stylesheet" type="text/css" href="<%=sSystemPath%>js/ucap/calendar/skin/WdatePicker.css" />

<!-- 开始组件优先资源加载 -->
<%@include file="/sys/ucapReSources/jQueryResource.jsp"%> 
<!-- 组件资源优先加载结束 -->


<script type="text/javascript" src="<%=sSystemPath%>js/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ext/ext-all.js"></script>
<!-- script type="text/javascript" src="<%=sSystemPath%>js/ext/ext-all.gzjs"></script-->
<script type="text/javascript"	src="<%=sSystemPath%>js/ext/ext-lang-zh_CN.js"></script>
<!--以上代码建议在开发过程中使用各个js，而具体的运行中直接采用ucap-min.js-->
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/util/globalVariables.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/util/common.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/menuConfig.js">	</script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/portal/form.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/view/view.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/view/viewTree.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/view/viewConfig.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/view/viewConditionCfg.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/dept/dept.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/dict/dictTree.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/util/validator.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/util/treeUi.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/select/listSelect.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/shortCut/shortConfig.js"></script>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/calendar/WdatePicker.js" ></SCRIPT>
<SCRIPT type="text/javascript" src="<%=sSystemPath%>js/ucap/flow/ucapFlow.js"></SCRIPT>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/configLog/configLog.js" ></SCRIPT>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/userInfo/modifyPassword.js" ></SCRIPT>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/changeDB/changeDB.js" ></SCRIPT>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/function/function.js" ></SCRIPT>
<script type="text/javascript" src="<%=sSystemPath%>js/ucap/permission/permission.js"></script>
<SCRIPT language=javascript src="<%=sSystemPath%>js/ucap/portal/sysindex.js"></SCRIPT>
<SCRIPT language=javascript src="<%=sSystemPath%>js/ucap/unit/unit.js"></SCRIPT>
<SCRIPT language=javascript src="<%=sSystemPath%>js/ucap/util/ComboBoxTree.js"></SCRIPT>
<SCRIPT language=javascript src="<%=sSystemPath%>js/ucap/userInfo/synUser.js"></SCRIPT>
<%--<SCRIPT language=javascript src="<%=sSystemPath%>js/user/user.js"></SCRIPT>
--%><SCRIPT language=javascript src="<%=sSystemPath%>js/ucap/flow/userjs/userSend.js"></SCRIPT>
<!-- Begin LW-ESS南威综合电子监察平台脚本 -->
<SCRIPT language=javascript src="<%=sSystemPath%>ess/js/monitor/weekset.js"></SCRIPT>
<SCRIPT language=javascript src="<%=sSystemPath%>ess/js/monitor/rule.js"></SCRIPT>
<SCRIPT language=javascript src="<%=sSystemPath%>ess/js/monitor/ruleConditionCfg.js"></SCRIPT>
<SCRIPT language=javascript src="<%=sSystemPath%>ess/js/monitor/business.js"></SCRIPT>
<SCRIPT language=javascript src="<%=sSystemPath%>ess/js/monitor/schedule.js"></SCRIPT>
<SCRIPT language=javascript src="<%=sSystemPath%>ess/js/message/message.js"></SCRIPT>
<SCRIPT language=javascript src="<%=sSystemPath%>ess/js/videoMonitor.js"></SCRIPT>
<SCRIPT language=javascript src="<%=sSystemPath%>ess/js/attendance.js"></SCRIPT>
<!-- END LW-ESS南威综合电子监察平台脚本 -->
<!-- BEBIN CMS 脚本统一加载在这里面-->
<!--Begin CMS内容管理系统脚本 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/cmsSite/cmsSite.js"></script><!-- add by linyashan 2010-05-13  -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/cmsCategory/cmsCategory.js"></script><!-- add by linyashan-->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/cmsCategory/cmsPublishCategory.js"></script><!-- add by HZB 2010-08-06 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/cmsTemplate/cmsTemplate.js"></script><!-- add by linyashan-->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/cmsArticle/cmsArticle_Action.js"></script><!-- 文琳2010-5-27增加 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/cmsArticle/cmsArticle.js"></script><!-- 文琳2010-5-27增加 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/cmsCommon/cmsCommon.js"></script><!-- 文琳2010-5-27增加 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/cmsRole/cmsRole.js"></script><!-- 文琳2010-6-4增加 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/cmsRolePermission/cmsRolePermission.js"></script><!-- 文琳2010-6-7增加 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/interactive/suggest.js"></script><!-- 文琳2010-6-11增加 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/interactive/counsel.js"></script><!-- 文琳2010-6-11增加 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/interactive/leadermail.js"></script><!-- add by linyashan 2010-06-05 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/interactive/vote.js"></script><!-- add by linyashan 2010-06-08 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/interactive/solicit.js"></script><!-- add by linyashan 2010-06-08 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/common.js"></script><!-- add by linyashan 2010-06-08 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/interactive/interview.js"></script><!-- add by HZB 2010-06-08 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/link/linkCategory.js"></script><!-- add by linyashan 2010-06-10 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/cmsSite/siteWizard.js"></script><!-- add by linyashan 2010-07-20 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/interactive/pick.js"></script><!-- add by HZB 2010-08-02 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/publish/infoopen.js"></script><!-- add by HZB 2010-08-11 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/publish/publishmail.js"></script><!-- add by HZB 2010-08-11 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/securityCheck/securityCheck.js"></script><!-- add by wx 2010-08-11 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/dataMigration/dataMigration.js"></script><!-- add by linyashan 2010-09-22 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/initData/initData.js"></script><!-- add by linyashan 2010-10-12 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/cmsPickSite/cmsPickSite.js"></script><!-- add by linyashan 2012-04-18  -->
<!-- add by linyashan首页快捷方式 -->
<script type="text/javascript" src="<%=sSystemPath%>cms/js/shortcuts.js"></script>
<!-- END-->