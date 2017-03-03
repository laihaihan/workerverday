package com.linewell.core.user.center;

import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.linewell.apas.service.ApasServiceManager;
import com.linewell.core.db.JDBCTool;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.MD5Builder;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.platform.cache.user.UserManager;
import com.linewell.ucap.resource.ManageException;
import com.linewell.ucap.session.Session;

/**
 * 类说明：用户个人中心
 *
 * @author qcongyong 
 * @date 2012-3-31
 * @version 1.0  
 */
public class UserCenterManager {
	private static Logger log = Logger.getLogger(ApasServiceManager.class);
	/**
	 * 验证用户密码
	 * 
	 * @param request
	 * @return
	 */
	public boolean checkPassword(HttpServletRequest request){
		String unid = request.getParameter("unid");
		String password = request.getParameter("password");
		UserManager userManager = new UserManager();
		User user = new User();
		try {
			user = userManager.doFindByUnid(unid);
		} catch (ManageException e) {
			log.info("验证用户密码:"+e.toString());
		}
		return user.getPassword().equals(MD5Builder.getMD5(password));
	}
	
	/**
	 * 设置用户密码
	 * 
	 * @param request
	 * @return
	 */
	public boolean setUserPassword(HttpServletRequest request){
		String unid = request.getParameter("unid");
		String password = request.getParameter("password");
		password = MD5Builder.getMD5(password);//MD5加密
		
		boolean result = true;
		try {
			String sql = "update ucap_user set user_password=? where user_unid=?";
			String[] params = new String[]{password,unid};
			result = JDBCTool.doSQLUpdate(GlobalParameter.APP_UCAP, sql, params);
		} catch (SQLException e) {
		    log.error(e);
		}
		return result;
	}
	
	/**
	 * 设置用户信息
	 * 
	 * @param request
	 * @return
	 */
	public boolean setUserInfo(HttpServletRequest request){
		String unid = request.getParameter("unid");
		String sex = request.getParameter("sex");
		String loginName = request.getParameter("loginName");
		String mobile = request.getParameter("mobile");
		String mail = request.getParameter("mail");
		
		boolean result = true;
		try {
			String sql = "update ucap_user set user_sex=?,user_login_name=?,user_mobile=?,user_mail=? where user_unid=?";
			String[] params = new String[]{sex,loginName,mobile,mail,unid};
			result = JDBCTool.doSQLUpdate(GlobalParameter.APP_UCAP, sql, params);
			//重新设置session中的user
			if(result){
				Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
				User user = ucapSession.getUser();
				user.setSex(sex);
				user.setName(loginName);
				user.setMobile(mobile);
				user.setMail(mail);
				ucapSession.setUser(user);
			}
		} catch (SQLException e) {
		    log.error(e);
		}
		return result;
	}

	/**
	 * 设置用户意见
	 * 
	 * @param request
	 * @return
	 */
	public boolean setUserOpinion(HttpServletRequest request){
		String userunid = request.getParameter("userunid");
		String[] opinion = request.getParameterValues("opinion");
		
		boolean result = true;
		try {
			//删除旧纪录
			String sql = "delete ucap_opinion where opinion_user_unid=?";
			JDBCTool.doSQLUpdate(GlobalParameter.APP_UCAP,sql, new String[]{userunid});

			//插入新纪录
			if(null != opinion && opinion.length > 0){
				for (int i = 0; i < opinion.length; i++) {
					if (StrUtil.isNull(opinion[i])) {
						continue;
					}
					sql = "insert into ucap_opinion(opinion_unid,opinion_user_unid,opinion_sort,opinion_content) ";
					sql += "values (?,?,?,?)";
					Object[] params = new Object[]{new UNIDGenerate().getUnid(),userunid,i + 1,opinion[i]};
					result = result && JDBCTool.doSQLUpdate(GlobalParameter.APP_UCAP,sql, params);
				}
			}
		} catch (SQLException e) {
		    log.error(e);
		}
		return result;
	}
}