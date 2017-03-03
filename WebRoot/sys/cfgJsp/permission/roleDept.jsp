<%@page contentType="text/html;charset=UTF-8"%>
<%
   String roleId = request.getParameter("roleId");
	//WEB 应用路径
	String sSystemPath = request.getContextPath()+"/";
%>
<body>
<div id="deptTreeHtml">
<script type="text/javascript">
	Ext.onReady(function(){		
 	 //动态加载js
      var loaderJs = new Ucap.JsModuleLoader();   
      loaderJs.on("loaded", initMainPage);   
      loaderJs.load({   
          script:[   
              '<%=sSystemPath%>UMC/js/roleAuthDept.js?' + Math.random(),
              '<%=sSystemPath%>UMC/js/UMCCommon.js'
          ]   
      });
      function initMainPage(){
        //去除成功加载后的事件
        loaderJs.un("loaded", initMainPage);   
        //添加你下面要做的代码
      	permission.initRoleDeptTree("roleDeptTree");
      	roleAuthDept.loadDeptByRoleId("<%=roleId%>");
    }
	});	 
</script>
<div id="sourceobj" style="display:none"><input type="hidden" name="roleId" id="roleId" value="<%=roleId%>"></div>
 
<table width="98%" align="center" cellpadding="0">
	   <tr>
	     <td style="width:50%;padding:3px;">		  
				<fieldset style="height:315px;">
					<legend><span id="_disName" class="red"></span>可授权部门列表</legend>
					<div id="roleDeptTree"></div>
				</fieldset>
			</td>
			<td style="padding:5px;" valign="middle" >
			   <button onclick="roleAuthDept.addItem();" style="width:50px;">选中</button>
			   <br>
			   <button onclick="roleAuthDept.delItem();" style="width:50px;">删除</button>
			</td>
			 <td  style="width:50%;padding:3px;" >
				<fieldset style="height:315px;">
					<legend>本角色拥有部门列表</legend>					
						<select name="selectDepts" id="selectDepts" 
							style="width:96%;margin-left:5px;margin-top:5px;height:290px;" multiple
							ondblclick="roleAuthDept.delItem();">					
							</select>					
				</fieldset>
		  </td>
		 </tr>
	</table>
</body>
