package com.linewell.core.ucap.module;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.IpUtil;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.platform.authorized.app.App;
import com.linewell.ucap.platform.authorized.app.AppManager;
import com.linewell.ucap.platform.authorized.scheme.Scheme;
import com.linewell.ucap.platform.authorized.scheme.SchemeManager;
import com.linewell.ucap.platform.cache.style.Style;
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
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>
 * 	模块调用Action
 * </P>
 * 
 * @author cyingquan@linewell.com
 * @date 2011-1-7
 * @version 1.00
 * <p>
 * 	Copyright (c) 2011 www.linewell.com
 * </p>
 */
public class ModuleAction extends ActionSupport {
    private static final Logger logger = Logger.getLogger(ModuleAction.class);


	private static final long serialVersionUID = 1L;

	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();		
		HttpServletResponse response = ServletActionContext.getResponse();	
		Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		
		//获取模块菜单
		String result = "";
		String act = request.getParameter("act");
		if (act.equalsIgnoreCase("getModuleMenu")) {
			String moduleUnid = request.getParameter("moduleUnid");
			result = new UiModule().getModuleJson(moduleUnid,request.getContextPath(), ucapSession);
			
		}
		//选择系统默认审批
		else if ("changeSystem".equalsIgnoreCase(act)) {
			UserStyle userStyle = new UserStyle();
			userStyle.setAppPunid(GlobalParameter.APP_CORE);//审批appid
			userStyle.setDefault(false);
			userStyle.setLoginTime(DateTime.getNowDateTime());
			userStyle.setStyleUnid("370146850068000044001738");//第一套样式
			UNIDGenerate uGenerate = new UNIDGenerate();
			userStyle.setUnid(uGenerate.getUnid());
			userStyle.setUserUnid(ucapSession.getUser().getUnid());

			// 保存用户界面风格
			JSONObject json = new JSONObject();
			UserManager userManager = new UserManager();
			json.put("success", userManager.doSaveUserStyle(userStyle));
			result = json.toString();
		}
		//选择系统
		else if ("chooseSys".equalsIgnoreCase(act)) {
			String isDefaul = request.getParameter("isDefaul");

			JSONObject json = new JSONObject();// 保存用户界面风格
			String sysUnid = request.getParameter("sysunid");
			AppManager appManager = new AppManager();
			App app = appManager.doFinByUnid(sysUnid);
			boolean isDefaulBol = !StrUtil.isNull(isDefaul)&&isDefaul.equals("true");
			afterChooseAppAndUserStyle(request,ucapSession,app,"370146850068000044001738",isDefaulBol,"012917F931B64E2A4A5D5090AEA1A854");
			result = json.toString();
		}
		/** 获取模块树 */
		else if("getModuleTree".equals(act)){
			String belongToApp = request.getParameter("belongToApp");//应用UNID
			String leafId = request.getParameter("leafId");//节点标识
			
			ModuleManager moduleManager = new ModuleManager();
			result = moduleManager.getModuleTreeByLeafAndApply(leafId,belongToApp,GlobalParameter.APP_UCAP);
		}
		/** 根据角色获取模块树 */
		else if("getModuleTreeByRoleUnid".equals(act)){
			String belongToApp = request.getParameter("belongToApp");//应用UNID
			String roleunid = request.getParameter("roleunid");//应用UNID
			String leafId = request.getParameter("leafId");//节点标识
			
			ModuleManager moduleManager = new ModuleManager();
			result = moduleManager.getModuleTreeByLeafAndApplyAndRoleUnid(leafId,belongToApp,GlobalParameter.APP_UCAP,roleunid);
		}
		/** 模块权限保存 */
		else if("savebusinessmodule".equals(act)){
			String selectedNodesNames = request.getParameter("selectedNodesNames");
			String selectedNodesUnids = request.getParameter("selectedNodesUnids");
			String roleunid = request.getParameter("roleunid");
			String appunid = request.getParameter("appunid");
			ModuleManager moduleManager = new ModuleManager();
			JSONObject json = new JSONObject();
			json.put("result", moduleManager.saveBussinessModuel( selectedNodesUnids, roleunid, appunid));
			result = json.toString();
		}
		
		PrintUtil.print(response, result);
		return null;
	}

	public void afterChooseAppAndUserStyle(HttpServletRequest request,Session ucapSession, App app, 
			String styleUnid, boolean isDefault, String schemeUnid) {
		UserStyle userStyle = new UserStyle();
		userStyle.setAppPunid(app.getPunid());
		userStyle.setDefault(isDefault);
		userStyle.setLoginTime(DateTime.getNowDateTime());
		userStyle.setStyleUnid(styleUnid);
		UNIDGenerate uGenerate = new UNIDGenerate();
		userStyle.setUnid(uGenerate.getUnid());
		userStyle.setUserUnid(ucapSession.getUser().getUnid());
		User user = ucapSession.getUser();

		if (app.getAdmins().indexOf(user.getUnid()) != -1) {
			user.setAppAdmin(true);
			user.setUserStatus(1);
		} else if (StringUtils.isNotEmpty(user.getEffectiveAdminDept())) {
			user.setUserStatus(2);
		} else {
			user.setUserStatus(3);
		}

		SchemeManager sManager = new SchemeManager();
		Scheme scheme = null;
		try {
			scheme = sManager.getSchemeBySchemeUnid(schemeUnid, ucapSession);
		} catch (ManageException e2) {
		    logger.error(e2);
		}catch (Exception e2) {
			e2.printStackTrace();
		    logger.error(e2);
		}
		setLoginInfo(request, app, ucapSession, userStyle, scheme);

		UserManager uManager = new UserManager();
		try {
			uManager.doSaveUserStyle(userStyle);
		} catch (ManageException e) {
			LOG.error(e);
		}
	}

	private static void setLoginInfo(HttpServletRequest request, App app,Session ucapSession, UserStyle userStyle, Scheme scheme) {
		User user = ucapSession.getUser();
		ucapSession.setApp(app);
		ucapSession.setUserStyle(userStyle);
		ResourceContext rc = ResourceContext.newInstance();
		Style style = null;
		try {
			ResourceCache cache = rc.getResourceCache("style");
			style = (Style) cache.getResource(userStyle.getStyleUnid());
		} catch (ResourceException e) {
		    logger.error(e);
		}

		ucapSession.setStyle(style);
		if (app.isLoginLog()) {
			String ip = IpUtil.getIpAddr(request);
		}
		ucapSession.setScheme(scheme);
	}
}
