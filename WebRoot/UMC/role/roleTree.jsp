<%@page contentType="text/html;charset=UTF-8"%>
<html>
<head>
<% 
	//WEB 应用路径
	String sSystemPath = request.getContextPath()+"/";
%>
</head>
<body>
<script type="text/javascript">
  Ext.onReady(function(){
    //动态加载js
    var loaderJs = new Ucap.JsModuleLoader();   
      loaderJs.on("loaded", initMainPage);   
      loaderJs.load({   
          script:[   
              //2012-05-14 add by xhuatang
              //添加随机参数，保证每次加载最新的JS脚本
              '<%=sSystemPath%>UMC/js/UMCRole.js?r=' + Math.random()
          ]   
      });
      function initMainPage(){
        //去除成功加载后的事件
        loaderJs.un("loaded", initMainPage);   
      //添加你下面要做的代码
      ucapRoleConfig.initRole(1);
    }
  });
</script>
<div id="roleTreeHtml">


	<div id="roleTree"></div>	
	<div id="_UmcRoleDept">
	 <table width="98%" align="center" cellpadding="0">
	   <tr>
	     <td colspan="3">
	       <div id="ucapRoleCenter"></div>
	     </td>
	   </tr>
	   <tr>
	      <td style="width:50%;padding:3px;">      
        <fieldset style="height:240px;">
					<legend><span id="_disName" class="red"></span>可授权部门列表</legend>
					<div id="_UmcDeptList"></div>
				</fieldset>
			</td>
			<td style="padding:5px;" valign="middle" >
			   <button onclick="roleAuthDept.addItem();" style="width:50px;">选中</button>
			   <br>
			   <button onclick="roleAuthDept.delItem();" style="width:50px;">删除</button>
			</td>
			 <td  style="width:50%;padding:3px;" >
				<fieldset id="_UmcRoleDept"  style="height:240px;">
					<legend>本角色拥有部门列表</legend>					
						<select name="selectDepts" id="selectDepts" 
              style="width:96%;margin-left:5px;margin-top:5px;height:210px;" multiple
              ondblclick="roleAuthDept.delItem();">   			
							</select>					
				</fieldset>
		  </td>
		 </tr>
	</table>
</div>

</body>
</html>