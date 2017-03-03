<%@ page contentType="text/html;charset=UTF-8"%>
<%
//文档的UNID
String unid     = request.getParameter("unid");
String formType = request.getParameter("formType");
String formId   = request.getParameter("formId");
/*String deptId   = request.getParameter("deptId");
String deptName = request.getParameter("deptName");
if(!unid.equals("")){
  deptId = "";
  deptName = "";
}*/
String passwordNotNull = "true";
String passwordStar = "*";
String passwordTip = "请输入有足够复杂度的密码，密码最小长度为6位数";
if(!unid.equals("")){
  passwordNotNull = "false";
  passwordStar = "";
  passwordTip = "密码最小长度为6位数(<font color='red'>为空则不修改</font>)";
}
String sSystemPath = request.getContextPath()+"/";
String sUserStylePath=sSystemPath+"uistyle/style_1/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content="用户管理中心" name="keywords" />
<meta content="用户管理中心" name="description" />
<title>新增用户</title>
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ucap.css"/>
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=sUserStylePath%>css/ext-patch.css" />
<link href="style/editUser.css" rel="stylesheet" type="text/css" />
<%@include file="include/umcSession.jsp"%>
<script type="text/javascript" src="js/UMCUserManager.js"></script>
<script type="text/javascript" src="js/UMCValidator.js"></script>
<script type="text/javascript">
  /**
   * 字段的配置信息
   */
  var fieldConfigs = [{
    id       : "displayName",
    tip      : "用户的真实姓名，由2到10个汉字组成，如：张三、阿沛阿旺晋美",
    errorMsg : "您输入的用户名格式不正确，用户名由2到10个汉字组成",
    type     : "realname",
    notNull  : true
  },{
    id       : "name",
    tip      : "登录名不能为空",//"登录名由英文字母与数字、下划线的组合且不区分大小写，登录名为3-20个字符，如：zhangsan123",
    errorMsg : "你的用户名格式不正确，请重新输入",
    type     : "require",
    notNull  : true
  },{
    id       : "password",
    tip      : "<%= passwordTip%>",
    errorMsg : "您输入的密码太简单，请输入至少6位数的密码",
    type     : "password",
    notNull  : <%= passwordNotNull%>
  },{
    id       : "mobile",
    tip      : "手机号码为数字与横杠(-)的组合，如：13888888888、0595-222222222",
    errorMsg : "手机号码的格式不正确，请重新输入",
    type     : "mobile"
  },{
    id       : "mail",
    tip      : "合法的电子邮件名称，如：admin@linewell.com",
    errorMsg : "您输入的电子邮件格式不正确，请重新输入",
    type     : "email"
  },{
    id       : "idCard",
    tip      : "身份证号码支持15位与18位，最后一位为X的号码大小写的字母x均可，如：23021219800212352X",
    errorMsg : "您输入的身份证号码不正确，请重新输入",
    type     : "idcard"
  },{
    id       : "messageNumber",
    tip      : "及时通讯支持QQ，请输入QQ号码，QQ号码为5-11位半角数字的组合",
    errorMsg : "您输入的QQ号码不正确，请重新输入",
    type     : "qq"
  }];
  
  
  
  var unid = "<%=unid%>"; 
  Ext.onReady(function(){
    if (unid != ""){
      //ucapUmcDept.setValue(unid);
      UMCUserManager.load(unid);
    } else if(window.parent && window.parent.ucapUmcDept) {
      var node = window.parent.ucapUmcDept.getSelectNode();
      if (node.id !=ucapUmcDept.newRootId){   
        Ext.getDom("depts").value = node.id;
        Ext.getDom("depts_Cn_").value = node.text;       
      }
    }
    _UcapForm.tool.embellishForm("userForm");
    //初始化验证
    UMCValidator.init(fieldConfigs);  
  });  

  /**
   * 保存用户
   */
  function save(){
    //if(UMCValidator.validate("userForm") == false) return;
    if(UMCValidator.validate() == false){
      Ext.Msg.alert("提示","请先按提示正确输入所有字段！");
      return;
    }
    var json = ucapCommonFun.getFormJSon("userForm");
    var isNew = unid ? false : true;
    UMCUserManager.save(json, isNew, saveCallBackFun);    
  }
  
  /**
   * 保存成功回调方法
   */
  function saveCallBackFun(){
    //刷新视图
    if(window.parent && window.parent.view){      
      window.parent.view.refresh();
      window.parent.Ext.Msg.alert("提示","保存数据成功！");
      window.parent.UMCUserManagerWin.close();
      window.parent.UMCUserManagerWin = null;
    }
  }
  
  /**
   * 取消保存
   */
  function cancleSave(){
    if(window.parent && window.parent.UMCUserManagerWin){      
      window.parent.UMCUserManagerWin.close();
      window.parent.UMCUserManagerWin = null;
    }
  }
</script>
</head>

<body>
  <!-- 标题 -->
	<div class="title" style="display:none;">
		<div class="title_text">
			新增用户
		</div>
	</div>
<div id="userForm">
  <input type="hidden" id="formId" value="<%= formId %>" />
  <input type="hidden" id="unid" value="<%= unid %>" />
	<ul class="form_content" >
		<!-- 用户名 -->
		<li>
			<div class="input_hint">
				<span class="star">*</span>用户名：			
			</div>
			<div class="input_content">
				<div class="input_out">
					<input name="displayName" id="displayName" type="text"  class="info_textinput"/>
				</div>
				<div class="input_tips">
					
				</div>		
			</div>
		</li>
		
		<!-- 登录名 -->
		<li>
			<div class="input_hint">
				<span class="star">*</span>登录名：			
			</div>		
			<div class="input_content">
				<div class="input_out">
					<input name="name" id="name" type="text"  class="info_textinput"/>
				</div>
				 
				<div class="input_tips">
					
				</div> 
			</div>
		</li>
			
		<!-- 密码 -->
		<li>
			<div class="input_hint">
				<span class="star"><%= passwordStar %></span>
				密码：
			</div>
			<div class="input_content">
				<div class="input_out">
					<input name="password" id="password" type="password"  class="info_textinput"/>
				</div>
				<div class="input_tips">
					
				</div>		
			</div>
		</li>
			
		<!-- 是否禁用 -->
		<li>
			<div class="input_hint">
				<span class="star">*</span>
				是否禁用：
			</div>
			<div class="input_content">
				<div class="input_out">
					<input name="isforbit" id="isforbit" type="radio" class="info_radiobutton" value="true" />是
					<input checked name="isforbit" id="isforbit" type="radio" class="info_radiobutton" value="false" />否
				</div>
				<div class="input_tips">
				</div>
			</div>
		</li>
			
		<!-- 性别 -->
		<li>
			<div class="input_hint">
				性别：
			</div>
			<div class="input_content">
				<div class="input_out">
					<input checked name="sex" id="sex" type="radio" class="info_radiobutton" value="0" />男
					<input name="sex" id="sex" type="radio" class="info_radiobutton" value="1"/>女
				</div>
				<div class="input_tips">
        </div>
			</div>
		</li>
			
		<!-- 身份证 -->
		<li>
			<div class="input_hint">
				身份证：
			</div>
			<div class="input_content">
				<div class="input_out">
					<input name="idCard"  id="idCard" type="text" class="info_textinput"/>
				</div>
				<div class="input_tips">
        </div>
			</div>
		</li>
			
		<!-- 手机 -->
		<li>
			<div class="input_hint">
				手机：
			</div>
			<div class="input_content">
				<div class="input_out">
					<input name="mobile"  id="mobile" type="text" class="info_textinput"/>
				</div>
				<div class="input_tips">
        </div>
			</div>
		</li>
		
			
		<!-- 电子邮件 -->
		<li>
			<div class="input_hint">
				电子邮件：
			</div>
			<div class="input_content">
				<div class="input_out">
					<input name="mail"  id="mail" type="text" class="info_textinput"/>
				</div>
				<div class="input_tips">
        </div>
			</div>
		</li>
			
		<!-- 即时通讯号码 -->
		<li>
			<div class="input_hint">
				即时通讯号码：
			</div>
			<div class="input_content">
				<div class="input_out">
					<input name="messageNumber"  id="messageNumber" type="text" class="info_textinput"/>
				</div>
				<div class="input_tips">
        </div>
			</div>
		</li>
			
		<!-- 所属部门 -->
		<li>
			<div class="input_hint">
				所属部门：
			</div>
			<div class="input_content">
				<div class="input_out">				 
					<textarea readonly class="inputred"					
					   name="depts_Cn_" id="depts_Cn_" cols="2"></textarea>
					<input type="text"
					   class="inputbox" name="depts" id="depts"
              style="display:none" source="201" sourceType="20" value=""/><input 
          type="button" class="btnOnlyChannel" 
          onclick="selectDataSD('201','0','depts','','','','','umc');"/>
				</div>
			</div>
		</li>
			
		<!-- 直属上级 -->
		<li>
			<div class="input_hint">
				直属上级：
			</div>
			<div class="input_content">
				<div class="input_out">
				<input type="text" class="info_textinput" name="leaders" id="leaders" 
	          nameEn="leaders" source="200" sourceType="20"
	          />
					<!-- <textarea cols="20" name="TextArea1" rows="2" class="info_textarea" readonly="readonly"></textarea>
					<input name="Button1" type="button" value="选" class="button_election"/> -->
				</div>
			</div>
		</li>
			
		<!-- 职位 -->
		<li>
			<div class="input_hint">
				职位：
			</div>
			<div class="input_content">
				<div class="input_out">
					<input type="text" class="info_textinput" name="posts" id="posts" 
	          nameEn="posts" source="202" sourceType="20"
	          />
				</div>
			</div>
		</li>	
		
		<!-- 按钮 -->
		<li class="info_button">
			<input name="Button1" type="button" value="确&nbsp;&nbsp;定" onclick="save();" /> 
			<input name="Button1" type="button" value="取&nbsp;&nbsp;消" onclick="cancleSave();" /> 
			<div class="clearfix"></div>
		</li>	
		<!-- 中间区域 end-->
	</ul>
</div>
</body>

</html>
