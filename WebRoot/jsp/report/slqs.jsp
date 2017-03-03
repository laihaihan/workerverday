<%@ page contentType="text/html;charset=GBK"%>
<%@include file="/ess/jsp/common/nocache.jsp"%>
<%@ page import="com.linewell.util.DateUtil"%>
<html>
<head>
	<SCRIPT language="javascript" src="../../js/module/module.js"></SCRIPT>
	<LINK href="../../css/style.css" type=text/css rel=stylesheet>
	<SCRIPT language=JScript.Encode src="../../jslib/funlib.js"></SCRIPT>
	<SCRIPT LANGUAGE="JavaScript">
	function hiddenOrDisplayDiv(id, img) {
		var obj = document.getElementById(id).style.display;
		if(obj=="block") {
			document.getElementById(id).style.display = "none";
			document.getElementById("imgid_" + img).src="../../images/module/icon_01.gif";
		} else{
			document.getElementById(id).style.display = "block";
			document.getElementById("imgid_" + img).src="../../images/module/down.gif";
		}
	}
	function search(){
		var area = document.getElementById("areaCode").value;
		var dept = document.getElementById("deptUnid").value;
		var starttime = document.getElementById("starttime").value;
		var endtime = document.getElementById("endtime").value;
		window.frames["chartIframe"].location="<%=request.getContextPath()%>/jsp/chart/slqk4Report.jsp?area="+area+"&dept="+dept+"&starttime="+starttime+"&endtime="+endtime;
	}
	
	</SCRIPT>	
</head>
<BODY class=dialogBg text=#000000 bgcolor="#fffff0">
	<DIV id="QZS_DIV" style="OVERFLOW-Y: auto; OVERFLOW: auto; WIDTH:100%; FONT-FAMILY: 宋体; LETTER-SPACING: 1pt; HEIGHT:100%; ">
		<TABLE border="0" cellspacing="0" cellpadding="0" width="100%"><tbody>
			<TR>
				<TD width="98%" valign="top">
					<TABLE cellSpacing="1" cellPadding="0" width="100%" border="0" valign="top"><TBODY>
						<TR>
							<TD valign="top"><TABLE cellSpacing="0" cellPadding="2" width="100%" bgcolor="#8AC0E2" border="0"><TBODY>
								<TR>
									<TD bgColor="#ffffff" valign="top">
										
										
								<% 
								
								String defultArea = "350500_00000000";
								String defultDept = "0";
								
								DateUtil du = new DateUtil();
								String starttime = du.get12thMonth(); //默认开始时间（去年第一个月）
								String endtime = du.getCurrentMonth(); //默认结束时间（当前月份的下一个月份）
								%>
										
										<!-- 统计报表 -->
										<DIV id="QZS_CONCERN_DIV" style="display:block">
											<TABLE cellSpacing="0" cellPadding="0" width="100%" align="center" border="0" valign="top">
												<TBODY>
													<TR>
														<TD vAlign="top">
															<TABLE width="100%" align="center" cellpadding="1" cellspacing="1" bgcolor="#8AC0E2" valign="top">
																<TBODY>
																	<TR>
																		<TD vAlign="top" height="450" align="center" bgcolor="#F1F4F5">
																		
																			<iframe id="chartIframe" name="chartIframe" src="<%=request.getContextPath()%>/jsp/chart/slqk4Report.jsp?area=<%=defultArea %>&dept=<%=defultDept %>&starttime=<%=starttime %>&endtime=<%=endtime %>" width="100%" height="100%"scrolling="no"></iframe>														
																		</TD>
																	</TR>
																</TBODY>
															</TABLE>
														</TD>	
													</TR>
												</TBODY>
											</TABLE>
										</DIV>
										
									</TD>
								</TR>	
							</TBODY></TABLE></TD>
						</TABLE>
				</TD>
				</TR>
			</TBODY>
		</TABLE>
	</DIV>
</BODY>
</HTML>