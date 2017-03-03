package com.linewell.core.view.sqllog;
/**
 * <p>视图SQL语句日志</P>
 * @author lfunian@linewell.com
 * @date Aug 13, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
public class SqlLog {
	//主键UNID
	private String unid = "";
	//应用系统主键UNID
	private String app_unid = "";
	//SQL语句所属视图UNID
	private String view_unid = "";
	//SQL语句
	private String sql = "";
	//SQL语句创建时间
	private String createtime = "";
	public String getUnid() {
		return unid;
	}
	public void setUnid(String unid) {
		this.unid = unid;
	}
	public String getApp_unid() {
		return app_unid;
	}
	public void setApp_unid(String app_unid) {
		this.app_unid = app_unid;
	}
	public String getView_unid() {
		return view_unid;
	}
	public void setView_unid(String view_unid) {
		this.view_unid = view_unid;
	}
	public String getSql() {
		return sql;
	}
	public void setSql(String sql) {
		this.sql = sql;
	}
	public String getCreatetime() {
		return createtime;
	}
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
}
