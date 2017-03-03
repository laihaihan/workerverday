package com.linewell.core.print.printlodop;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.db.JDBCTool;
import com.linewell.core.db.JdbcFactory;
import com.linewell.core.db.JdbcSession;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.DateTime;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.session.Session;

/**
 * <p>
 * Print数据库操作
 * </p>
 * 
 * @author:qcongyong email:qcongyong@linewell.com
 * @version 1.0.0 2012-04-05 16:45:50
 *
 */
public class PrintManager {
    private static final Logger logger = Logger.getLogger(PrintManager.class);
	
	private DbObjectManager dbObjectManager = new DbObjectManager("APP_PRINTLODOP","PRINT_UNID",GlobalParameter.APP_CORE);
	/**
	 * 新增
	 */
	public boolean doSave(Print print){
		return dbObjectManager.doSave(print);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Print print){
		return dbObjectManager.doUpdate(print);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public Print doFindBeanByKey(String keyValue){
		return (Print)dbObjectManager.doFindBeanByKey(new Print(), keyValue);
	}

	
	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new Print(),condition,objs);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	public String[] getFields(String sql){
		JdbcSession jdbcSession = JdbcFactory.getSession(GlobalParameter.APP_CORE);
		String[] result = null;
		try {
			String[][] record = jdbcSession.queryForArray(sql);
			result = record != null && record.length > 0 ? record[0] : result;
		} catch (SQLException e) {
		    logger.error(e);
		}
		return result;
	}
	
	private String formatValue(Object obj){
		String ret = null;
		if(obj==null || obj.toString().length()==0){
			ret = " ";
		}else{
			ret = obj.toString(); 
		}
		ret = ret.replaceAll("\r\n", "");
		return ret;
	}
	
	public Print setPrintValue(Print print,HttpServletRequest request){
		if(print == null){
			return null;
		}
		
		//设置sql语句中的参数值
		String sql = print.getPrint_sql();
		Pattern p = Pattern.compile("\\$\\{([^\\}]+)\\}");
		Matcher m = p.matcher(sql);
		while (m.find()) {
			String param = m.group(1).toUpperCase();
			String value = request.getParameter(param);
			sql = sql.replaceAll("\\$\\{"+param+"\\}",value);
		}

		//设置打印内容中各个域的参数值
		try {
			List list = JDBCTool.doSQLQueryList(GlobalParameter.APP_CORE,sql);
			if(null != list && list.size()>0){
				Map map = (Map)list.get(0);
				String[] fields = this.getFields(print.getPrint_sql());
				String content = print.getPrint_content();
				for (int i = 0; i < fields.length; i++) {
					String value = this.formatValue(map.get(fields[i].toLowerCase()));
					content = content.replaceAll("\\$\\{"+fields[i]+"\\}",value);
					
					if("PROJID".equals(fields[i]) && content.indexOf("${QRCODE}")>-1){
						content = content.replaceAll("\\$\\{QRCODE\\}","http://127.0.0.1:8080/app/qrcode/"+value+".png");
					}
				}
				
				if (content.indexOf("#{USERNAME}") > -1) {
					Session session = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
					User user = session.getUser();
					content = content.replaceAll("\\#\\{USERNAME\\}", user.getDisplayName());
				}
				if (content.indexOf("#{SYS_TIME}") > -1) {
					content = content.replaceAll("\\#\\{SYS_TIME\\}", DateTime.getNowDateTime());
				}
				print.setPrint_content(content);
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		
		return print;
	}
}