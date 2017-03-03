<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="com.linewell.ucap.platform.cache.form.Form"%>
<%@page import="com.linewell.ucap.admin.module.FormWrapper"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%
/**
 * 视图列配置框架页
 * @author 
 * @since 
 */
    //获取业务模块标识
	String moduleUnid=request.getParameter("moduleUnid");
    String appUnid = request.getParameter("appUnid");
    String isFlow=request.getParameter("isFlow");
    if(null==isFlow){
    	isFlow = "";
    }
  	List<Form> formList = FormWrapper.getFormByModuleUnid(moduleUnid);
  	String firstFormUnid = "";
  	if(null==formList){
  		formList = new ArrayList<Form>();
  	}else if(!formList.isEmpty()){
  		firstFormUnid = formList.get(0).getUnid();
  	}
%>
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>视图配置</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
<style>
html{overflow:hidden;scroll:no;margin:0;padding:0}
body{overflow:hidden;scroll:no;margin:0;padding:0;}
#areaMain{position:absolute;bottom:0px;right:0px;left:0px;height:100%;}
#areaMain iframe{overflow:hidden;}
/*fix ie6 and ie7 bug*/
*html #areaMain,*+html #areaMain {   
   /*padding-bottom:55px;   /* Height of the footer */
   height: expression(documentElement.clientHeight);
}
#viewDiv{position:absolute;width:200px;bottom:0px;height:100%;left:0px;top:0px;}
#iframeDiv{position:absolute;left:200px;top:0px;bottom:0px;right:0px;height:100%;*width: expression(documentElement.clientWidth-200);}
</style>    
    <%@include file="../include/platformresources.jsp"%>
    <script type="text/javascript">
        var viewColumns = null;
        
        /**
         * 双击连接
         */
        function formListDblClk(obj){
            setViewColumns();
            
            var formUnid = obj.value;
            //转向连接
        	Ext.getDom("viewColumnsIfr").src="viewcolumns.jsp?formUnid="+formUnid+"&moduleUnid=<%=moduleUnid%>&appUnid=<%=appUnid%>&isFlow=<%=isFlow%>";
        }
        
        /**
         *  获取待保存的json
         */
        function getConfigJsons(){
        	setViewColumns();
        	var result = "";
        	if(null!=viewColumns){
        	    var spilt = "";
        	    for(var i=0;i<viewColumns.length;i++){
        	        if(i>0)spilt = ",";        	        
        	  	    result += spilt + viewColumns[i];
        	    }
        	}
        	
        	result = "["+result+"]";
        	
        	return result;
        }
        
        /**
         * 追加配置值
         */
        function setViewColumns(){
        	if(null==viewColumns){
            	viewColumns = [];
            }
            var configJsonStr = "";
            var iframeObj = document.getElementById("viewColumnsIfr").contentWindow;
    		if(undefined!=iframeObj && null!=iframeObj){
    			configJsonStr = iframeObj.getConfigJson(); 
    			   			    			
    		}    		
    		
    		//如果存在结果集
            if(configJsonStr){            
                var configJson = Ext.decode(configJsonStr);
                
                if(null != configJson && configJson.items){    
	            	var isContain = false;
	            	for(var i=0;i < viewColumns.length;i++){
	            		var tmpFormJson = Ext.decode(viewColumns[i]);
	            		var tmpFormUnid = tmpFormJson.formUnid;
	            		
	            		if(tmpFormUnid == configJson.formUnid){
	            			viewColumns[i] = configJsonStr;
	            			isContain = true;
	            			break;
	            		}//end if
	            	}
	            	if(!isContain){
	            		viewColumns[viewColumns.length] = configJsonStr;
	            	}
	            }
            }//end configJsonStr
        }
        
        function saveViewColumns(){     
              
            var viewColumnsJson = getConfigJsons();
            
            
            var data = "{appUnid:'<%=appUnid%>',moduleUnid:'<%=moduleUnid%>',isFlow:'<%=isFlow%>',forms:"+viewColumnsJson+"}";
            
            var json = Ext.decode(data);
            
            var requestConfig = {
				url:ucapSession.baseAction,
				params:{"type":"buildAction","act":"buildView","tmp":ucapCommonFun.getRandomString()},
				jsonData:json,
				callback:function(options,success,response){				    
					if (success){
						var exjson = Ext.util.JSON.decode(response.responseText);	
						var exResult=ucapCommonFun.dealException(exjson);
						if(!exResult)return;
					
						Ext.Msg.alert("提示","视图列配置保存成功！")
					} else {
						Ext.Msg.alert("提示","视图列配置保存不成功！");
					}
				}
			}
		
			Ext.Ajax.request(requestConfig);
        }
   </script>
  </head>
<body>
<div class="areaMain">
    <div id="viewDiv">
       <select name="formList" size="20" style="width:190px;height:100%" id="formList" onDblClick="formListDblClk(this);">
       <%
          for(int i=0;i<formList.size();i++){
        	  Form form = formList.get(i);
        	  if(0==i){
       %>
           <option value="<%=form.getUnid()%>" selected="selected"><%=form.getNameCn()%></option>
       <%}else{%>
       		<option value="<%=form.getUnid()%>"><%=form.getNameCn()%></option>
       <%}}%>
       </select>
    </div>
    <div id="iframeDiv">
        <iframe frameborder=0 scrolling="yes" name="viewColumnsIfr" id="viewColumnsIfr" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" src="viewcolumns.jsp?formUnid=<%=firstFormUnid%>&isFlow=<%=isFlow%>"></iframe>
    </div>
</div>
</body>
</html>
