package com.linewell.core.view.ext.data;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

public class ViewDataService {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(ViewDataService.class);
	
	
	private static ViewDataService viewDataService;

	public static ViewDataService getInstance() {
		if (viewDataService == null) {
			viewDataService = new ViewDataService();
		}
		return viewDataService;
	}

	public String getData(HttpServletRequest request,String dataClass) {
		String data = null;
		try {
			ViewDataInf viewDataInf = (ViewDataInf) Class.forName(dataClass).newInstance();
			data = viewDataInf.getViewData(request);
			
		} catch (InstantiationException e) {
			logger.error("不能实例化类:" + dataClass);
		} catch (IllegalAccessException e) {
			logger.error("非法存取类:" + dataClass);
		} catch (ClassNotFoundException e) {
			logger.error("找不到具体的类:" + dataClass);
		}
		
		return data;
	}
	
	public JSONObject getField(HttpServletRequest request,String dataClass){
		JSONObject field = new JSONObject();
		//字段
		JSONArray jsonField = new JSONArray();
		
		String data = getData(request, dataClass) ;
		JSONObject dataObj = JSONObject.fromObject(data);
		JSONArray rows = dataObj.getJSONArray("rows");
		if (rows!=null && rows.size()>0) {
			JSONArray names =  rows.getJSONObject(0).names();
			for (int i = 0; i < names.size(); i++) {
				JSONObject obj = new JSONObject();
				obj.put("name", names.getString(i));
				jsonField.add(obj);
			}
		}
		field.put("field",jsonField);
		
		return field;
	}
}
