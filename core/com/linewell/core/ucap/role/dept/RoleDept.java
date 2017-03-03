package com.linewell.core.ucap.role.dept;
/**
 * <p>
 *    角色分管部门
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 5, 2012
 * @version 1.0  
 */
public class RoleDept {

	
	/**
	 * 部门标识
	 */
	private String roledept_dept_unid  = "" ;
		
	/**
	 * 
	 */
	private String roledept_unid  = "" ;
		
	/**
	 * 
	 */
	private String roledept_role_unid  = "" ;
		
	/**
	 * 获取部门标识
	 * @return String
	 */
	public String getRoledept_dept_unid() {
		return roledept_dept_unid;
	}

	/**
	 * 设置部门标识
	 * @param roledept_dept_unid
	 *               String 部门标识
	 */
	public void setRoledept_dept_unid(String roledept_dept_unid) {
		this.roledept_dept_unid = roledept_dept_unid;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getRoledept_unid() {
		return roledept_unid;
	}

	/**
	 * 设置
	 * @param roledept_unid
	 *               String 
	 */
	public void setRoledept_unid(String roledept_unid) {
		this.roledept_unid = roledept_unid;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getRoledept_role_unid() {
		return roledept_role_unid;
	}

	/**
	 * 设置
	 * @param roledept_role_unid
	 *               String 
	 */
	public void setRoledept_role_unid(String roledept_role_unid) {
		this.roledept_role_unid = roledept_role_unid;
	}
}
