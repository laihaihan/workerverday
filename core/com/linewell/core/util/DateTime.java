package com.linewell.core.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 对日期时间中的相关方法进行分装，主要包括了获取当前时间，已经当前时间中运算关系等方法
 * 
 * @author http://www.linewell.com
 */
public class DateTime {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(DateTime.class);

	final static String datePattern = "yyyy-MM-dd HH:mm:ss";

	final static SimpleDateFormat sf = new SimpleDateFormat(datePattern);

	// 时间对应的long值
	long nowtime;

	/**
	 * 以当前系统时间构造DateTime对象
	 * 
	 */
	public DateTime() {
		nowtime = System.currentTimeMillis();
	}

	/**
	 * 以指定时间构造DateTime对象,如果指定的时间不符合格式，将使用 系统当前时间构造对象
	 * 
	 * @param time
	 *            时间格式为yyyy-MM-dd HH:mm:ss的字符串
	 */
	public DateTime(String time) {
		this(time, "yyyy-MM-dd HH:mm:ss");
	}

	/**
	 * 以指定时间和指定时间格式构造DateTime对象. 如果指定的时间不符合格式，将使用系统当前时间构造对象
	 * 
	 * @param time
	 *            指定的时间
	 * @param timePattern
	 *            指定的日间格式
	 */
	public DateTime(String time, String timePattern) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(timePattern);
			Date d = sdf.parse(time);
			nowtime = d.getTime();
		} catch (ParseException e) {
		    logger.error(e);
			nowtime = System.currentTimeMillis();
		}
	}

	/**
	 * 取回系统当前时间 时间格式yyyy-MM-dd hh:mm:ss
	 * 
	 * @return yyyy-MM-dd hh:mm:ss格式的时间字符串
	 */
	public String getNowTime() {
		String retValue = null;
		retValue = sf.format(new Date(nowtime));
		return retValue;
	}

	/**
	 * 按指定日期、时间格式返回当前日期
	 * 
	 * @param datePattern
	 *            格式字符串
	 * @return 格式化的日期、时间字符串
	 */
	public String getNowTime(String datePattern) {
		String retValue = null;
		SimpleDateFormat sf = new SimpleDateFormat(datePattern);
		retValue = sf.format(new Date(nowtime));
		return retValue;
	}

	/**
	 * 返回4位的年份,如'2004'
	 * 
	 * @return 年
	 */
	public String getYear() {
		return getNowTime("yyyy");
	}

	/**
	 * 返回月份. 一位的月份数字，如8月将返回8
	 * 
	 * @return 月份 如果8月返回8，12月返回12
	 */
	public String getMonth() {

		return getNowTime("M");
	}

	/**
	 * 返回一个月中的第几天
	 * 
	 * @return 天 一位的天数，如当前是4月1日将返回'1'
	 */
	public String getDay() {
		return getNowTime("d");
	}

	/**
	 * 返回24小时制的小时
	 * 
	 * @return 小时
	 */
	public String getHour() {
		return getNowTime("HH");
	}

	/**
	 * 返回分钟
	 * 
	 * @return 分钟 一位的分钟数
	 */
	public String getMinute() {
		return getNowTime("m");
	}

	/**
	 * 返回秒
	 * 
	 * @return 秒 一位的秒数
	 */
	public String getSecond() {
		return getNowTime("s");
	}

	/**
	 * 返回星期中名称
	 * 
	 * @return 如星期二将返回"星期二"
	 */
	public String getDayInWeek() {
		return getNowTime("E");
	}
	
	/**
	 * 返回星期几，
	 * @return 数字星期几，如星期二则返回2，星期天则返回0
	 */
	public String getNumInWeek(){
		String dayInWeek = this.getDayInWeek();
		dayInWeek = dayInWeek.replace("星期", "");
		
		char[] chars = dayInWeek.toCharArray();
		for (int i = 0; i < chars.length; i++) {
			switch (chars[i]) {
			case '一':
				chars[i] = '1';
				break;
			case '二':
				chars[i] = '2';
				break;
			case '三':
				chars[i] = '3';
				break;
			case '四':
				chars[i] = '4';
				break;
			case '五':
				chars[i] = '5';
				break;
			case '六':
				chars[i] = '6';
				break;
			case '日':
				chars[i] = '0';
				break;
			}
		}
		return new String(chars);
	}

	/**
	 * 只返回日期 如2004-08-12.月份和日期都是两位，不足的在前面补0
	 * 
	 * @return 日期
	 */
	public String getDateOnly() {
		return getNowTime("yyyy-MM-dd");
	}
	


	/**
	 * 只返回时间 如12:20:30.时间为24小时制,分钟和秒数都是两位，不足补0
	 * 
	 * @return 时间
	 */
	public String getTimeOnly() {
		return getNowTime("HH:mm:ss");
	}

	/**
	 * 调整年份
	 * 
	 * @param i
	 *            要调整的基数，正表示加，负表示减
	 */
	public void adjustYear(int i) {
		adjustTime(i, 0, 0, 0, 0);
	}

	/**
	 * 调整月份
	 * 
	 * @param i
	 *            要调整的基数，正表示加，负表示减
	 */
	public void adjustMonth(int i) {
		adjustTime(0, i, 0, 0, 0);
	}

	/**
	 * 调整天数
	 * 
	 * @param i
	 *            要调整的基数，正表示加，负表示减
	 */
	public void adjustDay(int i) {
		adjustTime(0, 0, i, 0, 0);
	}

	/**
	 * 调整小时
	 * 
	 * @param i
	 *            要调整的基数，正表示加，负表示减
	 */
	public void adjustHour(int i) {
		adjustTime(0, 0, 0, i, 0);
	}

	/**
	 * 调整分数
	 * 
	 * @param i
	 *            要调整的基数，正表示加，负表示减
	 */
	public void adjustMinute(int i) {
		adjustTime(0, 0, 0, 0, i);
	}

	/**
	 * 调整时间
	 * 
	 * @param y
	 *            年
	 * @param m
	 *            月
	 * @param d
	 *            日
	 * @param h
	 *            小时
	 * @param mm
	 *            分钟
	 */
	protected void adjustTime(int y, int m, int d, int h, int mm) {
		GregorianCalendar cal = new GregorianCalendar();
		cal.setTimeInMillis(nowtime);
		cal.add(Calendar.YEAR, y);
		cal.add(Calendar.MONTH, m);
		cal.add(Calendar.DAY_OF_MONTH, d);
		cal.add(Calendar.HOUR_OF_DAY, h);
		cal.add(Calendar.MINUTE, mm);
		nowtime = cal.getTimeInMillis();
	}

	/**
	 * 返回当前日期.
	 * 
	 * @return yyyy-MM-dd HH:mm:ss格式的日期／时间
	 */
	public static String getNowDateTime() {
		DateTime dt = new DateTime();
		return dt.getNowTime();
	}

	/**
	 * 按指定格式返回当前日期.
	 * 
	 * @param pattern
	 *            时间格式
	 * @return 格式化的日期／时间
	 */
	public static String getNowDateTime(String pattern) {
		DateTime dt = new DateTime();
		return dt.getNowTime(pattern);
	}

	/**
	 * 返回中文格式的日期.如"二零零零年八月六日星期五18点4分"
	 * 
	 * @return String
	 */
	public static String getNowDateTimeChinese() {
		DateTime dt = new DateTime();
		return getNowDateTimeChinese("yyyy年M月d日E") + dt.getNowTime("H点mm分");
	}

	/**
	 * 根据自定义输出中文日期格式输出字符串。
	 * 
	 * @param pattern
	 *            日期、时间格式. 'yyyy年MM月dd日E'将输出'2004年8月16日星期六'
	 * @return 时间、日期字符串
	 */
	public static String getNowDateTimeChinese(String pattern) {
		DateTime dt = new DateTime();
		return numberToChinese(dt.getNowTime(pattern));
	}

	/**
	 * 返回中文的数字，把12345678转成'零','一','二','三','四','五','六','七','八','九'
	 * 
	 * @param n
	 *            要转的字符串
	 * @return 转换后的字符串
	 */
	public static String numberToChinese(String n) {
		char[] chars = n.toCharArray();
		for (int i = 0; i < chars.length; i++) {
			switch (chars[i]) {
			case '1':
				chars[i] = '一';
				break;
			case '2':
				chars[i] = '二';
				break;
			case '3':
				chars[i] = '三';
				break;
			case '4':
				chars[i] = '四';
				break;
			case '5':
				chars[i] = '五';
				break;
			case '6':
				chars[i] = '六';
				break;
			case '7':
				chars[i] = '七';
				break;
			case '8':
				chars[i] = '八';
				break;
			case '9':
				chars[i] = '九';
				break;
			case '0':
				chars[i] = '零';
				break;
			}
		}
		return new String(chars);
	}

	/**
	 * 按指定格式转换输出指定的日期
	 * 
	 * @param date
	 *            要输出的日期
	 * @param datePattern
	 *            要输出的时间格式
	 * @return 格式化后的字符串
	 */
	public static String getTime(Date date, String datePattern) {
		String retValue = null;
		SimpleDateFormat sf = new SimpleDateFormat(datePattern);
		retValue = sf.format(date);
		return retValue;
	}

	/**
	 * 把字符串格式化成相应的日期格式
	 * 
	 * @param s 日期字符串格式 String
	 * @param datePattern 日期模式 String
	 * @return 返回格式化后的日期
	 */
	public static Date parseDate(String s, String datePattern) {

		s = s.replaceAll(" ", "");
		if (s == null || s.equals(""))
			return null;

		Date d = null;
		SimpleDateFormat sf = new SimpleDateFormat(datePattern);
		try {
			d = sf.parse(s);
		} catch (ParseException e) {
		    logger.error(e);
		}
		return d;
	}
	
	/**
	 * 把两个时间进行比较得出他们的间隔的天数，如果比较时间大于标准时间，则返回负的天数
	 * 
	 * @param compareTime 待比较的时间 String
	 * 
	 * @param standardTime 标准的时间 String
	 * 
	 * @return 返回比较的结果 int
	 */
	public int getIntervalDays(String compareTime,String standardTime){
		int result = 0;
		Date compareDate = this.parseDate(compareTime, "yyyy-MM-dd");
		Date standardDate = this.parseDate(standardTime, "yyyy-MM-dd");
		long sl = compareDate.getTime();
		long el = standardDate.getTime();
		long ei = el-sl;
		result = (int)((ei)/(1000*60*60*24));
		//cal.set
		return result;
	}

	/**
	 * 返回字符串
	 * 
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return getNowTime();
	}
	/**
	 * 
	 * 功能说明: 把 2012-4-25转化成 二〇一二年〇四月二十五日
	 * @param 字符串 格式 yyyy-mm-dd
	 * @author chh
	 * @Apr 19, 2012
	 */
	public  String dateToCN(String  srcStr) {     
		Date date = null;
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			date = sf.parse(srcStr);
		} catch (ParseException e) {
		    logger.error(e);
		}
        if (null == date || "".equals(date)) {      
            return null;      
        }      
        String[] CN = { "〇", "一", "二", "三", "四", "五", "六", "七", "八", "九" };    
        String str = "十";   
           
//        String[] CN = { "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"};    
//        String str = "拾";   
           
        Calendar calendar = Calendar.getInstance();      
        calendar.setTime(date);      
           
        StringBuffer cn = new StringBuffer();      
           
        String year = String.valueOf(calendar.get(Calendar.YEAR));      
          
        for (int i = 0; i < year.length(); i++) {      
            cn.append(CN[year.charAt(i) - 48]);      
        }      
          
        cn.append("年");      
          
        int t1,t2;   
           
        int mon = calendar.get(Calendar.MONTH) + 1;      
           
        t1 = mon/10;   
        t2 = mon%10;   
           
        if(t1 < 10){   
            if(t1 != 0){   
                cn.append(CN[t1]);   
                cn.append(str);   
            }else{   
                cn.append(CN[0]);   
            }   
        }   
           
        if(t2 < 10 && t2 != 0){   
            cn.append(CN[t2]);   
        }   
           
        cn.append("月");      
          
        int day = calendar.get(Calendar.DAY_OF_MONTH);      
           
        t1 = day/10;   
        t2 = day%10;   
           
        if(t1 < 10){   
            if(t1 != 0){   
            	//一十五 只显示 十五
            	if(t1!=1){
            		cn.append(CN[t1]);   
            	}
                cn.append(str);   
            }else{   
                cn.append(CN[0]);   
            }   
        }   
           
        if(t2 < 10 && t2 != 0){   
            cn.append(CN[t2]);   
        }   
           
        cn.append("日");      
          
        return cn.toString();      
    }  
	/**
	 * 
	 * 功能说明:把 2012-4-25转化成 贰零壹贰年零肆月拾伍日
	 * @param 字符串 格式 yyyy-mm-dd
	 * @author chh
	 * @Apr 19, 2012
	 */
	public  String dateToUppercaseCN(String  srcStr) {     
		Date date = null;
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			date = sf.parse(srcStr);
		} catch (ParseException e) {
		    logger.error(e);
		}
        if (null == date || "".equals(date)) {      
            return null;      
        }    
           
       String[] CN = { "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"};    
        String str = "拾";   
           
        Calendar calendar = Calendar.getInstance();      
        calendar.setTime(date);      
           
        StringBuffer cn = new StringBuffer();      
           
        String year = String.valueOf(calendar.get(Calendar.YEAR));      
          
        for (int i = 0; i < year.length(); i++) {      
            cn.append(CN[year.charAt(i) - 48]);      
        }      
          
        cn.append("年");      
          
        int t1,t2;   
           
        int mon = calendar.get(Calendar.MONTH) + 1;      
           
        t1 = mon/10;   
        t2 = mon%10;   
           
        if(t1 < 10){   
            if(t1 != 0){   
                cn.append(CN[t1]);   
                cn.append(str);   
            }else{   
                cn.append(CN[0]);   
            }   
        }   
           
        if(t2 < 10 && t2 != 0){   
            cn.append(CN[t2]);   
        }   
           
        cn.append("月");      
          
        int day = calendar.get(Calendar.DAY_OF_MONTH);      
           
        t1 = day/10;   
        t2 = day%10;   
           
        if(t1 < 10){   
            if(t1 != 0){   
            	//一十五 只显示 十五
            	if(t1!=1){
            		cn.append(CN[t1]);   
            	}
                cn.append(str);   
            }else{   
                cn.append(CN[0]);   
            }   
        }   
           
        if(t2 < 10 && t2 != 0){   
            cn.append(CN[t2]);   
        }   
           
        cn.append("日");      
          
        return cn.toString();      
    } 

	public static void main(String[] args) {
		String str =(DateTime.getNowDateTime());
		System.out.println(str);
		System.out.println(new DateTime().dateToCN(str));
		System.out.println(new DateTime().dateToCN("2012-04-15"));
		System.out.println(new DateTime().dateToUppercaseCN("2012-4-15"));
	}

}
