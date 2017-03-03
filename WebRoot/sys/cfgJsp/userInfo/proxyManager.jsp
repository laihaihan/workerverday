<%@page contentType="text/html;charset=UTF-8"%>
 <%@include file="/sys/jsp/jspSession.jsp"%>
<body>
<style type="text/css">
.proxy_list{
	/*position:absolute;
	top:100px;
	height:439px;*/
	overflow-y:auto;
}
*html .proxy_list{
	/*height: expression(this.parent.height-35-80);*/	
}
*+html .proxy_list{
}
</style>
<script type="text/javascript">
//设定代理人列表的高度为439px
var proxyListHeight = 439;
//设置代理人信息高度为142px
var proxyMessageTableHeight = 142;

Ext.onReady(function(){
	loadProxyMessage();
	Ext.getDom("_belongToApp").value = ucapSession.appUnid ;	
	Ext.getDom("proxyMessageTable").style.display="none";
	var oldProxyList =Ext.getDom("oldProxyList");
	oldProxyList.options[0].selected =true;
	comSelect();
	if(oldProxyList.options.length == 1){
		Ext.getDom("_proxyList").style.display="none";
	}
});



//刷新
function reflesh(){
	loadProxyMessage();
	Ext.getDom("_belongToApp").value = ucapSession.appUnid ;
	var _proxy_unid =Ext.getDom("_proxy_unid").value;
	var oldProxyList =Ext.getDom("oldProxyList");
	
	if (oldProxyList && oldProxyList.options.length > 0) {
		var olength = oldProxyList.options.length;
		for (var i = 0; i < olength; i++) {
			if(oldProxyList.options[i].value == _proxy_unid){
				oldProxyList.options[i].selected = true;
				break;
			}
		}
	}
	comSelect();
	if(oldProxyList.options.length==1){
		Ext.getDom("proxyMessageTable").style.display="none";
		Ext.getDom("_proxyList").style.display="none";
	}
}

var items;//保存待办事宜值
var proxyUserListJson;

//获取待办事宜列表
function loadProxyMessage(){
	var url = ucapSession.baseAction;
	var type ="peedingUser";
	var action ="getTodoList";
	var userUnid= window.parent.ucapCommonFun.getUrlParameter("unid");
	if(userUnid ==null ||userUnid =="")
		 userUnid = ucapSession.userJson.unid;
	Ext.getDom("_userUnid").value = userUnid ;//参数对应用户ID
	url = url +"?type="+type+"&act="+action+"&sort=instance_node_transact_time&dir=desc&userUnid="+userUnid+"&rand="+Math.random();		
	var conn = Ext.lib.Ajax.getConnectionObject().conn;
	conn.open("GET", url, false);
	conn.send(null);
	var json = Ext.util.JSON.decode(conn.responseText);
	var exResult=ucapCommonFun.dealException(json);	
	if(!exResult)return;				
	items = json;
	loadoldProxyMessage();		
}

//用于获取出差代理人
function loadoldProxyMessage(){
	
	var url = ucapSession.baseAction;
	var viewId = "5D38BF06EB1F4844140E9A4E36147302";
	var type ="getView";
	var action ="getdata";
	
	var userUnid= window.parent.ucapCommonFun.getUrlParameter("unid");
		
	if(userUnid ==null ||userUnid =="")
		 userUnid = ucapSession.userJson.unid;
	Ext.getDom("_userUnid").value = userUnid ;//参数对应用户ID
	url = url +"?viewId="+viewId+"&type="+type+"&action="+action+"&sort=proxy_end_time&dir=desc&unid="+userUnid+"&rand="+Math.random();
	
	var conn = Ext.lib.Ajax.getConnectionObject().conn;
	conn.open("GET", url, false);
	conn.send(null);
	var json = Ext.util.JSON.decode(conn.responseText);
	var exResult=ucapCommonFun.dealException(json);	

	if(!exResult)return;			
	var itemList =Ext.getDom("oldProxyList");		
	var _items = json.root;
	proxyUserListJson =_items;
	// 先清空列表
	if (itemList && itemList.options.length > 0) {
		var olength = itemList.options.length;
		for (var i = 0; i < olength; i++) {
			itemList.options.remove(0);
		}
	}	

	//添加全部
	var tmpOpt = new Option("全部代理人","all");
	itemList.options.add(tmpOpt);		
	if (!_items) {
		return;
	}	
	for (var i = 0; i < _items.length; i++) {
		if (!_items[i]){
			continue;
		}
		var tmpOpt = new Option(_items[i].proxy_proxy_unids+"("+_items[i].proxy_begin_time+" 至 "+_items[i].proxy_end_time+")",_items[i].proxy_unid);
		itemList.options.add(tmpOpt);			
	}	
}


//判断是否有代理人
function hasOldProxy(instance_node_transactor_0,todo_proxy_id,userUnid){
	if(todo_proxy_id ==null || todo_proxy_id ==""){
		return "";
	}
	var proxy_id = todo_proxy_id.split("~!@");
	if(instance_node_transactor_0 != null && instance_node_transactor_0 != ""){
		var transactors = instance_node_transactor_0.split(",");
		for(var i=0;i<transactors.length;i++){
			if( userUnid == transactors[i]){
				if(proxy_id.length>i){
					if(proxy_id[i] != "" && proxy_id[i] != null){
						return proxy_id[i];
					}
				}
			}
		}
	}
	return "";			
}


//新建
function clearNewDoc(){
	return;
}

//点击代理人列表
function comSelect(){
	var proxyId;
	var selectList = Ext.getDom("oldProxyList");
	for (var i=0;i<selectList.options.length;i++){
		if (selectList.options[i].selected) {
			proxyId =selectList.options[i].value;
		}
	}
	if(null == proxyUserListJson){	
		return;
	}	
	Ext.getDom("_proxy_unid").value=proxyId;	
	for(var i=0;i<proxyUserListJson.length;i++){				
		if("all" == proxyId){			
			proxyMeslist(true);
			return ;
		}else if( proxyUserListJson[i].proxy_unid == proxyId){
			Ext.getDom("_startTime").value =proxyUserListJson[i].proxy_begin_time;
			Ext.getDom("_endTime").value = proxyUserListJson[i].proxy_end_time;
			Ext.getDom("_proxyUnid_Cn_").value =proxyUserListJson[i].proxy_proxy_unids;
			Ext.getDom("_message").value =proxyUserListJson[i].proxy_evection_note;
			proxyMeslist(false);
			return ;
		}
	}
}

//删除代理人json的获取
function getDelProxyJson(proxy_Unid){
	var json="{";
	var isAll ="0";
	if("all" == proxy_Unid){
		isAll ="1";
	}
	json = json + "\"isAll\":\"" + isAll + "\"";
	json = json + ",\"proxy_unid\":\"" + proxy_Unid + "\"";
	json = json +",\"res\":\""+Ext.getDom("_todoUnid").value+"\"";
	json = json +",\"userUnid\":\""+Ext.getDom("_userUnid").value+"\"";
	json = json +"}";
	return json;
}


//获取删除的json
function getDelJson(isAll,todoUnid){
	var json="{";
	json = json + "\"isAll\":\"" + isAll + "\"";
	json = json +",\"res\":\""+todoUnid+"\"";
	json = json +",\"userUnid\":\""+Ext.getDom("_userUnid").value+"\"";
	json = json +"}";
	return json;
}


//代理人的待办事宜列表
function proxyMeslist(isAll){	
	var todoUnids="";
	var userUnid= window.parent.ucapCommonFun.getUrlParameter("unid");
	if(userUnid ==null ||userUnid =="")
		 userUnid = ucapSession.userJson.unid;
	var itemList =Ext.getDom("_proxyList");
	// 先清空列表
	itemList.innerHTML ="";
	if (!items) {
		Ext.getDom("proxyMessageTable").style.display="none";	
		return;
	}
	if(items.length==0){
		Ext.getDom("proxyMessageTable").style.display="none";	
	}
	var strHtml="<table width=100% border=0 cellpadding=0 cellspacing=0 class='tableSet'  >";
	if(isAll){
		Ext.getDom("proxyMessageTable").style.display="none";
		Ext.getDom("_proxyList").style.height = proxyListHeight;		
		strHtml = strHtml + "<tr><th colspan=4 align=left>已设置代理人的待办公文列表：</th><tr>";
	}else{
		Ext.getDom("proxyMessageTable").style.display="";			
		Ext.getDom("_proxyList").style.height = proxyListHeight - proxyMessageTableHeight;
		var nowDate =outProxyMangerFun.curDateTime();
		//2011-5-3
		if( outProxyMangerFun.compareTime(Ext.getDom("_endTime").value,outProxyMangerFun.curDateTime())){
			Ext.getDom("extendButton").style.display="";	
		}else{
			Ext.getDom("extendButton").style.display="none";	
		}
		//end
		
		if(outProxyMangerFun.compareTime(outProxyMangerFun.curDateTime(),Ext.getDom("_endTime").value)){
			Ext.getDom("aheadOver").style.display="none";			
		}else{
			Ext.getDom("aheadOver").style.display="";
		}		
		strHtml = strHtml + "<tr><th colspan=4 align=left>"+Ext.getDom("_proxyUnid_Cn_").value+"代理的公文列表：</th><tr>";	
	}
	strHtml = strHtml + "<tr height=20px><td align=center width='40%'>公文标题</td><td align=center width='30%'>接收日期</td><td align=center  width='20%'>代理人名称</td><td align=center width='10%'>操作</td></tr>";
	
	var proxyName = Ext.getDom("_proxyUnid_Cn_").value;
	var proxy_unid = Ext.getDom("_proxy_unid").value;
	
	var array =new Array();
	
	if(proxyName != "all")
		array = getArrayProxyList(proxyName);
	
	var startTime,endTime;
	
	//进行日期的过滤，获取开始时间，结束时间
	if(array==null || array.length<=1){
		startTime="";
		endTime = "";
	}else {
		for(var i=0;i<array.length;i++){
			var arrLink = new Array(); 
			arrLink = array[i];
			if(arrLink[0] == proxy_unid){
				endTime = arrLink[2];
				if((i+1)!=array.length){
					arrLink =array[i+1];
					startTime=arrLink[1];
				}else{
					startTime="";
				}
				break;
			}
		}
	}
	//end
	
	
	for (var i = 0; i < items.length; i++) {
		if (!items[i]){
			continue;
		}
		var tem=items[i].todo_proxy_name;	
		if(isAll){
			var proxyUnid = items[i].instance_node_transactor_0;
			proxyUnid = hasOldProxy(items[i].instance_node_transactor_0,items[i].instance_node_proxy_0,userUnid);
			if(""!=proxyUnid){
				strHtml = strHtml + "<tr><td align=center>"+items[i].todo_doc_title+"</td><td align=center>"+items[i].instance_node_transact_time+"</td><td align=center>"+ucapCommonFun.getDisplayNames("200",proxyUnid,"")+"</td><td align=center><input type=button onclick=\"recoverPower(0,'"+items[i].todo_unid+"')\" value='删除'></td></tr>";
				if(todoUnids == ""){
					todoUnids = items[i].todo_unid;
				}else{
					todoUnids = todoUnids + "," + items[i].todo_unid;
				}
			}
		}else{	
			var proxyUnid_Cn_=Ext.getDom("_proxyUnid_Cn_").value;
			var comTime = items[i].instance_node_transact_time;
			var comTime = comTime.substring(0,10);
			var timeFlag = false;
			if(endTime==""){
				timeFlag = true;
			}else{
				timeFlag = outProxyMangerFun.compareTime(endTime,comTime) ;
				if(startTime!=""){
					timeFlag = timeFlag && (Date.parse(comTime.replace("-", "/")) > Date.parse(startTime.replace("-", "/")))
				}
			}
			if( tem.indexOf(proxyUnid_Cn_)>-1 && timeFlag ){
				strHtml =strHtml + "<tr><td align=center>"+items[i].todo_doc_title+"</td><td align=center>"+items[i].instance_node_transact_time+"</td><td align=center>"+proxyUnid_Cn_+"</td><td align=center><input type=button onclick=\"recoverPower(0,'"+items[i].todo_unid+"')\" value='删除'></td></tr>";
				if(todoUnids == ""){
					todoUnids = items[i].todo_unid;
				}else{
					todoUnids = todoUnids + "," + items[i].todo_unid;
				}
			}
		}
	}
	strHtml = strHtml +"</table>";
	itemList.innerHTML =strHtml;
	Ext.getDom("_todoUnid").value = todoUnids;
}

//删除代理人
function delOutProxy(){
	var _proxy_unid = Ext.getDom("_proxy_unid").value;
	var message ="";
	if("all" == _proxy_unid){
		message="是否删除全部代理人，并回收所有代理公文的授权？";
	}else{
		message="是否删除"+Ext.getDom("_proxyUnid_Cn_").value+"，并回收"+Ext.getDom("_proxyUnid_Cn_").value+"代理公文的授权？";
	}
	Ext.MessageBox.confirm("确认",message,function(btn){
		if(btn=="yes"){
			var json = getDelProxyJson(_proxy_unid);
			outProxyMangerFun.delOutProxy(json);
			Ext.getDom("_proxy_unid").value = "all";
			setTimeout("reflesh()",1200);
		}
	});
}

//（提前结束出差）
function aheadTravel(){
	var curDateTime =outProxyMangerFun.curDateTime() ;
	var beginTime = Ext.getDom("_startTime").value ;
	Ext.MessageBox.confirm("确认","确定提前结束出差？",function(btn){
		if(btn=="yes"){
			var json="{";//组装json发送给服务端
			json = json + "\"isflag\":\"1\"";
			json = json + ",\"startTime\":\"" + beginTime+ "\"";
			json = json +",\"message\":\""+Ext.getDom("_message").value+"\"";
			json = json +",\"userUnid\":\""+Ext.getDom("_userUnid").value+"\"";
			json = json +",\"proxy_unid\":\""+Ext.getDom("_proxy_unid").value+"\"";
			json = json + ",\"endTime\":\"" + curDateTime + "\"";	
			json = json +"}";
			
			json = Ext.util.JSON.decode(json);	
	
			var exResult=ucapCommonFun.dealException(json);	
			if(!exResult){
				Ext.Msg.alert("提示信息", "传入的参数不是json格式的数据！");
				return;
			}
			
			outProxyMangerFun.mdyPorxyMessage(json);
			Ext.getDom("_endTime").value = curDateTime;
			setTimeout("reflesh()",1000);
		}
	});
}

//获取用户二维数组值，出差代理人Unid主键，开始日期，结束日期
function getArrayProxyList(proxyName){
	var arr = new Array();
	var j=0;
	if(!proxyUserListJson){
		return null;
	}
	for (var i = 0; i < proxyUserListJson.length; i++) {
		if(proxyName == proxyUserListJson[i].proxy_proxy_unids){
			j++;
		}
	}
	var arr = new Array(j);
	
	if(j==0) return null;
	j=0;
	for (var i = 0; i < proxyUserListJson.length; i++) {
		if (!proxyUserListJson[i]){
			continue;
		}
		
		if(proxyName == proxyUserListJson[i].proxy_proxy_unids){
			arr[j] = new Array(3);
			arr[j][0] = proxyUserListJson[i].proxy_unid;
			arr[j][1] = proxyUserListJson[i].proxy_begin_time;
			arr[j][2] = proxyUserListJson[i].proxy_end_time;
			j++;
		}
	}
	return arr;
}

//弹出窗体
function showWin(htmlValue){
	var win = new Ext.Window({
	   title:"请输入日期",
	   modal:true,
	   width:350,
	   height:135,
	   collapsible:false,
	   resizable:false,
	   closeAction:'hide',
	   html:htmlValue
	  });
	return win;
}
//打开窗体的变量
var showWinLongTime;


//执行延长时间操作
function actTravel(_startTime,_message,_userUnid,_proxy_unid,_endTime){
	
	var json="{";//组装json发送给服务端
	json = json + "\"isflag\":\"0\"";
	json = json + ",\"startTime\":\"" + _startTime + "\"";
	json = json +",\"message\":\""+_message+"\"";
	json = json +",\"userUnid\":\""+_userUnid+"\"";
	json = json +",\"proxy_unid\":\""+_proxy_unid+"\"";
	json = json + ",\"endTime\":\"" +  _endTime + "\"";		
	json = json +"}";

	json = Ext.util.JSON.decode(json);	
	
	var exResult=ucapCommonFun.dealException(json);	
	if(!exResult){
		Ext.Msg.alert("提示信息", "传入的参数不是json格式的数据！");
		return;
	}
 	
	var afterEndTime = Ext.getDom("afterEndTime").value;
	//alert("afterEndTime="+afterEndTime);
	if(""==afterEndTime){
		Ext.Msg.alert("提示信息", "请选择日期！");
		return;
	}
	
	if(!outProxyMangerFun.compareTime(afterEndTime,outProxyMangerFun.curDateTime())){
		Ext.Msg.alert("提示信息", "输入的日期时间不能小于当前时间！");
		return;
	}
	if(!outProxyMangerFun.compareTime(afterEndTime,json.startTime)){
		Ext.Msg.alert("提示信息", "输入的日期时间不能小于开始日期！");
		return;
	}
	json.endTime = afterEndTime ;
	outProxyMangerFun.mdyPorxyMessage(json);
	showWinLongTime.close();
	setTimeout("reflesh()",1000);
}

//关闭设置延长出差时间窗体
function closeShowWinLongTime(){
	showWinLongTime.close();
	setTimeout("reflesh()",1000);
}

//打开设置延长出差时间窗体
function extendTravelTime(){
	
	var  _startTime = Ext.getDom("_startTime").value ;
	var _message = Ext.getDom("_message").value;
	var  _userUnid = Ext.getDom("_userUnid").value;
	var  _proxy_unid =Ext.getDom("_proxy_unid").value;
	var  _endTime = Ext.getDom("_endTime").value ;	
	var htmlValue = "<div><table  border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"tableSet\"><tr><td width=30% align=right>延长日期至：</td><td width=70%><input  type=Text  name='afterEndTime' id='afterEndTime'  class='inputred' readonly /> <IMG style='CURSOR: pointer' onclick=\"WdatePicker({el:'afterEndTime',dateFmt:'yyyy-MM-dd HH:mm:ss'});\"  align=absMiddle src=\" <%=sSystemPath%>/js/ucap/calendar/skin/datePicker.gif\"></td></tr>";
	
	htmlValue = htmlValue + "<tr><td align=right colspan=2><input  onclick='actTravel(\""+_startTime+"\",\""+_message+"\",\""+_userUnid+"\",\""+_proxy_unid+"\",\""+_endTime+"\")' type=button value=\"确 定\" ><input type=button onclick='closeShowWinLongTime()' value=\"取 消\"></td></tr>" ;
	
	htmlValue = htmlValue + "</table></div>" ;
	
	showWinLongTime = showWin(htmlValue) ;
	
	showWinLongTime.show();
}


//回收代理公文
function recoverPower(isAll,todoUnid){
	Ext.MessageBox.confirm("确认","确定回收代理公文？",function(btn){
		if(btn=="yes"){
			var json =getDelJson(isAll,todoUnid);
			outProxyMangerFun.recoverPower(json);
			setTimeout("reflesh()",1000);
		}
	});
}


</script>
<% 
	String userUnid= request.getParameter("userUnid");
	if(null == userUnid || "".equals(userUnid)){
	}
%>
<div id="proxyManagerHtml" >
<table  border="0" align="center" cellpadding="0" cellspacing="0" class='tableSet' height=500px>
<tr>
<Td valign=top width=35%>
<div>
	代理人列表<input type=button value="删除" onclick='delOutProxy()'>
</div>
<div>
<select name="oldProxyList" size="17"  onClick="comSelect();" style="width:320px;height:380px" id="oldProxyList" >
</select>
</div>
</Td>
<td valign=top  width=65%>
	<table id=proxyMessageTable style="display:none"  border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet">
		<tr>
		  <th align=right width=20%>开始日期：</th>
		  <td ><input type=Text  class="inputred"  name="_startTime" id="_startTime" readonly/> </td>
		    <th  align=right width=20%>结束日期：</th>
		    <td ><input type=Text  class="inputred"  name="_endTime" id="_endTime" readonly/> </td>
		  </tr>
		  <tr>
		    <th  align=right width=20%>出差代理人：</th>
		    <td colspan="3">
		    	<input type=Text  class="inputred" name="_proxyUnid_Cn_" id="_proxyUnid_Cn_" readonly />
		    </td>
		  </tr>
		  <tr>
		  <th  align=right width=20%>出差说明：</th>
		   <td colspan="3"><input  type=Text  class="inputred" name="_message" id="_message" readonly/></td>
		  </tr>
		  <tr><td colspan=4 align=right><input type=button value='提前结束出差' onclick='aheadTravel()' id=aheadOver><input type=button value='延长出差时间' onclick='extendTravelTime()' id=extendButton></td></tr>
	</table>
	
	<div id="_proxyList" class="proxy_list">
	</div>
	<input type=hidden name=_userUnid id=_userUnid >
	<input type=hidden name=_belongToApp id=_belongToApp >
	<input type=hidden name=_proxy_unid value="all" id=_proxy_unid >
	<input type=hidden name=_todoUnid id=_todoUnid >
</td>
</tr>
</table>
</div>
</body>
