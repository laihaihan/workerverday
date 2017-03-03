package com.linewell.ucapx.login;

import com.linewell.ucap.platform.authorized.app.App;
import com.linewell.ucap.platform.authorized.scheme.Scheme;
import com.linewell.ucap.platform.cache.login.Login;
import com.linewell.ucap.platform.cache.style.Style;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.platform.cache.user.UserStyle;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.util.monitor.Monitor;
import com.linewell.ucap.web.login.UserLoginBean;
import com.linewell.ucapx.redevelop.uddi.UddiApi;
import java.util.List;

public class LoginApi
{
  public Login getLoginConfig()
  {
    if (!UddiApi.getFnStatus("")) return null;

    Monitor.getInstance().monitorDebugMethod();
    LoginManager lm = new LoginManager();
    return lm.getLoginConfig();
  }  
 
  public List<App> getUserAppList(String userUnid)
  {
    if (!UddiApi.getFnStatus("String")) return null;

    Monitor.getInstance().monitorDebugMethod();
    LoginManager lm = new LoginManager();
    return lm.getUserAppList(userUnid);
  }

  public List<App> getAppList()
  {
    if (!UddiApi.getFnStatus("")) return null;

    Monitor.getInstance().monitorDebugMethod();
    LoginManager lm = new LoginManager();
    return lm.getAppList();
  }

  public UserLoginBean verifyLogin(String username, String password, String ip, String domain)
  {
    if (!UddiApi.getFnStatus("String,String,String,String")) return null;

    Monitor.getInstance().monitorDebugMethod();
    LoginManager lm = new LoginManager();
    return lm.verifyLogin(username, password, ip, domain);
  }

  public UserLoginBean verifyLogin(String username, String password)
  {
    if (!UddiApi.getFnStatus("String,String")) return null;

    Monitor.getInstance().monitorDebugMethod();
    LoginManager lm = new LoginManager();
    return lm.verifyLogin(username, password);
  }

  public List<Style> getStyleList()
  {
    if (!UddiApi.getFnStatus("")) return null;

    Monitor.getInstance().monitorDebugMethod();
    LoginManager lm = new LoginManager();
    return lm.getStyleList();
  }

  public Style getLastStyle(String userUnid)
  {
    if (!UddiApi.getFnStatus("String")) return null;

    Monitor.getInstance().monitorDebugMethod();
    LoginManager lm = new LoginManager();
    return lm.getLastStyle(userUnid);
  }

  public UserStyle getUserStyle(String userUnid)
  {
    if (!UddiApi.getFnStatus("String")) return null;

    Monitor.getInstance().monitorDebugMethod();
    LoginManager lm = new LoginManager();
    return lm.getUserStyle(userUnid);
  }

  public boolean saveUserStyle(UserStyle userStyle)
  {
    if (!UddiApi.getFnStatus("UserStyle")) return false;

    Monitor.getInstance().monitorDebugMethod();

    LoginManager lm = new LoginManager();
    return lm.saveUserStyle(userStyle);
  }

  public boolean saveUserStyle(String styleUnid, String userUnid, String appUnid, boolean isDefault)
  {
    if (!UddiApi.getFnStatus("String,String,String,String")) return false;

    Monitor.getInstance().monitorDebugMethod();

    LoginManager lm = new LoginManager();
    return lm.saveUserStyle(styleUnid, userUnid, appUnid, isDefault);
  }

  public Scheme getScheme(String appUnid, String userUnid)
  {
    if (!UddiApi.getFnStatus("String,String")) return null;

    Monitor.getInstance().monitorDebugMethod();
    LoginManager lm = new LoginManager();
    return lm.getScheme(appUnid, userUnid);
  }

  public boolean setLoginLog(String appUnid, User user, String ip, String os, String machine, String browser)
  {
    if (!UddiApi.getFnStatus("String,User,String,String,String,String")) return false;

    Monitor.getInstance().monitorDebugMethod();
    LoginManager lm = new LoginManager();
    lm.setLoginLog(appUnid, user, ip, os, machine, browser);
    return true;
  }

  public boolean setErrorLog(String userUnid, String deptIds, String ip, String brower, String os)
  {
    if (!UddiApi.getFnStatus("String,String,String,String,String")) return false;

    Monitor.getInstance().monitorDebugMethod();
    LoginManager lm = new LoginManager();
    lm.setErrorLog(userUnid, deptIds, ip, brower, os);
    return true;
  }

  public Session getSession(User user, String appUnid)
  {
    if (!UddiApi.getFnStatus("User,String")) return null;

    Monitor.getInstance().monitorDebugMethod();
    LoginManager lm = new LoginManager();
    return lm.getSession(user, appUnid);
  }

  public Session getSession(String userUnid, String appUnid)
  {
    if (!UddiApi.getFnStatus("String,String")) return null;

    Monitor.getInstance().monitorDebugMethod();
    LoginManager lm = new LoginManager();
    return lm.getSession(userUnid, appUnid);
  }
}