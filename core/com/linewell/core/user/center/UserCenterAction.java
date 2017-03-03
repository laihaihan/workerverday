package com.linewell.core.user.center;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.util.PrintUtil;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.platform.cache.user.UserOpinion;
import com.linewell.ucap.platform.cache.user.UserOpinionManager;
import com.linewell.ucap.resource.ResourceContext;
import com.linewell.ucap.session.Session;
import com.opensymphony.xwork2.ActionSupport;

/**
 * 类说明：个人用户中心
 *
 * @author qcongyong 
 * @date 2012-3-31
 * @version 1.0  
 */
public class UserCenterAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();		
		HttpServletResponse response = ServletActionContext.getResponse();	

        boolean result = true;
        String fn = request.getParameter("fn");
        UserCenterManager manager = new UserCenterManager();
        
        //1、验证用户密码
		if ("checkUserPassword".equals(fn)) {
			result = manager.checkPassword(request);
		}
		//2、设置用户密码
		else if ("setUserPassword".equals(fn)) {
			result = manager.setUserPassword(request);
		}
		//3、设置用户信息
		else if ("setUserInfo".equals(fn)) {
			result = manager.setUserInfo(request);
		}
		//4、设置用户意见
		else if ("setUserOpinion".equals(fn)) {
			result = manager.setUserOpinion(request);
		    
            
		}
		//重新设置用户信息
		else if("reloadUser".equals(fn)){
			ResourceContext rc = ResourceContext.newInstance();
			UserOpinionManager opinionManager =new UserOpinionManager();
		    String userunid = request.getParameter("userunid");
		    List<UserOpinion> userOpinions =(List<UserOpinion>)opinionManager.doFindByPunid(userunid);
		    User user =(User)rc.getResourceCache("user").getResource(userunid);
		    user.setUserOpinions(userOpinions);
		    Session ucapSession = (Session) request.getSession().getAttribute(
					Session.SESSION_NAME);
		    ucapSession.setUser(user);
		}
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		return null;
	}
}