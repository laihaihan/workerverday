package com.linewell.core.view;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.db.JdbcFactory;
import com.linewell.core.db.JdbcSession;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.tree.TreeManager;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.view.button.ButtonManager;
import com.linewell.core.view.column.Column;
import com.linewell.core.view.ext.data.ViewDataService;
import com.linewell.core.view.query.Query;
import com.linewell.core.view.query.QueryManager;
import com.linewell.ucap.platform.authorized.app.App;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.util.UNIDGenerate;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>
 * 视图控制器
 * </P>
 * 
 * @author cyingquan@linewell.com
 * @date 2011-1-12
 * @version 1.00
 *          <p>
 *          Copyright (c) 2011 www.linewell.com
 *          </p>
 */
public class ViewAction extends ActionSupport {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(ViewAction.class);

	private static final long serialVersionUID = 1L;

	private static final String PORTLET = "portlet";//首页组件展示视图
	private static final String OPEN_GRID = "grid";// 视图表格方式打开
	private static final String OPEN_TREE_GRID = "treegrid";// 视图表格方式打开
	private static final String OPEN_XSL = "xsl";// xsl视图方式
	private static final String OPEN_TABLE = "table";// url链接形式

	private static final String GRID_LIST = "grid_list";// 表格数据例表
	private static final String TREEGRID_LIST = "treegrid_list";// 表格数据例表
	private static final String XSL_LIST = "xsl_list";// xsl数据例表
	private static final String TABLE_LIST = "table_list";// xsl数据例表

	private String forwardUrl;// 跳转url

	private String fn;
	private String viewId;// 视图id
	private String editLink;// 编辑页面
	private String JNDI = GlobalParameter.APP_CORE;

	public String execute() throws Exception {

		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();

		ViewManager viewManager = new ViewManager();		
		QueryManager queryManager = new QueryManager();
		/**
		 * 视图打开
		 */
		if (OPEN_GRID.equals(fn)) {
			View viewTmp = viewManager.getView(viewId);
			
			if ("0".equals(viewTmp.getShowType())) {
				viewManager.setGridOptions(request, viewId);
				return OPEN_GRID;
				
			}else if ("1".equals(viewTmp.getShowType())) {
				viewManager.setGridOptions(request, viewId);
				return OPEN_TREE_GRID;
			}			
		}
		/**
		 * 首页组件
		 */
		else if(PORTLET.equals(fn)){
		    View viewTmp = viewManager.getView(viewId);
		    if ("0".equals(viewTmp.getShowType())) {
                viewManager.setGridOptions(request, viewId);
                return PORTLET;
            }     
		}

		/**
		 * 视图例表数据
		 */
		else if (GRID_LIST.equals(fn)) {
			String page = request.getParameter("page");
			String rows = request.getParameter("rows");
			String viewPadding = viewManager.getPadding(viewId, Integer.parseInt(page), Integer.parseInt(rows), request);
			PrintUtil.print(response, viewPadding);
			//logger.info("grid_list:" + viewPadding);
			return null;
		} else if (TREEGRID_LIST.equals(fn)) {
			String page = request.getParameter("page");
			String rows = request.getParameter("rows");
			
			String data = viewManager.getPadding(viewId,Integer.parseInt(page), Integer.parseInt(rows), request);
			JSONObject treeObj = JSONObject.fromObject(data);

			JSONArray printData = new JSONArray();
			JSONArray treeData = JSONArray.fromObject(treeObj.get("rows"));

			JSONObject pidObj = new JSONObject();
			JSONArray childrenArray = new JSONArray();
			pidObj.put("UNID", "");

			for (int i = 0; i < treeData.size(); i++) {
				JSONObject obj = treeData.getJSONObject(i);
				String parentunid = obj.getString("PARENTUNID");
				
				if (pidObj.getString("UNID").equals(parentunid)&& !"0".equals(parentunid)) {
					childrenArray.add(obj);
					if (i==treeData.size()-1) {
						pidObj.put("children", childrenArray);
						
						printData.remove(printData.size()-1);
						printData.add(pidObj);
					}
					
				} else {
					if (childrenArray.size() > 0) {
						pidObj.put("children", childrenArray);
						printData.remove(printData.size()-1);
						printData.add(pidObj);
						childrenArray.clear();
					}

					printData.add(obj);
					pidObj = obj;
				}				
			}
			
			treeObj.put("rows", printData);
			PrintUtil.print(response, treeObj);

			return null;
		}

		else if ("FieldAutoComplete".equals(fn)) {
			String responseText = viewManager.queryFieldListForJson(viewId,request);
			PrintUtil.print(response, responseText);

			return null;
		}

		/**
		 * 保存基本信息
		 */
		else if ("saveBase".equals(fn)) {
			JSONObject ret = new JSONObject();

			JdbcSession jdbc = JdbcFactory.getSession(this.JNDI);
			UNIDGenerate genUnid = new UNIDGenerate();

			View viewForm = BeanUtil.createBean(View.class, request);

			if (StringUtils.isEmpty(viewForm.getUnid())) {
				Session session = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
				App app = session.getApp();
				
				viewForm.setUnid(genUnid.getUnid());
				viewForm.setAppid(app.getUnid());
				
				ret.put("success", jdbc.saveEntity(viewForm));
			} else {
				View view = jdbc.getEntityById(View.class, viewForm.getUnid());
				BeanUtil.updateProperties(view, viewForm);
				ret.put("success", jdbc.updateEntity(view));

				viewForm = view;
			}

			ret.put("view", viewForm);
			PrintUtil.print(response, ret);
		}
		
		/**
		 * 验证sql
		 */
		else if("validateSql".equals(fn)){
			String jndi = request.getParameter("jndi");
			String sql = request.getParameter("sql");
			long time = viewManager.validateSql(jndi, sql);
			
			JSONObject ret = new JSONObject();
			ret.put("success",time==0?false:true);
			ret.put("time", viewManager.validateSql(jndi, sql));
			
			PrintUtil.print(response, ret);
			return null;
		}
		/**
		 * 保存sql
		 */
		else if ("saveSql".equals(fn)) {
			JSONObject ret = new JSONObject();
			JdbcSession jdbc = JdbcFactory.getSession(this.JNDI);

			String viewUnid = request.getParameter("viewUnid");
			String sql = request.getParameter("sql");
			String custom = request.getParameter("custom");
			String paramsClass = request.getParameter("paramsClass");
			String sqlType = request.getParameter("sqlType");//sql语句复杂程度

			View view = jdbc.getEntityById(View.class, viewUnid);
			view.setSqlcontent(sql.toUpperCase());
			view.setCustom(custom);
			view.setParamsClass(paramsClass);
			view.setSqlType(sqlType);

			JSONObject fields = null;
			if(View.SourceType.JSON.equals(view.getSourceType())){
				fields = ViewDataService.getInstance().getField(request, view.getDataClass());
			}else{
				if ("0".equals(sqlType)) {
					fields = viewManager.querySqlField(view.getJndi(), sql, viewUnid);
				} else {
					fields = viewManager.selectSqlField(view.getJndi(),sql);
				}
			}

			ret.put("success", jdbc.updateEntity(view));
			ret.put("fields", fields);
			ret.put("sqlType", sqlType);//返回sql语句复杂度，以便页面显示

			PrintUtil.print(response, ret);
			return null;
		}

		else if ("saveField".equals(fn)) {
			PrintUtil.print(response, saveField(request));
			return null;
		}

		else if ("getColumn".equals(fn)) {
			JSONObject ret = new JSONObject();
			JdbcSession jdbc = JdbcFactory.getSession(this.JNDI);

			String columnUnid = request.getParameter("columnUnid");
			ret.put("column", jdbc.getEntityById(Column.class, columnUnid));

			PrintUtil.print(response, ret);
			return null;
		}

		else if ("saveDisplay".equals(fn)) {
			PrintUtil.print(response, saveDisplay(request));
			return null;
		}

		// 保存按钮
		else if ("saveBtn".equals(fn)) {
			ButtonManager btnManager = new ButtonManager();
			PrintUtil.print(response, btnManager.saveBtnAndSubBtn(request));
		}

		// 保存子按钮
		else if ("saveSubBtn".equals(fn)) {
			ButtonManager btnManager = new ButtonManager();
			String btnUnid = request.getParameter("btnUnid");
			String viewUnid = request.getParameter("viewUnid");

			PrintUtil.print(response, btnManager.saveSubBtn(request, btnUnid,
					viewUnid));
		}

		// 删除子按钮
		else if ("delSubButton".equals(fn)) {
			String subUnid = request.getParameter("subUnid");
			String sql = "delete  from core_sub_button t where t.sub_unid='" + subUnid
					+ "'";
			JdbcSession jdbc = JdbcFactory.getSession(this.JNDI);

			JSONObject ret = new JSONObject();
			ret.put("success", jdbc.update(sql) > 0 ? true : false);
			PrintUtil.print(response, ret);

			return null;
		}
		
		else if("moveBtn".equals(fn)){
			String ids = request.getParameter("ids");
			ButtonManager bm = new ButtonManager();
			JSONObject ret = new JSONObject();
			ret.put("success", bm.updateBtnSort(ids));
			
			PrintUtil.print(response, ret);
			return null;
		}

		else if ("del".equals(fn)) {
			String ids = request.getParameter("ids");
			ViewManager vm = new ViewManager();
			JSONObject ret = new JSONObject();

			ret.put("success", vm.delView(ids));
			PrintUtil.print(response, ret);
		}

		else if ("tree".equals(fn)) {
			String clazz = request.getParameter("class");

			TreeManager tm = new TreeManager();
			PrintUtil.print(response, tm.getData(request, clazz));
		}

		else if ("saveSort".equals(fn)) {
			String sorts = request.getParameter("sorts");
			String[] sortsArray = sorts.split(";");

			JdbcSession jdbc = JdbcFactory.getSession(this.JNDI);
			jdbc.beginTran();
			for (int i = 0; i < sortsArray.length; i++) {
				String[] sort = sortsArray[i].split(",");
				String sql = "update core_view_column t set t.column_sort="
						+ sort[1] + " where t.column_unid='" + sort[0] + "'";
				jdbc.update(sql);
			}
			jdbc.endTran();
		}

		// 删除字段
		else if ("delField".equals(fn)) {
			String columnUnid = request.getParameter("columnUnid");
			String sql = "delete from core_view_column where column_unid='"
					+ columnUnid + "'";
			JdbcSession jdbc = JdbcFactory.getSession(this.JNDI);

			JSONObject ret = new JSONObject();
			ret.put("success", jdbc.update(sql) > 0 ? true : false);
			PrintUtil.print(response, ret);
		}
		
		//保存搜索配置
		else if("saveQuery".equals(fn)){
			String viewUnid = request.getParameter("viewUnid");
			String searchStyle = request.getParameter("searchStyle");//0:简单; 1:简单+高级(兼容旧); 2:自定义简单 3.自定义简单+高级(兼容旧) 4:自定义简单+高级 5.简单+高级 6.高级 7.自定义高级
			String[] searchStyleCk = request.getParameterValues("searchStyle_ck");
			
			boolean simpleBool = false;
			boolean advancedBool = false;
			
			JdbcSession jdbc = JdbcFactory.getSession(this.JNDI);			
			View view = jdbc.getEntityById(View.class, viewUnid);			
			
			String[] fields = request.getParameterValues("field");
			if (fields != null) {
				String chooseFields = "";
				
				for (int i = 0; i < fields.length; i++) {
					if (StrUtil.isNull(fields[i]) || "ON".equals(fields[i].toUpperCase())) {
						continue;
					}
					chooseFields += (StrUtil.isNull(chooseFields)?"":",")+"'"+fields[i]+"'";
					
					String field = fields[i];
					String name = request.getParameter(field + "_name");
					String displayType = request.getParameter(field + "_displayType");
					String dicUnid = request.getParameter(field + "_dicUnid");
					String displaySimple = request.getParameter(field + "_displaySimple");//0.高级; 1.简单+高级 2.简单
					
					if("1".equals(displaySimple) || "2".equals(displaySimple)){
						simpleBool = true;
					}
					
					if("1".equals(displaySimple) || "0".equals(displaySimple)){
						advancedBool = true;
					}

					boolean addFlag = false;
					Query query = jdbc.getEntity(Query.class,"where query_field='" + field + "' and view_unid='"+viewUnid+"' ");
					if (query == null) {
						query = new Query();
						query.setUnid(new UNIDGenerate().getUnid());
						addFlag = true;
					}
					query.setField(field);
					query.setName(name);
					query.setDisplaySimple(displaySimple);
					query.setDicUnid(dicUnid);
					query.setDisplayType(displayType);
					query.setViewUnid(viewUnid);
					query.setSort(i);

					if (addFlag) {
						jdbc.saveEntity(query);
					} else {
						jdbc.updateEntity(query);
					}
				}
				jdbc.update("delete from core_view_query where view_unid='"+viewUnid+"' and query_field not in ("+chooseFields+")");
				
			}else{
				jdbc.update("delete from core_view_query where view_unid='"+viewUnid+"'");
			}
			
			if(simpleBool && advancedBool){
				searchStyle = "5";
				
			}else if(simpleBool){
				searchStyle = "0";
				
			}else if(advancedBool){
				searchStyle = "6";
			}
			
			
			if(searchStyleCk!=null){
				if(searchStyleCk.length==2){
					searchStyle = "4";
				}else{
					searchStyle = searchStyleCk[0];
				}
			}
			
			view.setSearchStyle(searchStyle);
			jdbc.updateEntity(view);
		}
		
		else if ("getView".equals(fn)) {
			String unid = request.getParameter("unid");
			JdbcSession jdbc = JdbcFactory.getSession(this.JNDI);
			View view = jdbc.getEntityById(View.class, unid);
			
			PrintUtil.print(response, JSONObject.fromObject(view));
		}
		
		/**
		 * 复制视图
		 */
		else if("copyView".equals(fn)){
			JSONObject ret = new JSONObject();
			
			String viewUnid = request.getParameter("viewUnid");			
			ViewManager vm = new ViewManager();			
			String rtUnid = vm.copyView(viewUnid);
			
			if (rtUnid.length()==32) {
				ret.put("success", true);
				ret.put("unid", rtUnid);
			}else{
				ret.put("success", false);
			}
			PrintUtil.print(response, ret);
		}else if("view".equals(fn)){

			String clazz = request.getParameter("impclass");
			
			ViewCommonImp vcimp = new ViewCommonImp();
			PrintUtil.print(response, vcimp.getData(request, clazz));
		
		}
		/**
		 * 删除视图查询条件
		 */
		else if("delViewQuery".equals(fn)){
			String queryUnid = request.getParameter("unid");
			boolean bool = queryManager.doDeleteByQueryUnid(queryUnid);
			JSONObject ret = new JSONObject();
			ret.put("success", bool);
		} 
		return null;
	}

	private String saveField(HttpServletRequest request) {

		JSONObject ret = new JSONObject();
		JdbcSession jdbc = JdbcFactory.getSession(this.JNDI);
		
		String columnUnid = request.getParameter("columnUnid");
		String merge = request.getParameter("merge");
		String footer = request.getParameter("footer");

		Column column = jdbc.getEntityById(Column.class, columnUnid);
		if (column == null) {
			column = (Column) BeanUtil.getFormBean(Column.class, request);

			UNIDGenerate genUnid = new UNIDGenerate();
			column.setUnid(genUnid.getUnid());
			
			ret.put("fn", "save");
			ret.put("success", jdbc.saveEntity(column));

		} else {			
			BeanUtil.updateBean(request, column);
			
			if(merge == null){
				column.setMerge("0");
			}
			if(footer == null){
				column.setFooter("0");
			}
			
			ret.put("fn", "update");
			ret.put("success", jdbc.updateEntity(column));
		}

		ret.put("column", JSONObject.fromObject(column));

		return ret.toString();
	}

	private String saveDisplay(HttpServletRequest request) {
		JSONObject ret = new JSONObject();

		JdbcSession jdbc = JdbcFactory.getSession(this.JNDI);

		String viewUnid = request.getParameter("viewUnid");
		String idField = request.getParameter("idField");// 选项列
		String idFieldUnid = request.getParameter("idFieldUnid");// 选项列
		String rownumbers = request.getParameter("rownumbers");
		String checkbox = request.getParameter("checkbox");
		String editTitle = request.getParameter("editTitle");//记录页面标题

		View view = jdbc.getEntityById(View.class, viewUnid);
		view.setRownumbers(rownumbers);
		view.setEditTitle(editTitle);
		jdbc.updateEntity(view);

		UNIDGenerate genUnid = new UNIDGenerate();

		Column idFieldColumn = jdbc.getEntityById(Column.class, idFieldUnid);
		if (idFieldColumn == null) {
			idFieldColumn = new Column();
			idFieldColumn.setUnid(genUnid.getUnid());
		} else {
			idFieldColumn.setUnid(idFieldUnid);
		}
		idFieldColumn.setField(idField);
		idFieldColumn.setSort(0);
		idFieldColumn.setCheckbox("1");
		idFieldColumn.setViewUnid(viewUnid);
		idFieldColumn.setHidden(checkbox);

		if (StringUtils.isEmpty(idFieldUnid)) {
			jdbc.saveEntity(idFieldColumn);
		} else {
			jdbc.updateEntity(idFieldColumn);
		}

		ret.put("success", true);
		ret.put("idFieldColumn", idFieldColumn);

		return ret.toString();
	}

	public String getViewId() {
		return viewId;
	}

	public void setViewId(String viewId) {
		this.viewId = viewId;
	}

	public String getForwardUrl() {
		return forwardUrl;
	}

	public void setForwardUrl(String forwardUrl) {
		this.forwardUrl = forwardUrl;
	}

	public String getFn() {
		return fn;
	}

	public void setFn(String fn) {
		this.fn = fn;
	}

	public String getEditLink() {
		return editLink;
	}

	public void setEditLink(String editLink) {
		this.editLink = editLink;
	}

}
