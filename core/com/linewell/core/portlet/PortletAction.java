package com.linewell.core.portlet;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.db.JdbcFactory;
import com.linewell.core.db.JdbcSession;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.NumberUtil;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.view.ViewManager;
import com.linewell.core.view.column.Column;
import com.opensymphony.xwork2.ActionSupport;

public class PortletAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private String JNDI = GlobalParameter.APP_CORE;

	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();

		String fn = request.getParameter("fn");
		
		JSONObject result = new JSONObject();
		PortletManager manager = new PortletManager();
		if ("add".equals(fn)) {
			Portlet portlet = BeanUtil.createBean(Portlet.class, request);
			result.put("success", manager.doSave(portlet));
			result.put("obj", JSONObject.fromObject(portlet));
			
		} else if ("update".equals(fn)) {
			Portlet portlet = BeanUtil.createBean(Portlet.class, request);
			result.put("success", manager.doUpdate(portlet));
			result.put("obj", JSONObject.fromObject(portlet));
			
		} else if ("getPortlet".equals(fn)) {
			String unid = request.getParameter("unid");
			Portlet portlet = manager.doFindBeanByKey(unid);
			String columnUnids = portlet.getPortlet_view_column();
			if (StringUtils.isNotEmpty(columnUnids)) {
				String[] columns = columnUnids.split(",");
				String unids = "";
				for (int i = 0; i < columns.length; i++) {
					unids += "'" + columns[i] + "',";
				}
				unids = StringUtils.substringBeforeLast(unids, ",");
				String hql = " where ( View_Unid='" + portlet.getPortlet_src() + "' and column_Checkbox='1') " +
						"or column_Unid in (" + unids + ") order by column_Sort";
				
				JdbcSession jdbc = JdbcFactory.getSession(this.JNDI);
				List<Column> columnList =jdbc.queryForEntityList(Column.class, hql);
				portlet.setPortlet_view_column(JSONArray.fromObject(columnList).toString());
			}

			PrintUtil.print(response, JSONObject.fromObject(portlet));
			return null;
		}else if ("getPortletViewData".equals(fn)) {
			String id = request.getParameter("id");
			String page = request.getParameter("page");
			String rows = request.getParameter("rows");

			ViewManager viewService = new ViewManager();
			String responseText = viewService.getPadding(id, NumberUtil.parseInt(page), NumberUtil.parseInt(rows), request);
			PrintUtil.print(response, responseText);
			return null;
		}else if ("savePortlet".equals(fn)) {
			String portlet = request.getParameter("portlet");
			String roleId = request.getParameter("roleId");
			
			PortletManager pm = new PortletManager();
			pm.deletePortletRelation(roleId);
			pm.addPortletRelation(portlet, roleId);
		}else if ("del".equals(fn)) {
			String ids = request.getParameter("ids");
			JdbcSession jdbc = JdbcFactory.getSession(this.JNDI);
			jdbc.beginTran();
			String sql = "delete core_portlet t where t.portlet_unid in ("+ids+")";
			String role = "delete core_portlet_role t where t.portlet_unid in ("+ids+")";
			
			boolean bool = jdbc.update(sql) > 0 ? true : false;
			//bool = jdbc.update(role)>0?true:false;
			result.put("success", bool);
		}else if("getViewColumn".equals(fn)){
			String viewId = request.getParameter("viewId");
			JdbcSession jdbc = JdbcFactory.getSession(this.JNDI);
			List<Column> columnList = jdbc.queryForEntityList(Column.class, "where view_unid='"+viewId+"'");
			
			PrintUtil.print(response, JSONArray.fromObject(columnList));
			return null;
		}
		
		PrintUtil.print(response, result);

		return null;
	}
}