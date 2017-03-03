package com.linewell.core.ucap.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;
import com.linewell.core.util.PrintUtil;
import com.linewell.ucap.resource.ManageException;
import com.linewell.ucap.resource.ResourceException;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.ui.navigation.UiNavigation;
import com.linewell.ucap.ui.navigation.UiNavigationManager;
import com.opensymphony.xwork2.ActionSupport;

/**
 * 
 * @author linyashan
 * @date 2012-02-27
 * 个性化定制导航栏
 */
public class NavigationAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;

	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		UiNavigationManager nm;
	    UiNavigation uiNav;
	    JSONObject json = null;
		String fn = request.getParameter("fn");
		Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
        if (fn.equalsIgnoreCase("getNav")) {
          nm = new UiNavigationManager();
          try
          {
            uiNav = nm.getUiNavigationByAppUnid(ucapSession);
            json = JSONObject.fromObject(uiNav);
          } catch (ManageException e) {
            LOG.error(e);
          } catch (ResourceException e) {
            LOG.error(e);
          }
        }
		PrintUtil.print(response, json.toString());
		
        return null;
	}
}
