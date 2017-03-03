package com.linewell.core.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.apache.log4j.Logger;

/**
 * <p>
 *    执行dos命令的工具类
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Nov 7, 2012
 * @version 1.0  
 */
public class DosUtil {
	
	public static Logger logger = Logger.getLogger(DosUtil.class);
	
	/**
	 * 执行dos命令
	 * 注：返回值为String是因为java中无法直接判断dos命令是否执行成功，所以只能由用户根据返回值自行判断
	 * 
	 * @param command
	 * @return 
	 */
	public static String doCommand(String command){
        String result = "";
		try {
			Runtime r = Runtime.getRuntime();
            Process p = r.exec(command);
            BufferedReader in = new BufferedReader(new InputStreamReader(p.getErrorStream()));   
            String line = null;
            while ((line = in.readLine()) != null) {   
            	result += line + "\n";
            }
		} catch (Exception e) {
		    logger.error(e);
		} 
		return result;
	}
}
