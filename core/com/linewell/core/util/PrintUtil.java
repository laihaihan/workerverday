package com.linewell.core.util;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 
 * <p>
 * response.getWriter().write 工具
 * </p>
 * 
 * @author cyingquan@linewell.com
 * @version 1.00 2012 4 9
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */
public class PrintUtil {
	/**
	 * Logger for this class
	 */
	private static final Log logger = LogFactory.getLog(PrintUtil.class);

	/**
	 * 打印JSONObject
	 * 
	 * @param response
	 * @param jsonObject
	 */
	public static void printJSONObject(HttpServletResponse response,
			JSONObject jsonObject) {

		if (jsonObject == null) {
			return;
		}

		response.setContentType("application/json; charset=utf-8");
		try {
			response.getWriter().write(jsonObject.toString());
		} catch (IOException e) {
			logger.error(e);
		}
	}

	/**
	 * 打印字符串
	 * @param response
	 * @param obj
	 */
	public static void print(HttpServletResponse response, Object obj) {
		if (obj==null) {
			return;
		}		
		response.setCharacterEncoding("UTF-8");
		try {
			response.getWriter().write(obj.toString());
		} catch (IOException e) {
			logger.error(e);
		}
	}
}
