<%@page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.linewell.ucap.web.login.WebLoginManager" %>
<%@ page import="java.util.*"%>
<%@page import="com.linewell.ucap.platform.authorized.app.App"%>
<%@ page import="com.linewell.ucap.db.JDBCTool"%>
<%@ page import="com.linewell.ucap.jdbc.core.JdbcTemplate"%>
<%@page import="com.linewell.ucap.web.login.LoginActionWrapper"%>
<%@page import="com.linewell.ucap.util.UcapRequest" %>
<%@page import="com.linewell.ucap.util.UcapRequestWebManager"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%@page import="com.linewell.ucap.web.login.LoginResult"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@page import="java.net.URLEncoder"%>
<%
	Session us_sn = (Session) request.getSession().getAttribute(Session.SESSION_NAME); 
	
	//判断当会话对象为空时，重新设置session对象
	if(null==us_sn){
		//当会话对象为空，重新设置会话对象
		UcapRequest us_ucapRequest = UcapRequestWebManager.requestToUcap(request);	
		String userName=request.getParameter("userName");//获取用户名
		String passWord=request.getParameter("passWord");//获取密码
		if(StringUtils.isEmpty(userName)||StringUtils.isEmpty(passWord))
		{
			System.out.println("用户名或者密码为空！");
			return;
		}
		LoginResult loginResult=LoginActionWrapper.verifyUserNoEncrypt(us_ucapRequest,response,userName,passWord,"");
		request.getSession().setAttribute(Session.SESSION_NAME, loginResult.getSession());
		us_sn = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		if(null==us_sn)
		{
			System.out.println("获取会话对象失败");
			return;
		}
	}
	//end
	
	WebLoginManager wm =new WebLoginManager();
	List<App> appList=wm.getApps(us_sn);
	if(null==appList||appList.size()<1)
	{
		System.out.println("获取用户所拥有的系统失败！");
		return ;
	}
 %>
<html>
<head>
<title>待办事宜</title>
<%@include file="/sys/jsp/session.jsp"%>
</head>
 <script type="text/javascript">
 //显示隐藏列表
 function hideList(i)
 {
 	var el="list_"+i;
 	if(document.getElementById(el).style.display=="none")
 	{
 		document.getElementById(el).style.display="";
 		document.getElementById("title_image_"+i).src="uistyle/images/todo_title_ico.gif";
 	}
 	else
 	{
 		document.getElementById(el).style.display="none";
 		document.getElementById("title_image_"+i).src="uistyle/images/todo_title_ico2.gif";
 	}
 }
 //打开流程文档
 function openWindow(url)
 {
 	window.open(url);
 }
</script>
<style type="text/css">
/*************************** 标题样式 ***************************/

.title{
	background:#ffffff url('uistyle/images/todo_title_bg.gif') repeat-x;
	width:100%;
	height:28px;
	line-height:28px;
	position:relative;
	cursor:pointer;
}
/* 标题文字 */
.title a{
	margin-left:10px;
	color:#497b95;
	font-weight:bold;
	text-decoration:none;
}

/* 标题栏收缩图标*/
.title_ico{	
	position:absolute;
	right:10px;
	top:12px;
}


/*************************** 列表样式 ***************************/

.list {
	width:100%;
}

/* 正文区域 */
.content{
	margin:10px;
	border-bottom:#c4e4f1 1px solid;
	padding-bottom:5px;
}

/* 标题 */
.content_title{
	color:#222222;
	line-height:20px;
}

/* 流程名称 */
.content_processName{
	color:#0b5d9b;
	margin-right:5px;
}

/* 信息区 */
.content_information{
	position:relative;
	color:#0b5d9b;
	margin-top:5px;
	margin-bottom:10px;
	height:12px;

}


/* 发送人 */
.content_sender{
	position:absolute;
	left:0px;
	color:#0b5d9b;
}


/* 时间 */
.content_time{
	position:absolute;
	right:0px;	
	color:#8aa3d2;
}
</style>
<body style="background:#ffffff">
<table style="width: 100%" cellpadding="0" cellspacing="0" style="background:#ffffff">
	<%
		boolean isHaveTodoList=false;
		for(int i=0;i<appList.size();i++)
		{
			App a =(App)appList.get(i);
			String appName=a.getDisplayName();
			String todoListHtml=getTodoListHtml(getToDoList(a.getUnid(),us_sn,request),a.getUnid(),request);
			if(StringUtils.isEmpty(todoListHtml))
			{
				continue;
			}
			isHaveTodoList=true;
			%>
			<tr>
				<td>
					<!-- 标题栏 -->
					<div class="title" onclick='hideList(<%=i %>);'>
						<a><%=appName %></a>
						<img  id="title_image_<%=i %>"  class="title_ico" src="uistyle/images/todo_title_ico.gif" />
					</div>
					 <!-- 列表栏 -->
					<div class="list" id="list_<%=i %>">
						<!-- 正文内容 -->
						<%=todoListHtml %>	
					</div>
				</td>
			</tr>
			<%
		}
	 %>
	 <%
	 	if(!isHaveTodoList)
	 	{
	 		%>
	 		<tr>
				<td>
					<div class="list">
						<!-- 正文内容 -->
						<div class="content">
							<div class="content_title"> 暂无待办事项</div>
						</div>
					</div>
				</td>
			</tr>
	 		<%
	 	}
	  %>
</table>
</body>
</html>
<%!
	//根据用户名和系统unid获取用户的待办列表
	/**
	 * 根据用户名和系统unid获取用户的待办列表
	*/
	public String[][] getToDoList(String appUnid,Session us_session,HttpServletRequest request)
	{
		String[][] rs=null;
		String userUnid=us_session.getUser().getUnid();
		JdbcTemplate jt=JDBCTool.getAppDBTool(appUnid);
		//获取当前用户的所有待办事宜的sql语句()
		StringBuffer sql =new StringBuffer();
		sql.append("SELECT DISTINCT ");
		sql.append("t.todo_doc_title, ");
		sql.append("t.todo_doc_id, ");
		sql.append("t.todo_flow_instance_id, ");
		sql.append("m.flow_formid,");
		sql.append("t.todo_doc_send_time,");
		sql.append("t.todo_doc_send_user,");
		sql.append("t.todo_flow_name ");
		sql.append("FROM UCAP_FW_TODO t , ");
		sql.append("ucap_fw_flow_instance f, ");
		sql.append("ucap_config_flow m ");
		sql.append("where ");
		sql.append("f.instance_unid = todo_flow_instance_id and t.todo_flow_id=m.flow_unid AND f.instance_node_transactor_0 LIKE '%"+userUnid+"%'");
		try{
			jt.open();
			rs=jt.queryForArray(sql.toString());
		}
		catch(Exception ex)
		{
			System.out.println(ex.getMessage());
		}
		finally
		{
			jt.close();
		}
		if(null==rs||rs.length<2)
		{
			return null;
		}
		return rs;
	}
	
	//根据获取的待办列表数组，组成列表显示的html字符串
	/**
	 * 根据获取的待办列表数组，组成列表显示的html字符串
	*/
	public String getTodoListHtml(String[][] rs,String appUnid,HttpServletRequest request)
	{
		if(null==rs)return "";
		StringBuffer result =new StringBuffer("");
		for(int i=1;i<rs.length;i++)
		{
			String title=rs[i][0].toString();//待办标题
			String docId=rs[i][1].toString();//待办事宜unid
			String instanceId=rs[i][2].toString();//实例id
			String formId=rs[i][3].toString();//文档表单id
			
			String sendTime=rs[i][4].toString();//发送时间
			String sendUser=rs[i][5].toString();//发送时间
			int index=sendUser.indexOf("(");
			if(index>0)sendUser=sendUser.substring(0,index);
			String flowName=rs[i][6].toString();//流程名称
			String url=this.getFlowDocUrl(title,docId,instanceId,formId,appUnid,request);
			result.append("<div class=\"content\">");
			result.append("<div class=\"content_title\">");
			result.append("<a class=\"content_processName\">("+flowName+")</a>");
			result.append("<a href=\""+url+"\" target=\"_blank\"  title=\""+title+"\">"+title+"</a>");//openWindow(url)
			result.append("</div> <div class=\"content_information\">");
			result.append("<div class=\"content_sender\">"+sendUser+"</div>");
			result.append("<div class=\"content_time\">"+sendTime+"</div>");
			result.append("</div>");
			result.append("</div>");
		}
		
		return result.toString();
	}
	
	//根据获取的待办列表数组，组成文档url地址
	/**
	 * 根据获取的待办列表数组，组成文档url地址
	*/
	public String getFlowDocUrl(String title,String docId,String instanceId,String formId,String appUnid,HttpServletRequest request)
	{
		//构造待办事宜打开文档的url地址
		String docUrl="sys/jsp/document.jsp?type=03&formId="+formId+"&instanceUnid="+instanceId+"&unid="+docId+"&appUnid="+appUnid;
		try{
			//URL编码
			docUrl=URLEncoder.encode(docUrl,"utf-8");
		}
		catch(Exception ex)
		{
			System.out.println("URL编码错误！");
		}
		String u=request.getParameter("userName");//获取用户名
		String p=request.getParameter("passWord");//获取密码
		String jspUrl="imLogin.jsp?userName="+u+"&passWord="+p+"&appUnid="+appUnid+"&url="+docUrl;
		return jspUrl;
	}
	
%>