<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="include/common.jsp"%>
<body>
<script type="text/javascript">
	
	//下一步
	function nextStep(){
		
		document.getElementById("secondJsp").style.display="";
		document.getElementById("firstJsp").style.display="none";
		document.getElementById("backStep").style.display="";
		document.getElementById("generateStep").style.display="";
		document.getElementById("nextStep").style.display="none";
	}
	//上一步
	function backStep(){
	
		document.getElementById("firstJsp").style.display="";
		document.getElementById("secondJsp").style.display="none";		
		document.getElementById("backStep").style.display="none";
		document.getElementById("nextStep").style.display="";
		document.getElementById("generateStep").style.display="none";
	}
	//生成模块代码
	function generateStep(){
		if(!validate()){
			return;
		}
		var data=confirm();

		var requestConfig = {
				url:ucapSession.baseAction,
				params : {					
					type :"generate",
					formIds:"<%=formIds%>"
				},
				jsonData:data,
				callback : function(options, success, response) {
					if (success) {
						var json = response.responseText;
						if(json ==""){
							Ext.Msg.alert("提示信息", "模块代码生成成功！",function() {window.close();
							});
							
						}else{
							Ext.Msg.alert("提示信息", "后台逻辑处理出现错误！");
						}
					} else {
						Ext.Msg.alert("提示信息", "后台逻辑处理出现错误！");
					}
					
				}
			}
			Ext.Ajax.request(requestConfig);
	}
</script>
<!--主区域 begin-->
<div class="area_main"  >
		<div class="area_info">
		    <div id="firstJsp" >
		    	<jsp:include page="formRelation.jsp?moduleId=<%=moduleId%>"/> 
		    </div>
		    <div id="secondJsp" style="display:none">
		    	<jsp:include page="moduleMap.jsp?moduleId=<%=moduleId%>"/> 
		    </div>	  
	  	</div>
	<!--按钮区域 begin-->	
	<div class="area_button">
	<input name="backStep" id="backStep"  type="button" value=""  class="button_pre"  onclick="backStep()" style="display:none" />
	<input name="nextStep" id="nextStep"  type="button" value=""  class="button_next" onclick="nextStep()"/>
	<input name="cancel" id="cancel"  type="button" value=""  class="button_cancel" onclick="window.close();"/>
	<input name="generateStep" id="generateStep"  type="button" value=""  class="button_generate" onclick="generateStep()" style="display:none"/>
	</div>
	<!--按钮区域 begin-->	
</div>
</body>