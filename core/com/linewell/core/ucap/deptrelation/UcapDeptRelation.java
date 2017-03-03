package com.linewell.core.ucap.deptrelation;
/**
 * <p>用户信息</p>
 * @email lfunian@linewell.com
 * @date Sep 26, 2013
 * @version 1.0  
 */
public class UcapDeptRelation {
	/**
	 * 主键
	 */
	private String unid = "";
	
	/**
	 * 部门unid
	 */
	private String dept_unid = "";
	
	/**
	 * 应用系统unid
	 */
	private String app_unid = "";
	
	/**
	 * 扩展字段_1
	 */
	private String dept_field_one = "";
	
	/**
	 * 扩展字段_2
	 */
	private String dept_field_two = "";
	
	/**
	 * 扩展字段_3
	 */
	private String dept_field_three = "";

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

	public String getDept_unid() {
		return dept_unid;
	}

	public void setDept_unid(String dept_unid) {
		this.dept_unid = dept_unid;
	}

	public String getDept_field_one() {
		return dept_field_one;
	}

	public void setDept_field_one(String dept_field_one) {
		this.dept_field_one = dept_field_one;
	}

	public String getDept_field_two() {
		return dept_field_two;
	}

	public void setDept_field_two(String dept_field_two) {
		this.dept_field_two = dept_field_two;
	}

	public String getDept_field_three() {
		return dept_field_three;
	}

	public void setDept_field_three(String dept_field_three) {
		this.dept_field_three = dept_field_three;
	}
}
