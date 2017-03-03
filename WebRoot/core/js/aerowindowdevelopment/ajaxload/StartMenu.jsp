<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.db.JDBCTool"%>
<%@page import="com.linewell.core.module.ModuleLeafManager"%>
<%@page import="com.linewell.core.module.ModuleLeaf"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@include file="/core/params.jsp" %>
<%
	ModuleLeafManager moduleLeafManager = new ModuleLeafManager();

	String sql = "select module_unid, t.module_display_name, t.module_childrens, leaf_unid";
	sql = sql + " from ucap_module t, ucap_menu_leaf l";
	sql = sql + " where t.module_unid = l.leaf_content";
	sql = sql + " and t.module_belong_to_app = '02EA829BF2BA1F4FF0F49145A502C353'";
	StringBuffer menuAndModuleHtml = new StringBuffer();
	Object[][] rs = JDBCTool.doSQLQuery("proxool", sql, new Object[0]);
	for (int i = 1; i < rs.length; i++) {
		//一级菜单
		menuAndModuleHtml.append("<li onclick=showSunModule('"+rs[i][3]+"') id="+rs[i][3]+"><span><img src='/app/core/js/aerowindowdevelopment/images/Startmenu/wenjianjia.jpg'/>"+rs[i][1]+"</span></li>");
		menuAndModuleHtml.append("<div id='belongto_"+rs[i][3]+"' style='display:none'>");
		
		//二级菜单
		String[] twoLevlModule = rs[i][2].toString().split(",");
		if(null != twoLevlModule && twoLevlModule.length >0){
			for(int twoInt = 0 ;twoInt < twoLevlModule.length ; twoInt ++){
				ModuleLeaf moduleLeaf = moduleLeafManager.doFindBeanByKey(twoLevlModule[twoInt]);
				if(null != moduleLeaf){
					menuAndModuleHtml.append("<li  onclick=showSunModule('"+moduleLeaf.getLeaf_unid()+"') id="+moduleLeaf.getLeaf_unid()+"><span>&nbsp;&nbsp;&nbsp;&nbsp;<img src='/app/core/js/aerowindowdevelopment/images/Startmenu/wenjianjia.jpg'/>"+moduleLeaf.getLeaf_name()+"</span></li>");
					menuAndModuleHtml.append("<div id='belongto_"+moduleLeaf.getLeaf_unid()+"' style='display:none'>");

					//三级菜单
					String[] threeLevlModule = moduleLeaf.getLeaf_childrens().split(",");
					if(null != threeLevlModule && threeLevlModule.length > 0){
						for(int threeInt = 0 ;threeInt < threeLevlModule.length ; threeInt ++){
							ModuleLeaf moduleLeafThree = moduleLeafManager.doFindBeanByKey(threeLevlModule[threeInt]); 
							if(null != moduleLeafThree){
								System.out.println(moduleLeafThree.getLeaf_small_picture());
								String moduleImgPath = moduleLeafThree.getLeaf_small_picture();
								if(StrUtil.isNull(moduleLeafThree.getLeaf_small_picture())){
									moduleImgPath = "/app/uistyle/images/icon/icon_151.gif";
								}
								menuAndModuleHtml.append("<li><span onclick='winOpen()'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='"+moduleImgPath+"'/>"+moduleLeafThree.getLeaf_name()+"</span></li>");
							}
						}
					}
					menuAndModuleHtml.append("</div>");
				}
				
			}
		}
		
		menuAndModuleHtml.append("</div>");
	}

%>
<script type="text/javascript" src="${corejs}/lw-ui/globalvar.js"></script>
<table border="0" cellspacing="0" cellpadding="0" id="starttable">
  <tr>
    <td class="smtl sm-tl"></td>
    <td class="smtm sm-tm"></td>
    <td class="smtr sm-tr"></td>
  </tr>
  <tr>
    <td class="sm-lm"></td>
    <td class="sm-bg">
    	<div id="StartMContaiter">
          <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td valign="top">
              <ul id="NavItemsLeft" class="NavItems">
                <%=menuAndModuleHtml%>
              </ul>
            </td>
            <td valign="top" >
             <ul id="NavItemsCenter" class="NavItems">
             </ul>
            </td>
            <td valign="top">
             <ul id="NavItemsRight" class="NavItems"></ul>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </table>
        </div>
    </td>
    <td class="sm-rm"></td>
  </tr>
  <tr>
    <td class="smbl"></td><!--class="sm-lm"-->
    <td class="smbm"></td><!--class="sm-bm"-->
    <td class="smbr"></td><!--class="sm-rm"-->
  </tr>
</table>


	<script type="text/javascript">
	$(function(){
		//1.获取平台模块权限JSON数据
			$.ajax({
				type: 'post',
				cache:false,
				url:globalSession.ucapBaseAction,
				dataType:'text',
				data:{
					type:"menu",
					act:"getAllMenu",
					menuType:"1"
				},
				error:function(){
					top.location.href=appPath+"/login.jsp";
				},
				success:function(response){
					if(response.length==0){
						alert('对不起!您的用户未分配权限,请您联系管理人员');
						return;
					}				
					var data = "{root:"+response+"}";							
					var dataObj=eval("("+data+")");
					
					//动态添加所有一级菜单
					var mainMenu = "";	
					$.each(dataObj.root,function(index,item){
						if("03"!=item.type){
							mainMenu = mainMenu + "<li onclick='javascript:alert()'><span>"+item.text+"</span>";
						}
					});
					//$("#NavItemsLeft").html(mainMenu);
									
				}
			});
	});
		
	function showSunModule(unid){
		if($("#belongto_"+unid).css("display")=="none"){
			$("#belongto_"+unid).css("display","");
		}else{
			$("#belongto_"+unid).css("display","none");
		}
	}
	</script>