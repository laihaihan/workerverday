<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.linewell.ess.util.DateUtil"%>
<%@page import="com.linewell.core.db.JDBCTool"%>
<%@page import="java.sql.SQLException"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="com.linewell.core.db.JdbcFactory"%>
<%@page import="com.linewell.core.db.JdbcSession"%>
<%@page import="java.util.*" %>
<%@ include file="/officeportal/xjzhbgmh/comm/taglibs.jsp"%>
<%
	//获取部门、乡镇事项统计
	StringBuffer sql = new StringBuffer();
	sql.append("SELECT T.DEPT_UNID,T.DEPT_NAME,T2.COUNTS");
	sql.append(" FROM UCAP_DEPT T,");
	sql.append(" (SELECT DEPTUNID,COUNT(1) AS COUNTS FROM WAS2.APAS_SERVICE GROUP BY DEPTUNID) T2");
	sql.append(" WHERE T.DEPT_UNID=T2.DEPTUNID AND T.DEPT_BELONGTO='88001'");
	sql.append(" ORDER BY T.DEPT_SORT");
	List<Map<String, Object>> deptList = new ArrayList<Map<String, Object>>();
	List<Map<String, Object>> countyList = new ArrayList<Map<String, Object>>();
	try {
		JdbcSession jdbcSession = JdbcFactory.getSession(GlobalParameter.APP_UCAP);
		deptList = jdbcSession.queryForList(sql.toString());
		countyList = jdbcSession.queryForList(sql.toString().replace("88001", "7230E4A077F8C381A0D75FD95CF67767"));
	} catch (SQLException e) {
		e.printStackTrace();
	}
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=gb2312" />
    <title>统一办公门户</title>
    <link href="${portalPath}css/css.css" rel="stylesheet" type="text/css" />
    <%@include file="/officeportal/xjzhbgmh/comm/script.jsp"%>
  </head>
<body>
    <%-- 头部 S--%>
    <jsp:include page="include/top.jsp"></jsp:include>
    <%-- 头部 E--%>
	<%-- 每日新闻
	<table width="1000" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td height="31" align="center" valign="bottom" background="${portalPath}images/Inv_bg_2.jpg"><table width="95%" border="0" cellspacing="0" cellpadding="0">
	      <tr>
	        <td width="80" height="25" class="red_12b"><img src="${portalPath}images/inc_3.gif" width="6" height="9" /> 每日新闻： </td>
	        <td height="25" align="left">
	        <a href="#">1.我市规模以上工业产值连续21个月保持20%以上增速</a>&nbsp;&nbsp;    
	        <a href="#">2.我市规模以上工业产值连续21个月保持20%以上增速</a>&nbsp;&nbsp;  
	        <a href="#">3.我市规模以上工业产值连续21个月保持20%....</a></td>
	      </tr>   
	    </table></td>
	  </tr>
	</table>
	 本日新闻END --%>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
	  <tr><td><img src="${portalPath}images/1px_Tran.gif" width="100%" height="5" /></td></tr>
	</table>
	<%-- 登录框、新闻资讯、通知公告  S --%>
	<table width="990" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td width="290" align="left" valign="top"><table width="284" border="0" cellspacing="0" cellpadding="0">
	      <tr>
	        <td height="27" align="left" valign="bottom" background="images/login_menu.gif" class="white_14b"><table width="100%" border="0" cellspacing="0" cellpadding="0">
	            <tr>
	              <td width="45" height="23">　</td>
	              <td>用户登录</td>
	            </tr>
	        </table></td>
	      </tr>
	      <tr>
	        <td><table width="100%" border="0" cellpadding="0" cellspacing="1" style="background:url(images/login_box_bg.gif) no-repeat center bottom;border:#C4C4C4 1px solid;border-top:none;">
	          <tr>
	            <td height="198" align="center" valign="top">
	            <div style="padding-top:30px;padding-left:10px;">
	            	<%@include file="include/login.jsp" %>
					<input type="hidden" value="" name="tmp_uname" id="tmp_uname"/>
					<input type="hidden" value="" name="tmp_upwd" id="tmp_pwd"/>
				</div>
	            </td>
	          </tr>
	        </table></td>
	      </tr>
	    </table></td>
	    <td width="480" align="left" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0">
	      <tr>
	        <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
	          <tr>
	            <td width="126" height="27" align="right" valign="bottom" background="images/news_2.jpg">
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr>
	                <td height="23" align="right" class="white_14b">新闻资讯&nbsp;&nbsp;</td>
	              </tr>
	            </table>
				</td>
				<td align="right" class="red_12b">
				站内搜索：<input type="text" name="textfield" />
	              <input name="Submit" type="submit" class="btn" value="提交" />
				</td>			
	          </tr>
	        </table></td>
	      </tr>
	      <tr>
	        <td><table width="100%" border="0" cellpadding="0" cellspacing="1" bgcolor="#C4C4C4">
	          <tr>
	            <td height="199" valign="top" bgcolor="#FFFFFF">
	            <table width="96%" border="0" align="center" cellpadding="5" cellspacing="0">
	            <%-- 共7条 最新新闻资讯 --%>
	            <% 
	            	String new_art_sql = "select t.* from (";
	            	new_art_sql += "select article_title as art_title,article_deptname as art_dname,";
	            	new_art_sql += "substr(x.article_publishdate,3,8) as art_publishdate,article_unid ";
	            	new_art_sql += "from cms_article x,cms_category y ";
	            	new_art_sql += "where x.article_cateunid = y.category_unid ";
	            	new_art_sql += "and y.category_usable='1' and x.article_status='1' ";
	            	new_art_sql += "and y.category_unid='7326EE9446DEB5F65EB705B6626ED2C4' ";
	            	new_art_sql += "order by x.article_publishdate desc ";
	            	new_art_sql += ") t where rownum<=7";
	            	String[][] new_art_array = JDBCTool.doSQLQuery(pxl_cms, new_art_sql);
	            %>
	            <% 
	            	if(null != new_art_array && new_art_array.length>1){
	            		for(int i=1,j=new_art_array.length;i<j;i++){
	            			String temp = new_art_array[i][0];
	            %>
	            	<tr>
		               <td class="news_list_1"><img src="images/inc_4.gif" width="10" height="10" />&nbsp;&nbsp;
		               <a href="${portalPath}websend/newDetail.jsp?atrunid=<%=new_art_array[i][3] %>" title="<%=temp%>" target="_blank">
		               <%=temp.length()>20?temp.substring(0,20)+"······":temp %></a></td>
		               <td width="50" class="news_list_1"><span><%=new_art_array[i][2] %></span></td>
		               <td width="60" class="news_list_1">[<%=new_art_array[i][1] %>]</td>
		            </tr>
	            <%			
	            		}
	            	}
	            %>
	            </table></td>
	            </tr>
	        </table></td>
	      </tr>
	    </table></td>
	    <td align="right" valign="top"><table width="210" border="0" cellspacing="0" cellpadding="0">
	      <tr>
	        <td height="27" align="left" valign="bottom" background="images/news_3.gif" class="white_14b"><table width="100%" border="0" cellspacing="0" cellpadding="0">
	          <tr>
	            <td width="50" height="23">　</td>
	            <td>公告公示</td>
	          </tr>
	        </table></td>
	      </tr>
	      <tr>
	        <td><table width="100%" border="0" cellpadding="5" cellspacing="1" bgcolor="#CECCCD">
	          <tr>
	            <td height="167" align="left" bgcolor="#FFFFFF">
				<marquee align="top" behavior="scroll" direction="up" scrollamount="1" scrolldelay="10" height="150px" loop="-1" onMouseOver="stop()" onMouseOut="start()" >
				  <%-- 共10条 最新通知公告 --%>
				  <% 
				  	//3605819FF2F38F4BB06EED34ADE88F9D代表公示公告栏目
				  	String notice_art_sql = "select t.* from (";
				  	notice_art_sql += "select article_title as art_title,article_deptname as art_dname,";
				  	notice_art_sql += "substr(x.article_publishdate,3,8) as art_publishdate,article_unid ";
				  	notice_art_sql += "from cms_article x,cms_category y ";
				  	notice_art_sql += "where x.article_cateunid = y.category_unid ";
				  	notice_art_sql += "and y.category_usable='1' and x.article_status='1' ";
				  	notice_art_sql += "and y.category_unid='3605819FF2F38F4BB06EED34ADE88F9D' ";
				  	notice_art_sql += "order by x.article_publishdate desc ";
				  	notice_art_sql += ") t where rownum<=10";
				  	String[][] notice_art_array = JDBCTool.doSQLQuery(pxl_cms, notice_art_sql);
				  %>
				  <% 
	            	if(null != notice_art_array && notice_art_array.length>1){
	            		for(int i=1,j=notice_art_array.length;i<j;i++){
	            			String temp = notice_art_array[i][0];
	              %>
	              	<p><img src="images/inc_210.gif" width="8" height="7" />&nbsp;&nbsp;
	              	<a href="${portalPath}websend/noticeDetail.jsp?atrunid=<%=notice_art_array[i][3] %>" title="<%=temp%>" target="_blank">
	              	<%=temp%></a></p>
	              <%			
	            		}
	            	}
	              %>
	            </marquee>
	            </td>
	          </tr>
	        </table></td>
	      </tr>
	      <tr>
	        <td><a href="#"><img src="images/news_4.gif" width="210" height="22" border="0"/></a></td>
	      </tr>
	    </table></td>
	  </tr>
	</table>
	<%-- 登录框、新闻资讯、通知公告  E --%>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
	  <tr><td><img src="images/1px_Tran.gif" width="100%" height="8" /></td></tr>
	</table>
	<%-- 图片新闻 
	<table width="990" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td>
		<table width="990" border="0" align="center" cellpadding="0" cellspacing="5">
	      <tr>
	        <td align="center"><img src="images/marquee_pic_1.jpg" width="142" height="102" /></td>
	        <td align="center"><img src="images/marquee_pic_1.jpg" width="142" height="102" /></td>
	        <td align="center"><img src="images/marquee_pic_1.jpg" width="142" height="102" /></td>
	        <td align="center"><img src="images/marquee_pic_1.jpg" width="142" height="102" /></td>
	        <td align="center"><img src="images/marquee_pic_1.jpg" width="142" height="102" /></td>
	        <td align="center"><img src="images/marquee_pic_1.jpg" width="142" height="102" /></td>
	      </tr>
	      <tr>
	        <td align="center"><a href="#">全省发展改革工作座谈会</a></td>
	        <td align="center"><a href="#">全省发展改革工作座谈会</a></td>
	        <td align="center"><a href="#">全省发展改革工作座谈会</a></td>
	        <td align="center"><a href="#">全省发展改革工作座谈会</a></td>
	        <td align="center"><a href="#">全省发展改革工作座谈会</a></td>
	        <td align="center"><a href="#">全省发展改革工作座谈会</a></td>
	      </tr>
	    </table>
		</td>
	  </tr>
	</table>
	图片新闻END --%>
	<%-- 第三行 S 
	<table width="990" border="0" align="center" cellpadding="0" cellspacing="0">
	  <tr>
	    <td width="770"><table width="100%" border="0" cellspacing="0" cellpadding="0">
	      <tr>
	        <td><img src="images/text_pic_1.jpg" width="770" height="30" /></td>
	      </tr>
	      <tr>
	        <td height="248" align="center" valign="top" background="images/text_pic_2.jpg">
	        <table width="100%" border="0" cellspacing="5" cellpadding="0">
	          <tr>
	            <td width="50%" align="left" valign="top"><table width="96%" border="0" align="center" cellpadding="5" cellspacing="0">
	              <tr>
	                <td height="19" align="left" class="news_list_2"><img src="images/inc_4.gif" width="10" height="10" />
	                	<a>关于江西宏成铝业有限公司的房屋所有权初始...... </a>
	                </td>
	                <td class="news_list_2">[办结]</td>
	              </tr>
	              <tr>
	                <td height="19" align="left" class="news_list_2"><img src="images/inc_4.gif" width="10" height="10" />
	                	<a>关于熊爱辉李国保的的审批</a>
	                </td>
	                <td class="news_list_2">[办结]</td>
	              </tr>
	              <tr>
	                <td height="19" align="left" class="news_list_2"><img src="images/inc_4.gif" width="10" height="10" />
	                	<a>关于上塘二小的的审批</a>
	                </td>
	                <td class="news_list_2">[办结]</td>
	              </tr>
	            </table></td>
	            <td width="50%" align="left">
	            <table width="96%" border="0" align="center" cellpadding="5" cellspacing="0">
	              <tr>
	                <td height="19" align="left" class="news_list_2"><img src="images/inc_4.gif" width="10" height="10" />
	                	<a>关于朱建军的房屋所有权初始登记的审批</a>
	                </td>
	                <td class="news_list_2">[审核中]</td>
	              </tr>
	              <tr>
	                <td height="19" align="left" class="news_list_2"><img src="images/inc_4.gif" width="10" height="10" />
	                	<a>关于石滩初中的的审批</a>
	                </td>
	                <td class="news_list_2">[审核中]</td>
	              </tr>
	              <tr>
	                <td height="19" align="left" class="news_list_2"><img src="images/inc_4.gif" width="10" height="10" />
	                	<a>关于教育局的的审批</a>
	                </td>
	                <td class="news_list_2">[审核中]</td>
	              </tr>
	            </table></td>
	          </tr>
	        </table></td>
	      </tr>
	      <tr>
	        <td><img src="images/text_pic_3.jpg" width="770" height="10" /></td>
	      </tr>
	    </table></td>
	    <td align="right" valign="top"><table width="206" border="0" cellpadding="2" cellspacing="1" bgcolor="#CCCCCC">
	      <tr>
	        <td align="center" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
	          <tr>
	            <td><img src="images/button_1.jpg" width="200" height="39" /></td>
	          </tr>
	          <tr>
	            <td><img src="images/button_2.jpg" width="200" height="34" /></td>
	          </tr>
	          <tr>
	            <td><img src="images/button_3.jpg" width="200" height="36" /></td>
	          </tr>
	          <tr>
	            <td><img src="images/button_4.jpg" width="200" height="34" /></td>
	          </tr>
	          <tr>
	            <td><img src="images/button_5.jpg" width="200" height="30" /></td>
	          </tr>
	          <tr>
	            <td><img src="images/button_6.jpg" width="200" height="35" /></td>
	          </tr>
	          <tr>
	            <td><img src="images/button_7.jpg" width="200" height="33" /></td>
	          </tr>
	          <tr>
	            <td><img src="images/button_8.jpg" width="200" height="33" /></td>
	          </tr>
	        </table></td>
	      </tr>
	    </table></td>
	  </tr>
	</table>
	<%-- 第三行 E --%>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
  	<tr><td><img src="images/1px_Tran.gif" width="100%" height="5" /></td></tr>
  	</table>
	<%-- 部门信息 S --%>
	<table width="990" border="0" align="center" cellpadding="1" cellspacing="1" bgcolor="#AFB7CC">
	  <tr>
	    <td bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
	      <tr>
	        <td height="26" background="images/text_pic_4.jpg" bgcolor="#9DCDF8"><table width="96%" border="0" align="center" cellpadding="0" cellspacing="0">
	          <tr>
	            <td width="25" align="left" valign="bottom" class="black_14b"><img src="images/inc_3.gif" width="16" height="15" /></td>
	            <td align="left"><span class="black_14b">部门信息 </span></td>
	            <td width="20" align="left" valign="bottom"><img src="images/inc_5.gif" width="15" height="16" /></td>
	            <td width="30" align="left" valign="bottom"><a href="service/serviceList.jsp?deptbelong=88001&belongtype=1" target="_blank">更多</a></td>
	          </tr>
	        </table></td>
	      </tr>
	      <tr>
	        <td><table width="100%" border="0" cellspacing="4" cellpadding="0">
	          <tr>
	          	<%-- 部门列表统计S --%>
	            <td width="480"><table width="100%" border="0" cellpadding="4" cellspacing="1" bgcolor="#7ABBE3">
	              <tr>
	                <td height="20" align="center" background="images/text_pic_5.gif" bgcolor="#E8F2FC" class="blue_14b">部门事项信息</td>
	              </tr>
	              <tr>
	                <td bgcolor="#FFFFFF">
	                <table width="100%" border="0" cellpadding="1" cellspacing="1" bgcolor="#ACD1EE">
	                  <%
	                  	int deptSize = deptList.size();
	                    for(int i=0;i<deptSize;i+=4){
	                    	out.print("<tr>");
	                    	for(int j=0;j<4;j++){
	                    		if(i+j>=deptSize)continue;
	                    		Map map = deptList.get(i+j);
	                    		if(map == null){
	                    			continue;
	                    		}
	                    		String deptName = map.get("DEPT_NAME").toString();
	                    		String deptUnid = map.get("DEPT_UNID").toString();
	                    		String counts = map.get("COUNTS").toString();
	                    		String bgColor = j%2 == 0?"#E6F0FA":"#F8F8F8";
	                  %>
	                    <td width="25%" bgcolor="<%=bgColor%>">
	                    <table width="100%" border="0" cellpadding="5" cellspacing="0">
	                      <tr>
	                        <td height="1"><a href="service/serviceList.jsp?deptunid=<%=deptUnid %>" target="_blank"><%=deptName %></a> <span class="red_12"><%=counts %> </span>项</td>
	                      </tr>
	                    </table></td>		
	                  <%
	                    	}
	                    	out.print("</tr>");
	                    }
	                  %>	
	                  
	                </table></td>
	              </tr>
	            </table></td><%-- 部门列表统计E --%>
	            <%-- 部门事项列表S --%>
	            <td align="center" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr>
	                <td width="50%" align="left"><table width="98%" border="0" align="center" cellpadding="4" cellspacing="0">
	                  <% 
	                  	String dept_server_sql = "select x.* from (";
	                  	dept_server_sql += "select t.unid,t.infoprojid,t.servicename,t.showtype,t.deptunid,t.deptname ";
	                  	dept_server_sql += "from apas_service t ";
	                  	dept_server_sql += "where t.state='Y' and t.showtype not in ('1','4') ";
	                  	dept_server_sql += ") x where rownum<=16";
	                  	String[][] dept_server_array = JDBCTool.doSQLQuery(GlobalParameter.APP_WAS,dept_server_sql);
	                  %>
	                  <% 
		            	if(null != dept_server_array && dept_server_array.length>1){
		            		for(int i=1,j=dept_server_array.length;i<j;i++){
		            			String temp = dept_server_array[i][2];
		              %>
		              <tr>
	                    <td class="news_list_3"><img src="images/inc_210.gif" width="8" height="7" />&nbsp;&nbsp;
	                    <a href="${portalPath}service/serviceDetail.jsp?unid=<%=dept_server_array[i][0] %>" title="<%=temp %>" target="_blank">
	                    <%=temp.length()>25?temp.substring(0,25)+"······":temp %></a></td>
	                    <td class="news_list_3">[<%=dept_server_array[i][5] %>]</td>
	                  </tr>
		              <%			
		            		}
		            	}
		              %>
	                </table>
	               	</td>
	             </tr>
	            </table></td>
	            <%-- 部门事项列表E --%>
	          </tr>
	        </table></td>
	      </tr>
	    </table></td>
	  </tr>
	</table>
	<%-- 部门信息 E --%>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
  	<tr><td><img src="images/1px_Tran.gif" width="100%" height="8" /></td></tr>
  	</table>
  	<%-- 乡镇、社区信息 S --%>
  	<table width="990" border="0" align="center" cellpadding="0" cellspacing="0">
  	<tr>
    <td width="496" align="left" valign="top"><table width="700" border="0" cellpadding="1" cellspacing="1" bgcolor="#AFB7CC">
      <tr>
        <td bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td height="26" background="images/text_pic_4.jpg" bgcolor="#9DCDF8"><table width="96%" border="0" align="center" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="25" align="left" valign="bottom" class="black_14b"><img src="images/inc_3.gif" width="16" height="15" /></td>
                    <td align="left" class="black_14b">乡镇、街道、社区信息</td>
                    <td width="20" align="left" valign="bottom"><img src="images/inc_5.gif" width="15" height="16" /></td>
                    <td width="30" align="left" valign="bottom"><a href="service/serviceList.jsp?deptbelong=7230E4A077F8C381A0D75FD95CF67767&belongtype=2" target="_blank">更多</a></td>
                  </tr>
              </table></td>
            </tr>
            <tr>
              <td><table width="100%" border="0" cellpadding="0" cellspacing="5">
                <tr>
                  <td width="200"><table width="194" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td height="31" align="center" background="images/text_pic_6.jpg" class="red_14b">全市统计信息</td>
                    </tr>
                    <tr>
                      <td><img src="images/text_pic_7.jpg" width="194" height="239" border="0" usemap="#Map2" /></td>
                    </tr>
                    <tr>
                      <td bgcolor="#D7E0FD"><table width="100%" border="0" cellspacing="3" cellpadding="5">
                        <tr>
                          <td bgcolor="#FFFFFF" class="text_content">
	                      <%
		                  	int countySize = countyList.size();
		                    for(int i=0;i<countySize;i+=2){
		                    	
		                    	for(int j=0;j<2;j++){
		                    		if(i+j>=countySize)continue;
		                    		Map map = countyList.get(i+j);
		                    		if(map == null){
		                    			continue;
		                    		}
		                    		String deptName = map.get("DEPT_NAME").toString();
		                    		String deptUnid = map.get("DEPT_UNID").toString();
		                    		String counts = map.get("COUNTS").toString();
		                    		out.print("<a href='service/serviceList.jsp?deptunid="+deptUnid+"' target='_blank'>"+deptName+"</a>");
		                    		out.print("<span class='red_12'>"+counts+"</span> 条");
		                    		out.print("&nbsp;&nbsp;&nbsp;");
		                    	}
		                    	out.print("<br/>");
		                    }
		                  %>
	                  </td>
                        </tr>
                      </table></td>
                    </tr>
                  </table></td>
                  <td align="left" valign="top"><table width="100%" border="0" align="center" cellpadding="5" cellspacing="0">
                    <% 
	                  	String jzsq_server_sql = "select x.* from (";
	                  	jzsq_server_sql += "select t.unid,t.infoprojid,t.servicename,t.showtype,t.deptunid,t.deptname ";
	                  	jzsq_server_sql += "from apas_service t,ucap2.ucap_dept y where t.state='Y' and t.showtype not in ('1','4') ";
	                  	jzsq_server_sql += "and t.deptunid=y.dept_unid and y.dept_belongto='7230E4A077F8C381A0D75FD95CF67767' ";
	                  	jzsq_server_sql += ") x where rownum<=16";
	                  	String[][] jzsq_server_array = JDBCTool.doSQLQuery(GlobalParameter.APP_WAS,jzsq_server_sql);
	                  %>
	                  <% 
		            	if(null != jzsq_server_array && jzsq_server_array.length>1){
		            		for(int i=1,j=jzsq_server_array.length;i<j;i++){
		            			String temp = jzsq_server_array[i][2];
		              %>
		              <tr>
	                    <td class="news_list_3"><img src="images/inc_210.gif" width="8" height="7" />&nbsp;&nbsp;
	                    <a href="${portalPath}service/serviceDetail.jsp?unid=<%=jzsq_server_array[i][0] %>" title="<%=temp %>" target="_blank">
	                    <%=temp.length()>25?temp.substring(0,25)+"······":temp %></a></td>
	                    <td class="news_list_3">[<%=jzsq_server_array[i][5] %>]</td>
	                  </tr>
		              <%			
		            		}
		            	}
		              %>
                  </table></td>
                </tr>
              </table></td>
            </tr>
        </table></td>
      </tr>
    </table></td>
    <td width="494" align="right" valign="top">
    <!--table1-->
    <table width="279" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td height="27" align="left" valign="bottom" background="images/text_pic_8.jpg" class="white_14b"><table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td width="50" height="23">　</td>
              <td>办件统计</td>
            </tr>
        </table></td>
      </tr>
      <tr valign="top">
        <td><table width="100%" border="0" cellpadding="5" cellspacing="1" bgcolor="#CECCCD">
            <tr>
              <td align="left" valign="top" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td valign="top">
                  	<div style="height:120px;padding-top:15px;padding-left:40px;">
                  	<% 
                  		String curr_day = DateUtil.getNowDate();//获取当前时间
                  		String banjian_count_sql = "select count(t.handlestate) as sum_banjian,";//累积办件
                  		banjian_count_sql += "sum(decode(t.handlestate,'办结',1,0)) as sum_banjie,";//累积办结
                  		banjian_count_sql += "sum(decode(substr(t.CREATE_TIME,1,10),'"+curr_day+"',1,0)) as br_banjian,";//本日办件
                  		banjian_count_sql += "sum(decode(t.handlestate,'办结',(";//本日办结
                  		banjian_count_sql += "decode(substr(t.NODE_ETIME,1,10),'"+curr_day+"',1,0)";
                  		banjian_count_sql += "),0)) as br_banjei ";
                  		banjian_count_sql += "from apas_info t ";
                  		String[][] banjian_count_array = JDBCTool.doSQLQuery(GlobalParameter.APP_WAS,banjian_count_sql);
                  		
                  		if(null!=banjian_count_array && banjian_count_array.length>1){
                  			out.println("<div style='height:25px;'>截止至 "+curr_day+"</div>");
                  			out.println("<div style='height:25px;'>累计收件："+banjian_count_array[1][0]+" 件</div>");
                  			out.println("<div style='height:25px;'>累计办结："+banjian_count_array[1][1]+" 件</div>");
                  			out.println("<div style='height:25px;'>本日收件："+banjian_count_array[1][2]+" 件</div>");
                  			out.println("<div style='height:25px;'>本日办结："+banjian_count_array[1][3]+" 件</div>");
                  		}
                  	%>
                  			
                  	</div>
                  </td>
                </tr>
              </table></td>
            </tr>
        </table></td>
      </tr>
      <tr>
        <td><img src="images/text_pic_10.jpg" width="279" height="22" /></td>
      </tr>
      
    </table>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td><img src="images/1px_Tran.gif" width="100%" height="12" /></td>
        </tr>
      </table>
    <!--table2-->  
      <!--table3-->
      <table width="279" border="0" cellspacing="0" cellpadding="0">
      <!--栏目名-->
       <tr>
          <td height="27" align="left" valign="bottom" background="images/text_pic_8.jpg" class="white_14b">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="50" height="23">　</td>
                <td>监察统计</td>
              </tr>
          </table></td>
        </tr>
        <!--栏目名-->
        <tr valign="top">
          <td><table width="100%" border="0" cellpadding="5" cellspacing="1" bgcolor="#CECCCD">
              <tr>
                <td align="left" valign="top" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td valign="top">
                      	<div style="height:140px;padding-top:20px;padding-left:40px;">
	                  		<div style="height:25px;">监察统计信息</div> 	
	                  	</div>
                      </td>
                    </tr>
                </table></td>
              </tr>
          </table></td>
        </tr>
        <tr>
          <td><img src="images/text_pic_10.jpg" width="279" height="22" /></td>
        </tr>
      </table>
      <!--table3-->
      </td>
  	</tr>
	</table>
  	<%-- 乡镇、社区信息 E --%>
  	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  	<tr><td><img src="images/1px_Tran.gif" width="100%" height="2" /></td></tr>
	</table>
	<%-- 个人、企业、类型 s --%>
	<%@ include file="include/property.jsp" %>
	<%-- 个人、企业服务等 e --%>
	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  	<tr><td><img src="images/1px_Tran.gif" width="100%" height="8" /></td></tr>
	</table>
	<%-- buttom --%>
	<%@ include file="include/bottom.jsp" %>
</body>
</html>
