package com.linewell.core.page;

import java.sql.SQLException;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;

/**
 * 类说明：JDBC分页器管理
 *
 * @author qcongyong 
 * @date 2012-3-5
 * @version 1.0  
 */
public class JDBCPageManager {
	
	private Logger logger = Logger.getLogger(JDBCPageManager.class);
	
	private HttpServletRequest request = null;
	
	public JDBCPageManager(HttpServletRequest request) {
		this.request = request;
	}

	/**
	 * 获取分页器对象实例
	 * 
	 * @param pageSize  每页纪录数
	 * @return JDBCPage
	 */
	public JDBCPage getJDBCPage(String jndi, String sql, int pageSize, boolean isCustom) {
		//1、设置总记录数
		JDBCPage page = new JDBCPage();
		String pageSql = "SELECT nvl(COUNT(1),0) FROM ( " + sql + " ) countTab";
		try {
			String[][] result =  JDBCTool.doSQLQuery(jndi, pageSql);
			page.setRecordCount(Integer.parseInt(result[1][0]));
		} catch (SQLException e) {
			logger.error("获取分页器总记录数出错了！", e);
		}
		
		//2、设置每页显示纪录数
		int intPageSize = 0;
		String strPageSize = request.getParameter("jdbcPageSize");
		if (strPageSize != null) {
			intPageSize = Integer.parseInt(strPageSize);
		}
		if (intPageSize > 0) {
			if (intPageSize <= page.getRecordCount()) {
				page.setPageSize(intPageSize);
			} else {
				page.setPageSize(page.getRecordCount());
			}
		} else {
			page.setPageSize(pageSize);
		}
		
		//3、设置当前页面
		int intCurrentPage = 1;
		String currentPage = request.getParameter("currentJDBCPage");
		if (currentPage != null && Integer.parseInt(currentPage) > 0) {
			intCurrentPage = Integer.parseInt(currentPage);
		}
		if (intCurrentPage > page.getPageCount()) {
			intCurrentPage = page.getPageCount();
		}
		page.setCurrentPage(intCurrentPage);

		//4、设置结果集
		int begin = page.getBeginRecordCount();
		int end = page.getEndRecordCount();
		pageSql = " SELECT tbl.* FROM ( SELECT t.*, ROWNUM RN FROM ( " + sql + " ) t ";
		pageSql += "WHERE ROWNUM <= " + end + " ) tbl WHERE RN >= " + begin;
		try {
			//设置数组类型结果集
			String[][] array = JDBCTool.doSQLQuery(jndi, pageSql);
			page.setRecordSetArray(array);

			//设置列表类型结果集
			List list = JDBCTool.doSQLQueryList(jndi, pageSql);
			page.setRecordSetList(list);
		} catch (SQLException e) {
			logger.error("获取分页器结果集出错了！", e);
		}

		//5、设置分页导航条
		String navigation = this.getPageNavigation(page, isCustom);
		page.setNavigation(navigation);
		return page;
	}
	
	/**
	 * 得到分页导航条
	 * 
	 * @param isCustom 是否自定义显示条数
	 * @return
	 */
	private String getPageNavigation(JDBCPage page, boolean isCustom) {
		//1、css
		StringBuffer sb = new StringBuffer();
		sb.append("<style type='text/css'>");
		sb.append("#JDBCPageForm{font-size:12px;}");
		sb.append("#JDBCPageForm input{font-size:12px;width:50px;height:15px}");
		sb.append("#JDBCPageForm a:hover{text-decoration:none;padding:3px;border:1px solid #336699;height:20px;color:#336699;}");
		sb.append("</style>");
		
		//2、JS脚本
		sb.append("<script>");
		sb.append("function goJDBCPage(nPage){document.getElementById('currentJDBCPage').value = parseInt(nPage);document.getElementById('JDBCPageForm').submit();}");
		sb.append("function formatPage(){document.getElementById('currentJDBCPage').value = document.getElementById('currentJDBCPage').value.replace(/\\D/g,'')}");
		sb.append("function checkPage(){if(!(/^\\d{1,9}/).test(document.getElementById(\"currentJDBCPage\").value)){alert(\"请输入数字\");return false;}return true;}");
		sb.append("</script>");
				
		//3、表单
		sb.append("<form id='JDBCPageForm' action='" + request.getRequestURI() + "' method='get' style='margin:0px;padding:0px;'>");
		
		//4、参数
		Enumeration paramNames = request.getParameterNames();
		while (paramNames.hasMoreElements()) {
			String paramName = String.valueOf(paramNames.nextElement());
			String[] paramValues = request.getParameterValues(paramName);
			if (paramValues.length == 1) {
				String paramValue = paramValues[0];
				if (!"jdbcPageSize".equals(paramName) && !"currentJDBCPage".equals(paramName)) {
					sb.append("<input type='hidden' name='" + paramName + "' value='" + paramValue+ "' />");
				}
			}
		}

		//5、html显示
		int currentPage = page.getCurrentPage();
		int pageCount = page.getPageCount();
		int pageSize = page.getPageSize();
		int recordCount = page.getRecordCount();
		String separator = "&nbsp;&nbsp;";
		String imgPath = request.getContextPath()+"/core/themes/default/images/other";
		sb.append("<a href='javascript:goJDBCPage(1)'><img src='"+imgPath+"/homepage.jpg' onclick='goJDBCPage(1)'/>首页</a> &nbsp;");
		sb.append("<a href='javascript:goJDBCPage("+(currentPage-1)+")'><img src='"+imgPath+"/last.jpg'>上一页</a> &nbsp;");
		sb.append("<a href='javascript:goJDBCPage("+(currentPage+1)+")'><img src='"+imgPath+"/next.jpg'>下一页</a> &nbsp;");
		sb.append("<a href='javascript:goJDBCPage("+pageCount+")'><img src='"+imgPath+"/endpage.jpg'>尾页</a> &nbsp;&nbsp;");
		sb.append("<span style='color:red'>"+currentPage+"/"+pageCount+"</span> ");
		sb.append(separator+"共<span style='color:red'>"+recordCount+"</span>条纪录 ");
		if (!isCustom) {
			sb.append(pageSize+"条纪录/页 ");			
		}else{
			sb.append("<input type='text' name='jdbcPageSize' value='"+pageSize+"'/>条纪录/页 ");
		}
		sb.append("转到第<input type='text' onkeyup=\"formatPage()\" maxlength='9' id='currentJDBCPage' name='currentJDBCPage' value='"+currentPage+"'/>页 ");
		sb.append("<a href='javascript:if(checkPage()){document.getElementById(\"JDBCPageForm\").submit()}'><img src='"+imgPath+"/btn_go.gif'/></a>");
		sb.append("</form>");
		return sb.toString();
	}
}