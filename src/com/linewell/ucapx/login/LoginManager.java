package com.linewell.ucapx.login;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.linewell.ucap.log.LoginErrorLog;
import com.linewell.ucap.log.LoginErrorLogManager;
import com.linewell.ucap.log.LoginLog;
import com.linewell.ucap.log.LoginLogManager;
import com.linewell.ucap.platform.authorized.app.App;
import com.linewell.ucap.platform.authorized.app.AppManager;
import com.linewell.ucap.platform.authorized.scheme.Scheme;
import com.linewell.ucap.platform.authorized.scheme.SchemeManager;
import com.linewell.ucap.platform.cache.login.Login;
import com.linewell.ucap.platform.cache.style.Style;
import com.linewell.ucap.platform.cache.style.StyleManager;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.platform.cache.user.UserManager;
import com.linewell.ucap.platform.cache.user.UserStyle;
import com.linewell.ucap.resource.ManageException;
import com.linewell.ucap.resource.ResourceCache;
import com.linewell.ucap.resource.ResourceContext;
import com.linewell.ucap.resource.ResourceException;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.util.DateTime;
import com.linewell.ucap.util.UNIDGenerate;
import com.linewell.ucap.util.UcapRequest;
import com.linewell.ucap.web.login.LoginResultManager;
import com.linewell.ucap.web.login.UserLoginBean;
import com.linewell.ucap.web.login.WebLoginManager;
import com.linewell.ucapx.user.UserApi;

class LoginManager {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(LoginManager.class);

    UserLoginBean verifyLogin(String username, String password, String ip, String domain) {
        Login loginCfg = getLoginConfig();
        boolean passwordType;
        if (StringUtils.isEmpty(loginCfg.getSavePassMode()))
            passwordType = false;
        else {
            passwordType = true;
        }
        UcapRequest ucapRequest = new UcapRequest();
        ucapRequest.setRemoteAddr(ip);
        ucapRequest.setParameter("domainName", domain);

        return LoginResultManager.verifyUser(ucapRequest, username, password, passwordType);
    }

    UserLoginBean verifyLogin(String username, String password) {
        return verifyLogin(username, password, "API", "");
    }

    List<App> getUserAppList(String userUnid) {
        return WebLoginManager.getApps(getDefaultSession(userUnid));
    }

    List<App> getAppList() {
        AppManager am = new AppManager();
        try {
            return am.getAssignApp();
        } catch (ManageException e) {
            logger.error(e);
        }
        return null;
    }

    List<Style> getStyleList() {
        StyleManager sm = new StyleManager();
        return sm.doFindAll();
    }

    Style getLastStyle(String userUnid) {
        UserStyle userStyle = getUserStyle(userUnid);
        if (userStyle == null)
            return null;
        try {
            StyleManager sm = new StyleManager();
            return sm.doFindByUnid(userStyle.getStyleUnid());
        } catch (ManageException e) {
        }
        return null;
    }

    UserStyle getUserStyle(String userUnid) {
        UserManager um = new UserManager();
        try {
            return um.doFindLastByUserUnid(userUnid);
        } catch (ManageException e) {
            logger.error(e);
        }
        return null;
    }

    boolean saveUserStyle(UserStyle userStyle) {
        UserManager um = new UserManager();
        try {
            return um.doSaveUserStyle(userStyle);
        } catch (ManageException e) {
            logger.error(e);
        }
        return false;
    }

    boolean saveUserStyle(String styleUnid, String userUnid, String appUnid, boolean isDefault) {
        UserStyle userStyle = new UserStyle();

        userStyle.setStyleUnid(styleUnid);
        userStyle.setAppPunid(appUnid);
        userStyle.setDefault(isDefault);
        userStyle.setUserUnid(userUnid);

        DateTime dateTime = new DateTime();
        userStyle.setLoginTime(dateTime.getNowTime("yyyy-MM-dd HH:mm"));
        dateTime = null;

        UNIDGenerate unidGenerate = new UNIDGenerate();
        userStyle.setUnid(unidGenerate.getUnid());
        unidGenerate = null;

        return saveUserStyle(userStyle);
    }

    Scheme getScheme(String appUnid, String userUnid) {
        SchemeManager sm = new SchemeManager();
        try {
            return sm.getSchemeByAppId(appUnid, getDefaultSession(userUnid));
        } catch (ManageException e) {
            logger.error(e);
        }
        return null;
    }

    Login getLoginConfig() {
        ResourceContext rc = ResourceContext.newInstance();
        try {
            ResourceCache cache = rc.getResourceCache("login");
            return (Login) cache.getResource("");
        } catch (ResourceException e) {
            logger.error(e);
        }
        return null;
    }

    void setLoginLog(String appUnid, User user, String ip, String os, String machine, String browser) {
        LoginLog log = new LoginLog();
        UNIDGenerate ug = new UNIDGenerate();
        log.setBelongToApp(appUnid);
        log.setBrowser(browser);
        log.setDept(user.getDepts());
        log.setIp(ip);
        log.setMachine(machine);
        log.setOs(os);
        log.setTime(DateTime.getNowDateTime());
        log.setUnid(ug.getUnid());
        log.setUser(user.getUnid());
        LoginLogManager lm = new LoginLogManager();
        try {
            lm.doSave(log);
        } catch (ManageException e) {
            logger.error(e);
        }
    }

    void setErrorLog(String userUnid, String deptIds, String ip, String brower, String os) {
        LoginErrorLogManager lm = new LoginErrorLogManager();
        LoginErrorLog lel = new LoginErrorLog();
        UNIDGenerate ug = new UNIDGenerate();
        lel.setIp(ip);
        lel.setBrowser(brower);
        lel.setDepts(deptIds);
        lel.setOs(os);
        lel.setTime(DateTime.getNowDateTime());
        lel.setUnid(ug.getUnid());
        lel.setUser(userUnid);
        try {
            lm.doSave(lel);
        } catch (ManageException e) {
            logger.error(e);
        }
    }

    Session getSession(User user, String appUnid) {
        Session session = Session.newSession(user);
        String userUnid = user.getUnid();
        UserStyle userStyle = getUserStyle(userUnid);
        Style style = getLastStyle(userUnid);
        Scheme scheme = getScheme(appUnid, userUnid);

        AppManager am = new AppManager();
        App app = am.getAppByResourceUnid(appUnid);
        if (app == null)
            return null;
        session.setApp(app);

        if (app.getAdmins().indexOf(user.getUnid()) != -1) {
            user.setAppAdmin(true);
            user.setUserStatus(1);
        } else if (StringUtils.isNotEmpty(user.getEffectiveAdminDept())) {
            user.setUserStatus(2);
        } else {
            user.setUserStatus(3);
        }

        session.setScheme(scheme);
        session.setStyle(style);
        session.setUserStyle(userStyle);

        return session;
    }

    Session getSession(String userUnid, String appUnid) {
        UserApi userApi = new UserApi();
        User user = userApi.getUser(userUnid);
        if (user == null)
            return null;
        LoginResultManager.setUserInfo(user);

        return getSession(user, appUnid);
    }

    private Session getDefaultSession(String userUnid) {
        UserApi um = new UserApi();
        User user = um.getUser(userUnid);
        if (user == null) {
            return null;
        }
        return Session.newSession(user);
    }
}