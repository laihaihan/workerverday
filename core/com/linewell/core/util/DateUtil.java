package com.linewell.core.util;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class DateUtil {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(DateTime.class);
	private String year;
	private String month;
	private String day;

	/**
	 * 月份字符串最小值
	 */
	public static final String MONTH_MIN = "01";
	/**
	 * 月份字符串最大值
	 */
	public static final String MONTH_MAX = "12";

	/**
	 * 天数字符串最小值
	 */
	public static final String DAY_MIN = "01";
	/**
	 * 天数字符串最大值
	 */
	public static final String DAY_MAX = "31";

	public DateUtil() {
		String dateTime = DateTime.getNowDateTime();
		this.year = dateTime.substring(0, 4);
		this.month = dateTime.substring(5, 7);
		this.day = dateTime.substring(8, 10);
	}

	public int getCurYearMin() {		
		return Integer.parseInt(this.year + MONTH_MIN + DAY_MIN);
	}

	public int getCurYearMax() {
		return Integer.parseInt(this.year + MONTH_MAX + DAY_MAX);
	}

	public int getCurMonthMin() {		
		return Integer.parseInt(this.year + this.month + DAY_MIN);
	}

	public int getCurMonthMax() {
		return Integer.parseInt(this.year + this.month + DAY_MAX);
	}

	public int getCurDay() {
		return Integer.parseInt(this.year + this.month + this.day);
	}

	/**
	 * 获取本年到本月的所有月份
	 * @return new String[]{"2010-01", "2010-02", "2010-03"}
	 */
	public String[] months(){
		int m = Integer.parseInt(month);
		String res[] =new String[m];
		for(int i=1; i<=m; i++){
			if(i<10) {
				res[i-1] = year + "-0" + i;
			} else {
				res[i-1] = year + "-" + i;
			}
		}
		return res;

	}
	
	/**
	 * 12个月
	 * @param year
	 * @return if null return 最近12个月, else return 年12个月
	 */
	public String[] months(String year){
		if(null == year){
			return months12();
		}return months12(Integer.parseInt(year));
		
	}
	public String[] months(String begin, String end){
		DateFormat df = new SimpleDateFormat("yyyy-MM");
		ArrayList l = new ArrayList();
		try {
			Date db = df.parse(begin);
			Calendar cb = new GregorianCalendar();
			cb.setTime(db);
			Date de = df.parse(end);
			Calendar ce = new GregorianCalendar();
			ce.setTime(de);
			l.add(df.format(cb.getTime()));
			while(cb.before(ce)){
				cb.add(Calendar.MONTH, 1);
				l.add(df.format(cb.getTime()));
			}
		} catch (ParseException e) {
		    logger.error(e);
		}
		int m = l.size();
		String res[] =new String[m];
		for(int i=0; i<m; i++){
			res[i] = (String) l.get(i); 
		}
		return res;
		
	}
	/**
	 * 获取当前月的开始时间
	 * @return 2011-01-01 00:00:00
	 */
	public String getCurrentMonthBegin(){
		return date(null, 0, 0, 0, 0, 0, 0);
	}

	/**
	 * 获取当前月的结束时间
	 * @return 2011-01-31 23:59:59
	 */
	public String getCurrentMonthEnd(){
		return date(null, 0, 1, 0, 0, 0, -1);
	}
	
	/**
	 * 获取前一个月的开始时间
	 * @return 2010-12-01 00:00:00
	 */
	public String getPreviousMonthBegin(){
		return date(null, 0, -1, 0, 0, 0, 0);
	}

	/**
	 * 获取前一个月的结束时间
	 * @return 2010-12-31 23:59:59
	 */
	public String getPreviousMonthEnd(){
		return date(null, 0, 0, 0, 0, 0, -1);
	}

	/**
	 * 获取当前季度的开始时间
	 * @return 2011-01-01 00:00:00
	 */
	public String getCurrentSeasonBegin() {
		return getSeason(0);
	}

	/**
	 * 获取当前季度的结束时间
	 * @return 2011-03-31 23:59:59
	 */
	public String getCurrentSeasonEnd() {
		return getSeason(1);
	}

	/**
	 * 当前季度的时间
	 * @param m 0：当前季度的开始时间 1：当前季度的结束时间
	 * @return
	 */
	private String getSeason(int m) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date d = new Date();
		Calendar c = Calendar.getInstance();
		c.setTime(d);
		int month = ((c.get(Calendar.MONTH) / 3) + m) * 3;
		c.set(c.get(Calendar.YEAR), month, 1, 0, 0, -m);
		return df.format(c.getTime());
	}
	
	/**
	 * 获取当前年的开始时间
	 * @return 2011-01-01 00:00:00
	 */
	public String getCurrentYearBegin(){
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(c.get(Calendar.YEAR), 0, 1, 0, 0, 0);
		return df.format(c.getTime());
	}

	/**
	 * 获取当前时间
	 * @return 2011-01-05 13:49:59
	 */
	public String getCurrentYearEnd(){
		return DateTime.getNowDateTime();
	}

	/**
	 * 昨天的开始时间
	 * @return 2010-12-01 00:00:00
	 */
	public String getYesterdayBegin(){
		return dateday(null, 0, 0, -1, 0, 0, 0);
	}

	/**
	 * 昨天的结束时间
	 * @return 2010-12-31 23:59:59
	 */
	public String getYesterdayEnd(){
		return dateday(null, 0, 0, 0, 0, 0, -1);
	}

	/**
	 * 今天的开始时间
	 * @return 2010-12-01 00:00:00
	 */
	public String getTodayBegin(){
		return dateday(null, 0, 0, 0, 0, 0, 0);
	}

	/**
	 * 今天的结束时间
	 * @return 2010-12-31 23:59:59
	 */
	public String getTodayEnd(){
		return dateday(null, 0, 0, 1, 0, 0, -1);
	}

	/**
	 * 本周的开始时间
	 * @return 2010-12-01 00:00:00
	 */
	public String getWeekBegin(){
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(c.get(Calendar.YEAR), c.get(Calendar.MONTH), c.get(Calendar.DAY_OF_MONTH), 0, 0, 0);
		c.add(Calendar.DAY_OF_MONTH, 1-c.get(Calendar.DAY_OF_WEEK));
		return df.format(c.getTime());
	
	}

	/**
	 * 本周结束时间
	 * @return 2010-12-31 23:59:59
	 */
	public String getWeekEnd(){
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(c.get(Calendar.YEAR), c.get(Calendar.MONTH), c.get(Calendar.DAY_OF_MONTH), 0, 0, 0);
		c.add(Calendar.DAY_OF_MONTH, 1-c.get(Calendar.DAY_OF_WEEK));
		c.add(Calendar.WEEK_OF_MONTH, 1);
		c.add(Calendar.SECOND, -1);
		return df.format(c.getTime());
		}

	/**
	 * 某个时间的变化
	 * @param date 日期时间
	 * @param year 年
	 * @param month 月
	 * @param day 天
	 * @param hour 时
	 * @param minute 分
	 * @param second 秒
	 * @return 2011-01-01 00:00:00 or 2011-01-31 23:59:59
	 */
	public String date(Date date, int year, int month, int day, int hour, int minute, int second){
//		DateFormat df = new SimpleDateFormat("yyyyMMdd");
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(date == null){
			date = new Date();
		}
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(c.get(Calendar.YEAR), c.get(Calendar.MONTH), 1, 0, 0, 0);
		c.add(Calendar.YEAR, year);
		c.add(Calendar.MONTH, month);
		c.add(Calendar.DAY_OF_MONTH, day);
		c.add(Calendar.HOUR_OF_DAY, hour);
		c.add(Calendar.MINUTE, minute);
		c.add(Calendar.SECOND, second);
		return df.format(c.getTime());
	}
	/**
	 * 某个时间的变化
	 * @param date 日期时间
	 * @param year 年
	 * @param month 月
	 * @param day 天
	 * @param hour 时
	 * @param minute 分
	 * @param second 秒
	 * @return 2011-01-01 00:00:00 or 2011-01-31 23:59:59
	 */
	private String dateday(Date date, int year, int month, int day, int hour, int minute, int second){
//		DateFormat df = new SimpleDateFormat("yyyyMMdd");
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(date == null){
			date = new Date();
		}
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(c.get(Calendar.YEAR), c.get(Calendar.MONTH), c.get(Calendar.DAY_OF_MONTH), 0, 0, 0);
		c.add(Calendar.YEAR, year);
		c.add(Calendar.MONTH, month);
		c.add(Calendar.DAY_OF_MONTH, day);
		c.add(Calendar.HOUR_OF_DAY, hour);
		c.add(Calendar.MINUTE, minute);
		c.add(Calendar.SECOND, second);
		return df.format(c.getTime());
	}
	
	/**
	 * 两个日期之间的全部日期数值数组
	 * @param begin
	 * @param end
	 * @return{2010-10-10, 2010-10-11, 2010-10-12, ,...,2011-01-11}
	 */
	public String[] dates(String begin ,String end){
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String[] arr = new String[]{""};
		try {
			Date db = df.parse(begin);
			Calendar cb = Calendar.getInstance();
			cb.setTime(db);
			Date de = df.parse(end);
			Calendar ce = Calendar.getInstance();
			ce.setTime(de);
			long lday = (ce.getTimeInMillis() - cb.getTimeInMillis()) / (1000 * 60 * 60 * 24);
			int lg = Long.valueOf(lday).intValue();
			arr = new String[lg + 1];	
			arr[0] = df.format(cb.getTime());
			for(int i=0; i < lg; i++){
				cb.add(Calendar.DAY_OF_YEAR, 1);
				arr[i + 1] = df.format(cb.getTime());
			}
		} catch (ParseException e) {
		    logger.error(e);
		}
		return arr;
		
	}
	
	/**
	 * 最近12个月
	 * @param begin
	 * @param end
	 * @return {2010-02, 2010-03, 2010-04,..,2011-01}
	 */
	public String[] months12(){
		DateFormat df = new SimpleDateFormat("yyyy-MM");
		String[] arr = new String[12];
		Date d = new Date();
		Calendar cb = Calendar.getInstance();
		cb.setTime(d);
		cb.add(Calendar.MONTH, -12);
		for(int i=0; i < 12; i++){
			cb.add(Calendar.MONTH, 1);
			arr[i] = df.format(cb.getTime());
		}
		return arr;
	}
	/**
	 * 某年的12个月
	 * @param begin
	 * @param end
	 * @return {2010-01, 2010-02, 2010-03, 2010-04,..,2010-12}
	 */
	public String[] months12(int year){
		DateFormat df = new SimpleDateFormat("yyyy-MM");
		String[] arr = new String[12];
		Calendar cb = Calendar.getInstance();
		if(year == cb.get(Calendar.YEAR)){
			return months();	
		}
		cb.set(year, -1, 1);
		for(int i=0; i < 12; i++){
			cb.add(Calendar.MONTH, 1);
			arr[i] = df.format(cb.getTime());
		}
		return arr;
	}
	
	/**
	 * 从当前年到2008年
	 * @param begin
	 * @param end
	 * @return {2011, 2010, 2009, 2008}
	 */
	public String[] years(){
		DateFormat df = new SimpleDateFormat("yyyy");
		
		Date d = new Date();
		Calendar cb = Calendar.getInstance();
		int cy = cb.get(Calendar.YEAR);
		cb.set(Calendar.YEAR, 2007);
		cy = cy - cb.get(Calendar.YEAR);
		cb.setTime(d);
		cb.add(Calendar.YEAR, 1);
		String[] arr = new String[cy];
		for(int i=0; i < cy; i++){
			cb.add(Calendar.YEAR, -1);
			arr[i] = df.format(cb.getTime());
		}
		return arr;
	}
	/**
	 * 获得当前的时间的前第十二个月
	 * @return
	 */
	public String get12thMonth(){     
		DateFormat df = new SimpleDateFormat("yyyy-MM");
		Date d = new Date();
		GregorianCalendar cb = new GregorianCalendar();
		cb.setTime(d);
		cb.add(Calendar.MONTH, -11);
		return df.format(cb.getTime());
	}  
	
	/**
	 * 获得当前年月
	 * @return
	 */     
	public String getCurrentMonth(){     
		DateFormat df = new SimpleDateFormat("yyyy-MM");
		GregorianCalendar cd = new GregorianCalendar();
		return df.format(cd.getTime());
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		DateUtil du = new DateUtil();
		if(10 > 2){
			
			System.out.println(du.getCurrentYearEnd());
			System.out.println(du.getWeekBegin());
			System.out.println(du.getWeekEnd());
		}else{
			System.out.println(du.getCurYearMin() + "~" + du.getCurYearMax());

			System.out.println(du.getCurMonthMin() + "~" + du.getCurMonthMax());

			System.out.println(du.getCurDay());


			System.out.println(du.getPreviousMonthBegin());
			System.out.println(du.getPreviousMonthEnd());

			System.out.println(du.getCurrentSeasonBegin());
			System.out.println(du.getCurrentSeasonEnd());
			int m = 0;
			int t = -3;
			Date d = new Date();
			Calendar c = Calendar.getInstance();
			c.setTime(d);
			int month = (((c.get(Calendar.MONTH) + t) / 3) + m) * 3;
			System.out.println(month);



			String[] arr = du.dates("2010-10-10", "2011-01-11");
			int lg = arr.length;
			for(int i=0; i < lg; i++){
				System.out.println(arr[i]);
			}
			arr = du.months12();
			lg = arr.length;
			for(int i=0; i < lg; i++){
				System.out.println(arr[i]);
			}

			arr = du.years();
			lg = arr.length;
			for(int i=0; i < lg; i++){
				System.out.println(arr[i]);
			}
			arr = du.months12(2011);
			lg = arr.length;
			for(int i=0; i < lg; i++){
				System.out.println(arr[i]);
			}
			System.out.println(" -- - -");
			arr = du.months("2010-10-10", "2011-01-11");
			lg = arr.length;
			for(int i=0; i < lg; i++){
				System.out.println(arr[i]);
			}



			System.out.println(du.getTodayBegin());
			System.out.println(du.getTodayEnd());
			System.out.println(" -- - ");
			System.out.println(du.getYesterdayBegin());
			System.out.println(du.getYesterdayEnd());
			System.out.println(" -- - ");
			System.out.println(du.getWeekBegin());
			System.out.println(du.getWeekEnd());

		}
	}
}