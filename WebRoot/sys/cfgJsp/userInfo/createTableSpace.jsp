<%@page contentType="text/html;charset=UTF-8"%>
 <%
	String driverUrl = request.getParameter("driverUrl");
	String sSystemPath = request.getContextPath()+"/";
%>
<html>
<head>
<title></title>
<script type="text/javascript">

var tableSpace={
	init:function()
	{
		var v=document.getElementById("dataBaseType");
		if(v)
		{
			var u=document.getElementById("createUserName");
			var p=document.getElementById("createPassWord");
			if(v.value=="Sql05")
			{
				u.value="sa";
				p.value="sa";
			}else if(v.value=="Oracle")
			{
				u.value="system";
				p.value="system";
			}
			else if(v.value=="GBase")
			{
				u.value="sysdba";
				p.value="123456";
			}
		}
	},
	tempSpaceValue:"",
	changeOption:function(t)
	{
		var spaceName=t.value;
		if(spaceName==this.tempSpaceValue) return;
		var u=document.getElementById("createUserName");
		var p=document.getElementById("createPassWord");
		if(spaceName=="Sql05")
		{
			u.value="sa";
			p.value="sa";
		}else if(spaceName=="Oracle")
		{
			u.value="system";
			p.value="system";
		}else if(spaceName=="MySql")
		{
			u.value="root";
			p.value="root";
		}else if(spaceName=="GBase")
		{
			u.value="sysdba";
			p.value="123456";
		}
		this.tempSpaceValue=spaceName;
	},
   /*
    *创建表空间文本框验证
    * add  by  fsm
    */
    valCreateTable:function()
    {
        var json = ucapCommonFun.getFormJSon("CreateTableHtml");
        var  dbtype=json.dataBaseType;
        if(json.serverAddress=="")
        {
            Ext.Msg.alert("提示","连接字符串不能为空！");
                return; 
        }
        if(json.createUserName=="")
        {
            Ext.Msg.alert("提示","连接用户名不能为空！");
                return; 
        }
        if(json.createPassWord=="")
        {
            Ext.Msg.alert("提示","连接密码不能为空！");
                return; 
        }
        if(json.tablespaceName=="")
        {
            Ext.Msg.alert("提示","数据库名称不能为空！");
                return; 
        }
        if(json.savePath=="")
        {
            Ext.Msg.alert("提示","数据库文件保存路径不能为空！");
                return; 
        }
        if("" ==json.dataSize||isNaN(json.dataSize))
        {
            Ext.Msg.alert("提示","数据文件初始大小必需为数字！");
                return; 
        }
        if(dbtype!="Oracle"&&(isNaN(json.logSize)||""==json.logSize))
        {
            Ext.Msg.alert("提示","日志文件初始大小必需为数字！");
                return; 
        }
        if(dbtype=="Sql05"&&("" ==json.dataMaxSize||isNaN(json.dataMaxSize)))
        {
            Ext.Msg.alert("提示","数据文件最大大小必需为数字！");
                return; 
        }
         if(dbtype=="Oracle"&&"" !=json.dataMaxSize&&isNaN(json.dataMaxSize))
        {
            Ext.Msg.alert("提示","数据文件最大大小必需为数字！");
                return; 
        }
        if(dbtype!="Oracle"&&(isNaN(json.logMaxSize)||""==json.logMaxSize))
        {
            Ext.Msg.alert("提示","日志文件最大大小必需为数字！");
                return; 
        }
        if(""==json.dataFileGrowth||isNaN(json.dataFileGrowth))
        {
            Ext.Msg.alert("提示","数据文件增量必需为数字！");
                return; 
        }
        if(dbtype!="Oracle"&&(isNaN(json.logFileGrowth)||""==json.logFileGrowth))
        {
            Ext.Msg.alert("提示","日志文件增量必需为数字！");
                return false; 
        }
        if(json.userName=="")
        {
            Ext.Msg.alert("提示","创建用户名不能为空！");
                return; 
        }
        if(json.userPassWord=="")
        {
            Ext.Msg.alert("提示","创建密码不能为空！");
                return; 
        }
        if(parseInt(json.dataSize)>parseInt(json.dataMaxSize))
        {
        	  Ext.Msg.alert("提示","数据文件的初始大小不能大于最大大小！");
                return; 
        }
         if(parseInt(json.dataFileGrowth)>parseInt(json.dataMaxSize))
         {
         	  Ext.Msg.alert("提示","数据文件的增量大小不能大于最大大小！");
                return; 
         }
        if(dbtype=="Sql05"&&parseInt(json.logSize)>parseInt(json.logMaxSize))
        {
        	  Ext.Msg.alert("提示","日志文件的初始大小不能大于最大大小！");
                return; 
        }
        if(dbtype=="Sql05"&&parseInt(json.logFileGrowth)>parseInt(json.logMaxSize))
        {
           Ext.Msg.alert("提示","日志文件的增量大小不能大于最大大小！");
            return; 
         }
        ucapButtonFunConfirm.doCreateTable(json);
    }
}
	Ext.onReady(function(){	
		tableSpace.init();
	});	 
</script>
</head>
  <body>
    <div id="CreateTableHtml">
        <table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet">
            <col width="120" />
            <col width="160" />
            <col width="120" />
            <col width="160" />
            <tr>
                <th>
                    数据库类型：</th>
                <td>
                    <select class="inputbox" id="dataBaseType" name="dataBaseType"  onchange="tableSpace.changeOption(this);">
                        <option value="Sql05" >SqlServer2005</option>
                        <option value="Oracle" >Oracle</option>
                        <option value="GBase" selected="selected">GBase</option>
                    </select>
                </td>
                <th>
                   连接字符串：</th>
                <td>
                    <input type="text" class="inputbox" name="serverAddress" id="serverAddress" value="<%=driverUrl%>"/></td>
            </tr>
            <tr>
                <th>
                    <font color=red>*</font>连接用户：</th>
                <td>
                    <input type="text" class="inputbox" name="createUserName" id="createUserName" /></td>
                <th>
                    <font color=red>*</font>连接密码：</th>
                <td>
                    <input type="text" class="inputbox" name="createPassWord" id="createPassWord" /></td>
            </tr>
            <tr>
                <th>
                    <font color=red>*</font>数据库名称：</th>
                <td>
                    <input type="text" class="inputbox" name="tablespaceName" id="tablespaceName" /></td>
                <th>
                    保存路径：</th>
                <td>
                    <input type="text" class="inputbox" name="savePath" id="savePath" value="c:\"/></td>
            </tr>
            <tr>
                <th>
                    数据文件初始大小：</th>
                <td>
                    <input type="text" class="inputbox" name="dataSize" id="dataSize" value="100"/></td>
                <th>
                    日志文件初始大小：</th>
                <td>
                    <input id="logSize" class="inputbox" name="logSize" type="text" value="50"/></td>
            </tr>
            <tr>
                <th>
                    数据文件最大大小：</th>
                <td>
                    <input type="text" class="inputbox" name="dataMaxSize" id="dataMaxSize" /></td>
                <th>
                    日志文件最大大小：</th>
                <td>
                    <input id="logMaxSize" class="inputbox" name="logMaxSize" type="text" /></td>
            </tr>
            <tr>
                <th>
                    数据文件增量：</th>
                <td>
                    <input id="dataFileGrowth" class="inputbox" name="dataFileGrowth" type="text" value="1"/></td>
                <th>
                    日志文件增量：</th>
                <td>
                    <input id="logFileGrowth" class="inputbox" name="logFileGrowth" type="text" value="1"/></td>
            </tr>
            <tr>
                <th>
                    <font color=red>*</font>创建用户：</th>
                <td>
                    <input id="userName" class="inputbox" name="userName" type="text" /></td>
                <th>
                   <font color=red>*</font> 密码：</th>
                <td>
                    <input id="userPassWord" class="inputbox" name="userPassWord" type="password" /></td>
            </tr>
        </table>注： 数据库创建时，带红色*的选项为必填项，数据文件最大值、日志文件最大值不填时，默认为无限大。数据文件和日志文件的属性必须是数字。当数据库类型为Oracle时，日志文件的所有属性可不用填。保存路径的格式如：E:\
    </div>
  </body>
</html>