<%@page contentType="text/html;charset=UTF-8"%>
<%
	String currentViewId = request.getParameter("unid");
%>
<body>
<script type="text/javascript">
	Ext.onReady(function(){
		var url =ucapSession.baseAction;
		url+="?viewId="+"<%=currentViewId%>"+"&type=getView&rand="+Math.random();
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var json = Ext.util.JSON.decode(conn.responseText);
		
		var countType = "01";
		var isTurnPage = "1";
		var categories = "01";
		
		if(undefined!=json.countType){
			countType = json.countType;
		}
		
		if(undefined!=json.turnPage && !json.turnPage){
			isTurnPage = "0";
		}
		
		if(undefined!=json.categories){
			categories = json.categories;
		}
		
		var field=["name","displayName","pageSize","prefixPicture","countType","turnPage","categories"];
		var value = [json.name,json.displayName,json.pageSize,json.prefixPicture,countType
		,isTurnPage,categories];//json.countType,json.isTurnPage,json.categories
		var jsonValue ="{"+ucapCommonFun.getJsonValue(field,value)+"}";	
		ucapCommonFun.bindForm(jsonValue);
	});

	function getFormJSon(){
		return ucapCommonFun.getFormJSon("dialogHtml");
	}
</script>
<div id="dialogHtml">
<table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet">
  <col width="120"/>
  <col width="160"/>
  <col width="120"/>
  <col width="160"/>
  <tr>
    <th>视图名称</th>
    <td><input type="text" class="inputbox" name="name" id="name"/></td>
    <th>视图标题</th>
    <td><input type="text" class="inputbox" name="displayName" id="displayName"/></td>
  </tr>
  <tr>
    <th>记录数</th>
    <td><input type="text" class="inputbox" name="pageSize" id="pageSize"/></td>
    <th>标题栏上的前置图标</th>
    <td>
    <input type="text" class="inputbox" name="prefixPicture" id="prefixPicture"/>
    </td>
  </tr>
  <tr>
    <th>视图统计</th>
    <td colspan="3"><input name="countType" type="radio" id="countType" value="01" checked="checked" />
          无统计
        <input type="radio" name="countType" id="countType" value="02" />
         本页统计
      <input type="radio" name="countType" id="countType" value="03" /> 
       全部统计
      <input type="radio" name="countType" id="countType" value="04" /> 
       本页与全部统计
      </td>
  </tr>
  <tr>
    <th>是否显示翻页</th>
    
        <td colspan="3"><input name="turnPage" id="turnPage" type="radio" value="1"/>
是
  <input type="radio" name="turnPage" id="turnPage" value="0" checked="checked"/>
  否</td>
  </tr>
  <tr>
    <th>分类样式</th>
    <td colspan="3"><select name="categories" id="categories">
      <option value="01" selected>模块菜单中</option>
      <option value="02">中间树形</option>
      <option value="03">下拉</option>
    </select>    
    </td>
  </tr>
</table>
</div>
</body>