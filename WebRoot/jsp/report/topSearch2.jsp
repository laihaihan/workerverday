<%@ page contentType="text/html;charset=GBK"%>
<%@ include file="/ess/jsp/common/nocache.jsp"%>
<%@ page import="com.linewell.util.DateUtil"%>
<%@ page import="com.linewell.ess.monitor.helper.DeptUnitHelper"%>

<%

	String topuserid = "";// user.getUnid();
	String userRole = "";// user.getRoles();
	boolean isDeptMamager = true; // userRole.indexOf("F1A02AFE9B3D07FF75A07DC95AC329FB")>-1;
	String defultArea = "0";
	String defultDept = "0";
	String[][] top_area=null;
	String[][] top_dept=null;
	if(isDeptMamager){
		String sql="select t.dept_unid, t.dept_name from ucap_dept t where t.dept_is_enabled='1' and t.dept_belongto='88001' and t.dept_underdept like '%��������%' order by t.dept_unid";
		top_area=DeptUnitHelper.getArea4sql(sql);
		top_dept=DeptUnitHelper.getDept4areas(top_area);
	}else{
		top_area=DeptUnitHelper.getArea4Report(topuserid);
		top_dept=DeptUnitHelper.getDept4areas(top_area);
	} 	 
	String top_depts ="";
	DateUtil du = new DateUtil();
	String starttime = du.get12thMonth(); //Ĭ�Ͽ�ʼʱ�䣨ȥ���һ���£�
	String endtime = du.getCurrentMonth(); //Ĭ�Ͻ���ʱ�䣨��ǰ�·ݵ���һ���·ݣ�
	for(int i=0;i<top_dept.length;i++){
		top_depts= top_depts + top_dept[i][0] + "-" + top_dept[i][1] + "-"+ top_dept[i][2] + "#";
	}
%>
<STYLE type=text/css>
.btn_2k3 {
 BORDER-RIGHT: #002D96 1px solid; PADDING-RIGHT: 2px; BORDER-TOP: #002D96 1px solid; PADDING-LEFT: 2px; FONT-SIZE: 12px; FILTER: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#FFFFFF, EndColorStr=#9DBCEA); BORDER-LEFT: #002D96 1px solid; CURSOR: hand; COLOR: black; PADDING-TOP: 2px; BORDER-BOTTOM: #002D96 1px solid
}
</STYLE>

<LINK href="../../css/style.css" type=text/css rel=stylesheet>
<script language="javascript" src="<%=request.getContextPath()%>/ess/js/monitor/calendar/WdatePicker.js"></script>
<SCRIPT LANGUAGE="JavaScript">
<!--
	var arrsd = "<%=top_depts %>";
	var isdept = "<%=isDeptMamager %>";
	function changeArea(area){
		var opt = '<select name="deptUnid" id="deptUnid" size="1">'
		if('false'==isdept)
		opt = opt + '<option value="0">��ѡ����</option>';
		var arrs = arrsd.split("#");
		for(var i=0;i<arrs.length-1; i++){
			var arr = arrs[i].split("-");
			if(arr[2]==area){
			opt = opt+"<option value="+arr[0]+">" +arr[1] +"</option>";
			}
		}
		opt = opt+'</select>';
		document.getElementById("dept").innerHTML=opt;
	}
	
//-->
</SCRIPT>

	<DIV id="QZS_TOTAL_DIV" style="display:block">						
		<TABLE cellSpacing="0" cellPadding="0" width="100%" align="center" border="0">
			<TBODY>
				<TR>
					<TD vAlign="top" height="24">
						<TABLE width="100%" align="center" cellpadding="2" cellspacing="1" border="0" bgcolor="#DCEFFF">
							<TBODY>
								<tr>
							    <td width="20%" rowspan="2" align="center" bgcolor="#DCEFFF">����ϵͳ</td>
							    <td width="10%" align="right" bgcolor="#FFFFFF">��������</td>
							    <td width="15%" bgcolor="#FFFFFF">
							    	<select name="areaCode" id="areaCode" size="1" onchange="changeArea(this.value)">
							    	<% 
							    	if(top_area.length > 1)
										defultArea = top_area[1][0];
							    	for(int i=1;i<top_area.length; i++){
							    	out.print("<option value="+ top_area[i][0]+">" +top_area[i][1] +"</option>");
							    	} %>
						        </select>
						       </td>
							  
							    <td width="8%" align="right" bgcolor="#FFFFFF">��������</td>
							    <td width="30%" bgcolor="#FFFFFF" id="dept" >
							    	<select name="deptUnid" id="deptUnid" size="1">
							    	<%
									
									if(isDeptMamager){ 
										if(top_dept.length > 1)
											defultDept = top_dept[1][0];
									} else{ %>
								      <option value="0">��ѡ����</option>
								      <%} for(int i=1;i<top_dept.length; i++){
								      if(defultArea.equals(top_dept[i][2]))
							    		out.print("<option value="+ top_dept[i][0]+">" +top_dept[i][1] +"</option>");
							    	} %>
								    </select>
							    </td>
							  </tr>
							  <tr>
							  <td bgcolor="#FFFFFF" align="right"> ��ʼʱ��</td>
							  <td bgcolor="#FFFFFF"> 
							  <input type="text" id="starttime"
								name="starttime" size="25"
								style="font-size:12px " value="<%=starttime%>"
								onFocus="WdatePicker({el:$dp.$('starttime'),skin:'whyGreen',dateFmt:'yyyy-MM',isShowOthers:false,autoPickDate:'true'})">
						
								</td>
							  <td bgcolor="#FFFFFF" align="right">����ʱ��</td>
							  <td bgcolor="#FFFFFF"><input type="text" id="endtime" name="endtime"
									size="25" style="font-size:12px "
									value="<%=endtime%>"
									onFocus="WdatePicker({el:$dp.$('endtime'),skin:'whyGreen',dateFmt:'yyyy-MM',isShowOthers:false,autoPickDate:'true'})">
																											
						        </td>
							  </tr>																  
							  <tr>
							    <td colspan="5" bgcolor="#FFFFFF" align="center"><input style="cursor:hand" name="queryButton" type="button" class="btn_2k3" id="queryButton" value=" ��  ѯ " onclick="search();"/></td>
							  </tr>											  	
							</TBODY>
						</TABLE>
					</TD>
				</TR>		
			</TBODY>	
		</TABLE>
	</DIV>
				
										