<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.form.content.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="com.linewell.core.util.StrUtil" %>
<%@page import="java.util.List"%>
<%@taglib prefix="s" uri="/struts-tags"%>

<%
	String punid = request.getParameter("punid");
	FormContentManager formContentManager = new FormContentManager();
	List formList = formContentManager.doFindListByCondition(" punid='"+punid + "' order by sortid" ,new Object[0]);
	

	String unid = request.getParameter("unid");
	if(StrUtil.isNull(unid) || unid.equals("-1")){
		unid = new UNIDGenerate().getUnid();
	}
%>

<html>
<head>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<%@include file="/core/params.jsp" %>
	${import_theme}
	${import_jquery}
	${import_easyui}
	${import_validation}
</head>

<body>
	<div class="easyui-tabs" id="tt" fit="true" style="width:100px;height:400px;">
	    <%
	    for(int i = 0 ; i < formList.size(); i ++){
	    	FormContent formContent = (FormContent)formList.get(i);
	    	%>
	    	<div title="<%=formContent.getName() %>" ccc='<%=i%>'>
	    	 	<iframe scrolling="auto" src="form_autocontent.jsp?formunid=<%=formContent.getUnid() %>&index=<%=i%>&maxindex=<%=formList.size()%>&unid=<%=unid%>" name="formframe" width="100%" height="100%"></iframe>	
	    	</div>
	    	<%
	    }
	    %>
    </div> 	
</body>

<script type="text/javascript">
	var nowIndex = 0;//全局变量，记录当前页签索引
	
	$('#tt').tabs({   
	   border:false,   
	   onSelect:function(title){    
	       if(getIndexByTitle(title) > parseInt(nowIndex)){
	       		alert("上个页签内容未填写。");
	       		tabsChangeByIndex(nowIndex);
	       }
	   }
	});  
	
	function getIndexByTitle(title){
		<%
		    for(int i = 0 ; i < formList.size(); i ++){
		    	FormContent formContent = (FormContent)formList.get(i);
		    	%>
		    	if(title=="<%=formContent.getName() %>"){
		    		return "<%=i%>";
		    	}
		    	<%
		    }
		    %>
	}
	
	
	//根据页签索引切换页签
	function tabsChangeByIndex(index){
		nowIndex = index;
		var t = $('#tt');
		var tabs = t.tabs('tabs');
		t.tabs('select', tabs[index].panel('options').title);
	}

</script>
</html>