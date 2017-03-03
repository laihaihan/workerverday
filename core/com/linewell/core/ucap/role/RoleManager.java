package com.linewell.core.ucap.role;

import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.db.JDBCTool;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.platform.cache.user.User;

/**
 * <p>
 *    角色管理
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 5, 2012
 * @version 1.0  
 */
public class RoleManager {
    private static final Logger logger = Logger.getLogger(RoleManager.class);
	
	private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_ROLE","ROLE_UNID",GlobalParameter.APP_UCAP);
	
	/**
	 * 新增
	 */
	public boolean doSave(Role role){
		return dbObjectManager.doSave(role);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Role role){
		return dbObjectManager.doUpdate(role);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public Role doFindBeanByKey(String keyValue){
		return (Role)dbObjectManager.doFindBeanByKey(new Role(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new Role(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public Role doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (Role)list.get(0) : null;
	}
	
	/**
	 * 根据主键删除单个对象
	 */
	public boolean doDeleteByKey(String keyValue){
		String condition = "ROLE_UNID='" + keyValue + "'";
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 获取当前角色用用的模块列表
	 * @param roleunid
	 * @return
	 */
	public String[][] getRoleModuleList(String roleunid){
		String sql = " select t.bp_objectid from ucap_bussiness_permission t where t.bp_subjectid = '"+roleunid+"'";
		String[][] rs = new String[0][0];
		try {
			rs =  JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return rs;
	}
	
	/**
	 * 获取当前生效的角色(针对一个用户拥有多个系统权限的情况，取得该用户在当前登陆系统中的所属角色)
	 * @param user
	 * @param app_unid
	 * @return
	 */
	public Role getEffectiveRole(User user,String app_unid){
		Role role = null;
		String[] roleIds = StrUtil.formatNull(user.getRoles()).split(",");
		for (int i = 0; i < roleIds.length; i++) {
			String condition = "role_unid='"+roleIds[i]+"' and role_belong_to_app='"+app_unid+"'";
			role = this.doFindBeanByCondition(condition, null);
			if(null != role){
				break;
			}
		}
		return role;
	}
}
