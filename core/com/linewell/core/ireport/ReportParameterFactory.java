package com.linewell.core.ireport;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * @author qcongyong
 * @date 2009-12-31
 */
public interface ReportParameterFactory {
	public Map produce(HttpServletRequest request);
}
