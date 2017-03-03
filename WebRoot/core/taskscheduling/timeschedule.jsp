<%@page contentType="text/html;charset=UTF-8"%>
<%
	String rule = request.getParameter("rule");
	request.setAttribute("path", request.getContextPath());
%>
<html>
<head>
<style type="text/css">
<!--
.midLine {
	border-right: #BEBCBC 1px solid;
}
-->
</style>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="stylesheet" href="${path}/core/themes/default/css/form.css">	
	<link type="text/css" rel="stylesheet" href="${path}/core/js/validation/style.css" />
	<script type="text/javascript" src="${path}/core/js/jquery.js"></script>
	<script type="text/javascript" src="${path}/core/js/jquery.form.js"></script>
	<script type="text/javascript" src="${path}/core/js/validation/validation-min.js"></script>
	<script type="text/javascript" src="${path}/core/js/datepicker/WdatePicker.js"></script>
	<style type="text/css">
		td{
			font-size: 15px;
		}
		select{
			width: 150px;
		}
	</style>
	<SCRIPT language=Jscript>
		/**
		* 说明：按每天设置所显示的规则
		* 参数：flag 是否返回数据到父窗口，用于区别是否为当前页面显示规则（true：返回父页面； false：显示在当前页面）
		**/
		function everyday(flag){
			var everydaytime = document.getElementById("everydaytime").value;
			if(everydaytime==""){
				top.$.messager.alert('消息', "请选择执行时间！", 'info');
				$('#everydaytime').css('border-color', 'red');
				return;
			}
			var times = everydaytime.split(":");
			var hour = times[0];
			var minute = times[1];
			var second = times[2];
		    var ruleExpression=second+" "+minute+" "+hour+" " +"* * ?";
		    var rule = "每天 ["+everydaytime+"] 开始执行 "
		    var result={
		      ruleExpression:ruleExpression,
		      rule:rule
		    };
		    if(flag){
			    top.lwin.parent().find('#ruledirections').val(result.rule);
			    top.lwin.parent().find('#rulecontent').val(result.ruleExpression);
			    top.lwin.close();		
		    }	    
		    return result;
		}
		
		/**
		* 说明：重复时间间隔所显示的规则
		* 参数：flag 是否返回数据到父窗口，用于区别是否为当前页面显示规则（true：返回父页面； false：显示在当前页面）
		**/
		function interval(flag){
		 	var intervaltime = document.getElementById("intervaltime").value;
		 	if(isNaN(intervaltime)){
		 		top.$.messager.alert('消息', '请输入一个整数', 'info');
		 		return false;
		 	}
		 	if(intervaltime<0){
		 		top.$.messager.alert('消息', '请输入大于0的整数！', 'info');
		 		return false;
		 	}
		    if(intervaltime==""){
				top.$.messager.alert('消息', "请设置间隔执行的时间！", 'info');
				return;
			}
			var type = document.getElementById("intervalType").value;
			var ruleExpression="";
		    var rule = "";
		 	   if("1"==type){
		    	ruleExpression="0/"+intervaltime+" * * * * ?";
			 	rule ="每隔["+intervaltime+"]秒执行一次";
		    }
		     if("2"==type){
		    	 ruleExpression="0 0/"+intervaltime+" * * * ?";
			     rule ="每隔["+intervaltime+"]分钟执行一次";
		    }
		     if("3"==type){
		     	 ruleExpression = "0 0 0/" + intervaltime + " * * ?";
			     rule ="每隔["+intervaltime+"]小时执行一次";
		    }
		     if("4"==type){
		    	 ruleExpression="0 0 0 1/"+intervaltime+" * ?";
			     rule ="每隔["+intervaltime+"]天执行一次";
		    }
		     if("5"==type){
		    	 ruleExpression="0 0 0 0 1/"+intervaltime+" ? ";
			     rule ="每隔["+intervaltime+"]月执行一次";
		    }
		   var result={
		      ruleExpression:ruleExpression,
		      rule:rule
		    };
		    if(flag){
			    top.lwin.parent().find('#ruledirections').val(result.rule);
			    top.lwin.parent().find('#rulecontent').val(result.ruleExpression);
			    top.lwin.close();	
		    }
		   return result;
		}
		function closeWindow(){
			if(window.confirm("你修改内容还未保存，确认关闭本窗口")){
				window.close();
			}
		}
  	</SCRIPT>
</head>
<body>			
<div id="form_toolbar">
	<button class="form_btn" id="btnRule"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 显示规则 </button>
	<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 确定 </button>
	<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
</div>
<fieldset style="width:100%; margin:auto;">
	<legend style="margin-top:10px;margin-bottom:10px;"><b style="font-size:15px;">定期模式</b></legend>
	<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0"  bgcolor="#FFFFFF" class="form_table">
		<tr>
			<td width="20%" valign="top" class="midLine" bgcolor="#FFFFFF">
				<table width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td height="24">
							&nbsp;<input name="radio" type="radio" value="day" checked/><span class="spanClass" style="cursor: hand; font-size: 15px;">按天(D)</span>
						</td>
					</tr>
					<tr>
						<td height="24">
							&nbsp;<input type="radio" name="radio" value="week" /><span class="spanClass" style="cursor: hand; font-size: 15px;">按周(W)</span>
						</td>
					</tr>
					<tr>
						<td height="24">
							&nbsp;<input type="radio" name="radio" value="month" /><span class="spanClass" style="cursor: hand; font-size: 15px;">按月(M)</span>
						</td>
					</tr>
					<tr>
						<td height="24">
							&nbsp;<input type="radio" name="radio" value="year" /><span class="spanClass" style="cursor: hand; font-size: 15px;">按年(Y)</span>
						</td>
					</tr>
				</table>
			</td>
			<td width="80%" valign="top">
				<!-- 按天 begin -->
				<table width="100%" border="0" cellpadding="0" cellspacing="0" id="day">
					<tr>
						<td bgcolor="#FFFFFF">
							<input checked type="radio" id="everyday" name="flag">
							每天&nbsp;
							<input type="text" id=everydaytime name=everydaytime class="Wdate" value="${timerClear.cleartimer}" onclick="WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss',isShowOthers:true})"/>
							&nbsp;开始执行
						</td>
					</tr>
					<tr>
						<td bgcolor="#FFFFFF">
							<input type="radio" id="interval" name="flag">
							重复任务间隔时间&nbsp;
							<input type="text" id="intervaltime" isRead="false" name="intervaltime" title="请输入一个大于0的数" value="">
							<select id="intervalType" name="intervalType">
								<option value="1">秒</option>
								<option value="2">分钟</option>
								<option value="3">小时</option>
								<option value="4">天</option>
								<option value="5">月</option>
							</select>
						</td>
					</tr>
				</table>
				<!-- 按天 end -->
				<!-- 按周 begin -->
				<table width="100%" border="0" cellpadding="0" cellspacing="0" id="week" style="display: none;">
					<tr>
						<td>
							执行时间&nbsp;
							<input title="执行时间" type="text" id=weektime name=weektime class="Wdate" value="${timerClear.cleartimer}" onclick="WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss',isShowOthers:true})"/>
						</td>
					</tr>
					<tr>
						<td>
							<input checked type="radio" name="weekRadio" id="oneWeek">
							每周&nbsp;
							<select id="beginWeek" name="beginWeek">
								<option value=""></option>
							</select>
							&nbsp;至&nbsp;
							<select id="endWeek" name="endWeek">
								<option value=""></option>
							</select>
						</td>
					</tr>
					<tr>
						<td>
							<input type="radio" name="weekRadio" id="twoWeek">
							每月最后一个&nbsp;
							<select id="lastWeek" name="lastWeek">
								<option value=""></option>
							</select>
						</td>
					</tr>
					<tr>
						<td>
							<input type="radio" name="weekRadio" id="threeWeek">
							每月第&nbsp;
							<select id="countWeek" name="countWeek">
								<option value=""></option>
								<option value="1">一</option>
								<option value="2">二</option>
								<option value="3">三</option>
								<option value="4">四</option>
								<option value="5">五</option>
							</select>
							周&nbsp;
							<select id="selWeek" name="selWeek">
								<option value=""></option>
							</select>
						</td>
					</tr>
				</table>
				<!-- 按周 end -->
				<!-- 按月 begin -->
				<table width="100%" border="0" cellpadding="0" cellspacing="0" id="month" style="display: none;">
					<tr>
						<td>
							执行时间&nbsp;
							<input type="text" id=monthtime name=monthtime class="Wdate" value="${timerClear.cleartimer}" onclick="WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss',isShowOthers:true})"/>
						</td>
					</tr>
					<tr>
						<td>
							<input checked type="radio" name="monthRadio" id="oneMonth">
							月份&nbsp;
							<select id="beginMonth" name="beginMonth">
								<option value=""></option>
							</select>
							&nbsp;至&nbsp;
							<select id="endMonth" name="endMonth">
								<option value=""></option>
							</select>
						</td>
					</tr>
					<tr>
						<td>
							<input type="radio" name="monthRadio" id="twoMonth">
							每月的最后一天
						</td>
					</tr>
					<tr>
						<td>
							<input type="radio" name="monthRadio" id="threeMonth">
							每月的最后一个工作日
						</td>
					</tr>
				</table>
				<!-- 按月 end -->
				<!-- 按年 begin -->
				<table width="100%" border="0" cellpadding="0" cellspacing="0" id="year" style="display: none;">
					<tr>
						<td>
							执行时间&nbsp;
							<input type="text" id=yeartime name=yeartime class="Wdate" value="${timerClear.cleartimer}" onclick="WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss',isShowOthers:true})"/>
						</td>
					</tr>
					<tr>
						<td>
							<input checked type="radio" name="yearRadio" id="oneYear">
							年份&nbsp;
							<select id="beginYear" name="beginYear">
								<option value=""></option>
							</select>
							&nbsp;至&nbsp;
							<select id="endYear" name="endYear">
								<option value=""></option>
							</select>
						</td>
					</tr>
				</table>
				<!-- 按年 end -->
			</td>
		</tr>
	</table>
	<br>
	<div id="displayRule" style="font-size: 15px; background-color: white;"></div>
</fieldset>	
</body>
</html>
<script language='javascript'>
	var rule = "<%=rule%>";
	if(rule!=""){
		if(rule.indexOf("每天")>-1){
			document.getElementById("everyday").checked=true;
			var time = rule.substring(rule.indexOf('[')+1,rule.indexOf("]"));
			document.getElementById("everydaytime").value=time;
		}
		if(rule.indexOf("每隔")>-1){
			document.getElementById("interval").checked=true;
			var time = rule.substring(rule.indexOf('[')+1,rule.indexOf("]"));
			document.getElementById("intervaltime").value=time;
			if(rule.indexOf("秒")>-1){
				document.getElementById("intervalType").value=1;
			}
			if(rule.indexOf("分钟")>-1){
				document.getElementById("intervalType").value=2;
			}
			if(rule.indexOf("小时")>-1){
				document.getElementById("intervalType").value=3;
			}
			if(rule.indexOf("天")>-1){
				document.getElementById("intervalType").value=4;
			}
			if(rule.indexOf("月")>-1){
				document.getElementById("intervalType").value=5;
			}
		}
	}

	//绑定事件
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
		$("#btnRule").bind("click", doDisplayRule);
		$('.spanClass').bind('click', doSelRadio);
		$(':radio[name=radio]').bind('click', doSelRadio);
		doInitWeekSelect();
		doInitMonthSelect();
		doInitYearSelect();
	});
	
	/**
	* 说明：显示规则说明
	* 参数：是否为保存方法调用
	**/
	function doDisplayRule(flag){
		var info;
		if(flag != true){
			flag = false;
		}
		//按天
		if("day" == $(":input[name = radio]:checked").val()){
			if("everyday" == $(":input[name = flag]:checked").attr("id")){
				info = everyday(flag);
			}else if("interval" == $(":input[name = flag]:checked").attr("id")){
				info = interval(flag); 
			}
		} 
		//按周
		else if("week" == $(":input[name = radio]:checked").val()){
			if("oneWeek" == $(":radio[name = weekRadio]:checked").attr("id")){
				info = betweenWeek(flag);
			} else if("twoWeek" == $(":radio[name = weekRadio]:checked").attr("id")){
				info = lastWeek(flag)
			} else if("threeWeek" == $(":radio[name = weekRadio]:checked").attr("id")){
				info = firstFewWeek(flag);
			}
		} 
		//按月
		else if("month" == $(":input[name = radio]:checked").val()){
			if("oneMonth" == $(":radio[name = monthRadio]:checked").attr("id")){
				info = betweenMonth(flag);
			} else if("twoMonth" == $(":radio[name = monthRadio]:checked").attr("id")){
				info = lastDayMonth(flag);
			} else if("threeMonth" == $(":radio[name = monthRadio]:checked").attr("id")){
				info = lastWorkMonth(flag);
			}
		} 
		//按年
		else if("year" == $(":input[name = radio]:checked").val()){
			if("oneYear" == $(":radio[name = yearRadio]:checked").attr("id")){
				info = betweenYear(flag);
			}
		}
		if(!flag){
			$('#displayRule').text(info.rule);
		}
	}
	
	/**
	* 说明：初始化年下拉框
	**/
	function doInitYearSelect(){
		var d = new Date();
		for(var i = 0; i < 10; i++){
			$('#beginYear').append("<option value=\"" + (d.getFullYear() + i) + "\">" + (d.getFullYear() + i) + "</option>");
			$('#endYear').append("<option value=\"" + (d.getFullYear() + i) + "\">" + (d.getFullYear() + i) + "</option>");
		}
	}
	
	/**
	* 说明：初始化月下拉框
	**/
	function doInitMonthSelect(){
		var monthArray = new Array('一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月');
		for(var i = 0; i < monthArray.length; i++){
			$('#beginMonth').append("<option value=\"" + (i + 1) + "\">" + monthArray[i] + "</option>");
			$('#endMonth').append("<option value=\"" + (i + 1) + "\">" + monthArray[i] + "</option>");
		}
	}
	
	/**
	* 说明：初始化周下拉框
	**/
	function doInitWeekSelect(){
		var weekArray = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
		for(var i = 0; i < weekArray.length; i++){
			$('#beginWeek').append("<option value=\"" + (i + 1) + "\">" + weekArray[i] + "</option>");
			$('#endWeek').append("<option value=\"" + (i + 1) + "\">" + weekArray[i] + "</option>");
			$('#lastWeek').append("<option value=\"" + (i + 1) + "\">" + weekArray[i] + "</option>");
			$('#selWeek').append("<option value=\"" + (i + 1) + "\">" + weekArray[i] + "</option>");
		}
	}
	
	/**
	* 说明：点击span标签区域时，选中radio按钮，并且显示相应的操作界面
	**/
	function doSelRadio(){
		$(this).prev().attr('checked', 'checked');
		if($(this).prev().val() == 'day' || $(this).val() == 'day'){
			$('#day').show();
			$('#week').hide();
			$('#month').hide();
			$('#year').hide();
		} else if($(this).prev().val() == 'week' || $(this).val() == 'week'){
			$('#day').hide();
			$('#week').show();
			$('#month').hide();
			$('#year').hide();
		} else if($(this).prev().val() == 'month' || $(this).val() == 'month'){
			$('#day').hide();
			$('#week').hide();
			$('#month').show();
			$('#year').hide();
		} else if($(this).prev().val() == 'year' || $(this).val() == 'year'){
			$('#day').hide();
			$('#week').hide();
			$('#month').hide();
			$('#year').show();
		}
	}
	
	//保存表单信息
	function doSave(){
		doDisplayRule(true);
		/*//按天
		if("day" == $(":input[name = radio]:checked").val()){
			if("everyday" == $(":input[name = flag]:checked").attr("id")){
				everyday(true);
			}else if("interval" == $(":input[name = flag]:checked").attr("id")){
				interval(true); 
			}
		} 
		//按周
		else if("week" == $(":input[name = radio]:checked").val()){
			if("oneWeek" == $(":radio[name = weekRadio]:checked").attr("id")){
				alert('按周1');
			} else if("twoWeek" == $(":radio[name = weekRadio]:checked").attr("id")){
				alert('按周2');
			} else if("threeWeek" == $(":radio[name = weekRadio]:checked").attr("id")){
				alert('按周3');
			}
		} 
		//按月
		else if("month" == $(":input[name = radio]:checked").val()){
			if("oneMonth" == $(":radio[name = monthRadio]:checked").attr("id")){
				alert('按月1');
			} else if("twoMonth" == $(":radio[name = monthRadio]:checked").attr("id")){
				alert('按月2');
			} else if("threeMonth" == $(":radio[name = monthRadio]:checked").attr("id")){
				alert('按月3');
			}
		} 
		//按年
		else if("year" == $(":input[name = radio]:checked").val()){
			if("oneYear" == $(":radio[name = yearRadio]:checked").attr("id")){
				alert('按年1');
			}
		}*/
	}
	
	//关闭窗口
	function doClose(){
		top.lwin.close(true);
	}
	/**
	* 说明：按周的区间所显示的规则
	* 参数：flag 是否返回数据到父窗口，用于区别是否为当前页面显示规则（true：返回父页面； false：显示在当前页面）
	**/
	function betweenWeek(flag){
		var weektime = $('#weektime').val();
		if(weektime == ""){
			top.$.messager.alert('消息', "请选择执行时间！", 'info');
			$('#weektime').css('border-color', 'red');
			return;
		} else {
			var beginWeek = $('#beginWeek').val();
			var endWeek = $('#endWeek').val();
			if(beginWeek == ""){
				top.$.messager.alert('消息', "请选择开始星期！", 'info');
				$('#beginWeek').css('background-color', '#E0EFEF');
				return;
			} else if(endWeek == ""){
				top.$.messager.alert('消息', "请选择结束星期！", 'info');
				$('#endWeek').css('background-color', '#E0EFEF');
				return;
			} else if(beginWeek > endWeek){
				top.$.messager.alert('消息', "开始星期不能够大于结束星期！", 'info');
				$('#beginWeek').css('background-color', '#E0EFEF');
				$('#endWeek').css('background-color', '#E0EFEF');
				return;
			} else {
				var ruleExpression = "";
				var rule = "";
				var times = weektime.split(":");
				var hour = times[0];
				var minute = times[1];
				var second = times[2];
				if(beginWeek == endWeek){
					ruleExpression = second+" "+minute+" "+hour+" " +"? * " + beginWeek;
		    		rule = "每周[" + $('#beginWeek option:selected').text() + " "+weektime+"] 开始执行 ";
				} else {
					ruleExpression = second+" "+minute+" "+hour+" " +"? * " + beginWeek + "-" + endWeek;
		    		rule = "每周[" + $('#beginWeek option:selected').text() + "至" + $('#endWeek option:selected').text() + " "+weektime+"] 开始执行 ";
				}
				var result={
			      ruleExpression:ruleExpression,
			      rule:rule
			    };
			    if(flag){
				    top.lwin.parent().find('#ruledirections').val(result.rule);
				    top.lwin.parent().find('#rulecontent').val(result.ruleExpression);
				    top.lwin.close();	
			    }
			   return result;
			}
		}
	}
	/**
	* 说明：按每月总的最后一个星期几
	* 参数：flag 是否返回数据到父窗口，用于区别是否为当前页面显示规则（true：返回父页面； false：显示在当前页面）
	**/
	function lastWeek(flag){
		var weektime = $('#weektime').val();
		if(weektime == ""){
			top.$.messager.alert('消息', "请选择执行时间！", 'info');
			$('#weektime').css('border-color', 'red');
			return;
		} else {
			var lastWeek = $('#lastWeek').val();
			if(lastWeek == ""){
				top.$.messager.alert('消息', "请选择星期！", 'info');
				$('#lastWeek').css('background-color', '#E0EFEF');
				return;
			} else {
				var ruleExpression = "";
				var rule = "";
				var times = weektime.split(":");
				var hour = times[0];
				var minute = times[1];
				var second = times[2];
				ruleExpression = second+" "+minute+" "+hour+" " +"? * " + lastWeek + "L";
	    		rule = "每月最后一个[" + $('#lastWeek option:selected').text() + " "+weektime+"] 开始执行 ";
				var result={
			      ruleExpression:ruleExpression,
			      rule:rule
			    };
			    if(flag){
				    top.lwin.parent().find('#ruledirections').val(result.rule);
				    top.lwin.parent().find('#rulecontent').val(result.ruleExpression);
				    top.lwin.close();	
			    }
			   return result;
			}
		}
	}
	/**
	* 说明：按每月第几个星期几执行
	* 参数：flag 是否返回数据到父窗口，用于区别是否为当前页面显示规则（true：返回父页面； false：显示在当前页面）
	**/
	function firstFewWeek(flag){
		var weektime = $('#weektime').val();
		if(weektime == ""){
			top.$.messager.alert('消息', "请选择执行时间！", 'info');
			$('#weektime').css('border-color', 'red');
			return;
		} else {
			var countWeek = $('#countWeek').val();
			var selWeek = $('#selWeek').val();
			if(countWeek == ""){
				top.$.messager.alert('消息', "请选择第几个星期！", 'info');
				$('#countWeek').css('background-color', '#E0EFEF');
				return;
			} else if(selWeek == ""){
				top.$.messager.alert('消息', "请选择星期！", 'info');
				$('#selWeek').css('background-color', '#E0EFEF');
				return;
			} else {
				var ruleExpression = "";
				var rule = "";
				var times = weektime.split(":");
				var hour = times[0];
				var minute = times[1];
				var second = times[2];
				ruleExpression = second+" "+minute+" "+hour+" " +"? * " + countWeek + "#" + selWeek;
	    		rule = "每月[第" + $('#countWeek option:selected').text() + "周 "+ $('#selWeek option:selected').text() +" " + weektime +"] 开始执行 ";
				var result={
			      ruleExpression:ruleExpression,
			      rule:rule
			    };
			    if(flag){
				    top.lwin.parent().find('#ruledirections').val(result.rule);
				    top.lwin.parent().find('#rulecontent').val(result.ruleExpression);
				    top.lwin.close();	
			    }
			   return result;
			}
		}
	}
	/**
	* 说明：按月的区间所显示的规则
	* 参数：flag 是否返回数据到父窗口，用于区别是否为当前页面显示规则（true：返回父页面； false：显示在当前页面）
	**/
	function betweenMonth(flag){
		var monthtime = $('#monthtime').val();
		if(monthtime == ""){
			top.$.messager.alert('消息', "请选择执行时间！", 'info');
			$('#monthtime').css('border-color', 'red');
			return;
		} else {
			var beginMonth = $('#beginMonth').val();
			var endMonth = $('#endMonth').val();
			if(beginMonth == ""){
				top.$.messager.alert('消息', "请选择开始月份！", 'info');
				$('#beginMonth').css('background-color', '#E0EFEF');
				return;
			} else if(endMonth == ""){
				top.$.messager.alert('消息', "请选择结束月份！", 'info');
				$('#endMonth').css('background-color', '#E0EFEF');
				return;
			} else if(beginMonth > endMonth){
				top.$.messager.alert('消息', "开始月份不能够大于结束月份！", 'info');
				$('#beginMonth').css('background-color', '#E0EFEF');
				$('#endMonth').css('background-color', '#E0EFEF');
				return;
			} else {
				var ruleExpression = "";
				var rule = "";
				var times = monthtime.split(":");
				var hour = times[0];
				var minute = times[1];
				var second = times[2];
				if(beginMonth == endMonth){
					ruleExpression = second+" "+minute+" "+hour+" " +"* " + beginMonth + " ?";
		    		rule = "每[" + $('#beginMonth option:selected').text() + " "+monthtime+"] 开始执行 ";
				} else {
					ruleExpression = second+" "+minute+" "+hour+" " +"* " + beginMonth + "-" + endMonth + " ?";
		    		rule = "每[" + $('#beginMonth option:selected').text() + "至" + $('#endMonth option:selected').text() + " "+monthtime+"] 开始执行 ";
				}
				var result={
			      ruleExpression:ruleExpression,
			      rule:rule
			    };
			    if(flag){
				    top.lwin.parent().find('#ruledirections').val(result.rule);
				    top.lwin.parent().find('#rulecontent').val(result.ruleExpression);
				    top.lwin.close();	
			    }
			   return result;
			}
		}
	}
	/**
	* 说明：每月的最后一天执行
	* 参数：flag 是否返回数据到父窗口，用于区别是否为当前页面显示规则（true：返回父页面； false：显示在当前页面）
	**/
	function lastDayMonth(flag){
		var monthtime = $('#monthtime').val();
		if(monthtime == ""){
			top.$.messager.alert('消息', "请选择执行时间！", 'info');
			$('#monthtime').css('border-color', 'red');
			return;
		} else {
			var ruleExpression = "";
			var rule = "";
			var times = monthtime.split(":");
			var hour = times[0];
			var minute = times[1];
			var second = times[2];
			ruleExpression = second+" "+minute+" "+hour+" " +"L * ?";
    		rule = "每月的最后一天 ["+monthtime+"] 开始执行 ";
			var result={
		      ruleExpression:ruleExpression,
		      rule:rule
		    };
		    if(flag){
			    top.lwin.parent().find('#ruledirections').val(result.rule);
			    top.lwin.parent().find('#rulecontent').val(result.ruleExpression);
			    top.lwin.close();	
		    }
		   return result;
		}
	}
	/**
	* 说明：每月的最后一个工作日执行
	* 参数：flag 是否返回数据到父窗口，用于区别是否为当前页面显示规则（true：返回父页面； false：显示在当前页面）
	**/
	function lastWorkMonth(flag){
		var monthtime = $('#monthtime').val();
		if(monthtime == ""){
			top.$.messager.alert('消息', "请选择执行时间！", 'info');
			$('#monthtime').css('border-color', 'red');
			return;
		} else {
			var ruleExpression = "";
			var rule = "";
			var times = monthtime.split(":");
			var hour = times[0];
			var minute = times[1];
			var second = times[2];
			ruleExpression = second+" "+minute+" "+hour+" " +"LW * ?";
    		rule = "每月的最后一个工作日 ["+monthtime+"] 开始执行 ";
			var result={
		      ruleExpression:ruleExpression,
		      rule:rule
		    };
		    if(flag){
			    top.lwin.parent().find('#ruledirections').val(result.rule);
			    top.lwin.parent().find('#rulecontent').val(result.ruleExpression);
			    top.lwin.close();	
		    }
		   return result;
		}
	}
	/**
	* 说明：按年的区间所显示的规则
	* 参数：flag 是否返回数据到父窗口，用于区别是否为当前页面显示规则（true：返回父页面； false：显示在当前页面）
	**/
	function betweenYear(flag){
		var yeartime = $('#yeartime').val();
		if(yeartime == ""){
			top.$.messager.alert('消息', "请选择执行时间！", 'info');
			$('#yeartime').css('border-color', 'red');
			return;
		} else {
			var beginYear = $('#beginYear').val();
			var endYear = $('#endYear').val();
			if(beginYear == ""){
				top.$.messager.alert('消息', "请选择开始年份！", 'info');
				$('#beginYear').css('background-color', '#E0EFEF');
				return;
			} else if(endYear == ""){
				top.$.messager.alert('消息', "请选择结束年份！", 'info');
				$('#endYear').css('background-color', '#E0EFEF');
				return;
			} else if(beginYear > endYear){
				top.$.messager.alert('消息', "开始年份不能够大于结束年份！", 'info');
				$('#beginYear').css('background-color', '#E0EFEF');
				$('#endYear').css('background-color', '#E0EFEF');
				return;
			} else {
				var ruleExpression = "";
				var rule = "";
				var times = yeartime.split(":");
				var hour = times[0];
				var minute = times[1];
				var second = times[2];
				if(beginYear == endYear){
					ruleExpression = second+" "+minute+" "+hour+" " +"* * ? " + beginYear;
		    		rule = "每[" + beginYear + "年 "+yeartime+"] 开始执行 ";
				} else {
					ruleExpression = second+" "+minute+" "+hour+" " +"* * ? " + beginYear + "-" + endYear;
		    		rule = "每[" + beginYear + "年至" + endYear + "年 "+yeartime+"] 开始执行 ";
				}
				var result={
			      ruleExpression:ruleExpression,
			      rule:rule
			    };
			    if(flag){
				    top.lwin.parent().find('#ruledirections').val(result.rule);
				    top.lwin.parent().find('#rulecontent').val(result.ruleExpression);
				    top.lwin.close();	
			    }
			   return result;
			}
		}
	}
</script>