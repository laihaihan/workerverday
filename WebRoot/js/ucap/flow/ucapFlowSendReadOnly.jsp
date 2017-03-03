<%@page contentType="text/html;charset=utf-8"%>
<html>
	<head>
		<style type="text/css">body,td,input,select,textarea {font:12px; font:"宋体"}</style>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>流程发送选择框</title>
	</head>
<body>
	<div style="background-image:url(../../js/ucap/flow/images/flow_top_bg.jpg);">
		<table width="95%" border="0" style="margin:0px 5px 0px 5px;">
			<tr>
				<td width="44%"><input name="endType" style="display:none" />下一步骤：<select name="nextNode"  ></select></td>
				<td width="44%">下一步骤审批方式：<select name="NextApproveType" ></select></td><td width="51%" id="selRang" > </td>
			</tr>
	    </table>
    </div>
   <span id="displayEndFlowInfo" style="display:none">
   	 
   </span>
    <div id="endFlow" style="background-color:#E2EAF3;margin:0px 5px 0px 5px">
    <table width="95%" border="0">
		<tr>
			
		</tr>
		<tr>
			<td width="80%">人员
				<span id="CommonSelRange"> <select name="SingleSelRange"
						size="13" style="width:100% "
						 ></select> </span>
				 
			</td>
			<td>
				<span id="SingleSelect"><br>
					<table width="100%" border="0" >
						<tr>
							<td width="17%">
								<span id="MultiSelect" style="visibility:hidden;display:none">
									 
								</span>
								<span id="deptMultiSelect"
									style="visibility:hidden;display:none">
								 </span>
							</td>
						 
						</tr>
					</table> </span>
				<span id="MainSelect" style="visibility:hidden;display:none"><br>
			 
			</td>
			 
		</tr>
	 
	</table>
	</d>
 
	<span id="ucapOpinion" style="display:none">
	<table width="95%" border="0">
		<%--意见填写框--%>
		<tr >
			<td colspan="4">
				<table width="100%"  border="0">
					  <tr>
					    <td colspan="3">待选意见类型：
						<input name="OpinionType0" type="radio" value="0" onClick="opType(0)"><label for="OpinionType_1" onClick="opType(0)" >我的意见</label>
						<input name="OpinionType1" type="radio" value="0" onClick="opType(1)"><label for="OpinionType_2" onClick="opType(1)">常用意见</label>
						<input name="OpinionType2" type="radio" value="0" onClick="opType(2)"><label for="OpinionType_3" onClick="opType(2)">组合意见</label>
						</td>
					  </tr>
					  <tr>
					    <td width="44%"><a href="#" id="deleOpinion" onClick="deleUserOpn();">删除我的常用意见 </a>
					    <select name="OpinionList" size="6" style="width:100% " ondblclick="$('add').click();;"></select></td>
					    <td width="51%" colspan="3">					   		
								<table width="100%"  border="0">
								  <tr>
									<td width="10%">
									  <input name="btnReturn" type="button" value="<--" onclick="returnOpn();">
									    <input name="add" type="button" value="-->" onClick="addClick();">
									    <input type="button" value="<┘" onclick="$('Opinion').value=$F('Opinion').substring(0,$F('Opinion').length-1);">
										<input type="button" value=" 。" onclick="$('Opinion').value=$F('Opinion')+'。';">
										<input  type="button" value=" ，" onclick="$('Opinion').value=$F('Opinion')+'，';">
									</td>
									<td width="90%"><a href="#" onClick="addUserOpn();"> 加为我的常用意见 </a> <textarea name="Opinion"  rows=6 style="width:100%;font-size:9pt;" title="意见内容" id="opinionTextarea" type="_moz"></textarea></td>
								  </tr>
						  </table>
						</td>
					  </tr>
					  <tr id="proxytr" style="display:none">
					  	<td colspan="4">代理时间：<input type="text" name="proxyTime" value="" size="40"></td>
					  </tr>
				</table>
			</td>
		</tr>
	</table>
 </div>
 <script type="text/javascript">
 	_sendLoad();
 	function _sendLoad(){
		try{
			loadfile("js/ucap/flow/ucapCommonOptions.js","js");
			loadfile("js/ucap/flow/ucapSendFlow.js","js");
	    	loadfile("js/ucap/flow/ucapOpinion.js","js");
		}catch(e){
			//alert('正在加载资源文件,请等候...',10000);
			setTimeout ('_sendLoad();',1000); 
			return;
		}	 
		
		try{
			setOptions("SingleSelRange", "",ucapFlowSys.sendFlowDialogRead.values);
			setOptions("nextNode", "",ucapFlowSys.sendFlowDialogRead.nextNode);
			setOptions("NextApproveType", "",ucapFlowSys.sendFlowDialogRead.nextApproveType);
		   }
		catch(e){
			if (typeof _ucapSendDialogOnload !="function") 
					setTimeout ('_sendLoad();',1000);
			return;}
			if (ucapFlowFun.flowValue.opinionNo!=""){
		    $("ucapOpinion").style.display="";
		    _ucapOpinionLoad();
	    }
	}
 		
  </script>
</body>
</html>
