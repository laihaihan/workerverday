package com.linewell.core.ucap.select.window;

import java.util.List;
import org.apache.log4j.Logger;
import com.linewell.core.ucap.dept.UcapDept;
import com.linewell.core.ucap.dept.UcapDeptManager;
import com.linewell.core.ucap.role.Role;
import com.linewell.core.ucap.role.RoleManager;
import com.linewell.core.ucap.user.User;
import com.linewell.core.ucap.user.UserManager;
import com.linewell.core.util.ListUtil;
import com.linewell.core.util.StrUtil;
/**
 * <p>
 * 	业务操作Business
 * </P>
 * 
 * @author lfunian@linewell.com
 * @date 2013-7-22
 * @version 1.00
 * <p>
 * 	Copyright (c) 2013 www.linewell.com
 * </p>
 */
public class SelectWindowBusiness {
	private static final Logger logger = Logger.getLogger(SelectWindowBusiness.class);
	
	/************************部门信息树 begin*********************************/
	//通过部门所属父部门获取部门树信息
	public String getDeptTreeByBelongTo(String belongTo, String jndi){
		UcapDeptManager manager = new UcapDeptManager();
		StringBuffer rtJson = new StringBuffer();
		List list = null;
		try {
			rtJson.append("[");
			String condition = "";
			if (!StrUtil.isNull(belongTo)) {
				condition = "dept_belongto = '" + belongTo + "'";
			} else {
				condition = "dept_belongto is null";
			}
			list = manager.doFindListByCondition(condition, null);
			rtJson.append(recurrenceDeptIfno(list));
			rtJson.append("]");
		} catch (Exception e) {
			logger.error(e);
		}
		return rtJson.toString();
	}
	
	//获取部门信息
	private String recurrenceDeptIfno(List list){
		boolean flag;
		StringBuffer rtJson = new StringBuffer();
		UcapDeptManager manager = new UcapDeptManager();
		List deptList = null;
		for (Object object : list) {
			flag = true;
			rtJson.append("{");
			UcapDept ucapDept = (UcapDept)object;
			String condition = "dept_belongto = '" + ucapDept.getDept_unid() + "'";
			deptList = manager.doFindListByCondition(condition, null);
			if (ListUtil.isNull(deptList)) {
				flag = false;
			}
			rtJson.append("id:\""+ucapDept.getDept_unid()+"\",");//部门unid
			rtJson.append("name:\""+ucapDept.getDept_name()+"\",");//部门名称
			rtJson.append("parent:\""+flag+"\",");//子节点
			rtJson.append("},");
		}
		return rtJson.substring(0, rtJson.lastIndexOf(","));
	}
	/************************部门信息树 end*********************************/
	
	/************************用户信息树 begin*********************************/
	//通过所属部门获取用户信息
	public String getUserTreeByBelongTo(String belongTo, String jndi){
		UcapDeptManager manager = new UcapDeptManager();
		UserManager userManager = new UserManager();
		StringBuffer rtJson = new StringBuffer();
		List<UcapDept> deptList = null;
		List<User> userList = null;
		try {
			rtJson.append("[");
			String condition = "";
			if (!StrUtil.isNull(belongTo)) {
				condition = "dept_belongto = '" + belongTo + "'";
				deptList = manager.doFindListByCondition(condition, null);
				condition = "user_depts = '" + belongTo + "'";
				userList = userManager.doFindListByCondition(condition, null);
			} else {
				condition = "dept_belongto is null";
				deptList = manager.doFindListByCondition(condition, null);
			}
			rtJson.append(recurrenceUsersIfno(deptList, userList));
			rtJson.append("]");
		} catch (Exception e) {
			logger.error(e);
		}
		return rtJson.toString();
	}
	
	//获取用户信息
	private String recurrenceUsersIfno(List<UcapDept> deptList, List<User> userList){
		StringBuffer rtJson = new StringBuffer();
		UcapDeptManager manager = new UcapDeptManager();
		UserManager userManager = new UserManager();
		List<UcapDept> ucapDeptList = null;
		List<User> usersList = null;
		boolean flag;
		if (!ListUtil.isNull(userList)) {
			for (User user : userList) {
				rtJson.append("{");
				rtJson.append("id:\""+user.getUser_unid()+"\",");//用户unid
				rtJson.append("name:\""+user.getUser_display_name()+"\",");//用户名称
				rtJson.append("parent:\""+false+"\",");//子节点
				rtJson.append("},");
			}
		}
		if (!ListUtil.isNull(deptList)) {
			String condition = null;
			for (UcapDept dept : deptList) {
				flag = true;
				rtJson.append("{");
				rtJson.append("id:\""+dept.getDept_unid()+"\",");//部门unid
				rtJson.append("name:\""+dept.getDept_name()+"\",");//部门名称
				condition = "dept_belongto = '" + dept.getDept_unid() + "'";
				ucapDeptList = manager.doFindListByCondition(condition, null);
				condition = "user_depts = '" + dept.getDept_unid() + "'";
				usersList = userManager.doFindListByCondition(condition, null);
				if(ListUtil.isNull(ucapDeptList) && ListUtil.isNull(usersList)){
					flag = false;
				}
				rtJson.append("parent:\""+flag+"\",");//父节点
				rtJson.append("},");
			}
		}
		return rtJson.substring(0, rtJson.lastIndexOf(","));
	}
	/************************用户信息树 end*********************************/
	
	/************************角色信息树 begin*********************************/
	//通过所属角色获取角色信息
	public String getRoleTreeByBelongTo(String belongTo, String jndi, String appUnid){
		RoleManager manager = new RoleManager();
		StringBuffer rtJson = new StringBuffer();
		List roleList = null;
		try {
			rtJson.append("[");
			String condition = "";
			if (!StrUtil.isNull(belongTo)) {
				condition = "role_funid = '" + belongTo + "' and role_belong_to_app = '" + appUnid + "' order by role_sort asc";
				roleList = manager.doFindListByCondition(condition, null);
			} else {
				condition = "role_funid is null and role_belong_to_app = '" + appUnid + "' order by role_sort asc";
				roleList = manager.doFindListByCondition(condition, null);
			}
			rtJson.append(recurrenceRoleIfno(roleList, appUnid));
			rtJson.append("]");
		} catch (Exception e) {
			logger.error(e);
		}
		return rtJson.toString();
	}
	
	//获取角色信息
	private String recurrenceRoleIfno(List roleList, String appUnid){
		StringBuffer rtJson = new StringBuffer();
		RoleManager manager = new RoleManager();
		List rolesList = null;
		boolean flag;
		if (!ListUtil.isNull(roleList)) {
			String condition = null;
			for (Object object : roleList) {
				Role role = (Role)object;
				flag = true;
				rtJson.append("{");
				rtJson.append("id:\""+role.getRole_unid()+"\",");//角色unid
				rtJson.append("name:\""+role.getRole_name()+"\",");//角色名称
				condition = "role_funid = '" + role.getRole_unid() + "' and role_belong_to_app = '" + appUnid + "'";
				rolesList = manager.doFindListByCondition(condition, null);
				if(ListUtil.isNull(rolesList)){
					flag = false;
				}
				rtJson.append("parent:\""+flag+"\",");//父节点
				rtJson.append("},");
			}
		}
		return rtJson.substring(0, rtJson.lastIndexOf(","));
	}
	/************************角色信息树 end*********************************/
}
