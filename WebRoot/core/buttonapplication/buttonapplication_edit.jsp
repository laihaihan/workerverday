<%@page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.buttonapplication.*"%>
<%@page import="com.linewell.core.util.UNIDGenerate" %>
<%@page import="java.util.List" %>
<%@ page import="com.linewell.core.constant.CoreConstants" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@include file="/core/params.jsp" %>
<%
	String fn = "update";
	String unid = request.getParameter("unid");
	String roleunid = request.getParameter("roleunid");
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	String appUnid = ucapsession.getApp().getUnid();
	ButtonApplicationBusiness business = new ButtonApplicationBusiness();
	
	ButtonApplication buttonApplication = business.doFindBeanByKey(unid);
	if (null == buttonApplication) {
		fn = "add";
		buttonApplication = new ButtonApplication();
		buttonApplication.setButton_unid(new UNIDGenerate().getUnid());
		buttonApplication.setApp_unid(appUnid);
		buttonApplication.setButton_role_unid(roleunid);
	}
	List buttonList = business.doFindListByAppUnidAndButtonType(appUnid, CoreConstants.DICT_NAVIGATION_BUTTON, appUnid);
	
	request.setAttribute("buttonApplication", buttonApplication);
	request.setAttribute("buttonList", buttonList);
	request.setAttribute("path", request.getContextPath());
%>

<html>
<head>
	${import_theme}
	${import_jquery}
	${import_validation}
	<link type="text/css" rel="stylesheet" href="${path}/core/js/uploadify/uploadify.css"/>
	<script type="text/javascript" src="${path}/core/js/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="${path}/core/js/uploadify/jquery.uploadify.min.js" charset="gbk"></script>
</head>
<body>	
<div id="form_content">
	<div id="form_toolbar">
		<button class="form_btn" id="btnSave"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 保存 </button>
		<button class="form_btn" id="btnClose"><img src="${path}/core/themes/default/images/admin/default_btn.gif"> 关闭 </button>
	</div>
	<div>
		<form id="jspForm" name="jspForm" method="post" action="${path}/buttonApplication.action">
		<input type="hidden" id="fn" name="fn" value="<%=fn%>">
		<input type="hidden" name="button_unid" id="button_unid" value="<%=buttonApplication.getButton_unid()%>">
		<input type="hidden" name="buttonApplication[]app_unid" id="appunid" value="<%=buttonApplication.getApp_unid()%>">
		<input type="hidden" name="buttonApplication[]button_role_unid" id="button_role_unid" value="<%=buttonApplication.getButton_role_unid()%>">
		<table width="98%" align="center" class="form_table">
			<tr>
				<th width=100px align=right>按钮选择</th>
				<td>
					<select name="button_img" id="button_img" style="width:375px;">
					<option value="">--- 请选择 ---</option>
					<s:if test="#request.buttonList.size()>0">
						<s:iterator value="#request.buttonList" id="button">
		        			<option value="${button.button_unid}">${button.button_name}</option>
		        		</s:iterator>
	        		</s:if>
		        	</select>
				</td>
			</tr>
			<tr>
				<th width=100px align=right><font color='red'>*</font>按钮名称</th>
			  	<td>
			    	<input  style='width:375px' type='text' name='buttonApplication[]button_name' id='buttonName' value='${buttonApplication.button_name}'/>
			  	</td>
			</tr>
			<tr>
				<th width=100px align=right><font color='red'>*</font>显示名称</th>
			  	<td>
			    	<input  style='width:375px' type='text' name='buttonApplication[]button_display_name' id='buttonDisplayName' value='${buttonApplication.button_display_name}'/>
			  	</td>
			</tr>
			<tr>
				<th width=100px align=right><font color='red'>*</font>按钮类型</th>
			  	<td>
			    	<select name="buttonApplication[]button_type" id="buttonType" style="width:375px;">
	        			<option value="">--- 请选择 ---</option>
	        			<option value="4" selected="selected">导航栏按钮</option>
	        		</select>
			  	</td>
			</tr>
			<tr>
				<th width=100px align=right><font color='red'>*</font>按钮方法</th>
			  	<td>
			    	<input style='width:375px' type='text' name='buttonApplication[]button_function' id='buttonFunction' value='${buttonApplication.button_function}'/>
			  	</td>
			</tr>
			<tr>
			  <th width=100px align=right>显示形式</th>
			  <td>
			  	<label><input type="radio" value="1" name="buttonApplication[]button_display_img" ${empty buttonApplication.button_display_img?'checked="checked"':''} ${buttonApplication.button_display_img eq '1'?'checked="checked"':''}/>图标</label>
				&nbsp;&nbsp;
				<label><input type="radio" value="0" name="buttonApplication[]button_display_img" ${buttonApplication.button_display_img eq '0'?'checked="checked"':''}/>文字</label>
			  </td>
			</tr>
			<tr class="displayImg">
				<th width=100px align=right>图标样式</th>
			  	<td>
			    	<label><input type="radio" value="0" name="buttonApplication[]button_img_style" ${empty buttonApplication.button_img_style?'checked="checked"':''} ${buttonApplication.button_img_style eq '0'?'checked="checked"':''}/>小图标</label>
					<label><input type="radio" value="1" name="buttonApplication[]button_img_style" ${buttonApplication.button_img_style eq '1'?'checked="checked"':''}/>大图标</label>
			  	</td>
			</tr>
			<tr>
			  <th width=100px align=right>按钮种类</th>
			  <td>
			  	<label><input type="radio" value="1" name="buttonApplication[]button_kind" ${empty buttonApplication.button_kind?'checked="checked"':''} ${buttonApplication.button_kind eq '1'?'checked="checked"':''}/>自定义</label>
				<label><input type="radio" value="0" name="buttonApplication[]button_kind" ${buttonApplication.button_kind eq '0'?'checked="checked"':''}/>默认</label>
			  </td>
			</tr>
			<!-- <tr class="displayImg" style="display: none;">
				<th width=100px align=right>引用样式</th>
			  	<td>
			    	<label><input type="radio" value="0" name="buttonClassify" ${buttonApplication.button_classify eq '0'?'checked="checked"':''}/>否</label>
					<label><input type="radio" value="1" name="buttonClassify" ${buttonApplication.button_classify eq '1'?'checked="checked"':''}/>是</label>
			  	</td>
			</tr>
			<tr class="displayClass" style="display: none;">
				<th width=100px align=right>样式名称</th>
			  	<td>
			    	<input  style='width:375px' type='text' name='button_class' id='button_class' value='${buttonApplication.button_class}'/>
			  	</td>
			</tr> -->
			<tr class="displayImg">
		   		<th width=100px align=right>上传图标</th>
		   		<td>
		       		<input type="text" name="buttonApplication[]button_img_path" id="buttonImgPath" value="${buttonApplication.button_img_path}" style="width:370px;" readonly>
		       		<input type="button" name="imgSel" value="选择" style="cursor: hand;" onclick="top.lwin.viewRecordWindow('8A6F9E6071EBD831A0B8E6057FA6A9B4', '1', 'buttonApplication[]button_img_path', 'ICON_PATH');"/>
		   			<input id="uploadify" class="uploadify" type="file" name="file" style="display: none;"/>
		   		</td>
		   	</tr>
		   	<tr class="displayImg">
		   		<th width=100px align=right>图标预览</th>
		   		<td>
		   			<img src='${path}${buttonApplication.button_img_path}' id="img_preview"/>
		   		</td>
		   	</tr>
			<tr>
			  <th width=100px align=right>序&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</th>
			  <td>
			    <input  style='width:375px' type='text' name='buttonApplication[]button_sort' id='button_sort' value='${buttonApplication.button_sort}'/>
			  </td>
			</tr>
		</table>
		</form>
	</div>
</div>

<script type="text/javascript">
	var uploadifyConfig = {   
		'uploader'			: '${path}/core/js/uploadify/uploadify.swf',   
        'script'			: '${path}/buttonApplication.action',  
        'buttonImg'	    	: '${path}/core/js/uploadify/theme/default/upload.png',
        'cancelImg'     	: '${path}/core/js/uploadify/cancel.png',   
        'height'        	: 35,
  		'width'         	: 45,
        'auto'          	: true,   
        'multi'         	: false,   
        'fileDataName'  	:'file',
        'fileExt'       	: '*.jpg;*.jpeg;*.gif;*.tif;*.bmp;*.png',
        'fileDesc'      	: '支持格式：jpg,jpeg,gif,tif,bmp,png',
        'scriptData'		: {'fn':'uploadImg'},
        //'removeCompleted' 	: false,
        onComplete:function(event, ID, fileObj, response, data){
	        var json = $.parseJSON(response);
	        if(json.result){
	        	count++;
	          	var oldImgPath = $("#buttonImgPath").val();
	          	if(isDelete) {
	          		if(typeof(oldImgPath) != "undefined" && oldImgPath != null && oldImgPath != ""){
	          			 delOldImg(oldImgPath);
	          		}
          		} else {
	          		if('<%=roleunid%>' == '<%=appUnid%>'){
	          			if(typeof(oldImgPath) != "undefined" && oldImgPath != null && oldImgPath != ""){
		          			 delOldImg(oldImgPath);
		          		}
		          		isDelete = false;
	          		} else if('update' == '<%=fn%>'){
	          			 if(typeof(oldImgPath) != "undefined" && oldImgPath != null && oldImgPath != ""){
		          			 delOldImg(oldImgPath);
		          		}
		          		isDelete = true;
	          		} else {
	          			 isDelete = true;
	          		}
          		}
	          	$("#img_preview").attr("src", "${path}" + json.imgPath);
	          	$("#buttonImgPath").val(json.imgPath);
	          }else{
	          	top.popup.alert('操作提示','操作失败','error');
	         }
         }
    };
	var isDelete = false;//用于图标是否可以删除
	var count = 0;//用于记录当前上传的次数
	//绑定事件
	$(function(){
		$("#btnSave").bind("click",doSave);
		$("#btnClose").bind("click",doClose);
		$(".uploadify").uploadify(uploadifyConfig);
		$(":radio[name=buttonApplication[]button_display_img]").bind("change", doDisplayImg);
		$("#button_img").bind("change", doQueryInfo);
		$("#buttonName").bind("change", doDisplayName);
		doDisplayImg();
		doQuerySort();
		doInitFunciton();
		$("#buttonImgPath").bind("input propertychange", doChangeVal);
	});
	
	/**
	 * 说明：	在通过已有按钮进行选择时，更新图标预览
	 */
	function doChangeVal(){
		$("#img_preview").attr("src", "${path}" + $(this).val());
	}
	
	/**
	 * 说明：	初始按钮方法值
	 */
	function doInitFunciton(){
		var val = $("#buttonFunction").val();
		if(typeof(val) == "undefined" || val == null || val == ""){
			$("#buttonFunction").val("javascript:void(0)");
		}
	}
	
	/**
	 * 说明：	按钮名称文本框绑定事件
	 */
	 function doDisplayName(){
	 	var buttonName = $("#buttonName").val();
	 	if(typeof(buttonName) != "undefined" && buttonName != null && buttonName != ""){
	 		$("#buttonDisplayName").val(buttonName);
	 	}
	 }
	
	/**
	 * 说明：	显示图标单选按钮绑定事件
	 */
	function doDisplayImg(){
		var result = $(":checked[name=buttonApplication[]button_display_img]").val();
		if(result == "0"){
			$(".displayImg").hide();
		} else if(result == "1"){
			$(".displayImg").show();
		}
	}
	
	/**
	 * 说明： 在上传图片成功之后删除旧图片
	 */
	function doQuerySort(){
		var sort = $("#button_sort").val();
		if("add" == '<%=fn%>' || typeof(sort) == "undefined" || sort == null || sort == ""){
			$.ajax({
				url:'${path}/buttonApplication.action',
				type:'post',
				dataType:'json',
				data:{
					appUnid:'<%=appUnid%>',
					type:'<%=CoreConstants.DICT_NAVIGATION_BUTTON%>',
					fn:'sort',
					roleUnid:'<%=roleunid%>'
				},
				success:function(response){
					$("#button_sort").val(response.sort);
				},
				error:function(){
				}
			});
		}
	}
	
	/**
	 * 说明： 在上传图片成功之后删除旧图片
	 * 参数： imgPath 旧的图片路径
	 */
	function delOldImg(imgPath){
		$.ajax({
			url:'${path}/buttonApplication.action',
			type:'post',
			dataType:'json',
			data:{
				imgPath:imgPath,
				fn:'delOldImg',
				type:'<%=CoreConstants.DICT_NAVIGATION_BUTTON%>'
			},
			success:function(response){
			},
			error:function(){
				top.$.messager.alert("消息","原始图片删除失败！","error");
			}
		});
	}
	
	/**
	 * 说明： 按钮选择下拉框事件
	 */
	function doQueryInfo(){
		var buttonUnid = $("#button_img").val();
		if(typeof(buttonUnid) != "undefined" && buttonUnid != null && buttonUnid != ""){
			$.ajax({
				url:'${path}/buttonApplication.action',
				type:'post',
				dataType:'json',
				data:{
					buttonUnid:buttonUnid,
					fn:'buttonObject'
				},
				success:function(response){
					var oldImgPath = $("#buttonImgPath").val();
					if(isDelete){
						if(typeof(oldImgPath) != "undefined" && oldImgPath != null && oldImgPath != ""){
							delOldImg(oldImgPath);
						}
						isDelete = false;
					} else {
						if('<%=roleunid%>' == '<%=appUnid%>' && count > 0){
	          				if(typeof(oldImgPath) != "undefined" && oldImgPath != null && oldImgPath != ""){
								delOldImg(oldImgPath);
								count = 0;
							}
	          			}
					}
					//应用系统unid
					$("#appunid").val('<%=appUnid%>');
					//角色unid
					$("#button_role_unid").val('<%=roleunid%>');
					//按钮名称
					$("#buttonName").val(response.info.button_name);
					//按钮显示名称
					$("#buttonDisplayName").val(response.info.button_display_name);
					//按钮方法
					$("#buttonFunction").val(response.info.button_function);
					//显示图标
					if(response.info.button_display_img == "0"){
						$(":radio[name=buttonApplication[]button_display_img]").find(":radio[value=0]").attr("checked", "checked");
					} else if(response.info.button_display_img == "1"){
						$(":radio[name=buttonApplication[]button_display_img]").find(":radio[value=1]").attr("checked", "checked");
					}
					//图标样式
					if(response.info.button_img_style == "0"){
						$(":radio[name=buttonApplication[]button_img_style]").find(":radio[value=0]").attr("checked", "checked");
					} else if(response.info.button_img_style == "1"){
						$(":radio[name=buttonApplication[]button_img_style]").find(":radio[value=1]").attr("checked", "checked");
					}
					//图标种类
					if(response.info.button_kind == "0"){
						$(":radio[name=buttonApplication[]button_kind]").find(":radio[value=0]").attr("checked", "checked");
					} else if(response.info.button_kind == "1"){
						$(":radio[name=buttonApplication[]button_kind]").find(":radio[value=1]").attr("checked", "checked");
					}
					//图标路径
					$("#buttonImgPath").val(response.info.button_img_path);
					//图标预览
					$("#img_preview").attr("src", "${path}" + response.info.button_img_path);
				},
				error:function(){
					isDelete = true;
				}
			});
		}
	}
	
	//保存表单信息
	function doSave(){
		if(validate.validate()){
			$("#jspForm").ajaxSubmit({
				dataType:'json',
				error:function(){
					top.lwin.errorService();
				},
				success:function(data){
					if(data.result){
						top.lwin.alert('信息提示','操作成功','info',1500);
					}else{
						top.lwin.alert('信息提示','操作失败','error',1500);
					}
					top.lwin.close(true);
				}
			});
		}
	}
	
	//关闭窗口
	function doClose(){
		var oldImgPath = $("#buttonImgPath").val();
		if(typeof(oldImgPath) != "undefined" && oldImgPath != null && oldImgPath != ""){
			if("add" == '<%=fn%>'){
				if(isDelete){
					delOldImg(oldImgPath);
				} else {
					if('<%=roleunid%>' == '<%=appUnid%>' && count > 0){
						delOldImg(oldImgPath);
					}
				}
			}
		}
		top.lwin.close();
	}
	
	/**
	 * 说明： 在点击最外层红色关闭按钮时，
	 *	    如果页面没有进行保存，
	 *	    那么删除已经上传的图片
	 */
	function lwinClose(){
		doClose();
	}

	//表单验证
	var validate = new Validation('jspForm', { 
    	immediate: true,
	    validators: {
	      	buttonName:'required',
	      	buttonDisplayName:'required',
	      	buttonFunction:'required'
	    },
	    messages:{
	    	buttonName:'请填写[按钮名称]',
	    	buttonDisplayName:'请填写[显示名称]',
	    	buttonFunction:'请填写[按钮方法]'
	    }
  	});	
</script> 
</body>
</html>