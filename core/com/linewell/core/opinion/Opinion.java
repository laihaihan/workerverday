package com.linewell.core.opinion;
 
/**
 * <p>
 * 	ApasOpinion实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-04-09 16:36:10
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class Opinion {
			/**
	 * 主键
	 */
	private String unid  = "" ;
		/**
	 * 外键：关联apas_info.unid
	 */
	private String punid  = "" ;
		/**
	 * 意见内容
	 */
	private String body  = "" ;
		/**
	 * 意见类型
	 */
	private String type  = "" ;
		/**
	 * 意见发表时间
	 */
	private String modified  = "" ;
		/**
	 * 意见发表者
	 */
	private String author  = "" ;
		/**
	 * 预留
	 */
	private String agent  = "" ;
		/**
	 * 节点名称
	 */
	private String node_name  = "" ;
	
	
	/**
	 * 外键：关联APAS_LOG.unid
	 */
	private String logid = "";
		
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
	 * 获取外键：关联apas_info.unid
	 * @return String
	 */
	public String getPunid() {
		return punid;
	}

	/**
	 * 设置外键：关联apas_info.unid
	 * @param punid
	 *               String 外键：关联apas_info.unid
	 */
	public void setPunid(String punid) {
		this.punid = punid;
	}
	
	/**
	 * 获取意见内容
	 * @return String
	 */
	public String getBody() {
		return body;
	}

	/**
	 * 设置意见内容
	 * @param body
	 *               String 意见内容
	 */
	public void setBody(String body) {
		this.body = body;
	}
	
	/**
	 * 获取意见类型
	 * @return String
	 */
	public String getType() {
		return type;
	}

	/**
	 * 设置意见类型
	 * @param type
	 *               String 意见类型
	 */
	public void setType(String type) {
		this.type = type;
	}
	
	/**
	 * 获取意见发表时间
	 * @return String
	 */
	public String getModified() {
		return modified;
	}

	/**
	 * 设置意见发表时间
	 * @param modified
	 *               String 意见发表时间
	 */
	public void setModified(String modified) {
		this.modified = modified;
	}
	
	/**
	 * 获取意见发表者
	 * @return String
	 */
	public String getAuthor() {
		return author;
	}

	/**
	 * 设置意见发表者
	 * @param author
	 *               String 意见发表者
	 */
	public void setAuthor(String author) {
		this.author = author;
	}
	
	/**
	 * 获取预留
	 * @return String
	 */
	public String getAgent() {
		return agent;
	}

	/**
	 * 设置预留
	 * @param agent
	 *               String 预留
	 */
	public void setAgent(String agent) {
		this.agent = agent;
	}
	
	/**
	 * 获取节点名称
	 * @return String
	 */
	public String getNode_name() {
		return node_name;
	}

	/**
	 * 设置节点名称
	 * @param node_name
	 *               String 节点名称
	 */
	public void setNode_name(String node_name) {
		this.node_name = node_name;
	}

	/**
	 * @return the logid
	 */
	public String getLogid() {
		return logid;
	}

	/**
	 * @param logid the logid to set
	 */
	public void setLogid(String logid) {
		this.logid = logid;
	}
	
	
}
