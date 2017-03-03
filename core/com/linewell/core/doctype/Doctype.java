package com.linewell.core.doctype;
 
/**
 * <p>
 * 	文件类型实体
 * </P>
 * 
 * @author cbingcan@linewell.com
 * @date 2012-09-05 15:53:05
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class Doctype {
			
	/**
	 * 唯一编号
	 */
	private String unid  = "" ;
		
	/**
	 * 名称
	 */
	private String name  = "" ;
		
	/**
	 * 包含的文件字
	 */
	private String containdocwords  = "" ;
		
	/**
	 * 联合编号的文件字
	 */
	private String combinedocwords  = "" ;
		
	/**
	 * 绑定流程
	 */
	private String flowid  = "" ;
		
	/**
	 * 创建时间
	 */
	private String opertime  = "" ;
		
	/**
	 * 更新时间
	 */
	private String updatetime  = "" ;
		
	/**
	 * 绑定模块
	 */
	private String moduleid  = "" ;
		
	/**
	 * 绑定模块名称
	 */
	private String module  = "" ;
		
	/**
	 * 绑定流程名称
	 */
	private String flow  = "" ;
		
	/**
	 * 包含的文件字名称
	 */
	private String containdocwordsdis  = "" ;
		
	/**
	 * 联合编号的文件字名称
	 */
	private String combinedocwordsdis  = "" ;
		
	/**
	 * 获取唯一编号
	 * @return String
	 */
	public String getUnid() {
		return unid;
	}

	/**
	 * 设置唯一编号
	 * @param unid
	 *               String 唯一编号
	 */
	public void setUnid(String unid) {
		this.unid = unid;
	}
	
	/**
	 * 获取名称
	 * @return String
	 */
	public String getName() {
		return name;
	}

	/**
	 * 设置名称
	 * @param name
	 *               String 名称
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * 获取包含的文件字
	 * @return String
	 */
	public String getContaindocwords() {
		return containdocwords;
	}

	/**
	 * 设置包含的文件字
	 * @param containdocwords
	 *               String 包含的文件字
	 */
	public void setContaindocwords(String containdocwords) {
		this.containdocwords = containdocwords;
	}
	
	/**
	 * 获取联合编号的文件字
	 * @return String
	 */
	public String getCombinedocwords() {
		return combinedocwords;
	}

	/**
	 * 设置联合编号的文件字
	 * @param combinedocwords
	 *               String 联合编号的文件字
	 */
	public void setCombinedocwords(String combinedocwords) {
		this.combinedocwords = combinedocwords;
	}
	
	/**
	 * 获取绑定流程
	 * @return String
	 */
	public String getFlowid() {
		return flowid;
	}

	/**
	 * 设置绑定流程
	 * @param flowid
	 *               String 绑定流程
	 */
	public void setFlowid(String flowid) {
		this.flowid = flowid;
	}
	
	/**
	 * 获取创建时间
	 * @return String
	 */
	public String getOpertime() {
		return opertime;
	}

	/**
	 * 设置创建时间
	 * @param opertime
	 *               String 创建时间
	 */
	public void setOpertime(String opertime) {
		this.opertime = opertime;
	}
	
	/**
	 * 获取更新时间
	 * @return String
	 */
	public String getUpdatetime() {
		return updatetime;
	}

	/**
	 * 设置更新时间
	 * @param updatetime
	 *               String 更新时间
	 */
	public void setUpdatetime(String updatetime) {
		this.updatetime = updatetime;
	}
	
	/**
	 * 获取绑定模块
	 * @return String
	 */
	public String getModuleid() {
		return moduleid;
	}

	/**
	 * 设置绑定模块
	 * @param moduleid
	 *               String 绑定模块
	 */
	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}
	
	/**
	 * 获取绑定模块名称
	 * @return String
	 */
	public String getModule() {
		return module;
	}

	/**
	 * 设置绑定模块名称
	 * @param module
	 *               String 绑定模块名称
	 */
	public void setModule(String module) {
		this.module = module;
	}
	
	/**
	 * 获取绑定流程名称
	 * @return String
	 */
	public String getFlow() {
		return flow;
	}

	/**
	 * 设置绑定流程名称
	 * @param flow
	 *               String 绑定流程名称
	 */
	public void setFlow(String flow) {
		this.flow = flow;
	}
	
	/**
	 * 获取包含的文件字名称
	 * @return String
	 */
	public String getContaindocwordsdis() {
		return containdocwordsdis;
	}

	/**
	 * 设置包含的文件字名称
	 * @param containdocwordsdis
	 *               String 包含的文件字名称
	 */
	public void setContaindocwordsdis(String containdocwordsdis) {
		this.containdocwordsdis = containdocwordsdis;
	}
	
	/**
	 * 获取联合编号的文件字名称
	 * @return String
	 */
	public String getCombinedocwordsdis() {
		return combinedocwordsdis;
	}

	/**
	 * 设置联合编号的文件字名称
	 * @param combinedocwordsdis
	 *               String 联合编号的文件字名称
	 */
	public void setCombinedocwordsdis(String combinedocwordsdis) {
		this.combinedocwordsdis = combinedocwordsdis;
	}
		
}
