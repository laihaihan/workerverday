<%@page contentType="text/html;charset=utf-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<body>
	<div style="background-image:url(../../js/ucap/flow/images/flow_top_bg.jpg)  no-repeat;">
		<table border="0" width="95%" style="margin:0px 5px 0px 5px;">
			<tr>
				<td width="40%">请选择退回的步骤：				
					<select name="SingleSelRange"
							size="12" style="width:100% " onchange="changeUnidItem();"
							ondblclick="changeUnidItem();"></select>
				</td>
				<td width="5%">
				</td>
				<td width="40%">此步骤的办理人员：
					<select name="SingleSelResult" size="12" style="width:100% "></select>
				</td>		
			</tr>
		</table>
	</div>
	<div>
		<table border="0" width="95%" style="margin:0px 5px 0px 5px;">
			<%--意见填写框--%>
		<tr id="ucapOpinion" style="display:none">
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
		</tr><%--
			<tr>
				<td align="center" colspan="2">
					<input name="button2" type="button" onClick="returnSendOk();" value="确定">
				</td>
				<td align="center">
					<input name="button" type="button" onClick="self.close();"
						value="取消">
				</td>
			</tr>
		--%>
		</table>
	</div>
	<script type="text/javascript">
 	_returnSendLoad();
 	function _returnSendLoad(){
		try{
			if (typeof returnDialogOnload !="function") {
				loadfile("js/ucap/flow/ucapCommonOptions.js","js");
				loadfile("js/ucap/flow/ucapSendFlow.js","js");
		    	loadfile("js/ucap/flow/ucapOpinion.js","js");
		    	loadfile("js/ucap/flow/ucapReturn.js","js");	  
		    }  	
		}catch(e){
			//alert('正在加载资源文件,请等候...',10000);
			setTimeout ('_returnSendLoad();',1000); 
			return;
		}	 
		try{
			returnDialogOnload();}
		catch(e){ 
			if (typeof returnDialogOnload !="function") 
					setTimeout ('_returnSendLoad();',1000);
			return;
		}
	}
  </script>
</body>