<%@page contentType="text/html;charset=utf-8"%>
<%
String sSystemPath = request.getContextPath()+"/";
String size = request.getParameter("size");
String docUnid = request.getParameter("docUnid");
String instanceUnid = request.getParameter("instanceUnid");
String type = request.getParameter("type");

if (size==null || size.equals("")) size="18";
 %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<body >
<table width="98%"  border="0" >
  <tr>
    <td width="5%">&nbsp;</td>
    <td colspan="2" ><img   src="<%=sSystemPath%>js/ucap/flow/xtree2b/images/sign_opinion.gif"  />
    请选择相应的意见输入方式，然后选择意见加入意见结果区中，或直接在意见栏中输入，填写完毕意见后单击确定。</td>  </tr>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2">
	<input name="OpinionType0" type="radio" value="0" onClick="opType(0)"><label for="OpinionType_1" onClick="opType(0)" >我的意见</label>
	<input name="OpinionType1" type="radio" value="0" onClick="opType(1)"><label for="OpinionType_2" onClick="opType(1)">常用意见</label>
	<input name="OpinionType2" type="radio" value="0" onClick="opType(2)"><label for="OpinionType_3" onClick="opType(2)">组合意见</label>
	<br></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td width="34%" ><a href="#" id="deleOpinion" onClick="deleUserOpn();"> 
    删除我的常用意见 </a>     <select name="OpinionList" id="OpinionList" size="<%=size%>" style="width:100% "
    	 ondblclick="$('add').click();;" ></select></td>
    <td width="64%" ><!--br--> 
			<table width="100%"  border="0">
			  <tr>
				<td width="10%">
				  <input name="btnReturn" type="button" value="<--" onclick="returnOpn();" >
					  <p></p>
				  <p>
				    <input name="add" type="button" value="-->" onClick="addClick();" >
				 </p>
				  <p>
						<input type="button" value="<┘" onclick="$('Opinion').value=$F('Opinion').substring(0,$F('Opinion').length-1);" >
				  </p>
				  <p>
					  <input type="button" value=" 。" onclick="$('Opinion').value=$F('Opinion')+'。';" >
				  <p>
					  <input  type="button" value=" ，" onclick="$('Opinion').value=$F('Opinion')+'，';" >
				</td>
				<td width="90%"><a href="#" onClick="addUserOpn();"> 加为我的常用意见 </a><textarea name="Opinion"  rows=<%=size%> style="width:100%;font-size:9pt;" title="意见内容" 
						id="opinionTextarea" ></textarea></td>
			  </tr>
	  </table>
		
	</td>
  </tr>
  <tr id="proxytr" style="display:none">
  	<td>&nbsp;</td>
  	<td colspan="2">代理时间：<input type="text" name="proxyTime" value="" size="40"></td>
  </tr><%--
   <tr>
    <td width="5%">&nbsp;</td>
    <td align="right">&nbsp;</td>
	<td align="right"><input name="" value="确定" type="button" onClick=" doOpinionOk();" ></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="" value="取消" type="button" onClick="self.close();" ></td>
  </tr>
--%></table>
<script type="text/javascript">
 	_opinionLoad("<%=docUnid%>","<%=instanceUnid%>");
 	function _opinionLoad(docUnid,instanceUnid){
 	try{
 			window.top.docUnid=docUnid;            //文档unid
			window.top.instanceUnid=instanceUnid;       //实例标识			
 			window.top.iNo = <%=type%>; 
 			window.top.initDoc();			
			
 		}catch(e){}
 	
		try{
			if (typeof _ucapOpinionLoad !="function"){
				loadfile("js/ucap/flow/ucapCommonOptions.js","js");
				loadfile("js/ucap/flow/ucapSendFlow.js","js");
		    	loadfile("js/ucap/flow/ucapOpinion.js","js");
		    }
		}catch(e){
			//alert('正在加载资源文件,请等候...',10000);
			setTimeout ('_opinionLoad();',1000); 
			return;
		}	 
		try{
		
			window.top._ucapOpinionLoad(docUnid,instanceUnid);
			
			 }
		catch(e){
			if (typeof _ucapOpinionLoad !="function"){
			 	 setTimeout ('_opinionLoad();',1000);
			}
			return;
		}
	} 		
</script>
</body>
