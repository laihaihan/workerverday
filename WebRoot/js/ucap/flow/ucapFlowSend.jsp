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
				<td width="50%"><input name="endType" style="display:none" />下一步骤：<select style="width：200px;" name="nextNode" onChange="NextNodeChange();"></select></td>
				<td id="selRang" >人员范围:<select style="width：200px;" name="SelectRange" onChange="SelectRangeChange();"></select>
				</td>
			</tr>
			<tr>
			    <!-- id="approveType" 用来流程结束时隐藏该项使用  add by zhua 2010-08-23 -->
				<td id="approveType">审批方式：<select style="width：200px;" name="NextApproveType" onChange="ApproveTypeChange();"></select></td>
				<td>
					<table>
						<tr>
							<td id="smsSend" style="display:none">
								<input type="checkbox" name="iptSmsSend" id="iptSmsSend"  onclick="iptSmsSendClk(this)"/>短信提示&nbsp;
								<input type="hidden" name="smsMsg" id="smsMsg" value="" size="44"/>
									<A style="color:red;display:none" name="smsMsgShow" id="smsMsgShow" title="查看或编辑短信内容" href="javascript:smsSendMsgShow(this)">编辑短信</A>
							</td>
							<!-- IM信息的发送 -->
							<td id="imsSend" style="display:none">
								<input type="checkbox" name="imSend" id="imSend" checked onclick="imSend(this)"/>IM提示&nbsp;
								<input type="hidden" name="imMsg" id="imMsg" value="" size="44"/>
									<A style="color:red;" name="imMsgShow" id="imMsgShow" title="查看或编辑IM内容" href="javascript:imMsgShow(this)">编辑</A>
							</td>
						</tr>
					</table>
				</td>
			</tr>
	    </table>
	</div>
	<span id="displayEndFlowInfo" style="display:none">
	   		<br>
	   		<br>
	   		<br>
	   		<br>
	   		<div align="center"> 下一步骤选择为“<span id="endDisPlay"></span>”，则将结束此流程的办理。</div>
	   		<br>
	   		<br>
	   		<br>
	   </span>
    <div id="endFlow" style="background-color:#E2EAF3;margin:0px 5px 0px 5px">
    <table width="95%" border="0">
		<tr>
			<td width="50%">
				<div style="margin-bottom:2px;">
					<span style="font-weight:bold">待选择人员</span>
					<input style="width:35%" id="queryText"></input>
					<img id="query" name="query" qtip="人员范围查询"
												onClick="_doQuery($('nextNode').value,$('queryText').value);" src="../../js/ucap/flow/images/flow_search.gif"/>
					<input style="display:none" name="queryBackButton" type="button" class="btnChannel" id="queryBackButton" value="返回" onClick="_queryBack();"/>
				</div>
				<div>
					<span id="CommonSelRange"> <select name="SingleSelRange"
								size="13" style="width:100% "
								ondblclick="SingleSelRangeDBClick(this);"></select> </span>
						<span id="srcTreeDiv" style="background-color:#FFF;overflow-y:scroll;width:100% ;height:200px;display:none"></span>
				</div>
			</td>
			<td>
				<span id="SingleSelect"><br>
					<table width="100%" border="0" >
						<tr>
							<td width="17%">
								<span id="MultiSelect" style="visibility:hidden;display:none">
									<input name="toRightBtnA" type="button" value="选择"
										onClick="addItem( $( 'SingleSelResult' ), $( 'SingleSelRange' ), isMulti)">
									<p></p>
									<p>
										<input name="toLeftBtnA" type="button" value="删除"
											onClick="removeItem( $( 'SingleSelResult' ) )">
									</p>
									<p>
										<input name="allToRightBtnA" type="button" value="全选"
											onClick="addAllItems( $( 'SingleSelResult' ), $( 'SingleSelRange' ), isMulti )">
									</p>
									<p>
										<input name="allToLeftBtnA" type="button" value="全删"
											onClick="removeAllItems( $( 'SingleSelResult' ) )">
								</span>
								<span id="deptMultiSelect"
									style="visibility:hidden;display:none">
									<p>
										<input name="toRightBtn" type="button" value="选择"
											onClick="addTreeItem( $( 'SingleSelResult' ), $( 'srcDataSel' ),  isMulti )">
									</p> <br>
									<p>
										<input name="toLeftBtn" type="button" value="删除"
											onClick="removeItem( $( 'SingleSelResult' ) )">
									</p> <br>
									<p>
										<input name="allToRightBtn" type="button" value="全选"
											onClick="addTreeItem( $( 'SingleSelResult' ), $( 'srcDataSel' ), isMulti )">
									</p> <br>
									<p>
										<input name="allToLeftBtn" type="button" value="全删"
											onClick="removeAllItems( $( 'SingleSelResult' ) )">
									</p> </span>
							</td>
							<td width="83%">
								<div style="margin-bottom:2px;">
									<span style="font-weight:bold">已选择人员</span>
								</div>
								<select name="SingleSelResult" size="13" style="width:100% "
										ondblclick="$('toLeftBtnA').click();"></select>
							</td>
						</tr>
					</table> </span>
				<span id="MainSelect" style="visibility:hidden;display:none"><br>
					<table width="100%" border="0" >
						<tr>
							<td width="17%">
								<span id="MainSelectButton"> <input name="toRightBtnB"
										type="button" value="选择"
										onClick="addItem( $( 'ApprSelResult' ), $( 'SingleSelRange' ),isMulti)">
									<input name="toLeftBtnB" type="button" value="删除"
										onClick="removeItem( $( 'ApprSelResult' ) )"> 
									<input
										name="allToRightBtnB" type="button" value="全选"
										onClick="addAllItems( $( 'ApprSelResult' ), $( 'SingleSelRange' ), isMulti)">
									<input name="allToLeftBtnB" type="button" value="全删"
										onClick="removeAllItems( $( 'ApprSelResult' ) )">
								 <br>
									<br> <input name="toRightBtnC" type="button" value="选择"
										onClick="addItem( $( 'CoApprSelResult' ), $( 'SingleSelRange' ), isMulti)">
									<input name="toLeftBtnC" type="button" value="删除"
										onClick="removeItem( $( 'CoApprSelResult' ) )"> <input
										name="allToRightBtnC" type="button" value="全选"
										onClick="addAllItems( $( 'CoApprSelResult' ), $( 'SingleSelRange' ), isMulti)">
									<input name="allToLeftBtnC" type="button" value="全删"
										onClick="removeAllItems( $( 'CoApprSelResult' ) )"> </span>
								<span id="deptMainSelectButton"
									style="visibility:hidden;display:none"> <input
										name="toRightBtnB" type="button" value="选择"
										onClick="addTreeItem( $( 'ApprSelResult' ), $( 'srcDataSel' ),  isMulti )">
									<input name="toLeftBtnB" type="button" value="删除"
										onClick="removeItem( $( 'ApprSelResult' ) )"> 
									<input name="allToRightBtnB" type="button" value="全选"
										onClick="addTreeItem( $( 'ApprSelResult' ), $( 'srcDataSel' ), isMulti )">
									<input name="allToLeftBtnB" type="button" value="全删"
										onClick="removeAllItems( $( 'ApprSelResult' ) )"> <br>
									<br> <input name="toRightBtnC" type="button" value="选择"
										onClick="addTreeItem( $( 'CoApprSelResult' ), $( 'srcDataSel' ),  isMulti )">
									<input name="toLeftBtnC" type="button" value="删除"
										onClick="removeItem( $( 'CoApprSelResult' ) )"> <input
										name="allToRightBtnC" type="button" value="全选"
										onClick="addTreeItem( $( 'CoApprSelResult' ), $( 'srcDataSel' ),  isMulti )">
									<input name="allToLeftBtnC" type="button" value="全删"
										onClick="removeAllItems( $( 'CoApprSelResult' ) )"> </span>

							</td>

							<td width="83%">
								主办人员：
								<select name="ApprSelResult" size="7" style="width:100% "
									ondblclick="$('toLeftBtnB').click();"></select>
								<br>
								阅批人员：
								<select name="CoApprSelResult" size="6" style="width:100% "
									ondblclick="$('toLeftBtnC').click();"></select>
							</td>
						</tr>
					</table> </span>
			</td>
			<td width="32">
				<span id="tomove">
					<p>
						<input name="toUpBtn" type="button" value="上移"
							onClick="moveUpOrDown( $( 'SingleSelResult' ), -1 )">
					</p>
					<p>
						<input name="toDownBtn" type="button" value="下移"
							onClick="moveUpOrDown( $( 'SingleSelResult' ), 1 )">
					</p> </span>
			</td>
		</tr>
		<%--分流发送--%>
		<tr id="allUnid" style="display:none">
			<td>
				所有已选的节点
				<select name="SelectAllUnid" size="3" style="width:100% "
					onchange="changeUnidItem();"
					ondblclick="$('SelectAllUnidDelBtn').click();"></select>
			</td>
			<td>
				<input name="SelectAllUnidSelBtn" type="button" value="增加"
					onClick="addUnidItem( $( 'SelectAllUnid' ))">
				<p></p>
				<p>
					<input name="SelectAllUnidDelBtn" type="button" value="删除"
						onClick="delFromArray($( 'SelectAllUnid' ));removeItem( $( 'SelectAllUnid' ) )">
				</p>
			</td>
		</tr>
	</table>
	</div>
	<div id="ucapOpinion" style="display:none;background-color:#E2EAF3;margin:0px 5px 0px 5px">
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
					  	<td>&nbsp;</td>
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
			if (typeof _ucapSendDialogOnload !="function"){
				loadfile("js/ucap/flow/ucapCommonOptions.js","js");
				loadfile("js/ucap/flow/ucapSendFlow.js","js");
		    	loadfile("js/ucap/flow/ucapOpinion.js","js");
		    }
		}catch(e){
			//alert('正在加载资源文件,请等候...',10000);
			setTimeout ('_sendLoad();',1000); 
			return;
		}	 
		try{
			_ucapSendDialogOnload();}
		catch(e){
			if (typeof _ucapSendDialogOnload !="function") 
					setTimeout ('_sendLoad();',1000);
			return;}
	}
 		
  </script>
</body>
</html>
