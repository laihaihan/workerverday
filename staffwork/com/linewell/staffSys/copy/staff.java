package com.linewell.staffSys.copy;
 
/**
 * <p>
 * 	员工入职单实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2016-08-01 16:55:45
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class staff {
			
	/**
	 * 
	 */
	
	private String CreateUser= "";
	
	
	private String unid  = "" ;
		
	/**
	 * 姓名
	 */
	private String name  = "" ;
		
	/**
	 * 性别
	 */
	private String sex  = "" ;
		
	/**
	 * 职务
	 */
	private String job  = "" ;
		
	/**
	 * 所属部门
	 */
	private String department  = "" ;
		
	/**
	 * 入职日期
	 */
	private String date_time  = "" ;
		
	/**
	 * 直属上级
	 */
	private String leader  = "" ;
		
	/**
	 * 联系方式
	 */
	private String contact  = "" ;
		
	/**
	 * 座机
	 */
	private String telephone  = "" ;
		
	/**
	 * 电子邮件
	 */
	private String email  = "" ;
		
	/**
	 * 学历证书
	 */
	private String diploma  = "" ;
		
	/**
	 * 简历
	 */
	private String resume  = "" ;
		
	/**
	 * 其他
	 */
	private String other  = "" ;
		
	/**
	 * 获取
	 * @return String
	 */
	public String getUnid() {
		return unid;
	}

	/**
	 * 设置
	 * @param unid
	 *               String 
	 */
	public void setUnid(String unid) {
		this.unid = unid;
	}
	
	/**
	 * 获取姓名
	 * @return String
	 */
	public String getName() {
		return name;
	}

	/**
	 * 设置姓名
	 * @param name
	 *               String 姓名
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * 获取性别
	 * @return String
	 */
	public String getSex() {
		return sex;
	}

	/**
	 * 设置性别
	 * @param sex
	 *               String 性别
	 */
	public void setSex(String sex) {
		this.sex = sex;
	}
	
	/**
	 * 获取职务
	 * @return String
	 */
	public String getJob() {
		return job;
	}

	/**
	 * 设置职务
	 * @param job
	 *               String 职务
	 */
	public void setJob(String job) {
		this.job = job;
	}
	
	/**
	 * 获取所属部门
	 * @return String
	 */
	public String getDepartment() {
		return department;
	}

	/**
	 * 设置所属部门
	 * @param department
	 *               String 所属部门
	 */
	public void setDepartment(String department) {
		this.department = department;
	}
	
	/**
	 * 获取入职日期
	 * @return String
	 */
	public String getDate_time() {
		return date_time;
	}

	/**
	 * 设置入职日期
	 * @param date_time
	 *               String 入职日期
	 */
	public void setDate_time(String date_time) {
		this.date_time = date_time;
	}
	
	/**
	 * 获取直属上级
	 * @return String
	 */
	public String getLeader() {
		return leader;
	}

	/**
	 * 设置直属上级
	 * @param leader
	 *               String 直属上级
	 */
	public void setLeader(String leader) {
		this.leader = leader;
	}
	
	/**
	 * 获取联系方式
	 * @return String
	 */
	public String getContact() {
		return contact;
	}

	/**
	 * 设置联系方式
	 * @param contact
	 *               String 联系方式
	 */
	public void setContact(String contact) {
		this.contact = contact;
	}
	
	/**
	 * 获取座机
	 * @return String
	 */
	public String getTelephone() {
		return telephone;
	}

	/**
	 * 设置座机
	 * @param telephone
	 *               String 座机
	 */
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	
	/**
	 * 获取电子邮件
	 * @return String
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * 设置电子邮件
	 * @param email
	 *               String 电子邮件
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	
	/**
	 * 获取学历证书
	 * @return String
	 */
	public String getDiploma() {
		return diploma;
	}

	/**
	 * 设置学历证书
	 * @param diploma
	 *               String 学历证书
	 */
	public void setDiploma(String diploma) {
		this.diploma = diploma;
	}
	
	/**
	 * 获取简历
	 * @return String
	 */
	public String getResume() {
		return resume;
	}

	/**
	 * 设置简历
	 * @param resume
	 *               String 简历
	 */
	public void setResume(String resume) {
		this.resume = resume;
	}
	
	/**
	 * 获取其他
	 * @return String
	 */
	public String getOther() {
		return other;
	}

	/**
	 * 设置其他
	 * @param other
	 *               String 其他
	 */
	public void setOther(String other) {
		this.other = other;
	}

	public String getCreateUser() {
		return CreateUser;
	}

	public void setCreateUser(String createUser) {
		this.CreateUser = createUser;
	}

		
}
