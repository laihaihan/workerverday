<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List" %>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.ucap.platform.subbutton.SubButton" %>
<%@page import="com.linewell.ucapx.button.SubButtonApi"%>
<%@page import="com.linewell.ucap.session.Session" %>
<%@page import="com.linewell.ucapx.common.WebAppUtils" %>
<%
/**
 * 表单按钮栏 
 * @author xhuatang@linewell.com
 * @since 2011-07-08
 */
{
%>
<%

//WEB应用的路径
String _systemPath = request.getContextPath() + "/";
//表单的UNID
String _formUnid = request.getParameter("formId");
//表单的类型
String _formType = request.getParameter("type");
//Ucap定以的Session对象
Session _ucapSession = WebAppUtils.getSession(request);
%>
<DIV>
	<DIV style="POSITION: absolute; PADDING-BOTTOM: 0px; PADDING-LEFT: 5px; PADDING-RIGHT: 0px; FLOAT: left; PADDING-TOP: 5px" id=_ucapFormDocTitle></DIV>
	 <DIV id=secondToolBar>
<%
  
	//SubButtonApi对象
	SubButtonApi _subButtonApi = new SubButtonApi();
	//获取所有的按钮对象
	List<SubButton> _subButtonList = _subButtonApi.getSubButtonList(_formUnid, _ucapSession);
	java.util.Map<String, String> _buttonsEvent = new java.util.HashMap<String, String>();
	//遍历按钮
	for(SubButton _item : _subButtonList){
	 String _btnPic = _item.getPicture();
	  
	 String _btnId = "form_btn_" + _item.getUnid();
	 _buttonsEvent.put(_btnId, _item.getButton().getCode());
	 if(StringUtils.isEmpty(_btnPic)){
	   _btnPic = "uistyle/style_1/ucapimages/default_btn.gif";
	 }//end if
	 _btnPic = _systemPath + _btnPic;
%>	 
	   <BUTTON style="padding-left:3px;padding-right:3px;" class="btnn1" 
	     onmouseover="this.className='btnn3'" 
	     onmouseout="this.className='btnn1'"
	     id="<%= _btnId %>"
	     title="<%= _item.getTip() %>"> 
	       <IMG align="absMiddle" src="<%= _btnPic %>">&nbsp;<%= _item.getName() %>
	   </BUTTON>
<%
	}//end for
	_ucapSession = null;
	_subButtonApi = null;
	_subButtonList = null;
%>	   	 
	 </DIV>
</DIV>
<script language="javascript">
$(function(){  
  <%
  java.util.Iterator<?> iter = _buttonsEvent.entrySet().iterator(); 
  while (iter.hasNext()) { 
    java.util.Map.Entry _entry = (java.util.Map.Entry) iter.next();
  %>
  jQuery("#<%= _entry.getKey()%>").click(function(){    
    var jsCode = "<%= _entry.getValue()%>";
    //如果是原来的通用保存
    if("_UcapForm.simpleDocSave();" === jsCode){
        lw.form.save();
    }else if("_UcapForm.docSaveSucReload();" === jsCode){//保存并新增
        lw.form.save();        
    }else if("_UcapForm.formClose();" === jsCode){//关闭
        window.close();
    }
  });
  <%
  }
  %>
});
</script>
<%
}//page end
%>