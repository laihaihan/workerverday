<%@page contentType="text/html;charset=UTF-8"%>
<body>
<script type="text/javascript">
	var channelType = 0;
	Ext.onReady(function(){	
		var obj =Ext.getDom("ucap_selects");
		var winobj = window.top;
		if (winobj==null) winobj = window;
		var v =winobj.ucapFlowSys.selectDialogParam.values.split(ucapFlowSys.split_str);
		var t =winobj.ucapFlowSys.selectDialogParam.texts.split(ucapFlowSys.split_str);
		Ext.getDom("_info").innerHTML= ucapFlowSys.selectDialogParam.info;
		for(var i=0;i<v.length;i++){
			 ucapCommonFun.addOption(obj,v[i],t[i]);
		}	
		obj.selectedIndex = 0;	
		Ext.getDom("par").value=winobj.ucapFlowSys.par;
	});
	function confirm(){
	var winobj =window.top;
		ucapOpenFlow.commonSelectConfirm(winobj.ucapFlowSys.selectDialogParam.callBack);
	}
</script>

<div id="dialogSelectHtml">
 <table class="styleBox"  >
 	<tr><td><div id="_info"> </div></td></tr>
	 	 <tr>
	    <td align="center" >
	    	<select id="ucap_selects" name="ucap_selects" ondblclick="confirm();"
			size="12" style="width:100% "></select> 
	    </td>
	  </tr>
	</table>
	<input type="hidden" id="par" name="" value=""/>
</div>
</body>

	
