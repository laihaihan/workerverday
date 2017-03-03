

package com.linewell.core.util;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.system.GlobalParameter;


/**
 *功能说明：计算承诺工作日工具类,没有考虑时限暂停的情况
 *<P></P>
 *@author chh
 *@since 2013
 *
 */
public class CalPromisedayUtil {
	private static CalPromisedayUtil calUtil = null;
	private static Logger logger = Logger.getLogger(CalPromisedayUtil.class);
	public   static CalPromisedayUtil newInstance() {
		if (null == calUtil) {
			calUtil = new CalPromisedayUtil();
			return calUtil;
		} else {
			return calUtil;
		}
	}
	private CalPromisedayUtil(){
		
	}
	
	/**
	 * 
	 * 功能说明:获取承诺办结日期
	 * @param date1
	 * @param days
	 * @author chh
	 * @Jan 25, 2013
	 */
	public String getEndDay(String date1 ,int days){
		String[][] holidays = getHolidays(); //获取自定义节假日
		String[][] worktimes = getWorkingDays(); //获取自定义加班日
		
		if (holidays == null) {
			holidays = getHolidays();
		}
		if (worktimes == null) {
			worktimes = getWorkingDays();
		}

		Date startDate = null;
		SimpleDateFormat sf1 = new SimpleDateFormat("yyyy-MM-dd");
		try {
			startDate = sf1.parse(date1);
		} catch (ParseException e) {
			logger.error(e.getMessage(), e);
		}

		boolean isHoliday = false;
		Date datetemp = null;
		// 判断如果没有设置承诺时间，则承诺期限为当天
		boolean isInc = true;
		if (days == 0 || days < 0) {
			// datetemp = startDate;
			isInc = false;
			days = Math.abs(days);
		}
		SimpleDateFormat sf2 = new SimpleDateFormat("E");
		GregorianCalendar cal = new GregorianCalendar();
		// 设置开始
		cal.setTimeInMillis(startDate.getTime());
		datetemp = cal.getTime();
		while (days > 0) {
			isHoliday = false;
			if (isInc) {
				cal.add(Calendar.DATE, 1);
			} else {
				cal.add(Calendar.DATE, -1);
			}
			datetemp = cal.getTime();
			sf2.applyPattern("yyyy-MM-dd");

			String scurtime = sf2.format(datetemp);
			sf2.applyPattern("E");
			String week = sf2.format(datetemp);
			// 周六、周日默认是节假日，判断一下是被设置成工作日
			if (week.equals("星期六") || week.equals("星期日")) {
				logger.debug(" ----- ------------ 是否工作日 ----------------- ");
				boolean isWorktime = isWorkingDay(scurtime);
				isHoliday = !isWorktime;
				logger.debug(String.valueOf(isWorktime));
			} else {// 周一到周五默认是工作日，判断一下是否被设置成节假日
				logger.debug(" ----- ------------ 是否节假日 ----------------- ");
				isHoliday = isHoliday(scurtime);
				logger.debug(String.valueOf(isHoliday));
			}
			// 如果不是节假日，则工作日减一
			if (!isHoliday) {
				days--;
			}
		}

		String endDate = sf1.format(datetemp);
		return endDate;
	}
	/**
	 * 计算两个日期之间的天数 这里传入的是字符值
	 * 
	 * @user huangshuidan
	 * @date 2008-2-28
	 * @param bdt
	 *            开始日期
	 * @param edt
	 *            结束日期
	 * @return 两个日期之间的天数
	 */
	public  int getDifferDays(String dt1, String dt2) {
		int days = 0;
		try {
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
			Date date1 = sf.parse(dt1);
			Date date2 = sf.parse(dt2);
			days = getDifferDays(date1, date2);
		} catch (ParseException e) {
			logger.error("解析日期数值出错，传入的开始日期和结束日期格式出错！", e);
		}
		return days;
	}
	
	/**
	 * 计算两个日期之间的工作日 计算工作日，根据传入的开始时间与结束时间来计算 这里传入的是字符值
	 * 
	 * @param dt1
	 *            开始日期
	 * @param dt2
	 *            结束日期
	 * @return
	 */
	public  int getDifferWorkDays(String dt1, String dt2) {
		int days = 0;
		try {
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
			Date date1 = sf.parse(dt1);
			Date date2 = sf.parse(dt2);
			days = getDifferWorkDays(date1, date2);
		} catch (ParseException e) {
			logger.error("解析日期数值出错，传入的开始日期和结束日期格式出错！", e);
		}
		return days;
	}

	

	/**
	 * 返回两个日期之间的间隔天数
	 * 
	 * @param adate
	 *            开始时间
	 * @param bdate
	 *            结束时间
	 * @return 返回之间的间隔天数
	 */
	private  int getDifferDays(Date adate, Date bdate) {
		long days = (long) ((bdate.getTime() - adate.getTime()) / (3600 * 24 * 1000) + 0.5);
		return (int) days + 1;
	}
	
	/**
	 * 计算两个日期之间的工作日 计算工作日，根据传入的开始时间与结束时间来计算 这里传入的是日期值
	 * 
	 * @param date1
	 *            开始日期
	 * @param date2
	 *            结束日期
	 * @return
	 */
	public  int getDifferWorkDays(Date date1, Date date2) {
		String[][] holidays = getHolidays(); //获取自定义节假日
		String[][] worktimes = getWorkingDays(); //获取自定义加班日
		if (null == date1) {
			logger.error("开始时间不能为空！");
		}
		if (null == date2) {
			logger.error("结束时间不能为空！");
		}
		int days = 0;

		// 计算两个日期的间隔天数
		long diffday = (long) ((date2.getTime() - date1.getTime()) / (3600 * 24 * 1000) + 0.5);

		// 计算节假日和自定义节假日
		SimpleDateFormat sf1 = new SimpleDateFormat("E");
		SimpleDateFormat sf2 = new SimpleDateFormat("yyyy-MM-dd");
		for (int i = 0; i <= diffday; i++) {
			Date datetemp = null;
			GregorianCalendar cal = new GregorianCalendar();
			cal.setTimeInMillis(date1.getTime());
			cal.add(Calendar.DAY_OF_MONTH, i);
			datetemp = cal.getTime();
			String week = sf1.format(datetemp);
			if (!week.equals("星期六") && !week.equals("星期日")) {
				// 判断自定义的节假日
				boolean isHoliday = false;
				for (int j = 1; j < holidays.length; j++) {
					String d1 = holidays[j][0];
					String d2 = holidays[j][1];
					Date dt1 = null, dt2 = null;
					try {
						dt1 = sf2.parse(d1);
						dt2 = sf2.parse(d2);
					} catch (ParseException e) {
						logger.error(e.getMessage());
						logger.error("解析日期数值出错，节假日配置的开始日期和结束日期格式出错！日期值为：" + d1 + " 和 " + d2);
					}
					// 如果当前日期在定义的节假日范围内
					if ((datetemp.after(dt1) && datetemp.before(dt2))
						|| (datetemp.equals(dt1) && datetemp.equals(dt2))
						|| (datetemp.compareTo(dt1) >= 0 && datetemp.compareTo(dt2) <= 0)) {
						isHoliday = true;
						break;
					}
				}

				// 如果不是周未与不是自定义节假日
				if (!isHoliday){
					days++;
				}	
			}
		}

		// 计算加班日，有配置才计算
		if (worktimes.length > 1) {
			for (int i = 0; i <= diffday; i++) {
				Date datetemp = null;
				GregorianCalendar cal = new GregorianCalendar();
				cal.setTimeInMillis(date1.getTime());
				cal.add(Calendar.DAY_OF_MONTH, i);
				datetemp = cal.getTime();
				String week = sf1.format(datetemp);
				if (week.equals("星期六") || week.equals("星期日")) {
					// 判断自定义的加班日
					boolean isOvertime = false;
					for (int j = 1; j < worktimes.length; j++) {
						String d1 = worktimes[j][0];
						String d2 = worktimes[j][1];
						Date dt1 = null, dt2 = null;
						try {
							dt1 = sf2.parse(d1);
							dt2 = sf2.parse(d2);
						} catch (ParseException e) {
							logger.error(e.getMessage());
							logger.error("解析日期数值出错，节假日配置的开始日期和结束日期格式出错！日期值为：" + d1 + " 和 " + d2);
						}
						// 如果当前日期在定义的加班日日范围内
						if ((datetemp.after(dt1) && datetemp.before(dt2))
							|| (datetemp.equals(dt1) && datetemp.equals(dt2))
							|| (datetemp.compareTo(dt1) >= 0 && datetemp.compareTo(dt2) <= 0)) {
							isOvertime = true;
							break;
						}
					}

					// 如果是加班
					if (isOvertime){
						days++;
					}	
				}
			}
		}
		return days;
	}

	public  String[][] getHolidays() {
		String[][] ret = null;
		String sql = "select startdate,enddate from core_weekset where type='H' ORDER BY STARTDATE";
		try {
			ret = JDBCTool.doSQLQuery(GlobalParameter.APP_CORE,sql);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return ret;
	}

	private  String[][] getWorkingDays() {
		String[][] ret = null;
		String sql = "select startdate,enddate from core_weekset where type='O' ORDER BY STARTDATE";
		try {
			ret = JDBCTool.doSQLQuery(GlobalParameter.APP_CORE,sql);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return ret;
	}

	// 是否节假日,算头算尾
	public  boolean isHoliday(String dateStr) {
		String[][] holidays = getHolidays(); //获取自定义节假日
		String[][] worktimes = getWorkingDays(); //获取自定义加班日
		if (null == holidays) {
			holidays = getHolidays();
		}
		// 是否在节假日配置日期当中
		boolean b = matchInterzone(dateStr, holidays);
		if (!b) {
			// 如果不在节假日配置日期当中
			SimpleDateFormat sf1 = new SimpleDateFormat("yyyy-MM-dd");
			Date date = null;
			try {
				date = sf1.parse(dateStr);
			} catch (ParseException e) {
				logger.error(e.getMessage());
				logger.error("日期格式不对，请转化为yyyy-MM-dd格式！");
				return false;
			}

			// 是周六、周日，并且不是设置的加班日
			SimpleDateFormat sf2 = new SimpleDateFormat("E");
			String week = sf2.format(date);
			if (week.equals("星期六") || week.equals("星期日")) {
				logger.debug(" ----- ------------ 是否工作日 ----------------- ");
				if (null == worktimes) {
					worktimes = getWorkingDays();
				}
				boolean isWorktime = isWorkingDay(dateStr);
				b = !isWorktime;
				logger.debug(String.valueOf(isWorktime));
			}
		}
		return b;
	}

	// 是否加班日,算头算尾
	public  boolean isWorkingDay(String date) {
		String[][] worktimes = getWorkingDays(); //获取自定义加班日
		if (null == worktimes) {
			worktimes = getWorkingDays();
		}
		return matchInterzone(date, worktimes);
	}

	// 判断date日期是否在时间列表区间
	// timesZone 数组为两列，第一列为开始时间，第二列为结束时间，使用字符串对比方式进行判断。并且第一行为字段列名
	private  boolean matchInterzone(String date, String[][] timesZone) {
		boolean b = false;
		if (null != timesZone && timesZone.length > 1) {
			for (int i = 1; i < timesZone.length; i++) {
				logger.debug(date + "\t" + timesZone[i][0] + "\t" + timesZone[i][1] + "\t");
				if ((date.compareTo(timesZone[i][0]) >= 0) && (date.compareTo(timesZone[i][1]) <= 0)) {
					b = true;
					break;
				}
			}
		}
		return b;
	}
}

