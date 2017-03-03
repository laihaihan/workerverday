package com.linewell.core.util;

import java.util.List;

/**
 * 
 * <p>
 * List 相关辅助工具类
 * </p>
 * 
 * @author zjianhui@linewell.com
 * @version 1.00 - 2012 4 9
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */
public class ListUtil {
	/**
	 * 过滤掉list里面才重复项 date: Apr 3, 2011
	 * 
	 * @param list
	 * @return List
	 */
	public static List filterRepeat(List list) {
		int length = list.size();
		for (int i = 0; i < length - 1; i++) {
			String temp = list.get(i).toString();
			for (int j = i + 1; j < length; j++) {
				if (temp.equals(list.get(j))) {
					list.remove(j);
					j--;
					length--;
				}
			}
		}
		return list;
	}

	/**
	 * 判断list是否null或者长度为零，常用于从数据库取对象后的判断 date: Apr 3, 2012
	 * 
	 * @param list
	 * @return true:空 false：非空
	 */
	public static boolean isNull(List list) {
		if (null == list || list.size() == 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * list 是否有存在字符串value的值
	 * 
	 * @param list
	 *            链表
	 * @param value
	 *            值
	 * @return true: 存在，false：不存在
	 */
	public static boolean valueIsExit(List list, String value) {
		for (int i = 0; i < list.size(); i++) {
			if (value.equals(list.get(i).toString())) {
				return true;
			}
		}
		return false;
	}

	public static String[] toArray(List list) {
		if (null != list && !list.isEmpty()) {
			String[] arry = new String[list.size()];
			for (int i = 0; i < list.size(); i++) {
				arry[i] = list.get(i).toString();
			}
			return arry;
		}
		return null;

	}

	/**
	 * 
	 * 功能说明:将list 转化成字符串 例如 list={1,2,3}转化成1,2,3
	 * 
	 * @param list
	 * @return String
	 * @author chh
	 * @May 23, 2012
	 */
	public static String toString(List<String> list) {
		if (null == list || list.isEmpty())
			return "";
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < list.size(); i++) {
			String str = (String) list.get(i);
			if (i == list.size() - 1) {
				sb.append(str);
			} else {
				sb.append(str + ",");
			}

		}
		return sb.toString();
	}

	/**
	 * 这种方法适合用来比较List中是否包含某个元素的问题 比较传入List list中是否含有与传入的String str相同的元素
	 * 
	 * @param list
	 * @param str
	 * @return true 重复 false 不重复
	 * @throws Exception
	 */
	public static boolean isItEquals(List list, String str) {
		for (int i = 0; i < list.size(); i++) {
			if (str.equals(list.get(i).toString())) {
				return true;
			}
		}
		return false;
	}

}
