package com.linewell.core.view;

import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.db.JdbcFactory;
import com.linewell.core.db.JdbcSession;
import com.linewell.core.subbutton.SubButton;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.tree.TreeManager;
import com.linewell.core.util.DateTime;
import com.linewell.core.util.ListUtil;
import com.linewell.core.util.SqlUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.core.view.button.ButtonManager;
import com.linewell.core.view.column.Column;
import com.linewell.core.view.ext.data.ViewDataService;
import com.linewell.core.view.ext.param.AppDataUserService;
import com.linewell.core.view.ext.param.AppParamService;
import com.linewell.core.view.ext.param.SetParamsService;
import com.linewell.core.view.query.Query;
import com.linewell.core.view.query.QueryManager;
import com.linewell.ucap.platform.authorized.app.App;
import com.linewell.ucap.session.Session;

/**
 * 
 * <p>
 * 视图服务层
 * </P>
 * 
 * @author cyingquan@linewell.com
 * @date Jan 10, 2012
 * @version 1.00
 *          <p>
 *          Copyright (c) 2011 www.linewell.com
 *          </p>
 */
public class ViewManager {
	/**
	 * Logger for this class
	 */
	private static final Log logger = LogFactory.getLog(ViewManager.class);
	
	private static final String JNDI = GlobalParameter.APP_CORE;

	private static final String ALIGN_LEFT = "1";
	private static final String ALIGN_CENTER = "2";
	private static final String ALIGN_RIGHT = "3";

	private static final String SORTABLE_ON = "1";
	private static final String SORTABLE_OFF = "0";
	
	private static final String HIDDEN_ON = "1";
	private static final String CHECKBOX_ON = "1";

	private static final String VIEW_SEARCH_SIMPLE = "1";
	private static final String VIEW_SEARCH_ADVANCED = "0";
	private static final String VIEW_TREE_GRID = "1";
	
	/**
	 * grid参数设置
	 * 
	 * @param viewId
	 * @return
	 */
	public void setGridOptions(HttpServletRequest request, String viewId) {
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		Map<String, Object> options = new HashMap<String, Object>();
		View view = jdbc.getEntityById(View.class, viewId);

		String frozenColumns = "";
		Column idColumn = getIdColumn(viewId);
		if (idColumn != null) {
			frozenColumns += "{field:'" + idColumn.getField() + "',checkbox:true," +
					"hidden:" + (HIDDEN_ON.equals(idColumn.getHidden()) ? "true" : "false") + "}";					
			
			options.put("idField", idColumn.getField());
		}

		List<Column> columnList = getColumnList(viewId);
		// 列转换函数
		List<String> columnFormatterList = new ArrayList<String>();

		String columns = "[";
		for (int i = 0; i < columnList.size(); i++) {
			Column column = columnList.get(i);

			String title = column.getTitle();
			String field = column.getField();
			String width = column.getWidth();
			String checkbox = column.getCheckbox();
			String formatter = column.getFormatter();
			String sortable = column.getSortable();
			String align = column.getAlign();
			String hidden = column.getHidden();
			int colspan = column.getColspan();
			int rowspan = column.getRowspan();
			
			int sort = column.getSort();
			if (i > 0 && (sort % 100 == 0)) {
				columns = StringUtils.substringBeforeLast(columns, ",")+ "],[";
			}
			
			columns += "{";
			columns += "title:'" + title + "',";

			if (colspan <= 1) {
				if (StringUtils.isNotEmpty(width)) {
					columns += "width:" + width + ",";
				} else {
					columns += "width:100,";
				}
			}

			if (colspan > 1) {
				columns += "colspan:" + colspan + ",";
			}
			if (rowspan > 1) {
				columns += "rowspan:" + rowspan + ",";
			}

			if (StringUtils.isNotEmpty(align)) {
				if (ALIGN_LEFT.equals(align)) {
					align = "left";
				} else if (ALIGN_CENTER.equals(align)) {
					align = "center";
				} else if (ALIGN_RIGHT.equals(align)) {
					align = "right";
				}
				columns += "align:\"" + align + "\",";
			}

			if (StringUtils.isNotEmpty(formatter)) {
				formatter = formatter.replaceAll("\\(.*\\)", "");
				columns += "formatter:" + formatter + ",";
				columnFormatterList.add(formatter);
			}
			
			
			//排序
			/*
			if (StringUtils.isNotEmpty(sortable)) {
				sortable = SORTABLE_ON.equals(sortable) ? "true" : "false";
				columns += "sortable:" + sortable + ",";
			}
			*/
			sortable = SORTABLE_OFF.equals(sortable) ? "false" : "true";
			columns += "sortable:" + sortable + ",";

			if (StringUtils.isNotEmpty(hidden)) {
				hidden = HIDDEN_ON.equals(hidden) ? "true" : "false";
				columns += "hidden:" + hidden + ",";
			}
			
//			if(StringUtils.startsWith(field, "_null")){
//				columns += "field:'" + field + "'";
//			}else if(StringUtils.isEmpty(field)){
//				columns = StringUtils.substringBeforeLast(columns, ",");
//			}else{
//				columns += "field:'" + field + "'";
//			}
			
			if(StringUtils.isEmpty(width) && (StringUtils.startsWith(field, "_null"))){
				columns = StringUtils.substringBeforeLast(columns, ",");
			}else{
				columns += "field:'" + field + "'";
			}
			
//			if (field != null) {
//				columns += "field:'" + field + "'";
//			} else {
//				columns = StringUtils.substringBeforeLast(columns, ",");
//			}

			columns += "},";		
		}
		columns = StringUtils.substringBeforeLast(columns, ",");
		columns += "]";
		
		logger.debug(columns);

		/**
		 * 按钮栏
		 */
		String toolbar = null;
		List<String> btnFnList = new ArrayList<String>();

		// 通用刷新按钮
		StringBuffer toolbarBuf = new StringBuffer();
		/*toolbarBuf.append("{");
		toolbarBuf.append("text:'刷新'");
		toolbarBuf.append(",iconCls:'icon-reload'");
		toolbarBuf.append(",handler:gReload");
		toolbarBuf.append("},");*/

		ButtonManager btnManager = new ButtonManager();
		List<Map<String, Object>> btnList = btnManager.getSubBtnList(viewId);
		for (Map btn : btnList) {
			String fn = btn.get("BUTTON_FN").toString();
			fn.replaceAll("\\(.*\\)", "");
			btnFnList.add(fn);

			toolbarBuf.append("'-',{");
			toolbarBuf.append("text:'" + btn.get("SUB_NAME") + "',");
			toolbarBuf.append("iconCls:'" + btn.get("SUB_IMG") + "',");
			toolbarBuf.append("handler:function(){" + fn + "();addAuditLog('"+btn.get("SUB_NAME")+"');}");//审计管理add by lijx 
			toolbarBuf.append("},");
		}

		toolbar = toolbarBuf.toString();
		if (StringUtils.endsWith(toolbar, ",")) {
			toolbar = StringUtils.substringBeforeLast(toolbar, ",");
		}

		// 树形配置
		if (VIEW_TREE_GRID.equals(view.getType())) {
			options.put("treeSetting", TreeManager.getInstance().getTreeSetting(view.getTreeClass()));
		}
		
		//js自定义方法路径
		List<SubButton> subBtnList = jdbc.queryForEntityList(SubButton.class, "where fn_path is not null and sub_belongto='"+viewId+"'");
		request.setAttribute("subBtnList", subBtnList);
		
		//合并单元格
		List<Column> columnMergeList = jdbc.queryForEntityList(Column.class,"WHERE view_unid='"+ viewId+ "' AND column_merge='1'");
		
		// 3.设置参数
		options.put("columns", columns);
		// options.put("toolbar",toolbar.toString());
		options.put("btnFnList", btnFnList);
		options.put("columnFormatterList", columnFormatterList);

		request.setAttribute("toolbar", toolbar);
		request.setAttribute("view", view);
		request.setAttribute("frozenColumns", frozenColumns);
		request.setAttribute("columns", columns);
		request.setAttribute("options", options);
		request.setAttribute("columnMergeList", columnMergeList);
		
		//搜索
		buildQueryCondition(request, jdbc, options, viewId);
		/*List<Query> queryList = QueryManager.getInstance().doFindByViewId(viewId);
		for (Query query : queryList) {
			String sql = "select t.dictname,t.dictvalue from core_dict t where t.dicttype='"+StringUtils.stripToEmpty(query.getDicUnid())+"' and t.state='Y' order by sortid";
			StringBuffer field = new StringBuffer();
			if("2".equals(query.getDisplayType())){
				try {
					String[][] result = jdbc.queryForArray(sql);
					for (int i = 1; i < result.length; i++) {
						field.append("<label><input type=\"radio\" name=\"" + query.getField() + "\" value=\"" + result[i][1] + "\" checked>" + result[i][0] + "</label>&nbsp;\n");
					}
					
				} catch (SQLException e) {
					logger.error(e);
				}
				query.setField(field.toString());
				
			}else if("3".equals(query.getDisplayType())){
				try {
					String[][] result = jdbc.queryForArray(sql);
					field.append("<select name=\""+query.getField()+"\">");
					for (int i = 1; i < result.length; i++) {
						field.append("<option value=\"" + result[i][1] + "\">" + result[i][0] + "</option>\n");
					}
					field.append("</select>");
				} catch (SQLException e) {
					logger.error(e);
				}
				query.setField(field.toString());
			}
		}
		
		options.put("queryList",queryList);*/
		//简单类型的sql语句
		if("0".equals(view.getSqlType())){
			options.put("sqlParams",getSqlParamsByViewUnid(view.getUnid()));
		} else {
			options.put("sqlParams",getSqlParams(view.getSqlcontent()));
		}
		String appName = getAppName(request);
		request.setAttribute("app", appName);
		request.setAttribute("resource", request.getRealPath(File.separator+appName+ File.separator+"js"+File.separator+"view"+File.separator));
	}
	
	/**
	 * <p>构造视图查询的条件</P>
	 * @param request 页面jsp的request对象
	 * @param jdbc 数据库链接对象
	 * @param options 封装构造好的查询条件（包含简单与高级）
	 * @param viewUnid 视图的unid
	 */
	private void buildQueryCondition(HttpServletRequest request, JdbcSession jdbc, Map<String, Object> options, String viewUnid){
		StringBuffer simpleQuery = new StringBuffer();//保存简单查询条件
		StringBuffer advancedQuery = new StringBuffer();//保存高级查询条件
		int textCount = 0;//用于判断是否文本框有多个
		try {
			List<Query> queryList = QueryManager.getInstance().doFindByViewId(viewUnid);
			//文本框输入值查询
			for (Query query : queryList) {
				if ("1".equals(query.getDisplayType())) {
					if ("1".equals(query.getDisplaySimple()) || "2".equals(query.getDisplaySimple())) {
						if (textCount == 0) {
							simpleQuery.append("<span>");
							simpleQuery.append("<input type=\"text\" name=\"_kw\" id=\"_kw\" value=\"请输入关键字\" class=\"kw\"/>范围:");
							simpleQuery.append("<select name=\"_field\" id=\"_field\" class=\"field\" style=\"width:120px\">");
							simpleQuery.append("<option value=\"").append(query.getField()).append("\">").append(query.getName()).append("</option>");
							textCount = simpleQuery.toString().length();//获取下一个option插入的位置
							simpleQuery.append("</select>");
							simpleQuery.append("</span>");
						} else {
							String option = "<option value=\"" + query.getField() + "\">" + query.getName() + "</option>";
							simpleQuery.insert(textCount, option);
							textCount += option.length();
						}
					} 
					if ("1".equals(query.getDisplaySimple()) || "0".equals(query.getDisplaySimple())) {
						advancedQuery.append("<tr>");
						advancedQuery.append("<th align=\"right\" style=\"font-weight:bolder;color:#1b4959;\">").append(query.getName()).append("</th>");
						advancedQuery.append("<td>");
						advancedQuery.append("<input id=\"").append(query.getField()).append("\" name=\"").append(query.getField()).append("\" type=\"text\" style=\"width:98%\" onclick=\"this.select()\"/>");
						advancedQuery.append("</td>");
						advancedQuery.append("</tr>");
					}
				}
			}
			//单选框选择查询
			for (Query query : queryList) {
				if("2".equals(query.getDisplayType())){
					String sql = "select t.dictname,t.dictvalue from core_dict t where t.dicttype='"+StringUtils.stripToEmpty(query.getDicUnid())+"' and (t.app_unid = '" + getAppUnid(request) + "' or t.app_unid = '3E2592D5DD95DA5C339C0935F7E9DAA8') and t.state='Y' order by sortid";
					StringBuffer radioBuffer = new StringBuffer();
					StringBuffer radioAdvBuf = new StringBuffer();
					int radioCount = 0;//用于记录单选框的个数
					int radioAdv = 0;//高级查询
					String[][] radioQuery = jdbc.queryForArray(sql);
					if (radioQuery != null && radioQuery.length > 1) {
						for (int i = 1; i < radioQuery.length; i++) {
							if ("1".equals(query.getDisplaySimple()) || "2".equals(query.getDisplaySimple())) {
								if(radioCount == 0){
									radioBuffer.append("&nbsp;&nbsp;&nbsp;&nbsp;<span>").append(query.getName()).append(":");
									radioBuffer.append("<input type=\"radio\" id=\"" + query.getField() + "\" name=\"" + query.getField() + "\" value=\"" + radioQuery[i][1] + "\"/><span class=\"radioQuery\" style=\"cursor:hand\">" + radioQuery[i][0] + "</span>");
									radioCount = radioBuffer.toString().length();
									radioBuffer.append("</span>");
								} else {
									String option = "&nbsp;<input type=\"radio\" id=\"" + query.getField() + "\" name=\"" + query.getField() + "\" value=\"" + radioQuery[i][1] + "\"/><span class=\"radioQuery\" style=\"cursor:hand\">" + radioQuery[i][0] + "</span>";
									radioBuffer.insert(radioCount, option);
									radioCount +=  option.length();
								}
							} 
							if ("1".equals(query.getDisplaySimple()) || "0".equals(query.getDisplaySimple())) {
								if (radioAdv == 0) {
									radioAdvBuf.append("<tr>");
									radioAdvBuf.append("<th align=\"right\" style=\"font-weight:bolder;color:#1b4959;\">").append(query.getName()).append("</th>");
									radioAdvBuf.append("<td>");
									radioAdvBuf.append("<input type=\"radio\" name=\"" + query.getField() + "\" value=\"" + radioQuery[i][1] + "\"/><span class=\"radioQuery\" style=\"cursor:hand\">" + radioQuery[i][0] + "</span>");
									radioAdv = radioAdvBuf.toString().length();
									radioAdvBuf.append("</td>");
									radioAdvBuf.append("</tr>");
								} else {
									String option = "&nbsp;&nbsp;<input type=\"radio\" name=\"" + query.getField() + "\" value=\"" + radioQuery[i][1] + "\"/><span class=\"radioQuery\" style=\"cursor:hand\">" + radioQuery[i][0] + "</span>";
									radioAdvBuf.insert(radioAdv, option);
									radioAdv +=  option.length();
								}
							}
						}
						if (radioBuffer != null && radioBuffer.toString().length() > 0) {
							simpleQuery.append(radioBuffer.toString());
						}
						if (radioAdvBuf != null && radioAdvBuf.toString().length() > 0) {
							advancedQuery.append(radioAdvBuf.toString());
						}
					}
				}
			}
			
			//下拉框选择查询
			for (Query query : queryList) {
				if("3".equals(query.getDisplayType())){
					String sql = "select t.dictname,t.dictvalue from core_dict t where t.dicttype='"+StringUtils.stripToEmpty(query.getDicUnid())+"' and (t.app_unid = '" + getAppUnid(request) + "' or t.app_unid = '3E2592D5DD95DA5C339C0935F7E9DAA8') and t.state='Y' order by sortid";
					StringBuffer selectSim = new StringBuffer();
					StringBuffer selectAdv = new StringBuffer();
					int selectSimCount = 0;//简单查询
					int selectAdvCount = 0;//高级查询
					String[][] selectQuery = jdbc.queryForArray(sql);
					if (selectQuery != null && selectQuery.length > 1) {
						for (int i = 1; i < selectQuery.length; i++) {
							if ("1".equals(query.getDisplaySimple()) || "2".equals(query.getDisplaySimple())) {
								if (selectSimCount == 0) {
									selectSim.append("&nbsp;&nbsp;&nbsp;&nbsp;<span>").append(query.getName()).append(":");
									selectSim.append("<select name=\"").append(query.getField()).append("\" style=\"width:120px\">");
									selectSim.append("<option value=\"\" name=\"").append(query.getField()).append("\">").append("</option>");
									selectSim.append("<option value=\"").append(selectQuery[i][1]).append("\" name=\"").append(query.getField()).append("\">").append(selectQuery[i][0]).append("</option>");
									selectSimCount = selectSim.toString().length();//获取下一个option插入的位置
									selectSim.append("</select>");
									selectSim.append("</span>");
								} else {
									String option = "<option value=\"" + selectQuery[i][1] + "\" name=\"" + query.getField() + "\">" + selectQuery[i][0] + "</option>";
									selectSim.insert(selectSimCount, option);
									selectSimCount +=  option.length();
								}
							} 
							if ("1".equals(query.getDisplaySimple()) || "0".equals(query.getDisplaySimple())) {
								if (selectAdvCount == 0) {
									selectAdv.append("<tr>");
									selectAdv.append("<th align=\"right\" style=\"font-weight:bolder;color:#1b4959;\">").append(query.getName()).append("</th>");
									selectAdv.append("<td>");
									selectAdv.append("<select name=\"").append(query.getField()).append("\" style=\"width:98%;\">");
									selectAdv.append("<option value=\"\" name=\"").append(query.getField()).append("\">").append("</option>");
									selectAdv.append("<option value=\"").append(selectQuery[i][1]).append("\" name=\"").append(query.getField()).append("\">").append(selectQuery[i][0]).append("</option>");
									selectAdvCount = selectAdv.toString().length();
									selectAdv.append("</select>");
									selectAdv.append("</td>");
									selectAdv.append("</tr>");
								} else {
									String option = "<option value=\"" + selectQuery[i][1] + "\" name=\"" + query.getField() + "\">" + selectQuery[i][0] + "</option>";
									selectAdv.insert(selectAdvCount, option);
									selectAdvCount +=  option.length();
								}
							}
						}
						if (selectSim != null && selectSim.toString().length() > 0) {
							simpleQuery.append(selectSim.toString());
						}
						if (selectAdv != null && selectAdv.toString().length() > 0) {
							advancedQuery.append(selectAdv.toString());
						}
					}
				} 
			}
			
			//日期选择框查询
			for (Query query : queryList) {
				if("4".equals(query.getDisplayType())){
					if ("1".equals(query.getDisplaySimple()) || "2".equals(query.getDisplaySimple())) {
						simpleQuery.append("&nbsp;&nbsp;&nbsp;&nbsp;<span>").append(query.getName()).append(":");
						simpleQuery.append("<input id=\"").append(query.getField()).append("\" name=\"").append(query.getField()).append("\" type=\"text\" class=\"Wdate\" onclick=\"WdatePicker({skin:'whyGreen',isShowOthers:false})\" readonly=\"readonly\" style=\"cursor:hand\"/>");
						simpleQuery.append("</span>");
					}
					if ("1".equals(query.getDisplaySimple()) || "0".equals(query.getDisplaySimple())) {
						advancedQuery.append("<tr>");
						advancedQuery.append("<th align=\"right\" style=\"font-weight:bolder;color:#1b4959;\">").append(query.getName()).append("</th>");
						advancedQuery.append("<td>");
						advancedQuery.append("<input id=\"").append(query.getField()).append("\" name=\"").append(query.getField()).append("\" type=\"text\" class=\"Wdate\" onclick=\"WdatePicker({skin:'whyGreen',isShowOthers:false})\" readonly=\"readonly\" style=\"cursor:hand;width:98%;\"/>");
						advancedQuery.append("</td>");
						advancedQuery.append("</tr>");
					}
				} 
			}
			
			//复选框勾选查询
			for (Query query : queryList) {
				if("5".equals(query.getDisplayType())){
					String sql = "select t.dictname,t.dictvalue from core_dict t where t.dicttype='"+StringUtils.stripToEmpty(query.getDicUnid())+"' and (t.app_unid = '" + getAppUnid(request) + "' or t.app_unid = '3E2592D5DD95DA5C339C0935F7E9DAA8') and t.state='Y' order by sortid";
					StringBuffer checkboxSim = new StringBuffer();
					StringBuffer checkboxAdv = new StringBuffer();
					int checkboxSimCount = 0;//简单查询
					int checkboxAdvCount = 0;//高级查询
					String[][] checkboxQuery = jdbc.queryForArray(sql);
					if (checkboxQuery != null && checkboxQuery.length > 1) {
						for (int i = 1; i < checkboxQuery.length; i++) {
							if ("1".equals(query.getDisplaySimple()) || "2".equals(query.getDisplaySimple())) {
								if (checkboxSimCount == 0) {
									checkboxSim.append("&nbsp;&nbsp;&nbsp;&nbsp;<span>").append(query.getName()).append(":");
									checkboxSim.append("<input type=\"checkbox\" name=\"").append(query.getField()).append("\" value=\"").append(checkboxQuery[i][1]).append("\"/><span class=\"checkboxQuery\" style=\"cursor:hand;\">").append(checkboxQuery[i][0]).append("</span>");
									checkboxSimCount = checkboxSim.toString().length();//获取下一个option插入的位置
									checkboxSim.append("</span>");
								} else {
									String option = "&nbsp;<input type=\"checkbox\" name=\"" + query.getField() + "\" value=\"" + checkboxQuery[i][1] + "\"/><span class=\"checkboxQuery\" style=\"cursor:hand;\">" + checkboxQuery[i][0] + "</span>";
									checkboxSim.insert(checkboxSimCount, option);
									checkboxSimCount +=  option.length();
								}
							} 
							if ("1".equals(query.getDisplaySimple()) || "0".equals(query.getDisplaySimple())) {
								if (checkboxAdvCount == 0) {
									checkboxAdv.append("<tr>");
									checkboxAdv.append("<th align=\"right\" style=\"font-weight:bolder;color:#1b4959;\">").append(query.getName()).append("</th>");
									checkboxAdv.append("<td>");
									checkboxAdv.append("<input type=\"checkbox\" name=\"").append(query.getField()).append("\" value=\"").append(checkboxQuery[i][1]).append("\"/><span class=\"checkboxQuery\" style=\"cursor:hand;\">").append(checkboxQuery[i][0]).append("</span>");
									checkboxAdvCount = checkboxAdv.toString().length();
									checkboxAdv.append("</td>");
									checkboxAdv.append("</tr>");
								} else {
									String option = "&nbsp;&nbsp;<input type=\"checkbox\" name=\"" + query.getField() + "\" value=\"" + checkboxQuery[i][1] + "\"/><span class=\"checkboxQuery\" style=\"cursor:hand;\">" + checkboxQuery[i][0] + "</span>";
									checkboxAdv.insert(checkboxAdvCount, option);
									checkboxAdvCount +=  option.length();
								}
							}
						}
						if (checkboxSim != null && checkboxSim.toString().length() > 0) {
							simpleQuery.append(checkboxSim.toString());
						}
						if (checkboxAdv != null && checkboxAdv.toString().length() > 0) {
							advancedQuery.append(checkboxAdv.toString());
						}
					}
				}
			}
			options.put("queryList",queryList);
			options.put("simpleQuery",simpleQuery.toString());
			options.put("advancedQuery",advancedQuery.toString());
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * <p>获取当前应用系统unid</P>
	 * @param request 页面jsp的request对象
	 * @return String 当前应用系统unid
	 */
	private String getAppUnid(HttpServletRequest request){
		Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		App app = ucapSession.getApp();
		return app.getUnid();
	}
	
	private String getAppName(HttpServletRequest request){
		Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		App app = ucapSession.getApp();
		return app.getNameEn();
	}

	public String getPadding(String viewId, int page, int rows,
			HttpServletRequest request) {
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		
		View view = jdbc.getEntityById(View.class, viewId);
		if(View.SourceType.JSON.equals(view.getSourceType()) && StringUtils.isNotEmpty(view.getDataClass())){
			return ViewDataService.getInstance().getData(request, view.getDataClass()).toString();
		}
		

		String _search = request.getParameter("_search");
		String _kw = request.getParameter("_kw");
		String _field = StringUtils.upperCase(request.getParameter("_field"));
		String sort = StringUtils.trimToEmpty(request.getParameter("sort"));
		String order = StringUtils.trimToEmpty(request.getParameter("order"));

		
		String sql = StringUtils.upperCase(view.getSqlcontent());
		String paramsClass = view.getParamsClass();

		// 当没值设置自定义实现类
		if (StringUtils.isNotEmpty(paramsClass)) {
			sql = SetParamsService.getInstance().setParamsSqlFromMap(request,
					sql, paramsClass);
		}
		
		//sql 起始时间初始化
		if (sql.indexOf("BEGINTIME}") > -1 || sql.indexOf("ENDTIME}") > -1) {
			Pattern p = Pattern.compile("\\$\\{([^\\}]+)\\}");
			Matcher m = p.matcher(sql);
			while (m.find()) {
				String queryField = m.group(1).toUpperCase();
				String paramField = StringUtils.trimToEmpty(request.getParameter(queryField));
				
				//开始时间
				if (queryField.indexOf("BEGINTIME")>-1 && StringUtils.isEmpty(paramField)) {
					sql = sql.replaceAll("\\$\\{" + queryField + "\\}", "0");
				}
				
				//结束时间
				if (queryField.indexOf("ENDTIME")>-1 && StringUtils.isEmpty(paramField)) {
					//sql = sql.replaceAll("\\$\\{" + queryField + "\\}", DateTime.getNowDateTime("yyyy-MM-dd"));
					sql = sql.replaceAll("\\$\\{" + queryField + "\\}", DateTime.getNowDateTime());
				}
			}
		}

		if (VIEW_SEARCH_SIMPLE.equals(_search)) {
			//为简单的sql语句类型（CORE_VIEW表中的VIEW_SQL字段不存在包含'%${}%'结果的查询条件）
			if ("0".equals(view.getSqlType())) {
				String returnVal = insertPosition(sql);
				int position = Integer.parseInt(returnVal.split("※")[0]);
				sql = returnVal.split("※")[1];
				QueryManager queryManager = new QueryManager();
				List<Query> queryList = queryManager.doFindByViewId(viewId);
				if (!ListUtil.isNull(queryList)) {
					//if(StringUtils.isNotEmpty(_field)){
					String paramField = null;
					for (Query query : queryList) {
						paramField = StringUtils.trimToEmpty(request.getParameter(query.getField()));
						if (query.getField().equals(_field)) {
							if (StringUtils.isEmpty(_kw) || "null".equals(_kw)) {
								sql = sql.substring(0, position) + " AND (" + query.getField() + " like '%%' OR " + query.getField() + " is null)" + sql.substring(position);
								position += (" AND (" + query.getField() + " like '%%' OR " + query.getField() + " is null)").length();
							} else {
								sql = sql.substring(0, position) + (" AND " + query.getField() + " like '%" +_kw + "%'") + sql.substring(position);
								position += (" AND " + query.getField() + " like '%" +_kw + "%'").length();
							}
						} else {
							if (StringUtils.isEmpty(paramField)) {
								sql = sql.substring(0, position) + (" AND (" + query.getField() + " like '%%' OR " + query.getField() + " is null)") + sql.substring(position);
								position += (" AND (" + query.getField() + " like '%%' OR " + query.getField() + " is null)").length();
							} else {
								if (paramField.indexOf(",") > 0) {
									String[] checkbox = paramField.split(",");
									StringBuffer conditionBuf = new StringBuffer();
									conditionBuf.append(" AND (");
									for (int i = 0; i < checkbox.length; i++) {
										if (StringUtils.isNotEmpty(checkbox[i])) {
											if (i == 0) {
												conditionBuf.append(query.getField()).append(" like '%").append(checkbox[i]).append("%'");
											} else {
												conditionBuf.append(" OR ").append(query.getField()).append(" like '%").append(checkbox[i]).append("%'");
											}
										}
									}
									conditionBuf.append(") ");
									sql = sql.substring(0, position) + conditionBuf.toString() + sql.substring(position);
									position += conditionBuf.toString().length();
								} else {
									sql = sql.substring(0, position) + (" AND " + query.getField() + " like '%" +paramField+ "%'") + sql.substring(position);
									position += (" AND " + query.getField() + " like '%" +paramField+ "%'").length();
								}
							}
						}
					}
					/*} else {
						for (Query query : queryList) {
							sql += (" AND " + query.getField() + " like '%" +_kw + "%'");
						}
					}*/
				}
			} else {
				//if (StringUtils.isNotEmpty(_field)) {	
				Pattern pattern = null;//用于替换'%%'的规则
				Matcher matcher = null;//用于获取指定规则的数据
				String conditionValue = "";//记录当前的值
				Pattern p = Pattern.compile("\\$\\{([^\\}]+)\\}");
				Matcher m = p.matcher(sql);
				while (m.find()) {
					String queryField = m.group(1).toUpperCase();
					String paramField = StringUtils.trimToEmpty(request
							.getParameter(queryField));
					
					if(queryField.equals(_field)){
						sql = sql.replaceAll("\\$\\{" + queryField + "\\}", StringUtils.stripToEmpty(_kw));
						conditionValue = _kw;
					}else{
						sql = sql.replaceAll("\\$\\{" + queryField + "\\}", paramField);
						conditionValue = paramField;
					}
					//当出现查询条件值为空时，对查询条件进行替换，以解决'%%'无法查询出字段为空的信息
					if (StringUtils.isEmpty(conditionValue) || "null".equals(conditionValue)) {
						pattern = Pattern.compile("[a-zA-Z0-9_]*[.]?" + queryField + "\\s+LIKE\\s+'%%'");
						matcher = pattern.matcher(sql);
						while (matcher.find()) {
							String condition = matcher.group(0).toUpperCase();
							String fieldName = condition.split("LIKE")[0];
							sql = sql.replace(condition, "(" + fieldName + " LIKE '%%' OR " + fieldName + " is null)");
						}
					} 
					//当值存在以逗号隔开时，说明是复选框的值，对其进行分割构造查询语句
					else if (conditionValue.indexOf(",") > 0) {
						pattern = Pattern.compile("[a-zA-Z0-9_]*[.]?" + queryField + "\\s+LIKE\\s+'%" + paramField + "%'");
						matcher = pattern.matcher(sql);
						while (matcher.find()) {
							StringBuffer conditionBuf = new StringBuffer();
							String condition = matcher.group(0).toUpperCase();
							String fieldName = condition.split("LIKE")[0];
							String[] checkbox = conditionValue.split(",");
							conditionBuf.append("(");
							for (int i = 0; i < checkbox.length; i++) {
								if (StringUtils.isNotEmpty(checkbox[i])) {
									if (i == 0) {
										conditionBuf.append(fieldName).append(" LIKE '%").append(checkbox[i]).append("%'");
									} else {
										conditionBuf.append(" OR ").append(fieldName).append(" LIKE '%").append(checkbox[i]).append("%'");
									}
								}
							}
							conditionBuf.append(")");
							sql = sql.replace(condition, conditionBuf.toString());
						}
					}
				}
				/*} else {
					//此部分由于在简单查询时，查询条件下拉框都会选中某个条件，所以_field都会存在值，因此对于'%%'查询问题暂时不处理。
					sql = sql.replaceAll("\\$\\{([^\\}]+)\\}", _kw);
				}*/
			}
		} else if (VIEW_SEARCH_ADVANCED.equals(_search)) {
			//为简单的sql语句类型（CORE_VIEW表中的VIEW_SQL字段不存在包含'%${}%'结果的查询条件）
			if ("0".equals(view.getSqlType())) {
				String returnVal = insertPosition(sql);
				int position = Integer.parseInt(returnVal.split("※")[0]);
				sql = returnVal.split("※")[1];
				QueryManager queryManager = new QueryManager();
				List<Query> queryList = queryManager.doFindByViewId(viewId);
				if (!ListUtil.isNull(queryList)) {
					String paramField = null;
					for (Query query : queryList) {
						paramField = StringUtils.trimToEmpty(request.getParameter(query.getField()));
						if (StringUtils.isEmpty(paramField)) {
							sql = sql.substring(0, position) + (" AND (" + query.getField() + " like '%%' OR " + query.getField() + " is null)") + sql.substring(position);
							position += (" AND (" + query.getField() + " like '%%' OR " + query.getField() + " is null)").length();
						} else {
							if (paramField.indexOf(",") > 0) {
								String[] checkbox = paramField.split(",");
								StringBuffer conditionBuf = new StringBuffer();
								conditionBuf.append(" AND (");
								for (int i = 0; i < checkbox.length; i++) {
									if (StringUtils.isNotEmpty(checkbox[i])) {
										if (i == 0) {
											conditionBuf.append(query.getField()).append(" like '%").append(checkbox[i]).append("%'");
										} else {
											conditionBuf.append(" OR ").append(query.getField()).append(" like '%").append(checkbox[i]).append("%'");
										}
									}
								}
								conditionBuf.append(") ");
								sql = sql.substring(0, position) + conditionBuf.toString() + sql.substring(position);
								position += conditionBuf.toString().length();
							} else {
								sql = sql.substring(0, position) + (" AND " + query.getField() + " like '%" +paramField + "%'") + sql.substring(position);
								position += (" AND " + query.getField() + " like '%" +paramField + "%'").length();
							}
						}
					}
				}
			} else {
				Pattern pattern = null;//用于替换'%%'的规则
				Matcher matcher = null;//用于获取指定规则的数据
				Pattern p = Pattern.compile("\\$\\{([^\\}]+)\\}");
				Matcher m = p.matcher(sql);
				while (m.find()) {
					String queryField = m.group(1).toUpperCase();
					String paramField = StringUtils.trimToEmpty(request.getParameter(queryField));
					sql = sql.replaceAll("\\$\\{" + queryField + "\\}", paramField);
					if (StringUtils.isEmpty(paramField)) {
						pattern = Pattern.compile("[a-zA-Z0-9_]*[.]?" + queryField + "\\s+LIKE\\s+'%%'");
						matcher = pattern.matcher(sql);
						while (matcher.find()) {
							String condition = matcher.group(0).toUpperCase();
							String fieldName = condition.split("LIKE")[0];
							sql = sql.replace(condition, "(" + fieldName + " LIKE '%%' OR " + fieldName + " is null)");
						}
					}
					//当值存在以逗号隔开时，说明是复选框的值，对其进行分割构造查询语句
					else if (paramField.indexOf(",") > 0) {
						pattern = Pattern.compile("[a-zA-Z0-9_]*[.]?" + queryField + "\\s+LIKE\\s+'%" + paramField + "%'");
						matcher = pattern.matcher(sql);
						while (matcher.find()) {
							StringBuffer conditionBuf = new StringBuffer();
							String condition = matcher.group(0).toUpperCase();
							String fieldName = condition.split("LIKE")[0];
							String[] checkbox = paramField.split(",");
							conditionBuf.append("(");
							for (int i = 0; i < checkbox.length; i++) {
								if (StringUtils.isNotEmpty(checkbox[i])) {
									if (i == 0) {
										conditionBuf.append(fieldName).append(" LIKE '%").append(checkbox[i]).append("%'");
									} else {
										conditionBuf.append(" OR ").append(fieldName).append(" LIKE '%").append(checkbox[i]).append("%'");
									}
								}
							}
							conditionBuf.append(")");
							sql = sql.replace(condition, conditionBuf.toString());
						}
					}
				}
			}
		}else{
			Pattern pattern = null;//用于替换'%%'的规则
			Matcher matcher = null;//用于获取指定规则的数据
			Pattern p = Pattern.compile("\\$\\{([^\\}]+)\\}");
			Matcher m = p.matcher(sql);
			while (m.find()) {
				String queryField = m.group(1).toUpperCase();
				String paramField = StringUtils.trimToEmpty(request.getParameter(queryField));
				sql = sql.replaceAll("\\$\\{" + queryField + "\\}", paramField);
				if (StringUtils.isEmpty(paramField)) {
					pattern = Pattern.compile("[a-zA-Z0-9_]*[.]?" + queryField + "\\s+LIKE\\s+'%%'");
					matcher = pattern.matcher(sql);
					while (matcher.find()) {
						String condition = matcher.group(0).toUpperCase();
						String fieldName = condition.split("LIKE")[0];
						sql = sql.replace(condition, "(" + fieldName + " LIKE '%%' OR " + fieldName + " is null)");
					}
				}
			}
		}

		// 当有配置系统参数,设置值
		if (sql.indexOf("#{") > -1) {
			sql = AppParamService.newInstance().setAppParam(request, sql);
		}
		
		sql = sql.replaceAll("\\$\\{([^\\}]+)\\}", "");
		sql = AppDataUserService.newInstance().setAppDataUserParam(sql);
		
		logger.debug("视图sql:"+sql);
		//System.out.println(sql);
		//sql = SqlOptimize.optimize(sql);
		
		JSONObject params = new JSONObject();
		params.put("VIEW_SQL", sql);
		params.put("VIEW_JNDI", view.getJndi());
		
		request.getSession().setAttribute("VIEW", params);
		
		JdbcSession viewJdbc = JdbcFactory.getSession(view.getJndi());
		String data = viewJdbc.queryForEasyGridPaging(sql, page, rows, sort, order);
		data = showFooter(viewId,data);
		
		return data;
	}
	
	/*
	 * 获取条件语句插入sql语句的位置
	 * @param sql sql语句
	 * @return position 条件语句插入到sql的文位置
	 */
	private String insertPosition(String sql){
		int position = 0;
		sql = sql.replaceAll("\n", " ");
		if (sql.lastIndexOf(" WHERE ") > 0) {
			String[] whereArr = sql.split(" WHERE ");
			//在最后一个where中，查询条件语句的左括号与右括号相等，说明存在where语句，反之则否
			if (StrUtil.getStringNumber(whereArr[whereArr.length - 1], "(") == StrUtil.getStringNumber(whereArr[whereArr.length - 1], ")")) {
				//在最后的一个where语句中，是否包含order by语句
				if (((whereArr[whereArr.length - 1]).replaceAll(" ", "")).lastIndexOf("ORDERBY") > 0) {
					//若order by语句的右侧有右括，说明不包含order by语句，反之则否
					if (((whereArr[whereArr.length - 1]).replaceAll(" ", "")).substring(((whereArr[whereArr.length - 1]).replaceAll(" ", "")).lastIndexOf("ORDERBY") + 7).indexOf(")") > 0) {
						//存在where，并且不存在order by
						position = sql.length();
					} else {
						//存在where，并且存在order by
						position = sql.lastIndexOf(" ORDER ");
					}
				} else {
					//存在where，并且不存在order by
					position = sql.length();
				}
			} else {
				if (((whereArr[whereArr.length - 1]).replaceAll(" ", "")).lastIndexOf("ORDERBY") > 0) {
					if (((whereArr[whereArr.length - 1]).replaceAll(" ", "")).substring(((whereArr[whereArr.length - 1]).replaceAll(" ", "")).lastIndexOf("ORDERBY") + 7).indexOf(")") > 0) {
						//不存在where，并且不存在order by
						sql = sql + " WHERE 1=1 ";
						position = sql.length();
					} else {
						//不存在where，并且存在order by
						sql = sql.substring(0, sql.lastIndexOf(" ORDER ")) + " WHERE 1=1 " + sql.substring(sql.lastIndexOf(" ORDER "));
						position = sql.lastIndexOf(" ORDER ");
					}
				} else {
					//不存在where，并且不存在order by
					sql = sql + " WHERE 1=1 ";
					position = sql.length();
				}
			}
		} else {
			if (sql.replaceAll(" ", "").lastIndexOf("ORDERBY") > 0){
				if (sql.replaceAll(" ", "").substring(sql.replaceAll(" ", "").lastIndexOf("ORDERBY") + 7).indexOf(")") > 0) {
					//不存在where，并且不存在order by
					sql = sql + " WHERE 1=1 ";
					position = sql.length();
				} else {
					//不存在where，并且存在order by
					sql = sql.substring(0, sql.lastIndexOf(" ORDER ")) + " WHERE 1=1 " + sql.substring(sql.lastIndexOf(" ORDER "));
					position = sql.lastIndexOf(" ORDER ");
				}
			} else {
				//不存在where，并且不存在order by
				sql = sql + " WHERE 1=1 ";
				position = sql.length();
			}
		}
		return position + "※" + sql;
	}
	
	private String showFooter(String viewId,String data){
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		List<Column> footerColumnList = jdbc.queryForEntityList(Column.class, "where view_unid='"+viewId+"' and column_footer='1'");
		
		if (footerColumnList != null && footerColumnList.size() > 0) {
			JSONObject dataJson = JSONObject.fromObject(data);
			JSONArray rows = dataJson.getJSONArray("rows");
			JSONArray footerArray = new JSONArray();
			
			for (int i = 0; i < footerColumnList.size(); i++) {
				Column column = footerColumnList.get(i);
				String field = column.getField();
				JSONObject footer = new JSONObject();
				
				int footerVal = 0;
				for (int j = 0; j < rows.size(); j++) {
					JSONObject columnJson = rows.getJSONObject(j);
					String val = columnJson.getString(field);
					footerVal += Integer.parseInt(val);
				}
				footer.put(field, footerVal);
				footerArray.add(footer);
			}
			
			dataJson.put("footer", footerArray);
			data = dataJson.toString();
		}
		
		return data;
	}
	
	public JSONArray getSqlParams(String sql){
		JSONArray params = new JSONArray();
		Pattern p = Pattern.compile("\\$\\{([^\\}]+)\\}");
		Matcher m = p.matcher(sql);
		while (m.find()) {
			String queryField = m.group(1).toUpperCase();
			if(!params.contains(queryField)){
				params.add(queryField);
			}
		}
		
		return params;
	}
	
	/**
	 * 获取查询条件参数
	 * @param viewUnid 视图UNID
	 * @return JSONArray
	 */
	public JSONArray getSqlParamsByViewUnid(String viewUnid){
		JSONArray params = new JSONArray();
		QueryManager queryManager = new QueryManager();
		List<Query> queryList = queryManager.doFindByViewId(viewUnid);
		if (!ListUtil.isNull(queryList)) {
			for (Query query : queryList) {
				if (!params.contains(query.getField())) {
					params.add(query.getField());
				}
			}
		}
		return params;
	}


	public View getView(String unid) {
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		View view = jdbc.getEntityById(View.class, unid);
		return view;
	}
	
	/**
	 * 获取数据库字段备注
	 * @param jndi
	 * @param sql
	 * @return
	 */
	public JSONObject getColumnComments(String jndi,String sql){
		JSONObject json = new JSONObject();
		while (sql.indexOf("FROM")>-1) {
			sql = StringUtils.stripToEmpty(StringUtils.substringAfter(sql, "FROM")) ;
		}
		return json;
	}
	

	/**
	 * 传入SQL语句,获取SQL语句字段
	 * 
	 * @param sql
	 * @return JSON数据
	 */
	public JSONObject selectSqlField(String jndi,String sql) {
		JdbcSession jdbc = JdbcFactory.getSession(jndi);
		return jdbc.selectSqlField(sql);
	}
	/**
	 * 验证sql 语句
	 * 
	 * @param sql
	 * @return JSON数据
	 */
	public long validateSql(String jndi,String sql) {
		long time = System.currentTimeMillis();
		
		JdbcSession jdbc = JdbcFactory.getSession(jndi);
		try {
			sql = AppDataUserService.newInstance().setAppDataUserParam(sql);
			sql = sql.replaceAll("\\$\\{([^\\}]+)\\}", "");
			sql = sql.replaceAll(" IN ", "");
			sql = "SELECT * FROM ("+sql+") WHERE ROWNUM=1";
			
			String[][] res = jdbc.queryForArray(sql);
			if (res.length > 0) {
				time = System.currentTimeMillis() - time;
			}else{
				time = 0;
			}
		} catch (SQLException e) {
		    logger.error(e);
			time = 0;
		}
		
		return time;
	}

	public List<Column> getColumnList(String viewId) {
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		String condition = "WHERE view_unid='" + viewId + "' AND (column_checkbox!='1' or column_checkbox is null)  ORDER BY column_sort";
		List<Column> columnList = jdbc.queryForEntityList(Column.class,condition);
		return columnList;
	}

	public int getRowCount(String viewId) {
		int count = 0;
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		try {
			String sql = "select max(column_sort) from core_view_column t  where t.view_unid='" + viewId + "'";
			String[][] result = jdbc.queryForArray(sql);
			if (result.length > 1) {
				count = Integer.parseInt(result[1][0]) / 100;
			}
		} catch (SQLException e) {
		    logger.error(e);
		}

		return count;
	}

	public Column getIdColumn(String viewId) {
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		Column column = jdbc.getEntity(Column.class, "WHERE view_unid='" + viewId + "' AND column_checkbox='1'");
		return column;
	}

	/**
	 * 传入字段名链表自动构造core_view数据
	 * 
	 * @author zjianhui@linewell.com
	 * @return 新生成视图unid
	 * 
	 */

	public boolean createBaseViewByView(View view) {
		String sql = "insert into core_view (view_unid,view_name,view_alias,view_jndi,view_type,view_show_type,"
				+ "view_source_type,view_sql,view_open_type,view_open_content,view_width,view_height,app_unid)values("
				+ "'" + view.getUnid() + "'," 
				+ "'" + view.getName() + "'," 
				+ "'" + view.getAlias() + "'," 
				+ "'" + view.getJndi() + "'," 
				+ "'" + view.getType() + "',"
				+ "'" + view.getShowType() + "'," 
				+ "'" + view.getSourceType() + "'," 
				+ "'" + view.getSqlcontent() + "'," 
				+ "'" + view.getOpenType() + "',"
				+ "'" + view.getOpenContent() + "'," 
				+ "'" + view.getWidth() + "'," 
				+ "'" + view.getHeight() + "'," 
				+ "'" + view.getJndi() + "')";
		boolean save_status = false;
		try {
			save_status = JDBCTool.doSQLUpdate(JNDI, sql, new Object[0]);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return save_status;
	}

	/**
	 * 删除视图
	 * 
	 * @param viewIds
	 * @return
	 */
	public boolean delView(String viewIds) {
		boolean bool = true;
		String delView = "DELETE core_view t WHERE t.view_unid IN (" + viewIds + ")";
		String delColumn = "DELETE core_view_column t WHERE t.view_unid IN (" + viewIds + ")";
		String delQuery = "DELETE core_view_query t WHERE t.view_unid IN (" + viewIds + ")";
		String delSubBtn = "DELETE core_sub_button t WHERE t.sub_belongto IN (" + viewIds + ")";

		try {
			JdbcSession jdbc = JdbcFactory.getSession(JNDI);
			jdbc.beginTran();

			jdbc.update(delView);
			jdbc.update(delColumn);
			jdbc.update(delQuery);
			jdbc.update(delSubBtn);

			jdbc.endTran();
		} catch (SQLException e) {
		    logger.error(e);
		}

		return bool;
	}
	
	/**
	 * 复制视图
	 * @param viewUnid
	 * @return 视图UNID
	 */
	public String copyView(String viewUnid){
		boolean bool = true;
		String tempUnid = new UNIDGenerate().getUnid();
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
					
		View view = jdbc.getEntityById(View.class, viewUnid);
		view.setName(view.getName()+"_副本");
		view.setUnid(tempUnid);
		bool = bool && jdbc.saveEntity(view);
		
		List<Column> columnList = jdbc.queryForEntityList(Column.class, "where view_unid='"+viewUnid+"'");
		for (Column column : columnList) {
			column.setUnid(new UNIDGenerate().getUnid());
			column.setViewUnid(tempUnid);
			bool = bool && jdbc.saveEntity(column);
		}
		
		List<Query> queryList = jdbc.queryForEntityList(Query.class, "where view_unid='"+viewUnid+"'");
		for (Query query : queryList) {
			query.setUnid(new UNIDGenerate().getUnid());
			query.setViewUnid(tempUnid);
			bool = bool && jdbc.saveEntity(query);
		}
		
		if (!bool) {
			return "";
		}
			
		return tempUnid;
	}
	
	public String queryFieldListForJson(String viewId,HttpServletRequest request){	
		String _kw = request.getParameter("q");
		String _field = request.getParameter("_field");
		String limit = request.getParameter("limit");
		
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		View view = jdbc.getEntityById(View.class, viewId);
		String paramsClass = view.getParamsClass();
		
		String sql = StringUtils.upperCase(view.getSqlcontent());
		
		// 当没值设置自定义实现类
		if (StringUtils.isNotEmpty(paramsClass)) {
			sql = SetParamsService.getInstance().setParamsSqlFromMap(request, sql, paramsClass);
		}
		if (sql.indexOf("BEGINTIME}") > -1) {
			String beginTime = request.getParameter("BEGINTIME");
			if (StringUtils.isEmpty(beginTime)) {
				sql = sql.replaceAll("\\$\\{.*BEGINTIME\\}", "0");
			}
		}
		if (sql.indexOf("ENDTIME}") > -1) {
			String endTime = request.getParameter("ENDTIME");
			if (StringUtils.isEmpty(endTime)) {
				sql = sql.replaceAll("\\$\\{.*ENDTIME\\}", DateTime.getNowDateTime("yyyy-MM-dd"));
			}
		}
		
		Pattern p = Pattern.compile("\\$\\{([^\\}]+)\\}");
		Matcher m = p.matcher(sql);
		while (m.find()) {
			String queryField = m.group(1).toUpperCase();
			String paramField = StringUtils.trimToEmpty(request.getParameter(queryField));
			if(queryField.equals(_field)){
				sql = sql.replaceAll("\\$\\{" + queryField + "\\}", _kw);
			}else{
				sql = sql.replaceAll("\\$\\{" + queryField + "\\}", paramField);
			}
		}
		
		// 当有配置系统参数,设置值
		if (sql.indexOf("#{") > -1) {
			sql = AppParamService.newInstance().setAppParam(request, sql);
		}
		sql = sql.replaceAll("\\$\\{([^\\}]+)\\}", "");
		sql = SqlOptimize.optimize(sql);
		
		JdbcSession viewJdbc = JdbcFactory.getSession(view.getJndi());
		JSONArray paddingJson = JSONObject.fromObject(viewJdbc.queryForEasyGridPaging(sql,1,100,"","")).getJSONArray("rows");
		StringBuffer rtString = new StringBuffer();
		
		String vals = "";
		for (Iterator iterator = paddingJson.iterator(); iterator.hasNext();) {
			JSONObject obj = (JSONObject) iterator.next();
			String val = obj.getString(_field);
			if(vals.indexOf(val)==-1){
				rtString.append(""+obj.getString(_field)+"|"+obj.getString(_field)+"\n");
				vals += val+"; ";
			}
		}
		logger.debug("视图自动完成框sql:"+sql+"\n数据:"+rtString);
		
		return rtString.toString();
	}
	
	/**
	 * 获取视图总数
	 * @param viewId 视图id
	 * @return 视图总数
	 */
	public int getTotalCount(String viewId){
		int count = 0;
		HttpServletRequest request = ServletActionContext.getRequest();
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		View view = jdbc.getEntityById(View.class, viewId);
		String paramsClass = view.getParamsClass();
		
		String sql = StringUtils.upperCase(view.getSqlcontent());
		
		// 当没值设置自定义实现类
		if (StringUtils.isNotEmpty(paramsClass)) {
			sql = SetParamsService.getInstance().setParamsSqlFromMap(request, sql, paramsClass);
		}
		
		//sql 起始时间初始化
		if (sql.indexOf("BEGINTIME}") > -1 || sql.indexOf("ENDTIME}") > -1) {
			Pattern p = Pattern.compile("\\$\\{([^\\}]+)\\}");
			Matcher m = p.matcher(sql);
			while (m.find()) {
				String queryField = m.group(1).toUpperCase();
				String paramField = StringUtils.trimToEmpty(request.getParameter(queryField));
				
				//开始时间
				if (queryField.indexOf("BEGINTIME")>-1 && StringUtils.isEmpty(paramField)) {
					sql = sql.replaceAll("\\$\\{" + queryField + "\\}", "0");
				}
				
				//结束时间
				if (queryField.indexOf("ENDTIME")>-1 && StringUtils.isEmpty(paramField)) {
					sql = sql.replaceAll("\\$\\{" + queryField + "\\}", DateTime.getNowDateTime("yyyy-MM-dd"));
				}
			}
		}
		
		Pattern p = Pattern.compile("\\$\\{([^\\}]+)\\}");
		Matcher m = p.matcher(sql);
		while (m.find()) {
			String queryField = m.group(1).toUpperCase();
			String paramField = StringUtils.trimToEmpty(request.getParameter(queryField));
			sql = sql.replaceAll("\\$\\{" + queryField + "\\}", paramField);
		}
		
		// 当有配置系统参数,设置值
		if (sql.indexOf("#{") > -1) {
			sql = AppParamService.newInstance().setAppParam(request, sql);
		}
		sql = sql.replaceAll("\\$\\{([^\\}]+)\\}", "");
		
		JdbcSession viewJdbc = JdbcFactory.getSession(view.getJndi());
		
		count = viewJdbc.getSqlCount(sql);
		return count;
	}
	/**
	 * 获取视图查询条件字段
	 * @param sql 查询语句
	 * @param viewId 视图id
	 * @return JSONObject
	 */
	public JSONObject querySqlField(String jndi,String sql, String viewId) {
		JSONObject ret = new JSONObject();
		JdbcSession jdbc = JdbcFactory.getSession(jndi);
		JSONArray jsonField = new JSONArray();//字段
		Map map = jdbc.getColumnComments(SqlUtil.getTables(sql));//字段注释	
		
		sql = AppDataUserService.newInstance().setAppDataUserParam(sql);
		
		try {
			String[][] res = jdbc.queryForArray("SELECT * FROM ("+sql.replaceAll("\\$\\{([^\\}]+)\\}", "")+") TMPTAB WHERE ROWNUM=1");
			if (res.length > 0) {
				for (int i = 0; i < res[0].length; i++) {
					String field = StringUtils.upperCase(res[0][i]);
					JSONObject obj = new JSONObject();
					obj.put("name", field);
					obj.put("comment", map.get(field)==null?"":map.get(field));
					jsonField.add(obj);
				}
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		ret.put("field", jsonField);		

		//搜索字段
		JSONArray jsonSField = new JSONArray();
		QueryManager queryManager = new QueryManager();
		List<Query> queryList = queryManager.doFindByViewId(viewId);
		if (!ListUtil.isNull(queryList)) {
			JSONObject jsonObject = null;
			for (Query query : queryList) {
				jsonObject = new JSONObject();
				jsonObject.put("field", query.getField().toUpperCase());
				jsonSField.add(jsonObject);
			}
		}
		ret.put("sField", jsonSField);
		return ret;
	}
}