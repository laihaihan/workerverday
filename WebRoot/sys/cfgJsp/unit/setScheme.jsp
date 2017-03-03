<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.platform.cache.style.Style"%>
<%@include file="/sys/jsp/jspSession.jsp"%>
<%@page import="com.linewell.ucap.frame.util.GlobalUtils"%>
<%@page import="com.linewell.ucap.util.UcapRequest" %>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%
	String moduleName="";
	String index = scheme.getIndex();
	//System.out.println(index+ scheme.getIndexType());
	
	if (scheme.getIndexType().equals("02") && index!=null){
	UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
		moduleName =  GlobalUtils.getModule(ucapRequest).getDisplayName(index);
	}
	
	
	
 %>
<body> 
<script type="text/javascript">
	Ext.onReady(function(){		
		var openStyle = "<%=scheme.getOpenStyle()%>";
		var indexType = "<%=scheme.getIndexType()%>";
		var index = "<%=scheme.getIndex()%>";
		var style = "<%=scheme.getStyle()%>";
		var picture = "<%=scheme.getPicture()%>";
		var flash = "<%=scheme.getFlash()%>";
	 	var newdocType ="<%=scheme.getNewdocType()%>";
	 	var opendocType ="<%=scheme.getOpendocType()%>";
	 	var copyright ="<%=scheme.getCopyright()%>";
		var field=["openStyle","indexType","index","style","picture","flash","newdocType","opendocType","copyright"];
		var value=[openStyle,indexType,index,style,picture,flash,newdocType,opendocType,copyright];
		var	jsonValue = "{"+ucapCommonFun.getJsonValue(field,value)+"}";
		ucapCommonFun.bindForm(jsonValue);
		if (indexType=="02"){
			Ext.getDom("index_Cn_").value="<%=moduleName%>";
		}
		if (ucapSession.userJson.userStatus==3){
			Ext.getDom("logo_style").style.display="none";
		} else {
			Ext.getDom("logo_style").style.display="";
			styleChange(Ext.getDom("style"));
		}
	}); 
	function typeChange(obj){
		var v= obj.value;
		if (v=="02" ){
			Ext.getDom("_btn").style.display="";
			Ext.getDom("index").style.display="none";
			Ext.getDom("index_Cn_").style.display="";
		} else {
			Ext.getDom("index").style.display="";
			Ext.getDom("index_Cn_").style.display="none";
			Ext.getDom("_btn").style.display="none";
			if (v=="01"){
				Ext.getDom("index").style.display="none";
			}
		}
	}
	function styleChange(obj){
		var v= obj.value;
		if (v=="0"){
			Ext.getDom("logo_img").style.display="";
			Ext.getDom("logo_flash").style.display="none";
		} else {
			Ext.getDom("logo_flash").style.display="";
			Ext.getDom("logo_img").style.display="none";
		}
	}
	function addLogoFileInput(_i){
	_i = _i||0;
	var files = Ext.query("form#fileUploadForm input[type=file]");
	var fileNames = Ext.query("input[name=picture]");
	var spv = (files[_i].value||"").split("\\");
	fileNames[_i].value = (spv[spv.length-1]||"");
	 
}
</script>

<div id="dialogHtml">
 <table border="0" align="center" class="tableSet">
   <tr>
   	<th>视图打开方式</th>
    <td><input name="openStyle" type="radio" id="openStyle" value="01" checked="checked" />
      页签式<input type="radio" name="openStyle" id="openStyle" value="02" /> 普通式
    </td>
    <th>首页类型</th>
    <td>
	    <input name="indexType" type="radio" id="indexType" value="01"
	     checked="checked"  onclick="typeChange(this);" />频道
	  	<input type="radio" name="indexType" id="indexType" value="02" onclick="typeChange(this);" />模块
		<input type="radio" name="indexType" id="indexType" value="03" onclick="typeChange(this);"/>URL
	</td>    
  </tr>
  <tr>
    <th>首页类型值</th>
    <td colspan="3"><input type="text"  id="index" name="index" style="width:90%"/>
    <input type="text"  id="index_Cn_" name="index_Cn_" style="width:90%" readonly/>
    <input id="_btn" type="button" value="选" onclick="selectDataSD('215','1','index');" />
    </td>
  </tr>
   <tr>
   	<th>新建文档方式</th>
    <td colspan="3"><input name="newdocType" type="radio" id="newdocType" value="00" checked="checked" />
      新窗口<input type="radio" name="newdocType" id="newdocType" value="01" />当前窗口
      <input type="radio" name="newdocType" id="newdocType" value="02" />div窗口
    </td>
   </tr>
  <tr>
   <th>打开文档方式</th>
    <td colspan="3"><input name="opendocType" type="radio" id="opendocType" value="00" checked="checked" />
      新窗口<input type="radio" name="opendocType" id="opendocType" value="01" />当前窗口
      <input type="radio" name="opendocType" id="opendocType" value="02" />div窗口
    </td>
  </tr>
   <tr id="logo_style" sytle="display:none">
    <th>LOGO显示样式：</th>
    <td colspan="3"> 
   	<input type="radio" name="style" id="style" value="0" onclick="styleChange(this);" />图片
	<input type="radio" name="style" id="style" value="1" onclick="styleChange(this);"/>Flash
  </tr>
  <!-- tr id="logo_img" sytle="display:none">
    <th>LOGO图片：</th>
    <td colspan="3"><input type="text"  name="picture" id="picture" class="inputbox" />  
        	<input type="button" value="选" onclick="ucapCommonFun.directoryLogoFile('picture','<%=style.getPath()+"/"%>/ucapimages','','','700','700');"/> </td>
  </tr>
   -->
   <tr id="logo_img" sytle="display:none">
    <th>LOGO图片：</th>
    <td colspan="3"><input type="text"  name="picture" id="picture" class="inputbox" /><input type="button" value="选" onclick="ucapCommonFun.directoryLogoFile('picture','<%=style.getPath()+"/"%>/ucapimages','','','700','700');"/>   
	<iframe name="upload_hidd" id="upload_hidd" style="width:0px;height:0px;"></iframe><form id="fileUploadForm" name="fileUploadForm" action="" target="upload_hidd" enctype="multipart/form-data" method="post" >
        	<input type="file" name="file" id="file" style="width:300px;" onChange="addLogoFileInput()" /> 
	<input id="hidd_fileUploadForm_submit" type="submit" style="display:none;"/>
	</form></td>
  </tr>
  <tr >
    <th>版权信息：</th>
    <td colspan="3"><input type="text"  name="copyright" id="copyright" class="inputbox" />   </td>
  </tr>
  <tr id="logo_flash" sytle="display:none">
    <th>LOGO FLASH：</th>
    <td colspan="3"><input type="text" name="flash"  id="flash" class="inputbox" /></td>
  </tr>
  
</table>
</div>
</body>


	
