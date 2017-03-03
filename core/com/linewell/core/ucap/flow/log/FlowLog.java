package com.linewell.core.ucap.flow.log;
 
/**
 * <p>
 * 	实体
 * </P>
 * 
 * @author qcongyong@linewell.com
 * @date 2012-12-14 17:45:32
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class FlowLog {
			
	/**
	 * 日志id
	 */
	private String log_unid  = "" ;
		
	/**
	 * 流程实例id
	 */
	private String log_flow_instance_id  = "" ;
		
	/**
	 * 文档id
	 */
	private String log_doc_id  = "" ;
		
	/**
	 * 实际序号
	 */
	private String log_sequence_number  = "" ;
		
	/**
	 * 流程id
	 */
	private String log_flow_id  = "" ;
		
	/**
	 * 流程名称
	 */
	private String log_flow_name  = "" ;
		
	/**
	 * 父流程id
	 */
	private String log_father_flow_id  = "" ;
		
	/**
	 * 父流程名称
	 */
	private String log_father_flow_name  = "" ;
		
	/**
	 * 步骤id
	 */
	private String log_step_id  = "" ;
		
	/**
	 * 步骤名称
	 */
	private String log_step_name  = "" ;
		
	/**
	 * 开始时间
	 */
	private String log_begin_time  = "" ;
		
	/**
	 * 结束时间
	 */
	private String log_end_time  = "" ;
		
	/**
	 * 办理人名称
	 */
	private String log_transactor_name  = "" ;
		
	/**
	 * 办理人标识
	 */
	private String log_transactor_id  = "" ;
		
	/**
	 * 办理人所在部门名称
	 */
	private String log_tran_dept_name  = "" ;
		
	/**
	 * 办理人所在部门ID
	 */
	private String log_tran_dept_id  = "" ;
		
	/**
	 * 操作标识
	 */
	private String log_operation_id  = "" ;
		
	/**
	 * 操作名称
	 */
	private String log_operation_name  = "" ;
		
	/**
	 * 下一步骤id
	 */
	private String log_next_step_id  = "" ;
		
	/**
	 * 下一步骤名称
	 */
	private String log_next_step_name  = "" ;
		
	/**
	 * 下一办理人id
	 */
	private String log_next_transactor_id  = "" ;
		
	/**
	 * 下一办理人名称
	 */
	private String log_next_transactor_name  = "" ;
		
	/**
	 * 审批方式
	 */
	private String log_audit_type  = "" ;
		
	/**
	 * 审批方式名称
	 */
	private String log_audit_type_name  = "" ;
		
	/**
	 * 下一步骤审批方式
	 */
	private String log_next_audit_type  = "" ;
		
	/**
	 * 下一步骤审批方式名称
	 */
	private String log_next_audit_type_name  = "" ;
		
	/**
	 * 排序用序号
	 */
	private String log_sequence_number_sort  = "" ;
		
	/**
	 * 下一非节点办理人id
	 */
	private String log_next_not_transactor_id  = "" ;
		
	/**
	 * 下一非节点办理人名称
	 */
	private String log_next_not_transactor_name  = "" ;
		
	/**
	 * 获取日志id
	 * @return String
	 */
	public String getLog_unid() {
		return log_unid;
	}

	/**
	 * 设置日志id
	 * @param log_unid
	 *               String 日志id
	 */
	public void setLog_unid(String log_unid) {
		this.log_unid = log_unid;
	}
	
	/**
	 * 获取流程实例id
	 * @return String
	 */
	public String getLog_flow_instance_id() {
		return log_flow_instance_id;
	}

	/**
	 * 设置流程实例id
	 * @param log_flow_instance_id
	 *               String 流程实例id
	 */
	public void setLog_flow_instance_id(String log_flow_instance_id) {
		this.log_flow_instance_id = log_flow_instance_id;
	}
	
	/**
	 * 获取文档id
	 * @return String
	 */
	public String getLog_doc_id() {
		return log_doc_id;
	}

	/**
	 * 设置文档id
	 * @param log_doc_id
	 *               String 文档id
	 */
	public void setLog_doc_id(String log_doc_id) {
		this.log_doc_id = log_doc_id;
	}
	
	/**
	 * 获取实际序号
	 * @return String
	 */
	public String getLog_sequence_number() {
		return log_sequence_number;
	}

	/**
	 * 设置实际序号
	 * @param log_sequence_number
	 *               String 实际序号
	 */
	public void setLog_sequence_number(String log_sequence_number) {
		this.log_sequence_number = log_sequence_number;
	}
	
	/**
	 * 获取流程id
	 * @return String
	 */
	public String getLog_flow_id() {
		return log_flow_id;
	}

	/**
	 * 设置流程id
	 * @param log_flow_id
	 *               String 流程id
	 */
	public void setLog_flow_id(String log_flow_id) {
		this.log_flow_id = log_flow_id;
	}
	
	/**
	 * 获取流程名称
	 * @return String
	 */
	public String getLog_flow_name() {
		return log_flow_name;
	}

	/**
	 * 设置流程名称
	 * @param log_flow_name
	 *               String 流程名称
	 */
	public void setLog_flow_name(String log_flow_name) {
		this.log_flow_name = log_flow_name;
	}
	
	/**
	 * 获取父流程id
	 * @return String
	 */
	public String getLog_father_flow_id() {
		return log_father_flow_id;
	}

	/**
	 * 设置父流程id
	 * @param log_father_flow_id
	 *               String 父流程id
	 */
	public void setLog_father_flow_id(String log_father_flow_id) {
		this.log_father_flow_id = log_father_flow_id;
	}
	
	/**
	 * 获取父流程名称
	 * @return String
	 */
	public String getLog_father_flow_name() {
		return log_father_flow_name;
	}

	/**
	 * 设置父流程名称
	 * @param log_father_flow_name
	 *               String 父流程名称
	 */
	public void setLog_father_flow_name(String log_father_flow_name) {
		this.log_father_flow_name = log_father_flow_name;
	}
	
	/**
	 * 获取步骤id
	 * @return String
	 */
	public String getLog_step_id() {
		return log_step_id;
	}

	/**
	 * 设置步骤id
	 * @param log_step_id
	 *               String 步骤id
	 */
	public void setLog_step_id(String log_step_id) {
		this.log_step_id = log_step_id;
	}
	
	/**
	 * 获取步骤名称
	 * @return String
	 */
	public String getLog_step_name() {
		return log_step_name;
	}

	/**
	 * 设置步骤名称
	 * @param log_step_name
	 *               String 步骤名称
	 */
	public void setLog_step_name(String log_step_name) {
		this.log_step_name = log_step_name;
	}
	
	/**
	 * 获取开始时间
	 * @return String
	 */
	public String getLog_begin_time() {
		return log_begin_time;
	}

	/**
	 * 设置开始时间
	 * @param log_begin_time
	 *               String 开始时间
	 */
	public void setLog_begin_time(String log_begin_time) {
		this.log_begin_time = log_begin_time;
	}
	
	/**
	 * 获取结束时间
	 * @return String
	 */
	public String getLog_end_time() {
		return log_end_time;
	}

	/**
	 * 设置结束时间
	 * @param log_end_time
	 *               String 结束时间
	 */
	public void setLog_end_time(String log_end_time) {
		this.log_end_time = log_end_time;
	}
	
	/**
	 * 获取办理人名称
	 * @return String
	 */
	public String getLog_transactor_name() {
		return log_transactor_name;
	}

	/**
	 * 设置办理人名称
	 * @param log_transactor_name
	 *               String 办理人名称
	 */
	public void setLog_transactor_name(String log_transactor_name) {
		this.log_transactor_name = log_transactor_name;
	}
	
	/**
	 * 获取办理人标识
	 * @return String
	 */
	public String getLog_transactor_id() {
		return log_transactor_id;
	}

	/**
	 * 设置办理人标识
	 * @param log_transactor_id
	 *               String 办理人标识
	 */
	public void setLog_transactor_id(String log_transactor_id) {
		this.log_transactor_id = log_transactor_id;
	}
	
	/**
	 * 获取办理人所在部门名称
	 * @return String
	 */
	public String getLog_tran_dept_name() {
		return log_tran_dept_name;
	}

	/**
	 * 设置办理人所在部门名称
	 * @param log_tran_dept_name
	 *               String 办理人所在部门名称
	 */
	public void setLog_tran_dept_name(String log_tran_dept_name) {
		this.log_tran_dept_name = log_tran_dept_name;
	}
	
	/**
	 * 获取办理人所在部门ID
	 * @return String
	 */
	public String getLog_tran_dept_id() {
		return log_tran_dept_id;
	}

	/**
	 * 设置办理人所在部门ID
	 * @param log_tran_dept_id
	 *               String 办理人所在部门ID
	 */
	public void setLog_tran_dept_id(String log_tran_dept_id) {
		this.log_tran_dept_id = log_tran_dept_id;
	}
	
	/**
	 * 获取操作标识
	 * @return String
	 */
	public String getLog_operation_id() {
		return log_operation_id;
	}

	/**
	 * 设置操作标识
	 * @param log_operation_id
	 *               String 操作标识
	 */
	public void setLog_operation_id(String log_operation_id) {
		this.log_operation_id = log_operation_id;
	}
	
	/**
	 * 获取操作名称
	 * @return String
	 */
	public String getLog_operation_name() {
		return log_operation_name;
	}

	/**
	 * 设置操作名称
	 * @param log_operation_name
	 *               String 操作名称
	 */
	public void setLog_operation_name(String log_operation_name) {
		this.log_operation_name = log_operation_name;
	}
	
	/**
	 * 获取下一步骤id
	 * @return String
	 */
	public String getLog_next_step_id() {
		return log_next_step_id;
	}

	/**
	 * 设置下一步骤id
	 * @param log_next_step_id
	 *               String 下一步骤id
	 */
	public void setLog_next_step_id(String log_next_step_id) {
		this.log_next_step_id = log_next_step_id;
	}
	
	/**
	 * 获取下一步骤名称
	 * @return String
	 */
	public String getLog_next_step_name() {
		return log_next_step_name;
	}

	/**
	 * 设置下一步骤名称
	 * @param log_next_step_name
	 *               String 下一步骤名称
	 */
	public void setLog_next_step_name(String log_next_step_name) {
		this.log_next_step_name = log_next_step_name;
	}
	
	/**
	 * 获取下一办理人id
	 * @return String
	 */
	public String getLog_next_transactor_id() {
		return log_next_transactor_id;
	}

	/**
	 * 设置下一办理人id
	 * @param log_next_transactor_id
	 *               String 下一办理人id
	 */
	public void setLog_next_transactor_id(String log_next_transactor_id) {
		this.log_next_transactor_id = log_next_transactor_id;
	}
	
	/**
	 * 获取下一办理人名称
	 * @return String
	 */
	public String getLog_next_transactor_name() {
		return log_next_transactor_name;
	}

	/**
	 * 设置下一办理人名称
	 * @param log_next_transactor_name
	 *               String 下一办理人名称
	 */
	public void setLog_next_transactor_name(String log_next_transactor_name) {
		this.log_next_transactor_name = log_next_transactor_name;
	}
	
	/**
	 * 获取审批方式
	 * @return String
	 */
	public String getLog_audit_type() {
		return log_audit_type;
	}

	/**
	 * 设置审批方式
	 * @param log_audit_type
	 *               String 审批方式
	 */
	public void setLog_audit_type(String log_audit_type) {
		this.log_audit_type = log_audit_type;
	}
	
	/**
	 * 获取审批方式名称
	 * @return String
	 */
	public String getLog_audit_type_name() {
		return log_audit_type_name;
	}

	/**
	 * 设置审批方式名称
	 * @param log_audit_type_name
	 *               String 审批方式名称
	 */
	public void setLog_audit_type_name(String log_audit_type_name) {
		this.log_audit_type_name = log_audit_type_name;
	}
	
	/**
	 * 获取下一步骤审批方式
	 * @return String
	 */
	public String getLog_next_audit_type() {
		return log_next_audit_type;
	}

	/**
	 * 设置下一步骤审批方式
	 * @param log_next_audit_type
	 *               String 下一步骤审批方式
	 */
	public void setLog_next_audit_type(String log_next_audit_type) {
		this.log_next_audit_type = log_next_audit_type;
	}
	
	/**
	 * 获取下一步骤审批方式名称
	 * @return String
	 */
	public String getLog_next_audit_type_name() {
		return log_next_audit_type_name;
	}

	/**
	 * 设置下一步骤审批方式名称
	 * @param log_next_audit_type_name
	 *               String 下一步骤审批方式名称
	 */
	public void setLog_next_audit_type_name(String log_next_audit_type_name) {
		this.log_next_audit_type_name = log_next_audit_type_name;
	}
	
	/**
	 * 获取排序用序号
	 * @return String
	 */
	public String getLog_sequence_number_sort() {
		return log_sequence_number_sort;
	}

	/**
	 * 设置排序用序号
	 * @param log_sequence_number_sort
	 *               String 排序用序号
	 */
	public void setLog_sequence_number_sort(String log_sequence_number_sort) {
		this.log_sequence_number_sort = log_sequence_number_sort;
	}
	
	/**
	 * 获取下一非节点办理人id
	 * @return String
	 */
	public String getLog_next_not_transactor_id() {
		return log_next_not_transactor_id;
	}

	/**
	 * 设置下一非节点办理人id
	 * @param log_next_not_transactor_id
	 *               String 下一非节点办理人id
	 */
	public void setLog_next_not_transactor_id(String log_next_not_transactor_id) {
		this.log_next_not_transactor_id = log_next_not_transactor_id;
	}
	
	/**
	 * 获取下一非节点办理人名称
	 * @return String
	 */
	public String getLog_next_not_transactor_name() {
		return log_next_not_transactor_name;
	}

	/**
	 * 设置下一非节点办理人名称
	 * @param log_next_not_transactor_name
	 *               String 下一非节点办理人名称
	 */
	public void setLog_next_not_transactor_name(String log_next_not_transactor_name) {
		this.log_next_not_transactor_name = log_next_not_transactor_name;
	}
		
}
