package com.linewell.core.util;

import java.math.BigDecimal;
import java.util.Hashtable;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <p>
 *    金额的操作工具类
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Jan 21, 2013
 * @version 1.0  
 */
public class MoneyUtil {
    
    private static final Map<String, String> zeroToNineHt;	//用于存储0-9大写的哈希表
    private static final Map<Integer, String> shiBaiQianHt;	//用于存储十百千大写的哈希表
    private static final Map<Integer, String> wanYiZhaoHt;	//用于存储萬億兆大写的哈希表

    static {
    	zeroToNineHt = new Hashtable<String, String>();
    	zeroToNineHt.put("0", "零");
    	zeroToNineHt.put("1", "壹");
    	zeroToNineHt.put("2", "贰");
    	zeroToNineHt.put("3", "叁");
    	zeroToNineHt.put("4", "肆");
    	zeroToNineHt.put("5", "伍");
    	zeroToNineHt.put("6", "陆");
    	zeroToNineHt.put("7", "柒");
    	zeroToNineHt.put("8", "捌");
    	zeroToNineHt.put("9", "玖");

        shiBaiQianHt = new Hashtable<Integer, String>();
        shiBaiQianHt.put(0, "");
        shiBaiQianHt.put(1, "拾");
        shiBaiQianHt.put(2, "佰");
        shiBaiQianHt.put(3, "仟");

        wanYiZhaoHt = new Hashtable<Integer, String>();
        wanYiZhaoHt.put(0, "");
        wanYiZhaoHt.put(1, "萬");
        wanYiZhaoHt.put(2, "億");
        wanYiZhaoHt.put(3, "兆");//按照阅读习惯应该是“萬億”
    }
    
    /**
     * 将数字类型的金额转化成大写的人民币格式
     * 
     * @param obj
     * @return
     */
    public static String transToRMB(Object obj) {
    	String number = String.valueOf(obj);
		number = StrUtil.formatNull(number,"0");
		String formalNumber = new BigDecimal(number).toString();
		MoneyUtil moneyUtil = new MoneyUtil();
		String[] arr = formalNumber.split("[.]");// 拆分成整数部分和小数部分
    	String retVal = moneyUtil.parseIntegerPart(arr[0]);// 整数部分
		if (arr.length == 2 && Float.parseFloat(arr[1]) > 0) {
			retVal += moneyUtil.parseFloatPart(arr[1]);// 小数部分
		}
		return retVal;
	}

    /**
	 * 得到整数部分的汉字大写表示
	 * 
	 * @return
	 */
    private String parseIntegerPart(String integerPart) {
        // 将整数部分逆序，因为需要反向读取
        String reverseIntegerPart = "";
        for (int i = integerPart.length() - 1; i > -1; i--) {
            reverseIntegerPart += integerPart.charAt(i);
        }

        // 将整数部分按四位分组
        Pattern p = Pattern.compile("\\d{4}", Pattern.CASE_INSENSITIVE);
        Matcher m = p.matcher(reverseIntegerPart);
        StringBuffer sb = new StringBuffer();
        boolean result = m.find();
        while (result) {
            m.appendReplacement(sb, m.group(0) + ",");
            result = m.find();
        }
        m.appendTail(sb);

        String retVal = "";
        String[] arr = sb.toString().split(",");
        for (int i = arr.length - 1; i >= 0; i--) {
            for (int j = arr[i].length() - 1; j >= 0; j--) {
            	String str = String.valueOf(arr[i].charAt(j));
                retVal += zeroToNineHt.get(str) + shiBaiQianHt.get(j);//加单位（十百千）
            }
            retVal += wanYiZhaoHt.get(i % 4);// 加单位（万亿兆）
            retVal = this.formatZero(retVal);
        }

        // 格式化
        retVal = this.formatZero(retVal);
        if(retVal.startsWith("壹拾")){
        	retVal = retVal.replaceFirst("壹拾", "拾");//按照阅读习惯，第一个"壹拾"应该读作“拾”
        }
        return StrUtil.formatNull(retVal, "零");
    }

    /**
     * 得到小数部分的汉字大写表示
     * 
     * @return
     */
    private String parseFloatPart(String floatPart) {
        String retVal = "点";
        for (int i = 0; i < floatPart.length(); i++) {
            String temp = String.valueOf(floatPart.charAt(i));
            retVal += zeroToNineHt.get(temp);
        }
        return retVal;
    }

    /**
     * 格式化零
     * 
     * @return
     */
    private String formatZero(String str){
    	str = str.replaceAll("(零[萬仟佰拾])", "零");
    	str = str.replaceAll("(零{2,})", "零");// 多个零的话，只取一个
    	str = str.replaceAll("(零)($)", "$2");// 零在末尾则去掉
    	return str;
    }
}