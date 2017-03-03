<%@page contentType="text/html;charset=UTF-8"%>
<%
String existsNewFormStr = request.getParameter("exists");
boolean existsNewForm = ("1".equals(existsNewFormStr)  ? true : false);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>弹出窗口页面</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="模块代码生成确认">
	<meta http-equiv="description" content="模块代码生成确认">
  </head>
  
  <body>
<style>
.intro{padding:8px;}
.intro_title{font-size:16px;font-weight:bold;}
.intro_content{font-size:14px;text-indent:28px;line-height:150%;}
  .intro_content dl{} 
  .intro_content dt{text-indent:0;font-weight:bold;}
  .intro_content dd{}
.generator_type_select{text-align:right;padding:5px 8px;font-size:12px;}
  .generator_type_select label{font-weight:bold;}
</style>
    <div class="intro">
	    <div class="intro_title">说明：</div>
	    <div class="intro_content">
		    出现此页面，说明已经生成过该模块下的表单代码，请您正确选择模块代码的生成方式。<br/>
		    <b>模块代码的生成提供了两种模式：</b><br/>
		    <dl>
		      <dt>1、只生成新表单(只有在有新表单存在时才可以选择)</dt>
		      <dd>选择只生成新表单后，代码生成只生成当前相应表单的Bean对象、逻辑处理Manager对象、数据库交互DAO对象以及网页交互的Action对象。此方式不生成作为其他表单子表的相应处理逻辑，您需要手动加入相应的处理逻辑才能保证代码的完整性。</dd>
		      <dt>2、覆盖生成</dt>
		      <dd>选择覆盖生成后，模块底下的所有表单将按照主从关系重新生成。如您已经有修改过该模块的代码，请您事先备份相应的代码以免丢失。</dd>
		    </dl>
	    </div>	    
	  </div>
    <div class="generator_type_select">
      <%
      //如果存在新表单
      if(existsNewForm){
      %>
      <input type="radio" id="generatorOnlyNew" 
        name="generatorType" value="1" checked/><label for="generatorOnlyNew">只生成新表单</label>
      <input type="radio" id="generatorOverride" 
        name="generatorType" value="2" /><label for="generatorOverride">覆盖生成</label>
      <%
      }else{
      %>
      <input type="checkbox" id="generatorOverride" 
        name="generatorType" value="2" /><label for="generatorOverride">覆盖生成</label>
      <%
      }
      %>
    </div>
  </body>
</html>
