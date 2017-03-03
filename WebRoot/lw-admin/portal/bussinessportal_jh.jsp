<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.was.meet.*"%>
<%@page import="com.linewell.was.advance.info.*"%>
<%@page import="com.linewell.was.liandong.*"%>
<%@page import="com.linewell.was.ptl.article.*"%>
<%@page import="com.linewell.core.message.*"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="java.util.Map"%>
<%@page import="com.linewell.core.db.JDBCTool"%>

<%
	String sql = "select t2.floor,t2.wincode,t2.pingnum,t3.ipaddr\n" +
	"  from advance_userinfo t1, advance_wininfo t2,advance_callerinfo t3\n" + 
	" where t1.windinfounid = t2.unid\n" + 
	" and t3.unid = t2.punid\n" + 
	"   and userunid = '"+user.getUnid()+"'";
	
	JSONObject ledJson = new JSONObject();
	List<Map> result = JDBCTool.doSQLQueryList(GlobalParameter.APP_WAS,sql);
	if(result != null && result.size()>0){
	ledJson = JSONObject.fromObject(result.get(0));
	}
	
	String wp = "";
	String ledServiceText = "";

	ApasInfoBussiness  infoBus =new ApasInfoBussiness();
	LianDongBussiness  ldBus =new LianDongBussiness();
	//叫号
	List jhList =new AdvanceInfoBussiness().getList(user);
	//联办
	List lbList =infoBus.getLBList(user);
	//联审
	List lsList =infoBus.getLSList(user);
	//本级上报
	List bjList =ldBus.getParentList(user.getEffectiveDept());
	//下级上报
	List xjList =ldBus.getChildList(user.getEffectiveDept());
	//通知公告
	List tzList = PtlArticleAPI.doFindListByCategory("B68B35AC2BFFFA97DB96AA50503C2079");
	//消息
	List xxList = new MsgReceiverBussiness().getMsgList(user.getUnid(),"SYSMSG",8);
%>
	<table width="100%" border="0" cellpadding="0" cellspacing="0">
      <!--DWLayoutTable-->
      <tr>
        <td height="241" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0">
          <!--DWLayoutTable-->
          <tr>
            <td height="29" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0">
              <!--DWLayoutTable-->
              <tr>
                <td height="29" valign="bottom" background="images/ys_menu_bg.gif" style="border-right:#7CCDF0 1px solid;">
					<div id="jhMenu">
                		<ul>
                    		<li class="jhMenuSelected"><a href="javascript:void(0)" onmouseover="selectTag2('jhContent0',this)">叫号区</a></li>
                      		<li><a href="javascript:void(0)" onmouseover="selectTag2('jhContent1',this)">联办件</a></li>
							<li><a href="javascript:void(0)" onmouseover="selectTag2('jhContent2',this)">联审件</a></li>
							<li><a href="javascript:void(0)" onmouseover="selectTag2('jhContent3',this)">本级上报件</a></li>
							<li><a href="javascript:void(0)" onmouseover="selectTag2('jhContent4',this)">下级上报件</a></li>
                    	</ul>
       			 	 </div>
				</td>
                </tr>
            </table></td>
            </tr>
          <tr>
            <td height="212" valign="top" class="ys_box">
            <table width="96%" border="0" align="center" cellpadding="0" cellspacing="0" class="ys_list" id="jhContent0" style="display:;">
              <tr>
                <td height="8"></td>
              </tr>
              <% 
					int jhlength=jhList.size()>8?8:jhList.size();
					for(int i=0;i<jhlength;i++){
						AdvanceInfo temInfo =(AdvanceInfo)jhList.get(i);
						
					%>
					<tr>
						<td height="25">
							&gt;
							<a href="#" class="ys_list"><%=temInfo.getProjectname() %></a>
							<a href="#" class="ys_list" onclick="callnum('<%=temInfo.getUnid() %>','<%=temInfo.getGuide_code() %>')">叫号</a>
							<a href="#" class="ys_list" onclick="yushen('<%=temInfo.getUnid() %>','<%=temInfo.getServiceid() %>')">预审</a>
							<a href="#" class="ys_list" onclick="done('<%=temInfo.getUnid() %>','<%=temInfo.getAdvance_code() %>')">处理</a>
						</td>
					</tr>
					<% } %>
            </table>
            <!-- 联办件 -->
				<table width="96%" border="0" align="center" cellpadding="0"
					cellspacing="0" class="ys_list" id="jhContent1"
					style="display:none ;">
					<tr>
						<td height="8"></td>
					</tr>
					<% 
					int lblength=lbList.size()>8?8:lbList.size();
					for(int i=0;i<lblength;i++){
						ApasInfo temInfo =(ApasInfo)lbList.get(i);
					%>
					<tr>
						<td height="25">
							&gt;
							<a href="#" class="ys_list" onclick="openDocument('<%=temInfo.getUnid() %>')"><%=temInfo.getProjectname() %></a>
							
							
						</td>
					</tr>
					<% } %>
				</table>
				<!-- 结束联办件 -->
				<!-- 联审件 -->
				<table width="96%" border="0" align="center" cellpadding="0"
					cellspacing="0" class="ys_list" id="jhContent2"
					style="display:none ;">
					<tr>
						<td height="8"></td>
					</tr>
					<% 
					int lslength=lsList.size()>8?8:lsList.size();
					for(int i=0;i<lslength;i++){
						ApasMeet temInfo =(ApasMeet)lsList.get(i);
					%>
					<tr>
						<td height="25">
							&gt;
							<a href="#" class="ys_list" onclick="openLS('<%=temInfo.getUnid() %>','<%=temInfo.getPunid() %>')"><%=temInfo.getMeet_caption() %></a>
						</td>
					</tr>
					<% } %>
				</table>
				<!-- 结束联审件 -->
				<!-- 本级上报件 -->
				<table width="96%" border="0" align="center" cellpadding="0"
					cellspacing="0" class="ys_list" id="jhContent3"
					style="display:none ;">
					<tr>
						<td height="8"></td>
					</tr>
					<% 
					int bjlength=bjList.size()>8?8:bjList.size();
					for(int i=0;i<bjlength;i++){
						ApasInfo temInfo =(ApasInfo)bjList.get(i);
					%>
					<tr>
						<td height="25">
							&gt;
							<a href="#" class="ys_list" onclick="openDocument('<%=temInfo.getUnid() %>')"><%=temInfo.getProjectname() %></a>
						</td>
					</tr>
					<% } %>
				</table>
				<!-- 结束本级上报件 -->
				<!-- 下级上报件 -->
				<table width="96%" border="0" align="center" cellpadding="0"
					cellspacing="0" class="ys_list" id="jhContent4"
					style="display:none ;">
					<tr>
						<td height="8"></td>
					</tr>
					<% 
					int xjlength=xjList.size()>8?8:xjList.size();
					for(int i=0;i<xjlength;i++){
						ApasInfo temInfo =(ApasInfo)xjList.get(i);
					%>
					<tr>
						<td height="25">
							&gt;
							<a href="#" class="ys_list" onclick="openDocument('<%=temInfo.getUnid() %>')"><%=temInfo.getProjectname() %></a>
						</td>
					</tr>
					<% } %>
				</table>
				<!-- 结束下级上报件 -->
            </td>
          </tr>
          
        </table></td>
        <td width="10" valign="top"><!--DWLayoutEmptyCell-->&nbsp;</td>
        <td width="230" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0">
          <!--DWLayoutTable-->
          <tr>
            <td width="230" height="29" valign="top"><table width="100%" border="0" cellpadding="0" cellspacing="0">
              <!--DWLayoutTable-->
              <tr>
                <td width="230" height="29" valign="bottom" background="images/gg_menu_bg.gif">
					<div id="ggMenu">
                		<ul>
                    		<li class="ggMenuSelected"><a href="javascript:void(0)" onmouseover="selectTag3('ggContent0',this)">通知公告</a></li>
                      		<li><a href="javascript:void(0)" onmouseover="selectTag3('ggContent1',this)">系统消息</a></li>
                    	</ul>
       			 	 </div>
				</td>
                </tr>
            </table></td>
          </tr>
          <tr>
            <td height="212" valign="top" class="ys_box">
            <table width="96%" border="0" align="center" cellpadding="0"
							cellspacing="0" class="ys_list" id="ggContent0"
							style="display: ;">
							<tr>
								<td height="8"></td>
							</tr>
							<% 
							int tzlength=tzList.size()>8?8:tzList.size();
							for(int i=0;i<tzlength;i++){
								PtlArticle article =(PtlArticle)tzList.get(i);
							%>
								<tr>
									<td height="25">
									
										&gt;<a href="#" class="ys_list" onclick="openArticle('<%=article.getUnid() %>')"><%=article.getTitle() %></a>
									</td>
								</tr>
						
								
							<%} %>
							
						</table>
						<table width="96%" border="0" align="center" cellpadding="0"
							cellspacing="0" class="ys_list" id="ggContent1"
							style="display: none;">
							<tr>
								<td height="8"></td>
							</tr>
							<% 
							int xxlength=xxList.size()>8?8:xxList.size();
							for(int i=0;i<xxlength;i++){
								Msg msg =(Msg)xxList.get(i);
							%>
								<tr>
									<td height="25">
										&gt;<a href="#" class="ys_list" onclick="openMsg('<%=msg.getRelevanceunid() %>')"><%=msg.getTitle() %></a>
									</td>
								</tr>
						
								
							<%} %>
						
						</table>
            
            </td>
          </tr>
          
        </table>
        </td>
      </tr>
    </table>
<div id="ledDiv" style="position: absolute;left:753px;top:18px;display:'';border:1px solid gray;width: 200px;text-align: center;display:none">
	<span id='led' style='color:red;font-weight: bold;'>&nbsp;</span>
</div>
<script type="text/javascript"> 
//查看消息
function openMsg(id){
	top.popup.showModalDialog('/core/msg/msg_receive.jsp?unid='+ id,"消息",600,500);
}
//查看联审
function openLS(id,apasUnid){
	top.popup.showModalDialog('/was/jsp/meet/apasmeet_all.jsp?meetunid='+ id+"&unid="+apasUnid,"联审件",950,570);

}
var userDisplayName = '<%=user.getDisplayName()%>';
var ledJson = $.parseJSON('<%=ledJson.toString()%>');
var ip = ledJson.IPADDR;
var ledAddr = '1';
//预审
function yushen(id,serviceId){
	top.popup.showModalDialog('/was/jsp/guide/guide_apas_edit.jsp??unid=-1&serviceid='+serviceId+'&advanceId='+ id,"办件信息",800,500);
}

//处理完毕
function done(id,callCount){
		if(callCount>=0){
			$.ajax({
				url:'GuideCallNum.action',
				type:'post',
				dataType:'json',
				cache:false,
				async:false,
				data:{
					fn:'done',
					advanceId:id
				},
				error:function(){
					top.lwin.errorService();
				},
				success:function(result){
					if(result.success){
						top.lwin.alert('信息提示','操作成功','info');
					}
				}
			});
			
		}else{
			top.lwin.alert('信息提示','请先叫号','warning');
		}
}
	//叫号
function callnum(id,code){
	$('#ledDiv').attr("style","position: absolute;left:753px;top:18px;display:'';border:1px solid gray;width: 200px;text-align: center;display:''");
	if(!isSetWin()){
		return;
	}
	saveCallNum(id);
	$('#led').text('请 '+code+' 号到'+ledJson.FLOOR + ledJson.WINCODE + '窗口');
	call(code);
}
function saveCallNum(punid){
	$.ajax({
		url:'GuideCallNum.action',
		type:'post',
		dataType:'json',
		cache:false,
		async:false,
		data:{
			fn:'saveCallNum',
			punid:punid
		},
		error:function(){
			top.lwin.errorService();
		},
		success:function(result){
			
		}
	});
}
//是否设置窗口
function isSetWin(){
	if(!ledJson.FLOOR){
		top.lwin.alert('信息提示','请在个人中心先配置窗口信息');
		return false;
	}else{
		return true;;
	}
}
//叫号
function call(guideCode){
	$.ajax({
		url:'GuideCallNum.action',
		type:'post',
		dataType:'json',
		cache:false,
		//async:false,
		data:{
			fn:'call',
			ip:ip,
			ledAddr:ledAddr,
			//text:text,
			floor:ledJson.FLOOR,
			wincode:ledJson.WINCODE,
			guideCode:guideCode
		},
		error:function(){
			top.lwin.errorService();
		},
		success:function(result){
			
		}
	});
}
</script>
