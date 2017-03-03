

package com.linewell.core.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 *功能说明：
 *<P></P>
 *@author chh
 *@since 2013
 *
 */
public class HtmlUtil {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(BlobUtil.class);
	
	/**
     * 把字符串中的回车和换行，双引号替换成能在JavaScript代码中赋值。
     * @param src
     * @return
     */
    public static String jsEncoder(String src){
    	return StringEscapeUtils.escapeJavaScript(src);
    }
	public   static   String StringFilter(String   str) {      
           // 清除掉所有特殊字符   
		  String regEx="[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]";   
		  Pattern   p   =   Pattern.compile(regEx);      
		  Matcher   m   =   p.matcher(str);      
		  return   m.replaceAll("").trim();      
  }   
	/**
	 * 将字符串src中的子字符串fnd全部替换为新子字符串rep.<br>
	 * 功能相当于java sdk 1.4的String.replaceAll方法.<br>
	 * 不同之处在于查找时不是使用正则表达式而是普通字符串.
	 */
	public static String replaceAll(String src, String fnd, String rep)throws Exception {
		if (src == null || src.equals("")) {
			return "";
		}
		
		String dst = src;
		
		int idx = dst.indexOf(fnd);
		
		while (idx >= 0) {
			dst = dst.substring(0, idx) + rep
					+ dst.substring(idx + fnd.length(), dst.length());
			idx = dst.indexOf(fnd, idx + rep.length());
		}
		
		return dst;
	}
	public static void main(String[] args) {
		String src ="select t.contact_phone "
		+" from FDS_CASE_DUTYPEOPLE t where case_unid='@case_unid@' and type='自然人'";
		String tep=StringEscapeUtils.escapeJavaScript(src);
		System.out.println(tep);
		System.out.println(StringEscapeUtils.unescapeJavaScript(tep));
	}
}

