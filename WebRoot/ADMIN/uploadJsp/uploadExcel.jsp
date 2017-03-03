<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@include file="../include/session.jsp"%>
<%
/**
 * 上传Excel内容
 * @author  fshaoming@linewell.com
 * @since   2011-12-16
 */
//获取应用系统的unid
String appUnid = request.getParameter("appUnid");

//模块的UNID
String moduleUnid=request.getParameter("moduleUnid");

//如果为空，则为非法访问，直接退出不做处理
if (StringUtils.isEmpty(appUnid)
		|| StringUtils.isEmpty(moduleUnid))
    return;

%>
<!DOCTYPE html>
<html>
	<head>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
		<title>数据表导入</title>
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
		<link href="../style/viewSelect.css" rel="stylesheet" type="text/css" />
	
	</head>
	<script type="text/javascript">
		
		/**
		*提示操作返回的消息
		*/
		function oprResult(i){
			if("0"!=i){
				alert("成功导入"+i+"张表！");
			}else{
				alert("没有可导入的数据表，或者数据表已存在，导入失败！");
			}
			//导入返回后，按钮显示
			document.getElementById("Button1").style.display="";
		}
		
		/**
		*文件上传提交
		*/
		function submit(){
			var ff = document.getElementsByTagName("input");
			var isSubmit=true;
			for(var i=0;i< ff.length; i++)
			{
				  if(ff[i].type == "file" && ff[i].name=="file")
				  {
				  		if(ff[i].value==""){
					  		isSubmit=false;
				  		}
				  }
				  break;
			}
			if(isSubmit){
				//导入执行期间按钮隐藏
				document.getElementById("Button1").style.display="none";
				document.getElementById('form_upload').submit();
			}else{
				alert("请选择要导入的Excel数据表！");
			}
		}
		
		/**
		*关闭窗口
		*/
		function closePage(){
			if(window.parent && window.parent.parentEvents){
				window.parent.parentEvents.close();				
			}
		}
		
	</script>

	<body>

			<!-- 内容 -->
			<div class="popContent">
				<form name="form_upload" id="form_upload"
					action="processExcel.jsp?appUnid=<%=appUnid%>&moduleUnid=<%=moduleUnid %>"  target="form_iframe"
					enctype="multipart/form-data" method="post">
					<div>请选择要导入的文件(xls)：</div>
					<div>
						<input class="inputXlsImportingBrowse" name="file" id="file_excel" type="file"  />
					</div>
					<div style="text-align:center;line-height:30px;">
					   <a href="ImportExcelTemplate.xls" target="_blank" style="color:#ff0000;">导入模板下载</a>
					</div>
				</form>
				<div style="display: none">
					<iframe name="form_iframe" src="#" style="width: 0px; height: 0px;"></iframe>
				</div>				
			</div>		
			
			<!-- 按钮区 -->
			<div class="popBtns">
				<input name="Button2" type="button" onclick="closePage()" value="关闭" />
				<input name="Button1" type="button" id="Button1"
					onclick="submit();"
					value="导入" />
			</div>
	</body>
</html>
