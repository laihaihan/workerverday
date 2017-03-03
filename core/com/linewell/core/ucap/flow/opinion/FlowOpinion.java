package com.linewell.core.ucap.flow.opinion;
 
/**
 * <p>
 * 	实体
 * </P>
 * 
 * @author qcongyong@linewell.com
 * @date 2012-12-14 17:49:30
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class FlowOpinion {
			
	/**
	 * 意见id
	 */
	private String opinion_unid  = "" ;
		
	/**
	 * 流程实例id
	 */
	private String opinion_flow_instance_id  = "" ;
		
	/**
	 * 文档id
	 */
	private String opinion_doc_id  = "" ;
		
	/**
	 * 流程id
	 */
	private String opinion_flow_id  = "" ;
		
	/**
	 * 流程名称
	 */
	private String opinion_flow_name  = "" ;
		
	/**
	 * 节点id
	 */
	private String opinion_node_id  = "" ;
		
	/**
	 * 节点名称
	 */
	private String opinion_node_name  = "" ;
		
	/**
	 * 父流程id
	 */
	private String opinion_father_flow_id  = "" ;
		
	/**
	 * 父流程名称
	 */
	private String opinion_father_flow_name  = "" ;
		
	/**
	 * 意见名称
	 */
	private String opinion_name  = "" ;
		
	/**
	 * 意见内容
	 */
	private String opinion_content  = "" ;
		
	/**
	 * 意见类型
	 */
	private String opinion_type  = "" ;
		
	/**
	 * 办理者id
	 */
	private String opinion_transactor_id  = "" ;
		
	/**
	 * 办理者名称
	 */
	private String opinion_transactor_name  = "" ;
		
	/**
	 * 办理者所在部门id
	 */
	private String opinion_tran_dept_id  = "" ;
		
	/**
	 * 办理者所部门名称
	 */
	private String opinion_tran_dept_name  = "" ;
		
	/**
	 * 代理者id
	 */
	private String opinion_proxy_id  = "" ;
		
	/**
	 * 代理者名称
	 */
	private String opinion_proxy_name  = "" ;
		
	/**
	 * 代理者所在部门id
	 */
	private String opinion_proxy_dept_id  = "" ;
		
	/**
	 * 代理者所部门名称
	 */
	private String opinion_proxy_dept_name  = "" ;
		
	/**
	 * 代理时间
	 */
	private String opinion_proxy_time  = "" ;
		
	/**
	 * 办理时间
	 */
	private String opinion_transact_time  = "" ;
		
	/**
	 * 意见状态
	 */
	private String opinion_state  = "" ;
		
	/**
	 * 获取意见id
	 * @return String
	 */
	public String getOpinion_unid() {
		return opinion_unid;
	}

	/**
	 * 设置意见id
	 * @param opinion_unid
	 *               String 意见id
	 */
	public void setOpinion_unid(String opinion_unid) {
		this.opinion_unid = opinion_unid;
	}
	
	/**
	 * 获取流程实例id
	 * @return String
	 */
	public String getOpinion_flow_instance_id() {
		return opinion_flow_instance_id;
	}

	/**
	 * 设置流程实例id
	 * @param opinion_flow_instance_id
	 *               String 流程实例id
	 */
	public void setOpinion_flow_instance_id(String opinion_flow_instance_id) {
		this.opinion_flow_instance_id = opinion_flow_instance_id;
	}
	
	/**
	 * 获取文档id
	 * @return String
	 */
	public String getOpinion_doc_id() {
		return opinion_doc_id;
	}

	/**
	 * 设置文档id
	 * @param opinion_doc_id
	 *               String 文档id
	 */
	public void setOpinion_doc_id(String opinion_doc_id) {
		this.opinion_doc_id = opinion_doc_id;
	}
	
	/**
	 * 获取流程id
	 * @return String
	 */
	public String getOpinion_flow_id() {
		return opinion_flow_id;
	}

	/**
	 * 设置流程id
	 * @param opinion_flow_id
	 *               String 流程id
	 */
	public void setOpinion_flow_id(String opinion_flow_id) {
		this.opinion_flow_id = opinion_flow_id;
	}
	
	/**
	 * 获取流程名称
	 * @return String
	 */
	public String getOpinion_flow_name() {
		return opinion_flow_name;
	}

	/**
	 * 设置流程名称
	 * @param opinion_flow_name
	 *               String 流程名称
	 */
	public void setOpinion_flow_name(String opinion_flow_name) {
		this.opinion_flow_name = opinion_flow_name;
	}
	
	/**
	 * 获取节点id
	 * @return String
	 */
	public String getOpinion_node_id() {
		return opinion_node_id;
	}

	/**
	 * 设置节点id
	 * @param opinion_node_id
	 *               String 节点id
	 */
	public void setOpinion_node_id(String opinion_node_id) {
		this.opinion_node_id = opinion_node_id;
	}
	
	/**
	 * 获取节点名称
	 * @return String
	 */
	public String getOpinion_node_name() {
		return opinion_node_name;
	}

	/**
	 * 设置节点名称
	 * @param opinion_node_name
	 *               String 节点名称
	 */
	public void setOpinion_node_name(String opinion_node_name) {
		this.opinion_node_name = opinion_node_name;
	}
	
	/**
	 * 获取父流程id
	 * @return String
	 */
	public String getOpinion_father_flow_id() {
		return opinion_father_flow_id;
	}

	/**
	 * 设置父流程id
	 * @param opinion_father_flow_id
	 *               String 父流程id
	 */
	public void setOpinion_father_flow_id(String opinion_father_flow_id) {
		this.opinion_father_flow_id = opinion_father_flow_id;
	}
	
	/**
	 * 获取父流程名称
	 * @return String
	 */
	public String getOpinion_father_flow_name() {
		return opinion_father_flow_name;
	}

	/**
	 * 设置父流程名称
	 * @param opinion_father_flow_name
	 *               String 父流程名称
	 */
	public void setOpinion_father_flow_name(String opinion_father_flow_name) {
		this.opinion_father_flow_name = opinion_father_flow_name;
	}
	
	/**
	 * 获取意见名称
	 * @return String
	 */
	public String getOpinion_name() {
		return opinion_name;
	}

	/**
	 * 设置意见名称
	 * @param opinion_name
	 *               String 意见名称
	 */
	public void setOpinion_name(String opinion_name) {
		this.opinion_name = opinion_name;
	}
	
	/**
	 * 获取意见内容
	 * @return String
	 */
	public String getOpinion_content() {
		return opinion_content;
	}

	/**
	 * 设置意见内容
	 * @param opinion_content
	 *               String 意见内容
	 */
	public void setOpinion_content(String opinion_content) {
		this.opinion_content = opinion_content;
	}
	
	/**
	 * 获取意见类型
	 * @return String
	 */
	public String getOpinion_type() {
		return opinion_type;
	}

	/**
	 * 设置意见类型
	 * @param opinion_type
	 *               String 意见类型
	 */
	public void setOpinion_type(String opinion_type) {
		this.opinion_type = opinion_type;
	}
	
	/**
	 * 获取办理者id
	 * @return String
	 */
	public String getOpinion_transactor_id() {
		return opinion_transactor_id;
	}

	/**
	 * 设置办理者id
	 * @param opinion_transactor_id
	 *               String 办理者id
	 */
	public void setOpinion_transactor_id(String opinion_transactor_id) {
		this.opinion_transactor_id = opinion_transactor_id;
	}
	
	/**
	 * 获取办理者名称
	 * @return String
	 */
	public String getOpinion_transactor_name() {
		return opinion_transactor_name;
	}

	/**
	 * 设置办理者名称
	 * @param opinion_transactor_name
	 *               String 办理者名称
	 */
	public void setOpinion_transactor_name(String opinion_transactor_name) {
		this.opinion_transactor_name = opinion_transactor_name;
	}
	
	/**
	 * 获取办理者所在部门id
	 * @return String
	 */
	public String getOpinion_tran_dept_id() {
		return opinion_tran_dept_id;
	}

	/**
	 * 设置办理者所在部门id
	 * @param opinion_tran_dept_id
	 *               String 办理者所在部门id
	 */
	public void setOpinion_tran_dept_id(String opinion_tran_dept_id) {
		this.opinion_tran_dept_id = opinion_tran_dept_id;
	}
	
	/**
	 * 获取办理者所部门名称
	 * @return String
	 */
	public String getOpinion_tran_dept_name() {
		return opinion_tran_dept_name;
	}

	/**
	 * 设置办理者所部门名称
	 * @param opinion_tran_dept_name
	 *               String 办理者所部门名称
	 */
	public void setOpinion_tran_dept_name(String opinion_tran_dept_name) {
		this.opinion_tran_dept_name = opinion_tran_dept_name;
	}
	
	/**
	 * 获取代理者id
	 * @return String
	 */
	public String getOpinion_proxy_id() {
		return opinion_proxy_id;
	}

	/**
	 * 设置代理者id
	 * @param opinion_proxy_id
	 *               String 代理者id
	 */
	public void setOpinion_proxy_id(String opinion_proxy_id) {
		this.opinion_proxy_id = opinion_proxy_id;
	}
	
	/**
	 * 获取代理者名称
	 * @return String
	 */
	public String getOpinion_proxy_name() {
		return opinion_proxy_name;
	}

	/**
	 * 设置代理者名称
	 * @param opinion_proxy_name
	 *               String 代理者名称
	 */
	public void setOpinion_proxy_name(String opinion_proxy_name) {
		this.opinion_proxy_name = opinion_proxy_name;
	}
	
	/**
	 * 获取代理者所在部门id
	 * @return String
	 */
	public String getOpinion_proxy_dept_id() {
		return opinion_proxy_dept_id;
	}

	/**
	 * 设置代理者所在部门id
	 * @param opinion_proxy_dept_id
	 *               String 代理者所在部门id
	 */
	public void setOpinion_proxy_dept_id(String opinion_proxy_dept_id) {
		this.opinion_proxy_dept_id = opinion_proxy_dept_id;
	}
	
	/**
	 * 获取代理者所部门名称
	 * @return String
	 */
	public String getOpinion_proxy_dept_name() {
		return opinion_proxy_dept_name;
	}

	/**
	 * 设置代理者所部门名称
	 * @param opinion_proxy_dept_name
	 *               String 代理者所部门名称
	 */
	public void setOpinion_proxy_dept_name(String opinion_proxy_dept_name) {
		this.opinion_proxy_dept_name = opinion_proxy_dept_name;
	}
	
	/**
	 * 获取代理时间
	 * @return String
	 */
	public String getOpinion_proxy_time() {
		return opinion_proxy_time;
	}

	/**
	 * 设置代理时间
	 * @param opinion_proxy_time
	 *               String 代理时间
	 */
	public void setOpinion_proxy_time(String opinion_proxy_time) {
		this.opinion_proxy_time = opinion_proxy_time;
	}
	
	/**
	 * 获取办理时间
	 * @return String
	 */
	public String getOpinion_transact_time() {
		return opinion_transact_time;
	}

	/**
	 * 设置办理时间
	 * @param opinion_transact_time
	 *               String 办理时间
	 */
	public void setOpinion_transact_time(String opinion_transact_time) {
		this.opinion_transact_time = opinion_transact_time;
	}
	
	/**
	 * 获取意见状态
	 * @return String
	 */
	public String getOpinion_state() {
		return opinion_state;
	}

	/**
	 * 设置意见状态
	 * @param opinion_state
	 *               String 意见状态
	 */
	public void setOpinion_state(String opinion_state) {
		this.opinion_state = opinion_state;
	}
		
}
