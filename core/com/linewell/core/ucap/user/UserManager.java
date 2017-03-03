package com.linewell.core.ucap.user;

import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.db.JDBCTool;
import com.linewell.core.system.GlobalParameter;

/**
 * <p>
 *    用户信息的数据库操作
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 5, 2012
 * @version 1.0  
 */
public class UserManager {
    private static final Logger logger = Logger.getLogger(UserManager.class);
	
	private DbObjectManager dbObjectManager = new DbObjectManager("UCAP_USER","USER_UNID",GlobalParameter.APP_UCAP);
	
	/**
	 * 新增
	 */
	public boolean doSave(User user){
		return dbObjectManager.doSave(user);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(User user){
		return dbObjectManager.doUpdate(user);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public User doFindBeanByKey(String keyValue){
		return (User)dbObjectManager.doFindBeanByKey(new User(), keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new User(),condition,objs);
	}
	
	/**
	 * 根据条件查找单个对象
	 */
	public User doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (User)list.get(0) : null;
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}

	/**
	 * 功能说明:验证是否已经存在此用户
	 * @param ucapUser
	 * @return
	 */
	public String IsUserExist(User user){
		String result="no_exist";
		try{
			String login_name = user.getUser_login_name();
			String sql = "SELECT COUNT(1) NUM FROM UCAP_USER WHERE USER_LOGIN_NAME = '"+login_name+"'";
			String[][] ret = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
			if(ret.length>1){
				int num = Integer.parseInt(ret[1][0]);
				if(num > 0){
					result="is_exist";
				}
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		return result;
	}
}
