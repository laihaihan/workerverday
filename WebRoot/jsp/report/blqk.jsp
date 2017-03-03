<%@ page contentType="text/html;charset=GBK"%>
<%@include file="/ess/jsp/common/nocache.jsp"%>
<%@ page import="com.linewell.dt.DateTime"%>
<%
String whoseSys = request.getParameter("whoseSys");
String starttime = request.getParameter("starttime");
	if(null == starttime){
		starttime = DateTime.getNowDateTime(); 
	}
String defultArea = "350500_000000";
	String defultDept = "0";
	int dl = 19;
	if(null == whoseSys || "xzsp".equals(whoseSys)){
		dl = 10;
	}else if("xzzf".equals(whoseSys)){
		dl = 7;
	}else if("zfcg".equals(whoseSys)){
		dl = 7;
	}else if("jsgc".equals(whoseSys)){
		dl = 7;
	}else if("lstd".equals(whoseSys)){
		dl = 10;
	}
	starttime = starttime.substring(0, dl);
	String time = "yyyy-MM-dd HH:mm:ss".substring(0, dl);
	%>
<HTML>
<HEAD>
	<LINK href="../../ess/css/style.css" type=text/css rel=stylesheet>
<script language="javascript" src="<%=request.getContextPath()%>/ess/js/monitor/calendar/WdatePicker.js"></script>
	<SCRIPT language=Jscript>
	function search(){
		var area = "350500_000000"; // document.getElementById("areaCode").value;
		var dept = "0" ; // document.getElementById("deptUnid").value;
		var starttime = document.getElementById("starttime").value;
		window.frames["chartIframe"].location="blqkByInfo.jsp?whoseSys=<%=whoseSys %>&area="+area+"&dept="+dept+"&starttime=" + starttime ;
	}
	
	</SCRIPT>
</HEAD>

<BODY text=#000000 bgColor=#ffffff>
	<table cellspacing=0 cellpadding=0 width="100%" align=center id=tableModule>
		<tbody>
			<tr>
				<td><table width="100%" border="0" cellspacing="5" cellpadding="0">
					<tr>
						<td><table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td><table width="100%" border="0" cellpadding="0" cellspacing="0" align=center >
				                	<tr>
										<td width="8" valign=bottom><img src="../../images/new/mid_top_left.gif" width="8"></td>
										<td background="../../images/new/mid_top.gif">&nbsp;</td>
										<td width="8" valign=bottom><img src="../../images/new/mid_top_right.gif" width="8" ></td>
									</tr>
								</table></td>
							</tr>
							<tr>
								<td><table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td width="6" background="../../images/new/mid_left.gif">&nbsp;</td>
										<td><table width="100%" border="0" cellspacing="5" cellpadding="0">
										<tr>
<td align="center"><input type="text" id="starttime"
								name="starttime" size="15"
								style="font-size:12px " value="<%=starttime%>"
								onFocus="WdatePicker({el:$dp.$('starttime'),skin:'whyGreen',dateFmt:'<%=time%>',isShowOthers:false,autoPickDate:'true'})">
						
<input type="button" name="onSubmit" id="onSubmit" value="²é Ñ¯" onclick="search()"></td>

										</tr>
											<tr>
												<td height="360">
												<iframe id="chartIframe" name="chartIframe" src="blqkByInfo.jsp?whoseSys=<%=whoseSys %>&area=<%=defultArea %>&dept=<%=defultDept %>&starttime=<%=starttime %>" width="100%" height="120%" scrolling="yes"></iframe>														
												</td>
											</tr>
										</table></td>
										<td width="8" background="../../images/new/mid_right.gif">&nbsp;</td>
									</tr>
								</table></td>
							</tr>
							<tr>
								<td><table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td width="6"><img src="../../images/new/mid_b_left.gif" width="6" height="14"></td>
										<td background="../../images/new/mid_bg.gif">&nbsp;</td>
										<td width="8"><img src="../../images/new/mid_b_right.gif" width="8" height="14"></td>
									</tr>
								</table></td>
							</tr>
						</table></td>
					</tr>
				</table></td>
			</tr>
		</tbody>
	</table>
</BODY>
</HTML>

<script type="text/javascript" language="javascript">   
	function iFrameHeight() {   
		var ifm= document.getElementById("chartIframe");   
		var subWeb = document.frames ? document.frames["chartIframe"].document : ifm.contentDocument;   
		if(ifm != null && subWeb != null) {
		   ifm.height = subWeb.body.scrollHeight;
		}
	}   
</script>