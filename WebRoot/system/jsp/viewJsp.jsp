<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/system/jsp/view/loadViewBaseInfoAndData.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
<meta content="history" name="save" />
<title>平台视图</title>
<link href="../css/view.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>js/ucap/view/viewJsp.js"></script>
<script type="text/javascript">
function onloadEvent(func)
{ 
  var one=window.onload 
  if(typeof window.onload!='function'){  
    window.onload=func 
  } else{  
    window.onload=function(){   
      one();   
      func();  
    } 
  }
}
function showtable(){
  var tableid='dataViewTable'; 
  //表格的id 
  var overcolor='#efefef'; 
  //鼠标经过颜色 
  var color1='#ffffff';  
  //第一种颜色 
  var color2='#fafafa';  
  //第二种颜色 
  var tablename=document.getElementById(tableid) 
  var tr=tablename.getElementsByTagName("tr") 
  for(var i=0 ;i<tr.length;i++){  
    tr[i].onmouseover=function(){   
    this.style.backgroundColor=overcolor;  }  
    tr[i].onmouseout=function(){   
      if(this.rowIndex%2==0){   
          this.style.backgroundColor=color1;  
      }else{   
          this.style.backgroundColor=color2;  
      }
    }  
    if(i%2==0){ 
    	tr[i].sytle="background-color:#fafafa;";  
    }else{   
        tr[i].sytle="background-color:#008000;"; 
    } 
  }
}
onloadEvent(showtable);

</script>
</head>

<body>



		<!-- 搜索栏 begin-->
		<%@include file="/system/jsp/view/loadSampleSearch.jsp"%>
		<!-- 搜索栏 end-->
		
		<!-- 高级搜索 begin-->
			<%@include file="/system/jsp/view/loadAdvanceSearch.jsp"%>
		<!-- 高级搜索 end-->
		
		<!-- 按钮栏 begin-->
		<div class="area_buttonBar">
			<%@include file="/system/jsp/view/loadButton.jsp"%>
		</div>
		<!-- 按钮栏 end-->
		
		<!-- 视图表格 begin-->
	
			<table width="100%"  cellpadding="0" cellspacing="0">
				<!-- 标题 -->
				<tr >
					<td width=100%> 
						<%@include file="/system/jsp/view/loadtitle.jsp"%>
					</td>
				</tr>
				<!-- 标题结束 -->
				<tr>
					<!-- 数据内容 -->
					<td width=100% align=left style="margin:0;padding:0;">
						<%@include file="/system/jsp/view/loadViewData.jsp"%>
					</td>
					<!-- 数据内容结束 -->
				</tr>
			</table>
		
		<!-- 视图表格 end-->
		<!-- 页码栏 begin-->
		<%@include file="/system/jsp/view/loadPage.jsp"%>
		<!-- 页码栏 end-->
<!-- 右边间区域（用于视图） end-->

<form id="delForm"></form>
<%@include file="/system/jsp/view/loadJs.jsp"%>
</body>

</html>
