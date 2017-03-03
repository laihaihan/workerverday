<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.print.printlodop.Print"%>
<%@ page import="com.linewell.core.print.printlodop.PrintManager"%>
<%@ page import="com.linewell.core.util.StrUtil" %>
<%@ page import="com.linewell.core.util.UNIDGenerate" %>
<%@ page import="com.linewell.core.db.JdbcSession"%>
<%@ page import="com.linewell.core.db.JdbcFactory"%>
<%@ page import="com.linewell.core.system.GlobalParameter"%>
<%@ page import="com.linewell.core.util.SqlUtil"%>
<%@ page import="java.util.Map"%>
<%@ page import="org.apache.commons.lang.StringUtils"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String print_unid = request.getParameter("print_unid");
	String pageWidth = request.getParameter("pageWidth");
	String pageHeight = request.getParameter("pageHeight");
	
	Map commentsMap = null;
	String[] fields = new String[0];
	PrintManager manager = new PrintManager();
	Print print = manager.doFindBeanByKey(print_unid);
	if(print == null){
		print = new Print();
		print.setPrint_unid(new UNIDGenerate().getUnid());
	}else{
		fields = manager.getFields(print.getPrint_sql());		
		JdbcSession jdbc = JdbcFactory.getSession(GlobalParameter.APP_WAS);
		commentsMap = jdbc.getColumnComments(SqlUtil.getTables(print.getPrint_sql()));
		
	}
	if(StringUtils.isNotEmpty(pageWidth)){
		String contnet = print.getPrint_content();
		contnet += "LODOP.PRINT_INITA(0,0,\""+pageWidth+"\",\""+pageHeight+"\",\"\");"; 
		print.setPrint_content(contnet);
	}
	
	request.setAttribute("print",print);
	request.setAttribute("fields",fields);
	request.setAttribute("path",request.getContextPath());
%>
<html>
<head>
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/default/easyui.css">
	<link type="text/css" rel="stylesheet" href="${path}/core/js/easyui/themes/icon.css">
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="LodopFuncs.js"></script>
</head>
<body style="background: #ffffff;">
	<table width="100%" align="center">
		<tr>
			<td align="right" style="padding-left:20px;height:30px;font-size:14px">
				横向:<input type="checkbox" id="intOrient">
				<select name="text" id="field">
					<option value="TEXT">文本框</option>
					<%
						for(int i=0;i<fields.length;i++){
					%>
					<option value="<%=fields[i] %>">&nbsp;<%=commentsMap.get(fields[i])!=null?commentsMap.get(fields[i])+"&nbsp;&nbsp;&nbsp;&nbsp;":""  %><%=fields[i] %></option>	
					<%		
						}
					%>
				</select>
				<input type="button" value="添加" id="btnAdd"/>&nbsp;
				纸张大小:
				<select id="paper">
					<option width="297mm" height="420mm">A3</option>			
					<option width="210mm" height="297mm" selected>A4</option>			
					<option width="148mm" height="210mm">A5</option>		
				</select>
				<input type="button" value="保存" id="btnSave" style="margin-left:20px;margin-right:15px;">
			</td>
		</tr>
		<tr>
			<td>
				<object id="LODOP" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=100% height=400> 
					<embed id="LODOP_EM" type="application/x-print-lodop" pluginspage="install_lodop.exe"></embed>
				</object> 
				<img src='${path}/${print.print_background}' style="display:none" id="imgBg">
			</td>
		</tr>
	</table>
	<script type="text/javascript">
		var LODOP; //声明为全局变量
		$(function(){
			setPrintContent();
			$("#btnSave").bind("click",doSave);
			$("#btnAdd").bind("click",doAddText);
			$("#paper").bind("change",doSetPaper);
			$("#intOrient").bind("change",doSetPaper);
		});
		
		//设置打印内容
		function setPrintContent(){
			LODOP = getLodop(document.getElementById('LODOP'),document.getElementById('LODOP_EM'));				
			${print.print_content}
			LODOP.SET_SHOW_MODE("DESIGN_IN_BROWSE",1);
			LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW",1);
			LODOP.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW",1);		
			
			//插入背景图
			if('${print.print_background}'.length>0){
				LODOP.ADD_PRINT_SETUP_BKIMG("<img src='${path}/${print.print_background}'>");
				
				if(<%=StrUtil.formatNull(print.getPrint_content()).indexOf("BKIMG_WIDTH")>-1?"true":"false"%>){
					LODOP.SET_SHOW_MODE("BKIMG_WIDTH",<%=StringUtils.substringBetween(print.getPrint_content(),"(\"BKIMG_WIDTH\",",");")%>);
					LODOP.SET_SHOW_MODE("BKIMG_HEIGHT",<%=StringUtils.substringBetween(print.getPrint_content(),"(\"BKIMG_HEIGHT\",",");")%>);
				}
			}			
			
			if(<%=StringUtils.substringBetween(print.getPrint_content(),"SET_PRINT_PAGESIZE(",",")%>==2){
				$("#intOrient").attr('checked',true);
				LODOP.SET_PRINT_PAGESIZE(<%=StringUtils.substringBetween(print.getPrint_content(),"SET_PRINT_PAGESIZE(",");")%>);
			}
			
			LODOP.PRINT_DESIGN();
			
			
			if(<%=print.getPrint_content().indexOf("2970,4200")>-1%>){
				$('#paper option:contains("A3")').attr('selected',true);
				
			}else if(<%=print.getPrint_content().indexOf("2100,2970")>-1%>){
				$('#paper option:contains("A4")').attr('selected',true);
			
			}else if(<%=print.getPrint_content().indexOf("1480,2100")>-1%>){
				$('#paper option:contains("A5")').attr('selected',true);
			}
		}
		
		//保存表单信息
		function doSave(){
			$.ajax({
				type:'post',		
				url:'${path}/print.action',
				dataType:'json',
				data:{
					fn:'update',
					print_unid:'${print.print_unid}',
					print_content:LODOP.GET_VALUE('ProgramCodes',1)
				},
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					alert(data.result ? '保存成功' : '保存失败');
				}
			});
		}
		
		//添加文本框
		function doAddText(){
			var val = '\\${'+$('#field').val()+'}';
			LODOP.ADD_PRINT_TEXTA('a',9,262,175,30,val);
		}
		
		//设置打印纸大小
		function doSetPaper(){
			var pageWidth = $('#paper').find(':selected').attr('width');
			var pageHeight = $('#paper').find(':selected').attr('height');	
			
			var intOrient = $('#intOrient').attr('checked');
			if(intOrient){
				var tmp = pageWidth;
				pageWidth = pageHeight;
				pageHeight = tmp;
				
				LODOP.SET_SHOW_MODE("BKIMG_WIDTH",pageWidth);
				LODOP.SET_SHOW_MODE("BKIMG_HEIGHT",pageHeight);	
				LODOP.SET_PRINT_PAGESIZE(2,pageHeight,pageWidth,"");
				
			}else{
				LODOP.SET_SHOW_MODE("BKIMG_WIDTH",pageWidth);
				LODOP.SET_SHOW_MODE("BKIMG_HEIGHT",pageHeight);
				LODOP.SET_PRINT_PAGESIZE(0,pageWidth,pageHeight,"");
			}
			
			$.ajax({
				type:'post',		
				url:'${path}/print.action',
				dataType:'json',
				data:{
					fn:'update',
					print_unid:'${print.print_unid}',
					print_content:LODOP.GET_VALUE('ProgramCodes',1)
				},
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					location.href = "?print_unid=<%=print_unid%>&pageWidth="+pageWidth+"&pageHeight="+pageHeight;
				}
			});			
			
		}
	</script>
</body>
</html>