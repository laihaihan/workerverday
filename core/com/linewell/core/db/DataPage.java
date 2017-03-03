package com.linewell.core.db;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayHandler;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class DataPage {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(DataPage.class);

	/* 页面大小 */
	private int pageSize = 20;

	/* 开始记录 */
	private int beginRecordCount = 0;

	/* 结束记录 */
	private int endRecordCount = 0;

	/* 记录总数 */
	private int recordCount = 0;

	/* 当前页 */
	private int currentPage = 1;// 

	/* 总页数 */
	private int pageCount = 0;// 

	/* 数组结果集 */
	private String[][] recordArray;

	/* List 结果集 */
	private List recordList;

	public DataPage() {
	}

	public DataPage(Connection conn, String sql, int pageSize) {
		this.pageSize = pageSize;
		this.recordCount = getCount(conn,sql);
	}

	public DataPage(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * get页面显示条数
	 * 
	 * @return
	 */
	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * get 记录总数
	 * 
	 * @return
	 */
	public int getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;
	}

	/**
	 * get 总页数
	 * 
	 * @return
	 */
	public int getPageCount() {
		this.pageCount = (recordCount + pageSize - 1) / pageSize;
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	/**
	 * get 当前页
	 * 
	 * @return
	 */
	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	/**
	 * get 开始记录
	 * 
	 * @return
	 */
	public int getBeginRecordCount() {
		if (this.recordCount > 0) {
			// this.beginRecordCount = (this.currentPage - 1) * this.pageSize +
			// 1;
			this.beginRecordCount = pageSize * currentPage;

		} else {
			this.beginRecordCount = 0;
		}
		return beginRecordCount;
	}

	public void setBeginRecordCount(int beginRecordCount) {
		this.beginRecordCount = beginRecordCount;
	}

	/**
	 * get 结束记录
	 * 
	 * @return
	 */
	public int getEndRecordCount() {
		// this.endRecordCount = this.beginRecordCount + pageSize - 1;
		this.endRecordCount = pageSize * currentPage + 1;
		if (this.endRecordCount > this.recordCount) {
			this.endRecordCount = this.recordCount;
		}
		return endRecordCount;
	}

	/**
	 * get 例表序号
	 * 
	 * @param i
	 *            循环 i
	 * @return
	 */
	public int getSerialNum(int i) {
		int serial = i;
		serial = (currentPage-1) * pageSize + serial+1;
		return serial;
	}

	public void setEndRecordCount(int endRecordCount) {
		this.endRecordCount = endRecordCount;
	}

	public String getPageNav(HttpServletRequest request) {
		return getPageNav(request, false);
	}

	/**
	 * 得到分页导航条
	 * 
	 * @param request
	 * @param isCustom
	 *            是否自定义显示条数
	 * @return
	 */
	public String getPageNav(HttpServletRequest request, boolean isCustom) {
		String currentURL = request.getRequestURI();

		StringBuffer strBuffer = new StringBuffer();
		// css
		strBuffer.append("<style type='text/css'>");
		strBuffer.append("#JDBCPageForm{font-size:12px;}");
		strBuffer
				.append("#JDBCPageForm a{margin-left:4px;text-decoration:none;font-size:12px;padding:3px;border:1px solid #CECECE;height:20px;color:#333333;display:inline;}");
		strBuffer
				.append("#JDBCPageForm a:hover{margin-left:4px;text-decoration: none;font-size:12px;padding:3px;border:1px solid #336699;height:20px;color:#336699;display:inline;}");
		strBuffer.append("#currentJDBCPage{height:24px;}");
		strBuffer.append("</style>");
		// JS
		strBuffer
				.append("<script>function goJDBCPage(nPage){document.getElementById(\"currentJDBCPage\").value = parseInt(nPage);document.getElementById(\"JDBCPageForm\").submit();}</script>");
		// 分页条
		strBuffer.append("<form id=\"JDBCPageForm\" action=\"" + currentURL + "\" method=\"get\" style=\"margin:0px;padding:0px;\">");

		// 参数
		Enumeration paramNames = request.getParameterNames();
		while (paramNames.hasMoreElements()) {
			String paramName = String.valueOf(paramNames.nextElement());
			String[] paramValues = request.getParameterValues(paramName);
			if (paramValues.length == 1) {
				String paramValue = paramValues[0];
				if (!"jdbcPageSize".equals(paramName) && !"currentJDBCPage".equals(paramName)) {
					strBuffer.append("<input type=\"hidden\" name=\"" + paramName + "\" value=\"" + paramValue + "\" />");
				}
			}
		}

		strBuffer.append("<a href=\"javascript:goJDBCPage(1);\">首页</a>");
		strBuffer.append("<a href=\"javascript:goJDBCPage(" + (currentPage - 1) + ");\">上一页</a>");
		strBuffer.append("<a href=\"javascript:goJDBCPage(" + (currentPage + 1) + ");\">下一页</a>");
		strBuffer.append("<a href=\"javascript:goJDBCPage(" + pageCount + ");\">尾页</a>&nbsp;&nbsp;");
		strBuffer.append("页次:<span style='color:red'>" + currentPage + "</span>/" + pageCount + " ");
		if (!isCustom) {
			strBuffer.append(pageSize + "/页 ");
		} else {
			strBuffer.append("<input type=\"text\" name=\"jdbcPageSize\" size=\"" + String.valueOf(pageSize).length() + "\" value=\""
					+ pageSize + "\"/>/页 ");
		}
		strBuffer.append("共" + recordCount + "条 ");
		strBuffer.append("转到:<input type=\"text\" id='currentJDBCPage' name='currentJDBCPage' style=\"width:"
				+ String.valueOf(currentPage).length() * 18 + "px\" value=\"" + currentPage + "\"/> ");
		strBuffer.append("<a href='javascript:JDBCPageForm.submit();'>GO</a>");
		strBuffer.append("</form>");
		return strBuffer.toString();
	}

	public String[][] getRecordArray() {
		return recordArray;
	}

	public void setRecordArray(String[][] recordArray) {
		this.recordArray = recordArray;
	}

	public List getRecordList() {
		return recordList;
	}

	public void setRecordList(List recordList) {
		this.recordList = recordList;
	}
	
	private int getCount(Connection conn,String sql) {
		int count = 0;

		String countSql = "SELECT COUNT(1) FROM ( " + sql + " ) countTab";
		QueryRunner qr = new QueryRunner(true);

		try {
			Object[] obj = qr.query(conn, countSql, new ArrayHandler());

			if (obj.length > 0) {
				count = Integer.parseInt(String.valueOf(obj[0]));
			}

		} catch (SQLException e) {
		    logger.error(e);
		}

		return count;
	}

}
