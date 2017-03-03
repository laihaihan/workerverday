<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="com.linewell.core.db.JDBCTool"%>
<%
	String server_property_sql_3 = "select x.* from (";
	server_property_sql_3 += "select t.dictname,t.dictvalue,t.sortid from apas_dict t ";
	server_property_sql_3 += "where t.dicttype='serviceProperty' and t.state='Y' order by t.sortid ";
	server_property_sql_3 += ") x where rownum<=30";
	String[][] server_property_4 = JDBCTool.doSQLQuery(GlobalParameter.APP_WAS,server_property_sql_3);
%>
<style type="text/css">
	.unit{
		border:1px solid #d4d4d4;
		background:url(images/property_top.gif) repeat-x left top;
		width:990px;margin:10px auto;
	}
	.unit_title{
		height:38px;line-height:38px;padding-left:13px;
		font-weight:bold;font-size:14px;
	}
	a.u_more{
		float:right;color:#a90000;margin-right:10px;
		font-size:12px;font-weight:normal;
	}
	.u_tab_div a{
		text-decoration:none;
	}
	.u_tab{
		float:left;
		background:url(images/property_tab_tip.gif) no-repeat right center;
		padding:0 7px;line-height:26px;
		margin-top:9px;color:#666;font-weight:normal;
	}
	.u_tab_no{
		float:left;padding:0 7px;
		line-height:26px;margin-top:9px;
		color:#666;font-weight:normal;
	}
	.u_tab_hover{
		float:left;
		background:url(images/property_tab_hover.gif) no-repeat right center;
		width:50px;text-align:center;
		line-height:26px;margin-top:9px;
		color:#666;font-weight:normal;
	}
	.ul_news{
		padding:5px 10px;padding-bottom:0;
	}
	.ul_news li{
		background:url() no-repeat left 11px;list-style:none;
		padding-left:10px;line-height:24px;
	}
	.ul_news li cite{
		font-style:normal;color:#aaa;float:right;
	}
	.ul_news li a{
		
	}
	.ul_news li span a{
		color:#a90000;
	}
</style>


<table width="990" border="0" align="center" cellpadding="0" cellspacing="0">
<tr><td>
	<div>
		<div class="unit">
			<div class="unit_title">
				<a href="#" class="u_more">&nbsp;</a>
				<div class="u_tab_div" id="tab01">
					<span class="u_tab_hover">个人</span>
					<span class="u_tab_no">企业</span>
					<span class="u_tab">类型</span>
				</div>
			</div>
			<div id="tabCon01">
				<ul class="ul_news">
					<li>
						&nbsp;&nbsp;&nbsp;&nbsp;<a>生育收养</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>户籍身份</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>婚姻家庭</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>医疗卫生</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>教育培训</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>职业资格</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>劳动就业</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>纳税服务</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>社会保障</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>土地房产</a>&nbsp;&nbsp;&nbsp;&nbsp;
						<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;<a>证件办理</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>出境入境</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>司法公证</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>殡葬服务</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>综合其他</a>&nbsp;&nbsp;&nbsp;&nbsp;
						<br/><br/>
					</li>
				</ul>
				<ul class="ul_news" style="display:none">
					<li>
						&nbsp;&nbsp;&nbsp;&nbsp;<a>注册登记</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>年检年审</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>破产注销</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>资质认证</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>市场准入</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>人力资源</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>企业纳税</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>财务管理</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>规费缴纳</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>质量管理</a>&nbsp;&nbsp;&nbsp;&nbsp;
						<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;<a>市场开发</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>招标投标</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>安全生产</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>项目投资</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>进 出 口</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>法律司法</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>交通运输</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>土地房产</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>项目投资</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>工程建设</a>&nbsp;&nbsp;&nbsp;&nbsp;
						<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;<a>基础设施</a>&nbsp;&nbsp;&nbsp;&nbsp;
						&nbsp;&nbsp;&nbsp;&nbsp;<a>综合其他</a>&nbsp;&nbsp;&nbsp;&nbsp;
					</li>
				</ul>
				<ul class="ul_news" style="display:none">
				<li>
					<% 
			        if(null != server_property_4 && server_property_4.length>1){
			          for(int i=1,j=server_property_4.length;i<j;i++){
			        	 if(i%11==0){out.println("<br/>");}
			        %>
			        &nbsp;&nbsp;&nbsp;&nbsp;<a><%=server_property_4[i][0] %></a>&nbsp;&nbsp;&nbsp;&nbsp;
			        <%
			          }
			        }
			        %>
			    </li>
				</ul>
			</div>
		</div>
	</div>
</td></tr></table>
<script type="text/javascript">
function tabAction(parNode,parCon){
	var tabs = document.getElementById(parNode).getElementsByTagName("span");
	var tabLength = tabs.length;
	var tabCon = document.getElementById(parCon).getElementsByTagName("ul");
	var tabConLength = tabCon.length;
	//初始化tab和tab content
	function initTab(){
		for(var i=0;i<tabLength;i++){
			tabs[i].className = "u_tab";
		}
		tabs[tabLength-1].className = "u_tab_no";
	}
	function initTabCon(){
		for(var i=0;i<tabConLength;i++){
			tabCon[i].style.display = "none";
		}
	}
	for(var i=0;i<tabLength;i++){
		tabs[i].theI = i;
		tabs[i].onclick = function(){
			var theI = this.theI;
			//被点击的tab显示为选中状态，同时显示相应的content
			initTab();
			initTabCon();
			this.className = "u_tab_hover";
			tabCon[theI].style.display = "block";
			//判断被点击tab的前一个tab,在非IE中可能为文本节点
			if(this.previousSibling){
				var preObj = this.previousSibling;
				if(this.previousSibling.nodeType==1){
					preObj.className = "u_tab_no";
				}
				else if(this.previousSibling.nodeType==3 && this.previousSibling.previousSibling){
					preObj = this.previousSibling.previousSibling;
					preObj.className = "u_tab_no";
				}
			}
			//去掉锚点的虚线框
			this.childNodes[0].blur();
		}
	}
}
tabAction("tab01","tabCon01");
</script>