package com.linewell.core.ucap.role.dept;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.session.Session;

/**
 * <p>
 *    角色分管部门manager
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 5, 2012
 * @version 1.0  
 */
public class RoleDeptManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_ROLEDEPT","ROLEDEPT_UNID",GlobalParameter.APP_UCAP);
	
	/**
	 * 新增
	 */
	public boolean doSave(RoleDept roleDept){
		return dbObjectManager.doSave(roleDept);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(RoleDept roleDept){
		return dbObjectManager.doUpdate(roleDept);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public RoleDept doFindBeanByKey(String keyValue){
		return (RoleDept)dbObjectManager.doFindBeanByKey(new RoleDept(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new RoleDept(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public RoleDept doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (RoleDept)list.get(0) : null;
	}
	
	/**
	 * 根据主键删除单个对象
	 */
	public boolean doDeleteByKey(String keyValue){
		String condition = "ROLEDEPT_UNID='" + keyValue + "'";
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 保存角色部门权限，通过此方法一个角色默认且只能帮顶一个部门
	 * @param request
	 * @return 操作是否成功
	 */
	public boolean saveByRole(HttpServletRequest request){
    	String roledept_role_unid = request.getParameter("role_unid");
    	RoleDeptManager roleDeptManager = new RoleDeptManager();
    	RoleDept roleDept = new RoleDept();
    	roleDept.setRoledept_unid(new UNIDGenerate().getUnid());
    	roleDept.setRoledept_role_unid(roledept_role_unid);
    	
    	//当前登录用户所属部门
		Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		User user = ucapSession.getUser();
		roleDept.setRoledept_dept_unid(user.getDepts());
		
		//删除角色以前绑定的部门
		roleDeptManager.doDeleteByCondition(" roledept_role_unid='"+roledept_role_unid+"' and roledept_dept_unid = '"+user.getDepts()+"'");
		//保存
		return roleDeptManager.doSave(roleDept);
	}
}
