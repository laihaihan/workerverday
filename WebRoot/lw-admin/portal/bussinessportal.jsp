<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.message.receiver.MsgReceiverBussiness"%>
<%@page import="com.linewell.apas.helper.ApasInfoHelper"%>
<%@page import="com.linewell.was.meet.ApasMeetBussiness"%>
<%@page import="com.linewell.apas.info.ApasInfoBussiness"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.user.User"%>
<%@page import="com.linewell.apas.info.*"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@page import="java.util.List"%>

<%

	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	User user = ucapsession.getUser();


	//未读消息
	MsgReceiverBussiness msgReceiverBussiness = new MsgReceiverBussiness();
	
	int sysMsgCount = msgReceiverBussiness.msnMsgContents(request,MsgType.RECEIPTMSG+","+MsgType.SYSMSG+","+MsgType.EFFIMSG+","+MsgType.UNITEMSG);
	//联办件
	int lianbanCount = ApasInfoHelper.getLianBanCount(user);
	
	//联合审批办件
	ApasMeetBussiness apasMeetBussiness = new ApasMeetBussiness();
	int daiCanJiaLianShen = apasMeetBussiness.getDaiCanJiaLianShen(user.getEffectiveDept());
	
	//本级上报件总数
	int lianDongCount = ApasInfoHelper.getLianDongCount(user); 
	
	//今日到期
	int jinRiDaoQiJian = ApasInfoHelper.getJinRiDaoQiJian(user);
	
	ApasInfoBussiness apasInfoBussiness = new ApasInfoBussiness();
	//外网待预审列表
	List yuShenInfoList = apasInfoBussiness.getUserWaiWangYuShen(user);
	//待办业务列表
	List infoList = apasInfoBussiness.getUserDaiBanYeWu(user);
	//在办业务列表
	List infoZaiBanList = apasInfoBussiness.getUserZaiBan(user);
	//在办业务列表
	List jinRiDaoqi = apasInfoBussiness.getJinRiDaoqi(user);
	//在办业务列表
	List chaoQi = apasInfoBussiness.getUserChaoQi(user);
	
	
	
	
	request.setAttribute("infoList",infoList);
	request.setAttribute("yuShenInfoList",yuShenInfoList);
	request.setAttribute("infoZaiBanList",infoZaiBanList);
	request.setAttribute("jinRiDaoqi",jinRiDaoqi);
	request.setAttribute("chaoQi",chaoQi);
	request.setAttribute("path", request.getContextPath());
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<link href="css/style.css" rel="stylesheet" type="text/css" />
		<title>首页</title>
<script type="text/javascript">  
	//外网预审-操作标签
	function selectTag1(showContent,selfObj){  
		var tag = document.getElementById("ysMenu").getElementsByTagName("li"); 
		var taglength = tag.length; 
		for(i=0; i<taglength; i++){ 
			tag[i].className = ""; 
		} 
		selfObj.parentNode.className = "ysMenuSelected"; 
		for(i=0; j=document.getElementById("ysContent"+i); i++){ 
			j.style.display = "none"; 
		} 
		document.getElementById(showContent).style.display = "block"; 
	} 

 //叫号区-操作标签
function selectTag2(showContent,selfObj){  
	var tag = document.getElementById("jhMenu").getElementsByTagName("li"); 
	var taglength = tag.length; 
	for(i=0; i<taglength; i++){ 
		tag[i].className = ""; 
	} 
	selfObj.parentNode.className = "jhMenuSelected"; 
	for(i=0; j=document.getElementById("jhContent"+i); i++){ 
		j.style.display = "none"; 
	} 
	document.getElementById(showContent).style.display = "block"; 
} 
//通知公告-操作标签
function selectTag3(showContent,selfObj){  
	var tag = document.getElementById("ggMenu").getElementsByTagName("li"); 
	var taglength = tag.length; 
	for(i=0; i<taglength; i++){ 
		tag[i].className = ""; 
	} 
	selfObj.parentNode.className = "ggMenuSelected"; 
	for(i=0; j=document.getElementById("ggContent"+i); i++){ 
		j.style.display = "none"; 
	} 
	document.getElementById(showContent).style.display = "block"; 
} 


function openTab(title,viewid,modid,leafname,moduleId){
	//没有top.tabs对象，说明是使用平台的
	if(top.tabs==undefined){
		top.ucapCommonFun.indexOpen.directOpenMenu(moduleId,modid);
	}else{
		top.tabs.openTab(title,'','view.action?fn=grid&viewId='+viewid+'&_rand='+Math.random()+'&modId='+modid,leafname)	
	}
}

function openTabJsp(title,url,leafname){
	//没有top.tabs对象，说明是使用平台的
	if(top.tabs==undefined){
		top.ucapCommonFun.indexOpen.directOpenMenu("FB234F18209865B68476FDFF988C58F5","C2FB1655467681646632AD33502994B2");
	}else{
		top.tabs.openTab(title,'',url,leafname)
	}
}
//查看办件信息
function openDocument(id){
	top.popup.showModalDialog('/was/jsp/info/document/document.jsp?unid='+ id,"办件信息",800,500);
}
//查看公告信息
function openArticle(id){
	top.popup.showModalDialog('/was/jsp/ptl/article/article_detail.jsp?unid='+ id,"公告信息",800,500);
}
//外网预审
function wwys(id){
	top.popup.showModalDialog('/was/jsp/info/bussiness/yushen_dialog.jsp?unid='+ id,"外网预审",550,400);
}
</script>
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	</head>

	<body onload="">
		<table width="100%" height="100%" border="0" align="center"
			cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
			<!--DWLayoutTable-->
			<tr>
				<td width="100%" height="10" valign="top">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<!--DWLayoutTable-->
						<tr>
							<td width="100%" height="10"></td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td height="34" valign="top">
					<table width="100%" border="0" cellpadding="0" cellspacing="0"
						background="images/top_bg_2.gif">
						<!--DWLayoutTable-->
						<tr>
							<td width="6" height="34" valign="top"
								background="images/top_bg_1.gif">
								<!--DWLayoutEmptyCell-->
								&nbsp;
							</td>
							<td width="988">
								&nbsp;&nbsp;
								<img src="images/s_icon_1.gif" width="16" height="13"
									align="absmiddle" />
								&nbsp;
								<a
									href="javascript:openTab('未读消息','92B4B1E7CAC588E2FB0FBB70C249A184','1D45DE7F49E0732364A770BC3A20F6BE','消息中心');"
									class="xs">系统内消息(<%=sysMsgCount%>)</a>&nbsp;&nbsp;
								<img src="images/s_icon_2.gif" width="16" height="15"
									align="absmiddle" />
								&nbsp;
								<a href="javascript:openTab('联办待办件','192F9F95DB35722507EF51663B05EF09','0BD22DB15F1BDB02EA65D075AC35C79F','联合审批');" 
								  class="xs">联办件(<%=lianbanCount %>)</a>&nbsp;&nbsp;
								<img src="images/s_icon_3.gif" width="16" height="16"
									align="absmiddle" />
								&nbsp;
								<a href="javascript:openTab('参加联审','09B4F06752D702132F81B8DA90B93F2D','2D58C4ADCCD716FF05C59257B2E37FB5','联合审批');"
								class="xs">联审(<%=daiCanJiaLianShen %>)</a>&nbsp;&nbsp;
								<img src="images/s_icon_4.gif" width="14" height="15"
									align="absmiddle" />
								&nbsp;
								<a href="javascript:openTab('已反馈件','55F2001A07993C914B9E06D37DA61312','6AB32967F9A5844EC05322940B7C54D7','业务联动');"
								class="xs">已反馈上报件(<%=lianDongCount%>)</a>&nbsp;&nbsp;
								<img src="images/s_icon_5.gif" width="13" height="16"
									align="absmiddle" />
								&nbsp;
								<a href="javascript:openTab('今日到期','35ECA053AFCE7ED2C2AD966B40812BC8','6DC310A2C607A2CFFBED990D92EFCFBA','统计监察');"
								class="xs">今日到期件(<%=jinRiDaoQiJian%>)</a>
							</td>
							<td width="6" valign="top" background="images/top_bg_3.gif">
								<!--DWLayoutEmptyCell-->
								&nbsp;
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td height="10" valign="top">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<!--DWLayoutTable-->
						<tr>
							<td width="1000" height="10"></td>
						</tr>
					</table>
				</td>
			</tr>
	<tr>
    <td height="254" valign="top">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <!--DWLayoutTable-->
      <tr>
        <td height="254" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0">
          <!--DWLayoutTable-->
          <tr>
            <td height="29" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0">
              <!--DWLayoutTable-->
              <tr>
                <td height="29" valign="bottom" background="images/ys_menu_bg.gif" style="border-right:#7CCDF0 1px solid;">
					<div id="ysMenu">
                		<ul>
                    		<li class="ysMenuSelected"><a href="javascript:void(0)" onmouseover="selectTag1('ysContent0',this)">外网预审</a></li>
                      		<li><a href="javascript:void(0)" onmouseover="selectTag1('ysContent1',this)">待办件</a></li>
							<li><a href="javascript:void(0)" onmouseover="selectTag1('ysContent2',this)">在办件</a></li>
							<li><a href="javascript:void(0)" onmouseover="selectTag1('ysContent3',this)">临界预警</a></li>
							<li><a href="javascript:void(0)" onmouseover="selectTag1('ysContent4',this)">超期</a></li>
                    	</ul>
       			 	 </div>
				</td>
                </tr>
            </table></td>
            </tr>
									<tr>
										<td height="225" valign="top" class="ys_box">
											<table width="96%" border="0" align="center" cellpadding="0"
												cellspacing="0" class="ys_list" id="ysContent0"
												style="display: ;">
												<tr>
													<td height="8"></td>
												</tr>
												<s:iterator value="#request.yuShenInfoList" id="apasInfo">
												<tr>
													<td height="25">
														&gt;<a href="#" class="ys_list" onclick="wwys('${apasInfo.unid}')"><s:property value="#apasInfo.projectname"/></a>
													</td>
												</tr>
												</s:iterator>
											</table>
											<table width="96%" border="0" align="center" cellpadding="0"
												cellspacing="0" class="ys_list" id="ysContent1"
												style="display:none;">
												<tr>
													<td height="8"></td>
												</tr>
												<s:iterator value="#request.infoList" id="apasInfo">
												<tr>
													<td height="25">
														&gt;<a href="#" class="ys_list" onclick="openDocument('${apasInfo.unid}')"><s:property value="#apasInfo.projectname"/></a>
													</td>
												</tr>
												</s:iterator>
											</table>	
											<table width="96%" border="0" align="center" cellpadding="0"
												cellspacing="0" class="ys_list" id="ysContent2"
												style="display:none;">
												<tr>
													<td height="8"></td>
												</tr>
												<s:iterator value="#request.infoZaiBanList" id="apasInfo">
												<tr>
													<td height="25">
														&gt;<a href="#" class="ys_list" onclick="openDocument('${apasInfo.unid}')"><s:property value="#apasInfo.projectname"/></a>
													</td>
												</tr>
												</s:iterator>
											</table>	
											<table width="96%" border="0" align="center" cellpadding="0"
												cellspacing="0" class="ys_list" id="ysContent3"
												style="display:none;">
												<tr>
													<td height="8"></td>
												</tr>
												<s:iterator value="#request.jinRiDaoqi" id="apasInfo">
												<tr>
													<td height="25">
														&gt;<a href="#" class="ys_list" onclick="openDocument('${apasInfo.unid}')"><s:property value="#apasInfo.projectname"/></a>
													</td>
												</tr>
												</s:iterator>
											</table>	
											<table width="96%" border="0" align="center" cellpadding="0"
												cellspacing="0" class="ys_list" id="ysContent4"
												style="display:none;">
												<tr>
													<td height="8"></td>
												</tr>
												<s:iterator value="#request.chaoQi" id="apasInfo">
												<tr>
													<td height="25">
														&gt;<a href="#" class="ys_list" onclick="openDocument('${apasInfo.unid}')"><s:property value="#apasInfo.projectname"/></a>
													</td>
												</tr>
												</s:iterator>
											</table>					
										</td>
									</tr>

								</table>
							</td>
							<td width="10" valign="top">
								<!--DWLayoutEmptyCell-->
								&nbsp;
							</td>
							<td width="230" valign="top">
								<table width="100%" border="0" cellpadding="0" cellspacing="0">
          						<!--DWLayoutTable-->
						          <tr>
						            <td width="230" height="30" valign="top">
							            <table width="100%" border="0" cellpadding="0" cellspacing="0">
							              <!--DWLayoutTable-->
							              <tr>
							                <td width="108" height="30" background="images/td_menu_1.gif" class="td_title">&nbsp;&nbsp;快捷通道</td>
							                <td valign="top" background="images/td_menu_2.gif"><!--DWLayoutEmptyCell-->&nbsp;</td>
							              <td width="10" valign="top" background="images/td_menu_3.gif"><!--DWLayoutEmptyCell-->&nbsp;</td>
							              </tr>
							            </table>
						            </td>
						          </tr>
									<tr>
										<td height="224" valign="top" class="ys_box">
											<table width="98%" border="0" align="center" cellpadding="0"
												cellspacing="0">
												<tr>
													<td height="43" align="center" valign="bottom">
														<a href="javascript:openTab('办事预登记','26B6BEB417C1CD3771E0A14D1D4FD533','63E9C7DA0E5FC7570DEB895C966E6006','预登记导向服务','FCC3666B8CF0D632EBC71CE0F35815F4');">
														<img src="images/td_btn_1.gif" width="210"
																height="35" border="0" />
														</a>
													</td>
												</tr>
												<tr>
													<td height="43" align="center" valign="bottom">
													    <a href="javascript:openTabJsp('新增业务','<%=request.getContextPath() %>/was/jsp/info/bussiness/shouli.jsp?_rand='+Math.random()+'&modId=C2FB1655467681646632AD33502994B2','审批业务办理');">
														<img src="images/td_btn_2.gif" width="210" height="35" border="0" />
														</a>
													</td>
												</tr>
												<tr>
													<td height="43" align="center" valign="bottom">
														<a href="javascript:openTab('收件管理','E44CD321CC8A15EC5B38C8723505D6E9','79409A204AC94A6FBCF1E2991A23A2A2','审批业务办理','FB234F18209865B68476FDFF988C58F5');">
														<img src="images/td_btn_3.gif" width="210"
																height="35" border="0" />
														</a>
													</td>
												</tr>
												<tr>
													<td height="43" align="center" valign="bottom">
														<a href="javascript:top.lwin.showWin('core/user/user_center.jsp','个人中心',350,250);"><img src="images/td_btn_4.gif" width="210"
																height="35" border="0" />
														</a>
													</td>
												</tr>
												<tr>
													<td height="43" align="center" valign="bottom">
														<a href="javascript:openTab('已发送消息','7BF245659BF8AFB54F89689F1A9A94FD','F318D7ADCA28CB86804F44817A0EBFC3','消息中心','A4C0EE66C8B5590D8AF01AD8ED83C7D0');">
														<img src="images/td_btn_5.gif" width="210"
																height="35" border="0" />
														</a>
													</td>
												</tr>
											</table>
										</td>
									</tr>

								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td height="10" valign="top">
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<!--DWLayoutTable-->
						<tr>
							<td width="1000" height="10"></td>
						</tr>
					</table>
				</td>
			</tr>
			<!-- 叫号区 -->
			<tr>
				 <td height="241" valign="top" >
					 <%@ include file="bussinessportal_jh.jsp"%>
				</td>
			</tr>
			<!-- 结束叫号区 -->
			<tr>
			    <td height="10" valign="top">
			    	<table width="100%" border="0" cellpadding="0" cellspacing="0">
				      <!--DWLayoutTable-->
				      <tr>
				        <td width="100%" height="10"></td>
				        </tr>
				    </table>
			    </td>
  			</tr>
			
			<!-- 统计区 -->
			<tr>
				<td height="200" valign="top">
					 <%@ include file="bussinessportal_tj.jsp"%>
				</td>
			</tr>
			<!-- 结束统计 -->
		  <tr>
			    <td height="10" valign="top">
				    <table width="100%" border="0" cellpadding="0" cellspacing="0">
				      <!--DWLayoutTable-->
				      <tr>
				        <td width="1000" height="10"></td>
				      </tr>
				    </table>
			    </td>
		  </tr>
		</table>
	</body>
</html>
