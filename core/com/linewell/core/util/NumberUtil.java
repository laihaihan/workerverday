package com.linewell.core.util;

import java.math.BigDecimal;


/**
 * 类说明：数字辅助性工具类
 * 
 * @author qcongyong
 * @version 1.0 2011-11-22
 */
public class NumberUtil {
	/**
	 * 字符串转化为long类型
	 * 
	 * @param str
	 * @return long
	 */
	public static long parseLong(String str){
		str = StrUtil.isNull(str) ? "0" : str;
		return Long.parseLong(str);
	}

	/**
	 * 字符串转化为int类型
	 * 
	 * @param str
	 * @return int
	 */
	public static int parseInt(String str){
		str = StrUtil.isNull(str) ? "0" : str;
		return Integer.parseInt(str);
	}

	/**
	 * 字符串转化为float类型
	 * 
	 * @param str
	 * @return float
	 */
	public static float parseFloat(String str){
		str = StrUtil.isNull(str) ? "0" : str;
		return Float.parseFloat(str);
	}

	/**
	 * 字符串转化为Double类型
	 * 
	 * @param str
	 * @return Double
	 */
	public static Double parseDouble(String str){
		str = StrUtil.isNull(str) ? "0" : str;
		return Double.parseDouble(str);
	}
	
	/**
	 * 四舍五入
	 * 
	 * @param value 四舍五入前的值
	 * @param len 小数点后面保留位数
	 * @return
	 */
	public static double getRound(String value, int len) {
		double result = 0;
		if(!StrUtil.isNull(value)) {
			BigDecimal bigDecimal = new BigDecimal(value).setScale(len, BigDecimal.ROUND_HALF_UP);
			result = bigDecimal.doubleValue();
		}
		return result;
	}
}
