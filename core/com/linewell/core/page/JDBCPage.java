package com.linewell.core.page;

import java.util.List;

/**
 * 类说明：JDBC分页器
 *
 * @author qcongyong 
 * @date 2012-3-5
 * @version 1.0  
 */
public class JDBCPage {

	private int pageSize = 10;//页面大小(每页纪录数)
	private int beginRecordCount = 0;//开始记录
	private int endRecordCount = 0;//结束记录
	private int recordCount = 0;//记录总数
	private int currentPage = 1;//当前页
	private int pageCount = 0;//总页数
	private String[][] recordSetArray ;//数组结果集
	private List recordSetList;//List 结果集
	private String navigation = "";//分页导航条

	public JDBCPage() {
	}

	public JDBCPage(int pageSize) {
		this.pageSize = pageSize;
	}
	
	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	
	public int getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;
	}
	
	public int getPageCount() {
		this.pageCount = (recordCount + pageSize - 1) / pageSize;
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}
	
	public String[][] getRecordSetArray() {
		return recordSetArray;
	}

	public void setRecordSetArray(String[][] recordSetArray) {
		this.recordSetArray = recordSetArray;
	}
	
	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	
	public int getBeginRecordCount() {
		if (this.recordCount > 0) {
			this.beginRecordCount = (this.currentPage - 1) * this.pageSize + 1;
		} else {
			this.beginRecordCount = 0;
		}
		return beginRecordCount;
	}

	public void setBeginRecordCount(int beginRecordCount) {
		this.beginRecordCount = beginRecordCount;
	}
	
	public int getEndRecordCount() {
		this.endRecordCount = this.beginRecordCount + pageSize - 1;
		if (this.endRecordCount > this.recordCount) {
			this.endRecordCount = this.recordCount;
		}
		return endRecordCount;
	}
	
	public void setEndRecordCount(int endRecordCount) {
		this.endRecordCount = endRecordCount;
	}

	public List getRecordSetList() {
		return recordSetList;
	}

	public void setRecordSetList(List recordSetList) {
		this.recordSetList = recordSetList;
	}

	public String getNavigation() {
		return navigation;
	}

	public void setNavigation(String navigation) {
		this.navigation = navigation;
	}
}