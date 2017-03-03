

package com.linewell.core.util;

import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 *功能说明：操作系统的相关工具类
 *<P></P>
 *@author chh
 *@since 2012
 *
 */
public class SystemUtil {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(SystemUtil.class); 
	
	public static String getSystem(){
		Properties  prop = System.getProperties();
		String os = prop.getProperty("os.name");
		//System.out.println(os);
		return os;
	}
	/**
	 * 
	 * 功能说明:根据系统获取换行符
	 * @return
	 * String
	 * @author chh
	 * @May 23, 2012
	 */
	public static String getLineFeed(){
		if(getSystem().toLowerCase().startsWith("win")){
			return "\r\n";
		}
		return "\n";
	}
	/**
	 * 
	 * 功能说明:运行可执行文件例如：exe或者bat文件
	 * @param batFile
	 * void
	 * @author chh
	 * @May 23, 2012
	 */
	public static void excuteRunFile(String fileName){
		try{
			 Runtime.getRuntime().exec(fileName);
			}catch (Exception e) {
			    logger.error(e);
			}
	}
	
	public static void main(String[] args) {
		System.out.println(getSystem());
	}
}

