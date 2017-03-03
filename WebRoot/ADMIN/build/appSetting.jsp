<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@page import="com.linewell.ucapx.form.FormUtilsApi"%>
<%@page import="com.linewell.ucapx.form.CommonFormApi"%>
<%@page import="com.linewell.ucap.platform.cache.form.Form"%>
<%@page import="com.linewell.ucap.util.UNIDGenerate"%>

<%
/**
 * 表单的最终展示页面,可处理主表或者从表的关系
 * @author xhuatang@linewell.com
 * @since 2011-07-14
 */
//表单的UNID
String formUnid = "E8C39880D4FE6B8E8D826F89272CC9DF";


String curDocUnid = request.getParameter("appUnid");


//当前文档新建或者修改标志，1:新增 2:修改
String isNew = "2";

//如果UNID不存在，则从后台生成UNID
if(StringUtils.isEmpty(curDocUnid)){
	UNIDGenerate generater = new UNIDGenerate();
	curDocUnid = generater.getUnid();
	isNew = "1";
}

FormUtilsApi fuApi = new FormUtilsApi();
fuApi.setAppPath(systemPath);

CommonFormApi commonApi = new CommonFormApi();
Form form = commonApi.getForm(formUnid);
%>

<html>
<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>系统信息 | 新建应用系统 —— 南威UACP支撑平台</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
<script language="javascript"
	src="<%=systemPath%>default/js/jquery-1.6.1.min.js"></script>
<script language="javascript"
	src="<%=systemPath%>default/js/linewell/linewell.core.js"></script>
<script language="javascript"
	src="<%=systemPath%>default/js/linewell/linewell.utils.js"></script>
<script language="javascript"
	src="<%=systemPath%>default/js/jquery.json-2.2.min.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript" src="../js/jquery.ucapform.js"></script>
<script language="javascript" src="../js/pageStep.js"></script>
<script language="javascript" src="../js/gb2py.js"></script>
<%@include file="../include/platformresources.jsp"%>
<link href="../style/build.css" rel="stylesheet" type="text/css" />

<!-- 
		//2012-08-07  mdy by wyongjian@linewell.com  
		//解决BUG1158-应用建模：系统配置页面滚动条没显示出来
	    //应用建模：系统配置页面添加滚动条样式		
	 -->
<style type="text/css">
	body{
		overflow:auto
	}
</style>
<script language="javascript">
//打开脚本调试
var JS_DEBUG = false;
//有附件上传时为0
var hasAttachment = "";
//流程参数
var flowParams = "";


(function($){

//初始化表单
lw.jqueryucapform.init({
    /**
     * 交互的url地址
     */
    extParams    : flowParams,
    
    /**
     * 主表单的UNID
     */
    mainFormUnid : "<%=formUnid%>",
    
    /**
     * 主表单的当前记录的UNID
     */
    mainUnid     : "<%=curDocUnid%>",   
    
    /**
     * 需要提交的表单对象，为空则为整个页面的表单对象
     */
    formName     : "",
    
    /**
     * 保存前要执行的逻辑
     */
    beforeSave   : function(){
        _UcapForm.tool.showLodingMsg();
    },
    
    /**
     * 保存后执行的逻辑
     */
    afterSave    : function(){
        var args = arguments;
        _UcapForm.tool.hideLodingMsg();
        if(args.length > 1){
            pageStep.canGoNext = true;           
        }else{
            Ext.Msg.alert("保存提示", "系统保存失败");
        }
    }
});




//页面加载后的脚本
$(function(){   
    
    /**
     * 单击打开表单标题的事件
     */
    $(".formTitle").click(function(){
        var $this = $(this);
        var tbId = "#" + $this.attr("openId");
        if($this.hasClass("open")){
            $(tbId).slideUp();
            $this.removeClass("open");
        }else{
            $(tbId).slideDown();
            $this.addClass("open");            
        }
    });
    
    //动态加载表单数据
    lw.jqueryucapform.loadData("<%=curDocUnid%>", 
        "<%=formUnid%>", "01", "<%=isNew%>");
        
    //中文输入的操作,获取拼音首字母    
    $("#app_name").blur(function(){
    
        //获取中文字符串
        var gbStr = $("#app_name").val();
        
        //获取拼音首字母
        var pyStr = getSpell(gbStr, true).toLowerCase();
        
        //设置英文字符串
        $("#app_name_en").val(pyStr);
        
        //设置系统显示名称
        $("#app_display_name").val(gbStr);
        
    });
    
    
});//页面加载后的脚本结束

})(jQuery);


/**
 * 验证表单
 * @return true为验证成功
 */ 
function validateForm(){
    if(!jQuery("#app_name").val()){
        alert("请输入系统名称！");
        jQuery("#app_name").focus();
        return false;
    }
    if(!jQuery("#app_name_en").val()){
        alert("请输入系统英文名称！");
        jQuery("#app_name_en").focus();
        return false;
    }
    if(!jQuery("#app_display_name").val()){
        alert("请输入显示名称！");
        jQuery("#app_display_name").focus();
        return false;
    }
    if(!/^[a-z]+$/.test(jQuery("#app_name_en").val())){
        alert("系统英文名称只能输入小写的英文字母！");
        jQuery("#app_name_en").focus();
        return false;
    }
    return true;
}
//定义上一步的链接
pageStep.preUrl = "";

//定义下一步的链接
pageStep.nextUrl = "dbSetting.jsp?appUnid=<%=curDocUnid%>";

/**
 * 处理下一步的逻辑
 */
pageStep.nextAction = function(){
	window.parent.appName = jQuery("#app_name").val();
    //系统提交验证信息
    if(validateForm()){
        linewell.jqueryucapform.save();
    }    
}

</script>
	</head>
	<body>
		<div id="ucap_<%=formUnid%>">
			<input type="hidden" id="_ucap_doc_unid_<%=formUnid%>"
				name="_ucap_doc_unid" formUnid="<%=formUnid%>"
				value="<%=curDocUnid%>" />
			<input type="hidden" id="_ucap_doc_flag_<%=formUnid%>"
				name="_ucap_doc_flag" formUnid="<%=formUnid%>" value="<%=isNew%>" />
			<div class="formTitle open" openId="tbBase">
				基本信息
			</div>
			<div id="tbBase">
				<table class="tableSet3" align="center" border="0">
					<colgroup>
						<col width="20%">
						
					</colgroup>
					<tr>
						<th>
							<span class="red">*</span>系统名称：
						</th>
						<td colspan="3"><%=fuApi.getHtml(form, "app_name", "")%></td>
					</tr>
					<tr>
					</tr>
					<tr>
						<th>
							<span class="red">*</span>系统英文名称：
						</th>
						<td colspan="3"><%=fuApi.getHtml(form, "app_name_en", "")%></td>
					</tr>
					<tr>
						<th>
							<span class="red">*</span>显示名称：
						</th>
						<td colspan="3"><%=fuApi.getHtml(form, "app_display_name", "")%></td>
					</tr>
					<tr>
				</table>
			</div>

			<!-- 标题 -->
			<div class="formTitle" openId="tbAdv">
				高级选项
			</div>

			<div id="tbAdv" style="display: none;">
				<table class="tableSet3" align="center" border="0">
					<colgroup>
						<col width="20%">
						<col width="30%">
						<col width="20%">
						<col width="30%">
					</colgroup>
					<tr>
					<th>
						前置图标：
					</th>
					<td colspan="3"><%=fuApi.getHtml(form, "app_picture", "")%></td>
					</tr>
					<tr>
						<th>
							<span class="red">*</span>应用系统管理员：
						</th>
						<td><%=fuApi.getHtml(form, "app_admins", "")%></td>
						<th>
							单位级数：
						</th>
						<td><%=fuApi.getHtml(form, "app_dept_level", "")%></td>
					</tr>
					<tr>
						<th>
							<span class="red">*</span>是否禁用：
						</th>
						<td><%=fuApi.getHtml(form, "app_forbid", "")%></td>
						<th>
							<span class="red">*</span>是否显示版权信息：
						</th>
						<td><%=fuApi.getHtml(form, "app_copyright", "")%></td>
					</tr>
					<tr>
						<th>
							<span class="red">*</span>是否启用登陆日志：
						</th>
						<td><%=fuApi.getHtml(form, "app_login_log", "")%></td>
						<th>
							<span class="red">*</span>是否启用操作日志：
						</th>
						<td><%=fuApi.getHtml(form, "app_operate_log", "")%></td>
					</tr>
					<tr>
						<th>
							<span class="red">*</span>是否需要回收站：
						</th>
						<td><%=fuApi.getHtml(form, "app_recycle", "")%></td>
						<th>
							回收站文件地址：
						</th>
						<td><%=fuApi.getHtml(form, "app_recycle_path", "")%></td>
					</tr>
					<tr>
						<th>
							使用范围：
						</th>
						<td colspan="3"><%=fuApi.getHtml(form, "app_use_scopes", "")%></td>
					</tr>
					<tr>
						<th>
							不能使用范围：
						</th>
						<td colspan="3"><%=fuApi.getHtml(form, "app_unuse_scopes", "")%></td>
					</tr>
					<tr>
						<th>
							允许再次配置的部门：
						</th>
						<td colspan="3"><%=fuApi.getHtml(form, "app_edit_depts", "")%><img
								title="帮助" onclick="searchHelp('appConfig_againConf')"
								src="<%=systemPath%>uistyle/images/help.gif">
						</td>
					</tr>
					<tr>
						<th>
							可自定义的用户组：
						</th>
						<td colspan="3"><%=fuApi.getHtml(form, "app_edit_users", "")%></td>
					</tr>
					<tr>
						<th>
							不可自定义的用户组：
						</th>
						<td colspan="3"><%=fuApi.getHtml(form, "app_unedit_users", "")%></td>
					</tr>
					<tr>
						<th>
							表单HTML相对保存路径：
						</th>
						<td colspan="3"><%=fuApi.getHtml(form, "app_form_html_path", "")%></td>
					</tr>
					<tr>
						<th>
							<span class="red">*</span>附件保存在数据库：
						</th>
						<td><%=fuApi.getHtml(form, "app_attr_is_save_db", "")%></td>
						<th>
							<span class="red">*</span>普通附件地址：
						</th>
						<td><%=fuApi.getHtml(form, "app_attr_path", "")%><img
								title="帮助" onclick="searchHelp('appConfig_att')"
								src="<%=systemPath%>uistyle/images/help.gif">
						</td>
					</tr>
					<tr>
						<th>
							<span class="red">*</span>模板保存在数据库：
						</th>
						<td><%=fuApi.getHtml(form, "app_attr_cfg_is_save_db", "")%></td>
						<th>
							<span class="red">*</span>模板附件地址：
						</th>
						<td><%=fuApi.getHtml(form, "app_attr_config_path", "")%></td>
					</tr>
					<tr>
						<th>
							<span class="red">*</span>单个文件最大值：
						</th>
						<td><%=fuApi.getHtml(form, "app_attr_file_size_max_index", "")%>（M）
						</td>
						<th>
							<span class="red">*</span>批量上传最大值：
						</th>
						<td><%=fuApi.getHtml(form, "app_attr_size_max", "")%>（M）
						</td>
					</tr>
					<tr>
						<th>
							复制的接口实现：
						</th>
						<td colspan="3"><%=fuApi.getHtml(form, "app_copy_interface", "")%>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</body>
</html>