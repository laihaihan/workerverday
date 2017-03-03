package com.linewell.core.ucap.menu;

import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.platform.authorized.menu.Menu;
import com.linewell.ucap.platform.authorized.menu.MenuItem;
import com.linewell.ucap.platform.authorized.menu.MenuManager;
import com.linewell.ucap.platform.authorized.menu.UiMenu;
import com.linewell.ucap.resource.ManageException;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.util.JsonUtil;
import com.linewell.ucap.util.UcapRequest;
import com.linewell.ucap.util.UcapRequestWebManager;
import com.opensymphony.xwork2.ActionSupport;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

public class MenuAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();		
		HttpServletResponse response = ServletActionContext.getResponse();	
		Session session = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		String belongToAppId = session.getApp().getUnid();
		request.setAttribute("belongToApp", belongToAppId);
		UcapRequest ucapRequest = UcapRequestWebManager.requestToUcap(request);
		String act = ucapRequest.getParameter("act");
		UiMenu uimm = new UiMenu();
		String result = "";
		if ("getAllMenu".equalsIgnoreCase(act)) {
			String appPath = ucapRequest.getContextPath() + "/";
			String menuType = ucapRequest.getParameter("menuType");

			uimm.setAppPath(appPath);
			String edit = ucapRequest.getParameter("edit");
			if (StringUtils.isEmpty(edit)) {
				uimm.setHaveHandler(true);
			}
			if (StringUtils.isNotEmpty(belongToAppId))
				result = uimm.getMenuJsonByBelongToApp(menuType, belongToAppId, session, edit);
			else {
				result = uimm.getMenuJson(menuType, session, edit);
			}
			
			//如果是应用系统管理员默认添加“后台管理”菜单   add by qcongyong 2012-11-28
			if(session.getApp().getAdmins().contains(session.getUser().getUnid())){
				result = this.addAdminMenu(result);
			}
		}

		MenuManager mm = new MenuManager();
		if (act.equalsIgnoreCase("getMenuItem")) {
			String unid = ucapRequest.getParameter("unid");
			MenuItem menuItem = null;
			try {
				menuItem = mm.getMenuItemByUnid(unid, ucapRequest);
			} catch (ManageException e) {
			}
			JSONObject json = uimm.getCommonJson(menuItem);
			result = json.toString();
		}
		if (act.equalsIgnoreCase("getMenuRoot")) {
			String unid = ucapRequest.getParameter("unid");
			Menu menu = null;
			try {
				menu = mm.getMenuByUnid(unid);
			} catch (ManageException e) {
				LOG.error(e);
			}
			result = JSONObject.fromObject(menu).toString();
		}
		if (act.equalsIgnoreCase("saveMenuRoot")) {
			Menu menu = null;
			try {
				menu = mm.saveMenu(ucapRequest, session);
			} catch (ManageException e) {
				LOG.error(e);
			}
			if (menu == null) {
				result = "nochange";
			}
			JSONObject json = JsonUtil.objectToJSON(menu);
			result = json.toString();
		}

		if (act.equalsIgnoreCase("saveMenuItem")) {
			MenuItem menuItem = null;
			String flag = ucapRequest.getParameter("flag");
			try {
				if (flag.equalsIgnoreCase("newSave")) {
					menuItem = mm.saveNewMenuItem(ucapRequest, session);
				} else if (flag.equalsIgnoreCase("newSaveByRoot")) {
					menuItem = mm.saveNewMenuItemByRoot(ucapRequest, session);
				} else{
					menuItem = mm.saveMenuItem(ucapRequest, session);
				}	
			} catch (ManageException e) {
				LOG.error(e);
			}
			if (menuItem == null) {
				result = "nochange";
			}

			UiMenu um = new UiMenu();
			String appPath = ucapRequest.getContextPath() + "/";
			um.setAppPath(appPath);

			JSONObject json = um.getUiTreeMenu(menuItem);
			result = json.toString();
		}

		if (act.equalsIgnoreCase("delete")) {
			String unid = ucapRequest.getParameter("unid");
			String flag = ucapRequest.getParameter("flag");
			String fatherUnid = ucapRequest.getParameter("fatherUnid");
			String fatherType = ucapRequest.getParameter("fatherType");

			UiMenu um = new UiMenu();
			String appPath = ucapRequest.getContextPath() + "/";
			um.setAppPath(appPath);
			if (flag.equalsIgnoreCase("root")) {
				Menu menu = mm.doDeleteByMenuUnid(unid, session);
				if (menu != null) {
					JSONObject json = um.getUiTreeMenu(menu);
					result = json.toString();
				}

				result = "newtree";
			}
			if (flag.equalsIgnoreCase("item")) {
				Object obj = mm.doDeleteByMenuItemUnid(unid, fatherUnid, fatherType, session);
				JSONObject json = um.getUiTreeMenu(obj);
				result = json.toString();
			}
		} else if (act.equalsIgnoreCase("move")) {
			try {
				result = String.valueOf(mm.move(ucapRequest, session));
			} catch (ManageException e) {
				LOG.error(e);
			}
		}
		PrintUtil.print(response, result);
		return null;
	}
	
	/**
	 * 添加后台管理菜单
	 * 
	 * @param jsonStr
	 * @return
	 */
	private String addAdminMenu(String jsonStr){

		
		//判断当前角色是否已经拥有“后台管理”菜单的权限
		boolean hasAdminModule = false;
		JSONArray jsonArr = null; 
		if(StrUtil.isNull(jsonStr)){
			jsonArr = new JSONArray();
		}else{
			jsonArr = JSONArray.fromObject(jsonStr);
		}
		for (Iterator iter = jsonArr.iterator(); iter.hasNext();) {
			JSONObject json = (JSONObject) iter.next();
			if(json.has("content") && UcapMenuLeafBusiness.ADMINMENUUNID.equals(json.getString("content"))){
				hasAdminModule = true;
				break;
			}
		}
		
		//添加“后台管理”菜单
		if(!hasAdminModule){
			JSONObject json = new JSONObject();
			json.put("content", UcapMenuLeafBusiness.ADMINMENUUNID);
			json.put("handler", "function(){ucapMenu.clk('85FF9BFFB1927F4176C1CD8959862EBE','01','')}");
			json.put("leaf", false);
			json.put("text", "平台管理");
			json.put("type", "01");
			json.put("version", "2");
			jsonArr.add(json);
		}
		return jsonArr.toString();
	}
}