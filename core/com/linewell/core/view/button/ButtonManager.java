package com.linewell.core.view.button;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import com.linewell.core.db.JdbcFactory;
import com.linewell.core.db.JdbcSession;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.util.UNIDGenerate;

public class ButtonManager {
	/**
	 * Logger for this class
	 */
	private static final Log logger = LogFactory.getLog(ButtonManager.class);
	private static final String JNDI = GlobalParameter.APP_CORE;

	/**
	 * 保存父按钮子按钮
	 * 
	 * @param request
	 * @return
	 */
	public JSONObject saveBtnAndSubBtn(HttpServletRequest request) {
		JSONObject ret = new JSONObject();
		String viewUnid = request.getParameter("viewUnid");
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		try {
			jdbc.beginTran();
			String btnUnid = saveBtn(request);
			ret = this.saveSubBtn(request, btnUnid, viewUnid);
			jdbc.endTran();
		} catch (SQLException e) {
		    logger.error(e);
		}

		return ret;
	}

	/**
	 * 保存子按钮
	 * 
	 * @param request
	 * @param belongTo
	 *            附属
	 * @return
	 */
	public JSONObject saveSubBtn(HttpServletRequest request, String btnUnid, String belongTo) {
		JSONObject ret = new JSONObject();
		String subName = request.getParameter("subName");
		String subImg = request.getParameter("subImg");
		String subSort = request.getParameter("subSort");
		String subUnid = request.getParameter("subUnid");
		String fnPath = request.getParameter("fnPath");
		subUnid = StrUtil.formatNull(subUnid, new UNIDGenerate().getUnid());
		
		String delBtnSql = "delete  from  core_sub_button where SUB_UNID='"+subUnid+"'";		
		String saveBtnSql = "insert into core_sub_button (SUB_UNID, BUTTON_UNID, SUB_NAME, SUB_BELONGTO, SUB_SORT, SUB_IMG,FN_PATH)"
				+ "values ('" + subUnid + "', '" + btnUnid + "', '" + subName
				+ "', '" + belongTo + "'," + subSort + ", '" + subImg + "','"+fnPath+"')";
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		try {
			jdbc.update(delBtnSql);
			ret.put("success", jdbc.update(saveBtnSql) > 0 ? true : false);
			ret.put("btn", JSONObject.fromObject(getSubBtn(subUnid)));
		} catch (SQLException e) {
		    logger.error(e);
		}

		return ret;
	}

	/**
	 * 保存按钮
	 * 
	 * @param request
	 * @return
	 */
	public String saveBtn(HttpServletRequest request) {
		String btnName = request.getParameter("btnName");
		String btnFn = request.getParameter("btnFn");
		String btnUnid = new UNIDGenerate().getUnid();
		String saveBtnSql = "insert into core_button (BUTTON_UNID, BUTTON_NAME, BUTTON_TYPE, BUTTON_FN, BUTTON_BELONGTO)\n"
				+ "values ('" + btnUnid + "', '" + btnName + "', '1', '" + btnFn + "', '')";
		try {
			JdbcSession jdbc = JdbcFactory.getSession(JNDI);
			if (jdbc.update(saveBtnSql) > 0) {
				return btnUnid;
			} else {
				return "";
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		return btnUnid;
	}

	/**
	 * 获取按钮
	 * 
	 * @param subUnid
	 * @return
	 */
	public Map<String, Object> getSubBtn(String subUnid) {
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		String sql = "select * from core_sub_button t1,core_button t2 " 
			+ "where t1.button_unid=t2.button_unid and t1.sub_unid='" + subUnid + "' order by t1.sub_sort";

		List<Map<String, Object>> btnList = null;
		try {
			btnList = jdbc.queryForList(sql);
			if (btnList != null && btnList.size() == 1) {
				return btnList.get(0);
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		return null;
	}

	public List<Map<String, Object>> getBtnList() {
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		String sql = "select * from core_button t";
		List<Map<String, Object>> btnList = null;
		try {
			btnList = jdbc.queryForList(sql);
		} catch (SQLException e) {
		    logger.error(e);
		}

		return btnList;
	}

	public List<Map<String, Object>> getSubBtnList(String belongTo) {
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		String sql = "select * from core_sub_button t1,core_button t2 " 
			+ "where t1.button_unid=t2.button_unid and t1.sub_belongto='" + belongTo + "' order by sub_sort";
		
		List<Map<String, Object>> btnList = null;
		try {
			btnList = jdbc.queryForList(sql);
		} catch (SQLException e) {
		    logger.error(e);
		}

		return btnList;
	}
	
	/**
	 * 更新按钮排序
	 * @param ids
	 * @return boolean
	 */
	public boolean updateBtnSort(String ids){
		boolean bool = true;
		JdbcSession jdbc = JdbcFactory.getSession(JNDI);
		String[] array = ids.split(",");
		for (int i = 0; i < array.length; i++) {
			String sql = "update core_sub_button set sub_sort="+i+" where sub_unid='"+array[i]+"'";
			try {
				bool = jdbc.update(sql)>0?true:false;
			} catch (SQLException e) {
				logger.error(e);
			}			
		}
		return bool ;
	}
}