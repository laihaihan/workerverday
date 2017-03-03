package com.linewell.core.gencode;

import java.util.*;


/**
 * <p>
 * 	bean 实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-2-3
 * @version 1.00
 * <p>
 * 	Copyright (c) 2011 www.linewell.com
 * </p>
 */
public class BeanBean {
	private String packageName = "";  //包名
	private String beanName = "";//Bean对象名
	private String beanCName="";//new出来的对象名
	private String aliasName="";//new出来的对象名
	private String appid = "";//所属应用系统编号
	private String pk_Name = "";//主键字段名
	private String tableName = "";//表名
	private String tableComments="";//表注释
	private String jspTableContent="";//jsp表格内容
	private String jspTableFileContent="";//jsp内嵌附件内容
	/**
	 * 主键名称
	 */
	private String keyWord;
	/**
	 * 主键值
	 */
	private String keyValue;
	
	/**
	 * 生成的类名称,如生成的DAO名为：ApasGradeDAO
	 */
	private String className;

	/**
	 * 实体对象的名称，主要在DAO、Test、Bussiness
	 */
	private String beanValueName="";
	
	private List<BeanProperty> propertis = new ArrayList<BeanProperty>();

	private List<BeanImport> importList = new ArrayList<BeanImport>();
	/**
	 * 创建者名称
	 */
	private String creater="";
	
	/**
	 * 创建者邮箱
	 */
	private String createrEmail="";
	
	/**
	 * 创建者时间
	 */
	private String createTime="";

	/**
	 * @return the beanName
	 */
	public String getBeanName() {
		return beanName;
	}

	/**
	 * @param beanName
	 *            the beanName to set
	 */
	public void setBeanName(String beanName) {
		this.beanName = beanName;
	}


	/**
	 * @return the pk_Name
	 */
	public String getPk_Name() {
		return pk_Name;
	}

	/**
	 * @param pk_Name
	 *            the pk_Name to set
	 */
	public void setPk_Name(String pk_Name) {
		this.pk_Name = pk_Name;
	}

	/**
	 * @return the tableName
	 */
	public String getTableName() {
		return tableName;
	}

	/**
	 * @param tableName
	 *            the tableName to set
	 */
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	/**
	 * @return the propertis
	 */
	public List<BeanProperty> getPropertis() {
		return propertis;
	}

	/**
	 * @param propertis
	 *            the propertis to set
	 */
	public void setPropertis(List<BeanProperty> propertis) {
		this.propertis = propertis;
	}

	/**
	 * @return the packageName
	 */
	public String getPackageName() {
		return packageName;
	}

	/**
	 * @param packageName
	 *            the packageName to set
	 */
	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	/**
	 * @return the beanValueName
	 */
	public String getBeanValueName() {
		return beanValueName;
	}

	/**
	 * @param beanValueName the beanValueName to set
	 */
	public void setBeanValueName(String beanValueName) {
		this.beanValueName = beanValueName;
	}

	/**
	 * @return the beanCName
	 */
	public String getBeanCName() {
		return beanCName;
	}

	/**
	 * @param beanCName the beanCName to set
	 */
	public void setBeanCName(String beanCName) {
		this.beanCName = beanCName;
	}

	public String getTableComments() {
		return tableComments;
	}

	public void setTableComments(String tableComments) {
		this.tableComments = tableComments;
	}

	public String getKeyWord() {
		return keyWord;
	}

	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
	}

	public String getKeyValue() {
		return keyValue;
	}

	public void setKeyValue(String keyValue) {
		this.keyValue = keyValue;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getCreater() {
		return creater;
	}

	public void setCreater(String creater) {
		this.creater = creater;
	}

	public String getCreaterEmail() {
		return createrEmail;
	}

	public void setCreaterEmail(String createrEmail) {
		this.createrEmail = createrEmail;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getAppid() {
		return appid;
	}

	public void setAppid(String appid) {
		this.appid = appid;
	}

	public String getAliasName() {
		return aliasName;
	}

	public void setAliasName(String aliasName) {
		this.aliasName = aliasName;
	}

	public List<BeanImport> getImportList() {
		return importList;
	}

	public void setImportList(List<BeanImport> importList) {
		this.importList = importList;
	}

	public String getJspTableContent() {
		return jspTableContent;
	}

	public void setJspTableContent(String jspTableContent) {
		this.jspTableContent = jspTableContent;
	}

	public String getJspTableFileContent() {
		return jspTableFileContent;
	}

	public void setJspTableFileContent(String jspTableFileContent) {
		this.jspTableFileContent = jspTableFileContent;
	}

}
