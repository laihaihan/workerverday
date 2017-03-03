
package com.linewell.core.form.content;

import java.sql.Clob;
 
/**
 * <p>
 * 	FormContent实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-02-14 17:25:00
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class FormContent {
			/**
	 * 主键
	 */
	private String unid  = "" ;
	
	private String punid = "" ;
	
		/**
	 * 表单名称
	 */
	private String name  = "" ;
		/**
	 * 审批事项编码
	 */
	private String infoprojid  = "" ;
		/**
	 * 表单展示顺序号
	 */
	private long sortid ;
		/**
	 * 表单html内容
	 */
	private Clob content;
		/**
	 * 后台验证接口
	 */
	private String verifyinterface  = "";
		/**
	 * 流程节点id(为以后支持多环节多表单预留)
	 */
	private String nodeid  = "";
		/**
	 * 流程节点名称(为以后支持多环节多表单预留)
	 */
	private String nodename  = "";
	
	private String tablename  = "";
	
	private String isshowhistryform = "";
				   
	private String yewujsp  = "";
	
	private Clob bodycontent;
	
	private Clob scriptcontent;

	private Clob csscontent;
	
	private Clob linkcontent;
	
	private Clob xmlcontent;

	
	
	public Clob getBodycontent() {
		return bodycontent;
	}

	public void setBodycontent(Clob bodycontent) {
		this.bodycontent = bodycontent;
	}

	public Clob getScriptcontent() {
		return scriptcontent;
	}

	public void setScriptcontent(Clob scriptcontent) {
		this.scriptcontent = scriptcontent;
	}

	public Clob getCsscontent() {
		return csscontent;
	}

	public void setCsscontent(Clob csscontent) {
		this.csscontent = csscontent;
	}

	public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	/**
	 * 获取主键
	 * @return String
	 */
	public String getUnid() {
		return unid;
	}

	/**
	 * 设置主键
	 * @param unid
	 *               String 主键
	 */
	public void setUnid(String unid) {
		this.unid = unid;
	}
	
	/**
	 * 获取表单名称
	 * @return String
	 */
	public String getName() {
		return name;
	}

	/**
	 * 设置表单名称
	 * @param name
	 *               String 表单名称
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * 获取审批事项编码
	 * @return String
	 */
	public String getInfoprojid() {
		return infoprojid;
	}

	/**
	 * 设置审批事项编码
	 * @param infoprojid
	 *               String 审批事项编码
	 */
	public void setInfoprojid(String infoprojid) {
		this.infoprojid = infoprojid;
	}
	
	/**
	 * 获取表单展示顺序号
	 * @return long
	 */
	public long getSortid() {
		return sortid;
	}

	/**
	 * 设置表单展示顺序号
	 * @param sortid
	 *               long 表单展示顺序号
	 */
	public void setSortid(long sortid) {
		this.sortid = sortid;
	}
	
	/**
	 * 获取表单html内容
	 * @return String
	 */
	public Clob getContent() {
		return content;
	}

	/**
	 * 设置表单html内容
	 * @param content
	 *               String 表单html内容
	 */
	public void setContent(Clob content) {
		this.content = content;
	}
	
	/**
	 * 获取后台验证接口
	 * @return String
	 */
	public String getVerifyinterface() {
		return verifyinterface;
	}

	/**
	 * 设置后台验证接口
	 * @param verifyinterface
	 *               String 后台验证接口
	 */
	public void setVerifyinterface(String verifyinterface) {
		this.verifyinterface = verifyinterface;
	}
	
	/**
	 * 获取流程节点id(为以后支持多环节多表单预留)
	 * @return String
	 */
	public String getNodeid() {
		return nodeid;
	}

	/**
	 * 设置流程节点id(为以后支持多环节多表单预留)
	 * @param nodeid
	 *               String 流程节点id(为以后支持多环节多表单预留)
	 */
	public void setNodeid(String nodeid) {
		this.nodeid = nodeid;
	}
	
	/**
	 * 获取流程节点名称(为以后支持多环节多表单预留)
	 * @return String
	 */
	public String getNodename() {
		return nodename;
	}

	/**
	 * 设置流程节点名称(为以后支持多环节多表单预留)
	 * @param nodename
	 *               String 流程节点名称(为以后支持多环节多表单预留)
	 */
	public void setNodename(String nodename) {
		this.nodename = nodename;
	}

	public String getPunid() {
		return punid;
	}

	public void setPunid(String punid) {
		this.punid = punid;
	}

	public Clob getLinkcontent() {
		return linkcontent;
	}

	public void setLinkcontent(Clob linkcontent) {
		this.linkcontent = linkcontent;
	}

	public String getYewujsp() {
		return yewujsp;
	}

	public void setYewujsp(String yewujsp) {
		this.yewujsp = yewujsp;
	}

	public String getIsshowhistryform() {
		return isshowhistryform;
	}

	public void setIsshowhistryform(String isshowhistryform) {
		this.isshowhistryform = isshowhistryform;
	}

	public Clob getXmlcontent() {
		return xmlcontent;
	}

	public void setXmlcontent(Clob xmlcontent) {
		this.xmlcontent = xmlcontent;
	}
}
