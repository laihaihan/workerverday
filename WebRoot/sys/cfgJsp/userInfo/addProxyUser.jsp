<%@page contentType="text/html;charset=UTF-8"%>
 <%@include file="/sys/jsp/jspSession.jsp"%>
<body>
<script type="text/javascript">


var items;//保存待办事宜值
var getArray;
	var nowDate = outProxyMangerFun.curDateTime();
//用于获取出差代理人
function loadTime(){
	var url = ucapSession.baseAction;
	var viewId = "5D38BF06EB1F4844140E9A4E36147302";
	var type ="getView";
	var action ="getdata";
	var userUnid= window.parent.ucapCommonFun.getUrlParameter("unid");
	if(userUnid == null ||userUnid =="")
		 userUnid = ucapSession.userJson.unid;
	Ext.getDom("_userUnid").value = userUnid ;//参数对应用户ID
	url = url +"?viewId="+viewId+"&type="+type+"&action="+action+"&sort=proxy_end_time&dir=desc&unid="+userUnid+"&rand="+Math.random();
	var conn = Ext.lib.Ajax.getConnectionObject().conn;
	conn.open("GET", url, false);
	conn.send(null);
	var json = Ext.util.JSON.decode(conn.responseText);
	var exResult=ucapCommonFun.dealException(json);	
	if(!exResult)return;
	var _items = json.root;
	getArray = getArrayProxyList(_items);
	
}

//获取用户二维数组值，出差代理人Unid主键，开始日期，结束日期
function getArrayProxyList(proxyUserListJson){
	var divValue =Ext.getDom("startTimeAndEndTime");
	var innerHtmlValue="<br>可设置的代理日期范围如下：<Br>";
	var arr = null;
	var j=0;
	if(!proxyUserListJson){
		return null;
	}
	j = 0;
	arr = new Array();
	var perBeginTime;

	document.getElementById("startTime").value = nowDate;
	if(proxyUserListJson.length<1)
		return null;
	
	for (var i = 0; i < proxyUserListJson.length; i++) {
		if (!proxyUserListJson[i]){
			continue;
		}		
		if(0==i){	
			arr[j] = new Array(2);
			arr[j][1] = "";
			if(outProxyMangerFun.compareTime(proxyUserListJson[i].proxy_end_time,nowDate)){
				innerHtmlValue =innerHtmlValue + proxyUserListJson[i].proxy_end_time +" 至 以后<Br>";
				arr[j][0] = proxyUserListJson[i].proxy_end_time;
				document.getElementById("startTime").value = proxyUserListJson[i].proxy_end_time;
			}else{
				innerHtmlValue =innerHtmlValue + nowDate +" 至 以后<Br>";
				arr[j][0] =nowDate;
				document.getElementById("startTime").value = nowDate;
			}
			
			j++;			
		}else{	
			var tem=proxyUserListJson[i].proxy_end_time;
			var tem2 = perBeginTime;
			if(outProxyMangerFun.compareTime(tem,nowDate)){
				if(outProxyMangerFun.compareTime(tem2,tem)){
					arr[j] = new Array(2);
					innerHtmlValue =innerHtmlValue + tem +" 至 " +tem2+ "<br>";
					arr[j][0] = tem;
					arr[j][1] = tem2;
					j++;
				}
			}else{
				if(outProxyMangerFun.compareTime(tem2,nowDate)){
					arr[j] = new Array(2);
					innerHtmlValue =innerHtmlValue + nowDate +" 至" +tem2+ "<br>";
					arr[j][0] = nowDate;
					arr[j][1] = tem2;
					j++;
				}
			}
		}
		perBeginTime = proxyUserListJson[i].proxy_begin_time;
	}
	
	var temLast = perBeginTime;
	if(outProxyMangerFun.compareTime(temLast,nowDate)){
		arr[j] = new Array(2);
		innerHtmlValue =innerHtmlValue + nowDate +" 至 " +temLast+ "<br>";
		arr[j][0] = nowDate;
		arr[j][1] = temLast;
		j++;
	}
	divValue.innerHTML=innerHtmlValue;
	return arr;
}


Ext.onReady(function(){
	loadProxyMessage();
	Ext.getDom("belongToApp").value = ucapSession.appUnid ;
	
});



//获取待办事宜列表
function loadProxyMessage(){
	var url = ucapSession.baseAction;
	var type ="peedingUser";
	var action ="getTodoList";
	var userUnid= window.parent.ucapCommonFun.getUrlParameter("unid");
	
	if(userUnid ==null ||userUnid =="")
		 userUnid = ucapSession.userJson.unid;
	Ext.getDom("userUnid").value = userUnid ;//参数对应用户ID
	url = url +"?type="+type+"&act="+action+"&userUnid="+userUnid+"&rand="+Math.random();
	var conn = Ext.lib.Ajax.getConnectionObject().conn;
	conn.open("GET", url, false);
	conn.send(null);
	var json = Ext.util.JSON.decode(conn.responseText);
	var exResult=ucapCommonFun.dealException(json);
	if(!exResult)return;
	items = json;
	query();
	loadTime();		
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

//查询
function query(){	
	var userUnid= window.parent.ucapCommonFun.getUrlParameter("unid");
	if(userUnid ==null ||userUnid =="")
		 userUnid = ucapSession.userJson.unid;
	var itemList =Ext.getDom("List");
	// 先清空列表
	if (itemList && itemList.options.length > 0) {
		var olength = itemList.options.length;
		for (var i = 0; i < olength; i++) {
			itemList.options.remove(0);
		}
	}
	if (items) {
		for (var i = 0; i < items.length; i++) {
			if (!items[i]){
				continue;
			}
			var tem=items[i].todo_doc_title;
			var queryid=Ext.getDom("messge").value;
			if(tem.indexOf(queryid)>-1){
				var flag =hasOldProxy(items[i].instance_node_transactor_0,items[i].instance_node_proxy_0,userUnid);
				if("" == flag){
					var tmpOpt = new Option(items[i].todo_doc_title,items[i].todo_unid);
					itemList.options.add(tmpOpt);
				}
			}
		}
	}
}
	
//是否显示
function isDesplay(flag){
	if(flag==1){
		Ext.getDom("proxyList").style.display="none";
		Ext.getDom("isAll").value=1;
	}else{
		Ext.getDom("proxyList").style.display="";
		Ext.getDom("isAll").value=0;
	}
}

//选择
function commonAddSelect() {
 	var selectList = Ext.getDom("List");
	if (selectList.selectedIndex < 0)
		return;
	for (var i=0;i<selectList.options.length;i++){
		if (selectList.options[i].selected) {
			var val = selectList.options[i];
			addOptionByValue(val);				
		}
	}
}

//返回选择结果值
function getresult(){
	var resultList = Ext.getDom("_result");
	var res ="";// Ext.getDom("res");
	if (resultList.options.length >0)
	for (var i = 0; i < resultList.options.length; i++) {
		if(i==0){
			res = resultList.options[i].value;
		}else{
			res =res+","+ resultList.options[i].value;
		}
	}
	Ext.getDom("res").value = res ;
}

//执行添加到左边select中
function addOptionByValue(selectOpt){
	var resultList = Ext.getDom("_result");
	for (var i = 0; i < resultList.options.length; i++) {
		var tmpOpt = resultList.options[i];
		if (tmpOpt.value == selectOpt.value) {
			return;
		}
	}
	var tmpOpt = new Option(selectOpt.text,selectOpt.value);
	resultList.options.add(tmpOpt);
	getresult();
}

//添加所有到左边select
function commonAddAll() {
	var selectList =Ext.getDom("List");
	if (selectList.options.length < 0)
		return;
	for (var i = 0; i < selectList.options.length; i++) {
		var selectOpt = selectList.options[i];			
		addOptionByValue(selectOpt);		
	}
	getresult();
}

//删除单个右边
function delSelect() {
	var resultList = Ext.getDom("_result");
	if (resultList.selectedIndex < 0)
		return;
	resultList.options.remove(resultList.selectedIndex);
	
	//2012-06-27 add by wyongjian@linewell.com
	//删除单个右边的选项后，返回选择结果值
	getresult();
}	
//删除所有右边
function delAll() {
	var resultList = Ext.getDom("_result");
	if (resultList.options.length > 0) {
		var olength = resultList.options.length;
		for (var i = 0; i < olength; i++) {
			resultList.options.remove(0);
		}
	}
	
	//2012-06-27 add by wyongjian@linewell.com
	//删除所有右边的选项后，返回选择结果值
	getresult();
}


//保存代理人
function saveAs(perWin){
	
	var json = ucapCommonFun.getFormJSon("proxyInfoHtml");
	if(json.proxyUnid_Cn_==""){
		Ext.Msg.alert("提示","代理人不能为空！");
		return;
	}
	
	if(json.endTime==""){
		Ext.Msg.alert("提示","结束日期不能为空！");
		return;
	}
	
	if(json.startTime=="" ){
		Ext.Msg.alert("提示","开始日期不能为空！");
		return;
	}
	try{
		
       	var d1 = json.startTime; 
       	
		var d2 = json.endTime; 
		
		
		
		if(!outProxyMangerFun.compareTime(d1,nowDate)){
			Ext.Msg.alert("提示","开始日期必须大于等于当前日期！");
       		return;
		}
		
       	if(Date.parse(d1.replace("-", "/")) > Date.parse(d2.replace("-", "/"))){
       		Ext.Msg.alert("提示","结束日期不能小于开始日期！");
       		return;
       	}
       	var flag = false;
       	var temMin,temMax;
       	var temArray;
       	if(null != getArray){
       		if(getArray.length ==0){
       			flag=true;
       		}
       		for(var i =0 ;i<getArray.length;i++){
       			temMin = getArray[i][0];
       			temMax = getArray[i][1];
       			if(0==i){
       				flag = outProxyMangerFun.compareTime(d1,temMin);
       			}else if(getArray.length!=(i+1)){
       				flag = outProxyMangerFun.compareTime(d1,temMin) && outProxyMangerFun.compareTime(temMax,d2);
       			}else{
       				flag =outProxyMangerFun.compareTime(temMin,d2);
       			}
       			if(flag)break;
       		}
       	}else{
       		flag =true;
       	}
       	
       	
       	if(!flag){
       		Ext.Msg.alert("提示","代理日期必须在指定范围内，同一时间段不存在两个代理人！");
       		return;
       	}
       	
	}catch(e){
		Ext.Msg.alert("提示","日期格式有错！");
		return;
	}
	var userUnid="";
	if(json.userUnid == "" ){
		json.userUnid = ucapSession.userJson.unid;
	}
	perWin.close();
	outProxyMangerFun.doSave(json);
	setTimeout("userManager.modifymodifyProxy()",1500);	
}

function closeWin(perWin){
	perWin.close();
	ucapSession.commonWin.close();
	userManager.modifymodifyProxy();;	
	
}

</script>
<% 
	String userUnid= request.getParameter("userUnid");
	if(null == userUnid || "".equals(userUnid)){
	}
%>
<div id="proxyInfoHtml">
<table  border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet" height=500px>
<tr>
<td valign=top>
	<table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet">
	 
  <tr>
	  <td colspan=3>
	  	<table  border="0" width=68%  align="right" cellpadding="0" cellspacing="0" class="tableSet">
	  		 <col width="120"/>
			  <col width="160"/>
			  <col width="120"/>
			  <col width="160"/>
	  		 <tr>
			   	<th align=right>开始日期：</th>
			    <td ><input type=Text  name="startTime" id="startTime"   class="inputred" readonly/>
			   	<IMG style="CURSOR: pointer" onclick="WdatePicker({el:'startTime',dateFmt:'yyyy-MM-dd HH:mm:ss'});"  align=absMiddle src=" <%=sSystemPath%>/js/ucap/calendar/skin/datePicker.gif">
			   	
			   	 </td>
			    <th  align=right>结束日期：</th>
			    <td ><input  type=Text  name="endTime" id="endTime"   class="inputred" readonly/>
			    	<IMG style="CURSOR: pointer" onclick="WdatePicker({el:'endTime',dateFmt:'yyyy-MM-dd HH:mm:ss'});"  align=absMiddle src=" <%=sSystemPath%>/js/ucap/calendar/skin/datePicker.gif">	
			    </td>
			  </tr>
			  <tr>
			    <th  align=right>出差代理人：</th>
			    <td colspan="3">
			    	<input type="hidden" class="inputbox" name="proxyUnid" id="proxyUnid" />
			    	<input type=Text  class="inputred" name="proxyUnid_Cn_" id="proxyUnid_Cn_" readonly />
			    	<input type="button" value="选" name=button_ id=button_ onclick="selectDataSD('200','1','proxyUnid');" />
			    </td>
			  </tr>
			  <tr>
			  <th  align=right>出差说明：</th>
			   <td colspan="3"><input  type=Text class="inputbox" name="message" id="message" /></td>
			 </tr>
	  	</table>
	  </td>
	   <td width=32% valign=top>
	  	<div id=startTimeAndEndTime></div>
	  </td>
  </tr>
  <tr>
   <td colspan="4" align=center>
   		<div id=new_1>
   			<input type="radio"  name="flag" id=flag_1 checked onclick='isDesplay(1);'/>所有当前未设置代理人的待办事宜
   			<input type="radio"  name="flag" id=flag_2 onclick='isDesplay(0);' />选择当前未设置代理人的待办事宜
   			<input type=hidden id=isAll name=isAll value=1>
   		</div>
   		<div id=oldProxy_1 style="display:none" >  			
   			 
             <Table border="0"  cellpadding="0" cellspacing="0" class="tableSet" width=80%>
             <tr><td>当前代理人的代理事宜列表</td></tr>
             <Tr><Td>
             <select name="oldproxyMessageList" id="oldproxyMessageList" size="17"  style="width:100%;height:260px">
             </select>
             </Td></Tr>
             </Table>
   		</div>
   </td>
  </tr>
</table>
 <div id="proxyList"  style="display:none" >
 <table border="0" width=80%>
    <tr>
        <td colspan="4"> 
        <input id="messge"></input><input name="queryButton" type="button" class="btnChannel" id="queryButton" value="查询" onClick="query();"/>
        </td>
      </tr>
          <tr  height="70px">
            <td width="40%" align="right">
                <select name="List" id="List" size="17"  style="width:100%;height:220px" onDblClick="commonAddSelect();">
                </select>
            </td>
            <td width="15%" align="center">
                <ul>
        	        <li>
        	          <input name="btnadd" type="button" class="btnChannel" id="button" value="添加" onClick="commonAddSelect();"/>
        	        </li>
			        <li>&nbsp;</li>
                    <li>
        	          <input name="btndel" type="button" class="btnChannel" id="button1" value="删除"  onClick="delSelect();"/>
        	        </li>
        	        <li>&nbsp;</li>
        	     	<li>
	        	       <input name="btnAddAll" type="button" class="btnChannel" id="button2" value="全添"  onClick="commonAddAll();"/>
	        	    </li>
	        	    <li>&nbsp;</li>
	                <li>
	        	       <input name="btnDelAll" type="button" class="btnChannel" id="button3" value="全删"  onClick="	delAll();"/>
	        	    </li>
                </ul>
            </td>
          <td width="40%">
                <select name="_result" size="17"  style="width:100%;height:220px" id="_result" onDblClick="delSelect();">
                </select>
                <input type=hidden id=res name=res >
                <input type=hidden name=userUnid id=userUnid >
                <input type=hidden name=belongToApp id=belongToApp >
                <input type=hidden name=proxy_unid id=proxy_unid >
                <input type=hidden name=minTime id=minTime >
                <input type=hidden name=maxTime id=maxTime >
 
          </td>
        </tr>
	  </table>
  </div>
  </td>
</tr>
</table>
</div>
</body>
