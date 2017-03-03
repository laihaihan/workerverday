package com.linewell.core.print.printireport;

import java.io.File;
import java.io.FilenameFilter;

/**
 * <p>
 *    ireport文件过滤器
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Jul 17, 2012
 * @version 1.0  
 */
public class IReportFileFilter implements FilenameFilter {
	/**
	 * 取出指定目录下的所有ireport文件
	 */
	public boolean accept(File dir, String name) {
		return name.endsWith(".jasper");
	}
}
