package com.linewell.core.db;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class JdbcFilter implements Filter {
	/**
	 * Logger for this class
	 */
	private static final Log logger = LogFactory.getLog(JdbcFilter.class);

	public void init(FilterConfig filterConfig) throws ServletException {

		String proxool = filterConfig.getInitParameter("proxool");
		JdbcFactory.jndi = proxool;
	}

	/**
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		try {
			chain.doFilter(request, response);
		} finally {
			try {
				JdbcFactory.closeJdbcSession();
			} catch (SQLException e) {
			    logger.error(e);
			}
		}
		
	}

	public void destroy() {
	}
}