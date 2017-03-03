package com.linewell.core.view.ext.param;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.linewell.core.util.StrUtil;
import com.linewell.ucap.platform.authorized.app.App;
import com.linewell.ucap.platform.cache.dept.Dept;
import com.linewell.ucap.platform.cache.dept.DeptManager;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.resource.ManageException;
import com.linewell.ucap.session.Session;

public class AppParamService {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(AppParamService.class); 

	private static AppParamService appParamService;

	private static final String DEPT_UNID = "DEPT_UNID";
	private static final String DEPT_NAME = "DEPT_NAME";
	private static final String USER_UNID = "USER_UNID";
	private static final String USER_NAME = "USER_NAME";
	private static final String USER_ROLES = "USER_ROLES";
	private static final String USER_DISPLAY_NAME = "USER_DISPLAY_NAME";
	private static final String APP_UNID = "APP_UNID";
	private static final String SYS_UNID = "SYS_UNID";

	public static AppParamService newInstance() {
		if (appParamService == null) {
			appParamService = new AppParamService();
		}
		return appParamService;
	}

	public String setAppParam(HttpServletRequest request,String sql) {
		Session session = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		User user = session.getUser();
		App app = session.getApp();

		DeptManager deptMgr = new DeptManager();
		Dept unit = null;
		try {
			unit = deptMgr.doFindByUnid(session.getUser().getEffectiveDept());
		} catch (ManageException e) {
		    logger.error(e);
		}
		
		if (sql.indexOf("#{DEPTUNID}") > -1) {
			sql = sql.replaceAll("\\#\\{DEPTUNID\\}", unit.getUnid());
		}
		if (sql.indexOf("#{DEPTNAME}") > -1) {
			sql = sql.replaceAll("\\#\\{DEPTNAME\\}", unit.getName());
		}
		if (sql.indexOf("#{USERUNID}") > -1) {
			sql = sql.replaceAll("\\#\\{USERUNID\\}", user.getUnid());
		}
		if (sql.indexOf("#{USERNAME}") > -1) {
			sql = sql.replaceAll("\\#\\{USERNAME\\}", user.getName());
		}

		if (sql.indexOf("#{USER_ROLES}") > -1) {
			sql = sql.replaceAll("\\#\\{USER_ROLES\\}", user.getRoles());
		}
		
		if (sql.indexOf("#{" + DEPT_UNID + "}") > -1) {
			sql = sql.replaceAll("\\#\\{" + DEPT_UNID + "\\}", unit.getUnid());
		}
		if (sql.indexOf("#{" + DEPT_NAME + "}") > -1) {
			sql = sql.replaceAll("\\#\\{" + DEPT_NAME + "\\}", unit.getName());
		}
		if (sql.indexOf("#{" + USER_UNID + "}") > -1) {
			sql = sql.replaceAll("\\#\\{" + USER_UNID + "\\}", user.getUnid());
		}
		if (sql.indexOf("#{" + USER_NAME + "}") > -1) {
			sql = sql.replaceAll("\\#\\{" + USER_NAME + "\\}", user.getName());
		}		
		if (sql.indexOf("#{" + USER_DISPLAY_NAME + "}") > -1) {
			sql = sql.replaceAll("\\#\\{" + USER_DISPLAY_NAME + "\\}", user.getDisplayName());
		}
		if (sql.indexOf("#{" + APP_UNID + "}") > -1) {
			String appUnid = request.getParameter("APP_UNID");
			if (!StrUtil.isNull(appUnid)) {
				sql = sql.replaceAll("\\#\\{" + APP_UNID + "\\}", appUnid);
			} else {
				sql = sql.replaceAll("\\#\\{" + APP_UNID + "\\}", app.getUnid());
			}
		}
		
		return sql;
	}
}
