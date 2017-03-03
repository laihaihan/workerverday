<%@page contentType="text/html;charset=utf-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<body>
	<div style="background-image:url(../../js/ucap/flow/images/flow_top_bg.jpg);">
		<table border="0" width="95%" style="margin:0px 5px 0px 5px;">
			<tr>
				<td colspan="2" style="display:none"><!--隐藏转办选择框  by cgc 2011.5.25-->
					转办的用户是否能再次进行转办：<select  id="trans" name="trans">
									<option value="1" selected="selected">能再次转办</option>
									<option value="0">不能再次转办</option>
								</select>
				</td>
			</tr>
		</table>
	</div>
	<div>
		<table border="0" width="95%" style="margin:0px 5px 0px 5px;">
			<tr>
				<td width="45%">
					<span id="srcTreeDiv"
						style=" background-color:#FFF;overflow-y:scroll;width:100% ;height:200px;"></span>
				</td>
				<td >
					<table  border="0" width="100%">
						<tr>
							<td width="17%">
								<p>
									<input name="toRightBtn" type="button" value="选择"
										onClick="addTreeItem( $( 'SingleSelResult' ), $( 'srcDataSel' ),  isMulti )">
								</p>
								<br>
								<p>
									<input name="toLeftBtn" type="button" value="删除"
										onClick="removeItem( $( 'SingleSelResult' ) )">
								</p>
	
									<p>
										<input name="allToLeftBtn" type="button" value="全删"
											onClick="removeAllItems( $( 'SingleSelResult' ) )">
									</p>
								<br>
							</td>
							<td width="60% ">
								<select name="SingleSelResult" size="13" style="width:100% "
									ondblclick="$('toLeftBtn').click();"></select>
							</td>
						</tr>
					</table>

				</td>

			</tr>
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
		</tr>
		</table>
	</div>
	<script type="text/javascript">
	 	_sendTransLoad();
	 	function _sendTransLoad(){
			try{
				if (typeof _ucapTransferOnload !="function"){
				loadfile("js/ucap/flow/ucapCommonOptions.js","js");
				loadfile("js/ucap/flow/ucapOpinion.js","js");
				loadfile("js/ucap/flow/ucapSendFlow.js","js");
				loadfile("js/ucap/flow/ucapTrans.js","js");					
 				}
			}catch(e){
				//alert('正在加载资源文件,请等候...',10000);
				setTimeout ('_sendTransLoad();',1000); 
				return;
			}	 
			try{
				_ucapTransferOnload();
			}catch(e){
				if (typeof _ucapTransferOnload !="function") 
						setTimeout ('_sendTransLoad();',1000);
				return;}
		}
  </script>
</body>
