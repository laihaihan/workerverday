<%@page contentType="text/html;charset=UTF-8"%>
<body>
<script type="text/javascript">
	var channelType = 0;
	Ext.onReady(function(){		
		//初始化页面的值
		var json = "";
		var allid = ucapPortal.ucapPortalObj.columnContents;
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"channel","act":"select"},
			callback:function(options,success,response){
				if (success){
					json = Ext.decode(response.responseText);
					var type=-1;
					var users = json.userItems;
					var obj = document.getElementById("user");
					if (users.length==0){
						Ext.getDom("type_0").style.display = "none";
					} else {
						type =0;
					}
					for(var i=0;i<users.length;i++){
						 if (allid.indexOf(users[i].unid)<0)
							ucapCommonFun.addOption(obj,users[i].unid,users[i].channelName);
					}
					
					var depts = json.deptItems;
					if (depts.length==0){
						Ext.getDom("type_1").style.display = "none";
					} else {
						if(type!=0) type = 2;
					}	
					obj =document.getElementById("dept");
					for(var i=0;i<depts.length;i++){
						if (allid.indexOf(depts[i].unid)<0)
							ucapCommonFun.addOption(obj,depts[i].unid,depts[i].channelName);
					} 
					
					var systems = json.systemItems;
					if (systems.length==0){
						Ext.getDom("type_2").style.display = "none";
					} else {
						if(type!=0) type = 2;
					}
					obj =document.getElementById("system");
					for(var i=0;i<systems.length;i++){
						if (allid.indexOf(systems[i].unid)<0)
							ucapCommonFun.addOption(obj,systems[i].unid,systems[i].channelName);
					} 
					Ext.getDom("type_"+type).onclick();
				} else {
					Ext.Msg.alert("提示","新增频道不成功，请重试！")
				}
			}
		}
		Ext.Ajax.request(requestConfig);
		
	});
	function getFormJSon(){
		return ucapCommonFun.getFormJSon("dialogHtml");
	}
	function setChannelType(v){
		channelType = v;
	}
	function deleteUnid(){
		var json =getFormJSon();
		if (json.user==""){
			Ext.Msg.alert("删除频道提示","请选择一频道后，再删除！");
			return;
		}
		Ext.MessageBox.confirm("删除频道提示","你是否确定要删除选中的频道？",callBack);		
       	function callBack(id){
       		if (id=="yes"){
        		var requestConfig = {
					url:ucapSession.baseAction,
					params:{"type":"channel","act":"userDelete","deleteUnid":json.user},
					callback:function(options,success,response){
						if (success){
							var resultList = Ext.getDom("user");
							if (resultList.selectedIndex < 0)
								return;					
							resultList.options.remove(resultList.selectedIndex);
											
							//window.location.reload();
						} else {
							Ext.Msg.alert("提示","删除频道不成功，请重试！")
						}
					}
				}
				Ext.Ajax.request(requestConfig);	
       		}
       	}
	}
	function selectOk(){
		ucapChannel.selectChannelConfirm();
	}	
</script>

<div id="dialogHtml">
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td valign="bottom">
    	<div id="tableCustomMenu">
        	<ul>
            	<li id="type_0" class="CustomMenuHover" onclick="ucapCommonFun.selectTag('tagContent0',this);
            		setChannelType(0)">
            	<a href="javascript:void(0)" >个人频道</a></li>
                <li id="type_1" onclick="ucapCommonFun.selectTag('tagContent1',this);setChannelType(1);">
                <a href="javascript:void(0)" >部门频道</a></li>
                 <li id="type_2" onclick="ucapCommonFun.selectTag('tagContent2',this);setChannelType(2);">
                <a href="javascript:void(0)" >系统频道</a></li>
            </ul>
        </div>
    </td>
  </tr>
  <tr>
    <td>
	    <table class="tableCustom" id="tagContent0" border="0" >
	 	 <tr>
	    <td align="center" >
	    	<select id="user" name="user"
			size="12" style="width:280px"
			ondblclick="selectOk(this);"></select> 
			<input type="button" value="删除频道" onclick="deleteUnid()" />
	    </td>
	  </tr>
	</table>
	<table class="tableCustom" id="tagContent1" style="display:none;" border="0">
	  <tr>
	    <td>
	    	<select name="dept"  id="dept"
			size="13" style="width:280px "
			ondblclick="selectOk(this);"></select> 
	    </td>
	  </tr>
	</table>
	<table class="tableCustom" id="tagContent2" style="display:none;" border="0">
	  <tr>
	    <td>
	    <select id="system"  name="system"
			size="13" style="width:280px "
			ondblclick="selectOk(this);" ></select> 
	    </td>
	  </tr>
	</table>
	</td>
  </tr>
</table>
</div>
</body>

	
