<%@ page language="java" pageEncoding="utf-8"%>
<%
	request.setAttribute("path", request.getContextPath());
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>My JSP 'index.jsp' starting page</title>
		<!--[if IE]><script type="text/javascript" src="../js/jqplot/excanvas.js"></script><![endif]-->
		<!--以下为easyUI-->
		<link rel="stylesheet" href="../js/themes/default/easyui.css"type="text/css"></link>
		<link rel="stylesheet" href="../js/themes/icon.css" type="text/css"></link>
		<link rel="stylesheet" href="../js/themes/demo.css" type="text/css"></link>
		<script type="text/javascript" src="../js/jquery-1.8.0.min.js"></script>
		<script type="text/javascript" src="../js/jquery.easyui.min.js"></script>
		<!--以下为jqplot图表 -->
		<script type="text/javascript" src="../js/jqplot/jquery.min.js"></script>
		<link rel="stylesheet" href="../js/jqplot/jquery.jqplot.css" type="text/css"></link>
		<script type="text/javascript" src="../js/jqplot/jquery.jqplot.js"></script>
		<script type="text/javascript" src="../js/jqplot/jqplot.pieRenderer.js"></script>
		<script type="text/javascript" src="../js/jqplot/jqplot.categoryAxisRenderer.js"></script>
		<script type="text/javascript" src="../js/jqplot/jqplot.barRenderer.js"></script>
		<script type="text/javascript" src="../js/jqplot/jqplot.pointLabels.js"></script>
		<script type="text/javascript" src="../js/jqplot/jqplot.cursor.js"></script>
		<script type="text/javascript" src="../js/jqplot/jqplot.highlighter.js"></script>
		<script type="text/javascript" src="../js/jqplot/jqplot.dateAxisRenderer.js"></script>
		<!--以下为JSON解析  -->
		<script type="text/javascript" src="../js/jquery.json-2.3.js"></script>
		
<script type="text/javascript" language="javascript">  
//项目分布信息统计-柱状图  
var ticks=[];//区县名称,即横坐标
var s1=[];//承诺件
var s2=[];//联办件
var s3=[];//即办件
var s4=[];//其他
var s5=[];//总数
function onLoad(){
   			//获取后台的JSON
		    $.getJSON("${path}/rsp/firstTabAction!projectBarRenderer.action", function(data){//从后台获取json			 	
		        var rowsLength=data.rows.length;//获取json的长度
		        for(i=0;i<rowsLength;i++){//遍历循环
		        ticks.push(data.rows[i].区县名称);//添加到数组,rows为json的Key名称,"区县名称"为字段名
		        s1.push(data.rows[i].承诺件);//添加到数组,rows为json的Key名称,"承诺件"为字段名
		        s2.push(data.rows[i].联办件);//添加到数组,rows为json的Key名称,"联办件"为字段名
		        s3.push(data.rows[i].即办件);//添加到数组,rows为json的Key名称,"即办件"为字段名
		        s4.push(data.rows[i].其他);//添加到数组,rows为json的Key名称,"其他"为字段名
		        s5.push(data.rows[i].总数);//添加到数组,rows为json的Key名称,"总数"为字段名
		        }
		   });	   
		  }
onLoad();//加载数据

//显示jqplot图表
$(document).ready(function(){
		//测试数据
        //var s1 = [2, 6, 7, 10,2, 6, 7, 10,2, 6, 7, 10];
        //var s2 = [7, 5, 3, 2,7, 5, 3, 2,7, 5, 3, 2];
        //var s3 = [2, 6, 7, 10,2, 6, 7, 10,2, 6, 7, 10];
        //var s4 = [7, 5, 3, 2,7, 5, 3, 2,7, 5, 3, 2];
        //var s5 = [2, 6, 7, 10,2, 6, 7, 10,2, 6, 7, 10];
        //var ticks = ['苍南县', '洞头县', '乐清市', '鹿城区','平阳县','瑞安市','泰顺县','温州市','文成县','永嘉县','瓯海区','龙湾区'];
         
        plot2 = $.jqplot('chart1', [s1, s2, s3, s4, s5], {
         	title: '项目分布信息统计柱状图',
         	legend: {show: true, location: 'ne'}, //提示工具栏--show：是否显示,location: 显示位置 (e:东,w:西,s:南,n:北,nw:西北,ne:东北,sw:西南,se:东南)   
         	series: [{label: '承诺件'}, {label: '联办件'},{label: '即办件'}, {label: '其他'},{label: '总数'}], //提示工具栏   
            seriesDefaults: {
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            legend: {
            show: true,
            placement: 'outsideGrid'//提示工具显示在表格之外
       		 },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                    
                }
            }
        });    
        
    });
 </script>
 <script type="text/javascript" language="javascript">
 //项目分布信息统计-饼状图
  var c2_s1=0;//承诺件
  var c2_s2=0;//联办件
  var c2_s3=0;//即办件
  var c2_s4=0;//其他
  
  function onLoad(){
   			//获取后台的JSON
		    $.getJSON("${path}/rsp/firstTabAction!projectPieRenderer.action", function(data){//从后台获取json			 	
		        var rowsLength=data.rows.length;//获取json的长度
		        for(i=0;i<rowsLength;i++){//遍历循环
			        c2_s1=data.rows[i].承诺件;//添加到数组,rows为json的Key名称,"承诺件"为字段名
			        c2_s2=data.rows[i].联办件;//添加到数组,rows为json的Key名称,"联办件"为字段名
			        c2_s3=data.rows[i].即办件;//添加到数组,rows为json的Key名称,"即办件"为字段名
			        c2_s4=data.rows[i].其他;//添加到数组,rows为json的Key名称,"其他"为字段名
		        }
		   });	   
		  }
onLoad();//加载数据
 	
//显示jqplot图表
$(document).ready(function(){
  //测试数据
  //var data = [['承诺件 ', 2],['联办件', 4], ['既办件', 3], ['其他', 1]];
   var data = [['承诺件 ', c2_s1],['联办件',c2_s2], ['即办件', c2_s3], ['其他', c2_s4]];
   var plot1 = jQuery.jqplot ('chart2', [data], 
    { 
  	  title: '项目分布信息统计饼状图',
      seriesDefaults: {
        renderer: jQuery.jqplot.PieRenderer, 
        rendererOptions: {
          showDataLabels: true
        }
      }, 
      legend: { show:true, location: 'e' }
    }
  );
});
</script>
 <script type="text/javascript" language="javascript">  
//审批事项分类统计-柱状图
  var c4_ticks=[];//区县名称,即横坐标
  var c4_s1=[];//即办件受理数
  var c4_s2=[];//承诺件受理数
  var c4_s3=[];//受理总数
  var c4_s4=[];//即办件办结数
  var c4_s5=[];//承诺件办结数
  var c4_s6=[];//办结总数
  
  function onLoad(){
   			//获取后台的JSON
		    $.getJSON("${path}/rsp/firstTabAction!applyBarRenderer.action", function(data){//从后台获取json			 	
		        var rowsLength=data.rows.length;//获取json的长度
		        for(i=0;i<rowsLength;i++){//遍历循环
		        	c4_ticks.push(data.rows[i].区县名称);//添加到数组,rows为json的Key名称,"区县"为字段名
			        c4_s1.push(data.rows[i].即办件受理数);//添加到数组,rows为json的Key名称,"即办件受理数"为字段名
			        c4_s2.push(data.rows[i].承诺件受理数);//添加到数组,rows为json的Key名称,"承诺件受理数"为字段名
			        c4_s3.push(data.rows[i].受理总数);//添加到数组,rows为json的Key名称,"受理总数"为字段名
			        c4_s4.push(data.rows[i].即办件办结数);//添加到数组,rows为json的Key名称,"即办件办结数"为字段名
			        c4_s5.push(data.rows[i].承诺件办结数);//添加到数组,rows为json的Key名称,"承诺件办结数"为字段名
			        c4_s6.push(data.rows[i].办结总数);//添加到数组,rows为json的Key名称,"办结数总数"为字段名
		        }
		   });	   
		  }
onLoad();//加载数据
 	
//显示jqplot图表
$(document).ready(function(){
		//测试数据
        //var c4_s1 = [2, 6, 7, 10,2, 6, 7, 10,2, 6, 7, 10];
        //var c4_s2 = [7, 5, 3, 2,7, 5, 3, 2,7, 5, 3, 2];
        //var c4_s3 = [2, 6, 7, 10,2, 6, 7, 10,2, 6, 7, 10];
        //var c4_s4 = [7, 5, 3, 2,7, 5, 3, 2,7, 5, 3, 2];
        //var c4_s5 = [2, 6, 7, 10,2, 6, 7, 10,2, 6, 7, 10];
        //var c4_s6 = [2, 6, 7, 10,2, 6, 7, 10,2, 6, 7, 10];
        //var ticks = ['苍南县', '洞头县', '乐清市', '鹿城区','平阳县','瑞安市','泰顺县','温州市','文成县','永嘉县','瓯海区','龙湾区'];
        
         plot2 = $.jqplot('chart4', [c4_s1, c4_s2, c4_s3, c4_s4, c4_s5, c4_s6], {
         	title: '项目分布信息统计柱状图',
         	legend: {show: true, location: 'ne'}, //提示工具栏--show：是否显示,location: 显示位置 (e:东,w:西,s:南,n:北,nw:西北,ne:东北,sw:西南,se:东南)   
         	series: [{label: '即办件受理数'}, {label: '承诺件受理数'},{label: '受理总数'}, {label: '即办件办结数'},{label: '承诺件办结数 '},{label: '办结总数'}], //提示工具栏   
            seriesDefaults: {
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            legend: {
            show: true,
            placement: 'outsideGrid'//提示工具显示在表格之外
       		 },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: c4_ticks
                    
                }
            }
        });    
        
    });   
  
    
</script>
	</head>
	<body>
	 <div style="margin:-1.7%px,-1.7%px,-1.7%px,-1.7%px;">
		<div class="easyui-tabs" style="width: 100% px; height:auto">
			<div title="项目分布信息统计" style="padding: 5px">
				<iframe id="chartIframe1" name="chartIframe1"
					src="../rsp/core/view/cfg/view.action?fn=grid&viewId=55AEECED8D17F1BF079440A3D09BA7A5"
					width="100%" height="370" frameborder="0" marginwidth="0"
					marginheight="0" scrolling="no">
				</iframe>
				<div class="easyui-tabs" style="width: 100% px; height: 350px;">
					<div title="柱状图" style="padding: 5px">
						<div id="chart1" style="margin-top: 10px; margin-left: 10px; width: 90% px; height: 300px;"></div>
					</div>
					<div title="饼状图" style="padding: 5px">
						<div id="chart2" style="margin-top: 10px; margin-left: 10px; width: 90% px; height: 300px;"></div>
					</div>
				</div>

			</div>
			<div title="审批事项分类统计" style="padding: 5px">
				<iframe id="chartIframe2" name="chartIframe2"
					src="../rsp/core/view/cfg/view.action?fn=grid&viewId=ECC28DCF8D2DA12AB72A7F08AD769288"
					width="100%" height="370" frameborder="0" marginwidth="0"
					marginheight="0" scrolling="no">
				</iframe>
				<div class="easyui-tabs" style="width: 100% px; height: 350px;">
					<div title="柱状图" style="padding: 5px">
					<div id="chart4" style="margin-top: 10px; margin-left: 10px; width: 90% px; height: 280px;"></div>
					
					</div>
				</div>
				
			</div>
		</div>
	</div>
	</body>
	
</html>

