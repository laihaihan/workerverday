

package com.linewell.core.platform;

import java.sql.SQLException;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucapx.user.UserApi;

/**
 *功能说明：对系统平台的用户相关操作进行重新封装
 *<P></P>
 *@author chh
 *@since 2012
 *
 */
public class UserInfoAPI {
	
	private static Logger log = Logger.getLogger(UserInfoAPI.class);
	
	/**
	 * 功能说明:是否超级管理员
	 * 
	 * @return
	 */
	public static boolean isAdmin(String userName){
		return "admin".equals(userName);
	}
	
	public static boolean isAdminByRole(String roleId){
		if(StrUtil.isNull(roleId))return false;
		 if(roleId.indexOf("D5BA59F9ABB8030F920F2245B8AD5142")>0){
			return true;
		}
		 return false;
	}
	
	/**
	 * 功能说明:根据用户unid获取User对象
	 * 
	 * @param userUnid
	 */
	public static User getUserByUnid(String userUnid){
		UserApi userApi = new UserApi();
		return userApi.getUser(userUnid); 
	}

	/**
	 * 功能说明:根据用户别名获取User对象
	 * 
	 * @param alias
	 */
	public static User getUserByAlias(String alias){
		User user = null;
		try {
			//先根据别名取，如果取不到，则根据中文名去取
			String sql ="select nvl(user_unid,'0') from ucap_user  where user_login_name='"+alias+"'";
			String[][] ret = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
			UserApi userApi = new UserApi();
			user = userApi.getUser(ret[1][0]); 
			if(null == user){	
				sql ="select nvl(user_unid,'0') from ucap_user  where user_display_name='"+alias+"'";
				ret = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
				user = userApi.getUser(ret[1][0]); 
			}	
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		return null;
	}
	
	/**
	 * 功能说明:根据用户unid获取用户unid
	 * 
	 * @param unid
	 */
	public static String getAliasByUnid(String unid){
		String sql ="select user_login_name from ucap_user where user_unid='"+unid+"'";
		try {
			String[][] ret = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP, sql);
			if(ret.length==2){
				return ret[1][0];
			}
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		return null;
	}
}