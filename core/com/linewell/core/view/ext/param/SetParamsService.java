package com.linewell.core.view.ext.param;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class SetParamsService {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(SetParamsService.class);
	
	private static SetParamsService setParamsService;

	public static SetParamsService getInstance() {
		if (setParamsService == null) {
			setParamsService = new SetParamsService();
		}
		return setParamsService;
	}

	public String setParamsSqlFromMap(HttpServletRequest request,String sql, String paramsClass) {
		Map<String, String> paramsMap = null;
		try {
			SetParamsInf setParamsInf = (SetParamsInf) Class.forName(paramsClass).newInstance();
			paramsMap = setParamsInf.setParams(request);
		} catch (InstantiationException e) {
			logger.error("不能实例化类:" + paramsClass);
		} catch (IllegalAccessException e) {
			logger.error("非法存取类:" + paramsClass);
		} catch (ClassNotFoundException e) {
			logger.error("找不到具体的类:" + paramsClass);
		}
		if (paramsMap!=null) {
			Set entrySet = paramsMap.entrySet();
			for(Iterator it = entrySet.iterator();it.hasNext();){
				Entry entry = (Entry)it.next();
				Object key = entry.getKey();
				Object value = entry.getValue();
				if (value==null || "null".equals(value)) {
					value = "";
				}
				sql = sql.replaceAll("\\$\\{"+key+"\\}",value.toString());	
			}
		}
		return sql;
	}
}
